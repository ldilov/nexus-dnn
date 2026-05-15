function z0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Jf = { exports: {} }, tu = {};
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
  if (bm) return tu;
  bm = 1;
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function v(s, M, R) {
    var x = null;
    if (R !== void 0 && (x = "" + R), M.key !== void 0 && (x = "" + M.key), "key" in M) {
      R = {};
      for (var B in M)
        B !== "key" && (R[B] = M[B]);
    } else R = M;
    return M = R.ref, {
      $$typeof: c,
      type: s,
      key: x,
      ref: M !== void 0 ? M : null,
      props: R
    };
  }
  return tu.Fragment = g, tu.jsx = v, tu.jsxs = v, tu;
}
var pm;
function N0() {
  return pm || (pm = 1, Jf.exports = A0()), Jf.exports;
}
var d = N0(), wf = { exports: {} }, k = {};
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
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), x = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), N = Symbol.iterator;
  function C(m) {
    return m === null || typeof m != "object" ? null : (m = N && m[N] || m["@@iterator"], typeof m == "function" ? m : null);
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
  function fl(m, A, H) {
    this.props = m, this.context = A, this.refs = I, this.updater = H || Q;
  }
  fl.prototype.isReactComponent = {}, fl.prototype.setState = function(m, A) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, A, "setState");
  }, fl.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function L() {
  }
  L.prototype = fl.prototype;
  function pl(m, A, H) {
    this.props = m, this.context = A, this.refs = I, this.updater = H || Q;
  }
  var Nl = pl.prototype = new L();
  Nl.constructor = pl, w(Nl, fl.prototype), Nl.isPureReactComponent = !0;
  var gl = Array.isArray;
  function dl() {
  }
  var $ = { H: null, A: null, T: null, S: null }, Hl = Object.prototype.hasOwnProperty;
  function sl(m, A, H) {
    var Y = H.ref;
    return {
      $$typeof: c,
      type: m,
      key: A,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function it(m, A) {
    return sl(m.type, A, m.props);
  }
  function W(m) {
    return typeof m == "object" && m !== null && m.$$typeof === c;
  }
  function Ol(m) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(H) {
      return A[H];
    });
  }
  var ct = /\/+/g;
  function Xl(m, A) {
    return typeof m == "object" && m !== null && m.key != null ? Ol("" + m.key) : A.toString(36);
  }
  function Fl(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(dl, dl) : (m.status = "pending", m.then(
          function(A) {
            m.status === "pending" && (m.status = "fulfilled", m.value = A);
          },
          function(A) {
            m.status === "pending" && (m.status = "rejected", m.reason = A);
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
  function E(m, A, H, Y, F) {
    var P = typeof m;
    (P === "undefined" || P === "boolean") && (m = null);
    var el = !1;
    if (m === null) el = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          el = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case c:
            case g:
              el = !0;
              break;
            case U:
              return el = m._init, E(
                el(m._payload),
                A,
                H,
                Y,
                F
              );
          }
      }
    if (el)
      return F = F(m), el = Y === "" ? "." + Xl(m, 0) : Y, gl(F) ? (H = "", el != null && (H = el.replace(ct, "$&/") + "/"), E(F, A, H, "", function(be) {
        return be;
      })) : F != null && (W(F) && (F = it(
        F,
        H + (F.key == null || m && m.key === F.key ? "" : ("" + F.key).replace(
          ct,
          "$&/"
        ) + "/") + el
      )), A.push(F)), 1;
    el = 0;
    var Ql = Y === "" ? "." : Y + ":";
    if (gl(m))
      for (var ql = 0; ql < m.length; ql++)
        Y = m[ql], P = Ql + Xl(Y, ql), el += E(
          Y,
          A,
          H,
          P,
          F
        );
    else if (ql = C(m), typeof ql == "function")
      for (m = ql.call(m), ql = 0; !(Y = m.next()).done; )
        Y = Y.value, P = Ql + Xl(Y, ql++), el += E(
          Y,
          A,
          H,
          P,
          F
        );
    else if (P === "object") {
      if (typeof m.then == "function")
        return E(
          Fl(m),
          A,
          H,
          Y,
          F
        );
      throw A = String(m), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return el;
  }
  function q(m, A, H) {
    if (m == null) return m;
    var Y = [], F = 0;
    return E(m, Y, "", "", function(P) {
      return A.call(H, P, F++);
    }), Y;
  }
  function Z(m) {
    if (m._status === -1) {
      var A = m._result;
      A = A(), A.then(
        function(H) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = H);
        },
        function(H) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = H);
        }
      ), m._status === -1 && (m._status = 0, m._result = A);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var hl = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  }, rl = {
    map: q,
    forEach: function(m, A, H) {
      q(
        m,
        function() {
          A.apply(this, arguments);
        },
        H
      );
    },
    count: function(m) {
      var A = 0;
      return q(m, function() {
        A++;
      }), A;
    },
    toArray: function(m) {
      return q(m, function(A) {
        return A;
      }) || [];
    },
    only: function(m) {
      if (!W(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return k.Activity = j, k.Children = rl, k.Component = fl, k.Fragment = v, k.Profiler = M, k.PureComponent = pl, k.StrictMode = s, k.Suspense = D, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return $.H.useMemoCache(m);
    }
  }, k.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(m, A, H) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var Y = w({}, m.props), F = m.key;
    if (A != null)
      for (P in A.key !== void 0 && (F = "" + A.key), A)
        !Hl.call(A, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && A.ref === void 0 || (Y[P] = A[P]);
    var P = arguments.length - 2;
    if (P === 1) Y.children = H;
    else if (1 < P) {
      for (var el = Array(P), Ql = 0; Ql < P; Ql++)
        el[Ql] = arguments[Ql + 2];
      Y.children = el;
    }
    return sl(m.type, F, Y);
  }, k.createContext = function(m) {
    return m = {
      $$typeof: x,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: R,
      _context: m
    }, m;
  }, k.createElement = function(m, A, H) {
    var Y, F = {}, P = null;
    if (A != null)
      for (Y in A.key !== void 0 && (P = "" + A.key), A)
        Hl.call(A, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (F[Y] = A[Y]);
    var el = arguments.length - 2;
    if (el === 1) F.children = H;
    else if (1 < el) {
      for (var Ql = Array(el), ql = 0; ql < el; ql++)
        Ql[ql] = arguments[ql + 2];
      F.children = Ql;
    }
    if (m && m.defaultProps)
      for (Y in el = m.defaultProps, el)
        F[Y] === void 0 && (F[Y] = el[Y]);
    return sl(m, P, F);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(m) {
    return { $$typeof: B, render: m };
  }, k.isValidElement = W, k.lazy = function(m) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: m },
      _init: Z
    };
  }, k.memo = function(m, A) {
    return {
      $$typeof: _,
      type: m,
      compare: A === void 0 ? null : A
    };
  }, k.startTransition = function(m) {
    var A = $.T, H = {};
    $.T = H;
    try {
      var Y = m(), F = $.S;
      F !== null && F(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(dl, hl);
    } catch (P) {
      hl(P);
    } finally {
      A !== null && H.types !== null && (A.types = H.types), $.T = A;
    }
  }, k.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, k.use = function(m) {
    return $.H.use(m);
  }, k.useActionState = function(m, A, H) {
    return $.H.useActionState(m, A, H);
  }, k.useCallback = function(m, A) {
    return $.H.useCallback(m, A);
  }, k.useContext = function(m) {
    return $.H.useContext(m);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(m, A) {
    return $.H.useDeferredValue(m, A);
  }, k.useEffect = function(m, A) {
    return $.H.useEffect(m, A);
  }, k.useEffectEvent = function(m) {
    return $.H.useEffectEvent(m);
  }, k.useId = function() {
    return $.H.useId();
  }, k.useImperativeHandle = function(m, A, H) {
    return $.H.useImperativeHandle(m, A, H);
  }, k.useInsertionEffect = function(m, A) {
    return $.H.useInsertionEffect(m, A);
  }, k.useLayoutEffect = function(m, A) {
    return $.H.useLayoutEffect(m, A);
  }, k.useMemo = function(m, A) {
    return $.H.useMemo(m, A);
  }, k.useOptimistic = function(m, A) {
    return $.H.useOptimistic(m, A);
  }, k.useReducer = function(m, A, H) {
    return $.H.useReducer(m, A, H);
  }, k.useRef = function(m) {
    return $.H.useRef(m);
  }, k.useState = function(m) {
    return $.H.useState(m);
  }, k.useSyncExternalStore = function(m, A, H) {
    return $.H.useSyncExternalStore(
      m,
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
var $f = { exports: {} }, eu = {}, Wf = { exports: {} }, Ff = {};
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
      l: for (; 0 < Z; ) {
        var hl = Z - 1 >>> 1, rl = E[hl];
        if (0 < M(rl, q))
          E[hl] = q, E[Z] = rl, Z = hl;
        else break l;
      }
    }
    function v(E) {
      return E.length === 0 ? null : E[0];
    }
    function s(E) {
      if (E.length === 0) return null;
      var q = E[0], Z = E.pop();
      if (Z !== q) {
        E[0] = Z;
        l: for (var hl = 0, rl = E.length, m = rl >>> 1; hl < m; ) {
          var A = 2 * (hl + 1) - 1, H = E[A], Y = A + 1, F = E[Y];
          if (0 > M(H, Z))
            Y < rl && 0 > M(F, H) ? (E[hl] = F, E[Y] = Z, hl = Y) : (E[hl] = H, E[A] = Z, hl = A);
          else if (Y < rl && 0 > M(F, Z))
            E[hl] = F, E[Y] = Z, hl = Y;
          else break l;
        }
      }
      return q;
    }
    function M(E, q) {
      var Z = E.sortIndex - q.sortIndex;
      return Z !== 0 ? Z : E.id - q.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      c.unstable_now = function() {
        return R.now();
      };
    } else {
      var x = Date, B = x.now();
      c.unstable_now = function() {
        return x.now() - B;
      };
    }
    var D = [], _ = [], U = 1, j = null, N = 3, C = !1, Q = !1, w = !1, I = !1, fl = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, pl = typeof setImmediate < "u" ? setImmediate : null;
    function Nl(E) {
      for (var q = v(_); q !== null; ) {
        if (q.callback === null) s(_);
        else if (q.startTime <= E)
          s(_), q.sortIndex = q.expirationTime, g(D, q);
        else break;
        q = v(_);
      }
    }
    function gl(E) {
      if (w = !1, Nl(E), !Q)
        if (v(D) !== null)
          Q = !0, dl || (dl = !0, Ol());
        else {
          var q = v(_);
          q !== null && Fl(gl, q.startTime - E);
        }
    }
    var dl = !1, $ = -1, Hl = 5, sl = -1;
    function it() {
      return I ? !0 : !(c.unstable_now() - sl < Hl);
    }
    function W() {
      if (I = !1, dl) {
        var E = c.unstable_now();
        sl = E;
        var q = !0;
        try {
          l: {
            Q = !1, w && (w = !1, L($), $ = -1), C = !0;
            var Z = N;
            try {
              t: {
                for (Nl(E), j = v(D); j !== null && !(j.expirationTime > E && it()); ) {
                  var hl = j.callback;
                  if (typeof hl == "function") {
                    j.callback = null, N = j.priorityLevel;
                    var rl = hl(
                      j.expirationTime <= E
                    );
                    if (E = c.unstable_now(), typeof rl == "function") {
                      j.callback = rl, Nl(E), q = !0;
                      break t;
                    }
                    j === v(D) && s(D), Nl(E);
                  } else s(D);
                  j = v(D);
                }
                if (j !== null) q = !0;
                else {
                  var m = v(_);
                  m !== null && Fl(
                    gl,
                    m.startTime - E
                  ), q = !1;
                }
              }
              break l;
            } finally {
              j = null, N = Z, C = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Ol() : dl = !1;
        }
      }
    }
    var Ol;
    if (typeof pl == "function")
      Ol = function() {
        pl(W);
      };
    else if (typeof MessageChannel < "u") {
      var ct = new MessageChannel(), Xl = ct.port2;
      ct.port1.onmessage = W, Ol = function() {
        Xl.postMessage(null);
      };
    } else
      Ol = function() {
        fl(W, 0);
      };
    function Fl(E, q) {
      $ = fl(function() {
        E(c.unstable_now());
      }, q);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, c.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Hl = 0 < E ? Math.floor(1e3 / E) : 5;
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
        callback: q,
        priorityLevel: E,
        startTime: Z,
        expirationTime: rl,
        sortIndex: -1
      }, Z > hl ? (E.sortIndex = Z, g(_, E), v(D) === null && E === v(_) && (w ? (L($), $ = -1) : w = !0, Fl(gl, Z - hl))) : (E.sortIndex = rl, g(D, E), Q || C || (Q = !0, dl || (dl = !0, Ol()))), E;
    }, c.unstable_shouldYield = it, c.unstable_wrapCallback = function(E) {
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
function x0() {
  return zm || (zm = 1, Wf.exports = D0()), Wf.exports;
}
var kf = { exports: {} }, nt = {};
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
  if (Am) return nt;
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
  function v() {
  }
  var s = {
    d: {
      f: v,
      r: function() {
        throw Error(g(522));
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
  }, M = Symbol.for("react.portal");
  function R(D, _, U) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: M,
      key: j == null ? null : "" + j,
      children: D,
      containerInfo: _,
      implementation: U
    };
  }
  var x = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(D, _) {
    if (D === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, nt.createPortal = function(D, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(g(299));
    return R(D, _, null, U);
  }, nt.flushSync = function(D) {
    var _ = x.T, U = s.p;
    try {
      if (x.T = null, s.p = 2, D) return D();
    } finally {
      x.T = _, s.p = U, s.d.f();
    }
  }, nt.preconnect = function(D, _) {
    typeof D == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, s.d.C(D, _));
  }, nt.prefetchDNS = function(D) {
    typeof D == "string" && s.d.D(D);
  }, nt.preinit = function(D, _) {
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
  }, nt.preinitModule = function(D, _) {
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
  }, nt.preload = function(D, _) {
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
  }, nt.preloadModule = function(D, _) {
    if (typeof D == "string")
      if (_) {
        var U = B(_.as, _.crossOrigin);
        s.d.m(D, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else s.d.m(D);
  }, nt.requestFormReset = function(D) {
    s.d.r(D);
  }, nt.unstable_batchedUpdates = function(D, _) {
    return D(_);
  }, nt.useFormState = function(D, _, U) {
    return x.H.useFormState(D, _, U);
  }, nt.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, nt.version = "19.2.6", nt;
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
  return c(), kf.exports = M0(), kf.exports;
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
  if (Om) return eu;
  Om = 1;
  var c = x0(), g = ji(), v = j0();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M(l) {
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
  function B(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(l) {
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
          if (u === e) return D(n), l;
          if (u === a) return D(n), t;
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
  var j = Object.assign, N = Symbol.for("react.element"), C = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), fl = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), pl = Symbol.for("react.context"), Nl = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), dl = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), Hl = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), it = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function Ol(l) {
    return l === null || typeof l != "object" ? null : (l = W && l[W] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ct = Symbol.for("react.client.reference");
  function Xl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ct ? null : l.displayName || l.name || null;
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
        case pl:
          return l.displayName || "Context";
        case L:
          return (l._context.displayName || "Context") + ".Consumer";
        case Nl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case $:
          return t = l.displayName || null, t !== null ? t : Xl(l.type) || "Memo";
        case Hl:
          t = l._payload, l = l._init;
          try {
            return Xl(l(t));
          } catch {
          }
      }
    return null;
  }
  var Fl = Array.isArray, E = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, hl = [], rl = -1;
  function m(l) {
    return { current: l };
  }
  function A(l) {
    0 > rl || (l.current = hl[rl], hl[rl] = null, rl--);
  }
  function H(l, t) {
    rl++, hl[rl] = l.current, l.current = t;
  }
  var Y = m(null), F = m(null), P = m(null), el = m(null);
  function Ql(l, t) {
    switch (H(P, t), H(F, l), H(Y, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Vd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Vd(t), l = Ld(t, l);
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
    A(Y), H(Y, l);
  }
  function ql() {
    A(Y), A(F), A(P);
  }
  function be(l) {
    l.memoizedState !== null && H(el, l);
    var t = Y.current, e = Ld(t, l.type);
    t !== e && (H(F, l), H(Y, e));
  }
  function We(l) {
    F.current === l && (A(Y), A(F)), el.current === l && (A(el), kn._currentValue = Z);
  }
  var cn, cu;
  function _t(l) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        cn = t && t[1] || "", cu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + l + cu;
  }
  var ga = !1;
  function fu(l, t) {
    if (!l || ga) return "";
    ga = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
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
                Reflect.construct(l, [], O);
              } else {
                try {
                  O.call();
                } catch (p) {
                  b = p;
                }
                l.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                b = p;
              }
              (O = l()) && typeof O.catch == "function" && O.catch(function() {
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
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ga = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? _t(e) : "";
  }
  function _l(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return _t(l.type);
      case 16:
        return _t("Lazy");
      case 13:
        return l.child !== t && t !== null ? _t("Suspense Fallback") : _t("Suspense");
      case 19:
        return _t("SuspenseList");
      case 0:
      case 15:
        return fu(l.type, !1);
      case 11:
        return fu(l.type.render, !1);
      case 1:
        return fu(l.type, !0);
      case 31:
        return _t("Activity");
      default:
        return "";
    }
  }
  function Ul(l) {
    try {
      var t = "", e = null;
      do
        t += _l(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Dl = Object.prototype.hasOwnProperty, xl = c.unstable_scheduleCallback, ot = c.unstable_cancelCallback, rt = c.unstable_shouldYield, Vl = c.unstable_requestPaint, Ml = c.unstable_now, Fe = c.unstable_getCurrentPriorityLevel, pe = c.unstable_ImmediatePriority, fn = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, dt = c.unstable_LowPriority, jt = c.unstable_IdlePriority, sn = c.log, Ri = c.unstable_setDisableYieldValue, kt = null, Et = null;
  function _e(l) {
    if (typeof sn == "function" && Ri(l), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(kt, l);
      } catch {
      }
  }
  var Tt = Math.clz32 ? Math.clz32 : ov, fv = Math.log, sv = Math.LN2;
  function ov(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (fv(l) / sv | 0) | 0;
  }
  var su = 256, ou = 262144, ru = 4194304;
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
  function du(l, t, e) {
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
  function Es() {
    var l = ru;
    return ru <<= 1, (ru & 62914560) === 0 && (ru = 4194304), l;
  }
  function Ui(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function rn(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function dv(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var f = l.entanglements, o = l.expirationTimes, S = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Tt(e), O = 1 << T;
      f[T] = 0, o[T] = -1;
      var b = S[T];
      if (b !== null)
        for (S[T] = null, T = 0; T < b.length; T++) {
          var p = b[T];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && Ts(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t));
  }
  function Ts(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Tt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function zs(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Tt(e), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), e &= ~n;
    }
  }
  function As(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Ci(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Ci(l) {
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
  function Hi(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ns() {
    var l = q.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : dm(l.type));
  }
  function Os(l, t) {
    var e = q.p;
    try {
      return q.p = l, t();
    } finally {
      q.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), Pl = "__reactFiber$" + Ee, mt = "__reactProps$" + Ee, Sa = "__reactContainer$" + Ee, qi = "__reactEvents$" + Ee, mv = "__reactListeners$" + Ee, vv = "__reactHandles$" + Ee, Ds = "__reactResources$" + Ee, dn = "__reactMarker$" + Ee;
  function Bi(l) {
    delete l[Pl], delete l[mt], delete l[qi], delete l[mv], delete l[vv];
  }
  function ba(l) {
    var t = l[Pl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Sa] || e[Pl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Fd(l); l !== null; ) {
            if (e = l[Pl]) return e;
            l = Fd(l);
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
  function mn(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function _a(l) {
    var t = l[Ds];
    return t || (t = l[Ds] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function kl(l) {
    l[dn] = !0;
  }
  var xs = /* @__PURE__ */ new Set(), Ms = {};
  function Pe(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (Ms[l] = t, l = 0; l < t.length; l++)
      xs.add(t[l]);
  }
  var hv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), js = {}, Rs = {};
  function yv(l) {
    return Dl.call(Rs, l) ? !0 : Dl.call(js, l) ? !1 : hv.test(l) ? Rs[l] = !0 : (js[l] = !0, !1);
  }
  function mu(l, t, e) {
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
  function vu(l, t, e) {
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
  function Us(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function gv(l, t, e) {
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
  function Yi(l) {
    if (!l._valueTracker) {
      var t = Us(l) ? "checked" : "value";
      l._valueTracker = gv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Cs(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Us(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function hu(l) {
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
  function Gi(l, t, e, a, n, u, i, f) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Rt(t)) : l.value !== "" + Rt(t) && (l.value = "" + Rt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Xi(l, i, Rt(t)) : e != null ? Xi(l, i, Rt(e)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + Rt(f) : l.removeAttribute("name");
  }
  function Hs(l, t, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), t != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Yi(l);
        return;
      }
      e = e != null ? "" + Rt(e) : "", t = t != null ? "" + Rt(t) : e, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Yi(l);
  }
  function Xi(l, t, e) {
    t === "number" && hu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ta(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < e.length; n++)
        t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        n = t.hasOwnProperty("$" + l[e].value), l[e].selected !== n && (l[e].selected = n), n && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Rt(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function qs(l, t, e) {
    if (t != null && (t = "" + Rt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Rt(e) : "";
  }
  function Bs(l, t, e, a) {
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
    e = Rt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Yi(l);
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
  function Ys(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || bv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Gs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && e[n] !== a && Ys(l, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Ys(l, u, t[u]);
  }
  function Qi(l) {
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
  function yu(l) {
    return _v.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Pt() {
  }
  var Vi = null;
  function Li(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Aa = null, Na = null;
  function Xs(l) {
    var t = pa(l);
    if (t && (l = t.stateNode)) {
      var e = l[mt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Gi(
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
                var n = a[mt] || null;
                if (!n) throw Error(s(90));
                Gi(
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
              a = e[t], a.form === l.form && Cs(a);
          }
          break l;
        case "textarea":
          qs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ta(l, !!e.multiple, t, !1);
      }
    }
  }
  var Zi = !1;
  function Qs(l, t, e) {
    if (Zi) return l(t, e);
    Zi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Zi = !1, (Aa !== null || Na !== null) && (ai(), Aa && (t = Aa, l = Na, Na = Aa = null, Xs(t), l)))
        for (t = 0; t < l.length; t++) Xs(l[t]);
    }
  }
  function vn(l, t) {
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
  var le = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ki = !1;
  if (le)
    try {
      var hn = {};
      Object.defineProperty(hn, "passive", {
        get: function() {
          Ki = !0;
        }
      }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
    } catch {
      Ki = !1;
    }
  var Te = null, Ji = null, gu = null;
  function Vs() {
    if (gu) return gu;
    var l, t = Ji, e = t.length, a, n = "value" in Te ? Te.value : Te.textContent, u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++) ;
    return gu = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Su(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function bu() {
    return !0;
  }
  function Ls() {
    return !1;
  }
  function vt(l) {
    function t(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in l)
        l.hasOwnProperty(f) && (e = l[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? bu : Ls, this.isPropagationStopped = Ls, this;
    }
    return j(t.prototype, {
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
  }, pu = vt(la), yn = j({}, la, { view: 0, detail: 0 }), Ev = vt(yn), wi, $i, gn, _u = j({}, yn, {
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
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== gn && (gn && l.type === "mousemove" ? (wi = l.screenX - gn.screenX, $i = l.screenY - gn.screenY) : $i = wi = 0, gn = l), wi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : $i;
    }
  }), Zs = vt(_u), Tv = j({}, _u, { dataTransfer: 0 }), zv = vt(Tv), Av = j({}, yn, { relatedTarget: 0 }), Wi = vt(Av), Nv = j({}, la, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = vt(Nv), Dv = j({}, la, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), xv = vt(Dv), Mv = j({}, la, { data: 0 }), Ks = vt(Mv), jv = {
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
  function Fi() {
    return Cv;
  }
  var Hv = j({}, yn, {
    key: function(l) {
      if (l.key) {
        var t = jv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Su(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Rv[l.keyCode] || "Unidentified" : "";
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
    charCode: function(l) {
      return l.type === "keypress" ? Su(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Su(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), qv = vt(Hv), Bv = j({}, _u, {
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
  }), Js = vt(Bv), Yv = j({}, yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fi
  }), Gv = vt(Yv), Xv = j({}, la, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qv = vt(Xv), Vv = j({}, _u, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Lv = vt(Vv), Zv = j({}, la, {
    newState: 0,
    oldState: 0
  }), Kv = vt(Zv), Jv = [9, 13, 27, 32], ki = le && "CompositionEvent" in window, Sn = null;
  le && "documentMode" in document && (Sn = document.documentMode);
  var wv = le && "TextEvent" in window && !Sn, ws = le && (!ki || Sn && 8 < Sn && 11 >= Sn), $s = " ", Ws = !1;
  function Fs(l, t) {
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
  function ks(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Oa = !1;
  function $v(l, t) {
    switch (l) {
      case "compositionend":
        return ks(t);
      case "keypress":
        return t.which !== 32 ? null : (Ws = !0, $s);
      case "textInput":
        return l = t.data, l === $s && Ws ? null : l;
      default:
        return null;
    }
  }
  function Wv(l, t) {
    if (Oa)
      return l === "compositionend" || !ki && Fs(l, t) ? (l = Vs(), gu = Ji = Te = null, Oa = !1, l) : null;
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
        return ws && t.locale !== "ko" ? null : t.data;
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
  function Is(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Fv[l.type] : t === "textarea";
  }
  function Ps(l, t, e, a) {
    Aa ? Na ? Na.push(a) : Na = [a] : Aa = a, t = oi(t, "onChange"), 0 < t.length && (e = new pu(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var bn = null, pn = null;
  function kv(l) {
    qd(l, 0);
  }
  function Eu(l) {
    var t = mn(l);
    if (Cs(t)) return l;
  }
  function lo(l, t) {
    if (l === "change") return t;
  }
  var to = !1;
  if (le) {
    var Ii;
    if (le) {
      var Pi = "oninput" in document;
      if (!Pi) {
        var eo = document.createElement("div");
        eo.setAttribute("oninput", "return;"), Pi = typeof eo.oninput == "function";
      }
      Ii = Pi;
    } else Ii = !1;
    to = Ii && (!document.documentMode || 9 < document.documentMode);
  }
  function ao() {
    bn && (bn.detachEvent("onpropertychange", no), pn = bn = null);
  }
  function no(l) {
    if (l.propertyName === "value" && Eu(pn)) {
      var t = [];
      Ps(
        t,
        pn,
        l,
        Li(l)
      ), Qs(kv, t);
    }
  }
  function Iv(l, t, e) {
    l === "focusin" ? (ao(), bn = t, pn = e, bn.attachEvent("onpropertychange", no)) : l === "focusout" && ao();
  }
  function Pv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Eu(pn);
  }
  function lh(l, t) {
    if (l === "click") return Eu(t);
  }
  function th(l, t) {
    if (l === "input" || l === "change")
      return Eu(t);
  }
  function eh(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var zt = typeof Object.is == "function" ? Object.is : eh;
  function _n(l, t) {
    if (zt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Dl.call(t, n) || !zt(l[n], t[n]))
        return !1;
    }
    return !0;
  }
  function uo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function io(l, t) {
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
  function co(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? co(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function fo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = hu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = hu(l.document);
    }
    return t;
  }
  function lc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var ah = le && "documentMode" in document && 11 >= document.documentMode, Da = null, tc = null, En = null, ec = !1;
  function so(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    ec || Da == null || Da !== hu(a) || (a = Da, "selectionStart" in a && lc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), En && _n(En, a) || (En = a, a = oi(tc, "onSelect"), 0 < a.length && (t = new pu(
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
  }, ac = {}, oo = {};
  le && (oo = document.createElement("div").style, "AnimationEvent" in window || (delete xa.animationend.animation, delete xa.animationiteration.animation, delete xa.animationstart.animation), "TransitionEvent" in window || delete xa.transitionend.transition);
  function ea(l) {
    if (ac[l]) return ac[l];
    if (!xa[l]) return l;
    var t = xa[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in oo)
        return ac[l] = t[e];
    return l;
  }
  var ro = ea("animationend"), mo = ea("animationiteration"), vo = ea("animationstart"), nh = ea("transitionrun"), uh = ea("transitionstart"), ih = ea("transitioncancel"), ho = ea("transitionend"), yo = /* @__PURE__ */ new Map(), nc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  nc.push("scrollEnd");
  function Vt(l, t) {
    yo.set(l, t), Pe(t, [l]);
  }
  var Tu = typeof reportError == "function" ? reportError : function(l) {
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
  function zu() {
    for (var l = Ma, t = uc = Ma = 0; t < l; ) {
      var e = Ct[t];
      Ct[t++] = null;
      var a = Ct[t];
      Ct[t++] = null;
      var n = Ct[t];
      Ct[t++] = null;
      var u = Ct[t];
      if (Ct[t++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && go(e, n, u);
    }
  }
  function Au(l, t, e, a) {
    Ct[Ma++] = l, Ct[Ma++] = t, Ct[Ma++] = e, Ct[Ma++] = a, uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function ic(l, t, e, a) {
    return Au(l, t, e, a), Nu(l);
  }
  function aa(l, t) {
    return Au(l, null, null, t), Nu(l);
  }
  function go(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && t !== null && (n = 31 - Tt(e), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = e | 536870912), u) : null;
  }
  function Nu(l) {
    if (50 < Zn)
      throw Zn = 0, yf = null, Error(s(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ja = {};
  function ch(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function At(l, t, e, a) {
    return new ch(l, t, e, a);
  }
  function cc(l) {
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
  function So(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Ou(l, t, e, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") cc(l) && (i = 1);
    else if (typeof l == "string")
      i = d0(
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
              case pl:
                i = 10;
                break l;
              case L:
                i = 9;
                break l;
              case Nl:
                i = 11;
                break l;
              case $:
                i = 14;
                break l;
              case Hl:
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
  function fc(l, t, e) {
    return l = At(6, l, null, t), l.lanes = e, l;
  }
  function bo(l) {
    var t = At(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function sc(l, t, e) {
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
  var po = /* @__PURE__ */ new WeakMap();
  function Ht(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = po.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Ul(t)
      }, po.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Ul(t)
    };
  }
  var Ra = [], Ua = 0, Du = null, Tn = 0, qt = [], Bt = 0, ze = null, Kt = 1, Jt = "";
  function ee(l, t) {
    Ra[Ua++] = Tn, Ra[Ua++] = Du, Du = l, Tn = t;
  }
  function _o(l, t, e) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = ze, ze = l;
    var a = Kt;
    l = Jt;
    var n = 32 - Tt(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - Tt(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Kt = 1 << 32 - Tt(t) + n | e << n | a, Jt = u + l;
    } else
      Kt = 1 << u | e << n | a, Jt = l;
  }
  function oc(l) {
    l.return !== null && (ee(l, 1), _o(l, 1, 0));
  }
  function rc(l) {
    for (; l === Du; )
      Du = Ra[--Ua], Ra[Ua] = null, Tn = Ra[--Ua], Ra[Ua] = null;
    for (; l === ze; )
      ze = qt[--Bt], qt[Bt] = null, Jt = qt[--Bt], qt[Bt] = null, Kt = qt[--Bt], qt[Bt] = null;
  }
  function Eo(l, t) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = ze, Kt = t.id, Jt = t.overflow, ze = l;
  }
  var lt = null, jl = null, ol = !1, Ae = null, Yt = !1, dc = Error(s(519));
  function Ne(l) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw zn(Ht(t, l)), dc;
  }
  function To(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Pl] = l, t[mt] = a, e) {
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
        nl("invalid", t), Hs(
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
        nl("invalid", t), Bs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Xd(t.textContent, e) ? (a.popover != null && (nl("beforetoggle", t), nl("toggle", t)), a.onScroll != null && nl("scroll", t), a.onScrollEnd != null && nl("scrollend", t), a.onClick != null && (t.onclick = Pt), t = !0) : t = !1, t || Ne(l, !0);
  }
  function zo(l) {
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
    if (!ol) return zo(l), ol = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || jf(l.type, l.memoizedProps)), e = !e), e && jl && Ne(l), zo(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      jl = Wd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      jl = Wd(l);
    } else
      t === 27 ? (t = jl, Xe(l.type) ? (l = qf, qf = null, jl = l) : jl = t) : jl = lt ? Xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ua() {
    jl = lt = null, ol = !1;
  }
  function mc() {
    var l = Ae;
    return l !== null && (St === null ? St = l : St.push.apply(
      St,
      l
    ), Ae = null), l;
  }
  function zn(l) {
    Ae === null ? Ae = [l] : Ae.push(l);
  }
  var vc = m(null), ia = null, ae = null;
  function Oe(l, t, e) {
    H(vc, t._currentValue), t._currentValue = e;
  }
  function ne(l) {
    l._currentValue = vc.current, A(vc);
  }
  function hc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function yc(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var o = 0; o < t.length; o++)
            if (f.context === t[o]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), hc(
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
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), hc(i, e, l), i = null;
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
          zt(n.pendingProps.value, i.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (n === el.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(kn) : l = [kn]);
      }
      n = n.return;
    }
    l !== null && yc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function xu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!zt(
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
  function tt(l) {
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
  }, sh = c.unstable_scheduleCallback, oh = c.unstable_NormalPriority, Kl = {
    $$typeof: pl,
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
  function An(l) {
    l.refCount--, l.refCount === 0 && sh(oh, function() {
      l.controller.abort();
    });
  }
  var Nn = null, Sc = 0, qa = 0, Ba = null;
  function rh(l, t) {
    if (Nn === null) {
      var e = Nn = [];
      Sc = 0, qa = Ef(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Sc++, t.then(No, No), t;
  }
  function No() {
    if (--Sc === 0 && Nn !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var l = Nn;
      Nn = null, qa = 0, Ba = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function dh(l, t) {
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
    od = Ml(), typeof t == "object" && t !== null && typeof t.then == "function" && rh(l, t), Oo !== null && Oo(l, t);
  };
  var fa = m(null);
  function bc() {
    var l = fa.current;
    return l !== null ? l : Al.pooledCache;
  }
  function ju(l, t) {
    t === null ? H(fa, fa.current) : H(fa, t.pool);
  }
  function Do() {
    var l = bc();
    return l === null ? null : { parent: Kl._currentValue, pool: l };
  }
  var Ya = Error(s(460)), pc = Error(s(474)), Ru = Error(s(542)), Uu = { then: function() {
  } };
  function xo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Mo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Pt, Pt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ro(l), l;
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
            throw l = t.reason, Ro(l), l;
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
  function jo() {
    if (oa === null) throw Error(s(459));
    var l = oa;
    return oa = null, l;
  }
  function Ro(l) {
    if (l === Ya || l === Ru)
      throw Error(s(483));
  }
  var Ga = null, On = 0;
  function Cu(l) {
    var t = On;
    return On += 1, Ga === null && (Ga = []), Mo(Ga, l, t);
  }
  function Dn(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Hu(l, t) {
    throw t.$$typeof === N ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(
      s(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Uo(l) {
    function t(h, r) {
      if (l) {
        var y = h.deletions;
        y === null ? (h.deletions = [r], h.flags |= 16) : y.push(r);
      }
    }
    function e(h, r) {
      if (!l) return null;
      for (; r !== null; )
        t(h, r), r = r.sibling;
      return null;
    }
    function a(h) {
      for (var r = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? r.set(h.key, h) : r.set(h.index, h), h = h.sibling;
      return r;
    }
    function n(h, r) {
      return h = te(h, r), h.index = 0, h.sibling = null, h;
    }
    function u(h, r, y) {
      return h.index = y, l ? (y = h.alternate, y !== null ? (y = y.index, y < r ? (h.flags |= 67108866, r) : y) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function f(h, r, y, z) {
      return r === null || r.tag !== 6 ? (r = fc(y, h.mode, z), r.return = h, r) : (r = n(r, y), r.return = h, r);
    }
    function o(h, r, y, z) {
      var V = y.type;
      return V === w ? T(
        h,
        r,
        y.props.children,
        z,
        y.key
      ) : r !== null && (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Hl && sa(V) === r.type) ? (r = n(r, y.props), Dn(r, y), r.return = h, r) : (r = Ou(
        y.type,
        y.key,
        y.props,
        null,
        h.mode,
        z
      ), Dn(r, y), r.return = h, r);
    }
    function S(h, r, y, z) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== y.containerInfo || r.stateNode.implementation !== y.implementation ? (r = sc(y, h.mode, z), r.return = h, r) : (r = n(r, y.children || []), r.return = h, r);
    }
    function T(h, r, y, z, V) {
      return r === null || r.tag !== 7 ? (r = na(
        y,
        h.mode,
        z,
        V
      ), r.return = h, r) : (r = n(r, y), r.return = h, r);
    }
    function O(h, r, y) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = fc(
          "" + r,
          h.mode,
          y
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case C:
            return y = Ou(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              y
            ), Dn(y, r), y.return = h, y;
          case Q:
            return r = sc(
              r,
              h.mode,
              y
            ), r.return = h, r;
          case Hl:
            return r = sa(r), O(h, r, y);
        }
        if (Fl(r) || Ol(r))
          return r = na(
            r,
            h.mode,
            y,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return O(h, Cu(r), y);
        if (r.$$typeof === pl)
          return O(
            h,
            Mu(h, r),
            y
          );
        Hu(h, r);
      }
      return null;
    }
    function b(h, r, y, z) {
      var V = r !== null ? r.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return V !== null ? null : f(h, r, "" + y, z);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case C:
            return y.key === V ? o(h, r, y, z) : null;
          case Q:
            return y.key === V ? S(h, r, y, z) : null;
          case Hl:
            return y = sa(y), b(h, r, y, z);
        }
        if (Fl(y) || Ol(y))
          return V !== null ? null : T(h, r, y, z, null);
        if (typeof y.then == "function")
          return b(
            h,
            r,
            Cu(y),
            z
          );
        if (y.$$typeof === pl)
          return b(
            h,
            r,
            Mu(h, y),
            z
          );
        Hu(h, y);
      }
      return null;
    }
    function p(h, r, y, z, V) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return h = h.get(y) || null, f(r, h, "" + z, V);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case C:
            return h = h.get(
              z.key === null ? y : z.key
            ) || null, o(r, h, z, V);
          case Q:
            return h = h.get(
              z.key === null ? y : z.key
            ) || null, S(r, h, z, V);
          case Hl:
            return z = sa(z), p(
              h,
              r,
              y,
              z,
              V
            );
        }
        if (Fl(z) || Ol(z))
          return h = h.get(y) || null, T(r, h, z, V, null);
        if (typeof z.then == "function")
          return p(
            h,
            r,
            y,
            Cu(z),
            V
          );
        if (z.$$typeof === pl)
          return p(
            h,
            r,
            y,
            Mu(r, z),
            V
          );
        Hu(r, z);
      }
      return null;
    }
    function G(h, r, y, z) {
      for (var V = null, ml = null, X = r, tl = r = 0, il = null; X !== null && tl < y.length; tl++) {
        X.index > tl ? (il = X, X = null) : il = X.sibling;
        var vl = b(
          h,
          X,
          y[tl],
          z
        );
        if (vl === null) {
          X === null && (X = il);
          break;
        }
        l && X && vl.alternate === null && t(h, X), r = u(vl, r, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl, X = il;
      }
      if (tl === y.length)
        return e(h, X), ol && ee(h, tl), V;
      if (X === null) {
        for (; tl < y.length; tl++)
          X = O(h, y[tl], z), X !== null && (r = u(
            X,
            r,
            tl
          ), ml === null ? V = X : ml.sibling = X, ml = X);
        return ol && ee(h, tl), V;
      }
      for (X = a(X); tl < y.length; tl++)
        il = p(
          X,
          h,
          tl,
          y[tl],
          z
        ), il !== null && (l && il.alternate !== null && X.delete(
          il.key === null ? tl : il.key
        ), r = u(
          il,
          r,
          tl
        ), ml === null ? V = il : ml.sibling = il, ml = il);
      return l && X.forEach(function(Ke) {
        return t(h, Ke);
      }), ol && ee(h, tl), V;
    }
    function K(h, r, y, z) {
      if (y == null) throw Error(s(151));
      for (var V = null, ml = null, X = r, tl = r = 0, il = null, vl = y.next(); X !== null && !vl.done; tl++, vl = y.next()) {
        X.index > tl ? (il = X, X = null) : il = X.sibling;
        var Ke = b(h, X, vl.value, z);
        if (Ke === null) {
          X === null && (X = il);
          break;
        }
        l && X && Ke.alternate === null && t(h, X), r = u(Ke, r, tl), ml === null ? V = Ke : ml.sibling = Ke, ml = Ke, X = il;
      }
      if (vl.done)
        return e(h, X), ol && ee(h, tl), V;
      if (X === null) {
        for (; !vl.done; tl++, vl = y.next())
          vl = O(h, vl.value, z), vl !== null && (r = u(vl, r, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl);
        return ol && ee(h, tl), V;
      }
      for (X = a(X); !vl.done; tl++, vl = y.next())
        vl = p(X, h, tl, vl.value, z), vl !== null && (l && vl.alternate !== null && X.delete(vl.key === null ? tl : vl.key), r = u(vl, r, tl), ml === null ? V = vl : ml.sibling = vl, ml = vl);
      return l && X.forEach(function(T0) {
        return t(h, T0);
      }), ol && ee(h, tl), V;
    }
    function zl(h, r, y, z) {
      if (typeof y == "object" && y !== null && y.type === w && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case C:
            l: {
              for (var V = y.key; r !== null; ) {
                if (r.key === V) {
                  if (V = y.type, V === w) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), z = n(
                        r,
                        y.props.children
                      ), z.return = h, h = z;
                      break l;
                    }
                  } else if (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Hl && sa(V) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), z = n(r, y.props), Dn(z, y), z.return = h, h = z;
                    break l;
                  }
                  e(h, r);
                  break;
                } else t(h, r);
                r = r.sibling;
              }
              y.type === w ? (z = na(
                y.props.children,
                h.mode,
                z,
                y.key
              ), z.return = h, h = z) : (z = Ou(
                y.type,
                y.key,
                y.props,
                null,
                h.mode,
                z
              ), Dn(z, y), z.return = h, h = z);
            }
            return i(h);
          case Q:
            l: {
              for (V = y.key; r !== null; ) {
                if (r.key === V)
                  if (r.tag === 4 && r.stateNode.containerInfo === y.containerInfo && r.stateNode.implementation === y.implementation) {
                    e(
                      h,
                      r.sibling
                    ), z = n(r, y.children || []), z.return = h, h = z;
                    break l;
                  } else {
                    e(h, r);
                    break;
                  }
                else t(h, r);
                r = r.sibling;
              }
              z = sc(y, h.mode, z), z.return = h, h = z;
            }
            return i(h);
          case Hl:
            return y = sa(y), zl(
              h,
              r,
              y,
              z
            );
        }
        if (Fl(y))
          return G(
            h,
            r,
            y,
            z
          );
        if (Ol(y)) {
          if (V = Ol(y), typeof V != "function") throw Error(s(150));
          return y = V.call(y), K(
            h,
            r,
            y,
            z
          );
        }
        if (typeof y.then == "function")
          return zl(
            h,
            r,
            Cu(y),
            z
          );
        if (y.$$typeof === pl)
          return zl(
            h,
            r,
            Mu(h, y),
            z
          );
        Hu(h, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, r !== null && r.tag === 6 ? (e(h, r.sibling), z = n(r, y), z.return = h, h = z) : (e(h, r), z = fc(y, h.mode, z), z.return = h, h = z), i(h)) : e(h, r);
    }
    return function(h, r, y, z) {
      try {
        On = 0;
        var V = zl(
          h,
          r,
          y,
          z
        );
        return Ga = null, V;
      } catch (X) {
        if (X === Ya || X === Ru) throw X;
        var ml = At(29, X, null, h.mode);
        return ml.lanes = z, ml.return = h, ml;
      } finally {
      }
    };
  }
  var ra = Uo(!0), Co = Uo(!1), De = !1;
  function _c(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ec(l, t) {
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
    if (a = a.shared, (yl & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Nu(l), go(l, null, e), t;
    }
    return Au(l, a, t, e), Nu(l);
  }
  function xn(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, zs(l, e);
    }
  }
  function Tc(l, t) {
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
  var zc = !1;
  function Mn() {
    if (zc) {
      var l = Ba;
      if (l !== null) throw l;
    }
  }
  function jn(l, t, e, a) {
    zc = !1;
    var n = l.updateQueue;
    De = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var o = f, S = o.next;
      o.next = null, i === null ? u = S : i.next = S, i = o;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = S : f.next = S, T.lastBaseUpdate = o));
    }
    if (u !== null) {
      var O = n.baseState;
      i = 0, T = S = o = null, f = u;
      do {
        var b = f.lane & -536870913, p = b !== f.lane;
        if (p ? (ul & b) === b : (a & b) === b) {
          b !== 0 && b === qa && (zc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          l: {
            var G = l, K = f;
            b = t;
            var zl = e;
            switch (K.tag) {
              case 1:
                if (G = K.payload, typeof G == "function") {
                  O = G.call(zl, O, b);
                  break l;
                }
                O = G;
                break l;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = K.payload, b = typeof G == "function" ? G.call(zl, O, b) : G, b == null) break l;
                O = j({}, O, b);
                break l;
              case 2:
                De = !0;
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
          }, T === null ? (S = T = p, o = O) : T = T.next = p, i |= b;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          p = f, f = p.next, p.next = null, n.lastBaseUpdate = p, n.shared.pending = null;
        }
      } while (!0);
      T === null && (o = O), n.baseState = o, n.firstBaseUpdate = S, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), He |= i, l.lanes = i, l.memoizedState = O;
    }
  }
  function Ho(l, t) {
    if (typeof l != "function")
      throw Error(s(191, l));
    l.call(t);
  }
  function qo(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Ho(e[l], t);
  }
  var Xa = m(null), qu = m(0);
  function Bo(l, t) {
    l = me, H(qu, l), H(Xa, t), me = l | t.baseLanes;
  }
  function Ac() {
    H(qu, me), H(Xa, Xa.current);
  }
  function Nc() {
    me = qu.current, A(Xa), A(qu);
  }
  var Nt = m(null), Gt = null;
  function je(l) {
    var t = l.alternate;
    H(Ll, Ll.current & 1), H(Nt, l), Gt === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (Gt = l);
  }
  function Oc(l) {
    H(Ll, Ll.current), H(Nt, l), Gt === null && (Gt = l);
  }
  function Yo(l) {
    l.tag === 22 ? (H(Ll, Ll.current), H(Nt, l), Gt === null && (Gt = l)) : Re();
  }
  function Re() {
    H(Ll, Ll.current), H(Nt, Nt.current);
  }
  function Ot(l) {
    A(Nt), Gt === l && (Gt = null), A(Ll);
  }
  var Ll = m(0);
  function Bu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Cf(e) || Hf(e)))
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
  var ue = 0, ll = null, El = null, Jl = null, Yu = !1, Qa = !1, da = !1, Gu = 0, Rn = 0, Va = null, mh = 0;
  function Yl() {
    throw Error(s(321));
  }
  function Dc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!zt(l[e], t[e])) return !1;
    return !0;
  }
  function xc(l, t, e, a, n, u) {
    return ue = u, ll = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? _r : Zc, da = !1, u = e(a, n), da = !1, Qa && (u = Xo(
      t,
      e,
      a,
      n
    )), Go(l), u;
  }
  function Go(l) {
    E.H = Hn;
    var t = El !== null && El.next !== null;
    if (ue = 0, Jl = El = ll = null, Yu = !1, Rn = 0, Va = null, t) throw Error(s(300));
    l === null || wl || (l = l.dependencies, l !== null && xu(l) && (wl = !0));
  }
  function Xo(l, t, e, a) {
    ll = l;
    var n = 0;
    do {
      if (Qa && (Va = null), Rn = 0, Qa = !1, 25 <= n) throw Error(s(301));
      if (n += 1, Jl = El = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      E.H = Er, u = t(e, a);
    } while (Qa);
    return u;
  }
  function vh() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Un(t) : t, l = l.useState()[0], (El !== null ? El.memoizedState : null) !== l && (ll.flags |= 1024), t;
  }
  function Mc() {
    var l = Gu !== 0;
    return Gu = 0, l;
  }
  function jc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Rc(l) {
    if (Yu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Yu = !1;
    }
    ue = 0, Jl = El = ll = null, Qa = !1, Rn = Gu = 0, Va = null;
  }
  function ft() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jl === null ? ll.memoizedState = Jl = l : Jl = Jl.next = l, Jl;
  }
  function Zl() {
    if (El === null) {
      var l = ll.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = El.next;
    var t = Jl === null ? ll.memoizedState : Jl.next;
    if (t !== null)
      Jl = t, El = l;
    else {
      if (l === null)
        throw ll.alternate === null ? Error(s(467)) : Error(s(310));
      El = l, l = {
        memoizedState: El.memoizedState,
        baseState: El.baseState,
        baseQueue: El.baseQueue,
        queue: El.queue,
        next: null
      }, Jl === null ? ll.memoizedState = Jl = l : Jl = Jl.next = l;
    }
    return Jl;
  }
  function Xu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Un(l) {
    var t = Rn;
    return Rn += 1, Va === null && (Va = []), l = Mo(Va, l, t), t = ll, (Jl === null ? t.memoizedState : Jl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? _r : Zc), l;
  }
  function Qu(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Un(l);
      if (l.$$typeof === pl) return tt(l);
    }
    throw Error(s(438, String(l)));
  }
  function Uc(l) {
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
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Xu(), ll.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = it;
    return t.index++, e;
  }
  function ie(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Vu(l) {
    var t = Zl();
    return Cc(t, El, l);
  }
  function Cc(l, t, e) {
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
      var f = i = null, o = null, S = t, T = !1;
      do {
        var O = S.lane & -536870913;
        if (O !== S.lane ? (ul & O) === O : (ue & O) === O) {
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
            }, o === null ? (f = o = O, i = u) : o = o.next = O, ll.lanes |= b, He |= b;
          O = S.action, da && e(u, O), u = S.hasEagerState ? S.eagerState : e(u, O);
        } else
          b = {
            lane: O,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, o === null ? (f = o = b, i = u) : o = o.next = b, ll.lanes |= O, He |= O;
        S = S.next;
      } while (S !== null && S !== t);
      if (o === null ? i = u : o.next = f, !zt(u, l.memoizedState) && (wl = !0, T && (e = Ba, e !== null)))
        throw e;
      l.memoizedState = u, l.baseState = i, l.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Hc(l) {
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
      zt(u, t.memoizedState) || (wl = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Qo(l, t, e) {
    var a = ll, n = Zl(), u = ol;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !zt(
      (El || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, wl = !0), n = n.queue, Yc(Zo.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== t || i || Jl !== null && Jl.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), Al === null) throw Error(s(349));
      u || (ue & 127) !== 0 || Vo(a, t, e);
    }
    return e;
  }
  function Vo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = ll.updateQueue, t === null ? (t = Xu(), ll.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Lo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Ko(t) && Jo(l);
  }
  function Zo(l, t, e) {
    return e(function() {
      Ko(t) && Jo(l);
    });
  }
  function Ko(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !zt(l, e);
    } catch {
      return !0;
    }
  }
  function Jo(l) {
    var t = aa(l, 2);
    t !== null && bt(t, l, 2);
  }
  function qc(l) {
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
      lastRenderedReducer: ie,
      lastRenderedState: l
    }, t;
  }
  function wo(l, t, e, a) {
    return l.baseState = e, Cc(
      l,
      El,
      typeof a == "function" ? a : ie
    );
  }
  function hh(l, t, e, a, n) {
    if (Ku(l)) throw Error(s(485));
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
      E.T !== null ? e(!0) : u.isTransition = !1, a(u), e = t.pending, e === null ? (u.next = t.pending = u, $o(t, u)) : (u.next = e.next, t.pending = e.next = u);
    }
  }
  function $o(l, t) {
    var e = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var u = E.T, i = {};
      E.T = i;
      try {
        var f = e(n, a), o = E.S;
        o !== null && o(i, f), Wo(l, t, f);
      } catch (S) {
        Bc(l, t, S);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), E.T = u;
      }
    } else
      try {
        u = e(n, a), Wo(l, t, u);
      } catch (S) {
        Bc(l, t, S);
      }
  }
  function Wo(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Fo(l, t, a);
      },
      function(a) {
        return Bc(l, t, a);
      }
    ) : Fo(l, t, e);
  }
  function Fo(l, t, e) {
    t.status = "fulfilled", t.value = e, ko(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, $o(l, e)));
  }
  function Bc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, ko(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function ko(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Io(l, t) {
    return t;
  }
  function Po(l, t) {
    if (ol) {
      var e = Al.formState;
      if (e !== null) {
        l: {
          var a = ll;
          if (ol) {
            if (jl) {
              t: {
                for (var n = jl, u = Yt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Xt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                jl = Xt(
                  n.nextSibling
                ), a = n.data === "F!";
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
      lastRenderedReducer: Io,
      lastRenderedState: t
    }, e.queue = a, e = Sr.bind(
      null,
      ll,
      a
    ), a.dispatch = e, a = qc(!1), u = Lc.bind(
      null,
      ll,
      !1,
      a.queue
    ), a = ft(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, e = hh.bind(
      null,
      ll,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function lr(l) {
    var t = Zl();
    return tr(t, El, l);
  }
  function tr(l, t, e) {
    if (t = Cc(
      l,
      t,
      Io
    )[0], l = Vu(ie)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Un(t);
      } catch (i) {
        throw i === Ya ? Ru : i;
      }
    else a = t;
    t = Zl();
    var n = t.queue, u = n.dispatch;
    return e !== t.memoizedState && (ll.flags |= 2048, La(
      9,
      { destroy: void 0 },
      yh.bind(null, n, e),
      null
    )), [a, u, l];
  }
  function yh(l, t) {
    l.action = t;
  }
  function er(l) {
    var t = Zl(), e = El;
    if (e !== null)
      return tr(t, e, l);
    Zl(), t = t.memoizedState, e = Zl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function La(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = ll.updateQueue, t === null && (t = Xu(), ll.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function ar() {
    return Zl().memoizedState;
  }
  function Lu(l, t, e, a) {
    var n = ft();
    ll.flags |= l, n.memoizedState = La(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Zu(l, t, e, a) {
    var n = Zl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    El !== null && a !== null && Dc(a, El.memoizedState.deps) ? n.memoizedState = La(t, u, e, a) : (ll.flags |= l, n.memoizedState = La(
      1 | t,
      u,
      e,
      a
    ));
  }
  function nr(l, t) {
    Lu(8390656, 8, l, t);
  }
  function Yc(l, t) {
    Zu(2048, 8, l, t);
  }
  function gh(l) {
    ll.flags |= 4;
    var t = ll.updateQueue;
    if (t === null)
      t = Xu(), ll.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ur(l) {
    var t = Zl().memoizedState;
    return gh({ ref: t, nextImpl: l }), function() {
      if ((yl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ir(l, t) {
    return Zu(4, 2, l, t);
  }
  function cr(l, t) {
    return Zu(4, 4, l, t);
  }
  function fr(l, t) {
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
  function sr(l, t, e) {
    e = e != null ? e.concat([l]) : null, Zu(4, 4, fr.bind(null, t, l), e);
  }
  function Gc() {
  }
  function or(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Dc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function rr(l, t) {
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
  function Xc(l, t, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = dd(), ll.lanes |= l, He |= l, e);
  }
  function dr(l, t, e, a) {
    return zt(e, t) ? e : Xa.current !== null ? (l = Xc(l, e, a), zt(l, t) || (wl = !0), l) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? (wl = !0, l.memoizedState = e) : (l = dd(), ll.lanes |= l, He |= l, t);
  }
  function mr(l, t, e, a, n) {
    var u = q.p;
    q.p = u !== 0 && 8 > u ? u : 8;
    var i = E.T, f = {};
    E.T = f, Lc(l, !1, t, e);
    try {
      var o = n(), S = E.S;
      if (S !== null && S(f, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var T = dh(
          o,
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
    } catch (O) {
      Cn(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        Mt()
      );
    } finally {
      q.p = u, i !== null && f.types !== null && (i.types = f.types), E.T = i;
    }
  }
  function Sh() {
  }
  function Qc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var n = vr(l).queue;
    mr(
      l,
      n,
      t,
      Z,
      e === null ? Sh : function() {
        return hr(l), e(a);
      }
    );
  }
  function vr(l) {
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
  function hr(l) {
    var t = vr(l);
    t.next === null && (t = l.alternate.memoizedState), Cn(
      l,
      t.next.queue,
      {},
      Mt()
    );
  }
  function Vc() {
    return tt(kn);
  }
  function yr() {
    return Zl().memoizedState;
  }
  function gr() {
    return Zl().memoizedState;
  }
  function bh(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Mt();
          l = xe(e);
          var a = Me(t, l, e);
          a !== null && (bt(a, t, e), xn(a, t, e)), t = { cache: gc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ph(l, t, e) {
    var a = Mt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ku(l) ? br(t, e) : (e = ic(l, t, e, a), e !== null && (bt(e, l, a), pr(e, t, a)));
  }
  function Sr(l, t, e) {
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
    if (Ku(l)) br(t, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, zt(f, i))
            return Au(l, t, n, 0), Al === null && zu(), !1;
        } catch {
        } finally {
        }
      if (e = ic(l, t, n, a), e !== null)
        return bt(e, l, a), pr(e, t, a), !0;
    }
    return !1;
  }
  function Lc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Ef(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ku(l)) {
      if (t) throw Error(s(479));
    } else
      t = ic(
        l,
        e,
        a,
        2
      ), t !== null && bt(t, l, 2);
  }
  function Ku(l) {
    var t = l.alternate;
    return l === ll || t !== null && t === ll;
  }
  function br(l, t) {
    Qa = Yu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function pr(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, zs(l, e);
    }
  }
  var Hn = {
    readContext: tt,
    use: Qu,
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
  var _r = {
    readContext: tt,
    use: Qu,
    useCallback: function(l, t) {
      return ft().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: tt,
    useEffect: nr,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Lu(
        4194308,
        4,
        fr.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Lu(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Lu(4, 2, l, t);
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
      }, a.queue = l, l = l.dispatch = ph.bind(
        null,
        ll,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = ft();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = qc(l);
      var t = l.queue, e = Sr.bind(null, ll, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Gc,
    useDeferredValue: function(l, t) {
      var e = ft();
      return Xc(e, l, t);
    },
    useTransition: function() {
      var l = qc(!1);
      return l = mr.bind(
        null,
        ll,
        l.queue,
        !0,
        !1
      ), ft().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = ll, n = ft();
      if (ol) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = t(), Al === null)
          throw Error(s(349));
        (ul & 127) !== 0 || Vo(a, t, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: t };
      return n.queue = u, nr(Zo.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Lo.bind(
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
      var l = ft(), t = Al.identifierPrefix;
      if (ol) {
        var e = Jt, a = Kt;
        e = (a & ~(1 << 32 - Tt(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Gu++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = mh++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Vc,
    useFormState: Po,
    useActionState: Po,
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
      return t.queue = e, t = Lc.bind(
        null,
        ll,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Uc,
    useCacheRefresh: function() {
      return ft().memoizedState = bh.bind(
        null,
        ll
      );
    },
    useEffectEvent: function(l) {
      var t = ft(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((yl & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Zc = {
    readContext: tt,
    use: Qu,
    useCallback: or,
    useContext: tt,
    useEffect: Yc,
    useImperativeHandle: sr,
    useInsertionEffect: ir,
    useLayoutEffect: cr,
    useMemo: rr,
    useReducer: Vu,
    useRef: ar,
    useState: function() {
      return Vu(ie);
    },
    useDebugValue: Gc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return dr(
        e,
        El.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Vu(ie)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Un(l),
        t
      ];
    },
    useSyncExternalStore: Qo,
    useId: yr,
    useHostTransitionStatus: Vc,
    useFormState: lr,
    useActionState: lr,
    useOptimistic: function(l, t) {
      var e = Zl();
      return wo(e, El, l, t);
    },
    useMemoCache: Uc,
    useCacheRefresh: gr
  };
  Zc.useEffectEvent = ur;
  var Er = {
    readContext: tt,
    use: Qu,
    useCallback: or,
    useContext: tt,
    useEffect: Yc,
    useImperativeHandle: sr,
    useInsertionEffect: ir,
    useLayoutEffect: cr,
    useMemo: rr,
    useReducer: Hc,
    useRef: ar,
    useState: function() {
      return Hc(ie);
    },
    useDebugValue: Gc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return El === null ? Xc(e, l, t) : dr(
        e,
        El.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Hc(ie)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Un(l),
        t
      ];
    },
    useSyncExternalStore: Qo,
    useId: yr,
    useHostTransitionStatus: Vc,
    useFormState: er,
    useActionState: er,
    useOptimistic: function(l, t) {
      var e = Zl();
      return El !== null ? wo(e, El, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Uc,
    useCacheRefresh: gr
  };
  Er.useEffectEvent = ur;
  function Kc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : j({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Jc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = xe(a);
      n.payload = t, e != null && (n.callback = e), t = Me(l, n, a), t !== null && (bt(t, l, a), xn(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = xe(a);
      n.tag = 1, n.payload = t, e != null && (n.callback = e), t = Me(l, n, a), t !== null && (bt(t, l, a), xn(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Mt(), a = xe(e);
      a.tag = 2, t != null && (a.callback = t), t = Me(l, a, e), t !== null && (bt(t, l, e), xn(t, l, e));
    }
  };
  function Tr(l, t, e, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !_n(e, a) || !_n(n, u) : !0;
  }
  function zr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Jc.enqueueReplaceState(t, t.state, null);
  }
  function ma(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = j({}, e));
      for (var n in l)
        e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Ar(l) {
    Tu(l);
  }
  function Nr(l) {
    console.error(l);
  }
  function Or(l) {
    Tu(l);
  }
  function Ju(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Dr(l, t, e) {
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
  function wc(l, t, e) {
    return e = xe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Ju(l, t);
    }, e;
  }
  function xr(l) {
    return l = xe(l), l.tag = 3, l;
  }
  function Mr(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        Dr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Dr(t, e, a), typeof n != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function _h(l, t, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ha(
        t,
        e,
        n,
        !0
      ), e = Nt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Gt === null ? ni() : e.alternate === null && Gl === 0 && (Gl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Uu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), bf(l, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Uu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), bf(l, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return bf(l, a, n), ni(), !1;
    }
    if (ol)
      return t = Nt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== dc && (l = Error(s(422), { cause: a }), zn(Ht(l, e)))) : (a !== dc && (t = Error(s(423), {
        cause: a
      }), zn(
        Ht(t, e)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = Ht(a, e), n = wc(
        l.stateNode,
        a,
        n
      ), Tc(l, n), Gl !== 4 && (Gl = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Ht(u, e), Ln === null ? Ln = [u] : Ln.push(u), Gl !== 4 && (Gl = 2), t === null) return !0;
    a = Ht(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = n & -n, e.lanes |= l, l = wc(e.stateNode, a, l), Tc(e, l), !1;
        case 1:
          if (t = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qe === null || !qe.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = xr(n), Mr(
              n,
              l,
              e,
              a
            ), Tc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var $c = Error(s(461)), wl = !1;
  function et(l, t, e, a) {
    t.child = l === null ? Co(t, null, e, a) : ra(
      t,
      l.child,
      e,
      a
    );
  }
  function jr(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return ca(t), a = xc(
      l,
      t,
      e,
      i,
      u,
      n
    ), f = Mc(), l !== null && !wl ? (jc(l, t, n), ce(l, t, n)) : (ol && f && oc(t), t.flags |= 1, et(l, t, a, n), t.child);
  }
  function Rr(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !cc(u) && u.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = u, Ur(
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
    if (u = l.child, !ef(l, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : _n, e(i, a) && l.ref === t.ref)
        return ce(l, t, n);
    }
    return t.flags |= 1, l = te(u, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Ur(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (_n(u, a) && l.ref === t.ref)
        if (wl = !1, t.pendingProps = a = u, ef(l, n))
          (l.flags & 131072) !== 0 && (wl = !0);
        else
          return t.lanes = l.lanes, ce(l, t, n);
    }
    return Wc(
      l,
      t,
      e,
      a,
      n
    );
  }
  function Cr(l, t, e, a) {
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
        return Hr(
          l,
          t,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && ju(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Bo(t, u) : Ac(), Yo(t);
      else
        return a = t.lanes = 536870912, Hr(
          l,
          t,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (ju(t, u.cachePool), Bo(t, u), Re(), t.memoizedState = null) : (l !== null && ju(t, null), Ac(), Re());
    return et(l, t, n, e), t.child;
  }
  function qn(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Hr(l, t, e, a, n) {
    var u = bc();
    return u = u === null ? null : { parent: Kl._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && ju(t, null), Ac(), Yo(t), l !== null && Ha(l, t, a, !0), t.childLanes = n, null;
  }
  function wu(l, t) {
    return t = Wu(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function qr(l, t, e) {
    return ra(t, l.child, null, e), l = wu(t, t.pendingProps), l.flags |= 2, Ot(t), t.memoizedState = null, l;
  }
  function Eh(l, t, e) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (ol) {
        if (a.mode === "hidden")
          return l = wu(t, a), t.lanes = 536870912, qn(null, l);
        if (Oc(t), (l = jl) ? (l = $d(
          l,
          Yt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(l), e.return = t, t.child = e, lt = t, jl = null)) : l = null, l === null) throw Ne(t);
        return t.lanes = 536870912, null;
      }
      return wu(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Oc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = qr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (wl || Ha(l, t, e, !1), n = (e & l.childLanes) !== 0, wl || n) {
        if (a = Al, a !== null && (i = As(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, aa(l, i), bt(a, l, i), $c;
        ni(), t = qr(
          l,
          t,
          e
        );
      } else
        l = u.treeContext, jl = Xt(i.nextSibling), lt = t, ol = !0, Ae = null, Yt = !1, l !== null && Eo(t, l), t = wu(t, a), t.flags |= 4096;
      return t;
    }
    return l = te(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function $u(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Wc(l, t, e, a, n) {
    return ca(t), e = xc(
      l,
      t,
      e,
      a,
      void 0,
      n
    ), a = Mc(), l !== null && !wl ? (jc(l, t, n), ce(l, t, n)) : (ol && a && oc(t), t.flags |= 1, et(l, t, e, n), t.child);
  }
  function Br(l, t, e, a, n, u) {
    return ca(t), t.updateQueue = null, e = Xo(
      t,
      a,
      e,
      n
    ), Go(l), a = Mc(), l !== null && !wl ? (jc(l, t, u), ce(l, t, u)) : (ol && a && oc(t), t.flags |= 1, et(l, t, e, u), t.child);
  }
  function Yr(l, t, e, a, n) {
    if (ca(t), t.stateNode === null) {
      var u = ja, i = e.contextType;
      typeof i == "object" && i !== null && (u = tt(i)), u = new e(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Jc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, _c(t), i = e.contextType, u.context = typeof i == "object" && i !== null ? tt(i) : ja, u.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Kc(
        t,
        e,
        i,
        a
      ), u.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Jc.enqueueReplaceState(u, u.state, null), jn(t, a, u, n), Mn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = t.stateNode;
      var f = t.memoizedProps, o = ma(e, f);
      u.props = o;
      var S = u.context, T = e.contextType;
      i = ja, typeof T == "object" && T !== null && (i = tt(T));
      var O = e.getDerivedStateFromProps;
      T = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || S !== i) && zr(
        t,
        u,
        a,
        i
      ), De = !1;
      var b = t.memoizedState;
      u.state = b, jn(t, a, u, n), Mn(), S = t.memoizedState, f || b !== S || De ? (typeof O == "function" && (Kc(
        t,
        e,
        O,
        a
      ), S = t.memoizedState), (o = De || Tr(
        t,
        e,
        o,
        a,
        b,
        S,
        i
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = S), u.props = a, u.state = S, u.context = i, a = o) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, Ec(l, t), i = t.memoizedProps, T = ma(e, i), u.props = T, O = t.pendingProps, b = u.context, S = e.contextType, o = ja, typeof S == "object" && S !== null && (o = tt(S)), f = e.getDerivedStateFromProps, (S = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== O || b !== o) && zr(
        t,
        u,
        a,
        o
      ), De = !1, b = t.memoizedState, u.state = b, jn(t, a, u, n), Mn();
      var p = t.memoizedState;
      i !== O || b !== p || De || l !== null && l.dependencies !== null && xu(l.dependencies) ? (typeof f == "function" && (Kc(
        t,
        e,
        f,
        a
      ), p = t.memoizedState), (T = De || Tr(
        t,
        e,
        T,
        a,
        b,
        p,
        o
      ) || l !== null && l.dependencies !== null && xu(l.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, p, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        p,
        o
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = p), u.props = a, u.state = p, u.context = o, a = T) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, $u(l, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, l !== null && a ? (t.child = ra(
      t,
      l.child,
      null,
      n
    ), t.child = ra(
      t,
      null,
      e,
      n
    )) : et(l, t, e, n), t.memoizedState = u.state, l = t.child) : l = ce(
      l,
      t,
      n
    ), l;
  }
  function Gr(l, t, e, a) {
    return ua(), t.flags |= 256, et(l, t, e, a), t.child;
  }
  var Fc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(l) {
    return { baseLanes: l, cachePool: Do() };
  }
  function Ic(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= xt), l;
  }
  function Xr(l, t, e) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Ll.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (ol) {
        if (n ? je(t) : Re(), (l = jl) ? (l = $d(
          l,
          Yt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(l), e.return = t, t.child = e, lt = t, jl = null)) : l = null, l === null) throw Ne(t);
        return Hf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Re(), n = t.mode, f = Wu(
        { mode: "hidden", children: f },
        n
      ), a = na(
        a,
        n,
        e,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = kc(e), a.childLanes = Ic(
        l,
        i,
        e
      ), t.memoizedState = Fc, qn(null, a)) : (je(t), Pc(t, f));
    }
    var o = l.memoizedState;
    if (o !== null && (f = o.dehydrated, f !== null)) {
      if (u)
        t.flags & 256 ? (je(t), t.flags &= -257, t = lf(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Re(), t.child = l.child, t.flags |= 128, t = null) : (Re(), f = a.fallback, n = t.mode, a = Wu(
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
        ), a = t.child, a.memoizedState = kc(e), a.childLanes = Ic(
          l,
          i,
          e
        ), t.memoizedState = Fc, t = qn(null, a));
      else if (je(t), Hf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var S = i.dgst;
        i = S, a = Error(s(419)), a.stack = "", a.digest = i, zn({ value: a, source: null, stack: null }), t = lf(
          l,
          t,
          e
        );
      } else if (wl || Ha(l, t, e, !1), i = (e & l.childLanes) !== 0, wl || i) {
        if (i = Al, i !== null && (a = As(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, aa(l, a), bt(i, l, a), $c;
        Cf(f) || ni(), t = lf(
          l,
          t,
          e
        );
      } else
        Cf(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = o.treeContext, jl = Xt(
          f.nextSibling
        ), lt = t, ol = !0, Ae = null, Yt = !1, l !== null && Eo(t, l), t = Pc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (Re(), f = a.fallback, n = t.mode, o = l.child, S = o.sibling, a = te(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, S !== null ? f = te(
      S,
      f
    ) : (f = na(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, qn(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = kc(e) : (n = f.cachePool, n !== null ? (o = Kl._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = Do(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = Ic(
      l,
      i,
      e
    ), t.memoizedState = Fc, qn(l.child, a)) : (je(t), e = l.child, l = e.sibling, e = te(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Pc(l, t) {
    return t = Wu(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Wu(l, t) {
    return l = At(22, l, null, t), l.lanes = 0, l;
  }
  function lf(l, t, e) {
    return ra(t, l.child, null, e), l = Pc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Qr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), hc(l.return, t, e);
  }
  function tf(l, t, e, a, n, u) {
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
  function Vr(l, t, e) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ll.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, H(Ll, i), et(l, t, a, e), a = ol ? Tn : 0, !f && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Qr(l, e, t);
        else if (l.tag === 19)
          Qr(l, e, t);
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
          l = e.alternate, l !== null && Bu(l) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = t.child, t.child = null) : (n = e.sibling, e.sibling = null), tf(
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
          if (l = n.alternate, l !== null && Bu(l) === null) {
            t.child = n;
            break;
          }
          l = n.sibling, n.sibling = e, e = n, n = l;
        }
        tf(
          t,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        tf(
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
  function ef(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && xu(l)));
  }
  function Th(l, t, e) {
    switch (t.tag) {
      case 3:
        Ql(t, t.stateNode.containerInfo), Oe(t, Kl, l.memoizedState.cache), ua();
        break;
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        Ql(t, t.stateNode.containerInfo);
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
          return t.flags |= 128, Oc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (je(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Xr(l, t, e) : (je(t), l = ce(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        je(t);
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
            return Vr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), H(Ll, Ll.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Cr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        Oe(t, Kl, l.memoizedState.cache);
    }
    return ce(l, t, e);
  }
  function Lr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        wl = !0;
      else {
        if (!ef(l, e) && (t.flags & 128) === 0)
          return wl = !1, Th(
            l,
            t,
            e
          );
        wl = (l.flags & 131072) !== 0;
      }
    else
      wl = !1, ol && (t.flags & 1048576) !== 0 && _o(t, Tn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = sa(t.elementType), t.type = l, typeof l == "function")
            cc(l) ? (a = ma(l, a), t.tag = 1, t = Yr(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Wc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === Nl) {
                t.tag = 11, t = jr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (n === $) {
                t.tag = 14, t = Rr(
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
        return Wc(
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
        ), Yr(
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
          n = u.element, Ec(l, t), jn(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, Oe(t, Kl, a), a !== u.cache && yc(
            t,
            [Kl],
            e,
            !0
          ), Mn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Gr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== n) {
              n = Ht(
                Error(s(424)),
                t
              ), zn(n), t = Gr(
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
              for (jl = Xt(l.firstChild), lt = t, ol = !0, Ae = null, Yt = !0, e = Co(
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
            et(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return $u(l, t), l === null ? (e = lm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : ol || (e = t.type, l = t.pendingProps, a = ri(
          P.current
        ).createElement(e), a[Pl] = t, a[mt] = l, at(a, e, l), kl(a), t.stateNode = a) : t.memoizedState = lm(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return be(t), l === null && ol && (a = t.stateNode = kd(
          t.type,
          t.pendingProps,
          P.current
        ), lt = t, Yt = !0, n = jl, Xe(t.type) ? (qf = n, jl = Xt(a.firstChild)) : jl = n), et(
          l,
          t,
          t.pendingProps.children,
          e
        ), $u(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && ol && ((n = a = jl) && (a = Ph(
          a,
          t.type,
          t.pendingProps,
          Yt
        ), a !== null ? (t.stateNode = a, lt = t, jl = Xt(a.firstChild), Yt = !1, n = !0) : n = !1), n || Ne(t)), be(t), n = t.type, u = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, jf(n, u) ? a = null : i !== null && jf(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = xc(
          l,
          t,
          vh,
          null,
          null,
          e
        ), kn._currentValue = n), $u(l, t), et(l, t, a, e), t.child;
      case 6:
        return l === null && ol && ((l = e = jl) && (e = l0(
          e,
          t.pendingProps,
          Yt
        ), e !== null ? (t.stateNode = e, lt = t, jl = null, l = !0) : l = !1), l || Ne(t)), null;
      case 13:
        return Xr(l, t, e);
      case 4:
        return Ql(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ra(
          t,
          null,
          a,
          e
        ) : et(l, t, a, e), t.child;
      case 11:
        return jr(
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
        return n = t.type._context, a = t.pendingProps.children, ca(t), n = tt(n), a = a(n), t.flags |= 1, et(l, t, a, e), t.child;
      case 14:
        return Rr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Ur(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Vr(l, t, e);
      case 31:
        return Eh(l, t, e);
      case 22:
        return Cr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ca(t), a = tt(Kl), l === null ? (n = bc(), n === null && (n = Al, u = gc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), t.memoizedState = { parent: a, cache: n }, _c(t), Oe(t, Kl, n)) : ((l.lanes & e) !== 0 && (Ec(l, t), jn(t, null, null, e), Mn()), n = l.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Oe(t, Kl, a)) : (a = u.cache, Oe(t, Kl, a), a !== n.cache && yc(
          t,
          [Kl],
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
  function fe(l) {
    l.flags |= 4;
  }
  function af(l, t, e, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (yd()) l.flags |= 8192;
        else
          throw oa = Uu, pc;
    } else l.flags &= -16777217;
  }
  function Zr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !um(t))
      if (yd()) l.flags |= 8192;
      else
        throw oa = Uu, pc;
  }
  function Fu(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Es() : 536870912, l.lanes |= t, wa |= t);
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
  function Rl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function zh(l, t, e) {
    var a = t.pendingProps;
    switch (rc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Rl(t), null;
      case 1:
        return Rl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ne(Kl), ql(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ca(t) ? fe(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, mc())), Rl(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return l === null ? (fe(t), u !== null ? (Rl(t), Zr(t, u)) : (Rl(t), af(
          t,
          n,
          null,
          a,
          e
        ))) : u ? u !== l.memoizedState ? (fe(t), Rl(t), Zr(t, u)) : (Rl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && fe(t), Rl(t), af(
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
            return Rl(t), null;
          }
          l = Y.current, Ca(t) ? To(t) : (l = kd(n, a, e), t.stateNode = l, fe(t));
        }
        return Rl(t), null;
      case 5:
        if (We(t), n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && fe(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Rl(t), null;
          }
          if (u = Y.current, Ca(t))
            To(t);
          else {
            var i = ri(
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
            u[Pl] = t, u[mt] = a;
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
            l: switch (at(u, n, a), n) {
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
        return Rl(t), af(
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
            if (l = t.stateNode, e = t.memoizedProps, a = null, n = lt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[Pl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Xd(l.nodeValue, e)), l || Ne(t, !0);
          } else
            l = ri(l).createTextNode(
              a
            ), l[Pl] = t, t.stateNode = l;
        }
        return Rl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ca(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Pl] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Rl(t), l = !1;
          } else
            e = mc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Rl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = Ca(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Pl] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Rl(t), n = !1;
          } else
            n = mc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
        }
        return Ot(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Fu(t, t.updateQueue), Rl(t), null);
      case 4:
        return ql(), l === null && Nf(t.stateNode.containerInfo), Rl(t), null;
      case 10:
        return ne(t.type), Rl(t), null;
      case 19:
        if (A(Ll), a = t.memoizedState, a === null) return Rl(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Bn(a, !1);
          else {
            if (Gl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (u = Bu(l), u !== null) {
                  for (t.flags |= 128, Bn(a, !1), l = u.updateQueue, t.updateQueue = l, Fu(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    So(e, l), e = e.sibling;
                  return H(
                    Ll,
                    Ll.current & 1 | 2
                  ), ol && ee(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ml() > ti && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = Bu(u), l !== null) {
              if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, Fu(t, l), Bn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ol)
                return Rl(t), null;
            } else
              2 * Ml() - a.renderingStartTime > ti && e !== 536870912 && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (l = a.last, l !== null ? l.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ml(), l.sibling = null, e = Ll.current, H(
          Ll,
          n ? e & 1 | 2 : e & 1
        ), ol && ee(t, a.treeForkCount), l) : (Rl(t), null);
      case 22:
      case 23:
        return Ot(t), Nc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Rl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Rl(t), e = t.updateQueue, e !== null && Fu(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(fa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), ne(Kl), Rl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Ah(l, t) {
    switch (rc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return ne(Kl), ql(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
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
        return ql(), null;
      case 10:
        return ne(t.type), null;
      case 22:
      case 23:
        return Ot(t), Nc(), l !== null && A(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return ne(Kl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kr(l, t) {
    switch (rc(t), t.tag) {
      case 3:
        ne(Kl), ql();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
        break;
      case 4:
        ql();
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
        Ot(t), Nc(), l !== null && A(fa);
        break;
      case 24:
        ne(Kl);
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
      bl(t, t.return, f);
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
              var o = e, S = f;
              try {
                S();
              } catch (T) {
                bl(
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
      bl(t, t.return, T);
    }
  }
  function Jr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        qo(t, e);
      } catch (a) {
        bl(l, l.return, a);
      }
    }
  }
  function wr(l, t, e) {
    e.props = ma(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      bl(l, t, a);
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
      bl(l, t, n);
    }
  }
  function wt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          bl(l, t, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          bl(l, t, n);
        }
      else e.current = null;
  }
  function $r(l) {
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
      bl(l, l.return, n);
    }
  }
  function nf(l, t, e) {
    try {
      var a = l.stateNode;
      wh(a, l.type, e, t), a[mt] = t;
    } catch (n) {
      bl(l, l.return, n);
    }
  }
  function Wr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Xe(l.type) || l.tag === 4;
  }
  function uf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Wr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Xe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function cf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Pt));
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (cf(l, t, e), l = l.sibling; l !== null; )
        cf(l, t, e), l = l.sibling;
  }
  function ku(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (ku(l, t, e), l = l.sibling; l !== null; )
        ku(l, t, e), l = l.sibling;
  }
  function Fr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      at(t, a, e), t[Pl] = l, t[mt] = e;
    } catch (u) {
      bl(l, l.return, u);
    }
  }
  var se = !1, $l = !1, ff = !1, kr = typeof WeakSet == "function" ? WeakSet : Set, Il = null;
  function Nh(l, t) {
    if (l = l.containerInfo, xf = Si, l = fo(l), lc(l)) {
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
            var i = 0, f = -1, o = -1, S = 0, T = 0, O = l, b = null;
            t: for (; ; ) {
              for (var p; O !== e || n !== 0 && O.nodeType !== 3 || (f = i + n), O !== u || a !== 0 && O.nodeType !== 3 || (o = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (p = O.firstChild) !== null; )
                b = O, O = p;
              for (; ; ) {
                if (O === l) break t;
                if (b === e && ++S === n && (f = i), b === u && ++T === a && (o = i), (p = O.nextSibling) !== null) break;
                O = b, b = O.parentNode;
              }
              O = p;
            }
            e = f === -1 || o === -1 ? null : { start: f, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Mf = { focusedElem: l, selectionRange: e }, Si = !1, Il = t; Il !== null; )
      if (t = Il, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Il = l;
      else
        for (; Il !== null; ) {
          switch (t = Il, u = t.alternate, l = t.flags, t.tag) {
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
                  bl(
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
                  Uf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Uf(l);
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
  function Ir(l, t, e) {
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
              bl(e, e.return, i);
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
              bl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Jr(e), a & 512 && Gn(e, e.return);
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
            qo(l, t);
          } catch (i) {
            bl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Fr(e);
      case 26:
      case 5:
        re(l, e), t === null && a & 4 && $r(e), a & 512 && Gn(e, e.return);
        break;
      case 12:
        re(l, e);
        break;
      case 31:
        re(l, e), a & 4 && td(l, e);
        break;
      case 13:
        re(l, e), a & 4 && ed(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Hh.bind(
          null,
          e
        ), t0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || se, !a) {
          t = t !== null && t.memoizedState !== null || $l, n = se;
          var u = $l;
          se = a, ($l = t) && !u ? de(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : re(l, e), se = n, $l = u;
        }
        break;
      case 30:
        break;
      default:
        re(l, e);
    }
  }
  function Pr(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Pr(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Bi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Cl = null, ht = !1;
  function oe(l, t, e) {
    for (e = e.child; e !== null; )
      ld(l, t, e), e = e.sibling;
  }
  function ld(l, t, e) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(kt, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        $l || wt(e, t), oe(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        $l || wt(e, t);
        var a = Cl, n = ht;
        Xe(e.type) && (Cl = e.stateNode, ht = !1), oe(
          l,
          t,
          e
        ), $n(e.stateNode), Cl = a, ht = n;
        break;
      case 5:
        $l || wt(e, t);
      case 6:
        if (a = Cl, n = ht, Cl = null, oe(
          l,
          t,
          e
        ), Cl = a, ht = n, Cl !== null)
          if (ht)
            try {
              (Cl.nodeType === 9 ? Cl.body : Cl.nodeName === "HTML" ? Cl.ownerDocument.body : Cl).removeChild(e.stateNode);
            } catch (u) {
              bl(
                e,
                t,
                u
              );
            }
          else
            try {
              Cl.removeChild(e.stateNode);
            } catch (u) {
              bl(
                e,
                t,
                u
              );
            }
        break;
      case 18:
        Cl !== null && (ht ? (l = Cl, Jd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), tn(l)) : Jd(Cl, e.stateNode));
        break;
      case 4:
        a = Cl, n = ht, Cl = e.stateNode.containerInfo, ht = !0, oe(
          l,
          t,
          e
        ), Cl = a, ht = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, t), $l || Ue(4, e, t), oe(
          l,
          t,
          e
        );
        break;
      case 1:
        $l || (wt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && wr(
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
        $l = (a = $l) || e.memoizedState !== null, oe(
          l,
          t,
          e
        ), $l = a;
        break;
      default:
        oe(
          l,
          t,
          e
        );
    }
  }
  function td(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        tn(l);
      } catch (e) {
        bl(t, t.return, e);
      }
    }
  }
  function ed(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        tn(l);
      } catch (e) {
        bl(t, t.return, e);
      }
  }
  function Oh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new kr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new kr()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function Iu(l, t) {
    var e = Oh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = qh.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function yt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = l, i = t, f = i;
        l: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Xe(f.type)) {
                Cl = f.stateNode, ht = !1;
                break l;
              }
              break;
            case 5:
              Cl = f.stateNode, ht = !1;
              break l;
            case 3:
            case 4:
              Cl = f.stateNode.containerInfo, ht = !0;
              break l;
          }
          f = f.return;
        }
        if (Cl === null) throw Error(s(160));
        ld(u, i, n), Cl = null, ht = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ad(t, l), t = t.sibling;
  }
  var Lt = null;
  function ad(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        yt(t, l), gt(l), a & 4 && (Ue(3, l, l.return), Yn(3, l), Ue(5, l, l.return));
        break;
      case 1:
        yt(t, l), gt(l), a & 512 && ($l || e === null || wt(e, e.return)), a & 64 && se && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Lt;
        if (yt(t, l), gt(l), a & 512 && ($l || e === null || wt(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[dn] || u[Pl] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), at(u, a, e), u[Pl] = l, kl(u), a = u;
                      break l;
                    case "link":
                      var i = am(
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
                      u = n.createElement(a), at(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = am(
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
                      u = n.createElement(a), at(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[Pl] = l, kl(u), a = u;
                }
                l.stateNode = a;
              } else
                nm(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = em(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? nm(
              n,
              l.type,
              l.stateNode
            ) : em(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && nf(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        yt(t, l), gt(l), a & 512 && ($l || e === null || wt(e, e.return)), e !== null && a & 4 && nf(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (yt(t, l), gt(l), a & 512 && ($l || e === null || wt(e, e.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            za(n, "");
          } catch (G) {
            bl(l, l.return, G);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, nf(
          l,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (ff = !0);
        break;
      case 6:
        if (yt(t, l), gt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (G) {
            bl(l, l.return, G);
          }
        }
        break;
      case 3:
        if (vi = null, n = Lt, Lt = di(t.containerInfo), yt(t, l), Lt = n, gt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            tn(t.containerInfo);
          } catch (G) {
            bl(l, l.return, G);
          }
        ff && (ff = !1, nd(l));
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
        yt(t, l), gt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Iu(l, a)));
        break;
      case 13:
        yt(t, l), gt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (li = Ml()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Iu(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, S = se, T = $l;
        if (se = S || n, $l = T || o, yt(t, l), $l = T, se = S, gt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (e === null || o || se || $l || va(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                o = e = t;
                try {
                  if (u = o.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = o.stateNode;
                    var O = o.memoizedProps.style, b = O != null && O.hasOwnProperty("display") ? O.display : null;
                    f.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (G) {
                  bl(o, o.return, G);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                o = t;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (G) {
                  bl(o, o.return, G);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                o = t;
                try {
                  var p = o.stateNode;
                  n ? wd(p, !0) : wd(o.stateNode, !1);
                } catch (G) {
                  bl(o, o.return, G);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Iu(l, e))));
        break;
      case 19:
        yt(t, l), gt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Iu(l, a)));
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
          if (Wr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = uf(l);
            ku(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (za(i, ""), e.flags &= -33);
            var f = uf(l);
            ku(l, f, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, S = uf(l);
            cf(
              l,
              S,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        bl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function nd(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        nd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function re(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ir(l, t.alternate, t), t = t.sibling;
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
          typeof e.componentWillUnmount == "function" && wr(
            t,
            t.return,
            e
          ), va(t);
          break;
        case 27:
          $n(t.stateNode);
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
              bl(a, a.return, S);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  Ho(o[n], f);
            } catch (S) {
              bl(a, a.return, S);
            }
          }
          e && i & 64 && Jr(u), Gn(u, u.return);
          break;
        case 27:
          Fr(u);
        case 26:
        case 5:
          de(
            n,
            u,
            e
          ), e && a === null && i & 4 && $r(u), Gn(u, u.return);
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
          ), e && i & 4 && td(n, u);
          break;
        case 13:
          de(
            n,
            u,
            e
          ), e && i & 4 && ed(n, u);
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
  function sf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && An(e));
  }
  function of(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && An(l));
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
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(
          l,
          t,
          e,
          a
        ), n & 2048 && Yn(9, t);
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
        ), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && An(l)));
        break;
      case 12:
        if (n & 2048) {
          Zt(
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
          } catch (o) {
            bl(t, t.return, o);
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
        u = t.stateNode, i = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Zt(
          l,
          t,
          e,
          a
        ) : Xn(l, t) : u._visibility & 2 ? Zt(
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
        )), n & 2048 && sf(i, t);
        break;
      case 24:
        Zt(
          l,
          t,
          e,
          a
        ), n & 2048 && of(t.alternate, t);
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
  function Za(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l, i = t, f = e, o = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(
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
          i.memoizedState !== null ? T._visibility & 2 ? Za(
            u,
            i,
            f,
            o,
            n
          ) : Xn(
            u,
            i
          ) : (T._visibility |= 2, Za(
            u,
            i,
            f,
            o,
            n
          )), n && S & 2048 && sf(
            i.alternate,
            i
          );
          break;
        case 24:
          Za(
            u,
            i,
            f,
            o,
            n
          ), n && S & 2048 && of(i.alternate, i);
          break;
        default:
          Za(
            u,
            i,
            f,
            o,
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
            Xn(e, a), n & 2048 && sf(
              a.alternate,
              a
            );
            break;
          case 24:
            Xn(e, a), n & 2048 && of(a.alternate, a);
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
        id(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function id(l, t, e) {
    switch (l.tag) {
      case 26:
        Ka(
          l,
          t,
          e
        ), l.flags & Qn && l.memoizedState !== null && m0(
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
  function cd(l) {
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
          Il = a, sd(
            a,
            l
          );
        }
      cd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        fd(l), l = l.sibling;
  }
  function fd(l) {
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
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Pu(l)) : Vn(l);
        break;
      default:
        Vn(l);
    }
  }
  function Pu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Il = a, sd(
            a,
            l
          );
        }
      cd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, t, t.return), Pu(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Pu(t));
          break;
        default:
          Pu(t);
      }
      l = l.sibling;
    }
  }
  function sd(l, t) {
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
          An(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Il = a;
      else
        l: for (e = l; Il !== null; ) {
          a = Il;
          var n = a.sibling, u = a.return;
          if (Pr(a), a === e) {
            Il = null;
            break l;
          }
          if (n !== null) {
            n.return = u, Il = n;
            break l;
          }
          Il = u;
        }
    }
  }
  var Dh = {
    getCacheForType: function(l) {
      var t = tt(Kl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return tt(Kl).controller.signal;
    }
  }, xh = typeof WeakMap == "function" ? WeakMap : Map, yl = 0, Al = null, al = null, ul = 0, Sl = 0, Dt = null, Ce = !1, Ja = !1, rf = !1, me = 0, Gl = 0, He = 0, ha = 0, df = 0, xt = 0, wa = 0, Ln = null, St = null, mf = !1, li = 0, od = 0, ti = 1 / 0, ei = null, qe = null, Wl = 0, Be = null, $a = null, ve = 0, vf = 0, hf = null, rd = null, Zn = 0, yf = null;
  function Mt() {
    return (yl & 2) !== 0 && ul !== 0 ? ul & -ul : E.T !== null ? Ef() : Ns();
  }
  function dd() {
    if (xt === 0)
      if ((ul & 536870912) === 0 || ol) {
        var l = ou;
        ou <<= 1, (ou & 3932160) === 0 && (ou = 262144), xt = l;
      } else xt = 536870912;
    return l = Nt.current, l !== null && (l.flags |= 32), xt;
  }
  function bt(l, t, e) {
    (l === Al && (Sl === 2 || Sl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), Ye(
      l,
      ul,
      xt,
      !1
    )), rn(l, e), ((yl & 2) === 0 || l !== Al) && (l === Al && ((yl & 2) === 0 && (ha |= e), Gl === 4 && Ye(
      l,
      ul,
      xt,
      !1
    )), $t(l));
  }
  function md(l, t, e) {
    if ((yl & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || on(l, t), n = a ? Rh(l, t) : Sf(l, t, !0), u = a;
    do {
      if (n === 0) {
        Ja && !a && Ye(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, u && !Mh(e)) {
          n = Sf(l, t, !1), u = !1;
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
              var o = f.current.memoizedState.isDehydrated;
              if (o && (Wa(f, i).flags |= 256), i = Sf(
                f,
                i,
                !1
              ), i !== 2) {
                if (rf && !o) {
                  f.errorRecoveryDisabledLanes |= u, ha |= u, n = 4;
                  break l;
                }
                u = St, St = n, u !== null && (St === null ? St = u : St.push.apply(
                  St,
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
                xt,
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
          if ((t & 62914560) === t && (n = li + 300 - Ml(), 10 < n)) {
            if (Ye(
              a,
              t,
              xt,
              !Ce
            ), du(a, 0, !0) !== 0) break l;
            ve = t, a.timeoutHandle = Zd(
              vd.bind(
                null,
                a,
                e,
                St,
                ei,
                mf,
                t,
                xt,
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
          vd(
            a,
            e,
            St,
            ei,
            mf,
            t,
            xt,
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
    $t(l);
  }
  function vd(l, t, e, a, n, u, i, f, o, S, T, O, b, p) {
    if (l.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pt
      }, id(
        t,
        u,
        O
      );
      var G = (u & 62914560) === u ? li - Ml() : (u & 4194048) === u ? od - Ml() : 0;
      if (G = v0(
        O,
        G
      ), G !== null) {
        ve = u, l.cancelPendingCommit = G(
          Ed.bind(
            null,
            l,
            t,
            u,
            e,
            a,
            n,
            i,
            f,
            o,
            T,
            O,
            null,
            b,
            p
          )
        ), Ye(l, u, i, !S);
        return;
      }
    }
    Ed(
      l,
      t,
      u,
      e,
      a,
      n,
      i,
      f,
      o
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
            if (!zt(u(), n)) return !1;
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
    t &= ~df, t &= ~ha, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Tt(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && Ts(l, e, t);
  }
  function ai() {
    return (yl & 6) === 0 ? (Kn(0), !1) : !0;
  }
  function gf() {
    if (al !== null) {
      if (Sl === 0)
        var l = al.return;
      else
        l = al, ae = ia = null, Rc(l), Ga = null, On = 0, l = al;
      for (; l !== null; )
        Kr(l.alternate, l), l = l.return;
      al = null;
    }
  }
  function Wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Fh(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), ve = 0, gf(), Al = l, al = e = te(l.current, null), ul = t, Sl = 0, Dt = null, Ce = !1, Ja = on(l, t), rf = !1, wa = xt = df = ha = He = Gl = 0, St = Ln = null, mf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - Tt(a), u = 1 << n;
        t |= l[n], a &= ~u;
      }
    return me = t, zu(), e;
  }
  function hd(l, t) {
    ll = null, E.H = Hn, t === Ya || t === Ru ? (t = jo(), Sl = 3) : t === pc ? (t = jo(), Sl = 4) : Sl = t === $c ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Dt = t, al === null && (Gl = 1, Ju(
      l,
      Ht(t, l.current)
    ));
  }
  function yd() {
    var l = Nt.current;
    return l === null ? !0 : (ul & 4194048) === ul ? Gt === null : (ul & 62914560) === ul || (ul & 536870912) !== 0 ? l === Gt : !1;
  }
  function gd() {
    var l = E.H;
    return E.H = Hn, l === null ? Hn : l;
  }
  function Sd() {
    var l = E.A;
    return E.A = Dh, l;
  }
  function ni() {
    Gl = 4, Ce || (ul & 4194048) !== ul && Nt.current !== null || (Ja = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || Al === null || Ye(
      Al,
      ul,
      xt,
      !1
    );
  }
  function Sf(l, t, e) {
    var a = yl;
    yl |= 2;
    var n = gd(), u = Sd();
    (Al !== l || ul !== t) && (ei = null, Wa(l, t)), t = !1;
    var i = Gl;
    l: do
      try {
        if (Sl !== 0 && al !== null) {
          var f = al, o = Dt;
          switch (Sl) {
            case 8:
              gf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              Nt.current === null && (t = !0);
              var S = Sl;
              if (Sl = 0, Dt = null, Fa(l, f, o, S), e && Ja) {
                i = 0;
                break l;
              }
              break;
            default:
              S = Sl, Sl = 0, Dt = null, Fa(l, f, o, S);
          }
        }
        jh(), i = Gl;
        break;
      } catch (T) {
        hd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, ae = ia = null, yl = a, E.H = n, E.A = u, al === null && (Al = null, ul = 0, zu()), i;
  }
  function jh() {
    for (; al !== null; ) bd(al);
  }
  function Rh(l, t) {
    var e = yl;
    yl |= 2;
    var a = gd(), n = Sd();
    Al !== l || ul !== t ? (ei = null, ti = Ml() + 500, Wa(l, t)) : Ja = on(
      l,
      t
    );
    l: do
      try {
        if (Sl !== 0 && al !== null) {
          t = al;
          var u = Dt;
          t: switch (Sl) {
            case 1:
              Sl = 0, Dt = null, Fa(l, t, u, 1);
              break;
            case 2:
            case 9:
              if (xo(u)) {
                Sl = 0, Dt = null, pd(t);
                break;
              }
              t = function() {
                Sl !== 2 && Sl !== 9 || Al !== l || (Sl = 7), $t(l);
              }, u.then(t, t);
              break l;
            case 3:
              Sl = 7;
              break l;
            case 4:
              Sl = 5;
              break l;
            case 7:
              xo(u) ? (Sl = 0, Dt = null, pd(t)) : (Sl = 0, Dt = null, Fa(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (al.tag) {
                case 26:
                  i = al.memoizedState;
                case 5:
                case 27:
                  var f = al;
                  if (i ? um(i) : f.stateNode.complete) {
                    Sl = 0, Dt = null;
                    var o = f.sibling;
                    if (o !== null) al = o;
                    else {
                      var S = f.return;
                      S !== null ? (al = S, ui(S)) : al = null;
                    }
                    break t;
                  }
              }
              Sl = 0, Dt = null, Fa(l, t, u, 5);
              break;
            case 6:
              Sl = 0, Dt = null, Fa(l, t, u, 6);
              break;
            case 8:
              gf(), Gl = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        Uh();
        break;
      } catch (T) {
        hd(l, T);
      }
    while (!0);
    return ae = ia = null, E.H = a, E.A = n, yl = e, al !== null ? 0 : (Al = null, ul = 0, zu(), Gl);
  }
  function Uh() {
    for (; al !== null && !rt(); )
      bd(al);
  }
  function bd(l) {
    var t = Lr(l.alternate, l, me);
    l.memoizedProps = l.pendingProps, t === null ? ui(l) : al = t;
  }
  function pd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Br(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ul
        );
        break;
      case 11:
        t = Br(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ul
        );
        break;
      case 5:
        Rc(t);
      default:
        Kr(e, t), t = al = So(t, me), t = Lr(e, t, me);
    }
    l.memoizedProps = l.pendingProps, t === null ? ui(l) : al = t;
  }
  function Fa(l, t, e, a) {
    ae = ia = null, Rc(t), Ga = null, On = 0;
    var n = t.return;
    try {
      if (_h(
        l,
        n,
        t,
        e,
        ul
      )) {
        Gl = 1, Ju(
          l,
          Ht(e, l.current)
        ), al = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw al = n, u;
      Gl = 1, Ju(
        l,
        Ht(e, l.current)
      ), al = null;
      return;
    }
    t.flags & 32768 ? (ol || a === 1 ? l = !0 : Ja || (ul & 536870912) !== 0 ? l = !1 : (Ce = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Nt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), _d(t, l)) : ui(t);
  }
  function ui(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        _d(
          t,
          Ce
        );
        return;
      }
      l = t.return;
      var e = zh(
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
  function _d(l, t) {
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
  function Ed(l, t, e, a, n, u, i, f, o) {
    l.cancelPendingCommit = null;
    do
      ii();
    while (Wl !== 0);
    if ((yl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (u = t.lanes | t.childLanes, u |= uc, dv(
        l,
        e,
        u,
        i,
        f,
        o
      ), l === Al && (al = Al = null, ul = 0), $a = t, Be = l, ve = e, vf = u, hf = n, rd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Bh(ke, function() {
        return Od(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, n = q.p, q.p = 2, i = yl, yl |= 4;
        try {
          Nh(l, t, e);
        } finally {
          yl = i, q.p = n, E.T = a;
        }
      }
      Wl = 1, Td(), zd(), Ad();
    }
  }
  function Td() {
    if (Wl === 1) {
      Wl = 0;
      var l = Be, t = $a, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var n = yl;
        yl |= 4;
        try {
          ad(t, l);
          var u = Mf, i = fo(l.containerInfo), f = u.focusedElem, o = u.selectionRange;
          if (i !== f && f && f.ownerDocument && co(
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
                var O = f.ownerDocument || document, b = O && O.defaultView || window;
                if (b.getSelection) {
                  var p = b.getSelection(), G = f.textContent.length, K = Math.min(o.start, G), zl = o.end === void 0 ? K : Math.min(o.end, G);
                  !p.extend && K > zl && (i = zl, zl = K, K = i);
                  var h = io(
                    f,
                    K
                  ), r = io(
                    f,
                    zl
                  );
                  if (h && r && (p.rangeCount !== 1 || p.anchorNode !== h.node || p.anchorOffset !== h.offset || p.focusNode !== r.node || p.focusOffset !== r.offset)) {
                    var y = O.createRange();
                    y.setStart(h.node, h.offset), p.removeAllRanges(), K > zl ? (p.addRange(y), p.extend(r.node, r.offset)) : (y.setEnd(r.node, r.offset), p.addRange(y));
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
          Si = !!xf, Mf = xf = null;
        } finally {
          yl = n, q.p = a, E.T = e;
        }
      }
      l.current = t, Wl = 2;
    }
  }
  function zd() {
    if (Wl === 2) {
      Wl = 0;
      var l = Be, t = $a, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var n = yl;
        yl |= 4;
        try {
          Ir(l, t.alternate, t);
        } finally {
          yl = n, q.p = a, E.T = e;
        }
      }
      Wl = 3;
    }
  }
  function Ad() {
    if (Wl === 4 || Wl === 3) {
      Wl = 0, Vl();
      var l = Be, t = $a, e = ve, a = rd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Wl = 5 : (Wl = 0, $a = Be = null, Nd(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (qe = null), Hi(e), t = t.stateNode, Et && typeof Et.onCommitFiberRoot == "function")
        try {
          Et.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, n = q.p, q.p = 2, E.T = null;
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          E.T = t, q.p = n;
        }
      }
      (ve & 3) !== 0 && ii(), $t(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === yf ? Zn++ : (Zn = 0, yf = l) : Zn = 0, Kn(0);
    }
  }
  function Nd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, An(t)));
  }
  function ii() {
    return Td(), zd(), Ad(), Od();
  }
  function Od() {
    if (Wl !== 5) return !1;
    var l = Be, t = vf;
    vf = 0;
    var e = Hi(ve), a = E.T, n = q.p;
    try {
      q.p = 32 > e ? 32 : e, E.T = null, e = hf, hf = null;
      var u = Be, i = ve;
      if (Wl = 0, $a = Be = null, ve = 0, (yl & 6) !== 0) throw Error(s(331));
      var f = yl;
      if (yl |= 4, fd(u.current), ud(
        u,
        u.current,
        i,
        e
      ), yl = f, Kn(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
        try {
          Et.onPostCommitFiberRoot(kt, u);
        } catch {
        }
      return !0;
    } finally {
      q.p = n, E.T = a, Nd(l, t);
    }
  }
  function Dd(l, t, e) {
    t = Ht(e, t), t = wc(l.stateNode, t, 2), l = Me(l, t, 2), l !== null && (rn(l, 2), $t(l));
  }
  function bl(l, t, e) {
    if (l.tag === 3)
      Dd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Dd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            l = Ht(e, l), e = xr(2), a = Me(t, e, 2), a !== null && (Mr(
              e,
              a,
              t,
              l
            ), rn(a, 2), $t(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function bf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new xh();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(e) || (rf = !0, n.add(e), l = Ch.bind(null, l, t, e), t.then(l, l));
  }
  function Ch(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Al === l && (ul & e) === e && (Gl === 4 || Gl === 3 && (ul & 62914560) === ul && 300 > Ml() - li ? (yl & 2) === 0 && Wa(l, 0) : df |= e, wa === ul && (wa = 0)), $t(l);
  }
  function xd(l, t) {
    t === 0 && (t = Es()), l = aa(l, t), l !== null && (rn(l, t), $t(l));
  }
  function Hh(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), xd(l, e);
  }
  function qh(l, t) {
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
    a !== null && a.delete(t), xd(l, e);
  }
  function Bh(l, t) {
    return xl(l, t);
  }
  var ci = null, ka = null, pf = !1, fi = !1, _f = !1, Ge = 0;
  function $t(l) {
    l !== ka && l.next === null && (ka === null ? ci = ka = l : ka = ka.next = l), fi = !0, pf || (pf = !0, Gh());
  }
  function Kn(l, t) {
    if (!_f && fi) {
      _f = !0;
      do
        for (var e = !1, a = ci; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - Tt(42 | l) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Ud(a, u));
          } else
            u = ul, u = du(
              a,
              a === Al ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || on(a, u) || (e = !0, Ud(a, u));
          a = a.next;
        }
      while (e);
      _f = !1;
    }
  }
  function Yh() {
    Md();
  }
  function Md() {
    fi = pf = !1;
    var l = 0;
    Ge !== 0 && Wh() && (l = Ge);
    for (var t = Ml(), e = null, a = ci; a !== null; ) {
      var n = a.next, u = jd(a, t);
      u === 0 ? (a.next = null, e === null ? ci = n : e.next = n, n === null && (ka = e)) : (e = a, (l !== 0 || (u & 3) !== 0) && (fi = !0)), a = n;
    }
    Wl !== 0 && Wl !== 5 || Kn(l), Ge !== 0 && (Ge = 0);
  }
  function jd(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Tt(u), f = 1 << i, o = n[i];
      o === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = rv(f, t)) : o <= t && (l.expiredLanes |= f), u &= ~f;
    }
    if (t = Al, e = ul, e = du(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (Sl === 2 || Sl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ot(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || on(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ot(a), Hi(e)) {
        case 2:
        case 8:
          e = fn;
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
      return a = Rd.bind(null, l), e = xl(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ot(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Rd(l, t) {
    if (Wl !== 0 && Wl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ii() && l.callbackNode !== e)
      return null;
    var a = ul;
    return a = du(
      l,
      l === Al ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (md(l, a, t), jd(l, Ml()), l.callbackNode != null && l.callbackNode === e ? Rd.bind(null, l) : null);
  }
  function Ud(l, t) {
    if (ii()) return null;
    md(l, t, !0);
  }
  function Gh() {
    kh(function() {
      (yl & 6) !== 0 ? xl(
        pe,
        Yh
      ) : Md();
    });
  }
  function Ef() {
    if (Ge === 0) {
      var l = qa;
      l === 0 && (l = su, su <<= 1, (su & 261888) === 0 && (su = 256)), Ge = l;
    }
    return Ge;
  }
  function Cd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : yu("" + l);
  }
  function Hd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Xh(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = Cd(
        (n[mt] || null).action
      ), i = a.submitter;
      i && (t = (t = i[mt] || null) ? Cd(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var f = new pu(
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
                  var o = i ? Hd(n, i) : new FormData(n);
                  Qc(
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
                typeof u == "function" && (f.preventDefault(), o = i ? Hd(n, i) : new FormData(n), Qc(
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
  for (var Tf = 0; Tf < nc.length; Tf++) {
    var zf = nc[Tf], Qh = zf.toLowerCase(), Vh = zf[0].toUpperCase() + zf.slice(1);
    Vt(
      Qh,
      "on" + Vh
    );
  }
  Vt(ro, "onAnimationEnd"), Vt(mo, "onAnimationIteration"), Vt(vo, "onAnimationStart"), Vt("dblclick", "onDoubleClick"), Vt("focusin", "onFocus"), Vt("focusout", "onBlur"), Vt(nh, "onTransitionRun"), Vt(uh, "onTransitionStart"), Vt(ih, "onTransitionCancel"), Vt(ho, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Pe(
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
  ), Lh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jn)
  );
  function qd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], o = f.instance, S = f.currentTarget;
            if (f = f.listener, o !== u && n.isPropagationStopped())
              break l;
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
              break l;
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
  function nl(l, t) {
    var e = t[qi];
    e === void 0 && (e = t[qi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Bd(t, l, 2, !1), e.add(a));
  }
  function Af(l, t, e) {
    var a = 0;
    t && (a |= 4), Bd(
      e,
      l,
      a,
      t
    );
  }
  var si = "_reactListening" + Math.random().toString(36).slice(2);
  function Nf(l) {
    if (!l[si]) {
      l[si] = !0, xs.forEach(function(e) {
        e !== "selectionchange" && (Lh.has(e) || Af(e, !1, l), Af(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[si] || (t[si] = !0, Af("selectionchange", !1, t));
    }
  }
  function Bd(l, t, e, a) {
    switch (dm(t)) {
      case 2:
        var n = g0;
        break;
      case 8:
        n = S0;
        break;
      default:
        n = Qf;
    }
    e = n.bind(
      null,
      t,
      e,
      l
    ), n = void 0, !Ki || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, e, !0) : n !== void 0 ? l.addEventListener(t, e, {
      passive: n
    }) : l.addEventListener(t, e, !1);
  }
  function Of(l, t, e, a, n) {
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
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = ba(f), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = i;
              continue l;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Qs(function() {
      var S = u, T = Li(e), O = [];
      l: {
        var b = yo.get(l);
        if (b !== void 0) {
          var p = pu, G = l;
          switch (l) {
            case "keypress":
              if (Su(e) === 0) break l;
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
              if (e.button === 2) break l;
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
              p = xv;
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
          var K = (t & 4) !== 0, zl = !K && (l === "scroll" || l === "scrollend"), h = K ? b !== null ? b + "Capture" : null : b;
          K = [];
          for (var r = S, y; r !== null; ) {
            var z = r;
            if (y = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || y === null || h === null || (z = vn(r, h), z != null && K.push(
              wn(r, z, y)
            )), zl) break;
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
      if ((t & 7) === 0) {
        l: {
          if (b = l === "mouseover" || l === "pointerover", p = l === "mouseout" || l === "pointerout", b && e !== Vi && (G = e.relatedTarget || e.fromElement) && (ba(G) || G[Sa]))
            break l;
          if ((p || b) && (b = T.window === T ? T : (b = T.ownerDocument) ? b.defaultView || b.parentWindow : window, p ? (G = e.relatedTarget || e.toElement, p = S, G = G ? ba(G) : null, G !== null && (zl = R(G), K = G.tag, G !== zl || K !== 5 && K !== 27 && K !== 6) && (G = null)) : (p = null, G = S), p !== G)) {
            if (K = Zs, z = "onMouseLeave", h = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (K = Js, z = "onPointerLeave", h = "onPointerEnter", r = "pointer"), zl = p == null ? b : mn(p), y = G == null ? b : mn(G), b = new K(
              z,
              r + "leave",
              p,
              e,
              T
            ), b.target = zl, b.relatedTarget = y, z = null, ba(T) === S && (K = new K(
              h,
              r + "enter",
              G,
              e,
              T
            ), K.target = y, K.relatedTarget = zl, z = K), zl = z, p && G)
              t: {
                for (K = Zh, h = p, r = G, y = 0, z = h; z; z = K(z))
                  y++;
                z = 0;
                for (var V = r; V; V = K(V))
                  z++;
                for (; 0 < y - z; )
                  h = K(h), y--;
                for (; 0 < z - y; )
                  r = K(r), z--;
                for (; y--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    K = h;
                    break t;
                  }
                  h = K(h), r = K(r);
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
            ), G !== null && zl !== null && Yd(
              O,
              zl,
              G,
              K,
              !0
            );
          }
        }
        l: {
          if (b = S ? mn(S) : window, p = b.nodeName && b.nodeName.toLowerCase(), p === "select" || p === "input" && b.type === "file")
            var ml = lo;
          else if (Is(b))
            if (to)
              ml = th;
            else {
              ml = Pv;
              var X = Iv;
            }
          else
            p = b.nodeName, !p || p.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? S && Qi(S.elementType) && (ml = lo) : ml = lh;
          if (ml && (ml = ml(l, S))) {
            Ps(
              O,
              ml,
              e,
              T
            );
            break l;
          }
          X && X(l, b, S), l === "focusout" && S && b.type === "number" && S.memoizedProps.value != null && Xi(b, "number", b.value);
        }
        switch (X = S ? mn(S) : window, l) {
          case "focusin":
            (Is(X) || X.contentEditable === "true") && (Da = X, tc = S, En = null);
            break;
          case "focusout":
            En = tc = Da = null;
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
        var tl;
        if (ki)
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
          Oa ? Fs(l, e) && (il = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (il = "onCompositionStart");
        il && (ws && e.locale !== "ko" && (Oa || il !== "onCompositionStart" ? il === "onCompositionEnd" && Oa && (tl = Vs()) : (Te = T, Ji = "value" in Te ? Te.value : Te.textContent, Oa = !0)), X = oi(S, il), 0 < X.length && (il = new Ks(
          il,
          l,
          null,
          e,
          T
        ), O.push({ event: il, listeners: X }), tl ? il.data = tl : (tl = ks(e), tl !== null && (il.data = tl)))), (tl = wv ? $v(l, e) : Wv(l, e)) && (il = oi(S, "onBeforeInput"), 0 < il.length && (X = new Ks(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), O.push({
          event: X,
          listeners: il
        }), X.data = tl)), Xh(
          O,
          l,
          S,
          e,
          T
        );
      }
      qd(O, t);
    });
  }
  function wn(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function oi(l, t) {
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
  function Zh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Yd(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var f = e, o = f.alternate, S = f.stateNode;
      if (f = f.tag, o !== null && o === a) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (o = S, n ? (S = vn(e, u), S != null && i.unshift(
        wn(e, S, o)
      )) : n || (S = vn(e, u), S != null && i.push(
        wn(e, S, o)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Kh = /\r\n?/g, Jh = /\u0000|\uFFFD/g;
  function Gd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Kh, `
`).replace(Jh, "");
  }
  function Xd(l, t) {
    return t = Gd(t), Gd(l) === t;
  }
  function Tl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || za(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && za(l, "" + a);
        break;
      case "className":
        vu(l, "class", a);
        break;
      case "tabIndex":
        vu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vu(l, e, a);
        break;
      case "style":
        Gs(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          vu(l, "data", a);
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
        a = yu("" + a), l.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (t !== "input" && Tl(l, t, "name", n.name, n, null), Tl(
            l,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Tl(
            l,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Tl(
            l,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Tl(l, t, "encType", n.encType, n, null), Tl(l, t, "method", n.method, n, null), Tl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = yu("" + a), l.setAttribute(e, a);
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
        e = yu("" + a), l.setAttributeNS(
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
        nl("beforetoggle", l), nl("toggle", l), mu(l, "popover", a);
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
        mu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = pv.get(e) || e, mu(l, e, a));
    }
  }
  function Df(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        Gs(l, a, u);
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
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), t = e.slice(2, n ? e.length - 7 : void 0), u = l[mt] || null, u = u != null ? u[e] : null, typeof u == "function" && l.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, n);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : mu(l, e, a);
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
                  Tl(l, t, u, i, e, null);
              }
          }
        n && Tl(l, t, "srcSet", e.srcSet, e, null), a && Tl(l, t, "src", e.src, e, null);
        return;
      case "input":
        nl("invalid", l);
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
                    throw Error(s(137, t));
                  break;
                default:
                  Tl(l, t, a, T, e, null);
              }
          }
        Hs(
          l,
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
                Tl(l, t, n, f, e, null);
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
                Tl(l, t, i, f, e, null);
            }
        Bs(l, a, n, u);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Tl(l, t, o, a, e, null);
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
                Tl(l, t, S, a, e, null);
            }
        return;
      default:
        if (Qi(t)) {
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
      e.hasOwnProperty(f) && (a = e[f], a != null && Tl(l, t, f, a, e, null));
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
        var n = null, u = null, i = null, f = null, o = null, S = null, T = null;
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
                a.hasOwnProperty(p) || Tl(l, t, p, null, a, O);
            }
        }
        for (var b in a) {
          var p = a[b];
          if (O = e[b], a.hasOwnProperty(b) && (p != null || O != null))
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
                p !== O && Tl(
                  l,
                  t,
                  b,
                  p,
                  a,
                  O
                );
            }
        }
        Gi(
          l,
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
        p = i = f = b = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                p = o;
              default:
                a.hasOwnProperty(u) || Tl(
                  l,
                  t,
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
                u !== o && Tl(
                  l,
                  t,
                  n,
                  u,
                  a,
                  o
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
                Tl(l, t, f, null, a, n);
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
                n !== u && Tl(l, t, i, n, a, u);
            }
        qs(l, b, p);
        return;
      case "option":
        for (var G in e)
          if (b = e[G], e.hasOwnProperty(G) && b != null && !a.hasOwnProperty(G))
            switch (G) {
              case "selected":
                l.selected = !1;
                break;
              default:
                Tl(
                  l,
                  t,
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
                l.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                Tl(
                  l,
                  t,
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
          b = e[K], e.hasOwnProperty(K) && b != null && !a.hasOwnProperty(K) && Tl(l, t, K, null, a, b);
        for (S in a)
          if (b = a[S], p = e[S], a.hasOwnProperty(S) && b !== p && (b != null || p != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(s(137, t));
                break;
              default:
                Tl(
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
        if (Qi(t)) {
          for (var zl in e)
            b = e[zl], e.hasOwnProperty(zl) && b !== void 0 && !a.hasOwnProperty(zl) && Df(
              l,
              t,
              zl,
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
      b = e[h], e.hasOwnProperty(h) && b != null && !a.hasOwnProperty(h) && Tl(l, t, h, null, a, b);
    for (O in a)
      b = a[O], p = e[O], !a.hasOwnProperty(O) || b === p || b == null && p == null || Tl(l, t, O, b, a, p);
  }
  function Qd(l) {
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
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Qd(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], S = o.startTime;
            if (S > f) break;
            var T = o.transferSize, O = o.initiatorType;
            T && Qd(O) && (o = o.responseEnd, i += T * (o < f ? 1 : (f - S) / (o - S)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var xf = null, Mf = null;
  function ri(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Vd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ld(l, t) {
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
  function jf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Rf = null;
  function Wh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Rf ? !1 : (Rf = l, !0) : (Rf = null, !1);
  }
  var Zd = typeof setTimeout == "function" ? setTimeout : void 0, Fh = typeof clearTimeout == "function" ? clearTimeout : void 0, Kd = typeof Promise == "function" ? Promise : void 0, kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kd < "u" ? function(l) {
    return Kd.resolve(null).then(l).catch(Ih);
  } : Zd;
  function Ih(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Xe(l) {
    return l === "head";
  }
  function Jd(l, t) {
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
  function wd(l, t) {
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
  function Uf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
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
      l.removeChild(e);
    }
  }
  function Ph(l, t, e, a) {
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
  function $d(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Cf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Hf(l) {
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
  var qf = null;
  function Wd(l) {
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
  function Fd(l) {
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
  function kd(l, t, e) {
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
  function $n(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Bi(l);
  }
  var Qt = /* @__PURE__ */ new Map(), Id = /* @__PURE__ */ new Set();
  function di(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var he = q.d;
  q.d = {
    f: e0,
    r: a0,
    D: n0,
    C: u0,
    L: i0,
    m: c0,
    X: s0,
    S: f0,
    M: o0
  };
  function e0() {
    var l = he.f(), t = ai();
    return l || t;
  }
  function a0(l) {
    var t = pa(l);
    t !== null && t.tag === 5 && t.type === "form" ? hr(t) : he.r(l);
  }
  var Ia = typeof document > "u" ? null : document;
  function Pd(l, t, e) {
    var a = Ia;
    if (a && typeof t == "string" && t) {
      var n = Ut(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Id.has(n) || (Id.add(n), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), at(t, "link", l), kl(t), a.head.appendChild(t)));
    }
  }
  function n0(l) {
    he.D(l), Pd("dns-prefetch", l, null);
  }
  function u0(l, t) {
    he.C(l, t), Pd("preconnect", l, t);
  }
  function i0(l, t, e) {
    he.L(l, t, e);
    var a = Ia;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + Ut(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Ut(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Ut(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Ut(l) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Pa(l);
          break;
        case "script":
          u = ln(l);
      }
      Qt.has(u) || (l = j(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Qt.set(u, l), a.querySelector(n) !== null || t === "style" && a.querySelector(Wn(u)) || t === "script" && a.querySelector(Fn(u)) || (t = a.createElement("link"), at(t, "link", l), kl(t), a.head.appendChild(t)));
    }
  }
  function c0(l, t) {
    he.m(l, t);
    var e = Ia;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Ut(a) + '"][href="' + Ut(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ln(l);
      }
      if (!Qt.has(u) && (l = j({ rel: "modulepreload", href: l }, t), Qt.set(u, l), e.querySelector(n) === null)) {
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
        a = e.createElement("link"), at(a, "link", l), kl(a), e.head.appendChild(a);
      }
    }
  }
  function f0(l, t, e) {
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
          l = j(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Qt.get(u)) && Bf(l, e);
          var o = i = a.createElement("link");
          kl(o), at(o, "link", l), o._p = new Promise(function(S, T) {
            o.onload = S, o.onerror = T;
          }), o.addEventListener("load", function() {
            f.loading |= 1;
          }), o.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, mi(i, t, a);
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
  function s0(l, t) {
    he.X(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, n = ln(l), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (l = j({ src: l, async: !0 }, t), (t = Qt.get(n)) && Yf(l, t), u = e.createElement("script"), kl(u), at(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function o0(l, t) {
    he.M(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, n = ln(l), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (l = j({ src: l, async: !0, type: "module" }, t), (t = Qt.get(n)) && Yf(l, t), u = e.createElement("script"), kl(u), at(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function lm(l, t, e, a) {
    var n = (n = P.current) ? di(n) : null;
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
          )) && !u._p && (i.instance = u, i.state.loading = 5), Qt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Qt.set(l, e), u || r0(
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
    return 'href="' + Ut(l) + '"';
  }
  function Wn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function tm(l) {
    return j({}, l, {
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
  function ln(l) {
    return '[src="' + Ut(l) + '"]';
  }
  function Fn(l) {
    return "script[async]" + l;
  }
  function em(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Ut(e.href) + '"]'
          );
          if (a)
            return t.instance = a, kl(a), a;
          var n = j({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), kl(a), at(a, "style", n), mi(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          n = Pa(e.href);
          var u = l.querySelector(
            Wn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, kl(u), u;
          a = tm(e), (n = Qt.get(n)) && Bf(a, n), u = (l.ownerDocument || l).createElement("link"), kl(u);
          var i = u;
          return i._p = new Promise(function(f, o) {
            i.onload = f, i.onerror = o;
          }), at(u, "link", a), t.state.loading |= 4, mi(u, e.precedence, l), t.instance = u;
        case "script":
          return u = ln(e.src), (n = l.querySelector(
            Fn(u)
          )) ? (t.instance = n, kl(n), n) : (a = e, (n = Qt.get(u)) && (a = j({}, e), Yf(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), kl(n), at(n, "link", a), l.head.appendChild(n), t.instance = n);
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
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(l, u.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Bf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Yf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var vi = null;
  function am(l, t, e) {
    if (vi === null) {
      var a = /* @__PURE__ */ new Map(), n = vi = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = vi, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[dn] || u[Pl] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function nm(l, t, e) {
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
        var n = Pa(a.href), u = t.querySelector(
          Wn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = hi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, kl(u);
          return;
        }
        u = t.ownerDocument || t, a = tm(a), (n = Qt.get(n)) && Bf(a, n), u = u.createElement("link"), kl(u);
        var i = u;
        i._p = new Promise(function(f, o) {
          i.onload = f, i.onerror = o;
        }), at(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = hi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Gf = 0;
  function v0(l, t) {
    return l.stylesheets && l.count === 0 && gi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && gi(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Gf === 0 && (Gf = 62500 * $h());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && gi(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > Gf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
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
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = hi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var kn = {
    $$typeof: pl,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function y0(l, t, e, a, n, u, i, f, o) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ui(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.hiddenUpdates = Ui(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function im(l, t, e, a, n, u, i, f, o, S, T, O) {
    return l = new y0(
      l,
      t,
      e,
      i,
      o,
      S,
      T,
      O,
      f
    ), t = 1, u === !0 && (t |= 24), u = At(3, null, null, t), l.current = u, u.stateNode = l, t = gc(), t.refCount++, l.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, _c(u), l;
  }
  function cm(l) {
    return l ? (l = ja, l) : ja;
  }
  function fm(l, t, e, a, n, u) {
    n = cm(n), a.context === null ? a.context = n : a.pendingContext = n, a = xe(t), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = Me(l, a, t), e !== null && (bt(e, l, t), xn(e, l, t));
  }
  function sm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Xf(l, t) {
    sm(l, t), (l = l.alternate) && sm(l, t);
  }
  function om(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = aa(l, 67108864);
      t !== null && bt(t, l, 67108864), Xf(l, 67108864);
    }
  }
  function rm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mt();
      t = Ci(t);
      var e = aa(l, t);
      e !== null && bt(e, l, t), Xf(l, t);
    }
  }
  var Si = !0;
  function g0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = q.p;
    try {
      q.p = 2, Qf(l, t, e, a);
    } finally {
      q.p = u, E.T = n;
    }
  }
  function S0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = q.p;
    try {
      q.p = 8, Qf(l, t, e, a);
    } finally {
      q.p = u, E.T = n;
    }
  }
  function Qf(l, t, e, a) {
    if (Si) {
      var n = Vf(a);
      if (n === null)
        Of(
          l,
          t,
          a,
          bi,
          e
        ), mm(l, a);
      else if (p0(
        n,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (mm(l, a), t & 4 && -1 < b0.indexOf(l)) {
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
                      var o = 1 << 31 - Tt(i);
                      f.entanglements[1] |= o, i &= ~o;
                    }
                    $t(u), (yl & 6) === 0 && (ti = Ml() + 500, Kn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = aa(u, 2), f !== null && bt(f, u, 2), ai(), Xf(u, 2);
            }
          if (u = Vf(a), u === null && Of(
            l,
            t,
            a,
            bi,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Of(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Vf(l) {
    return l = Li(l), Lf(l);
  }
  var bi = null;
  function Lf(l) {
    if (bi = null, l = ba(l), l !== null) {
      var t = R(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = x(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = B(t), l !== null) return l;
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
  function dm(l) {
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
  var Zf = !1, Qe = null, Ve = null, Le = null, In = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Ze = [], b0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mm(l, t) {
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
    }, t !== null && (t = pa(t), t !== null && om(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function p0(l, t, e, a, n) {
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
  function vm(l) {
    var t = ba(l.target);
    if (t !== null) {
      var e = R(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = x(e), t !== null) {
            l.blockedOn = t, Os(l.priority, function() {
              rm(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = B(e), t !== null) {
            l.blockedOn = t, Os(l.priority, function() {
              rm(e);
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
      var e = Vf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Vi = a, e.target.dispatchEvent(a), Vi = null;
      } else
        return t = pa(e), t !== null && om(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function hm(l, t, e) {
    pi(l) && e.delete(t);
  }
  function _0() {
    Zf = !1, Qe !== null && pi(Qe) && (Qe = null), Ve !== null && pi(Ve) && (Ve = null), Le !== null && pi(Le) && (Le = null), In.forEach(hm), Pn.forEach(hm);
  }
  function _i(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Zf || (Zf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      _0
    )));
  }
  var Ei = null;
  function ym(l) {
    Ei !== l && (Ei = l, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ei === l && (Ei = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], n = l[t + 2];
          if (typeof a != "function") {
            if (Lf(a || e) === null)
              continue;
            break;
          }
          var u = pa(e);
          u !== null && (l.splice(t, 3), t -= 3, Qc(
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
    function t(o) {
      return _i(o, l);
    }
    Qe !== null && _i(Qe, l), Ve !== null && _i(Ve, l), Le !== null && _i(Le, l), In.forEach(t), Pn.forEach(t);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      vm(e), e.blockedOn === null && Ze.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[mt] || null;
        if (typeof u == "function")
          i || ym(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[mt] || null)
              f = i.formAction;
            else if (Lf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), ym(e);
        }
      }
  }
  function gm() {
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
  function Kf(l) {
    this._internalRoot = l;
  }
  Ti.prototype.render = Kf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = Mt();
    fm(e, a, l, t, null, null);
  }, Ti.prototype.unmount = Kf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      fm(l.current, 2, null, l, null, null), ai(), t[Sa] = null;
    }
  };
  function Ti(l) {
    this._internalRoot = l;
  }
  Ti.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Ns();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ze.length && t !== 0 && t < Ze[e].priority; e++) ;
      Ze.splice(e, 0, l), e === 0 && vm(l);
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
  q.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = _(t), l = l !== null ? U(l) : null, l = l === null ? null : l.stateNode, l;
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
        kt = zi.inject(
          E0
        ), Et = zi;
      } catch {
      }
  }
  return eu.createRoot = function(l, t) {
    if (!M(l)) throw Error(s(299));
    var e = !1, a = "", n = Ar, u = Nr, i = Or;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = im(
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
      gm
    ), l[Sa] = t.current, Nf(l), new Kf(t);
  }, eu.hydrateRoot = function(l, t, e) {
    if (!M(l)) throw Error(s(299));
    var a = !1, n = "", u = Ar, i = Nr, f = Or, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), t = im(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      n,
      o,
      u,
      i,
      f,
      gm
    ), t.context = cm(null), e = t.current, a = Mt(), a = Ci(a), n = xe(a), n.callback = null, Me(e, n, a), e = a, t.current.lanes = e, rn(t, e), $t(t), l[Sa] = t.current, Nf(l), new Ti(t);
  }, eu.version = "19.2.6", eu;
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
var xm;
function H0() {
  if (xm) return Pf;
  xm = 1;
  var c = ji();
  function g(j, N) {
    return j === N && (j !== 0 || 1 / j === 1 / N) || j !== j && N !== N;
  }
  var v = typeof Object.is == "function" ? Object.is : g, s = c.useState, M = c.useEffect, R = c.useLayoutEffect, x = c.useDebugValue;
  function B(j, N) {
    var C = N(), Q = s({ inst: { value: C, getSnapshot: N } }), w = Q[0].inst, I = Q[1];
    return R(
      function() {
        w.value = C, w.getSnapshot = N, D(w) && I({ inst: w });
      },
      [j, C, N]
    ), M(
      function() {
        return D(w) && I({ inst: w }), j(function() {
          D(w) && I({ inst: w });
        });
      },
      [j]
    ), x(C), C;
  }
  function D(j) {
    var N = j.getSnapshot;
    j = j.value;
    try {
      var C = N();
      return !v(j, C);
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
var Mm;
function q0() {
  return Mm || (Mm = 1, If.exports = H0()), If.exports;
}
var jm = q0();
const Lm = 0, Zm = 1, Km = 2, Rm = 3;
var Um = Object.prototype.hasOwnProperty;
function is(c, g) {
  var v, s;
  if (c === g) return !0;
  if (c && g && (v = c.constructor) === g.constructor) {
    if (v === Date) return c.getTime() === g.getTime();
    if (v === RegExp) return c.toString() === g.toString();
    if (v === Array) {
      if ((s = c.length) === g.length)
        for (; s-- && is(c[s], g[s]); ) ;
      return s === -1;
    }
    if (!v || typeof c == "object") {
      s = 0;
      for (v in c)
        if (Um.call(c, v) && ++s && !Um.call(g, v) || !(v in g) || !is(c[v], g[v])) return !1;
      return Object.keys(g).length === s;
    }
  }
  return c !== c && g !== g;
}
const ge = /* @__PURE__ */ new WeakMap(), Se = () => {
}, ut = (
  /*#__NOINLINE__*/
  Se()
), cs = Object, cl = (c) => c === ut, Wt = (c) => typeof c == "function", $e = (c, g) => ({
  ...c,
  ...g
}), Jm = (c) => Wt(c.then), ls = {}, Ai = {}, ys = "undefined", uu = typeof window != ys, fs = typeof document != ys, B0 = uu && "Deno" in window, Y0 = () => uu && typeof window.requestAnimationFrame != ys, wm = (c, g) => {
  const v = ge.get(c);
  return [
    // Getter
    () => !cl(g) && c.get(g) || ls,
    // Setter
    (s) => {
      if (!cl(g)) {
        const M = c.get(g);
        g in Ai || (Ai[g] = M), v[5](g, $e(M, s), M || ls);
      }
    },
    // Subscriber
    v[6],
    // Get server cache snapshot
    () => !cl(g) && g in Ai ? Ai[g] : !cl(g) && c.get(g) || ls
  ];
};
let ss = !0;
const G0 = () => ss, [os, rs] = uu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], X0 = () => {
  const c = fs && document.visibilityState;
  return cl(c) || c !== "hidden";
}, Q0 = (c) => (fs && document.addEventListener("visibilitychange", c), os("focus", c), () => {
  fs && document.removeEventListener("visibilitychange", c), rs("focus", c);
}), V0 = (c) => {
  const g = () => {
    ss = !0, c();
  }, v = () => {
    ss = !1;
  };
  return os("online", g), os("offline", v), () => {
    rs("online", g), rs("offline", v);
  };
}, L0 = {
  isOnline: G0,
  isVisible: X0
}, Z0 = {
  initFocus: Q0,
  initReconnect: V0
}, Cm = !hs.useId, an = !uu || B0, K0 = (c) => Y0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), ts = an ? J.useEffect : J.useLayoutEffect, es = typeof navigator < "u" && navigator.connection, Hm = !an && es && ([
  "slow-2g",
  "2g"
].includes(es.effectiveType) || es.saveData), Ni = /* @__PURE__ */ new WeakMap(), J0 = (c) => cs.prototype.toString.call(c), as = (c, g) => c === `[object ${g}]`;
let w0 = 0;
const ds = (c) => {
  const g = typeof c, v = J0(c), s = as(v, "Date"), M = as(v, "RegExp"), R = as(v, "Object");
  let x, B;
  if (cs(c) === c && !s && !M) {
    if (x = Ni.get(c), x) return x;
    if (x = ++w0 + "~", Ni.set(c, x), Array.isArray(c)) {
      for (x = "@", B = 0; B < c.length; B++)
        x += ds(c[B]) + ",";
      Ni.set(c, x);
    }
    if (R) {
      x = "#";
      const D = cs.keys(c).sort();
      for (; !cl(B = D.pop()); )
        cl(c[B]) || (x += B + ":" + ds(c[B]) + ",");
      Ni.set(c, x);
    }
  } else
    x = s ? c.toJSON() : g == "symbol" ? c.toString() : g == "string" ? JSON.stringify(c) : "" + c;
  return x;
}, gs = (c) => {
  if (Wt(c))
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
  const [g, v, s, M] = c, R = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof M == "boolean" ? {
    revalidate: M
  } : M || {});
  let x = R.populateCache;
  const B = R.rollbackOnError;
  let D = R.optimisticData;
  const _ = (N) => typeof B == "function" ? B(N) : B !== !1, U = R.throwOnError;
  if (Wt(v)) {
    const N = v, C = [], Q = g.keys();
    for (const w of Q)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(w) && N(g.get(w)._k) && C.push(w);
    return Promise.all(C.map(j));
  }
  return j(v);
  async function j(N) {
    const [C] = gs(N);
    if (!C) return;
    const [Q, w] = wm(g, C), [I, fl, L, pl] = ge.get(g), Nl = () => {
      const Xl = I[C];
      return (Wt(R.revalidate) ? R.revalidate(Q().data, N) : R.revalidate !== !1) && (delete L[C], delete pl[C], Xl && Xl[0]) ? Xl[0](Km).then(() => Q().data) : Q().data;
    };
    if (c.length < 3)
      return Nl();
    let gl = s, dl, $ = !1;
    const Hl = ms();
    fl[C] = [
      Hl,
      0
    ];
    const sl = !cl(D), it = Q(), W = it.data, Ol = it._c, ct = cl(Ol) ? W : Ol;
    if (sl && (D = Wt(D) ? D(ct, W) : D, w({
      data: D,
      _c: ct
    })), Wt(gl))
      try {
        gl = gl(ct);
      } catch (Xl) {
        dl = Xl, $ = !0;
      }
    if (gl && Jm(gl))
      if (gl = await gl.catch((Xl) => {
        dl = Xl, $ = !0;
      }), Hl !== fl[C][0]) {
        if ($) throw dl;
        return gl;
      } else $ && sl && _(dl) && (x = !0, w({
        data: ct,
        _c: ut
      }));
    if (x && !$)
      if (Wt(x)) {
        const Xl = x(gl, ct);
        w({
          data: Xl,
          error: ut,
          _c: ut
        });
      } else
        w({
          data: gl,
          error: ut,
          _c: ut
        });
    if (fl[C][1] = ms(), Promise.resolve(Nl()).then(() => {
      w({
        _c: ut
      });
    }), $) {
      if (U) throw dl;
      return;
    }
    return gl;
  }
}
const qm = (c, g) => {
  for (const v in c)
    c[v][0] && c[v][0](g);
}, W0 = (c, g) => {
  if (!ge.has(c)) {
    const v = $e(Z0, g), s = /* @__PURE__ */ Object.create(null), M = $m.bind(ut, c);
    let R = Se;
    const x = /* @__PURE__ */ Object.create(null), B = (U, j) => {
      const N = x[U] || [];
      return x[U] = N, N.push(j), () => N.splice(N.indexOf(j), 1);
    }, D = (U, j, N) => {
      c.set(U, j);
      const C = x[U];
      if (C)
        for (const Q of C)
          Q(j, N);
    }, _ = () => {
      if (!ge.has(c) && (ge.set(c, [
        s,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        M,
        D,
        B
      ]), !an)) {
        const U = v.initFocus(setTimeout.bind(ut, qm.bind(ut, s, Lm))), j = v.initReconnect(setTimeout.bind(ut, qm.bind(ut, s, Zm)));
        R = () => {
          U && U(), j && j(), ge.delete(c);
        };
      }
    };
    return _(), [
      c,
      M,
      _,
      R
    ];
  }
  return [
    c,
    ge.get(c)[4]
  ];
}, F0 = (c, g, v, s, M) => {
  const R = v.errorRetryCount, x = M.retryCount, B = ~~((Math.random() + 0.5) * (1 << (x < 8 ? x : 8))) * v.errorRetryInterval;
  !cl(R) && x > R || setTimeout(s, B, M);
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
), ly = (c, g) => {
  const v = $e(c, g);
  if (g) {
    const { use: s, fallback: M } = c, { use: R, fallback: x } = g;
    s && R && (v.use = s.concat(R)), M && x && (v.fallback = $e(M, x));
  }
  return v;
}, ty = J.createContext({}), ey = "$inf$", Fm = uu && window.__SWR_DEVTOOLS_USE__, ay = Fm ? window.__SWR_DEVTOOLS_USE__ : [], ny = () => {
  Fm && (window.__SWR_DEVTOOLS_REACT__ = hs);
}, uy = (c) => Wt(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], iy = () => {
  const c = J.useContext(ty);
  return J.useMemo(() => $e(P0, c), [
    c
  ]);
}, cy = (c) => (g, v, s) => c(g, v && ((...R) => {
  const [x] = gs(g), [, , , B] = ge.get(Wm);
  if (x.startsWith(ey))
    return v(...R);
  const D = B[x];
  return cl(D) ? v(...R) : (delete B[x], D);
}), s), fy = ay.concat(cy), sy = (c) => function(...v) {
  const s = iy(), [M, R, x] = uy(v), B = ly(s, x);
  let D = c;
  const { use: _ } = B, U = (_ || []).concat(fy);
  for (let j = U.length; j--; )
    D = U[j](D);
  return D(M, R || B.fetcher || null, B);
}, oy = (c, g, v) => {
  const s = g[c] || (g[c] = []);
  return s.push(v), () => {
    const M = s.indexOf(v);
    M >= 0 && (s[M] = s[s.length - 1], s.pop());
  };
};
ny();
const ns = hs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), us = {
  dedupe: !0
}, Bm = Promise.resolve(ut), ry = () => Se, dy = (c, g, v) => {
  const { cache: s, compare: M, suspense: R, fallbackData: x, revalidateOnMount: B, revalidateIfStale: D, refreshInterval: _, refreshWhenHidden: U, refreshWhenOffline: j, keepPreviousData: N, strictServerPrefetchWarning: C } = v, [Q, w, I, fl] = ge.get(s), [L, pl] = gs(c), Nl = J.useRef(!1), gl = J.useRef(!1), dl = J.useRef(L), $ = J.useRef(g), Hl = J.useRef(v), sl = () => Hl.current, it = () => sl().isVisible() && sl().isOnline(), [W, Ol, ct, Xl] = wm(s, L), Fl = J.useRef({}).current, E = cl(x) ? cl(v.fallback) ? ut : v.fallback[L] : x, q = (_l, Ul) => {
    for (const Dl in Fl) {
      const xl = Dl;
      if (xl === "data") {
        if (!M(_l[xl], Ul[xl]) && (!cl(_l[xl]) || !M(P, Ul[xl])))
          return !1;
      } else if (Ul[xl] !== _l[xl])
        return !1;
    }
    return !0;
  }, Z = !Nl.current, hl = J.useMemo(() => {
    const _l = W(), Ul = Xl(), Dl = (Vl) => {
      const Ml = $e(Vl);
      return delete Ml._k, (() => {
        if (!L || !g || sl().isPaused()) return !1;
        if (Z && !cl(B)) return B;
        const pe = cl(E) ? Ml.data : E;
        return cl(pe) || D;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ml
      } : Ml;
    }, xl = Dl(_l), ot = _l === Ul ? xl : Dl(Ul);
    let rt = xl;
    return [
      () => {
        const Vl = Dl(W());
        return q(Vl, rt) ? (rt.data = Vl.data, rt.isLoading = Vl.isLoading, rt.isValidating = Vl.isValidating, rt.error = Vl.error, rt) : (rt = Vl, Vl);
      },
      () => ot
    ];
  }, [
    s,
    L
  ]), rl = jm.useSyncExternalStore(J.useCallback(
    (_l) => ct(L, (Ul, Dl) => {
      q(Dl, Ul) || _l();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      L
    ]
  ), hl[0], hl[1]), m = Q[L] && Q[L].length > 0, A = rl.data, H = cl(A) ? E && Jm(E) ? ns(E) : E : A, Y = rl.error, F = J.useRef(H), P = N ? cl(A) ? cl(F.current) ? H : F.current : A : H, el = L && cl(H), Ql = J.useRef(null);
  !an && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  jm.useSyncExternalStore(ry, () => (Ql.current = !1, Ql), () => (Ql.current = !0, Ql));
  const ql = Ql.current;
  C && ql && !R && el && console.warn(`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !L || !g || sl().isPaused() || m && !cl(Y) ? !1 : Z && !cl(B) ? B : R ? cl(H) ? !1 : D : cl(H) || D, We = Z && be, cn = cl(rl.isValidating) ? We : rl.isValidating, cu = cl(rl.isLoading) ? We : rl.isLoading, _t = J.useCallback(
    async (_l) => {
      const Ul = $.current;
      if (!L || !Ul || gl.current || sl().isPaused())
        return !1;
      let Dl, xl, ot = !0;
      const rt = _l || {}, Vl = !I[L] || !rt.dedupe, Ml = () => Cm ? !gl.current && L === dl.current && Nl.current : L === dl.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, pe = () => {
        Ol(Fe);
      }, fn = () => {
        const dt = I[L];
        dt && dt[1] === xl && delete I[L];
      }, ke = {
        isValidating: !0
      };
      cl(W().data) && (ke.isLoading = !0);
      try {
        if (Vl && (Ol(ke), v.loadingTimeout && cl(W().data) && setTimeout(() => {
          ot && Ml() && sl().onLoadingSlow(L, v);
        }, v.loadingTimeout), I[L] = [
          Ul(pl),
          ms()
        ]), [Dl, xl] = I[L], Dl = await Dl, Vl && setTimeout(fn, v.dedupingInterval), !I[L] || I[L][1] !== xl)
          return Vl && Ml() && sl().onDiscarded(L), !1;
        Fe.error = ut;
        const dt = w[L];
        if (!cl(dt) && // case 1
        (xl <= dt[0] || // case 2
        xl <= dt[1] || // case 3
        dt[1] === 0))
          return pe(), Vl && Ml() && sl().onDiscarded(L), !1;
        const jt = W().data;
        Fe.data = M(jt, Dl) ? jt : Dl, Vl && Ml() && sl().onSuccess(Dl, L, v);
      } catch (dt) {
        fn();
        const jt = sl(), { shouldRetryOnError: sn } = jt;
        jt.isPaused() || (Fe.error = dt, Vl && Ml() && (jt.onError(dt, L, jt), (sn === !0 || Wt(sn) && sn(dt)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || it()) && jt.onErrorRetry(dt, L, jt, (Ri) => {
          const kt = Q[L];
          kt && kt[0] && kt[0](Rm, Ri);
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
  ), ga = J.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (..._l) => $m(s, dl.current, ..._l),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ts(() => {
    $.current = g, Hl.current = v, cl(A) || (F.current = A);
  }), ts(() => {
    if (!L) return;
    const _l = _t.bind(ut, us);
    let Ul = 0;
    sl().revalidateOnFocus && (Ul = Date.now() + sl().focusThrottleInterval);
    const xl = oy(L, Q, (ot, rt = {}) => {
      if (ot == Lm) {
        const Vl = Date.now();
        sl().revalidateOnFocus && Vl > Ul && it() && (Ul = Vl + sl().focusThrottleInterval, _l());
      } else if (ot == Zm)
        sl().revalidateOnReconnect && it() && _l();
      else {
        if (ot == Km)
          return _t();
        if (ot == Rm)
          return _t(rt);
      }
    });
    return gl.current = !1, dl.current = L, Nl.current = !0, Ol({
      _k: pl
    }), be && (I[L] || (cl(H) || an ? _l() : K0(_l))), () => {
      gl.current = !0, xl();
    };
  }, [
    L
  ]), ts(() => {
    let _l;
    function Ul() {
      const xl = Wt(_) ? _(W().data) : _;
      xl && _l !== -1 && (_l = setTimeout(Dl, xl));
    }
    function Dl() {
      !W().error && (U || sl().isVisible()) && (j || sl().isOnline()) ? _t(us).then(Ul) : Ul();
    }
    return Ul(), () => {
      _l && (clearTimeout(_l), _l = -1);
    };
  }, [
    _,
    U,
    j,
    L
  ]), J.useDebugValue(P), R) {
    if (!Cm && an && el)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    el && ($.current = g, Hl.current = v, gl.current = !1);
    const _l = fl[L], Ul = !cl(_l) && el ? ga(_l) : Bm;
    if (ns(Ul), !cl(Y) && el)
      throw Y;
    const Dl = el ? _t(us) : Bm;
    !cl(P) && el && (Dl.status = "fulfilled", Dl.value = !0), ns(Dl);
  }
  return {
    mutate: ga,
    get data() {
      return Fl.data = !0, P;
    },
    get error() {
      return Fl.error = !0, Y;
    },
    get isValidating() {
      return Fl.isValidating = !0, cn;
    },
    get isLoading() {
      return Fl.isLoading = !0, cu;
    }
  };
}, Di = sy(dy), km = "/api/v1/extensions/nexus.video.ltx23";
async function ye(c, g) {
  const v = await fetch(`${km}${c}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
  });
  if (!v.ok) {
    const s = await v.text();
    throw new Error(`${v.status} ${v.statusText}: ${s}`);
  }
  return await v.json();
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
  retrySegment: (c, g) => ye(`/renders/${c}/retry-segment`, {
    method: "POST",
    body: JSON.stringify({ segment_index: g })
  })
};
function my(c) {
  return `${km}/artifacts/${c}`;
}
const vy = "/api/v1", Ym = "nexus.video.ltx23";
async function Gm(c, g) {
  const v = await fetch(`${vy}${c}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
  });
  if (!v.ok) {
    const M = await v.text();
    throw new Error(`${v.status}: ${M}`);
  }
  return (await v.json()).data;
}
const Xm = {
  listDependencies: () => Gm(`/extensions/${Ym}/dependencies`),
  startInstall: (c = !1) => Gm(
    `/extensions/${Ym}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Qm = {
  status: (c) => ye(`/profiles/${c}/install`),
  start: (c) => ye(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var hy = "_1vmg9ib0", nn = "_1vmg9ib1", au = "_1vmg9ib2", yy = "_1vmg9ib3", st = "_1vmg9ib4", pt = "_1vmg9ib5", Ft = "_1vmg9ib6", Im = "_1vmg9ib7 _1vmg9ib6", Vm = "_1vmg9ib8 _1vmg9ib6", xi = "_1vmg9ib9", Ss = "_1vmg9iba", bs = "_1vmg9ibb _1vmg9iba", gy = "_1vmg9ibc _1vmg9iba", Oi = "_1vmg9ibd _1vmg9iba", iu = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", Pm = "_1vmg9ibj _1vmg9ibi", lv = "_1vmg9ibk _1vmg9ibi", tv = "_1vmg9ibl _1vmg9ibi", ev = "_1vmg9ibm _1vmg9ibi", nu = "_1vmg9ibn", un = "_1vmg9ibo", Sy = "_1vmg9ibp", by = "_1vmg9ibq", vs = "_1vmg9ibs _1vmg9ibr", av = "_1vmg9ibt _1vmg9ibr", nv = "_1vmg9ibu _1vmg9ibr", uv = "_1vmg9ibv _1vmg9ibr", py = "_1vmg9ibw", _y = "_1vmg9ibx", Ey = "_1vmg9iby", Ty = "_1vmg9ibz", zy = "_1vmg9ib10 _1vmg9iba", Bl = "_1vmg9ib11", Ay = "_1vmg9ib12", Ny = "_1vmg9ib13", Oy = "_1vmg9ib14", Dy = "_1vmg9ib15", xy = "_1vmg9ib16", ps = "_1vmg9ib17", _s = "_1vmg9ib18", My = "_1vmg9ib19";
const jy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Ry() {
  const [c, g] = J.useState(jy), [v, s] = J.useState(null), [M, R] = J.useState(null), [x, B] = J.useState(!1), [D, _] = J.useState(null), [U, j] = J.useState(null), [N, C] = J.useState(!1), [Q, w] = J.useState(!1), [I, fl] = J.useState(
    null
  ), [L, pl] = J.useState(null), { data: Nl } = Di(
    "ltx:runtime-profiles",
    () => en.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: gl, mutate: dl } = Di(
    D ? `ltx:renders:${D}` : null,
    () => D ? en.getRender(D) : Promise.resolve(null),
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
      const W = await en.plan(c);
      s(W);
    } catch (W) {
      R(W instanceof Error ? W.message : String(W)), s(null);
    } finally {
      B(!1);
    }
  }, [c]), Hl = J.useCallback(async () => {
    C(!0), j(null);
    try {
      const W = await en.createRender(c);
      _(W.id), dl();
    } catch (W) {
      j(W instanceof Error ? W.message : String(W));
    } finally {
      C(!1);
    }
  }, [c, dl]), sl = J.useCallback(async () => {
    if (!(!D || Q)) {
      w(!0), j(null);
      try {
        await en.cancel(D), dl();
      } catch (W) {
        j(
          `Cancel failed: ${W instanceof Error ? W.message : String(W)}`
        );
      } finally {
        w(!1);
      }
    }
  }, [D, Q, dl]), it = J.useCallback(
    async (W) => {
      if (!(!D || I !== null)) {
        fl(W), pl(null);
        try {
          await en.retrySegment(D, W), dl();
        } catch (Ol) {
          pl(
            `Retry of segment ${W + 1} failed: ${Ol instanceof Error ? Ol.message : String(Ol)}`
          );
        } finally {
          fl(null);
        }
      }
    },
    [D, I, dl]
  );
  return /* @__PURE__ */ d.jsxs("div", { className: hy, children: [
    /* @__PURE__ */ d.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ d.jsx(Uy, {}),
      /* @__PURE__ */ d.jsx(
        qy,
        {
          draft: c,
          onChange: g,
          profiles: Nl ?? [],
          onPlan: $,
          onSubmit: Hl,
          planning: x,
          submitting: N,
          plan: v,
          planError: M,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(
      Zy,
      {
        run: gl ?? null,
        onCancel: sl,
        cancelling: Q,
        onRetrySegment: it,
        retryingSegmentIndex: I,
        retryError: L
      }
    )
  ] });
}
function Uy() {
  const [c, g] = J.useState(!1), [v, s] = J.useState(null), { data: M, mutate: R } = Di(
    "host:dependencies",
    () => Xm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (N) => N.status === "running" || N.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), x = J.useCallback(
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
  if (!M) return null;
  const B = M.steps.find((U) => U.status === "failed"), D = M.all_satisfied, _ = M.steps.some(
    (U) => U.status === "running" || !D && U.status === "pending"
  );
  return /* @__PURE__ */ d.jsxs("section", { className: nn, children: [
    /* @__PURE__ */ d.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ d.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ d.jsx("span", { className: Cy(D, !!B, _), children: D ? "ready" : B ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: Dy, children: M.steps.map((U) => /* @__PURE__ */ d.jsxs("li", { className: xy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Hy(U.status) }),
      /* @__PURE__ */ d.jsx("span", { children: U.id }),
      /* @__PURE__ */ d.jsx("span", { className: Bl, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    B?.last_error ? /* @__PURE__ */ d.jsxs("div", { className: un, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        B.id,
        " failed"
      ] }),
      ": ",
      B.last_error.message
    ] }) : null,
    v ? /* @__PURE__ */ d.jsx("div", { className: un, children: v }) : null,
    !D || B ? /* @__PURE__ */ d.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          disabled: c || _,
          onClick: () => void x(!1),
          children: _ || c ? "Installing…" : "Install runtime"
        }
      ),
      B ? /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: bs,
          disabled: c || _,
          onClick: () => void x(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(c, g, v) {
  return g ? ev : c ? Pm : v ? lv : tv;
}
function Hy(c) {
  switch (c) {
    case "ok":
      return nv;
    case "running":
      return av;
    case "failed":
      return uv;
    default:
      return vs;
  }
}
function qy({
  draft: c,
  onChange: g,
  profiles: v,
  onPlan: s,
  onSubmit: M,
  planning: R,
  submitting: x,
  plan: B,
  planError: D,
  submitError: _
}) {
  const U = J.useCallback(
    (N, C) => g({ ...c, [N]: C }),
    [c, g]
  ), j = J.useCallback(
    (N) => {
      N.preventDefault(), !(x || c.prompt.trim().length === 0) && M();
    },
    [x, c.prompt, M]
  );
  return /* @__PURE__ */ d.jsxs("form", { className: nn, onSubmit: j, noValidate: !0, children: [
    /* @__PURE__ */ d.jsx("h2", { className: au, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ d.jsx("p", { className: yy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ d.jsxs("div", { className: st, children: [
      /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ d.jsx(
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
    /* @__PURE__ */ d.jsxs("div", { className: st, children: [
      /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: "ltx-neg",
          className: Ft,
          value: c.negative_prompt ?? "",
          onChange: (N) => U(
            "negative_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: st, children: [
      /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: "ltx-character",
          className: Ft,
          value: c.character_prompt ?? "",
          onChange: (N) => U(
            "character_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: Bl, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: st, children: [
      /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: "ltx-style",
          className: Ft,
          value: c.style_prompt ?? "",
          onChange: (N) => U(
            "style_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: Bl, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ d.jsx(Qy, { draft: c, update: U }),
    /* @__PURE__ */ d.jsxs("div", { className: xi, children: [
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "ltx-duration",
            className: Ft,
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
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "ltx-seed",
            className: Ft,
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
    /* @__PURE__ */ d.jsxs("div", { className: xi, children: [
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ d.jsxs(
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
              /* @__PURE__ */ d.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ d.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ d.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ d.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Vm,
            value: c.quality_preset,
            onChange: (N) => U("quality_preset", N.target.value),
            children: [
              /* @__PURE__ */ d.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ d.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ d.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ d.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(Xy, { profiles: v, selected: c.runtime_profile }),
    /* @__PURE__ */ d.jsx(By, { selected: c.runtime_profile }),
    /* @__PURE__ */ d.jsx(Vy, { draft: c, update: U }),
    /* @__PURE__ */ d.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: bs,
          onClick: s,
          disabled: R || x || c.prompt.trim().length === 0,
          children: R ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "submit",
          className: Ss,
          disabled: x || c.prompt.trim().length === 0,
          "aria-busy": x,
          children: x ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    D ? /* @__PURE__ */ d.jsx("div", { className: un, role: "alert", children: D }) : null,
    _ ? /* @__PURE__ */ d.jsx("div", { className: un, role: "alert", children: _ }) : null,
    B ? /* @__PURE__ */ d.jsx(Ly, { plan: B }) : null
  ] });
}
function By({
  selected: c
}) {
  const g = Gy(c), [v, s] = J.useState(!1), [M, R] = J.useState(null), { data: x, mutate: B } = Di(
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
  if (!g || !x) return null;
  if (x.installed)
    return /* @__PURE__ */ d.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Runtime installed" }),
      " · ",
      x.repo
    ] });
  const _ = x.in_flight || v, U = iv(x.phase), j = _ ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ d.jsxs("div", { className: nu, children: [
    /* @__PURE__ */ d.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    x.repo ?? "unknown repo",
    /* @__PURE__ */ d.jsxs("div", { className: Bl, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ d.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      x.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    x.last_error ? /* @__PURE__ */ d.jsxs("div", { className: Bl, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      x.last_error
    ] }) : null,
    M ? /* @__PURE__ */ d.jsx("div", { className: Bl, style: { marginTop: 4, color: "#e57373" }, children: M }) : null,
    /* @__PURE__ */ d.jsx("div", { className: iu, style: { marginTop: 8 }, children: /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: Ss,
        disabled: _,
        onClick: () => void D(),
        children: j
      }
    ) }),
    /* @__PURE__ */ d.jsx(
      Yy,
      {
        phase: x.phase,
        recentProgress: x.recent_progress
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
  const v = iv(c);
  return /* @__PURE__ */ d.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ d.jsxs("summary", { className: _s, children: [
      "Install progress",
      v ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
        " · ",
        v
      ] }) : null,
      g.length > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
        " · ",
        g.length,
        " lines"
      ] }) : null
    ] }),
    g.length === 0 ? /* @__PURE__ */ d.jsx("p", { className: Bl, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ d.jsx("pre", { className: My, children: g.join(`
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
  const v = g === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${g}`, s = c.find((R) => R.runtime_id === v);
  if (!s) return null;
  const M = s.healthy ? "ok" : "warn";
  return /* @__PURE__ */ d.jsxs("div", { className: nu, children: [
    /* @__PURE__ */ d.jsx("strong", { children: s.display_name }),
    ": ",
    s.status_message,
    s.experimental ? " (experimental)" : null
  ] });
}
function Qy({
  draft: c,
  update: g
}) {
  const v = c.scenes ?? [], s = J.useRef(0), [M, R] = J.useState(
    () => v.map(() => `scene-${s.current++}`)
  );
  if (M.length !== v.length) {
    const N = M.slice(0, v.length);
    for (; N.length < v.length; )
      N.push(`scene-${s.current++}`);
    R(N);
  }
  const x = J.useCallback(
    (N, C) => {
      g("scenes", N.length > 0 ? N : void 0), R(C);
    },
    [g]
  ), B = J.useCallback(() => {
    const N = v.length > 0 ? c.duration_seconds / (v.length + 1) : c.duration_seconds;
    x(
      [
        ...v,
        { prompt: "", duration_seconds: Math.max(1, Math.round(N)) }
      ],
      [...M, `scene-${s.current++}`]
    );
  }, [v, M, x, c.duration_seconds]), D = J.useCallback(
    (N, C) => {
      const Q = v.map((w, I) => {
        if (I !== N) return w;
        const fl = { ...w };
        return C.prompt !== void 0 && (fl.prompt = C.prompt ?? ""), C.duration_seconds !== void 0 && (C.duration_seconds === null ? delete fl.duration_seconds : fl.duration_seconds = C.duration_seconds), C.seed !== void 0 && (C.seed === null ? delete fl.seed : fl.seed = C.seed), fl;
      });
      x(Q, M);
    },
    [v, M, x]
  ), _ = J.useCallback(
    (N) => {
      x(
        v.filter((C, Q) => Q !== N),
        M.filter((C, Q) => Q !== N)
      );
    },
    [v, M, x]
  ), U = J.useCallback(
    (N, C) => {
      const Q = N + C;
      if (Q < 0 || Q >= v.length) return;
      const w = v[N], I = v[Q], fl = M[N], L = M[Q];
      if (w === void 0 || I === void 0 || fl === void 0 || L === void 0)
        return;
      const pl = [...v], Nl = [...M];
      pl[N] = I, pl[Q] = w, Nl[N] = L, Nl[Q] = fl, x(pl, Nl);
    },
    [v, M, x]
  ), j = v.reduce(
    (N, C) => N + (C.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ d.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ d.jsxs("summary", { className: _s, children: [
      "Scenes — ",
      v.length === 0 ? "none (single prompt)" : `${v.length} scenes`,
      j > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
        " · ",
        j.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx("p", { className: Bl, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    v.map((N, C) => {
      const Q = M[C] ?? `scene-fallback-${C}`, w = (I) => {
        if (I === "") return null;
        const fl = Number(I);
        return Number.isFinite(fl) ? fl : null;
      };
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: nn,
          style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
          children: [
            /* @__PURE__ */ d.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ d.jsxs("strong", { className: Bl, children: [
                    "Scene ",
                    C + 1
                  ] }),
                  /* @__PURE__ */ d.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ d.jsx(
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
                    /* @__PURE__ */ d.jsx(
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
                    /* @__PURE__ */ d.jsx(
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
            /* @__PURE__ */ d.jsxs("div", { className: st, children: [
              /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: `ltx-${Q}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ d.jsx(
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
            /* @__PURE__ */ d.jsxs("div", { className: xi, children: [
              /* @__PURE__ */ d.jsxs("div", { className: st, children: [
                /* @__PURE__ */ d.jsx(
                  "label",
                  {
                    className: pt,
                    htmlFor: `ltx-${Q}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-duration`,
                    className: Ft,
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
              /* @__PURE__ */ d.jsxs("div", { className: st, children: [
                /* @__PURE__ */ d.jsx(
                  "label",
                  {
                    className: pt,
                    htmlFor: `ltx-${Q}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-seed`,
                    className: Ft,
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
    /* @__PURE__ */ d.jsx("div", { className: iu, style: { marginTop: 10 }, children: /* @__PURE__ */ d.jsx(
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
  const v = c.advanced ?? {}, s = J.useCallback(
    (M, R) => {
      const x = { ...v };
      R == null ? delete x[M] : x[M] = R, g("advanced", Object.keys(x).length > 0 ? x : void 0);
    },
    [v, g]
  );
  return /* @__PURE__ */ d.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ d.jsxs("summary", { className: _s, children: [
      "Advanced — guidance, steps & offload",
      v.guidance_scale !== void 0 ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
        " · cfg ",
        v.guidance_scale
      ] }) : null,
      v.num_inference_steps !== void 0 ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
        " · ",
        v.num_inference_steps,
        " steps"
      ] }) : null,
      v.offload_mode && v.offload_mode !== "auto" ? /* @__PURE__ */ d.jsx("span", { className: Bl, children: ` · offload ${v.offload_mode}` }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: xi, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: Ft,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: v.guidance_scale ?? "",
            onChange: (M) => {
              const R = M.target.value;
              s(
                "guidance_scale",
                R === "" ? void 0 : Number(R)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: Bl, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "ltx-steps",
            className: Ft,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: v.num_inference_steps ?? "",
            onChange: (M) => {
              const R = M.target.value;
              s(
                "num_inference_steps",
                R === "" ? void 0 : Math.round(Number(R))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: Bl, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: st, children: [
        /* @__PURE__ */ d.jsx("label", { className: pt, htmlFor: "ltx-offload-mode", children: "Offload strategy" }),
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            id: "ltx-offload-mode",
            className: Ft,
            value: v.offload_mode ?? "auto",
            onChange: (M) => {
              const R = M.target.value;
              s("offload_mode", R === "auto" ? void 0 : R);
            },
            children: [
              /* @__PURE__ */ d.jsx("option", { value: "auto", children: "Auto (profile default)" }),
              /* @__PURE__ */ d.jsx("option", { value: "none", children: "None — full GPU resident (needs 16 GB+)" }),
              /* @__PURE__ */ d.jsx("option", { value: "model", children: "Model — mid-grained offload (balanced)" }),
              /* @__PURE__ */ d.jsx("option", { value: "sequential", children: "Sequential — per-layer offload (lowest VRAM)" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: Bl, children: "NVFP4 defaults to None; FP8 profiles default to Sequential. Pick None on a 16 GB+ card for the fastest inference." })
      ] })
    ] })
  ] });
}
function Ly({ plan: c }) {
  const g = c.vram_risk === "safe" ? Pm : c.vram_risk === "moderate" ? lv : c.vram_risk === "risky" ? tv : ev;
  return /* @__PURE__ */ d.jsxs("div", { className: nn, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ d.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ d.jsx("span", { className: ya, children: c.mode })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ d.jsx("span", { className: ya, children: c.segment_count })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ d.jsxs("span", { className: ya, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ d.jsxs("span", { className: ya, children: [
        c.base_fps,
        " → ",
        c.output_fps,
        " (",
        c.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ d.jsxs("span", { className: ya, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ d.jsxs("span", { className: ya, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ d.jsx("span", { className: g, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ d.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ d.jsx("span", { className: ya, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((v) => /* @__PURE__ */ d.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ d.jsx("strong", { children: v.code }),
      ": ",
      v.message
    ] }, v.code)) }) : null
  ] });
}
function Zy({
  run: c,
  onCancel: g,
  cancelling: v,
  onRetrySegment: s,
  retryingSegmentIndex: M,
  retryError: R
}) {
  if (!c)
    return /* @__PURE__ */ d.jsxs("section", { className: nn, children: [
      /* @__PURE__ */ d.jsx("h2", { className: au, children: "Output" }),
      /* @__PURE__ */ d.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const x = c.status === "completed" || c.status === "failed" || c.status === "cancelled", B = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ d.jsxs("section", { className: nn, children: [
    /* @__PURE__ */ d.jsxs("h2", { className: au, children: [
      "Render ",
      Iy(c.id)
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: Bl, children: [
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
    /* @__PURE__ */ d.jsx(Ky, { run: c }),
    c.error_code ? /* @__PURE__ */ d.jsxs("div", { className: un, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ d.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    R ? /* @__PURE__ */ d.jsx("div", { className: un, role: "alert", "aria-live": "polite", children: R }) : null,
    /* @__PURE__ */ d.jsx(
      Jy,
      {
        segments: c.segments,
        onRetry: B ? s : null,
        retryingSegmentIndex: M
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ d.jsx(ky, { artifactId: c.final_artifact_id }) : null,
    x ? null : /* @__PURE__ */ d.jsx("div", { className: iu, children: /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: gy,
        onClick: g,
        disabled: v,
        "aria-busy": v,
        children: v ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function Ky({ run: c }) {
  const g = wy(c), v = Wy(c);
  return /* @__PURE__ */ d.jsxs("div", { className: st, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            /* @__PURE__ */ d.jsx("strong", { children: c.status }),
            v,
            g ? /* @__PURE__ */ d.jsxs("span", { className: Bl, children: [
              " · ",
              g
            ] }) : null
          ] }),
          /* @__PURE__ */ d.jsxs("span", { children: [
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
    /* @__PURE__ */ d.jsx("div", { className: py, children: /* @__PURE__ */ d.jsx(
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
  retryingSegmentIndex: v
}) {
  return /* @__PURE__ */ d.jsx("div", { className: Sy, children: c.map((s) => {
    const M = v === s.index, R = g !== null && s.status === "failed";
    return /* @__PURE__ */ d.jsxs("div", { className: by, children: [
      /* @__PURE__ */ d.jsx("span", { className: Fy(s.status) }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "Segment ",
        s.index + 1,
        " · ",
        s.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: Bl, children: s.status }),
      R ? /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: Oi,
          onClick: () => g?.(s.index),
          disabled: v !== null,
          "aria-busy": M,
          "aria-label": `Retry segment ${s.index + 1}`,
          children: M ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, s.index);
  }) });
}
function wy(c) {
  if (c.status === "completed" || c.status === "failed" || c.status === "cancelled" || c.segment_count <= 0)
    return null;
  const g = c.segments.filter(
    (x) => x.status === "completed" && x.started_at && x.completed_at
  );
  if (g.length === 0)
    return null;
  const v = g.reduce((x, B) => {
    const D = Date.parse(B.started_at), _ = Date.parse(B.completed_at);
    return !Number.isFinite(D) || !Number.isFinite(_) || _ <= D ? x : x + (_ - D);
  }, 0);
  if (v === 0)
    return null;
  const s = v / g.length, M = c.segment_count - c.completed_segments;
  if (M <= 0)
    return null;
  const R = M * s;
  return `~${$y(R)} remaining`;
}
function $y(c) {
  const g = Math.round(c / 1e3);
  if (g < 60)
    return `${g}s`;
  const v = Math.floor(g / 60), s = g % 60;
  if (v < 60)
    return s === 0 ? `${v}m` : `${v}m ${s}s`;
  const M = Math.floor(v / 60), R = v % 60;
  return `${M}h ${R}m`;
}
function Wy(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const g = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, v = c.last_breach_reason?.trim(), s = v ? `VRAM supervisor breach: ${v}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ d.jsxs("span", { className: Bl, "aria-live": "polite", title: s, children: [
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
      return nv;
    case "failed":
      return uv;
    default:
      return vs;
  }
}
function ky({ artifactId: c }) {
  const g = my(c);
  return /* @__PURE__ */ d.jsxs("div", { className: Ey, children: [
    /* @__PURE__ */ d.jsx("video", { className: Ty, src: g, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ d.jsx(
      "a",
      {
        className: zy,
        href: g,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ d.jsxs("p", { className: Bl, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function Iy(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const Mi = "ltx23-video-app", Py = new URL("./ltx23-video.css", import.meta.url).href;
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
    const v = document.createElement("link");
    v.rel = "stylesheet", v.href = Py, g.appendChild(v);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ d.jsx(J.StrictMode, { children: /* @__PURE__ */ d.jsx(Ry, {}) })
    );
  }
}
customElements.get(Mi) || customElements.define(Mi, cv);
function l1() {
  customElements.get(Mi) || customElements.define(Mi, cv);
}
export {
  l1 as register
};
//# sourceMappingURL=ltx23-video.js.map
