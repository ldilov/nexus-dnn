function O0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Ff = { exports: {} }, tu = {};
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
  if (Em) return tu;
  Em = 1;
  var c = Symbol.for("react.transitional.element"), v = Symbol.for("react.fragment");
  function m(o, N, C) {
    var A = null;
    if (C !== void 0 && (A = "" + C), N.key !== void 0 && (A = "" + N.key), "key" in N) {
      C = {};
      for (var O in N)
        O !== "key" && (C[O] = N[O]);
    } else C = N;
    return N = C.ref, {
      $$typeof: c,
      type: o,
      key: A,
      ref: N !== void 0 ? N : null,
      props: C
    };
  }
  return tu.Fragment = v, tu.jsx = m, tu.jsxs = m, tu;
}
var Nm;
function M0() {
  return Nm || (Nm = 1, Ff.exports = D0()), Ff.exports;
}
var s = M0(), Wf = { exports: {} }, ll = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tm;
function R0() {
  if (Tm) return ll;
  Tm = 1;
  var c = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), A = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), R = Symbol.for("react.activity"), j = Symbol.iterator;
  function H(h) {
    return h === null || typeof h != "object" ? null : (h = j && h[j] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var X = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, F = Object.assign, P = {};
  function fl(h, D, q) {
    this.props = h, this.context = D, this.refs = P, this.updater = q || X;
  }
  fl.prototype.isReactComponent = {}, fl.prototype.setState = function(h, D) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, D, "setState");
  }, fl.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function V() {
  }
  V.prototype = fl.prototype;
  function xl(h, D, q) {
    this.props = h, this.context = D, this.refs = P, this.updater = q || X;
  }
  var J = xl.prototype = new V();
  J.constructor = xl, F(J, fl.prototype), J.isPureReactComponent = !0;
  var tl = Array.isArray;
  function il() {
  }
  var Z = { H: null, A: null, T: null, S: null }, El = Object.prototype.hasOwnProperty;
  function ul(h, D, q) {
    var G = q.ref;
    return {
      $$typeof: c,
      type: h,
      key: D,
      ref: G !== void 0 ? G : null,
      props: q
    };
  }
  function st(h, D) {
    return ul(h.type, D, h.props);
  }
  function W(h) {
    return typeof h == "object" && h !== null && h.$$typeof === c;
  }
  function Rl(h) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(q) {
      return D[q];
    });
  }
  var ot = /\/+/g;
  function Vl(h, D) {
    return typeof h == "object" && h !== null && h.key != null ? Rl("" + h.key) : D.toString(36);
  }
  function Pl(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(il, il) : (h.status = "pending", h.then(
          function(D) {
            h.status === "pending" && (h.status = "fulfilled", h.value = D);
          },
          function(D) {
            h.status === "pending" && (h.status = "rejected", h.reason = D);
          }
        )), h.status) {
          case "fulfilled":
            return h.value;
          case "rejected":
            throw h.reason;
        }
    }
    throw h;
  }
  function E(h, D, q, G, k) {
    var el = typeof h;
    (el === "undefined" || el === "boolean") && (h = null);
    var cl = !1;
    if (h === null) cl = !0;
    else
      switch (el) {
        case "bigint":
        case "string":
        case "number":
          cl = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case c:
            case v:
              cl = !0;
              break;
            case U:
              return cl = h._init, E(
                cl(h._payload),
                D,
                q,
                G,
                k
              );
          }
      }
    if (cl)
      return k = k(h), cl = G === "" ? "." + Vl(h, 0) : G, tl(k) ? (q = "", cl != null && (q = cl.replace(ot, "$&/") + "/"), E(k, D, q, "", function(be) {
        return be;
      })) : k != null && (W(k) && (k = st(
        k,
        q + (k.key == null || h && h.key === k.key ? "" : ("" + k.key).replace(
          ot,
          "$&/"
        ) + "/") + cl
      )), D.push(k)), 1;
    cl = 0;
    var Zl = G === "" ? "." : G + ":";
    if (tl(h))
      for (var Ql = 0; Ql < h.length; Ql++)
        G = h[Ql], el = Zl + Vl(G, Ql), cl += E(
          G,
          D,
          q,
          el,
          k
        );
    else if (Ql = H(h), typeof Ql == "function")
      for (h = Ql.call(h), Ql = 0; !(G = h.next()).done; )
        G = G.value, el = Zl + Vl(G, Ql++), cl += E(
          G,
          D,
          q,
          el,
          k
        );
    else if (el === "object") {
      if (typeof h.then == "function")
        return E(
          Pl(h),
          D,
          q,
          G,
          k
        );
      throw D = String(h), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return cl;
  }
  function B(h, D, q) {
    if (h == null) return h;
    var G = [], k = 0;
    return E(h, G, "", "", function(el) {
      return D.call(q, el, k++);
    }), G;
  }
  function w(h) {
    if (h._status === -1) {
      var D = h._result;
      D = D(), D.then(
        function(q) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = q);
        },
        function(q) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = q);
        }
      ), h._status === -1 && (h._status = 0, h._result = D);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var Sl = typeof reportError == "function" ? reportError : function(h) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
        error: h
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", h);
      return;
    }
    console.error(h);
  }, vl = {
    map: B,
    forEach: function(h, D, q) {
      B(
        h,
        function() {
          D.apply(this, arguments);
        },
        q
      );
    },
    count: function(h) {
      var D = 0;
      return B(h, function() {
        D++;
      }), D;
    },
    toArray: function(h) {
      return B(h, function(D) {
        return D;
      }) || [];
    },
    only: function(h) {
      if (!W(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  };
  return ll.Activity = R, ll.Children = vl, ll.Component = fl, ll.Fragment = m, ll.Profiler = N, ll.PureComponent = xl, ll.StrictMode = o, ll.Suspense = g, ll.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, ll.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return Z.H.useMemoCache(h);
    }
  }, ll.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, ll.cacheSignal = function() {
    return null;
  }, ll.cloneElement = function(h, D, q) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var G = F({}, h.props), k = h.key;
    if (D != null)
      for (el in D.key !== void 0 && (k = "" + D.key), D)
        !El.call(D, el) || el === "key" || el === "__self" || el === "__source" || el === "ref" && D.ref === void 0 || (G[el] = D[el]);
    var el = arguments.length - 2;
    if (el === 1) G.children = q;
    else if (1 < el) {
      for (var cl = Array(el), Zl = 0; Zl < el; Zl++)
        cl[Zl] = arguments[Zl + 2];
      G.children = cl;
    }
    return ul(h.type, k, G);
  }, ll.createContext = function(h) {
    return h = {
      $$typeof: A,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: C,
      _context: h
    }, h;
  }, ll.createElement = function(h, D, q) {
    var G, k = {}, el = null;
    if (D != null)
      for (G in D.key !== void 0 && (el = "" + D.key), D)
        El.call(D, G) && G !== "key" && G !== "__self" && G !== "__source" && (k[G] = D[G]);
    var cl = arguments.length - 2;
    if (cl === 1) k.children = q;
    else if (1 < cl) {
      for (var Zl = Array(cl), Ql = 0; Ql < cl; Ql++)
        Zl[Ql] = arguments[Ql + 2];
      k.children = Zl;
    }
    if (h && h.defaultProps)
      for (G in cl = h.defaultProps, cl)
        k[G] === void 0 && (k[G] = cl[G]);
    return ul(h, el, k);
  }, ll.createRef = function() {
    return { current: null };
  }, ll.forwardRef = function(h) {
    return { $$typeof: O, render: h };
  }, ll.isValidElement = W, ll.lazy = function(h) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: h },
      _init: w
    };
  }, ll.memo = function(h, D) {
    return {
      $$typeof: _,
      type: h,
      compare: D === void 0 ? null : D
    };
  }, ll.startTransition = function(h) {
    var D = Z.T, q = {};
    Z.T = q;
    try {
      var G = h(), k = Z.S;
      k !== null && k(q, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(il, Sl);
    } catch (el) {
      Sl(el);
    } finally {
      D !== null && q.types !== null && (D.types = q.types), Z.T = D;
    }
  }, ll.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, ll.use = function(h) {
    return Z.H.use(h);
  }, ll.useActionState = function(h, D, q) {
    return Z.H.useActionState(h, D, q);
  }, ll.useCallback = function(h, D) {
    return Z.H.useCallback(h, D);
  }, ll.useContext = function(h) {
    return Z.H.useContext(h);
  }, ll.useDebugValue = function() {
  }, ll.useDeferredValue = function(h, D) {
    return Z.H.useDeferredValue(h, D);
  }, ll.useEffect = function(h, D) {
    return Z.H.useEffect(h, D);
  }, ll.useEffectEvent = function(h) {
    return Z.H.useEffectEvent(h);
  }, ll.useId = function() {
    return Z.H.useId();
  }, ll.useImperativeHandle = function(h, D, q) {
    return Z.H.useImperativeHandle(h, D, q);
  }, ll.useInsertionEffect = function(h, D) {
    return Z.H.useInsertionEffect(h, D);
  }, ll.useLayoutEffect = function(h, D) {
    return Z.H.useLayoutEffect(h, D);
  }, ll.useMemo = function(h, D) {
    return Z.H.useMemo(h, D);
  }, ll.useOptimistic = function(h, D) {
    return Z.H.useOptimistic(h, D);
  }, ll.useReducer = function(h, D, q) {
    return Z.H.useReducer(h, D, q);
  }, ll.useRef = function(h) {
    return Z.H.useRef(h);
  }, ll.useState = function(h) {
    return Z.H.useState(h);
  }, ll.useSyncExternalStore = function(h, D, q) {
    return Z.H.useSyncExternalStore(
      h,
      D,
      q
    );
  }, ll.useTransition = function() {
    return Z.H.useTransition();
  }, ll.version = "19.2.6", ll;
}
var jm;
function Ri() {
  return jm || (jm = 1, Wf.exports = R0()), Wf.exports;
}
var Y = Ri();
const Ss = /* @__PURE__ */ O0(Y);
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
var zm;
function C0() {
  return zm || (zm = 1, (function(c) {
    function v(E, B) {
      var w = E.length;
      E.push(B);
      l: for (; 0 < w; ) {
        var Sl = w - 1 >>> 1, vl = E[Sl];
        if (0 < N(vl, B))
          E[Sl] = B, E[w] = vl, w = Sl;
        else break l;
      }
    }
    function m(E) {
      return E.length === 0 ? null : E[0];
    }
    function o(E) {
      if (E.length === 0) return null;
      var B = E[0], w = E.pop();
      if (w !== B) {
        E[0] = w;
        l: for (var Sl = 0, vl = E.length, h = vl >>> 1; Sl < h; ) {
          var D = 2 * (Sl + 1) - 1, q = E[D], G = D + 1, k = E[G];
          if (0 > N(q, w))
            G < vl && 0 > N(k, q) ? (E[Sl] = k, E[G] = w, Sl = G) : (E[Sl] = q, E[D] = w, Sl = D);
          else if (G < vl && 0 > N(k, w))
            E[Sl] = k, E[G] = w, Sl = G;
          else break l;
        }
      }
      return B;
    }
    function N(E, B) {
      var w = E.sortIndex - B.sortIndex;
      return w !== 0 ? w : E.id - B.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var C = performance;
      c.unstable_now = function() {
        return C.now();
      };
    } else {
      var A = Date, O = A.now();
      c.unstable_now = function() {
        return A.now() - O;
      };
    }
    var g = [], _ = [], U = 1, R = null, j = 3, H = !1, X = !1, F = !1, P = !1, fl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, xl = typeof setImmediate < "u" ? setImmediate : null;
    function J(E) {
      for (var B = m(_); B !== null; ) {
        if (B.callback === null) o(_);
        else if (B.startTime <= E)
          o(_), B.sortIndex = B.expirationTime, v(g, B);
        else break;
        B = m(_);
      }
    }
    function tl(E) {
      if (F = !1, J(E), !X)
        if (m(g) !== null)
          X = !0, il || (il = !0, Rl());
        else {
          var B = m(_);
          B !== null && Pl(tl, B.startTime - E);
        }
    }
    var il = !1, Z = -1, El = 5, ul = -1;
    function st() {
      return P ? !0 : !(c.unstable_now() - ul < El);
    }
    function W() {
      if (P = !1, il) {
        var E = c.unstable_now();
        ul = E;
        var B = !0;
        try {
          l: {
            X = !1, F && (F = !1, V(Z), Z = -1), H = !0;
            var w = j;
            try {
              t: {
                for (J(E), R = m(g); R !== null && !(R.expirationTime > E && st()); ) {
                  var Sl = R.callback;
                  if (typeof Sl == "function") {
                    R.callback = null, j = R.priorityLevel;
                    var vl = Sl(
                      R.expirationTime <= E
                    );
                    if (E = c.unstable_now(), typeof vl == "function") {
                      R.callback = vl, J(E), B = !0;
                      break t;
                    }
                    R === m(g) && o(g), J(E);
                  } else o(g);
                  R = m(g);
                }
                if (R !== null) B = !0;
                else {
                  var h = m(_);
                  h !== null && Pl(
                    tl,
                    h.startTime - E
                  ), B = !1;
                }
              }
              break l;
            } finally {
              R = null, j = w, H = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Rl() : il = !1;
        }
      }
    }
    var Rl;
    if (typeof xl == "function")
      Rl = function() {
        xl(W);
      };
    else if (typeof MessageChannel < "u") {
      var ot = new MessageChannel(), Vl = ot.port2;
      ot.port1.onmessage = W, Rl = function() {
        Vl.postMessage(null);
      };
    } else
      Rl = function() {
        fl(W, 0);
      };
    function Pl(E, B) {
      Z = fl(function() {
        E(c.unstable_now());
      }, B);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, c.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : El = 0 < E ? Math.floor(1e3 / E) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, c.unstable_next = function(E) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = j;
      }
      var w = j;
      j = B;
      try {
        return E();
      } finally {
        j = w;
      }
    }, c.unstable_requestPaint = function() {
      P = !0;
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
      var w = j;
      j = E;
      try {
        return B();
      } finally {
        j = w;
      }
    }, c.unstable_scheduleCallback = function(E, B, w) {
      var Sl = c.unstable_now();
      switch (typeof w == "object" && w !== null ? (w = w.delay, w = typeof w == "number" && 0 < w ? Sl + w : Sl) : w = Sl, E) {
        case 1:
          var vl = -1;
          break;
        case 2:
          vl = 250;
          break;
        case 5:
          vl = 1073741823;
          break;
        case 4:
          vl = 1e4;
          break;
        default:
          vl = 5e3;
      }
      return vl = w + vl, E = {
        id: U++,
        callback: B,
        priorityLevel: E,
        startTime: w,
        expirationTime: vl,
        sortIndex: -1
      }, w > Sl ? (E.sortIndex = w, v(_, E), m(g) === null && E === m(_) && (F ? (V(Z), Z = -1) : F = !0, Pl(tl, w - Sl))) : (E.sortIndex = vl, v(g, E), X || H || (X = !0, il || (il = !0, Rl()))), E;
    }, c.unstable_shouldYield = st, c.unstable_wrapCallback = function(E) {
      var B = j;
      return function() {
        var w = j;
        j = B;
        try {
          return E.apply(this, arguments);
        } finally {
          j = w;
        }
      };
    };
  })(Pf)), Pf;
}
var Am;
function U0() {
  return Am || (Am = 1, If.exports = C0()), If.exports;
}
var ls = { exports: {} }, ct = {};
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
  if (Om) return ct;
  Om = 1;
  var c = Ri();
  function v(g) {
    var _ = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        _ += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + g + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m() {
  }
  var o = {
    d: {
      f: m,
      r: function() {
        throw Error(v(522));
      },
      D: m,
      C: m,
      L: m,
      m,
      X: m,
      S: m,
      M: m
    },
    p: 0,
    findDOMNode: null
  }, N = Symbol.for("react.portal");
  function C(g, _, U) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: N,
      key: R == null ? null : "" + R,
      children: g,
      containerInfo: _,
      implementation: U
    };
  }
  var A = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function O(g, _) {
    if (g === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ct.createPortal = function(g, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(v(299));
    return C(g, _, null, U);
  }, ct.flushSync = function(g) {
    var _ = A.T, U = o.p;
    try {
      if (A.T = null, o.p = 2, g) return g();
    } finally {
      A.T = _, o.p = U, o.d.f();
    }
  }, ct.preconnect = function(g, _) {
    typeof g == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, o.d.C(g, _));
  }, ct.prefetchDNS = function(g) {
    typeof g == "string" && o.d.D(g);
  }, ct.preinit = function(g, _) {
    if (typeof g == "string" && _ && typeof _.as == "string") {
      var U = _.as, R = O(U, _.crossOrigin), j = typeof _.integrity == "string" ? _.integrity : void 0, H = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      U === "style" ? o.d.S(
        g,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: R,
          integrity: j,
          fetchPriority: H
        }
      ) : U === "script" && o.d.X(g, {
        crossOrigin: R,
        integrity: j,
        fetchPriority: H,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, ct.preinitModule = function(g, _) {
    if (typeof g == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var U = O(
            _.as,
            _.crossOrigin
          );
          o.d.M(g, {
            crossOrigin: U,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && o.d.M(g);
  }, ct.preload = function(g, _) {
    if (typeof g == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var U = _.as, R = O(U, _.crossOrigin);
      o.d.L(g, U, {
        crossOrigin: R,
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
  }, ct.preloadModule = function(g, _) {
    if (typeof g == "string")
      if (_) {
        var U = O(_.as, _.crossOrigin);
        o.d.m(g, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else o.d.m(g);
  }, ct.requestFormReset = function(g) {
    o.d.r(g);
  }, ct.unstable_batchedUpdates = function(g, _) {
    return g(_);
  }, ct.useFormState = function(g, _, U) {
    return A.H.useFormState(g, _, U);
  }, ct.useFormStatus = function() {
    return A.H.useHostTransitionStatus();
  }, ct.version = "19.2.6", ct;
}
var Dm;
function q0() {
  if (Dm) return ls.exports;
  Dm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (v) {
        console.error(v);
      }
  }
  return c(), ls.exports = H0(), ls.exports;
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
  var c = U0(), v = Ri(), m = q0();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function N(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function C(l) {
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
  function A(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function O(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(l) {
    if (C(l) !== l)
      throw Error(o(188));
  }
  function _(l) {
    var t = l.alternate;
    if (!t) {
      if (t = C(l), t === null) throw Error(o(188));
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
          if (u === e) return g(n), l;
          if (u === a) return g(n), t;
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
  var R = Object.assign, j = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), X = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), fl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), xl = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), tl = Symbol.for("react.suspense"), il = Symbol.for("react.suspense_list"), Z = Symbol.for("react.memo"), El = Symbol.for("react.lazy"), ul = Symbol.for("react.activity"), st = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function Rl(l) {
    return l === null || typeof l != "object" ? null : (l = W && l[W] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ot = Symbol.for("react.client.reference");
  function Vl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ot ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case F:
        return "Fragment";
      case fl:
        return "Profiler";
      case P:
        return "StrictMode";
      case tl:
        return "Suspense";
      case il:
        return "SuspenseList";
      case ul:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case X:
          return "Portal";
        case xl:
          return l.displayName || "Context";
        case V:
          return (l._context.displayName || "Context") + ".Consumer";
        case J:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Z:
          return t = l.displayName || null, t !== null ? t : Vl(l.type) || "Memo";
        case El:
          t = l._payload, l = l._init;
          try {
            return Vl(l(t));
          } catch {
          }
      }
    return null;
  }
  var Pl = Array.isArray, E = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Sl = [], vl = -1;
  function h(l) {
    return { current: l };
  }
  function D(l) {
    0 > vl || (l.current = Sl[vl], Sl[vl] = null, vl--);
  }
  function q(l, t) {
    vl++, Sl[vl] = l.current, l.current = t;
  }
  var G = h(null), k = h(null), el = h(null), cl = h(null);
  function Zl(l, t) {
    switch (q(el, t), q(k, l), q(G, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Jd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Jd(t), l = wd(t, l);
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
    D(G), q(G, l);
  }
  function Ql() {
    D(G), D(k), D(el);
  }
  function be(l) {
    l.memoizedState !== null && q(cl, l);
    var t = G.current, e = wd(t, l.type);
    t !== e && (q(k, l), q(G, e));
  }
  function We(l) {
    k.current === l && (D(G), D(k)), cl.current === l && (D(cl), kn._currentValue = w);
  }
  var cn, su;
  function xt(l) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        cn = t && t[1] || "", su = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + l + su;
  }
  var ba = !1;
  function ou(l, t) {
    if (!l || ba) return "";
    ba = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (x) {
                  var S = x;
                }
                Reflect.construct(l, [], M);
              } else {
                try {
                  M.call();
                } catch (x) {
                  S = x;
                }
                l.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                S = x;
              }
              (M = l()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (x) {
            if (x && S && typeof x.stack == "string")
              return [x.stack, S.stack];
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
`), b = f.split(`
`);
        for (n = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === r.length || n === b.length)
          for (a = r.length - 1, n = b.length - 1; 1 <= a && 0 <= n && r[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || r[a] !== b[n]) {
                  var T = `
` + r[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ba = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? xt(e) : "";
  }
  function jl(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return xt(l.type);
      case 16:
        return xt("Lazy");
      case 13:
        return l.child !== t && t !== null ? xt("Suspense Fallback") : xt("Suspense");
      case 19:
        return xt("SuspenseList");
      case 0:
      case 15:
        return ou(l.type, !1);
      case 11:
        return ou(l.type.render, !1);
      case 1:
        return ou(l.type, !0);
      case 31:
        return xt("Activity");
      default:
        return "";
    }
  }
  function Gl(l) {
    try {
      var t = "", e = null;
      do
        t += jl(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Cl = Object.prototype.hasOwnProperty, Ul = c.unstable_scheduleCallback, dt = c.unstable_cancelCallback, mt = c.unstable_shouldYield, Kl = c.unstable_requestPaint, Hl = c.unstable_now, ke = c.unstable_getCurrentPriorityLevel, Se = c.unstable_ImmediatePriority, fn = c.unstable_UserBlockingPriority, Ie = c.unstable_NormalPriority, ht = c.unstable_LowPriority, Rt = c.unstable_IdlePriority, sn = c.log, Hi = c.unstable_setDisableYieldValue, It = null, Et = null;
  function _e(l) {
    if (typeof sn == "function" && Hi(l), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(It, l);
      } catch {
      }
  }
  var Nt = Math.clz32 ? Math.clz32 : vh, mh = Math.log, hh = Math.LN2;
  function vh(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (mh(l) / hh | 0) | 0;
  }
  var ru = 256, du = 262144, mu = 4194304;
  function Pe(l) {
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
  function hu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Pe(a) : (i &= f, i !== 0 ? n = Pe(i) : e || (e = f & ~l, e !== 0 && (n = Pe(e))))) : (f = a & ~u, f !== 0 ? n = Pe(f) : i !== 0 ? n = Pe(i) : e || (e = a & ~l, e !== 0 && (n = Pe(e)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, e = t & -t, u >= e || u === 32 && (e & 4194048) !== 0) ? t : n;
  }
  function on(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function yh(l, t) {
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
  function js() {
    var l = mu;
    return mu <<= 1, (mu & 62914560) === 0 && (mu = 4194304), l;
  }
  function qi(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function rn(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function gh(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var f = l.entanglements, r = l.expirationTimes, b = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Nt(e), M = 1 << T;
      f[T] = 0, r[T] = -1;
      var S = b[T];
      if (S !== null)
        for (b[T] = null, T = 0; T < S.length; T++) {
          var x = S[T];
          x !== null && (x.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && zs(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t));
  }
  function zs(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Nt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function As(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Nt(e), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), e &= ~n;
    }
  }
  function Os(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Bi(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Bi(l) {
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
  function Gi(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ds() {
    var l = B.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : ym(l.type));
  }
  function Ms(l, t) {
    var e = B.p;
    try {
      return B.p = l, t();
    } finally {
      B.p = e;
    }
  }
  var xe = Math.random().toString(36).slice(2), et = "__reactFiber$" + xe, vt = "__reactProps$" + xe, Sa = "__reactContainer$" + xe, Yi = "__reactEvents$" + xe, ph = "__reactListeners$" + xe, bh = "__reactHandles$" + xe, Rs = "__reactResources$" + xe, dn = "__reactMarker$" + xe;
  function Qi(l) {
    delete l[et], delete l[vt], delete l[Yi], delete l[ph], delete l[bh];
  }
  function _a(l) {
    var t = l[et];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Sa] || e[et]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = lm(l); l !== null; ) {
            if (e = l[et]) return e;
            l = lm(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function xa(l) {
    if (l = l[et] || l[Sa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function mn(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function Ea(l) {
    var t = l[Rs];
    return t || (t = l[Rs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function lt(l) {
    l[dn] = !0;
  }
  var Cs = /* @__PURE__ */ new Set(), Us = {};
  function la(l, t) {
    Na(l, t), Na(l + "Capture", t);
  }
  function Na(l, t) {
    for (Us[l] = t, l = 0; l < t.length; l++)
      Cs.add(t[l]);
  }
  var Sh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hs = {}, qs = {};
  function _h(l) {
    return Cl.call(qs, l) ? !0 : Cl.call(Hs, l) ? !1 : Sh.test(l) ? qs[l] = !0 : (Hs[l] = !0, !1);
  }
  function vu(l, t, e) {
    if (_h(t))
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
  function yu(l, t, e) {
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
  function Pt(l, t, e, a) {
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
  function Ct(l) {
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
  function Bs(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function xh(l, t, e) {
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
      var t = Bs(l) ? "checked" : "value";
      l._valueTracker = xh(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Gs(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Bs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function gu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Eh = /[\n"\\]/g;
  function Ut(l) {
    return l.replace(
      Eh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Li(l, t, e, a, n, u, i, f) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Ct(t)) : l.value !== "" + Ct(t) && (l.value = "" + Ct(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Vi(l, i, Ct(t)) : e != null ? Vi(l, i, Ct(e)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + Ct(f) : l.removeAttribute("name");
  }
  function Ys(l, t, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), t != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Xi(l);
        return;
      }
      e = e != null ? "" + Ct(e) : "", t = t != null ? "" + Ct(t) : e, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Xi(l);
  }
  function Vi(l, t, e) {
    t === "number" && gu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ta(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < e.length; n++)
        t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        n = t.hasOwnProperty("$" + l[e].value), l[e].selected !== n && (l[e].selected = n), n && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Ct(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Qs(l, t, e) {
    if (t != null && (t = "" + Ct(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Ct(e) : "";
  }
  function Xs(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (Pl(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Ct(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Xi(l);
  }
  function ja(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Nh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ls(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || Nh.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Vs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && e[n] !== a && Ls(l, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Ls(l, u, t[u]);
  }
  function Zi(l) {
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
  var Th = /* @__PURE__ */ new Map([
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
  ]), jh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function pu(l) {
    return jh.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function le() {
  }
  var Ki = null;
  function Ji(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var za = null, Aa = null;
  function Zs(l) {
    var t = xa(l);
    if (t && (l = t.stateNode)) {
      var e = l[vt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Li(
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
                var n = a[vt] || null;
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
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Gs(a);
          }
          break l;
        case "textarea":
          Qs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ta(l, !!e.multiple, t, !1);
      }
    }
  }
  var wi = !1;
  function Ks(l, t, e) {
    if (wi) return l(t, e);
    wi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (wi = !1, (za !== null || Aa !== null) && (ui(), za && (t = za, l = Aa, Aa = za = null, Zs(t), l)))
        for (t = 0; t < l.length; t++) Zs(l[t]);
    }
  }
  function hn(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[vt] || null;
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
        o(231, t, typeof e)
      );
    return e;
  }
  var te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $i = !1;
  if (te)
    try {
      var vn = {};
      Object.defineProperty(vn, "passive", {
        get: function() {
          $i = !0;
        }
      }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
    } catch {
      $i = !1;
    }
  var Ee = null, Fi = null, bu = null;
  function Js() {
    if (bu) return bu;
    var l, t = Fi, e = t.length, a, n = "value" in Ee ? Ee.value : Ee.textContent, u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++) ;
    return bu = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Su(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function _u() {
    return !0;
  }
  function ws() {
    return !1;
  }
  function yt(l) {
    function t(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in l)
        l.hasOwnProperty(f) && (e = l[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? _u : ws, this.isPropagationStopped = ws, this;
    }
    return R(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _u);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _u);
      },
      persist: function() {
      },
      isPersistent: _u
    }), t;
  }
  var ta = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, xu = yt(ta), yn = R({}, ta, { view: 0, detail: 0 }), zh = yt(yn), Wi, ki, gn, Eu = R({}, yn, {
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
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== gn && (gn && l.type === "mousemove" ? (Wi = l.screenX - gn.screenX, ki = l.screenY - gn.screenY) : ki = Wi = 0, gn = l), Wi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : ki;
    }
  }), $s = yt(Eu), Ah = R({}, Eu, { dataTransfer: 0 }), Oh = yt(Ah), Dh = R({}, yn, { relatedTarget: 0 }), Ii = yt(Dh), Mh = R({}, ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Rh = yt(Mh), Ch = R({}, ta, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Uh = yt(Ch), Hh = R({}, ta, { data: 0 }), Fs = yt(Hh), qh = {
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
  }, Bh = {
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
  }, Gh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yh(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Gh[l]) ? !!t[l] : !1;
  }
  function Pi() {
    return Yh;
  }
  var Qh = R({}, yn, {
    key: function(l) {
      if (l.key) {
        var t = qh[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Su(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Bh[l.keyCode] || "Unidentified" : "";
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
    charCode: function(l) {
      return l.type === "keypress" ? Su(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Su(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Xh = yt(Qh), Lh = R({}, Eu, {
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
  }), Ws = yt(Lh), Vh = R({}, yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pi
  }), Zh = yt(Vh), Kh = R({}, ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jh = yt(Kh), wh = R({}, Eu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $h = yt(wh), Fh = R({}, ta, {
    newState: 0,
    oldState: 0
  }), Wh = yt(Fh), kh = [9, 13, 27, 32], lc = te && "CompositionEvent" in window, pn = null;
  te && "documentMode" in document && (pn = document.documentMode);
  var Ih = te && "TextEvent" in window && !pn, ks = te && (!lc || pn && 8 < pn && 11 >= pn), Is = " ", Ps = !1;
  function lo(l, t) {
    switch (l) {
      case "keyup":
        return kh.indexOf(t.keyCode) !== -1;
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
  function to(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Oa = !1;
  function Ph(l, t) {
    switch (l) {
      case "compositionend":
        return to(t);
      case "keypress":
        return t.which !== 32 ? null : (Ps = !0, Is);
      case "textInput":
        return l = t.data, l === Is && Ps ? null : l;
      default:
        return null;
    }
  }
  function lv(l, t) {
    if (Oa)
      return l === "compositionend" || !lc && lo(l, t) ? (l = Js(), bu = Fi = Ee = null, Oa = !1, l) : null;
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
        return ks && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var tv = {
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
  function eo(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!tv[l.type] : t === "textarea";
  }
  function ao(l, t, e, a) {
    za ? Aa ? Aa.push(a) : Aa = [a] : za = a, t = di(t, "onChange"), 0 < t.length && (e = new xu(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var bn = null, Sn = null;
  function ev(l) {
    Qd(l, 0);
  }
  function Nu(l) {
    var t = mn(l);
    if (Gs(t)) return l;
  }
  function no(l, t) {
    if (l === "change") return t;
  }
  var uo = !1;
  if (te) {
    var tc;
    if (te) {
      var ec = "oninput" in document;
      if (!ec) {
        var io = document.createElement("div");
        io.setAttribute("oninput", "return;"), ec = typeof io.oninput == "function";
      }
      tc = ec;
    } else tc = !1;
    uo = tc && (!document.documentMode || 9 < document.documentMode);
  }
  function co() {
    bn && (bn.detachEvent("onpropertychange", fo), Sn = bn = null);
  }
  function fo(l) {
    if (l.propertyName === "value" && Nu(Sn)) {
      var t = [];
      ao(
        t,
        Sn,
        l,
        Ji(l)
      ), Ks(ev, t);
    }
  }
  function av(l, t, e) {
    l === "focusin" ? (co(), bn = t, Sn = e, bn.attachEvent("onpropertychange", fo)) : l === "focusout" && co();
  }
  function nv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Nu(Sn);
  }
  function uv(l, t) {
    if (l === "click") return Nu(t);
  }
  function iv(l, t) {
    if (l === "input" || l === "change")
      return Nu(t);
  }
  function cv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Tt = typeof Object.is == "function" ? Object.is : cv;
  function _n(l, t) {
    if (Tt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Cl.call(t, n) || !Tt(l[n], t[n]))
        return !1;
    }
    return !0;
  }
  function so(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function oo(l, t) {
    var e = so(l);
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
      e = so(e);
    }
  }
  function ro(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ro(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function mo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = gu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = gu(l.document);
    }
    return t;
  }
  function ac(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var fv = te && "documentMode" in document && 11 >= document.documentMode, Da = null, nc = null, xn = null, uc = !1;
  function ho(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    uc || Da == null || Da !== gu(a) || (a = Da, "selectionStart" in a && ac(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), xn && _n(xn, a) || (xn = a, a = di(nc, "onSelect"), 0 < a.length && (t = new xu(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Da)));
  }
  function ea(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Ma = {
    animationend: ea("Animation", "AnimationEnd"),
    animationiteration: ea("Animation", "AnimationIteration"),
    animationstart: ea("Animation", "AnimationStart"),
    transitionrun: ea("Transition", "TransitionRun"),
    transitionstart: ea("Transition", "TransitionStart"),
    transitioncancel: ea("Transition", "TransitionCancel"),
    transitionend: ea("Transition", "TransitionEnd")
  }, ic = {}, vo = {};
  te && (vo = document.createElement("div").style, "AnimationEvent" in window || (delete Ma.animationend.animation, delete Ma.animationiteration.animation, delete Ma.animationstart.animation), "TransitionEvent" in window || delete Ma.transitionend.transition);
  function aa(l) {
    if (ic[l]) return ic[l];
    if (!Ma[l]) return l;
    var t = Ma[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in vo)
        return ic[l] = t[e];
    return l;
  }
  var yo = aa("animationend"), go = aa("animationiteration"), po = aa("animationstart"), sv = aa("transitionrun"), ov = aa("transitionstart"), rv = aa("transitioncancel"), bo = aa("transitionend"), So = /* @__PURE__ */ new Map(), cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  cc.push("scrollEnd");
  function Vt(l, t) {
    So.set(l, t), la(t, [l]);
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
  }, Ht = [], Ra = 0, fc = 0;
  function ju() {
    for (var l = Ra, t = fc = Ra = 0; t < l; ) {
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
      u !== 0 && _o(e, n, u);
    }
  }
  function zu(l, t, e, a) {
    Ht[Ra++] = l, Ht[Ra++] = t, Ht[Ra++] = e, Ht[Ra++] = a, fc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function sc(l, t, e, a) {
    return zu(l, t, e, a), Au(l);
  }
  function na(l, t) {
    return zu(l, null, null, t), Au(l);
  }
  function _o(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && t !== null && (n = 31 - Nt(e), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = e | 536870912), u) : null;
  }
  function Au(l) {
    if (50 < Zn)
      throw Zn = 0, bf = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ca = {};
  function dv(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jt(l, t, e, a) {
    return new dv(l, t, e, a);
  }
  function oc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function ee(l, t) {
    var e = l.alternate;
    return e === null ? (e = jt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function xo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Ou(l, t, e, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") oc(l) && (i = 1);
    else if (typeof l == "string")
      i = g0(
        l,
        e,
        G.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case ul:
          return l = jt(31, e, t, n), l.elementType = ul, l.lanes = u, l;
        case F:
          return ua(e.children, n, u, t);
        case P:
          i = 8, n |= 24;
          break;
        case fl:
          return l = jt(12, e, t, n | 2), l.elementType = fl, l.lanes = u, l;
        case tl:
          return l = jt(13, e, t, n), l.elementType = tl, l.lanes = u, l;
        case il:
          return l = jt(19, e, t, n), l.elementType = il, l.lanes = u, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case xl:
                i = 10;
                break l;
              case V:
                i = 9;
                break l;
              case J:
                i = 11;
                break l;
              case Z:
                i = 14;
                break l;
              case El:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            o(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = jt(i, e, t, n), t.elementType = l, t.type = a, t.lanes = u, t;
  }
  function ua(l, t, e, a) {
    return l = jt(7, l, a, t), l.lanes = e, l;
  }
  function rc(l, t, e) {
    return l = jt(6, l, null, t), l.lanes = e, l;
  }
  function Eo(l) {
    var t = jt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function dc(l, t, e) {
    return t = jt(
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
  var No = /* @__PURE__ */ new WeakMap();
  function qt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = No.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Gl(t)
      }, No.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Gl(t)
    };
  }
  var Ua = [], Ha = 0, Du = null, En = 0, Bt = [], Gt = 0, Ne = null, Jt = 1, wt = "";
  function ae(l, t) {
    Ua[Ha++] = En, Ua[Ha++] = Du, Du = l, En = t;
  }
  function To(l, t, e) {
    Bt[Gt++] = Jt, Bt[Gt++] = wt, Bt[Gt++] = Ne, Ne = l;
    var a = Jt;
    l = wt;
    var n = 32 - Nt(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - Nt(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Jt = 1 << 32 - Nt(t) + n | e << n | a, wt = u + l;
    } else
      Jt = 1 << u | e << n | a, wt = l;
  }
  function mc(l) {
    l.return !== null && (ae(l, 1), To(l, 1, 0));
  }
  function hc(l) {
    for (; l === Du; )
      Du = Ua[--Ha], Ua[Ha] = null, En = Ua[--Ha], Ua[Ha] = null;
    for (; l === Ne; )
      Ne = Bt[--Gt], Bt[Gt] = null, wt = Bt[--Gt], Bt[Gt] = null, Jt = Bt[--Gt], Bt[Gt] = null;
  }
  function jo(l, t) {
    Bt[Gt++] = Jt, Bt[Gt++] = wt, Bt[Gt++] = Ne, Jt = t.id, wt = t.overflow, Ne = l;
  }
  var at = null, ql = null, hl = !1, Te = null, Yt = !1, vc = Error(o(519));
  function je(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Nn(qt(t, l)), vc;
  }
  function zo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[et] = l, t[vt] = a, e) {
      case "dialog":
        ol("cancel", t), ol("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ol("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Jn.length; e++)
          ol(Jn[e], t);
        break;
      case "source":
        ol("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ol("error", t), ol("load", t);
        break;
      case "details":
        ol("toggle", t);
        break;
      case "input":
        ol("invalid", t), Ys(
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
        ol("invalid", t);
        break;
      case "textarea":
        ol("invalid", t), Xs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Zd(t.textContent, e) ? (a.popover != null && (ol("beforetoggle", t), ol("toggle", t)), a.onScroll != null && ol("scroll", t), a.onScrollEnd != null && ol("scrollend", t), a.onClick != null && (t.onclick = le), t = !0) : t = !1, t || je(l, !0);
  }
  function Ao(l) {
    for (at = l.return; at; )
      switch (at.tag) {
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
          at = at.return;
      }
  }
  function qa(l) {
    if (l !== at) return !1;
    if (!hl) return Ao(l), hl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Uf(l.type, l.memoizedProps)), e = !e), e && ql && je(l), Ao(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      ql = Pd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      ql = Pd(l);
    } else
      t === 27 ? (t = ql, Qe(l.type) ? (l = Yf, Yf = null, ql = l) : ql = t) : ql = at ? Xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ia() {
    ql = at = null, hl = !1;
  }
  function yc() {
    var l = Te;
    return l !== null && (St === null ? St = l : St.push.apply(
      St,
      l
    ), Te = null), l;
  }
  function Nn(l) {
    Te === null ? Te = [l] : Te.push(l);
  }
  var gc = h(null), ca = null, ne = null;
  function ze(l, t, e) {
    q(gc, t._currentValue), t._currentValue = e;
  }
  function ue(l) {
    l._currentValue = gc.current, D(gc);
  }
  function pc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function bc(l, t, e, a) {
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
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), pc(
                u.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(o(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), pc(i, e, l), i = null;
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
  function Ba(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          Tt(n.pendingProps.value, i.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (n === cl.current) {
        if (i = n.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(kn) : l = [kn]);
      }
      n = n.return;
    }
    l !== null && bc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Mu(l) {
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
  function fa(l) {
    ca = l, ne = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function nt(l) {
    return Oo(ca, l);
  }
  function Ru(l, t) {
    return ca === null && fa(l), Oo(l, t);
  }
  function Oo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, ne === null) {
      if (l === null) throw Error(o(308));
      ne = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else ne = ne.next = t;
    return e;
  }
  var mv = typeof AbortController < "u" ? AbortController : function() {
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
  }, hv = c.unstable_scheduleCallback, vv = c.unstable_NormalPriority, $l = {
    $$typeof: xl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Sc() {
    return {
      controller: new mv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Tn(l) {
    l.refCount--, l.refCount === 0 && hv(vv, function() {
      l.controller.abort();
    });
  }
  var jn = null, _c = 0, Ga = 0, Ya = null;
  function yv(l, t) {
    if (jn === null) {
      var e = jn = [];
      _c = 0, Ga = Tf(), Ya = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return _c++, t.then(Do, Do), t;
  }
  function Do() {
    if (--_c === 0 && jn !== null) {
      Ya !== null && (Ya.status = "fulfilled");
      var l = jn;
      jn = null, Ga = 0, Ya = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function gv(l, t) {
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
  var Mo = E.S;
  E.S = function(l, t) {
    hd = Hl(), typeof t == "object" && t !== null && typeof t.then == "function" && yv(l, t), Mo !== null && Mo(l, t);
  };
  var sa = h(null);
  function xc() {
    var l = sa.current;
    return l !== null ? l : Dl.pooledCache;
  }
  function Cu(l, t) {
    t === null ? q(sa, sa.current) : q(sa, t.pool);
  }
  function Ro() {
    var l = xc();
    return l === null ? null : { parent: $l._currentValue, pool: l };
  }
  var Qa = Error(o(460)), Ec = Error(o(474)), Uu = Error(o(542)), Hu = { then: function() {
  } };
  function Co(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Uo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(le, le), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, qo(l), l;
      default:
        if (typeof t.status == "string") t.then(le, le);
        else {
          if (l = Dl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(o(482));
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
            throw l = t.reason, qo(l), l;
        }
        throw ra = t, Qa;
    }
  }
  function oa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ra = e, Qa) : e;
    }
  }
  var ra = null;
  function Ho() {
    if (ra === null) throw Error(o(459));
    var l = ra;
    return ra = null, l;
  }
  function qo(l) {
    if (l === Qa || l === Uu)
      throw Error(o(483));
  }
  var Xa = null, zn = 0;
  function qu(l) {
    var t = zn;
    return zn += 1, Xa === null && (Xa = []), Uo(Xa, l, t);
  }
  function An(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Bu(l, t) {
    throw t.$$typeof === j ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Bo(l) {
    function t(y, d) {
      if (l) {
        var p = y.deletions;
        p === null ? (y.deletions = [d], y.flags |= 16) : p.push(d);
      }
    }
    function e(y, d) {
      if (!l) return null;
      for (; d !== null; )
        t(y, d), d = d.sibling;
      return null;
    }
    function a(y) {
      for (var d = /* @__PURE__ */ new Map(); y !== null; )
        y.key !== null ? d.set(y.key, y) : d.set(y.index, y), y = y.sibling;
      return d;
    }
    function n(y, d) {
      return y = ee(y, d), y.index = 0, y.sibling = null, y;
    }
    function u(y, d, p) {
      return y.index = p, l ? (p = y.alternate, p !== null ? (p = p.index, p < d ? (y.flags |= 67108866, d) : p) : (y.flags |= 67108866, d)) : (y.flags |= 1048576, d);
    }
    function i(y) {
      return l && y.alternate === null && (y.flags |= 67108866), y;
    }
    function f(y, d, p, z) {
      return d === null || d.tag !== 6 ? (d = rc(p, y.mode, z), d.return = y, d) : (d = n(d, p), d.return = y, d);
    }
    function r(y, d, p, z) {
      var K = p.type;
      return K === F ? T(
        y,
        d,
        p.props.children,
        z,
        p.key
      ) : d !== null && (d.elementType === K || typeof K == "object" && K !== null && K.$$typeof === El && oa(K) === d.type) ? (d = n(d, p.props), An(d, p), d.return = y, d) : (d = Ou(
        p.type,
        p.key,
        p.props,
        null,
        y.mode,
        z
      ), An(d, p), d.return = y, d);
    }
    function b(y, d, p, z) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = dc(p, y.mode, z), d.return = y, d) : (d = n(d, p.children || []), d.return = y, d);
    }
    function T(y, d, p, z, K) {
      return d === null || d.tag !== 7 ? (d = ua(
        p,
        y.mode,
        z,
        K
      ), d.return = y, d) : (d = n(d, p), d.return = y, d);
    }
    function M(y, d, p) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = rc(
          "" + d,
          y.mode,
          p
        ), d.return = y, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case H:
            return p = Ou(
              d.type,
              d.key,
              d.props,
              null,
              y.mode,
              p
            ), An(p, d), p.return = y, p;
          case X:
            return d = dc(
              d,
              y.mode,
              p
            ), d.return = y, d;
          case El:
            return d = oa(d), M(y, d, p);
        }
        if (Pl(d) || Rl(d))
          return d = ua(
            d,
            y.mode,
            p,
            null
          ), d.return = y, d;
        if (typeof d.then == "function")
          return M(y, qu(d), p);
        if (d.$$typeof === xl)
          return M(
            y,
            Ru(y, d),
            p
          );
        Bu(y, d);
      }
      return null;
    }
    function S(y, d, p, z) {
      var K = d !== null ? d.key : null;
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return K !== null ? null : f(y, d, "" + p, z);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case H:
            return p.key === K ? r(y, d, p, z) : null;
          case X:
            return p.key === K ? b(y, d, p, z) : null;
          case El:
            return p = oa(p), S(y, d, p, z);
        }
        if (Pl(p) || Rl(p))
          return K !== null ? null : T(y, d, p, z, null);
        if (typeof p.then == "function")
          return S(
            y,
            d,
            qu(p),
            z
          );
        if (p.$$typeof === xl)
          return S(
            y,
            d,
            Ru(y, p),
            z
          );
        Bu(y, p);
      }
      return null;
    }
    function x(y, d, p, z, K) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return y = y.get(p) || null, f(d, y, "" + z, K);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case H:
            return y = y.get(
              z.key === null ? p : z.key
            ) || null, r(d, y, z, K);
          case X:
            return y = y.get(
              z.key === null ? p : z.key
            ) || null, b(d, y, z, K);
          case El:
            return z = oa(z), x(
              y,
              d,
              p,
              z,
              K
            );
        }
        if (Pl(z) || Rl(z))
          return y = y.get(p) || null, T(d, y, z, K, null);
        if (typeof z.then == "function")
          return x(
            y,
            d,
            p,
            qu(z),
            K
          );
        if (z.$$typeof === xl)
          return x(
            y,
            d,
            p,
            Ru(d, z),
            K
          );
        Bu(d, z);
      }
      return null;
    }
    function Q(y, d, p, z) {
      for (var K = null, pl = null, L = d, nl = d = 0, dl = null; L !== null && nl < p.length; nl++) {
        L.index > nl ? (dl = L, L = null) : dl = L.sibling;
        var bl = S(
          y,
          L,
          p[nl],
          z
        );
        if (bl === null) {
          L === null && (L = dl);
          break;
        }
        l && L && bl.alternate === null && t(y, L), d = u(bl, d, nl), pl === null ? K = bl : pl.sibling = bl, pl = bl, L = dl;
      }
      if (nl === p.length)
        return e(y, L), hl && ae(y, nl), K;
      if (L === null) {
        for (; nl < p.length; nl++)
          L = M(y, p[nl], z), L !== null && (d = u(
            L,
            d,
            nl
          ), pl === null ? K = L : pl.sibling = L, pl = L);
        return hl && ae(y, nl), K;
      }
      for (L = a(L); nl < p.length; nl++)
        dl = x(
          L,
          y,
          nl,
          p[nl],
          z
        ), dl !== null && (l && dl.alternate !== null && L.delete(
          dl.key === null ? nl : dl.key
        ), d = u(
          dl,
          d,
          nl
        ), pl === null ? K = dl : pl.sibling = dl, pl = dl);
      return l && L.forEach(function(Ke) {
        return t(y, Ke);
      }), hl && ae(y, nl), K;
    }
    function $(y, d, p, z) {
      if (p == null) throw Error(o(151));
      for (var K = null, pl = null, L = d, nl = d = 0, dl = null, bl = p.next(); L !== null && !bl.done; nl++, bl = p.next()) {
        L.index > nl ? (dl = L, L = null) : dl = L.sibling;
        var Ke = S(y, L, bl.value, z);
        if (Ke === null) {
          L === null && (L = dl);
          break;
        }
        l && L && Ke.alternate === null && t(y, L), d = u(Ke, d, nl), pl === null ? K = Ke : pl.sibling = Ke, pl = Ke, L = dl;
      }
      if (bl.done)
        return e(y, L), hl && ae(y, nl), K;
      if (L === null) {
        for (; !bl.done; nl++, bl = p.next())
          bl = M(y, bl.value, z), bl !== null && (d = u(bl, d, nl), pl === null ? K = bl : pl.sibling = bl, pl = bl);
        return hl && ae(y, nl), K;
      }
      for (L = a(L); !bl.done; nl++, bl = p.next())
        bl = x(L, y, nl, bl.value, z), bl !== null && (l && bl.alternate !== null && L.delete(bl.key === null ? nl : bl.key), d = u(bl, d, nl), pl === null ? K = bl : pl.sibling = bl, pl = bl);
      return l && L.forEach(function(A0) {
        return t(y, A0);
      }), hl && ae(y, nl), K;
    }
    function Ol(y, d, p, z) {
      if (typeof p == "object" && p !== null && p.type === F && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case H:
            l: {
              for (var K = p.key; d !== null; ) {
                if (d.key === K) {
                  if (K = p.type, K === F) {
                    if (d.tag === 7) {
                      e(
                        y,
                        d.sibling
                      ), z = n(
                        d,
                        p.props.children
                      ), z.return = y, y = z;
                      break l;
                    }
                  } else if (d.elementType === K || typeof K == "object" && K !== null && K.$$typeof === El && oa(K) === d.type) {
                    e(
                      y,
                      d.sibling
                    ), z = n(d, p.props), An(z, p), z.return = y, y = z;
                    break l;
                  }
                  e(y, d);
                  break;
                } else t(y, d);
                d = d.sibling;
              }
              p.type === F ? (z = ua(
                p.props.children,
                y.mode,
                z,
                p.key
              ), z.return = y, y = z) : (z = Ou(
                p.type,
                p.key,
                p.props,
                null,
                y.mode,
                z
              ), An(z, p), z.return = y, y = z);
            }
            return i(y);
          case X:
            l: {
              for (K = p.key; d !== null; ) {
                if (d.key === K)
                  if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                    e(
                      y,
                      d.sibling
                    ), z = n(d, p.children || []), z.return = y, y = z;
                    break l;
                  } else {
                    e(y, d);
                    break;
                  }
                else t(y, d);
                d = d.sibling;
              }
              z = dc(p, y.mode, z), z.return = y, y = z;
            }
            return i(y);
          case El:
            return p = oa(p), Ol(
              y,
              d,
              p,
              z
            );
        }
        if (Pl(p))
          return Q(
            y,
            d,
            p,
            z
          );
        if (Rl(p)) {
          if (K = Rl(p), typeof K != "function") throw Error(o(150));
          return p = K.call(p), $(
            y,
            d,
            p,
            z
          );
        }
        if (typeof p.then == "function")
          return Ol(
            y,
            d,
            qu(p),
            z
          );
        if (p.$$typeof === xl)
          return Ol(
            y,
            d,
            Ru(y, p),
            z
          );
        Bu(y, p);
      }
      return typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint" ? (p = "" + p, d !== null && d.tag === 6 ? (e(y, d.sibling), z = n(d, p), z.return = y, y = z) : (e(y, d), z = rc(p, y.mode, z), z.return = y, y = z), i(y)) : e(y, d);
    }
    return function(y, d, p, z) {
      try {
        zn = 0;
        var K = Ol(
          y,
          d,
          p,
          z
        );
        return Xa = null, K;
      } catch (L) {
        if (L === Qa || L === Uu) throw L;
        var pl = jt(29, L, null, y.mode);
        return pl.lanes = z, pl.return = y, pl;
      } finally {
      }
    };
  }
  var da = Bo(!0), Go = Bo(!1), Ae = !1;
  function Nc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Oe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function De(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (_l & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Au(l), _o(l, null, e), t;
    }
    return zu(l, a, t, e), Au(l);
  }
  function On(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, As(l, e);
    }
  }
  function jc(l, t) {
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
  function Dn() {
    if (zc) {
      var l = Ya;
      if (l !== null) throw l;
    }
  }
  function Mn(l, t, e, a) {
    zc = !1;
    var n = l.updateQueue;
    Ae = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var r = f, b = r.next;
      r.next = null, i === null ? u = b : i.next = b, i = r;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = b : f.next = b, T.lastBaseUpdate = r));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, T = b = r = null, f = u;
      do {
        var S = f.lane & -536870913, x = S !== f.lane;
        if (x ? (rl & S) === S : (a & S) === S) {
          S !== 0 && S === Ga && (zc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          l: {
            var Q = l, $ = f;
            S = t;
            var Ol = e;
            switch ($.tag) {
              case 1:
                if (Q = $.payload, typeof Q == "function") {
                  M = Q.call(Ol, M, S);
                  break l;
                }
                M = Q;
                break l;
              case 3:
                Q.flags = Q.flags & -65537 | 128;
              case 0:
                if (Q = $.payload, S = typeof Q == "function" ? Q.call(Ol, M, S) : Q, S == null) break l;
                M = R({}, M, S);
                break l;
              case 2:
                Ae = !0;
            }
          }
          S = f.callback, S !== null && (l.flags |= 64, x && (l.flags |= 8192), x = n.callbacks, x === null ? n.callbacks = [S] : x.push(S));
        } else
          x = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, T === null ? (b = T = x, r = M) : T = T.next = x, i |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          x = f, f = x.next, x.next = null, n.lastBaseUpdate = x, n.shared.pending = null;
        }
      } while (!0);
      T === null && (r = M), n.baseState = r, n.firstBaseUpdate = b, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), He |= i, l.lanes = i, l.memoizedState = M;
    }
  }
  function Yo(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Qo(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Yo(e[l], t);
  }
  var La = h(null), Gu = h(0);
  function Xo(l, t) {
    l = he, q(Gu, l), q(La, t), he = l | t.baseLanes;
  }
  function Ac() {
    q(Gu, he), q(La, La.current);
  }
  function Oc() {
    he = Gu.current, D(La), D(Gu);
  }
  var zt = h(null), Qt = null;
  function Me(l) {
    var t = l.alternate;
    q(Jl, Jl.current & 1), q(zt, l), Qt === null && (t === null || La.current !== null || t.memoizedState !== null) && (Qt = l);
  }
  function Dc(l) {
    q(Jl, Jl.current), q(zt, l), Qt === null && (Qt = l);
  }
  function Lo(l) {
    l.tag === 22 ? (q(Jl, Jl.current), q(zt, l), Qt === null && (Qt = l)) : Re();
  }
  function Re() {
    q(Jl, Jl.current), q(zt, zt.current);
  }
  function At(l) {
    D(zt), Qt === l && (Qt = null), D(Jl);
  }
  var Jl = h(0);
  function Yu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Bf(e) || Gf(e)))
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
  var ie = 0, al = null, zl = null, Fl = null, Qu = !1, Va = !1, ma = !1, Xu = 0, Rn = 0, Za = null, pv = 0;
  function Xl() {
    throw Error(o(321));
  }
  function Mc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!Tt(l[e], t[e])) return !1;
    return !0;
  }
  function Rc(l, t, e, a, n, u) {
    return ie = u, al = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? Tr : wc, ma = !1, u = e(a, n), ma = !1, Va && (u = Zo(
      t,
      e,
      a,
      n
    )), Vo(l), u;
  }
  function Vo(l) {
    E.H = Hn;
    var t = zl !== null && zl.next !== null;
    if (ie = 0, Fl = zl = al = null, Qu = !1, Rn = 0, Za = null, t) throw Error(o(300));
    l === null || Wl || (l = l.dependencies, l !== null && Mu(l) && (Wl = !0));
  }
  function Zo(l, t, e, a) {
    al = l;
    var n = 0;
    do {
      if (Va && (Za = null), Rn = 0, Va = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Fl = zl = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      E.H = jr, u = t(e, a);
    } while (Va);
    return u;
  }
  function bv() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Cn(t) : t, l = l.useState()[0], (zl !== null ? zl.memoizedState : null) !== l && (al.flags |= 1024), t;
  }
  function Cc() {
    var l = Xu !== 0;
    return Xu = 0, l;
  }
  function Uc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Hc(l) {
    if (Qu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Qu = !1;
    }
    ie = 0, Fl = zl = al = null, Va = !1, Rn = Xu = 0, Za = null;
  }
  function rt() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Fl === null ? al.memoizedState = Fl = l : Fl = Fl.next = l, Fl;
  }
  function wl() {
    if (zl === null) {
      var l = al.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = zl.next;
    var t = Fl === null ? al.memoizedState : Fl.next;
    if (t !== null)
      Fl = t, zl = l;
    else {
      if (l === null)
        throw al.alternate === null ? Error(o(467)) : Error(o(310));
      zl = l, l = {
        memoizedState: zl.memoizedState,
        baseState: zl.baseState,
        baseQueue: zl.baseQueue,
        queue: zl.queue,
        next: null
      }, Fl === null ? al.memoizedState = Fl = l : Fl = Fl.next = l;
    }
    return Fl;
  }
  function Lu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Cn(l) {
    var t = Rn;
    return Rn += 1, Za === null && (Za = []), l = Uo(Za, l, t), t = al, (Fl === null ? t.memoizedState : Fl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Tr : wc), l;
  }
  function Vu(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Cn(l);
      if (l.$$typeof === xl) return nt(l);
    }
    throw Error(o(438, String(l)));
  }
  function qc(l) {
    var t = null, e = al.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = al.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Lu(), al.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = st;
    return t.index++, e;
  }
  function ce(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Zu(l) {
    var t = wl();
    return Bc(t, zl, l);
  }
  function Bc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
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
      var f = i = null, r = null, b = t, T = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (rl & M) === M : (ie & M) === M) {
          var S = b.revertLane;
          if (S === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === Ga && (T = !0);
          else if ((ie & S) === S) {
            b = b.next, S === Ga && (T = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, r === null ? (f = r = M, i = u) : r = r.next = M, al.lanes |= S, He |= S;
          M = b.action, ma && e(u, M), u = b.hasEagerState ? b.eagerState : e(u, M);
        } else
          S = {
            lane: M,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, r === null ? (f = r = S, i = u) : r = r.next = S, al.lanes |= M, He |= M;
        b = b.next;
      } while (b !== null && b !== t);
      if (r === null ? i = u : r.next = f, !Tt(u, l.memoizedState) && (Wl = !0, T && (e = Ya, e !== null)))
        throw e;
      l.memoizedState = u, l.baseState = i, l.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Gc(l) {
    var t = wl(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, n = e.pending, u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = l(u, i.action), i = i.next;
      while (i !== n);
      Tt(u, t.memoizedState) || (Wl = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Ko(l, t, e) {
    var a = al, n = wl(), u = hl;
    if (u) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !Tt(
      (zl || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Wl = !0), n = n.queue, Xc($o.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== t || i || Fl !== null && Fl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        wo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), Dl === null) throw Error(o(349));
      u || (ie & 127) !== 0 || Jo(a, t, e);
    }
    return e;
  }
  function Jo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = al.updateQueue, t === null ? (t = Lu(), al.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function wo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Fo(t) && Wo(l);
  }
  function $o(l, t, e) {
    return e(function() {
      Fo(t) && Wo(l);
    });
  }
  function Fo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !Tt(l, e);
    } catch {
      return !0;
    }
  }
  function Wo(l) {
    var t = na(l, 2);
    t !== null && _t(t, l, 2);
  }
  function Yc(l) {
    var t = rt();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), ma) {
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
      lastRenderedReducer: ce,
      lastRenderedState: l
    }, t;
  }
  function ko(l, t, e, a) {
    return l.baseState = e, Bc(
      l,
      zl,
      typeof a == "function" ? a : ce
    );
  }
  function Sv(l, t, e, a, n) {
    if (wu(l)) throw Error(o(485));
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
      E.T !== null ? e(!0) : u.isTransition = !1, a(u), e = t.pending, e === null ? (u.next = t.pending = u, Io(t, u)) : (u.next = e.next, t.pending = e.next = u);
    }
  }
  function Io(l, t) {
    var e = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var u = E.T, i = {};
      E.T = i;
      try {
        var f = e(n, a), r = E.S;
        r !== null && r(i, f), Po(l, t, f);
      } catch (b) {
        Qc(l, t, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), E.T = u;
      }
    } else
      try {
        u = e(n, a), Po(l, t, u);
      } catch (b) {
        Qc(l, t, b);
      }
  }
  function Po(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        lr(l, t, a);
      },
      function(a) {
        return Qc(l, t, a);
      }
    ) : lr(l, t, e);
  }
  function lr(l, t, e) {
    t.status = "fulfilled", t.value = e, tr(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Io(l, e)));
  }
  function Qc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, tr(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function tr(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function er(l, t) {
    return t;
  }
  function ar(l, t) {
    if (hl) {
      var e = Dl.formState;
      if (e !== null) {
        l: {
          var a = al;
          if (hl) {
            if (ql) {
              t: {
                for (var n = ql, u = Yt; n.nodeType !== 8; ) {
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
                ql = Xt(
                  n.nextSibling
                ), a = n.data === "F!";
                break l;
              }
            }
            je(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = rt(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: er,
      lastRenderedState: t
    }, e.queue = a, e = xr.bind(
      null,
      al,
      a
    ), a.dispatch = e, a = Yc(!1), u = Jc.bind(
      null,
      al,
      !1,
      a.queue
    ), a = rt(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, e = Sv.bind(
      null,
      al,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function nr(l) {
    var t = wl();
    return ur(t, zl, l);
  }
  function ur(l, t, e) {
    if (t = Bc(
      l,
      t,
      er
    )[0], l = Zu(ce)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Cn(t);
      } catch (i) {
        throw i === Qa ? Uu : i;
      }
    else a = t;
    t = wl();
    var n = t.queue, u = n.dispatch;
    return e !== t.memoizedState && (al.flags |= 2048, Ka(
      9,
      { destroy: void 0 },
      _v.bind(null, n, e),
      null
    )), [a, u, l];
  }
  function _v(l, t) {
    l.action = t;
  }
  function ir(l) {
    var t = wl(), e = zl;
    if (e !== null)
      return ur(t, e, l);
    wl(), t = t.memoizedState, e = wl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Ka(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = al.updateQueue, t === null && (t = Lu(), al.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function cr() {
    return wl().memoizedState;
  }
  function Ku(l, t, e, a) {
    var n = rt();
    al.flags |= l, n.memoizedState = Ka(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Ju(l, t, e, a) {
    var n = wl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    zl !== null && a !== null && Mc(a, zl.memoizedState.deps) ? n.memoizedState = Ka(t, u, e, a) : (al.flags |= l, n.memoizedState = Ka(
      1 | t,
      u,
      e,
      a
    ));
  }
  function fr(l, t) {
    Ku(8390656, 8, l, t);
  }
  function Xc(l, t) {
    Ju(2048, 8, l, t);
  }
  function xv(l) {
    al.flags |= 4;
    var t = al.updateQueue;
    if (t === null)
      t = Lu(), al.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function sr(l) {
    var t = wl().memoizedState;
    return xv({ ref: t, nextImpl: l }), function() {
      if ((_l & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function or(l, t) {
    return Ju(4, 2, l, t);
  }
  function rr(l, t) {
    return Ju(4, 4, l, t);
  }
  function dr(l, t) {
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
  function mr(l, t, e) {
    e = e != null ? e.concat([l]) : null, Ju(4, 4, dr.bind(null, t, l), e);
  }
  function Lc() {
  }
  function hr(l, t) {
    var e = wl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Mc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function vr(l, t) {
    var e = wl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Mc(t, a[1]))
      return a[0];
    if (a = l(), ma) {
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
    return e === void 0 || (ie & 1073741824) !== 0 && (rl & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = yd(), al.lanes |= l, He |= l, e);
  }
  function yr(l, t, e, a) {
    return Tt(e, t) ? e : La.current !== null ? (l = Vc(l, e, a), Tt(l, t) || (Wl = !0), l) : (ie & 42) === 0 || (ie & 1073741824) !== 0 && (rl & 261930) === 0 ? (Wl = !0, l.memoizedState = e) : (l = yd(), al.lanes |= l, He |= l, t);
  }
  function gr(l, t, e, a, n) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var i = E.T, f = {};
    E.T = f, Jc(l, !1, t, e);
    try {
      var r = n(), b = E.S;
      if (b !== null && b(f, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var T = gv(
          r,
          a
        );
        Un(
          l,
          t,
          T,
          Mt(l)
        );
      } else
        Un(
          l,
          t,
          a,
          Mt(l)
        );
    } catch (M) {
      Un(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: M },
        Mt()
      );
    } finally {
      B.p = u, i !== null && f.types !== null && (i.types = f.types), E.T = i;
    }
  }
  function Ev() {
  }
  function Zc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var n = pr(l).queue;
    gr(
      l,
      n,
      t,
      w,
      e === null ? Ev : function() {
        return br(l), e(a);
      }
    );
  }
  function pr(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: w,
      baseState: w,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ce,
        lastRenderedState: w
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
        lastRenderedReducer: ce,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function br(l) {
    var t = pr(l);
    t.next === null && (t = l.alternate.memoizedState), Un(
      l,
      t.next.queue,
      {},
      Mt()
    );
  }
  function Kc() {
    return nt(kn);
  }
  function Sr() {
    return wl().memoizedState;
  }
  function _r() {
    return wl().memoizedState;
  }
  function Nv(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Mt();
          l = Oe(e);
          var a = De(t, l, e);
          a !== null && (_t(a, t, e), On(a, t, e)), t = { cache: Sc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Tv(l, t, e) {
    var a = Mt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wu(l) ? Er(t, e) : (e = sc(l, t, e, a), e !== null && (_t(e, l, a), Nr(e, t, a)));
  }
  function xr(l, t, e) {
    var a = Mt();
    Un(l, t, e, a);
  }
  function Un(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (wu(l)) Er(t, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, Tt(f, i))
            return zu(l, t, n, 0), Dl === null && ju(), !1;
        } catch {
        } finally {
        }
      if (e = sc(l, t, n, a), e !== null)
        return _t(e, l, a), Nr(e, t, a), !0;
    }
    return !1;
  }
  function Jc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Tf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wu(l)) {
      if (t) throw Error(o(479));
    } else
      t = sc(
        l,
        e,
        a,
        2
      ), t !== null && _t(t, l, 2);
  }
  function wu(l) {
    var t = l.alternate;
    return l === al || t !== null && t === al;
  }
  function Er(l, t) {
    Va = Qu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function Nr(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, As(l, e);
    }
  }
  var Hn = {
    readContext: nt,
    use: Vu,
    useCallback: Xl,
    useContext: Xl,
    useEffect: Xl,
    useImperativeHandle: Xl,
    useLayoutEffect: Xl,
    useInsertionEffect: Xl,
    useMemo: Xl,
    useReducer: Xl,
    useRef: Xl,
    useState: Xl,
    useDebugValue: Xl,
    useDeferredValue: Xl,
    useTransition: Xl,
    useSyncExternalStore: Xl,
    useId: Xl,
    useHostTransitionStatus: Xl,
    useFormState: Xl,
    useActionState: Xl,
    useOptimistic: Xl,
    useMemoCache: Xl,
    useCacheRefresh: Xl
  };
  Hn.useEffectEvent = Xl;
  var Tr = {
    readContext: nt,
    use: Vu,
    useCallback: function(l, t) {
      return rt().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: nt,
    useEffect: fr,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Ku(
        4194308,
        4,
        dr.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Ku(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Ku(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = rt();
      t = t === void 0 ? null : t;
      var a = l();
      if (ma) {
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
      var a = rt();
      if (e !== void 0) {
        var n = e(t);
        if (ma) {
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
      }, a.queue = l, l = l.dispatch = Tv.bind(
        null,
        al,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = rt();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Yc(l);
      var t = l.queue, e = xr.bind(null, al, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Lc,
    useDeferredValue: function(l, t) {
      var e = rt();
      return Vc(e, l, t);
    },
    useTransition: function() {
      var l = Yc(!1);
      return l = gr.bind(
        null,
        al,
        l.queue,
        !0,
        !1
      ), rt().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = al, n = rt();
      if (hl) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), Dl === null)
          throw Error(o(349));
        (rl & 127) !== 0 || Jo(a, t, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: t };
      return n.queue = u, fr($o.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        wo.bind(
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
      var l = rt(), t = Dl.identifierPrefix;
      if (hl) {
        var e = wt, a = Jt;
        e = (a & ~(1 << 32 - Nt(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Xu++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = pv++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Kc,
    useFormState: ar,
    useActionState: ar,
    useOptimistic: function(l) {
      var t = rt();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Jc.bind(
        null,
        al,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: qc,
    useCacheRefresh: function() {
      return rt().memoizedState = Nv.bind(
        null,
        al
      );
    },
    useEffectEvent: function(l) {
      var t = rt(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((_l & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, wc = {
    readContext: nt,
    use: Vu,
    useCallback: hr,
    useContext: nt,
    useEffect: Xc,
    useImperativeHandle: mr,
    useInsertionEffect: or,
    useLayoutEffect: rr,
    useMemo: vr,
    useReducer: Zu,
    useRef: cr,
    useState: function() {
      return Zu(ce);
    },
    useDebugValue: Lc,
    useDeferredValue: function(l, t) {
      var e = wl();
      return yr(
        e,
        zl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Zu(ce)[0], t = wl().memoizedState;
      return [
        typeof l == "boolean" ? l : Cn(l),
        t
      ];
    },
    useSyncExternalStore: Ko,
    useId: Sr,
    useHostTransitionStatus: Kc,
    useFormState: nr,
    useActionState: nr,
    useOptimistic: function(l, t) {
      var e = wl();
      return ko(e, zl, l, t);
    },
    useMemoCache: qc,
    useCacheRefresh: _r
  };
  wc.useEffectEvent = sr;
  var jr = {
    readContext: nt,
    use: Vu,
    useCallback: hr,
    useContext: nt,
    useEffect: Xc,
    useImperativeHandle: mr,
    useInsertionEffect: or,
    useLayoutEffect: rr,
    useMemo: vr,
    useReducer: Gc,
    useRef: cr,
    useState: function() {
      return Gc(ce);
    },
    useDebugValue: Lc,
    useDeferredValue: function(l, t) {
      var e = wl();
      return zl === null ? Vc(e, l, t) : yr(
        e,
        zl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Gc(ce)[0], t = wl().memoizedState;
      return [
        typeof l == "boolean" ? l : Cn(l),
        t
      ];
    },
    useSyncExternalStore: Ko,
    useId: Sr,
    useHostTransitionStatus: Kc,
    useFormState: ir,
    useActionState: ir,
    useOptimistic: function(l, t) {
      var e = wl();
      return zl !== null ? ko(e, zl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: qc,
    useCacheRefresh: _r
  };
  jr.useEffectEvent = sr;
  function $c(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : R({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Fc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = Oe(a);
      n.payload = t, e != null && (n.callback = e), t = De(l, n, a), t !== null && (_t(t, l, a), On(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Mt(), n = Oe(a);
      n.tag = 1, n.payload = t, e != null && (n.callback = e), t = De(l, n, a), t !== null && (_t(t, l, a), On(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Mt(), a = Oe(e);
      a.tag = 2, t != null && (a.callback = t), t = De(l, a, e), t !== null && (_t(t, l, e), On(t, l, e));
    }
  };
  function zr(l, t, e, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !_n(e, a) || !_n(n, u) : !0;
  }
  function Ar(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Fc.enqueueReplaceState(t, t.state, null);
  }
  function ha(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = R({}, e));
      for (var n in l)
        e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Or(l) {
    Tu(l);
  }
  function Dr(l) {
    console.error(l);
  }
  function Mr(l) {
    Tu(l);
  }
  function $u(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Rr(l, t, e) {
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
    return e = Oe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      $u(l, t);
    }, e;
  }
  function Cr(l) {
    return l = Oe(l), l.tag = 3, l;
  }
  function Ur(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        Rr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Rr(t, e, a), typeof n != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function jv(l, t, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ba(
        t,
        e,
        n,
        !0
      ), e = zt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Qt === null ? ii() : e.alternate === null && Ll === 0 && (Ll = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Hu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), xf(l, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Hu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), xf(l, a, n)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return xf(l, a, n), ii(), !1;
    }
    if (hl)
      return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== vc && (l = Error(o(422), { cause: a }), Nn(qt(l, e)))) : (a !== vc && (t = Error(o(423), {
        cause: a
      }), Nn(
        qt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = qt(a, e), n = Wc(
        l.stateNode,
        a,
        n
      ), jc(l, n), Ll !== 4 && (Ll = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = qt(u, e), Vn === null ? Vn = [u] : Vn.push(u), Ll !== 4 && (Ll = 2), t === null) return !0;
    a = qt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = n & -n, e.lanes |= l, l = Wc(e.stateNode, a, l), jc(e, l), !1;
        case 1:
          if (t = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qe === null || !qe.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Cr(n), Ur(
              n,
              l,
              e,
              a
            ), jc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var kc = Error(o(461)), Wl = !1;
  function ut(l, t, e, a) {
    t.child = l === null ? Go(t, null, e, a) : da(
      t,
      l.child,
      e,
      a
    );
  }
  function Hr(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return fa(t), a = Rc(
      l,
      t,
      e,
      i,
      u,
      n
    ), f = Cc(), l !== null && !Wl ? (Uc(l, t, n), fe(l, t, n)) : (hl && f && mc(t), t.flags |= 1, ut(l, t, a, n), t.child);
  }
  function qr(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !oc(u) && u.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = u, Br(
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
    if (u = l.child, !uf(l, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : _n, e(i, a) && l.ref === t.ref)
        return fe(l, t, n);
    }
    return t.flags |= 1, l = ee(u, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Br(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (_n(u, a) && l.ref === t.ref)
        if (Wl = !1, t.pendingProps = a = u, uf(l, n))
          (l.flags & 131072) !== 0 && (Wl = !0);
        else
          return t.lanes = l.lanes, fe(l, t, n);
    }
    return Ic(
      l,
      t,
      e,
      a,
      n
    );
  }
  function Gr(l, t, e, a) {
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
        return Yr(
          l,
          t,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Cu(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Xo(t, u) : Ac(), Lo(t);
      else
        return a = t.lanes = 536870912, Yr(
          l,
          t,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Cu(t, u.cachePool), Xo(t, u), Re(), t.memoizedState = null) : (l !== null && Cu(t, null), Ac(), Re());
    return ut(l, t, n, e), t.child;
  }
  function qn(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Yr(l, t, e, a, n) {
    var u = xc();
    return u = u === null ? null : { parent: $l._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && Cu(t, null), Ac(), Lo(t), l !== null && Ba(l, t, a, !0), t.childLanes = n, null;
  }
  function Fu(l, t) {
    return t = ku(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Qr(l, t, e) {
    return da(t, l.child, null, e), l = Fu(t, t.pendingProps), l.flags |= 2, At(t), t.memoizedState = null, l;
  }
  function zv(l, t, e) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (hl) {
        if (a.mode === "hidden")
          return l = Fu(t, a), t.lanes = 536870912, qn(null, l);
        if (Dc(t), (l = ql) ? (l = Id(
          l,
          Yt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ne !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Eo(l), e.return = t, t.child = e, at = t, ql = null)) : l = null, l === null) throw je(t);
        return t.lanes = 536870912, null;
      }
      return Fu(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Dc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = Qr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Wl || Ba(l, t, e, !1), n = (e & l.childLanes) !== 0, Wl || n) {
        if (a = Dl, a !== null && (i = Os(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, na(l, i), _t(a, l, i), kc;
        ii(), t = Qr(
          l,
          t,
          e
        );
      } else
        l = u.treeContext, ql = Xt(i.nextSibling), at = t, hl = !0, Te = null, Yt = !1, l !== null && jo(t, l), t = Fu(t, a), t.flags |= 4096;
      return t;
    }
    return l = ee(l.child, {
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
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Ic(l, t, e, a, n) {
    return fa(t), e = Rc(
      l,
      t,
      e,
      a,
      void 0,
      n
    ), a = Cc(), l !== null && !Wl ? (Uc(l, t, n), fe(l, t, n)) : (hl && a && mc(t), t.flags |= 1, ut(l, t, e, n), t.child);
  }
  function Xr(l, t, e, a, n, u) {
    return fa(t), t.updateQueue = null, e = Zo(
      t,
      a,
      e,
      n
    ), Vo(l), a = Cc(), l !== null && !Wl ? (Uc(l, t, u), fe(l, t, u)) : (hl && a && mc(t), t.flags |= 1, ut(l, t, e, u), t.child);
  }
  function Lr(l, t, e, a, n) {
    if (fa(t), t.stateNode === null) {
      var u = Ca, i = e.contextType;
      typeof i == "object" && i !== null && (u = nt(i)), u = new e(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Fc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Nc(t), i = e.contextType, u.context = typeof i == "object" && i !== null ? nt(i) : Ca, u.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && ($c(
        t,
        e,
        i,
        a
      ), u.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Fc.enqueueReplaceState(u, u.state, null), Mn(t, a, u, n), Dn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = t.stateNode;
      var f = t.memoizedProps, r = ha(e, f);
      u.props = r;
      var b = u.context, T = e.contextType;
      i = Ca, typeof T == "object" && T !== null && (i = nt(T));
      var M = e.getDerivedStateFromProps;
      T = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== i) && Ar(
        t,
        u,
        a,
        i
      ), Ae = !1;
      var S = t.memoizedState;
      u.state = S, Mn(t, a, u, n), Dn(), b = t.memoizedState, f || S !== b || Ae ? (typeof M == "function" && ($c(
        t,
        e,
        M,
        a
      ), b = t.memoizedState), (r = Ae || zr(
        t,
        e,
        r,
        a,
        S,
        b,
        i
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = b), u.props = a, u.state = b, u.context = i, a = r) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, Tc(l, t), i = t.memoizedProps, T = ha(e, i), u.props = T, M = t.pendingProps, S = u.context, b = e.contextType, r = Ca, typeof b == "object" && b !== null && (r = nt(b)), f = e.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || S !== r) && Ar(
        t,
        u,
        a,
        r
      ), Ae = !1, S = t.memoizedState, u.state = S, Mn(t, a, u, n), Dn();
      var x = t.memoizedState;
      i !== M || S !== x || Ae || l !== null && l.dependencies !== null && Mu(l.dependencies) ? (typeof f == "function" && ($c(
        t,
        e,
        f,
        a
      ), x = t.memoizedState), (T = Ae || zr(
        t,
        e,
        T,
        a,
        S,
        x,
        r
      ) || l !== null && l.dependencies !== null && Mu(l.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, x, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        x,
        r
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = x), u.props = a, u.state = x, u.context = r, a = T) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, Wu(l, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, l !== null && a ? (t.child = da(
      t,
      l.child,
      null,
      n
    ), t.child = da(
      t,
      null,
      e,
      n
    )) : ut(l, t, e, n), t.memoizedState = u.state, l = t.child) : l = fe(
      l,
      t,
      n
    ), l;
  }
  function Vr(l, t, e, a) {
    return ia(), t.flags |= 256, ut(l, t, e, a), t.child;
  }
  var Pc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function lf(l) {
    return { baseLanes: l, cachePool: Ro() };
  }
  function tf(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Dt), l;
  }
  function Zr(l, t, e) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Jl.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (hl) {
        if (n ? Me(t) : Re(), (l = ql) ? (l = Id(
          l,
          Yt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ne !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Eo(l), e.return = t, t.child = e, at = t, ql = null)) : l = null, l === null) throw je(t);
        return Gf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Re(), n = t.mode, f = ku(
        { mode: "hidden", children: f },
        n
      ), a = ua(
        a,
        n,
        e,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = lf(e), a.childLanes = tf(
        l,
        i,
        e
      ), t.memoizedState = Pc, qn(null, a)) : (Me(t), ef(t, f));
    }
    var r = l.memoizedState;
    if (r !== null && (f = r.dehydrated, f !== null)) {
      if (u)
        t.flags & 256 ? (Me(t), t.flags &= -257, t = af(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Re(), t.child = l.child, t.flags |= 128, t = null) : (Re(), f = a.fallback, n = t.mode, a = ku(
          { mode: "visible", children: a.children },
          n
        ), f = ua(
          f,
          n,
          e,
          null
        ), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, da(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = lf(e), a.childLanes = tf(
          l,
          i,
          e
        ), t.memoizedState = Pc, t = qn(null, a));
      else if (Me(t), Gf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var b = i.dgst;
        i = b, a = Error(o(419)), a.stack = "", a.digest = i, Nn({ value: a, source: null, stack: null }), t = af(
          l,
          t,
          e
        );
      } else if (Wl || Ba(l, t, e, !1), i = (e & l.childLanes) !== 0, Wl || i) {
        if (i = Dl, i !== null && (a = Os(i, e), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, na(l, a), _t(i, l, a), kc;
        Bf(f) || ii(), t = af(
          l,
          t,
          e
        );
      } else
        Bf(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = r.treeContext, ql = Xt(
          f.nextSibling
        ), at = t, hl = !0, Te = null, Yt = !1, l !== null && jo(t, l), t = ef(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (Re(), f = a.fallback, n = t.mode, r = l.child, b = r.sibling, a = ee(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, b !== null ? f = ee(
      b,
      f
    ) : (f = ua(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, qn(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = lf(e) : (n = f.cachePool, n !== null ? (r = $l._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = Ro(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = tf(
      l,
      i,
      e
    ), t.memoizedState = Pc, qn(l.child, a)) : (Me(t), e = l.child, l = e.sibling, e = ee(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function ef(l, t) {
    return t = ku(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function ku(l, t) {
    return l = jt(22, l, null, t), l.lanes = 0, l;
  }
  function af(l, t, e) {
    return da(t, l.child, null, e), l = ef(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Kr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), pc(l.return, t, e);
  }
  function nf(l, t, e, a, n, u) {
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
  function Jr(l, t, e) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Jl.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, q(Jl, i), ut(l, t, a, e), a = hl ? En : 0, !f && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Kr(l, e, t);
        else if (l.tag === 19)
          Kr(l, e, t);
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
        e = n, e === null ? (n = t.child, t.child = null) : (n = e.sibling, e.sibling = null), nf(
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
        nf(
          t,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        nf(
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
  function fe(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), He |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Ba(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = ee(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = ee(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function uf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Mu(l)));
  }
  function Av(l, t, e) {
    switch (t.tag) {
      case 3:
        Zl(t, t.stateNode.containerInfo), ze(t, $l, l.memoizedState.cache), ia();
        break;
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        Zl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ze(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Dc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Me(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Zr(l, t, e) : (Me(t), l = fe(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        Me(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ba(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), n) {
          if (a)
            return Jr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), q(Jl, Jl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Gr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        ze(t, $l, l.memoizedState.cache);
    }
    return fe(l, t, e);
  }
  function wr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Wl = !0;
      else {
        if (!uf(l, e) && (t.flags & 128) === 0)
          return Wl = !1, Av(
            l,
            t,
            e
          );
        Wl = (l.flags & 131072) !== 0;
      }
    else
      Wl = !1, hl && (t.flags & 1048576) !== 0 && To(t, En, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = oa(t.elementType), t.type = l, typeof l == "function")
            oc(l) ? (a = ha(l, a), t.tag = 1, t = Lr(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Ic(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === J) {
                t.tag = 11, t = Hr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (n === Z) {
                t.tag = 14, t = qr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Vl(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ic(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, n = ha(
          a,
          t.pendingProps
        ), Lr(
          l,
          t,
          a,
          n,
          e
        );
      case 3:
        l: {
          if (Zl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(o(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Tc(l, t), Mn(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ze(t, $l, a), a !== u.cache && bc(
            t,
            [$l],
            e,
            !0
          ), Dn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Vr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== n) {
              n = qt(
                Error(o(424)),
                t
              ), Nn(n), t = Vr(
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
              for (ql = Xt(l.firstChild), at = t, hl = !0, Te = null, Yt = !0, e = Go(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ia(), a === n) {
              t = fe(
                l,
                t,
                e
              );
              break l;
            }
            ut(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Wu(l, t), l === null ? (e = nm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : hl || (e = t.type, l = t.pendingProps, a = mi(
          el.current
        ).createElement(e), a[et] = t, a[vt] = l, it(a, e, l), lt(a), t.stateNode = a) : t.memoizedState = nm(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return be(t), l === null && hl && (a = t.stateNode = tm(
          t.type,
          t.pendingProps,
          el.current
        ), at = t, Yt = !0, n = ql, Qe(t.type) ? (Yf = n, ql = Xt(a.firstChild)) : ql = n), ut(
          l,
          t,
          t.pendingProps.children,
          e
        ), Wu(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && hl && ((n = a = ql) && (a = n0(
          a,
          t.type,
          t.pendingProps,
          Yt
        ), a !== null ? (t.stateNode = a, at = t, ql = Xt(a.firstChild), Yt = !1, n = !0) : n = !1), n || je(t)), be(t), n = t.type, u = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, Uf(n, u) ? a = null : i !== null && Uf(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = Rc(
          l,
          t,
          bv,
          null,
          null,
          e
        ), kn._currentValue = n), Wu(l, t), ut(l, t, a, e), t.child;
      case 6:
        return l === null && hl && ((l = e = ql) && (e = u0(
          e,
          t.pendingProps,
          Yt
        ), e !== null ? (t.stateNode = e, at = t, ql = null, l = !0) : l = !1), l || je(t)), null;
      case 13:
        return Zr(l, t, e);
      case 4:
        return Zl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = da(
          t,
          null,
          a,
          e
        ) : ut(l, t, a, e), t.child;
      case 11:
        return Hr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return ut(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return ut(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return ut(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, ze(t, t.type, a.value), ut(l, t, a.children, e), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, fa(t), n = nt(n), a = a(n), t.flags |= 1, ut(l, t, a, e), t.child;
      case 14:
        return qr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Br(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Jr(l, t, e);
      case 31:
        return zv(l, t, e);
      case 22:
        return Gr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return fa(t), a = nt($l), l === null ? (n = xc(), n === null && (n = Dl, u = Sc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), t.memoizedState = { parent: a, cache: n }, Nc(t), ze(t, $l, n)) : ((l.lanes & e) !== 0 && (Tc(l, t), Mn(t, null, null, e), Dn()), n = l.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ze(t, $l, a)) : (a = u.cache, ze(t, $l, a), a !== n.cache && bc(
          t,
          [$l],
          e,
          !0
        ))), ut(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function se(l) {
    l.flags |= 4;
  }
  function cf(l, t, e, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Sd()) l.flags |= 8192;
        else
          throw ra = Hu, Ec;
    } else l.flags &= -16777217;
  }
  function $r(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !sm(t))
      if (Sd()) l.flags |= 8192;
      else
        throw ra = Hu, Ec;
  }
  function Iu(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? js() : 536870912, l.lanes |= t, Fa |= t);
  }
  function Bn(l, t) {
    if (!hl)
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
  function Bl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function Ov(l, t, e) {
    var a = t.pendingProps;
    switch (hc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Bl(t), null;
      case 1:
        return Bl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ue($l), Ql(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (qa(t) ? se(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, yc())), Bl(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return l === null ? (se(t), u !== null ? (Bl(t), $r(t, u)) : (Bl(t), cf(
          t,
          n,
          null,
          a,
          e
        ))) : u ? u !== l.memoizedState ? (se(t), Bl(t), $r(t, u)) : (Bl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && se(t), Bl(t), cf(
          t,
          n,
          l,
          a,
          e
        )), null;
      case 27:
        if (We(t), e = el.current, n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && se(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Bl(t), null;
          }
          l = G.current, qa(t) ? zo(t) : (l = tm(n, a, e), t.stateNode = l, se(t));
        }
        return Bl(t), null;
      case 5:
        if (We(t), n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && se(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Bl(t), null;
          }
          if (u = G.current, qa(t))
            zo(t);
          else {
            var i = mi(
              el.current
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
            u[et] = t, u[vt] = a;
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
            l: switch (it(u, n, a), n) {
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
            a && se(t);
          }
        }
        return Bl(t), cf(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && se(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = el.current, qa(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, n = at, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[et] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Zd(l.nodeValue, e)), l || je(t, !0);
          } else
            l = mi(l).createTextNode(
              a
            ), l[et] = t, t.stateNode = l;
        }
        return Bl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = qa(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[et] = t;
            } else
              ia(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Bl(t), l = !1;
          } else
            e = yc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Bl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = qa(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[et] = t;
            } else
              ia(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Bl(t), n = !1;
          } else
            n = yc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
        }
        return At(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Iu(t, t.updateQueue), Bl(t), null);
      case 4:
        return Ql(), l === null && Of(t.stateNode.containerInfo), Bl(t), null;
      case 10:
        return ue(t.type), Bl(t), null;
      case 19:
        if (D(Jl), a = t.memoizedState, a === null) return Bl(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Bn(a, !1);
          else {
            if (Ll !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (u = Yu(l), u !== null) {
                  for (t.flags |= 128, Bn(a, !1), l = u.updateQueue, t.updateQueue = l, Iu(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    xo(e, l), e = e.sibling;
                  return q(
                    Jl,
                    Jl.current & 1 | 2
                  ), hl && ae(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Hl() > ai && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = Yu(u), l !== null) {
              if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, Iu(t, l), Bn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !hl)
                return Bl(t), null;
            } else
              2 * Hl() - a.renderingStartTime > ai && e !== 536870912 && (t.flags |= 128, n = !0, Bn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (l = a.last, l !== null ? l.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Hl(), l.sibling = null, e = Jl.current, q(
          Jl,
          n ? e & 1 | 2 : e & 1
        ), hl && ae(t, a.treeForkCount), l) : (Bl(t), null);
      case 22:
      case 23:
        return At(t), Oc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Bl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Bl(t), e = t.updateQueue, e !== null && Iu(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && D(sa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), ue($l), Bl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Dv(l, t) {
    switch (hc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return ue($l), Ql(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return We(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (At(t), t.alternate === null)
            throw Error(o(340));
          ia();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (At(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          ia();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return D(Jl), null;
      case 4:
        return Ql(), null;
      case 10:
        return ue(t.type), null;
      case 22:
      case 23:
        return At(t), Oc(), l !== null && D(sa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return ue($l), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fr(l, t) {
    switch (hc(t), t.tag) {
      case 3:
        ue($l), Ql();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
        break;
      case 4:
        Ql();
        break;
      case 31:
        t.memoizedState !== null && At(t);
        break;
      case 13:
        At(t);
        break;
      case 19:
        D(Jl);
        break;
      case 10:
        ue(t.type);
        break;
      case 22:
      case 23:
        At(t), Oc(), l !== null && D(sa);
        break;
      case 24:
        ue($l);
    }
  }
  function Gn(l, t) {
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
      Tl(t, t.return, f);
    }
  }
  function Ce(l, t, e) {
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
              var r = e, b = f;
              try {
                b();
              } catch (T) {
                Tl(
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
      Tl(t, t.return, T);
    }
  }
  function Wr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Qo(t, e);
      } catch (a) {
        Tl(l, l.return, a);
      }
    }
  }
  function kr(l, t, e) {
    e.props = ha(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Tl(l, t, a);
    }
  }
  function Yn(l, t) {
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
      Tl(l, t, n);
    }
  }
  function $t(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Tl(l, t, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Tl(l, t, n);
        }
      else e.current = null;
  }
  function Ir(l) {
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
      Tl(l, l.return, n);
    }
  }
  function ff(l, t, e) {
    try {
      var a = l.stateNode;
      Iv(a, l.type, e, t), a[vt] = t;
    } catch (n) {
      Tl(l, l.return, n);
    }
  }
  function Pr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Qe(l.type) || l.tag === 4;
  }
  function sf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Pr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Qe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function of(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = le));
    else if (a !== 4 && (a === 27 && Qe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (of(l, t, e), l = l.sibling; l !== null; )
        of(l, t, e), l = l.sibling;
  }
  function Pu(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Qe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (Pu(l, t, e), l = l.sibling; l !== null; )
        Pu(l, t, e), l = l.sibling;
  }
  function ld(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      it(t, a, e), t[et] = l, t[vt] = e;
    } catch (u) {
      Tl(l, l.return, u);
    }
  }
  var oe = !1, kl = !1, rf = !1, td = typeof WeakSet == "function" ? WeakSet : Set, tt = null;
  function Mv(l, t) {
    if (l = l.containerInfo, Rf = Si, l = mo(l), ac(l)) {
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
            var i = 0, f = -1, r = -1, b = 0, T = 0, M = l, S = null;
            t: for (; ; ) {
              for (var x; M !== e || n !== 0 && M.nodeType !== 3 || (f = i + n), M !== u || a !== 0 && M.nodeType !== 3 || (r = i + a), M.nodeType === 3 && (i += M.nodeValue.length), (x = M.firstChild) !== null; )
                S = M, M = x;
              for (; ; ) {
                if (M === l) break t;
                if (S === e && ++b === n && (f = i), S === u && ++T === a && (r = i), (x = M.nextSibling) !== null) break;
                M = S, S = M.parentNode;
              }
              M = x;
            }
            e = f === -1 || r === -1 ? null : { start: f, end: r };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Cf = { focusedElem: l, selectionRange: e }, Si = !1, tt = t; tt !== null; )
      if (t = tt, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, tt = l;
      else
        for (; tt !== null; ) {
          switch (t = tt, u = t.alternate, l = t.flags, t.tag) {
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
                  var Q = ha(
                    e.type,
                    n
                  );
                  l = a.getSnapshotBeforeUpdate(
                    Q,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch ($) {
                  Tl(
                    e,
                    e.return,
                    $
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  qf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      qf(l);
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
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, tt = l;
            break;
          }
          tt = t.return;
        }
  }
  function ed(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        de(l, e), a & 4 && Gn(5, e);
        break;
      case 1:
        if (de(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              Tl(e, e.return, i);
            }
          else {
            var n = ha(
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
              Tl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Wr(e), a & 512 && Yn(e, e.return);
        break;
      case 3:
        if (de(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
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
            Qo(l, t);
          } catch (i) {
            Tl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && ld(e);
      case 26:
      case 5:
        de(l, e), t === null && a & 4 && Ir(e), a & 512 && Yn(e, e.return);
        break;
      case 12:
        de(l, e);
        break;
      case 31:
        de(l, e), a & 4 && ud(l, e);
        break;
      case 13:
        de(l, e), a & 4 && id(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Qv.bind(
          null,
          e
        ), i0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || oe, !a) {
          t = t !== null && t.memoizedState !== null || kl, n = oe;
          var u = kl;
          oe = a, (kl = t) && !u ? me(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : de(l, e), oe = n, kl = u;
        }
        break;
      case 30:
        break;
      default:
        de(l, e);
    }
  }
  function ad(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, ad(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Qi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Yl = null, gt = !1;
  function re(l, t, e) {
    for (e = e.child; e !== null; )
      nd(l, t, e), e = e.sibling;
  }
  function nd(l, t, e) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(It, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        kl || $t(e, t), re(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        kl || $t(e, t);
        var a = Yl, n = gt;
        Qe(e.type) && (Yl = e.stateNode, gt = !1), re(
          l,
          t,
          e
        ), $n(e.stateNode), Yl = a, gt = n;
        break;
      case 5:
        kl || $t(e, t);
      case 6:
        if (a = Yl, n = gt, Yl = null, re(
          l,
          t,
          e
        ), Yl = a, gt = n, Yl !== null)
          if (gt)
            try {
              (Yl.nodeType === 9 ? Yl.body : Yl.nodeName === "HTML" ? Yl.ownerDocument.body : Yl).removeChild(e.stateNode);
            } catch (u) {
              Tl(
                e,
                t,
                u
              );
            }
          else
            try {
              Yl.removeChild(e.stateNode);
            } catch (u) {
              Tl(
                e,
                t,
                u
              );
            }
        break;
      case 18:
        Yl !== null && (gt ? (l = Yl, Wd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), an(l)) : Wd(Yl, e.stateNode));
        break;
      case 4:
        a = Yl, n = gt, Yl = e.stateNode.containerInfo, gt = !0, re(
          l,
          t,
          e
        ), Yl = a, gt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ce(2, e, t), kl || Ce(4, e, t), re(
          l,
          t,
          e
        );
        break;
      case 1:
        kl || ($t(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && kr(
          e,
          t,
          a
        )), re(
          l,
          t,
          e
        );
        break;
      case 21:
        re(
          l,
          t,
          e
        );
        break;
      case 22:
        kl = (a = kl) || e.memoizedState !== null, re(
          l,
          t,
          e
        ), kl = a;
        break;
      default:
        re(
          l,
          t,
          e
        );
    }
  }
  function ud(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        an(l);
      } catch (e) {
        Tl(t, t.return, e);
      }
    }
  }
  function id(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        an(l);
      } catch (e) {
        Tl(t, t.return, e);
      }
  }
  function Rv(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new td()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new td()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function li(l, t) {
    var e = Rv(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Xv.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function pt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = l, i = t, f = i;
        l: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Qe(f.type)) {
                Yl = f.stateNode, gt = !1;
                break l;
              }
              break;
            case 5:
              Yl = f.stateNode, gt = !1;
              break l;
            case 3:
            case 4:
              Yl = f.stateNode.containerInfo, gt = !0;
              break l;
          }
          f = f.return;
        }
        if (Yl === null) throw Error(o(160));
        nd(u, i, n), Yl = null, gt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        cd(t, l), t = t.sibling;
  }
  var Zt = null;
  function cd(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        pt(t, l), bt(l), a & 4 && (Ce(3, l, l.return), Gn(3, l), Ce(5, l, l.return));
        break;
      case 1:
        pt(t, l), bt(l), a & 512 && (kl || e === null || $t(e, e.return)), a & 64 && oe && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Zt;
        if (pt(t, l), bt(l), a & 512 && (kl || e === null || $t(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[dn] || u[et] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), it(u, a, e), u[et] = l, lt(u), a = u;
                      break l;
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
                            break t;
                          }
                      }
                      u = n.createElement(a), it(u, a, e), n.head.appendChild(u);
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
                            break t;
                          }
                      }
                      u = n.createElement(a), it(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[et] = l, lt(u), a = u;
                }
                l.stateNode = a;
              } else
                fm(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = im(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? fm(
              n,
              l.type,
              l.stateNode
            ) : im(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && ff(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        pt(t, l), bt(l), a & 512 && (kl || e === null || $t(e, e.return)), e !== null && a & 4 && ff(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (pt(t, l), bt(l), a & 512 && (kl || e === null || $t(e, e.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            ja(n, "");
          } catch (Q) {
            Tl(l, l.return, Q);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, ff(
          l,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (rf = !0);
        break;
      case 6:
        if (pt(t, l), bt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (Q) {
            Tl(l, l.return, Q);
          }
        }
        break;
      case 3:
        if (yi = null, n = Zt, Zt = hi(t.containerInfo), pt(t, l), Zt = n, bt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            an(t.containerInfo);
          } catch (Q) {
            Tl(l, l.return, Q);
          }
        rf && (rf = !1, fd(l));
        break;
      case 4:
        a = Zt, Zt = hi(
          l.stateNode.containerInfo
        ), pt(t, l), bt(l), Zt = a;
        break;
      case 12:
        pt(t, l), bt(l);
        break;
      case 31:
        pt(t, l), bt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, li(l, a)));
        break;
      case 13:
        pt(t, l), bt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ei = Hl()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, li(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var r = e !== null && e.memoizedState !== null, b = oe, T = kl;
        if (oe = b || n, kl = T || r, pt(t, l), kl = T, oe = b, bt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (e === null || r || oe || kl || va(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                r = e = t;
                try {
                  if (u = r.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = r.stateNode;
                    var M = r.memoizedProps.style, S = M != null && M.hasOwnProperty("display") ? M.display : null;
                    f.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (Q) {
                  Tl(r, r.return, Q);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                r = t;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (Q) {
                  Tl(r, r.return, Q);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                r = t;
                try {
                  var x = r.stateNode;
                  n ? kd(x, !0) : kd(r.stateNode, !1);
                } catch (Q) {
                  Tl(r, r.return, Q);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, li(l, e))));
        break;
      case 19:
        pt(t, l), bt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, li(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        pt(t, l), bt(l);
    }
  }
  function bt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Pr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = sf(l);
            Pu(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (ja(i, ""), e.flags &= -33);
            var f = sf(l);
            Pu(l, f, i);
            break;
          case 3:
          case 4:
            var r = e.stateNode.containerInfo, b = sf(l);
            of(
              l,
              b,
              r
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        Tl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function fd(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        fd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function de(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        ed(l, t.alternate, t), t = t.sibling;
  }
  function va(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ce(4, t, t.return), va(t);
          break;
        case 1:
          $t(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && kr(
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
  function me(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = l, u = t, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          me(
            n,
            u,
            e
          ), Gn(4, u);
          break;
        case 1:
          if (me(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (b) {
              Tl(a, a.return, b);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Yo(r[n], f);
            } catch (b) {
              Tl(a, a.return, b);
            }
          }
          e && i & 64 && Wr(u), Yn(u, u.return);
          break;
        case 27:
          ld(u);
        case 26:
        case 5:
          me(
            n,
            u,
            e
          ), e && a === null && i & 4 && Ir(u), Yn(u, u.return);
          break;
        case 12:
          me(
            n,
            u,
            e
          );
          break;
        case 31:
          me(
            n,
            u,
            e
          ), e && i & 4 && ud(n, u);
          break;
        case 13:
          me(
            n,
            u,
            e
          ), e && i & 4 && id(n, u);
          break;
        case 22:
          u.memoizedState === null && me(
            n,
            u,
            e
          ), Yn(u, u.return);
          break;
        case 30:
          break;
        default:
          me(
            n,
            u,
            e
          );
      }
      t = t.sibling;
    }
  }
  function df(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Tn(e));
  }
  function mf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Tn(l));
  }
  function Kt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        sd(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function sd(l, t, e, a) {
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
        ), n & 2048 && Gn(9, t);
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
        ), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Tn(l)));
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
            Tl(t, t.return, r);
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
        ) : Qn(l, t) : u._visibility & 2 ? Kt(
          l,
          t,
          e,
          a
        ) : (u._visibility |= 2, Ja(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && df(i, t);
        break;
      case 24:
        Kt(
          l,
          t,
          e,
          a
        ), n & 2048 && mf(t.alternate, t);
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
  function Ja(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l, i = t, f = e, r = a, b = i.flags;
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
          ), Gn(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Ja(
            u,
            i,
            f,
            r,
            n
          ) : Qn(
            u,
            i
          ) : (T._visibility |= 2, Ja(
            u,
            i,
            f,
            r,
            n
          )), n && b & 2048 && df(
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
          ), n && b & 2048 && mf(i.alternate, i);
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
      t = t.sibling;
    }
  }
  function Qn(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Qn(e, a), n & 2048 && df(
              a.alternate,
              a
            );
            break;
          case 24:
            Qn(e, a), n & 2048 && mf(a.alternate, a);
            break;
          default:
            Qn(e, a);
        }
        t = t.sibling;
      }
  }
  var Xn = 8192;
  function wa(l, t, e) {
    if (l.subtreeFlags & Xn)
      for (l = l.child; l !== null; )
        od(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function od(l, t, e) {
    switch (l.tag) {
      case 26:
        wa(
          l,
          t,
          e
        ), l.flags & Xn && l.memoizedState !== null && p0(
          e,
          Zt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        wa(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Zt;
        Zt = hi(l.stateNode.containerInfo), wa(
          l,
          t,
          e
        ), Zt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Xn, Xn = 16777216, wa(
          l,
          t,
          e
        ), Xn = a) : wa(
          l,
          t,
          e
        ));
        break;
      default:
        wa(
          l,
          t,
          e
        );
    }
  }
  function rd(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Ln(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          tt = a, md(
            a,
            l
          );
        }
      rd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        dd(l), l = l.sibling;
  }
  function dd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ln(l), l.flags & 2048 && Ce(9, l, l.return);
        break;
      case 3:
        Ln(l);
        break;
      case 12:
        Ln(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, ti(l)) : Ln(l);
        break;
      default:
        Ln(l);
    }
  }
  function ti(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          tt = a, md(
            a,
            l
          );
        }
      rd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Ce(8, t, t.return), ti(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, ti(t));
          break;
        default:
          ti(t);
      }
      l = l.sibling;
    }
  }
  function md(l, t) {
    for (; tt !== null; ) {
      var e = tt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ce(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Tn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, tt = a;
      else
        l: for (e = l; tt !== null; ) {
          a = tt;
          var n = a.sibling, u = a.return;
          if (ad(a), a === e) {
            tt = null;
            break l;
          }
          if (n !== null) {
            n.return = u, tt = n;
            break l;
          }
          tt = u;
        }
    }
  }
  var Cv = {
    getCacheForType: function(l) {
      var t = nt($l), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return nt($l).controller.signal;
    }
  }, Uv = typeof WeakMap == "function" ? WeakMap : Map, _l = 0, Dl = null, sl = null, rl = 0, Nl = 0, Ot = null, Ue = !1, $a = !1, hf = !1, he = 0, Ll = 0, He = 0, ya = 0, vf = 0, Dt = 0, Fa = 0, Vn = null, St = null, yf = !1, ei = 0, hd = 0, ai = 1 / 0, ni = null, qe = null, Il = 0, Be = null, Wa = null, ve = 0, gf = 0, pf = null, vd = null, Zn = 0, bf = null;
  function Mt() {
    return (_l & 2) !== 0 && rl !== 0 ? rl & -rl : E.T !== null ? Tf() : Ds();
  }
  function yd() {
    if (Dt === 0)
      if ((rl & 536870912) === 0 || hl) {
        var l = du;
        du <<= 1, (du & 3932160) === 0 && (du = 262144), Dt = l;
      } else Dt = 536870912;
    return l = zt.current, l !== null && (l.flags |= 32), Dt;
  }
  function _t(l, t, e) {
    (l === Dl && (Nl === 2 || Nl === 9) || l.cancelPendingCommit !== null) && (ka(l, 0), Ge(
      l,
      rl,
      Dt,
      !1
    )), rn(l, e), ((_l & 2) === 0 || l !== Dl) && (l === Dl && ((_l & 2) === 0 && (ya |= e), Ll === 4 && Ge(
      l,
      rl,
      Dt,
      !1
    )), Ft(l));
  }
  function gd(l, t, e) {
    if ((_l & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || on(l, t), n = a ? Bv(l, t) : _f(l, t, !0), u = a;
    do {
      if (n === 0) {
        $a && !a && Ge(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, u && !Hv(e)) {
          n = _f(l, t, !1), u = !1;
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
              n = Vn;
              var r = f.current.memoizedState.isDehydrated;
              if (r && (ka(f, i).flags |= 256), i = _f(
                f,
                i,
                !1
              ), i !== 2) {
                if (hf && !r) {
                  f.errorRecoveryDisabledLanes |= u, ya |= u, n = 4;
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
          ka(l, 0), Ge(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ge(
                a,
                t,
                Dt,
                !Ue
              );
              break l;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = ei + 300 - Hl(), 10 < n)) {
            if (Ge(
              a,
              t,
              Dt,
              !Ue
            ), hu(a, 0, !0) !== 0) break l;
            ve = t, a.timeoutHandle = $d(
              pd.bind(
                null,
                a,
                e,
                St,
                ni,
                yf,
                t,
                Dt,
                ya,
                Fa,
                Ue,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break l;
          }
          pd(
            a,
            e,
            St,
            ni,
            yf,
            t,
            Dt,
            ya,
            Fa,
            Ue,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ft(l);
  }
  function pd(l, t, e, a, n, u, i, f, r, b, T, M, S, x) {
    if (l.timeoutHandle = -1, M = t.subtreeFlags, M & 8192 || (M & 16785408) === 16785408) {
      M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: le
      }, od(
        t,
        u,
        M
      );
      var Q = (u & 62914560) === u ? ei - Hl() : (u & 4194048) === u ? hd - Hl() : 0;
      if (Q = b0(
        M,
        Q
      ), Q !== null) {
        ve = u, l.cancelPendingCommit = Q(
          jd.bind(
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
            M,
            null,
            S,
            x
          )
        ), Ge(l, u, i, !b);
        return;
      }
    }
    jd(
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
  function Hv(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Tt(u(), n)) return !1;
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
  function Ge(l, t, e, a) {
    t &= ~vf, t &= ~ya, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Nt(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && zs(l, e, t);
  }
  function ui() {
    return (_l & 6) === 0 ? (Kn(0), !1) : !0;
  }
  function Sf() {
    if (sl !== null) {
      if (Nl === 0)
        var l = sl.return;
      else
        l = sl, ne = ca = null, Hc(l), Xa = null, zn = 0, l = sl;
      for (; l !== null; )
        Fr(l.alternate, l), l = l.return;
      sl = null;
    }
  }
  function ka(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, t0(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), ve = 0, Sf(), Dl = l, sl = e = ee(l.current, null), rl = t, Nl = 0, Ot = null, Ue = !1, $a = on(l, t), hf = !1, Fa = Dt = vf = ya = He = Ll = 0, St = Vn = null, yf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - Nt(a), u = 1 << n;
        t |= l[n], a &= ~u;
      }
    return he = t, ju(), e;
  }
  function bd(l, t) {
    al = null, E.H = Hn, t === Qa || t === Uu ? (t = Ho(), Nl = 3) : t === Ec ? (t = Ho(), Nl = 4) : Nl = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, sl === null && (Ll = 1, $u(
      l,
      qt(t, l.current)
    ));
  }
  function Sd() {
    var l = zt.current;
    return l === null ? !0 : (rl & 4194048) === rl ? Qt === null : (rl & 62914560) === rl || (rl & 536870912) !== 0 ? l === Qt : !1;
  }
  function _d() {
    var l = E.H;
    return E.H = Hn, l === null ? Hn : l;
  }
  function xd() {
    var l = E.A;
    return E.A = Cv, l;
  }
  function ii() {
    Ll = 4, Ue || (rl & 4194048) !== rl && zt.current !== null || ($a = !0), (He & 134217727) === 0 && (ya & 134217727) === 0 || Dl === null || Ge(
      Dl,
      rl,
      Dt,
      !1
    );
  }
  function _f(l, t, e) {
    var a = _l;
    _l |= 2;
    var n = _d(), u = xd();
    (Dl !== l || rl !== t) && (ni = null, ka(l, t)), t = !1;
    var i = Ll;
    l: do
      try {
        if (Nl !== 0 && sl !== null) {
          var f = sl, r = Ot;
          switch (Nl) {
            case 8:
              Sf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (t = !0);
              var b = Nl;
              if (Nl = 0, Ot = null, Ia(l, f, r, b), e && $a) {
                i = 0;
                break l;
              }
              break;
            default:
              b = Nl, Nl = 0, Ot = null, Ia(l, f, r, b);
          }
        }
        qv(), i = Ll;
        break;
      } catch (T) {
        bd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, ne = ca = null, _l = a, E.H = n, E.A = u, sl === null && (Dl = null, rl = 0, ju()), i;
  }
  function qv() {
    for (; sl !== null; ) Ed(sl);
  }
  function Bv(l, t) {
    var e = _l;
    _l |= 2;
    var a = _d(), n = xd();
    Dl !== l || rl !== t ? (ni = null, ai = Hl() + 500, ka(l, t)) : $a = on(
      l,
      t
    );
    l: do
      try {
        if (Nl !== 0 && sl !== null) {
          t = sl;
          var u = Ot;
          t: switch (Nl) {
            case 1:
              Nl = 0, Ot = null, Ia(l, t, u, 1);
              break;
            case 2:
            case 9:
              if (Co(u)) {
                Nl = 0, Ot = null, Nd(t);
                break;
              }
              t = function() {
                Nl !== 2 && Nl !== 9 || Dl !== l || (Nl = 7), Ft(l);
              }, u.then(t, t);
              break l;
            case 3:
              Nl = 7;
              break l;
            case 4:
              Nl = 5;
              break l;
            case 7:
              Co(u) ? (Nl = 0, Ot = null, Nd(t)) : (Nl = 0, Ot = null, Ia(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (sl.tag) {
                case 26:
                  i = sl.memoizedState;
                case 5:
                case 27:
                  var f = sl;
                  if (i ? sm(i) : f.stateNode.complete) {
                    Nl = 0, Ot = null;
                    var r = f.sibling;
                    if (r !== null) sl = r;
                    else {
                      var b = f.return;
                      b !== null ? (sl = b, ci(b)) : sl = null;
                    }
                    break t;
                  }
              }
              Nl = 0, Ot = null, Ia(l, t, u, 5);
              break;
            case 6:
              Nl = 0, Ot = null, Ia(l, t, u, 6);
              break;
            case 8:
              Sf(), Ll = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        Gv();
        break;
      } catch (T) {
        bd(l, T);
      }
    while (!0);
    return ne = ca = null, E.H = a, E.A = n, _l = e, sl !== null ? 0 : (Dl = null, rl = 0, ju(), Ll);
  }
  function Gv() {
    for (; sl !== null && !mt(); )
      Ed(sl);
  }
  function Ed(l) {
    var t = wr(l.alternate, l, he);
    l.memoizedProps = l.pendingProps, t === null ? ci(l) : sl = t;
  }
  function Nd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Xr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          rl
        );
        break;
      case 11:
        t = Xr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          rl
        );
        break;
      case 5:
        Hc(t);
      default:
        Fr(e, t), t = sl = xo(t, he), t = wr(e, t, he);
    }
    l.memoizedProps = l.pendingProps, t === null ? ci(l) : sl = t;
  }
  function Ia(l, t, e, a) {
    ne = ca = null, Hc(t), Xa = null, zn = 0;
    var n = t.return;
    try {
      if (jv(
        l,
        n,
        t,
        e,
        rl
      )) {
        Ll = 1, $u(
          l,
          qt(e, l.current)
        ), sl = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw sl = n, u;
      Ll = 1, $u(
        l,
        qt(e, l.current)
      ), sl = null;
      return;
    }
    t.flags & 32768 ? (hl || a === 1 ? l = !0 : $a || (rl & 536870912) !== 0 ? l = !1 : (Ue = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = zt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Td(t, l)) : ci(t);
  }
  function ci(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Td(
          t,
          Ue
        );
        return;
      }
      l = t.return;
      var e = Ov(
        t.alternate,
        t,
        he
      );
      if (e !== null) {
        sl = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        sl = t;
        return;
      }
      sl = t = l;
    } while (t !== null);
    Ll === 0 && (Ll = 5);
  }
  function Td(l, t) {
    do {
      var e = Dv(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, sl = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        sl = l;
        return;
      }
      sl = l = e;
    } while (l !== null);
    Ll = 6, sl = null;
  }
  function jd(l, t, e, a, n, u, i, f, r) {
    l.cancelPendingCommit = null;
    do
      fi();
    while (Il !== 0);
    if ((_l & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (u = t.lanes | t.childLanes, u |= fc, gh(
        l,
        e,
        u,
        i,
        f,
        r
      ), l === Dl && (sl = Dl = null, rl = 0), Wa = t, Be = l, ve = e, gf = u, pf = n, vd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Lv(Ie, function() {
        return Md(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, n = B.p, B.p = 2, i = _l, _l |= 4;
        try {
          Mv(l, t, e);
        } finally {
          _l = i, B.p = n, E.T = a;
        }
      }
      Il = 1, zd(), Ad(), Od();
    }
  }
  function zd() {
    if (Il === 1) {
      Il = 0;
      var l = Be, t = Wa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = B.p;
        B.p = 2;
        var n = _l;
        _l |= 4;
        try {
          cd(t, l);
          var u = Cf, i = mo(l.containerInfo), f = u.focusedElem, r = u.selectionRange;
          if (i !== f && f && f.ownerDocument && ro(
            f.ownerDocument.documentElement,
            f
          )) {
            if (r !== null && ac(f)) {
              var b = r.start, T = r.end;
              if (T === void 0 && (T = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  T,
                  f.value.length
                );
              else {
                var M = f.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var x = S.getSelection(), Q = f.textContent.length, $ = Math.min(r.start, Q), Ol = r.end === void 0 ? $ : Math.min(r.end, Q);
                  !x.extend && $ > Ol && (i = Ol, Ol = $, $ = i);
                  var y = oo(
                    f,
                    $
                  ), d = oo(
                    f,
                    Ol
                  );
                  if (y && d && (x.rangeCount !== 1 || x.anchorNode !== y.node || x.anchorOffset !== y.offset || x.focusNode !== d.node || x.focusOffset !== d.offset)) {
                    var p = M.createRange();
                    p.setStart(y.node, y.offset), x.removeAllRanges(), $ > Ol ? (x.addRange(p), x.extend(d.node, d.offset)) : (p.setEnd(d.node, d.offset), x.addRange(p));
                  }
                }
              }
            }
            for (M = [], x = f; x = x.parentNode; )
              x.nodeType === 1 && M.push({
                element: x,
                left: x.scrollLeft,
                top: x.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < M.length; f++) {
              var z = M[f];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          Si = !!Rf, Cf = Rf = null;
        } finally {
          _l = n, B.p = a, E.T = e;
        }
      }
      l.current = t, Il = 2;
    }
  }
  function Ad() {
    if (Il === 2) {
      Il = 0;
      var l = Be, t = Wa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = B.p;
        B.p = 2;
        var n = _l;
        _l |= 4;
        try {
          ed(l, t.alternate, t);
        } finally {
          _l = n, B.p = a, E.T = e;
        }
      }
      Il = 3;
    }
  }
  function Od() {
    if (Il === 4 || Il === 3) {
      Il = 0, Kl();
      var l = Be, t = Wa, e = ve, a = vd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Il = 5 : (Il = 0, Wa = Be = null, Dd(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (qe = null), Gi(e), t = t.stateNode, Et && typeof Et.onCommitFiberRoot == "function")
        try {
          Et.onCommitFiberRoot(
            It,
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
      (ve & 3) !== 0 && fi(), Ft(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === bf ? Zn++ : (Zn = 0, bf = l) : Zn = 0, Kn(0);
    }
  }
  function Dd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Tn(t)));
  }
  function fi() {
    return zd(), Ad(), Od(), Md();
  }
  function Md() {
    if (Il !== 5) return !1;
    var l = Be, t = gf;
    gf = 0;
    var e = Gi(ve), a = E.T, n = B.p;
    try {
      B.p = 32 > e ? 32 : e, E.T = null, e = pf, pf = null;
      var u = Be, i = ve;
      if (Il = 0, Wa = Be = null, ve = 0, (_l & 6) !== 0) throw Error(o(331));
      var f = _l;
      if (_l |= 4, dd(u.current), sd(
        u,
        u.current,
        i,
        e
      ), _l = f, Kn(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
        try {
          Et.onPostCommitFiberRoot(It, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = n, E.T = a, Dd(l, t);
    }
  }
  function Rd(l, t, e) {
    t = qt(e, t), t = Wc(l.stateNode, t, 2), l = De(l, t, 2), l !== null && (rn(l, 2), Ft(l));
  }
  function Tl(l, t, e) {
    if (l.tag === 3)
      Rd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Rd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            l = qt(e, l), e = Cr(2), a = De(t, e, 2), a !== null && (Ur(
              e,
              a,
              t,
              l
            ), rn(a, 2), Ft(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function xf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Uv();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(e) || (hf = !0, n.add(e), l = Yv.bind(null, l, t, e), t.then(l, l));
  }
  function Yv(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Dl === l && (rl & e) === e && (Ll === 4 || Ll === 3 && (rl & 62914560) === rl && 300 > Hl() - ei ? (_l & 2) === 0 && ka(l, 0) : vf |= e, Fa === rl && (Fa = 0)), Ft(l);
  }
  function Cd(l, t) {
    t === 0 && (t = js()), l = na(l, t), l !== null && (rn(l, t), Ft(l));
  }
  function Qv(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Cd(l, e);
  }
  function Xv(l, t) {
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
        throw Error(o(314));
    }
    a !== null && a.delete(t), Cd(l, e);
  }
  function Lv(l, t) {
    return Ul(l, t);
  }
  var si = null, Pa = null, Ef = !1, oi = !1, Nf = !1, Ye = 0;
  function Ft(l) {
    l !== Pa && l.next === null && (Pa === null ? si = Pa = l : Pa = Pa.next = l), oi = !0, Ef || (Ef = !0, Zv());
  }
  function Kn(l, t) {
    if (!Nf && oi) {
      Nf = !0;
      do
        for (var e = !1, a = si; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - Nt(42 | l) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Bd(a, u));
          } else
            u = rl, u = hu(
              a,
              a === Dl ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || on(a, u) || (e = !0, Bd(a, u));
          a = a.next;
        }
      while (e);
      Nf = !1;
    }
  }
  function Vv() {
    Ud();
  }
  function Ud() {
    oi = Ef = !1;
    var l = 0;
    Ye !== 0 && l0() && (l = Ye);
    for (var t = Hl(), e = null, a = si; a !== null; ) {
      var n = a.next, u = Hd(a, t);
      u === 0 ? (a.next = null, e === null ? si = n : e.next = n, n === null && (Pa = e)) : (e = a, (l !== 0 || (u & 3) !== 0) && (oi = !0)), a = n;
    }
    Il !== 0 && Il !== 5 || Kn(l), Ye !== 0 && (Ye = 0);
  }
  function Hd(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Nt(u), f = 1 << i, r = n[i];
      r === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = yh(f, t)) : r <= t && (l.expiredLanes |= f), u &= ~f;
    }
    if (t = Dl, e = rl, e = hu(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (Nl === 2 || Nl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && dt(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || on(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && dt(a), Gi(e)) {
        case 2:
        case 8:
          e = fn;
          break;
        case 32:
          e = Ie;
          break;
        case 268435456:
          e = Rt;
          break;
        default:
          e = Ie;
      }
      return a = qd.bind(null, l), e = Ul(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && dt(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function qd(l, t) {
    if (Il !== 0 && Il !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (fi() && l.callbackNode !== e)
      return null;
    var a = rl;
    return a = hu(
      l,
      l === Dl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (gd(l, a, t), Hd(l, Hl()), l.callbackNode != null && l.callbackNode === e ? qd.bind(null, l) : null);
  }
  function Bd(l, t) {
    if (fi()) return null;
    gd(l, t, !0);
  }
  function Zv() {
    e0(function() {
      (_l & 6) !== 0 ? Ul(
        Se,
        Vv
      ) : Ud();
    });
  }
  function Tf() {
    if (Ye === 0) {
      var l = Ga;
      l === 0 && (l = ru, ru <<= 1, (ru & 261888) === 0 && (ru = 256)), Ye = l;
    }
    return Ye;
  }
  function Gd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : pu("" + l);
  }
  function Yd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Kv(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = Gd(
        (n[vt] || null).action
      ), i = a.submitter;
      i && (t = (t = i[vt] || null) ? Gd(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var f = new xu(
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
                if (Ye !== 0) {
                  var r = i ? Yd(n, i) : new FormData(n);
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
                typeof u == "function" && (f.preventDefault(), r = i ? Yd(n, i) : new FormData(n), Zc(
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
  for (var jf = 0; jf < cc.length; jf++) {
    var zf = cc[jf], Jv = zf.toLowerCase(), wv = zf[0].toUpperCase() + zf.slice(1);
    Vt(
      Jv,
      "on" + wv
    );
  }
  Vt(yo, "onAnimationEnd"), Vt(go, "onAnimationIteration"), Vt(po, "onAnimationStart"), Vt("dblclick", "onDoubleClick"), Vt("focusin", "onFocus"), Vt("focusout", "onBlur"), Vt(sv, "onTransitionRun"), Vt(ov, "onTransitionStart"), Vt(rv, "onTransitionCancel"), Vt(bo, "onTransitionEnd"), Na("onMouseEnter", ["mouseout", "mouseover"]), Na("onMouseLeave", ["mouseout", "mouseover"]), Na("onPointerEnter", ["pointerout", "pointerover"]), Na("onPointerLeave", ["pointerout", "pointerover"]), la(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), la(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), la("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), la(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), la(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), la(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), $v = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jn)
  );
  function Qd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], r = f.instance, b = f.currentTarget;
            if (f = f.listener, r !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (T) {
              Tu(T);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], r = f.instance, b = f.currentTarget, f = f.listener, r !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (T) {
              Tu(T);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function ol(l, t) {
    var e = t[Yi];
    e === void 0 && (e = t[Yi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Xd(t, l, 2, !1), e.add(a));
  }
  function Af(l, t, e) {
    var a = 0;
    t && (a |= 4), Xd(
      e,
      l,
      a,
      t
    );
  }
  var ri = "_reactListening" + Math.random().toString(36).slice(2);
  function Of(l) {
    if (!l[ri]) {
      l[ri] = !0, Cs.forEach(function(e) {
        e !== "selectionchange" && ($v.has(e) || Af(e, !1, l), Af(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[ri] || (t[ri] = !0, Af("selectionchange", !1, t));
    }
  }
  function Xd(l, t, e, a) {
    switch (ym(t)) {
      case 2:
        var n = x0;
        break;
      case 8:
        n = E0;
        break;
      default:
        n = Zf;
    }
    e = n.bind(
      null,
      t,
      e,
      l
    ), n = void 0, !$i || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, e, !0) : n !== void 0 ? l.addEventListener(t, e, {
      passive: n
    }) : l.addEventListener(t, e, !1);
  }
  function Df(l, t, e, a, n) {
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
            if (i = _a(f), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = i;
              continue l;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Ks(function() {
      var b = u, T = Ji(e), M = [];
      l: {
        var S = So.get(l);
        if (S !== void 0) {
          var x = xu, Q = l;
          switch (l) {
            case "keypress":
              if (Su(e) === 0) break l;
            case "keydown":
            case "keyup":
              x = Xh;
              break;
            case "focusin":
              Q = "focus", x = Ii;
              break;
            case "focusout":
              Q = "blur", x = Ii;
              break;
            case "beforeblur":
            case "afterblur":
              x = Ii;
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
              x = $s;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = Oh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Zh;
              break;
            case yo:
            case go:
            case po:
              x = Rh;
              break;
            case bo:
              x = Jh;
              break;
            case "scroll":
            case "scrollend":
              x = zh;
              break;
            case "wheel":
              x = $h;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = Uh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = Ws;
              break;
            case "toggle":
            case "beforetoggle":
              x = Wh;
          }
          var $ = (t & 4) !== 0, Ol = !$ && (l === "scroll" || l === "scrollend"), y = $ ? S !== null ? S + "Capture" : null : S;
          $ = [];
          for (var d = b, p; d !== null; ) {
            var z = d;
            if (p = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || p === null || y === null || (z = hn(d, y), z != null && $.push(
              wn(d, z, p)
            )), Ol) break;
            d = d.return;
          }
          0 < $.length && (S = new x(
            S,
            Q,
            null,
            e,
            T
          ), M.push({ event: S, listeners: $ }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (S = l === "mouseover" || l === "pointerover", x = l === "mouseout" || l === "pointerout", S && e !== Ki && (Q = e.relatedTarget || e.fromElement) && (_a(Q) || Q[Sa]))
            break l;
          if ((x || S) && (S = T.window === T ? T : (S = T.ownerDocument) ? S.defaultView || S.parentWindow : window, x ? (Q = e.relatedTarget || e.toElement, x = b, Q = Q ? _a(Q) : null, Q !== null && (Ol = C(Q), $ = Q.tag, Q !== Ol || $ !== 5 && $ !== 27 && $ !== 6) && (Q = null)) : (x = null, Q = b), x !== Q)) {
            if ($ = $s, z = "onMouseLeave", y = "onMouseEnter", d = "mouse", (l === "pointerout" || l === "pointerover") && ($ = Ws, z = "onPointerLeave", y = "onPointerEnter", d = "pointer"), Ol = x == null ? S : mn(x), p = Q == null ? S : mn(Q), S = new $(
              z,
              d + "leave",
              x,
              e,
              T
            ), S.target = Ol, S.relatedTarget = p, z = null, _a(T) === b && ($ = new $(
              y,
              d + "enter",
              Q,
              e,
              T
            ), $.target = p, $.relatedTarget = Ol, z = $), Ol = z, x && Q)
              t: {
                for ($ = Fv, y = x, d = Q, p = 0, z = y; z; z = $(z))
                  p++;
                z = 0;
                for (var K = d; K; K = $(K))
                  z++;
                for (; 0 < p - z; )
                  y = $(y), p--;
                for (; 0 < z - p; )
                  d = $(d), z--;
                for (; p--; ) {
                  if (y === d || d !== null && y === d.alternate) {
                    $ = y;
                    break t;
                  }
                  y = $(y), d = $(d);
                }
                $ = null;
              }
            else $ = null;
            x !== null && Ld(
              M,
              S,
              x,
              $,
              !1
            ), Q !== null && Ol !== null && Ld(
              M,
              Ol,
              Q,
              $,
              !0
            );
          }
        }
        l: {
          if (S = b ? mn(b) : window, x = S.nodeName && S.nodeName.toLowerCase(), x === "select" || x === "input" && S.type === "file")
            var pl = no;
          else if (eo(S))
            if (uo)
              pl = iv;
            else {
              pl = nv;
              var L = av;
            }
          else
            x = S.nodeName, !x || x.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? b && Zi(b.elementType) && (pl = no) : pl = uv;
          if (pl && (pl = pl(l, b))) {
            ao(
              M,
              pl,
              e,
              T
            );
            break l;
          }
          L && L(l, S, b), l === "focusout" && b && S.type === "number" && b.memoizedProps.value != null && Vi(S, "number", S.value);
        }
        switch (L = b ? mn(b) : window, l) {
          case "focusin":
            (eo(L) || L.contentEditable === "true") && (Da = L, nc = b, xn = null);
            break;
          case "focusout":
            xn = nc = Da = null;
            break;
          case "mousedown":
            uc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            uc = !1, ho(M, e, T);
            break;
          case "selectionchange":
            if (fv) break;
          case "keydown":
          case "keyup":
            ho(M, e, T);
        }
        var nl;
        if (lc)
          l: {
            switch (l) {
              case "compositionstart":
                var dl = "onCompositionStart";
                break l;
              case "compositionend":
                dl = "onCompositionEnd";
                break l;
              case "compositionupdate":
                dl = "onCompositionUpdate";
                break l;
            }
            dl = void 0;
          }
        else
          Oa ? lo(l, e) && (dl = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (dl = "onCompositionStart");
        dl && (ks && e.locale !== "ko" && (Oa || dl !== "onCompositionStart" ? dl === "onCompositionEnd" && Oa && (nl = Js()) : (Ee = T, Fi = "value" in Ee ? Ee.value : Ee.textContent, Oa = !0)), L = di(b, dl), 0 < L.length && (dl = new Fs(
          dl,
          l,
          null,
          e,
          T
        ), M.push({ event: dl, listeners: L }), nl ? dl.data = nl : (nl = to(e), nl !== null && (dl.data = nl)))), (nl = Ih ? Ph(l, e) : lv(l, e)) && (dl = di(b, "onBeforeInput"), 0 < dl.length && (L = new Fs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), M.push({
          event: L,
          listeners: dl
        }), L.data = nl)), Kv(
          M,
          l,
          b,
          e,
          T
        );
      }
      Qd(M, t);
    });
  }
  function wn(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function di(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = hn(l, e), n != null && a.unshift(
        wn(l, n, u)
      ), n = hn(l, t), n != null && a.push(
        wn(l, n, u)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Fv(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Ld(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var f = e, r = f.alternate, b = f.stateNode;
      if (f = f.tag, r !== null && r === a) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (r = b, n ? (b = hn(e, u), b != null && i.unshift(
        wn(e, b, r)
      )) : n || (b = hn(e, u), b != null && i.push(
        wn(e, b, r)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Wv = /\r\n?/g, kv = /\u0000|\uFFFD/g;
  function Vd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Wv, `
`).replace(kv, "");
  }
  function Zd(l, t) {
    return t = Vd(t), Vd(l) === t;
  }
  function Al(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ja(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ja(l, "" + a);
        break;
      case "className":
        yu(l, "class", a);
        break;
      case "tabIndex":
        yu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        yu(l, e, a);
        break;
      case "style":
        Vs(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          yu(l, "data", a);
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
        a = pu("" + a), l.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (t !== "input" && Al(l, t, "name", n.name, n, null), Al(
            l,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Al(
            l,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Al(
            l,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Al(l, t, "encType", n.encType, n, null), Al(l, t, "method", n.method, n, null), Al(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = pu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = le);
        break;
      case "onScroll":
        a != null && ol("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ol("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
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
        e = pu("" + a), l.setAttributeNS(
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
        ol("beforetoggle", l), ol("toggle", l), vu(l, "popover", a);
        break;
      case "xlinkActuate":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Pt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Pt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Pt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Pt(
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
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Th.get(e) || e, vu(l, e, a));
    }
  }
  function Mf(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        Vs(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ja(l, a) : (typeof a == "number" || typeof a == "bigint") && ja(l, "" + a);
        break;
      case "onScroll":
        a != null && ol("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ol("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = le);
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
          l: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), t = e.slice(2, n ? e.length - 7 : void 0), u = l[vt] || null, u = u != null ? u[e] : null, typeof u == "function" && l.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, n);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : vu(l, e, a);
          }
    }
  }
  function it(l, t, e) {
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
        ol("error", l), ol("load", l);
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
                  throw Error(o(137, t));
                default:
                  Al(l, t, u, i, e, null);
              }
          }
        n && Al(l, t, "srcSet", e.srcSet, e, null), a && Al(l, t, "src", e.src, e, null);
        return;
      case "input":
        ol("invalid", l);
        var f = u = i = n = null, r = null, b = null;
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
                  b = T;
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
                    throw Error(o(137, t));
                  break;
                default:
                  Al(l, t, a, T, e, null);
              }
          }
        Ys(
          l,
          u,
          f,
          r,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        ol("invalid", l), a = i = u = null;
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
                Al(l, t, n, f, e, null);
            }
        t = u, e = i, l.multiple = !!a, t != null ? Ta(l, !!a, t, !1) : e != null && Ta(l, !!a, e, !0);
        return;
      case "textarea":
        ol("invalid", l), u = n = a = null;
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
                Al(l, t, i, f, e, null);
            }
        Xs(l, a, n, u);
        return;
      case "option":
        for (r in e)
          if (e.hasOwnProperty(r) && (a = e[r], a != null))
            switch (r) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Al(l, t, r, a, e, null);
            }
        return;
      case "dialog":
        ol("beforetoggle", l), ol("toggle", l), ol("cancel", l), ol("close", l);
        break;
      case "iframe":
      case "object":
        ol("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Jn.length; a++)
          ol(Jn[a], l);
        break;
      case "image":
        ol("error", l), ol("load", l);
        break;
      case "details":
        ol("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ol("error", l), ol("load", l);
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
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Al(l, t, b, a, e, null);
            }
        return;
      default:
        if (Zi(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Mf(
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
      e.hasOwnProperty(f) && (a = e[f], a != null && Al(l, t, f, a, e, null));
  }
  function Iv(l, t, e, a) {
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
        var n = null, u = null, i = null, f = null, r = null, b = null, T = null;
        for (x in e) {
          var M = e[x];
          if (e.hasOwnProperty(x) && M != null)
            switch (x) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = M;
              default:
                a.hasOwnProperty(x) || Al(l, t, x, null, a, M);
            }
        }
        for (var S in a) {
          var x = a[S];
          if (M = e[S], a.hasOwnProperty(S) && (x != null || M != null))
            switch (S) {
              case "type":
                u = x;
                break;
              case "name":
                n = x;
                break;
              case "checked":
                b = x;
                break;
              case "defaultChecked":
                T = x;
                break;
              case "value":
                i = x;
                break;
              case "defaultValue":
                f = x;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(o(137, t));
                break;
              default:
                x !== M && Al(
                  l,
                  t,
                  S,
                  x,
                  a,
                  M
                );
            }
        }
        Li(
          l,
          i,
          f,
          r,
          b,
          T,
          u,
          n
        );
        return;
      case "select":
        x = i = f = S = null;
        for (u in e)
          if (r = e[u], e.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                x = r;
              default:
                a.hasOwnProperty(u) || Al(
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
                S = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== r && Al(
                  l,
                  t,
                  n,
                  u,
                  a,
                  r
                );
            }
        t = f, e = i, a = x, S != null ? Ta(l, !!e, S, !1) : !!a != !!e && (t != null ? Ta(l, !!e, t, !0) : Ta(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        x = S = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Al(l, t, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                S = n;
                break;
              case "defaultValue":
                x = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Al(l, t, i, n, a, u);
            }
        Qs(l, S, x);
        return;
      case "option":
        for (var Q in e)
          if (S = e[Q], e.hasOwnProperty(Q) && S != null && !a.hasOwnProperty(Q))
            switch (Q) {
              case "selected":
                l.selected = !1;
                break;
              default:
                Al(
                  l,
                  t,
                  Q,
                  null,
                  a,
                  S
                );
            }
        for (r in a)
          if (S = a[r], x = e[r], a.hasOwnProperty(r) && S !== x && (S != null || x != null))
            switch (r) {
              case "selected":
                l.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Al(
                  l,
                  t,
                  r,
                  S,
                  a,
                  x
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
          S = e[$], e.hasOwnProperty($) && S != null && !a.hasOwnProperty($) && Al(l, t, $, null, a, S);
        for (b in a)
          if (S = a[b], x = e[b], a.hasOwnProperty(b) && S !== x && (S != null || x != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(o(137, t));
                break;
              default:
                Al(
                  l,
                  t,
                  b,
                  S,
                  a,
                  x
                );
            }
        return;
      default:
        if (Zi(t)) {
          for (var Ol in e)
            S = e[Ol], e.hasOwnProperty(Ol) && S !== void 0 && !a.hasOwnProperty(Ol) && Mf(
              l,
              t,
              Ol,
              void 0,
              a,
              S
            );
          for (T in a)
            S = a[T], x = e[T], !a.hasOwnProperty(T) || S === x || S === void 0 && x === void 0 || Mf(
              l,
              t,
              T,
              S,
              a,
              x
            );
          return;
        }
    }
    for (var y in e)
      S = e[y], e.hasOwnProperty(y) && S != null && !a.hasOwnProperty(y) && Al(l, t, y, null, a, S);
    for (M in a)
      S = a[M], x = e[M], !a.hasOwnProperty(M) || S === x || S == null && x == null || Al(l, t, M, S, a, x);
  }
  function Kd(l) {
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
  function Pv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Kd(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], b = r.startTime;
            if (b > f) break;
            var T = r.transferSize, M = r.initiatorType;
            T && Kd(M) && (r = r.responseEnd, i += T * (r < f ? 1 : (f - b) / (r - b)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Rf = null, Cf = null;
  function mi(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Jd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wd(l, t) {
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
  var Hf = null;
  function l0() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Hf ? !1 : (Hf = l, !0) : (Hf = null, !1);
  }
  var $d = typeof setTimeout == "function" ? setTimeout : void 0, t0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Fd = typeof Promise == "function" ? Promise : void 0, e0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fd < "u" ? function(l) {
    return Fd.resolve(null).then(l).catch(a0);
  } : $d;
  function a0(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Qe(l) {
    return l === "head";
  }
  function Wd(l, t) {
    var e = t, a = 0;
    do {
      var n = e.nextSibling;
      if (l.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(n), an(t);
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
    an(t);
  }
  function kd(l, t) {
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
  function qf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qf(e), Qi(e);
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
  function n0(l, t, e, a) {
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
  function u0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Id(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Bf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Gf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function i0(l, t) {
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
  var Yf = null;
  function Pd(l) {
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
  function lm(l) {
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
  function tm(l, t, e) {
    switch (t = mi(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function $n(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Qi(l);
  }
  var Lt = /* @__PURE__ */ new Map(), em = /* @__PURE__ */ new Set();
  function hi(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var ye = B.d;
  B.d = {
    f: c0,
    r: f0,
    D: s0,
    C: o0,
    L: r0,
    m: d0,
    X: h0,
    S: m0,
    M: v0
  };
  function c0() {
    var l = ye.f(), t = ui();
    return l || t;
  }
  function f0(l) {
    var t = xa(l);
    t !== null && t.tag === 5 && t.type === "form" ? br(t) : ye.r(l);
  }
  var ln = typeof document > "u" ? null : document;
  function am(l, t, e) {
    var a = ln;
    if (a && typeof t == "string" && t) {
      var n = Ut(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), em.has(n) || (em.add(n), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), it(t, "link", l), lt(t), a.head.appendChild(t)));
    }
  }
  function s0(l) {
    ye.D(l), am("dns-prefetch", l, null);
  }
  function o0(l, t) {
    ye.C(l, t), am("preconnect", l, t);
  }
  function r0(l, t, e) {
    ye.L(l, t, e);
    var a = ln;
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
          u = tn(l);
          break;
        case "script":
          u = en(l);
      }
      Lt.has(u) || (l = R(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Lt.set(u, l), a.querySelector(n) !== null || t === "style" && a.querySelector(Fn(u)) || t === "script" && a.querySelector(Wn(u)) || (t = a.createElement("link"), it(t, "link", l), lt(t), a.head.appendChild(t)));
    }
  }
  function d0(l, t) {
    ye.m(l, t);
    var e = ln;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Ut(a) + '"][href="' + Ut(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = en(l);
      }
      if (!Lt.has(u) && (l = R({ rel: "modulepreload", href: l }, t), Lt.set(u, l), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Wn(u)))
              return;
        }
        a = e.createElement("link"), it(a, "link", l), lt(a), e.head.appendChild(a);
      }
    }
  }
  function m0(l, t, e) {
    ye.S(l, t, e);
    var a = ln;
    if (a && l) {
      var n = Ea(a).hoistableStyles, u = tn(l);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Fn(u)
        ))
          f.loading = 5;
        else {
          l = R(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Lt.get(u)) && Qf(l, e);
          var r = i = a.createElement("link");
          lt(r), it(r, "link", l), r._p = new Promise(function(b, T) {
            r.onload = b, r.onerror = T;
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
  function h0(l, t) {
    ye.X(l, t);
    var e = ln;
    if (e && l) {
      var a = Ea(e).hoistableScripts, n = en(l), u = a.get(n);
      u || (u = e.querySelector(Wn(n)), u || (l = R({ src: l, async: !0 }, t), (t = Lt.get(n)) && Xf(l, t), u = e.createElement("script"), lt(u), it(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function v0(l, t) {
    ye.M(l, t);
    var e = ln;
    if (e && l) {
      var a = Ea(e).hoistableScripts, n = en(l), u = a.get(n);
      u || (u = e.querySelector(Wn(n)), u || (l = R({ src: l, async: !0, type: "module" }, t), (t = Lt.get(n)) && Xf(l, t), u = e.createElement("script"), lt(u), it(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function nm(l, t, e, a) {
    var n = (n = el.current) ? hi(n) : null;
    if (!n) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = tn(e.href), e = Ea(
          n
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = tn(e.href);
          var u = Ea(
            n
          ).hoistableStyles, i = u.get(l);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(l, i), (u = n.querySelector(
            Fn(l)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Lt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Lt.set(l, e), u || y0(
            n,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = en(e), e = Ea(
          n
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function tn(l) {
    return 'href="' + Ut(l) + '"';
  }
  function Fn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function um(l) {
    return R({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function y0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), it(t, "link", e), lt(t), l.head.appendChild(t));
  }
  function en(l) {
    return '[src="' + Ut(l) + '"]';
  }
  function Wn(l) {
    return "script[async]" + l;
  }
  function im(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Ut(e.href) + '"]'
          );
          if (a)
            return t.instance = a, lt(a), a;
          var n = R({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), lt(a), it(a, "style", n), vi(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          n = tn(e.href);
          var u = l.querySelector(
            Fn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, lt(u), u;
          a = um(e), (n = Lt.get(n)) && Qf(a, n), u = (l.ownerDocument || l).createElement("link"), lt(u);
          var i = u;
          return i._p = new Promise(function(f, r) {
            i.onload = f, i.onerror = r;
          }), it(u, "link", a), t.state.loading |= 4, vi(u, e.precedence, l), t.instance = u;
        case "script":
          return u = en(e.src), (n = l.querySelector(
            Wn(u)
          )) ? (t.instance = n, lt(n), n) : (a = e, (n = Lt.get(u)) && (a = R({}, e), Xf(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), lt(n), it(n, "link", a), l.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
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
  function Qf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Xf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var yi = null;
  function cm(l, t, e) {
    if (yi === null) {
      var a = /* @__PURE__ */ new Map(), n = yi = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = yi, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[dn] || u[et] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function fm(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function g0(l, t, e) {
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
  function sm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function p0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = tn(a.href), u = t.querySelector(
          Fn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = gi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, lt(u);
          return;
        }
        u = t.ownerDocument || t, a = um(a), (n = Lt.get(n)) && Qf(a, n), u = u.createElement("link"), lt(u);
        var i = u;
        i._p = new Promise(function(f, r) {
          i.onload = f, i.onerror = r;
        }), it(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = gi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Lf = 0;
  function b0(l, t) {
    return l.stylesheets && l.count === 0 && bi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && bi(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Lf === 0 && (Lf = 62500 * Pv());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && bi(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > Lf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function gi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) bi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var pi = null;
  function bi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, pi = /* @__PURE__ */ new Map(), t.forEach(S0, l), pi = null, gi.call(l));
  }
  function S0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = pi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), pi.set(l, e);
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = gi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var kn = {
    $$typeof: xl,
    Provider: null,
    Consumer: null,
    _currentValue: w,
    _currentValue2: w,
    _threadCount: 0
  };
  function _0(l, t, e, a, n, u, i, f, r) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qi(0), this.hiddenUpdates = qi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function om(l, t, e, a, n, u, i, f, r, b, T, M) {
    return l = new _0(
      l,
      t,
      e,
      i,
      r,
      b,
      T,
      M,
      f
    ), t = 1, u === !0 && (t |= 24), u = jt(3, null, null, t), l.current = u, u.stateNode = l, t = Sc(), t.refCount++, l.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Nc(u), l;
  }
  function rm(l) {
    return l ? (l = Ca, l) : Ca;
  }
  function dm(l, t, e, a, n, u) {
    n = rm(n), a.context === null ? a.context = n : a.pendingContext = n, a = Oe(t), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = De(l, a, t), e !== null && (_t(e, l, t), On(e, l, t));
  }
  function mm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Vf(l, t) {
    mm(l, t), (l = l.alternate) && mm(l, t);
  }
  function hm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = na(l, 67108864);
      t !== null && _t(t, l, 67108864), Vf(l, 67108864);
    }
  }
  function vm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mt();
      t = Bi(t);
      var e = na(l, t);
      e !== null && _t(e, l, t), Vf(l, t);
    }
  }
  var Si = !0;
  function x0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = B.p;
    try {
      B.p = 2, Zf(l, t, e, a);
    } finally {
      B.p = u, E.T = n;
    }
  }
  function E0(l, t, e, a) {
    var n = E.T;
    E.T = null;
    var u = B.p;
    try {
      B.p = 8, Zf(l, t, e, a);
    } finally {
      B.p = u, E.T = n;
    }
  }
  function Zf(l, t, e, a) {
    if (Si) {
      var n = Kf(a);
      if (n === null)
        Df(
          l,
          t,
          a,
          _i,
          e
        ), gm(l, a);
      else if (T0(
        n,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (gm(l, a), t & 4 && -1 < N0.indexOf(l)) {
        for (; n !== null; ) {
          var u = xa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Pe(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - Nt(i);
                      f.entanglements[1] |= r, i &= ~r;
                    }
                    Ft(u), (_l & 6) === 0 && (ai = Hl() + 500, Kn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = na(u, 2), f !== null && _t(f, u, 2), ui(), Vf(u, 2);
            }
          if (u = Kf(a), u === null && Df(
            l,
            t,
            a,
            _i,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Df(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Kf(l) {
    return l = Ji(l), Jf(l);
  }
  var _i = null;
  function Jf(l) {
    if (_i = null, l = _a(l), l !== null) {
      var t = C(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = A(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = O(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return _i = l, null;
  }
  function ym(l) {
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
        switch (ke()) {
          case Se:
            return 2;
          case fn:
            return 8;
          case Ie:
          case ht:
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
  var wf = !1, Xe = null, Le = null, Ve = null, In = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Ze = [], N0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function gm(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Xe = null;
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
    }, t !== null && (t = xa(t), t !== null && hm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function T0(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return Xe = lu(
          Xe,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Le = lu(
          Le,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Ve = lu(
          Ve,
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
  function pm(l) {
    var t = _a(l.target);
    if (t !== null) {
      var e = C(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = A(e), t !== null) {
            l.blockedOn = t, Ms(l.priority, function() {
              vm(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = O(e), t !== null) {
            l.blockedOn = t, Ms(l.priority, function() {
              vm(e);
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
  function xi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Kf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ki = a, e.target.dispatchEvent(a), Ki = null;
      } else
        return t = xa(e), t !== null && hm(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function bm(l, t, e) {
    xi(l) && e.delete(t);
  }
  function j0() {
    wf = !1, Xe !== null && xi(Xe) && (Xe = null), Le !== null && xi(Le) && (Le = null), Ve !== null && xi(Ve) && (Ve = null), In.forEach(bm), Pn.forEach(bm);
  }
  function Ei(l, t) {
    l.blockedOn === t && (l.blockedOn = null, wf || (wf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      j0
    )));
  }
  var Ni = null;
  function Sm(l) {
    Ni !== l && (Ni = l, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ni === l && (Ni = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], n = l[t + 2];
          if (typeof a != "function") {
            if (Jf(a || e) === null)
              continue;
            break;
          }
          var u = xa(e);
          u !== null && (l.splice(t, 3), t -= 3, Zc(
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
  function an(l) {
    function t(r) {
      return Ei(r, l);
    }
    Xe !== null && Ei(Xe, l), Le !== null && Ei(Le, l), Ve !== null && Ei(Ve, l), In.forEach(t), Pn.forEach(t);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      pm(e), e.blockedOn === null && Ze.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[vt] || null;
        if (typeof u == "function")
          i || Sm(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[vt] || null)
              f = i.formAction;
            else if (Jf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), Sm(e);
        }
      }
  }
  function _m() {
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
  function $f(l) {
    this._internalRoot = l;
  }
  Ti.prototype.render = $f.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = Mt();
    dm(e, a, l, t, null, null);
  }, Ti.prototype.unmount = $f.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      dm(l.current, 2, null, l, null, null), ui(), t[Sa] = null;
    }
  };
  function Ti(l) {
    this._internalRoot = l;
  }
  Ti.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Ds();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ze.length && t !== 0 && t < Ze[e].priority; e++) ;
      Ze.splice(e, 0, l), e === 0 && pm(l);
    }
  };
  var xm = v.version;
  if (xm !== "19.2.6")
    throw Error(
      o(
        527,
        xm,
        "19.2.6"
      )
    );
  B.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = _(t), l = l !== null ? U(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var z0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ji.isDisabled && ji.supportsFiber)
      try {
        It = ji.inject(
          z0
        ), Et = ji;
      } catch {
      }
  }
  return eu.createRoot = function(l, t) {
    if (!N(l)) throw Error(o(299));
    var e = !1, a = "", n = Or, u = Dr, i = Mr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = om(
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
      _m
    ), l[Sa] = t.current, Of(l), new $f(t);
  }, eu.hydrateRoot = function(l, t, e) {
    if (!N(l)) throw Error(o(299));
    var a = !1, n = "", u = Or, i = Dr, f = Mr, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), t = om(
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
      _m
    ), t.context = rm(null), e = t.current, a = Mt(), a = Bi(a), n = Oe(a), n.callback = null, De(e, n, a), e = a, t.current.lanes = e, rn(t, e), Ft(t), l[Sa] = t.current, Of(l), new Ti(t);
  }, eu.version = "19.2.6", eu;
}
var Rm;
function G0() {
  if (Rm) return kf.exports;
  Rm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (v) {
        console.error(v);
      }
  }
  return c(), kf.exports = B0(), kf.exports;
}
var Y0 = G0(), ts = { exports: {} }, es = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cm;
function Q0() {
  if (Cm) return es;
  Cm = 1;
  var c = Ri();
  function v(R, j) {
    return R === j && (R !== 0 || 1 / R === 1 / j) || R !== R && j !== j;
  }
  var m = typeof Object.is == "function" ? Object.is : v, o = c.useState, N = c.useEffect, C = c.useLayoutEffect, A = c.useDebugValue;
  function O(R, j) {
    var H = j(), X = o({ inst: { value: H, getSnapshot: j } }), F = X[0].inst, P = X[1];
    return C(
      function() {
        F.value = H, F.getSnapshot = j, g(F) && P({ inst: F });
      },
      [R, H, j]
    ), N(
      function() {
        return g(F) && P({ inst: F }), R(function() {
          g(F) && P({ inst: F });
        });
      },
      [R]
    ), A(H), H;
  }
  function g(R) {
    var j = R.getSnapshot;
    R = R.value;
    try {
      var H = j();
      return !m(R, H);
    } catch {
      return !0;
    }
  }
  function _(R, j) {
    return j();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : O;
  return es.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : U, es;
}
var Um;
function X0() {
  return Um || (Um = 1, ts.exports = Q0()), ts.exports;
}
var Hm = X0();
const $m = 0, Fm = 1, Wm = 2, qm = 3;
var Bm = Object.prototype.hasOwnProperty;
function os(c, v) {
  var m, o;
  if (c === v) return !0;
  if (c && v && (m = c.constructor) === v.constructor) {
    if (m === Date) return c.getTime() === v.getTime();
    if (m === RegExp) return c.toString() === v.toString();
    if (m === Array) {
      if ((o = c.length) === v.length)
        for (; o-- && os(c[o], v[o]); ) ;
      return o === -1;
    }
    if (!m || typeof c == "object") {
      o = 0;
      for (m in c)
        if (Bm.call(c, m) && ++o && !Bm.call(v, m) || !(m in v) || !os(c[m], v[m])) return !1;
      return Object.keys(v).length === o;
    }
  }
  return c !== c && v !== v;
}
const ge = /* @__PURE__ */ new WeakMap(), pe = () => {
}, ft = (
  /*#__NOINLINE__*/
  pe()
), rs = Object, ml = (c) => c === ft, kt = (c) => typeof c == "function", Fe = (c, v) => ({
  ...c,
  ...v
}), km = (c) => kt(c.then), as = {}, zi = {}, _s = "undefined", cu = typeof window != _s, ds = typeof document != _s, L0 = cu && "Deno" in window, V0 = () => cu && typeof window.requestAnimationFrame != _s, Im = (c, v) => {
  const m = ge.get(c);
  return [
    // Getter
    () => !ml(v) && c.get(v) || as,
    // Setter
    (o) => {
      if (!ml(v)) {
        const N = c.get(v);
        v in zi || (zi[v] = N), m[5](v, Fe(N, o), N || as);
      }
    },
    // Subscriber
    m[6],
    // Get server cache snapshot
    () => !ml(v) && v in zi ? zi[v] : !ml(v) && c.get(v) || as
  ];
};
let ms = !0;
const Z0 = () => ms, [hs, vs] = cu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  pe,
  pe
], K0 = () => {
  const c = ds && document.visibilityState;
  return ml(c) || c !== "hidden";
}, J0 = (c) => (ds && document.addEventListener("visibilitychange", c), hs("focus", c), () => {
  ds && document.removeEventListener("visibilitychange", c), vs("focus", c);
}), w0 = (c) => {
  const v = () => {
    ms = !0, c();
  }, m = () => {
    ms = !1;
  };
  return hs("online", v), hs("offline", m), () => {
    vs("online", v), vs("offline", m);
  };
}, $0 = {
  isOnline: Z0,
  isVisible: K0
}, F0 = {
  initFocus: J0,
  initReconnect: w0
}, Gm = !Ss.useId, nn = !cu || L0, W0 = (c) => V0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), ns = nn ? Y.useEffect : Y.useLayoutEffect, us = typeof navigator < "u" && navigator.connection, Ym = !nn && us && ([
  "slow-2g",
  "2g"
].includes(us.effectiveType) || us.saveData), Ai = /* @__PURE__ */ new WeakMap(), k0 = (c) => rs.prototype.toString.call(c), is = (c, v) => c === `[object ${v}]`;
let I0 = 0;
const ys = (c) => {
  const v = typeof c, m = k0(c), o = is(m, "Date"), N = is(m, "RegExp"), C = is(m, "Object");
  let A, O;
  if (rs(c) === c && !o && !N) {
    if (A = Ai.get(c), A) return A;
    if (A = ++I0 + "~", Ai.set(c, A), Array.isArray(c)) {
      for (A = "@", O = 0; O < c.length; O++)
        A += ys(c[O]) + ",";
      Ai.set(c, A);
    }
    if (C) {
      A = "#";
      const g = rs.keys(c).sort();
      for (; !ml(O = g.pop()); )
        ml(c[O]) || (A += O + ":" + ys(c[O]) + ",");
      Ai.set(c, A);
    }
  } else
    A = o ? c.toJSON() : v == "symbol" ? c.toString() : v == "string" ? JSON.stringify(c) : "" + c;
  return A;
}, xs = (c) => {
  if (kt(c))
    try {
      c = c();
    } catch {
      c = "";
    }
  const v = c;
  return c = typeof c == "string" ? c : (Array.isArray(c) ? c.length : c) ? ys(c) : "", [
    c,
    v
  ];
};
let P0 = 0;
const gs = () => ++P0;
async function Pm(...c) {
  const [v, m, o, N] = c, C = Fe({
    populateCache: !0,
    throwOnError: !0
  }, typeof N == "boolean" ? {
    revalidate: N
  } : N || {});
  let A = C.populateCache;
  const O = C.rollbackOnError;
  let g = C.optimisticData;
  const _ = (j) => typeof O == "function" ? O(j) : O !== !1, U = C.throwOnError;
  if (kt(m)) {
    const j = m, H = [], X = v.keys();
    for (const F of X)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(F) && j(v.get(F)._k) && H.push(F);
    return Promise.all(H.map(R));
  }
  return R(m);
  async function R(j) {
    const [H] = xs(j);
    if (!H) return;
    const [X, F] = Im(v, H), [P, fl, V, xl] = ge.get(v), J = () => {
      const Vl = P[H];
      return (kt(C.revalidate) ? C.revalidate(X().data, j) : C.revalidate !== !1) && (delete V[H], delete xl[H], Vl && Vl[0]) ? Vl[0](Wm).then(() => X().data) : X().data;
    };
    if (c.length < 3)
      return J();
    let tl = o, il, Z = !1;
    const El = gs();
    fl[H] = [
      El,
      0
    ];
    const ul = !ml(g), st = X(), W = st.data, Rl = st._c, ot = ml(Rl) ? W : Rl;
    if (ul && (g = kt(g) ? g(ot, W) : g, F({
      data: g,
      _c: ot
    })), kt(tl))
      try {
        tl = tl(ot);
      } catch (Vl) {
        il = Vl, Z = !0;
      }
    if (tl && km(tl))
      if (tl = await tl.catch((Vl) => {
        il = Vl, Z = !0;
      }), El !== fl[H][0]) {
        if (Z) throw il;
        return tl;
      } else Z && ul && _(il) && (A = !0, F({
        data: ot,
        _c: ft
      }));
    if (A && !Z)
      if (kt(A)) {
        const Vl = A(tl, ot);
        F({
          data: Vl,
          error: ft,
          _c: ft
        });
      } else
        F({
          data: tl,
          error: ft,
          _c: ft
        });
    if (fl[H][1] = gs(), Promise.resolve(J()).then(() => {
      F({
        _c: ft
      });
    }), Z) {
      if (U) throw il;
      return;
    }
    return tl;
  }
}
const Qm = (c, v) => {
  for (const m in c)
    c[m][0] && c[m][0](v);
}, ly = (c, v) => {
  if (!ge.has(c)) {
    const m = Fe(F0, v), o = /* @__PURE__ */ Object.create(null), N = Pm.bind(ft, c);
    let C = pe;
    const A = /* @__PURE__ */ Object.create(null), O = (U, R) => {
      const j = A[U] || [];
      return A[U] = j, j.push(R), () => j.splice(j.indexOf(R), 1);
    }, g = (U, R, j) => {
      c.set(U, R);
      const H = A[U];
      if (H)
        for (const X of H)
          X(R, j);
    }, _ = () => {
      if (!ge.has(c) && (ge.set(c, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        N,
        g,
        O
      ]), !nn)) {
        const U = m.initFocus(setTimeout.bind(ft, Qm.bind(ft, o, $m))), R = m.initReconnect(setTimeout.bind(ft, Qm.bind(ft, o, Fm)));
        C = () => {
          U && U(), R && R(), ge.delete(c);
        };
      }
    };
    return _(), [
      c,
      N,
      _,
      C
    ];
  }
  return [
    c,
    ge.get(c)[4]
  ];
}, ty = (c, v, m, o, N) => {
  const C = m.errorRetryCount, A = N.retryCount, O = ~~((Math.random() + 0.5) * (1 << (A < 8 ? A : 8))) * m.errorRetryInterval;
  !ml(C) && A > C || setTimeout(o, O, N);
}, ey = os, [lh, ay] = ly(/* @__PURE__ */ new Map()), ny = Fe(
  {
    // events
    onLoadingSlow: pe,
    onSuccess: pe,
    onError: pe,
    onErrorRetry: ty,
    onDiscarded: pe,
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
    compare: ey,
    isPaused: () => !1,
    cache: lh,
    mutate: ay,
    fallback: {}
  },
  // use web preset by default
  $0
), uy = (c, v) => {
  const m = Fe(c, v);
  if (v) {
    const { use: o, fallback: N } = c, { use: C, fallback: A } = v;
    o && C && (m.use = o.concat(C)), N && A && (m.fallback = Fe(N, A));
  }
  return m;
}, iy = Y.createContext({}), cy = "$inf$", th = cu && window.__SWR_DEVTOOLS_USE__, fy = th ? window.__SWR_DEVTOOLS_USE__ : [], sy = () => {
  th && (window.__SWR_DEVTOOLS_REACT__ = Ss);
}, oy = (c) => kt(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], ry = () => {
  const c = Y.useContext(iy);
  return Y.useMemo(() => Fe(ny, c), [
    c
  ]);
}, dy = (c) => (v, m, o) => c(v, m && ((...C) => {
  const [A] = xs(v), [, , , O] = ge.get(lh);
  if (A.startsWith(cy))
    return m(...C);
  const g = O[A];
  return ml(g) ? m(...C) : (delete O[A], g);
}), o), my = fy.concat(dy), hy = (c) => function(...m) {
  const o = ry(), [N, C, A] = oy(m), O = uy(o, A);
  let g = c;
  const { use: _ } = O, U = (_ || []).concat(my);
  for (let R = U.length; R--; )
    g = U[R](g);
  return g(N, C || O.fetcher || null, O);
}, vy = (c, v, m) => {
  const o = v[c] || (v[c] = []);
  return o.push(m), () => {
    const N = o.indexOf(m);
    N >= 0 && (o[N] = o[o.length - 1], o.pop());
  };
};
sy();
const cs = Ss.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
      throw c.status = "pending", c.then((v) => {
        c.status = "fulfilled", c.value = v;
      }, (v) => {
        c.status = "rejected", c.reason = v;
      }), c;
  }
}), fs = {
  dedupe: !0
}, Xm = Promise.resolve(ft), yy = () => pe, gy = (c, v, m) => {
  const { cache: o, compare: N, suspense: C, fallbackData: A, revalidateOnMount: O, revalidateIfStale: g, refreshInterval: _, refreshWhenHidden: U, refreshWhenOffline: R, keepPreviousData: j, strictServerPrefetchWarning: H } = m, [X, F, P, fl] = ge.get(o), [V, xl] = xs(c), J = Y.useRef(!1), tl = Y.useRef(!1), il = Y.useRef(V), Z = Y.useRef(v), El = Y.useRef(m), ul = () => El.current, st = () => ul().isVisible() && ul().isOnline(), [W, Rl, ot, Vl] = Im(o, V), Pl = Y.useRef({}).current, E = ml(A) ? ml(m.fallback) ? ft : m.fallback[V] : A, B = (jl, Gl) => {
    for (const Cl in Pl) {
      const Ul = Cl;
      if (Ul === "data") {
        if (!N(jl[Ul], Gl[Ul]) && (!ml(jl[Ul]) || !N(el, Gl[Ul])))
          return !1;
      } else if (Gl[Ul] !== jl[Ul])
        return !1;
    }
    return !0;
  }, w = !J.current, Sl = Y.useMemo(() => {
    const jl = W(), Gl = Vl(), Cl = (Kl) => {
      const Hl = Fe(Kl);
      return delete Hl._k, (() => {
        if (!V || !v || ul().isPaused()) return !1;
        if (w && !ml(O)) return O;
        const Se = ml(E) ? Hl.data : E;
        return ml(Se) || g;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Hl
      } : Hl;
    }, Ul = Cl(jl), dt = jl === Gl ? Ul : Cl(Gl);
    let mt = Ul;
    return [
      () => {
        const Kl = Cl(W());
        return B(Kl, mt) ? (mt.data = Kl.data, mt.isLoading = Kl.isLoading, mt.isValidating = Kl.isValidating, mt.error = Kl.error, mt) : (mt = Kl, Kl);
      },
      () => dt
    ];
  }, [
    o,
    V
  ]), vl = Hm.useSyncExternalStore(Y.useCallback(
    (jl) => ot(V, (Gl, Cl) => {
      B(Cl, Gl) || jl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), Sl[0], Sl[1]), h = X[V] && X[V].length > 0, D = vl.data, q = ml(D) ? E && km(E) ? cs(E) : E : D, G = vl.error, k = Y.useRef(q), el = j ? ml(D) ? ml(k.current) ? q : k.current : D : q, cl = V && ml(q), Zl = Y.useRef(null);
  !nn && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Hm.useSyncExternalStore(yy, () => (Zl.current = !1, Zl), () => (Zl.current = !0, Zl));
  const Ql = Zl.current;
  H && Ql && !C && cl && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !V || !v || ul().isPaused() || h && !ml(G) ? !1 : w && !ml(O) ? O : C ? ml(q) ? !1 : g : ml(q) || g, We = w && be, cn = ml(vl.isValidating) ? We : vl.isValidating, su = ml(vl.isLoading) ? We : vl.isLoading, xt = Y.useCallback(
    async (jl) => {
      const Gl = Z.current;
      if (!V || !Gl || tl.current || ul().isPaused())
        return !1;
      let Cl, Ul, dt = !0;
      const mt = jl || {}, Kl = !P[V] || !mt.dedupe, Hl = () => Gm ? !tl.current && V === il.current && J.current : V === il.current, ke = {
        isValidating: !1,
        isLoading: !1
      }, Se = () => {
        Rl(ke);
      }, fn = () => {
        const ht = P[V];
        ht && ht[1] === Ul && delete P[V];
      }, Ie = {
        isValidating: !0
      };
      ml(W().data) && (Ie.isLoading = !0);
      try {
        if (Kl && (Rl(Ie), m.loadingTimeout && ml(W().data) && setTimeout(() => {
          dt && Hl() && ul().onLoadingSlow(V, m);
        }, m.loadingTimeout), P[V] = [
          Gl(xl),
          gs()
        ]), [Cl, Ul] = P[V], Cl = await Cl, Kl && setTimeout(fn, m.dedupingInterval), !P[V] || P[V][1] !== Ul)
          return Kl && Hl() && ul().onDiscarded(V), !1;
        ke.error = ft;
        const ht = F[V];
        if (!ml(ht) && // case 1
        (Ul <= ht[0] || // case 2
        Ul <= ht[1] || // case 3
        ht[1] === 0))
          return Se(), Kl && Hl() && ul().onDiscarded(V), !1;
        const Rt = W().data;
        ke.data = N(Rt, Cl) ? Rt : Cl, Kl && Hl() && ul().onSuccess(Cl, V, m);
      } catch (ht) {
        fn();
        const Rt = ul(), { shouldRetryOnError: sn } = Rt;
        Rt.isPaused() || (ke.error = ht, Kl && Hl() && (Rt.onError(ht, V, Rt), (sn === !0 || kt(sn) && sn(ht)) && (!ul().revalidateOnFocus || !ul().revalidateOnReconnect || st()) && Rt.onErrorRetry(ht, V, Rt, (Hi) => {
          const It = X[V];
          It && It[0] && It[0](qm, Hi);
        }, {
          retryCount: (mt.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return dt = !1, Se(), !0;
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
  ), ba = Y.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...jl) => Pm(o, il.current, ...jl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ns(() => {
    Z.current = v, El.current = m, ml(D) || (k.current = D);
  }), ns(() => {
    if (!V) return;
    const jl = xt.bind(ft, fs);
    let Gl = 0;
    ul().revalidateOnFocus && (Gl = Date.now() + ul().focusThrottleInterval);
    const Ul = vy(V, X, (dt, mt = {}) => {
      if (dt == $m) {
        const Kl = Date.now();
        ul().revalidateOnFocus && Kl > Gl && st() && (Gl = Kl + ul().focusThrottleInterval, jl());
      } else if (dt == Fm)
        ul().revalidateOnReconnect && st() && jl();
      else {
        if (dt == Wm)
          return xt();
        if (dt == qm)
          return xt(mt);
      }
    });
    return tl.current = !1, il.current = V, J.current = !0, Rl({
      _k: xl
    }), be && (P[V] || (ml(q) || nn ? jl() : W0(jl))), () => {
      tl.current = !0, Ul();
    };
  }, [
    V
  ]), ns(() => {
    let jl;
    function Gl() {
      const Ul = kt(_) ? _(W().data) : _;
      Ul && jl !== -1 && (jl = setTimeout(Cl, Ul));
    }
    function Cl() {
      !W().error && (U || ul().isVisible()) && (R || ul().isOnline()) ? xt(fs).then(Gl) : Gl();
    }
    return Gl(), () => {
      jl && (clearTimeout(jl), jl = -1);
    };
  }, [
    _,
    U,
    R,
    V
  ]), Y.useDebugValue(el), C) {
    if (!Gm && nn && cl)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    cl && (Z.current = v, El.current = m, tl.current = !1);
    const jl = fl[V], Gl = !ml(jl) && cl ? ba(jl) : Xm;
    if (cs(Gl), !ml(G) && cl)
      throw G;
    const Cl = cl ? xt(fs) : Xm;
    !ml(el) && cl && (Cl.status = "fulfilled", Cl.value = !0), cs(Cl);
  }
  return {
    mutate: ba,
    get data() {
      return Pl.data = !0, el;
    },
    get error() {
      return Pl.error = !0, G;
    },
    get isValidating() {
      return Pl.isValidating = !0, cn;
    },
    get isLoading() {
      return Pl.isLoading = !0, su;
    }
  };
}, au = hy(gy), Es = "/api/v1/extensions/nexus.video.ltx23", ps = 8 * 1024 * 1024, eh = [
  "image/png",
  "image/jpeg",
  "image/webp"
];
async function Wt(c, v) {
  const m = await fetch(`${Es}${c}`, {
    headers: { "Content-Type": "application/json", ...v?.headers ?? {} },
    ...v
  });
  if (!m.ok) {
    const o = await m.text();
    throw new Error(`${m.status} ${m.statusText}: ${o}`);
  }
  return await m.json();
}
const $e = {
  health: () => Wt("/health"),
  listProfiles: () => Wt("/runtime-profiles"),
  listModels: () => Wt("/models"),
  plan: (c) => Wt("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(c)
  }),
  createRender: (c) => Wt(
    "/renders",
    { method: "POST", body: JSON.stringify(c) }
  ),
  getRender: (c) => Wt(`/renders/${c}`),
  cancel: (c) => Wt(`/renders/${c}/cancel`, { method: "POST" }),
  retrySegment: (c, v) => Wt(`/renders/${c}/retry-segment`, {
    method: "POST",
    body: JSON.stringify({ segment_index: v })
  }),
  uploadInputImage: async (c) => {
    const v = new FormData();
    v.append("image", c, c.name);
    const m = await fetch(`${Es}/input-images`, {
      method: "POST",
      body: v
    });
    if (!m.ok) {
      const o = await m.text();
      throw new Error(`${m.status} ${m.statusText}: ${o}`);
    }
    return await m.json();
  }
};
function py(c) {
  return `${Es}/artifacts/${c}`;
}
const by = "/api/v1", Lm = "nexus.video.ltx23";
async function Vm(c, v) {
  const m = await fetch(`${by}${c}`, {
    headers: { "Content-Type": "application/json", ...v?.headers ?? {} },
    ...v
  });
  if (!m.ok) {
    const N = await m.text();
    throw new Error(`${m.status}: ${N}`);
  }
  return (await m.json()).data;
}
const Zm = {
  listDependencies: () => Vm(`/extensions/${Lm}/dependencies`),
  startInstall: (c = !1) => Vm(
    `/extensions/${Lm}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Km = {
  status: (c) => Wt(`/profiles/${c}/install`),
  start: (c) => Wt(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var Sy = "_1vmg9ib0", un = "_1vmg9ib1", nu = "_1vmg9ib2", _y = "_1vmg9ib3", yl = "_1vmg9ib4", gl = "_1vmg9ib5", Ml = "_1vmg9ib6", ah = "_1vmg9ib7 _1vmg9ib6", Jm = "_1vmg9ib8 _1vmg9ib6", uu = "_1vmg9ib9", Ns = "_1vmg9iba", Ts = "_1vmg9ibb _1vmg9iba", xy = "_1vmg9ibc _1vmg9iba", Oi = "_1vmg9ibd _1vmg9iba", fu = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ga = "_1vmg9ibh", nh = "_1vmg9ibj _1vmg9ibi", uh = "_1vmg9ibk _1vmg9ibi", ih = "_1vmg9ibl _1vmg9ibi", ch = "_1vmg9ibm _1vmg9ibi", iu = "_1vmg9ibn", pa = "_1vmg9ibo", Ey = "_1vmg9ibp", Ny = "_1vmg9ibq", bs = "_1vmg9ibs _1vmg9ibr", fh = "_1vmg9ibt _1vmg9ibr", sh = "_1vmg9ibu _1vmg9ibr", oh = "_1vmg9ibv _1vmg9ibr", Ty = "_1vmg9ibw", jy = "_1vmg9ibx", zy = "_1vmg9iby", Ay = "_1vmg9ibz", Oy = "_1vmg9ib10 _1vmg9iba", I = "_1vmg9ib11", Dy = "_1vmg9ib12", My = "_1vmg9ib13", Ry = "_1vmg9ib14", Cy = "_1vmg9ib15", Uy = "_1vmg9ib16", Ci = "_1vmg9ib17", Ui = "_1vmg9ib18", wm = "_1vmg9ib19", Hy = "_1vmg9ib1a", qy = "_1vmg9ib1b", By = "_1vmg9ib1c", Gy = "_1vmg9ib1d _1vmg9ibd _1vmg9iba", Yy = "_1vmg9ib1e";
function Di(c) {
  return c < 1024 ? `${c} B` : c < 1024 * 1024 ? `${(c / 1024).toFixed(1)} KB` : `${(c / (1024 * 1024)).toFixed(2)} MB`;
}
function Qy(c) {
  return eh.includes(c.type) ? c.size === 0 ? "The selected file is empty." : c.size > ps ? `Image is ${Di(c.size)} — limit is ${Di(
    ps
  )}.` : null : `Unsupported type ${c.type || "unknown"}. Use PNG, JPEG, or WEBP.`;
}
function Xy({
  artifactId: c,
  onChange: v
}) {
  const m = Y.useId(), o = Y.useRef(null), [N, C] = Y.useState(null), [A, O] = Y.useState(!1), [g, _] = Y.useState(null), [U, R] = Y.useState(!1);
  Y.useEffect(() => {
    c === void 0 && N !== null && (URL.revokeObjectURL(N.url), C(null), _(null));
  }, [c, N]), Y.useEffect(
    () => () => {
      N !== null && URL.revokeObjectURL(N.url);
    },
    [N]
  );
  const j = Y.useCallback(
    async (J) => {
      const tl = Qy(J);
      if (tl !== null) {
        _(tl);
        return;
      }
      const il = URL.createObjectURL(J), Z = N;
      C({
        url: il,
        fileName: J.name,
        byteLength: J.size,
        mime: J.type
      }), O(!0), _(null);
      let El;
      try {
        El = await $e.uploadInputImage(J);
      } catch (ul) {
        URL.revokeObjectURL(il), C(Z), _(ul instanceof Error ? ul.message : String(ul)), O(!1);
        return;
      }
      Z !== null && URL.revokeObjectURL(Z.url), v(El.artifact_id), O(!1);
    },
    [v, N]
  ), H = Y.useCallback(
    (J) => {
      const tl = J.target.files?.[0];
      J.target.value = "", tl !== void 0 && j(tl);
    },
    [j]
  ), X = Y.useCallback(
    (J) => {
      J.preventDefault(), J.stopPropagation(), R(!1);
      const tl = J.dataTransfer.files?.[0];
      tl !== void 0 && j(tl);
    },
    [j]
  ), F = Y.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), R(!0);
  }, []), P = Y.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), R(!1);
  }, []), fl = Y.useCallback(
    (J) => {
      (J.key === " " || J.key === "Enter") && (J.preventDefault(), o.current?.click());
    },
    []
  );
  Y.useEffect(() => {
    const J = (tl) => {
      if (A) return;
      const il = tl.clipboardData?.items;
      if (il) {
        for (const Z of il)
          if (Z.kind === "file" && Z.type.startsWith("image/")) {
            const El = Z.getAsFile();
            if (El !== null) {
              tl.preventDefault(), j(El);
              return;
            }
          }
      }
    };
    return window.addEventListener("paste", J), () => window.removeEventListener("paste", J);
  }, [j, A]);
  const V = Y.useCallback(() => {
    N !== null && URL.revokeObjectURL(N.url), C(null), _(null), v(void 0);
  }, [v, N]);
  if (N !== null && c !== void 0 && !A)
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: m, children: "Reference image" }),
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
          /* @__PURE__ */ s.jsxs("div", { className: I, children: [
            N.mime,
            " · ",
            Di(N.byteLength)
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: I, style: { marginTop: 2 }, children: [
            "artifact: ",
            c
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: Gy,
            onClick: V,
            "aria-label": "Remove reference image",
            title: "Remove reference image",
            children: "✕"
          }
        )
      ] })
    ] });
  const xl = U ? `${wm} ${Hy}` : wm;
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: m, children: "Reference image (optional)" }),
    /* @__PURE__ */ s.jsxs(
      "label",
      {
        className: xl,
        htmlFor: m,
        onDrop: X,
        onDragOver: F,
        onDragLeave: P,
        onKeyDown: fl,
        tabIndex: 0,
        role: "button",
        "aria-label": "Upload reference image (drag, paste, or click)",
        "aria-busy": A,
        children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              ref: o,
              id: m,
              type: "file",
              accept: eh.join(","),
              style: { display: "none" },
              onChange: H,
              disabled: A
            }
          ),
          /* @__PURE__ */ s.jsx("strong", { style: { color: "inherit" }, children: A ? "Uploading…" : U ? "Drop to upload" : "Drag, paste, or click" }),
          /* @__PURE__ */ s.jsxs("span", { className: I, children: [
            "PNG · JPEG · WEBP, up to ",
            Di(ps),
            ". Anchors the first segment's identity; later segments still chain off the prior segment's last frame."
          ] })
        ]
      }
    ),
    g !== null ? /* @__PURE__ */ s.jsx("div", { className: pa, role: "alert", children: g }) : null
  ] });
}
const Ly = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Vy() {
  const [c, v] = Y.useState(Ly), [m, o] = Y.useState(null), [N, C] = Y.useState(null), [A, O] = Y.useState(!1), [g, _] = Y.useState(null), [U, R] = Y.useState(null), [j, H] = Y.useState(!1), [X, F] = Y.useState(!1), [P, fl] = Y.useState(
    null
  ), [V, xl] = Y.useState(null), { data: J } = au(
    "ltx:runtime-profiles",
    () => $e.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: tl, mutate: il } = au(
    g ? `ltx:renders:${g}` : null,
    () => g ? $e.getRender(g) : Promise.resolve(null),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (W) => W ? W.status === "completed" || W.status === "failed" || W.status === "cancelled" ? 0 : 2e3 : 1e3
    }
  ), Z = Y.useCallback(async () => {
    O(!0), C(null);
    try {
      const W = await $e.plan(c);
      o(W);
    } catch (W) {
      C(W instanceof Error ? W.message : String(W)), o(null);
    } finally {
      O(!1);
    }
  }, [c]), El = Y.useCallback(async () => {
    H(!0), R(null);
    try {
      const W = await $e.createRender(c);
      _(W.id), il();
    } catch (W) {
      R(W instanceof Error ? W.message : String(W));
    } finally {
      H(!1);
    }
  }, [c, il]), ul = Y.useCallback(async () => {
    if (!(!g || X)) {
      F(!0), R(null);
      try {
        await $e.cancel(g), il();
      } catch (W) {
        R(
          `Cancel failed: ${W instanceof Error ? W.message : String(W)}`
        );
      } finally {
        F(!1);
      }
    }
  }, [g, X, il]), st = Y.useCallback(
    async (W) => {
      if (!(!g || P !== null)) {
        fl(W), xl(null);
        try {
          await $e.retrySegment(g, W), il();
        } catch (Rl) {
          xl(
            `Retry of segment ${W + 1} failed: ${Rl instanceof Error ? Rl.message : String(Rl)}`
          );
        } finally {
          fl(null);
        }
      }
    },
    [g, P, il]
  );
  return /* @__PURE__ */ s.jsxs("div", { className: Sy, children: [
    /* @__PURE__ */ s.jsxs("div", { className: My, children: [
      /* @__PURE__ */ s.jsx(Zy, {}),
      /* @__PURE__ */ s.jsx(
        wy,
        {
          draft: c,
          onChange: v,
          profiles: J ?? [],
          onPlan: Z,
          onSubmit: El,
          planning: A,
          submitting: j,
          plan: m,
          planError: N,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx(
      eg,
      {
        run: tl ?? null,
        onCancel: ul,
        cancelling: X,
        onRetrySegment: st,
        retryingSegmentIndex: P,
        retryError: V
      }
    )
  ] });
}
function Zy() {
  const [c, v] = Y.useState(!1), [m, o] = Y.useState(null), { data: N, mutate: C } = au(
    "host:dependencies",
    () => Zm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (j) => j.status === "running" || j.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), A = Y.useCallback(
    async (U = !1) => {
      v(!0), o(null);
      try {
        await Zm.startInstall(U), C();
      } catch (R) {
        o(R instanceof Error ? R.message : String(R));
      } finally {
        v(!1);
      }
    },
    [C]
  );
  if (!N) return null;
  const O = N.steps.find((U) => U.status === "failed"), g = N.all_satisfied, _ = N.steps.some(
    (U) => U.status === "running" || !g && U.status === "pending"
  );
  return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
    /* @__PURE__ */ s.jsxs("div", { className: Ry, children: [
      /* @__PURE__ */ s.jsx("h3", { className: nu, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ s.jsx("span", { className: Ky(g, !!O, _), children: g ? "ready" : O ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ s.jsx("ul", { className: Cy, children: N.steps.map((U) => /* @__PURE__ */ s.jsxs("li", { className: Uy, children: [
      /* @__PURE__ */ s.jsx("span", { className: Jy(U.status) }),
      /* @__PURE__ */ s.jsx("span", { children: U.id }),
      /* @__PURE__ */ s.jsx("span", { className: I, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    O?.last_error ? /* @__PURE__ */ s.jsxs("div", { className: pa, children: [
      /* @__PURE__ */ s.jsxs("strong", { children: [
        O.id,
        " failed"
      ] }),
      ": ",
      O.last_error.message
    ] }) : null,
    m ? /* @__PURE__ */ s.jsx("div", { className: pa, children: m }) : null,
    !g || O ? /* @__PURE__ */ s.jsxs("div", { className: fu, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: Ns,
          disabled: c || _,
          onClick: () => void A(!1),
          children: _ || c ? "Installing…" : "Install runtime"
        }
      ),
      O ? /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: Ts,
          disabled: c || _,
          onClick: () => void A(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Ky(c, v, m) {
  return v ? ch : c ? nh : m ? uh : ih;
}
function Jy(c) {
  switch (c) {
    case "ok":
      return sh;
    case "running":
      return fh;
    case "failed":
      return oh;
    default:
      return bs;
  }
}
function wy({
  draft: c,
  onChange: v,
  profiles: m,
  onPlan: o,
  onSubmit: N,
  planning: C,
  submitting: A,
  plan: O,
  planError: g,
  submitError: _
}) {
  const U = Y.useCallback(
    (j, H) => v({ ...c, [j]: H }),
    [c, v]
  ), R = Y.useCallback(
    (j) => {
      j.preventDefault(), !(A || c.prompt.trim().length === 0) && N();
    },
    [A, c.prompt, N]
  );
  return /* @__PURE__ */ s.jsxs("form", { className: un, onSubmit: R, noValidate: !0, children: [
    /* @__PURE__ */ s.jsx("h2", { className: nu, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ s.jsx("p", { className: _y, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ s.jsx("div", { className: yl, children: /* @__PURE__ */ s.jsx(
      Xy,
      {
        artifactId: c.input_image_artifact_id,
        onChange: (j) => U("input_image_artifact_id", j)
      }
    ) }),
    /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ s.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: ah,
          value: c.prompt,
          onChange: (j) => U("prompt", j.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-neg",
          className: Ml,
          value: c.negative_prompt ?? "",
          onChange: (j) => U(
            "negative_prompt",
            j.target.value.length > 0 ? j.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-character",
          className: Ml,
          value: c.character_prompt ?? "",
          onChange: (j) => U(
            "character_prompt",
            j.target.value.length > 0 ? j.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ s.jsx("span", { className: I, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-style",
          className: Ml,
          value: c.style_prompt ?? "",
          onChange: (j) => U(
            "style_prompt",
            j.target.value.length > 0 ? j.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ s.jsx("span", { className: I, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ s.jsx(Iy, { draft: c, update: U }),
    /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-duration",
            className: Ml,
            type: "number",
            min: 1,
            max: 300,
            value: c.duration_seconds,
            onChange: (j) => {
              const H = Number(j.target.value);
              Number.isFinite(H) && U(
                "duration_seconds",
                Math.max(1, Math.min(300, H))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-seed",
            className: Ml,
            type: "number",
            value: c.seed ?? "",
            onChange: (j) => {
              const H = j.target.value;
              if (H === "") {
                U("seed", void 0);
                return;
              }
              const X = Number(H);
              Number.isFinite(X) && U("seed", X);
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Jm,
            value: c.runtime_profile,
            onChange: (j) => U(
              "runtime_profile",
              j.target.value
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
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Jm,
            value: c.quality_preset,
            onChange: (j) => U("quality_preset", j.target.value),
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
    /* @__PURE__ */ s.jsx(ky, { profiles: m, selected: c.runtime_profile }),
    /* @__PURE__ */ s.jsx($y, { selected: c.runtime_profile }),
    /* @__PURE__ */ s.jsx(Py, { draft: c, update: U }),
    /* @__PURE__ */ s.jsxs("div", { className: fu, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: Ts,
          onClick: o,
          disabled: C || A || c.prompt.trim().length === 0,
          children: C ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "submit",
          className: Ns,
          disabled: A || c.prompt.trim().length === 0,
          "aria-busy": A,
          children: A ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    g ? /* @__PURE__ */ s.jsx("div", { className: pa, role: "alert", children: g }) : null,
    _ ? /* @__PURE__ */ s.jsx("div", { className: pa, role: "alert", children: _ }) : null,
    O ? /* @__PURE__ */ s.jsx(tg, { plan: O }) : null
  ] });
}
function $y({
  selected: c
}) {
  const v = Wy(c), [m, o] = Y.useState(!1), [N, C] = Y.useState(null), { data: A, mutate: O } = au(
    v ? `profile-install:${v}` : null,
    () => v ? Km.status(v) : Promise.resolve(null),
    {
      refreshInterval: (j) => j && j.in_flight ? 2e3 : 0
    }
  ), g = Y.useCallback(async () => {
    if (v) {
      o(!0), C(null);
      try {
        await Km.start(v), O();
      } catch (j) {
        C(j instanceof Error ? j.message : String(j));
      } finally {
        o(!1);
      }
    }
  }, [v, O]);
  if (!v || !A) return null;
  if (A.installed)
    return /* @__PURE__ */ s.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ s.jsx("strong", { children: "Runtime installed" }),
      " · ",
      A.repo
    ] });
  const _ = A.in_flight || m, U = rh(A.phase), R = _ ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ s.jsxs("div", { className: iu, children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    A.repo ?? "unknown repo",
    /* @__PURE__ */ s.jsxs("div", { className: I, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      A.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    A.last_error ? /* @__PURE__ */ s.jsxs("div", { className: I, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      A.last_error
    ] }) : null,
    N ? /* @__PURE__ */ s.jsx("div", { className: I, style: { marginTop: 4, color: "#e57373" }, children: N }) : null,
    /* @__PURE__ */ s.jsx("div", { className: fu, style: { marginTop: 8 }, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: Ns,
        disabled: _,
        onClick: () => void g(),
        children: R
      }
    ) }),
    /* @__PURE__ */ s.jsx(
      Fy,
      {
        phase: A.phase,
        recentProgress: A.recent_progress
      }
    )
  ] });
}
function rh(c) {
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
function Fy({
  phase: c,
  recentProgress: v
}) {
  if (!c && v.length === 0) return null;
  const m = rh(c);
  return /* @__PURE__ */ s.jsxs("details", { className: Ci, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ui, children: [
      "Install progress",
      m ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
        " · ",
        m
      ] }) : null,
      v.length > 0 ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
        " · ",
        v.length,
        " lines"
      ] }) : null
    ] }),
    v.length === 0 ? /* @__PURE__ */ s.jsx("p", { className: I, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ s.jsx("pre", { className: Yy, children: v.join(`
`) })
  ] });
}
function Wy(c) {
  return c === "auto" ? null : c;
}
function ky({
  profiles: c,
  selected: v
}) {
  if (c.length === 0) return null;
  const m = v === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${v}`, o = c.find((C) => C.runtime_id === m);
  if (!o) return null;
  const N = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ s.jsxs("div", { className: iu, children: [
    /* @__PURE__ */ s.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function Iy({
  draft: c,
  update: v
}) {
  const m = c.scenes ?? [], o = Y.useRef(0), [N, C] = Y.useState(
    () => m.map(() => `scene-${o.current++}`)
  );
  if (N.length !== m.length) {
    const j = N.slice(0, m.length);
    for (; j.length < m.length; )
      j.push(`scene-${o.current++}`);
    C(j);
  }
  const A = Y.useCallback(
    (j, H) => {
      v("scenes", j.length > 0 ? j : void 0), C(H);
    },
    [v]
  ), O = Y.useCallback(() => {
    const j = m.length > 0 ? c.duration_seconds / (m.length + 1) : c.duration_seconds;
    A(
      [
        ...m,
        { prompt: "", duration_seconds: Math.max(1, Math.round(j)) }
      ],
      [...N, `scene-${o.current++}`]
    );
  }, [m, N, A, c.duration_seconds]), g = Y.useCallback(
    (j, H) => {
      const X = m.map((F, P) => {
        if (P !== j) return F;
        const fl = { ...F };
        return H.prompt !== void 0 && (fl.prompt = H.prompt ?? ""), H.duration_seconds !== void 0 && (H.duration_seconds === null ? delete fl.duration_seconds : fl.duration_seconds = H.duration_seconds), H.seed !== void 0 && (H.seed === null ? delete fl.seed : fl.seed = H.seed), fl;
      });
      A(X, N);
    },
    [m, N, A]
  ), _ = Y.useCallback(
    (j) => {
      A(
        m.filter((H, X) => X !== j),
        N.filter((H, X) => X !== j)
      );
    },
    [m, N, A]
  ), U = Y.useCallback(
    (j, H) => {
      const X = j + H;
      if (X < 0 || X >= m.length) return;
      const F = m[j], P = m[X], fl = N[j], V = N[X];
      if (F === void 0 || P === void 0 || fl === void 0 || V === void 0)
        return;
      const xl = [...m], J = [...N];
      xl[j] = P, xl[X] = F, J[j] = V, J[X] = fl, A(xl, J);
    },
    [m, N, A]
  ), R = m.reduce(
    (j, H) => j + (H.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ s.jsxs("details", { className: Ci, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ui, children: [
      "Scenes — ",
      m.length === 0 ? "none (single prompt)" : `${m.length} scenes`,
      R > 0 ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
        " · ",
        R.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ s.jsx("p", { className: I, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    m.map((j, H) => {
      const X = N[H] ?? `scene-fallback-${H}`, F = (P) => {
        if (P === "") return null;
        const fl = Number(P);
        return Number.isFinite(fl) ? fl : null;
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
                  /* @__PURE__ */ s.jsxs("strong", { className: I, children: [
                    "Scene ",
                    H + 1
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ s.jsx(
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
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(H, 1),
                        disabled: H === m.length - 1,
                        "aria-label": `Move scene ${H + 1} down`,
                        title: "Move down",
                        children: "↓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
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
            /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
              /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: `ltx-${X}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ s.jsx(
                "textarea",
                {
                  id: `ltx-${X}-prompt`,
                  className: ah,
                  value: j.prompt,
                  onChange: (P) => g(H, { prompt: P.target.value }),
                  placeholder: "what happens in this scene…",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
              /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
                /* @__PURE__ */ s.jsx(
                  "label",
                  {
                    className: gl,
                    htmlFor: `ltx-${X}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    id: `ltx-${X}-duration`,
                    className: Ml,
                    type: "number",
                    min: 1,
                    step: 0.5,
                    value: j.duration_seconds ?? "",
                    onChange: (P) => {
                      g(H, {
                        duration_seconds: F(P.target.value)
                      });
                    },
                    placeholder: "auto"
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
                /* @__PURE__ */ s.jsx(
                  "label",
                  {
                    className: gl,
                    htmlFor: `ltx-${X}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    id: `ltx-${X}-seed`,
                    className: Ml,
                    type: "number",
                    value: j.seed ?? "",
                    onChange: (P) => {
                      g(H, {
                        seed: F(P.target.value)
                      });
                    },
                    placeholder: "derived"
                  }
                )
              ] })
            ] })
          ]
        },
        X
      );
    }),
    /* @__PURE__ */ s.jsx("div", { className: fu, style: { marginTop: 10 }, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: Ts,
        onClick: O,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Py({
  draft: c,
  update: v
}) {
  const m = c.advanced ?? {}, o = Y.useCallback(
    (N, C) => {
      const A = { ...m };
      C == null ? delete A[N] : A[N] = C, v("advanced", Object.keys(A).length > 0 ? A : void 0);
    },
    [m, v]
  );
  return /* @__PURE__ */ s.jsxs("details", { className: Ci, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ui, children: [
      "Advanced — guidance, steps & offload",
      m.guidance_scale !== void 0 ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
        " · cfg ",
        m.guidance_scale
      ] }) : null,
      m.num_inference_steps !== void 0 ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
        " · ",
        m.num_inference_steps,
        " steps"
      ] }) : null,
      m.offload_mode && m.offload_mode !== "auto" ? /* @__PURE__ */ s.jsx("span", { className: I, children: ` · offload ${m.offload_mode}` }) : null
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: uu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: Ml,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: m.guidance_scale ?? "",
            onChange: (N) => {
              const C = N.target.value;
              o(
                "guidance_scale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-steps",
            className: Ml,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: m.num_inference_steps ?? "",
            onChange: (N) => {
              const C = N.target.value;
              o(
                "num_inference_steps",
                C === "" ? void 0 : Math.round(Number(C))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-offload-mode", children: "Offload strategy" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-offload-mode",
            className: Ml,
            value: m.offload_mode ?? "auto",
            onChange: (N) => {
              const C = N.target.value;
              o("offload_mode", C === "auto" ? void 0 : C);
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "auto", children: "Auto (profile default)" }),
              /* @__PURE__ */ s.jsx("option", { value: "none", children: "None — full GPU resident (needs 16 GB+)" }),
              /* @__PURE__ */ s.jsx("option", { value: "model", children: "Model — mid-grained offload (balanced)" }),
              /* @__PURE__ */ s.jsx("option", { value: "sequential", children: "Sequential — per-layer offload (lowest VRAM)" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "NVFP4 defaults to None; FP8 profiles default to Sequential. Pick None on a 16 GB+ card for the fastest inference." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-max-vram", children: "Max GPU VRAM (GiB)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-max-vram",
            className: Ml,
            type: "number",
            min: 4,
            max: 128,
            step: 1,
            value: m.max_gpu_vram_gib ?? "",
            onChange: (N) => {
              const C = N.target.value, A = Math.round(Number(C));
              o(
                "max_gpu_vram_gib",
                C === "" || !Number.isFinite(A) ? void 0 : A
              );
            },
            placeholder: "No cap"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Hard ceiling for model/sequential offload. Set ~1 GiB below your card (e.g. 15 on a 16 GB GPU) to stop NVFP4 spilling into shared VRAM. Ignored under None." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-scheduler", children: "Scheduler" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-scheduler",
            className: Ml,
            value: m.scheduler ?? "flow_match_euler",
            onChange: (N) => {
              const C = N.target.value;
              o(
                "scheduler",
                C === "flow_match_euler" ? void 0 : C
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "flow_match_euler", children: "Flow-match Euler — distilled-LTX default" }),
              /* @__PURE__ */ s.jsx("option", { value: "flow_match_heun", children: "Flow-match Heun — ~30% slower, marginally higher quality" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Non-flow-matching schedulers (DDIM, DPM++, UniPC) are intentionally absent — they break on LTX-2.3." })
      ] }),
      /* @__PURE__ */ s.jsx(lg, { advanced: m, setAdvanced: o })
    ] })
  ] });
}
function lg({
  advanced: c,
  setAdvanced: v
}) {
  const { data: m } = au(
    "ltx:models",
    () => $e.listModels(),
    { revalidateOnFocus: !1 }
  ), o = c.component_placement ?? {}, N = o.transformer && o.transformer !== "auto" || o.vae && o.vae !== "auto" || o.text_encoder && o.text_encoder !== "auto", C = (O, g) => {
    const _ = { ...o };
    g === "auto" ? delete _[O] : _[O] = g;
    const U = Object.keys(_).length === 0 || Object.values(_).every((R) => R === "auto" || R === void 0);
    v("component_placement", U ? void 0 : _);
  }, A = [
    o.transformer && o.transformer !== "auto" ? `T:${o.transformer}` : null,
    o.vae && o.vae !== "auto" ? `V:${o.vae}` : null,
    o.text_encoder && o.text_encoder !== "auto" ? `E:${o.text_encoder}` : null,
    c.quantization && c.quantization !== "none" ? `quant:${c.quantization}` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ s.jsxs("details", { className: Ci, style: { marginTop: 10 }, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ui, children: [
      "Pipeline tuning ",
      N ? "·" : "",
      " ",
      A ? /* @__PURE__ */ s.jsx("span", { className: I, children: A }) : null
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: uu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("span", { className: gl, children: "Per-component placement" }),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Override where each pipeline component lives. Auto follows the offload preset; explicit values switch the worker away from offload hooks onto direct .to(device) placement." }),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "Transformer",
            value: o.transformer ?? "auto",
            onChange: (O) => C("transformer", O)
          }
        ),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "VAE",
            value: o.vae ?? "auto",
            onChange: (O) => C("vae", O)
          }
        ),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "Text encoder",
            value: o.text_encoder ?? "auto",
            onChange: (O) => C("text_encoder", O)
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-quantization", children: "Weight quantisation" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-quantization",
            className: Ml,
            value: c.quantization ?? "none",
            onChange: (O) => {
              const g = O.target.value;
              v("quantization", g === "none" ? void 0 : g);
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "none", children: "None — raw bf16 (~83 GB, 80 GB+ card)" }),
              /* @__PURE__ */ s.jsx("option", { value: "nf4", children: "NF4 (bnb 4-bit) — ~22 GB, 16 GB-card default" }),
              /* @__PURE__ */ s.jsx("option", { value: "int8", children: "INT8 (bnb 8-bit) — ~42 GB, higher fidelity" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs("span", { className: I, children: [
          "Quantises BOTH the LTX-2.3 transformer and the Gemma-3 text encoder at load. The shipped checkpoint is raw bf16 (~83 GB); nvfp4 defaults to NF4 so it runs on a 16 GB card. Requires",
          " ",
          /* @__PURE__ */ s.jsx("code", { children: "bitsandbytes" }),
          " in the worker venv."
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-decode-timestep", children: "Decode timestep" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-decode-timestep",
            className: Ml,
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: c.decode_timestep ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "decode_timestep",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0.05 (pipeline default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Flow-matching trajectory decode point. 0.0–1.0. Lower → smoother motion at the cost of extra decoder work." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-image-cond-noise", children: "Image-conditioning noise" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-image-cond-noise",
            className: Ml,
            type: "number",
            min: 0,
            max: 0.3,
            step: 5e-3,
            value: c.image_cond_noise_scale ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "image_cond_noise_scale",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0.025 (pipeline default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Noise injected into the segment-chaining image latent. 0.0–0.3. Lower → sharper continuity across cuts (risk of stutter); higher → more creative drift." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-guidance-rescale", children: "Guidance rescale" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-guidance-rescale",
            className: Ml,
            type: "number",
            min: 0,
            max: 1,
            step: 0.05,
            value: c.guidance_rescale ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "guidance_rescale",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0 (off)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Rescales CFG to avoid over-saturation when guidance scale is pushed above ~7. 0.0–1.0. Leave at 0 unless you see burnt highlights." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-decode-noise-scale", children: "Decode noise scale" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-decode-noise-scale",
            className: Ml,
            type: "number",
            min: 0,
            max: 0.5,
            step: 5e-3,
            value: c.decode_noise_scale ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "decode_noise_scale",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0.025 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "VAE-decode noise. 0.0–0.5. Higher → grainier decode." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-condition-strength", children: "Condition strength" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-condition-strength",
            className: Ml,
            type: "number",
            min: 0,
            max: 1,
            step: 0.05,
            value: c.condition_strength ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "condition_strength",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0.7 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Scene-continuation anchor. 0.0–1.0. 1.0 fully anchors to the prior tail (static); lower lets the next scene animate while keeping identity." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-condition-tail-frames", children: "Condition tail frames" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-condition-tail-frames",
            className: Ml,
            type: "number",
            min: 1,
            max: 120,
            step: 1,
            value: c.condition_tail_frames ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "condition_tail_frames",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "24 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Trailing frames of the previous scene fed as the next scene's video condition. 1–120. Larger = more motion context but heavier conditioned VRAM (Q6 spills >16 GB)." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-interpolation", children: "Seam interpolation" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-interpolation",
            className: Ml,
            value: c.interpolation ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "interpolation",
                g === "" ? void 0 : g
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (overlap_blend)" }),
              /* @__PURE__ */ s.jsx("option", { value: "overlap_blend", children: "overlap_blend — trim + colour match (no model)" }),
              /* @__PURE__ */ s.jsx("option", { value: "film", children: "film — FILM motion bridge (Apache-2.0)" }),
              /* @__PURE__ */ s.jsx("option", { value: "rife2x", children: "rife2x — Practical-RIFE bridge" }),
              /* @__PURE__ */ s.jsx("option", { value: "none", children: "none — hard concat (legacy)" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Scene-boundary treatment. overlap_blend is the proven no-model default; film/rife add a motion-aware bridge (operator-supplied weights, graceful linear fallback)." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-seam-overlap-frames", children: "Seam overlap frames" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-seam-overlap-frames",
            className: Ml,
            type: "number",
            min: 0,
            max: 48,
            step: 1,
            value: c.seam_overlap_frames ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "seam_overlap_frames",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Frames trimmed from the re-rendered conditioned overlap. 0–48." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-seam-blend-frames", children: "Seam blend frames" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-seam-blend-frames",
            className: Ml,
            type: "number",
            min: 0,
            max: 24,
            step: 1,
            value: c.seam_blend_frames ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "seam_blend_frames",
                g === "" ? void 0 : Number(g)
              );
            },
            placeholder: "0 / 6 for model bridges"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Transition-bridge length. 0–24. A linear bridge ghosts on motion (kept 0 for overlap_blend); model bridges default 6." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-seam-color-match", children: "Seam colour match" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-seam-color-match",
            className: Ml,
            value: c.seam_color_match === void 0 ? "" : c.seam_color_match ? "on" : "off",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "seam_color_match",
                g === "" ? void 0 : g === "on"
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (on)" }),
              /* @__PURE__ */ s.jsx("option", { value: "on", children: "On — Reinhard match across boundary" }),
              /* @__PURE__ */ s.jsx("option", { value: "off", children: "Off" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Reinhard per-channel colour match removes the exposure/tone step at the cut." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-upscale", children: "720p two-pass upscale" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-upscale",
            className: Ml,
            value: c.upscale === void 0 ? "" : c.upscale ? "on" : "off",
            onChange: (O) => {
              const g = O.target.value;
              v("upscale", g === "" ? void 0 : g === "on");
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (off — native 768×512)" }),
              /* @__PURE__ */ s.jsx("option", { value: "on", children: "On — render then upscale to 1280×720" }),
              /* @__PURE__ */ s.jsx("option", { value: "off", children: "Off" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Opt-in official two-pass: render native → spatial latent upsample → tiled decode → 720p. Verified peak ≈13.5 GiB." })
      ] }),
      c.upscale === !0 && /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-upscale-mode", children: "Upscale mode" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-upscale-mode",
            className: Ml,
            value: c.upscale_mode ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "upscale_mode",
                g === "" ? void 0 : g
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (two-pass — refined)" }),
              /* @__PURE__ */ s.jsx("option", { value: "two_pass", children: "Two-pass — refined (crispest; needs Q4_K_M to fit 16 GB)" }),
              /* @__PURE__ */ s.jsx("option", { value: "decoupled", children: "Decoupled — no refine (fits Q5_K_S, faster, softer)" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Decoupled skips the transformer refine and decodes the upsampled latents directly — the only mode that fits full-frame 720p on a 16 GB card at the Q5_K_S default." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-model-id", children: "GGUF model" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-model-id",
            className: Ml,
            value: c.model_id ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v("model_id", g === "" ? void 0 : g);
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (profile quant)" }),
              (m ?? []).map((O) => /* @__PURE__ */ s.jsxs("option", { value: O.basename, children: [
                O.basename,
                " — ",
                O.label
              ] }, O.basename))
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "Per-render GGUF quant. Q5_K_S = balanced default; Q4_K_M = lighter (use for two-pass 720p); Q6_K/Q8_0 do not fit conditioned renders on a 16 GB card." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
        /* @__PURE__ */ s.jsx("label", { className: gl, htmlFor: "ltx-vae-tiling", children: "VAE tiling" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-vae-tiling",
            className: Ml,
            value: c.vae_tiling ?? "",
            onChange: (O) => {
              const g = O.target.value;
              v(
                "vae_tiling",
                g === "" ? void 0 : g
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "Default (mandatory 16 GB tiling)" }),
              /* @__PURE__ */ s.jsx("option", { value: "aggressive", children: "Aggressive — smaller tiles, lower VAE peak" }),
              /* @__PURE__ */ s.jsx("option", { value: "off", children: "Off — only safe on >16 GB cards" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: I, children: "VRAM↔seam tradeoff for the VAE encode/decode. Not the 720p spill lever (that is the transformer — use Decoupled or Q4_K_M). Off disables the mandatory 16 GB tiling." })
      ] })
    ] })
  ] });
}
function ss({
  label: c,
  value: v,
  onChange: m
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
                  checked: v === o,
                  onChange: () => m(o)
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
function tg({ plan: c }) {
  const v = c.vram_risk === "safe" ? nh : c.vram_risk === "moderate" ? uh : c.vram_risk === "risky" ? ih : ch;
  return /* @__PURE__ */ s.jsxs("div", { className: un, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ s.jsx("h3", { className: nu, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ s.jsx("span", { className: ga, children: c.mode })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ s.jsx("span", { className: ga, children: c.segment_count })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ s.jsxs("span", { className: ga, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ s.jsxs("span", { className: ga, children: [
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
      /* @__PURE__ */ s.jsxs("span", { className: ga, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ s.jsxs("span", { className: ga, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ s.jsx("span", { className: v, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ s.jsx("span", { className: ga, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ s.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((m) => /* @__PURE__ */ s.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ s.jsx("strong", { children: m.code }),
      ": ",
      m.message
    ] }, m.code)) }) : null
  ] });
}
function eg({
  run: c,
  onCancel: v,
  cancelling: m,
  onRetrySegment: o,
  retryingSegmentIndex: N,
  retryError: C
}) {
  if (!c)
    return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
      /* @__PURE__ */ s.jsx("h2", { className: nu, children: "Output" }),
      /* @__PURE__ */ s.jsx("p", { className: Dy, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const A = c.status === "completed" || c.status === "failed" || c.status === "cancelled", O = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
    /* @__PURE__ */ s.jsxs("h2", { className: nu, children: [
      "Render ",
      og(c.id)
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: I, children: [
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
    c.error_code ? /* @__PURE__ */ s.jsxs("div", { className: pa, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ s.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    C ? /* @__PURE__ */ s.jsx("div", { className: pa, role: "alert", "aria-live": "polite", children: C }) : null,
    /* @__PURE__ */ s.jsx(
      ng,
      {
        segments: c.segments,
        onRetry: O ? o : null,
        retryingSegmentIndex: N
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ s.jsx(sg, { artifactId: c.final_artifact_id }) : null,
    A ? null : /* @__PURE__ */ s.jsx("div", { className: fu, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: xy,
        onClick: v,
        disabled: m,
        "aria-busy": m,
        children: m ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function ag({ run: c }) {
  const v = ug(c), m = cg(c);
  return /* @__PURE__ */ s.jsxs("div", { className: yl, children: [
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
            m,
            v ? /* @__PURE__ */ s.jsxs("span", { className: I, children: [
              " · ",
              v
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
    /* @__PURE__ */ s.jsx("div", { className: Ty, children: /* @__PURE__ */ s.jsx(
      "div",
      {
        className: jy,
        style: { width: `${Math.max(2, c.progress_percent)}%` }
      }
    ) })
  ] });
}
function ng({
  segments: c,
  onRetry: v,
  retryingSegmentIndex: m
}) {
  return /* @__PURE__ */ s.jsx("div", { className: Ey, children: c.map((o) => {
    const N = m === o.index, C = v !== null && o.status === "failed";
    return /* @__PURE__ */ s.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ s.jsx("span", { className: fg(o.status) }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        "Segment ",
        o.index + 1,
        " · ",
        o.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: I, children: o.status }),
      C ? /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: Oi,
          onClick: () => v?.(o.index),
          disabled: m !== null,
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
  const v = c.segments.filter(
    (A) => A.status === "completed" && A.started_at && A.completed_at
  );
  if (v.length === 0)
    return null;
  const m = v.reduce((A, O) => {
    const g = Date.parse(O.started_at), _ = Date.parse(O.completed_at);
    return !Number.isFinite(g) || !Number.isFinite(_) || _ <= g ? A : A + (_ - g);
  }, 0);
  if (m === 0)
    return null;
  const o = m / v.length, N = c.segment_count - c.completed_segments;
  if (N <= 0)
    return null;
  const C = N * o;
  return `~${ig(C)} remaining`;
}
function ig(c) {
  const v = Math.round(c / 1e3);
  if (v < 60)
    return `${v}s`;
  const m = Math.floor(v / 60), o = v % 60;
  if (m < 60)
    return o === 0 ? `${m}m` : `${m}m ${o}s`;
  const N = Math.floor(m / 60), C = m % 60;
  return `${N}h ${C}m`;
}
function cg(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const v = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, m = c.last_breach_reason?.trim(), o = m ? `VRAM supervisor breach: ${m}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ s.jsxs("span", { className: I, "aria-live": "polite", title: o, children: [
    " · ",
    "restart ",
    c.restart_count,
    "/",
    v
  ] });
}
function fg(c) {
  switch (c) {
    case "queued":
      return bs;
    case "rendering":
      return fh;
    case "completed":
      return sh;
    case "failed":
      return oh;
    default:
      return bs;
  }
}
function sg({ artifactId: c }) {
  const v = py(c);
  return /* @__PURE__ */ s.jsxs("div", { className: zy, children: [
    /* @__PURE__ */ s.jsx("video", { className: Ay, src: v, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ s.jsx(
      "a",
      {
        className: Oy,
        href: v,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ s.jsxs("p", { className: I, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function og(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const Mi = "ltx23-video-app", rg = new URL("./ltx23-video.css", import.meta.url).href;
class dh extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = Y0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(v) {
    const m = document.createElement("link");
    m.rel = "stylesheet", m.href = rg, v.appendChild(m);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ s.jsx(Y.StrictMode, { children: /* @__PURE__ */ s.jsx(Vy, {}) })
    );
  }
}
customElements.get(Mi) || customElements.define(Mi, dh);
function dg() {
  customElements.get(Mi) || customElements.define(Mi, dh);
}
export {
  dg as register
};
//# sourceMappingURL=ltx23-video.js.map
