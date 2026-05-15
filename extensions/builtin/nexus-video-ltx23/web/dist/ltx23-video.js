function N0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var $f = { exports: {} }, tu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pm;
function A0() {
  if (pm) return tu;
  pm = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function d(s, D, R) {
    var z = null;
    if (R !== void 0 && (z = "" + R), D.key !== void 0 && (z = "" + D.key), "key" in D) {
      R = {};
      for (var C in D)
        C !== "key" && (R[C] = D[C]);
    } else R = D;
    return D = R.ref, {
      $$typeof: c,
      type: s,
      key: z,
      ref: D !== void 0 ? D : null,
      props: R
    };
  }
  return tu.Fragment = y, tu.jsx = d, tu.jsxs = d, tu;
}
var _m;
function x0() {
  return _m || (_m = 1, $f.exports = A0()), $f.exports;
}
var o = x0(), Wf = { exports: {} }, k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;
function O0() {
  if (Em) return k;
  Em = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), z = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), O = Symbol.iterator;
  function H(v) {
    return v === null || typeof v != "object" ? null : (v = O && v[O] || v["@@iterator"], typeof v == "function" ? v : null);
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
  function fl(v, A, q) {
    this.props = v, this.context = A, this.refs = I, this.updater = q || Q;
  }
  fl.prototype.isReactComponent = {}, fl.prototype.setState = function(v, A) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, A, "setState");
  }, fl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function L() {
  }
  L.prototype = fl.prototype;
  function _l(v, A, q) {
    this.props = v, this.context = A, this.refs = I, this.updater = q || Q;
  }
  var xl = _l.prototype = new L();
  xl.constructor = _l, w(xl, fl.prototype), xl.isPureReactComponent = !0;
  var gl = Array.isArray;
  function dl() {
  }
  var $ = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function sl(v, A, q) {
    var Y = q.ref;
    return {
      $$typeof: c,
      type: v,
      key: A,
      ref: Y !== void 0 ? Y : null,
      props: q
    };
  }
  function ft(v, A) {
    return sl(v.type, A, v.props);
  }
  function W(v) {
    return typeof v == "object" && v !== null && v.$$typeof === c;
  }
  function Ol(v) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(q) {
      return A[q];
    });
  }
  var st = /\/+/g;
  function Xl(v, A) {
    return typeof v == "object" && v !== null && v.key != null ? Ol("" + v.key) : A.toString(36);
  }
  function Il(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(dl, dl) : (v.status = "pending", v.then(
          function(A) {
            v.status === "pending" && (v.status = "fulfilled", v.value = A);
          },
          function(A) {
            v.status === "pending" && (v.status = "rejected", v.reason = A);
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
  function E(v, A, q, Y, F) {
    var P = typeof v;
    (P === "undefined" || P === "boolean") && (v = null);
    var el = !1;
    if (v === null) el = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          el = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case c:
            case y:
              el = !0;
              break;
            case U:
              return el = v._init, E(
                el(v._payload),
                A,
                q,
                Y,
                F
              );
          }
      }
    if (el)
      return F = F(v), el = Y === "" ? "." + Xl(v, 0) : Y, gl(F) ? (q = "", el != null && (q = el.replace(st, "$&/") + "/"), E(F, A, q, "", function(be) {
        return be;
      })) : F != null && (W(F) && (F = ft(
        F,
        q + (F.key == null || v && v.key === F.key ? "" : ("" + F.key).replace(
          st,
          "$&/"
        ) + "/") + el
      )), A.push(F)), 1;
    el = 0;
    var Ql = Y === "" ? "." : Y + ":";
    if (gl(v))
      for (var Bl = 0; Bl < v.length; Bl++)
        Y = v[Bl], P = Ql + Xl(Y, Bl), el += E(
          Y,
          A,
          q,
          P,
          F
        );
    else if (Bl = H(v), typeof Bl == "function")
      for (v = Bl.call(v), Bl = 0; !(Y = v.next()).done; )
        Y = Y.value, P = Ql + Xl(Y, Bl++), el += E(
          Y,
          A,
          q,
          P,
          F
        );
    else if (P === "object") {
      if (typeof v.then == "function")
        return E(
          Il(v),
          A,
          q,
          Y,
          F
        );
      throw A = String(v), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return el;
  }
  function B(v, A, q) {
    if (v == null) return v;
    var Y = [], F = 0;
    return E(v, Y, "", "", function(P) {
      return A.call(q, P, F++);
    }), Y;
  }
  function Z(v) {
    if (v._status === -1) {
      var A = v._result;
      A = A(), A.then(
        function(q) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = q);
        },
        function(q) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = q);
        }
      ), v._status === -1 && (v._status = 0, v._result = A);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var hl = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  }, rl = {
    map: B,
    forEach: function(v, A, q) {
      B(
        v,
        function() {
          A.apply(this, arguments);
        },
        q
      );
    },
    count: function(v) {
      var A = 0;
      return B(v, function() {
        A++;
      }), A;
    },
    toArray: function(v) {
      return B(v, function(A) {
        return A;
      }) || [];
    },
    only: function(v) {
      if (!W(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return k.Activity = M, k.Children = rl, k.Component = fl, k.Fragment = d, k.Profiler = D, k.PureComponent = _l, k.StrictMode = s, k.Suspense = x, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return $.H.useMemoCache(v);
    }
  }, k.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(v, A, q) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var Y = w({}, v.props), F = v.key;
    if (A != null)
      for (P in A.key !== void 0 && (F = "" + A.key), A)
        !ql.call(A, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && A.ref === void 0 || (Y[P] = A[P]);
    var P = arguments.length - 2;
    if (P === 1) Y.children = q;
    else if (1 < P) {
      for (var el = Array(P), Ql = 0; Ql < P; Ql++)
        el[Ql] = arguments[Ql + 2];
      Y.children = el;
    }
    return sl(v.type, F, Y);
  }, k.createContext = function(v) {
    return v = {
      $$typeof: z,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: R,
      _context: v
    }, v;
  }, k.createElement = function(v, A, q) {
    var Y, F = {}, P = null;
    if (A != null)
      for (Y in A.key !== void 0 && (P = "" + A.key), A)
        ql.call(A, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (F[Y] = A[Y]);
    var el = arguments.length - 2;
    if (el === 1) F.children = q;
    else if (1 < el) {
      for (var Ql = Array(el), Bl = 0; Bl < el; Bl++)
        Ql[Bl] = arguments[Bl + 2];
      F.children = Ql;
    }
    if (v && v.defaultProps)
      for (Y in el = v.defaultProps, el)
        F[Y] === void 0 && (F[Y] = el[Y]);
    return sl(v, P, F);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(v) {
    return { $$typeof: C, render: v };
  }, k.isValidElement = W, k.lazy = function(v) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: v },
      _init: Z
    };
  }, k.memo = function(v, A) {
    return {
      $$typeof: _,
      type: v,
      compare: A === void 0 ? null : A
    };
  }, k.startTransition = function(v) {
    var A = $.T, q = {};
    $.T = q;
    try {
      var Y = v(), F = $.S;
      F !== null && F(q, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(dl, hl);
    } catch (P) {
      hl(P);
    } finally {
      A !== null && q.types !== null && (A.types = q.types), $.T = A;
    }
  }, k.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, k.use = function(v) {
    return $.H.use(v);
  }, k.useActionState = function(v, A, q) {
    return $.H.useActionState(v, A, q);
  }, k.useCallback = function(v, A) {
    return $.H.useCallback(v, A);
  }, k.useContext = function(v) {
    return $.H.useContext(v);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(v, A) {
    return $.H.useDeferredValue(v, A);
  }, k.useEffect = function(v, A) {
    return $.H.useEffect(v, A);
  }, k.useEffectEvent = function(v) {
    return $.H.useEffectEvent(v);
  }, k.useId = function() {
    return $.H.useId();
  }, k.useImperativeHandle = function(v, A, q) {
    return $.H.useImperativeHandle(v, A, q);
  }, k.useInsertionEffect = function(v, A) {
    return $.H.useInsertionEffect(v, A);
  }, k.useLayoutEffect = function(v, A) {
    return $.H.useLayoutEffect(v, A);
  }, k.useMemo = function(v, A) {
    return $.H.useMemo(v, A);
  }, k.useOptimistic = function(v, A) {
    return $.H.useOptimistic(v, A);
  }, k.useReducer = function(v, A, q) {
    return $.H.useReducer(v, A, q);
  }, k.useRef = function(v) {
    return $.H.useRef(v);
  }, k.useState = function(v) {
    return $.H.useState(v);
  }, k.useSyncExternalStore = function(v, A, q) {
    return $.H.useSyncExternalStore(
      v,
      A,
      q
    );
  }, k.useTransition = function() {
    return $.H.useTransition();
  }, k.version = "19.2.6", k;
}
var Tm;
function Mi() {
  return Tm || (Tm = 1, Wf.exports = O0()), Wf.exports;
}
var J = Mi();
const Ss = /* @__PURE__ */ N0(J);
var Ff = { exports: {} }, eu = {}, kf = { exports: {} }, If = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function j0() {
  return zm || (zm = 1, (function(c) {
    function y(E, B) {
      var Z = E.length;
      E.push(B);
      l: for (; 0 < Z; ) {
        var hl = Z - 1 >>> 1, rl = E[hl];
        if (0 < D(rl, B))
          E[hl] = B, E[Z] = rl, Z = hl;
        else break l;
      }
    }
    function d(E) {
      return E.length === 0 ? null : E[0];
    }
    function s(E) {
      if (E.length === 0) return null;
      var B = E[0], Z = E.pop();
      if (Z !== B) {
        E[0] = Z;
        l: for (var hl = 0, rl = E.length, v = rl >>> 1; hl < v; ) {
          var A = 2 * (hl + 1) - 1, q = E[A], Y = A + 1, F = E[Y];
          if (0 > D(q, Z))
            Y < rl && 0 > D(F, q) ? (E[hl] = F, E[Y] = Z, hl = Y) : (E[hl] = q, E[A] = Z, hl = A);
          else if (Y < rl && 0 > D(F, Z))
            E[hl] = F, E[Y] = Z, hl = Y;
          else break l;
        }
      }
      return B;
    }
    function D(E, B) {
      var Z = E.sortIndex - B.sortIndex;
      return Z !== 0 ? Z : E.id - B.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      c.unstable_now = function() {
        return R.now();
      };
    } else {
      var z = Date, C = z.now();
      c.unstable_now = function() {
        return z.now() - C;
      };
    }
    var x = [], _ = [], U = 1, M = null, O = 3, H = !1, Q = !1, w = !1, I = !1, fl = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, _l = typeof setImmediate < "u" ? setImmediate : null;
    function xl(E) {
      for (var B = d(_); B !== null; ) {
        if (B.callback === null) s(_);
        else if (B.startTime <= E)
          s(_), B.sortIndex = B.expirationTime, y(x, B);
        else break;
        B = d(_);
      }
    }
    function gl(E) {
      if (w = !1, xl(E), !Q)
        if (d(x) !== null)
          Q = !0, dl || (dl = !0, Ol());
        else {
          var B = d(_);
          B !== null && Il(gl, B.startTime - E);
        }
    }
    var dl = !1, $ = -1, ql = 5, sl = -1;
    function ft() {
      return I ? !0 : !(c.unstable_now() - sl < ql);
    }
    function W() {
      if (I = !1, dl) {
        var E = c.unstable_now();
        sl = E;
        var B = !0;
        try {
          l: {
            Q = !1, w && (w = !1, L($), $ = -1), H = !0;
            var Z = O;
            try {
              t: {
                for (xl(E), M = d(x); M !== null && !(M.expirationTime > E && ft()); ) {
                  var hl = M.callback;
                  if (typeof hl == "function") {
                    M.callback = null, O = M.priorityLevel;
                    var rl = hl(
                      M.expirationTime <= E
                    );
                    if (E = c.unstable_now(), typeof rl == "function") {
                      M.callback = rl, xl(E), B = !0;
                      break t;
                    }
                    M === d(x) && s(x), xl(E);
                  } else s(x);
                  M = d(x);
                }
                if (M !== null) B = !0;
                else {
                  var v = d(_);
                  v !== null && Il(
                    gl,
                    v.startTime - E
                  ), B = !1;
                }
              }
              break l;
            } finally {
              M = null, O = Z, H = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Ol() : dl = !1;
        }
      }
    }
    var Ol;
    if (typeof _l == "function")
      Ol = function() {
        _l(W);
      };
    else if (typeof MessageChannel < "u") {
      var st = new MessageChannel(), Xl = st.port2;
      st.port1.onmessage = W, Ol = function() {
        Xl.postMessage(null);
      };
    } else
      Ol = function() {
        fl(W, 0);
      };
    function Il(E, B) {
      $ = fl(function() {
        E(c.unstable_now());
      }, B);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, c.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ql = 0 < E ? Math.floor(1e3 / E) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, c.unstable_next = function(E) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = O;
      }
      var Z = O;
      O = B;
      try {
        return E();
      } finally {
        O = Z;
      }
    }, c.unstable_requestPaint = function() {
      I = !0;
    }, c.unstable_runWithPriority = function(E, B) {
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
      var Z = O;
      O = E;
      try {
        return B();
      } finally {
        O = Z;
      }
    }, c.unstable_scheduleCallback = function(E, B, Z) {
      var hl = c.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? hl + Z : hl) : Z = hl, E) {
        case 1:
          var rl = -1;
          break;
        case 2:
          rl = 250;
          break;
        case 5:
          rl = 1073741823;
          break;
        case 4:
          rl = 1e4;
          break;
        default:
          rl = 5e3;
      }
      return rl = Z + rl, E = {
        id: U++,
        callback: B,
        priorityLevel: E,
        startTime: Z,
        expirationTime: rl,
        sortIndex: -1
      }, Z > hl ? (E.sortIndex = Z, y(_, E), d(x) === null && E === d(_) && (w ? (L($), $ = -1) : w = !0, Il(gl, Z - hl))) : (E.sortIndex = rl, y(x, E), Q || H || (Q = !0, dl || (dl = !0, Ol()))), E;
    }, c.unstable_shouldYield = ft, c.unstable_wrapCallback = function(E) {
      var B = O;
      return function() {
        var Z = O;
        O = B;
        try {
          return E.apply(this, arguments);
        } finally {
          O = Z;
        }
      };
    };
  })(If)), If;
}
var Nm;
function D0() {
  return Nm || (Nm = 1, kf.exports = j0()), kf.exports;
}
var Pf = { exports: {} }, it = {};
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
function M0() {
  if (Am) return it;
  Am = 1;
  var c = Mi();
  function y(x) {
    var _ = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        _ += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + x + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var s = {
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
  }, D = Symbol.for("react.portal");
  function R(x, _, U) {
    var M = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: D,
      key: M == null ? null : "" + M,
      children: x,
      containerInfo: _,
      implementation: U
    };
  }
  var z = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function C(x, _) {
    if (x === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, it.createPortal = function(x, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(y(299));
    return R(x, _, null, U);
  }, it.flushSync = function(x) {
    var _ = z.T, U = s.p;
    try {
      if (z.T = null, s.p = 2, x) return x();
    } finally {
      z.T = _, s.p = U, s.d.f();
    }
  }, it.preconnect = function(x, _) {
    typeof x == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, s.d.C(x, _));
  }, it.prefetchDNS = function(x) {
    typeof x == "string" && s.d.D(x);
  }, it.preinit = function(x, _) {
    if (typeof x == "string" && _ && typeof _.as == "string") {
      var U = _.as, M = C(U, _.crossOrigin), O = typeof _.integrity == "string" ? _.integrity : void 0, H = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      U === "style" ? s.d.S(
        x,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: M,
          integrity: O,
          fetchPriority: H
        }
      ) : U === "script" && s.d.X(x, {
        crossOrigin: M,
        integrity: O,
        fetchPriority: H,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, it.preinitModule = function(x, _) {
    if (typeof x == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var U = C(
            _.as,
            _.crossOrigin
          );
          s.d.M(x, {
            crossOrigin: U,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && s.d.M(x);
  }, it.preload = function(x, _) {
    if (typeof x == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var U = _.as, M = C(U, _.crossOrigin);
      s.d.L(x, U, {
        crossOrigin: M,
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
  }, it.preloadModule = function(x, _) {
    if (typeof x == "string")
      if (_) {
        var U = C(_.as, _.crossOrigin);
        s.d.m(x, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else s.d.m(x);
  }, it.requestFormReset = function(x) {
    s.d.r(x);
  }, it.unstable_batchedUpdates = function(x, _) {
    return x(_);
  }, it.useFormState = function(x, _, U) {
    return z.H.useFormState(x, _, U);
  }, it.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, it.version = "19.2.6", it;
}
var xm;
function R0() {
  if (xm) return Pf.exports;
  xm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), Pf.exports = M0(), Pf.exports;
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
function U0() {
  if (Om) return eu;
  Om = 1;
  var c = D0(), y = Mi(), d = R0();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function D(l) {
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
  function z(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function C(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function x(l) {
    if (R(l) !== l)
      throw Error(s(188));
  }
  function _(l) {
    var t = l.alternate;
    if (!t) {
      if (t = R(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
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
          if (u === e) return x(n), l;
          if (u === a) return x(n), t;
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
    return e.stateNode.current === e ? l : t;
  }
  function U(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = U(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var M = Object.assign, O = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), fl = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), _l = Symbol.for("react.context"), xl = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), dl = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), ft = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function Ol(l) {
    return l === null || typeof l != "object" ? null : (l = W && l[W] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var st = Symbol.for("react.client.reference");
  function Xl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === st ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case w:
        return "Fragment";
      case fl:
        return "Profiler";
      case I:
        return "StrictMode";
      case gl:
        return "Suspense";
      case dl:
        return "SuspenseList";
      case sl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Q:
          return "Portal";
        case _l:
          return l.displayName || "Context";
        case L:
          return (l._context.displayName || "Context") + ".Consumer";
        case xl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case $:
          return t = l.displayName || null, t !== null ? t : Xl(l.type) || "Memo";
        case ql:
          t = l._payload, l = l._init;
          try {
            return Xl(l(t));
          } catch {
          }
      }
    return null;
  }
  var Il = Array.isArray, E = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, hl = [], rl = -1;
  function v(l) {
    return { current: l };
  }
  function A(l) {
    0 > rl || (l.current = hl[rl], hl[rl] = null, rl--);
  }
  function q(l, t) {
    rl++, hl[rl] = l.current, l.current = t;
  }
  var Y = v(null), F = v(null), P = v(null), el = v(null);
  function Ql(l, t) {
    switch (q(P, t), q(F, l), q(Y, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Ld(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Ld(t), l = Zd(t, l);
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
    A(Y), q(Y, l);
  }
  function Bl() {
    A(Y), A(F), A(P);
  }
  function be(l) {
    l.memoizedState !== null && q(el, l);
    var t = Y.current, e = Zd(t, l.type);
    t !== e && (q(F, l), q(Y, e));
  }
  function We(l) {
    F.current === l && (A(Y), A(F)), el.current === l && (A(el), kn._currentValue = Z);
  }
  var cn, fu;
  function Et(l) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        cn = t && t[1] || "", fu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + l + fu;
  }
  var ga = !1;
  function su(l, t) {
    if (!l || ga) return "";
    ga = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var j = function() {
                throw Error();
              };
              if (Object.defineProperty(j.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(j, []);
                } catch (p) {
                  var b = p;
                }
                Reflect.construct(l, [], j);
              } else {
                try {
                  j.call();
                } catch (p) {
                  b = p;
                }
                l.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                b = p;
              }
              (j = l()) && typeof j.catch == "function" && j.catch(function() {
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
                  var T = `
` + r[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ga = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Et(e) : "";
  }
  function El(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Et(l.type);
      case 16:
        return Et("Lazy");
      case 13:
        return l.child !== t && t !== null ? Et("Suspense Fallback") : Et("Suspense");
      case 19:
        return Et("SuspenseList");
      case 0:
      case 15:
        return su(l.type, !1);
      case 11:
        return su(l.type.render, !1);
      case 1:
        return su(l.type, !0);
      case 31:
        return Et("Activity");
      default:
        return "";
    }
  }
  function Cl(l) {
    try {
      var t = "", e = null;
      do
        t += El(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var jl = Object.prototype.hasOwnProperty, Dl = c.unstable_scheduleCallback, dt = c.unstable_cancelCallback, mt = c.unstable_shouldYield, Vl = c.unstable_requestPaint, Ml = c.unstable_now, Fe = c.unstable_getCurrentPriorityLevel, pe = c.unstable_ImmediatePriority, fn = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, vt = c.unstable_LowPriority, Rt = c.unstable_IdlePriority, sn = c.log, Ci = c.unstable_setDisableYieldValue, kt = null, Tt = null;
  function _e(l) {
    if (typeof sn == "function" && Ci(l), Tt && typeof Tt.setStrictMode == "function")
      try {
        Tt.setStrictMode(kt, l);
      } catch {
      }
  }
  var zt = Math.clz32 ? Math.clz32 : rv, sv = Math.log, ov = Math.LN2;
  function rv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (sv(l) / ov | 0) | 0;
  }
  var ou = 256, ru = 262144, du = 4194304;
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
  function mu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Ie(a) : (i &= f, i !== 0 ? n = Ie(i) : e || (e = f & ~l, e !== 0 && (n = Ie(e))))) : (f = a & ~u, f !== 0 ? n = Ie(f) : i !== 0 ? n = Ie(i) : e || (e = a & ~l, e !== 0 && (n = Ie(e)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, e = t & -t, u >= e || u === 32 && (e & 4194048) !== 0) ? t : n;
  }
  function on(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function dv(l, t) {
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
  function Ts() {
    var l = du;
    return du <<= 1, (du & 62914560) === 0 && (du = 4194304), l;
  }
  function Hi(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function rn(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function mv(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var f = l.entanglements, r = l.expirationTimes, S = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - zt(e), j = 1 << T;
      f[T] = 0, r[T] = -1;
      var b = S[T];
      if (b !== null)
        for (S[T] = null, T = 0; T < b.length; T++) {
          var p = b[T];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~j;
    }
    a !== 0 && zs(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t));
  }
  function zs(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - zt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Ns(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - zt(e), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), e &= ~n;
    }
  }
  function As(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : qi(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function qi(l) {
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
  function Bi(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function xs() {
    var l = B.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : mm(l.type));
  }
  function Os(l, t) {
    var e = B.p;
    try {
      return B.p = l, t();
    } finally {
      B.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), tt = "__reactFiber$" + Ee, ht = "__reactProps$" + Ee, Sa = "__reactContainer$" + Ee, Yi = "__reactEvents$" + Ee, vv = "__reactListeners$" + Ee, hv = "__reactHandles$" + Ee, js = "__reactResources$" + Ee, dn = "__reactMarker$" + Ee;
  function Gi(l) {
    delete l[tt], delete l[ht], delete l[Yi], delete l[vv], delete l[hv];
  }
  function ba(l) {
    var t = l[tt];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Sa] || e[tt]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = kd(l); l !== null; ) {
            if (e = l[tt]) return e;
            l = kd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function pa(l) {
    if (l = l[tt] || l[Sa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function mn(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function _a(l) {
    var t = l[js];
    return t || (t = l[js] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Pl(l) {
    l[dn] = !0;
  }
  var Ds = /* @__PURE__ */ new Set(), Ms = {};
  function Pe(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (Ms[l] = t, l = 0; l < t.length; l++)
      Ds.add(t[l]);
  }
  var yv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Rs = {}, Us = {};
  function gv(l) {
    return jl.call(Us, l) ? !0 : jl.call(Rs, l) ? !1 : yv.test(l) ? Us[l] = !0 : (Rs[l] = !0, !1);
  }
  function vu(l, t, e) {
    if (gv(t))
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
  function hu(l, t, e) {
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
  function It(l, t, e, a) {
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
  function Ut(l) {
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
  function Cs(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Sv(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
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
  function Xi(l) {
    if (!l._valueTracker) {
      var t = Cs(l) ? "checked" : "value";
      l._valueTracker = Sv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Hs(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Cs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function yu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var bv = /[\n"\\]/g;
  function Ct(l) {
    return l.replace(
      bv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qi(l, t, e, a, n, u, i, f) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Ut(t)) : l.value !== "" + Ut(t) && (l.value = "" + Ut(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Vi(l, i, Ut(t)) : e != null ? Vi(l, i, Ut(e)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + Ut(f) : l.removeAttribute("name");
  }
  function qs(l, t, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), t != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Xi(l);
        return;
      }
      e = e != null ? "" + Ut(e) : "", t = t != null ? "" + Ut(t) : e, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Xi(l);
  }
  function Vi(l, t, e) {
    t === "number" && yu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ta(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < e.length; n++)
        t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        n = t.hasOwnProperty("$" + l[e].value), l[e].selected !== n && (l[e].selected = n), n && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Ut(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Bs(l, t, e) {
    if (t != null && (t = "" + Ut(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Ut(e) : "";
  }
  function Ys(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Il(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Ut(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Xi(l);
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
  var pv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Gs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || pv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Xs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && e[n] !== a && Gs(l, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Gs(l, u, t[u]);
  }
  function Li(l) {
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
  var _v = /* @__PURE__ */ new Map([
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
  ]), Ev = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function gu(l) {
    return Ev.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Pt() {
  }
  var Zi = null;
  function Ki(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Na = null, Aa = null;
  function Qs(l) {
    var t = pa(l);
    if (t && (l = t.stateNode)) {
      var e = l[ht] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Qi(
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
              'input[name="' + Ct(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var n = a[ht] || null;
                if (!n) throw Error(s(90));
                Qi(
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
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Hs(a);
          }
          break l;
        case "textarea":
          Bs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ta(l, !!e.multiple, t, !1);
      }
    }
  }
  var Ji = !1;
  function Vs(l, t, e) {
    if (Ji) return l(t, e);
    Ji = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Ji = !1, (Na !== null || Aa !== null) && (ni(), Na && (t = Na, l = Aa, Aa = Na = null, Qs(t), l)))
        for (t = 0; t < l.length; t++) Qs(l[t]);
    }
  }
  function vn(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[ht] || null;
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
  var le = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wi = !1;
  if (le)
    try {
      var hn = {};
      Object.defineProperty(hn, "passive", {
        get: function() {
          wi = !0;
        }
      }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
    } catch {
      wi = !1;
    }
  var Te = null, $i = null, Su = null;
  function Ls() {
    if (Su) return Su;
    var l, t = $i, e = t.length, a, n = "value" in Te ? Te.value : Te.textContent, u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++) ;
    return Su = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function bu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function pu() {
    return !0;
  }
  function Zs() {
    return !1;
  }
  function yt(l) {
    function t(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in l)
        l.hasOwnProperty(f) && (e = l[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? pu : Zs, this.isPropagationStopped = Zs, this;
    }
    return M(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = pu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = pu);
      },
      persist: function() {
      },
      isPersistent: pu
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
  }, _u = yt(la), yn = M({}, la, { view: 0, detail: 0 }), Tv = yt(yn), Wi, Fi, gn, Eu = M({}, yn, {
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
    getModifierState: Ii,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== gn && (gn && l.type === "mousemove" ? (Wi = l.screenX - gn.screenX, Fi = l.screenY - gn.screenY) : Fi = Wi = 0, gn = l), Wi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Fi;
    }
  }), Ks = yt(Eu), zv = M({}, Eu, { dataTransfer: 0 }), Nv = yt(zv), Av = M({}, yn, { relatedTarget: 0 }), ki = yt(Av), xv = M({}, la, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = yt(xv), jv = M({}, la, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Dv = yt(jv), Mv = M({}, la, { data: 0 }), Js = yt(Mv), Rv = {
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
  }, Uv = {
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
  }, Cv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Hv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Cv[l]) ? !!t[l] : !1;
  }
  function Ii() {
    return Hv;
  }
  var qv = M({}, yn, {
    key: function(l) {
      if (l.key) {
        var t = Rv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = bu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Uv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ii,
    charCode: function(l) {
      return l.type === "keypress" ? bu(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? bu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Bv = yt(qv), Yv = M({}, Eu, {
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
  }), ws = yt(Yv), Gv = M({}, yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ii
  }), Xv = yt(Gv), Qv = M({}, la, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vv = yt(Qv), Lv = M({}, Eu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zv = yt(Lv), Kv = M({}, la, {
    newState: 0,
    oldState: 0
  }), Jv = yt(Kv), wv = [9, 13, 27, 32], Pi = le && "CompositionEvent" in window, Sn = null;
  le && "documentMode" in document && (Sn = document.documentMode);
  var $v = le && "TextEvent" in window && !Sn, $s = le && (!Pi || Sn && 8 < Sn && 11 >= Sn), Ws = " ", Fs = !1;
  function ks(l, t) {
    switch (l) {
      case "keyup":
        return wv.indexOf(t.keyCode) !== -1;
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
  function Is(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var xa = !1;
  function Wv(l, t) {
    switch (l) {
      case "compositionend":
        return Is(t);
      case "keypress":
        return t.which !== 32 ? null : (Fs = !0, Ws);
      case "textInput":
        return l = t.data, l === Ws && Fs ? null : l;
      default:
        return null;
    }
  }
  function Fv(l, t) {
    if (xa)
      return l === "compositionend" || !Pi && ks(l, t) ? (l = Ls(), Su = $i = Te = null, xa = !1, l) : null;
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
        return $s && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var kv = {
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
  function Ps(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!kv[l.type] : t === "textarea";
  }
  function lo(l, t, e, a) {
    Na ? Aa ? Aa.push(a) : Aa = [a] : Na = a, t = ri(t, "onChange"), 0 < t.length && (e = new _u(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var bn = null, pn = null;
  function Iv(l) {
    Bd(l, 0);
  }
  function Tu(l) {
    var t = mn(l);
    if (Hs(t)) return l;
  }
  function to(l, t) {
    if (l === "change") return t;
  }
  var eo = !1;
  if (le) {
    var lc;
    if (le) {
      var tc = "oninput" in document;
      if (!tc) {
        var ao = document.createElement("div");
        ao.setAttribute("oninput", "return;"), tc = typeof ao.oninput == "function";
      }
      lc = tc;
    } else lc = !1;
    eo = lc && (!document.documentMode || 9 < document.documentMode);
  }
  function no() {
    bn && (bn.detachEvent("onpropertychange", uo), pn = bn = null);
  }
  function uo(l) {
    if (l.propertyName === "value" && Tu(pn)) {
      var t = [];
      lo(
        t,
        pn,
        l,
        Ki(l)
      ), Vs(Iv, t);
    }
  }
  function Pv(l, t, e) {
    l === "focusin" ? (no(), bn = t, pn = e, bn.attachEvent("onpropertychange", uo)) : l === "focusout" && no();
  }
  function lh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Tu(pn);
  }
  function th(l, t) {
    if (l === "click") return Tu(t);
  }
  function eh(l, t) {
    if (l === "input" || l === "change")
      return Tu(t);
  }
  function ah(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Nt = typeof Object.is == "function" ? Object.is : ah;
  function _n(l, t) {
    if (Nt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!jl.call(t, n) || !Nt(l[n], t[n]))
        return !1;
    }
    return !0;
  }
  function io(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function co(l, t) {
    var e = io(l);
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
      e = io(e);
    }
  }
  function fo(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? fo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function so(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = yu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = yu(l.document);
    }
    return t;
  }
  function ec(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var nh = le && "documentMode" in document && 11 >= document.documentMode, Oa = null, ac = null, En = null, nc = !1;
  function oo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    nc || Oa == null || Oa !== yu(a) || (a = Oa, "selectionStart" in a && ec(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), En && _n(En, a) || (En = a, a = ri(ac, "onSelect"), 0 < a.length && (t = new _u(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Oa)));
  }
  function ta(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ja = {
    animationend: ta("Animation", "AnimationEnd"),
    animationiteration: ta("Animation", "AnimationIteration"),
    animationstart: ta("Animation", "AnimationStart"),
    transitionrun: ta("Transition", "TransitionRun"),
    transitionstart: ta("Transition", "TransitionStart"),
    transitioncancel: ta("Transition", "TransitionCancel"),
    transitionend: ta("Transition", "TransitionEnd")
  }, uc = {}, ro = {};
  le && (ro = document.createElement("div").style, "AnimationEvent" in window || (delete ja.animationend.animation, delete ja.animationiteration.animation, delete ja.animationstart.animation), "TransitionEvent" in window || delete ja.transitionend.transition);
  function ea(l) {
    if (uc[l]) return uc[l];
    if (!ja[l]) return l;
    var t = ja[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in ro)
        return uc[l] = t[e];
    return l;
  }
  var mo = ea("animationend"), vo = ea("animationiteration"), ho = ea("animationstart"), uh = ea("transitionrun"), ih = ea("transitionstart"), ch = ea("transitioncancel"), yo = ea("transitionend"), go = /* @__PURE__ */ new Map(), ic = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ic.push("scrollEnd");
  function Lt(l, t) {
    go.set(l, t), Pe(t, [l]);
  }
  var zu = typeof reportError == "function" ? reportError : function(l) {
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
  }, Ht = [], Da = 0, cc = 0;
  function Nu() {
    for (var l = Da, t = cc = Da = 0; t < l; ) {
      var e = Ht[t];
      Ht[t++] = null;
      var a = Ht[t];
      Ht[t++] = null;
      var n = Ht[t];
      Ht[t++] = null;
      var u = Ht[t];
      if (Ht[t++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && So(e, n, u);
    }
  }
  function Au(l, t, e, a) {
    Ht[Da++] = l, Ht[Da++] = t, Ht[Da++] = e, Ht[Da++] = a, cc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function fc(l, t, e, a) {
    return Au(l, t, e, a), xu(l);
  }
  function aa(l, t) {
    return Au(l, null, null, t), xu(l);
  }
  function So(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && t !== null && (n = 31 - zt(e), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = e | 536870912), u) : null;
  }
  function xu(l) {
    if (50 < Zn)
      throw Zn = 0, Sf = null, Error(s(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ma = {};
  function fh(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function At(l, t, e, a) {
    return new fh(l, t, e, a);
  }
  function sc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function te(l, t) {
    var e = l.alternate;
    return e === null ? (e = At(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function bo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Ou(l, t, e, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") sc(l) && (i = 1);
    else if (typeof l == "string")
      i = m0(
        l,
        e,
        Y.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case sl:
          return l = At(31, e, t, n), l.elementType = sl, l.lanes = u, l;
        case w:
          return na(e.children, n, u, t);
        case I:
          i = 8, n |= 24;
          break;
        case fl:
          return l = At(12, e, t, n | 2), l.elementType = fl, l.lanes = u, l;
        case gl:
          return l = At(13, e, t, n), l.elementType = gl, l.lanes = u, l;
        case dl:
          return l = At(19, e, t, n), l.elementType = dl, l.lanes = u, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case _l:
                i = 10;
                break l;
              case L:
                i = 9;
                break l;
              case xl:
                i = 11;
                break l;
              case $:
                i = 14;
                break l;
              case ql:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            s(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = At(i, e, t, n), t.elementType = l, t.type = a, t.lanes = u, t;
  }
  function na(l, t, e, a) {
    return l = At(7, l, a, t), l.lanes = e, l;
  }
  function oc(l, t, e) {
    return l = At(6, l, null, t), l.lanes = e, l;
  }
  function po(l) {
    var t = At(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function rc(l, t, e) {
    return t = At(
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
  var _o = /* @__PURE__ */ new WeakMap();
  function qt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = _o.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Cl(t)
      }, _o.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Cl(t)
    };
  }
  var Ra = [], Ua = 0, ju = null, Tn = 0, Bt = [], Yt = 0, ze = null, Jt = 1, wt = "";
  function ee(l, t) {
    Ra[Ua++] = Tn, Ra[Ua++] = ju, ju = l, Tn = t;
  }
  function Eo(l, t, e) {
    Bt[Yt++] = Jt, Bt[Yt++] = wt, Bt[Yt++] = ze, ze = l;
    var a = Jt;
    l = wt;
    var n = 32 - zt(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - zt(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Jt = 1 << 32 - zt(t) + n | e << n | a, wt = u + l;
    } else
      Jt = 1 << u | e << n | a, wt = l;
  }
  function dc(l) {
    l.return !== null && (ee(l, 1), Eo(l, 1, 0));
  }
  function mc(l) {
    for (; l === ju; )
      ju = Ra[--Ua], Ra[Ua] = null, Tn = Ra[--Ua], Ra[Ua] = null;
    for (; l === ze; )
      ze = Bt[--Yt], Bt[Yt] = null, wt = Bt[--Yt], Bt[Yt] = null, Jt = Bt[--Yt], Bt[Yt] = null;
  }
  function To(l, t) {
    Bt[Yt++] = Jt, Bt[Yt++] = wt, Bt[Yt++] = ze, Jt = t.id, wt = t.overflow, ze = l;
  }
  var et = null, Rl = null, ol = !1, Ne = null, Gt = !1, vc = Error(s(519));
  function Ae(l) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw zn(qt(t, l)), vc;
  }
  function zo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[tt] = l, t[ht] = a, e) {
      case "dialog":
        nl("cancel", t), nl("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        nl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Jn.length; e++)
          nl(Jn[e], t);
        break;
      case "source":
        nl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        nl("error", t), nl("load", t);
        break;
      case "details":
        nl("toggle", t);
        break;
      case "input":
        nl("invalid", t), qs(
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
        nl("invalid", t);
        break;
      case "textarea":
        nl("invalid", t), Ys(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Qd(t.textContent, e) ? (a.popover != null && (nl("beforetoggle", t), nl("toggle", t)), a.onScroll != null && nl("scroll", t), a.onScrollEnd != null && nl("scrollend", t), a.onClick != null && (t.onclick = Pt), t = !0) : t = !1, t || Ae(l, !0);
  }
  function No(l) {
    for (et = l.return; et; )
      switch (et.tag) {
        case 5:
        case 31:
        case 13:
          Gt = !1;
          return;
        case 27:
        case 3:
          Gt = !0;
          return;
        default:
          et = et.return;
      }
  }
  function Ca(l) {
    if (l !== et) return !1;
    if (!ol) return No(l), ol = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Uf(l.type, l.memoizedProps)), e = !e), e && Rl && Ae(l), No(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Rl = Fd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Rl = Fd(l);
    } else
      t === 27 ? (t = Rl, Xe(l.type) ? (l = Yf, Yf = null, Rl = l) : Rl = t) : Rl = et ? Qt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ua() {
    Rl = et = null, ol = !1;
  }
  function hc() {
    var l = Ne;
    return l !== null && (pt === null ? pt = l : pt.push.apply(
      pt,
      l
    ), Ne = null), l;
  }
  function zn(l) {
    Ne === null ? Ne = [l] : Ne.push(l);
  }
  var yc = v(null), ia = null, ae = null;
  function xe(l, t, e) {
    q(yc, t._currentValue), t._currentValue = e;
  }
  function ne(l) {
    l._currentValue = yc.current, A(yc);
  }
  function gc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Sc(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var r = 0; r < t.length; r++)
            if (f.context === t[r]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), gc(
                u.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(s(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), gc(i, e, l), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === l) {
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
  function Ha(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          Nt(n.pendingProps.value, i.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (n === el.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(kn) : l = [kn]);
      }
      n = n.return;
    }
    l !== null && Sc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Du(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Nt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ca(l) {
    ia = l, ae = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function at(l) {
    return Ao(ia, l);
  }
  function Mu(l, t) {
    return ia === null && ca(l), Ao(l, t);
  }
  function Ao(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, ae === null) {
      if (l === null) throw Error(s(308));
      ae = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else ae = ae.next = t;
    return e;
  }
  var sh = typeof AbortController < "u" ? AbortController : function() {
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
  }, oh = c.unstable_scheduleCallback, rh = c.unstable_NormalPriority, Jl = {
    $$typeof: _l,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function bc() {
    return {
      controller: new sh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Nn(l) {
    l.refCount--, l.refCount === 0 && oh(rh, function() {
      l.controller.abort();
    });
  }
  var An = null, pc = 0, qa = 0, Ba = null;
  function dh(l, t) {
    if (An === null) {
      var e = An = [];
      pc = 0, qa = zf(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return pc++, t.then(xo, xo), t;
  }
  function xo() {
    if (--pc === 0 && An !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var l = An;
      An = null, qa = 0, Ba = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function mh(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < e.length; n++) (0, e[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var Oo = E.S;
  E.S = function(l, t) {
    rd = Ml(), typeof t == "object" && t !== null && typeof t.then == "function" && dh(l, t), Oo !== null && Oo(l, t);
  };
  var fa = v(null);
  function _c() {
    var l = fa.current;
    return l !== null ? l : Al.pooledCache;
  }
  function Ru(l, t) {
    t === null ? q(fa, fa.current) : q(fa, t.pool);
  }
  function jo() {
    var l = _c();
    return l === null ? null : { parent: Jl._currentValue, pool: l };
  }
  var Ya = Error(s(460)), Ec = Error(s(474)), Uu = Error(s(542)), Cu = { then: function() {
  } };
  function Do(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Mo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Pt, Pt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Uo(l), l;
      default:
        if (typeof t.status == "string") t.then(Pt, Pt);
        else {
          if (l = Al, l !== null && 100 < l.shellSuspendCounter)
            throw Error(s(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Uo(l), l;
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
  function Ro() {
    if (oa === null) throw Error(s(459));
    var l = oa;
    return oa = null, l;
  }
  function Uo(l) {
    if (l === Ya || l === Uu)
      throw Error(s(483));
  }
  var Ga = null, xn = 0;
  function Hu(l) {
    var t = xn;
    return xn += 1, Ga === null && (Ga = []), Mo(Ga, l, t);
  }
  function On(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function qu(l, t) {
    throw t.$$typeof === O ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(
      s(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Co(l) {
    function t(h, m) {
      if (l) {
        var g = h.deletions;
        g === null ? (h.deletions = [m], h.flags |= 16) : g.push(m);
      }
    }
    function e(h, m) {
      if (!l) return null;
      for (; m !== null; )
        t(h, m), m = m.sibling;
      return null;
    }
    function a(h) {
      for (var m = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
      return m;
    }
    function n(h, m) {
      return h = te(h, m), h.index = 0, h.sibling = null, h;
    }
    function u(h, m, g) {
      return h.index = g, l ? (g = h.alternate, g !== null ? (g = g.index, g < m ? (h.flags |= 67108866, m) : g) : (h.flags |= 67108866, m)) : (h.flags |= 1048576, m);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function f(h, m, g, N) {
      return m === null || m.tag !== 6 ? (m = oc(g, h.mode, N), m.return = h, m) : (m = n(m, g), m.return = h, m);
    }
    function r(h, m, g, N) {
      var V = g.type;
      return V === w ? T(
        h,
        m,
        g.props.children,
        N,
        g.key
      ) : m !== null && (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === ql && sa(V) === m.type) ? (m = n(m, g.props), On(m, g), m.return = h, m) : (m = Ou(
        g.type,
        g.key,
        g.props,
        null,
        h.mode,
        N
      ), On(m, g), m.return = h, m);
    }
    function S(h, m, g, N) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== g.containerInfo || m.stateNode.implementation !== g.implementation ? (m = rc(g, h.mode, N), m.return = h, m) : (m = n(m, g.children || []), m.return = h, m);
    }
    function T(h, m, g, N, V) {
      return m === null || m.tag !== 7 ? (m = na(
        g,
        h.mode,
        N,
        V
      ), m.return = h, m) : (m = n(m, g), m.return = h, m);
    }
    function j(h, m, g) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = oc(
          "" + m,
          h.mode,
          g
        ), m.return = h, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case H:
            return g = Ou(
              m.type,
              m.key,
              m.props,
              null,
              h.mode,
              g
            ), On(g, m), g.return = h, g;
          case Q:
            return m = rc(
              m,
              h.mode,
              g
            ), m.return = h, m;
          case ql:
            return m = sa(m), j(h, m, g);
        }
        if (Il(m) || Ol(m))
          return m = na(
            m,
            h.mode,
            g,
            null
          ), m.return = h, m;
        if (typeof m.then == "function")
          return j(h, Hu(m), g);
        if (m.$$typeof === _l)
          return j(
            h,
            Mu(h, m),
            g
          );
        qu(h, m);
      }
      return null;
    }
    function b(h, m, g, N) {
      var V = m !== null ? m.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return V !== null ? null : f(h, m, "" + g, N);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case H:
            return g.key === V ? r(h, m, g, N) : null;
          case Q:
            return g.key === V ? S(h, m, g, N) : null;
          case ql:
            return g = sa(g), b(h, m, g, N);
        }
        if (Il(g) || Ol(g))
          return V !== null ? null : T(h, m, g, N, null);
        if (typeof g.then == "function")
          return b(
            h,
            m,
            Hu(g),
            N
          );
        if (g.$$typeof === _l)
          return b(
            h,
            m,
            Mu(h, g),
            N
          );
        qu(h, g);
      }
      return null;
    }
    function p(h, m, g, N, V) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return h = h.get(g) || null, f(m, h, "" + N, V);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case H:
            return h = h.get(
              N.key === null ? g : N.key
            ) || null, r(m, h, N, V);
          case Q:
            return h = h.get(
              N.key === null ? g : N.key
            ) || null, S(m, h, N, V);
          case ql:
            return N = sa(N), p(
              h,
              m,
              g,
              N,
              V
            );
        }
        if (Il(N) || Ol(N))
          return h = h.get(g) || null, T(m, h, N, V, null);
        if (typeof N.then == "function")
          return p(
            h,
            m,
            g,
            Hu(N),
            V
          );
        if (N.$$typeof === _l)
          return p(
            h,
            m,
            g,
            Mu(m, N),
            V
          );
        qu(m, N);
      }
      return null;
    }
    function G(h, m, g, N) {
      for (var V = null, ml = null, X = m, tl = m = 0, il = null; X !== null && tl < g.length; tl++) {
        X.index > tl ? (il = X, X = null) : il = X.sibling;
        var vl = b(
          h,
          X,
          g[tl],
          N
        );
        if (vl === null) {
          X === null && (X = il);
          break;
        }
        l && X && vl.alternate === null && t(h, X), m = u(vl, m, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl, X = il;
      }
      if (tl === g.length)
        return e(h, X), ol && ee(h, tl), V;
      if (X === null) {
        for (; tl < g.length; tl++)
          X = j(h, g[tl], N), X !== null && (m = u(
            X,
            m,
            tl
          ), ml === null ? V = X : ml.sibling = X, ml = X);
        return ol && ee(h, tl), V;
      }
      for (X = a(X); tl < g.length; tl++)
        il = p(
          X,
          h,
          tl,
          g[tl],
          N
        ), il !== null && (l && il.alternate !== null && X.delete(
          il.key === null ? tl : il.key
        ), m = u(
          il,
          m,
          tl
        ), ml === null ? V = il : ml.sibling = il, ml = il);
      return l && X.forEach(function(Ke) {
        return t(h, Ke);
      }), ol && ee(h, tl), V;
    }
    function K(h, m, g, N) {
      if (g == null) throw Error(s(151));
      for (var V = null, ml = null, X = m, tl = m = 0, il = null, vl = g.next(); X !== null && !vl.done; tl++, vl = g.next()) {
        X.index > tl ? (il = X, X = null) : il = X.sibling;
        var Ke = b(h, X, vl.value, N);
        if (Ke === null) {
          X === null && (X = il);
          break;
        }
        l && X && Ke.alternate === null && t(h, X), m = u(Ke, m, tl), ml === null ? V = Ke : ml.sibling = Ke, ml = Ke, X = il;
      }
      if (vl.done)
        return e(h, X), ol && ee(h, tl), V;
      if (X === null) {
        for (; !vl.done; tl++, vl = g.next())
          vl = j(h, vl.value, N), vl !== null && (m = u(vl, m, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl);
        return ol && ee(h, tl), V;
      }
      for (X = a(X); !vl.done; tl++, vl = g.next())
        vl = p(X, h, tl, vl.value, N), vl !== null && (l && vl.alternate !== null && X.delete(vl.key === null ? tl : vl.key), m = u(vl, m, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl);
      return l && X.forEach(function(z0) {
        return t(h, z0);
      }), ol && ee(h, tl), V;
    }
    function Nl(h, m, g, N) {
      if (typeof g == "object" && g !== null && g.type === w && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case H:
            l: {
              for (var V = g.key; m !== null; ) {
                if (m.key === V) {
                  if (V = g.type, V === w) {
                    if (m.tag === 7) {
                      e(
                        h,
                        m.sibling
                      ), N = n(
                        m,
                        g.props.children
                      ), N.return = h, h = N;
                      break l;
                    }
                  } else if (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === ql && sa(V) === m.type) {
                    e(
                      h,
                      m.sibling
                    ), N = n(m, g.props), On(N, g), N.return = h, h = N;
                    break l;
                  }
                  e(h, m);
                  break;
                } else t(h, m);
                m = m.sibling;
              }
              g.type === w ? (N = na(
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
              ), On(N, g), N.return = h, h = N);
            }
            return i(h);
          case Q:
            l: {
              for (V = g.key; m !== null; ) {
                if (m.key === V)
                  if (m.tag === 4 && m.stateNode.containerInfo === g.containerInfo && m.stateNode.implementation === g.implementation) {
                    e(
                      h,
                      m.sibling
                    ), N = n(m, g.children || []), N.return = h, h = N;
                    break l;
                  } else {
                    e(h, m);
                    break;
                  }
                else t(h, m);
                m = m.sibling;
              }
              N = rc(g, h.mode, N), N.return = h, h = N;
            }
            return i(h);
          case ql:
            return g = sa(g), Nl(
              h,
              m,
              g,
              N
            );
        }
        if (Il(g))
          return G(
            h,
            m,
            g,
            N
          );
        if (Ol(g)) {
          if (V = Ol(g), typeof V != "function") throw Error(s(150));
          return g = V.call(g), K(
            h,
            m,
            g,
            N
          );
        }
        if (typeof g.then == "function")
          return Nl(
            h,
            m,
            Hu(g),
            N
          );
        if (g.$$typeof === _l)
          return Nl(
            h,
            m,
            Mu(h, g),
            N
          );
        qu(h, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, m !== null && m.tag === 6 ? (e(h, m.sibling), N = n(m, g), N.return = h, h = N) : (e(h, m), N = oc(g, h.mode, N), N.return = h, h = N), i(h)) : e(h, m);
    }
    return function(h, m, g, N) {
      try {
        xn = 0;
        var V = Nl(
          h,
          m,
          g,
          N
        );
        return Ga = null, V;
      } catch (X) {
        if (X === Ya || X === Uu) throw X;
        var ml = At(29, X, null, h.mode);
        return ml.lanes = N, ml.return = h, ml;
      } finally {
      }
    };
  }
  var ra = Co(!0), Ho = Co(!1), Oe = !1;
  function Tc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function zc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function je(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function De(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (yl & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = xu(l), So(l, null, e), t;
    }
    return Au(l, a, t, e), xu(l);
  }
  function jn(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ns(l, e);
    }
  }
  function Nc(l, t) {
    var e = l.updateQueue, a = l.alternate;
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
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Ac = !1;
  function Dn() {
    if (Ac) {
      var l = Ba;
      if (l !== null) throw l;
    }
  }
  function Mn(l, t, e, a) {
    Ac = !1;
    var n = l.updateQueue;
    Oe = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var r = f, S = r.next;
      r.next = null, i === null ? u = S : i.next = S, i = r;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = S : f.next = S, T.lastBaseUpdate = r));
    }
    if (u !== null) {
      var j = n.baseState;
      i = 0, T = S = r = null, f = u;
      do {
        var b = f.lane & -536870913, p = b !== f.lane;
        if (p ? (ul & b) === b : (a & b) === b) {
          b !== 0 && b === qa && (Ac = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          l: {
            var G = l, K = f;
            b = t;
            var Nl = e;
            switch (K.tag) {
              case 1:
                if (G = K.payload, typeof G == "function") {
                  j = G.call(Nl, j, b);
                  break l;
                }
                j = G;
                break l;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = K.payload, b = typeof G == "function" ? G.call(Nl, j, b) : G, b == null) break l;
                j = M({}, j, b);
                break l;
              case 2:
                Oe = !0;
            }
          }
          b = f.callback, b !== null && (l.flags |= 64, p && (l.flags |= 8192), p = n.callbacks, p === null ? n.callbacks = [b] : p.push(b));
        } else
          p = {
            lane: b,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, T === null ? (S = T = p, r = j) : T = T.next = p, i |= b;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          p = f, f = p.next, p.next = null, n.lastBaseUpdate = p, n.shared.pending = null;
        }
      } while (!0);
      T === null && (r = j), n.baseState = r, n.firstBaseUpdate = S, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), He |= i, l.lanes = i, l.memoizedState = j;
    }
  }
  function qo(l, t) {
    if (typeof l != "function")
      throw Error(s(191, l));
    l.call(t);
  }
  function Bo(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        qo(e[l], t);
  }
  var Xa = v(null), Bu = v(0);
  function Yo(l, t) {
    l = me, q(Bu, l), q(Xa, t), me = l | t.baseLanes;
  }
  function xc() {
    q(Bu, me), q(Xa, Xa.current);
  }
  function Oc() {
    me = Bu.current, A(Xa), A(Bu);
  }
  var xt = v(null), Xt = null;
  function Me(l) {
    var t = l.alternate;
    q(Ll, Ll.current & 1), q(xt, l), Xt === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (Xt = l);
  }
  function jc(l) {
    q(Ll, Ll.current), q(xt, l), Xt === null && (Xt = l);
  }
  function Go(l) {
    l.tag === 22 ? (q(Ll, Ll.current), q(xt, l), Xt === null && (Xt = l)) : Re();
  }
  function Re() {
    q(Ll, Ll.current), q(xt, xt.current);
  }
  function Ot(l) {
    A(xt), Xt === l && (Xt = null), A(Ll);
  }
  var Ll = v(0);
  function Yu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || qf(e) || Bf(e)))
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
  var ue = 0, ll = null, Tl = null, wl = null, Gu = !1, Qa = !1, da = !1, Xu = 0, Rn = 0, Va = null, vh = 0;
  function Yl() {
    throw Error(s(321));
  }
  function Dc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!Nt(l[e], t[e])) return !1;
    return !0;
  }
  function Mc(l, t, e, a, n, u) {
    return ue = u, ll = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? Er : Jc, da = !1, u = e(a, n), da = !1, Qa && (u = Qo(
      t,
      e,
      a,
      n
    )), Xo(l), u;
  }
  function Xo(l) {
    E.H = Hn;
    var t = Tl !== null && Tl.next !== null;
    if (ue = 0, wl = Tl = ll = null, Gu = !1, Rn = 0, Va = null, t) throw Error(s(300));
    l === null || $l || (l = l.dependencies, l !== null && Du(l) && ($l = !0));
  }
  function Qo(l, t, e, a) {
    ll = l;
    var n = 0;
    do {
      if (Qa && (Va = null), Rn = 0, Qa = !1, 25 <= n) throw Error(s(301));
      if (n += 1, wl = Tl = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      E.H = Tr, u = t(e, a);
    } while (Qa);
    return u;
  }
  function hh() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Un(t) : t, l = l.useState()[0], (Tl !== null ? Tl.memoizedState : null) !== l && (ll.flags |= 1024), t;
  }
  function Rc() {
    var l = Xu !== 0;
    return Xu = 0, l;
  }
  function Uc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Cc(l) {
    if (Gu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Gu = !1;
    }
    ue = 0, wl = Tl = ll = null, Qa = !1, Rn = Xu = 0, Va = null;
  }
  function ot() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return wl === null ? ll.memoizedState = wl = l : wl = wl.next = l, wl;
  }
  function Zl() {
    if (Tl === null) {
      var l = ll.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Tl.next;
    var t = wl === null ? ll.memoizedState : wl.next;
    if (t !== null)
      wl = t, Tl = l;
    else {
      if (l === null)
        throw ll.alternate === null ? Error(s(467)) : Error(s(310));
      Tl = l, l = {
        memoizedState: Tl.memoizedState,
        baseState: Tl.baseState,
        baseQueue: Tl.baseQueue,
        queue: Tl.queue,
        next: null
      }, wl === null ? ll.memoizedState = wl = l : wl = wl.next = l;
    }
    return wl;
  }
  function Qu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Un(l) {
    var t = Rn;
    return Rn += 1, Va === null && (Va = []), l = Mo(Va, l, t), t = ll, (wl === null ? t.memoizedState : wl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Er : Jc), l;
  }
  function Vu(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Un(l);
      if (l.$$typeof === _l) return at(l);
    }
    throw Error(s(438, String(l)));
  }
  function Hc(l) {
    var t = null, e = ll.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = ll.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Qu(), ll.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = ft;
    return t.index++, e;
  }
  function ie(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Lu(l) {
    var t = Zl();
    return qc(t, Tl, l);
  }
  function qc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var n = l.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = l.baseState, n === null) l.memoizedState = u;
    else {
      t = n.next;
      var f = i = null, r = null, S = t, T = !1;
      do {
        var j = S.lane & -536870913;
        if (j !== S.lane ? (ul & j) === j : (ue & j) === j) {
          var b = S.revertLane;
          if (b === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), j === qa && (T = !0);
          else if ((ue & b) === b) {
            S = S.next, b === qa && (T = !0);
            continue;
          } else
            j = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, r === null ? (f = r = j, i = u) : r = r.next = j, ll.lanes |= b, He |= b;
          j = S.action, da && e(u, j), u = S.hasEagerState ? S.eagerState : e(u, j);
        } else
          b = {
            lane: j,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, r === null ? (f = r = b, i = u) : r = r.next = b, ll.lanes |= j, He |= j;
        S = S.next;
      } while (S !== null && S !== t);
      if (r === null ? i = u : r.next = f, !Nt(u, l.memoizedState) && ($l = !0, T && (e = Ba, e !== null)))
        throw e;
      l.memoizedState = u, l.baseState = i, l.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Bc(l) {
    var t = Zl(), e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, n = e.pending, u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = l(u, i.action), i = i.next;
      while (i !== n);
      Nt(u, t.memoizedState) || ($l = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Vo(l, t, e) {
    var a = ll, n = Zl(), u = ol;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !Nt(
      (Tl || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, $l = !0), n = n.queue, Xc(Ko.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== t || i || wl !== null && wl.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Zo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), Al === null) throw Error(s(349));
      u || (ue & 127) !== 0 || Lo(a, t, e);
    }
    return e;
  }
  function Lo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = ll.updateQueue, t === null ? (t = Qu(), ll.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Zo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Jo(t) && wo(l);
  }
  function Ko(l, t, e) {
    return e(function() {
      Jo(t) && wo(l);
    });
  }
  function Jo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !Nt(l, e);
    } catch {
      return !0;
    }
  }
  function wo(l) {
    var t = aa(l, 2);
    t !== null && _t(t, l, 2);
  }
  function Yc(l) {
    var t = ot();
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
      lastRenderedReducer: ie,
      lastRenderedState: l
    }, t;
  }
  function $o(l, t, e, a) {
    return l.baseState = e, qc(
      l,
      Tl,
      typeof a == "function" ? a : ie
    );
  }
  function yh(l, t, e, a, n) {
    if (Ju(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var u = {
        payload: n,
        action: l,
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
      E.T !== null ? e(!0) : u.isTransition = !1, a(u), e = t.pending, e === null ? (u.next = t.pending = u, Wo(t, u)) : (u.next = e.next, t.pending = e.next = u);
    }
  }
  function Wo(l, t) {
    var e = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var u = E.T, i = {};
      E.T = i;
      try {
        var f = e(n, a), r = E.S;
        r !== null && r(i, f), Fo(l, t, f);
      } catch (S) {
        Gc(l, t, S);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), E.T = u;
      }
    } else
      try {
        u = e(n, a), Fo(l, t, u);
      } catch (S) {
        Gc(l, t, S);
      }
  }
  function Fo(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        ko(l, t, a);
      },
      function(a) {
        return Gc(l, t, a);
      }
    ) : ko(l, t, e);
  }
  function ko(l, t, e) {
    t.status = "fulfilled", t.value = e, Io(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Wo(l, e)));
  }
  function Gc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Io(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Io(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Po(l, t) {
    return t;
  }
  function lr(l, t) {
    if (ol) {
      var e = Al.formState;
      if (e !== null) {
        l: {
          var a = ll;
          if (ol) {
            if (Rl) {
              t: {
                for (var n = Rl, u = Gt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Qt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Rl = Qt(
                  n.nextSibling
                ), a = n.data === "F!";
                break l;
              }
            }
            Ae(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = ot(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Po,
      lastRenderedState: t
    }, e.queue = a, e = br.bind(
      null,
      ll,
      a
    ), a.dispatch = e, a = Yc(!1), u = Kc.bind(
      null,
      ll,
      !1,
      a.queue
    ), a = ot(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, e = yh.bind(
      null,
      ll,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function tr(l) {
    var t = Zl();
    return er(t, Tl, l);
  }
  function er(l, t, e) {
    if (t = qc(
      l,
      t,
      Po
    )[0], l = Lu(ie)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Un(t);
      } catch (i) {
        throw i === Ya ? Uu : i;
      }
    else a = t;
    t = Zl();
    var n = t.queue, u = n.dispatch;
    return e !== t.memoizedState && (ll.flags |= 2048, La(
      9,
      { destroy: void 0 },
      gh.bind(null, n, e),
      null
    )), [a, u, l];
  }
  function gh(l, t) {
    l.action = t;
  }
  function ar(l) {
    var t = Zl(), e = Tl;
    if (e !== null)
      return er(t, e, l);
    Zl(), t = t.memoizedState, e = Zl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function La(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = ll.updateQueue, t === null && (t = Qu(), ll.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function nr() {
    return Zl().memoizedState;
  }
  function Zu(l, t, e, a) {
    var n = ot();
    ll.flags |= l, n.memoizedState = La(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Ku(l, t, e, a) {
    var n = Zl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Tl !== null && a !== null && Dc(a, Tl.memoizedState.deps) ? n.memoizedState = La(t, u, e, a) : (ll.flags |= l, n.memoizedState = La(
      1 | t,
      u,
      e,
      a
    ));
  }
  function ur(l, t) {
    Zu(8390656, 8, l, t);
  }
  function Xc(l, t) {
    Ku(2048, 8, l, t);
  }
  function Sh(l) {
    ll.flags |= 4;
    var t = ll.updateQueue;
    if (t === null)
      t = Qu(), ll.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ir(l) {
    var t = Zl().memoizedState;
    return Sh({ ref: t, nextImpl: l }), function() {
      if ((yl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function cr(l, t) {
    return Ku(4, 2, l, t);
  }
  function fr(l, t) {
    return Ku(4, 4, l, t);
  }
  function sr(l, t) {
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
  function or(l, t, e) {
    e = e != null ? e.concat([l]) : null, Ku(4, 4, sr.bind(null, t, l), e);
  }
  function Qc() {
  }
  function rr(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Dc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function dr(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Dc(t, a[1]))
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
  function Vc(l, t, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = md(), ll.lanes |= l, He |= l, e);
  }
  function mr(l, t, e, a) {
    return Nt(e, t) ? e : Xa.current !== null ? (l = Vc(l, e, a), Nt(l, t) || ($l = !0), l) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? ($l = !0, l.memoizedState = e) : (l = md(), ll.lanes |= l, He |= l, t);
  }
  function vr(l, t, e, a, n) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var i = E.T, f = {};
    E.T = f, Kc(l, !1, t, e);
    try {
      var r = n(), S = E.S;
      if (S !== null && S(f, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var T = mh(
          r,
          a
        );
        Cn(
          l,
          t,
          T,
          Mt(l)
        );
      } else
        Cn(
          l,
          t,
          a,
          Mt(l)
        );
    } catch (j) {
      Cn(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: j },
        Mt()
      );
    } finally {
      B.p = u, i !== null && f.types !== null && (i.types = f.types), E.T = i;
    }
  }
  function bh() {
  }
  function Lc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var n = hr(l).queue;
    vr(
      l,
      n,
      t,
      Z,
      e === null ? bh : function() {
        return yr(l), e(a);
      }
    );
  }
  function hr(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ie,
        lastRenderedState: Z
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
        lastRenderedReducer: ie,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function yr(l) {
    var t = hr(l);
    t.next === null && (t = l.alternate.memoizedState), Cn(
      l,
      t.next.queue,
      {},
      Mt()
    );
  }
  function Zc() {
    return at(kn);
  }
  function gr() {
    return Zl().memoizedState;
  }
  function Sr() {
    return Zl().memoizedState;
  }
  function ph(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Mt();
          l = je(e);
          var a = De(t, l, e);
          a !== null && (_t(a, t, e), jn(a, t, e)), t = { cache: bc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function _h(l, t, e) {
    var a = Mt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ju(l) ? pr(t, e) : (e = fc(l, t, e, a), e !== null && (_t(e, l, a), _r(e, t, a)));
  }
  function br(l, t, e) {
    var a = Mt();
    Cn(l, t, e, a);
  }
  function Cn(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ju(l)) pr(t, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, Nt(f, i))
            return Au(l, t, n, 0), Al === null && Nu(), !1;
        } catch {
        } finally {
        }
      if (e = fc(l, t, n, a), e !== null)
        return _t(e, l, a), _r(e, t, a), !0;
    }
    return !1;
  }
  function Kc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: zf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ju(l)) {
      if (t) throw Error(s(479));
    } else
      t = fc(
        l,
        e,
        a,
        2
      ), t !== null && _t(t, l, 2);
  }
  function Ju(l) {
    var t = l.alternate;
    return l === ll || t !== null && t === ll;
  }
  function pr(l, t) {
    Qa = Gu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function _r(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ns(l, e);
    }
  }
  var Hn = {
    readContext: at,
    use: Vu,
    useCallback: Yl,
    useContext: Yl,
    useEffect: Yl,
    useImperativeHandle: Yl,
    useLayoutEffect: Yl,
    useInsertionEffect: Yl,
    useMemo: Yl,
    useReducer: Yl,
    useRef: Yl,
    useState: Yl,
    useDebugValue: Yl,
    useDeferredValue: Yl,
    useTransition: Yl,
    useSyncExternalStore: Yl,
    useId: Yl,
    useHostTransitionStatus: Yl,
    useFormState: Yl,
    useActionState: Yl,
    useOptimistic: Yl,
    useMemoCache: Yl,
    useCacheRefresh: Yl
  };
  Hn.useEffectEvent = Yl;
  var Er = {
    readContext: at,
    use: Vu,
    useCallback: function(l, t) {
      return ot().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: at,
    useEffect: ur,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Zu(
        4194308,
        4,
        sr.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Zu(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Zu(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = ot();
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
      var a = ot();
      if (e !== void 0) {
        var n = e(t);
        if (da) {
          _e(!0);
          try {
            e(t);
          } finally {
            _e(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = _h.bind(
        null,
        ll,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = ot();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Yc(l);
      var t = l.queue, e = br.bind(null, ll, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Qc,
    useDeferredValue: function(l, t) {
      var e = ot();
      return Vc(e, l, t);
    },
    useTransition: function() {
      var l = Yc(!1);
      return l = vr.bind(
        null,
        ll,
        l.queue,
        !0,
        !1
      ), ot().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = ll, n = ot();
      if (ol) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = t(), Al === null)
          throw Error(s(349));
        (ul & 127) !== 0 || Lo(a, t, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: t };
      return n.queue = u, ur(Ko.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Zo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = ot(), t = Al.identifierPrefix;
      if (ol) {
        var e = wt, a = Jt;
        e = (a & ~(1 << 32 - zt(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Xu++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = vh++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Zc,
    useFormState: lr,
    useActionState: lr,
    useOptimistic: function(l) {
      var t = ot();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Kc.bind(
        null,
        ll,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Hc,
    useCacheRefresh: function() {
      return ot().memoizedState = ph.bind(
        null,
        ll
      );
    },
    useEffectEvent: function(l) {
      var t = ot(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((yl & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Jc = {
    readContext: at,
    use: Vu,
    useCallback: rr,
    useContext: at,
    useEffect: Xc,
    useImperativeHandle: or,
    useInsertionEffect: cr,
    useLayoutEffect: fr,
    useMemo: dr,
    useReducer: Lu,
    useRef: nr,
    useState: function() {
      return Lu(ie);
    },
    useDebugValue: Qc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return mr(
        e,
        Tl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Lu(ie)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Un(l),
        t
      ];
    },
    useSyncExternalStore: Vo,
    useId: gr,
    useHostTransitionStatus: Zc,
    useFormState: tr,
    useActionState: tr,
    useOptimistic: function(l, t) {
      var e = Zl();
      return $o(e, Tl, l, t);
    },
    useMemoCache: Hc,
    useCacheRefresh: Sr
  };
  Jc.useEffectEvent = ir;
  var Tr = {
    readContext: at,
    use: Vu,
    useCallback: rr,
    useContext: at,
    useEffect: Xc,
    useImperativeHandle: or,
    useInsertionEffect: cr,
    useLayoutEffect: fr,
    useMemo: dr,
    useReducer: Bc,
    useRef: nr,
    useState: function() {
      return Bc(ie);
    },
    useDebugValue: Qc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return Tl === null ? Vc(e, l, t) : mr(
        e,
        Tl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Bc(ie)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Un(l),
        t
      ];
    },
    useSyncExternalStore: Vo,
    useId: gr,
    useHostTransitionStatus: Zc,
    useFormState: ar,
    useActionState: ar,
    useOptimistic: function(l, t) {
      var e = Zl();
      return Tl !== null ? $o(e, Tl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Hc,
    useCacheRefresh: Sr
  };
  Tr.useEffectEvent = ir;
  function wc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : M({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var $c = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = je(a);
      n.payload = t, e != null && (n.callback = e), t = De(l, n, a), t !== null && (_t(t, l, a), jn(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = je(a);
      n.tag = 1, n.payload = t, e != null && (n.callback = e), t = De(l, n, a), t !== null && (_t(t, l, a), jn(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Mt(), a = je(e);
      a.tag = 2, t != null && (a.callback = t), t = De(l, a, e), t !== null && (_t(t, l, e), jn(t, l, e));
    }
  };
  function zr(l, t, e, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !_n(e, a) || !_n(n, u) : !0;
  }
  function Nr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && $c.enqueueReplaceState(t, t.state, null);
  }
  function ma(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = M({}, e));
      for (var n in l)
        e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Ar(l) {
    zu(l);
  }
  function xr(l) {
    console.error(l);
  }
  function Or(l) {
    zu(l);
  }
  function wu(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function jr(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Wc(l, t, e) {
    return e = je(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      wu(l, t);
    }, e;
  }
  function Dr(l) {
    return l = je(l), l.tag = 3, l;
  }
  function Mr(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        jr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      jr(t, e, a), typeof n != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function Eh(l, t, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ha(
        t,
        e,
        n,
        !0
      ), e = xt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Xt === null ? ui() : e.alternate === null && Gl === 0 && (Gl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Cu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), _f(l, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Cu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), _f(l, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return _f(l, a, n), ui(), !1;
    }
    if (ol)
      return t = xt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== vc && (l = Error(s(422), { cause: a }), zn(qt(l, e)))) : (a !== vc && (t = Error(s(423), {
        cause: a
      }), zn(
        qt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = qt(a, e), n = Wc(
        l.stateNode,
        a,
        n
      ), Nc(l, n), Gl !== 4 && (Gl = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = qt(u, e), Ln === null ? Ln = [u] : Ln.push(u), Gl !== 4 && (Gl = 2), t === null) return !0;
    a = qt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = n & -n, e.lanes |= l, l = Wc(e.stateNode, a, l), Nc(e, l), !1;
        case 1:
          if (t = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qe === null || !qe.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Dr(n), Mr(
              n,
              l,
              e,
              a
            ), Nc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Fc = Error(s(461)), $l = !1;
  function nt(l, t, e, a) {
    t.child = l === null ? Ho(t, null, e, a) : ra(
      t,
      l.child,
      e,
      a
    );
  }
  function Rr(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return ca(t), a = Mc(
      l,
      t,
      e,
      i,
      u,
      n
    ), f = Rc(), l !== null && !$l ? (Uc(l, t, n), ce(l, t, n)) : (ol && f && dc(t), t.flags |= 1, nt(l, t, a, n), t.child);
  }
  function Ur(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !sc(u) && u.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = u, Cr(
        l,
        t,
        u,
        a,
        n
      )) : (l = Ou(
        e.type,
        null,
        a,
        t,
        t.mode,
        n
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (u = l.child, !nf(l, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : _n, e(i, a) && l.ref === t.ref)
        return ce(l, t, n);
    }
    return t.flags |= 1, l = te(u, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Cr(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (_n(u, a) && l.ref === t.ref)
        if ($l = !1, t.pendingProps = a = u, nf(l, n))
          (l.flags & 131072) !== 0 && ($l = !0);
        else
          return t.lanes = l.lanes, ce(l, t, n);
    }
    return kc(
      l,
      t,
      e,
      a,
      n
    );
  }
  function Hr(l, t, e, a) {
    var n = a.children, u = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return qr(
          l,
          t,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ru(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Yo(t, u) : xc(), Go(t);
      else
        return a = t.lanes = 536870912, qr(
          l,
          t,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Ru(t, u.cachePool), Yo(t, u), Re(), t.memoizedState = null) : (l !== null && Ru(t, null), xc(), Re());
    return nt(l, t, n, e), t.child;
  }
  function qn(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function qr(l, t, e, a, n) {
    var u = _c();
    return u = u === null ? null : { parent: Jl._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && Ru(t, null), xc(), Go(t), l !== null && Ha(l, t, a, !0), t.childLanes = n, null;
  }
  function $u(l, t) {
    return t = Fu(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Br(l, t, e) {
    return ra(t, l.child, null, e), l = $u(t, t.pendingProps), l.flags |= 2, Ot(t), t.memoizedState = null, l;
  }
  function Th(l, t, e) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (ol) {
        if (a.mode === "hidden")
          return l = $u(t, a), t.lanes = 536870912, qn(null, l);
        if (jc(t), (l = Rl) ? (l = Wd(
          l,
          Gt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = po(l), e.return = t, t.child = e, et = t, Rl = null)) : l = null, l === null) throw Ae(t);
        return t.lanes = 536870912, null;
      }
      return $u(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (jc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = Br(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if ($l || Ha(l, t, e, !1), n = (e & l.childLanes) !== 0, $l || n) {
        if (a = Al, a !== null && (i = As(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, aa(l, i), _t(a, l, i), Fc;
        ui(), t = Br(
          l,
          t,
          e
        );
      } else
        l = u.treeContext, Rl = Qt(i.nextSibling), et = t, ol = !0, Ne = null, Gt = !1, l !== null && To(t, l), t = $u(t, a), t.flags |= 4096;
      return t;
    }
    return l = te(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Wu(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function kc(l, t, e, a, n) {
    return ca(t), e = Mc(
      l,
      t,
      e,
      a,
      void 0,
      n
    ), a = Rc(), l !== null && !$l ? (Uc(l, t, n), ce(l, t, n)) : (ol && a && dc(t), t.flags |= 1, nt(l, t, e, n), t.child);
  }
  function Yr(l, t, e, a, n, u) {
    return ca(t), t.updateQueue = null, e = Qo(
      t,
      a,
      e,
      n
    ), Xo(l), a = Rc(), l !== null && !$l ? (Uc(l, t, u), ce(l, t, u)) : (ol && a && dc(t), t.flags |= 1, nt(l, t, e, u), t.child);
  }
  function Gr(l, t, e, a, n) {
    if (ca(t), t.stateNode === null) {
      var u = Ma, i = e.contextType;
      typeof i == "object" && i !== null && (u = at(i)), u = new e(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = $c, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Tc(t), i = e.contextType, u.context = typeof i == "object" && i !== null ? at(i) : Ma, u.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (wc(
        t,
        e,
        i,
        a
      ), u.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && $c.enqueueReplaceState(u, u.state, null), Mn(t, a, u, n), Dn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = t.stateNode;
      var f = t.memoizedProps, r = ma(e, f);
      u.props = r;
      var S = u.context, T = e.contextType;
      i = Ma, typeof T == "object" && T !== null && (i = at(T));
      var j = e.getDerivedStateFromProps;
      T = typeof j == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || S !== i) && Nr(
        t,
        u,
        a,
        i
      ), Oe = !1;
      var b = t.memoizedState;
      u.state = b, Mn(t, a, u, n), Dn(), S = t.memoizedState, f || b !== S || Oe ? (typeof j == "function" && (wc(
        t,
        e,
        j,
        a
      ), S = t.memoizedState), (r = Oe || zr(
        t,
        e,
        r,
        a,
        b,
        S,
        i
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = S), u.props = a, u.state = S, u.context = i, a = r) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, zc(l, t), i = t.memoizedProps, T = ma(e, i), u.props = T, j = t.pendingProps, b = u.context, S = e.contextType, r = Ma, typeof S == "object" && S !== null && (r = at(S)), f = e.getDerivedStateFromProps, (S = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== j || b !== r) && Nr(
        t,
        u,
        a,
        r
      ), Oe = !1, b = t.memoizedState, u.state = b, Mn(t, a, u, n), Dn();
      var p = t.memoizedState;
      i !== j || b !== p || Oe || l !== null && l.dependencies !== null && Du(l.dependencies) ? (typeof f == "function" && (wc(
        t,
        e,
        f,
        a
      ), p = t.memoizedState), (T = Oe || zr(
        t,
        e,
        T,
        a,
        b,
        p,
        r
      ) || l !== null && l.dependencies !== null && Du(l.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, p, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        p,
        r
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = p), u.props = a, u.state = p, u.context = r, a = T) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, Wu(l, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, l !== null && a ? (t.child = ra(
      t,
      l.child,
      null,
      n
    ), t.child = ra(
      t,
      null,
      e,
      n
    )) : nt(l, t, e, n), t.memoizedState = u.state, l = t.child) : l = ce(
      l,
      t,
      n
    ), l;
  }
  function Xr(l, t, e, a) {
    return ua(), t.flags |= 256, nt(l, t, e, a), t.child;
  }
  var Ic = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Pc(l) {
    return { baseLanes: l, cachePool: jo() };
  }
  function lf(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Dt), l;
  }
  function Qr(l, t, e) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Ll.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (ol) {
        if (n ? Me(t) : Re(), (l = Rl) ? (l = Wd(
          l,
          Gt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = po(l), e.return = t, t.child = e, et = t, Rl = null)) : l = null, l === null) throw Ae(t);
        return Bf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Re(), n = t.mode, f = Fu(
        { mode: "hidden", children: f },
        n
      ), a = na(
        a,
        n,
        e,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = Pc(e), a.childLanes = lf(
        l,
        i,
        e
      ), t.memoizedState = Ic, qn(null, a)) : (Me(t), tf(t, f));
    }
    var r = l.memoizedState;
    if (r !== null && (f = r.dehydrated, f !== null)) {
      if (u)
        t.flags & 256 ? (Me(t), t.flags &= -257, t = ef(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Re(), t.child = l.child, t.flags |= 128, t = null) : (Re(), f = a.fallback, n = t.mode, a = Fu(
          { mode: "visible", children: a.children },
          n
        ), f = na(
          f,
          n,
          e,
          null
        ), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, ra(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = Pc(e), a.childLanes = lf(
          l,
          i,
          e
        ), t.memoizedState = Ic, t = qn(null, a));
      else if (Me(t), Bf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var S = i.dgst;
        i = S, a = Error(s(419)), a.stack = "", a.digest = i, zn({ value: a, source: null, stack: null }), t = ef(
          l,
          t,
          e
        );
      } else if ($l || Ha(l, t, e, !1), i = (e & l.childLanes) !== 0, $l || i) {
        if (i = Al, i !== null && (a = As(i, e), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, aa(l, a), _t(i, l, a), Fc;
        qf(f) || ui(), t = ef(
          l,
          t,
          e
        );
      } else
        qf(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = r.treeContext, Rl = Qt(
          f.nextSibling
        ), et = t, ol = !0, Ne = null, Gt = !1, l !== null && To(t, l), t = tf(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (Re(), f = a.fallback, n = t.mode, r = l.child, S = r.sibling, a = te(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, S !== null ? f = te(
      S,
      f
    ) : (f = na(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, qn(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = Pc(e) : (n = f.cachePool, n !== null ? (r = Jl._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = jo(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = lf(
      l,
      i,
      e
    ), t.memoizedState = Ic, qn(l.child, a)) : (Me(t), e = l.child, l = e.sibling, e = te(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function tf(l, t) {
    return t = Fu(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Fu(l, t) {
    return l = At(22, l, null, t), l.lanes = 0, l;
  }
  function ef(l, t, e) {
    return ra(t, l.child, null, e), l = tf(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Vr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), gc(l.return, t, e);
  }
  function af(l, t, e, a, n, u) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function Lr(l, t, e) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ll.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, q(Ll, i), nt(l, t, a, e), a = ol ? Tn : 0, !f && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Vr(l, e, t);
        else if (l.tag === 19)
          Vr(l, e, t);
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
    switch (n) {
      case "forwards":
        for (e = t.child, n = null; e !== null; )
          l = e.alternate, l !== null && Yu(l) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = t.child, t.child = null) : (n = e.sibling, e.sibling = null), af(
          t,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = t.child, t.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && Yu(l) === null) {
            t.child = n;
            break;
          }
          l = n.sibling, n.sibling = e, e = n, n = l;
        }
        af(
          t,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        af(
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
  function ce(l, t, e) {
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
      for (l = t.child, e = te(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = te(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function nf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Du(l)));
  }
  function zh(l, t, e) {
    switch (t.tag) {
      case 3:
        Ql(t, t.stateNode.containerInfo), xe(t, Jl, l.memoizedState.cache), ua();
        break;
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        Ql(t, t.stateNode.containerInfo);
        break;
      case 10:
        xe(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, jc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Me(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Qr(l, t, e) : (Me(t), l = ce(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        Me(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ha(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), n) {
          if (a)
            return Lr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), q(Ll, Ll.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Hr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        xe(t, Jl, l.memoizedState.cache);
    }
    return ce(l, t, e);
  }
  function Zr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        $l = !0;
      else {
        if (!nf(l, e) && (t.flags & 128) === 0)
          return $l = !1, zh(
            l,
            t,
            e
          );
        $l = (l.flags & 131072) !== 0;
      }
    else
      $l = !1, ol && (t.flags & 1048576) !== 0 && Eo(t, Tn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = sa(t.elementType), t.type = l, typeof l == "function")
            sc(l) ? (a = ma(l, a), t.tag = 1, t = Gr(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = kc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === xl) {
                t.tag = 11, t = Rr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (n === $) {
                t.tag = 14, t = Ur(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Xl(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return kc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, n = ma(
          a,
          t.pendingProps
        ), Gr(
          l,
          t,
          a,
          n,
          e
        );
      case 3:
        l: {
          if (Ql(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(s(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, zc(l, t), Mn(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, xe(t, Jl, a), a !== u.cache && Sc(
            t,
            [Jl],
            e,
            !0
          ), Dn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Xr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== n) {
              n = qt(
                Error(s(424)),
                t
              ), zn(n), t = Xr(
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
              for (Rl = Qt(l.firstChild), et = t, ol = !0, Ne = null, Gt = !0, e = Ho(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ua(), a === n) {
              t = ce(
                l,
                t,
                e
              );
              break l;
            }
            nt(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Wu(l, t), l === null ? (e = tm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : ol || (e = t.type, l = t.pendingProps, a = di(
          P.current
        ).createElement(e), a[tt] = t, a[ht] = l, ut(a, e, l), Pl(a), t.stateNode = a) : t.memoizedState = tm(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return be(t), l === null && ol && (a = t.stateNode = Id(
          t.type,
          t.pendingProps,
          P.current
        ), et = t, Gt = !0, n = Rl, Xe(t.type) ? (Yf = n, Rl = Qt(a.firstChild)) : Rl = n), nt(
          l,
          t,
          t.pendingProps.children,
          e
        ), Wu(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && ol && ((n = a = Rl) && (a = l0(
          a,
          t.type,
          t.pendingProps,
          Gt
        ), a !== null ? (t.stateNode = a, et = t, Rl = Qt(a.firstChild), Gt = !1, n = !0) : n = !1), n || Ae(t)), be(t), n = t.type, u = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, Uf(n, u) ? a = null : i !== null && Uf(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = Mc(
          l,
          t,
          hh,
          null,
          null,
          e
        ), kn._currentValue = n), Wu(l, t), nt(l, t, a, e), t.child;
      case 6:
        return l === null && ol && ((l = e = Rl) && (e = t0(
          e,
          t.pendingProps,
          Gt
        ), e !== null ? (t.stateNode = e, et = t, Rl = null, l = !0) : l = !1), l || Ae(t)), null;
      case 13:
        return Qr(l, t, e);
      case 4:
        return Ql(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ra(
          t,
          null,
          a,
          e
        ) : nt(l, t, a, e), t.child;
      case 11:
        return Rr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return nt(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return nt(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return nt(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, xe(t, t.type, a.value), nt(l, t, a.children, e), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, ca(t), n = at(n), a = a(n), t.flags |= 1, nt(l, t, a, e), t.child;
      case 14:
        return Ur(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Cr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Lr(l, t, e);
      case 31:
        return Th(l, t, e);
      case 22:
        return Hr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ca(t), a = at(Jl), l === null ? (n = _c(), n === null && (n = Al, u = bc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), t.memoizedState = { parent: a, cache: n }, Tc(t), xe(t, Jl, n)) : ((l.lanes & e) !== 0 && (zc(l, t), Mn(t, null, null, e), Dn()), n = l.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), xe(t, Jl, a)) : (a = u.cache, xe(t, Jl, a), a !== n.cache && Sc(
          t,
          [Jl],
          e,
          !0
        ))), nt(
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
  function fe(l) {
    l.flags |= 4;
  }
  function uf(l, t, e, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (gd()) l.flags |= 8192;
        else
          throw oa = Cu, Ec;
    } else l.flags &= -16777217;
  }
  function Kr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !im(t))
      if (gd()) l.flags |= 8192;
      else
        throw oa = Cu, Ec;
  }
  function ku(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Ts() : 536870912, l.lanes |= t, wa |= t);
  }
  function Bn(l, t) {
    if (!ol)
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
  function Ul(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function Nh(l, t, e) {
    var a = t.pendingProps;
    switch (mc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ul(t), null;
      case 1:
        return Ul(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ne(Jl), Bl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ca(t) ? fe(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, hc())), Ul(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return l === null ? (fe(t), u !== null ? (Ul(t), Kr(t, u)) : (Ul(t), uf(
          t,
          n,
          null,
          a,
          e
        ))) : u ? u !== l.memoizedState ? (fe(t), Ul(t), Kr(t, u)) : (Ul(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && fe(t), Ul(t), uf(
          t,
          n,
          l,
          a,
          e
        )), null;
      case 27:
        if (We(t), e = P.current, n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && fe(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Ul(t), null;
          }
          l = Y.current, Ca(t) ? zo(t) : (l = Id(n, a, e), t.stateNode = l, fe(t));
        }
        return Ul(t), null;
      case 5:
        if (We(t), n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && fe(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Ul(t), null;
          }
          if (u = Y.current, Ca(t))
            zo(t);
          else {
            var i = di(
              P.current
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
            u[tt] = t, u[ht] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
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
            t.stateNode = u;
            l: switch (ut(u, n, a), n) {
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
            a && fe(t);
          }
        }
        return Ul(t), uf(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && fe(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(s(166));
          if (l = P.current, Ca(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, n = et, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[tt] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Qd(l.nodeValue, e)), l || Ae(t, !0);
          } else
            l = di(l).createTextNode(
              a
            ), l[tt] = t, t.stateNode = l;
        }
        return Ul(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ca(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[tt] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ul(t), l = !1;
          } else
            e = hc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ul(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = Ca(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[tt] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ul(t), n = !1;
          } else
            n = hc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
        }
        return Ot(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), ku(t, t.updateQueue), Ul(t), null);
      case 4:
        return Bl(), l === null && Of(t.stateNode.containerInfo), Ul(t), null;
      case 10:
        return ne(t.type), Ul(t), null;
      case 19:
        if (A(Ll), a = t.memoizedState, a === null) return Ul(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Bn(a, !1);
          else {
            if (Gl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (u = Yu(l), u !== null) {
                  for (t.flags |= 128, Bn(a, !1), l = u.updateQueue, t.updateQueue = l, ku(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    bo(e, l), e = e.sibling;
                  return q(
                    Ll,
                    Ll.current & 1 | 2
                  ), ol && ee(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ml() > ei && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = Yu(u), l !== null) {
              if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, ku(t, l), Bn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ol)
                return Ul(t), null;
            } else
              2 * Ml() - a.renderingStartTime > ei && e !== 536870912 && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (l = a.last, l !== null ? l.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ml(), l.sibling = null, e = Ll.current, q(
          Ll,
          n ? e & 1 | 2 : e & 1
        ), ol && ee(t, a.treeForkCount), l) : (Ul(t), null);
      case 22:
      case 23:
        return Ot(t), Oc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Ul(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ul(t), e = t.updateQueue, e !== null && ku(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(fa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), ne(Jl), Ul(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Ah(l, t) {
    switch (mc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return ne(Jl), Bl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return We(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ot(t), t.alternate === null)
            throw Error(s(340));
          ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (Ot(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(Ll), null;
      case 4:
        return Bl(), null;
      case 10:
        return ne(t.type), null;
      case 22:
      case 23:
        return Ot(t), Oc(), l !== null && A(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return ne(Jl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jr(l, t) {
    switch (mc(t), t.tag) {
      case 3:
        ne(Jl), Bl();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
        break;
      case 4:
        Bl();
        break;
      case 31:
        t.memoizedState !== null && Ot(t);
        break;
      case 13:
        Ot(t);
        break;
      case 19:
        A(Ll);
        break;
      case 10:
        ne(t.type);
        break;
      case 22:
      case 23:
        Ot(t), Oc(), l !== null && A(fa);
        break;
      case 24:
        ne(Jl);
    }
  }
  function Yn(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (f) {
      pl(t, t.return, f);
    }
  }
  function Ue(l, t, e) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = t;
              var r = e, S = f;
              try {
                S();
              } catch (T) {
                pl(
                  n,
                  r,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (T) {
      pl(t, t.return, T);
    }
  }
  function wr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Bo(t, e);
      } catch (a) {
        pl(l, l.return, a);
      }
    }
  }
  function $r(l, t, e) {
    e.props = ma(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      pl(l, t, a);
    }
  }
  function Gn(l, t) {
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
    } catch (n) {
      pl(l, t, n);
    }
  }
  function $t(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          pl(l, t, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          pl(l, t, n);
        }
      else e.current = null;
  }
  function Wr(l) {
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
    } catch (n) {
      pl(l, l.return, n);
    }
  }
  function cf(l, t, e) {
    try {
      var a = l.stateNode;
      $h(a, l.type, e, t), a[ht] = t;
    } catch (n) {
      pl(l, l.return, n);
    }
  }
  function Fr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Xe(l.type) || l.tag === 4;
  }
  function ff(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Fr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Xe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function sf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Pt));
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (sf(l, t, e), l = l.sibling; l !== null; )
        sf(l, t, e), l = l.sibling;
  }
  function Iu(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (Iu(l, t, e), l = l.sibling; l !== null; )
        Iu(l, t, e), l = l.sibling;
  }
  function kr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ut(t, a, e), t[tt] = l, t[ht] = e;
    } catch (u) {
      pl(l, l.return, u);
    }
  }
  var se = !1, Wl = !1, of = !1, Ir = typeof WeakSet == "function" ? WeakSet : Set, lt = null;
  function xh(l, t) {
    if (l = l.containerInfo, Mf = bi, l = so(l), ec(l)) {
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
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, f = -1, r = -1, S = 0, T = 0, j = l, b = null;
            t: for (; ; ) {
              for (var p; j !== e || n !== 0 && j.nodeType !== 3 || (f = i + n), j !== u || a !== 0 && j.nodeType !== 3 || (r = i + a), j.nodeType === 3 && (i += j.nodeValue.length), (p = j.firstChild) !== null; )
                b = j, j = p;
              for (; ; ) {
                if (j === l) break t;
                if (b === e && ++S === n && (f = i), b === u && ++T === a && (r = i), (p = j.nextSibling) !== null) break;
                j = b, b = j.parentNode;
              }
              j = p;
            }
            e = f === -1 || r === -1 ? null : { start: f, end: r };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Rf = { focusedElem: l, selectionRange: e }, bi = !1, lt = t; lt !== null; )
      if (t = lt, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, lt = l;
      else
        for (; lt !== null; ) {
          switch (t = lt, u = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  n = l[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && u !== null) {
                l = void 0, e = t, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var G = ma(
                    e.type,
                    n
                  );
                  l = a.getSnapshotBeforeUpdate(
                    G,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (K) {
                  pl(
                    e,
                    e.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  Hf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Hf(l);
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
            l.return = t.return, lt = l;
            break;
          }
          lt = t.return;
        }
  }
  function Pr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        re(l, e), a & 4 && Yn(5, e);
        break;
      case 1:
        if (re(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              pl(e, e.return, i);
            }
          else {
            var n = ma(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                n,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              pl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && wr(e), a & 512 && Gn(e, e.return);
        break;
      case 3:
        if (re(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
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
            Bo(l, t);
          } catch (i) {
            pl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && kr(e);
      case 26:
      case 5:
        re(l, e), t === null && a & 4 && Wr(e), a & 512 && Gn(e, e.return);
        break;
      case 12:
        re(l, e);
        break;
      case 31:
        re(l, e), a & 4 && ed(l, e);
        break;
      case 13:
        re(l, e), a & 4 && ad(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = qh.bind(
          null,
          e
        ), e0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || se, !a) {
          t = t !== null && t.memoizedState !== null || Wl, n = se;
          var u = Wl;
          se = a, (Wl = t) && !u ? de(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : re(l, e), se = n, Wl = u;
        }
        break;
      case 30:
        break;
      default:
        re(l, e);
    }
  }
  function ld(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, ld(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Gi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Hl = null, gt = !1;
  function oe(l, t, e) {
    for (e = e.child; e !== null; )
      td(l, t, e), e = e.sibling;
  }
  function td(l, t, e) {
    if (Tt && typeof Tt.onCommitFiberUnmount == "function")
      try {
        Tt.onCommitFiberUnmount(kt, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Wl || $t(e, t), oe(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Wl || $t(e, t);
        var a = Hl, n = gt;
        Xe(e.type) && (Hl = e.stateNode, gt = !1), oe(
          l,
          t,
          e
        ), $n(e.stateNode), Hl = a, gt = n;
        break;
      case 5:
        Wl || $t(e, t);
      case 6:
        if (a = Hl, n = gt, Hl = null, oe(
          l,
          t,
          e
        ), Hl = a, gt = n, Hl !== null)
          if (gt)
            try {
              (Hl.nodeType === 9 ? Hl.body : Hl.nodeName === "HTML" ? Hl.ownerDocument.body : Hl).removeChild(e.stateNode);
            } catch (u) {
              pl(
                e,
                t,
                u
              );
            }
          else
            try {
              Hl.removeChild(e.stateNode);
            } catch (u) {
              pl(
                e,
                t,
                u
              );
            }
        break;
      case 18:
        Hl !== null && (gt ? (l = Hl, wd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), tn(l)) : wd(Hl, e.stateNode));
        break;
      case 4:
        a = Hl, n = gt, Hl = e.stateNode.containerInfo, gt = !0, oe(
          l,
          t,
          e
        ), Hl = a, gt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, t), Wl || Ue(4, e, t), oe(
          l,
          t,
          e
        );
        break;
      case 1:
        Wl || ($t(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && $r(
          e,
          t,
          a
        )), oe(
          l,
          t,
          e
        );
        break;
      case 21:
        oe(
          l,
          t,
          e
        );
        break;
      case 22:
        Wl = (a = Wl) || e.memoizedState !== null, oe(
          l,
          t,
          e
        ), Wl = a;
        break;
      default:
        oe(
          l,
          t,
          e
        );
    }
  }
  function ed(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        tn(l);
      } catch (e) {
        pl(t, t.return, e);
      }
    }
  }
  function ad(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        tn(l);
      } catch (e) {
        pl(t, t.return, e);
      }
  }
  function Oh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Ir()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Ir()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function Pu(l, t) {
    var e = Oh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Bh.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function St(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = l, i = t, f = i;
        l: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Xe(f.type)) {
                Hl = f.stateNode, gt = !1;
                break l;
              }
              break;
            case 5:
              Hl = f.stateNode, gt = !1;
              break l;
            case 3:
            case 4:
              Hl = f.stateNode.containerInfo, gt = !0;
              break l;
          }
          f = f.return;
        }
        if (Hl === null) throw Error(s(160));
        td(u, i, n), Hl = null, gt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        nd(t, l), t = t.sibling;
  }
  var Zt = null;
  function nd(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        St(t, l), bt(l), a & 4 && (Ue(3, l, l.return), Yn(3, l), Ue(5, l, l.return));
        break;
      case 1:
        St(t, l), bt(l), a & 512 && (Wl || e === null || $t(e, e.return)), a & 64 && se && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Zt;
        if (St(t, l), bt(l), a & 512 && (Wl || e === null || $t(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[dn] || u[tt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), ut(u, a, e), u[tt] = l, Pl(u), a = u;
                      break l;
                    case "link":
                      var i = nm(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), ut(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = nm(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), ut(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[tt] = l, Pl(u), a = u;
                }
                l.stateNode = a;
              } else
                um(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = am(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? um(
              n,
              l.type,
              l.stateNode
            ) : am(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && cf(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        St(t, l), bt(l), a & 512 && (Wl || e === null || $t(e, e.return)), e !== null && a & 4 && cf(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (St(t, l), bt(l), a & 512 && (Wl || e === null || $t(e, e.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            za(n, "");
          } catch (G) {
            pl(l, l.return, G);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, cf(
          l,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (of = !0);
        break;
      case 6:
        if (St(t, l), bt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (G) {
            pl(l, l.return, G);
          }
        }
        break;
      case 3:
        if (hi = null, n = Zt, Zt = mi(t.containerInfo), St(t, l), Zt = n, bt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            tn(t.containerInfo);
          } catch (G) {
            pl(l, l.return, G);
          }
        of && (of = !1, ud(l));
        break;
      case 4:
        a = Zt, Zt = mi(
          l.stateNode.containerInfo
        ), St(t, l), bt(l), Zt = a;
        break;
      case 12:
        St(t, l), bt(l);
        break;
      case 31:
        St(t, l), bt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Pu(l, a)));
        break;
      case 13:
        St(t, l), bt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ti = Ml()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Pu(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var r = e !== null && e.memoizedState !== null, S = se, T = Wl;
        if (se = S || n, Wl = T || r, St(t, l), Wl = T, se = S, bt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (e === null || r || se || Wl || va(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                r = e = t;
                try {
                  if (u = r.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = r.stateNode;
                    var j = r.memoizedProps.style, b = j != null && j.hasOwnProperty("display") ? j.display : null;
                    f.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (G) {
                  pl(r, r.return, G);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                r = t;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (G) {
                  pl(r, r.return, G);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                r = t;
                try {
                  var p = r.stateNode;
                  n ? $d(p, !0) : $d(r.stateNode, !1);
                } catch (G) {
                  pl(r, r.return, G);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Pu(l, e))));
        break;
      case 19:
        St(t, l), bt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Pu(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        St(t, l), bt(l);
    }
  }
  function bt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Fr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = ff(l);
            Iu(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (za(i, ""), e.flags &= -33);
            var f = ff(l);
            Iu(l, f, i);
            break;
          case 3:
          case 4:
            var r = e.stateNode.containerInfo, S = ff(l);
            sf(
              l,
              S,
              r
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        pl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function ud(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ud(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function re(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Pr(l, t.alternate, t), t = t.sibling;
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
          $t(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && $r(
            t,
            t.return,
            e
          ), va(t);
          break;
        case 27:
          $n(t.stateNode);
        case 26:
        case 5:
          $t(t, t.return), va(t);
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
  function de(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = l, u = t, i = u.flags;
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
              pl(a, a.return, S);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  qo(r[n], f);
            } catch (S) {
              pl(a, a.return, S);
            }
          }
          e && i & 64 && wr(u), Gn(u, u.return);
          break;
        case 27:
          kr(u);
        case 26:
        case 5:
          de(
            n,
            u,
            e
          ), e && a === null && i & 4 && Wr(u), Gn(u, u.return);
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
          ), e && i & 4 && ed(n, u);
          break;
        case 13:
          de(
            n,
            u,
            e
          ), e && i & 4 && ad(n, u);
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
      t = t.sibling;
    }
  }
  function rf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Nn(e));
  }
  function df(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Nn(l));
  }
  function Kt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        id(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function id(l, t, e, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Kt(
          l,
          t,
          e,
          a
        ), n & 2048 && Yn(9, t);
        break;
      case 1:
        Kt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Kt(
          l,
          t,
          e,
          a
        ), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Nn(l)));
        break;
      case 12:
        if (n & 2048) {
          Kt(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var u = t.memoizedProps, i = u.id, f = u.onPostCommit;
            typeof f == "function" && f(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (r) {
            pl(t, t.return, r);
          }
        } else
          Kt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Kt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Kt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, i = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Kt(
          l,
          t,
          e,
          a
        ) : Xn(l, t) : u._visibility & 2 ? Kt(
          l,
          t,
          e,
          a
        ) : (u._visibility |= 2, Za(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && rf(i, t);
        break;
      case 24:
        Kt(
          l,
          t,
          e,
          a
        ), n & 2048 && df(t.alternate, t);
        break;
      default:
        Kt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Za(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l, i = t, f = e, r = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(
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
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Za(
            u,
            i,
            f,
            r,
            n
          ) : Xn(
            u,
            i
          ) : (T._visibility |= 2, Za(
            u,
            i,
            f,
            r,
            n
          )), n && S & 2048 && rf(
            i.alternate,
            i
          );
          break;
        case 24:
          Za(
            u,
            i,
            f,
            r,
            n
          ), n && S & 2048 && df(i.alternate, i);
          break;
        default:
          Za(
            u,
            i,
            f,
            r,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Xn(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Xn(e, a), n & 2048 && rf(
              a.alternate,
              a
            );
            break;
          case 24:
            Xn(e, a), n & 2048 && df(a.alternate, a);
            break;
          default:
            Xn(e, a);
        }
        t = t.sibling;
      }
  }
  var Qn = 8192;
  function Ka(l, t, e) {
    if (l.subtreeFlags & Qn)
      for (l = l.child; l !== null; )
        cd(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function cd(l, t, e) {
    switch (l.tag) {
      case 26:
        Ka(
          l,
          t,
          e
        ), l.flags & Qn && l.memoizedState !== null && v0(
          e,
          Zt,
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
        var a = Zt;
        Zt = mi(l.stateNode.containerInfo), Ka(
          l,
          t,
          e
        ), Zt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Qn, Qn = 16777216, Ka(
          l,
          t,
          e
        ), Qn = a) : Ka(
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
  function fd(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Vn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          lt = a, od(
            a,
            l
          );
        }
      fd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        sd(l), l = l.sibling;
  }
  function sd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Vn(l), l.flags & 2048 && Ue(9, l, l.return);
        break;
      case 3:
        Vn(l);
        break;
      case 12:
        Vn(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, li(l)) : Vn(l);
        break;
      default:
        Vn(l);
    }
  }
  function li(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          lt = a, od(
            a,
            l
          );
        }
      fd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, t, t.return), li(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, li(t));
          break;
        default:
          li(t);
      }
      l = l.sibling;
    }
  }
  function od(l, t) {
    for (; lt !== null; ) {
      var e = lt;
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
          Nn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, lt = a;
      else
        l: for (e = l; lt !== null; ) {
          a = lt;
          var n = a.sibling, u = a.return;
          if (ld(a), a === e) {
            lt = null;
            break l;
          }
          if (n !== null) {
            n.return = u, lt = n;
            break l;
          }
          lt = u;
        }
    }
  }
  var jh = {
    getCacheForType: function(l) {
      var t = at(Jl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return at(Jl).controller.signal;
    }
  }, Dh = typeof WeakMap == "function" ? WeakMap : Map, yl = 0, Al = null, al = null, ul = 0, bl = 0, jt = null, Ce = !1, Ja = !1, mf = !1, me = 0, Gl = 0, He = 0, ha = 0, vf = 0, Dt = 0, wa = 0, Ln = null, pt = null, hf = !1, ti = 0, rd = 0, ei = 1 / 0, ai = null, qe = null, kl = 0, Be = null, $a = null, ve = 0, yf = 0, gf = null, dd = null, Zn = 0, Sf = null;
  function Mt() {
    return (yl & 2) !== 0 && ul !== 0 ? ul & -ul : E.T !== null ? zf() : xs();
  }
  function md() {
    if (Dt === 0)
      if ((ul & 536870912) === 0 || ol) {
        var l = ru;
        ru <<= 1, (ru & 3932160) === 0 && (ru = 262144), Dt = l;
      } else Dt = 536870912;
    return l = xt.current, l !== null && (l.flags |= 32), Dt;
  }
  function _t(l, t, e) {
    (l === Al && (bl === 2 || bl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), Ye(
      l,
      ul,
      Dt,
      !1
    )), rn(l, e), ((yl & 2) === 0 || l !== Al) && (l === Al && ((yl & 2) === 0 && (ha |= e), Gl === 4 && Ye(
      l,
      ul,
      Dt,
      !1
    )), Wt(l));
  }
  function vd(l, t, e) {
    if ((yl & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || on(l, t), n = a ? Uh(l, t) : pf(l, t, !0), u = a;
    do {
      if (n === 0) {
        Ja && !a && Ye(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, u && !Mh(e)) {
          n = pf(l, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, l.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var f = l;
              n = Ln;
              var r = f.current.memoizedState.isDehydrated;
              if (r && (Wa(f, i).flags |= 256), i = pf(
                f,
                i,
                !1
              ), i !== 2) {
                if (mf && !r) {
                  f.errorRecoveryDisabledLanes |= u, ha |= u, n = 4;
                  break l;
                }
                u = pt, pt = n, u !== null && (pt === null ? pt = u : pt.push.apply(
                  pt,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Wa(l, 0), Ye(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, u = n, u) {
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
              pt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (n = ti + 300 - Ml(), 10 < n)) {
            if (Ye(
              a,
              t,
              Dt,
              !Ce
            ), mu(a, 0, !0) !== 0) break l;
            ve = t, a.timeoutHandle = Kd(
              hd.bind(
                null,
                a,
                e,
                pt,
                ai,
                hf,
                t,
                Dt,
                ha,
                wa,
                Ce,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break l;
          }
          hd(
            a,
            e,
            pt,
            ai,
            hf,
            t,
            Dt,
            ha,
            wa,
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
    Wt(l);
  }
  function hd(l, t, e, a, n, u, i, f, r, S, T, j, b, p) {
    if (l.timeoutHandle = -1, j = t.subtreeFlags, j & 8192 || (j & 16785408) === 16785408) {
      j = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pt
      }, cd(
        t,
        u,
        j
      );
      var G = (u & 62914560) === u ? ti - Ml() : (u & 4194048) === u ? rd - Ml() : 0;
      if (G = h0(
        j,
        G
      ), G !== null) {
        ve = u, l.cancelPendingCommit = G(
          Td.bind(
            null,
            l,
            t,
            u,
            e,
            a,
            n,
            i,
            f,
            r,
            T,
            j,
            null,
            b,
            p
          )
        ), Ye(l, u, i, !S);
        return;
      }
    }
    Td(
      l,
      t,
      u,
      e,
      a,
      n,
      i,
      f,
      r
    );
  }
  function Mh(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Nt(u(), n)) return !1;
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
    t &= ~vf, t &= ~ha, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - zt(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && zs(l, e, t);
  }
  function ni() {
    return (yl & 6) === 0 ? (Kn(0), !1) : !0;
  }
  function bf() {
    if (al !== null) {
      if (bl === 0)
        var l = al.return;
      else
        l = al, ae = ia = null, Cc(l), Ga = null, xn = 0, l = al;
      for (; l !== null; )
        Jr(l.alternate, l), l = l.return;
      al = null;
    }
  }
  function Wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, kh(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), ve = 0, bf(), Al = l, al = e = te(l.current, null), ul = t, bl = 0, jt = null, Ce = !1, Ja = on(l, t), mf = !1, wa = Dt = vf = ha = He = Gl = 0, pt = Ln = null, hf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - zt(a), u = 1 << n;
        t |= l[n], a &= ~u;
      }
    return me = t, Nu(), e;
  }
  function yd(l, t) {
    ll = null, E.H = Hn, t === Ya || t === Uu ? (t = Ro(), bl = 3) : t === Ec ? (t = Ro(), bl = 4) : bl = t === Fc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jt = t, al === null && (Gl = 1, wu(
      l,
      qt(t, l.current)
    ));
  }
  function gd() {
    var l = xt.current;
    return l === null ? !0 : (ul & 4194048) === ul ? Xt === null : (ul & 62914560) === ul || (ul & 536870912) !== 0 ? l === Xt : !1;
  }
  function Sd() {
    var l = E.H;
    return E.H = Hn, l === null ? Hn : l;
  }
  function bd() {
    var l = E.A;
    return E.A = jh, l;
  }
  function ui() {
    Gl = 4, Ce || (ul & 4194048) !== ul && xt.current !== null || (Ja = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || Al === null || Ye(
      Al,
      ul,
      Dt,
      !1
    );
  }
  function pf(l, t, e) {
    var a = yl;
    yl |= 2;
    var n = Sd(), u = bd();
    (Al !== l || ul !== t) && (ai = null, Wa(l, t)), t = !1;
    var i = Gl;
    l: do
      try {
        if (bl !== 0 && al !== null) {
          var f = al, r = jt;
          switch (bl) {
            case 8:
              bf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              xt.current === null && (t = !0);
              var S = bl;
              if (bl = 0, jt = null, Fa(l, f, r, S), e && Ja) {
                i = 0;
                break l;
              }
              break;
            default:
              S = bl, bl = 0, jt = null, Fa(l, f, r, S);
          }
        }
        Rh(), i = Gl;
        break;
      } catch (T) {
        yd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, ae = ia = null, yl = a, E.H = n, E.A = u, al === null && (Al = null, ul = 0, Nu()), i;
  }
  function Rh() {
    for (; al !== null; ) pd(al);
  }
  function Uh(l, t) {
    var e = yl;
    yl |= 2;
    var a = Sd(), n = bd();
    Al !== l || ul !== t ? (ai = null, ei = Ml() + 500, Wa(l, t)) : Ja = on(
      l,
      t
    );
    l: do
      try {
        if (bl !== 0 && al !== null) {
          t = al;
          var u = jt;
          t: switch (bl) {
            case 1:
              bl = 0, jt = null, Fa(l, t, u, 1);
              break;
            case 2:
            case 9:
              if (Do(u)) {
                bl = 0, jt = null, _d(t);
                break;
              }
              t = function() {
                bl !== 2 && bl !== 9 || Al !== l || (bl = 7), Wt(l);
              }, u.then(t, t);
              break l;
            case 3:
              bl = 7;
              break l;
            case 4:
              bl = 5;
              break l;
            case 7:
              Do(u) ? (bl = 0, jt = null, _d(t)) : (bl = 0, jt = null, Fa(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (al.tag) {
                case 26:
                  i = al.memoizedState;
                case 5:
                case 27:
                  var f = al;
                  if (i ? im(i) : f.stateNode.complete) {
                    bl = 0, jt = null;
                    var r = f.sibling;
                    if (r !== null) al = r;
                    else {
                      var S = f.return;
                      S !== null ? (al = S, ii(S)) : al = null;
                    }
                    break t;
                  }
              }
              bl = 0, jt = null, Fa(l, t, u, 5);
              break;
            case 6:
              bl = 0, jt = null, Fa(l, t, u, 6);
              break;
            case 8:
              bf(), Gl = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        Ch();
        break;
      } catch (T) {
        yd(l, T);
      }
    while (!0);
    return ae = ia = null, E.H = a, E.A = n, yl = e, al !== null ? 0 : (Al = null, ul = 0, Nu(), Gl);
  }
  function Ch() {
    for (; al !== null && !mt(); )
      pd(al);
  }
  function pd(l) {
    var t = Zr(l.alternate, l, me);
    l.memoizedProps = l.pendingProps, t === null ? ii(l) : al = t;
  }
  function _d(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Yr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ul
        );
        break;
      case 11:
        t = Yr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ul
        );
        break;
      case 5:
        Cc(t);
      default:
        Jr(e, t), t = al = bo(t, me), t = Zr(e, t, me);
    }
    l.memoizedProps = l.pendingProps, t === null ? ii(l) : al = t;
  }
  function Fa(l, t, e, a) {
    ae = ia = null, Cc(t), Ga = null, xn = 0;
    var n = t.return;
    try {
      if (Eh(
        l,
        n,
        t,
        e,
        ul
      )) {
        Gl = 1, wu(
          l,
          qt(e, l.current)
        ), al = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw al = n, u;
      Gl = 1, wu(
        l,
        qt(e, l.current)
      ), al = null;
      return;
    }
    t.flags & 32768 ? (ol || a === 1 ? l = !0 : Ja || (ul & 536870912) !== 0 ? l = !1 : (Ce = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = xt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ed(t, l)) : ii(t);
  }
  function ii(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Ed(
          t,
          Ce
        );
        return;
      }
      l = t.return;
      var e = Nh(
        t.alternate,
        t,
        me
      );
      if (e !== null) {
        al = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        al = t;
        return;
      }
      al = t = l;
    } while (t !== null);
    Gl === 0 && (Gl = 5);
  }
  function Ed(l, t) {
    do {
      var e = Ah(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, al = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        al = l;
        return;
      }
      al = l = e;
    } while (l !== null);
    Gl = 6, al = null;
  }
  function Td(l, t, e, a, n, u, i, f, r) {
    l.cancelPendingCommit = null;
    do
      ci();
    while (kl !== 0);
    if ((yl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (u = t.lanes | t.childLanes, u |= cc, mv(
        l,
        e,
        u,
        i,
        f,
        r
      ), l === Al && (al = Al = null, ul = 0), $a = t, Be = l, ve = e, yf = u, gf = n, dd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Yh(ke, function() {
        return Od(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, n = B.p, B.p = 2, i = yl, yl |= 4;
        try {
          xh(l, t, e);
        } finally {
          yl = i, B.p = n, E.T = a;
        }
      }
      kl = 1, zd(), Nd(), Ad();
    }
  }
  function zd() {
    if (kl === 1) {
      kl = 0;
      var l = Be, t = $a, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = B.p;
        B.p = 2;
        var n = yl;
        yl |= 4;
        try {
          nd(t, l);
          var u = Rf, i = so(l.containerInfo), f = u.focusedElem, r = u.selectionRange;
          if (i !== f && f && f.ownerDocument && fo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (r !== null && ec(f)) {
              var S = r.start, T = r.end;
              if (T === void 0 && (T = S), "selectionStart" in f)
                f.selectionStart = S, f.selectionEnd = Math.min(
                  T,
                  f.value.length
                );
              else {
                var j = f.ownerDocument || document, b = j && j.defaultView || window;
                if (b.getSelection) {
                  var p = b.getSelection(), G = f.textContent.length, K = Math.min(r.start, G), Nl = r.end === void 0 ? K : Math.min(r.end, G);
                  !p.extend && K > Nl && (i = Nl, Nl = K, K = i);
                  var h = co(
                    f,
                    K
                  ), m = co(
                    f,
                    Nl
                  );
                  if (h && m && (p.rangeCount !== 1 || p.anchorNode !== h.node || p.anchorOffset !== h.offset || p.focusNode !== m.node || p.focusOffset !== m.offset)) {
                    var g = j.createRange();
                    g.setStart(h.node, h.offset), p.removeAllRanges(), K > Nl ? (p.addRange(g), p.extend(m.node, m.offset)) : (g.setEnd(m.node, m.offset), p.addRange(g));
                  }
                }
              }
            }
            for (j = [], p = f; p = p.parentNode; )
              p.nodeType === 1 && j.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < j.length; f++) {
              var N = j[f];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          bi = !!Mf, Rf = Mf = null;
        } finally {
          yl = n, B.p = a, E.T = e;
        }
      }
      l.current = t, kl = 2;
    }
  }
  function Nd() {
    if (kl === 2) {
      kl = 0;
      var l = Be, t = $a, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = B.p;
        B.p = 2;
        var n = yl;
        yl |= 4;
        try {
          Pr(l, t.alternate, t);
        } finally {
          yl = n, B.p = a, E.T = e;
        }
      }
      kl = 3;
    }
  }
  function Ad() {
    if (kl === 4 || kl === 3) {
      kl = 0, Vl();
      var l = Be, t = $a, e = ve, a = dd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? kl = 5 : (kl = 0, $a = Be = null, xd(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (qe = null), Bi(e), t = t.stateNode, Tt && typeof Tt.onCommitFiberRoot == "function")
        try {
          Tt.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, n = B.p, B.p = 2, E.T = null;
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          E.T = t, B.p = n;
        }
      }
      (ve & 3) !== 0 && ci(), Wt(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === Sf ? Zn++ : (Zn = 0, Sf = l) : Zn = 0, Kn(0);
    }
  }
  function xd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Nn(t)));
  }
  function ci() {
    return zd(), Nd(), Ad(), Od();
  }
  function Od() {
    if (kl !== 5) return !1;
    var l = Be, t = yf;
    yf = 0;
    var e = Bi(ve), a = E.T, n = B.p;
    try {
      B.p = 32 > e ? 32 : e, E.T = null, e = gf, gf = null;
      var u = Be, i = ve;
      if (kl = 0, $a = Be = null, ve = 0, (yl & 6) !== 0) throw Error(s(331));
      var f = yl;
      if (yl |= 4, sd(u.current), id(
        u,
        u.current,
        i,
        e
      ), yl = f, Kn(0, !1), Tt && typeof Tt.onPostCommitFiberRoot == "function")
        try {
          Tt.onPostCommitFiberRoot(kt, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = n, E.T = a, xd(l, t);
    }
  }
  function jd(l, t, e) {
    t = qt(e, t), t = Wc(l.stateNode, t, 2), l = De(l, t, 2), l !== null && (rn(l, 2), Wt(l));
  }
  function pl(l, t, e) {
    if (l.tag === 3)
      jd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          jd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            l = qt(e, l), e = Dr(2), a = De(t, e, 2), a !== null && (Mr(
              e,
              a,
              t,
              l
            ), rn(a, 2), Wt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function _f(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Dh();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(e) || (mf = !0, n.add(e), l = Hh.bind(null, l, t, e), t.then(l, l));
  }
  function Hh(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Al === l && (ul & e) === e && (Gl === 4 || Gl === 3 && (ul & 62914560) === ul && 300 > Ml() - ti ? (yl & 2) === 0 && Wa(l, 0) : vf |= e, wa === ul && (wa = 0)), Wt(l);
  }
  function Dd(l, t) {
    t === 0 && (t = Ts()), l = aa(l, t), l !== null && (rn(l, t), Wt(l));
  }
  function qh(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Dd(l, e);
  }
  function Bh(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, n = l.memoizedState;
        n !== null && (e = n.retryLane);
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
  function Yh(l, t) {
    return Dl(l, t);
  }
  var fi = null, ka = null, Ef = !1, si = !1, Tf = !1, Ge = 0;
  function Wt(l) {
    l !== ka && l.next === null && (ka === null ? fi = ka = l : ka = ka.next = l), si = !0, Ef || (Ef = !0, Xh());
  }
  function Kn(l, t) {
    if (!Tf && si) {
      Tf = !0;
      do
        for (var e = !1, a = fi; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - zt(42 | l) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Cd(a, u));
          } else
            u = ul, u = mu(
              a,
              a === Al ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || on(a, u) || (e = !0, Cd(a, u));
          a = a.next;
        }
      while (e);
      Tf = !1;
    }
  }
  function Gh() {
    Md();
  }
  function Md() {
    si = Ef = !1;
    var l = 0;
    Ge !== 0 && Fh() && (l = Ge);
    for (var t = Ml(), e = null, a = fi; a !== null; ) {
      var n = a.next, u = Rd(a, t);
      u === 0 ? (a.next = null, e === null ? fi = n : e.next = n, n === null && (ka = e)) : (e = a, (l !== 0 || (u & 3) !== 0) && (si = !0)), a = n;
    }
    kl !== 0 && kl !== 5 || Kn(l), Ge !== 0 && (Ge = 0);
  }
  function Rd(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - zt(u), f = 1 << i, r = n[i];
      r === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = dv(f, t)) : r <= t && (l.expiredLanes |= f), u &= ~f;
    }
    if (t = Al, e = ul, e = mu(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (bl === 2 || bl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && dt(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || on(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && dt(a), Bi(e)) {
        case 2:
        case 8:
          e = fn;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = Rt;
          break;
        default:
          e = ke;
      }
      return a = Ud.bind(null, l), e = Dl(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && dt(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Ud(l, t) {
    if (kl !== 0 && kl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ci() && l.callbackNode !== e)
      return null;
    var a = ul;
    return a = mu(
      l,
      l === Al ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (vd(l, a, t), Rd(l, Ml()), l.callbackNode != null && l.callbackNode === e ? Ud.bind(null, l) : null);
  }
  function Cd(l, t) {
    if (ci()) return null;
    vd(l, t, !0);
  }
  function Xh() {
    Ih(function() {
      (yl & 6) !== 0 ? Dl(
        pe,
        Gh
      ) : Md();
    });
  }
  function zf() {
    if (Ge === 0) {
      var l = qa;
      l === 0 && (l = ou, ou <<= 1, (ou & 261888) === 0 && (ou = 256)), Ge = l;
    }
    return Ge;
  }
  function Hd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : gu("" + l);
  }
  function qd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Qh(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = Hd(
        (n[ht] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ht] || null) ? Hd(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var f = new _u(
        "action",
        "action",
        null,
        a,
        n
      );
      l.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Ge !== 0) {
                  var r = i ? qd(n, i) : new FormData(n);
                  Lc(
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
                typeof u == "function" && (f.preventDefault(), r = i ? qd(n, i) : new FormData(n), Lc(
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
  for (var Nf = 0; Nf < ic.length; Nf++) {
    var Af = ic[Nf], Vh = Af.toLowerCase(), Lh = Af[0].toUpperCase() + Af.slice(1);
    Lt(
      Vh,
      "on" + Lh
    );
  }
  Lt(mo, "onAnimationEnd"), Lt(vo, "onAnimationIteration"), Lt(ho, "onAnimationStart"), Lt("dblclick", "onDoubleClick"), Lt("focusin", "onFocus"), Lt("focusout", "onBlur"), Lt(uh, "onTransitionRun"), Lt(ih, "onTransitionStart"), Lt(ch, "onTransitionCancel"), Lt(yo, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Pe(
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
  ), Zh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jn)
  );
  function Bd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], r = f.instance, S = f.currentTarget;
            if (f = f.listener, r !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (T) {
              zu(T);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], r = f.instance, S = f.currentTarget, f = f.listener, r !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (T) {
              zu(T);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function nl(l, t) {
    var e = t[Yi];
    e === void 0 && (e = t[Yi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Yd(t, l, 2, !1), e.add(a));
  }
  function xf(l, t, e) {
    var a = 0;
    t && (a |= 4), Yd(
      e,
      l,
      a,
      t
    );
  }
  var oi = "_reactListening" + Math.random().toString(36).slice(2);
  function Of(l) {
    if (!l[oi]) {
      l[oi] = !0, Ds.forEach(function(e) {
        e !== "selectionchange" && (Zh.has(e) || xf(e, !1, l), xf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[oi] || (t[oi] = !0, xf("selectionchange", !1, t));
    }
  }
  function Yd(l, t, e, a) {
    switch (mm(t)) {
      case 2:
        var n = S0;
        break;
      case 8:
        n = b0;
        break;
      default:
        n = Lf;
    }
    e = n.bind(
      null,
      t,
      e,
      l
    ), n = void 0, !wi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, e, !0) : n !== void 0 ? l.addEventListener(t, e, {
      passive: n
    }) : l.addEventListener(t, e, !1);
  }
  function jf(l, t, e, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
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
            if (i = ba(f), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = i;
              continue l;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Vs(function() {
      var S = u, T = Ki(e), j = [];
      l: {
        var b = go.get(l);
        if (b !== void 0) {
          var p = _u, G = l;
          switch (l) {
            case "keypress":
              if (bu(e) === 0) break l;
            case "keydown":
            case "keyup":
              p = Bv;
              break;
            case "focusin":
              G = "focus", p = ki;
              break;
            case "focusout":
              G = "blur", p = ki;
              break;
            case "beforeblur":
            case "afterblur":
              p = ki;
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
              p = Ks;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = Nv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = Xv;
              break;
            case mo:
            case vo:
            case ho:
              p = Ov;
              break;
            case yo:
              p = Vv;
              break;
            case "scroll":
            case "scrollend":
              p = Tv;
              break;
            case "wheel":
              p = Zv;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = Dv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = ws;
              break;
            case "toggle":
            case "beforetoggle":
              p = Jv;
          }
          var K = (t & 4) !== 0, Nl = !K && (l === "scroll" || l === "scrollend"), h = K ? b !== null ? b + "Capture" : null : b;
          K = [];
          for (var m = S, g; m !== null; ) {
            var N = m;
            if (g = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || g === null || h === null || (N = vn(m, h), N != null && K.push(
              wn(m, N, g)
            )), Nl) break;
            m = m.return;
          }
          0 < K.length && (b = new p(
            b,
            G,
            null,
            e,
            T
          ), j.push({ event: b, listeners: K }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (b = l === "mouseover" || l === "pointerover", p = l === "mouseout" || l === "pointerout", b && e !== Zi && (G = e.relatedTarget || e.fromElement) && (ba(G) || G[Sa]))
            break l;
          if ((p || b) && (b = T.window === T ? T : (b = T.ownerDocument) ? b.defaultView || b.parentWindow : window, p ? (G = e.relatedTarget || e.toElement, p = S, G = G ? ba(G) : null, G !== null && (Nl = R(G), K = G.tag, G !== Nl || K !== 5 && K !== 27 && K !== 6) && (G = null)) : (p = null, G = S), p !== G)) {
            if (K = Ks, N = "onMouseLeave", h = "onMouseEnter", m = "mouse", (l === "pointerout" || l === "pointerover") && (K = ws, N = "onPointerLeave", h = "onPointerEnter", m = "pointer"), Nl = p == null ? b : mn(p), g = G == null ? b : mn(G), b = new K(
              N,
              m + "leave",
              p,
              e,
              T
            ), b.target = Nl, b.relatedTarget = g, N = null, ba(T) === S && (K = new K(
              h,
              m + "enter",
              G,
              e,
              T
            ), K.target = g, K.relatedTarget = Nl, N = K), Nl = N, p && G)
              t: {
                for (K = Kh, h = p, m = G, g = 0, N = h; N; N = K(N))
                  g++;
                N = 0;
                for (var V = m; V; V = K(V))
                  N++;
                for (; 0 < g - N; )
                  h = K(h), g--;
                for (; 0 < N - g; )
                  m = K(m), N--;
                for (; g--; ) {
                  if (h === m || m !== null && h === m.alternate) {
                    K = h;
                    break t;
                  }
                  h = K(h), m = K(m);
                }
                K = null;
              }
            else K = null;
            p !== null && Gd(
              j,
              b,
              p,
              K,
              !1
            ), G !== null && Nl !== null && Gd(
              j,
              Nl,
              G,
              K,
              !0
            );
          }
        }
        l: {
          if (b = S ? mn(S) : window, p = b.nodeName && b.nodeName.toLowerCase(), p === "select" || p === "input" && b.type === "file")
            var ml = to;
          else if (Ps(b))
            if (eo)
              ml = eh;
            else {
              ml = lh;
              var X = Pv;
            }
          else
            p = b.nodeName, !p || p.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? S && Li(S.elementType) && (ml = to) : ml = th;
          if (ml && (ml = ml(l, S))) {
            lo(
              j,
              ml,
              e,
              T
            );
            break l;
          }
          X && X(l, b, S), l === "focusout" && S && b.type === "number" && S.memoizedProps.value != null && Vi(b, "number", b.value);
        }
        switch (X = S ? mn(S) : window, l) {
          case "focusin":
            (Ps(X) || X.contentEditable === "true") && (Oa = X, ac = S, En = null);
            break;
          case "focusout":
            En = ac = Oa = null;
            break;
          case "mousedown":
            nc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            nc = !1, oo(j, e, T);
            break;
          case "selectionchange":
            if (nh) break;
          case "keydown":
          case "keyup":
            oo(j, e, T);
        }
        var tl;
        if (Pi)
          l: {
            switch (l) {
              case "compositionstart":
                var il = "onCompositionStart";
                break l;
              case "compositionend":
                il = "onCompositionEnd";
                break l;
              case "compositionupdate":
                il = "onCompositionUpdate";
                break l;
            }
            il = void 0;
          }
        else
          xa ? ks(l, e) && (il = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (il = "onCompositionStart");
        il && ($s && e.locale !== "ko" && (xa || il !== "onCompositionStart" ? il === "onCompositionEnd" && xa && (tl = Ls()) : (Te = T, $i = "value" in Te ? Te.value : Te.textContent, xa = !0)), X = ri(S, il), 0 < X.length && (il = new Js(
          il,
          l,
          null,
          e,
          T
        ), j.push({ event: il, listeners: X }), tl ? il.data = tl : (tl = Is(e), tl !== null && (il.data = tl)))), (tl = $v ? Wv(l, e) : Fv(l, e)) && (il = ri(S, "onBeforeInput"), 0 < il.length && (X = new Js(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), j.push({
          event: X,
          listeners: il
        }), X.data = tl)), Qh(
          j,
          l,
          S,
          e,
          T
        );
      }
      Bd(j, t);
    });
  }
  function wn(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function ri(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = vn(l, e), n != null && a.unshift(
        wn(l, n, u)
      ), n = vn(l, t), n != null && a.push(
        wn(l, n, u)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Kh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Gd(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var f = e, r = f.alternate, S = f.stateNode;
      if (f = f.tag, r !== null && r === a) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (r = S, n ? (S = vn(e, u), S != null && i.unshift(
        wn(e, S, r)
      )) : n || (S = vn(e, u), S != null && i.push(
        wn(e, S, r)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Jh = /\r\n?/g, wh = /\u0000|\uFFFD/g;
  function Xd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Jh, `
`).replace(wh, "");
  }
  function Qd(l, t) {
    return t = Xd(t), Xd(l) === t;
  }
  function zl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || za(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && za(l, "" + a);
        break;
      case "className":
        hu(l, "class", a);
        break;
      case "tabIndex":
        hu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hu(l, e, a);
        break;
      case "style":
        Xs(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          hu(l, "data", a);
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
        a = gu("" + a), l.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (t !== "input" && zl(l, t, "name", n.name, n, null), zl(
            l,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), zl(
            l,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), zl(
            l,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (zl(l, t, "encType", n.encType, n, null), zl(l, t, "method", n.method, n, null), zl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = gu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Pt);
        break;
      case "onScroll":
        a != null && nl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && nl("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
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
        e = gu("" + a), l.setAttributeNS(
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
        nl("beforetoggle", l), nl("toggle", l), vu(l, "popover", a);
        break;
      case "xlinkActuate":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        It(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        It(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        It(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        It(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        vu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = _v.get(e) || e, vu(l, e, a));
    }
  }
  function Df(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        Xs(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? za(l, a) : (typeof a == "number" || typeof a == "bigint") && za(l, "" + a);
        break;
      case "onScroll":
        a != null && nl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && nl("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Pt);
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
        if (!Ms.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), t = e.slice(2, n ? e.length - 7 : void 0), u = l[ht] || null, u = u != null ? u[e] : null, typeof u == "function" && l.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, n);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : vu(l, e, a);
          }
    }
  }
  function ut(l, t, e) {
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
        nl("error", l), nl("load", l);
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
                  throw Error(s(137, t));
                default:
                  zl(l, t, u, i, e, null);
              }
          }
        n && zl(l, t, "srcSet", e.srcSet, e, null), a && zl(l, t, "src", e.src, e, null);
        return;
      case "input":
        nl("invalid", l);
        var f = u = i = n = null, r = null, S = null;
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
                  r = T;
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
                    throw Error(s(137, t));
                  break;
                default:
                  zl(l, t, a, T, e, null);
              }
          }
        qs(
          l,
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
        nl("invalid", l), a = i = u = null;
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
                zl(l, t, n, f, e, null);
            }
        t = u, e = i, l.multiple = !!a, t != null ? Ta(l, !!a, t, !1) : e != null && Ta(l, !!a, e, !0);
        return;
      case "textarea":
        nl("invalid", l), u = n = a = null;
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
                zl(l, t, i, f, e, null);
            }
        Ys(l, a, n, u);
        return;
      case "option":
        for (r in e)
          if (e.hasOwnProperty(r) && (a = e[r], a != null))
            switch (r) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                zl(l, t, r, a, e, null);
            }
        return;
      case "dialog":
        nl("beforetoggle", l), nl("toggle", l), nl("cancel", l), nl("close", l);
        break;
      case "iframe":
      case "object":
        nl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Jn.length; a++)
          nl(Jn[a], l);
        break;
      case "image":
        nl("error", l), nl("load", l);
        break;
      case "details":
        nl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        nl("error", l), nl("load", l);
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
                throw Error(s(137, t));
              default:
                zl(l, t, S, a, e, null);
            }
        return;
      default:
        if (Li(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Df(
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
    for (f in e)
      e.hasOwnProperty(f) && (a = e[f], a != null && zl(l, t, f, a, e, null));
  }
  function $h(l, t, e, a) {
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
        var n = null, u = null, i = null, f = null, r = null, S = null, T = null;
        for (p in e) {
          var j = e[p];
          if (e.hasOwnProperty(p) && j != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = j;
              default:
                a.hasOwnProperty(p) || zl(l, t, p, null, a, j);
            }
        }
        for (var b in a) {
          var p = a[b];
          if (j = e[b], a.hasOwnProperty(b) && (p != null || j != null))
            switch (b) {
              case "type":
                u = p;
                break;
              case "name":
                n = p;
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
                  throw Error(s(137, t));
                break;
              default:
                p !== j && zl(
                  l,
                  t,
                  b,
                  p,
                  a,
                  j
                );
            }
        }
        Qi(
          l,
          i,
          f,
          r,
          S,
          T,
          u,
          n
        );
        return;
      case "select":
        p = i = f = b = null;
        for (u in e)
          if (r = e[u], e.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                p = r;
              default:
                a.hasOwnProperty(u) || zl(
                  l,
                  t,
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
                b = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== r && zl(
                  l,
                  t,
                  n,
                  u,
                  a,
                  r
                );
            }
        t = f, e = i, a = p, b != null ? Ta(l, !!e, b, !1) : !!a != !!e && (t != null ? Ta(l, !!e, t, !0) : Ta(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        p = b = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                zl(l, t, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                b = n;
                break;
              case "defaultValue":
                p = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && zl(l, t, i, n, a, u);
            }
        Bs(l, b, p);
        return;
      case "option":
        for (var G in e)
          if (b = e[G], e.hasOwnProperty(G) && b != null && !a.hasOwnProperty(G))
            switch (G) {
              case "selected":
                l.selected = !1;
                break;
              default:
                zl(
                  l,
                  t,
                  G,
                  null,
                  a,
                  b
                );
            }
        for (r in a)
          if (b = a[r], p = e[r], a.hasOwnProperty(r) && b !== p && (b != null || p != null))
            switch (r) {
              case "selected":
                l.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                zl(
                  l,
                  t,
                  r,
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
          b = e[K], e.hasOwnProperty(K) && b != null && !a.hasOwnProperty(K) && zl(l, t, K, null, a, b);
        for (S in a)
          if (b = a[S], p = e[S], a.hasOwnProperty(S) && b !== p && (b != null || p != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(s(137, t));
                break;
              default:
                zl(
                  l,
                  t,
                  S,
                  b,
                  a,
                  p
                );
            }
        return;
      default:
        if (Li(t)) {
          for (var Nl in e)
            b = e[Nl], e.hasOwnProperty(Nl) && b !== void 0 && !a.hasOwnProperty(Nl) && Df(
              l,
              t,
              Nl,
              void 0,
              a,
              b
            );
          for (T in a)
            b = a[T], p = e[T], !a.hasOwnProperty(T) || b === p || b === void 0 && p === void 0 || Df(
              l,
              t,
              T,
              b,
              a,
              p
            );
          return;
        }
    }
    for (var h in e)
      b = e[h], e.hasOwnProperty(h) && b != null && !a.hasOwnProperty(h) && zl(l, t, h, null, a, b);
    for (j in a)
      b = a[j], p = e[j], !a.hasOwnProperty(j) || b === p || b == null && p == null || zl(l, t, j, b, a, p);
  }
  function Vd(l) {
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
  function Wh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Vd(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], S = r.startTime;
            if (S > f) break;
            var T = r.transferSize, j = r.initiatorType;
            T && Vd(j) && (r = r.responseEnd, i += T * (r < f ? 1 : (f - S) / (r - S)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Mf = null, Rf = null;
  function di(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Ld(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Zd(l, t) {
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
  function Uf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Cf = null;
  function Fh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Cf ? !1 : (Cf = l, !0) : (Cf = null, !1);
  }
  var Kd = typeof setTimeout == "function" ? setTimeout : void 0, kh = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Ih = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jd < "u" ? function(l) {
    return Jd.resolve(null).then(l).catch(Ph);
  } : Kd;
  function Ph(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Xe(l) {
    return l === "head";
  }
  function wd(l, t) {
    var e = t, a = 0;
    do {
      var n = e.nextSibling;
      if (l.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(n), tn(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          $n(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, $n(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[dn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && $n(l.ownerDocument.body);
      e = n;
    } while (e);
    tn(t);
  }
  function $d(l, t) {
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
  function Hf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hf(e), Gi(e);
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
  function l0(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var n = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[dn])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (u = l.getAttribute("rel"), u === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || l.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || l.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (u = l.getAttribute("src"), (u !== (n.src == null ? null : n.src) || l.getAttribute("type") !== (n.type == null ? null : n.type) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u)
          return l;
      } else return l;
      if (l = Qt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function t0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Qt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Wd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Qt(l.nextSibling), l === null)) return null;
    return l;
  }
  function qf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Bf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function e0(l, t) {
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
  function Qt(l) {
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
  var Yf = null;
  function Fd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Qt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function kd(l) {
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
  function Id(l, t, e) {
    switch (t = di(e), l) {
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
  function $n(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Gi(l);
  }
  var Vt = /* @__PURE__ */ new Map(), Pd = /* @__PURE__ */ new Set();
  function mi(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var he = B.d;
  B.d = {
    f: a0,
    r: n0,
    D: u0,
    C: i0,
    L: c0,
    m: f0,
    X: o0,
    S: s0,
    M: r0
  };
  function a0() {
    var l = he.f(), t = ni();
    return l || t;
  }
  function n0(l) {
    var t = pa(l);
    t !== null && t.tag === 5 && t.type === "form" ? yr(t) : he.r(l);
  }
  var Ia = typeof document > "u" ? null : document;
  function lm(l, t, e) {
    var a = Ia;
    if (a && typeof t == "string" && t) {
      var n = Ct(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Pd.has(n) || (Pd.add(n), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), ut(t, "link", l), Pl(t), a.head.appendChild(t)));
    }
  }
  function u0(l) {
    he.D(l), lm("dns-prefetch", l, null);
  }
  function i0(l, t) {
    he.C(l, t), lm("preconnect", l, t);
  }
  function c0(l, t, e) {
    he.L(l, t, e);
    var a = Ia;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + Ct(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Ct(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Ct(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Ct(l) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Pa(l);
          break;
        case "script":
          u = ln(l);
      }
      Vt.has(u) || (l = M(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Vt.set(u, l), a.querySelector(n) !== null || t === "style" && a.querySelector(Wn(u)) || t === "script" && a.querySelector(Fn(u)) || (t = a.createElement("link"), ut(t, "link", l), Pl(t), a.head.appendChild(t)));
    }
  }
  function f0(l, t) {
    he.m(l, t);
    var e = Ia;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Ct(a) + '"][href="' + Ct(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ln(l);
      }
      if (!Vt.has(u) && (l = M({ rel: "modulepreload", href: l }, t), Vt.set(u, l), e.querySelector(n) === null)) {
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
        a = e.createElement("link"), ut(a, "link", l), Pl(a), e.head.appendChild(a);
      }
    }
  }
  function s0(l, t, e) {
    he.S(l, t, e);
    var a = Ia;
    if (a && l) {
      var n = _a(a).hoistableStyles, u = Pa(l);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Wn(u)
        ))
          f.loading = 5;
        else {
          l = M(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Vt.get(u)) && Gf(l, e);
          var r = i = a.createElement("link");
          Pl(r), ut(r, "link", l), r._p = new Promise(function(S, T) {
            r.onload = S, r.onerror = T;
          }), r.addEventListener("load", function() {
            f.loading |= 1;
          }), r.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, vi(i, t, a);
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
  function o0(l, t) {
    he.X(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, n = ln(l), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (l = M({ src: l, async: !0 }, t), (t = Vt.get(n)) && Xf(l, t), u = e.createElement("script"), Pl(u), ut(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function r0(l, t) {
    he.M(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, n = ln(l), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (l = M({ src: l, async: !0, type: "module" }, t), (t = Vt.get(n)) && Xf(l, t), u = e.createElement("script"), Pl(u), ut(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function tm(l, t, e, a) {
    var n = (n = P.current) ? mi(n) : null;
    if (!n) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Pa(e.href), e = _a(
          n
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Pa(e.href);
          var u = _a(
            n
          ).hoistableStyles, i = u.get(l);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(l, i), (u = n.querySelector(
            Wn(l)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Vt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Vt.set(l, e), u || d0(
            n,
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
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ln(e), e = _a(
          n
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
    return 'href="' + Ct(l) + '"';
  }
  function Wn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function em(l) {
    return M({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function d0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), ut(t, "link", e), Pl(t), l.head.appendChild(t));
  }
  function ln(l) {
    return '[src="' + Ct(l) + '"]';
  }
  function Fn(l) {
    return "script[async]" + l;
  }
  function am(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Ct(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Pl(a), a;
          var n = M({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Pl(a), ut(a, "style", n), vi(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          n = Pa(e.href);
          var u = l.querySelector(
            Wn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Pl(u), u;
          a = em(e), (n = Vt.get(n)) && Gf(a, n), u = (l.ownerDocument || l).createElement("link"), Pl(u);
          var i = u;
          return i._p = new Promise(function(f, r) {
            i.onload = f, i.onerror = r;
          }), ut(u, "link", a), t.state.loading |= 4, vi(u, e.precedence, l), t.instance = u;
        case "script":
          return u = ln(e.src), (n = l.querySelector(
            Fn(u)
          )) ? (t.instance = n, Pl(n), n) : (a = e, (n = Vt.get(u)) && (a = M({}, e), Xf(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), Pl(n), ut(n, "link", a), l.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, vi(a, e.precedence, l));
    return t.instance;
  }
  function vi(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(l, u.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Gf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Xf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var hi = null;
  function nm(l, t, e) {
    if (hi === null) {
      var a = /* @__PURE__ */ new Map(), n = hi = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = hi, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[dn] || u[tt] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function um(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function m0(l, t, e) {
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
  function im(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function v0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Pa(a.href), u = t.querySelector(
          Wn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = yi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, Pl(u);
          return;
        }
        u = t.ownerDocument || t, a = em(a), (n = Vt.get(n)) && Gf(a, n), u = u.createElement("link"), Pl(u);
        var i = u;
        i._p = new Promise(function(f, r) {
          i.onload = f, i.onerror = r;
        }), ut(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = yi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Qf = 0;
  function h0(l, t) {
    return l.stylesheets && l.count === 0 && Si(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Si(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Qf === 0 && (Qf = 62500 * Wh());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Si(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > Qf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function yi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Si(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var gi = null;
  function Si(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, gi = /* @__PURE__ */ new Map(), t.forEach(y0, l), gi = null, yi.call(l));
  }
  function y0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = gi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), gi.set(l, e);
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = yi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var kn = {
    $$typeof: _l,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function g0(l, t, e, a, n, u, i, f, r) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Hi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Hi(0), this.hiddenUpdates = Hi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function cm(l, t, e, a, n, u, i, f, r, S, T, j) {
    return l = new g0(
      l,
      t,
      e,
      i,
      r,
      S,
      T,
      j,
      f
    ), t = 1, u === !0 && (t |= 24), u = At(3, null, null, t), l.current = u, u.stateNode = l, t = bc(), t.refCount++, l.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Tc(u), l;
  }
  function fm(l) {
    return l ? (l = Ma, l) : Ma;
  }
  function sm(l, t, e, a, n, u) {
    n = fm(n), a.context === null ? a.context = n : a.pendingContext = n, a = je(t), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = De(l, a, t), e !== null && (_t(e, l, t), jn(e, l, t));
  }
  function om(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Vf(l, t) {
    om(l, t), (l = l.alternate) && om(l, t);
  }
  function rm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = aa(l, 67108864);
      t !== null && _t(t, l, 67108864), Vf(l, 67108864);
    }
  }
  function dm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mt();
      t = qi(t);
      var e = aa(l, t);
      e !== null && _t(e, l, t), Vf(l, t);
    }
  }
  var bi = !0;
  function S0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = B.p;
    try {
      B.p = 2, Lf(l, t, e, a);
    } finally {
      B.p = u, E.T = n;
    }
  }
  function b0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = B.p;
    try {
      B.p = 8, Lf(l, t, e, a);
    } finally {
      B.p = u, E.T = n;
    }
  }
  function Lf(l, t, e, a) {
    if (bi) {
      var n = Zf(a);
      if (n === null)
        jf(
          l,
          t,
          a,
          pi,
          e
        ), vm(l, a);
      else if (_0(
        n,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (vm(l, a), t & 4 && -1 < p0.indexOf(l)) {
        for (; n !== null; ) {
          var u = pa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Ie(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - zt(i);
                      f.entanglements[1] |= r, i &= ~r;
                    }
                    Wt(u), (yl & 6) === 0 && (ei = Ml() + 500, Kn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = aa(u, 2), f !== null && _t(f, u, 2), ni(), Vf(u, 2);
            }
          if (u = Zf(a), u === null && jf(
            l,
            t,
            a,
            pi,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        jf(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Zf(l) {
    return l = Ki(l), Kf(l);
  }
  var pi = null;
  function Kf(l) {
    if (pi = null, l = ba(l), l !== null) {
      var t = R(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = z(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = C(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return pi = l, null;
  }
  function mm(l) {
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
          case fn:
            return 8;
          case ke:
          case vt:
            return 32;
          case Rt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jf = !1, Qe = null, Ve = null, Le = null, In = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Ze = [], p0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function vm(l, t) {
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
        In.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pn.delete(t.pointerId);
    }
  }
  function lu(l, t, e, a, n, u) {
    return l === null || l.nativeEvent !== u ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = pa(t), t !== null && rm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function _0(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return Qe = lu(
          Qe,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Ve = lu(
          Ve,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Le = lu(
          Le,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return In.set(
          u,
          lu(
            In.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Pn.set(
          u,
          lu(
            Pn.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function hm(l) {
    var t = ba(l.target);
    if (t !== null) {
      var e = R(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = z(e), t !== null) {
            l.blockedOn = t, Os(l.priority, function() {
              dm(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = C(e), t !== null) {
            l.blockedOn = t, Os(l.priority, function() {
              dm(e);
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
  function _i(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Zf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Zi = a, e.target.dispatchEvent(a), Zi = null;
      } else
        return t = pa(e), t !== null && rm(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function ym(l, t, e) {
    _i(l) && e.delete(t);
  }
  function E0() {
    Jf = !1, Qe !== null && _i(Qe) && (Qe = null), Ve !== null && _i(Ve) && (Ve = null), Le !== null && _i(Le) && (Le = null), In.forEach(ym), Pn.forEach(ym);
  }
  function Ei(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Jf || (Jf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      E0
    )));
  }
  var Ti = null;
  function gm(l) {
    Ti !== l && (Ti = l, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ti === l && (Ti = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], n = l[t + 2];
          if (typeof a != "function") {
            if (Kf(a || e) === null)
              continue;
            break;
          }
          var u = pa(e);
          u !== null && (l.splice(t, 3), t -= 3, Lc(
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
  function tn(l) {
    function t(r) {
      return Ei(r, l);
    }
    Qe !== null && Ei(Qe, l), Ve !== null && Ei(Ve, l), Le !== null && Ei(Le, l), In.forEach(t), Pn.forEach(t);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      hm(e), e.blockedOn === null && Ze.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[ht] || null;
        if (typeof u == "function")
          i || gm(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[ht] || null)
              f = i.formAction;
            else if (Kf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), gm(e);
        }
      }
  }
  function Sm() {
    function l(u) {
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
    function t() {
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
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function wf(l) {
    this._internalRoot = l;
  }
  zi.prototype.render = wf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = Mt();
    sm(e, a, l, t, null, null);
  }, zi.prototype.unmount = wf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      sm(l.current, 2, null, l, null, null), ni(), t[Sa] = null;
    }
  };
  function zi(l) {
    this._internalRoot = l;
  }
  zi.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = xs();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ze.length && t !== 0 && t < Ze[e].priority; e++) ;
      Ze.splice(e, 0, l), e === 0 && hm(l);
    }
  };
  var bm = y.version;
  if (bm !== "19.2.6")
    throw Error(
      s(
        527,
        bm,
        "19.2.6"
      )
    );
  B.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = _(t), l = l !== null ? U(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var T0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ni = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ni.isDisabled && Ni.supportsFiber)
      try {
        kt = Ni.inject(
          T0
        ), Tt = Ni;
      } catch {
      }
  }
  return eu.createRoot = function(l, t) {
    if (!D(l)) throw Error(s(299));
    var e = !1, a = "", n = Ar, u = xr, i = Or;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = cm(
      l,
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
      Sm
    ), l[Sa] = t.current, Of(l), new wf(t);
  }, eu.hydrateRoot = function(l, t, e) {
    if (!D(l)) throw Error(s(299));
    var a = !1, n = "", u = Ar, i = xr, f = Or, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), t = cm(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      n,
      r,
      u,
      i,
      f,
      Sm
    ), t.context = fm(null), e = t.current, a = Mt(), a = qi(a), n = je(a), n.callback = null, De(e, n, a), e = a, t.current.lanes = e, rn(t, e), Wt(t), l[Sa] = t.current, Of(l), new zi(t);
  }, eu.version = "19.2.6", eu;
}
var jm;
function C0() {
  if (jm) return Ff.exports;
  jm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), Ff.exports = U0(), Ff.exports;
}
var H0 = C0(), ls = { exports: {} }, ts = {};
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
function q0() {
  if (Dm) return ts;
  Dm = 1;
  var c = Mi();
  function y(M, O) {
    return M === O && (M !== 0 || 1 / M === 1 / O) || M !== M && O !== O;
  }
  var d = typeof Object.is == "function" ? Object.is : y, s = c.useState, D = c.useEffect, R = c.useLayoutEffect, z = c.useDebugValue;
  function C(M, O) {
    var H = O(), Q = s({ inst: { value: H, getSnapshot: O } }), w = Q[0].inst, I = Q[1];
    return R(
      function() {
        w.value = H, w.getSnapshot = O, x(w) && I({ inst: w });
      },
      [M, H, O]
    ), D(
      function() {
        return x(w) && I({ inst: w }), M(function() {
          x(w) && I({ inst: w });
        });
      },
      [M]
    ), z(H), H;
  }
  function x(M) {
    var O = M.getSnapshot;
    M = M.value;
    try {
      var H = O();
      return !d(M, H);
    } catch {
      return !0;
    }
  }
  function _(M, O) {
    return O();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : C;
  return ts.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : U, ts;
}
var Mm;
function B0() {
  return Mm || (Mm = 1, ls.exports = q0()), ls.exports;
}
var Rm = B0();
const Zm = 0, Km = 1, Jm = 2, Um = 3;
var Cm = Object.prototype.hasOwnProperty;
function ss(c, y) {
  var d, s;
  if (c === y) return !0;
  if (c && y && (d = c.constructor) === y.constructor) {
    if (d === Date) return c.getTime() === y.getTime();
    if (d === RegExp) return c.toString() === y.toString();
    if (d === Array) {
      if ((s = c.length) === y.length)
        for (; s-- && ss(c[s], y[s]); ) ;
      return s === -1;
    }
    if (!d || typeof c == "object") {
      s = 0;
      for (d in c)
        if (Cm.call(c, d) && ++s && !Cm.call(y, d) || !(d in y) || !ss(c[d], y[d])) return !1;
      return Object.keys(y).length === s;
    }
  }
  return c !== c && y !== y;
}
const ge = /* @__PURE__ */ new WeakMap(), Se = () => {
}, ct = (
  /*#__NOINLINE__*/
  Se()
), os = Object, cl = (c) => c === ct, Ft = (c) => typeof c == "function", $e = (c, y) => ({
  ...c,
  ...y
}), wm = (c) => Ft(c.then), es = {}, Ai = {}, bs = "undefined", iu = typeof window != bs, rs = typeof document != bs, Y0 = iu && "Deno" in window, G0 = () => iu && typeof window.requestAnimationFrame != bs, $m = (c, y) => {
  const d = ge.get(c);
  return [
    // Getter
    () => !cl(y) && c.get(y) || es,
    // Setter
    (s) => {
      if (!cl(y)) {
        const D = c.get(y);
        y in Ai || (Ai[y] = D), d[5](y, $e(D, s), D || es);
      }
    },
    // Subscriber
    d[6],
    // Get server cache snapshot
    () => !cl(y) && y in Ai ? Ai[y] : !cl(y) && c.get(y) || es
  ];
};
let ds = !0;
const X0 = () => ds, [ms, vs] = iu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], Q0 = () => {
  const c = rs && document.visibilityState;
  return cl(c) || c !== "hidden";
}, V0 = (c) => (rs && document.addEventListener("visibilitychange", c), ms("focus", c), () => {
  rs && document.removeEventListener("visibilitychange", c), vs("focus", c);
}), L0 = (c) => {
  const y = () => {
    ds = !0, c();
  }, d = () => {
    ds = !1;
  };
  return ms("online", y), ms("offline", d), () => {
    vs("online", y), vs("offline", d);
  };
}, Z0 = {
  isOnline: X0,
  isVisible: Q0
}, K0 = {
  initFocus: V0,
  initReconnect: L0
}, Hm = !Ss.useId, an = !iu || Y0, J0 = (c) => G0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), as = an ? J.useEffect : J.useLayoutEffect, ns = typeof navigator < "u" && navigator.connection, qm = !an && ns && ([
  "slow-2g",
  "2g"
].includes(ns.effectiveType) || ns.saveData), xi = /* @__PURE__ */ new WeakMap(), w0 = (c) => os.prototype.toString.call(c), us = (c, y) => c === `[object ${y}]`;
let $0 = 0;
const hs = (c) => {
  const y = typeof c, d = w0(c), s = us(d, "Date"), D = us(d, "RegExp"), R = us(d, "Object");
  let z, C;
  if (os(c) === c && !s && !D) {
    if (z = xi.get(c), z) return z;
    if (z = ++$0 + "~", xi.set(c, z), Array.isArray(c)) {
      for (z = "@", C = 0; C < c.length; C++)
        z += hs(c[C]) + ",";
      xi.set(c, z);
    }
    if (R) {
      z = "#";
      const x = os.keys(c).sort();
      for (; !cl(C = x.pop()); )
        cl(c[C]) || (z += C + ":" + hs(c[C]) + ",");
      xi.set(c, z);
    }
  } else
    z = s ? c.toJSON() : y == "symbol" ? c.toString() : y == "string" ? JSON.stringify(c) : "" + c;
  return z;
}, ps = (c) => {
  if (Ft(c))
    try {
      c = c();
    } catch {
      c = "";
    }
  const y = c;
  return c = typeof c == "string" ? c : (Array.isArray(c) ? c.length : c) ? hs(c) : "", [
    c,
    y
  ];
};
let W0 = 0;
const ys = () => ++W0;
async function Wm(...c) {
  const [y, d, s, D] = c, R = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof D == "boolean" ? {
    revalidate: D
  } : D || {});
  let z = R.populateCache;
  const C = R.rollbackOnError;
  let x = R.optimisticData;
  const _ = (O) => typeof C == "function" ? C(O) : C !== !1, U = R.throwOnError;
  if (Ft(d)) {
    const O = d, H = [], Q = y.keys();
    for (const w of Q)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(w) && O(y.get(w)._k) && H.push(w);
    return Promise.all(H.map(M));
  }
  return M(d);
  async function M(O) {
    const [H] = ps(O);
    if (!H) return;
    const [Q, w] = $m(y, H), [I, fl, L, _l] = ge.get(y), xl = () => {
      const Xl = I[H];
      return (Ft(R.revalidate) ? R.revalidate(Q().data, O) : R.revalidate !== !1) && (delete L[H], delete _l[H], Xl && Xl[0]) ? Xl[0](Jm).then(() => Q().data) : Q().data;
    };
    if (c.length < 3)
      return xl();
    let gl = s, dl, $ = !1;
    const ql = ys();
    fl[H] = [
      ql,
      0
    ];
    const sl = !cl(x), ft = Q(), W = ft.data, Ol = ft._c, st = cl(Ol) ? W : Ol;
    if (sl && (x = Ft(x) ? x(st, W) : x, w({
      data: x,
      _c: st
    })), Ft(gl))
      try {
        gl = gl(st);
      } catch (Xl) {
        dl = Xl, $ = !0;
      }
    if (gl && wm(gl))
      if (gl = await gl.catch((Xl) => {
        dl = Xl, $ = !0;
      }), ql !== fl[H][0]) {
        if ($) throw dl;
        return gl;
      } else $ && sl && _(dl) && (z = !0, w({
        data: st,
        _c: ct
      }));
    if (z && !$)
      if (Ft(z)) {
        const Xl = z(gl, st);
        w({
          data: Xl,
          error: ct,
          _c: ct
        });
      } else
        w({
          data: gl,
          error: ct,
          _c: ct
        });
    if (fl[H][1] = ys(), Promise.resolve(xl()).then(() => {
      w({
        _c: ct
      });
    }), $) {
      if (U) throw dl;
      return;
    }
    return gl;
  }
}
const Bm = (c, y) => {
  for (const d in c)
    c[d][0] && c[d][0](y);
}, F0 = (c, y) => {
  if (!ge.has(c)) {
    const d = $e(K0, y), s = /* @__PURE__ */ Object.create(null), D = Wm.bind(ct, c);
    let R = Se;
    const z = /* @__PURE__ */ Object.create(null), C = (U, M) => {
      const O = z[U] || [];
      return z[U] = O, O.push(M), () => O.splice(O.indexOf(M), 1);
    }, x = (U, M, O) => {
      c.set(U, M);
      const H = z[U];
      if (H)
        for (const Q of H)
          Q(M, O);
    }, _ = () => {
      if (!ge.has(c) && (ge.set(c, [
        s,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        D,
        x,
        C
      ]), !an)) {
        const U = d.initFocus(setTimeout.bind(ct, Bm.bind(ct, s, Zm))), M = d.initReconnect(setTimeout.bind(ct, Bm.bind(ct, s, Km)));
        R = () => {
          U && U(), M && M(), ge.delete(c);
        };
      }
    };
    return _(), [
      c,
      D,
      _,
      R
    ];
  }
  return [
    c,
    ge.get(c)[4]
  ];
}, k0 = (c, y, d, s, D) => {
  const R = d.errorRetryCount, z = D.retryCount, C = ~~((Math.random() + 0.5) * (1 << (z < 8 ? z : 8))) * d.errorRetryInterval;
  !cl(R) && z > R || setTimeout(s, C, D);
}, I0 = ss, [Fm, P0] = F0(/* @__PURE__ */ new Map()), ly = $e(
  {
    // events
    onLoadingSlow: Se,
    onSuccess: Se,
    onError: Se,
    onErrorRetry: k0,
    onDiscarded: Se,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: qm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: qm ? 5e3 : 3e3,
    // providers
    compare: I0,
    isPaused: () => !1,
    cache: Fm,
    mutate: P0,
    fallback: {}
  },
  // use web preset by default
  Z0
), ty = (c, y) => {
  const d = $e(c, y);
  if (y) {
    const { use: s, fallback: D } = c, { use: R, fallback: z } = y;
    s && R && (d.use = s.concat(R)), D && z && (d.fallback = $e(D, z));
  }
  return d;
}, ey = J.createContext({}), ay = "$inf$", km = iu && window.__SWR_DEVTOOLS_USE__, ny = km ? window.__SWR_DEVTOOLS_USE__ : [], uy = () => {
  km && (window.__SWR_DEVTOOLS_REACT__ = Ss);
}, iy = (c) => Ft(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], cy = () => {
  const c = J.useContext(ey);
  return J.useMemo(() => $e(ly, c), [
    c
  ]);
}, fy = (c) => (y, d, s) => c(y, d && ((...R) => {
  const [z] = ps(y), [, , , C] = ge.get(Fm);
  if (z.startsWith(ay))
    return d(...R);
  const x = C[z];
  return cl(x) ? d(...R) : (delete C[z], x);
}), s), sy = ny.concat(fy), oy = (c) => function(...d) {
  const s = cy(), [D, R, z] = iy(d), C = ty(s, z);
  let x = c;
  const { use: _ } = C, U = (_ || []).concat(sy);
  for (let M = U.length; M--; )
    x = U[M](x);
  return x(D, R || C.fetcher || null, C);
}, ry = (c, y, d) => {
  const s = y[c] || (y[c] = []);
  return s.push(d), () => {
    const D = s.indexOf(d);
    D >= 0 && (s[D] = s[s.length - 1], s.pop());
  };
};
uy();
const is = Ss.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), cs = {
  dedupe: !0
}, Ym = Promise.resolve(ct), dy = () => Se, my = (c, y, d) => {
  const { cache: s, compare: D, suspense: R, fallbackData: z, revalidateOnMount: C, revalidateIfStale: x, refreshInterval: _, refreshWhenHidden: U, refreshWhenOffline: M, keepPreviousData: O, strictServerPrefetchWarning: H } = d, [Q, w, I, fl] = ge.get(s), [L, _l] = ps(c), xl = J.useRef(!1), gl = J.useRef(!1), dl = J.useRef(L), $ = J.useRef(y), ql = J.useRef(d), sl = () => ql.current, ft = () => sl().isVisible() && sl().isOnline(), [W, Ol, st, Xl] = $m(s, L), Il = J.useRef({}).current, E = cl(z) ? cl(d.fallback) ? ct : d.fallback[L] : z, B = (El, Cl) => {
    for (const jl in Il) {
      const Dl = jl;
      if (Dl === "data") {
        if (!D(El[Dl], Cl[Dl]) && (!cl(El[Dl]) || !D(P, Cl[Dl])))
          return !1;
      } else if (Cl[Dl] !== El[Dl])
        return !1;
    }
    return !0;
  }, Z = !xl.current, hl = J.useMemo(() => {
    const El = W(), Cl = Xl(), jl = (Vl) => {
      const Ml = $e(Vl);
      return delete Ml._k, (() => {
        if (!L || !y || sl().isPaused()) return !1;
        if (Z && !cl(C)) return C;
        const pe = cl(E) ? Ml.data : E;
        return cl(pe) || x;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ml
      } : Ml;
    }, Dl = jl(El), dt = El === Cl ? Dl : jl(Cl);
    let mt = Dl;
    return [
      () => {
        const Vl = jl(W());
        return B(Vl, mt) ? (mt.data = Vl.data, mt.isLoading = Vl.isLoading, mt.isValidating = Vl.isValidating, mt.error = Vl.error, mt) : (mt = Vl, Vl);
      },
      () => dt
    ];
  }, [
    s,
    L
  ]), rl = Rm.useSyncExternalStore(J.useCallback(
    (El) => st(L, (Cl, jl) => {
      B(jl, Cl) || El();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      L
    ]
  ), hl[0], hl[1]), v = Q[L] && Q[L].length > 0, A = rl.data, q = cl(A) ? E && wm(E) ? is(E) : E : A, Y = rl.error, F = J.useRef(q), P = O ? cl(A) ? cl(F.current) ? q : F.current : A : q, el = L && cl(q), Ql = J.useRef(null);
  !an && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Rm.useSyncExternalStore(dy, () => (Ql.current = !1, Ql), () => (Ql.current = !0, Ql));
  const Bl = Ql.current;
  H && Bl && !R && el && console.warn(`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !L || !y || sl().isPaused() || v && !cl(Y) ? !1 : Z && !cl(C) ? C : R ? cl(q) ? !1 : x : cl(q) || x, We = Z && be, cn = cl(rl.isValidating) ? We : rl.isValidating, fu = cl(rl.isLoading) ? We : rl.isLoading, Et = J.useCallback(
    async (El) => {
      const Cl = $.current;
      if (!L || !Cl || gl.current || sl().isPaused())
        return !1;
      let jl, Dl, dt = !0;
      const mt = El || {}, Vl = !I[L] || !mt.dedupe, Ml = () => Hm ? !gl.current && L === dl.current && xl.current : L === dl.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, pe = () => {
        Ol(Fe);
      }, fn = () => {
        const vt = I[L];
        vt && vt[1] === Dl && delete I[L];
      }, ke = {
        isValidating: !0
      };
      cl(W().data) && (ke.isLoading = !0);
      try {
        if (Vl && (Ol(ke), d.loadingTimeout && cl(W().data) && setTimeout(() => {
          dt && Ml() && sl().onLoadingSlow(L, d);
        }, d.loadingTimeout), I[L] = [
          Cl(_l),
          ys()
        ]), [jl, Dl] = I[L], jl = await jl, Vl && setTimeout(fn, d.dedupingInterval), !I[L] || I[L][1] !== Dl)
          return Vl && Ml() && sl().onDiscarded(L), !1;
        Fe.error = ct;
        const vt = w[L];
        if (!cl(vt) && // case 1
        (Dl <= vt[0] || // case 2
        Dl <= vt[1] || // case 3
        vt[1] === 0))
          return pe(), Vl && Ml() && sl().onDiscarded(L), !1;
        const Rt = W().data;
        Fe.data = D(Rt, jl) ? Rt : jl, Vl && Ml() && sl().onSuccess(jl, L, d);
      } catch (vt) {
        fn();
        const Rt = sl(), { shouldRetryOnError: sn } = Rt;
        Rt.isPaused() || (Fe.error = vt, Vl && Ml() && (Rt.onError(vt, L, Rt), (sn === !0 || Ft(sn) && sn(vt)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || ft()) && Rt.onErrorRetry(vt, L, Rt, (Ci) => {
          const kt = Q[L];
          kt && kt[0] && kt[0](Um, Ci);
        }, {
          retryCount: (mt.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return dt = !1, pe(), !0;
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
    (...El) => Wm(s, dl.current, ...El),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (as(() => {
    $.current = y, ql.current = d, cl(A) || (F.current = A);
  }), as(() => {
    if (!L) return;
    const El = Et.bind(ct, cs);
    let Cl = 0;
    sl().revalidateOnFocus && (Cl = Date.now() + sl().focusThrottleInterval);
    const Dl = ry(L, Q, (dt, mt = {}) => {
      if (dt == Zm) {
        const Vl = Date.now();
        sl().revalidateOnFocus && Vl > Cl && ft() && (Cl = Vl + sl().focusThrottleInterval, El());
      } else if (dt == Km)
        sl().revalidateOnReconnect && ft() && El();
      else {
        if (dt == Jm)
          return Et();
        if (dt == Um)
          return Et(mt);
      }
    });
    return gl.current = !1, dl.current = L, xl.current = !0, Ol({
      _k: _l
    }), be && (I[L] || (cl(q) || an ? El() : J0(El))), () => {
      gl.current = !0, Dl();
    };
  }, [
    L
  ]), as(() => {
    let El;
    function Cl() {
      const Dl = Ft(_) ? _(W().data) : _;
      Dl && El !== -1 && (El = setTimeout(jl, Dl));
    }
    function jl() {
      !W().error && (U || sl().isVisible()) && (M || sl().isOnline()) ? Et(cs).then(Cl) : Cl();
    }
    return Cl(), () => {
      El && (clearTimeout(El), El = -1);
    };
  }, [
    _,
    U,
    M,
    L
  ]), J.useDebugValue(P), R) {
    if (!Hm && an && el)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    el && ($.current = y, ql.current = d, gl.current = !1);
    const El = fl[L], Cl = !cl(El) && el ? ga(El) : Ym;
    if (is(Cl), !cl(Y) && el)
      throw Y;
    const jl = el ? Et(cs) : Ym;
    !cl(P) && el && (jl.status = "fulfilled", jl.value = !0), is(jl);
  }
  return {
    mutate: ga,
    get data() {
      return Il.data = !0, P;
    },
    get error() {
      return Il.error = !0, Y;
    },
    get isValidating() {
      return Il.isValidating = !0, cn;
    },
    get isLoading() {
      return Il.isLoading = !0, fu;
    }
  };
}, ji = oy(my), Im = "/api/v1/extensions/nexus.video.ltx23";
async function ye(c, y) {
  const d = await fetch(`${Im}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!d.ok) {
    const s = await d.text();
    throw new Error(`${d.status} ${d.statusText}: ${s}`);
  }
  return await d.json();
}
const en = {
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
  })
};
function vy(c) {
  return `${Im}/artifacts/${c}`;
}
const hy = "/api/v1", Gm = "nexus.video.ltx23";
async function Xm(c, y) {
  const d = await fetch(`${hy}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!d.ok) {
    const D = await d.text();
    throw new Error(`${d.status}: ${D}`);
  }
  return (await d.json()).data;
}
const Qm = {
  listDependencies: () => Xm(`/extensions/${Gm}/dependencies`),
  startInstall: (c = !1) => Xm(
    `/extensions/${Gm}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Vm = {
  status: (c) => ye(`/profiles/${c}/install`),
  start: (c) => ye(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var yy = "_1vmg9ib0", nn = "_1vmg9ib1", au = "_1vmg9ib2", gy = "_1vmg9ib3", Kl = "_1vmg9ib4", Fl = "_1vmg9ib5", rt = "_1vmg9ib6", Pm = "_1vmg9ib7 _1vmg9ib6", Lm = "_1vmg9ib8 _1vmg9ib6", nu = "_1vmg9ib9", _s = "_1vmg9iba", Es = "_1vmg9ibb _1vmg9iba", Sy = "_1vmg9ibc _1vmg9iba", Oi = "_1vmg9ibd _1vmg9iba", cu = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", lv = "_1vmg9ibj _1vmg9ibi", tv = "_1vmg9ibk _1vmg9ibi", ev = "_1vmg9ibl _1vmg9ibi", av = "_1vmg9ibm _1vmg9ibi", uu = "_1vmg9ibn", un = "_1vmg9ibo", by = "_1vmg9ibp", py = "_1vmg9ibq", gs = "_1vmg9ibs _1vmg9ibr", nv = "_1vmg9ibt _1vmg9ibr", uv = "_1vmg9ibu _1vmg9ibr", iv = "_1vmg9ibv _1vmg9ibr", _y = "_1vmg9ibw", Ey = "_1vmg9ibx", Ty = "_1vmg9iby", zy = "_1vmg9ibz", Ny = "_1vmg9ib10 _1vmg9iba", Sl = "_1vmg9ib11", Ay = "_1vmg9ib12", xy = "_1vmg9ib13", Oy = "_1vmg9ib14", jy = "_1vmg9ib15", Dy = "_1vmg9ib16", Ri = "_1vmg9ib17", Ui = "_1vmg9ib18", My = "_1vmg9ib19";
const Ry = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Uy() {
  const [c, y] = J.useState(Ry), [d, s] = J.useState(null), [D, R] = J.useState(null), [z, C] = J.useState(!1), [x, _] = J.useState(null), [U, M] = J.useState(null), [O, H] = J.useState(!1), [Q, w] = J.useState(!1), [I, fl] = J.useState(
    null
  ), [L, _l] = J.useState(null), { data: xl } = ji(
    "ltx:runtime-profiles",
    () => en.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: gl, mutate: dl } = ji(
    x ? `ltx:renders:${x}` : null,
    () => x ? en.getRender(x) : Promise.resolve(null),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (W) => W ? W.status === "completed" || W.status === "failed" || W.status === "cancelled" ? 0 : 2e3 : 1e3
    }
  ), $ = J.useCallback(async () => {
    C(!0), R(null);
    try {
      const W = await en.plan(c);
      s(W);
    } catch (W) {
      R(W instanceof Error ? W.message : String(W)), s(null);
    } finally {
      C(!1);
    }
  }, [c]), ql = J.useCallback(async () => {
    H(!0), M(null);
    try {
      const W = await en.createRender(c);
      _(W.id), dl();
    } catch (W) {
      M(W instanceof Error ? W.message : String(W));
    } finally {
      H(!1);
    }
  }, [c, dl]), sl = J.useCallback(async () => {
    if (!(!x || Q)) {
      w(!0), M(null);
      try {
        await en.cancel(x), dl();
      } catch (W) {
        M(
          `Cancel failed: ${W instanceof Error ? W.message : String(W)}`
        );
      } finally {
        w(!1);
      }
    }
  }, [x, Q, dl]), ft = J.useCallback(
    async (W) => {
      if (!(!x || I !== null)) {
        fl(W), _l(null);
        try {
          await en.retrySegment(x, W), dl();
        } catch (Ol) {
          _l(
            `Retry of segment ${W + 1} failed: ${Ol instanceof Error ? Ol.message : String(Ol)}`
          );
        } finally {
          fl(null);
        }
      }
    },
    [x, I, dl]
  );
  return /* @__PURE__ */ o.jsxs("div", { className: yy, children: [
    /* @__PURE__ */ o.jsxs("div", { className: xy, children: [
      /* @__PURE__ */ o.jsx(Cy, {}),
      /* @__PURE__ */ o.jsx(
        By,
        {
          draft: c,
          onChange: y,
          profiles: xl ?? [],
          onPlan: $,
          onSubmit: ql,
          planning: z,
          submitting: O,
          plan: d,
          planError: D,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ o.jsx(
      Jy,
      {
        run: gl ?? null,
        onCancel: sl,
        cancelling: Q,
        onRetrySegment: ft,
        retryingSegmentIndex: I,
        retryError: L
      }
    )
  ] });
}
function Cy() {
  const [c, y] = J.useState(!1), [d, s] = J.useState(null), { data: D, mutate: R } = ji(
    "host:dependencies",
    () => Qm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (O) => O.status === "running" || O.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), z = J.useCallback(
    async (U = !1) => {
      y(!0), s(null);
      try {
        await Qm.startInstall(U), R();
      } catch (M) {
        s(M instanceof Error ? M.message : String(M));
      } finally {
        y(!1);
      }
    },
    [R]
  );
  if (!D) return null;
  const C = D.steps.find((U) => U.status === "failed"), x = D.all_satisfied, _ = D.steps.some(
    (U) => U.status === "running" || !x && U.status === "pending"
  );
  return /* @__PURE__ */ o.jsxs("section", { className: nn, children: [
    /* @__PURE__ */ o.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ o.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ o.jsx("span", { className: Hy(x, !!C, _), children: x ? "ready" : C ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ o.jsx("ul", { className: jy, children: D.steps.map((U) => /* @__PURE__ */ o.jsxs("li", { className: Dy, children: [
      /* @__PURE__ */ o.jsx("span", { className: qy(U.status) }),
      /* @__PURE__ */ o.jsx("span", { children: U.id }),
      /* @__PURE__ */ o.jsx("span", { className: Sl, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    C?.last_error ? /* @__PURE__ */ o.jsxs("div", { className: un, children: [
      /* @__PURE__ */ o.jsxs("strong", { children: [
        C.id,
        " failed"
      ] }),
      ": ",
      C.last_error.message
    ] }) : null,
    d ? /* @__PURE__ */ o.jsx("div", { className: un, children: d }) : null,
    !x || C ? /* @__PURE__ */ o.jsxs("div", { className: cu, children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: _s,
          disabled: c || _,
          onClick: () => void z(!1),
          children: _ || c ? "Installing…" : "Install runtime"
        }
      ),
      C ? /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: Es,
          disabled: c || _,
          onClick: () => void z(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Hy(c, y, d) {
  return y ? av : c ? lv : d ? tv : ev;
}
function qy(c) {
  switch (c) {
    case "ok":
      return uv;
    case "running":
      return nv;
    case "failed":
      return iv;
    default:
      return gs;
  }
}
function By({
  draft: c,
  onChange: y,
  profiles: d,
  onPlan: s,
  onSubmit: D,
  planning: R,
  submitting: z,
  plan: C,
  planError: x,
  submitError: _
}) {
  const U = J.useCallback(
    (O, H) => y({ ...c, [O]: H }),
    [c, y]
  ), M = J.useCallback(
    (O) => {
      O.preventDefault(), !(z || c.prompt.trim().length === 0) && D();
    },
    [z, c.prompt, D]
  );
  return /* @__PURE__ */ o.jsxs("form", { className: nn, onSubmit: M, noValidate: !0, children: [
    /* @__PURE__ */ o.jsx("h2", { className: au, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ o.jsx("p", { className: gy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
      /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ o.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: Pm,
          value: c.prompt,
          onChange: (O) => U("prompt", O.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
      /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          id: "ltx-neg",
          className: rt,
          value: c.negative_prompt ?? "",
          onChange: (O) => U(
            "negative_prompt",
            O.target.value.length > 0 ? O.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
      /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          id: "ltx-character",
          className: rt,
          value: c.character_prompt ?? "",
          onChange: (O) => U(
            "character_prompt",
            O.target.value.length > 0 ? O.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
      /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          id: "ltx-style",
          className: rt,
          value: c.style_prompt ?? "",
          onChange: (O) => U(
            "style_prompt",
            O.target.value.length > 0 ? O.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ o.jsx(Vy, { draft: c, update: U }),
    /* @__PURE__ */ o.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-duration",
            className: rt,
            type: "number",
            min: 1,
            max: 300,
            value: c.duration_seconds,
            onChange: (O) => {
              const H = Number(O.target.value);
              Number.isFinite(H) && U(
                "duration_seconds",
                Math.max(1, Math.min(300, H))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-seed",
            className: rt,
            type: "number",
            value: c.seed ?? "",
            onChange: (O) => {
              const H = O.target.value;
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
    /* @__PURE__ */ o.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ o.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Lm,
            value: c.runtime_profile,
            onChange: (O) => U(
              "runtime_profile",
              O.target.value
            ),
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ o.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ o.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ o.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ o.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Lm,
            value: c.quality_preset,
            onChange: (O) => U("quality_preset", O.target.value),
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ o.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ o.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ o.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsx(Qy, { profiles: d, selected: c.runtime_profile }),
    /* @__PURE__ */ o.jsx(Yy, { selected: c.runtime_profile }),
    /* @__PURE__ */ o.jsx(Ly, { draft: c, update: U }),
    /* @__PURE__ */ o.jsxs("div", { className: cu, children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: Es,
          onClick: s,
          disabled: R || z || c.prompt.trim().length === 0,
          children: R ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "submit",
          className: _s,
          disabled: z || c.prompt.trim().length === 0,
          "aria-busy": z,
          children: z ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    x ? /* @__PURE__ */ o.jsx("div", { className: un, role: "alert", children: x }) : null,
    _ ? /* @__PURE__ */ o.jsx("div", { className: un, role: "alert", children: _ }) : null,
    C ? /* @__PURE__ */ o.jsx(Ky, { plan: C }) : null
  ] });
}
function Yy({
  selected: c
}) {
  const y = Xy(c), [d, s] = J.useState(!1), [D, R] = J.useState(null), { data: z, mutate: C } = ji(
    y ? `profile-install:${y}` : null,
    () => y ? Vm.status(y) : Promise.resolve(null),
    {
      refreshInterval: (O) => O && O.in_flight ? 2e3 : 0
    }
  ), x = J.useCallback(async () => {
    if (y) {
      s(!0), R(null);
      try {
        await Vm.start(y), C();
      } catch (O) {
        R(O instanceof Error ? O.message : String(O));
      } finally {
        s(!1);
      }
    }
  }, [y, C]);
  if (!y || !z) return null;
  if (z.installed)
    return /* @__PURE__ */ o.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ o.jsx("strong", { children: "Runtime installed" }),
      " · ",
      z.repo
    ] });
  const _ = z.in_flight || d, U = cv(z.phase), M = _ ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ o.jsxs("div", { className: uu, children: [
    /* @__PURE__ */ o.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    z.repo ?? "unknown repo",
    /* @__PURE__ */ o.jsxs("div", { className: Sl, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ o.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      z.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    z.last_error ? /* @__PURE__ */ o.jsxs("div", { className: Sl, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      z.last_error
    ] }) : null,
    D ? /* @__PURE__ */ o.jsx("div", { className: Sl, style: { marginTop: 4, color: "#e57373" }, children: D }) : null,
    /* @__PURE__ */ o.jsx("div", { className: cu, style: { marginTop: 8 }, children: /* @__PURE__ */ o.jsx(
      "button",
      {
        type: "button",
        className: _s,
        disabled: _,
        onClick: () => void x(),
        children: M
      }
    ) }),
    /* @__PURE__ */ o.jsx(
      Gy,
      {
        phase: z.phase,
        recentProgress: z.recent_progress
      }
    )
  ] });
}
function cv(c) {
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
function Gy({
  phase: c,
  recentProgress: y
}) {
  if (!c && y.length === 0) return null;
  const d = cv(c);
  return /* @__PURE__ */ o.jsxs("details", { className: Ri, children: [
    /* @__PURE__ */ o.jsxs("summary", { className: Ui, children: [
      "Install progress",
      d ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
        " · ",
        d
      ] }) : null,
      y.length > 0 ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
        " · ",
        y.length,
        " lines"
      ] }) : null
    ] }),
    y.length === 0 ? /* @__PURE__ */ o.jsx("p", { className: Sl, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ o.jsx("pre", { className: My, children: y.join(`
`) })
  ] });
}
function Xy(c) {
  return c === "auto" ? null : c;
}
function Qy({
  profiles: c,
  selected: y
}) {
  if (c.length === 0) return null;
  const d = y === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${y}`, s = c.find((R) => R.runtime_id === d);
  if (!s) return null;
  const D = s.healthy ? "ok" : "warn";
  return /* @__PURE__ */ o.jsxs("div", { className: uu, children: [
    /* @__PURE__ */ o.jsx("strong", { children: s.display_name }),
    ": ",
    s.status_message,
    s.experimental ? " (experimental)" : null
  ] });
}
function Vy({
  draft: c,
  update: y
}) {
  const d = c.scenes ?? [], s = J.useRef(0), [D, R] = J.useState(
    () => d.map(() => `scene-${s.current++}`)
  );
  if (D.length !== d.length) {
    const O = D.slice(0, d.length);
    for (; O.length < d.length; )
      O.push(`scene-${s.current++}`);
    R(O);
  }
  const z = J.useCallback(
    (O, H) => {
      y("scenes", O.length > 0 ? O : void 0), R(H);
    },
    [y]
  ), C = J.useCallback(() => {
    const O = d.length > 0 ? c.duration_seconds / (d.length + 1) : c.duration_seconds;
    z(
      [
        ...d,
        { prompt: "", duration_seconds: Math.max(1, Math.round(O)) }
      ],
      [...D, `scene-${s.current++}`]
    );
  }, [d, D, z, c.duration_seconds]), x = J.useCallback(
    (O, H) => {
      const Q = d.map((w, I) => {
        if (I !== O) return w;
        const fl = { ...w };
        return H.prompt !== void 0 && (fl.prompt = H.prompt ?? ""), H.duration_seconds !== void 0 && (H.duration_seconds === null ? delete fl.duration_seconds : fl.duration_seconds = H.duration_seconds), H.seed !== void 0 && (H.seed === null ? delete fl.seed : fl.seed = H.seed), fl;
      });
      z(Q, D);
    },
    [d, D, z]
  ), _ = J.useCallback(
    (O) => {
      z(
        d.filter((H, Q) => Q !== O),
        D.filter((H, Q) => Q !== O)
      );
    },
    [d, D, z]
  ), U = J.useCallback(
    (O, H) => {
      const Q = O + H;
      if (Q < 0 || Q >= d.length) return;
      const w = d[O], I = d[Q], fl = D[O], L = D[Q];
      if (w === void 0 || I === void 0 || fl === void 0 || L === void 0)
        return;
      const _l = [...d], xl = [...D];
      _l[O] = I, _l[Q] = w, xl[O] = L, xl[Q] = fl, z(_l, xl);
    },
    [d, D, z]
  ), M = d.reduce(
    (O, H) => O + (H.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ o.jsxs("details", { className: Ri, children: [
    /* @__PURE__ */ o.jsxs("summary", { className: Ui, children: [
      "Scenes — ",
      d.length === 0 ? "none (single prompt)" : `${d.length} scenes`,
      M > 0 ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
        " · ",
        M.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ o.jsx("p", { className: Sl, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    d.map((O, H) => {
      const Q = D[H] ?? `scene-fallback-${H}`, w = (I) => {
        if (I === "") return null;
        const fl = Number(I);
        return Number.isFinite(fl) ? fl : null;
      };
      return /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: nn,
          style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
          children: [
            /* @__PURE__ */ o.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ o.jsxs("strong", { className: Sl, children: [
                    "Scene ",
                    H + 1
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(H, -1),
                        disabled: H === 0,
                        "aria-label": `Move scene ${H + 1} up`,
                        title: "Move up",
                        children: "↑"
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(H, 1),
                        disabled: H === d.length - 1,
                        "aria-label": `Move scene ${H + 1} down`,
                        title: "Move down",
                        children: "↓"
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => _(H),
                        "aria-label": `Remove scene ${H + 1}`,
                        title: "Remove scene",
                        children: "✕"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
              /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: `ltx-${Q}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ o.jsx(
                "textarea",
                {
                  id: `ltx-${Q}-prompt`,
                  className: Pm,
                  value: O.prompt,
                  onChange: (I) => x(H, { prompt: I.target.value }),
                  placeholder: "what happens in this scene…",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: nu, children: [
              /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
                /* @__PURE__ */ o.jsx(
                  "label",
                  {
                    className: Fl,
                    htmlFor: `ltx-${Q}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-duration`,
                    className: rt,
                    type: "number",
                    min: 1,
                    step: 0.5,
                    value: O.duration_seconds ?? "",
                    onChange: (I) => {
                      x(H, {
                        duration_seconds: w(I.target.value)
                      });
                    },
                    placeholder: "auto"
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
                /* @__PURE__ */ o.jsx(
                  "label",
                  {
                    className: Fl,
                    htmlFor: `ltx-${Q}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-seed`,
                    className: rt,
                    type: "number",
                    value: O.seed ?? "",
                    onChange: (I) => {
                      x(H, {
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
    /* @__PURE__ */ o.jsx("div", { className: cu, style: { marginTop: 10 }, children: /* @__PURE__ */ o.jsx(
      "button",
      {
        type: "button",
        className: Es,
        onClick: C,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Ly({
  draft: c,
  update: y
}) {
  const d = c.advanced ?? {}, s = J.useCallback(
    (D, R) => {
      const z = { ...d };
      R == null ? delete z[D] : z[D] = R, y("advanced", Object.keys(z).length > 0 ? z : void 0);
    },
    [d, y]
  );
  return /* @__PURE__ */ o.jsxs("details", { className: Ri, children: [
    /* @__PURE__ */ o.jsxs("summary", { className: Ui, children: [
      "Advanced — guidance, steps & offload",
      d.guidance_scale !== void 0 ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
        " · cfg ",
        d.guidance_scale
      ] }) : null,
      d.num_inference_steps !== void 0 ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
        " · ",
        d.num_inference_steps,
        " steps"
      ] }) : null,
      d.offload_mode && d.offload_mode !== "auto" ? /* @__PURE__ */ o.jsx("span", { className: Sl, children: ` · offload ${d.offload_mode}` }) : null
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: nu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: rt,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: d.guidance_scale ?? "",
            onChange: (D) => {
              const R = D.target.value;
              s(
                "guidance_scale",
                R === "" ? void 0 : Number(R)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-steps",
            className: rt,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: d.num_inference_steps ?? "",
            onChange: (D) => {
              const R = D.target.value;
              s(
                "num_inference_steps",
                R === "" ? void 0 : Math.round(Number(R))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-offload-mode", children: "Offload strategy" }),
        /* @__PURE__ */ o.jsxs(
          "select",
          {
            id: "ltx-offload-mode",
            className: rt,
            value: d.offload_mode ?? "auto",
            onChange: (D) => {
              const R = D.target.value;
              s("offload_mode", R === "auto" ? void 0 : R);
            },
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "auto", children: "Auto (profile default)" }),
              /* @__PURE__ */ o.jsx("option", { value: "none", children: "None — full GPU resident (needs 16 GB+)" }),
              /* @__PURE__ */ o.jsx("option", { value: "model", children: "Model — mid-grained offload (balanced)" }),
              /* @__PURE__ */ o.jsx("option", { value: "sequential", children: "Sequential — per-layer offload (lowest VRAM)" })
            ]
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "NVFP4 defaults to None; FP8 profiles default to Sequential. Pick None on a 16 GB+ card for the fastest inference." })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-scheduler", children: "Scheduler" }),
        /* @__PURE__ */ o.jsxs(
          "select",
          {
            id: "ltx-scheduler",
            className: rt,
            value: d.scheduler ?? "flow_match_euler",
            onChange: (D) => {
              const R = D.target.value;
              s(
                "scheduler",
                R === "flow_match_euler" ? void 0 : R
              );
            },
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "flow_match_euler", children: "Flow-match Euler — distilled-LTX default" }),
              /* @__PURE__ */ o.jsx("option", { value: "flow_match_heun", children: "Flow-match Heun — ~30% slower, marginally higher quality" })
            ]
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Non-flow-matching schedulers (DDIM, DPM++, UniPC) are intentionally absent — they break on LTX-2.3." })
      ] }),
      /* @__PURE__ */ o.jsx(Zy, { advanced: d, setAdvanced: s })
    ] })
  ] });
}
function Zy({
  advanced: c,
  setAdvanced: y
}) {
  const d = c.component_placement ?? {}, s = d.transformer && d.transformer !== "auto" || d.vae && d.vae !== "auto" || d.text_encoder && d.text_encoder !== "auto", D = (z, C) => {
    const x = { ...d };
    C === "auto" ? delete x[z] : x[z] = C;
    const _ = Object.keys(x).length === 0 || Object.values(x).every((U) => U === "auto" || U === void 0);
    y("component_placement", _ ? void 0 : x);
  }, R = [
    d.transformer && d.transformer !== "auto" ? `T:${d.transformer}` : null,
    d.vae && d.vae !== "auto" ? `V:${d.vae}` : null,
    d.text_encoder && d.text_encoder !== "auto" ? `E:${d.text_encoder}` : null,
    c.text_encoder_quant && c.text_encoder_quant !== "default" ? `quant:${c.text_encoder_quant}` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o.jsxs("details", { className: Ri, style: { marginTop: 10 }, children: [
    /* @__PURE__ */ o.jsxs("summary", { className: Ui, children: [
      "Pipeline tuning ",
      s ? "·" : "",
      " ",
      R ? /* @__PURE__ */ o.jsx("span", { className: Sl, children: R }) : null
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: nu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("span", { className: Fl, children: "Per-component placement" }),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Override where each pipeline component lives. Auto follows the offload preset; explicit values switch the worker away from offload hooks onto direct .to(device) placement." }),
        /* @__PURE__ */ o.jsx(
          fs,
          {
            label: "Transformer",
            value: d.transformer ?? "auto",
            onChange: (z) => D("transformer", z)
          }
        ),
        /* @__PURE__ */ o.jsx(
          fs,
          {
            label: "VAE",
            value: d.vae ?? "auto",
            onChange: (z) => D("vae", z)
          }
        ),
        /* @__PURE__ */ o.jsx(
          fs,
          {
            label: "Text encoder",
            value: d.text_encoder ?? "auto",
            onChange: (z) => D("text_encoder", z)
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-text-encoder-quant", children: "Text-encoder quantisation" }),
        /* @__PURE__ */ o.jsxs(
          "select",
          {
            id: "ltx-text-encoder-quant",
            className: rt,
            value: c.text_encoder_quant ?? "default",
            onChange: (z) => {
              const C = z.target.value;
              y(
                "text_encoder_quant",
                C === "default" ? void 0 : C
              );
            },
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "default", children: "Default — keep profile's bf16" }),
              /* @__PURE__ */ o.jsx("option", { value: "fp8", children: "FP8 (bnb 8-bit) — ~5.5 GB encoder" }),
              /* @__PURE__ */ o.jsx("option", { value: "int8", children: "INT8 (bnb 8-bit) — ~5.5 GB encoder" }),
              /* @__PURE__ */ o.jsx("option", { value: "nf4", children: "NF4 (bnb 4-bit) — ~3 GB encoder" })
            ]
          }
        ),
        /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
          "Non-default values require ",
          /* @__PURE__ */ o.jsx("code", { children: "bitsandbytes" }),
          " in the worker venv. T5-XXL encodes once per render so the perceptual cost is modest even at NF4."
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-decode-timestep", children: "Decode timestep" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-decode-timestep",
            className: rt,
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: c.decode_timestep ?? "",
            onChange: (z) => {
              const C = z.target.value;
              y(
                "decode_timestep",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0.05 (pipeline default)"
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Flow-matching trajectory decode point. 0.0–1.0. Lower → smoother motion at the cost of extra decoder work." })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-image-cond-noise", children: "Image-conditioning noise" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-image-cond-noise",
            className: rt,
            type: "number",
            min: 0,
            max: 0.3,
            step: 5e-3,
            value: c.image_cond_noise_scale ?? "",
            onChange: (z) => {
              const C = z.target.value;
              y(
                "image_cond_noise_scale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0.025 (pipeline default)"
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Noise injected into the segment-chaining image latent. 0.0–0.3. Lower → sharper continuity across cuts (risk of stutter); higher → more creative drift." })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
        /* @__PURE__ */ o.jsx("label", { className: Fl, htmlFor: "ltx-guidance-rescale", children: "Guidance rescale" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            id: "ltx-guidance-rescale",
            className: rt,
            type: "number",
            min: 0,
            max: 1,
            step: 0.05,
            value: c.guidance_rescale ?? "",
            onChange: (z) => {
              const C = z.target.value;
              y(
                "guidance_rescale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0 (off)"
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: Sl, children: "Rescales CFG to avoid over-saturation when guidance scale is pushed above ~7. 0.0–1.0. Leave at 0 unless you see burnt highlights." })
      ] })
    ] })
  ] });
}
function fs({
  label: c,
  value: y,
  onChange: d
}) {
  return /* @__PURE__ */ o.jsxs(
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
        /* @__PURE__ */ o.jsx("span", { style: { minWidth: 110, fontSize: 13 }, children: c }),
        ["auto", "cuda", "cpu"].map((s) => /* @__PURE__ */ o.jsxs(
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
              /* @__PURE__ */ o.jsx(
                "input",
                {
                  type: "radio",
                  name: `placement-${c}`,
                  value: s,
                  checked: y === s,
                  onChange: () => d(s)
                }
              ),
              s === "auto" ? "Auto" : s === "cuda" ? "GPU" : "CPU"
            ]
          },
          s
        ))
      ]
    }
  );
}
function Ky({ plan: c }) {
  const y = c.vram_risk === "safe" ? lv : c.vram_risk === "moderate" ? tv : c.vram_risk === "risky" ? ev : av;
  return /* @__PURE__ */ o.jsxs("div", { className: nn, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ o.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ o.jsx("span", { className: ya, children: c.mode })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ o.jsx("span", { className: ya, children: c.segment_count })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ o.jsxs("span", { className: ya, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ o.jsxs("span", { className: ya, children: [
        c.base_fps,
        " → ",
        c.output_fps,
        " (",
        c.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ o.jsxs("span", { className: ya, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ o.jsxs("span", { className: ya, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ o.jsx("span", { className: y, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ o.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ o.jsx("span", { className: ya, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ o.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((d) => /* @__PURE__ */ o.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ o.jsx("strong", { children: d.code }),
      ": ",
      d.message
    ] }, d.code)) }) : null
  ] });
}
function Jy({
  run: c,
  onCancel: y,
  cancelling: d,
  onRetrySegment: s,
  retryingSegmentIndex: D,
  retryError: R
}) {
  if (!c)
    return /* @__PURE__ */ o.jsxs("section", { className: nn, children: [
      /* @__PURE__ */ o.jsx("h2", { className: au, children: "Output" }),
      /* @__PURE__ */ o.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const z = c.status === "completed" || c.status === "failed" || c.status === "cancelled", C = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ o.jsxs("section", { className: nn, children: [
    /* @__PURE__ */ o.jsxs("h2", { className: au, children: [
      "Render ",
      l1(c.id)
    ] }),
    /* @__PURE__ */ o.jsxs("p", { className: Sl, children: [
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
    /* @__PURE__ */ o.jsx(wy, { run: c }),
    c.error_code ? /* @__PURE__ */ o.jsxs("div", { className: un, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ o.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    R ? /* @__PURE__ */ o.jsx("div", { className: un, role: "alert", "aria-live": "polite", children: R }) : null,
    /* @__PURE__ */ o.jsx(
      $y,
      {
        segments: c.segments,
        onRetry: C ? s : null,
        retryingSegmentIndex: D
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ o.jsx(Py, { artifactId: c.final_artifact_id }) : null,
    z ? null : /* @__PURE__ */ o.jsx("div", { className: cu, children: /* @__PURE__ */ o.jsx(
      "button",
      {
        type: "button",
        className: Sy,
        onClick: y,
        disabled: d,
        "aria-busy": d,
        children: d ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function wy({ run: c }) {
  const y = Wy(c), d = ky(c);
  return /* @__PURE__ */ o.jsxs("div", { className: Kl, children: [
    /* @__PURE__ */ o.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: c.status }),
            d,
            y ? /* @__PURE__ */ o.jsxs("span", { className: Sl, children: [
              " · ",
              y
            ] }) : null
          ] }),
          /* @__PURE__ */ o.jsxs("span", { children: [
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
    /* @__PURE__ */ o.jsx("div", { className: _y, children: /* @__PURE__ */ o.jsx(
      "div",
      {
        className: Ey,
        style: { width: `${Math.max(2, c.progress_percent)}%` }
      }
    ) })
  ] });
}
function $y({
  segments: c,
  onRetry: y,
  retryingSegmentIndex: d
}) {
  return /* @__PURE__ */ o.jsx("div", { className: by, children: c.map((s) => {
    const D = d === s.index, R = y !== null && s.status === "failed";
    return /* @__PURE__ */ o.jsxs("div", { className: py, children: [
      /* @__PURE__ */ o.jsx("span", { className: Iy(s.status) }),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Segment ",
        s.index + 1,
        " · ",
        s.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ o.jsx("span", { className: Sl, children: s.status }),
      R ? /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: Oi,
          onClick: () => y?.(s.index),
          disabled: d !== null,
          "aria-busy": D,
          "aria-label": `Retry segment ${s.index + 1}`,
          children: D ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, s.index);
  }) });
}
function Wy(c) {
  if (c.status === "completed" || c.status === "failed" || c.status === "cancelled" || c.segment_count <= 0)
    return null;
  const y = c.segments.filter(
    (z) => z.status === "completed" && z.started_at && z.completed_at
  );
  if (y.length === 0)
    return null;
  const d = y.reduce((z, C) => {
    const x = Date.parse(C.started_at), _ = Date.parse(C.completed_at);
    return !Number.isFinite(x) || !Number.isFinite(_) || _ <= x ? z : z + (_ - x);
  }, 0);
  if (d === 0)
    return null;
  const s = d / y.length, D = c.segment_count - c.completed_segments;
  if (D <= 0)
    return null;
  const R = D * s;
  return `~${Fy(R)} remaining`;
}
function Fy(c) {
  const y = Math.round(c / 1e3);
  if (y < 60)
    return `${y}s`;
  const d = Math.floor(y / 60), s = y % 60;
  if (d < 60)
    return s === 0 ? `${d}m` : `${d}m ${s}s`;
  const D = Math.floor(d / 60), R = d % 60;
  return `${D}h ${R}m`;
}
function ky(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const y = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, d = c.last_breach_reason?.trim(), s = d ? `VRAM supervisor breach: ${d}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ o.jsxs("span", { className: Sl, "aria-live": "polite", title: s, children: [
    " · ",
    "restart ",
    c.restart_count,
    "/",
    y
  ] });
}
function Iy(c) {
  switch (c) {
    case "queued":
      return gs;
    case "rendering":
      return nv;
    case "completed":
      return uv;
    case "failed":
      return iv;
    default:
      return gs;
  }
}
function Py({ artifactId: c }) {
  const y = vy(c);
  return /* @__PURE__ */ o.jsxs("div", { className: Ty, children: [
    /* @__PURE__ */ o.jsx("video", { className: zy, src: y, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ o.jsx(
      "a",
      {
        className: Ny,
        href: y,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ o.jsxs("p", { className: Sl, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function l1(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const Di = "ltx23-video-app", t1 = new URL("./ltx23-video.css", import.meta.url).href;
class fv extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = H0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(y) {
    const d = document.createElement("link");
    d.rel = "stylesheet", d.href = t1, y.appendChild(d);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ o.jsx(J.StrictMode, { children: /* @__PURE__ */ o.jsx(Uy, {}) })
    );
  }
}
customElements.get(Di) || customElements.define(Di, fv);
function e1() {
  customElements.get(Di) || customElements.define(Di, fv);
}
export {
  e1 as register
};
//# sourceMappingURL=ltx23-video.js.map
