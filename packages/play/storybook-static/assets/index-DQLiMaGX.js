var ig = Object.defineProperty;
var lg = (e, t, r) =>
  t in e
    ? ig(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var ye = (e, t, r) => lg(e, typeof t != "symbol" ? t + "" : t, r);
const { once: sg } = __STORYBOOK_MODULE_CLIENT_LOGGER__,
  {
    FORCE_REMOUNT: Xl,
    STORY_RENDER_PHASE_CHANGED: ug,
    SET_CURRENT_STORY: cg,
  } = __STORYBOOK_MODULE_CORE_EVENTS__,
  { addons: dg } = __STORYBOOK_MODULE_PREVIEW_API__,
  { global: Ne } = __STORYBOOK_MODULE_GLOBAL__;
var fg = ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
        ? new Proxy(e, {
            get: (t, r) => (typeof require < "u" ? require : t)[r],
          })
        : e)(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  pg = {
    reset: [0, 0],
    bold: [1, 22, "\x1B[22m\x1B[1m"],
    dim: [2, 22, "\x1B[22m\x1B[2m"],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    blackBright: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],
    bgBlackBright: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49],
  },
  hg = Object.entries(pg);
function gi(e) {
  return String(e);
}
gi.open = "";
gi.close = "";
function mg(e = !1) {
  let t = typeof process < "u" ? process : void 0,
    r = (t == null ? void 0 : t.env) || {},
    n = (t == null ? void 0 : t.argv) || [];
  return (
    (!("NO_COLOR" in r || n.includes("--no-color")) &&
      ("FORCE_COLOR" in r ||
        n.includes("--color") ||
        (t == null ? void 0 : t.platform) === "win32" ||
        (e && r.TERM !== "dumb") ||
        "CI" in r)) ||
    (typeof window < "u" && !!window.chrome)
  );
}
function bg(e = !1) {
  let t = mg(e),
    r = (i, l, u, c) => {
      let s = "",
        d = 0;
      do
        (s += i.substring(d, c) + u), (d = c + l.length), (c = i.indexOf(l, d));
      while (~c);
      return s + i.substring(d);
    },
    n = (i, l, u = i) => {
      let c = (s) => {
        let d = String(s),
          p = d.indexOf(l, i.length);
        return ~p ? i + r(d, l, u, p) + l : i + d + l;
      };
      return (c.open = i), (c.close = l), c;
    },
    a = { isColorSupported: t },
    o = (i) => `\x1B[${i}m`;
  for (let [i, l] of hg) a[i] = t ? n(o(l[0]), o(l[1]), l[2]) : gi;
  return a;
}
var pt = bg(!1);
function gg(e, t) {
  let r = Object.keys(e),
    n = t === null ? r : r.sort(t);
  if (Object.getOwnPropertySymbols)
    for (let a of Object.getOwnPropertySymbols(e))
      Object.getOwnPropertyDescriptor(e, a).enumerable && n.push(a);
  return n;
}
function aa(e, t, r, n, a, o, i = ": ") {
  let l = "",
    u = 0,
    c = e.next();
  if (!c.done) {
    l += t.spacingOuter;
    let s = r + t.indent;
    for (; !c.done; ) {
      if (((l += s), u++ === t.maxWidth)) {
        l += "…";
        break;
      }
      let d = o(c.value[0], t, s, n, a),
        p = o(c.value[1], t, s, n, a);
      (l += d + i + p),
        (c = e.next()),
        c.done ? t.min || (l += ",") : (l += `,${t.spacingInner}`);
    }
    l += t.spacingOuter + r;
  }
  return l;
}
function yi(e, t, r, n, a, o) {
  let i = "",
    l = 0,
    u = e.next();
  if (!u.done) {
    i += t.spacingOuter;
    let c = r + t.indent;
    for (; !u.done; ) {
      if (((i += c), l++ === t.maxWidth)) {
        i += "…";
        break;
      }
      (i += o(u.value, t, c, n, a)),
        (u = e.next()),
        u.done ? t.min || (i += ",") : (i += `,${t.spacingInner}`);
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function Bn(e, t, r, n, a, o) {
  let i = "";
  e = e instanceof ArrayBuffer ? new DataView(e) : e;
  let l = (c) => c instanceof DataView,
    u = l(e) ? e.byteLength : e.length;
  if (u > 0) {
    i += t.spacingOuter;
    let c = r + t.indent;
    for (let s = 0; s < u; s++) {
      if (((i += c), s === t.maxWidth)) {
        i += "…";
        break;
      }
      (l(e) || s in e) && (i += o(l(e) ? e.getInt8(s) : e[s], t, c, n, a)),
        s < u - 1 ? (i += `,${t.spacingInner}`) : t.min || (i += ",");
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function vi(e, t, r, n, a, o) {
  let i = "",
    l = gg(e, t.compareKeys);
  if (l.length > 0) {
    i += t.spacingOuter;
    let u = r + t.indent;
    for (let c = 0; c < l.length; c++) {
      let s = l[c],
        d = o(s, t, u, n, a),
        p = o(e[s], t, u, n, a);
      (i += `${u + d}: ${p}`),
        c < l.length - 1 ? (i += `,${t.spacingInner}`) : t.min || (i += ",");
    }
    i += t.spacingOuter + r;
  }
  return i;
}
var yg =
    typeof Symbol == "function" && Symbol.for
      ? Symbol.for("jest.asymmetricMatcher")
      : 1267621,
  Ia = " ",
  vg = (e, t, r, n, a, o) => {
    let i = e.toString();
    if (i === "ArrayContaining" || i === "ArrayNotContaining")
      return ++n > t.maxDepth
        ? `[${i}]`
        : `${i + Ia}[${Bn(e.sample, t, r, n, a, o)}]`;
    if (i === "ObjectContaining" || i === "ObjectNotContaining")
      return ++n > t.maxDepth
        ? `[${i}]`
        : `${i + Ia}{${vi(e.sample, t, r, n, a, o)}}`;
    if (
      i === "StringMatching" ||
      i === "StringNotMatching" ||
      i === "StringContaining" ||
      i === "StringNotContaining"
    )
      return i + Ia + o(e.sample, t, r, n, a);
    if (typeof e.toAsymmetricMatcher != "function")
      throw new TypeError(
        `Asymmetric matcher ${e.constructor.name} does not implement toAsymmetricMatcher()`,
      );
    return e.toAsymmetricMatcher();
  },
  _g = (e) => e && e.$$typeof === yg,
  Eg = { serialize: vg, test: _g },
  wg = " ",
  Hc = new Set(["DOMStringMap", "NamedNodeMap"]),
  Cg = /^(?:HTML\w*Collection|NodeList)$/;
function Rg(e) {
  return Hc.has(e) || Cg.test(e);
}
var Tg = (e) =>
  e && e.constructor && !!e.constructor.name && Rg(e.constructor.name);
function Sg(e) {
  return e.constructor.name === "NamedNodeMap";
}
var Pg = (e, t, r, n, a, o) => {
    let i = e.constructor.name;
    return ++n > t.maxDepth
      ? `[${i}]`
      : (t.min ? "" : i + wg) +
          (Hc.has(i)
            ? `{${vi(Sg(e) ? [...e].reduce((l, u) => ((l[u.name] = u.value), l), {}) : { ...e }, t, r, n, a, o)}}`
            : `[${Bn([...e], t, r, n, a, o)}]`);
  },
  Og = { serialize: Pg, test: Tg };
function zc(e) {
  return e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function _i(e, t, r, n, a, o, i) {
  let l = n + r.indent,
    u = r.colors;
  return e
    .map((c) => {
      let s = t[c],
        d = i(s, r, l, a, o);
      return (
        typeof s != "string" &&
          (d.includes(`
`) && (d = r.spacingOuter + l + d + r.spacingOuter + n),
          (d = `{${d}}`)),
        `${r.spacingInner + n + u.prop.open + c + u.prop.close}=${u.value.open}${d}${u.value.close}`
      );
    })
    .join("");
}
function Ei(e, t, r, n, a, o) {
  return e
    .map(
      (i) =>
        t.spacingOuter +
        r +
        (typeof i == "string" ? Vc(i, t) : o(i, t, r, n, a)),
    )
    .join("");
}
function Vc(e, t) {
  let r = t.colors.content;
  return r.open + zc(e) + r.close;
}
function Ag(e, t) {
  let r = t.colors.comment;
  return `${r.open}<!--${zc(e)}-->${r.close}`;
}
function wi(e, t, r, n, a) {
  let o = n.colors.tag;
  return `${o.open}<${e}${t && o.close + t + n.spacingOuter + a + o.open}${r ? `>${o.close}${r}${n.spacingOuter}${a}${o.open}</${e}` : `${t && !n.min ? "" : " "}/`}>${o.close}`;
}
function Ci(e, t) {
  let r = t.colors.tag;
  return `${r.open}<${e}${r.close} …${r.open} />${r.close}`;
}
var qg = 1,
  Gc = 3,
  Wc = 8,
  Kc = 11,
  xg = /^(?:(?:HTML|SVG)\w*)?Element$/;
function Mg(e) {
  try {
    return typeof e.hasAttribute == "function" && e.hasAttribute("is");
  } catch {
    return !1;
  }
}
function $g(e) {
  let t = e.constructor.name,
    { nodeType: r, tagName: n } = e,
    a = (typeof n == "string" && n.includes("-")) || Mg(e);
  return (
    (r === qg && (xg.test(t) || a)) ||
    (r === Gc && t === "Text") ||
    (r === Wc && t === "Comment") ||
    (r === Kc && t === "DocumentFragment")
  );
}
var Ng = (e) => {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.name) &&
    $g(e)
  );
};
function jg(e) {
  return e.nodeType === Gc;
}
function Ig(e) {
  return e.nodeType === Wc;
}
function La(e) {
  return e.nodeType === Kc;
}
var Lg = (e, t, r, n, a, o) => {
    if (jg(e)) return Vc(e.data, t);
    if (Ig(e)) return Ag(e.data, t);
    let i = La(e) ? "DocumentFragment" : e.tagName.toLowerCase();
    return ++n > t.maxDepth
      ? Ci(i, t)
      : wi(
          i,
          _i(
            La(e) ? [] : Array.from(e.attributes, (l) => l.name).sort(),
            La(e)
              ? {}
              : [...e.attributes].reduce(
                  (l, u) => ((l[u.name] = u.value), l),
                  {},
                ),
            t,
            r + t.indent,
            n,
            a,
            o,
          ),
          Ei(
            Array.prototype.slice.call(e.childNodes || e.children),
            t,
            r + t.indent,
            n,
            a,
            o,
          ),
          t,
          r,
        );
  },
  Bg = { serialize: Lg, test: Ng },
  kg = "@@__IMMUTABLE_ITERABLE__@@",
  Dg = "@@__IMMUTABLE_LIST__@@",
  Fg = "@@__IMMUTABLE_KEYED__@@",
  Ug = "@@__IMMUTABLE_MAP__@@",
  Ql = "@@__IMMUTABLE_ORDERED__@@",
  Hg = "@@__IMMUTABLE_RECORD__@@",
  zg = "@@__IMMUTABLE_SEQ__@@",
  Vg = "@@__IMMUTABLE_SET__@@",
  Gg = "@@__IMMUTABLE_STACK__@@",
  pr = (e) => `Immutable.${e}`,
  oa = (e) => `[${e}]`,
  zr = " ",
  Zl = "…";
function Wg(e, t, r, n, a, o, i) {
  return ++n > t.maxDepth
    ? oa(pr(i))
    : `${pr(i) + zr}{${aa(e.entries(), t, r, n, a, o)}}`;
}
function Kg(e) {
  let t = 0;
  return {
    next() {
      if (t < e._keys.length) {
        let r = e._keys[t++];
        return { done: !1, value: [r, e.get(r)] };
      }
      return { done: !0, value: void 0 };
    },
  };
}
function Yg(e, t, r, n, a, o) {
  let i = pr(e._name || "Record");
  return ++n > t.maxDepth ? oa(i) : `${i + zr}{${aa(Kg(e), t, r, n, a, o)}}`;
}
function Jg(e, t, r, n, a, o) {
  let i = pr("Seq");
  return ++n > t.maxDepth
    ? oa(i)
    : e[Fg]
      ? `${i + zr}{${e._iter || e._object ? aa(e.entries(), t, r, n, a, o) : Zl}}`
      : `${i + zr}[${e._iter || e._array || e._collection || e._iterable ? yi(e.values(), t, r, n, a, o) : Zl}]`;
}
function Ba(e, t, r, n, a, o, i) {
  return ++n > t.maxDepth
    ? oa(pr(i))
    : `${pr(i) + zr}[${yi(e.values(), t, r, n, a, o)}]`;
}
var Xg = (e, t, r, n, a, o) =>
    e[Ug]
      ? Wg(e, t, r, n, a, o, e[Ql] ? "OrderedMap" : "Map")
      : e[Dg]
        ? Ba(e, t, r, n, a, o, "List")
        : e[Vg]
          ? Ba(e, t, r, n, a, o, e[Ql] ? "OrderedSet" : "Set")
          : e[Gg]
            ? Ba(e, t, r, n, a, o, "Stack")
            : e[zg]
              ? Jg(e, t, r, n, a, o)
              : Yg(e, t, r, n, a, o),
  Qg = (e) => e && (e[kg] === !0 || e[Hg] === !0),
  Zg = { serialize: Xg, test: Qg },
  es = { exports: {} },
  ae = {},
  ts;
function ey() {
  return (
    ts ||
      ((ts = 1),
      (function () {
        var e = Symbol.for("react.element"),
          t = Symbol.for("react.portal"),
          r = Symbol.for("react.fragment"),
          n = Symbol.for("react.strict_mode"),
          a = Symbol.for("react.profiler"),
          o = Symbol.for("react.provider"),
          i = Symbol.for("react.context"),
          l = Symbol.for("react.server_context"),
          u = Symbol.for("react.forward_ref"),
          c = Symbol.for("react.suspense"),
          s = Symbol.for("react.suspense_list"),
          d = Symbol.for("react.memo"),
          p = Symbol.for("react.lazy"),
          f = Symbol.for("react.offscreen"),
          h = !1,
          m = !1,
          g = !1,
          b = !1,
          y = !1,
          R;
        R = Symbol.for("react.module.reference");
        function _($) {
          return !!(
            typeof $ == "string" ||
            typeof $ == "function" ||
            $ === r ||
            $ === a ||
            y ||
            $ === n ||
            $ === c ||
            $ === s ||
            b ||
            $ === f ||
            h ||
            m ||
            g ||
            (typeof $ == "object" &&
              $ !== null &&
              ($.$$typeof === p ||
                $.$$typeof === d ||
                $.$$typeof === o ||
                $.$$typeof === i ||
                $.$$typeof === u ||
                $.$$typeof === R ||
                $.getModuleId !== void 0))
          );
        }
        function C($) {
          if (typeof $ == "object" && $ !== null) {
            var se = $.$$typeof;
            switch (se) {
              case e:
                var ue = $.type;
                switch (ue) {
                  case r:
                  case a:
                  case n:
                  case c:
                  case s:
                    return ue;
                  default:
                    var we = ue && ue.$$typeof;
                    switch (we) {
                      case l:
                      case i:
                      case u:
                      case p:
                      case d:
                      case o:
                        return we;
                      default:
                        return se;
                    }
                }
              case t:
                return se;
            }
          }
        }
        var w = i,
          v = o,
          E = e,
          O = u,
          M = r,
          N = p,
          k = d,
          j = t,
          I = a,
          B = n,
          z = c,
          K = s,
          W = !1,
          re = !1;
        function me($) {
          return (
            W ||
              ((W = !0),
              console.warn(
                "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function de($) {
          return (
            re ||
              ((re = !0),
              console.warn(
                "The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function F($) {
          return C($) === i;
        }
        function L($) {
          return C($) === o;
        }
        function D($) {
          return typeof $ == "object" && $ !== null && $.$$typeof === e;
        }
        function G($) {
          return C($) === u;
        }
        function Y($) {
          return C($) === r;
        }
        function ne($) {
          return C($) === p;
        }
        function fe($) {
          return C($) === d;
        }
        function Be($) {
          return C($) === t;
        }
        function q($) {
          return C($) === a;
        }
        function V($) {
          return C($) === n;
        }
        function U($) {
          return C($) === c;
        }
        function Q($) {
          return C($) === s;
        }
        (ae.ContextConsumer = w),
          (ae.ContextProvider = v),
          (ae.Element = E),
          (ae.ForwardRef = O),
          (ae.Fragment = M),
          (ae.Lazy = N),
          (ae.Memo = k),
          (ae.Portal = j),
          (ae.Profiler = I),
          (ae.StrictMode = B),
          (ae.Suspense = z),
          (ae.SuspenseList = K),
          (ae.isAsyncMode = me),
          (ae.isConcurrentMode = de),
          (ae.isContextConsumer = F),
          (ae.isContextProvider = L),
          (ae.isElement = D),
          (ae.isForwardRef = G),
          (ae.isFragment = Y),
          (ae.isLazy = ne),
          (ae.isMemo = fe),
          (ae.isPortal = Be),
          (ae.isProfiler = q),
          (ae.isStrictMode = V),
          (ae.isSuspense = U),
          (ae.isSuspenseList = Q),
          (ae.isValidElementType = _),
          (ae.typeOf = C);
      })()),
    ae
  );
}
var rs;
function ty() {
  return rs || ((rs = 1), (es.exports = ey())), es.exports;
}
var Dt = ty();
function Yc(e, t = []) {
  if (Array.isArray(e)) for (let r of e) Yc(r, t);
  else e != null && e !== !1 && e !== "" && t.push(e);
  return t;
}
function ns(e) {
  let t = e.type;
  if (typeof t == "string") return t;
  if (typeof t == "function") return t.displayName || t.name || "Unknown";
  if (Dt.isFragment(e)) return "React.Fragment";
  if (Dt.isSuspense(e)) return "React.Suspense";
  if (typeof t == "object" && t !== null) {
    if (Dt.isContextProvider(e)) return "Context.Provider";
    if (Dt.isContextConsumer(e)) return "Context.Consumer";
    if (Dt.isForwardRef(e)) {
      if (t.displayName) return t.displayName;
      let r = t.render.displayName || t.render.name || "";
      return r === "" ? "ForwardRef" : `ForwardRef(${r})`;
    }
    if (Dt.isMemo(e)) {
      let r = t.displayName || t.type.displayName || t.type.name || "";
      return r === "" ? "Memo" : `Memo(${r})`;
    }
  }
  return "UNDEFINED";
}
function ry(e) {
  let { props: t } = e;
  return Object.keys(t)
    .filter((r) => r !== "children" && t[r] !== void 0)
    .sort();
}
var ny = (e, t, r, n, a, o) =>
    ++n > t.maxDepth
      ? Ci(ns(e), t)
      : wi(
          ns(e),
          _i(ry(e), e.props, t, r + t.indent, n, a, o),
          Ei(Yc(e.props.children), t, r + t.indent, n, a, o),
          t,
          r,
        ),
  ay = (e) => e != null && Dt.isElement(e),
  oy = { serialize: ny, test: ay },
  iy =
    typeof Symbol == "function" && Symbol.for
      ? Symbol.for("react.test.json")
      : 245830487;
function ly(e) {
  let { props: t } = e;
  return t
    ? Object.keys(t)
        .filter((r) => t[r] !== void 0)
        .sort()
    : [];
}
var sy = (e, t, r, n, a, o) =>
    ++n > t.maxDepth
      ? Ci(e.type, t)
      : wi(
          e.type,
          e.props ? _i(ly(e), e.props, t, r + t.indent, n, a, o) : "",
          e.children ? Ei(e.children, t, r + t.indent, n, a, o) : "",
          t,
          r,
        ),
  uy = (e) => e && e.$$typeof === iy,
  cy = { serialize: sy, test: uy },
  Jc = Object.prototype.toString,
  dy = Date.prototype.toISOString,
  fy = Error.prototype.toString,
  as = RegExp.prototype.toString;
function ka(e) {
  return (typeof e.constructor == "function" && e.constructor.name) || "Object";
}
function py(e) {
  return typeof window < "u" && e === window;
}
var hy = /^Symbol\((.*)\)(.*)$/,
  my = /\n/g,
  Xc = class extends Error {
    constructor(t, r) {
      super(t), (this.stack = r), (this.name = this.constructor.name);
    }
  };
function by(e) {
  return (
    e === "[object Array]" ||
    e === "[object ArrayBuffer]" ||
    e === "[object DataView]" ||
    e === "[object Float32Array]" ||
    e === "[object Float64Array]" ||
    e === "[object Int8Array]" ||
    e === "[object Int16Array]" ||
    e === "[object Int32Array]" ||
    e === "[object Uint8Array]" ||
    e === "[object Uint8ClampedArray]" ||
    e === "[object Uint16Array]" ||
    e === "[object Uint32Array]"
  );
}
function gy(e) {
  return Object.is(e, -0) ? "-0" : String(e);
}
function yy(e) {
  return `${e}n`;
}
function os(e, t) {
  return t ? `[Function ${e.name || "anonymous"}]` : "[Function]";
}
function is(e) {
  return String(e).replace(hy, "Symbol($1)");
}
function ls(e) {
  return `[${fy.call(e)}]`;
}
function Qc(e, t, r, n) {
  if (e === !0 || e === !1) return `${e}`;
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  let a = typeof e;
  if (a === "number") return gy(e);
  if (a === "bigint") return yy(e);
  if (a === "string")
    return n ? `"${e.replaceAll(/"|\\/g, "\\$&")}"` : `"${e}"`;
  if (a === "function") return os(e, t);
  if (a === "symbol") return is(e);
  let o = Jc.call(e);
  return o === "[object WeakMap]"
    ? "WeakMap {}"
    : o === "[object WeakSet]"
      ? "WeakSet {}"
      : o === "[object Function]" || o === "[object GeneratorFunction]"
        ? os(e, t)
        : o === "[object Symbol]"
          ? is(e)
          : o === "[object Date]"
            ? Number.isNaN(+e)
              ? "Date { NaN }"
              : dy.call(e)
            : o === "[object Error]"
              ? ls(e)
              : o === "[object RegExp]"
                ? r
                  ? as.call(e).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&")
                  : as.call(e)
                : e instanceof Error
                  ? ls(e)
                  : null;
}
function Zc(e, t, r, n, a, o) {
  if (a.includes(e)) return "[Circular]";
  (a = [...a]), a.push(e);
  let i = ++n > t.maxDepth,
    l = t.min;
  if (t.callToJSON && !i && e.toJSON && typeof e.toJSON == "function" && !o)
    return Ot(e.toJSON(), t, r, n, a, !0);
  let u = Jc.call(e);
  return u === "[object Arguments]"
    ? i
      ? "[Arguments]"
      : `${l ? "" : "Arguments "}[${Bn(e, t, r, n, a, Ot)}]`
    : by(u)
      ? i
        ? `[${e.constructor.name}]`
        : `${l || (!t.printBasicPrototype && e.constructor.name === "Array") ? "" : `${e.constructor.name} `}[${Bn(e, t, r, n, a, Ot)}]`
      : u === "[object Map]"
        ? i
          ? "[Map]"
          : `Map {${aa(e.entries(), t, r, n, a, Ot, " => ")}}`
        : u === "[object Set]"
          ? i
            ? "[Set]"
            : `Set {${yi(e.values(), t, r, n, a, Ot)}}`
          : i || py(e)
            ? `[${ka(e)}]`
            : `${l || (!t.printBasicPrototype && ka(e) === "Object") ? "" : `${ka(e)} `}{${vi(e, t, r, n, a, Ot)}}`;
}
function vy(e) {
  return e.serialize != null;
}
function ed(e, t, r, n, a, o) {
  let i;
  try {
    i = vy(e)
      ? e.serialize(t, r, n, a, o, Ot)
      : e.print(
          t,
          (l) => Ot(l, r, n, a, o),
          (l) => {
            let u = n + r.indent;
            return (
              u +
              l.replaceAll(
                my,
                `
${u}`,
              )
            );
          },
          { edgeSpacing: r.spacingOuter, min: r.min, spacing: r.spacingInner },
          r.colors,
        );
  } catch (l) {
    throw new Xc(l.message, l.stack);
  }
  if (typeof i != "string")
    throw new TypeError(
      `pretty-format: Plugin must return type "string" but instead returned "${typeof i}".`,
    );
  return i;
}
function td(e, t) {
  for (let r of e)
    try {
      if (r.test(t)) return r;
    } catch (n) {
      throw new Xc(n.message, n.stack);
    }
  return null;
}
function Ot(e, t, r, n, a, o) {
  let i = td(t.plugins, e);
  if (i !== null) return ed(i, e, t, r, n, a);
  let l = Qc(e, t.printFunctionName, t.escapeRegex, t.escapeString);
  return l !== null ? l : Zc(e, t, r, n, a, o);
}
var Ri = {
    comment: "gray",
    content: "reset",
    prop: "yellow",
    tag: "cyan",
    value: "green",
  },
  rd = Object.keys(Ri),
  We = {
    callToJSON: !0,
    compareKeys: void 0,
    escapeRegex: !1,
    escapeString: !0,
    highlight: !1,
    indent: 2,
    maxDepth: Number.POSITIVE_INFINITY,
    maxWidth: Number.POSITIVE_INFINITY,
    min: !1,
    plugins: [],
    printBasicPrototype: !0,
    printFunctionName: !0,
    theme: Ri,
  };
function _y(e) {
  for (let t of Object.keys(e))
    if (!Object.prototype.hasOwnProperty.call(We, t))
      throw new Error(`pretty-format: Unknown option "${t}".`);
  if (e.min && e.indent !== void 0 && e.indent !== 0)
    throw new Error(
      'pretty-format: Options "min" and "indent" cannot be used together.',
    );
}
function Ey() {
  return rd.reduce((e, t) => {
    let r = Ri[t],
      n = r && pt[r];
    if (n && typeof n.close == "string" && typeof n.open == "string") e[t] = n;
    else
      throw new Error(
        `pretty-format: Option "theme" has a key "${t}" whose value "${r}" is undefined in ansi-styles.`,
      );
    return e;
  }, Object.create(null));
}
function wy() {
  return rd.reduce(
    (e, t) => ((e[t] = { close: "", open: "" }), e),
    Object.create(null),
  );
}
function nd(e) {
  return (e == null ? void 0 : e.printFunctionName) ?? We.printFunctionName;
}
function ad(e) {
  return (e == null ? void 0 : e.escapeRegex) ?? We.escapeRegex;
}
function od(e) {
  return (e == null ? void 0 : e.escapeString) ?? We.escapeString;
}
function ss(e) {
  return {
    callToJSON: (e == null ? void 0 : e.callToJSON) ?? We.callToJSON,
    colors: e != null && e.highlight ? Ey() : wy(),
    compareKeys:
      typeof (e == null ? void 0 : e.compareKeys) == "function" ||
      (e == null ? void 0 : e.compareKeys) === null
        ? e.compareKeys
        : We.compareKeys,
    escapeRegex: ad(e),
    escapeString: od(e),
    indent:
      e != null && e.min
        ? ""
        : Cy((e == null ? void 0 : e.indent) ?? We.indent),
    maxDepth: (e == null ? void 0 : e.maxDepth) ?? We.maxDepth,
    maxWidth: (e == null ? void 0 : e.maxWidth) ?? We.maxWidth,
    min: (e == null ? void 0 : e.min) ?? We.min,
    plugins: (e == null ? void 0 : e.plugins) ?? We.plugins,
    printBasicPrototype: (e == null ? void 0 : e.printBasicPrototype) ?? !0,
    printFunctionName: nd(e),
    spacingInner:
      e != null && e.min
        ? " "
        : `
`,
    spacingOuter:
      e != null && e.min
        ? ""
        : `
`,
  };
}
function Cy(e) {
  return Array.from({ length: e + 1 }).join(" ");
}
function rt(e, t) {
  if (t && (_y(t), t.plugins)) {
    let n = td(t.plugins, e);
    if (n !== null) return ed(n, e, ss(t), "", 0, []);
  }
  let r = Qc(e, nd(t), ad(t), od(t));
  return r !== null ? r : Zc(e, ss(t), "", 0, []);
}
var id = {
    AsymmetricMatcher: Eg,
    DOMCollection: Og,
    DOMElement: Bg,
    Immutable: Zg,
    ReactElement: oy,
    ReactTestComponent: cy,
  },
  us = {
    bold: ["1", "22"],
    dim: ["2", "22"],
    italic: ["3", "23"],
    underline: ["4", "24"],
    inverse: ["7", "27"],
    hidden: ["8", "28"],
    strike: ["9", "29"],
    black: ["30", "39"],
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    magenta: ["35", "39"],
    cyan: ["36", "39"],
    white: ["37", "39"],
    brightblack: ["30;1", "39"],
    brightred: ["31;1", "39"],
    brightgreen: ["32;1", "39"],
    brightyellow: ["33;1", "39"],
    brightblue: ["34;1", "39"],
    brightmagenta: ["35;1", "39"],
    brightcyan: ["36;1", "39"],
    brightwhite: ["37;1", "39"],
    grey: ["90", "39"],
  },
  Ry = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
  },
  hr = "…";
function Ty(e, t) {
  let r = us[Ry[t]] || us[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
function Sy(
  {
    showHidden: e = !1,
    depth: t = 2,
    colors: r = !1,
    customInspect: n = !0,
    showProxy: a = !1,
    maxArrayLength: o = 1 / 0,
    breakLength: i = 1 / 0,
    seen: l = [],
    truncate: u = 1 / 0,
    stylize: c = String,
  } = {},
  s,
) {
  let d = {
    showHidden: !!e,
    depth: Number(t),
    colors: !!r,
    customInspect: !!n,
    showProxy: !!a,
    maxArrayLength: Number(o),
    breakLength: Number(i),
    truncate: Number(u),
    seen: l,
    inspect: s,
    stylize: c,
  };
  return d.colors && (d.stylize = Ty), d;
}
function Py(e) {
  return e >= "\uD800" && e <= "\uDBFF";
}
function It(e, t, r = hr) {
  e = String(e);
  let n = r.length,
    a = e.length;
  if (n > t && a > n) return r;
  if (a > t && a > n) {
    let o = t - n;
    return o > 0 && Py(e[o - 1]) && (o = o - 1), `${e.slice(0, o)}${r}`;
  }
  return e;
}
function Qe(e, t, r, n = ", ") {
  r = r || t.inspect;
  let a = e.length;
  if (a === 0) return "";
  let o = t.truncate,
    i = "",
    l = "",
    u = "";
  for (let c = 0; c < a; c += 1) {
    let s = c + 1 === e.length,
      d = c + 2 === e.length;
    u = `${hr}(${e.length - c})`;
    let p = e[c];
    t.truncate = o - i.length - (s ? 0 : n.length);
    let f = l || r(p, t) + (s ? "" : n),
      h = i.length + f.length,
      m = h + u.length;
    if (
      (s && h > o && i.length + u.length <= o) ||
      (!s && !d && m > o) ||
      ((l = s ? "" : r(e[c + 1], t) + (d ? "" : n)),
      !s && d && m > o && h + l.length > o)
    )
      break;
    if (((i += f), !s && !d && h + l.length >= o)) {
      u = `${hr}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${i}${u}`;
}
function Oy(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)
    ? e
    : JSON.stringify(e)
        .replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
}
function Vr([e, t], r) {
  return (
    (r.truncate -= 2),
    typeof e == "string"
      ? (e = Oy(e))
      : typeof e != "number" && (e = `[${r.inspect(e, r)}]`),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e}: ${t}`
  );
}
function Ay(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = Qe(e, t);
  t.truncate -= n.length;
  let a = "";
  return (
    r.length &&
      (a = Qe(
        r.map((o) => [o, e[o]]),
        t,
        Vr,
      )),
    `[ ${n}${a ? `, ${a}` : ""} ]`
  );
}
var qy = (e) =>
  typeof Buffer == "function" && e instanceof Buffer
    ? "Buffer"
    : e[Symbol.toStringTag]
      ? e[Symbol.toStringTag]
      : e.constructor.name;
function ut(e, t) {
  let r = qy(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let a = "";
  for (let i = 0; i < e.length; i++) {
    let l = `${t.stylize(It(e[i], t.truncate), "number")}${i === e.length - 1 ? "" : ", "}`;
    if (((t.truncate -= l.length), e[i] !== e.length && t.truncate <= 3)) {
      a += `${hr}(${e.length - e[i] + 1})`;
      break;
    }
    a += l;
  }
  let o = "";
  return (
    n.length &&
      (o = Qe(
        n.map((i) => [i, e[i]]),
        t,
        Vr,
      )),
    `${r}[ ${a}${o ? `, ${o}` : ""} ]`
  );
}
function xy(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"),
    a = n[0];
  return t.stylize(`${a}T${It(n[1], t.truncate - a.length - 1)}`, "date");
}
function cs(e, t) {
  let r = e[Symbol.toStringTag] || "Function",
    n = e.name;
  return n
    ? t.stylize(`[${r} ${It(n, t.truncate - 11)}]`, "special")
    : t.stylize(`[${r}]`, "special");
}
function My([e, t], r) {
  return (
    (r.truncate -= 4),
    (e = r.inspect(e, r)),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e} => ${t}`
  );
}
function $y(e) {
  let t = [];
  return (
    e.forEach((r, n) => {
      t.push([n, r]);
    }),
    t
  );
}
function Ny(e, t) {
  return e.size - 1 <= 0
    ? "Map{}"
    : ((t.truncate -= 7), `Map{ ${Qe($y(e), t, My)} }`);
}
var jy = Number.isNaN || ((e) => e !== e);
function ds(e, t) {
  return jy(e)
    ? t.stylize("NaN", "number")
    : e === 1 / 0
      ? t.stylize("Infinity", "number")
      : e === -1 / 0
        ? t.stylize("-Infinity", "number")
        : e === 0
          ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number")
          : t.stylize(It(String(e), t.truncate), "number");
}
function fs(e, t) {
  let r = It(e.toString(), t.truncate - 1);
  return r !== hr && (r += "n"), t.stylize(r, "bigint");
}
function Iy(e, t) {
  let r = e.toString().split("/")[2],
    n = t.truncate - (2 + r.length),
    a = e.source;
  return t.stylize(`/${It(a, n)}/${r}`, "regexp");
}
function Ly(e) {
  let t = [];
  return (
    e.forEach((r) => {
      t.push(r);
    }),
    t
  );
}
function By(e, t) {
  return e.size === 0 ? "Set{}" : ((t.truncate -= 7), `Set{ ${Qe(Ly(e), t)} }`);
}
var ps = new RegExp(
    "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
    "g",
  ),
  ky = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\",
  },
  Dy = 16,
  Fy = 4;
function Uy(e) {
  return ky[e] || `\\u${`0000${e.charCodeAt(0).toString(Dy)}`.slice(-Fy)}`;
}
function hs(e, t) {
  return (
    ps.test(e) && (e = e.replace(ps, Uy)),
    t.stylize(`'${It(e, t.truncate - 2)}'`, "string")
  );
}
function ms(e) {
  return "description" in Symbol.prototype
    ? e.description
      ? `Symbol(${e.description})`
      : "Symbol()"
    : e.toString();
}
var ld = () => "Promise{…}";
try {
  let {
    getPromiseDetails: e,
    kPending: t,
    kRejected: r,
  } = process.binding("util");
  Array.isArray(e(Promise.resolve())) &&
    (ld = (n, a) => {
      let [o, i] = e(n);
      return o === t
        ? "Promise{<pending>}"
        : `Promise${o === r ? "!" : ""}{${a.inspect(i, a)}}`;
    });
} catch {}
var Hy = ld;
function An(e, t) {
  let r = Object.getOwnPropertyNames(e),
    n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (((t.truncate -= 4), (t.seen = t.seen || []), t.seen.indexOf(e) >= 0))
    return "[Circular]";
  t.seen.push(e);
  let a = Qe(
      r.map((l) => [l, e[l]]),
      t,
      Vr,
    ),
    o = Qe(
      n.map((l) => [l, e[l]]),
      t,
      Vr,
    );
  t.seen.pop();
  let i = "";
  return a && o && (i = ", "), `{ ${a}${i}${o} }`;
}
var Da = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function zy(e, t) {
  let r = "";
  return (
    Da && Da in e && (r = e[Da]),
    (r = r || e.constructor.name),
    (!r || r === "_class") && (r = "<Anonymous Class>"),
    (t.truncate -= r.length),
    `${r}${An(e, t)}`
  );
}
function Vy(e, t) {
  return e.length === 0
    ? "Arguments[]"
    : ((t.truncate -= 13), `Arguments[ ${Qe(e, t)} ]`);
}
var Gy = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description",
];
function Wy(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((i) => Gy.indexOf(i) === -1),
    n = e.name;
  t.truncate -= n.length;
  let a = "";
  typeof e.message == "string"
    ? (a = It(e.message, t.truncate))
    : r.unshift("message"),
    (a = a ? `: ${a}` : ""),
    (t.truncate -= a.length + 5);
  let o = Qe(
    r.map((i) => [i, e[i]]),
    t,
    Vr,
  );
  return `${n}${a}${o ? ` { ${o} }` : ""}`;
}
function Ky([e, t], r) {
  return (
    (r.truncate -= 3),
    t
      ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}`
      : `${r.stylize(String(e), "yellow")}`
  );
}
function fo(e, t) {
  return Qe(
    e,
    t,
    sd,
    `
`,
  );
}
function sd(e, t) {
  let r = e.getAttributeNames(),
    n = e.tagName.toLowerCase(),
    a = t.stylize(`<${n}`, "special"),
    o = t.stylize(">", "special"),
    i = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let l = "";
  r.length > 0 &&
    ((l += " "),
    (l += Qe(
      r.map((s) => [s, e.getAttribute(s)]),
      t,
      Ky,
      " ",
    ))),
    (t.truncate -= l.length);
  let u = t.truncate,
    c = fo(e.children, t);
  return (
    c && c.length > u && (c = `${hr}(${e.children.length})`),
    `${a}${l}${o}${c}${i}`
  );
}
var Yy = typeof Symbol == "function" && typeof Symbol.for == "function",
  Fa = Yy ? Symbol.for("chai/inspect") : "@@chai/inspect",
  tr = !1;
try {
  let e = fg("util");
  tr = e.inspect ? e.inspect.custom : !1;
} catch {
  tr = !1;
}
var bs = new WeakMap(),
  gs = {},
  ys = {
    undefined: (e, t) => t.stylize("undefined", "undefined"),
    null: (e, t) => t.stylize("null", "null"),
    boolean: (e, t) => t.stylize(String(e), "boolean"),
    Boolean: (e, t) => t.stylize(String(e), "boolean"),
    number: ds,
    Number: ds,
    bigint: fs,
    BigInt: fs,
    string: hs,
    String: hs,
    function: cs,
    Function: cs,
    symbol: ms,
    Symbol: ms,
    Array: Ay,
    Date: xy,
    Map: Ny,
    Set: By,
    RegExp: Iy,
    Promise: Hy,
    WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"),
    WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"),
    Arguments: Vy,
    Int8Array: ut,
    Uint8Array: ut,
    Uint8ClampedArray: ut,
    Int16Array: ut,
    Uint16Array: ut,
    Int32Array: ut,
    Uint32Array: ut,
    Float32Array: ut,
    Float64Array: ut,
    Generator: () => "",
    DataView: () => "",
    ArrayBuffer: () => "",
    Error: Wy,
    HTMLCollection: fo,
    NodeList: fo,
  },
  Jy = (e, t, r) =>
    Fa in e && typeof e[Fa] == "function"
      ? e[Fa](t)
      : tr && tr in e && typeof e[tr] == "function"
        ? e[tr](t.depth, t)
        : "inspect" in e && typeof e.inspect == "function"
          ? e.inspect(t.depth, t)
          : "constructor" in e && bs.has(e.constructor)
            ? bs.get(e.constructor)(e, t)
            : gs[r]
              ? gs[r](e, t)
              : "",
  Xy = Object.prototype.toString;
function po(e, t = {}) {
  let r = Sy(t, po),
    { customInspect: n } = r,
    a = e === null ? "null" : typeof e;
  if ((a === "object" && (a = Xy.call(e).slice(8, -1)), a in ys))
    return ys[a](e, r);
  if (n && e) {
    let i = Jy(e, r, a);
    if (i) return typeof i == "string" ? i : po(i, r);
  }
  let o = e ? Object.getPrototypeOf(e) : !1;
  return o === Object.prototype || o === null
    ? An(e, r)
    : e && typeof HTMLElement == "function" && e instanceof HTMLElement
      ? sd(e, r)
      : "constructor" in e
        ? e.constructor !== Object
          ? zy(e, r)
          : An(e, r)
        : e === Object(e)
          ? An(e, r)
          : r.stylize(String(e), a);
}
var {
    AsymmetricMatcher: Qy,
    DOMCollection: Zy,
    DOMElement: ev,
    Immutable: tv,
    ReactElement: rv,
    ReactTestComponent: nv,
  } = id,
  vs = [nv, rv, ev, Zy, tv, Qy];
function Gr(e, t = 10, { maxLength: r, ...n } = {}) {
  let a = r ?? 1e4,
    o;
  try {
    o = rt(e, { maxDepth: t, escapeString: !1, plugins: vs, ...n });
  } catch {
    o = rt(e, {
      callToJSON: !1,
      maxDepth: t,
      escapeString: !1,
      plugins: vs,
      ...n,
    });
  }
  return o.length >= a && t > 1 ? Gr(e, Math.floor(t / 2)) : o;
}
var av = /%[sdjifoOc%]/g;
function ov(...e) {
  if (typeof e[0] != "string") {
    let o = [];
    for (let i = 0; i < e.length; i++)
      o.push(Mr(e[i], { depth: 0, colors: !1 }));
    return o.join(" ");
  }
  let t = e.length,
    r = 1,
    n = e[0],
    a = String(n).replace(av, (o) => {
      if (o === "%%") return "%";
      if (r >= t) return o;
      switch (o) {
        case "%s": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : typeof i == "number" && i === 0 && 1 / i < 0
              ? "-0"
              : typeof i == "object" && i !== null
                ? Mr(i, { depth: 0, colors: !1 })
                : String(i);
        }
        case "%d": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : Number(i).toString();
        }
        case "%i": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : Number.parseInt(String(i)).toString();
        }
        case "%f":
          return Number.parseFloat(String(e[r++])).toString();
        case "%o":
          return Mr(e[r++], { showHidden: !0, showProxy: !0 });
        case "%O":
          return Mr(e[r++]);
        case "%c":
          return r++, "";
        case "%j":
          try {
            return JSON.stringify(e[r++]);
          } catch (i) {
            let l = i.message;
            if (
              l.includes("circular structure") ||
              l.includes("cyclic structures") ||
              l.includes("cyclic object")
            )
              return "[Circular]";
            throw i;
          }
        default:
          return o;
      }
    });
  for (let o = e[r]; r < t; o = e[++r])
    o === null || typeof o != "object" ? (a += ` ${o}`) : (a += ` ${Mr(o)}`);
  return a;
}
function Mr(e, t = {}) {
  return t.truncate === 0 && (t.truncate = Number.POSITIVE_INFINITY), po(e, t);
}
function iv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function lv(e) {
  return (
    e === Object.prototype || e === Function.prototype || e === RegExp.prototype
  );
}
function ho(e) {
  return Object.prototype.toString.apply(e).slice(8, -1);
}
function sv(e, t) {
  let r = typeof t == "function" ? t : (n) => t.add(n);
  Object.getOwnPropertyNames(e).forEach(r),
    Object.getOwnPropertySymbols(e).forEach(r);
}
function ud(e) {
  let t = new Set();
  return lv(e) ? [] : (sv(e, t), Array.from(t));
}
var cd = { forceWritable: !1 };
function _s(e, t = cd) {
  return mo(e, new WeakMap(), t);
}
function mo(e, t, r = cd) {
  let n, a;
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    for (a = Array.from({ length: (n = e.length) }), t.set(e, a); n--; )
      a[n] = mo(e[n], t, r);
    return a;
  }
  if (Object.prototype.toString.call(e) === "[object Object]") {
    (a = Object.create(Object.getPrototypeOf(e))), t.set(e, a);
    let o = ud(e);
    for (let i of o) {
      let l = Object.getOwnPropertyDescriptor(e, i);
      if (!l) continue;
      let u = mo(e[i], t, r);
      r.forceWritable
        ? Object.defineProperty(a, i, {
            enumerable: l.enumerable,
            configurable: !0,
            writable: !0,
            value: u,
          })
        : "get" in l
          ? Object.defineProperty(a, i, {
              ...l,
              get() {
                return u;
              },
            })
          : Object.defineProperty(a, i, { ...l, value: u });
    }
    return a;
  }
  return e;
}
function Es(e) {
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  if (Array.isArray(e)) return "array";
  if (typeof e == "boolean") return "boolean";
  if (typeof e == "function") return "function";
  if (typeof e == "number") return "number";
  if (typeof e == "string") return "string";
  if (typeof e == "bigint") return "bigint";
  if (typeof e == "object") {
    if (e != null) {
      if (e.constructor === RegExp) return "regexp";
      if (e.constructor === Map) return "map";
      if (e.constructor === Set) return "set";
      if (e.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof e == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${e}`);
}
var Oe = -1,
  Te = 1,
  _e = 0,
  be = class {
    constructor(t, r) {
      ye(this, 0);
      ye(this, 1);
      (this[0] = t), (this[1] = r);
    }
  },
  uv = function (e, t) {
    if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
    let r = 0,
      n = Math.min(e.length, t.length),
      a = n,
      o = 0;
    for (; r < a; )
      e.substring(o, a) === t.substring(o, a) ? ((r = a), (o = r)) : (n = a),
        (a = Math.floor((n - r) / 2 + r));
    return a;
  },
  dd = function (e, t) {
    if (!e || !t || e.charAt(e.length - 1) !== t.charAt(t.length - 1)) return 0;
    let r = 0,
      n = Math.min(e.length, t.length),
      a = n,
      o = 0;
    for (; r < a; )
      e.substring(e.length - a, e.length - o) ===
      t.substring(t.length - a, t.length - o)
        ? ((r = a), (o = r))
        : (n = a),
        (a = Math.floor((n - r) / 2 + r));
    return a;
  },
  ws = function (e, t) {
    let r = e.length,
      n = t.length;
    if (r === 0 || n === 0) return 0;
    r > n ? (e = e.substring(r - n)) : r < n && (t = t.substring(0, r));
    let a = Math.min(r, n);
    if (e === t) return a;
    let o = 0,
      i = 1;
    for (;;) {
      let l = e.substring(a - i),
        u = t.indexOf(l);
      if (u === -1) return o;
      (i += u),
        (u === 0 || e.substring(a - i) === t.substring(0, i)) && ((o = i), i++);
    }
  },
  cv = function (e) {
    let t = !1,
      r = [],
      n = 0,
      a = null,
      o = 0,
      i = 0,
      l = 0,
      u = 0,
      c = 0;
    for (; o < e.length; )
      e[o][0] === _e
        ? ((r[n++] = o), (i = u), (l = c), (u = 0), (c = 0), (a = e[o][1]))
        : (e[o][0] === Te ? (u += e[o][1].length) : (c += e[o][1].length),
          a &&
            a.length <= Math.max(i, l) &&
            a.length <= Math.max(u, c) &&
            (e.splice(r[n - 1], 0, new be(Oe, a)),
            (e[r[n - 1] + 1][0] = Te),
            n--,
            n--,
            (o = n > 0 ? r[n - 1] : -1),
            (i = 0),
            (l = 0),
            (u = 0),
            (c = 0),
            (a = null),
            (t = !0))),
        o++;
    for (t && fd(e), pv(e), o = 1; o < e.length; ) {
      if (e[o - 1][0] === Oe && e[o][0] === Te) {
        let s = e[o - 1][1],
          d = e[o][1],
          p = ws(s, d),
          f = ws(d, s);
        p >= f
          ? (p >= s.length / 2 || p >= d.length / 2) &&
            (e.splice(o, 0, new be(_e, d.substring(0, p))),
            (e[o - 1][1] = s.substring(0, s.length - p)),
            (e[o + 1][1] = d.substring(p)),
            o++)
          : (f >= s.length / 2 || f >= d.length / 2) &&
            (e.splice(o, 0, new be(_e, s.substring(0, f))),
            (e[o - 1][0] = Te),
            (e[o - 1][1] = d.substring(0, d.length - f)),
            (e[o + 1][0] = Oe),
            (e[o + 1][1] = s.substring(f)),
            o++),
          o++;
      }
      o++;
    }
  },
  Cs = /[^a-z0-9]/i,
  Rs = /\s/,
  Ts = /[\r\n]/,
  dv = /\n\r?\n$/,
  fv = /^\r?\n\r?\n/;
function pv(e) {
  let t = 1;
  for (; t < e.length - 1; ) {
    if (e[t - 1][0] === _e && e[t + 1][0] === _e) {
      let r = e[t - 1][1],
        n = e[t][1],
        a = e[t + 1][1],
        o = dd(r, n);
      if (o) {
        let s = n.substring(n.length - o);
        (r = r.substring(0, r.length - o)),
          (n = s + n.substring(0, n.length - o)),
          (a = s + a);
      }
      let i = r,
        l = n,
        u = a,
        c = _n(r, n) + _n(n, a);
      for (; n.charAt(0) === a.charAt(0); ) {
        (r += n.charAt(0)),
          (n = n.substring(1) + a.charAt(0)),
          (a = a.substring(1));
        let s = _n(r, n) + _n(n, a);
        s >= c && ((c = s), (i = r), (l = n), (u = a));
      }
      e[t - 1][1] !== i &&
        (i ? (e[t - 1][1] = i) : (e.splice(t - 1, 1), t--),
        (e[t][1] = l),
        u ? (e[t + 1][1] = u) : (e.splice(t + 1, 1), t--));
    }
    t++;
  }
}
function fd(e) {
  e.push(new be(_e, ""));
  let t = 0,
    r = 0,
    n = 0,
    a = "",
    o = "",
    i;
  for (; t < e.length; )
    switch (e[t][0]) {
      case Te:
        n++, (o += e[t][1]), t++;
        break;
      case Oe:
        r++, (a += e[t][1]), t++;
        break;
      case _e:
        r + n > 1
          ? (r !== 0 &&
              n !== 0 &&
              ((i = uv(o, a)),
              i !== 0 &&
                (t - r - n > 0 && e[t - r - n - 1][0] === _e
                  ? (e[t - r - n - 1][1] += o.substring(0, i))
                  : (e.splice(0, 0, new be(_e, o.substring(0, i))), t++),
                (o = o.substring(i)),
                (a = a.substring(i))),
              (i = dd(o, a)),
              i !== 0 &&
                ((e[t][1] = o.substring(o.length - i) + e[t][1]),
                (o = o.substring(0, o.length - i)),
                (a = a.substring(0, a.length - i)))),
            (t -= r + n),
            e.splice(t, r + n),
            a.length && (e.splice(t, 0, new be(Oe, a)), t++),
            o.length && (e.splice(t, 0, new be(Te, o)), t++),
            t++)
          : t !== 0 && e[t - 1][0] === _e
            ? ((e[t - 1][1] += e[t][1]), e.splice(t, 1))
            : t++,
          (n = 0),
          (r = 0),
          (a = ""),
          (o = "");
        break;
    }
  e[e.length - 1][1] === "" && e.pop();
  let l = !1;
  for (t = 1; t < e.length - 1; )
    e[t - 1][0] === _e &&
      e[t + 1][0] === _e &&
      (e[t][1].substring(e[t][1].length - e[t - 1][1].length) === e[t - 1][1]
        ? ((e[t][1] =
            e[t - 1][1] +
            e[t][1].substring(0, e[t][1].length - e[t - 1][1].length)),
          (e[t + 1][1] = e[t - 1][1] + e[t + 1][1]),
          e.splice(t - 1, 1),
          (l = !0))
        : e[t][1].substring(0, e[t + 1][1].length) === e[t + 1][1] &&
          ((e[t - 1][1] += e[t + 1][1]),
          (e[t][1] = e[t][1].substring(e[t + 1][1].length) + e[t + 1][1]),
          e.splice(t + 1, 1),
          (l = !0))),
      t++;
  l && fd(e);
}
function _n(e, t) {
  if (!e || !t) return 6;
  let r = e.charAt(e.length - 1),
    n = t.charAt(0),
    a = r.match(Cs),
    o = n.match(Cs),
    i = a && r.match(Rs),
    l = o && n.match(Rs),
    u = i && r.match(Ts),
    c = l && n.match(Ts),
    s = u && e.match(dv),
    d = c && t.match(fv);
  return s || d
    ? 5
    : u || c
      ? 4
      : a && !i && l
        ? 3
        : i || l
          ? 2
          : a || o
            ? 1
            : 0;
}
var pd = "Compared values have no visual difference.",
  hv =
    "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.",
  En = {},
  Ss;
function mv() {
  if (Ss) return En;
  (Ss = 1),
    Object.defineProperty(En, "__esModule", { value: !0 }),
    (En.default = p);
  let e = "diff-sequences",
    t = 0,
    r = (f, h, m, g, b) => {
      let y = 0;
      for (; f < h && m < g && b(f, m); ) (f += 1), (m += 1), (y += 1);
      return y;
    },
    n = (f, h, m, g, b) => {
      let y = 0;
      for (; f <= h && m <= g && b(h, g); ) (h -= 1), (g -= 1), (y += 1);
      return y;
    },
    a = (f, h, m, g, b, y, R) => {
      let _ = 0,
        C = -f,
        w = y[_],
        v = w;
      y[_] += r(w + 1, h, g + w - C + 1, m, b);
      let E = f < R ? f : R;
      for (_ += 1, C += 2; _ <= E; _ += 1, C += 2) {
        if (_ !== f && v < y[_]) w = y[_];
        else if (((w = v + 1), h <= w)) return _ - 1;
        (v = y[_]), (y[_] = w + r(w + 1, h, g + w - C + 1, m, b));
      }
      return R;
    },
    o = (f, h, m, g, b, y, R) => {
      let _ = 0,
        C = f,
        w = y[_],
        v = w;
      y[_] -= n(h, w - 1, m, g + w - C - 1, b);
      let E = f < R ? f : R;
      for (_ += 1, C -= 2; _ <= E; _ += 1, C -= 2) {
        if (_ !== f && y[_] < v) w = y[_];
        else if (((w = v - 1), w < h)) return _ - 1;
        (v = y[_]), (y[_] = w - n(h, w - 1, m, g + w - C - 1, b));
      }
      return R;
    },
    i = (f, h, m, g, b, y, R, _, C, w, v) => {
      let E = g - h,
        O = m - h,
        M = b - g - O,
        N = -M - (f - 1),
        k = -M + (f - 1),
        j = t,
        I = f < _ ? f : _;
      for (let B = 0, z = -f; B <= I; B += 1, z += 2) {
        let K = B === 0 || (B !== f && j < R[B]),
          W = K ? R[B] : j,
          re = K ? W : W + 1,
          me = E + re - z,
          de = r(re + 1, m, me + 1, b, y),
          F = re + de;
        if (((j = R[B]), (R[B] = F), N <= z && z <= k)) {
          let L = (f - 1 - (z + M)) / 2;
          if (L <= w && C[L] - 1 <= F) {
            let D = E + W - (K ? z + 1 : z - 1),
              G = n(h, W, g, D, y),
              Y = W - G,
              ne = D - G,
              fe = Y + 1,
              Be = ne + 1;
            (v.nChangePreceding = f - 1),
              f - 1 === fe + Be - h - g
                ? ((v.aEndPreceding = h), (v.bEndPreceding = g))
                : ((v.aEndPreceding = fe), (v.bEndPreceding = Be)),
              (v.nCommonPreceding = G),
              G !== 0 && ((v.aCommonPreceding = fe), (v.bCommonPreceding = Be)),
              (v.nCommonFollowing = de),
              de !== 0 &&
                ((v.aCommonFollowing = re + 1), (v.bCommonFollowing = me + 1));
            let q = F + 1,
              V = me + de + 1;
            return (
              (v.nChangeFollowing = f - 1),
              f - 1 === m + b - q - V
                ? ((v.aStartFollowing = m), (v.bStartFollowing = b))
                : ((v.aStartFollowing = q), (v.bStartFollowing = V)),
              !0
            );
          }
        }
      }
      return !1;
    },
    l = (f, h, m, g, b, y, R, _, C, w, v) => {
      let E = b - m,
        O = m - h,
        M = b - g - O,
        N = M - f,
        k = M + f,
        j = t,
        I = f < w ? f : w;
      for (let B = 0, z = f; B <= I; B += 1, z -= 2) {
        let K = B === 0 || (B !== f && C[B] < j),
          W = K ? C[B] : j,
          re = K ? W : W - 1,
          me = E + re - z,
          de = n(h, re - 1, g, me - 1, y),
          F = re - de;
        if (((j = C[B]), (C[B] = F), N <= z && z <= k)) {
          let L = (f + (z - M)) / 2;
          if (L <= _ && F - 1 <= R[L]) {
            let D = me - de;
            if (
              ((v.nChangePreceding = f),
              f === F + D - h - g
                ? ((v.aEndPreceding = h), (v.bEndPreceding = g))
                : ((v.aEndPreceding = F), (v.bEndPreceding = D)),
              (v.nCommonPreceding = de),
              de !== 0 && ((v.aCommonPreceding = F), (v.bCommonPreceding = D)),
              (v.nChangeFollowing = f - 1),
              f === 1)
            )
              (v.nCommonFollowing = 0),
                (v.aStartFollowing = m),
                (v.bStartFollowing = b);
            else {
              let G = E + W - (K ? z - 1 : z + 1),
                Y = r(W, m, G, b, y);
              (v.nCommonFollowing = Y),
                Y !== 0 && ((v.aCommonFollowing = W), (v.bCommonFollowing = G));
              let ne = W + Y,
                fe = G + Y;
              f - 1 === m + b - ne - fe
                ? ((v.aStartFollowing = m), (v.bStartFollowing = b))
                : ((v.aStartFollowing = ne), (v.bStartFollowing = fe));
            }
            return !0;
          }
        }
      }
      return !1;
    },
    u = (f, h, m, g, b, y, R, _, C) => {
      let w = g - h,
        v = b - m,
        E = m - h,
        O = b - g,
        M = O - E,
        N = E,
        k = E;
      if (((R[0] = h - 1), (_[0] = m), M % 2 === 0)) {
        let j = (f || M) / 2,
          I = (E + O) / 2;
        for (let B = 1; B <= I; B += 1)
          if (((N = a(B, m, b, w, y, R, N)), B < j)) k = o(B, h, g, v, y, _, k);
          else if (l(B, h, m, g, b, y, R, N, _, k, C)) return;
      } else {
        let j = ((f || M) + 1) / 2,
          I = (E + O + 1) / 2,
          B = 1;
        for (N = a(B, m, b, w, y, R, N), B += 1; B <= I; B += 1)
          if (((k = o(B - 1, h, g, v, y, _, k)), B < j))
            N = a(B, m, b, w, y, R, N);
          else if (i(B, h, m, g, b, y, R, N, _, k, C)) return;
      }
      throw new Error(
        `${e}: no overlap aStart=${h} aEnd=${m} bStart=${g} bEnd=${b}`,
      );
    },
    c = (f, h, m, g, b, y, R, _, C, w) => {
      if (b - g < m - h) {
        if (((y = !y), y && R.length === 1)) {
          let { foundSubsequence: L, isCommon: D } = R[0];
          R[1] = {
            foundSubsequence: (G, Y, ne) => {
              L(G, ne, Y);
            },
            isCommon: (G, Y) => D(Y, G),
          };
        }
        let de = h,
          F = m;
        (h = g), (m = b), (g = de), (b = F);
      }
      let { foundSubsequence: v, isCommon: E } = R[y ? 1 : 0];
      u(f, h, m, g, b, E, _, C, w);
      let {
        nChangePreceding: O,
        aEndPreceding: M,
        bEndPreceding: N,
        nCommonPreceding: k,
        aCommonPreceding: j,
        bCommonPreceding: I,
        nCommonFollowing: B,
        aCommonFollowing: z,
        bCommonFollowing: K,
        nChangeFollowing: W,
        aStartFollowing: re,
        bStartFollowing: me,
      } = w;
      h < M && g < N && c(O, h, M, g, N, y, R, _, C, w),
        k !== 0 && v(k, j, I),
        B !== 0 && v(B, z, K),
        re < m && me < b && c(W, re, m, me, b, y, R, _, C, w);
    },
    s = (f, h) => {
      if (typeof h != "number")
        throw new TypeError(`${e}: ${f} typeof ${typeof h} is not a number`);
      if (!Number.isSafeInteger(h))
        throw new RangeError(`${e}: ${f} value ${h} is not a safe integer`);
      if (h < 0)
        throw new RangeError(`${e}: ${f} value ${h} is a negative integer`);
    },
    d = (f, h) => {
      let m = typeof h;
      if (m !== "function")
        throw new TypeError(`${e}: ${f} typeof ${m} is not a function`);
    };
  function p(f, h, m, g) {
    s("aLength", f),
      s("bLength", h),
      d("isCommon", m),
      d("foundSubsequence", g);
    let b = r(0, f, 0, h, m);
    if ((b !== 0 && g(b, 0, 0), f !== b || h !== b)) {
      let y = b,
        R = b,
        _ = n(y, f - 1, R, h - 1, m),
        C = f - _,
        w = h - _,
        v = b + _;
      f !== v &&
        h !== v &&
        c(0, y, C, R, w, !1, [{ foundSubsequence: g, isCommon: m }], [t], [t], {
          aCommonFollowing: t,
          aCommonPreceding: t,
          aEndPreceding: t,
          aStartFollowing: t,
          bCommonFollowing: t,
          bCommonPreceding: t,
          bEndPreceding: t,
          bStartFollowing: t,
          nChangeFollowing: t,
          nChangePreceding: t,
          nCommonFollowing: t,
          nCommonPreceding: t,
        }),
        _ !== 0 && g(_, C, w);
    }
  }
  return En;
}
var bv = mv(),
  hd = iv(bv);
function gv(e, t) {
  return e.replace(/\s+$/, (r) => t(r));
}
function Ti(e, t, r, n, a, o) {
  return e.length !== 0
    ? r(`${n} ${gv(e, a)}`)
    : n !== " "
      ? r(n)
      : t && o.length !== 0
        ? r(`${n} ${o}`)
        : "";
}
function md(
  e,
  t,
  {
    aColor: r,
    aIndicator: n,
    changeLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ti(e, t, r, n, a, o);
}
function bd(
  e,
  t,
  {
    bColor: r,
    bIndicator: n,
    changeLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ti(e, t, r, n, a, o);
}
function gd(
  e,
  t,
  {
    commonColor: r,
    commonIndicator: n,
    commonLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ti(e, t, r, n, a, o);
}
function Ps(e, t, r, n, { patchColor: a }) {
  return a(`@@ -${e + 1},${t - e} +${r + 1},${n - r} @@`);
}
function yv(e, t) {
  let r = e.length,
    n = t.contextLines,
    a = n + n,
    o = r,
    i = !1,
    l = 0,
    u = 0;
  for (; u !== r; ) {
    let _ = u;
    for (; u !== r && e[u][0] === _e; ) u += 1;
    if (_ !== u)
      if (_ === 0) u > n && ((o -= u - n), (i = !0));
      else if (u === r) {
        let C = u - _;
        C > n && ((o -= C - n), (i = !0));
      } else {
        let C = u - _;
        C > a && ((o -= C - a), (l += 1));
      }
    for (; u !== r && e[u][0] !== _e; ) u += 1;
  }
  let c = l !== 0 || i;
  l !== 0 ? (o += l + 1) : i && (o += 1);
  let s = o - 1,
    d = [],
    p = 0;
  c && d.push("");
  let f = 0,
    h = 0,
    m = 0,
    g = 0,
    b = (_) => {
      let C = d.length;
      d.push(gd(_, C === 0 || C === s, t)), (m += 1), (g += 1);
    },
    y = (_) => {
      let C = d.length;
      d.push(md(_, C === 0 || C === s, t)), (m += 1);
    },
    R = (_) => {
      let C = d.length;
      d.push(bd(_, C === 0 || C === s, t)), (g += 1);
    };
  for (u = 0; u !== r; ) {
    let _ = u;
    for (; u !== r && e[u][0] === _e; ) u += 1;
    if (_ !== u)
      if (_ === 0) {
        u > n && ((_ = u - n), (f = _), (h = _), (m = f), (g = h));
        for (let C = _; C !== u; C += 1) b(e[C][1]);
      } else if (u === r) {
        let C = u - _ > n ? _ + n : u;
        for (let w = _; w !== C; w += 1) b(e[w][1]);
      } else {
        let C = u - _;
        if (C > a) {
          let w = _ + n;
          for (let E = _; E !== w; E += 1) b(e[E][1]);
          (d[p] = Ps(f, m, h, g, t)), (p = d.length), d.push("");
          let v = C - a;
          (f = m + v), (h = g + v), (m = f), (g = h);
          for (let E = u - n; E !== u; E += 1) b(e[E][1]);
        } else for (let w = _; w !== u; w += 1) b(e[w][1]);
      }
    for (; u !== r && e[u][0] === Oe; ) y(e[u][1]), (u += 1);
    for (; u !== r && e[u][0] === Te; ) R(e[u][1]), (u += 1);
  }
  return (
    c && (d[p] = Ps(f, m, h, g, t)),
    d.join(`
`)
  );
}
function vv(e, t) {
  return e.map((r, n, a) => {
    let o = r[1],
      i = n === 0 || n === a.length - 1;
    switch (r[0]) {
      case Oe:
        return md(o, i, t);
      case Te:
        return bd(o, i, t);
      default:
        return gd(o, i, t);
    }
  }).join(`
`);
}
var Ua = (e) => e,
  yd = 5,
  _v = 0;
function Ev() {
  return {
    aAnnotation: "Expected",
    aColor: pt.green,
    aIndicator: "-",
    bAnnotation: "Received",
    bColor: pt.red,
    bIndicator: "+",
    changeColor: pt.inverse,
    changeLineTrailingSpaceColor: Ua,
    commonColor: pt.dim,
    commonIndicator: " ",
    commonLineTrailingSpaceColor: Ua,
    compareKeys: void 0,
    contextLines: yd,
    emptyFirstOrLastLinePlaceholder: "",
    expand: !0,
    includeChangeCounts: !1,
    omitAnnotationLines: !1,
    patchColor: pt.yellow,
    truncateThreshold: _v,
    truncateAnnotation: "... Diff result is truncated",
    truncateAnnotationColor: Ua,
  };
}
function wv(e) {
  return e && typeof e == "function" ? e : void 0;
}
function Cv(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : yd;
}
function Yt(e = {}) {
  return {
    ...Ev(),
    ...e,
    compareKeys: wv(e.compareKeys),
    contextLines: Cv(e.contextLines),
  };
}
function rr(e) {
  return e.length === 1 && e[0].length === 0;
}
function Rv(e) {
  let t = 0,
    r = 0;
  return (
    e.forEach((n) => {
      switch (n[0]) {
        case Oe:
          t += 1;
          break;
        case Te:
          r += 1;
          break;
      }
    }),
    { a: t, b: r }
  );
}
function Tv(
  {
    aAnnotation: e,
    aColor: t,
    aIndicator: r,
    bAnnotation: n,
    bColor: a,
    bIndicator: o,
    includeChangeCounts: i,
    omitAnnotationLines: l,
  },
  u,
) {
  if (l) return "";
  let c = "",
    s = "";
  if (i) {
    let f = String(u.a),
      h = String(u.b),
      m = n.length - e.length,
      g = " ".repeat(Math.max(0, m)),
      b = " ".repeat(Math.max(0, -m)),
      y = h.length - f.length,
      R = " ".repeat(Math.max(0, y)),
      _ = " ".repeat(Math.max(0, -y));
    (c = `${g}  ${r} ${R}${f}`), (s = `${b}  ${o} ${_}${h}`);
  }
  let d = `${r} ${e}${c}`,
    p = `${o} ${n}${s}`;
  return `${t(d)}
${a(p)}

`;
}
function Si(e, t, r) {
  return (
    Tv(r, Rv(e)) +
    (r.expand ? vv(e, r) : yv(e, r)) +
    (t
      ? r.truncateAnnotationColor(`
${r.truncateAnnotation}`)
      : "")
  );
}
function ia(e, t, r) {
  let n = Yt(r),
    [a, o] = vd(rr(e) ? [] : e, rr(t) ? [] : t, n);
  return Si(a, o, n);
}
function Sv(e, t, r, n, a) {
  if (
    (rr(e) && rr(r) && ((e = []), (r = [])),
    rr(t) && rr(n) && ((t = []), (n = [])),
    e.length !== r.length || t.length !== n.length)
  )
    return ia(e, t, a);
  let [o, i] = vd(r, n, a),
    l = 0,
    u = 0;
  return (
    o.forEach((c) => {
      switch (c[0]) {
        case Oe:
          (c[1] = e[l]), (l += 1);
          break;
        case Te:
          (c[1] = t[u]), (u += 1);
          break;
        default:
          (c[1] = t[u]), (l += 1), (u += 1);
      }
    }),
    Si(o, i, Yt(a))
  );
}
function vd(e, t, r) {
  let n = (r == null ? void 0 : r.truncateThreshold) ?? !1,
    a = Math.max(
      Math.floor((r == null ? void 0 : r.truncateThreshold) ?? 0),
      0,
    ),
    o = n ? Math.min(e.length, a) : e.length,
    i = n ? Math.min(t.length, a) : t.length,
    l = o !== e.length || i !== t.length,
    u = (p, f) => e[p] === t[f],
    c = [],
    s = 0,
    d = 0;
  for (
    hd(o, i, u, (p, f, h) => {
      for (; s !== f; s += 1) c.push(new be(Oe, e[s]));
      for (; d !== h; d += 1) c.push(new be(Te, t[d]));
      for (; p !== 0; p -= 1, s += 1, d += 1) c.push(new be(_e, t[d]));
    });
    s !== o;
    s += 1
  )
    c.push(new be(Oe, e[s]));
  for (; d !== i; d += 1) c.push(new be(Te, t[d]));
  return [c, l];
}
function Os(e) {
  return e.includes(`\r
`)
    ? `\r
`
    : `
`;
}
function Pv(e, t, r) {
  let n = (r == null ? void 0 : r.truncateThreshold) ?? !1,
    a = Math.max(
      Math.floor((r == null ? void 0 : r.truncateThreshold) ?? 0),
      0,
    ),
    o = e.length,
    i = t.length;
  if (n) {
    let p = e.includes(`
`),
      f = t.includes(`
`),
      h = Os(e),
      m = Os(t),
      g = p
        ? `${e.split(h, a).join(h)}
`
        : e,
      b = f
        ? `${t.split(m, a).join(m)}
`
        : t;
    (o = g.length), (i = b.length);
  }
  let l = o !== e.length || i !== t.length,
    u = (p, f) => e[p] === t[f],
    c = 0,
    s = 0,
    d = [];
  return (
    hd(o, i, u, (p, f, h) => {
      c !== f && d.push(new be(Oe, e.slice(c, f))),
        s !== h && d.push(new be(Te, t.slice(s, h))),
        (c = f + p),
        (s = h + p),
        d.push(new be(_e, t.slice(h, s)));
    }),
    c !== o && d.push(new be(Oe, e.slice(c))),
    s !== i && d.push(new be(Te, t.slice(s))),
    [d, l]
  );
}
function Ov(e, t, r) {
  return t.reduce(
    (n, a) =>
      n + (a[0] === _e ? a[1] : a[0] === e && a[1].length !== 0 ? r(a[1]) : ""),
    "",
  );
}
var As = class {
    constructor(t, r) {
      ye(this, "op");
      ye(this, "line");
      ye(this, "lines");
      ye(this, "changeColor");
      (this.op = t),
        (this.line = []),
        (this.lines = []),
        (this.changeColor = r);
    }
    pushSubstring(t) {
      this.pushDiff(new be(this.op, t));
    }
    pushLine() {
      this.lines.push(
        this.line.length !== 1
          ? new be(this.op, Ov(this.op, this.line, this.changeColor))
          : this.line[0][0] === this.op
            ? this.line[0]
            : new be(this.op, this.line[0][1]),
      ),
        (this.line.length = 0);
    }
    isLineEmpty() {
      return this.line.length === 0;
    }
    pushDiff(t) {
      this.line.push(t);
    }
    align(t) {
      let r = t[1];
      if (
        r.includes(`
`)
      ) {
        let n = r.split(`
`),
          a = n.length - 1;
        n.forEach((o, i) => {
          i < a
            ? (this.pushSubstring(o), this.pushLine())
            : o.length !== 0 && this.pushSubstring(o);
        });
      } else this.pushDiff(t);
    }
    moveLinesTo(t) {
      this.isLineEmpty() || this.pushLine(),
        t.push(...this.lines),
        (this.lines.length = 0);
    }
  },
  Av = class {
    constructor(t, r) {
      ye(this, "deleteBuffer");
      ye(this, "insertBuffer");
      ye(this, "lines");
      (this.deleteBuffer = t), (this.insertBuffer = r), (this.lines = []);
    }
    pushDiffCommonLine(t) {
      this.lines.push(t);
    }
    pushDiffChangeLines(t) {
      let r = t[1].length === 0;
      (!r || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(t),
        (!r || this.insertBuffer.isLineEmpty()) &&
          this.insertBuffer.pushDiff(t);
    }
    flushChangeLines() {
      this.deleteBuffer.moveLinesTo(this.lines),
        this.insertBuffer.moveLinesTo(this.lines);
    }
    align(t) {
      let r = t[0],
        n = t[1];
      if (
        n.includes(`
`)
      ) {
        let a = n.split(`
`),
          o = a.length - 1;
        a.forEach((i, l) => {
          if (l === 0) {
            let u = new be(r, i);
            this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty()
              ? (this.flushChangeLines(), this.pushDiffCommonLine(u))
              : (this.pushDiffChangeLines(u), this.flushChangeLines());
          } else
            l < o
              ? this.pushDiffCommonLine(new be(r, i))
              : i.length !== 0 && this.pushDiffChangeLines(new be(r, i));
        });
      } else this.pushDiffChangeLines(t);
    }
    getLines() {
      return this.flushChangeLines(), this.lines;
    }
  };
function qv(e, t) {
  let r = new As(Oe, t),
    n = new As(Te, t),
    a = new Av(r, n);
  return (
    e.forEach((o) => {
      switch (o[0]) {
        case Oe:
          r.align(o);
          break;
        case Te:
          n.align(o);
          break;
        default:
          a.align(o);
      }
    }),
    a.getLines()
  );
}
function xv(e, t) {
  if (t) {
    let r = e.length - 1;
    return e.some(
      (n, a) =>
        n[0] === _e &&
        (a !== r ||
          n[1] !==
            `
`),
    );
  }
  return e.some((r) => r[0] === _e);
}
function Mv(e, t, r) {
  if (e !== t && e.length !== 0 && t.length !== 0) {
    let n =
        e.includes(`
`) ||
        t.includes(`
`),
      [a, o] = _d(
        n
          ? `${e}
`
          : e,
        n
          ? `${t}
`
          : t,
        !0,
        r,
      );
    if (xv(a, n)) {
      let i = Yt(r),
        l = qv(a, i.changeColor);
      return Si(l, o, i);
    }
  }
  return ia(
    e.split(`
`),
    t.split(`
`),
    r,
  );
}
function _d(e, t, r, n) {
  let [a, o] = Pv(e, t, n);
  return cv(a), [a, o];
}
function bo(e, t) {
  let { commonColor: r } = Yt(t);
  return r(e);
}
var {
    AsymmetricMatcher: $v,
    DOMCollection: Nv,
    DOMElement: jv,
    Immutable: Iv,
    ReactElement: Lv,
    ReactTestComponent: Bv,
  } = id,
  Ed = [Bv, Lv, jv, Nv, Iv, $v],
  go = { plugins: Ed },
  wd = { callToJSON: !1, maxDepth: 10, plugins: Ed };
function kv(e, t, r) {
  if (Object.is(e, t)) return "";
  let n = Es(e),
    a = n,
    o = !1;
  if (n === "object" && typeof e.asymmetricMatch == "function") {
    if (
      e.$$typeof !== Symbol.for("jest.asymmetricMatcher") ||
      typeof e.getExpectedType != "function"
    )
      return;
    (a = e.getExpectedType()), (o = a === "string");
  }
  if (a !== Es(t)) {
    let {
        aAnnotation: i,
        aColor: l,
        aIndicator: u,
        bAnnotation: c,
        bColor: s,
        bIndicator: d,
      } = Yt(r),
      p = yo(wd, r),
      f = rt(e, p),
      h = rt(t, p),
      m = `${l(`${u} ${i}:`)} 
${f}`,
      g = `${s(`${d} ${c}:`)} 
${h}`;
    return `${m}

${g}`;
  }
  if (!o)
    switch (n) {
      case "string":
        return ia(
          e.split(`
`),
          t.split(`
`),
          r,
        );
      case "boolean":
      case "number":
        return Dv(e, t, r);
      case "map":
        return Ha(qs(e), qs(t), r);
      case "set":
        return Ha(xs(e), xs(t), r);
      default:
        return Ha(e, t, r);
    }
}
function Dv(e, t, r) {
  let n = rt(e, go),
    a = rt(t, go);
  return n === a
    ? ""
    : ia(
        n.split(`
`),
        a.split(`
`),
        r,
      );
}
function qs(e) {
  return new Map(Array.from(e.entries()).sort());
}
function xs(e) {
  return new Set(Array.from(e.values()).sort());
}
function Ha(e, t, r) {
  let n,
    a = !1;
  try {
    let i = yo(go, r);
    n = Ms(e, t, i, r);
  } catch {
    a = !0;
  }
  let o = bo(pd, r);
  if (n === void 0 || n === o) {
    let i = yo(wd, r);
    (n = Ms(e, t, i, r)),
      n !== o &&
        !a &&
        (n = `${bo(hv, r)}

${n}`);
  }
  return n;
}
function yo(e, t) {
  let { compareKeys: r } = Yt(t);
  return { ...e, compareKeys: r };
}
function Ms(e, t, r, n) {
  let a = { ...r, indent: 0 },
    o = rt(e, a),
    i = rt(t, a);
  if (o === i) return bo(pd, n);
  {
    let l = rt(e, r),
      u = rt(t, r);
    return Sv(
      l.split(`
`),
      u.split(`
`),
      o.split(`
`),
      i.split(`
`),
      n,
    );
  }
}
var $s = 2e4;
function Ns(e) {
  return ho(e) === "Object" && typeof e.asymmetricMatch == "function";
}
function js(e, t) {
  let r = ho(e),
    n = ho(t);
  return r === n && (r === "Object" || r === "Array");
}
function Fv(e, t, r) {
  let { aAnnotation: n, bAnnotation: a } = Yt(r);
  if (
    typeof e == "string" &&
    typeof t == "string" &&
    e.length > 0 &&
    t.length > 0 &&
    e.length <= $s &&
    t.length <= $s &&
    e !== t
  ) {
    if (
      e.includes(`
`) ||
      t.includes(`
`)
    )
      return Mv(t, e, r);
    let [c] = _d(t, e),
      s = c.some((h) => h[0] === _e),
      d = Uv(n, a),
      p = d(n) + Vv(Is(c, Oe, s)),
      f = d(a) + zv(Is(c, Te, s));
    return `${p}
${f}`;
  }
  let o = _s(e, { forceWritable: !0 }),
    i = _s(t, { forceWritable: !0 }),
    { replacedExpected: l, replacedActual: u } = Cd(o, i);
  return kv(l, u, r);
}
function Cd(e, t, r = new WeakSet(), n = new WeakSet()) {
  return js(e, t)
    ? r.has(e) || n.has(t)
      ? { replacedActual: e, replacedExpected: t }
      : (r.add(e),
        n.add(t),
        ud(t).forEach((a) => {
          let o = t[a],
            i = e[a];
          if (Ns(o)) o.asymmetricMatch(i) && (e[a] = o);
          else if (Ns(i)) i.asymmetricMatch(o) && (t[a] = i);
          else if (js(i, o)) {
            let l = Cd(i, o, r, n);
            (e[a] = l.replacedActual), (t[a] = l.replacedExpected);
          }
        }),
        { replacedActual: e, replacedExpected: t })
    : { replacedActual: e, replacedExpected: t };
}
function Uv(...e) {
  let t = e.reduce((r, n) => (n.length > r ? n.length : r), 0);
  return (r) => `${r}: ${" ".repeat(t - r.length)}`;
}
var Hv = "·";
function Rd(e) {
  return e.replace(/\s+$/gm, (t) => Hv.repeat(t.length));
}
function zv(e) {
  return pt.red(Rd(Gr(e)));
}
function Vv(e) {
  return pt.green(Rd(Gr(e)));
}
function Is(e, t, r) {
  return e.reduce(
    (n, a) =>
      n +
      (a[0] === _e ? a[1] : a[0] === t ? (r ? pt.inverse(a[1]) : a[1]) : ""),
    "",
  );
}
var Gv = "@@__IMMUTABLE_RECORD__@@",
  Wv = "@@__IMMUTABLE_ITERABLE__@@";
function Kv(e) {
  return e && (e[Wv] || e[Gv]);
}
var Yv = Object.getPrototypeOf({});
function Ls(e) {
  return e instanceof Error
    ? `<unserializable>: ${e.message}`
    : typeof e == "string"
      ? `<unserializable>: ${e}`
      : "<unserializable>";
}
function nr(e, t = new WeakMap()) {
  if (!e || typeof e == "string") return e;
  if (typeof e == "function") return `Function<${e.name || "anonymous"}>`;
  if (typeof e == "symbol") return e.toString();
  if (typeof e != "object") return e;
  if (Kv(e)) return nr(e.toJSON(), t);
  if (
    e instanceof Promise ||
    (e.constructor && e.constructor.prototype === "AsyncFunction")
  )
    return "Promise";
  if (typeof Element < "u" && e instanceof Element) return e.tagName;
  if (typeof e.asymmetricMatch == "function")
    return `${e.toString()} ${ov(e.sample)}`;
  if (typeof e.toJSON == "function") return nr(e.toJSON(), t);
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    let r = new Array(e.length);
    return (
      t.set(e, r),
      e.forEach((n, a) => {
        try {
          r[a] = nr(n, t);
        } catch (o) {
          r[a] = Ls(o);
        }
      }),
      r
    );
  } else {
    let r = Object.create(null);
    t.set(e, r);
    let n = e;
    for (; n && n !== Yv; )
      Object.getOwnPropertyNames(n).forEach((a) => {
        if (!(a in r))
          try {
            r[a] = nr(e[a], t);
          } catch (o) {
            delete r[a], (r[a] = Ls(o));
          }
      }),
        (n = Object.getPrototypeOf(n));
    return r;
  }
}
function Jv(e) {
  return e.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function Td(e, t, r = new WeakSet()) {
  if (!e || typeof e != "object") return { message: String(e) };
  let n = e;
  n.stack && (n.stackStr = String(n.stack)),
    n.name && (n.nameStr = String(n.name)),
    (n.showDiff ||
      (n.showDiff === void 0 &&
        n.expected !== void 0 &&
        n.actual !== void 0)) &&
      (n.diff = Fv(n.actual, n.expected, { ...t, ...n.diffOptions })),
    typeof n.expected != "string" && (n.expected = Gr(n.expected, 10)),
    typeof n.actual != "string" && (n.actual = Gr(n.actual, 10));
  try {
    typeof n.message == "string" && (n.message = Jv(n.message));
  } catch {}
  try {
    !r.has(n) &&
      typeof n.cause == "object" &&
      (r.add(n), (n.cause = Td(n.cause, t, r)));
  } catch {}
  try {
    return nr(n);
  } catch (a) {
    return nr(
      new Error(`Failed to fully serialize error: ${a == null ? void 0 : a.message}
Inner error message: ${n == null ? void 0 : n.message}`),
    );
  }
}
var Xv = ((e) => (
    (e.DONE = "done"),
    (e.ERROR = "error"),
    (e.ACTIVE = "active"),
    (e.WAITING = "waiting"),
    e
  ))(Xv || {}),
  ct = {
    CALL: "storybook/instrumenter/call",
    SYNC: "storybook/instrumenter/sync",
    START: "storybook/instrumenter/start",
    BACK: "storybook/instrumenter/back",
    GOTO: "storybook/instrumenter/goto",
    NEXT: "storybook/instrumenter/next",
    END: "storybook/instrumenter/end",
  },
  Bs = { start: !1, back: !1, goto: !1, next: !1, end: !1 },
  Qv = new Error(
    "This function ran after the play function completed. Did you forget to `await` it?",
  ),
  ks = (e) => Object.prototype.toString.call(e) === "[object Object]",
  Zv = (e) => Object.prototype.toString.call(e) === "[object Module]",
  e_ = (e) => {
    if (!ks(e) && !Zv(e)) return !1;
    if (e.constructor === void 0) return !0;
    let t = e.constructor.prototype;
    return !!ks(t);
  },
  t_ = (e) => {
    try {
      return new e.constructor();
    } catch {
      return {};
    }
  },
  za = () => ({
    renderPhase: void 0,
    isDebugging: !1,
    isPlaying: !1,
    isLocked: !1,
    cursor: 0,
    calls: [],
    shadowCalls: [],
    callRefsByResult: new Map(),
    chainedCallIds: new Set(),
    ancestors: [],
    playUntil: void 0,
    resolvers: {},
    syncTimeout: void 0,
  }),
  Ds = (e, t = !1) => {
    let r = (t ? e.shadowCalls : e.calls).filter((a) => a.retain);
    if (!r.length) return;
    let n = new Map(
      Array.from(e.callRefsByResult.entries()).filter(([, a]) => a.retain),
    );
    return { cursor: r.length, calls: r, callRefsByResult: n };
  },
  r_ = class {
    constructor() {
      var i;
      (this.initialized = !1),
        (this.channel = dg.getChannel()),
        (this.state =
          ((i = Ne.window) == null
            ? void 0
            : i.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__) ||
          {});
      let e = ({ storyId: l, isPlaying: u = !0, isDebugging: c = !1 }) => {
        let s = this.getState(l);
        this.setState(l, {
          ...za(),
          ...Ds(s, c),
          shadowCalls: c ? s.shadowCalls : [],
          chainedCallIds: c ? s.chainedCallIds : new Set(),
          playUntil: c ? s.playUntil : void 0,
          isPlaying: u,
          isDebugging: c,
        }),
          this.sync(l);
      };
      this.channel.on(Xl, e),
        this.channel.on(ug, ({ storyId: l, newPhase: u }) => {
          let { isDebugging: c } = this.getState(l);
          this.setState(l, { renderPhase: u }),
            u === "preparing" && c && e({ storyId: l }),
            u === "playing" && e({ storyId: l, isDebugging: c }),
            u === "played" &&
              this.setState(l, {
                isLocked: !1,
                isPlaying: !1,
                isDebugging: !1,
              }),
            u === "errored" &&
              this.setState(l, { isLocked: !1, isPlaying: !1 });
        }),
        this.channel.on(cg, () => {
          this.initialized ? this.cleanup() : (this.initialized = !0);
        });
      let t = ({ storyId: l, playUntil: u }) => {
          this.getState(l).isDebugging ||
            this.setState(l, ({ calls: s }) => ({
              calls: [],
              shadowCalls: s.map((d) => ({ ...d, status: "waiting" })),
              isDebugging: !0,
            }));
          let c = this.getLog(l);
          this.setState(l, ({ shadowCalls: s }) => {
            var p;
            if (u || !c.length) return { playUntil: u };
            let d = s.findIndex((f) => f.id === c[0].callId);
            return {
              playUntil:
                (p = s
                  .slice(0, d)
                  .filter((f) => f.interceptable && !f.ancestors.length)
                  .slice(-1)[0]) == null
                  ? void 0
                  : p.id,
            };
          }),
            this.channel.emit(Xl, { storyId: l, isDebugging: !0 });
        },
        r = ({ storyId: l }) => {
          var s;
          let u = this.getLog(l).filter((d) => !d.ancestors.length),
            c = u.reduceRight(
              (d, p, f) => (d >= 0 || p.status === "waiting" ? d : f),
              -1,
            );
          t({
            storyId: l,
            playUntil: (s = u[c - 1]) == null ? void 0 : s.callId,
          });
        },
        n = ({ storyId: l, callId: u }) => {
          var h;
          let { calls: c, shadowCalls: s, resolvers: d } = this.getState(l),
            p = c.find(({ id: m }) => m === u),
            f = s.find(({ id: m }) => m === u);
          if (!p && f && Object.values(d).length > 0) {
            let m =
              (h = this.getLog(l).find((g) => g.status === "waiting")) == null
                ? void 0
                : h.callId;
            f.id !== m && this.setState(l, { playUntil: f.id }),
              Object.values(d).forEach((g) => g());
          } else t({ storyId: l, playUntil: u });
        },
        a = ({ storyId: l }) => {
          var c;
          let { resolvers: u } = this.getState(l);
          if (Object.values(u).length > 0) Object.values(u).forEach((s) => s());
          else {
            let s =
              (c = this.getLog(l).find((d) => d.status === "waiting")) == null
                ? void 0
                : c.callId;
            s ? t({ storyId: l, playUntil: s }) : o({ storyId: l });
          }
        },
        o = ({ storyId: l }) => {
          this.setState(l, { playUntil: void 0, isDebugging: !1 }),
            Object.values(this.getState(l).resolvers).forEach((u) => u());
        };
      this.channel.on(ct.START, t),
        this.channel.on(ct.BACK, r),
        this.channel.on(ct.GOTO, n),
        this.channel.on(ct.NEXT, a),
        this.channel.on(ct.END, o);
    }
    getState(e) {
      return this.state[e] || za();
    }
    setState(e, t) {
      var a;
      let r = this.getState(e),
        n = typeof t == "function" ? t(r) : t;
      (this.state = { ...this.state, [e]: { ...r, ...n } }),
        (a = Ne.window) != null &&
          a.parent &&
          (Ne.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ =
            this.state);
    }
    cleanup() {
      var t;
      this.state = Object.entries(this.state).reduce((r, [n, a]) => {
        let o = Ds(a);
        return o && (r[n] = Object.assign(za(), o)), r;
      }, {});
      let e = { controlStates: Bs, logItems: [] };
      this.channel.emit(ct.SYNC, e),
        (t = Ne.window) != null &&
          t.parent &&
          (Ne.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ =
            this.state);
    }
    getLog(e) {
      let { calls: t, shadowCalls: r } = this.getState(e),
        n = [...r];
      t.forEach((o, i) => {
        n[i] = o;
      });
      let a = new Set();
      return n.reduceRight(
        (o, i) => (
          i.args.forEach((l) => {
            l != null && l.__callId__ && a.add(l.__callId__);
          }),
          i.path.forEach((l) => {
            l.__callId__ && a.add(l.__callId__);
          }),
          (i.interceptable || i.exception) &&
            !a.has(i.id) &&
            (o.unshift({
              callId: i.id,
              status: i.status,
              ancestors: i.ancestors,
            }),
            a.add(i.id)),
          o
        ),
        [],
      );
    }
    instrument(e, t, r = 0) {
      if (!e_(e)) return e;
      let { mutate: n = !1, path: a = [] } = t,
        o = t.getKeys ? t.getKeys(e, r) : Object.keys(e);
      return (
        (r += 1),
        o.reduce(
          (i, l) => {
            let u = n_(e, l);
            if (typeof (u == null ? void 0 : u.get) == "function") {
              let s = () => {
                var d, p;
                return (p =
                  (d = u == null ? void 0 : u.get) == null
                    ? void 0
                    : d.bind(e)) == null
                  ? void 0
                  : p();
              };
              return (
                Object.defineProperty(i, l, {
                  get: () =>
                    this.instrument(s(), { ...t, path: a.concat(l) }, r),
                }),
                i
              );
            }
            let c = e[l];
            return typeof c != "function"
              ? ((i[l] = this.instrument(c, { ...t, path: a.concat(l) }, r)), i)
              : "__originalFn__" in c && typeof c.__originalFn__ == "function"
                ? ((i[l] = c), i)
                : ((i[l] = (...s) => this.track(l, c, e, s, t)),
                  (i[l].__originalFn__ = c),
                  Object.defineProperty(i[l], "name", {
                    value: l,
                    writable: !1,
                  }),
                  Object.keys(c).length > 0 &&
                    Object.assign(
                      i[l],
                      this.instrument({ ...c }, { ...t, path: a.concat(l) }, r),
                    ),
                  i);
          },
          n ? e : t_(e),
        )
      );
    }
    track(e, t, r, n, a) {
      var m, g, b, y;
      let o =
          ((m = n == null ? void 0 : n[0]) == null ? void 0 : m.__storyId__) ||
          ((y =
            (b =
              (g = Ne.__STORYBOOK_PREVIEW__) == null
                ? void 0
                : g.selectionStore) == null
              ? void 0
              : b.selection) == null
            ? void 0
            : y.storyId),
        { cursor: i, ancestors: l } = this.getState(o);
      this.setState(o, { cursor: i + 1 });
      let u = `${l.slice(-1)[0] || o} [${i}] ${e}`,
        { path: c = [], intercept: s = !1, retain: d = !1 } = a,
        p = typeof s == "function" ? s(e, c) : s,
        f = {
          id: u,
          cursor: i,
          storyId: o,
          ancestors: l,
          path: c,
          method: e,
          args: n,
          interceptable: p,
          retain: d,
        },
        h = (p && !l.length ? this.intercept : this.invoke).call(
          this,
          t,
          r,
          f,
          a,
        );
      return this.instrument(h, {
        ...a,
        mutate: !0,
        path: [{ __callId__: f.id }],
      });
    }
    intercept(e, t, r, n) {
      let {
          chainedCallIds: a,
          isDebugging: o,
          playUntil: i,
        } = this.getState(r.storyId),
        l = a.has(r.id);
      return !o || l || i
        ? (i === r.id && this.setState(r.storyId, { playUntil: void 0 }),
          this.invoke(e, t, r, n))
        : new Promise((u) => {
            this.setState(r.storyId, ({ resolvers: c }) => ({
              isLocked: !1,
              resolvers: { ...c, [r.id]: u },
            }));
          }).then(
            () => (
              this.setState(r.storyId, (u) => {
                let { [r.id]: c, ...s } = u.resolvers;
                return { isLocked: !0, resolvers: s };
              }),
              this.invoke(e, t, r, n)
            ),
          );
    }
    invoke(e, t, r, n) {
      let { callRefsByResult: a, renderPhase: o } = this.getState(r.storyId),
        i = 25,
        l = (s, d, p) => {
          var f, h, m;
          if (p.includes(s)) return "[Circular]";
          if (((p = [...p, s]), d > i)) return "...";
          if (a.has(s)) return a.get(s);
          if (s instanceof Array) return s.map((g) => l(g, ++d, p));
          if (s instanceof Date)
            return { __date__: { value: s.toISOString() } };
          if (s instanceof Error) {
            let { name: g, message: b, stack: y } = s;
            return { __error__: { name: g, message: b, stack: y } };
          }
          if (s instanceof RegExp) {
            let { flags: g, source: b } = s;
            return { __regexp__: { flags: g, source: b } };
          }
          if (s instanceof ((f = Ne.window) == null ? void 0 : f.HTMLElement)) {
            let {
                prefix: g,
                localName: b,
                id: y,
                classList: R,
                innerText: _,
              } = s,
              C = Array.from(R);
            return {
              __element__: {
                prefix: g,
                localName: b,
                id: y,
                classNames: C,
                innerText: _,
              },
            };
          }
          return typeof s == "function"
            ? {
                __function__: {
                  name: "getMockName" in s ? s.getMockName() : s.name,
                },
              }
            : typeof s == "symbol"
              ? { __symbol__: { description: s.description } }
              : typeof s == "object" &&
                  (h = s == null ? void 0 : s.constructor) != null &&
                  h.name &&
                  ((m = s == null ? void 0 : s.constructor) == null
                    ? void 0
                    : m.name) !== "Object"
                ? { __class__: { name: s.constructor.name } }
                : Object.prototype.toString.call(s) === "[object Object]"
                  ? Object.fromEntries(
                      Object.entries(s).map(([g, b]) => [g, l(b, ++d, p)]),
                    )
                  : s;
        },
        u = { ...r, args: r.args.map((s) => l(s, 0, [])) };
      r.path.forEach((s) => {
        s != null &&
          s.__callId__ &&
          this.setState(r.storyId, ({ chainedCallIds: d }) => ({
            chainedCallIds: new Set(Array.from(d).concat(s.__callId__)),
          }));
      });
      let c = (s) => {
        if (s instanceof Error) {
          let { name: d, message: p, stack: f, callId: h = r.id } = s,
            {
              showDiff: m = void 0,
              diff: g = void 0,
              actual: b = void 0,
              expected: y = void 0,
            } = s.name === "AssertionError" ? Td(s) : s,
            R = {
              name: d,
              message: p,
              stack: f,
              callId: h,
              showDiff: m,
              diff: g,
              actual: b,
              expected: y,
            };
          if (
            (this.update({ ...u, status: "error", exception: R }),
            this.setState(r.storyId, (_) => ({
              callRefsByResult: new Map([
                ...Array.from(_.callRefsByResult.entries()),
                [s, { __callId__: r.id, retain: r.retain }],
              ]),
            })),
            r.ancestors.length)
          )
            throw (
              (Object.prototype.hasOwnProperty.call(s, "callId") ||
                Object.defineProperty(s, "callId", { value: r.id }),
              s)
            );
        }
        throw s;
      };
      try {
        if (o === "played" && !r.retain) throw Qv;
        let s = (
            n.getArgs ? n.getArgs(r, this.getState(r.storyId)) : r.args
          ).map((p) =>
            typeof p != "function" || Object.keys(p).length
              ? p
              : (...f) => {
                  let { cursor: h, ancestors: m } = this.getState(r.storyId);
                  this.setState(r.storyId, {
                    cursor: 0,
                    ancestors: [...m, r.id],
                  });
                  let g = () =>
                      this.setState(r.storyId, { cursor: h, ancestors: m }),
                    b = !1;
                  try {
                    let y = p(...f);
                    return y instanceof Promise ? ((b = !0), y.finally(g)) : y;
                  } finally {
                    b || g();
                  }
                },
          ),
          d = e.apply(t, s);
        return (
          d &&
            ["object", "function", "symbol"].includes(typeof d) &&
            this.setState(r.storyId, (p) => ({
              callRefsByResult: new Map([
                ...Array.from(p.callRefsByResult.entries()),
                [d, { __callId__: r.id, retain: r.retain }],
              ]),
            })),
          this.update({
            ...u,
            status: d instanceof Promise ? "active" : "done",
          }),
          d instanceof Promise
            ? d.then((p) => (this.update({ ...u, status: "done" }), p), c)
            : d
        );
      } catch (s) {
        return c(s);
      }
    }
    update(e) {
      this.channel.emit(ct.CALL, e),
        this.setState(e.storyId, ({ calls: t }) => {
          let r = t
            .concat(e)
            .reduce((n, a) => Object.assign(n, { [a.id]: a }), {});
          return {
            calls: Object.values(r).sort((n, a) =>
              n.id.localeCompare(a.id, void 0, { numeric: !0 }),
            ),
          };
        }),
        this.sync(e.storyId);
    }
    sync(e) {
      let t = () => {
        var c;
        let { isLocked: r, isPlaying: n } = this.getState(e),
          a = this.getLog(e),
          o =
            (c = a
              .filter(({ ancestors: s }) => !s.length)
              .find((s) => s.status === "waiting")) == null
              ? void 0
              : c.callId,
          i = a.some((s) => s.status === "active");
        if (r || i || a.length === 0) {
          let s = { controlStates: Bs, logItems: a };
          this.channel.emit(ct.SYNC, s);
          return;
        }
        let l = a.some((s) => s.status === "done" || s.status === "error"),
          u = {
            controlStates: { start: l, back: l, goto: !0, next: n, end: n },
            logItems: a,
            pausedAt: o,
          };
        this.channel.emit(ct.SYNC, u);
      };
      this.setState(
        e,
        ({ syncTimeout: r }) => (
          clearTimeout(r), { syncTimeout: setTimeout(t, 0) }
        ),
      );
    }
  };
function Pi(e, t = {}) {
  var r, n, a, o, i, l, u, c;
  try {
    let s = !1,
      d = !1;
    return (
      (a =
        (n = (r = Ne.window) == null ? void 0 : r.location) == null
          ? void 0
          : n.search) != null && a.includes("instrument=true")
        ? (s = !0)
        : (l =
            (i = (o = Ne.window) == null ? void 0 : o.location) == null
              ? void 0
              : i.search) != null &&
          l.includes("instrument=false") &&
          (d = !0),
      (((u = Ne.window) == null ? void 0 : u.parent) === Ne.window && !s) || d
        ? e
        : (Ne.window &&
            !Ne.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ &&
            (Ne.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ =
              new r_()),
          ((c = Ne.window) == null
            ? void 0
            : c.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__
          ).instrument(e, t))
    );
  } catch (s) {
    return sg.warn(s), e;
  }
}
function n_(e, t) {
  let r = e;
  for (; r != null; ) {
    let n = Object.getOwnPropertyDescriptor(r, t);
    if (n) return n;
    r = Object.getPrototypeOf(r);
  }
}
var vo = {};
const { global: Sd } = __STORYBOOK_MODULE_GLOBAL__,
  { once: a_ } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var o_ = Object.create,
  Oi = Object.defineProperty,
  i_ = Object.getOwnPropertyDescriptor,
  Pd = Object.getOwnPropertyNames,
  l_ = Object.getPrototypeOf,
  s_ = Object.prototype.hasOwnProperty,
  u_ = ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
        ? new Proxy(e, {
            get: (t, r) => (typeof require < "u" ? require : t)[r],
          })
        : e)(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  T = (e, t) =>
    function () {
      return t || (0, e[Pd(e)[0]])((t = { exports: {} }).exports, t), t.exports;
    },
  Ai = (e, t) => {
    for (var r in t) Oi(e, r, { get: t[r], enumerable: !0 });
  },
  c_ = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let a of Pd(t))
        !s_.call(e, a) &&
          a !== r &&
          Oi(e, a, {
            get: () => t[a],
            enumerable: !(n = i_(t, a)) || n.enumerable,
          });
    return e;
  },
  Fe = (e, t, r) => (
    (r = e != null ? o_(l_(e)) : {}),
    c_(
      t || !e || !e.__esModule
        ? Oi(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  d_ = T({
    "../../node_modules/min-indent/index.js"(e, t) {
      t.exports = (r) => {
        let n = r.match(/^[ \t]*(?=\S)/gm);
        return n ? n.reduce((a, o) => Math.min(a, o.length), 1 / 0) : 0;
      };
    },
  }),
  f_ = T({
    "../../node_modules/strip-indent/index.js"(e, t) {
      var r = d_();
      t.exports = (n) => {
        let a = r(n);
        if (a === 0) return n;
        let o = new RegExp(`^[ \\t]{${a}}`, "gm");
        return n.replace(o, "");
      };
    },
  }),
  p_ = T({
    "../../node_modules/indent-string/index.js"(e, t) {
      t.exports = (r, n = 1, a) => {
        if (
          ((a = { indent: " ", includeEmptyLines: !1, ...a }),
          typeof r != "string")
        )
          throw new TypeError(
            `Expected \`input\` to be a \`string\`, got \`${typeof r}\``,
          );
        if (typeof n != "number")
          throw new TypeError(
            `Expected \`count\` to be a \`number\`, got \`${typeof n}\``,
          );
        if (typeof a.indent != "string")
          throw new TypeError(
            `Expected \`options.indent\` to be a \`string\`, got \`${typeof a.indent}\``,
          );
        if (n === 0) return r;
        let o = a.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return r.replace(o, a.indent.repeat(n));
      };
    },
  }),
  Od = T({
    "../../node_modules/redent/index.js"(e, t) {
      var r = f_(),
        n = p_();
      t.exports = (a, o = 0, i) => n(r(a), o, i);
    },
  }),
  h_ = T({
    "../../node_modules/aria-query/lib/util/iteratorProxy.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      function t() {
        var n = this,
          a = 0,
          o = {
            "@@iterator": function () {
              return o;
            },
            next: function () {
              if (a < n.length) {
                var i = n[a];
                return (a = a + 1), { done: !1, value: i };
              } else return { done: !0 };
            },
          };
        return o;
      }
      var r = t;
      e.default = r;
    },
  }),
  cn = T({
    "../../node_modules/aria-query/lib/util/iterationDecorator.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = a);
      var t = r(h_());
      function r(o) {
        return o && o.__esModule ? o : { default: o };
      }
      function n(o) {
        "@babel/helpers - typeof";
        return (
          (n =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (i) {
                  return typeof i;
                }
              : function (i) {
                  return i &&
                    typeof Symbol == "function" &&
                    i.constructor === Symbol &&
                    i !== Symbol.prototype
                    ? "symbol"
                    : typeof i;
                }),
          n(o)
        );
      }
      function a(o, i) {
        return (
          typeof Symbol == "function" &&
            n(Symbol.iterator) === "symbol" &&
            Object.defineProperty(o, Symbol.iterator, {
              value: t.default.bind(i),
            }),
          o
        );
      }
    },
  }),
  m_ = T({
    "../../node_modules/aria-query/lib/ariaPropsMap.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = r(cn());
      function r(f) {
        return f && f.__esModule ? f : { default: f };
      }
      function n(f, h) {
        return i(f) || o(f, h) || u(f, h) || a();
      }
      function a() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function o(f, h) {
        var m =
          f == null
            ? null
            : (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
        if (m != null) {
          var g = [],
            b = !0,
            y = !1,
            R,
            _;
          try {
            for (
              m = m.call(f);
              !(b = (R = m.next()).done) &&
              (g.push(R.value), !(h && g.length === h));
              b = !0
            );
          } catch (C) {
            (y = !0), (_ = C);
          } finally {
            try {
              !b && m.return != null && m.return();
            } finally {
              if (y) throw _;
            }
          }
          return g;
        }
      }
      function i(f) {
        if (Array.isArray(f)) return f;
      }
      function l(f, h) {
        var m = (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
        if (!m) {
          if (Array.isArray(f) || (m = u(f)) || h) {
            m && (f = m);
            var g = 0,
              b = function () {};
            return {
              s: b,
              n: function () {
                return g >= f.length
                  ? { done: !0 }
                  : { done: !1, value: f[g++] };
              },
              e: function (C) {
                throw C;
              },
              f: b,
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var y = !0,
          R = !1,
          _;
        return {
          s: function () {
            m = m.call(f);
          },
          n: function () {
            var C = m.next();
            return (y = C.done), C;
          },
          e: function (C) {
            (R = !0), (_ = C);
          },
          f: function () {
            try {
              !y && m.return != null && m.return();
            } finally {
              if (R) throw _;
            }
          },
        };
      }
      function u(f, h) {
        if (f) {
          if (typeof f == "string") return c(f, h);
          var m = Object.prototype.toString.call(f).slice(8, -1);
          if (
            (m === "Object" && f.constructor && (m = f.constructor.name),
            m === "Map" || m === "Set")
          )
            return Array.from(f);
          if (
            m === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m)
          )
            return c(f, h);
        }
      }
      function c(f, h) {
        (h == null || h > f.length) && (h = f.length);
        for (var m = 0, g = new Array(h); m < h; m++) g[m] = f[m];
        return g;
      }
      var s = [
          ["aria-activedescendant", { type: "id" }],
          ["aria-atomic", { type: "boolean" }],
          [
            "aria-autocomplete",
            { type: "token", values: ["inline", "list", "both", "none"] },
          ],
          ["aria-braillelabel", { type: "string" }],
          ["aria-brailleroledescription", { type: "string" }],
          ["aria-busy", { type: "boolean" }],
          ["aria-checked", { type: "tristate" }],
          ["aria-colcount", { type: "integer" }],
          ["aria-colindex", { type: "integer" }],
          ["aria-colspan", { type: "integer" }],
          ["aria-controls", { type: "idlist" }],
          [
            "aria-current",
            {
              type: "token",
              values: ["page", "step", "location", "date", "time", !0, !1],
            },
          ],
          ["aria-describedby", { type: "idlist" }],
          ["aria-description", { type: "string" }],
          ["aria-details", { type: "id" }],
          ["aria-disabled", { type: "boolean" }],
          [
            "aria-dropeffect",
            {
              type: "tokenlist",
              values: ["copy", "execute", "link", "move", "none", "popup"],
            },
          ],
          ["aria-errormessage", { type: "id" }],
          ["aria-expanded", { type: "boolean", allowundefined: !0 }],
          ["aria-flowto", { type: "idlist" }],
          ["aria-grabbed", { type: "boolean", allowundefined: !0 }],
          [
            "aria-haspopup",
            {
              type: "token",
              values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"],
            },
          ],
          ["aria-hidden", { type: "boolean", allowundefined: !0 }],
          [
            "aria-invalid",
            { type: "token", values: ["grammar", !1, "spelling", !0] },
          ],
          ["aria-keyshortcuts", { type: "string" }],
          ["aria-label", { type: "string" }],
          ["aria-labelledby", { type: "idlist" }],
          ["aria-level", { type: "integer" }],
          [
            "aria-live",
            { type: "token", values: ["assertive", "off", "polite"] },
          ],
          ["aria-modal", { type: "boolean" }],
          ["aria-multiline", { type: "boolean" }],
          ["aria-multiselectable", { type: "boolean" }],
          [
            "aria-orientation",
            { type: "token", values: ["vertical", "undefined", "horizontal"] },
          ],
          ["aria-owns", { type: "idlist" }],
          ["aria-placeholder", { type: "string" }],
          ["aria-posinset", { type: "integer" }],
          ["aria-pressed", { type: "tristate" }],
          ["aria-readonly", { type: "boolean" }],
          [
            "aria-relevant",
            {
              type: "tokenlist",
              values: ["additions", "all", "removals", "text"],
            },
          ],
          ["aria-required", { type: "boolean" }],
          ["aria-roledescription", { type: "string" }],
          ["aria-rowcount", { type: "integer" }],
          ["aria-rowindex", { type: "integer" }],
          ["aria-rowspan", { type: "integer" }],
          ["aria-selected", { type: "boolean", allowundefined: !0 }],
          ["aria-setsize", { type: "integer" }],
          [
            "aria-sort",
            {
              type: "token",
              values: ["ascending", "descending", "none", "other"],
            },
          ],
          ["aria-valuemax", { type: "number" }],
          ["aria-valuemin", { type: "number" }],
          ["aria-valuenow", { type: "number" }],
          ["aria-valuetext", { type: "string" }],
        ],
        d = {
          entries: function () {
            return s;
          },
          forEach: function (f) {
            var h =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              m = l(s),
              g;
            try {
              for (m.s(); !(g = m.n()).done; ) {
                var b = n(g.value, 2),
                  y = b[0],
                  R = b[1];
                f.call(h, R, y, s);
              }
            } catch (_) {
              m.e(_);
            } finally {
              m.f();
            }
          },
          get: function (f) {
            var h = s.find(function (m) {
              return m[0] === f;
            });
            return h && h[1];
          },
          has: function (f) {
            return !!d.get(f);
          },
          keys: function () {
            return s.map(function (f) {
              var h = n(f, 1),
                m = h[0];
              return m;
            });
          },
          values: function () {
            return s.map(function (f) {
              var h = n(f, 2),
                m = h[1];
              return m;
            });
          },
        },
        p = (0, t.default)(d, d.entries());
      e.default = p;
    },
  }),
  b_ = T({
    "../../node_modules/aria-query/lib/domMap.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = r(cn());
      function r(f) {
        return f && f.__esModule ? f : { default: f };
      }
      function n(f, h) {
        return i(f) || o(f, h) || u(f, h) || a();
      }
      function a() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function o(f, h) {
        var m =
          f == null
            ? null
            : (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
        if (m != null) {
          var g = [],
            b = !0,
            y = !1,
            R,
            _;
          try {
            for (
              m = m.call(f);
              !(b = (R = m.next()).done) &&
              (g.push(R.value), !(h && g.length === h));
              b = !0
            );
          } catch (C) {
            (y = !0), (_ = C);
          } finally {
            try {
              !b && m.return != null && m.return();
            } finally {
              if (y) throw _;
            }
          }
          return g;
        }
      }
      function i(f) {
        if (Array.isArray(f)) return f;
      }
      function l(f, h) {
        var m = (typeof Symbol < "u" && f[Symbol.iterator]) || f["@@iterator"];
        if (!m) {
          if (Array.isArray(f) || (m = u(f)) || h) {
            m && (f = m);
            var g = 0,
              b = function () {};
            return {
              s: b,
              n: function () {
                return g >= f.length
                  ? { done: !0 }
                  : { done: !1, value: f[g++] };
              },
              e: function (C) {
                throw C;
              },
              f: b,
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var y = !0,
          R = !1,
          _;
        return {
          s: function () {
            m = m.call(f);
          },
          n: function () {
            var C = m.next();
            return (y = C.done), C;
          },
          e: function (C) {
            (R = !0), (_ = C);
          },
          f: function () {
            try {
              !y && m.return != null && m.return();
            } finally {
              if (R) throw _;
            }
          },
        };
      }
      function u(f, h) {
        if (f) {
          if (typeof f == "string") return c(f, h);
          var m = Object.prototype.toString.call(f).slice(8, -1);
          if (
            (m === "Object" && f.constructor && (m = f.constructor.name),
            m === "Map" || m === "Set")
          )
            return Array.from(f);
          if (
            m === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m)
          )
            return c(f, h);
        }
      }
      function c(f, h) {
        (h == null || h > f.length) && (h = f.length);
        for (var m = 0, g = new Array(h); m < h; m++) g[m] = f[m];
        return g;
      }
      var s = [
          ["a", { reserved: !1 }],
          ["abbr", { reserved: !1 }],
          ["acronym", { reserved: !1 }],
          ["address", { reserved: !1 }],
          ["applet", { reserved: !1 }],
          ["area", { reserved: !1 }],
          ["article", { reserved: !1 }],
          ["aside", { reserved: !1 }],
          ["audio", { reserved: !1 }],
          ["b", { reserved: !1 }],
          ["base", { reserved: !0 }],
          ["bdi", { reserved: !1 }],
          ["bdo", { reserved: !1 }],
          ["big", { reserved: !1 }],
          ["blink", { reserved: !1 }],
          ["blockquote", { reserved: !1 }],
          ["body", { reserved: !1 }],
          ["br", { reserved: !1 }],
          ["button", { reserved: !1 }],
          ["canvas", { reserved: !1 }],
          ["caption", { reserved: !1 }],
          ["center", { reserved: !1 }],
          ["cite", { reserved: !1 }],
          ["code", { reserved: !1 }],
          ["col", { reserved: !0 }],
          ["colgroup", { reserved: !0 }],
          ["content", { reserved: !1 }],
          ["data", { reserved: !1 }],
          ["datalist", { reserved: !1 }],
          ["dd", { reserved: !1 }],
          ["del", { reserved: !1 }],
          ["details", { reserved: !1 }],
          ["dfn", { reserved: !1 }],
          ["dialog", { reserved: !1 }],
          ["dir", { reserved: !1 }],
          ["div", { reserved: !1 }],
          ["dl", { reserved: !1 }],
          ["dt", { reserved: !1 }],
          ["em", { reserved: !1 }],
          ["embed", { reserved: !1 }],
          ["fieldset", { reserved: !1 }],
          ["figcaption", { reserved: !1 }],
          ["figure", { reserved: !1 }],
          ["font", { reserved: !1 }],
          ["footer", { reserved: !1 }],
          ["form", { reserved: !1 }],
          ["frame", { reserved: !1 }],
          ["frameset", { reserved: !1 }],
          ["h1", { reserved: !1 }],
          ["h2", { reserved: !1 }],
          ["h3", { reserved: !1 }],
          ["h4", { reserved: !1 }],
          ["h5", { reserved: !1 }],
          ["h6", { reserved: !1 }],
          ["head", { reserved: !0 }],
          ["header", { reserved: !1 }],
          ["hgroup", { reserved: !1 }],
          ["hr", { reserved: !1 }],
          ["html", { reserved: !0 }],
          ["i", { reserved: !1 }],
          ["iframe", { reserved: !1 }],
          ["img", { reserved: !1 }],
          ["input", { reserved: !1 }],
          ["ins", { reserved: !1 }],
          ["kbd", { reserved: !1 }],
          ["keygen", { reserved: !1 }],
          ["label", { reserved: !1 }],
          ["legend", { reserved: !1 }],
          ["li", { reserved: !1 }],
          ["link", { reserved: !0 }],
          ["main", { reserved: !1 }],
          ["map", { reserved: !1 }],
          ["mark", { reserved: !1 }],
          ["marquee", { reserved: !1 }],
          ["menu", { reserved: !1 }],
          ["menuitem", { reserved: !1 }],
          ["meta", { reserved: !0 }],
          ["meter", { reserved: !1 }],
          ["nav", { reserved: !1 }],
          ["noembed", { reserved: !0 }],
          ["noscript", { reserved: !0 }],
          ["object", { reserved: !1 }],
          ["ol", { reserved: !1 }],
          ["optgroup", { reserved: !1 }],
          ["option", { reserved: !1 }],
          ["output", { reserved: !1 }],
          ["p", { reserved: !1 }],
          ["param", { reserved: !0 }],
          ["picture", { reserved: !0 }],
          ["pre", { reserved: !1 }],
          ["progress", { reserved: !1 }],
          ["q", { reserved: !1 }],
          ["rp", { reserved: !1 }],
          ["rt", { reserved: !1 }],
          ["rtc", { reserved: !1 }],
          ["ruby", { reserved: !1 }],
          ["s", { reserved: !1 }],
          ["samp", { reserved: !1 }],
          ["script", { reserved: !0 }],
          ["section", { reserved: !1 }],
          ["select", { reserved: !1 }],
          ["small", { reserved: !1 }],
          ["source", { reserved: !0 }],
          ["spacer", { reserved: !1 }],
          ["span", { reserved: !1 }],
          ["strike", { reserved: !1 }],
          ["strong", { reserved: !1 }],
          ["style", { reserved: !0 }],
          ["sub", { reserved: !1 }],
          ["summary", { reserved: !1 }],
          ["sup", { reserved: !1 }],
          ["table", { reserved: !1 }],
          ["tbody", { reserved: !1 }],
          ["td", { reserved: !1 }],
          ["textarea", { reserved: !1 }],
          ["tfoot", { reserved: !1 }],
          ["th", { reserved: !1 }],
          ["thead", { reserved: !1 }],
          ["time", { reserved: !1 }],
          ["title", { reserved: !0 }],
          ["tr", { reserved: !1 }],
          ["track", { reserved: !0 }],
          ["tt", { reserved: !1 }],
          ["u", { reserved: !1 }],
          ["ul", { reserved: !1 }],
          ["var", { reserved: !1 }],
          ["video", { reserved: !1 }],
          ["wbr", { reserved: !1 }],
          ["xmp", { reserved: !1 }],
        ],
        d = {
          entries: function () {
            return s;
          },
          forEach: function (f) {
            var h =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              m = l(s),
              g;
            try {
              for (m.s(); !(g = m.n()).done; ) {
                var b = n(g.value, 2),
                  y = b[0],
                  R = b[1];
                f.call(h, R, y, s);
              }
            } catch (_) {
              m.e(_);
            } finally {
              m.f();
            }
          },
          get: function (f) {
            var h = s.find(function (m) {
              return m[0] === f;
            });
            return h && h[1];
          },
          has: function (f) {
            return !!d.get(f);
          },
          keys: function () {
            return s.map(function (f) {
              var h = n(f, 1),
                m = h[0];
              return m;
            });
          },
          values: function () {
            return s.map(function (f) {
              var h = n(f, 2),
                m = h[1];
              return m;
            });
          },
        },
        p = (0, t.default)(d, d.entries());
      e.default = p;
    },
  }),
  g_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget"]],
        },
        r = t;
      e.default = r;
    },
  }),
  y_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-activedescendant": null, "aria-disabled": null },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget"]],
        },
        r = t;
      e.default = r;
    },
  }),
  v_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-disabled": null },
          relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget"]],
        },
        r = t;
      e.default = r;
    },
  }),
  __ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  E_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-valuemax": null,
            "aria-valuemin": null,
            "aria-valuenow": null,
          },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  w_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: [],
          prohibitedProps: [],
          props: {
            "aria-atomic": null,
            "aria-busy": null,
            "aria-controls": null,
            "aria-current": null,
            "aria-describedby": null,
            "aria-details": null,
            "aria-dropeffect": null,
            "aria-flowto": null,
            "aria-grabbed": null,
            "aria-hidden": null,
            "aria-keyshortcuts": null,
            "aria-label": null,
            "aria-labelledby": null,
            "aria-live": null,
            "aria-owns": null,
            "aria-relevant": null,
            "aria-roledescription": null,
          },
          relatedConcepts: [
            { concept: { name: "role" }, module: "XHTML" },
            { concept: { name: "type" }, module: "Dublin Core" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [],
        },
        r = t;
      e.default = r;
    },
  }),
  C_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: [],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "frontmatter" }, module: "DTB" },
            { concept: { name: "level" }, module: "DTB" },
            { concept: { name: "level" }, module: "SMIL" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  R_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  T_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-orientation": null },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite"],
            ["roletype", "structure", "section", "group"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  S_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: [],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype"]],
        },
        r = t;
      e.default = r;
    },
  }),
  P_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: [],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype"]],
        },
        r = t;
      e.default = r;
    },
  }),
  O_ = T({
    "../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !0,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-modal": null },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype"]],
        },
        r = t;
      e.default = r;
    },
  }),
  A_ = T({
    "../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = f(g_()),
        r = f(y_()),
        n = f(v_()),
        a = f(__()),
        o = f(E_()),
        i = f(w_()),
        l = f(C_()),
        u = f(R_()),
        c = f(T_()),
        s = f(S_()),
        d = f(P_()),
        p = f(O_());
      function f(g) {
        return g && g.__esModule ? g : { default: g };
      }
      var h = [
          ["command", t.default],
          ["composite", r.default],
          ["input", n.default],
          ["landmark", a.default],
          ["range", o.default],
          ["roletype", i.default],
          ["section", l.default],
          ["sectionhead", u.default],
          ["select", c.default],
          ["structure", s.default],
          ["widget", d.default],
          ["window", p.default],
        ],
        m = h;
      e.default = m;
    },
  }),
  q_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-atomic": "true", "aria-live": "assertive" },
          relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  x_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "alert"],
            ["roletype", "window", "dialog"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  M_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-activedescendant": null,
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "Device Independence Delivery Unit" } },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  $_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-posinset": null, "aria-setsize": null },
          relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "document"]],
        },
        r = t;
      e.default = r;
    },
  }),
  N_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                constraints: ["scoped to the body element"],
                name: "header",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  j_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "blockquote" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  I_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-pressed": null,
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "type", value: "button" }],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ name: "type", value: "image" }],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ name: "type", value: "reset" }],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ name: "type", value: "submit" }],
                name: "input",
              },
              module: "HTML",
            },
            { concept: { name: "button" }, module: "HTML" },
            { concept: { name: "trigger" }, module: "XForms" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command"]],
        },
        r = t;
      e.default = r;
    },
  }),
  L_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "caption" }, module: "HTML" }],
          requireContextRole: ["figure", "grid", "table"],
          requiredContextRole: ["figure", "grid", "table"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  B_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-colindex": null,
            "aria-colspan": null,
            "aria-rowindex": null,
            "aria-rowspan": null,
          },
          relatedConcepts: [
            {
              concept: {
                constraints: ["ancestor table element has table role"],
                name: "td",
              },
              module: "HTML",
            },
          ],
          requireContextRole: ["row"],
          requiredContextRole: ["row"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  k_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-checked": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-required": null,
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "type", value: "checkbox" }],
                name: "input",
              },
              module: "HTML",
            },
            { concept: { name: "option" }, module: "ARIA" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-checked": null },
          superClass: [["roletype", "widget", "input"]],
        },
        r = t;
      e.default = r;
    },
  }),
  D_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "code" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  F_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-sort": null },
          relatedConcepts: [
            { concept: { name: "th" }, module: "HTML" },
            {
              concept: {
                attributes: [{ name: "scope", value: "col" }],
                name: "th",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ name: "scope", value: "colgroup" }],
                name: "th",
              },
              module: "HTML",
            },
          ],
          requireContextRole: ["row"],
          requiredContextRole: ["row"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "cell"],
            ["roletype", "structure", "section", "cell", "gridcell"],
            ["roletype", "widget", "gridcell"],
            ["roletype", "structure", "sectionhead"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  U_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-activedescendant": null,
            "aria-autocomplete": null,
            "aria-errormessage": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-required": null,
            "aria-expanded": "false",
            "aria-haspopup": "listbox",
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "email" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "search" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "tel" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "text" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "url" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["set"], name: "list" },
                  { name: "type", value: "url" },
                ],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "multiple" },
                  { constraints: ["undefined"], name: "size" },
                ],
                constraints: [
                  "the multiple attribute is not set and the size attribute does not have a value greater than 1",
                ],
                name: "select",
              },
              module: "HTML",
            },
            { concept: { name: "select" }, module: "XForms" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-controls": null, "aria-expanded": "false" },
          superClass: [["roletype", "widget", "input"]],
        },
        r = t;
      e.default = r;
    },
  }),
  H_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "aside" }, module: "HTML" },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-label" }],
                constraints: [
                  "scoped to a sectioning content element",
                  "scoped to a sectioning root element other than body",
                ],
                name: "aside",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
                constraints: [
                  "scoped to a sectioning content element",
                  "scoped to a sectioning root element other than body",
                ],
                name: "aside",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  z_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                constraints: ["scoped to the body element"],
                name: "footer",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  V_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  G_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "del" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  W_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "window"]],
        },
        r = t;
      e.default = r;
    },
  }),
  K_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ module: "DAISY Guide" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "list"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Y_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "Device Independence Delivery Unit" } },
            { concept: { name: "html" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  J_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "em" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  X_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["article"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "list"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Q_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Z_ = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/formRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-label" }],
                name: "form",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
                name: "form",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "name" }],
                name: "form",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  e0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [
            { concept: { name: "a" }, module: "HTML" },
            { concept: { name: "area" }, module: "HTML" },
            { concept: { name: "aside" }, module: "HTML" },
            { concept: { name: "b" }, module: "HTML" },
            { concept: { name: "bdo" }, module: "HTML" },
            { concept: { name: "body" }, module: "HTML" },
            { concept: { name: "data" }, module: "HTML" },
            { concept: { name: "div" }, module: "HTML" },
            {
              concept: {
                constraints: [
                  "scoped to the main element",
                  "scoped to a sectioning content element",
                  "scoped to a sectioning root element other than body",
                ],
                name: "footer",
              },
              module: "HTML",
            },
            {
              concept: {
                constraints: [
                  "scoped to the main element",
                  "scoped to a sectioning content element",
                  "scoped to a sectioning root element other than body",
                ],
                name: "header",
              },
              module: "HTML",
            },
            { concept: { name: "hgroup" }, module: "HTML" },
            { concept: { name: "i" }, module: "HTML" },
            { concept: { name: "pre" }, module: "HTML" },
            { concept: { name: "q" }, module: "HTML" },
            { concept: { name: "samp" }, module: "HTML" },
            { concept: { name: "section" }, module: "HTML" },
            { concept: { name: "small" }, module: "HTML" },
            { concept: { name: "span" }, module: "HTML" },
            { concept: { name: "u" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  t0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-multiselectable": null, "aria-readonly": null },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["row"], ["row", "rowgroup"]],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite"],
            ["roletype", "structure", "section", "table"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  r0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-required": null,
            "aria-selected": null,
          },
          relatedConcepts: [
            {
              concept: {
                constraints: [
                  "ancestor table element has grid role",
                  "ancestor table element has treegrid role",
                ],
                name: "td",
              },
              module: "HTML",
            },
          ],
          requireContextRole: ["row"],
          requiredContextRole: ["row"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "cell"],
            ["roletype", "widget"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  n0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-activedescendant": null, "aria-disabled": null },
          relatedConcepts: [
            { concept: { name: "details" }, module: "HTML" },
            { concept: { name: "fieldset" }, module: "HTML" },
            { concept: { name: "optgroup" }, module: "HTML" },
            { concept: { name: "address" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  a0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-level": "2" },
          relatedConcepts: [
            { concept: { name: "h1" }, module: "HTML" },
            { concept: { name: "h2" }, module: "HTML" },
            { concept: { name: "h3" }, module: "HTML" },
            { concept: { name: "h4" }, module: "HTML" },
            { concept: { name: "h5" }, module: "HTML" },
            { concept: { name: "h6" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-level": "2" },
          superClass: [["roletype", "structure", "sectionhead"]],
        },
        r = t;
      e.default = r;
    },
  }),
  o0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "alt" }],
                name: "img",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["undefined"], name: "alt" }],
                name: "img",
              },
              module: "HTML",
            },
            { concept: { name: "imggroup" }, module: "DTB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  i0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "ins" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  l0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-expanded": null,
            "aria-haspopup": null,
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "href" }],
                name: "a",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "href" }],
                name: "area",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command"]],
        },
        r = t;
      e.default = r;
    },
  }),
  s0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/listRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "menu" }, module: "HTML" },
            { concept: { name: "ol" }, module: "HTML" },
            { concept: { name: "ul" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["listitem"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  u0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-invalid": null,
            "aria-multiselectable": null,
            "aria-readonly": null,
            "aria-required": null,
            "aria-orientation": "vertical",
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ constraints: [">1"], name: "size" }],
                constraints: ["the size attribute value is greater than 1"],
                name: "select",
              },
              module: "HTML",
            },
            {
              concept: { attributes: [{ name: "multiple" }], name: "select" },
              module: "HTML",
            },
            { concept: { name: "datalist" }, module: "HTML" },
            { concept: { name: "list" }, module: "ARIA" },
            { concept: { name: "select" }, module: "XForms" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["option", "group"], ["option"]],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "select"],
            ["roletype", "structure", "section", "group", "select"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  c0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-level": null,
            "aria-posinset": null,
            "aria-setsize": null,
          },
          relatedConcepts: [
            {
              concept: {
                constraints: [
                  "direct descendant of ol",
                  "direct descendant of ul",
                  "direct descendant of menu",
                ],
                name: "li",
              },
              module: "HTML",
            },
            { concept: { name: "item" }, module: "XForms" },
          ],
          requireContextRole: ["directory", "list"],
          requiredContextRole: ["directory", "list"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  d0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/logRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-live": "polite" },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  f0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  p0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/markRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: [],
          props: {
            "aria-braillelabel": null,
            "aria-brailleroledescription": null,
            "aria-description": null,
          },
          relatedConcepts: [{ concept: { name: "mark" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  h0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  m0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  b0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-orientation": "vertical" },
          relatedConcepts: [
            { concept: { name: "MENU" }, module: "JAPI" },
            { concept: { name: "list" }, module: "ARIA" },
            { concept: { name: "select" }, module: "XForms" },
            { concept: { name: "sidebar" }, module: "DTB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [
            ["menuitem", "group"],
            ["menuitemradio", "group"],
            ["menuitemcheckbox", "group"],
            ["menuitem"],
            ["menuitemcheckbox"],
            ["menuitemradio"],
          ],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "select"],
            ["roletype", "structure", "section", "group", "select"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  g0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-orientation": "horizontal" },
          relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [
            ["menuitem", "group"],
            ["menuitemradio", "group"],
            ["menuitemcheckbox", "group"],
            ["menuitem"],
            ["menuitemcheckbox"],
            ["menuitemradio"],
          ],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "select", "menu"],
            ["roletype", "structure", "section", "group", "select", "menu"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  y0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-posinset": null,
            "aria-setsize": null,
          },
          relatedConcepts: [
            { concept: { name: "MENU_ITEM" }, module: "JAPI" },
            { concept: { name: "listitem" }, module: "ARIA" },
            { concept: { name: "option" }, module: "ARIA" },
          ],
          requireContextRole: ["group", "menu", "menubar"],
          requiredContextRole: ["group", "menu", "menubar"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command"]],
        },
        r = t;
      e.default = r;
    },
  }),
  v0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
          requireContextRole: ["group", "menu", "menubar"],
          requiredContextRole: ["group", "menu", "menubar"],
          requiredOwnedElements: [],
          requiredProps: { "aria-checked": null },
          superClass: [
            ["roletype", "widget", "input", "checkbox"],
            ["roletype", "widget", "command", "menuitem"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  _0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }],
          requireContextRole: ["group", "menu", "menubar"],
          requiredContextRole: ["group", "menu", "menubar"],
          requiredOwnedElements: [],
          requiredProps: { "aria-checked": null },
          superClass: [
            ["roletype", "widget", "input", "checkbox", "menuitemcheckbox"],
            ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"],
            ["roletype", "widget", "input", "radio"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  E0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-valuetext": null,
            "aria-valuemax": "100",
            "aria-valuemin": "0",
          },
          relatedConcepts: [{ concept: { name: "meter" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-valuenow": null },
          superClass: [["roletype", "structure", "range"]],
        },
        r = t;
      e.default = r;
    },
  }),
  w0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  C0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: [],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [],
        },
        r = t;
      e.default = r;
    },
  }),
  R0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  T0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-checked": null,
            "aria-posinset": null,
            "aria-setsize": null,
            "aria-selected": "false",
          },
          relatedConcepts: [
            { concept: { name: "item" }, module: "XForms" },
            { concept: { name: "listitem" }, module: "ARIA" },
            { concept: { name: "option" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-selected": "false" },
          superClass: [["roletype", "widget", "input"]],
        },
        r = t;
      e.default = r;
    },
  }),
  S0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "p" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  P0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "alt", value: "" }],
                name: "img",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  O0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-valuetext": null },
          relatedConcepts: [
            { concept: { name: "progress" }, module: "HTML" },
            { concept: { name: "status" }, module: "ARIA" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "range"],
            ["roletype", "widget"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  A0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-checked": null,
            "aria-posinset": null,
            "aria-setsize": null,
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "type", value: "radio" }],
                name: "input",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-checked": null },
          superClass: [["roletype", "widget", "input"]],
        },
        r = t;
      e.default = r;
    },
  }),
  q0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-required": null,
          },
          relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["radio"]],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "select"],
            ["roletype", "structure", "section", "group", "select"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  x0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-label" }],
                name: "section",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ constraints: ["set"], name: "aria-labelledby" }],
                name: "section",
              },
              module: "HTML",
            },
            {
              concept: {
                name: "Device Independence Glossart perceivable unit",
              },
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  M0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-colindex": null,
            "aria-expanded": null,
            "aria-level": null,
            "aria-posinset": null,
            "aria-rowindex": null,
            "aria-selected": null,
            "aria-setsize": null,
          },
          relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }],
          requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
          requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
          requiredOwnedElements: [
            ["cell"],
            ["columnheader"],
            ["gridcell"],
            ["rowheader"],
          ],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "group"],
            ["roletype", "widget"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  $0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "tbody" }, module: "HTML" },
            { concept: { name: "tfoot" }, module: "HTML" },
            { concept: { name: "thead" }, module: "HTML" },
          ],
          requireContextRole: ["grid", "table", "treegrid"],
          requiredContextRole: ["grid", "table", "treegrid"],
          requiredOwnedElements: [["row"]],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  N0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-sort": null },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "scope", value: "row" }],
                name: "th",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [{ name: "scope", value: "rowgroup" }],
                name: "th",
              },
              module: "HTML",
            },
          ],
          requireContextRole: ["row", "rowgroup"],
          requiredContextRole: ["row", "rowgroup"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "cell"],
            ["roletype", "structure", "section", "cell", "gridcell"],
            ["roletype", "widget", "gridcell"],
            ["roletype", "structure", "sectionhead"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  j0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-valuetext": null,
            "aria-orientation": "vertical",
            "aria-valuemax": "100",
            "aria-valuemin": "0",
          },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-controls": null, "aria-valuenow": null },
          superClass: [
            ["roletype", "structure", "range"],
            ["roletype", "widget"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  I0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  L0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "list" },
                  { name: "type", value: "search" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "input", "textbox"]],
        },
        r = t;
      e.default = r;
    },
  }),
  B0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-orientation": "horizontal",
            "aria-valuemax": "100",
            "aria-valuemin": "0",
            "aria-valuenow": null,
            "aria-valuetext": null,
          },
          relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure"]],
        },
        r = t;
      e.default = r;
    },
  }),
  k0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-haspopup": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-valuetext": null,
            "aria-orientation": "horizontal",
            "aria-valuemax": "100",
            "aria-valuemin": "0",
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "type", value: "range" }],
                name: "input",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-valuenow": null },
          superClass: [
            ["roletype", "widget", "input"],
            ["roletype", "structure", "range"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  D0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-invalid": null,
            "aria-readonly": null,
            "aria-required": null,
            "aria-valuetext": null,
            "aria-valuenow": "0",
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [{ name: "type", value: "number" }],
                name: "input",
              },
              module: "HTML",
            },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite"],
            ["roletype", "widget", "input"],
            ["roletype", "structure", "range"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  F0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-atomic": "true", "aria-live": "polite" },
          relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  U0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "strong" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  H0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "sub" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  z0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["prohibited"],
          prohibitedProps: ["aria-label", "aria-labelledby"],
          props: {},
          relatedConcepts: [{ concept: { name: "sup" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  V0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: { "aria-checked": null },
          superClass: [["roletype", "widget", "input", "checkbox"]],
        },
        r = t;
      e.default = r;
    },
  }),
  G0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-posinset": null,
            "aria-setsize": null,
            "aria-selected": "false",
          },
          relatedConcepts: [],
          requireContextRole: ["tablist"],
          requiredContextRole: ["tablist"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "sectionhead"],
            ["roletype", "widget"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  W0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-colcount": null, "aria-rowcount": null },
          relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["row"], ["row", "rowgroup"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  K0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-level": null,
            "aria-multiselectable": null,
            "aria-orientation": "horizontal",
          },
          relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["tab"]],
          requiredProps: {},
          superClass: [["roletype", "widget", "composite"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Y0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  J0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/termRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "dfn" }, module: "HTML" },
            { concept: { name: "dt" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  X0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-activedescendant": null,
            "aria-autocomplete": null,
            "aria-errormessage": null,
            "aria-haspopup": null,
            "aria-invalid": null,
            "aria-multiline": null,
            "aria-placeholder": null,
            "aria-readonly": null,
            "aria-required": null,
          },
          relatedConcepts: [
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "type" },
                  { constraints: ["undefined"], name: "list" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "list" },
                  { name: "type", value: "email" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "list" },
                  { name: "type", value: "tel" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "list" },
                  { name: "type", value: "text" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
            {
              concept: {
                attributes: [
                  { constraints: ["undefined"], name: "list" },
                  { name: "type", value: "url" },
                ],
                constraints: ["the list attribute is not set"],
                name: "input",
              },
              module: "HTML",
            },
            { concept: { name: "input" }, module: "XForms" },
            { concept: { name: "textarea" }, module: "HTML" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "input"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Q0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [{ concept: { name: "time" }, module: "HTML" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  Z0 = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "status"]],
        },
        r = t;
      e.default = r;
    },
  }),
  eE = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: { "aria-orientation": "horizontal" },
          relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "group"]],
        },
        r = t;
      e.default = r;
    },
  }),
  tE = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  rE = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-invalid": null,
            "aria-multiselectable": null,
            "aria-required": null,
            "aria-orientation": "vertical",
          },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "select"],
            ["roletype", "structure", "section", "group", "select"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  nE = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["row"], ["row", "rowgroup"]],
          requiredProps: {},
          superClass: [
            ["roletype", "widget", "composite", "grid"],
            ["roletype", "structure", "section", "table", "grid"],
            ["roletype", "widget", "composite", "select", "tree"],
            ["roletype", "structure", "section", "group", "select", "tree"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  aE = T({
    "../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-expanded": null, "aria-haspopup": null },
          relatedConcepts: [],
          requireContextRole: ["group", "tree"],
          requiredContextRole: ["group", "tree"],
          requiredOwnedElements: [],
          requiredProps: { "aria-selected": null },
          superClass: [
            ["roletype", "structure", "section", "listitem"],
            ["roletype", "widget", "input", "option"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  oE = T({
    "../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = H(q_()),
        r = H(x_()),
        n = H(M_()),
        a = H($_()),
        o = H(N_()),
        i = H(j_()),
        l = H(I_()),
        u = H(L_()),
        c = H(B_()),
        s = H(k_()),
        d = H(D_()),
        p = H(F_()),
        f = H(U_()),
        h = H(H_()),
        m = H(z_()),
        g = H(V_()),
        b = H(G_()),
        y = H(W_()),
        R = H(K_()),
        _ = H(Y_()),
        C = H(J_()),
        w = H(X_()),
        v = H(Q_()),
        E = H(Z_()),
        O = H(e0()),
        M = H(t0()),
        N = H(r0()),
        k = H(n0()),
        j = H(a0()),
        I = H(o0()),
        B = H(i0()),
        z = H(l0()),
        K = H(s0()),
        W = H(u0()),
        re = H(c0()),
        me = H(d0()),
        de = H(f0()),
        F = H(p0()),
        L = H(h0()),
        D = H(m0()),
        G = H(b0()),
        Y = H(g0()),
        ne = H(y0()),
        fe = H(v0()),
        Be = H(_0()),
        q = H(E0()),
        V = H(w0()),
        U = H(C0()),
        Q = H(R0()),
        $ = H(T0()),
        se = H(S0()),
        ue = H(P0()),
        we = H(O0()),
        st = H(A0()),
        Ab = H(q0()),
        qb = H(x0()),
        xb = H(M0()),
        Mb = H($0()),
        $b = H(N0()),
        Nb = H(j0()),
        jb = H(I0()),
        Ib = H(L0()),
        Lb = H(B0()),
        Bb = H(k0()),
        kb = H(D0()),
        Db = H(F0()),
        Fb = H(U0()),
        Ub = H(H0()),
        Hb = H(z0()),
        zb = H(V0()),
        Vb = H(G0()),
        Gb = H(W0()),
        Wb = H(K0()),
        Kb = H(Y0()),
        Yb = H(J0()),
        Jb = H(X0()),
        Xb = H(Q0()),
        Qb = H(Z0()),
        Zb = H(eE()),
        eg = H(tE()),
        tg = H(rE()),
        rg = H(nE()),
        ng = H(aE());
      function H(vn) {
        return vn && vn.__esModule ? vn : { default: vn };
      }
      var ag = [
          ["alert", t.default],
          ["alertdialog", r.default],
          ["application", n.default],
          ["article", a.default],
          ["banner", o.default],
          ["blockquote", i.default],
          ["button", l.default],
          ["caption", u.default],
          ["cell", c.default],
          ["checkbox", s.default],
          ["code", d.default],
          ["columnheader", p.default],
          ["combobox", f.default],
          ["complementary", h.default],
          ["contentinfo", m.default],
          ["definition", g.default],
          ["deletion", b.default],
          ["dialog", y.default],
          ["directory", R.default],
          ["document", _.default],
          ["emphasis", C.default],
          ["feed", w.default],
          ["figure", v.default],
          ["form", E.default],
          ["generic", O.default],
          ["grid", M.default],
          ["gridcell", N.default],
          ["group", k.default],
          ["heading", j.default],
          ["img", I.default],
          ["insertion", B.default],
          ["link", z.default],
          ["list", K.default],
          ["listbox", W.default],
          ["listitem", re.default],
          ["log", me.default],
          ["main", de.default],
          ["mark", F.default],
          ["marquee", L.default],
          ["math", D.default],
          ["menu", G.default],
          ["menubar", Y.default],
          ["menuitem", ne.default],
          ["menuitemcheckbox", fe.default],
          ["menuitemradio", Be.default],
          ["meter", q.default],
          ["navigation", V.default],
          ["none", U.default],
          ["note", Q.default],
          ["option", $.default],
          ["paragraph", se.default],
          ["presentation", ue.default],
          ["progressbar", we.default],
          ["radio", st.default],
          ["radiogroup", Ab.default],
          ["region", qb.default],
          ["row", xb.default],
          ["rowgroup", Mb.default],
          ["rowheader", $b.default],
          ["scrollbar", Nb.default],
          ["search", jb.default],
          ["searchbox", Ib.default],
          ["separator", Lb.default],
          ["slider", Bb.default],
          ["spinbutton", kb.default],
          ["status", Db.default],
          ["strong", Fb.default],
          ["subscript", Ub.default],
          ["superscript", Hb.default],
          ["switch", zb.default],
          ["tab", Vb.default],
          ["table", Gb.default],
          ["tablist", Wb.default],
          ["tabpanel", Kb.default],
          ["term", Yb.default],
          ["textbox", Jb.default],
          ["time", Xb.default],
          ["timer", Qb.default],
          ["toolbar", Zb.default],
          ["tooltip", eg.default],
          ["tree", tg.default],
          ["treegrid", rg.default],
          ["treeitem", ng.default],
        ],
        og = ag;
      e.default = og;
    },
  }),
  iE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  lE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  sE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  uE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  cE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-errormessage": null, "aria-invalid": null },
          relatedConcepts: [
            { concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command", "link"]],
        },
        r = t;
      e.default = r;
    },
  }),
  dE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            {
              concept: { name: "EPUB biblioentry [EPUB-SSV]" },
              module: "EPUB",
            },
          ],
          requireContextRole: ["doc-bibliography"],
          requiredContextRole: ["doc-bibliography"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "listitem"]],
        },
        r = t;
      e.default = r;
    },
  }),
  fE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["doc-biblioentry"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  pE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-errormessage": null, "aria-invalid": null },
          relatedConcepts: [
            { concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command", "link"]],
        },
        r = t;
      e.default = r;
    },
  }),
  hE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  mE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  bE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  gE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "img"]],
        },
        r = t;
      e.default = r;
    },
  }),
  yE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  vE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  _E = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  EE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: ["doc-endnotes"],
          requiredContextRole: ["doc-endnotes"],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "listitem"]],
        },
        r = t;
      e.default = r;
    },
  }),
  wE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["doc-endnote"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  CE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  RE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  TE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  SE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  PE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  OE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  AE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [["definition"], ["term"]],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  qE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-errormessage": null, "aria-invalid": null },
          relatedConcepts: [
            { concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command", "link"]],
        },
        r = t;
      e.default = r;
    },
  }),
  xE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "index [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "landmark", "navigation"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  ME = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  $E = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: { "aria-errormessage": null, "aria-invalid": null },
          relatedConcepts: [
            { concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "widget", "command", "link"]],
        },
        r = t;
      e.default = r;
    },
  }),
  NE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "note"]],
        },
        r = t;
      e.default = r;
    },
  }),
  jE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "separator"]],
        },
        r = t;
      e.default = r;
    },
  }),
  IE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "landmark", "navigation"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  LE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "part [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  BE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  kE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "landmark"]],
        },
        r = t;
      e.default = r;
    },
  }),
  DE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {},
          relatedConcepts: [
            { concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["none"]],
        },
        r = t;
      e.default = r;
    },
  }),
  FE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section"]],
        },
        r = t;
      e.default = r;
    },
  }),
  UE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "sectionhead"]],
        },
        r = t;
      e.default = r;
    },
  }),
  HE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "help [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "note"]],
        },
        r = t;
      e.default = r;
    },
  }),
  zE = T({
    "../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [
            ["roletype", "structure", "section", "landmark", "navigation"],
          ],
        },
        r = t;
      e.default = r;
    },
  }),
  VE = T({
    "../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = D(iE()),
        r = D(lE()),
        n = D(sE()),
        a = D(uE()),
        o = D(cE()),
        i = D(dE()),
        l = D(fE()),
        u = D(pE()),
        c = D(hE()),
        s = D(mE()),
        d = D(bE()),
        p = D(gE()),
        f = D(yE()),
        h = D(vE()),
        m = D(_E()),
        g = D(EE()),
        b = D(wE()),
        y = D(CE()),
        R = D(RE()),
        _ = D(TE()),
        C = D(SE()),
        w = D(PE()),
        v = D(OE()),
        E = D(AE()),
        O = D(qE()),
        M = D(xE()),
        N = D(ME()),
        k = D($E()),
        j = D(NE()),
        I = D(jE()),
        B = D(IE()),
        z = D(LE()),
        K = D(BE()),
        W = D(kE()),
        re = D(DE()),
        me = D(FE()),
        de = D(UE()),
        F = D(HE()),
        L = D(zE());
      function D(ne) {
        return ne && ne.__esModule ? ne : { default: ne };
      }
      var G = [
          ["doc-abstract", t.default],
          ["doc-acknowledgments", r.default],
          ["doc-afterword", n.default],
          ["doc-appendix", a.default],
          ["doc-backlink", o.default],
          ["doc-biblioentry", i.default],
          ["doc-bibliography", l.default],
          ["doc-biblioref", u.default],
          ["doc-chapter", c.default],
          ["doc-colophon", s.default],
          ["doc-conclusion", d.default],
          ["doc-cover", p.default],
          ["doc-credit", f.default],
          ["doc-credits", h.default],
          ["doc-dedication", m.default],
          ["doc-endnote", g.default],
          ["doc-endnotes", b.default],
          ["doc-epigraph", y.default],
          ["doc-epilogue", R.default],
          ["doc-errata", _.default],
          ["doc-example", C.default],
          ["doc-footnote", w.default],
          ["doc-foreword", v.default],
          ["doc-glossary", E.default],
          ["doc-glossref", O.default],
          ["doc-index", M.default],
          ["doc-introduction", N.default],
          ["doc-noteref", k.default],
          ["doc-notice", j.default],
          ["doc-pagebreak", I.default],
          ["doc-pagelist", B.default],
          ["doc-part", z.default],
          ["doc-preface", K.default],
          ["doc-prologue", W.default],
          ["doc-pullquote", re.default],
          ["doc-qna", me.default],
          ["doc-subtitle", de.default],
          ["doc-tip", F.default],
          ["doc-toc", L.default],
        ],
        Y = G;
      e.default = Y;
    },
  }),
  GE = T({
    "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { module: "GRAPHICS", concept: { name: "graphics-object" } },
            { module: "ARIA", concept: { name: "img" } },
            { module: "ARIA", concept: { name: "article" } },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "document"]],
        },
        r = t;
      e.default = r;
    },
  }),
  WE = T({
    "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !1,
          baseConcepts: [],
          childrenPresentational: !1,
          nameFrom: ["author", "contents"],
          prohibitedProps: [],
          props: {
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [
            { module: "GRAPHICS", concept: { name: "graphics-document" } },
            { module: "ARIA", concept: { name: "group" } },
            { module: "ARIA", concept: { name: "img" } },
            { module: "GRAPHICS", concept: { name: "graphics-symbol" } },
          ],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "group"]],
        },
        r = t;
      e.default = r;
    },
  }),
  KE = T({
    "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(
      e,
    ) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = {
          abstract: !1,
          accessibleNameRequired: !0,
          baseConcepts: [],
          childrenPresentational: !0,
          nameFrom: ["author"],
          prohibitedProps: [],
          props: {
            "aria-disabled": null,
            "aria-errormessage": null,
            "aria-expanded": null,
            "aria-haspopup": null,
            "aria-invalid": null,
          },
          relatedConcepts: [],
          requireContextRole: [],
          requiredContextRole: [],
          requiredOwnedElements: [],
          requiredProps: {},
          superClass: [["roletype", "structure", "section", "img"]],
        },
        r = t;
      e.default = r;
    },
  }),
  YE = T({
    "../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = a(GE()),
        r = a(WE()),
        n = a(KE());
      function a(l) {
        return l && l.__esModule ? l : { default: l };
      }
      var o = [
          ["graphics-document", t.default],
          ["graphics-object", r.default],
          ["graphics-symbol", n.default],
        ],
        i = o;
      e.default = i;
    },
  }),
  qi = T({
    "../../node_modules/aria-query/lib/rolesMap.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = i(A_()),
        r = i(oE()),
        n = i(VE()),
        a = i(YE()),
        o = i(cn());
      function i(y) {
        return y && y.__esModule ? y : { default: y };
      }
      function l(y, R, _) {
        return (
          R in y
            ? Object.defineProperty(y, R, {
                value: _,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (y[R] = _),
          y
        );
      }
      function u(y, R) {
        var _ = (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
        if (!_) {
          if (Array.isArray(y) || (_ = d(y)) || R) {
            _ && (y = _);
            var C = 0,
              w = function () {};
            return {
              s: w,
              n: function () {
                return C >= y.length
                  ? { done: !0 }
                  : { done: !1, value: y[C++] };
              },
              e: function (M) {
                throw M;
              },
              f: w,
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var v = !0,
          E = !1,
          O;
        return {
          s: function () {
            _ = _.call(y);
          },
          n: function () {
            var M = _.next();
            return (v = M.done), M;
          },
          e: function (M) {
            (E = !0), (O = M);
          },
          f: function () {
            try {
              !v && _.return != null && _.return();
            } finally {
              if (E) throw O;
            }
          },
        };
      }
      function c(y, R) {
        return h(y) || f(y, R) || d(y, R) || s();
      }
      function s() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function d(y, R) {
        if (y) {
          if (typeof y == "string") return p(y, R);
          var _ = Object.prototype.toString.call(y).slice(8, -1);
          if (
            (_ === "Object" && y.constructor && (_ = y.constructor.name),
            _ === "Map" || _ === "Set")
          )
            return Array.from(y);
          if (
            _ === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)
          )
            return p(y, R);
        }
      }
      function p(y, R) {
        (R == null || R > y.length) && (R = y.length);
        for (var _ = 0, C = new Array(R); _ < R; _++) C[_] = y[_];
        return C;
      }
      function f(y, R) {
        var _ =
          y == null
            ? null
            : (typeof Symbol < "u" && y[Symbol.iterator]) || y["@@iterator"];
        if (_ != null) {
          var C = [],
            w = !0,
            v = !1,
            E,
            O;
          try {
            for (
              _ = _.call(y);
              !(w = (E = _.next()).done) &&
              (C.push(E.value), !(R && C.length === R));
              w = !0
            );
          } catch (M) {
            (v = !0), (O = M);
          } finally {
            try {
              !w && _.return != null && _.return();
            } finally {
              if (v) throw O;
            }
          }
          return C;
        }
      }
      function h(y) {
        if (Array.isArray(y)) return y;
      }
      var m = [].concat(t.default, r.default, n.default, a.default);
      m.forEach(function (y) {
        var R = c(y, 2),
          _ = R[1],
          C = u(_.superClass),
          w;
        try {
          for (C.s(); !(w = C.n()).done; ) {
            var v = w.value,
              E = u(v),
              O;
            try {
              var M = function () {
                var N = O.value,
                  k = m.find(function (K) {
                    var W = c(K, 1),
                      re = W[0];
                    return re === N;
                  });
                if (k)
                  for (
                    var j = k[1], I = 0, B = Object.keys(j.props);
                    I < B.length;
                    I++
                  ) {
                    var z = B[I];
                    Object.prototype.hasOwnProperty.call(_.props, z) ||
                      Object.assign(_.props, l({}, z, j.props[z]));
                  }
              };
              for (E.s(); !(O = E.n()).done; ) M();
            } catch (N) {
              E.e(N);
            } finally {
              E.f();
            }
          }
        } catch (N) {
          C.e(N);
        } finally {
          C.f();
        }
      });
      var g = {
          entries: function () {
            return m;
          },
          forEach: function (y) {
            var R =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              _ = u(m),
              C;
            try {
              for (_.s(); !(C = _.n()).done; ) {
                var w = c(C.value, 2),
                  v = w[0],
                  E = w[1];
                y.call(R, E, v, m);
              }
            } catch (O) {
              _.e(O);
            } finally {
              _.f();
            }
          },
          get: function (y) {
            var R = m.find(function (_) {
              return _[0] === y;
            });
            return R && R[1];
          },
          has: function (y) {
            return !!g.get(y);
          },
          keys: function () {
            return m.map(function (y) {
              var R = c(y, 1),
                _ = R[0];
              return _;
            });
          },
          values: function () {
            return m.map(function (y) {
              var R = c(y, 2),
                _ = R[1];
              return _;
            });
          },
        },
        b = (0, o.default)(g, g.entries());
      e.default = b;
    },
  }),
  JE = T({
    "../../node_modules/dequal/lite/index.js"(e) {
      var t = Object.prototype.hasOwnProperty;
      function r(n, a) {
        var o, i;
        if (n === a) return !0;
        if (n && a && (o = n.constructor) === a.constructor) {
          if (o === Date) return n.getTime() === a.getTime();
          if (o === RegExp) return n.toString() === a.toString();
          if (o === Array) {
            if ((i = n.length) === a.length) for (; i-- && r(n[i], a[i]); );
            return i === -1;
          }
          if (!o || typeof n == "object") {
            i = 0;
            for (o in n)
              if (
                (t.call(n, o) && ++i && !t.call(a, o)) ||
                !(o in a) ||
                !r(n[o], a[o])
              )
                return !1;
            return Object.keys(a).length === i;
          }
        }
        return n !== n && a !== a;
      }
      e.dequal = r;
    },
  }),
  XE = T({
    "../../node_modules/aria-query/lib/elementRoleMap.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = JE(),
        r = a(cn()),
        n = a(qi());
      function a(w) {
        return w && w.__esModule ? w : { default: w };
      }
      function o(w, v) {
        return u(w) || l(w, v) || s(w, v) || i();
      }
      function i() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function l(w, v) {
        var E =
          w == null
            ? null
            : (typeof Symbol < "u" && w[Symbol.iterator]) || w["@@iterator"];
        if (E != null) {
          var O = [],
            M = !0,
            N = !1,
            k,
            j;
          try {
            for (
              E = E.call(w);
              !(M = (k = E.next()).done) &&
              (O.push(k.value), !(v && O.length === v));
              M = !0
            );
          } catch (I) {
            (N = !0), (j = I);
          } finally {
            try {
              !M && E.return != null && E.return();
            } finally {
              if (N) throw j;
            }
          }
          return O;
        }
      }
      function u(w) {
        if (Array.isArray(w)) return w;
      }
      function c(w, v) {
        var E = (typeof Symbol < "u" && w[Symbol.iterator]) || w["@@iterator"];
        if (!E) {
          if (Array.isArray(w) || (E = s(w)) || v) {
            E && (w = E);
            var O = 0,
              M = function () {};
            return {
              s: M,
              n: function () {
                return O >= w.length
                  ? { done: !0 }
                  : { done: !1, value: w[O++] };
              },
              e: function (I) {
                throw I;
              },
              f: M,
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var N = !0,
          k = !1,
          j;
        return {
          s: function () {
            E = E.call(w);
          },
          n: function () {
            var I = E.next();
            return (N = I.done), I;
          },
          e: function (I) {
            (k = !0), (j = I);
          },
          f: function () {
            try {
              !N && E.return != null && E.return();
            } finally {
              if (k) throw j;
            }
          },
        };
      }
      function s(w, v) {
        if (w) {
          if (typeof w == "string") return d(w, v);
          var E = Object.prototype.toString.call(w).slice(8, -1);
          if (
            (E === "Object" && w.constructor && (E = w.constructor.name),
            E === "Map" || E === "Set")
          )
            return Array.from(w);
          if (
            E === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E)
          )
            return d(w, v);
        }
      }
      function d(w, v) {
        (v == null || v > w.length) && (v = w.length);
        for (var E = 0, O = new Array(v); E < v; E++) O[E] = w[E];
        return O;
      }
      var p = [],
        f = n.default.keys();
      for (R = 0; R < f.length; R++)
        if (((h = f[R]), (m = n.default.get(h)), m))
          for (
            g = [].concat(m.baseConcepts, m.relatedConcepts), y = 0;
            y < g.length;
            y++
          )
            (b = g[y]),
              b.module === "HTML" &&
                (function () {
                  var w = b.concept;
                  if (w) {
                    var v = p.find(function (N) {
                        return (0, t.dequal)(N, w);
                      }),
                      E;
                    v ? (E = v[1]) : (E = []);
                    for (var O = !0, M = 0; M < E.length; M++)
                      if (E[M] === h) {
                        O = !1;
                        break;
                      }
                    O && E.push(h), p.push([w, E]);
                  }
                })();
      var h,
        m,
        g,
        b,
        y,
        R,
        _ = {
          entries: function () {
            return p;
          },
          forEach: function (w) {
            var v =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              E = c(p),
              O;
            try {
              for (E.s(); !(O = E.n()).done; ) {
                var M = o(O.value, 2),
                  N = M[0],
                  k = M[1];
                w.call(v, k, N, p);
              }
            } catch (j) {
              E.e(j);
            } finally {
              E.f();
            }
          },
          get: function (w) {
            var v = p.find(function (E) {
              return (
                w.name === E[0].name &&
                (0, t.dequal)(w.attributes, E[0].attributes)
              );
            });
            return v && v[1];
          },
          has: function (w) {
            return !!_.get(w);
          },
          keys: function () {
            return p.map(function (w) {
              var v = o(w, 1),
                E = v[0];
              return E;
            });
          },
          values: function () {
            return p.map(function (w) {
              var v = o(w, 2),
                E = v[1];
              return E;
            });
          },
        },
        C = (0, r.default)(_, _.entries());
      e.default = C;
    },
  }),
  QE = T({
    "../../node_modules/aria-query/lib/roleElementMap.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = n(cn()),
        r = n(qi());
      function n(v) {
        return v && v.__esModule ? v : { default: v };
      }
      function a(v, E) {
        return l(v) || i(v, E) || c(v, E) || o();
      }
      function o() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function i(v, E) {
        var O =
          v == null
            ? null
            : (typeof Symbol < "u" && v[Symbol.iterator]) || v["@@iterator"];
        if (O != null) {
          var M = [],
            N = !0,
            k = !1,
            j,
            I;
          try {
            for (
              O = O.call(v);
              !(N = (j = O.next()).done) &&
              (M.push(j.value), !(E && M.length === E));
              N = !0
            );
          } catch (B) {
            (k = !0), (I = B);
          } finally {
            try {
              !N && O.return != null && O.return();
            } finally {
              if (k) throw I;
            }
          }
          return M;
        }
      }
      function l(v) {
        if (Array.isArray(v)) return v;
      }
      function u(v, E) {
        var O = (typeof Symbol < "u" && v[Symbol.iterator]) || v["@@iterator"];
        if (!O) {
          if (Array.isArray(v) || (O = c(v)) || E) {
            O && (v = O);
            var M = 0,
              N = function () {};
            return {
              s: N,
              n: function () {
                return M >= v.length
                  ? { done: !0 }
                  : { done: !1, value: v[M++] };
              },
              e: function (B) {
                throw B;
              },
              f: N,
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var k = !0,
          j = !1,
          I;
        return {
          s: function () {
            O = O.call(v);
          },
          n: function () {
            var B = O.next();
            return (k = B.done), B;
          },
          e: function (B) {
            (j = !0), (I = B);
          },
          f: function () {
            try {
              !k && O.return != null && O.return();
            } finally {
              if (j) throw I;
            }
          },
        };
      }
      function c(v, E) {
        if (v) {
          if (typeof v == "string") return s(v, E);
          var O = Object.prototype.toString.call(v).slice(8, -1);
          if (
            (O === "Object" && v.constructor && (O = v.constructor.name),
            O === "Map" || O === "Set")
          )
            return Array.from(v);
          if (
            O === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)
          )
            return s(v, E);
        }
      }
      function s(v, E) {
        (E == null || E > v.length) && (E = v.length);
        for (var O = 0, M = new Array(E); O < E; O++) M[O] = v[O];
        return M;
      }
      var d = [],
        p = r.default.keys();
      for (_ = 0; _ < p.length; _++)
        if (((f = p[_]), (h = r.default.get(f)), (m = []), h)) {
          for (
            g = [].concat(h.baseConcepts, h.relatedConcepts), R = 0;
            R < g.length;
            R++
          )
            (b = g[R]),
              b.module === "HTML" && ((y = b.concept), y != null && m.push(y));
          m.length > 0 && d.push([f, m]);
        }
      var f,
        h,
        m,
        g,
        b,
        y,
        R,
        _,
        C = {
          entries: function () {
            return d;
          },
          forEach: function (v) {
            var E =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              O = u(d),
              M;
            try {
              for (O.s(); !(M = O.n()).done; ) {
                var N = a(M.value, 2),
                  k = N[0],
                  j = N[1];
                v.call(E, j, k, d);
              }
            } catch (I) {
              O.e(I);
            } finally {
              O.f();
            }
          },
          get: function (v) {
            var E = d.find(function (O) {
              return O[0] === v;
            });
            return E && E[1];
          },
          has: function (v) {
            return !!C.get(v);
          },
          keys: function () {
            return d.map(function (v) {
              var E = a(v, 1),
                O = E[0];
              return O;
            });
          },
          values: function () {
            return d.map(function (v) {
              var E = a(v, 2),
                O = E[1];
              return O;
            });
          },
        },
        w = (0, t.default)(C, C.entries());
      e.default = w;
    },
  }),
  xi = T({
    "../../node_modules/aria-query/lib/index.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.roles = e.roleElements = e.elementRoles = e.dom = e.aria = void 0);
      var t = i(m_()),
        r = i(b_()),
        n = i(qi()),
        a = i(XE()),
        o = i(QE());
      function i(p) {
        return p && p.__esModule ? p : { default: p };
      }
      var l = t.default;
      e.aria = l;
      var u = r.default;
      e.dom = u;
      var c = n.default;
      e.roles = c;
      var s = a.default;
      e.elementRoles = s;
      var d = o.default;
      e.roleElements = d;
    },
  }),
  ZE = T({
    "../../node_modules/color-name/index.js"(e, t) {
      t.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      };
    },
  }),
  Ad = T({
    "../../node_modules/color-convert/conversions.js"(e, t) {
      var r = ZE(),
        n = {};
      for (let i of Object.keys(r)) n[r[i]] = i;
      var a = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] },
      };
      t.exports = a;
      for (let i of Object.keys(a)) {
        if (!("channels" in a[i]))
          throw new Error("missing channels property: " + i);
        if (!("labels" in a[i]))
          throw new Error("missing channel labels property: " + i);
        if (a[i].labels.length !== a[i].channels)
          throw new Error("channel and label counts mismatch: " + i);
        let { channels: l, labels: u } = a[i];
        delete a[i].channels,
          delete a[i].labels,
          Object.defineProperty(a[i], "channels", { value: l }),
          Object.defineProperty(a[i], "labels", { value: u });
      }
      (a.rgb.hsl = function (i) {
        let l = i[0] / 255,
          u = i[1] / 255,
          c = i[2] / 255,
          s = Math.min(l, u, c),
          d = Math.max(l, u, c),
          p = d - s,
          f,
          h;
        d === s
          ? (f = 0)
          : l === d
            ? (f = (u - c) / p)
            : u === d
              ? (f = 2 + (c - l) / p)
              : c === d && (f = 4 + (l - u) / p),
          (f = Math.min(f * 60, 360)),
          f < 0 && (f += 360);
        let m = (s + d) / 2;
        return (
          d === s
            ? (h = 0)
            : m <= 0.5
              ? (h = p / (d + s))
              : (h = p / (2 - d - s)),
          [f, h * 100, m * 100]
        );
      }),
        (a.rgb.hsv = function (i) {
          let l,
            u,
            c,
            s,
            d,
            p = i[0] / 255,
            f = i[1] / 255,
            h = i[2] / 255,
            m = Math.max(p, f, h),
            g = m - Math.min(p, f, h),
            b = function (y) {
              return (m - y) / 6 / g + 1 / 2;
            };
          return (
            g === 0
              ? ((s = 0), (d = 0))
              : ((d = g / m),
                (l = b(p)),
                (u = b(f)),
                (c = b(h)),
                p === m
                  ? (s = c - u)
                  : f === m
                    ? (s = 1 / 3 + l - c)
                    : h === m && (s = 2 / 3 + u - l),
                s < 0 ? (s += 1) : s > 1 && (s -= 1)),
            [s * 360, d * 100, m * 100]
          );
        }),
        (a.rgb.hwb = function (i) {
          let l = i[0],
            u = i[1],
            c = i[2],
            s = a.rgb.hsl(i)[0],
            d = (1 / 255) * Math.min(l, Math.min(u, c));
          return (
            (c = 1 - (1 / 255) * Math.max(l, Math.max(u, c))),
            [s, d * 100, c * 100]
          );
        }),
        (a.rgb.cmyk = function (i) {
          let l = i[0] / 255,
            u = i[1] / 255,
            c = i[2] / 255,
            s = Math.min(1 - l, 1 - u, 1 - c),
            d = (1 - l - s) / (1 - s) || 0,
            p = (1 - u - s) / (1 - s) || 0,
            f = (1 - c - s) / (1 - s) || 0;
          return [d * 100, p * 100, f * 100, s * 100];
        });
      function o(i, l) {
        return (i[0] - l[0]) ** 2 + (i[1] - l[1]) ** 2 + (i[2] - l[2]) ** 2;
      }
      (a.rgb.keyword = function (i) {
        let l = n[i];
        if (l) return l;
        let u = 1 / 0,
          c;
        for (let s of Object.keys(r)) {
          let d = r[s],
            p = o(i, d);
          p < u && ((u = p), (c = s));
        }
        return c;
      }),
        (a.keyword.rgb = function (i) {
          return r[i];
        }),
        (a.rgb.xyz = function (i) {
          let l = i[0] / 255,
            u = i[1] / 255,
            c = i[2] / 255;
          (l = l > 0.04045 ? ((l + 0.055) / 1.055) ** 2.4 : l / 12.92),
            (u = u > 0.04045 ? ((u + 0.055) / 1.055) ** 2.4 : u / 12.92),
            (c = c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92);
          let s = l * 0.4124 + u * 0.3576 + c * 0.1805,
            d = l * 0.2126 + u * 0.7152 + c * 0.0722,
            p = l * 0.0193 + u * 0.1192 + c * 0.9505;
          return [s * 100, d * 100, p * 100];
        }),
        (a.rgb.lab = function (i) {
          let l = a.rgb.xyz(i),
            u = l[0],
            c = l[1],
            s = l[2];
          (u /= 95.047),
            (c /= 100),
            (s /= 108.883),
            (u = u > 0.008856 ? u ** (1 / 3) : 7.787 * u + 16 / 116),
            (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116),
            (s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116);
          let d = 116 * c - 16,
            p = 500 * (u - c),
            f = 200 * (c - s);
          return [d, p, f];
        }),
        (a.hsl.rgb = function (i) {
          let l = i[0] / 360,
            u = i[1] / 100,
            c = i[2] / 100,
            s,
            d,
            p;
          if (u === 0) return (p = c * 255), [p, p, p];
          c < 0.5 ? (s = c * (1 + u)) : (s = c + u - c * u);
          let f = 2 * c - s,
            h = [0, 0, 0];
          for (let m = 0; m < 3; m++)
            (d = l + (1 / 3) * -(m - 1)),
              d < 0 && d++,
              d > 1 && d--,
              6 * d < 1
                ? (p = f + (s - f) * 6 * d)
                : 2 * d < 1
                  ? (p = s)
                  : 3 * d < 2
                    ? (p = f + (s - f) * (2 / 3 - d) * 6)
                    : (p = f),
              (h[m] = p * 255);
          return h;
        }),
        (a.hsl.hsv = function (i) {
          let l = i[0],
            u = i[1] / 100,
            c = i[2] / 100,
            s = u,
            d = Math.max(c, 0.01);
          (c *= 2), (u *= c <= 1 ? c : 2 - c), (s *= d <= 1 ? d : 2 - d);
          let p = (c + u) / 2,
            f = c === 0 ? (2 * s) / (d + s) : (2 * u) / (c + u);
          return [l, f * 100, p * 100];
        }),
        (a.hsv.rgb = function (i) {
          let l = i[0] / 60,
            u = i[1] / 100,
            c = i[2] / 100,
            s = Math.floor(l) % 6,
            d = l - Math.floor(l),
            p = 255 * c * (1 - u),
            f = 255 * c * (1 - u * d),
            h = 255 * c * (1 - u * (1 - d));
          switch (((c *= 255), s)) {
            case 0:
              return [c, h, p];
            case 1:
              return [f, c, p];
            case 2:
              return [p, c, h];
            case 3:
              return [p, f, c];
            case 4:
              return [h, p, c];
            case 5:
              return [c, p, f];
          }
        }),
        (a.hsv.hsl = function (i) {
          let l = i[0],
            u = i[1] / 100,
            c = i[2] / 100,
            s = Math.max(c, 0.01),
            d,
            p;
          p = (2 - u) * c;
          let f = (2 - u) * s;
          return (
            (d = u * s),
            (d /= f <= 1 ? f : 2 - f),
            (d = d || 0),
            (p /= 2),
            [l, d * 100, p * 100]
          );
        }),
        (a.hwb.rgb = function (i) {
          let l = i[0] / 360,
            u = i[1] / 100,
            c = i[2] / 100,
            s = u + c,
            d;
          s > 1 && ((u /= s), (c /= s));
          let p = Math.floor(6 * l),
            f = 1 - c;
          (d = 6 * l - p), p & 1 && (d = 1 - d);
          let h = u + d * (f - u),
            m,
            g,
            b;
          switch (p) {
            default:
            case 6:
            case 0:
              (m = f), (g = h), (b = u);
              break;
            case 1:
              (m = h), (g = f), (b = u);
              break;
            case 2:
              (m = u), (g = f), (b = h);
              break;
            case 3:
              (m = u), (g = h), (b = f);
              break;
            case 4:
              (m = h), (g = u), (b = f);
              break;
            case 5:
              (m = f), (g = u), (b = h);
              break;
          }
          return [m * 255, g * 255, b * 255];
        }),
        (a.cmyk.rgb = function (i) {
          let l = i[0] / 100,
            u = i[1] / 100,
            c = i[2] / 100,
            s = i[3] / 100,
            d = 1 - Math.min(1, l * (1 - s) + s),
            p = 1 - Math.min(1, u * (1 - s) + s),
            f = 1 - Math.min(1, c * (1 - s) + s);
          return [d * 255, p * 255, f * 255];
        }),
        (a.xyz.rgb = function (i) {
          let l = i[0] / 100,
            u = i[1] / 100,
            c = i[2] / 100,
            s,
            d,
            p;
          return (
            (s = l * 3.2406 + u * -1.5372 + c * -0.4986),
            (d = l * -0.9689 + u * 1.8758 + c * 0.0415),
            (p = l * 0.0557 + u * -0.204 + c * 1.057),
            (s = s > 0.0031308 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92),
            (d = d > 0.0031308 ? 1.055 * d ** (1 / 2.4) - 0.055 : d * 12.92),
            (p = p > 0.0031308 ? 1.055 * p ** (1 / 2.4) - 0.055 : p * 12.92),
            (s = Math.min(Math.max(0, s), 1)),
            (d = Math.min(Math.max(0, d), 1)),
            (p = Math.min(Math.max(0, p), 1)),
            [s * 255, d * 255, p * 255]
          );
        }),
        (a.xyz.lab = function (i) {
          let l = i[0],
            u = i[1],
            c = i[2];
          (l /= 95.047),
            (u /= 100),
            (c /= 108.883),
            (l = l > 0.008856 ? l ** (1 / 3) : 7.787 * l + 16 / 116),
            (u = u > 0.008856 ? u ** (1 / 3) : 7.787 * u + 16 / 116),
            (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116);
          let s = 116 * u - 16,
            d = 500 * (l - u),
            p = 200 * (u - c);
          return [s, d, p];
        }),
        (a.lab.xyz = function (i) {
          let l = i[0],
            u = i[1],
            c = i[2],
            s,
            d,
            p;
          (d = (l + 16) / 116), (s = u / 500 + d), (p = d - c / 200);
          let f = d ** 3,
            h = s ** 3,
            m = p ** 3;
          return (
            (d = f > 0.008856 ? f : (d - 16 / 116) / 7.787),
            (s = h > 0.008856 ? h : (s - 16 / 116) / 7.787),
            (p = m > 0.008856 ? m : (p - 16 / 116) / 7.787),
            (s *= 95.047),
            (d *= 100),
            (p *= 108.883),
            [s, d, p]
          );
        }),
        (a.lab.lch = function (i) {
          let l = i[0],
            u = i[1],
            c = i[2],
            s;
          (s = (Math.atan2(c, u) * 360) / 2 / Math.PI), s < 0 && (s += 360);
          let d = Math.sqrt(u * u + c * c);
          return [l, d, s];
        }),
        (a.lch.lab = function (i) {
          let l = i[0],
            u = i[1],
            c = (i[2] / 360) * 2 * Math.PI,
            s = u * Math.cos(c),
            d = u * Math.sin(c);
          return [l, s, d];
        }),
        (a.rgb.ansi16 = function (i, l = null) {
          let [u, c, s] = i,
            d = l === null ? a.rgb.hsv(i)[2] : l;
          if (((d = Math.round(d / 50)), d === 0)) return 30;
          let p =
            30 +
            ((Math.round(s / 255) << 2) |
              (Math.round(c / 255) << 1) |
              Math.round(u / 255));
          return d === 2 && (p += 60), p;
        }),
        (a.hsv.ansi16 = function (i) {
          return a.rgb.ansi16(a.hsv.rgb(i), i[2]);
        }),
        (a.rgb.ansi256 = function (i) {
          let l = i[0],
            u = i[1],
            c = i[2];
          return l === u && u === c
            ? l < 8
              ? 16
              : l > 248
                ? 231
                : Math.round(((l - 8) / 247) * 24) + 232
            : 16 +
                36 * Math.round((l / 255) * 5) +
                6 * Math.round((u / 255) * 5) +
                Math.round((c / 255) * 5);
        }),
        (a.ansi16.rgb = function (i) {
          let l = i % 10;
          if (l === 0 || l === 7)
            return i > 50 && (l += 3.5), (l = (l / 10.5) * 255), [l, l, l];
          let u = (~~(i > 50) + 1) * 0.5,
            c = (l & 1) * u * 255,
            s = ((l >> 1) & 1) * u * 255,
            d = ((l >> 2) & 1) * u * 255;
          return [c, s, d];
        }),
        (a.ansi256.rgb = function (i) {
          if (i >= 232) {
            let d = (i - 232) * 10 + 8;
            return [d, d, d];
          }
          i -= 16;
          let l,
            u = (Math.floor(i / 36) / 5) * 255,
            c = (Math.floor((l = i % 36) / 6) / 5) * 255,
            s = ((l % 6) / 5) * 255;
          return [u, c, s];
        }),
        (a.rgb.hex = function (i) {
          let l = (
            ((Math.round(i[0]) & 255) << 16) +
            ((Math.round(i[1]) & 255) << 8) +
            (Math.round(i[2]) & 255)
          )
            .toString(16)
            .toUpperCase();
          return "000000".substring(l.length) + l;
        }),
        (a.hex.rgb = function (i) {
          let l = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
          if (!l) return [0, 0, 0];
          let u = l[0];
          l[0].length === 3 &&
            (u = u
              .split("")
              .map((f) => f + f)
              .join(""));
          let c = parseInt(u, 16),
            s = (c >> 16) & 255,
            d = (c >> 8) & 255,
            p = c & 255;
          return [s, d, p];
        }),
        (a.rgb.hcg = function (i) {
          let l = i[0] / 255,
            u = i[1] / 255,
            c = i[2] / 255,
            s = Math.max(Math.max(l, u), c),
            d = Math.min(Math.min(l, u), c),
            p = s - d,
            f,
            h;
          return (
            p < 1 ? (f = d / (1 - p)) : (f = 0),
            p <= 0
              ? (h = 0)
              : s === l
                ? (h = ((u - c) / p) % 6)
                : s === u
                  ? (h = 2 + (c - l) / p)
                  : (h = 4 + (l - u) / p),
            (h /= 6),
            (h %= 1),
            [h * 360, p * 100, f * 100]
          );
        }),
        (a.hsl.hcg = function (i) {
          let l = i[1] / 100,
            u = i[2] / 100,
            c = u < 0.5 ? 2 * l * u : 2 * l * (1 - u),
            s = 0;
          return (
            c < 1 && (s = (u - 0.5 * c) / (1 - c)), [i[0], c * 100, s * 100]
          );
        }),
        (a.hsv.hcg = function (i) {
          let l = i[1] / 100,
            u = i[2] / 100,
            c = l * u,
            s = 0;
          return c < 1 && (s = (u - c) / (1 - c)), [i[0], c * 100, s * 100];
        }),
        (a.hcg.rgb = function (i) {
          let l = i[0] / 360,
            u = i[1] / 100,
            c = i[2] / 100;
          if (u === 0) return [c * 255, c * 255, c * 255];
          let s = [0, 0, 0],
            d = (l % 1) * 6,
            p = d % 1,
            f = 1 - p,
            h = 0;
          switch (Math.floor(d)) {
            case 0:
              (s[0] = 1), (s[1] = p), (s[2] = 0);
              break;
            case 1:
              (s[0] = f), (s[1] = 1), (s[2] = 0);
              break;
            case 2:
              (s[0] = 0), (s[1] = 1), (s[2] = p);
              break;
            case 3:
              (s[0] = 0), (s[1] = f), (s[2] = 1);
              break;
            case 4:
              (s[0] = p), (s[1] = 0), (s[2] = 1);
              break;
            default:
              (s[0] = 1), (s[1] = 0), (s[2] = f);
          }
          return (
            (h = (1 - u) * c),
            [(u * s[0] + h) * 255, (u * s[1] + h) * 255, (u * s[2] + h) * 255]
          );
        }),
        (a.hcg.hsv = function (i) {
          let l = i[1] / 100,
            u = i[2] / 100,
            c = l + u * (1 - l),
            s = 0;
          return c > 0 && (s = l / c), [i[0], s * 100, c * 100];
        }),
        (a.hcg.hsl = function (i) {
          let l = i[1] / 100,
            u = (i[2] / 100) * (1 - l) + 0.5 * l,
            c = 0;
          return (
            u > 0 && u < 0.5
              ? (c = l / (2 * u))
              : u >= 0.5 && u < 1 && (c = l / (2 * (1 - u))),
            [i[0], c * 100, u * 100]
          );
        }),
        (a.hcg.hwb = function (i) {
          let l = i[1] / 100,
            u = i[2] / 100,
            c = l + u * (1 - l);
          return [i[0], (c - l) * 100, (1 - c) * 100];
        }),
        (a.hwb.hcg = function (i) {
          let l = i[1] / 100,
            u = 1 - i[2] / 100,
            c = u - l,
            s = 0;
          return c < 1 && (s = (u - c) / (1 - c)), [i[0], c * 100, s * 100];
        }),
        (a.apple.rgb = function (i) {
          return [
            (i[0] / 65535) * 255,
            (i[1] / 65535) * 255,
            (i[2] / 65535) * 255,
          ];
        }),
        (a.rgb.apple = function (i) {
          return [
            (i[0] / 255) * 65535,
            (i[1] / 255) * 65535,
            (i[2] / 255) * 65535,
          ];
        }),
        (a.gray.rgb = function (i) {
          return [(i[0] / 100) * 255, (i[0] / 100) * 255, (i[0] / 100) * 255];
        }),
        (a.gray.hsl = function (i) {
          return [0, 0, i[0]];
        }),
        (a.gray.hsv = a.gray.hsl),
        (a.gray.hwb = function (i) {
          return [0, 100, i[0]];
        }),
        (a.gray.cmyk = function (i) {
          return [0, 0, 0, i[0]];
        }),
        (a.gray.lab = function (i) {
          return [i[0], 0, 0];
        }),
        (a.gray.hex = function (i) {
          let l = Math.round((i[0] / 100) * 255) & 255,
            u = ((l << 16) + (l << 8) + l).toString(16).toUpperCase();
          return "000000".substring(u.length) + u;
        }),
        (a.rgb.gray = function (i) {
          return [((i[0] + i[1] + i[2]) / 3 / 255) * 100];
        });
    },
  }),
  ew = T({
    "../../node_modules/color-convert/route.js"(e, t) {
      var r = Ad();
      function n() {
        let l = {},
          u = Object.keys(r);
        for (let c = u.length, s = 0; s < c; s++)
          l[u[s]] = { distance: -1, parent: null };
        return l;
      }
      function a(l) {
        let u = n(),
          c = [l];
        for (u[l].distance = 0; c.length; ) {
          let s = c.pop(),
            d = Object.keys(r[s]);
          for (let p = d.length, f = 0; f < p; f++) {
            let h = d[f],
              m = u[h];
            m.distance === -1 &&
              ((m.distance = u[s].distance + 1), (m.parent = s), c.unshift(h));
          }
        }
        return u;
      }
      function o(l, u) {
        return function (c) {
          return u(l(c));
        };
      }
      function i(l, u) {
        let c = [u[l].parent, l],
          s = r[u[l].parent][l],
          d = u[l].parent;
        for (; u[d].parent; )
          c.unshift(u[d].parent),
            (s = o(r[u[d].parent][d], s)),
            (d = u[d].parent);
        return (s.conversion = c), s;
      }
      t.exports = function (l) {
        let u = a(l),
          c = {},
          s = Object.keys(u);
        for (let d = s.length, p = 0; p < d; p++) {
          let f = s[p];
          u[f].parent !== null && (c[f] = i(f, u));
        }
        return c;
      };
    },
  }),
  tw = T({
    "../../node_modules/color-convert/index.js"(e, t) {
      var r = Ad(),
        n = ew(),
        a = {},
        o = Object.keys(r);
      function i(u) {
        let c = function (...s) {
          let d = s[0];
          return d == null ? d : (d.length > 1 && (s = d), u(s));
        };
        return "conversion" in u && (c.conversion = u.conversion), c;
      }
      function l(u) {
        let c = function (...s) {
          let d = s[0];
          if (d == null) return d;
          d.length > 1 && (s = d);
          let p = u(s);
          if (typeof p == "object")
            for (let f = p.length, h = 0; h < f; h++) p[h] = Math.round(p[h]);
          return p;
        };
        return "conversion" in u && (c.conversion = u.conversion), c;
      }
      o.forEach((u) => {
        (a[u] = {}),
          Object.defineProperty(a[u], "channels", { value: r[u].channels }),
          Object.defineProperty(a[u], "labels", { value: r[u].labels });
        let c = n(u);
        Object.keys(c).forEach((s) => {
          let d = c[s];
          (a[u][s] = l(d)), (a[u][s].raw = i(d));
        });
      }),
        (t.exports = a);
    },
  }),
  rw = T({
    "../../node_modules/ansi-styles/index.js"(e, t) {
      var r =
          (d, p) =>
          (...f) =>
            `\x1B[${d(...f) + p}m`,
        n =
          (d, p) =>
          (...f) => {
            let h = d(...f);
            return `\x1B[${38 + p};5;${h}m`;
          },
        a =
          (d, p) =>
          (...f) => {
            let h = d(...f);
            return `\x1B[${38 + p};2;${h[0]};${h[1]};${h[2]}m`;
          },
        o = (d) => d,
        i = (d, p, f) => [d, p, f],
        l = (d, p, f) => {
          Object.defineProperty(d, p, {
            get: () => {
              let h = f();
              return (
                Object.defineProperty(d, p, {
                  value: h,
                  enumerable: !0,
                  configurable: !0,
                }),
                h
              );
            },
            enumerable: !0,
            configurable: !0,
          });
        },
        u,
        c = (d, p, f, h) => {
          u === void 0 && (u = tw());
          let m = h ? 10 : 0,
            g = {};
          for (let [b, y] of Object.entries(u)) {
            let R = b === "ansi16" ? "ansi" : b;
            b === p
              ? (g[R] = d(f, m))
              : typeof y == "object" && (g[R] = d(y[p], m));
          }
          return g;
        };
      function s() {
        let d = new Map(),
          p = {
            modifier: {
              reset: [0, 0],
              bold: [1, 22],
              dim: [2, 22],
              italic: [3, 23],
              underline: [4, 24],
              inverse: [7, 27],
              hidden: [8, 28],
              strikethrough: [9, 29],
            },
            color: {
              black: [30, 39],
              red: [31, 39],
              green: [32, 39],
              yellow: [33, 39],
              blue: [34, 39],
              magenta: [35, 39],
              cyan: [36, 39],
              white: [37, 39],
              blackBright: [90, 39],
              redBright: [91, 39],
              greenBright: [92, 39],
              yellowBright: [93, 39],
              blueBright: [94, 39],
              magentaBright: [95, 39],
              cyanBright: [96, 39],
              whiteBright: [97, 39],
            },
            bgColor: {
              bgBlack: [40, 49],
              bgRed: [41, 49],
              bgGreen: [42, 49],
              bgYellow: [43, 49],
              bgBlue: [44, 49],
              bgMagenta: [45, 49],
              bgCyan: [46, 49],
              bgWhite: [47, 49],
              bgBlackBright: [100, 49],
              bgRedBright: [101, 49],
              bgGreenBright: [102, 49],
              bgYellowBright: [103, 49],
              bgBlueBright: [104, 49],
              bgMagentaBright: [105, 49],
              bgCyanBright: [106, 49],
              bgWhiteBright: [107, 49],
            },
          };
        (p.color.gray = p.color.blackBright),
          (p.bgColor.bgGray = p.bgColor.bgBlackBright),
          (p.color.grey = p.color.blackBright),
          (p.bgColor.bgGrey = p.bgColor.bgBlackBright);
        for (let [f, h] of Object.entries(p)) {
          for (let [m, g] of Object.entries(h))
            (p[m] = { open: `\x1B[${g[0]}m`, close: `\x1B[${g[1]}m` }),
              (h[m] = p[m]),
              d.set(g[0], g[1]);
          Object.defineProperty(p, f, { value: h, enumerable: !1 });
        }
        return (
          Object.defineProperty(p, "codes", { value: d, enumerable: !1 }),
          (p.color.close = "\x1B[39m"),
          (p.bgColor.close = "\x1B[49m"),
          l(p.color, "ansi", () => c(r, "ansi16", o, !1)),
          l(p.color, "ansi256", () => c(n, "ansi256", o, !1)),
          l(p.color, "ansi16m", () => c(a, "rgb", i, !1)),
          l(p.bgColor, "ansi", () => c(r, "ansi16", o, !0)),
          l(p.bgColor, "ansi256", () => c(n, "ansi256", o, !0)),
          l(p.bgColor, "ansi16m", () => c(a, "rgb", i, !0)),
          p
        );
      }
      Object.defineProperty(t, "exports", { enumerable: !0, get: s });
    },
  }),
  nw = T({
    "../../node_modules/supports-color/browser.js"(e, t) {
      t.exports = { stdout: !1, stderr: !1 };
    },
  }),
  aw = T({
    "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/util.js"(
      e,
      t,
    ) {
      var r = (a, o, i) => {
          let l = a.indexOf(o);
          if (l === -1) return a;
          let u = o.length,
            c = 0,
            s = "";
          do
            (s += a.substr(c, l - c) + o + i),
              (c = l + u),
              (l = a.indexOf(o, c));
          while (l !== -1);
          return (s += a.substr(c)), s;
        },
        n = (a, o, i, l) => {
          let u = 0,
            c = "";
          do {
            let s = a[l - 1] === "\r";
            (c +=
              a.substr(u, (s ? l - 1 : l) - u) +
              o +
              (s
                ? `\r
`
                : `
`) +
              i),
              (u = l + 1),
              (l = a.indexOf(
                `
`,
                u,
              ));
          } while (l !== -1);
          return (c += a.substr(u)), c;
        };
      t.exports = { stringReplaceAll: r, stringEncaseCRLFWithFirstIndex: n };
    },
  }),
  ow = T({
    "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/templates.js"(
      e,
      t,
    ) {
      var r =
          /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
        n = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
        a = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
        o = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi,
        i = new Map([
          [
            "n",
            `
`,
          ],
          ["r", "\r"],
          ["t", "	"],
          ["b", "\b"],
          ["f", "\f"],
          ["v", "\v"],
          ["0", "\0"],
          ["\\", "\\"],
          ["e", "\x1B"],
          ["a", "\x07"],
        ]);
      function l(d) {
        let p = d[0] === "u",
          f = d[1] === "{";
        return (p && !f && d.length === 5) || (d[0] === "x" && d.length === 3)
          ? String.fromCharCode(parseInt(d.slice(1), 16))
          : p && f
            ? String.fromCodePoint(parseInt(d.slice(2, -1), 16))
            : i.get(d) || d;
      }
      function u(d, p) {
        let f = [],
          h = p.trim().split(/\s*,\s*/g),
          m;
        for (let g of h) {
          let b = Number(g);
          if (!Number.isNaN(b)) f.push(b);
          else if ((m = g.match(a)))
            f.push(m[2].replace(o, (y, R, _) => (R ? l(R) : _)));
          else
            throw new Error(
              `Invalid Chalk template style argument: ${g} (in style '${d}')`,
            );
        }
        return f;
      }
      function c(d) {
        n.lastIndex = 0;
        let p = [],
          f;
        for (; (f = n.exec(d)) !== null; ) {
          let h = f[1];
          if (f[2]) {
            let m = u(h, f[2]);
            p.push([h].concat(m));
          } else p.push([h]);
        }
        return p;
      }
      function s(d, p) {
        let f = {};
        for (let m of p)
          for (let g of m.styles) f[g[0]] = m.inverse ? null : g.slice(1);
        let h = d;
        for (let [m, g] of Object.entries(f))
          if (Array.isArray(g)) {
            if (!(m in h)) throw new Error(`Unknown Chalk style: ${m}`);
            h = g.length > 0 ? h[m](...g) : h[m];
          }
        return h;
      }
      t.exports = (d, p) => {
        let f = [],
          h = [],
          m = [];
        if (
          (p.replace(r, (g, b, y, R, _, C) => {
            if (b) m.push(l(b));
            else if (R) {
              let w = m.join("");
              (m = []),
                h.push(f.length === 0 ? w : s(d, f)(w)),
                f.push({ inverse: y, styles: c(R) });
            } else if (_) {
              if (f.length === 0)
                throw new Error("Found extraneous } in Chalk template literal");
              h.push(s(d, f)(m.join(""))), (m = []), f.pop();
            } else m.push(C);
          }),
          h.push(m.join("")),
          f.length > 0)
        ) {
          let g = `Chalk template literal is missing ${f.length} closing bracket${f.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(g);
        }
        return h.join("");
      };
    },
  }),
  qd = T({
    "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/index.js"(
      e,
      t,
    ) {
      var r = rw(),
        { stdout: n, stderr: a } = nw(),
        { stringReplaceAll: o, stringEncaseCRLFWithFirstIndex: i } = aw(),
        l = ["ansi", "ansi", "ansi256", "ansi16m"],
        u = Object.create(null),
        c = (C, w = {}) => {
          if (w.level > 3 || w.level < 0)
            throw new Error(
              "The `level` option should be an integer from 0 to 3",
            );
          let v = n ? n.level : 0;
          C.level = w.level === void 0 ? v : w.level;
        },
        s = class {
          constructor(C) {
            return d(C);
          }
        },
        d = (C) => {
          let w = {};
          return (
            c(w, C),
            (w.template = (...v) => R(w.template, ...v)),
            Object.setPrototypeOf(w, p.prototype),
            Object.setPrototypeOf(w.template, w),
            (w.template.constructor = () => {
              throw new Error(
                "`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.",
              );
            }),
            (w.template.Instance = s),
            w.template
          );
        };
      function p(C) {
        return d(C);
      }
      for (let [C, w] of Object.entries(r))
        u[C] = {
          get() {
            let v = g(this, m(w.open, w.close, this._styler), this._isEmpty);
            return Object.defineProperty(this, C, { value: v }), v;
          },
        };
      u.visible = {
        get() {
          let C = g(this, this._styler, !0);
          return Object.defineProperty(this, "visible", { value: C }), C;
        },
      };
      var f = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
      for (let C of f)
        u[C] = {
          get() {
            let { level: w } = this;
            return function (...v) {
              let E = m(r.color[l[w]][C](...v), r.color.close, this._styler);
              return g(this, E, this._isEmpty);
            };
          },
        };
      for (let C of f) {
        let w = "bg" + C[0].toUpperCase() + C.slice(1);
        u[w] = {
          get() {
            let { level: v } = this;
            return function (...E) {
              let O = m(
                r.bgColor[l[v]][C](...E),
                r.bgColor.close,
                this._styler,
              );
              return g(this, O, this._isEmpty);
            };
          },
        };
      }
      var h = Object.defineProperties(() => {}, {
          ...u,
          level: {
            enumerable: !0,
            get() {
              return this._generator.level;
            },
            set(C) {
              this._generator.level = C;
            },
          },
        }),
        m = (C, w, v) => {
          let E, O;
          return (
            v === void 0
              ? ((E = C), (O = w))
              : ((E = v.openAll + C), (O = w + v.closeAll)),
            { open: C, close: w, openAll: E, closeAll: O, parent: v }
          );
        },
        g = (C, w, v) => {
          let E = (...O) => b(E, O.length === 1 ? "" + O[0] : O.join(" "));
          return (
            (E.__proto__ = h),
            (E._generator = C),
            (E._styler = w),
            (E._isEmpty = v),
            E
          );
        },
        b = (C, w) => {
          if (C.level <= 0 || !w) return C._isEmpty ? "" : w;
          let v = C._styler;
          if (v === void 0) return w;
          let { openAll: E, closeAll: O } = v;
          if (w.indexOf("\x1B") !== -1)
            for (; v !== void 0; ) (w = o(w, v.close, v.open)), (v = v.parent);
          let M = w.indexOf(`
`);
          return M !== -1 && (w = i(w, O, E, M)), E + w + O;
        },
        y,
        R = (C, ...w) => {
          let [v] = w;
          if (!Array.isArray(v)) return w.join(" ");
          let E = w.slice(1),
            O = [v.raw[0]];
          for (let M = 1; M < v.length; M++)
            O.push(
              String(E[M - 1]).replace(/[{}\\]/g, "\\$&"),
              String(v.raw[M]),
            );
          return y === void 0 && (y = ow()), y(C, O.join(""));
        };
      Object.defineProperties(p.prototype, u);
      var _ = p();
      (_.supportsColor = n),
        (_.stderr = p({ level: a ? a.level : 0 })),
        (_.stderr.supportsColor = a),
        (_.Level = {
          None: 0,
          Basic: 1,
          Ansi256: 2,
          TrueColor: 3,
          0: "None",
          1: "Basic",
          2: "Ansi256",
          3: "TrueColor",
        }),
        (t.exports = _);
    },
  }),
  iw = T({
    "../../node_modules/lodash/_listCacheClear.js"(e, t) {
      function r() {
        (this.__data__ = []), (this.size = 0);
      }
      t.exports = r;
    },
  }),
  xd = T({
    "../../node_modules/lodash/eq.js"(e, t) {
      function r(n, a) {
        return n === a || (n !== n && a !== a);
      }
      t.exports = r;
    },
  }),
  la = T({
    "../../node_modules/lodash/_assocIndexOf.js"(e, t) {
      var r = xd();
      function n(a, o) {
        for (var i = a.length; i--; ) if (r(a[i][0], o)) return i;
        return -1;
      }
      t.exports = n;
    },
  }),
  lw = T({
    "../../node_modules/lodash/_listCacheDelete.js"(e, t) {
      var r = la(),
        n = Array.prototype,
        a = n.splice;
      function o(i) {
        var l = this.__data__,
          u = r(l, i);
        if (u < 0) return !1;
        var c = l.length - 1;
        return u == c ? l.pop() : a.call(l, u, 1), --this.size, !0;
      }
      t.exports = o;
    },
  }),
  sw = T({
    "../../node_modules/lodash/_listCacheGet.js"(e, t) {
      var r = la();
      function n(a) {
        var o = this.__data__,
          i = r(o, a);
        return i < 0 ? void 0 : o[i][1];
      }
      t.exports = n;
    },
  }),
  uw = T({
    "../../node_modules/lodash/_listCacheHas.js"(e, t) {
      var r = la();
      function n(a) {
        return r(this.__data__, a) > -1;
      }
      t.exports = n;
    },
  }),
  cw = T({
    "../../node_modules/lodash/_listCacheSet.js"(e, t) {
      var r = la();
      function n(a, o) {
        var i = this.__data__,
          l = r(i, a);
        return l < 0 ? (++this.size, i.push([a, o])) : (i[l][1] = o), this;
      }
      t.exports = n;
    },
  }),
  sa = T({
    "../../node_modules/lodash/_ListCache.js"(e, t) {
      var r = iw(),
        n = lw(),
        a = sw(),
        o = uw(),
        i = cw();
      function l(u) {
        var c = -1,
          s = u == null ? 0 : u.length;
        for (this.clear(); ++c < s; ) {
          var d = u[c];
          this.set(d[0], d[1]);
        }
      }
      (l.prototype.clear = r),
        (l.prototype.delete = n),
        (l.prototype.get = a),
        (l.prototype.has = o),
        (l.prototype.set = i),
        (t.exports = l);
    },
  }),
  dw = T({
    "../../node_modules/lodash/_stackClear.js"(e, t) {
      var r = sa();
      function n() {
        (this.__data__ = new r()), (this.size = 0);
      }
      t.exports = n;
    },
  }),
  fw = T({
    "../../node_modules/lodash/_stackDelete.js"(e, t) {
      function r(n) {
        var a = this.__data__,
          o = a.delete(n);
        return (this.size = a.size), o;
      }
      t.exports = r;
    },
  }),
  pw = T({
    "../../node_modules/lodash/_stackGet.js"(e, t) {
      function r(n) {
        return this.__data__.get(n);
      }
      t.exports = r;
    },
  }),
  hw = T({
    "../../node_modules/lodash/_stackHas.js"(e, t) {
      function r(n) {
        return this.__data__.has(n);
      }
      t.exports = r;
    },
  }),
  Md = T({
    "../../node_modules/lodash/_freeGlobal.js"(e, t) {
      var r =
        typeof global == "object" &&
        global &&
        global.Object === Object &&
        global;
      t.exports = r;
    },
  }),
  vt = T({
    "../../node_modules/lodash/_root.js"(e, t) {
      var r = Md(),
        n = typeof self == "object" && self && self.Object === Object && self,
        a = r || n || Function("return this")();
      t.exports = a;
    },
  }),
  Mi = T({
    "../../node_modules/lodash/_Symbol.js"(e, t) {
      var r = vt(),
        n = r.Symbol;
      t.exports = n;
    },
  }),
  mw = T({
    "../../node_modules/lodash/_getRawTag.js"(e, t) {
      var r = Mi(),
        n = Object.prototype,
        a = n.hasOwnProperty,
        o = n.toString,
        i = r ? r.toStringTag : void 0;
      function l(u) {
        var c = a.call(u, i),
          s = u[i];
        try {
          u[i] = void 0;
          var d = !0;
        } catch {}
        var p = o.call(u);
        return d && (c ? (u[i] = s) : delete u[i]), p;
      }
      t.exports = l;
    },
  }),
  bw = T({
    "../../node_modules/lodash/_objectToString.js"(e, t) {
      var r = Object.prototype,
        n = r.toString;
      function a(o) {
        return n.call(o);
      }
      t.exports = a;
    },
  }),
  ua = T({
    "../../node_modules/lodash/_baseGetTag.js"(e, t) {
      var r = Mi(),
        n = mw(),
        a = bw(),
        o = "[object Null]",
        i = "[object Undefined]",
        l = r ? r.toStringTag : void 0;
      function u(c) {
        return c == null
          ? c === void 0
            ? i
            : o
          : l && l in Object(c)
            ? n(c)
            : a(c);
      }
      t.exports = u;
    },
  }),
  $d = T({
    "../../node_modules/lodash/isObject.js"(e, t) {
      function r(n) {
        var a = typeof n;
        return n != null && (a == "object" || a == "function");
      }
      t.exports = r;
    },
  }),
  Nd = T({
    "../../node_modules/lodash/isFunction.js"(e, t) {
      var r = ua(),
        n = $d(),
        a = "[object AsyncFunction]",
        o = "[object Function]",
        i = "[object GeneratorFunction]",
        l = "[object Proxy]";
      function u(c) {
        if (!n(c)) return !1;
        var s = r(c);
        return s == o || s == i || s == a || s == l;
      }
      t.exports = u;
    },
  }),
  gw = T({
    "../../node_modules/lodash/_coreJsData.js"(e, t) {
      var r = vt(),
        n = r["__core-js_shared__"];
      t.exports = n;
    },
  }),
  yw = T({
    "../../node_modules/lodash/_isMasked.js"(e, t) {
      var r = gw(),
        n = (function () {
          var o = /[^.]+$/.exec((r && r.keys && r.keys.IE_PROTO) || "");
          return o ? "Symbol(src)_1." + o : "";
        })();
      function a(o) {
        return !!n && n in o;
      }
      t.exports = a;
    },
  }),
  jd = T({
    "../../node_modules/lodash/_toSource.js"(e, t) {
      var r = Function.prototype,
        n = r.toString;
      function a(o) {
        if (o != null) {
          try {
            return n.call(o);
          } catch {}
          try {
            return o + "";
          } catch {}
        }
        return "";
      }
      t.exports = a;
    },
  }),
  vw = T({
    "../../node_modules/lodash/_baseIsNative.js"(e, t) {
      var r = Nd(),
        n = yw(),
        a = $d(),
        o = jd(),
        i = /[\\^$.*+?()[\]{}|]/g,
        l = /^\[object .+?Constructor\]$/,
        u = Function.prototype,
        c = Object.prototype,
        s = u.toString,
        d = c.hasOwnProperty,
        p = RegExp(
          "^" +
            s
              .call(d)
              .replace(i, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?",
              ) +
            "$",
        );
      function f(h) {
        if (!a(h) || n(h)) return !1;
        var m = r(h) ? p : l;
        return m.test(o(h));
      }
      t.exports = f;
    },
  }),
  _w = T({
    "../../node_modules/lodash/_getValue.js"(e, t) {
      function r(n, a) {
        return n == null ? void 0 : n[a];
      }
      t.exports = r;
    },
  }),
  Or = T({
    "../../node_modules/lodash/_getNative.js"(e, t) {
      var r = vw(),
        n = _w();
      function a(o, i) {
        var l = n(o, i);
        return r(l) ? l : void 0;
      }
      t.exports = a;
    },
  }),
  $i = T({
    "../../node_modules/lodash/_Map.js"(e, t) {
      var r = Or(),
        n = vt(),
        a = r(n, "Map");
      t.exports = a;
    },
  }),
  ca = T({
    "../../node_modules/lodash/_nativeCreate.js"(e, t) {
      var r = Or(),
        n = r(Object, "create");
      t.exports = n;
    },
  }),
  Ew = T({
    "../../node_modules/lodash/_hashClear.js"(e, t) {
      var r = ca();
      function n() {
        (this.__data__ = r ? r(null) : {}), (this.size = 0);
      }
      t.exports = n;
    },
  }),
  ww = T({
    "../../node_modules/lodash/_hashDelete.js"(e, t) {
      function r(n) {
        var a = this.has(n) && delete this.__data__[n];
        return (this.size -= a ? 1 : 0), a;
      }
      t.exports = r;
    },
  }),
  Cw = T({
    "../../node_modules/lodash/_hashGet.js"(e, t) {
      var r = ca(),
        n = "__lodash_hash_undefined__",
        a = Object.prototype,
        o = a.hasOwnProperty;
      function i(l) {
        var u = this.__data__;
        if (r) {
          var c = u[l];
          return c === n ? void 0 : c;
        }
        return o.call(u, l) ? u[l] : void 0;
      }
      t.exports = i;
    },
  }),
  Rw = T({
    "../../node_modules/lodash/_hashHas.js"(e, t) {
      var r = ca(),
        n = Object.prototype,
        a = n.hasOwnProperty;
      function o(i) {
        var l = this.__data__;
        return r ? l[i] !== void 0 : a.call(l, i);
      }
      t.exports = o;
    },
  }),
  Tw = T({
    "../../node_modules/lodash/_hashSet.js"(e, t) {
      var r = ca(),
        n = "__lodash_hash_undefined__";
      function a(o, i) {
        var l = this.__data__;
        return (
          (this.size += this.has(o) ? 0 : 1),
          (l[o] = r && i === void 0 ? n : i),
          this
        );
      }
      t.exports = a;
    },
  }),
  Sw = T({
    "../../node_modules/lodash/_Hash.js"(e, t) {
      var r = Ew(),
        n = ww(),
        a = Cw(),
        o = Rw(),
        i = Tw();
      function l(u) {
        var c = -1,
          s = u == null ? 0 : u.length;
        for (this.clear(); ++c < s; ) {
          var d = u[c];
          this.set(d[0], d[1]);
        }
      }
      (l.prototype.clear = r),
        (l.prototype.delete = n),
        (l.prototype.get = a),
        (l.prototype.has = o),
        (l.prototype.set = i),
        (t.exports = l);
    },
  }),
  Pw = T({
    "../../node_modules/lodash/_mapCacheClear.js"(e, t) {
      var r = Sw(),
        n = sa(),
        a = $i();
      function o() {
        (this.size = 0),
          (this.__data__ = {
            hash: new r(),
            map: new (a || n)(),
            string: new r(),
          });
      }
      t.exports = o;
    },
  }),
  Ow = T({
    "../../node_modules/lodash/_isKeyable.js"(e, t) {
      function r(n) {
        var a = typeof n;
        return a == "string" || a == "number" || a == "symbol" || a == "boolean"
          ? n !== "__proto__"
          : n === null;
      }
      t.exports = r;
    },
  }),
  da = T({
    "../../node_modules/lodash/_getMapData.js"(e, t) {
      var r = Ow();
      function n(a, o) {
        var i = a.__data__;
        return r(o) ? i[typeof o == "string" ? "string" : "hash"] : i.map;
      }
      t.exports = n;
    },
  }),
  Aw = T({
    "../../node_modules/lodash/_mapCacheDelete.js"(e, t) {
      var r = da();
      function n(a) {
        var o = r(this, a).delete(a);
        return (this.size -= o ? 1 : 0), o;
      }
      t.exports = n;
    },
  }),
  qw = T({
    "../../node_modules/lodash/_mapCacheGet.js"(e, t) {
      var r = da();
      function n(a) {
        return r(this, a).get(a);
      }
      t.exports = n;
    },
  }),
  xw = T({
    "../../node_modules/lodash/_mapCacheHas.js"(e, t) {
      var r = da();
      function n(a) {
        return r(this, a).has(a);
      }
      t.exports = n;
    },
  }),
  Mw = T({
    "../../node_modules/lodash/_mapCacheSet.js"(e, t) {
      var r = da();
      function n(a, o) {
        var i = r(this, a),
          l = i.size;
        return i.set(a, o), (this.size += i.size == l ? 0 : 1), this;
      }
      t.exports = n;
    },
  }),
  Id = T({
    "../../node_modules/lodash/_MapCache.js"(e, t) {
      var r = Pw(),
        n = Aw(),
        a = qw(),
        o = xw(),
        i = Mw();
      function l(u) {
        var c = -1,
          s = u == null ? 0 : u.length;
        for (this.clear(); ++c < s; ) {
          var d = u[c];
          this.set(d[0], d[1]);
        }
      }
      (l.prototype.clear = r),
        (l.prototype.delete = n),
        (l.prototype.get = a),
        (l.prototype.has = o),
        (l.prototype.set = i),
        (t.exports = l);
    },
  }),
  $w = T({
    "../../node_modules/lodash/_stackSet.js"(e, t) {
      var r = sa(),
        n = $i(),
        a = Id(),
        o = 200;
      function i(l, u) {
        var c = this.__data__;
        if (c instanceof r) {
          var s = c.__data__;
          if (!n || s.length < o - 1)
            return s.push([l, u]), (this.size = ++c.size), this;
          c = this.__data__ = new a(s);
        }
        return c.set(l, u), (this.size = c.size), this;
      }
      t.exports = i;
    },
  }),
  Nw = T({
    "../../node_modules/lodash/_Stack.js"(e, t) {
      var r = sa(),
        n = dw(),
        a = fw(),
        o = pw(),
        i = hw(),
        l = $w();
      function u(c) {
        var s = (this.__data__ = new r(c));
        this.size = s.size;
      }
      (u.prototype.clear = n),
        (u.prototype.delete = a),
        (u.prototype.get = o),
        (u.prototype.has = i),
        (u.prototype.set = l),
        (t.exports = u);
    },
  }),
  jw = T({
    "../../node_modules/lodash/_setCacheAdd.js"(e, t) {
      var r = "__lodash_hash_undefined__";
      function n(a) {
        return this.__data__.set(a, r), this;
      }
      t.exports = n;
    },
  }),
  Iw = T({
    "../../node_modules/lodash/_setCacheHas.js"(e, t) {
      function r(n) {
        return this.__data__.has(n);
      }
      t.exports = r;
    },
  }),
  Lw = T({
    "../../node_modules/lodash/_SetCache.js"(e, t) {
      var r = Id(),
        n = jw(),
        a = Iw();
      function o(i) {
        var l = -1,
          u = i == null ? 0 : i.length;
        for (this.__data__ = new r(); ++l < u; ) this.add(i[l]);
      }
      (o.prototype.add = o.prototype.push = n),
        (o.prototype.has = a),
        (t.exports = o);
    },
  }),
  Bw = T({
    "../../node_modules/lodash/_arraySome.js"(e, t) {
      function r(n, a) {
        for (var o = -1, i = n == null ? 0 : n.length; ++o < i; )
          if (a(n[o], o, n)) return !0;
        return !1;
      }
      t.exports = r;
    },
  }),
  kw = T({
    "../../node_modules/lodash/_cacheHas.js"(e, t) {
      function r(n, a) {
        return n.has(a);
      }
      t.exports = r;
    },
  }),
  Ld = T({
    "../../node_modules/lodash/_equalArrays.js"(e, t) {
      var r = Lw(),
        n = Bw(),
        a = kw(),
        o = 1,
        i = 2;
      function l(u, c, s, d, p, f) {
        var h = s & o,
          m = u.length,
          g = c.length;
        if (m != g && !(h && g > m)) return !1;
        var b = f.get(u),
          y = f.get(c);
        if (b && y) return b == c && y == u;
        var R = -1,
          _ = !0,
          C = s & i ? new r() : void 0;
        for (f.set(u, c), f.set(c, u); ++R < m; ) {
          var w = u[R],
            v = c[R];
          if (d) var E = h ? d(v, w, R, c, u, f) : d(w, v, R, u, c, f);
          if (E !== void 0) {
            if (E) continue;
            _ = !1;
            break;
          }
          if (C) {
            if (
              !n(c, function (O, M) {
                if (!a(C, M) && (w === O || p(w, O, s, d, f))) return C.push(M);
              })
            ) {
              _ = !1;
              break;
            }
          } else if (!(w === v || p(w, v, s, d, f))) {
            _ = !1;
            break;
          }
        }
        return f.delete(u), f.delete(c), _;
      }
      t.exports = l;
    },
  }),
  Dw = T({
    "../../node_modules/lodash/_Uint8Array.js"(e, t) {
      var r = vt(),
        n = r.Uint8Array;
      t.exports = n;
    },
  }),
  Fw = T({
    "../../node_modules/lodash/_mapToArray.js"(e, t) {
      function r(n) {
        var a = -1,
          o = Array(n.size);
        return (
          n.forEach(function (i, l) {
            o[++a] = [l, i];
          }),
          o
        );
      }
      t.exports = r;
    },
  }),
  Uw = T({
    "../../node_modules/lodash/_setToArray.js"(e, t) {
      function r(n) {
        var a = -1,
          o = Array(n.size);
        return (
          n.forEach(function (i) {
            o[++a] = i;
          }),
          o
        );
      }
      t.exports = r;
    },
  }),
  Hw = T({
    "../../node_modules/lodash/_equalByTag.js"(e, t) {
      var r = Mi(),
        n = Dw(),
        a = xd(),
        o = Ld(),
        i = Fw(),
        l = Uw(),
        u = 1,
        c = 2,
        s = "[object Boolean]",
        d = "[object Date]",
        p = "[object Error]",
        f = "[object Map]",
        h = "[object Number]",
        m = "[object RegExp]",
        g = "[object Set]",
        b = "[object String]",
        y = "[object Symbol]",
        R = "[object ArrayBuffer]",
        _ = "[object DataView]",
        C = r ? r.prototype : void 0,
        w = C ? C.valueOf : void 0;
      function v(E, O, M, N, k, j, I) {
        switch (M) {
          case _:
            if (E.byteLength != O.byteLength || E.byteOffset != O.byteOffset)
              return !1;
            (E = E.buffer), (O = O.buffer);
          case R:
            return !(E.byteLength != O.byteLength || !j(new n(E), new n(O)));
          case s:
          case d:
          case h:
            return a(+E, +O);
          case p:
            return E.name == O.name && E.message == O.message;
          case m:
          case b:
            return E == O + "";
          case f:
            var B = i;
          case g:
            var z = N & u;
            if ((B || (B = l), E.size != O.size && !z)) return !1;
            var K = I.get(E);
            if (K) return K == O;
            (N |= c), I.set(E, O);
            var W = o(B(E), B(O), N, k, j, I);
            return I.delete(E), W;
          case y:
            if (w) return w.call(E) == w.call(O);
        }
        return !1;
      }
      t.exports = v;
    },
  }),
  zw = T({
    "../../node_modules/lodash/_arrayPush.js"(e, t) {
      function r(n, a) {
        for (var o = -1, i = a.length, l = n.length; ++o < i; ) n[l + o] = a[o];
        return n;
      }
      t.exports = r;
    },
  }),
  Ni = T({
    "../../node_modules/lodash/isArray.js"(e, t) {
      var r = Array.isArray;
      t.exports = r;
    },
  }),
  Vw = T({
    "../../node_modules/lodash/_baseGetAllKeys.js"(e, t) {
      var r = zw(),
        n = Ni();
      function a(o, i, l) {
        var u = i(o);
        return n(o) ? u : r(u, l(o));
      }
      t.exports = a;
    },
  }),
  Gw = T({
    "../../node_modules/lodash/_arrayFilter.js"(e, t) {
      function r(n, a) {
        for (
          var o = -1, i = n == null ? 0 : n.length, l = 0, u = [];
          ++o < i;

        ) {
          var c = n[o];
          a(c, o, n) && (u[l++] = c);
        }
        return u;
      }
      t.exports = r;
    },
  }),
  Ww = T({
    "../../node_modules/lodash/stubArray.js"(e, t) {
      function r() {
        return [];
      }
      t.exports = r;
    },
  }),
  Kw = T({
    "../../node_modules/lodash/_getSymbols.js"(e, t) {
      var r = Gw(),
        n = Ww(),
        a = Object.prototype,
        o = a.propertyIsEnumerable,
        i = Object.getOwnPropertySymbols,
        l = i
          ? function (u) {
              return u == null
                ? []
                : ((u = Object(u)),
                  r(i(u), function (c) {
                    return o.call(u, c);
                  }));
            }
          : n;
      t.exports = l;
    },
  }),
  Yw = T({
    "../../node_modules/lodash/_baseTimes.js"(e, t) {
      function r(n, a) {
        for (var o = -1, i = Array(n); ++o < n; ) i[o] = a(o);
        return i;
      }
      t.exports = r;
    },
  }),
  fa = T({
    "../../node_modules/lodash/isObjectLike.js"(e, t) {
      function r(n) {
        return n != null && typeof n == "object";
      }
      t.exports = r;
    },
  }),
  Jw = T({
    "../../node_modules/lodash/_baseIsArguments.js"(e, t) {
      var r = ua(),
        n = fa(),
        a = "[object Arguments]";
      function o(i) {
        return n(i) && r(i) == a;
      }
      t.exports = o;
    },
  }),
  Xw = T({
    "../../node_modules/lodash/isArguments.js"(e, t) {
      var r = Jw(),
        n = fa(),
        a = Object.prototype,
        o = a.hasOwnProperty,
        i = a.propertyIsEnumerable,
        l = r(
          (function () {
            return arguments;
          })(),
        )
          ? r
          : function (u) {
              return n(u) && o.call(u, "callee") && !i.call(u, "callee");
            };
      t.exports = l;
    },
  }),
  Qw = T({
    "../../node_modules/lodash/stubFalse.js"(e, t) {
      function r() {
        return !1;
      }
      t.exports = r;
    },
  }),
  Bd = T({
    "../../node_modules/lodash/isBuffer.js"(e, t) {
      var r = vt(),
        n = Qw(),
        a = typeof e == "object" && e && !e.nodeType && e,
        o = a && typeof t == "object" && t && !t.nodeType && t,
        i = o && o.exports === a,
        l = i ? r.Buffer : void 0,
        u = l ? l.isBuffer : void 0,
        c = u || n;
      t.exports = c;
    },
  }),
  Zw = T({
    "../../node_modules/lodash/_isIndex.js"(e, t) {
      var r = 9007199254740991,
        n = /^(?:0|[1-9]\d*)$/;
      function a(o, i) {
        var l = typeof o;
        return (
          (i = i ?? r),
          !!i &&
            (l == "number" || (l != "symbol" && n.test(o))) &&
            o > -1 &&
            o % 1 == 0 &&
            o < i
        );
      }
      t.exports = a;
    },
  }),
  kd = T({
    "../../node_modules/lodash/isLength.js"(e, t) {
      var r = 9007199254740991;
      function n(a) {
        return typeof a == "number" && a > -1 && a % 1 == 0 && a <= r;
      }
      t.exports = n;
    },
  }),
  e1 = T({
    "../../node_modules/lodash/_baseIsTypedArray.js"(e, t) {
      var r = ua(),
        n = kd(),
        a = fa(),
        o = "[object Arguments]",
        i = "[object Array]",
        l = "[object Boolean]",
        u = "[object Date]",
        c = "[object Error]",
        s = "[object Function]",
        d = "[object Map]",
        p = "[object Number]",
        f = "[object Object]",
        h = "[object RegExp]",
        m = "[object Set]",
        g = "[object String]",
        b = "[object WeakMap]",
        y = "[object ArrayBuffer]",
        R = "[object DataView]",
        _ = "[object Float32Array]",
        C = "[object Float64Array]",
        w = "[object Int8Array]",
        v = "[object Int16Array]",
        E = "[object Int32Array]",
        O = "[object Uint8Array]",
        M = "[object Uint8ClampedArray]",
        N = "[object Uint16Array]",
        k = "[object Uint32Array]",
        j = {};
      (j[_] = j[C] = j[w] = j[v] = j[E] = j[O] = j[M] = j[N] = j[k] = !0),
        (j[o] =
          j[i] =
          j[y] =
          j[l] =
          j[R] =
          j[u] =
          j[c] =
          j[s] =
          j[d] =
          j[p] =
          j[f] =
          j[h] =
          j[m] =
          j[g] =
          j[b] =
            !1);
      function I(B) {
        return a(B) && n(B.length) && !!j[r(B)];
      }
      t.exports = I;
    },
  }),
  t1 = T({
    "../../node_modules/lodash/_baseUnary.js"(e, t) {
      function r(n) {
        return function (a) {
          return n(a);
        };
      }
      t.exports = r;
    },
  }),
  r1 = T({
    "../../node_modules/lodash/_nodeUtil.js"(e, t) {
      var r = Md(),
        n = typeof e == "object" && e && !e.nodeType && e,
        a = n && typeof t == "object" && t && !t.nodeType && t,
        o = a && a.exports === n,
        i = o && r.process,
        l = (function () {
          try {
            var u = a && a.require && a.require("util").types;
            return u || (i && i.binding && i.binding("util"));
          } catch {}
        })();
      t.exports = l;
    },
  }),
  Dd = T({
    "../../node_modules/lodash/isTypedArray.js"(e, t) {
      var r = e1(),
        n = t1(),
        a = r1(),
        o = a && a.isTypedArray,
        i = o ? n(o) : r;
      t.exports = i;
    },
  }),
  n1 = T({
    "../../node_modules/lodash/_arrayLikeKeys.js"(e, t) {
      var r = Yw(),
        n = Xw(),
        a = Ni(),
        o = Bd(),
        i = Zw(),
        l = Dd(),
        u = Object.prototype,
        c = u.hasOwnProperty;
      function s(d, p) {
        var f = a(d),
          h = !f && n(d),
          m = !f && !h && o(d),
          g = !f && !h && !m && l(d),
          b = f || h || m || g,
          y = b ? r(d.length, String) : [],
          R = y.length;
        for (var _ in d)
          (p || c.call(d, _)) &&
            !(
              b &&
              (_ == "length" ||
                (m && (_ == "offset" || _ == "parent")) ||
                (g &&
                  (_ == "buffer" || _ == "byteLength" || _ == "byteOffset")) ||
                i(_, R))
            ) &&
            y.push(_);
        return y;
      }
      t.exports = s;
    },
  }),
  a1 = T({
    "../../node_modules/lodash/_isPrototype.js"(e, t) {
      var r = Object.prototype;
      function n(a) {
        var o = a && a.constructor,
          i = (typeof o == "function" && o.prototype) || r;
        return a === i;
      }
      t.exports = n;
    },
  }),
  o1 = T({
    "../../node_modules/lodash/_overArg.js"(e, t) {
      function r(n, a) {
        return function (o) {
          return n(a(o));
        };
      }
      t.exports = r;
    },
  }),
  i1 = T({
    "../../node_modules/lodash/_nativeKeys.js"(e, t) {
      var r = o1(),
        n = r(Object.keys, Object);
      t.exports = n;
    },
  }),
  l1 = T({
    "../../node_modules/lodash/_baseKeys.js"(e, t) {
      var r = a1(),
        n = i1(),
        a = Object.prototype,
        o = a.hasOwnProperty;
      function i(l) {
        if (!r(l)) return n(l);
        var u = [];
        for (var c in Object(l))
          o.call(l, c) && c != "constructor" && u.push(c);
        return u;
      }
      t.exports = i;
    },
  }),
  s1 = T({
    "../../node_modules/lodash/isArrayLike.js"(e, t) {
      var r = Nd(),
        n = kd();
      function a(o) {
        return o != null && n(o.length) && !r(o);
      }
      t.exports = a;
    },
  }),
  u1 = T({
    "../../node_modules/lodash/keys.js"(e, t) {
      var r = n1(),
        n = l1(),
        a = s1();
      function o(i) {
        return a(i) ? r(i) : n(i);
      }
      t.exports = o;
    },
  }),
  c1 = T({
    "../../node_modules/lodash/_getAllKeys.js"(e, t) {
      var r = Vw(),
        n = Kw(),
        a = u1();
      function o(i) {
        return r(i, a, n);
      }
      t.exports = o;
    },
  }),
  d1 = T({
    "../../node_modules/lodash/_equalObjects.js"(e, t) {
      var r = c1(),
        n = 1,
        a = Object.prototype,
        o = a.hasOwnProperty;
      function i(l, u, c, s, d, p) {
        var f = c & n,
          h = r(l),
          m = h.length,
          g = r(u),
          b = g.length;
        if (m != b && !f) return !1;
        for (var y = m; y--; ) {
          var R = h[y];
          if (!(f ? R in u : o.call(u, R))) return !1;
        }
        var _ = p.get(l),
          C = p.get(u);
        if (_ && C) return _ == u && C == l;
        var w = !0;
        p.set(l, u), p.set(u, l);
        for (var v = f; ++y < m; ) {
          R = h[y];
          var E = l[R],
            O = u[R];
          if (s) var M = f ? s(O, E, R, u, l, p) : s(E, O, R, l, u, p);
          if (!(M === void 0 ? E === O || d(E, O, c, s, p) : M)) {
            w = !1;
            break;
          }
          v || (v = R == "constructor");
        }
        if (w && !v) {
          var N = l.constructor,
            k = u.constructor;
          N != k &&
            "constructor" in l &&
            "constructor" in u &&
            !(
              typeof N == "function" &&
              N instanceof N &&
              typeof k == "function" &&
              k instanceof k
            ) &&
            (w = !1);
        }
        return p.delete(l), p.delete(u), w;
      }
      t.exports = i;
    },
  }),
  f1 = T({
    "../../node_modules/lodash/_DataView.js"(e, t) {
      var r = Or(),
        n = vt(),
        a = r(n, "DataView");
      t.exports = a;
    },
  }),
  p1 = T({
    "../../node_modules/lodash/_Promise.js"(e, t) {
      var r = Or(),
        n = vt(),
        a = r(n, "Promise");
      t.exports = a;
    },
  }),
  h1 = T({
    "../../node_modules/lodash/_Set.js"(e, t) {
      var r = Or(),
        n = vt(),
        a = r(n, "Set");
      t.exports = a;
    },
  }),
  m1 = T({
    "../../node_modules/lodash/_WeakMap.js"(e, t) {
      var r = Or(),
        n = vt(),
        a = r(n, "WeakMap");
      t.exports = a;
    },
  }),
  b1 = T({
    "../../node_modules/lodash/_getTag.js"(e, t) {
      var r = f1(),
        n = $i(),
        a = p1(),
        o = h1(),
        i = m1(),
        l = ua(),
        u = jd(),
        c = "[object Map]",
        s = "[object Object]",
        d = "[object Promise]",
        p = "[object Set]",
        f = "[object WeakMap]",
        h = "[object DataView]",
        m = u(r),
        g = u(n),
        b = u(a),
        y = u(o),
        R = u(i),
        _ = l;
      ((r && _(new r(new ArrayBuffer(1))) != h) ||
        (n && _(new n()) != c) ||
        (a && _(a.resolve()) != d) ||
        (o && _(new o()) != p) ||
        (i && _(new i()) != f)) &&
        (_ = function (C) {
          var w = l(C),
            v = w == s ? C.constructor : void 0,
            E = v ? u(v) : "";
          if (E)
            switch (E) {
              case m:
                return h;
              case g:
                return c;
              case b:
                return d;
              case y:
                return p;
              case R:
                return f;
            }
          return w;
        }),
        (t.exports = _);
    },
  }),
  g1 = T({
    "../../node_modules/lodash/_baseIsEqualDeep.js"(e, t) {
      var r = Nw(),
        n = Ld(),
        a = Hw(),
        o = d1(),
        i = b1(),
        l = Ni(),
        u = Bd(),
        c = Dd(),
        s = 1,
        d = "[object Arguments]",
        p = "[object Array]",
        f = "[object Object]",
        h = Object.prototype,
        m = h.hasOwnProperty;
      function g(b, y, R, _, C, w) {
        var v = l(b),
          E = l(y),
          O = v ? p : i(b),
          M = E ? p : i(y);
        (O = O == d ? f : O), (M = M == d ? f : M);
        var N = O == f,
          k = M == f,
          j = O == M;
        if (j && u(b)) {
          if (!u(y)) return !1;
          (v = !0), (N = !1);
        }
        if (j && !N)
          return (
            w || (w = new r()),
            v || c(b) ? n(b, y, R, _, C, w) : a(b, y, O, R, _, C, w)
          );
        if (!(R & s)) {
          var I = N && m.call(b, "__wrapped__"),
            B = k && m.call(y, "__wrapped__");
          if (I || B) {
            var z = I ? b.value() : b,
              K = B ? y.value() : y;
            return w || (w = new r()), C(z, K, R, _, w);
          }
        }
        return j ? (w || (w = new r()), o(b, y, R, _, C, w)) : !1;
      }
      t.exports = g;
    },
  }),
  y1 = T({
    "../../node_modules/lodash/_baseIsEqual.js"(e, t) {
      var r = g1(),
        n = fa();
      function a(o, i, l, u, c) {
        return o === i
          ? !0
          : o == null || i == null || (!n(o) && !n(i))
            ? o !== o && i !== i
            : r(o, i, l, u, a, c);
      }
      t.exports = a;
    },
  }),
  Fd = T({
    "../../node_modules/lodash/isEqualWith.js"(e, t) {
      var r = y1();
      function n(a, o, i) {
        i = typeof i == "function" ? i : void 0;
        var l = i ? i(a, o) : void 0;
        return l === void 0 ? r(a, o, void 0, i) : !!l;
      }
      t.exports = n;
    },
  }),
  Ud = T({
    "../../node_modules/css.escape/css.escape.js"(e, t) {
      (function (r, n) {
        typeof e == "object"
          ? (t.exports = n(r))
          : typeof define == "function" && define.amd
            ? define([], n.bind(r, r))
            : n(r);
      })(typeof global < "u" ? global : e, function (r) {
        if (r.CSS && r.CSS.escape) return r.CSS.escape;
        var n = function (a) {
          if (arguments.length == 0)
            throw new TypeError("`CSS.escape` requires an argument.");
          for (
            var o = String(a),
              i = o.length,
              l = -1,
              u,
              c = "",
              s = o.charCodeAt(0);
            ++l < i;

          ) {
            if (((u = o.charCodeAt(l)), u == 0)) {
              c += "�";
              continue;
            }
            if (
              (u >= 1 && u <= 31) ||
              u == 127 ||
              (l == 0 && u >= 48 && u <= 57) ||
              (l == 1 && u >= 48 && u <= 57 && s == 45)
            ) {
              c += "\\" + u.toString(16) + " ";
              continue;
            }
            if (l == 0 && i == 1 && u == 45) {
              c += "\\" + o.charAt(l);
              continue;
            }
            if (
              u >= 128 ||
              u == 45 ||
              u == 95 ||
              (u >= 48 && u <= 57) ||
              (u >= 65 && u <= 90) ||
              (u >= 97 && u <= 122)
            ) {
              c += o.charAt(l);
              continue;
            }
            c += "\\" + o.charAt(l);
          }
          return c;
        };
        return r.CSS || (r.CSS = {}), (r.CSS.escape = n), n;
      });
    },
  }),
  Hd = T({
    "../../node_modules/pretty-format/node_modules/ansi-styles/index.js"(e, t) {
      var r =
          (o = 0) =>
          (i) =>
            `\x1B[${38 + o};5;${i}m`,
        n =
          (o = 0) =>
          (i, l, u) =>
            `\x1B[${38 + o};2;${i};${l};${u}m`;
      function a() {
        let o = new Map(),
          i = {
            modifier: {
              reset: [0, 0],
              bold: [1, 22],
              dim: [2, 22],
              italic: [3, 23],
              underline: [4, 24],
              overline: [53, 55],
              inverse: [7, 27],
              hidden: [8, 28],
              strikethrough: [9, 29],
            },
            color: {
              black: [30, 39],
              red: [31, 39],
              green: [32, 39],
              yellow: [33, 39],
              blue: [34, 39],
              magenta: [35, 39],
              cyan: [36, 39],
              white: [37, 39],
              blackBright: [90, 39],
              redBright: [91, 39],
              greenBright: [92, 39],
              yellowBright: [93, 39],
              blueBright: [94, 39],
              magentaBright: [95, 39],
              cyanBright: [96, 39],
              whiteBright: [97, 39],
            },
            bgColor: {
              bgBlack: [40, 49],
              bgRed: [41, 49],
              bgGreen: [42, 49],
              bgYellow: [43, 49],
              bgBlue: [44, 49],
              bgMagenta: [45, 49],
              bgCyan: [46, 49],
              bgWhite: [47, 49],
              bgBlackBright: [100, 49],
              bgRedBright: [101, 49],
              bgGreenBright: [102, 49],
              bgYellowBright: [103, 49],
              bgBlueBright: [104, 49],
              bgMagentaBright: [105, 49],
              bgCyanBright: [106, 49],
              bgWhiteBright: [107, 49],
            },
          };
        (i.color.gray = i.color.blackBright),
          (i.bgColor.bgGray = i.bgColor.bgBlackBright),
          (i.color.grey = i.color.blackBright),
          (i.bgColor.bgGrey = i.bgColor.bgBlackBright);
        for (let [l, u] of Object.entries(i)) {
          for (let [c, s] of Object.entries(u))
            (i[c] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }),
              (u[c] = i[c]),
              o.set(s[0], s[1]);
          Object.defineProperty(i, l, { value: u, enumerable: !1 });
        }
        return (
          Object.defineProperty(i, "codes", { value: o, enumerable: !1 }),
          (i.color.close = "\x1B[39m"),
          (i.bgColor.close = "\x1B[49m"),
          (i.color.ansi256 = r()),
          (i.color.ansi16m = n()),
          (i.bgColor.ansi256 = r(10)),
          (i.bgColor.ansi16m = n(10)),
          Object.defineProperties(i, {
            rgbToAnsi256: {
              value: (l, u, c) =>
                l === u && u === c
                  ? l < 8
                    ? 16
                    : l > 248
                      ? 231
                      : Math.round(((l - 8) / 247) * 24) + 232
                  : 16 +
                    36 * Math.round((l / 255) * 5) +
                    6 * Math.round((u / 255) * 5) +
                    Math.round((c / 255) * 5),
              enumerable: !1,
            },
            hexToRgb: {
              value: (l) => {
                let u = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(
                  l.toString(16),
                );
                if (!u) return [0, 0, 0];
                let { colorString: c } = u.groups;
                c.length === 3 &&
                  (c = c
                    .split("")
                    .map((d) => d + d)
                    .join(""));
                let s = Number.parseInt(c, 16);
                return [(s >> 16) & 255, (s >> 8) & 255, s & 255];
              },
              enumerable: !1,
            },
            hexToAnsi256: {
              value: (l) => i.rgbToAnsi256(...i.hexToRgb(l)),
              enumerable: !1,
            },
          }),
          i
        );
      }
      Object.defineProperty(t, "exports", { enumerable: !0, get: a });
    },
  }),
  pa = T({
    "../../node_modules/pretty-format/build/collections.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.printIteratorEntries = r),
        (e.printIteratorValues = n),
        (e.printListItems = a),
        (e.printObjectProperties = o);
      var t = (i, l) => {
        let u = Object.keys(i).sort(l);
        return (
          Object.getOwnPropertySymbols &&
            Object.getOwnPropertySymbols(i).forEach((c) => {
              Object.getOwnPropertyDescriptor(i, c).enumerable && u.push(c);
            }),
          u
        );
      };
      function r(i, l, u, c, s, d, p = ": ") {
        let f = "",
          h = i.next();
        if (!h.done) {
          f += l.spacingOuter;
          let m = u + l.indent;
          for (; !h.done; ) {
            let g = d(h.value[0], l, m, c, s),
              b = d(h.value[1], l, m, c, s);
            (f += m + g + p + b),
              (h = i.next()),
              h.done ? l.min || (f += ",") : (f += "," + l.spacingInner);
          }
          f += l.spacingOuter + u;
        }
        return f;
      }
      function n(i, l, u, c, s, d) {
        let p = "",
          f = i.next();
        if (!f.done) {
          p += l.spacingOuter;
          let h = u + l.indent;
          for (; !f.done; )
            (p += h + d(f.value, l, h, c, s)),
              (f = i.next()),
              f.done ? l.min || (p += ",") : (p += "," + l.spacingInner);
          p += l.spacingOuter + u;
        }
        return p;
      }
      function a(i, l, u, c, s, d) {
        let p = "";
        if (i.length) {
          p += l.spacingOuter;
          let f = u + l.indent;
          for (let h = 0; h < i.length; h++)
            (p += f),
              h in i && (p += d(i[h], l, f, c, s)),
              h < i.length - 1
                ? (p += "," + l.spacingInner)
                : l.min || (p += ",");
          p += l.spacingOuter + u;
        }
        return p;
      }
      function o(i, l, u, c, s, d) {
        let p = "",
          f = t(i, l.compareKeys);
        if (f.length) {
          p += l.spacingOuter;
          let h = u + l.indent;
          for (let m = 0; m < f.length; m++) {
            let g = f[m],
              b = d(g, l, h, c, s),
              y = d(i[g], l, h, c, s);
            (p += h + b + ": " + y),
              m < f.length - 1
                ? (p += "," + l.spacingInner)
                : l.min || (p += ",");
          }
          p += l.spacingOuter + u;
        }
        return p;
      }
    },
  }),
  v1 = T({
    "../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = pa(),
        r = (function () {
          return typeof globalThis < "u"
            ? globalThis
            : typeof r < "u"
              ? r
              : typeof self < "u"
                ? self
                : typeof window < "u"
                  ? window
                  : Function("return this")();
        })(),
        n = r["jest-symbol-do-not-touch"] || r.Symbol,
        a =
          typeof n == "function" && n.for
            ? n.for("jest.asymmetricMatcher")
            : 1267621,
        o = " ",
        i = (s, d, p, f, h, m) => {
          let g = s.toString();
          return g === "ArrayContaining" || g === "ArrayNotContaining"
            ? ++f > d.maxDepth
              ? "[" + g + "]"
              : g +
                o +
                "[" +
                (0, t.printListItems)(s.sample, d, p, f, h, m) +
                "]"
            : g === "ObjectContaining" || g === "ObjectNotContaining"
              ? ++f > d.maxDepth
                ? "[" + g + "]"
                : g +
                  o +
                  "{" +
                  (0, t.printObjectProperties)(s.sample, d, p, f, h, m) +
                  "}"
              : g === "StringMatching" ||
                  g === "StringNotMatching" ||
                  g === "StringContaining" ||
                  g === "StringNotContaining"
                ? g + o + m(s.sample, d, p, f, h)
                : s.toAsymmetricMatcher();
        };
      e.serialize = i;
      var l = (s) => s && s.$$typeof === a;
      e.test = l;
      var u = { serialize: i, test: l },
        c = u;
      e.default = c;
    },
  }),
  _1 = T({
    "../../node_modules/pretty-format/node_modules/ansi-regex/index.js"(e, t) {
      t.exports = ({ onlyFirst: r = !1 } = {}) => {
        let n = [
          "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
          "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
        ].join("|");
        return new RegExp(n, r ? void 0 : "g");
      };
    },
  }),
  E1 = T({
    "../../node_modules/pretty-format/build/plugins/ConvertAnsi.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = n(_1()),
        r = n(Hd());
      function n(c) {
        return c && c.__esModule ? c : { default: c };
      }
      var a = (c) =>
          c.replace((0, t.default)(), (s) => {
            switch (s) {
              case r.default.red.close:
              case r.default.green.close:
              case r.default.cyan.close:
              case r.default.gray.close:
              case r.default.white.close:
              case r.default.yellow.close:
              case r.default.bgRed.close:
              case r.default.bgGreen.close:
              case r.default.bgYellow.close:
              case r.default.inverse.close:
              case r.default.dim.close:
              case r.default.bold.close:
              case r.default.reset.open:
              case r.default.reset.close:
                return "</>";
              case r.default.red.open:
                return "<red>";
              case r.default.green.open:
                return "<green>";
              case r.default.cyan.open:
                return "<cyan>";
              case r.default.gray.open:
                return "<gray>";
              case r.default.white.open:
                return "<white>";
              case r.default.yellow.open:
                return "<yellow>";
              case r.default.bgRed.open:
                return "<bgRed>";
              case r.default.bgGreen.open:
                return "<bgGreen>";
              case r.default.bgYellow.open:
                return "<bgYellow>";
              case r.default.inverse.open:
                return "<inverse>";
              case r.default.dim.open:
                return "<dim>";
              case r.default.bold.open:
                return "<bold>";
              default:
                return "";
            }
          }),
        o = (c) => typeof c == "string" && !!c.match((0, t.default)());
      e.test = o;
      var i = (c, s, d, p, f, h) => h(a(c), s, d, p, f);
      e.serialize = i;
      var l = { serialize: i, test: o },
        u = l;
      e.default = u;
    },
  }),
  w1 = T({
    "../../node_modules/pretty-format/build/plugins/DOMCollection.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = pa(),
        r = " ",
        n = ["DOMStringMap", "NamedNodeMap"],
        a = /^(HTML\w*Collection|NodeList)$/,
        o = (d) => n.indexOf(d) !== -1 || a.test(d),
        i = (d) =>
          d && d.constructor && !!d.constructor.name && o(d.constructor.name);
      e.test = i;
      var l = (d) => d.constructor.name === "NamedNodeMap",
        u = (d, p, f, h, m, g) => {
          let b = d.constructor.name;
          return ++h > p.maxDepth
            ? "[" + b + "]"
            : (p.min ? "" : b + r) +
                (n.indexOf(b) !== -1
                  ? "{" +
                    (0, t.printObjectProperties)(
                      l(d)
                        ? Array.from(d).reduce(
                            (y, R) => ((y[R.name] = R.value), y),
                            {},
                          )
                        : { ...d },
                      p,
                      f,
                      h,
                      m,
                      g,
                    ) +
                    "}"
                  : "[" +
                    (0, t.printListItems)(Array.from(d), p, f, h, m, g) +
                    "]");
        };
      e.serialize = u;
      var c = { serialize: u, test: i },
        s = c;
      e.default = s;
    },
  }),
  C1 = T({
    "../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = t);
      function t(r) {
        return r.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
    },
  }),
  ji = T({
    "../../node_modules/pretty-format/build/plugins/lib/markup.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.printText =
          e.printProps =
          e.printElementAsLeaf =
          e.printElement =
          e.printComment =
          e.printChildren =
            void 0);
      var t = r(C1());
      function r(c) {
        return c && c.__esModule ? c : { default: c };
      }
      var n = (c, s, d, p, f, h, m) => {
        let g = p + d.indent,
          b = d.colors;
        return c
          .map((y) => {
            let R = s[y],
              _ = m(R, d, g, f, h);
            return (
              typeof R != "string" &&
                (_.indexOf(`
`) !== -1 && (_ = d.spacingOuter + g + _ + d.spacingOuter + p),
                (_ = "{" + _ + "}")),
              d.spacingInner +
                p +
                b.prop.open +
                y +
                b.prop.close +
                "=" +
                b.value.open +
                _ +
                b.value.close
            );
          })
          .join("");
      };
      e.printProps = n;
      var a = (c, s, d, p, f, h) =>
        c
          .map(
            (m) =>
              s.spacingOuter +
              d +
              (typeof m == "string" ? o(m, s) : h(m, s, d, p, f)),
          )
          .join("");
      e.printChildren = a;
      var o = (c, s) => {
        let d = s.colors.content;
        return d.open + (0, t.default)(c) + d.close;
      };
      e.printText = o;
      var i = (c, s) => {
        let d = s.colors.comment;
        return d.open + "<!--" + (0, t.default)(c) + "-->" + d.close;
      };
      e.printComment = i;
      var l = (c, s, d, p, f) => {
        let h = p.colors.tag;
        return (
          h.open +
          "<" +
          c +
          (s && h.close + s + p.spacingOuter + f + h.open) +
          (d
            ? ">" + h.close + d + p.spacingOuter + f + h.open + "</" + c
            : (s && !p.min ? "" : " ") + "/") +
          ">" +
          h.close
        );
      };
      e.printElement = l;
      var u = (c, s) => {
        let d = s.colors.tag;
        return d.open + "<" + c + d.close + " …" + d.open + " />" + d.close;
      };
      e.printElementAsLeaf = u;
    },
  }),
  R1 = T({
    "../../node_modules/pretty-format/build/plugins/DOMElement.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = ji(),
        r = 1,
        n = 3,
        a = 8,
        o = 11,
        i = /^((HTML|SVG)\w*)?Element$/,
        l = (g) => {
          try {
            return typeof g.hasAttribute == "function" && g.hasAttribute("is");
          } catch {
            return !1;
          }
        },
        u = (g) => {
          let b = g.constructor.name,
            { nodeType: y, tagName: R } = g,
            _ = (typeof R == "string" && R.includes("-")) || l(g);
          return (
            (y === r && (i.test(b) || _)) ||
            (y === n && b === "Text") ||
            (y === a && b === "Comment") ||
            (y === o && b === "DocumentFragment")
          );
        },
        c = (g) => {
          var b;
          return (
            (g == null || (b = g.constructor) === null || b === void 0
              ? void 0
              : b.name) && u(g)
          );
        };
      e.test = c;
      function s(g) {
        return g.nodeType === n;
      }
      function d(g) {
        return g.nodeType === a;
      }
      function p(g) {
        return g.nodeType === o;
      }
      var f = (g, b, y, R, _, C) => {
        if (s(g)) return (0, t.printText)(g.data, b);
        if (d(g)) return (0, t.printComment)(g.data, b);
        let w = p(g) ? "DocumentFragment" : g.tagName.toLowerCase();
        return ++R > b.maxDepth
          ? (0, t.printElementAsLeaf)(w, b)
          : (0, t.printElement)(
              w,
              (0, t.printProps)(
                p(g)
                  ? []
                  : Array.from(g.attributes)
                      .map((v) => v.name)
                      .sort(),
                p(g)
                  ? {}
                  : Array.from(g.attributes).reduce(
                      (v, E) => ((v[E.name] = E.value), v),
                      {},
                    ),
                b,
                y + b.indent,
                R,
                _,
                C,
              ),
              (0, t.printChildren)(
                Array.prototype.slice.call(g.childNodes || g.children),
                b,
                y + b.indent,
                R,
                _,
                C,
              ),
              b,
              y,
            );
      };
      e.serialize = f;
      var h = { serialize: f, test: c },
        m = h;
      e.default = m;
    },
  }),
  T1 = T({
    "../../node_modules/pretty-format/build/plugins/Immutable.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = pa(),
        r = "@@__IMMUTABLE_ITERABLE__@@",
        n = "@@__IMMUTABLE_LIST__@@",
        a = "@@__IMMUTABLE_KEYED__@@",
        o = "@@__IMMUTABLE_MAP__@@",
        i = "@@__IMMUTABLE_ORDERED__@@",
        l = "@@__IMMUTABLE_RECORD__@@",
        u = "@@__IMMUTABLE_SEQ__@@",
        c = "@@__IMMUTABLE_SET__@@",
        s = "@@__IMMUTABLE_STACK__@@",
        d = (E) => "Immutable." + E,
        p = (E) => "[" + E + "]",
        f = " ",
        h = "…",
        m = (E, O, M, N, k, j, I) =>
          ++N > O.maxDepth
            ? p(d(I))
            : d(I) +
              f +
              "{" +
              (0, t.printIteratorEntries)(E.entries(), O, M, N, k, j) +
              "}";
      function g(E) {
        let O = 0;
        return {
          next() {
            if (O < E._keys.length) {
              let M = E._keys[O++];
              return { done: !1, value: [M, E.get(M)] };
            }
            return { done: !0, value: void 0 };
          },
        };
      }
      var b = (E, O, M, N, k, j) => {
          let I = d(E._name || "Record");
          return ++N > O.maxDepth
            ? p(I)
            : I +
                f +
                "{" +
                (0, t.printIteratorEntries)(g(E), O, M, N, k, j) +
                "}";
        },
        y = (E, O, M, N, k, j) => {
          let I = d("Seq");
          return ++N > O.maxDepth
            ? p(I)
            : E[a]
              ? I +
                f +
                "{" +
                (E._iter || E._object
                  ? (0, t.printIteratorEntries)(E.entries(), O, M, N, k, j)
                  : h) +
                "}"
              : I +
                f +
                "[" +
                (E._iter || E._array || E._collection || E._iterable
                  ? (0, t.printIteratorValues)(E.values(), O, M, N, k, j)
                  : h) +
                "]";
        },
        R = (E, O, M, N, k, j, I) =>
          ++N > O.maxDepth
            ? p(d(I))
            : d(I) +
              f +
              "[" +
              (0, t.printIteratorValues)(E.values(), O, M, N, k, j) +
              "]",
        _ = (E, O, M, N, k, j) =>
          E[o]
            ? m(E, O, M, N, k, j, E[i] ? "OrderedMap" : "Map")
            : E[n]
              ? R(E, O, M, N, k, j, "List")
              : E[c]
                ? R(E, O, M, N, k, j, E[i] ? "OrderedSet" : "Set")
                : E[s]
                  ? R(E, O, M, N, k, j, "Stack")
                  : E[u]
                    ? y(E, O, M, N, k, j)
                    : b(E, O, M, N, k, j);
      e.serialize = _;
      var C = (E) => E && (E[r] === !0 || E[l] === !0);
      e.test = C;
      var w = { serialize: _, test: C },
        v = w;
      e.default = v;
    },
  }),
  S1 = T({
    "../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.development.js"(
      e,
    ) {
      (function () {
        var t = 60103,
          r = 60106,
          n = 60107,
          a = 60108,
          o = 60114,
          i = 60109,
          l = 60110,
          u = 60112,
          c = 60113,
          s = 60120,
          d = 60115,
          p = 60116,
          f = 60121,
          h = 60122,
          m = 60117,
          g = 60129,
          b = 60131;
        if (typeof Symbol == "function" && Symbol.for) {
          var y = Symbol.for;
          (t = y("react.element")),
            (r = y("react.portal")),
            (n = y("react.fragment")),
            (a = y("react.strict_mode")),
            (o = y("react.profiler")),
            (i = y("react.provider")),
            (l = y("react.context")),
            (u = y("react.forward_ref")),
            (c = y("react.suspense")),
            (s = y("react.suspense_list")),
            (d = y("react.memo")),
            (p = y("react.lazy")),
            (f = y("react.block")),
            (h = y("react.server.block")),
            (m = y("react.fundamental")),
            y("react.scope"),
            y("react.opaque.id"),
            (g = y("react.debug_trace_mode")),
            y("react.offscreen"),
            (b = y("react.legacy_hidden"));
        }
        var R = !1;
        function _(U) {
          return !!(
            typeof U == "string" ||
            typeof U == "function" ||
            U === n ||
            U === o ||
            U === g ||
            U === a ||
            U === c ||
            U === s ||
            U === b ||
            R ||
            (typeof U == "object" &&
              U !== null &&
              (U.$$typeof === p ||
                U.$$typeof === d ||
                U.$$typeof === i ||
                U.$$typeof === l ||
                U.$$typeof === u ||
                U.$$typeof === m ||
                U.$$typeof === f ||
                U[0] === h))
          );
        }
        function C(U) {
          if (typeof U == "object" && U !== null) {
            var Q = U.$$typeof;
            switch (Q) {
              case t:
                var $ = U.type;
                switch ($) {
                  case n:
                  case o:
                  case a:
                  case c:
                  case s:
                    return $;
                  default:
                    var se = $ && $.$$typeof;
                    switch (se) {
                      case l:
                      case u:
                      case p:
                      case d:
                      case i:
                        return se;
                      default:
                        return Q;
                    }
                }
              case r:
                return Q;
            }
          }
        }
        var w = l,
          v = i,
          E = t,
          O = u,
          M = n,
          N = p,
          k = d,
          j = r,
          I = o,
          B = a,
          z = c,
          K = !1,
          W = !1;
        function re(U) {
          return (
            K ||
              ((K = !0),
              console.warn(
                "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function me(U) {
          return (
            W ||
              ((W = !0),
              console.warn(
                "The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function de(U) {
          return C(U) === l;
        }
        function F(U) {
          return C(U) === i;
        }
        function L(U) {
          return typeof U == "object" && U !== null && U.$$typeof === t;
        }
        function D(U) {
          return C(U) === u;
        }
        function G(U) {
          return C(U) === n;
        }
        function Y(U) {
          return C(U) === p;
        }
        function ne(U) {
          return C(U) === d;
        }
        function fe(U) {
          return C(U) === r;
        }
        function Be(U) {
          return C(U) === o;
        }
        function q(U) {
          return C(U) === a;
        }
        function V(U) {
          return C(U) === c;
        }
        (e.ContextConsumer = w),
          (e.ContextProvider = v),
          (e.Element = E),
          (e.ForwardRef = O),
          (e.Fragment = M),
          (e.Lazy = N),
          (e.Memo = k),
          (e.Portal = j),
          (e.Profiler = I),
          (e.StrictMode = B),
          (e.Suspense = z),
          (e.isAsyncMode = re),
          (e.isConcurrentMode = me),
          (e.isContextConsumer = de),
          (e.isContextProvider = F),
          (e.isElement = L),
          (e.isForwardRef = D),
          (e.isFragment = G),
          (e.isLazy = Y),
          (e.isMemo = ne),
          (e.isPortal = fe),
          (e.isProfiler = Be),
          (e.isStrictMode = q),
          (e.isSuspense = V),
          (e.isValidElementType = _),
          (e.typeOf = C);
      })();
    },
  }),
  P1 = T({
    "../../node_modules/pretty-format/node_modules/react-is/index.js"(e, t) {
      t.exports = S1();
    },
  }),
  O1 = T({
    "../../node_modules/pretty-format/build/plugins/ReactElement.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = a(P1()),
        r = ji();
      function n(p) {
        if (typeof WeakMap != "function") return null;
        var f = new WeakMap(),
          h = new WeakMap();
        return (n = function (m) {
          return m ? h : f;
        })(p);
      }
      function a(p, f) {
        if (p && p.__esModule) return p;
        if (p === null || (typeof p != "object" && typeof p != "function"))
          return { default: p };
        var h = n(f);
        if (h && h.has(p)) return h.get(p);
        var m = {},
          g = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var b in p)
          if (b !== "default" && Object.prototype.hasOwnProperty.call(p, b)) {
            var y = g ? Object.getOwnPropertyDescriptor(p, b) : null;
            y && (y.get || y.set)
              ? Object.defineProperty(m, b, y)
              : (m[b] = p[b]);
          }
        return (m.default = p), h && h.set(p, m), m;
      }
      var o = (p, f = []) => (
          Array.isArray(p)
            ? p.forEach((h) => {
                o(h, f);
              })
            : p != null && p !== !1 && f.push(p),
          f
        ),
        i = (p) => {
          let f = p.type;
          if (typeof f == "string") return f;
          if (typeof f == "function")
            return f.displayName || f.name || "Unknown";
          if (t.isFragment(p)) return "React.Fragment";
          if (t.isSuspense(p)) return "React.Suspense";
          if (typeof f == "object" && f !== null) {
            if (t.isContextProvider(p)) return "Context.Provider";
            if (t.isContextConsumer(p)) return "Context.Consumer";
            if (t.isForwardRef(p)) {
              if (f.displayName) return f.displayName;
              let h = f.render.displayName || f.render.name || "";
              return h !== "" ? "ForwardRef(" + h + ")" : "ForwardRef";
            }
            if (t.isMemo(p)) {
              let h = f.displayName || f.type.displayName || f.type.name || "";
              return h !== "" ? "Memo(" + h + ")" : "Memo";
            }
          }
          return "UNDEFINED";
        },
        l = (p) => {
          let { props: f } = p;
          return Object.keys(f)
            .filter((h) => h !== "children" && f[h] !== void 0)
            .sort();
        },
        u = (p, f, h, m, g, b) =>
          ++m > f.maxDepth
            ? (0, r.printElementAsLeaf)(i(p), f)
            : (0, r.printElement)(
                i(p),
                (0, r.printProps)(l(p), p.props, f, h + f.indent, m, g, b),
                (0, r.printChildren)(
                  o(p.props.children),
                  f,
                  h + f.indent,
                  m,
                  g,
                  b,
                ),
                f,
                h,
              );
      e.serialize = u;
      var c = (p) => p != null && t.isElement(p);
      e.test = c;
      var s = { serialize: u, test: c },
        d = s;
      e.default = d;
    },
  }),
  A1 = T({
    "../../node_modules/pretty-format/build/plugins/ReactTestComponent.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.test = e.serialize = e.default = void 0);
      var t = ji(),
        r = (function () {
          return typeof globalThis < "u"
            ? globalThis
            : typeof r < "u"
              ? r
              : typeof self < "u"
                ? self
                : typeof window < "u"
                  ? window
                  : Function("return this")();
        })(),
        n = r["jest-symbol-do-not-touch"] || r.Symbol,
        a =
          typeof n == "function" && n.for
            ? n.for("react.test.json")
            : 245830487,
        o = (s) => {
          let { props: d } = s;
          return d
            ? Object.keys(d)
                .filter((p) => d[p] !== void 0)
                .sort()
            : [];
        },
        i = (s, d, p, f, h, m) =>
          ++f > d.maxDepth
            ? (0, t.printElementAsLeaf)(s.type, d)
            : (0, t.printElement)(
                s.type,
                s.props
                  ? (0, t.printProps)(o(s), s.props, d, p + d.indent, f, h, m)
                  : "",
                s.children
                  ? (0, t.printChildren)(s.children, d, p + d.indent, f, h, m)
                  : "",
                d,
                p,
              );
      e.serialize = i;
      var l = (s) => s && s.$$typeof === a;
      e.test = l;
      var u = { serialize: i, test: l },
        c = u;
      e.default = c;
    },
  }),
  q1 = T({
    "../../node_modules/pretty-format/build/index.js"(e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = e.DEFAULT_OPTIONS = void 0),
        (e.format = ne),
        (e.plugins = void 0);
      var t = s(Hd()),
        r = pa(),
        n = s(v1()),
        a = s(E1()),
        o = s(w1()),
        i = s(R1()),
        l = s(T1()),
        u = s(O1()),
        c = s(A1());
      function s(q) {
        return q && q.__esModule ? q : { default: q };
      }
      var d = Object.prototype.toString,
        p = Date.prototype.toISOString,
        f = Error.prototype.toString,
        h = RegExp.prototype.toString,
        m = (q) =>
          (typeof q.constructor == "function" && q.constructor.name) ||
          "Object",
        g = (q) => typeof window < "u" && q === window,
        b = /^Symbol\((.*)\)(.*)$/,
        y = /\n/gi,
        R = class extends Error {
          constructor(q, V) {
            super(q), (this.stack = V), (this.name = this.constructor.name);
          }
        };
      function _(q) {
        return (
          q === "[object Array]" ||
          q === "[object ArrayBuffer]" ||
          q === "[object DataView]" ||
          q === "[object Float32Array]" ||
          q === "[object Float64Array]" ||
          q === "[object Int8Array]" ||
          q === "[object Int16Array]" ||
          q === "[object Int32Array]" ||
          q === "[object Uint8Array]" ||
          q === "[object Uint8ClampedArray]" ||
          q === "[object Uint16Array]" ||
          q === "[object Uint32Array]"
        );
      }
      function C(q) {
        return Object.is(q, -0) ? "-0" : String(q);
      }
      function w(q) {
        return `${q}n`;
      }
      function v(q, V) {
        return V ? "[Function " + (q.name || "anonymous") + "]" : "[Function]";
      }
      function E(q) {
        return String(q).replace(b, "Symbol($1)");
      }
      function O(q) {
        return "[" + f.call(q) + "]";
      }
      function M(q, V, U, Q) {
        if (q === !0 || q === !1) return "" + q;
        if (q === void 0) return "undefined";
        if (q === null) return "null";
        let $ = typeof q;
        if ($ === "number") return C(q);
        if ($ === "bigint") return w(q);
        if ($ === "string")
          return Q ? '"' + q.replace(/"|\\/g, "\\$&") + '"' : '"' + q + '"';
        if ($ === "function") return v(q, V);
        if ($ === "symbol") return E(q);
        let se = d.call(q);
        return se === "[object WeakMap]"
          ? "WeakMap {}"
          : se === "[object WeakSet]"
            ? "WeakSet {}"
            : se === "[object Function]" || se === "[object GeneratorFunction]"
              ? v(q, V)
              : se === "[object Symbol]"
                ? E(q)
                : se === "[object Date]"
                  ? isNaN(+q)
                    ? "Date { NaN }"
                    : p.call(q)
                  : se === "[object Error]"
                    ? O(q)
                    : se === "[object RegExp]"
                      ? U
                        ? h.call(q).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&")
                        : h.call(q)
                      : q instanceof Error
                        ? O(q)
                        : null;
      }
      function N(q, V, U, Q, $, se) {
        if ($.indexOf(q) !== -1) return "[Circular]";
        ($ = $.slice()), $.push(q);
        let ue = ++Q > V.maxDepth,
          we = V.min;
        if (
          V.callToJSON &&
          !ue &&
          q.toJSON &&
          typeof q.toJSON == "function" &&
          !se
        )
          return B(q.toJSON(), V, U, Q, $, !0);
        let st = d.call(q);
        return st === "[object Arguments]"
          ? ue
            ? "[Arguments]"
            : (we ? "" : "Arguments ") +
              "[" +
              (0, r.printListItems)(q, V, U, Q, $, B) +
              "]"
          : _(st)
            ? ue
              ? "[" + q.constructor.name + "]"
              : (we ||
                (!V.printBasicPrototype && q.constructor.name === "Array")
                  ? ""
                  : q.constructor.name + " ") +
                "[" +
                (0, r.printListItems)(q, V, U, Q, $, B) +
                "]"
            : st === "[object Map]"
              ? ue
                ? "[Map]"
                : "Map {" +
                  (0, r.printIteratorEntries)(
                    q.entries(),
                    V,
                    U,
                    Q,
                    $,
                    B,
                    " => ",
                  ) +
                  "}"
              : st === "[object Set]"
                ? ue
                  ? "[Set]"
                  : "Set {" +
                    (0, r.printIteratorValues)(q.values(), V, U, Q, $, B) +
                    "}"
                : ue || g(q)
                  ? "[" + m(q) + "]"
                  : (we || (!V.printBasicPrototype && m(q) === "Object")
                      ? ""
                      : m(q) + " ") +
                    "{" +
                    (0, r.printObjectProperties)(q, V, U, Q, $, B) +
                    "}";
      }
      function k(q) {
        return q.serialize != null;
      }
      function j(q, V, U, Q, $, se) {
        let ue;
        try {
          ue = k(q)
            ? q.serialize(V, U, Q, $, se, B)
            : q.print(
                V,
                (we) => B(we, U, Q, $, se),
                (we) => {
                  let st = Q + U.indent;
                  return (
                    st +
                    we.replace(
                      y,
                      `
` + st,
                    )
                  );
                },
                {
                  edgeSpacing: U.spacingOuter,
                  min: U.min,
                  spacing: U.spacingInner,
                },
                U.colors,
              );
        } catch (we) {
          throw new R(we.message, we.stack);
        }
        if (typeof ue != "string")
          throw new Error(
            `pretty-format: Plugin must return type "string" but instead returned "${typeof ue}".`,
          );
        return ue;
      }
      function I(q, V) {
        for (let U = 0; U < q.length; U++)
          try {
            if (q[U].test(V)) return q[U];
          } catch (Q) {
            throw new R(Q.message, Q.stack);
          }
        return null;
      }
      function B(q, V, U, Q, $, se) {
        let ue = I(V.plugins, q);
        if (ue !== null) return j(ue, q, V, U, Q, $);
        let we = M(q, V.printFunctionName, V.escapeRegex, V.escapeString);
        return we !== null ? we : N(q, V, U, Q, $, se);
      }
      var z = {
          comment: "gray",
          content: "reset",
          prop: "yellow",
          tag: "cyan",
          value: "green",
        },
        K = Object.keys(z),
        W = {
          callToJSON: !0,
          compareKeys: void 0,
          escapeRegex: !1,
          escapeString: !0,
          highlight: !1,
          indent: 2,
          maxDepth: 1 / 0,
          min: !1,
          plugins: [],
          printBasicPrototype: !0,
          printFunctionName: !0,
          theme: z,
        };
      e.DEFAULT_OPTIONS = W;
      function re(q) {
        if (
          (Object.keys(q).forEach((V) => {
            if (!W.hasOwnProperty(V))
              throw new Error(`pretty-format: Unknown option "${V}".`);
          }),
          q.min && q.indent !== void 0 && q.indent !== 0)
        )
          throw new Error(
            'pretty-format: Options "min" and "indent" cannot be used together.',
          );
        if (q.theme !== void 0) {
          if (q.theme === null)
            throw new Error('pretty-format: Option "theme" must not be null.');
          if (typeof q.theme != "object")
            throw new Error(
              `pretty-format: Option "theme" must be of type "object" but instead received "${typeof q.theme}".`,
            );
        }
      }
      var me = (q) =>
          K.reduce((V, U) => {
            let Q = q.theme && q.theme[U] !== void 0 ? q.theme[U] : z[U],
              $ = Q && t.default[Q];
            if ($ && typeof $.close == "string" && typeof $.open == "string")
              V[U] = $;
            else
              throw new Error(
                `pretty-format: Option "theme" has a key "${U}" whose value "${Q}" is undefined in ansi-styles.`,
              );
            return V;
          }, Object.create(null)),
        de = () =>
          K.reduce(
            (q, V) => ((q[V] = { close: "", open: "" }), q),
            Object.create(null),
          ),
        F = (q) =>
          q && q.printFunctionName !== void 0
            ? q.printFunctionName
            : W.printFunctionName,
        L = (q) =>
          q && q.escapeRegex !== void 0 ? q.escapeRegex : W.escapeRegex,
        D = (q) =>
          q && q.escapeString !== void 0 ? q.escapeString : W.escapeString,
        G = (q) => {
          var V;
          return {
            callToJSON:
              q && q.callToJSON !== void 0 ? q.callToJSON : W.callToJSON,
            colors: q && q.highlight ? me(q) : de(),
            compareKeys:
              q && typeof q.compareKeys == "function"
                ? q.compareKeys
                : W.compareKeys,
            escapeRegex: L(q),
            escapeString: D(q),
            indent:
              q && q.min
                ? ""
                : Y(q && q.indent !== void 0 ? q.indent : W.indent),
            maxDepth: q && q.maxDepth !== void 0 ? q.maxDepth : W.maxDepth,
            min: q && q.min !== void 0 ? q.min : W.min,
            plugins: q && q.plugins !== void 0 ? q.plugins : W.plugins,
            printBasicPrototype:
              (V = q == null ? void 0 : q.printBasicPrototype) !== null &&
              V !== void 0
                ? V
                : !0,
            printFunctionName: F(q),
            spacingInner:
              q && q.min
                ? " "
                : `
`,
            spacingOuter:
              q && q.min
                ? ""
                : `
`,
          };
        };
      function Y(q) {
        return new Array(q + 1).join(" ");
      }
      function ne(q, V) {
        if (V && (re(V), V.plugins)) {
          let Q = I(V.plugins, q);
          if (Q !== null) return j(Q, q, G(V), "", 0, []);
        }
        let U = M(q, F(V), L(V), D(V));
        return U !== null ? U : N(q, G(V), "", 0, []);
      }
      var fe = {
        AsymmetricMatcher: n.default,
        ConvertAnsi: a.default,
        DOMCollection: o.default,
        DOMElement: i.default,
        Immutable: l.default,
        ReactElement: u.default,
        ReactTestComponent: c.default,
      };
      e.plugins = fe;
      var Be = ne;
      e.default = Be;
    },
  }),
  x1 = T({
    "../../node_modules/lz-string/libs/lz-string.js"(e, t) {
      var r = (function () {
        var n = String.fromCharCode,
          a =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          o =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
          i = {};
        function l(c, s) {
          if (!i[c]) {
            i[c] = {};
            for (var d = 0; d < c.length; d++) i[c][c.charAt(d)] = d;
          }
          return i[c][s];
        }
        var u = {
          compressToBase64: function (c) {
            if (c == null) return "";
            var s = u._compress(c, 6, function (d) {
              return a.charAt(d);
            });
            switch (s.length % 4) {
              default:
              case 0:
                return s;
              case 1:
                return s + "===";
              case 2:
                return s + "==";
              case 3:
                return s + "=";
            }
          },
          decompressFromBase64: function (c) {
            return c == null
              ? ""
              : c == ""
                ? null
                : u._decompress(c.length, 32, function (s) {
                    return l(a, c.charAt(s));
                  });
          },
          compressToUTF16: function (c) {
            return c == null
              ? ""
              : u._compress(c, 15, function (s) {
                  return n(s + 32);
                }) + " ";
          },
          decompressFromUTF16: function (c) {
            return c == null
              ? ""
              : c == ""
                ? null
                : u._decompress(c.length, 16384, function (s) {
                    return c.charCodeAt(s) - 32;
                  });
          },
          compressToUint8Array: function (c) {
            for (
              var s = u.compress(c),
                d = new Uint8Array(s.length * 2),
                p = 0,
                f = s.length;
              p < f;
              p++
            ) {
              var h = s.charCodeAt(p);
              (d[p * 2] = h >>> 8), (d[p * 2 + 1] = h % 256);
            }
            return d;
          },
          decompressFromUint8Array: function (c) {
            if (c == null) return u.decompress(c);
            for (
              var s = new Array(c.length / 2), d = 0, p = s.length;
              d < p;
              d++
            )
              s[d] = c[d * 2] * 256 + c[d * 2 + 1];
            var f = [];
            return (
              s.forEach(function (h) {
                f.push(n(h));
              }),
              u.decompress(f.join(""))
            );
          },
          compressToEncodedURIComponent: function (c) {
            return c == null
              ? ""
              : u._compress(c, 6, function (s) {
                  return o.charAt(s);
                });
          },
          decompressFromEncodedURIComponent: function (c) {
            return c == null
              ? ""
              : c == ""
                ? null
                : ((c = c.replace(/ /g, "+")),
                  u._decompress(c.length, 32, function (s) {
                    return l(o, c.charAt(s));
                  }));
          },
          compress: function (c) {
            return u._compress(c, 16, function (s) {
              return n(s);
            });
          },
          _compress: function (c, s, d) {
            if (c == null) return "";
            var p,
              f,
              h = {},
              m = {},
              g = "",
              b = "",
              y = "",
              R = 2,
              _ = 3,
              C = 2,
              w = [],
              v = 0,
              E = 0,
              O;
            for (O = 0; O < c.length; O += 1)
              if (
                ((g = c.charAt(O)),
                Object.prototype.hasOwnProperty.call(h, g) ||
                  ((h[g] = _++), (m[g] = !0)),
                (b = y + g),
                Object.prototype.hasOwnProperty.call(h, b))
              )
                y = b;
              else {
                if (Object.prototype.hasOwnProperty.call(m, y)) {
                  if (y.charCodeAt(0) < 256) {
                    for (p = 0; p < C; p++)
                      (v = v << 1),
                        E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++;
                    for (f = y.charCodeAt(0), p = 0; p < 8; p++)
                      (v = (v << 1) | (f & 1)),
                        E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                        (f = f >> 1);
                  } else {
                    for (f = 1, p = 0; p < C; p++)
                      (v = (v << 1) | f),
                        E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                        (f = 0);
                    for (f = y.charCodeAt(0), p = 0; p < 16; p++)
                      (v = (v << 1) | (f & 1)),
                        E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                        (f = f >> 1);
                  }
                  R--, R == 0 && ((R = Math.pow(2, C)), C++), delete m[y];
                } else
                  for (f = h[y], p = 0; p < C; p++)
                    (v = (v << 1) | (f & 1)),
                      E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                      (f = f >> 1);
                R--,
                  R == 0 && ((R = Math.pow(2, C)), C++),
                  (h[b] = _++),
                  (y = String(g));
              }
            if (y !== "") {
              if (Object.prototype.hasOwnProperty.call(m, y)) {
                if (y.charCodeAt(0) < 256) {
                  for (p = 0; p < C; p++)
                    (v = v << 1),
                      E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++;
                  for (f = y.charCodeAt(0), p = 0; p < 8; p++)
                    (v = (v << 1) | (f & 1)),
                      E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                      (f = f >> 1);
                } else {
                  for (f = 1, p = 0; p < C; p++)
                    (v = (v << 1) | f),
                      E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                      (f = 0);
                  for (f = y.charCodeAt(0), p = 0; p < 16; p++)
                    (v = (v << 1) | (f & 1)),
                      E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                      (f = f >> 1);
                }
                R--, R == 0 && ((R = Math.pow(2, C)), C++), delete m[y];
              } else
                for (f = h[y], p = 0; p < C; p++)
                  (v = (v << 1) | (f & 1)),
                    E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                    (f = f >> 1);
              R--, R == 0 && ((R = Math.pow(2, C)), C++);
            }
            for (f = 2, p = 0; p < C; p++)
              (v = (v << 1) | (f & 1)),
                E == s - 1 ? ((E = 0), w.push(d(v)), (v = 0)) : E++,
                (f = f >> 1);
            for (;;)
              if (((v = v << 1), E == s - 1)) {
                w.push(d(v));
                break;
              } else E++;
            return w.join("");
          },
          decompress: function (c) {
            return c == null
              ? ""
              : c == ""
                ? null
                : u._decompress(c.length, 32768, function (s) {
                    return c.charCodeAt(s);
                  });
          },
          _decompress: function (c, s, d) {
            var p = [],
              f = 4,
              h = 4,
              m = 3,
              g = "",
              b = [],
              y,
              R,
              _,
              C,
              w,
              v,
              E,
              O = { val: d(0), position: s, index: 1 };
            for (y = 0; y < 3; y += 1) p[y] = y;
            for (_ = 0, w = Math.pow(2, 2), v = 1; v != w; )
              (C = O.val & O.position),
                (O.position >>= 1),
                O.position == 0 && ((O.position = s), (O.val = d(O.index++))),
                (_ |= (C > 0 ? 1 : 0) * v),
                (v <<= 1);
            switch (_) {
              case 0:
                for (_ = 0, w = Math.pow(2, 8), v = 1; v != w; )
                  (C = O.val & O.position),
                    (O.position >>= 1),
                    O.position == 0 &&
                      ((O.position = s), (O.val = d(O.index++))),
                    (_ |= (C > 0 ? 1 : 0) * v),
                    (v <<= 1);
                E = n(_);
                break;
              case 1:
                for (_ = 0, w = Math.pow(2, 16), v = 1; v != w; )
                  (C = O.val & O.position),
                    (O.position >>= 1),
                    O.position == 0 &&
                      ((O.position = s), (O.val = d(O.index++))),
                    (_ |= (C > 0 ? 1 : 0) * v),
                    (v <<= 1);
                E = n(_);
                break;
              case 2:
                return "";
            }
            for (p[3] = E, R = E, b.push(E); ; ) {
              if (O.index > c) return "";
              for (_ = 0, w = Math.pow(2, m), v = 1; v != w; )
                (C = O.val & O.position),
                  (O.position >>= 1),
                  O.position == 0 && ((O.position = s), (O.val = d(O.index++))),
                  (_ |= (C > 0 ? 1 : 0) * v),
                  (v <<= 1);
              switch ((E = _)) {
                case 0:
                  for (_ = 0, w = Math.pow(2, 8), v = 1; v != w; )
                    (C = O.val & O.position),
                      (O.position >>= 1),
                      O.position == 0 &&
                        ((O.position = s), (O.val = d(O.index++))),
                      (_ |= (C > 0 ? 1 : 0) * v),
                      (v <<= 1);
                  (p[h++] = n(_)), (E = h - 1), f--;
                  break;
                case 1:
                  for (_ = 0, w = Math.pow(2, 16), v = 1; v != w; )
                    (C = O.val & O.position),
                      (O.position >>= 1),
                      O.position == 0 &&
                        ((O.position = s), (O.val = d(O.index++))),
                      (_ |= (C > 0 ? 1 : 0) * v),
                      (v <<= 1);
                  (p[h++] = n(_)), (E = h - 1), f--;
                  break;
                case 2:
                  return b.join("");
              }
              if ((f == 0 && ((f = Math.pow(2, m)), m++), p[E])) g = p[E];
              else if (E === h) g = R + R.charAt(0);
              else return null;
              b.push(g),
                (p[h++] = R + g.charAt(0)),
                f--,
                (R = g),
                f == 0 && ((f = Math.pow(2, m)), m++);
            }
          },
        };
        return u;
      })();
      typeof define == "function" && define.amd
        ? define(function () {
            return r;
          })
        : typeof t < "u" && t != null
          ? (t.exports = r)
          : typeof angular < "u" &&
            angular != null &&
            angular.module("LZString", []).factory("LZString", function () {
              return r;
            });
    },
  }),
  zd = Object.defineProperty,
  M1 = Object.getOwnPropertyNames,
  x = (e, t) => zd(e, "name", { value: t, configurable: !0 }),
  $1 = (e, t) =>
    function () {
      return t || (0, e[M1(e)[0]])((t = { exports: {} }).exports, t), t.exports;
    },
  Ii = (e, t) => {
    for (var r in t) zd(e, r, { get: t[r], enumerable: !0 });
  },
  N1 = $1({ "(disabled):util"() {} }),
  nt = {};
Ii(nt, {
  addChainableMethod: () => Ki,
  addLengthGuard: () => pn,
  addMethod: () => Vi,
  addProperty: () => zi,
  checkError: () => ke,
  compareByInspect: () => Un,
  eql: () => gf,
  expectTypes: () => Xd,
  flag: () => J,
  getActual: () => ma,
  getMessage: () => ki,
  getName: () => ga,
  getOperator: () => Qi,
  getOwnEnumerableProperties: () => Xi,
  getOwnEnumerablePropertySymbols: () => Ji,
  getPathInfo: () => Hi,
  hasProperty: () => ba,
  inspect: () => ee,
  isNaN: () => Hn,
  isProxyEnabled: () => fn,
  isRegExp: () => zn,
  objDisplay: () => Ut,
  overwriteChainableMethod: () => Yi,
  overwriteMethod: () => Wi,
  overwriteProperty: () => Gi,
  proxify: () => Ar,
  test: () => Li,
  transferFlags: () => Ze,
  type: () => ce,
});
var ke = {};
Ii(ke, {
  compatibleConstructor: () => Wd,
  compatibleInstance: () => Gd,
  compatibleMessage: () => Kd,
  getConstructorName: () => Yd,
  getMessage: () => Jd,
});
function ha(e) {
  return (
    e instanceof Error || Object.prototype.toString.call(e) === "[object Error]"
  );
}
x(ha, "isErrorInstance");
function Vd(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
x(Vd, "isRegExp");
function Gd(e, t) {
  return ha(t) && e === t;
}
x(Gd, "compatibleInstance");
function Wd(e, t) {
  return ha(t)
    ? e.constructor === t.constructor || e instanceof t.constructor
    : (typeof t == "object" || typeof t == "function") && t.prototype
      ? e.constructor === t || e instanceof t
      : !1;
}
x(Wd, "compatibleConstructor");
function Kd(e, t) {
  let r = typeof e == "string" ? e : e.message;
  return Vd(t) ? t.test(r) : typeof t == "string" ? r.indexOf(t) !== -1 : !1;
}
x(Kd, "compatibleMessage");
function Yd(e) {
  let t = e;
  return (
    ha(e)
      ? (t = e.constructor.name)
      : typeof e == "function" &&
        ((t = e.name), t === "" && (t = new e().name || t)),
    t
  );
}
x(Yd, "getConstructorName");
function Jd(e) {
  let t = "";
  return e && e.message ? (t = e.message) : typeof e == "string" && (t = e), t;
}
x(Jd, "getMessage");
function J(e, t, r) {
  var n = e.__flags || (e.__flags = Object.create(null));
  if (arguments.length === 3) n[t] = r;
  else return n[t];
}
x(J, "flag");
function Li(e, t) {
  var r = J(e, "negate"),
    n = t[0];
  return r ? !n : n;
}
x(Li, "test");
function ce(e) {
  if (typeof e > "u") return "undefined";
  if (e === null) return "null";
  let t = e[Symbol.toStringTag];
  return typeof t == "string"
    ? t
    : Object.prototype.toString.call(e).slice(8, -1);
}
x(ce, "type");
var j1 = "captureStackTrace" in Error,
  wn,
  ie =
    ((wn = class extends Error {
      constructor(t = "Unspecified AssertionError", r, n) {
        super(t);
        ye(this, "message");
        (this.message = t), j1 && Error.captureStackTrace(this, n || wn);
        for (let a in r) a in this || (this[a] = r[a]);
      }
      get name() {
        return "AssertionError";
      }
      get ok() {
        return !1;
      }
      toJSON(t) {
        return {
          ...this,
          name: this.name,
          message: this.message,
          ok: !1,
          stack: t !== !1 ? this.stack : void 0,
        };
      }
    }),
    x(wn, "AssertionError"),
    wn);
function Xd(e, t) {
  var r = J(e, "message"),
    n = J(e, "ssfi");
  (r = r ? r + ": " : ""),
    (e = J(e, "object")),
    (t = t.map(function (i) {
      return i.toLowerCase();
    })),
    t.sort();
  var a = t
      .map(function (i, l) {
        var u = ~["a", "e", "i", "o", "u"].indexOf(i.charAt(0)) ? "an" : "a",
          c = t.length > 1 && l === t.length - 1 ? "or " : "";
        return c + u + " " + i;
      })
      .join(", "),
    o = ce(e).toLowerCase();
  if (
    !t.some(function (i) {
      return o === i;
    })
  )
    throw new ie(
      r + "object tested must be " + a + ", but " + o + " given",
      void 0,
      n,
    );
}
x(Xd, "expectTypes");
function ma(e, t) {
  return t.length > 4 ? t[4] : e._obj;
}
x(ma, "getActual");
var Fs = {
    bold: ["1", "22"],
    dim: ["2", "22"],
    italic: ["3", "23"],
    underline: ["4", "24"],
    inverse: ["7", "27"],
    hidden: ["8", "28"],
    strike: ["9", "29"],
    black: ["30", "39"],
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    magenta: ["35", "39"],
    cyan: ["36", "39"],
    white: ["37", "39"],
    brightblack: ["30;1", "39"],
    brightred: ["31;1", "39"],
    brightgreen: ["32;1", "39"],
    brightyellow: ["33;1", "39"],
    brightblue: ["34;1", "39"],
    brightmagenta: ["35;1", "39"],
    brightcyan: ["36;1", "39"],
    brightwhite: ["37;1", "39"],
    grey: ["90", "39"],
  },
  I1 = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
  },
  mr = "…";
function Qd(e, t) {
  let r = Fs[I1[t]] || Fs[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
x(Qd, "colorise");
function Zd(
  {
    showHidden: e = !1,
    depth: t = 2,
    colors: r = !1,
    customInspect: n = !0,
    showProxy: a = !1,
    maxArrayLength: o = 1 / 0,
    breakLength: i = 1 / 0,
    seen: l = [],
    truncate: u = 1 / 0,
    stylize: c = String,
  } = {},
  s,
) {
  let d = {
    showHidden: !!e,
    depth: Number(t),
    colors: !!r,
    customInspect: !!n,
    showProxy: !!a,
    maxArrayLength: Number(o),
    breakLength: Number(i),
    truncate: Number(u),
    seen: l,
    inspect: s,
    stylize: c,
  };
  return d.colors && (d.stylize = Qd), d;
}
x(Zd, "normaliseOptions");
function _t(e, t, r = mr) {
  e = String(e);
  let n = r.length,
    a = e.length;
  return n > t && a > n ? r : a > t && a > n ? `${e.slice(0, t - n)}${r}` : e;
}
x(_t, "truncate");
function Ve(e, t, r, n = ", ") {
  r = r || t.inspect;
  let a = e.length;
  if (a === 0) return "";
  let o = t.truncate,
    i = "",
    l = "",
    u = "";
  for (let c = 0; c < a; c += 1) {
    let s = c + 1 === e.length,
      d = c + 2 === e.length;
    u = `${mr}(${e.length - c})`;
    let p = e[c];
    t.truncate = o - i.length - (s ? 0 : n.length);
    let f = l || r(p, t) + (s ? "" : n),
      h = i.length + f.length,
      m = h + u.length;
    if (
      (s && h > o && i.length + u.length <= o) ||
      (!s && !d && m > o) ||
      ((l = s ? "" : r(e[c + 1], t) + (d ? "" : n)),
      !s && d && m > o && h + l.length > o)
    )
      break;
    if (((i += f), !s && !d && h + l.length >= o)) {
      u = `${mr}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${i}${u}`;
}
x(Ve, "inspectList");
function ef(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)
    ? e
    : JSON.stringify(e)
        .replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
}
x(ef, "quoteComplexKey");
function br([e, t], r) {
  return (
    (r.truncate -= 2),
    typeof e == "string"
      ? (e = ef(e))
      : typeof e != "number" && (e = `[${r.inspect(e, r)}]`),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e}: ${t}`
  );
}
x(br, "inspectProperty");
function tf(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = Ve(e, t);
  t.truncate -= n.length;
  let a = "";
  return (
    r.length &&
      (a = Ve(
        r.map((o) => [o, e[o]]),
        t,
        br,
      )),
    `[ ${n}${a ? `, ${a}` : ""} ]`
  );
}
x(tf, "inspectArray");
var L1 = x(
  (e) =>
    typeof Buffer == "function" && e instanceof Buffer
      ? "Buffer"
      : e[Symbol.toStringTag]
        ? e[Symbol.toStringTag]
        : e.constructor.name,
  "getArrayName",
);
function tt(e, t) {
  let r = L1(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let a = "";
  for (let i = 0; i < e.length; i++) {
    let l = `${t.stylize(_t(e[i], t.truncate), "number")}${i === e.length - 1 ? "" : ", "}`;
    if (((t.truncate -= l.length), e[i] !== e.length && t.truncate <= 3)) {
      a += `${mr}(${e.length - e[i] + 1})`;
      break;
    }
    a += l;
  }
  let o = "";
  return (
    n.length &&
      (o = Ve(
        n.map((i) => [i, e[i]]),
        t,
        br,
      )),
    `${r}[ ${a}${o ? `, ${o}` : ""} ]`
  );
}
x(tt, "inspectTypedArray");
function rf(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"),
    a = n[0];
  return t.stylize(`${a}T${_t(n[1], t.truncate - a.length - 1)}`, "date");
}
x(rf, "inspectDate");
function _o(e, t) {
  let r = e[Symbol.toStringTag] || "Function",
    n = e.name;
  return n
    ? t.stylize(`[${r} ${_t(n, t.truncate - 11)}]`, "special")
    : t.stylize(`[${r}]`, "special");
}
x(_o, "inspectFunction");
function nf([e, t], r) {
  return (
    (r.truncate -= 4),
    (e = r.inspect(e, r)),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e} => ${t}`
  );
}
x(nf, "inspectMapEntry");
function af(e) {
  let t = [];
  return (
    e.forEach((r, n) => {
      t.push([n, r]);
    }),
    t
  );
}
x(af, "mapToEntries");
function of(e, t) {
  return e.size - 1 <= 0
    ? "Map{}"
    : ((t.truncate -= 7), `Map{ ${Ve(af(e), t, nf)} }`);
}
x(of, "inspectMap");
var B1 = Number.isNaN || ((e) => e !== e);
function Eo(e, t) {
  return B1(e)
    ? t.stylize("NaN", "number")
    : e === 1 / 0
      ? t.stylize("Infinity", "number")
      : e === -1 / 0
        ? t.stylize("-Infinity", "number")
        : e === 0
          ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number")
          : t.stylize(_t(String(e), t.truncate), "number");
}
x(Eo, "inspectNumber");
function wo(e, t) {
  let r = _t(e.toString(), t.truncate - 1);
  return r !== mr && (r += "n"), t.stylize(r, "bigint");
}
x(wo, "inspectBigInt");
function lf(e, t) {
  let r = e.toString().split("/")[2],
    n = t.truncate - (2 + r.length),
    a = e.source;
  return t.stylize(`/${_t(a, n)}/${r}`, "regexp");
}
x(lf, "inspectRegExp");
function sf(e) {
  let t = [];
  return (
    e.forEach((r) => {
      t.push(r);
    }),
    t
  );
}
x(sf, "arrayFromSet");
function uf(e, t) {
  return e.size === 0 ? "Set{}" : ((t.truncate -= 7), `Set{ ${Ve(sf(e), t)} }`);
}
x(uf, "inspectSet");
var Us = new RegExp(
    "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
    "g",
  ),
  k1 = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\",
  },
  D1 = 16,
  F1 = 4;
function cf(e) {
  return k1[e] || `\\u${`0000${e.charCodeAt(0).toString(D1)}`.slice(-F1)}`;
}
x(cf, "escape");
function Co(e, t) {
  return (
    Us.test(e) && (e = e.replace(Us, cf)),
    t.stylize(`'${_t(e, t.truncate - 2)}'`, "string")
  );
}
x(Co, "inspectString");
function Ro(e) {
  return "description" in Symbol.prototype
    ? e.description
      ? `Symbol(${e.description})`
      : "Symbol()"
    : e.toString();
}
x(Ro, "inspectSymbol");
var df = x(() => "Promise{…}", "getPromiseValue");
try {
  let {
    getPromiseDetails: e,
    kPending: t,
    kRejected: r,
  } = process.binding("util");
  Array.isArray(e(Promise.resolve())) &&
    (df = x((n, a) => {
      let [o, i] = e(n);
      return o === t
        ? "Promise{<pending>}"
        : `Promise${o === r ? "!" : ""}{${a.inspect(i, a)}}`;
    }, "getPromiseValue"));
} catch {}
var U1 = df;
function kr(e, t) {
  let r = Object.getOwnPropertyNames(e),
    n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (((t.truncate -= 4), (t.seen = t.seen || []), t.seen.indexOf(e) >= 0))
    return "[Circular]";
  t.seen.push(e);
  let a = Ve(
      r.map((l) => [l, e[l]]),
      t,
      br,
    ),
    o = Ve(
      n.map((l) => [l, e[l]]),
      t,
      br,
    );
  t.seen.pop();
  let i = "";
  return a && o && (i = ", "), `{ ${a}${i}${o} }`;
}
x(kr, "inspectObject");
var Va = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function ff(e, t) {
  let r = "";
  return (
    Va && Va in e && (r = e[Va]),
    (r = r || e.constructor.name),
    (!r || r === "_class") && (r = "<Anonymous Class>"),
    (t.truncate -= r.length),
    `${r}${kr(e, t)}`
  );
}
x(ff, "inspectClass");
function pf(e, t) {
  return e.length === 0
    ? "Arguments[]"
    : ((t.truncate -= 13), `Arguments[ ${Ve(e, t)} ]`);
}
x(pf, "inspectArguments");
var H1 = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description",
];
function hf(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((i) => H1.indexOf(i) === -1),
    n = e.name;
  t.truncate -= n.length;
  let a = "";
  typeof e.message == "string"
    ? (a = _t(e.message, t.truncate))
    : r.unshift("message"),
    (a = a ? `: ${a}` : ""),
    (t.truncate -= a.length + 5);
  let o = Ve(
    r.map((i) => [i, e[i]]),
    t,
    br,
  );
  return `${n}${a}${o ? ` { ${o} }` : ""}`;
}
x(hf, "inspectObject");
function mf([e, t], r) {
  return (
    (r.truncate -= 3),
    t
      ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}`
      : `${r.stylize(String(e), "yellow")}`
  );
}
x(mf, "inspectAttribute");
function kn(e, t) {
  return Ve(
    e,
    t,
    Bi,
    `
`,
  );
}
x(kn, "inspectHTMLCollection");
function Bi(e, t) {
  let r = e.getAttributeNames(),
    n = e.tagName.toLowerCase(),
    a = t.stylize(`<${n}`, "special"),
    o = t.stylize(">", "special"),
    i = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let l = "";
  r.length > 0 &&
    ((l += " "),
    (l += Ve(
      r.map((s) => [s, e.getAttribute(s)]),
      t,
      mf,
      " ",
    ))),
    (t.truncate -= l.length);
  let u = t.truncate,
    c = kn(e.children, t);
  return (
    c && c.length > u && (c = `${mr}(${e.children.length})`),
    `${a}${l}${o}${c}${i}`
  );
}
x(Bi, "inspectHTML");
var z1 = typeof Symbol == "function" && typeof Symbol.for == "function",
  Ga = z1 ? Symbol.for("chai/inspect") : "@@chai/inspect",
  ar = !1;
try {
  let e = N1();
  ar = e.inspect ? e.inspect.custom : !1;
} catch {
  ar = !1;
}
var Hs = new WeakMap(),
  zs = {},
  Vs = {
    undefined: (e, t) => t.stylize("undefined", "undefined"),
    null: (e, t) => t.stylize("null", "null"),
    boolean: (e, t) => t.stylize(String(e), "boolean"),
    Boolean: (e, t) => t.stylize(String(e), "boolean"),
    number: Eo,
    Number: Eo,
    bigint: wo,
    BigInt: wo,
    string: Co,
    String: Co,
    function: _o,
    Function: _o,
    symbol: Ro,
    Symbol: Ro,
    Array: tf,
    Date: rf,
    Map: of,
    Set: uf,
    RegExp: lf,
    Promise: U1,
    WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"),
    WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"),
    Arguments: pf,
    Int8Array: tt,
    Uint8Array: tt,
    Uint8ClampedArray: tt,
    Int16Array: tt,
    Uint16Array: tt,
    Int32Array: tt,
    Uint32Array: tt,
    Float32Array: tt,
    Float64Array: tt,
    Generator: () => "",
    DataView: () => "",
    ArrayBuffer: () => "",
    Error: hf,
    HTMLCollection: kn,
    NodeList: kn,
  },
  V1 = x(
    (e, t, r) =>
      Ga in e && typeof e[Ga] == "function"
        ? e[Ga](t)
        : ar && ar in e && typeof e[ar] == "function"
          ? e[ar](t.depth, t)
          : "inspect" in e && typeof e.inspect == "function"
            ? e.inspect(t.depth, t)
            : "constructor" in e && Hs.has(e.constructor)
              ? Hs.get(e.constructor)(e, t)
              : zs[r]
                ? zs[r](e, t)
                : "",
    "inspectCustom",
  ),
  G1 = Object.prototype.toString;
function Dn(e, t = {}) {
  let r = Zd(t, Dn),
    { customInspect: n } = r,
    a = e === null ? "null" : typeof e;
  if ((a === "object" && (a = G1.call(e).slice(8, -1)), a in Vs))
    return Vs[a](e, r);
  if (n && e) {
    let i = V1(e, r, a);
    if (i) return typeof i == "string" ? i : Dn(i, r);
  }
  let o = e ? Object.getPrototypeOf(e) : !1;
  return o === Object.prototype || o === null
    ? kr(e, r)
    : e && typeof HTMLElement == "function" && e instanceof HTMLElement
      ? Bi(e, r)
      : "constructor" in e
        ? e.constructor !== Object
          ? ff(e, r)
          : kr(e, r)
        : e === Object(e)
          ? kr(e, r)
          : r.stylize(String(e), a);
}
x(Dn, "inspect");
var Ie = {
  includeStack: !1,
  showDiff: !0,
  truncateThreshold: 40,
  useProxy: !0,
  proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
  deepEqual: null,
};
function ee(e, t, r, n) {
  var a = {
    colors: n,
    depth: typeof r > "u" ? 2 : r,
    showHidden: t,
    truncate: Ie.truncateThreshold ? Ie.truncateThreshold : 1 / 0,
  };
  return Dn(e, a);
}
x(ee, "inspect");
function Ut(e) {
  var t = ee(e),
    r = Object.prototype.toString.call(e);
  if (Ie.truncateThreshold && t.length >= Ie.truncateThreshold) {
    if (r === "[object Function]")
      return !e.name || e.name === ""
        ? "[Function]"
        : "[Function: " + e.name + "]";
    if (r === "[object Array]") return "[ Array(" + e.length + ") ]";
    if (r === "[object Object]") {
      var n = Object.keys(e),
        a = n.length > 2 ? n.splice(0, 2).join(", ") + ", ..." : n.join(", ");
      return "{ Object (" + a + ") }";
    } else return t;
  } else return t;
}
x(Ut, "objDisplay");
function ki(e, t) {
  var r = J(e, "negate"),
    n = J(e, "object"),
    a = t[3],
    o = ma(e, t),
    i = r ? t[2] : t[1],
    l = J(e, "message");
  return (
    typeof i == "function" && (i = i()),
    (i = i || ""),
    (i = i
      .replace(/#\{this\}/g, function () {
        return Ut(n);
      })
      .replace(/#\{act\}/g, function () {
        return Ut(o);
      })
      .replace(/#\{exp\}/g, function () {
        return Ut(a);
      })),
    l ? l + ": " + i : i
  );
}
x(ki, "getMessage");
function Ze(e, t, r) {
  var n = e.__flags || (e.__flags = Object.create(null));
  t.__flags || (t.__flags = Object.create(null)),
    (r = arguments.length === 3 ? r : !0);
  for (var a in n)
    (r ||
      (a !== "object" && a !== "ssfi" && a !== "lockSsfi" && a != "message")) &&
      (t.__flags[a] = n[a]);
}
x(Ze, "transferFlags");
function To(e) {
  if (typeof e > "u") return "undefined";
  if (e === null) return "null";
  let t = e[Symbol.toStringTag];
  return typeof t == "string"
    ? t
    : Object.prototype.toString.call(e).slice(8, -1);
}
x(To, "type");
function Di() {
  this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
x(Di, "FakeMap");
Di.prototype = {
  get: x(function (e) {
    return e[this._key];
  }, "get"),
  set: x(function (e, t) {
    Object.isExtensible(e) &&
      Object.defineProperty(e, this._key, { value: t, configurable: !0 });
  }, "set"),
};
var bf = typeof WeakMap == "function" ? WeakMap : Di;
function So(e, t, r) {
  if (!r || Vt(e) || Vt(t)) return null;
  var n = r.get(e);
  if (n) {
    var a = n.get(t);
    if (typeof a == "boolean") return a;
  }
  return null;
}
x(So, "memoizeCompare");
function jr(e, t, r, n) {
  if (!(!r || Vt(e) || Vt(t))) {
    var a = r.get(e);
    a ? a.set(t, n) : ((a = new bf()), a.set(t, n), r.set(e, a));
  }
}
x(jr, "memoizeSet");
var gf = dn;
function dn(e, t, r) {
  if (r && r.comparator) return Po(e, t, r);
  var n = Fi(e, t);
  return n !== null ? n : Po(e, t, r);
}
x(dn, "deepEqual");
function Fi(e, t) {
  return e === t
    ? e !== 0 || 1 / e === 1 / t
    : e !== e && t !== t
      ? !0
      : Vt(e) || Vt(t)
        ? !1
        : null;
}
x(Fi, "simpleEqual");
function Po(e, t, r) {
  (r = r || {}), (r.memoize = r.memoize === !1 ? !1 : r.memoize || new bf());
  var n = r && r.comparator,
    a = So(e, t, r.memoize);
  if (a !== null) return a;
  var o = So(t, e, r.memoize);
  if (o !== null) return o;
  if (n) {
    var i = n(e, t);
    if (i === !1 || i === !0) return jr(e, t, r.memoize, i), i;
    var l = Fi(e, t);
    if (l !== null) return l;
  }
  var u = To(e);
  if (u !== To(t)) return jr(e, t, r.memoize, !1), !1;
  jr(e, t, r.memoize, !0);
  var c = yf(e, t, u, r);
  return jr(e, t, r.memoize, c), c;
}
x(Po, "extensiveDeepEqual");
function yf(e, t, r, n) {
  switch (r) {
    case "String":
    case "Number":
    case "Boolean":
    case "Date":
      return dn(e.valueOf(), t.valueOf());
    case "Promise":
    case "Symbol":
    case "function":
    case "WeakMap":
    case "WeakSet":
      return e === t;
    case "Error":
      return Ui(e, t, ["name", "message", "code"], n);
    case "Arguments":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "Array":
      return xt(e, t, n);
    case "RegExp":
      return vf(e, t);
    case "Generator":
      return _f(e, t, n);
    case "DataView":
      return xt(new Uint8Array(e.buffer), new Uint8Array(t.buffer), n);
    case "ArrayBuffer":
      return xt(new Uint8Array(e), new Uint8Array(t), n);
    case "Set":
      return Oo(e, t, n);
    case "Map":
      return Oo(e, t, n);
    case "Temporal.PlainDate":
    case "Temporal.PlainTime":
    case "Temporal.PlainDateTime":
    case "Temporal.Instant":
    case "Temporal.ZonedDateTime":
    case "Temporal.PlainYearMonth":
    case "Temporal.PlainMonthDay":
      return e.equals(t);
    case "Temporal.Duration":
      return e.total("nanoseconds") === t.total("nanoseconds");
    case "Temporal.TimeZone":
    case "Temporal.Calendar":
      return e.toString() === t.toString();
    default:
      return wf(e, t, n);
  }
}
x(yf, "extensiveDeepEqualByType");
function vf(e, t) {
  return e.toString() === t.toString();
}
x(vf, "regexpEqual");
function Oo(e, t, r) {
  if (e.size !== t.size) return !1;
  if (e.size === 0) return !0;
  var n = [],
    a = [];
  return (
    e.forEach(
      x(function (o, i) {
        n.push([o, i]);
      }, "gatherEntries"),
    ),
    t.forEach(
      x(function (o, i) {
        a.push([o, i]);
      }, "gatherEntries"),
    ),
    xt(n.sort(), a.sort(), r)
  );
}
x(Oo, "entriesEqual");
function xt(e, t, r) {
  var n = e.length;
  if (n !== t.length) return !1;
  if (n === 0) return !0;
  for (var a = -1; ++a < n; ) if (dn(e[a], t[a], r) === !1) return !1;
  return !0;
}
x(xt, "iterableEqual");
function _f(e, t, r) {
  return xt(Fn(e), Fn(t), r);
}
x(_f, "generatorEqual");
function Ef(e) {
  return (
    typeof Symbol < "u" &&
    typeof e == "object" &&
    typeof Symbol.iterator < "u" &&
    typeof e[Symbol.iterator] == "function"
  );
}
x(Ef, "hasIteratorFunction");
function Ao(e) {
  if (Ef(e))
    try {
      return Fn(e[Symbol.iterator]());
    } catch {
      return [];
    }
  return [];
}
x(Ao, "getIteratorEntries");
function Fn(e) {
  for (var t = e.next(), r = [t.value]; t.done === !1; )
    (t = e.next()), r.push(t.value);
  return r;
}
x(Fn, "getGeneratorEntries");
function qo(e) {
  var t = [];
  for (var r in e) t.push(r);
  return t;
}
x(qo, "getEnumerableKeys");
function xo(e) {
  for (
    var t = [], r = Object.getOwnPropertySymbols(e), n = 0;
    n < r.length;
    n += 1
  ) {
    var a = r[n];
    Object.getOwnPropertyDescriptor(e, a).enumerable && t.push(a);
  }
  return t;
}
x(xo, "getEnumerableSymbols");
function Ui(e, t, r, n) {
  var a = r.length;
  if (a === 0) return !0;
  for (var o = 0; o < a; o += 1) if (dn(e[r[o]], t[r[o]], n) === !1) return !1;
  return !0;
}
x(Ui, "keysEqual");
function wf(e, t, r) {
  var n = qo(e),
    a = qo(t),
    o = xo(e),
    i = xo(t);
  if (((n = n.concat(o)), (a = a.concat(i)), n.length && n.length === a.length))
    return xt(Mo(n).sort(), Mo(a).sort()) === !1 ? !1 : Ui(e, t, n, r);
  var l = Ao(e),
    u = Ao(t);
  return l.length && l.length === u.length
    ? (l.sort(), u.sort(), xt(l, u, r))
    : n.length === 0 && l.length === 0 && a.length === 0 && u.length === 0;
}
x(wf, "objectEqual");
function Vt(e) {
  return e === null || typeof e != "object";
}
x(Vt, "isPrimitive");
function Mo(e) {
  return e.map(
    x(function (t) {
      return typeof t == "symbol" ? t.toString() : t;
    }, "mapSymbol"),
  );
}
x(Mo, "mapSymbols");
function ba(e, t) {
  return typeof e > "u" || e === null ? !1 : t in Object(e);
}
x(ba, "hasProperty");
function Cf(e) {
  return e
    .replace(/([^\\])\[/g, "$1.[")
    .match(/(\\\.|[^.]+?)+/g)
    .map((t) => {
      if (t === "constructor" || t === "__proto__" || t === "prototype")
        return {};
      let r = /^\[(\d+)\]$/.exec(t),
        n = null;
      return (
        r
          ? (n = { i: parseFloat(r[1]) })
          : (n = { p: t.replace(/\\([.[\]])/g, "$1") }),
        n
      );
    });
}
x(Cf, "parsePath");
function $o(e, t, r) {
  let n = e,
    a = null;
  r = typeof r > "u" ? t.length : r;
  for (let o = 0; o < r; o++) {
    let i = t[o];
    n &&
      (typeof i.p > "u" ? (n = n[i.i]) : (n = n[i.p]), o === r - 1 && (a = n));
  }
  return a;
}
x($o, "internalGetPathValue");
function Hi(e, t) {
  let r = Cf(t),
    n = r[r.length - 1],
    a = {
      parent: r.length > 1 ? $o(e, r, r.length - 1) : e,
      name: n.p || n.i,
      value: $o(e, r),
    };
  return (a.exists = ba(a.parent, a.name)), a;
}
x(Hi, "getPathInfo");
function P(e, t, r, n) {
  return (
    J(this, "ssfi", r || P),
    J(this, "lockSsfi", n),
    J(this, "object", e),
    J(this, "message", t),
    J(this, "eql", Ie.deepEqual || gf),
    Ar(this)
  );
}
x(P, "Assertion");
Object.defineProperty(P, "includeStack", {
  get: function () {
    return (
      console.warn(
        "Assertion.includeStack is deprecated, use chai.config.includeStack instead.",
      ),
      Ie.includeStack
    );
  },
  set: function (e) {
    console.warn(
      "Assertion.includeStack is deprecated, use chai.config.includeStack instead.",
    ),
      (Ie.includeStack = e);
  },
});
Object.defineProperty(P, "showDiff", {
  get: function () {
    return (
      console.warn(
        "Assertion.showDiff is deprecated, use chai.config.showDiff instead.",
      ),
      Ie.showDiff
    );
  },
  set: function (e) {
    console.warn(
      "Assertion.showDiff is deprecated, use chai.config.showDiff instead.",
    ),
      (Ie.showDiff = e);
  },
});
P.addProperty = function (e, t) {
  zi(this.prototype, e, t);
};
P.addMethod = function (e, t) {
  Vi(this.prototype, e, t);
};
P.addChainableMethod = function (e, t, r) {
  Ki(this.prototype, e, t, r);
};
P.overwriteProperty = function (e, t) {
  Gi(this.prototype, e, t);
};
P.overwriteMethod = function (e, t) {
  Wi(this.prototype, e, t);
};
P.overwriteChainableMethod = function (e, t, r) {
  Yi(this.prototype, e, t, r);
};
P.prototype.assert = function (e, t, r, n, a, o) {
  var i = Li(this, arguments);
  if (
    (o !== !1 && (o = !0),
    n === void 0 && a === void 0 && (o = !1),
    Ie.showDiff !== !0 && (o = !1),
    !i)
  ) {
    t = ki(this, arguments);
    var l = ma(this, arguments),
      u = { actual: l, expected: n, showDiff: o },
      c = Qi(this, arguments);
    throw (
      (c && (u.operator = c),
      new ie(t, u, Ie.includeStack ? this.assert : J(this, "ssfi")))
    );
  }
};
Object.defineProperty(P.prototype, "_obj", {
  get: function () {
    return J(this, "object");
  },
  set: function (e) {
    J(this, "object", e);
  },
});
function fn() {
  return Ie.useProxy && typeof Proxy < "u" && typeof Reflect < "u";
}
x(fn, "isProxyEnabled");
function zi(e, t, r) {
  (r = r === void 0 ? function () {} : r),
    Object.defineProperty(e, t, {
      get: x(function n() {
        !fn() && !J(this, "lockSsfi") && J(this, "ssfi", n);
        var a = r.call(this);
        if (a !== void 0) return a;
        var o = new P();
        return Ze(this, o), o;
      }, "propertyGetter"),
      configurable: !0,
    });
}
x(zi, "addProperty");
var W1 = Object.getOwnPropertyDescriptor(function () {}, "length");
function pn(e, t, r) {
  return (
    W1.configurable &&
      Object.defineProperty(e, "length", {
        get: function () {
          throw Error(
            r
              ? "Invalid Chai property: " +
                  t +
                  '.length. Due to a compatibility issue, "length" cannot directly follow "' +
                  t +
                  '". Use "' +
                  t +
                  '.lengthOf" instead.'
              : "Invalid Chai property: " +
                  t +
                  '.length. See docs for proper usage of "' +
                  t +
                  '".',
          );
        },
      }),
    e
  );
}
x(pn, "addLengthGuard");
function Rf(e) {
  var t = Object.getOwnPropertyNames(e);
  function r(a) {
    t.indexOf(a) === -1 && t.push(a);
  }
  x(r, "addProperty");
  for (var n = Object.getPrototypeOf(e); n !== null; )
    Object.getOwnPropertyNames(n).forEach(r), (n = Object.getPrototypeOf(n));
  return t;
}
x(Rf, "getProperties");
var Gs = ["__flags", "__methods", "_obj", "assert"];
function Ar(e, t) {
  return fn()
    ? new Proxy(e, {
        get: x(function r(n, a) {
          if (
            typeof a == "string" &&
            Ie.proxyExcludedKeys.indexOf(a) === -1 &&
            !Reflect.has(n, a)
          ) {
            if (t)
              throw Error(
                "Invalid Chai property: " +
                  t +
                  "." +
                  a +
                  '. See docs for proper usage of "' +
                  t +
                  '".',
              );
            var o = null,
              i = 4;
            throw (
              (Rf(n).forEach(function (l) {
                if (
                  !Object.prototype.hasOwnProperty(l) &&
                  Gs.indexOf(l) === -1
                ) {
                  var u = Tf(a, l, i);
                  u < i && ((o = l), (i = u));
                }
              }),
              Error(
                o !== null
                  ? "Invalid Chai property: " +
                      a +
                      '. Did you mean "' +
                      o +
                      '"?'
                  : "Invalid Chai property: " + a,
              ))
            );
          }
          return (
            Gs.indexOf(a) === -1 && !J(n, "lockSsfi") && J(n, "ssfi", r),
            Reflect.get(n, a)
          );
        }, "proxyGetter"),
      })
    : e;
}
x(Ar, "proxify");
function Tf(e, t, r) {
  if (Math.abs(e.length - t.length) >= r) return r;
  for (var n = [], a = 0; a <= e.length; a++)
    (n[a] = Array(t.length + 1).fill(0)), (n[a][0] = a);
  for (var o = 0; o < t.length; o++) n[0][o] = o;
  for (var a = 1; a <= e.length; a++)
    for (var i = e.charCodeAt(a - 1), o = 1; o <= t.length; o++) {
      if (Math.abs(a - o) >= r) {
        n[a][o] = r;
        continue;
      }
      n[a][o] = Math.min(
        n[a - 1][o] + 1,
        n[a][o - 1] + 1,
        n[a - 1][o - 1] + (i === t.charCodeAt(o - 1) ? 0 : 1),
      );
    }
  return n[e.length][t.length];
}
x(Tf, "stringDistanceCapped");
function Vi(e, t, r) {
  var n = x(function () {
    J(this, "lockSsfi") || J(this, "ssfi", n);
    var a = r.apply(this, arguments);
    if (a !== void 0) return a;
    var o = new P();
    return Ze(this, o), o;
  }, "methodWrapper");
  pn(n, t, !1), (e[t] = Ar(n, t));
}
x(Vi, "addMethod");
function Gi(e, t, r) {
  var n = Object.getOwnPropertyDescriptor(e, t),
    a = x(function () {}, "_super");
  n && typeof n.get == "function" && (a = n.get),
    Object.defineProperty(e, t, {
      get: x(function o() {
        !fn() && !J(this, "lockSsfi") && J(this, "ssfi", o);
        var i = J(this, "lockSsfi");
        J(this, "lockSsfi", !0);
        var l = r(a).call(this);
        if ((J(this, "lockSsfi", i), l !== void 0)) return l;
        var u = new P();
        return Ze(this, u), u;
      }, "overwritingPropertyGetter"),
      configurable: !0,
    });
}
x(Gi, "overwriteProperty");
function Wi(e, t, r) {
  var n = e[t],
    a = x(function () {
      throw new Error(t + " is not a function");
    }, "_super");
  n && typeof n == "function" && (a = n);
  var o = x(function () {
    J(this, "lockSsfi") || J(this, "ssfi", o);
    var i = J(this, "lockSsfi");
    J(this, "lockSsfi", !0);
    var l = r(a).apply(this, arguments);
    if ((J(this, "lockSsfi", i), l !== void 0)) return l;
    var u = new P();
    return Ze(this, u), u;
  }, "overwritingMethodWrapper");
  pn(o, t, !1), (e[t] = Ar(o, t));
}
x(Wi, "overwriteMethod");
var K1 = typeof Object.setPrototypeOf == "function",
  Ws = x(function () {}, "testFn"),
  Y1 = Object.getOwnPropertyNames(Ws).filter(function (e) {
    var t = Object.getOwnPropertyDescriptor(Ws, e);
    return typeof t != "object" ? !0 : !t.configurable;
  }),
  J1 = Function.prototype.call,
  X1 = Function.prototype.apply;
function Ki(e, t, r, n) {
  typeof n != "function" && (n = x(function () {}, "chainingBehavior"));
  var a = { method: r, chainingBehavior: n };
  e.__methods || (e.__methods = {}),
    (e.__methods[t] = a),
    Object.defineProperty(e, t, {
      get: x(function () {
        a.chainingBehavior.call(this);
        var o = x(function () {
          J(this, "lockSsfi") || J(this, "ssfi", o);
          var u = a.method.apply(this, arguments);
          if (u !== void 0) return u;
          var c = new P();
          return Ze(this, c), c;
        }, "chainableMethodWrapper");
        if ((pn(o, t, !0), K1)) {
          var i = Object.create(this);
          (i.call = J1), (i.apply = X1), Object.setPrototypeOf(o, i);
        } else {
          var l = Object.getOwnPropertyNames(e);
          l.forEach(function (u) {
            if (Y1.indexOf(u) === -1) {
              var c = Object.getOwnPropertyDescriptor(e, u);
              Object.defineProperty(o, u, c);
            }
          });
        }
        return Ze(this, o), Ar(o);
      }, "chainableMethodGetter"),
      configurable: !0,
    });
}
x(Ki, "addChainableMethod");
function Yi(e, t, r, n) {
  var a = e.__methods[t],
    o = a.chainingBehavior;
  a.chainingBehavior = x(function () {
    var l = n(o).call(this);
    if (l !== void 0) return l;
    var u = new P();
    return Ze(this, u), u;
  }, "overwritingChainableMethodGetter");
  var i = a.method;
  a.method = x(function () {
    var l = r(i).apply(this, arguments);
    if (l !== void 0) return l;
    var u = new P();
    return Ze(this, u), u;
  }, "overwritingChainableMethodWrapper");
}
x(Yi, "overwriteChainableMethod");
function Un(e, t) {
  return ee(e) < ee(t) ? -1 : 1;
}
x(Un, "compareByInspect");
function Ji(e) {
  return typeof Object.getOwnPropertySymbols != "function"
    ? []
    : Object.getOwnPropertySymbols(e).filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
}
x(Ji, "getOwnEnumerablePropertySymbols");
function Xi(e) {
  return Object.keys(e).concat(Ji(e));
}
x(Xi, "getOwnEnumerableProperties");
function Sf(e) {
  return e !== e;
}
x(Sf, "_isNaN");
var Hn = Number.isNaN || Sf;
function Pf(e) {
  var t = ce(e),
    r = ["Array", "Object", "Function"];
  return r.indexOf(t) !== -1;
}
x(Pf, "isObjectType");
function Qi(e, t) {
  var r = J(e, "operator"),
    n = J(e, "negate"),
    a = t[3],
    o = n ? t[2] : t[1];
  if (r) return r;
  if (
    (typeof o == "function" && (o = o()),
    (o = o || ""),
    !!o && !/\shave\s/.test(o))
  ) {
    var i = Pf(a);
    return /\snot\s/.test(o)
      ? i
        ? "notDeepStrictEqual"
        : "notStrictEqual"
      : i
        ? "deepStrictEqual"
        : "strictEqual";
  }
}
x(Qi, "getOperator");
function ga(e) {
  return e.name;
}
x(ga, "getName");
function zn(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
x(zn, "isRegExp");
var { flag: A } = nt;
[
  "to",
  "be",
  "been",
  "is",
  "and",
  "has",
  "have",
  "with",
  "that",
  "which",
  "at",
  "of",
  "same",
  "but",
  "does",
  "still",
  "also",
].forEach(function (e) {
  P.addProperty(e);
});
P.addProperty("not", function () {
  A(this, "negate", !0);
});
P.addProperty("deep", function () {
  A(this, "deep", !0);
});
P.addProperty("nested", function () {
  A(this, "nested", !0);
});
P.addProperty("own", function () {
  A(this, "own", !0);
});
P.addProperty("ordered", function () {
  A(this, "ordered", !0);
});
P.addProperty("any", function () {
  A(this, "any", !0), A(this, "all", !1);
});
P.addProperty("all", function () {
  A(this, "all", !0), A(this, "any", !1);
});
var Ks = {
  function: [
    "function",
    "asyncfunction",
    "generatorfunction",
    "asyncgeneratorfunction",
  ],
  asyncfunction: ["asyncfunction", "asyncgeneratorfunction"],
  generatorfunction: ["generatorfunction", "asyncgeneratorfunction"],
  asyncgeneratorfunction: ["asyncgeneratorfunction"],
};
function Zi(e, t) {
  t && A(this, "message", t), (e = e.toLowerCase());
  var r = A(this, "object"),
    n = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0)) ? "an " : "a ";
  let a = ce(r).toLowerCase();
  Ks.function.includes(e)
    ? this.assert(
        Ks[e].includes(a),
        "expected #{this} to be " + n + e,
        "expected #{this} not to be " + n + e,
      )
    : this.assert(
        e === a,
        "expected #{this} to be " + n + e,
        "expected #{this} not to be " + n + e,
      );
}
x(Zi, "an");
P.addChainableMethod("an", Zi);
P.addChainableMethod("a", Zi);
function Of(e, t) {
  return (Hn(e) && Hn(t)) || e === t;
}
x(Of, "SameValueZero");
function hn() {
  A(this, "contains", !0);
}
x(hn, "includeChainingBehavior");
function mn(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = ce(r).toLowerCase(),
    a = A(this, "message"),
    o = A(this, "negate"),
    i = A(this, "ssfi"),
    l = A(this, "deep"),
    u = l ? "deep " : "",
    c = l ? A(this, "eql") : Of;
  a = a ? a + ": " : "";
  var s = !1;
  switch (n) {
    case "string":
      s = r.indexOf(e) !== -1;
      break;
    case "weakset":
      if (l)
        throw new ie(a + "unable to use .deep.include with WeakSet", void 0, i);
      s = r.has(e);
      break;
    case "map":
      r.forEach(function (h) {
        s = s || c(h, e);
      });
      break;
    case "set":
      l
        ? r.forEach(function (h) {
            s = s || c(h, e);
          })
        : (s = r.has(e));
      break;
    case "array":
      l
        ? (s = r.some(function (h) {
            return c(h, e);
          }))
        : (s = r.indexOf(e) !== -1);
      break;
    default:
      if (e !== Object(e))
        throw new ie(
          a +
            "the given combination of arguments (" +
            n +
            " and " +
            ce(e).toLowerCase() +
            ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " +
            ce(e).toLowerCase(),
          void 0,
          i,
        );
      var d = Object.keys(e),
        p = null,
        f = 0;
      if (
        (d.forEach(function (h) {
          var m = new P(r);
          if ((Ze(this, m, !0), A(m, "lockSsfi", !0), !o || d.length === 1)) {
            m.property(h, e[h]);
            return;
          }
          try {
            m.property(h, e[h]);
          } catch (g) {
            if (!ke.compatibleConstructor(g, ie)) throw g;
            p === null && (p = g), f++;
          }
        }, this),
        o && d.length > 1 && f === d.length)
      )
        throw p;
      return;
  }
  this.assert(
    s,
    "expected #{this} to " + u + "include " + ee(e),
    "expected #{this} to not " + u + "include " + ee(e),
  );
}
x(mn, "include");
P.addChainableMethod("include", mn, hn);
P.addChainableMethod("contain", mn, hn);
P.addChainableMethod("contains", mn, hn);
P.addChainableMethod("includes", mn, hn);
P.addProperty("ok", function () {
  this.assert(
    A(this, "object"),
    "expected #{this} to be truthy",
    "expected #{this} to be falsy",
  );
});
P.addProperty("true", function () {
  this.assert(
    A(this, "object") === !0,
    "expected #{this} to be true",
    "expected #{this} to be false",
    !A(this, "negate"),
  );
});
P.addProperty("callable", function () {
  let e = A(this, "object"),
    t = A(this, "ssfi"),
    r = A(this, "message"),
    n = r ? `${r}: ` : "",
    a = A(this, "negate"),
    o = a
      ? `${n}expected ${ee(e)} not to be a callable function`
      : `${n}expected ${ee(e)} to be a callable function`,
    i = [
      "Function",
      "AsyncFunction",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
    ].includes(ce(e));
  if ((i && a) || (!i && !a)) throw new ie(o, void 0, t);
});
P.addProperty("false", function () {
  this.assert(
    A(this, "object") === !1,
    "expected #{this} to be false",
    "expected #{this} to be true",
    !!A(this, "negate"),
  );
});
P.addProperty("null", function () {
  this.assert(
    A(this, "object") === null,
    "expected #{this} to be null",
    "expected #{this} not to be null",
  );
});
P.addProperty("undefined", function () {
  this.assert(
    A(this, "object") === void 0,
    "expected #{this} to be undefined",
    "expected #{this} not to be undefined",
  );
});
P.addProperty("NaN", function () {
  this.assert(
    Hn(A(this, "object")),
    "expected #{this} to be NaN",
    "expected #{this} not to be NaN",
  );
});
function el() {
  var e = A(this, "object");
  this.assert(
    e != null,
    "expected #{this} to exist",
    "expected #{this} to not exist",
  );
}
x(el, "assertExist");
P.addProperty("exist", el);
P.addProperty("exists", el);
P.addProperty("empty", function () {
  var e = A(this, "object"),
    t = A(this, "ssfi"),
    r = A(this, "message"),
    n;
  switch (((r = r ? r + ": " : ""), ce(e).toLowerCase())) {
    case "array":
    case "string":
      n = e.length;
      break;
    case "map":
    case "set":
      n = e.size;
      break;
    case "weakmap":
    case "weakset":
      throw new ie(r + ".empty was passed a weak collection", void 0, t);
    case "function":
      var a = r + ".empty was passed a function " + ga(e);
      throw new ie(a.trim(), void 0, t);
    default:
      if (e !== Object(e))
        throw new ie(
          r + ".empty was passed non-string primitive " + ee(e),
          void 0,
          t,
        );
      n = Object.keys(e).length;
  }
  this.assert(
    n === 0,
    "expected #{this} to be empty",
    "expected #{this} not to be empty",
  );
});
function tl() {
  var e = A(this, "object"),
    t = ce(e);
  this.assert(
    t === "Arguments",
    "expected #{this} to be arguments but got " + t,
    "expected #{this} to not be arguments",
  );
}
x(tl, "checkArguments");
P.addProperty("arguments", tl);
P.addProperty("Arguments", tl);
function ya(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object");
  if (A(this, "deep")) {
    var n = A(this, "lockSsfi");
    A(this, "lockSsfi", !0), this.eql(e), A(this, "lockSsfi", n);
  } else
    this.assert(
      e === r,
      "expected #{this} to equal #{exp}",
      "expected #{this} to not equal #{exp}",
      e,
      this._obj,
      !0,
    );
}
x(ya, "assertEqual");
P.addMethod("equal", ya);
P.addMethod("equals", ya);
P.addMethod("eq", ya);
function rl(e, t) {
  t && A(this, "message", t);
  var r = A(this, "eql");
  this.assert(
    r(e, A(this, "object")),
    "expected #{this} to deeply equal #{exp}",
    "expected #{this} to not deeply equal #{exp}",
    e,
    this._obj,
    !0,
  );
}
x(rl, "assertEql");
P.addMethod("eql", rl);
P.addMethod("eqls", rl);
function va(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "doLength"),
    a = A(this, "message"),
    o = a ? a + ": " : "",
    i = A(this, "ssfi"),
    l = ce(r).toLowerCase(),
    u = ce(e).toLowerCase(),
    c,
    s = !0;
  if (
    (n &&
      l !== "map" &&
      l !== "set" &&
      new P(r, a, i, !0).to.have.property("length"),
    !n && l === "date" && u !== "date")
  )
    c = o + "the argument to above must be a date";
  else if (u !== "number" && (n || l === "number"))
    c = o + "the argument to above must be a number";
  else if (!n && l !== "date" && l !== "number") {
    var d = l === "string" ? "'" + r + "'" : r;
    c = o + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ie(c, void 0, i);
  if (n) {
    var p = "length",
      f;
    l === "map" || l === "set" ? ((p = "size"), (f = r.size)) : (f = r.length),
      this.assert(
        f > e,
        "expected #{this} to have a " + p + " above #{exp} but got #{act}",
        "expected #{this} to not have a " + p + " above #{exp}",
        e,
        f,
      );
  } else
    this.assert(
      r > e,
      "expected #{this} to be above #{exp}",
      "expected #{this} to be at most #{exp}",
      e,
    );
}
x(va, "assertAbove");
P.addMethod("above", va);
P.addMethod("gt", va);
P.addMethod("greaterThan", va);
function _a(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "doLength"),
    a = A(this, "message"),
    o = a ? a + ": " : "",
    i = A(this, "ssfi"),
    l = ce(r).toLowerCase(),
    u = ce(e).toLowerCase(),
    c,
    s = !0;
  if (
    (n &&
      l !== "map" &&
      l !== "set" &&
      new P(r, a, i, !0).to.have.property("length"),
    !n && l === "date" && u !== "date")
  )
    c = o + "the argument to least must be a date";
  else if (u !== "number" && (n || l === "number"))
    c = o + "the argument to least must be a number";
  else if (!n && l !== "date" && l !== "number") {
    var d = l === "string" ? "'" + r + "'" : r;
    c = o + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ie(c, void 0, i);
  if (n) {
    var p = "length",
      f;
    l === "map" || l === "set" ? ((p = "size"), (f = r.size)) : (f = r.length),
      this.assert(
        f >= e,
        "expected #{this} to have a " + p + " at least #{exp} but got #{act}",
        "expected #{this} to have a " + p + " below #{exp}",
        e,
        f,
      );
  } else
    this.assert(
      r >= e,
      "expected #{this} to be at least #{exp}",
      "expected #{this} to be below #{exp}",
      e,
    );
}
x(_a, "assertLeast");
P.addMethod("least", _a);
P.addMethod("gte", _a);
P.addMethod("greaterThanOrEqual", _a);
function Ea(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "doLength"),
    a = A(this, "message"),
    o = a ? a + ": " : "",
    i = A(this, "ssfi"),
    l = ce(r).toLowerCase(),
    u = ce(e).toLowerCase(),
    c,
    s = !0;
  if (
    (n &&
      l !== "map" &&
      l !== "set" &&
      new P(r, a, i, !0).to.have.property("length"),
    !n && l === "date" && u !== "date")
  )
    c = o + "the argument to below must be a date";
  else if (u !== "number" && (n || l === "number"))
    c = o + "the argument to below must be a number";
  else if (!n && l !== "date" && l !== "number") {
    var d = l === "string" ? "'" + r + "'" : r;
    c = o + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ie(c, void 0, i);
  if (n) {
    var p = "length",
      f;
    l === "map" || l === "set" ? ((p = "size"), (f = r.size)) : (f = r.length),
      this.assert(
        f < e,
        "expected #{this} to have a " + p + " below #{exp} but got #{act}",
        "expected #{this} to not have a " + p + " below #{exp}",
        e,
        f,
      );
  } else
    this.assert(
      r < e,
      "expected #{this} to be below #{exp}",
      "expected #{this} to be at least #{exp}",
      e,
    );
}
x(Ea, "assertBelow");
P.addMethod("below", Ea);
P.addMethod("lt", Ea);
P.addMethod("lessThan", Ea);
function wa(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "doLength"),
    a = A(this, "message"),
    o = a ? a + ": " : "",
    i = A(this, "ssfi"),
    l = ce(r).toLowerCase(),
    u = ce(e).toLowerCase(),
    c,
    s = !0;
  if (
    (n &&
      l !== "map" &&
      l !== "set" &&
      new P(r, a, i, !0).to.have.property("length"),
    !n && l === "date" && u !== "date")
  )
    c = o + "the argument to most must be a date";
  else if (u !== "number" && (n || l === "number"))
    c = o + "the argument to most must be a number";
  else if (!n && l !== "date" && l !== "number") {
    var d = l === "string" ? "'" + r + "'" : r;
    c = o + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ie(c, void 0, i);
  if (n) {
    var p = "length",
      f;
    l === "map" || l === "set" ? ((p = "size"), (f = r.size)) : (f = r.length),
      this.assert(
        f <= e,
        "expected #{this} to have a " + p + " at most #{exp} but got #{act}",
        "expected #{this} to have a " + p + " above #{exp}",
        e,
        f,
      );
  } else
    this.assert(
      r <= e,
      "expected #{this} to be at most #{exp}",
      "expected #{this} to be above #{exp}",
      e,
    );
}
x(wa, "assertMost");
P.addMethod("most", wa);
P.addMethod("lte", wa);
P.addMethod("lessThanOrEqual", wa);
P.addMethod("within", function (e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "doLength"),
    o = A(this, "message"),
    i = o ? o + ": " : "",
    l = A(this, "ssfi"),
    u = ce(n).toLowerCase(),
    c = ce(e).toLowerCase(),
    s = ce(t).toLowerCase(),
    d,
    p = !0,
    f =
      c === "date" && s === "date"
        ? e.toISOString() + ".." + t.toISOString()
        : e + ".." + t;
  if (
    (a &&
      u !== "map" &&
      u !== "set" &&
      new P(n, o, l, !0).to.have.property("length"),
    !a && u === "date" && (c !== "date" || s !== "date"))
  )
    d = i + "the arguments to within must be dates";
  else if ((c !== "number" || s !== "number") && (a || u === "number"))
    d = i + "the arguments to within must be numbers";
  else if (!a && u !== "date" && u !== "number") {
    var h = u === "string" ? "'" + n + "'" : n;
    d = i + "expected " + h + " to be a number or a date";
  } else p = !1;
  if (p) throw new ie(d, void 0, l);
  if (a) {
    var m = "length",
      g;
    u === "map" || u === "set" ? ((m = "size"), (g = n.size)) : (g = n.length),
      this.assert(
        g >= e && g <= t,
        "expected #{this} to have a " + m + " within " + f,
        "expected #{this} to not have a " + m + " within " + f,
      );
  } else
    this.assert(
      n >= e && n <= t,
      "expected #{this} to be within " + f,
      "expected #{this} to not be within " + f,
    );
});
function nl(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "ssfi"),
    a = A(this, "message");
  try {
    var o = r instanceof e;
  } catch (l) {
    throw l instanceof TypeError
      ? ((a = a ? a + ": " : ""),
        new ie(
          a +
            "The instanceof assertion needs a constructor but " +
            ce(e) +
            " was given.",
          void 0,
          n,
        ))
      : l;
  }
  var i = ga(e);
  i == null && (i = "an unnamed constructor"),
    this.assert(
      o,
      "expected #{this} to be an instance of " + i,
      "expected #{this} to not be an instance of " + i,
    );
}
x(nl, "assertInstanceOf");
P.addMethod("instanceof", nl);
P.addMethod("instanceOf", nl);
function al(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "nested"),
    a = A(this, "own"),
    o = A(this, "message"),
    i = A(this, "object"),
    l = A(this, "ssfi"),
    u = typeof e;
  if (((o = o ? o + ": " : ""), n)) {
    if (u !== "string")
      throw new ie(
        o +
          "the argument to property must be a string when using nested syntax",
        void 0,
        l,
      );
  } else if (u !== "string" && u !== "number" && u !== "symbol")
    throw new ie(
      o + "the argument to property must be a string, number, or symbol",
      void 0,
      l,
    );
  if (n && a)
    throw new ie(
      o + 'The "nested" and "own" flags cannot be combined.',
      void 0,
      l,
    );
  if (i == null)
    throw new ie(o + "Target cannot be null or undefined.", void 0, l);
  var c = A(this, "deep"),
    s = A(this, "negate"),
    d = n ? Hi(i, e) : null,
    p = n ? d.value : i[e],
    f = c ? A(this, "eql") : (g, b) => g === b,
    h = "";
  c && (h += "deep "),
    a && (h += "own "),
    n && (h += "nested "),
    (h += "property ");
  var m;
  a
    ? (m = Object.prototype.hasOwnProperty.call(i, e))
    : n
      ? (m = d.exists)
      : (m = ba(i, e)),
    (!s || arguments.length === 1) &&
      this.assert(
        m,
        "expected #{this} to have " + h + ee(e),
        "expected #{this} to not have " + h + ee(e),
      ),
    arguments.length > 1 &&
      this.assert(
        m && f(t, p),
        "expected #{this} to have " + h + ee(e) + " of #{exp}, but got #{act}",
        "expected #{this} to not have " + h + ee(e) + " of #{act}",
        t,
        p,
      ),
    A(this, "object", p);
}
x(al, "assertProperty");
P.addMethod("property", al);
function ol(e, t, r) {
  A(this, "own", !0), al.apply(this, arguments);
}
x(ol, "assertOwnProperty");
P.addMethod("ownProperty", ol);
P.addMethod("haveOwnProperty", ol);
function il(e, t, r) {
  typeof t == "string" && ((r = t), (t = null)), r && A(this, "message", r);
  var n = A(this, "object"),
    a = Object.getOwnPropertyDescriptor(Object(n), e),
    o = A(this, "eql");
  a && t
    ? this.assert(
        o(t, a),
        "expected the own property descriptor for " +
          ee(e) +
          " on #{this} to match " +
          ee(t) +
          ", got " +
          ee(a),
        "expected the own property descriptor for " +
          ee(e) +
          " on #{this} to not match " +
          ee(t),
        t,
        a,
        !0,
      )
    : this.assert(
        a,
        "expected #{this} to have an own property descriptor for " + ee(e),
        "expected #{this} to not have an own property descriptor for " + ee(e),
      ),
    A(this, "object", a);
}
x(il, "assertOwnPropertyDescriptor");
P.addMethod("ownPropertyDescriptor", il);
P.addMethod("haveOwnPropertyDescriptor", il);
function ll() {
  A(this, "doLength", !0);
}
x(ll, "assertLengthChain");
function sl(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = ce(r).toLowerCase(),
    a = A(this, "message"),
    o = A(this, "ssfi"),
    i = "length",
    l;
  switch (n) {
    case "map":
    case "set":
      (i = "size"), (l = r.size);
      break;
    default:
      new P(r, a, o, !0).to.have.property("length"), (l = r.length);
  }
  this.assert(
    l == e,
    "expected #{this} to have a " + i + " of #{exp} but got #{act}",
    "expected #{this} to not have a " + i + " of #{act}",
    e,
    l,
  );
}
x(sl, "assertLength");
P.addChainableMethod("length", sl, ll);
P.addChainableMethod("lengthOf", sl, ll);
function ul(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object");
  this.assert(
    e.exec(r),
    "expected #{this} to match " + e,
    "expected #{this} not to match " + e,
  );
}
x(ul, "assertMatch");
P.addMethod("match", ul);
P.addMethod("matches", ul);
P.addMethod("string", function (e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "message"),
    a = A(this, "ssfi");
  new P(r, n, a, !0).is.a("string"),
    this.assert(
      ~r.indexOf(e),
      "expected #{this} to contain " + ee(e),
      "expected #{this} to not contain " + ee(e),
    );
});
function cl(e) {
  var t = A(this, "object"),
    r = ce(t),
    n = ce(e),
    a = A(this, "ssfi"),
    o = A(this, "deep"),
    i,
    l = "",
    u,
    c = !0,
    s = A(this, "message");
  s = s ? s + ": " : "";
  var d =
    s +
    "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
  if (r === "Map" || r === "Set")
    (l = o ? "deeply " : ""),
      (u = []),
      t.forEach(function (y, R) {
        u.push(R);
      }),
      n !== "Array" && (e = Array.prototype.slice.call(arguments));
  else {
    switch (((u = Xi(t)), n)) {
      case "Array":
        if (arguments.length > 1) throw new ie(d, void 0, a);
        break;
      case "Object":
        if (arguments.length > 1) throw new ie(d, void 0, a);
        e = Object.keys(e);
        break;
      default:
        e = Array.prototype.slice.call(arguments);
    }
    e = e.map(function (y) {
      return typeof y == "symbol" ? y : String(y);
    });
  }
  if (!e.length) throw new ie(s + "keys required", void 0, a);
  var p = e.length,
    f = A(this, "any"),
    h = A(this, "all"),
    m = e,
    g = o ? A(this, "eql") : (y, R) => y === R;
  if (
    (!f && !h && (h = !0),
    f &&
      (c = m.some(function (y) {
        return u.some(function (R) {
          return g(y, R);
        });
      })),
    h &&
      ((c = m.every(function (y) {
        return u.some(function (R) {
          return g(y, R);
        });
      })),
      A(this, "contains") || (c = c && e.length == u.length)),
    p > 1)
  ) {
    e = e.map(function (y) {
      return ee(y);
    });
    var b = e.pop();
    h && (i = e.join(", ") + ", and " + b),
      f && (i = e.join(", ") + ", or " + b);
  } else i = ee(e[0]);
  (i = (p > 1 ? "keys " : "key ") + i),
    (i = (A(this, "contains") ? "contain " : "have ") + i),
    this.assert(
      c,
      "expected #{this} to " + l + i,
      "expected #{this} to not " + l + i,
      m.slice(0).sort(Un),
      u.sort(Un),
      !0,
    );
}
x(cl, "assertKeys");
P.addMethod("keys", cl);
P.addMethod("key", cl);
function Ca(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "ssfi"),
    o = A(this, "message"),
    i = A(this, "negate") || !1;
  new P(n, o, a, !0).is.a("function"),
    (zn(e) || typeof e == "string") && ((t = e), (e = null));
  let l,
    u = !1;
  try {
    n();
  } catch (y) {
    (u = !0), (l = y);
  }
  var c = e === void 0 && t === void 0,
    s = !!(e && t),
    d = !1,
    p = !1;
  if (c || (!c && !i)) {
    var f = "an error";
    e instanceof Error ? (f = "#{exp}") : e && (f = ke.getConstructorName(e));
    let y = l;
    if (l instanceof Error) y = l.toString();
    else if (typeof l == "string") y = l;
    else if (l && (typeof l == "object" || typeof l == "function"))
      try {
        y = ke.getConstructorName(l);
      } catch {}
    this.assert(
      u,
      "expected #{this} to throw " + f,
      "expected #{this} to not throw an error but #{act} was thrown",
      e && e.toString(),
      y,
    );
  }
  if (e && l) {
    if (e instanceof Error) {
      var h = ke.compatibleInstance(l, e);
      h === i &&
        (s && i
          ? (d = !0)
          : this.assert(
              i,
              "expected #{this} to throw #{exp} but #{act} was thrown",
              "expected #{this} to not throw #{exp}" +
                (l && !i ? " but #{act} was thrown" : ""),
              e.toString(),
              l.toString(),
            ));
    }
    var m = ke.compatibleConstructor(l, e);
    m === i &&
      (s && i
        ? (d = !0)
        : this.assert(
            i,
            "expected #{this} to throw #{exp} but #{act} was thrown",
            "expected #{this} to not throw #{exp}" +
              (l ? " but #{act} was thrown" : ""),
            e instanceof Error ? e.toString() : e && ke.getConstructorName(e),
            l instanceof Error ? l.toString() : l && ke.getConstructorName(l),
          ));
  }
  if (l && t !== void 0 && t !== null) {
    var g = "including";
    zn(t) && (g = "matching");
    var b = ke.compatibleMessage(l, t);
    b === i &&
      (s && i
        ? (p = !0)
        : this.assert(
            i,
            "expected #{this} to throw error " + g + " #{exp} but got #{act}",
            "expected #{this} to throw error not " + g + " #{exp}",
            t,
            ke.getMessage(l),
          ));
  }
  d &&
    p &&
    this.assert(
      i,
      "expected #{this} to throw #{exp} but #{act} was thrown",
      "expected #{this} to not throw #{exp}" +
        (l ? " but #{act} was thrown" : ""),
      e instanceof Error ? e.toString() : e && ke.getConstructorName(e),
      l instanceof Error ? l.toString() : l && ke.getConstructorName(l),
    ),
    A(this, "object", l);
}
x(Ca, "assertThrows");
P.addMethod("throw", Ca);
P.addMethod("throws", Ca);
P.addMethod("Throw", Ca);
function dl(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "itself"),
    a = typeof r == "function" && !n ? r.prototype[e] : r[e];
  this.assert(
    typeof a == "function",
    "expected #{this} to respond to " + ee(e),
    "expected #{this} to not respond to " + ee(e),
  );
}
x(dl, "respondTo");
P.addMethod("respondTo", dl);
P.addMethod("respondsTo", dl);
P.addProperty("itself", function () {
  A(this, "itself", !0);
});
function fl(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = e(r);
  this.assert(
    n,
    "expected #{this} to satisfy " + Ut(e),
    "expected #{this} to not satisfy" + Ut(e),
    !A(this, "negate"),
    n,
  );
}
x(fl, "satisfy");
P.addMethod("satisfy", fl);
P.addMethod("satisfies", fl);
function pl(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "message"),
    o = A(this, "ssfi");
  if (
    (new P(n, a, o, !0).is.a("number"),
    typeof e != "number" || typeof t != "number")
  ) {
    a = a ? a + ": " : "";
    var i = t === void 0 ? ", and a delta is required" : "";
    throw new ie(
      a + "the arguments to closeTo or approximately must be numbers" + i,
      void 0,
      o,
    );
  }
  this.assert(
    Math.abs(n - e) <= t,
    "expected #{this} to be close to " + e + " +/- " + t,
    "expected #{this} not to be close to " + e + " +/- " + t,
  );
}
x(pl, "closeTo");
P.addMethod("closeTo", pl);
P.addMethod("approximately", pl);
function Af(e, t, r, n, a) {
  let o = Array.from(t),
    i = Array.from(e);
  if (!n) {
    if (i.length !== o.length) return !1;
    o = o.slice();
  }
  return i.every(function (l, u) {
    if (a) return r ? r(l, o[u]) : l === o[u];
    if (!r) {
      var c = o.indexOf(l);
      return c === -1 ? !1 : (n || o.splice(c, 1), !0);
    }
    return o.some(function (s, d) {
      return r(l, s) ? (n || o.splice(d, 1), !0) : !1;
    });
  });
}
x(Af, "isSubsetOf");
P.addMethod("members", function (e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "message"),
    a = A(this, "ssfi");
  new P(r, n, a, !0).to.be.iterable, new P(e, n, a, !0).to.be.iterable;
  var o = A(this, "contains"),
    i = A(this, "ordered"),
    l,
    u,
    c;
  o
    ? ((l = i ? "an ordered superset" : "a superset"),
      (u = "expected #{this} to be " + l + " of #{exp}"),
      (c = "expected #{this} to not be " + l + " of #{exp}"))
    : ((l = i ? "ordered members" : "members"),
      (u = "expected #{this} to have the same " + l + " as #{exp}"),
      (c = "expected #{this} to not have the same " + l + " as #{exp}"));
  var s = A(this, "deep") ? A(this, "eql") : void 0;
  this.assert(Af(e, r, s, o, i), u, c, e, r, !0);
});
P.addProperty("iterable", function (e) {
  e && A(this, "message", e);
  var t = A(this, "object");
  this.assert(
    t != null && t[Symbol.iterator],
    "expected #{this} to be an iterable",
    "expected #{this} to not be an iterable",
    t,
  );
});
function qf(e, t) {
  t && A(this, "message", t);
  var r = A(this, "object"),
    n = A(this, "message"),
    a = A(this, "ssfi"),
    o = A(this, "contains"),
    i = A(this, "deep"),
    l = A(this, "eql");
  new P(e, n, a, !0).to.be.an("array"),
    o
      ? this.assert(
          e.some(function (u) {
            return r.indexOf(u) > -1;
          }),
          "expected #{this} to contain one of #{exp}",
          "expected #{this} to not contain one of #{exp}",
          e,
          r,
        )
      : i
        ? this.assert(
            e.some(function (u) {
              return l(r, u);
            }),
            "expected #{this} to deeply equal one of #{exp}",
            "expected #{this} to deeply equal one of #{exp}",
            e,
            r,
          )
        : this.assert(
            e.indexOf(r) > -1,
            "expected #{this} to be one of #{exp}",
            "expected #{this} to not be one of #{exp}",
            e,
            r,
          );
}
x(qf, "oneOf");
P.addMethod("oneOf", qf);
function hl(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "message"),
    o = A(this, "ssfi");
  new P(n, a, o, !0).is.a("function");
  var i;
  t
    ? (new P(e, a, o, !0).to.have.property(t), (i = e[t]))
    : (new P(e, a, o, !0).is.a("function"), (i = e())),
    n();
  var l = t == null ? e() : e[t],
    u = t == null ? i : "." + t;
  A(this, "deltaMsgObj", u),
    A(this, "initialDeltaValue", i),
    A(this, "finalDeltaValue", l),
    A(this, "deltaBehavior", "change"),
    A(this, "realDelta", l !== i),
    this.assert(
      i !== l,
      "expected " + u + " to change",
      "expected " + u + " to not change",
    );
}
x(hl, "assertChanges");
P.addMethod("change", hl);
P.addMethod("changes", hl);
function ml(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "message"),
    o = A(this, "ssfi");
  new P(n, a, o, !0).is.a("function");
  var i;
  t
    ? (new P(e, a, o, !0).to.have.property(t), (i = e[t]))
    : (new P(e, a, o, !0).is.a("function"), (i = e())),
    new P(i, a, o, !0).is.a("number"),
    n();
  var l = t == null ? e() : e[t],
    u = t == null ? i : "." + t;
  A(this, "deltaMsgObj", u),
    A(this, "initialDeltaValue", i),
    A(this, "finalDeltaValue", l),
    A(this, "deltaBehavior", "increase"),
    A(this, "realDelta", l - i),
    this.assert(
      l - i > 0,
      "expected " + u + " to increase",
      "expected " + u + " to not increase",
    );
}
x(ml, "assertIncreases");
P.addMethod("increase", ml);
P.addMethod("increases", ml);
function bl(e, t, r) {
  r && A(this, "message", r);
  var n = A(this, "object"),
    a = A(this, "message"),
    o = A(this, "ssfi");
  new P(n, a, o, !0).is.a("function");
  var i;
  t
    ? (new P(e, a, o, !0).to.have.property(t), (i = e[t]))
    : (new P(e, a, o, !0).is.a("function"), (i = e())),
    new P(i, a, o, !0).is.a("number"),
    n();
  var l = t == null ? e() : e[t],
    u = t == null ? i : "." + t;
  A(this, "deltaMsgObj", u),
    A(this, "initialDeltaValue", i),
    A(this, "finalDeltaValue", l),
    A(this, "deltaBehavior", "decrease"),
    A(this, "realDelta", i - l),
    this.assert(
      l - i < 0,
      "expected " + u + " to decrease",
      "expected " + u + " to not decrease",
    );
}
x(bl, "assertDecreases");
P.addMethod("decrease", bl);
P.addMethod("decreases", bl);
function xf(e, t) {
  t && A(this, "message", t);
  var r = A(this, "deltaMsgObj"),
    n = A(this, "initialDeltaValue"),
    a = A(this, "finalDeltaValue"),
    o = A(this, "deltaBehavior"),
    i = A(this, "realDelta"),
    l;
  o === "change"
    ? (l = Math.abs(a - n) === Math.abs(e))
    : (l = i === Math.abs(e)),
    this.assert(
      l,
      "expected " + r + " to " + o + " by " + e,
      "expected " + r + " to not " + o + " by " + e,
    );
}
x(xf, "assertDelta");
P.addMethod("by", xf);
P.addProperty("extensible", function () {
  var e = A(this, "object"),
    t = e === Object(e) && Object.isExtensible(e);
  this.assert(
    t,
    "expected #{this} to be extensible",
    "expected #{this} to not be extensible",
  );
});
P.addProperty("sealed", function () {
  var e = A(this, "object"),
    t = e === Object(e) ? Object.isSealed(e) : !0;
  this.assert(
    t,
    "expected #{this} to be sealed",
    "expected #{this} to not be sealed",
  );
});
P.addProperty("frozen", function () {
  var e = A(this, "object"),
    t = e === Object(e) ? Object.isFrozen(e) : !0;
  this.assert(
    t,
    "expected #{this} to be frozen",
    "expected #{this} to not be frozen",
  );
});
P.addProperty("finite", function (e) {
  var t = A(this, "object");
  this.assert(
    typeof t == "number" && isFinite(t),
    "expected #{this} to be a finite number",
    "expected #{this} to not be a finite number",
  );
});
function Ht(e, t) {
  return new P(e, t);
}
x(Ht, "expect");
Ht.fail = function (e, t, r, n) {
  throw (
    (arguments.length < 2 && ((r = e), (e = void 0)),
    (r = r || "expect.fail()"),
    new ie(r, { actual: e, expected: t, operator: n }, Ht.fail))
  );
};
var Mf = {};
Ii(Mf, { Should: () => Z1, should: () => Q1 });
function gl() {
  function e() {
    return this instanceof String ||
      this instanceof Number ||
      this instanceof Boolean ||
      (typeof Symbol == "function" && this instanceof Symbol) ||
      (typeof BigInt == "function" && this instanceof BigInt)
      ? new P(this.valueOf(), null, e)
      : new P(this, null, e);
  }
  x(e, "shouldGetter");
  function t(n) {
    Object.defineProperty(this, "should", {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0,
    });
  }
  x(t, "shouldSetter"),
    Object.defineProperty(Object.prototype, "should", {
      set: t,
      get: e,
      configurable: !0,
    });
  var r = {};
  return (
    (r.fail = function (n, a, o, i) {
      throw (
        (arguments.length < 2 && ((o = n), (n = void 0)),
        (o = o || "should.fail()"),
        new ie(o, { actual: n, expected: a, operator: i }, r.fail))
      );
    }),
    (r.equal = function (n, a, o) {
      new P(n, o).to.equal(a);
    }),
    (r.Throw = function (n, a, o, i) {
      new P(n, i).to.Throw(a, o);
    }),
    (r.exist = function (n, a) {
      new P(n, a).to.exist;
    }),
    (r.not = {}),
    (r.not.equal = function (n, a, o) {
      new P(n, o).to.not.equal(a);
    }),
    (r.not.Throw = function (n, a, o, i) {
      new P(n, i).to.not.Throw(a, o);
    }),
    (r.not.exist = function (n, a) {
      new P(n, a).to.not.exist;
    }),
    (r.throw = r.Throw),
    (r.not.throw = r.not.Throw),
    r
  );
}
x(gl, "loadShould");
var Q1 = gl,
  Z1 = gl;
function S(e, t) {
  var r = new P(null, null, S, !0);
  r.assert(e, t, "[ negation message unavailable ]");
}
x(S, "assert");
S.fail = function (e, t, r, n) {
  throw (
    (arguments.length < 2 && ((r = e), (e = void 0)),
    (r = r || "assert.fail()"),
    new ie(r, { actual: e, expected: t, operator: n }, S.fail))
  );
};
S.isOk = function (e, t) {
  new P(e, t, S.isOk, !0).is.ok;
};
S.isNotOk = function (e, t) {
  new P(e, t, S.isNotOk, !0).is.not.ok;
};
S.equal = function (e, t, r) {
  var n = new P(e, r, S.equal, !0);
  n.assert(
    t == J(n, "object"),
    "expected #{this} to equal #{exp}",
    "expected #{this} to not equal #{act}",
    t,
    e,
    !0,
  );
};
S.notEqual = function (e, t, r) {
  var n = new P(e, r, S.notEqual, !0);
  n.assert(
    t != J(n, "object"),
    "expected #{this} to not equal #{exp}",
    "expected #{this} to equal #{act}",
    t,
    e,
    !0,
  );
};
S.strictEqual = function (e, t, r) {
  new P(e, r, S.strictEqual, !0).to.equal(t);
};
S.notStrictEqual = function (e, t, r) {
  new P(e, r, S.notStrictEqual, !0).to.not.equal(t);
};
S.deepEqual = S.deepStrictEqual = function (e, t, r) {
  new P(e, r, S.deepEqual, !0).to.eql(t);
};
S.notDeepEqual = function (e, t, r) {
  new P(e, r, S.notDeepEqual, !0).to.not.eql(t);
};
S.isAbove = function (e, t, r) {
  new P(e, r, S.isAbove, !0).to.be.above(t);
};
S.isAtLeast = function (e, t, r) {
  new P(e, r, S.isAtLeast, !0).to.be.least(t);
};
S.isBelow = function (e, t, r) {
  new P(e, r, S.isBelow, !0).to.be.below(t);
};
S.isAtMost = function (e, t, r) {
  new P(e, r, S.isAtMost, !0).to.be.most(t);
};
S.isTrue = function (e, t) {
  new P(e, t, S.isTrue, !0).is.true;
};
S.isNotTrue = function (e, t) {
  new P(e, t, S.isNotTrue, !0).to.not.equal(!0);
};
S.isFalse = function (e, t) {
  new P(e, t, S.isFalse, !0).is.false;
};
S.isNotFalse = function (e, t) {
  new P(e, t, S.isNotFalse, !0).to.not.equal(!1);
};
S.isNull = function (e, t) {
  new P(e, t, S.isNull, !0).to.equal(null);
};
S.isNotNull = function (e, t) {
  new P(e, t, S.isNotNull, !0).to.not.equal(null);
};
S.isNaN = function (e, t) {
  new P(e, t, S.isNaN, !0).to.be.NaN;
};
S.isNotNaN = function (e, t) {
  new P(e, t, S.isNotNaN, !0).not.to.be.NaN;
};
S.exists = function (e, t) {
  new P(e, t, S.exists, !0).to.exist;
};
S.notExists = function (e, t) {
  new P(e, t, S.notExists, !0).to.not.exist;
};
S.isUndefined = function (e, t) {
  new P(e, t, S.isUndefined, !0).to.equal(void 0);
};
S.isDefined = function (e, t) {
  new P(e, t, S.isDefined, !0).to.not.equal(void 0);
};
S.isCallable = function (e, t) {
  new P(e, t, S.isCallable, !0).is.callable;
};
S.isNotCallable = function (e, t) {
  new P(e, t, S.isNotCallable, !0).is.not.callable;
};
S.isObject = function (e, t) {
  new P(e, t, S.isObject, !0).to.be.a("object");
};
S.isNotObject = function (e, t) {
  new P(e, t, S.isNotObject, !0).to.not.be.a("object");
};
S.isArray = function (e, t) {
  new P(e, t, S.isArray, !0).to.be.an("array");
};
S.isNotArray = function (e, t) {
  new P(e, t, S.isNotArray, !0).to.not.be.an("array");
};
S.isString = function (e, t) {
  new P(e, t, S.isString, !0).to.be.a("string");
};
S.isNotString = function (e, t) {
  new P(e, t, S.isNotString, !0).to.not.be.a("string");
};
S.isNumber = function (e, t) {
  new P(e, t, S.isNumber, !0).to.be.a("number");
};
S.isNotNumber = function (e, t) {
  new P(e, t, S.isNotNumber, !0).to.not.be.a("number");
};
S.isFinite = function (e, t) {
  new P(e, t, S.isFinite, !0).to.be.finite;
};
S.isBoolean = function (e, t) {
  new P(e, t, S.isBoolean, !0).to.be.a("boolean");
};
S.isNotBoolean = function (e, t) {
  new P(e, t, S.isNotBoolean, !0).to.not.be.a("boolean");
};
S.typeOf = function (e, t, r) {
  new P(e, r, S.typeOf, !0).to.be.a(t);
};
S.notTypeOf = function (e, t, r) {
  new P(e, r, S.notTypeOf, !0).to.not.be.a(t);
};
S.instanceOf = function (e, t, r) {
  new P(e, r, S.instanceOf, !0).to.be.instanceOf(t);
};
S.notInstanceOf = function (e, t, r) {
  new P(e, r, S.notInstanceOf, !0).to.not.be.instanceOf(t);
};
S.include = function (e, t, r) {
  new P(e, r, S.include, !0).include(t);
};
S.notInclude = function (e, t, r) {
  new P(e, r, S.notInclude, !0).not.include(t);
};
S.deepInclude = function (e, t, r) {
  new P(e, r, S.deepInclude, !0).deep.include(t);
};
S.notDeepInclude = function (e, t, r) {
  new P(e, r, S.notDeepInclude, !0).not.deep.include(t);
};
S.nestedInclude = function (e, t, r) {
  new P(e, r, S.nestedInclude, !0).nested.include(t);
};
S.notNestedInclude = function (e, t, r) {
  new P(e, r, S.notNestedInclude, !0).not.nested.include(t);
};
S.deepNestedInclude = function (e, t, r) {
  new P(e, r, S.deepNestedInclude, !0).deep.nested.include(t);
};
S.notDeepNestedInclude = function (e, t, r) {
  new P(e, r, S.notDeepNestedInclude, !0).not.deep.nested.include(t);
};
S.ownInclude = function (e, t, r) {
  new P(e, r, S.ownInclude, !0).own.include(t);
};
S.notOwnInclude = function (e, t, r) {
  new P(e, r, S.notOwnInclude, !0).not.own.include(t);
};
S.deepOwnInclude = function (e, t, r) {
  new P(e, r, S.deepOwnInclude, !0).deep.own.include(t);
};
S.notDeepOwnInclude = function (e, t, r) {
  new P(e, r, S.notDeepOwnInclude, !0).not.deep.own.include(t);
};
S.match = function (e, t, r) {
  new P(e, r, S.match, !0).to.match(t);
};
S.notMatch = function (e, t, r) {
  new P(e, r, S.notMatch, !0).to.not.match(t);
};
S.property = function (e, t, r) {
  new P(e, r, S.property, !0).to.have.property(t);
};
S.notProperty = function (e, t, r) {
  new P(e, r, S.notProperty, !0).to.not.have.property(t);
};
S.propertyVal = function (e, t, r, n) {
  new P(e, n, S.propertyVal, !0).to.have.property(t, r);
};
S.notPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notPropertyVal, !0).to.not.have.property(t, r);
};
S.deepPropertyVal = function (e, t, r, n) {
  new P(e, n, S.deepPropertyVal, !0).to.have.deep.property(t, r);
};
S.notDeepPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notDeepPropertyVal, !0).to.not.have.deep.property(t, r);
};
S.ownProperty = function (e, t, r) {
  new P(e, r, S.ownProperty, !0).to.have.own.property(t);
};
S.notOwnProperty = function (e, t, r) {
  new P(e, r, S.notOwnProperty, !0).to.not.have.own.property(t);
};
S.ownPropertyVal = function (e, t, r, n) {
  new P(e, n, S.ownPropertyVal, !0).to.have.own.property(t, r);
};
S.notOwnPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notOwnPropertyVal, !0).to.not.have.own.property(t, r);
};
S.deepOwnPropertyVal = function (e, t, r, n) {
  new P(e, n, S.deepOwnPropertyVal, !0).to.have.deep.own.property(t, r);
};
S.notDeepOwnPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notDeepOwnPropertyVal, !0).to.not.have.deep.own.property(t, r);
};
S.nestedProperty = function (e, t, r) {
  new P(e, r, S.nestedProperty, !0).to.have.nested.property(t);
};
S.notNestedProperty = function (e, t, r) {
  new P(e, r, S.notNestedProperty, !0).to.not.have.nested.property(t);
};
S.nestedPropertyVal = function (e, t, r, n) {
  new P(e, n, S.nestedPropertyVal, !0).to.have.nested.property(t, r);
};
S.notNestedPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notNestedPropertyVal, !0).to.not.have.nested.property(t, r);
};
S.deepNestedPropertyVal = function (e, t, r, n) {
  new P(e, n, S.deepNestedPropertyVal, !0).to.have.deep.nested.property(t, r);
};
S.notDeepNestedPropertyVal = function (e, t, r, n) {
  new P(e, n, S.notDeepNestedPropertyVal, !0).to.not.have.deep.nested.property(
    t,
    r,
  );
};
S.lengthOf = function (e, t, r) {
  new P(e, r, S.lengthOf, !0).to.have.lengthOf(t);
};
S.hasAnyKeys = function (e, t, r) {
  new P(e, r, S.hasAnyKeys, !0).to.have.any.keys(t);
};
S.hasAllKeys = function (e, t, r) {
  new P(e, r, S.hasAllKeys, !0).to.have.all.keys(t);
};
S.containsAllKeys = function (e, t, r) {
  new P(e, r, S.containsAllKeys, !0).to.contain.all.keys(t);
};
S.doesNotHaveAnyKeys = function (e, t, r) {
  new P(e, r, S.doesNotHaveAnyKeys, !0).to.not.have.any.keys(t);
};
S.doesNotHaveAllKeys = function (e, t, r) {
  new P(e, r, S.doesNotHaveAllKeys, !0).to.not.have.all.keys(t);
};
S.hasAnyDeepKeys = function (e, t, r) {
  new P(e, r, S.hasAnyDeepKeys, !0).to.have.any.deep.keys(t);
};
S.hasAllDeepKeys = function (e, t, r) {
  new P(e, r, S.hasAllDeepKeys, !0).to.have.all.deep.keys(t);
};
S.containsAllDeepKeys = function (e, t, r) {
  new P(e, r, S.containsAllDeepKeys, !0).to.contain.all.deep.keys(t);
};
S.doesNotHaveAnyDeepKeys = function (e, t, r) {
  new P(e, r, S.doesNotHaveAnyDeepKeys, !0).to.not.have.any.deep.keys(t);
};
S.doesNotHaveAllDeepKeys = function (e, t, r) {
  new P(e, r, S.doesNotHaveAllDeepKeys, !0).to.not.have.all.deep.keys(t);
};
S.throws = function (e, t, r, n) {
  (typeof t == "string" || t instanceof RegExp) && ((r = t), (t = null));
  var a = new P(e, n, S.throws, !0).to.throw(t, r);
  return J(a, "object");
};
S.doesNotThrow = function (e, t, r, n) {
  (typeof t == "string" || t instanceof RegExp) && ((r = t), (t = null)),
    new P(e, n, S.doesNotThrow, !0).to.not.throw(t, r);
};
S.operator = function (e, t, r, n) {
  var a;
  switch (t) {
    case "==":
      a = e == r;
      break;
    case "===":
      a = e === r;
      break;
    case ">":
      a = e > r;
      break;
    case ">=":
      a = e >= r;
      break;
    case "<":
      a = e < r;
      break;
    case "<=":
      a = e <= r;
      break;
    case "!=":
      a = e != r;
      break;
    case "!==":
      a = e !== r;
      break;
    default:
      throw (
        ((n = n && n + ": "),
        new ie(n + 'Invalid operator "' + t + '"', void 0, S.operator))
      );
  }
  var o = new P(a, n, S.operator, !0);
  o.assert(
    J(o, "object") === !0,
    "expected " + ee(e) + " to be " + t + " " + ee(r),
    "expected " + ee(e) + " to not be " + t + " " + ee(r),
  );
};
S.closeTo = function (e, t, r, n) {
  new P(e, n, S.closeTo, !0).to.be.closeTo(t, r);
};
S.approximately = function (e, t, r, n) {
  new P(e, n, S.approximately, !0).to.be.approximately(t, r);
};
S.sameMembers = function (e, t, r) {
  new P(e, r, S.sameMembers, !0).to.have.same.members(t);
};
S.notSameMembers = function (e, t, r) {
  new P(e, r, S.notSameMembers, !0).to.not.have.same.members(t);
};
S.sameDeepMembers = function (e, t, r) {
  new P(e, r, S.sameDeepMembers, !0).to.have.same.deep.members(t);
};
S.notSameDeepMembers = function (e, t, r) {
  new P(e, r, S.notSameDeepMembers, !0).to.not.have.same.deep.members(t);
};
S.sameOrderedMembers = function (e, t, r) {
  new P(e, r, S.sameOrderedMembers, !0).to.have.same.ordered.members(t);
};
S.notSameOrderedMembers = function (e, t, r) {
  new P(e, r, S.notSameOrderedMembers, !0).to.not.have.same.ordered.members(t);
};
S.sameDeepOrderedMembers = function (e, t, r) {
  new P(e, r, S.sameDeepOrderedMembers, !0).to.have.same.deep.ordered.members(
    t,
  );
};
S.notSameDeepOrderedMembers = function (e, t, r) {
  new P(
    e,
    r,
    S.notSameDeepOrderedMembers,
    !0,
  ).to.not.have.same.deep.ordered.members(t);
};
S.includeMembers = function (e, t, r) {
  new P(e, r, S.includeMembers, !0).to.include.members(t);
};
S.notIncludeMembers = function (e, t, r) {
  new P(e, r, S.notIncludeMembers, !0).to.not.include.members(t);
};
S.includeDeepMembers = function (e, t, r) {
  new P(e, r, S.includeDeepMembers, !0).to.include.deep.members(t);
};
S.notIncludeDeepMembers = function (e, t, r) {
  new P(e, r, S.notIncludeDeepMembers, !0).to.not.include.deep.members(t);
};
S.includeOrderedMembers = function (e, t, r) {
  new P(e, r, S.includeOrderedMembers, !0).to.include.ordered.members(t);
};
S.notIncludeOrderedMembers = function (e, t, r) {
  new P(e, r, S.notIncludeOrderedMembers, !0).to.not.include.ordered.members(t);
};
S.includeDeepOrderedMembers = function (e, t, r) {
  new P(e, r, S.includeDeepOrderedMembers, !0).to.include.deep.ordered.members(
    t,
  );
};
S.notIncludeDeepOrderedMembers = function (e, t, r) {
  new P(
    e,
    r,
    S.notIncludeDeepOrderedMembers,
    !0,
  ).to.not.include.deep.ordered.members(t);
};
S.oneOf = function (e, t, r) {
  new P(e, r, S.oneOf, !0).to.be.oneOf(t);
};
S.isIterable = function (e, t) {
  if (e == null || !e[Symbol.iterator])
    throw (
      ((t = t
        ? `${t} expected ${ee(e)} to be an iterable`
        : `expected ${ee(e)} to be an iterable`),
      new ie(t, void 0, S.isIterable))
    );
};
S.changes = function (e, t, r, n) {
  arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.changes, !0).to.change(t, r);
};
S.changesBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.changesBy, !0).to.change(t, r).by(n);
};
S.doesNotChange = function (e, t, r, n) {
  return (
    arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.doesNotChange, !0).to.not.change(t, r)
  );
};
S.changesButNotBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.changesButNotBy, !0).to.change(t, r).but.not.by(n);
};
S.increases = function (e, t, r, n) {
  return (
    arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.increases, !0).to.increase(t, r)
  );
};
S.increasesBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.increasesBy, !0).to.increase(t, r).by(n);
};
S.doesNotIncrease = function (e, t, r, n) {
  return (
    arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.doesNotIncrease, !0).to.not.increase(t, r)
  );
};
S.increasesButNotBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.increasesButNotBy, !0).to.increase(t, r).but.not.by(n);
};
S.decreases = function (e, t, r, n) {
  return (
    arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.decreases, !0).to.decrease(t, r)
  );
};
S.decreasesBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.decreasesBy, !0).to.decrease(t, r).by(n);
};
S.doesNotDecrease = function (e, t, r, n) {
  return (
    arguments.length === 3 && typeof t == "function" && ((n = r), (r = null)),
    new P(e, n, S.doesNotDecrease, !0).to.not.decrease(t, r)
  );
};
S.doesNotDecreaseBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  return new P(e, a, S.doesNotDecreaseBy, !0).to.not.decrease(t, r).by(n);
};
S.decreasesButNotBy = function (e, t, r, n, a) {
  if (arguments.length === 4 && typeof t == "function") {
    var o = n;
    (n = r), (a = o);
  } else arguments.length === 3 && ((n = r), (r = null));
  new P(e, a, S.decreasesButNotBy, !0).to.decrease(t, r).but.not.by(n);
};
S.ifError = function (e) {
  if (e) throw e;
};
S.isExtensible = function (e, t) {
  new P(e, t, S.isExtensible, !0).to.be.extensible;
};
S.isNotExtensible = function (e, t) {
  new P(e, t, S.isNotExtensible, !0).to.not.be.extensible;
};
S.isSealed = function (e, t) {
  new P(e, t, S.isSealed, !0).to.be.sealed;
};
S.isNotSealed = function (e, t) {
  new P(e, t, S.isNotSealed, !0).to.not.be.sealed;
};
S.isFrozen = function (e, t) {
  new P(e, t, S.isFrozen, !0).to.be.frozen;
};
S.isNotFrozen = function (e, t) {
  new P(e, t, S.isNotFrozen, !0).to.not.be.frozen;
};
S.isEmpty = function (e, t) {
  new P(e, t, S.isEmpty, !0).to.be.empty;
};
S.isNotEmpty = function (e, t) {
  new P(e, t, S.isNotEmpty, !0).to.not.be.empty;
};
x(function e(t, r) {
  return (S[r] = S[t]), e;
}, "alias")("isOk", "ok")("isNotOk", "notOk")("throws", "throw")(
  "throws",
  "Throw",
)("isExtensible", "extensible")("isNotExtensible", "notExtensible")(
  "isSealed",
  "sealed",
)("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")(
  "isEmpty",
  "empty",
)("isNotEmpty", "notEmpty")("isCallable", "isFunction")(
  "isNotCallable",
  "isNotFunction",
);
var Ys = [];
function Dr(e) {
  let t = {
    AssertionError: ie,
    util: nt,
    config: Ie,
    expect: Ht,
    assert: S,
    Assertion: P,
    ...Mf,
  };
  return ~Ys.indexOf(e) || (e(t, nt), Ys.push(e)), t;
}
x(Dr, "use");
var $f = {};
Ai($f, {
  toBeChecked: () => Ep,
  toBeDisabled: () => pp,
  toBeEmpty: () => Qf,
  toBeEmptyDOMElement: () => Zf,
  toBeEnabled: () => hp,
  toBeInTheDOM: () => Io,
  toBeInTheDocument: () => Xf,
  toBeInvalid: () => gp,
  toBePartiallyChecked: () => Cp,
  toBeRequired: () => mp,
  toBeValid: () => yp,
  toBeVisible: () => sp,
  toContainElement: () => Lo,
  toContainHTML: () => ep,
  toHaveAccessibleDescription: () => Bo,
  toHaveAccessibleErrorMessage: () => rp,
  toHaveAccessibleName: () => Do,
  toHaveAttribute: () => np,
  toHaveClass: () => ap,
  toHaveDescription: () => Rp,
  toHaveDisplayValue: () => _p,
  toHaveErrorMessage: () => Tp,
  toHaveFocus: () => op,
  toHaveFormValues: () => ip,
  toHaveRole: () => ko,
  toHaveStyle: () => Fo,
  toHaveTextContent: () => tp,
  toHaveValue: () => vp,
});
var Js = Fe(Od(), 1);
function Nf(e) {
  Object.defineProperty(e, "__esModule", { value: !0, configurable: !0 });
}
function yl(e, t, r, n) {
  Object.defineProperty(e, t, {
    get: r,
    set: n,
    enumerable: !0,
    configurable: !0,
  });
}
var jf = {};
Nf(jf);
yl(jf, "default", () => If);
var If = class extends Error {
    constructor(e, t, r, n, a) {
      super(e + ":" + r + ":" + n + ": " + t),
        (this.reason = t),
        (this.filename = e),
        (this.line = r),
        (this.column = n),
        (this.source = a);
    }
  },
  Lf = {};
Nf(Lf);
yl(Lf, "default", () => Bf);
var Bf = class {
    constructor(e, t, r) {
      (this.start = e), (this.end = t), (this.source = r);
    }
  },
  eC = {};
yl(eC, "CssTypes", () => Ce);
var Ce;
(function (e) {
  (e.stylesheet = "stylesheet"),
    (e.rule = "rule"),
    (e.declaration = "declaration"),
    (e.comment = "comment"),
    (e.container = "container"),
    (e.charset = "charset"),
    (e.document = "document"),
    (e.customMedia = "custom-media"),
    (e.fontFace = "font-face"),
    (e.host = "host"),
    (e.import = "import"),
    (e.keyframes = "keyframes"),
    (e.keyframe = "keyframe"),
    (e.layer = "layer"),
    (e.media = "media"),
    (e.namespace = "namespace"),
    (e.page = "page"),
    (e.startingStyle = "starting-style"),
    (e.supports = "supports");
})(Ce || (Ce = {}));
var Wa = /\/\*[^]*?(?:\*\/|$)/g,
  tC = (e, t) => {
    t = t || {};
    let r = 1,
      n = 1;
    function a(F) {
      let L = F.match(/\n/g);
      L && (r += L.length);
      let D = F.lastIndexOf(`
`);
      n = ~D ? F.length - D : n + F.length;
    }
    function o() {
      let F = { line: r, column: n };
      return function (L) {
        return (
          (L.position = new Bf(
            F,
            { line: r, column: n },
            (t == null ? void 0 : t.source) || "",
          )),
          f(),
          L
        );
      };
    }
    let i = [];
    function l(F) {
      let L = new If((t == null ? void 0 : t.source) || "", F, r, n, e);
      if (t != null && t.silent) i.push(L);
      else throw L;
    }
    function u() {
      let F = d();
      return {
        type: Ce.stylesheet,
        stylesheet: {
          source: t == null ? void 0 : t.source,
          rules: F,
          parsingErrors: i,
        },
      };
    }
    function c() {
      return p(/^{\s*/);
    }
    function s() {
      return p(/^}/);
    }
    function d() {
      let F,
        L = [];
      for (f(), h(L); e.length && e.charAt(0) !== "}" && (F = me() || de()); )
        F && (L.push(F), h(L));
      return L;
    }
    function p(F) {
      let L = F.exec(e);
      if (!L) return;
      let D = L[0];
      return a(D), (e = e.slice(D.length)), L;
    }
    function f() {
      p(/^\s*/);
    }
    function h(F) {
      let L;
      for (F = F || []; (L = m()); ) L && F.push(L);
      return F;
    }
    function m() {
      let F = o();
      if (e.charAt(0) !== "/" || e.charAt(1) !== "*") return;
      let L = p(/^\/\*[^]*?\*\//);
      return L
        ? F({ type: Ce.comment, comment: L[0].slice(2, -2) })
        : l("End of comment missing");
    }
    function g(F, L, D) {
      let G = L + 1,
        Y = !1,
        ne = F.indexOf(")", G);
      for (; !Y && ne !== -1; ) {
        let fe = F.indexOf("(", G);
        fe !== -1 && fe < ne
          ? ((G = g(F, fe + 1) + 1), (ne = F.indexOf(")", G)))
          : (Y = !0);
      }
      return Y && ne !== -1 ? ne : -1;
    }
    function b() {
      let F = p(/^([^{]+)/);
      if (!F) return;
      let L = Ue(F[0]).replace(Wa, "");
      if (L.indexOf(",") === -1) return [L];
      let D = 0,
        G = L.indexOf("(", D);
      for (; G !== -1; ) {
        let Y = g(L, G);
        if (Y === -1) break;
        (D = Y + 1),
          (L =
            L.substring(0, G) +
            L.substring(G, Y).replace(/,/g, "‌") +
            L.substring(Y)),
          (G = L.indexOf("(", D));
      }
      return (
        (L = L.replace(/("|')(?:\\\1|.)*?\1/g, (Y) => Y.replace(/,/g, "‌"))),
        L.split(",").map((Y) => Ue(Y.replace(/\u200C/g, ",")))
      );
    }
    function y() {
      let F = o(),
        L = p(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (!L) return;
      let D = Ue(L[0]);
      if (!p(/^:\s*/)) return l("property missing ':'");
      let G = p(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/),
        Y = F({
          type: Ce.declaration,
          property: D.replace(Wa, ""),
          value: G ? Ue(G[0]).replace(Wa, "") : "",
        });
      return p(/^[;\s]*/), Y;
    }
    function R() {
      let F = [];
      if (!c()) return l("missing '{'");
      h(F);
      let L;
      for (; (L = y()); ) L && (F.push(L), h(F));
      return s() ? F : l("missing '}'");
    }
    function _() {
      let F,
        L = [],
        D = o();
      for (; (F = p(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)); )
        L.push(F[1]), p(/^,\s*/);
      if (L.length)
        return D({ type: Ce.keyframe, values: L, declarations: R() || [] });
    }
    function C() {
      let F = o(),
        L = p(/^@([-\w]+)?keyframes\s*/);
      if (!L) return;
      let D = L[1],
        G = p(/^([-\w]+)\s*/);
      if (!G) return l("@keyframes missing name");
      let Y = G[1];
      if (!c()) return l("@keyframes missing '{'");
      let ne,
        fe = h();
      for (; (ne = _()); ) fe.push(ne), (fe = fe.concat(h()));
      return s()
        ? F({ type: Ce.keyframes, name: Y, vendor: D, keyframes: fe })
        : l("@keyframes missing '}'");
    }
    function w() {
      let F = o(),
        L = p(/^@supports *([^{]+)/);
      if (!L) return;
      let D = Ue(L[1]);
      if (!c()) return l("@supports missing '{'");
      let G = h().concat(d());
      return s()
        ? F({ type: Ce.supports, supports: D, rules: G })
        : l("@supports missing '}'");
    }
    function v() {
      let F = o();
      if (!p(/^@host\s*/)) return;
      if (!c()) return l("@host missing '{'");
      let L = h().concat(d());
      return s() ? F({ type: Ce.host, rules: L }) : l("@host missing '}'");
    }
    function E() {
      let F = o(),
        L = p(/^@container *([^{]+)/);
      if (!L) return;
      let D = Ue(L[1]);
      if (!c()) return l("@container missing '{'");
      let G = h().concat(d());
      return s()
        ? F({ type: Ce.container, container: D, rules: G })
        : l("@container missing '}'");
    }
    function O() {
      let F = o(),
        L = p(/^@layer *([^{;@]+)/);
      if (!L) return;
      let D = Ue(L[1]);
      if (!c()) return p(/^[;\s]*/), F({ type: Ce.layer, layer: D });
      let G = h().concat(d());
      return s()
        ? F({ type: Ce.layer, layer: D, rules: G })
        : l("@layer missing '}'");
    }
    function M() {
      let F = o(),
        L = p(/^@media *([^{]+)/);
      if (!L) return;
      let D = Ue(L[1]);
      if (!c()) return l("@media missing '{'");
      let G = h().concat(d());
      return s()
        ? F({ type: Ce.media, media: D, rules: G })
        : l("@media missing '}'");
    }
    function N() {
      let F = o(),
        L = p(/^@custom-media\s+(--\S+)\s*([^{;\s][^{;]*);/);
      if (L)
        return F({ type: Ce.customMedia, name: Ue(L[1]), media: Ue(L[2]) });
    }
    function k() {
      let F = o();
      if (!p(/^@page */)) return;
      let L = b() || [];
      if (!c()) return l("@page missing '{'");
      let D = h(),
        G;
      for (; (G = y()); ) D.push(G), (D = D.concat(h()));
      return s()
        ? F({ type: Ce.page, selectors: L, declarations: D })
        : l("@page missing '}'");
    }
    function j() {
      let F = o(),
        L = p(/^@([-\w]+)?document *([^{]+)/);
      if (!L) return;
      let D = Ue(L[1]),
        G = Ue(L[2]);
      if (!c()) return l("@document missing '{'");
      let Y = h().concat(d());
      return s()
        ? F({ type: Ce.document, document: G, vendor: D, rules: Y })
        : l("@document missing '}'");
    }
    function I() {
      let F = o();
      if (!p(/^@font-face\s*/)) return;
      if (!c()) return l("@font-face missing '{'");
      let L = h(),
        D;
      for (; (D = y()); ) L.push(D), (L = L.concat(h()));
      return s()
        ? F({ type: Ce.fontFace, declarations: L })
        : l("@font-face missing '}'");
    }
    function B() {
      let F = o();
      if (!p(/^@starting-style\s*/)) return;
      if (!c()) return l("@starting-style missing '{'");
      let L = h().concat(d());
      return s()
        ? F({ type: Ce.startingStyle, rules: L })
        : l("@starting-style missing '}'");
    }
    let z = re("import"),
      K = re("charset"),
      W = re("namespace");
    function re(F) {
      let L = new RegExp(
        "^@" +
          F +
          `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`,
      );
      return function () {
        let D = o(),
          G = p(L);
        if (!G) return;
        let Y = { type: F };
        return (Y[F] = G[1].trim()), D(Y);
      };
    }
    function me() {
      if (e[0] === "@")
        return (
          C() ||
          M() ||
          N() ||
          w() ||
          z() ||
          K() ||
          W() ||
          j() ||
          k() ||
          v() ||
          I() ||
          E() ||
          B() ||
          O()
        );
    }
    function de() {
      let F = o(),
        L = b();
      return L
        ? (h(), F({ type: Ce.rule, selectors: L, declarations: R() || [] }))
        : l("selector missing");
    }
    return No(u());
  };
function Ue(e) {
  return e ? e.trim() : "";
}
function No(e, t) {
  let r = e && typeof e.type == "string",
    n = r ? e : t;
  for (let a in e) {
    let o = e[a];
    Array.isArray(o)
      ? o.forEach((i) => {
          No(i, n);
        })
      : o && typeof o == "object" && No(o, n);
  }
  return (
    r &&
      Object.defineProperty(e, "parent", {
        configurable: !0,
        writable: !0,
        enumerable: !1,
        value: t || null,
      }),
    e
  );
}
var rC = tC,
  nC = rC,
  aC = Object.prototype.toString;
function oC(e) {
  return typeof e == "function" || aC.call(e) === "[object Function]";
}
function iC(e) {
  var t = Number(e);
  return isNaN(t)
    ? 0
    : t === 0 || !isFinite(t)
      ? t
      : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
}
var lC = Math.pow(2, 53) - 1;
function sC(e) {
  var t = iC(e);
  return Math.min(Math.max(t, 0), lC);
}
function Ye(e, t) {
  var r = Array,
    n = Object(e);
  if (e == null)
    throw new TypeError(
      "Array.from requires an array-like object - not null or undefined",
    );
  for (
    var a = sC(n.length), o = oC(r) ? Object(new r(a)) : new Array(a), i = 0, l;
    i < a;

  )
    (l = n[i]), (o[i] = l), (i += 1);
  return (o.length = a), o;
}
function Wr(e) {
  "@babel/helpers - typeof";
  return (
    (Wr =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Wr(e)
  );
}
function uC(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function cC(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, kf(n.key), n);
  }
}
function dC(e, t, r) {
  return (
    t && cC(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function fC(e, t, r) {
  return (
    (t = kf(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function kf(e) {
  var t = pC(e, "string");
  return Wr(t) === "symbol" ? t : String(t);
}
function pC(e, t) {
  if (Wr(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Wr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hC = (function () {
    function e() {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      uC(this, e), fC(this, "items", void 0), (this.items = t);
    }
    return (
      dC(e, [
        {
          key: "add",
          value: function (t) {
            return this.has(t) === !1 && this.items.push(t), this;
          },
        },
        {
          key: "clear",
          value: function () {
            this.items = [];
          },
        },
        {
          key: "delete",
          value: function (t) {
            var r = this.items.length;
            return (
              (this.items = this.items.filter(function (n) {
                return n !== t;
              })),
              r !== this.items.length
            );
          },
        },
        {
          key: "forEach",
          value: function (t) {
            var r = this;
            this.items.forEach(function (n) {
              t(n, n, r);
            });
          },
        },
        {
          key: "has",
          value: function (t) {
            return this.items.indexOf(t) !== -1;
          },
        },
        {
          key: "size",
          get: function () {
            return this.items.length;
          },
        },
      ]),
      e
    );
  })(),
  mC = typeof Set > "u" ? Set : hC;
function xe(e) {
  var t;
  return (t = e.localName) !== null && t !== void 0
    ? t
    : e.tagName.toLowerCase();
}
var bC = {
    article: "article",
    aside: "complementary",
    button: "button",
    datalist: "listbox",
    dd: "definition",
    details: "group",
    dialog: "dialog",
    dt: "term",
    fieldset: "group",
    figure: "figure",
    form: "form",
    footer: "contentinfo",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    header: "banner",
    hr: "separator",
    html: "document",
    legend: "legend",
    li: "listitem",
    math: "math",
    main: "main",
    menu: "list",
    nav: "navigation",
    ol: "list",
    optgroup: "group",
    option: "option",
    output: "status",
    progress: "progressbar",
    section: "region",
    summary: "button",
    table: "table",
    tbody: "rowgroup",
    textarea: "textbox",
    tfoot: "rowgroup",
    td: "cell",
    th: "columnheader",
    thead: "rowgroup",
    tr: "row",
    ul: "list",
  },
  gC = {
    caption: new Set(["aria-label", "aria-labelledby"]),
    code: new Set(["aria-label", "aria-labelledby"]),
    deletion: new Set(["aria-label", "aria-labelledby"]),
    emphasis: new Set(["aria-label", "aria-labelledby"]),
    generic: new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
    insertion: new Set(["aria-label", "aria-labelledby"]),
    none: new Set(["aria-label", "aria-labelledby"]),
    paragraph: new Set(["aria-label", "aria-labelledby"]),
    presentation: new Set(["aria-label", "aria-labelledby"]),
    strong: new Set(["aria-label", "aria-labelledby"]),
    subscript: new Set(["aria-label", "aria-labelledby"]),
    superscript: new Set(["aria-label", "aria-labelledby"]),
  };
function yC(e, t) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-description",
    "aria-describedby",
    "aria-details",
    "aria-dropeffect",
    "aria-flowto",
    "aria-grabbed",
    "aria-hidden",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription",
  ].some(function (r) {
    var n;
    return (
      e.hasAttribute(r) && !((n = gC[t]) !== null && n !== void 0 && n.has(r))
    );
  });
}
function Df(e, t) {
  return yC(e, t);
}
function vC(e) {
  var t = EC(e);
  if (t === null || jo.indexOf(t) !== -1) {
    var r = _C(e);
    if (jo.indexOf(t || "") === -1 || Df(e, r || "")) return r;
  }
  return t;
}
function _C(e) {
  var t = bC[xe(e)];
  if (t !== void 0) return t;
  switch (xe(e)) {
    case "a":
    case "area":
    case "link":
      if (e.hasAttribute("href")) return "link";
      break;
    case "img":
      return e.getAttribute("alt") === "" && !Df(e, "img")
        ? "presentation"
        : "img";
    case "input": {
      var r = e,
        n = r.type;
      switch (n) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return n;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return e.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return e.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return e.hasAttribute("multiple") || e.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function EC(e) {
  var t = e.getAttribute("role");
  if (t !== null) {
    var r = t.trim().split(" ")[0];
    if (r.length > 0) return r;
  }
  return null;
}
var jo = ["presentation", "none"];
function pe(e) {
  return e !== null && e.nodeType === e.ELEMENT_NODE;
}
function Ff(e) {
  return pe(e) && xe(e) === "caption";
}
function qn(e) {
  return pe(e) && xe(e) === "input";
}
function wC(e) {
  return pe(e) && xe(e) === "optgroup";
}
function CC(e) {
  return pe(e) && xe(e) === "select";
}
function RC(e) {
  return pe(e) && xe(e) === "table";
}
function TC(e) {
  return pe(e) && xe(e) === "textarea";
}
function SC(e) {
  var t = e.ownerDocument === null ? e : e.ownerDocument,
    r = t.defaultView;
  if (r === null) throw new TypeError("no window available");
  return r;
}
function PC(e) {
  return pe(e) && xe(e) === "fieldset";
}
function OC(e) {
  return pe(e) && xe(e) === "legend";
}
function AC(e) {
  return pe(e) && xe(e) === "slot";
}
function qC(e) {
  return pe(e) && e.ownerSVGElement !== void 0;
}
function xC(e) {
  return pe(e) && xe(e) === "svg";
}
function MC(e) {
  return qC(e) && xe(e) === "title";
}
function Vn(e, t) {
  if (pe(e) && e.hasAttribute(t)) {
    var r = e.getAttribute(t).split(" "),
      n = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return r
      .map(function (a) {
        return n.getElementById(a);
      })
      .filter(function (a) {
        return a !== null;
      });
  }
  return [];
}
function ht(e, t) {
  return pe(e) ? t.indexOf(vC(e)) !== -1 : !1;
}
function $C(e) {
  return e.trim().replace(/\s\s+/g, " ");
}
function NC(e, t) {
  if (!pe(e)) return !1;
  if (e.hasAttribute("hidden") || e.getAttribute("aria-hidden") === "true")
    return !0;
  var r = t(e);
  return (
    r.getPropertyValue("display") === "none" ||
    r.getPropertyValue("visibility") === "hidden"
  );
}
function jC(e) {
  return ht(e, ["button", "combobox", "listbox", "textbox"]) || Uf(e, "range");
}
function Uf(e, t) {
  if (!pe(e)) return !1;
  switch (t) {
    case "range":
      return ht(e, [
        "meter",
        "progressbar",
        "scrollbar",
        "slider",
        "spinbutton",
      ]);
    default:
      throw new TypeError(
        "No knowledge about abstract role '".concat(
          t,
          "'. This is likely a bug :(",
        ),
      );
  }
}
function Xs(e, t) {
  var r = Ye(e.querySelectorAll(t));
  return (
    Vn(e, "aria-owns").forEach(function (n) {
      r.push.apply(r, Ye(n.querySelectorAll(t)));
    }),
    r
  );
}
function IC(e) {
  return CC(e)
    ? e.selectedOptions || Xs(e, "[selected]")
    : Xs(e, '[aria-selected="true"]');
}
function LC(e) {
  return ht(e, jo);
}
function BC(e) {
  return Ff(e);
}
function kC(e) {
  return ht(e, [
    "button",
    "cell",
    "checkbox",
    "columnheader",
    "gridcell",
    "heading",
    "label",
    "legend",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "row",
    "rowheader",
    "switch",
    "tab",
    "tooltip",
    "treeitem",
  ]);
}
function DC(e) {
  return !1;
}
function FC(e) {
  return qn(e) || TC(e) ? e.value : e.textContent || "";
}
function Qs(e) {
  var t = e.getPropertyValue("content");
  return /^["'].*["']$/.test(t) ? t.slice(1, -1) : "";
}
function Hf(e) {
  var t = xe(e);
  return (
    t === "button" ||
    (t === "input" && e.getAttribute("type") !== "hidden") ||
    t === "meter" ||
    t === "output" ||
    t === "progress" ||
    t === "select" ||
    t === "textarea"
  );
}
function zf(e) {
  if (Hf(e)) return e;
  var t = null;
  return (
    e.childNodes.forEach(function (r) {
      if (t === null && pe(r)) {
        var n = zf(r);
        n !== null && (t = n);
      }
    }),
    t
  );
}
function UC(e) {
  if (e.control !== void 0) return e.control;
  var t = e.getAttribute("for");
  return t !== null ? e.ownerDocument.getElementById(t) : zf(e);
}
function HC(e) {
  var t = e.labels;
  if (t === null) return t;
  if (t !== void 0) return Ye(t);
  if (!Hf(e)) return null;
  var r = e.ownerDocument;
  return Ye(r.querySelectorAll("label")).filter(function (n) {
    return UC(n) === e;
  });
}
function zC(e) {
  var t = e.assignedNodes();
  return t.length === 0 ? Ye(e.childNodes) : t;
}
function Vf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = new mC(),
    n = SC(e),
    a = t.compute,
    o = a === void 0 ? "name" : a,
    i = t.computedStyleSupportsPseudoElements,
    l = i === void 0 ? t.getComputedStyle !== void 0 : i,
    u = t.getComputedStyle,
    c = u === void 0 ? n.getComputedStyle.bind(n) : u,
    s = t.hidden,
    d = s === void 0 ? !1 : s;
  function p(b, y) {
    var R = "";
    if (pe(b) && l) {
      var _ = c(b, "::before"),
        C = Qs(_);
      R = "".concat(C, " ").concat(R);
    }
    var w = AC(b) ? zC(b) : Ye(b.childNodes).concat(Vn(b, "aria-owns"));
    if (
      (w.forEach(function (O) {
        var M = g(O, {
            isEmbeddedInLabel: y.isEmbeddedInLabel,
            isReferenced: !1,
            recursion: !0,
          }),
          N = pe(O) ? c(O).getPropertyValue("display") : "inline",
          k = N !== "inline" ? " " : "";
        R += "".concat(k).concat(M).concat(k);
      }),
      pe(b) && l)
    ) {
      var v = c(b, "::after"),
        E = Qs(v);
      R = "".concat(R, " ").concat(E);
    }
    return R.trim();
  }
  function f(b, y) {
    var R = b.getAttributeNode(y);
    return R !== null && !r.has(R) && R.value.trim() !== ""
      ? (r.add(R), R.value)
      : null;
  }
  function h(b) {
    return pe(b) ? f(b, "title") : null;
  }
  function m(b) {
    if (!pe(b)) return null;
    if (PC(b)) {
      r.add(b);
      for (var y = Ye(b.childNodes), R = 0; R < y.length; R += 1) {
        var _ = y[R];
        if (OC(_))
          return g(_, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1,
          });
      }
    } else if (RC(b)) {
      r.add(b);
      for (var C = Ye(b.childNodes), w = 0; w < C.length; w += 1) {
        var v = C[w];
        if (Ff(v))
          return g(v, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1,
          });
      }
    } else if (xC(b)) {
      r.add(b);
      for (var E = Ye(b.childNodes), O = 0; O < E.length; O += 1) {
        var M = E[O];
        if (MC(M)) return M.textContent;
      }
      return null;
    } else if (xe(b) === "img" || xe(b) === "area") {
      var N = f(b, "alt");
      if (N !== null) return N;
    } else if (wC(b)) {
      var k = f(b, "label");
      if (k !== null) return k;
    }
    if (
      qn(b) &&
      (b.type === "button" || b.type === "submit" || b.type === "reset")
    ) {
      var j = f(b, "value");
      if (j !== null) return j;
      if (b.type === "submit") return "Submit";
      if (b.type === "reset") return "Reset";
    }
    var I = HC(b);
    if (I !== null && I.length !== 0)
      return (
        r.add(b),
        Ye(I)
          .map(function (W) {
            return g(W, {
              isEmbeddedInLabel: !0,
              isReferenced: !1,
              recursion: !0,
            });
          })
          .filter(function (W) {
            return W.length > 0;
          })
          .join(" ")
      );
    if (qn(b) && b.type === "image") {
      var B = f(b, "alt");
      if (B !== null) return B;
      var z = f(b, "title");
      return z !== null ? z : "Submit Query";
    }
    if (ht(b, ["button"])) {
      var K = p(b, { isEmbeddedInLabel: !1, isReferenced: !1 });
      if (K !== "") return K;
    }
    return null;
  }
  function g(b, y) {
    if (r.has(b)) return "";
    if (!d && NC(b, c) && !y.isReferenced) return r.add(b), "";
    var R = pe(b) ? b.getAttributeNode("aria-labelledby") : null,
      _ = R !== null && !r.has(R) ? Vn(b, "aria-labelledby") : [];
    if (o === "name" && !y.isReferenced && _.length > 0)
      return (
        r.add(R),
        _.map(function (N) {
          return g(N, {
            isEmbeddedInLabel: y.isEmbeddedInLabel,
            isReferenced: !0,
            recursion: !1,
          });
        }).join(" ")
      );
    var C = y.recursion && jC(b) && o === "name";
    if (!C) {
      var w = ((pe(b) && b.getAttribute("aria-label")) || "").trim();
      if (w !== "" && o === "name") return r.add(b), w;
      if (!LC(b)) {
        var v = m(b);
        if (v !== null) return r.add(b), v;
      }
    }
    if (ht(b, ["menu"])) return r.add(b), "";
    if (C || y.isEmbeddedInLabel || y.isReferenced) {
      if (ht(b, ["combobox", "listbox"])) {
        r.add(b);
        var E = IC(b);
        return E.length === 0
          ? qn(b)
            ? b.value
            : ""
          : Ye(E)
              .map(function (N) {
                return g(N, {
                  isEmbeddedInLabel: y.isEmbeddedInLabel,
                  isReferenced: !1,
                  recursion: !0,
                });
              })
              .join(" ");
      }
      if (Uf(b, "range"))
        return (
          r.add(b),
          b.hasAttribute("aria-valuetext")
            ? b.getAttribute("aria-valuetext")
            : b.hasAttribute("aria-valuenow")
              ? b.getAttribute("aria-valuenow")
              : b.getAttribute("value") || ""
        );
      if (ht(b, ["textbox"])) return r.add(b), FC(b);
    }
    if (kC(b) || (pe(b) && y.isReferenced) || BC(b) || DC()) {
      var O = p(b, {
        isEmbeddedInLabel: y.isEmbeddedInLabel,
        isReferenced: !1,
      });
      if (O !== "") return r.add(b), O;
    }
    if (b.nodeType === b.TEXT_NODE) return r.add(b), b.textContent || "";
    if (y.recursion)
      return (
        r.add(b),
        p(b, { isEmbeddedInLabel: y.isEmbeddedInLabel, isReferenced: !1 })
      );
    var M = h(b);
    return M !== null ? (r.add(b), M) : (r.add(b), "");
  }
  return $C(
    g(e, {
      isEmbeddedInLabel: !1,
      isReferenced: o === "description",
      recursion: !1,
    }),
  );
}
function Kr(e) {
  "@babel/helpers - typeof";
  return (
    (Kr =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Kr(e)
  );
}
function Zs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (a) {
        return Object.getOwnPropertyDescriptor(e, a).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function eu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Zs(Object(r), !0).forEach(function (n) {
          VC(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Zs(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function VC(e, t, r) {
  return (
    (t = GC(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function GC(e) {
  var t = WC(e, "string");
  return Kr(t) === "symbol" ? t : String(t);
}
function WC(e, t) {
  if (Kr(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Kr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = Vn(e, "aria-describedby")
      .map(function (o) {
        return Vf(o, eu(eu({}, t), {}, { compute: "description" }));
      })
      .join(" ");
  if (r === "") {
    var n = e.getAttribute("aria-description");
    r = n === null ? "" : n;
  }
  if (r === "") {
    var a = e.getAttribute("title");
    r = a === null ? "" : a;
  }
  return r;
}
function YC(e) {
  return ht(e, [
    "caption",
    "code",
    "deletion",
    "emphasis",
    "generic",
    "insertion",
    "none",
    "paragraph",
    "presentation",
    "strong",
    "subscript",
    "superscript",
  ]);
}
function JC(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return YC(e) ? "" : Vf(e, t);
}
var vl = Fe(xi(), 1),
  XC = Fe(qd(), 1),
  Gf = Fe(Fd(), 1),
  QC = Fe(Ud(), 1),
  Wf = class extends Error {
    constructor(e, t, r, n) {
      super(), Error.captureStackTrace && Error.captureStackTrace(this, r);
      let a = "";
      try {
        a = n.utils.printWithType("Received", t, n.utils.printReceived);
      } catch {}
      this.message = [
        n.utils.matcherHint(
          `${n.isNot ? ".not" : ""}.${r.name}`,
          "received",
          "",
        ),
        "",
        `${n.utils.RECEIVED_COLOR("received")} value must ${e}.`,
        a,
      ].join(`
`);
    }
  },
  tu = class extends Wf {
    constructor(...e) {
      super("be an HTMLElement or an SVGElement", ...e);
    }
  },
  ru = class extends Wf {
    constructor(...e) {
      super("be a Node", ...e);
    }
  };
function Kf(e, t, ...r) {
  if (!e || !e.ownerDocument || !e.ownerDocument.defaultView)
    throw new t(e, ...r);
}
function ZC(e, ...t) {
  Kf(e, ru, ...t);
  let r = e.ownerDocument.defaultView;
  if (!(e instanceof r.Node)) throw new ru(e, ...t);
}
function le(e, ...t) {
  Kf(e, tu, ...t);
  let r = e.ownerDocument.defaultView;
  if (!(e instanceof r.HTMLElement) && !(e instanceof r.SVGElement))
    throw new tu(e, ...t);
}
var eR = class extends Error {
  constructor(e, t, r) {
    super(),
      Error.captureStackTrace && Error.captureStackTrace(this, t),
      (this.message = [
        e.message,
        "",
        r.utils.RECEIVED_COLOR("Failing css:"),
        r.utils.RECEIVED_COLOR(`${e.css}`),
      ].join(`
`));
  }
};
function tR(e, ...t) {
  let r = nC(`selector { ${e} }`, { silent: !0 }).stylesheet;
  if (r.parsingErrors && r.parsingErrors.length > 0) {
    let { reason: n, line: a } = r.parsingErrors[0];
    throw new eR(
      {
        css: e,
        message: `Syntax error parsing expected css: ${n} on line: ${a}`,
      },
      ...t,
    );
  }
  return r.rules[0].declarations
    .filter((n) => n.type === "declaration")
    .reduce((n, { property: a, value: o }) => Object.assign(n, { [a]: o }), {});
}
function nu(e, t) {
  return typeof t == "string" ? t : e.utils.stringify(t);
}
function Ae(e, t, r, n, a, o) {
  return [
    `${t}
`,
    `${r}:
${e.utils.EXPECTED_COLOR((0, Js.default)(nu(e, n), 2))}`,
    `${a}:
${e.utils.RECEIVED_COLOR((0, Js.default)(nu(e, o), 2))}`,
  ].join(`
`);
}
function rR(e, t) {
  return t instanceof RegExp ? t.test(e) : e.includes(String(t));
}
function Ra(e, t) {
  console.warn(
    `Warning: ${e} has been deprecated and will be removed in future updates.`,
    t,
  );
}
function Ta(e) {
  return e.replace(/\s+/g, " ").trim();
}
function Mt(e) {
  return e.tagName && e.tagName.toLowerCase();
}
function nR({ multiple: e, options: t }) {
  let r = [...t].filter((n) => n.selected);
  if (e) return [...r].map((n) => n.value);
  if (r.length !== 0) return r[0].value;
}
function aR(e) {
  switch (e.type) {
    case "number":
      return e.value === "" ? null : Number(e.value);
    case "checkbox":
      return e.checked;
    default:
      return e.value;
  }
}
var oR = ["meter", "progressbar", "slider", "spinbutton"];
function iR(e) {
  if (oR.includes(e.getAttribute("role")))
    return Number(e.getAttribute("aria-valuenow"));
}
function Yf(e) {
  if (e)
    switch (e.tagName.toLowerCase()) {
      case "input":
        return aR(e);
      case "select":
        return nR(e);
      default:
        return e.value ?? iR(e);
    }
}
function lR(
  e,
  { wordConnector: t = ", ", lastWordConnector: r = " and " } = {},
) {
  return [e.slice(0, -1).join(t), e[e.length - 1]].join(e.length > 1 ? r : "");
}
function Jf(e, t) {
  if (Array.isArray(e) && Array.isArray(t))
    return [...new Set(e)].every((r) => new Set(t).has(r));
}
function Io(e, t) {
  return (
    Ra(
      "toBeInTheDOM",
      "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container.",
    ),
    e && le(e, Io, this),
    t && le(t, Io, this),
    {
      pass: t ? t.contains(e) : !!e,
      message: () =>
        [
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toBeInTheDOM`,
            "element",
            "",
          ),
          "",
          "Received:",
          `  ${this.utils.printReceived(e && e.cloneNode(!1))}`,
        ].join(`
`),
    }
  );
}
function Xf(e) {
  (e !== null || !this.isNot) && le(e, Xf, this);
  let t = e === null ? !1 : e.ownerDocument === e.getRootNode({ composed: !0 }),
    r = () =>
      `expected document not to contain element, found ${this.utils.stringify(e.cloneNode(!0))} instead`,
    n = () => "element could not be found in the document";
  return {
    pass: t,
    message: () =>
      [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDocument`,
          "element",
          "",
        ),
        "",
        this.utils.RECEIVED_COLOR(this.isNot ? r() : n()),
      ].join(`
`),
  };
}
function Qf(e) {
  return (
    Ra(
      "toBeEmpty",
      "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM.",
    ),
    le(e, Qf, this),
    {
      pass: e.innerHTML === "",
      message: () =>
        [
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toBeEmpty`,
            "element",
            "",
          ),
          "",
          "Received:",
          `  ${this.utils.printReceived(e.innerHTML)}`,
        ].join(`
`),
    }
  );
}
function Zf(e) {
  return (
    le(e, Zf, this),
    {
      pass: sR(e),
      message: () =>
        [
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`,
            "element",
            "",
          ),
          "",
          "Received:",
          `  ${this.utils.printReceived(e.innerHTML)}`,
        ].join(`
`),
    }
  );
}
function sR(e) {
  return [...e.childNodes].filter((t) => t.nodeType !== 8).length === 0;
}
function Lo(e, t) {
  return (
    le(e, Lo, this),
    t !== null && le(t, Lo, this),
    {
      pass: e.contains(t),
      message: () =>
        [
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toContainElement`,
            "element",
            "element",
          ),
          "",
          this.utils
            .RECEIVED_COLOR(`${this.utils.stringify(e.cloneNode(!1))} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(t && t.cloneNode(!1))}
        `),
        ].join(`
`),
    }
  );
}
function uR(e, t) {
  let r = e.ownerDocument.createElement("div");
  return (r.innerHTML = t), r.innerHTML;
}
function ep(e, t) {
  if ((le(e, ep, this), typeof t != "string"))
    throw new Error(`.toContainHTML() expects a string value, got ${t}`);
  return {
    pass: e.outerHTML.includes(uR(e, t)),
    message: () =>
      [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toContainHTML`,
          "element",
          "",
        ),
        "Expected:",
        `  ${this.utils.EXPECTED_COLOR(t)}`,
        "Received:",
        `  ${this.utils.printReceived(e.cloneNode(!0))}`,
      ].join(`
`),
  };
}
function tp(e, t, r = { normalizeWhitespace: !0 }) {
  ZC(e, tp, this);
  let n = r.normalizeWhitespace
      ? Ta(e.textContent)
      : e.textContent.replace(/\u00a0/g, " "),
    a = n !== "" && t === "";
  return {
    pass: !a && rR(n, t),
    message: () => {
      let o = this.isNot ? "not to" : "to";
      return Ae(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveTextContent`,
          "element",
          "",
        ),
        a
          ? "Checking with empty string will always match, use .toBeEmptyDOMElement() instead"
          : `Expected element ${o} have text content`,
        t,
        "Received",
        n,
      );
    },
  };
}
function Bo(e, t) {
  le(e, Bo, this);
  let r = KC(e),
    n = arguments.length === 1,
    a = !1;
  return (
    n
      ? (a = r !== "")
      : (a = t instanceof RegExp ? t.test(r) : this.equals(r, t)),
    {
      pass: a,
      message: () => {
        let o = this.isNot ? "not to" : "to";
        return Ae(
          this,
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.${Bo.name}`,
            "element",
            "",
          ),
          `Expected element ${o} have accessible description`,
          t,
          "Received",
          r,
        );
      },
    }
  );
}
var $r = "aria-invalid",
  cR = ["false"];
function rp(e, t) {
  var l;
  le(e, rp, this);
  let r = this.isNot ? "not to" : "to",
    n = this.isNot
      ? ".not.toHaveAccessibleErrorMessage"
      : ".toHaveAccessibleErrorMessage",
    a = e.getAttribute("aria-errormessage");
  if (a && /\s+/.test(a))
    return {
      pass: !1,
      message: () =>
        Ae(
          this,
          this.utils.matcherHint(n, "element"),
          "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID",
          "",
          "Received",
          `aria-errormessage="${a}"`,
        ),
    };
  let o = e.getAttribute($r);
  if (!e.hasAttribute($r) || cR.includes(o))
    return {
      pass: !1,
      message: () =>
        Ae(
          this,
          this.utils.matcherHint(n, "element"),
          "Expected element to be marked as invalid with attribute",
          `${$r}="${String(!0)}"`,
          "Received",
          e.hasAttribute("aria-invalid")
            ? `${$r}="${e.getAttribute($r)}`
            : null,
        ),
    };
  let i = Ta(
    ((l = e.ownerDocument.getElementById(a)) == null
      ? void 0
      : l.textContent) ?? "",
  );
  return {
    pass:
      t === void 0 ? !!i : t instanceof RegExp ? t.test(i) : this.equals(i, t),
    message: () =>
      Ae(
        this,
        this.utils.matcherHint(n, "element"),
        `Expected element ${r} have accessible error message`,
        t ?? "",
        "Received",
        i,
      ),
  };
}
var dR = hR(vl.elementRoles);
function ko(e, t) {
  le(e, ko, this);
  let r = fR(e);
  return {
    pass: r.some((n) => n === t),
    message: () => {
      let n = this.isNot ? "not to" : "to";
      return Ae(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${ko.name}`,
          "element",
          "",
        ),
        `Expected element ${n} have role`,
        t,
        "Received",
        r.join(", "),
      );
    },
  };
}
function fR(e) {
  return e.hasAttribute("role")
    ? e.getAttribute("role").split(" ").filter(Boolean)
    : pR(e);
}
function pR(e) {
  for (let { match: t, roles: r } of dR) if (t(e)) return [...r];
  return [];
}
function hR(e) {
  function t({ name: i, attributes: l }) {
    return `${i}${l.map(({ name: u, value: c, constraints: s = [] }) => (s.indexOf("undefined") !== -1 ? `:not([${u}])` : c ? `[${u}="${c}"]` : `[${u}]`)).join("")}`;
  }
  function r({ attributes: i = [] }) {
    return i.length;
  }
  function n({ specificity: i }, { specificity: l }) {
    return l - i;
  }
  function a(i) {
    let { attributes: l = [] } = i,
      u = l.findIndex(
        (s) => s.value && s.name === "type" && s.value === "text",
      );
    u >= 0 && (l = [...l.slice(0, u), ...l.slice(u + 1)]);
    let c = t({ ...i, attributes: l });
    return (s) => (u >= 0 && s.type !== "text" ? !1 : s.matches(c));
  }
  let o = [];
  for (let [i, l] of e.entries())
    o = [...o, { match: a(i), roles: Array.from(l), specificity: r(i) }];
  return o.sort(n);
}
function Do(e, t) {
  le(e, Do, this);
  let r = JC(e),
    n = arguments.length === 1,
    a = !1;
  return (
    n
      ? (a = r !== "")
      : (a = t instanceof RegExp ? t.test(r) : this.equals(r, t)),
    {
      pass: a,
      message: () => {
        let o = this.isNot ? "not to" : "to";
        return Ae(
          this,
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.${Do.name}`,
            "element",
            "",
          ),
          `Expected element ${o} have accessible name`,
          t,
          "Received",
          r,
        );
      },
    }
  );
}
function au(e, t, r) {
  return r === void 0 ? t : `${t}=${e(r)}`;
}
function mR(e, t, r) {
  return r === void 0
    ? `element.hasAttribute(${e(t)})`
    : `element.getAttribute(${e(t)}) === ${e(r)}`;
}
function np(e, t, r) {
  le(e, np, this);
  let n = r !== void 0,
    a = e.hasAttribute(t),
    o = e.getAttribute(t);
  return {
    pass: n ? a && this.equals(o, r) : a,
    message: () => {
      let i = this.isNot ? "not to" : "to",
        l = a ? au(this.utils.stringify, t, o) : null,
        u = this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveAttribute`,
          "element",
          this.utils.printExpected(t),
          {
            secondArgument: n ? this.utils.printExpected(r) : void 0,
            comment: mR(this.utils.stringify, t, r),
          },
        );
      return Ae(
        this,
        u,
        `Expected the element ${i} have attribute`,
        au(this.utils.stringify, t, r),
        "Received",
        l,
      );
    },
  };
}
function bR(e) {
  let t = e.pop(),
    r,
    n;
  return (
    typeof t == "object" && !(t instanceof RegExp)
      ? ((r = e), (n = t))
      : ((r = e.concat(t)), (n = { exact: !1 })),
    { expectedClassNames: r, options: n }
  );
}
function ou(e) {
  return e ? e.split(/\s+/).filter((t) => t.length > 0) : [];
}
function iu(e, t) {
  return e.every((r) =>
    typeof r == "string" ? t.includes(r) : t.some((n) => r.test(n)),
  );
}
function ap(e, ...t) {
  le(e, ap, this);
  let { expectedClassNames: r, options: n } = bR(t),
    a = ou(e.getAttribute("class")),
    o = r.reduce(
      (l, u) => l.concat(typeof u == "string" || !u ? ou(u) : u),
      [],
    ),
    i = o.some((l) => l instanceof RegExp);
  if (n.exact && i)
    throw new Error(
      "Exact option does not support RegExp expected class names",
    );
  return n.exact
    ? {
        pass: iu(o, a) && o.length === a.length,
        message: () => {
          let l = this.isNot ? "not to" : "to";
          return Ae(
            this,
            this.utils.matcherHint(
              `${this.isNot ? ".not" : ""}.toHaveClass`,
              "element",
              this.utils.printExpected(o.join(" ")),
            ),
            `Expected the element ${l} have EXACTLY defined classes`,
            o.join(" "),
            "Received",
            a.join(" "),
          );
        },
      }
    : o.length > 0
      ? {
          pass: iu(o, a),
          message: () => {
            let l = this.isNot ? "not to" : "to";
            return Ae(
              this,
              this.utils.matcherHint(
                `${this.isNot ? ".not" : ""}.toHaveClass`,
                "element",
                this.utils.printExpected(o.join(" ")),
              ),
              `Expected the element ${l} have class`,
              o.join(" "),
              "Received",
              a.join(" "),
            );
          },
        }
      : {
          pass: this.isNot ? a.length > 0 : !1,
          message: () =>
            this.isNot
              ? Ae(
                  this,
                  this.utils.matcherHint(".not.toHaveClass", "element", ""),
                  "Expected the element to have classes",
                  "(none)",
                  "Received",
                  a.join(" "),
                )
              : [
                  this.utils.matcherHint(".toHaveClass", "element"),
                  "At least one expected class must be provided.",
                ].join(`
`),
        };
}
function gR(e, t) {
  let r = {},
    n = e.createElement("div");
  return (
    Object.keys(t).forEach((a) => {
      (n.style[a] = t[a]), (r[a] = n.style[a]);
    }),
    r
  );
}
function yR(e, t) {
  return (
    !!Object.keys(e).length &&
    Object.entries(e).every(([r, n]) => {
      let a = r.startsWith("--"),
        o = [r];
      return (
        a || o.push(r.toLowerCase()),
        o.some((i) => t[i] === n || t.getPropertyValue(i) === n)
      );
    })
  );
}
function lu(e) {
  return Object.keys(e)
    .sort()
    .map((t) => `${t}: ${e[t]};`).join(`
`);
}
function vR(e, t, r) {
  let n = Array.from(r)
    .filter((a) => t[a] !== void 0)
    .reduce((a, o) => Object.assign(a, { [o]: r.getPropertyValue(o) }), {});
  return e(lu(t), lu(n)).replace(
    `${XC.default.red("+ Received")}
`,
    "",
  );
}
function Fo(e, t) {
  le(e, Fo, this);
  let r = typeof t == "object" ? t : tR(t, Fo, this),
    { getComputedStyle: n } = e.ownerDocument.defaultView,
    a = gR(e.ownerDocument, r),
    o = n(e);
  return {
    pass: yR(a, o),
    message: () => {
      let i = `${this.isNot ? ".not" : ""}.toHaveStyle`;
      return [
        this.utils.matcherHint(i, "element", ""),
        vR(this.utils.diff, a, o),
      ].join(`

`);
    },
  };
}
function op(e) {
  return (
    le(e, op, this),
    {
      pass: e.ownerDocument.activeElement === e,
      message: () =>
        [
          this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toHaveFocus`,
            "element",
            "",
          ),
          "",
          ...(this.isNot
            ? [
                "Received element is focused:",
                `  ${this.utils.printReceived(e)}`,
              ]
            : [
                "Expected element with focus:",
                `  ${this.utils.printExpected(e)}`,
                "Received element with focus:",
                `  ${this.utils.printReceived(e.ownerDocument.activeElement)}`,
              ]),
        ].join(`
`),
    }
  );
}
function _R(e) {
  let t = [...new Set(e.map((r) => r.type))];
  if (t.length !== 1)
    throw new Error(
      "Multiple form elements with the same name must be of the same type",
    );
  switch (t[0]) {
    case "radio": {
      let r = e.find((n) => n.checked);
      return r ? r.value : void 0;
    }
    case "checkbox":
      return e.filter((r) => r.checked).map((r) => r.value);
    default:
      return e.map((r) => r.value);
  }
}
function ER(e, t) {
  let r = [...e.querySelectorAll(`[name="${(0, QC.default)(t)}"]`)];
  if (r.length !== 0)
    switch (r.length) {
      case 1:
        return Yf(r[0]);
      default:
        return _R(r);
    }
}
function wR(e) {
  return /\[\]$/.test(e) ? e.slice(0, -2) : e;
}
function CR(e) {
  return Array.from(e.elements)
    .map((t) => t.name)
    .reduce((t, r) => ({ ...t, [wR(r)]: ER(e, r) }), {});
}
function ip(e, t) {
  if ((le(e, ip, this), !e.elements))
    throw new Error("toHaveFormValues must be called on a form or a fieldset");
  let r = CR(e);
  return {
    pass: Object.entries(t).every(([n, a]) => (0, Gf.default)(r[n], a, Jf)),
    message: () => {
      let n = this.isNot ? "not to" : "to",
        a = `${this.isNot ? ".not" : ""}.toHaveFormValues`,
        o = Object.keys(r)
          .filter((i) => t.hasOwnProperty(i))
          .reduce((i, l) => ({ ...i, [l]: r[l] }), {});
      return [
        this.utils.matcherHint(a, "element", ""),
        `Expected the element ${n} have form values`,
        this.utils.diff(t, o),
      ].join(`

`);
    },
  };
}
function RR(e) {
  let { getComputedStyle: t } = e.ownerDocument.defaultView,
    { display: r, visibility: n, opacity: a } = t(e);
  return (
    r !== "none" && n !== "hidden" && n !== "collapse" && a !== "0" && a !== 0
  );
}
function TR(e, t) {
  let r;
  return (
    t
      ? (r =
          e.nodeName === "DETAILS" && t.nodeName !== "SUMMARY"
            ? e.hasAttribute("open")
            : !0)
      : (r = e.nodeName === "DETAILS" ? e.hasAttribute("open") : !0),
    !e.hasAttribute("hidden") && r
  );
}
function lp(e, t) {
  return RR(e) && TR(e, t) && (!e.parentElement || lp(e.parentElement, e));
}
function sp(e) {
  le(e, sp, this);
  let t = e.ownerDocument === e.getRootNode({ composed: !0 }),
    r = t && lp(e);
  return {
    pass: r,
    message: () => {
      let n = r ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeVisible`,
          "element",
          "",
        ),
        "",
        `Received element ${n} visible${t ? "" : " (element is not in the document)"}:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
var SR = [
  "fieldset",
  "input",
  "select",
  "optgroup",
  "option",
  "button",
  "textarea",
];
function PR(e, t) {
  return (
    Mt(e) === "legend" &&
    Mt(t) === "fieldset" &&
    e.isSameNode(Array.from(t.children).find((r) => Mt(r) === "legend"))
  );
}
function OR(e, t) {
  return cp(t) && !PR(e, t);
}
function AR(e) {
  return e.includes("-");
}
function up(e) {
  let t = Mt(e);
  return SR.includes(t) || AR(t);
}
function cp(e) {
  return up(e) && e.hasAttribute("disabled");
}
function dp(e) {
  let t = e.parentElement;
  return !!t && (OR(e, t) || dp(t));
}
function fp(e) {
  return up(e) && (cp(e) || dp(e));
}
function pp(e) {
  le(e, pp, this);
  let t = fp(e);
  return {
    pass: t,
    message: () => {
      let r = t ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeDisabled`,
          "element",
          "",
        ),
        "",
        `Received element ${r} disabled:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
function hp(e) {
  le(e, hp, this);
  let t = !fp(e);
  return {
    pass: t,
    message: () => {
      let r = t ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEnabled`,
          "element",
          "",
        ),
        "",
        `Received element ${r} enabled:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
var qR = ["select", "textarea"],
  xR = ["input", "select", "textarea"],
  MR = ["color", "hidden", "range", "submit", "image", "reset"],
  $R = [
    "checkbox",
    "combobox",
    "gridcell",
    "listbox",
    "radiogroup",
    "spinbutton",
    "textbox",
    "tree",
  ];
function NR(e) {
  return qR.includes(Mt(e)) && e.hasAttribute("required");
}
function jR(e) {
  return (
    Mt(e) === "input" &&
    e.hasAttribute("required") &&
    ((e.hasAttribute("type") && !MR.includes(e.getAttribute("type"))) ||
      !e.hasAttribute("type"))
  );
}
function IR(e) {
  return (
    e.hasAttribute("aria-required") &&
    e.getAttribute("aria-required") === "true" &&
    (xR.includes(Mt(e)) ||
      (e.hasAttribute("role") && $R.includes(e.getAttribute("role"))))
  );
}
function mp(e) {
  le(e, mp, this);
  let t = NR(e) || jR(e) || IR(e);
  return {
    pass: t,
    message: () => {
      let r = t ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeRequired`,
          "element",
          "",
        ),
        "",
        `Received element ${r} required:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
var LR = ["form", "input", "select", "textarea"];
function BR(e) {
  return (
    e.hasAttribute("aria-invalid") && e.getAttribute("aria-invalid") !== "false"
  );
}
function kR(e) {
  return LR.includes(Mt(e));
}
function bp(e) {
  let t = BR(e);
  return kR(e) ? t || !e.checkValidity() : t;
}
function gp(e) {
  le(e, gp, this);
  let t = bp(e);
  return {
    pass: t,
    message: () => {
      let r = t ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInvalid`,
          "element",
          "",
        ),
        "",
        `Received element ${r} currently invalid:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
function yp(e) {
  le(e, yp, this);
  let t = !bp(e);
  return {
    pass: t,
    message: () => {
      let r = t ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeValid`,
          "element",
          "",
        ),
        "",
        `Received element ${r} currently valid:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
function vp(e, t) {
  if (
    (le(e, vp, this),
    e.tagName.toLowerCase() === "input" &&
      ["checkbox", "radio"].includes(e.type))
  )
    throw new Error(
      "input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead",
    );
  let r = Yf(e),
    n = t !== void 0,
    a = t,
    o = r;
  return (
    t == r &&
      t !== r &&
      ((a = `${t} (${typeof t})`), (o = `${r} (${typeof r})`)),
    {
      pass: n ? (0, Gf.default)(r, t, Jf) : !!r,
      message: () => {
        let i = this.isNot ? "not to" : "to",
          l = this.utils.matcherHint(
            `${this.isNot ? ".not" : ""}.toHaveValue`,
            "element",
            t,
          );
        return Ae(
          this,
          l,
          `Expected the element ${i} have value`,
          n ? a : "(any)",
          "Received",
          o,
        );
      },
    }
  );
}
function _p(e, t) {
  le(e, _p, this);
  let r = e.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(r))
    throw new Error(
      ".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead.",
    );
  if (r === "input" && ["radio", "checkbox"].includes(e.type))
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${e.type}"], try with another matcher instead.`,
    );
  let n = DR(r, e),
    a = FR(t),
    o = a.filter((u) =>
      n.some((c) =>
        u instanceof RegExp ? u.test(c) : this.equals(c, String(u)),
      ),
    ).length,
    i = o === n.length,
    l = o === a.length;
  return {
    pass: i && l,
    message: () =>
      Ae(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveDisplayValue`,
          "element",
          "",
        ),
        `Expected element ${this.isNot ? "not " : ""}to have display value`,
        t,
        "Received",
        n,
      ),
  };
}
function DR(e, t) {
  return e === "select"
    ? Array.from(t)
        .filter((r) => r.selected)
        .map((r) => r.textContent)
    : [t.value];
}
function FR(e) {
  return e instanceof Array ? e : [e];
}
function Ep(e) {
  le(e, Ep, this);
  let t = () =>
      e.tagName.toLowerCase() === "input" &&
      ["checkbox", "radio"].includes(e.type),
    r = () =>
      wp(e.getAttribute("role")) &&
      ["true", "false"].includes(e.getAttribute("aria-checked"));
  if (!t() && !r())
    return {
      pass: !1,
      message: () =>
        `only inputs with type="checkbox" or type="radio" or elements with ${UR()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead`,
    };
  let n = () => (t() ? e.checked : e.getAttribute("aria-checked") === "true");
  return {
    pass: n(),
    message: () => {
      let a = n() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeChecked`,
          "element",
          "",
        ),
        "",
        `Received element ${a} checked:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
function UR() {
  return lR(
    HR().map((e) => `role="${e}"`),
    { lastWordConnector: " or " },
  );
}
function HR() {
  return vl.roles.keys().filter(wp);
}
function wp(e) {
  var t;
  return (
    ((t = vl.roles.get(e)) == null ? void 0 : t.props["aria-checked"]) !==
    void 0
  );
}
function Cp(e) {
  le(e, Cp, this);
  let t = () => e.tagName.toLowerCase() === "input" && e.type === "checkbox",
    r = () => e.getAttribute("role") === "checkbox";
  if (!t() && !r())
    return {
      pass: !1,
      message: () =>
        'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead',
    };
  let n = () => {
    let a = e.getAttribute("aria-checked") === "mixed";
    return (t() && e.indeterminate) || a;
  };
  return {
    pass: n(),
    message: () => {
      let a = n() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBePartiallyChecked`,
          "element",
          "",
        ),
        "",
        `Received element ${a} partially checked:`,
        `  ${this.utils.printReceived(e.cloneNode(!1))}`,
      ].join(`
`);
    },
  };
}
function Rp(e, t) {
  Ra("toHaveDescription", "Please use toHaveAccessibleDescription."),
    le(e, Rp, this);
  let r = t !== void 0,
    n = (e.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean),
    a = "";
  if (n.length > 0) {
    let o = e.ownerDocument,
      i = n.map((l) => o.getElementById(l)).filter(Boolean);
    a = Ta(i.map((l) => l.textContent).join(" "));
  }
  return {
    pass: r ? (t instanceof RegExp ? t.test(a) : this.equals(a, t)) : !!a,
    message: () => {
      let o = this.isNot ? "not to" : "to";
      return Ae(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveDescription`,
          "element",
          "",
        ),
        `Expected the element ${o} have description`,
        this.utils.printExpected(t),
        "Received",
        this.utils.printReceived(a),
      );
    },
  };
}
function Tp(e, t) {
  if (
    (Ra("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage."),
    le(e, Tp, this),
    !e.hasAttribute("aria-invalid") ||
      e.getAttribute("aria-invalid") === "false")
  ) {
    let o = this.isNot ? ".not" : "";
    return {
      pass: !1,
      message: () =>
        Ae(
          this,
          this.utils.matcherHint(`${o}.toHaveErrorMessage`, "element", ""),
          "Expected the element to have invalid state indicated by",
          'aria-invalid="true"',
          "Received",
          e.hasAttribute("aria-invalid")
            ? `aria-invalid="${e.getAttribute("aria-invalid")}"`
            : this.utils.printReceived(""),
        ),
    };
  }
  let r = t !== void 0,
    n = (e.getAttribute("aria-errormessage") || "")
      .split(/\s+/)
      .filter(Boolean),
    a = "";
  if (n.length > 0) {
    let o = e.ownerDocument,
      i = n.map((l) => o.getElementById(l)).filter(Boolean);
    a = Ta(i.map((l) => l.textContent).join(" "));
  }
  return {
    pass: r ? (t instanceof RegExp ? t.test(a) : this.equals(a, t)) : !!a,
    message: () => {
      let o = this.isNot ? "not to" : "to";
      return Ae(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveErrorMessage`,
          "element",
          "",
        ),
        `Expected the element ${o} have error message`,
        this.utils.printExpected(t),
        "Received",
        this.utils.printReceived(a),
      );
    },
  };
}
Fe(Od(), 1);
Fe(xi(), 1);
Fe(qd(), 1);
Fe(Fd(), 1);
Fe(Ud(), 1);
function dt(e, t, r) {
  let n = typeof e;
  if (!r.includes(n))
    throw new TypeError(
      `${t} value must be ${r.join(" or ")}, received "${n}"`,
    );
}
function xn(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function zR(e) {
  return (
    e === Object.prototype || e === Function.prototype || e === RegExp.prototype
  );
}
function Uo(e) {
  return Object.prototype.toString.apply(e).slice(8, -1);
}
function VR(e, t) {
  let r = typeof t == "function" ? t : (n) => t.add(n);
  Object.getOwnPropertyNames(e).forEach(r),
    Object.getOwnPropertySymbols(e).forEach(r);
}
function Sp(e) {
  let t = new Set();
  return zR(e) ? [] : (VR(e, t), Array.from(t));
}
var Pp = { forceWritable: !1 };
function su(e, t = Pp) {
  return Ho(e, new WeakMap(), t);
}
function Ho(e, t, r = Pp) {
  let n, a;
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    for (a = Array((n = e.length)), t.set(e, a); n--; ) a[n] = Ho(e[n], t, r);
    return a;
  }
  if (Object.prototype.toString.call(e) === "[object Object]") {
    (a = Object.create(Object.getPrototypeOf(e))), t.set(e, a);
    let o = Sp(e);
    for (let i of o) {
      let l = Object.getOwnPropertyDescriptor(e, i);
      if (!l) continue;
      let u = Ho(e[i], t, r);
      r.forceWritable
        ? Object.defineProperty(a, i, {
            enumerable: l.enumerable,
            configurable: !0,
            writable: !0,
            value: u,
          })
        : "get" in l
          ? Object.defineProperty(a, i, {
              ...l,
              get() {
                return u;
              },
            })
          : Object.defineProperty(a, i, { ...l, value: u });
    }
    return a;
  }
  return e;
}
var uu = {
    bold: ["1", "22"],
    dim: ["2", "22"],
    italic: ["3", "23"],
    underline: ["4", "24"],
    inverse: ["7", "27"],
    hidden: ["8", "28"],
    strike: ["9", "29"],
    black: ["30", "39"],
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    magenta: ["35", "39"],
    cyan: ["36", "39"],
    white: ["37", "39"],
    brightblack: ["30;1", "39"],
    brightred: ["31;1", "39"],
    brightgreen: ["32;1", "39"],
    brightyellow: ["33;1", "39"],
    brightblue: ["34;1", "39"],
    brightmagenta: ["35;1", "39"],
    brightcyan: ["36;1", "39"],
    brightwhite: ["37;1", "39"],
    grey: ["90", "39"],
  },
  GR = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
  },
  gr = "…";
function WR(e, t) {
  let r = uu[GR[t]] || uu[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
function KR(
  {
    showHidden: e = !1,
    depth: t = 2,
    colors: r = !1,
    customInspect: n = !0,
    showProxy: a = !1,
    maxArrayLength: o = 1 / 0,
    breakLength: i = 1 / 0,
    seen: l = [],
    truncate: u = 1 / 0,
    stylize: c = String,
  } = {},
  s,
) {
  let d = {
    showHidden: !!e,
    depth: Number(t),
    colors: !!r,
    customInspect: !!n,
    showProxy: !!a,
    maxArrayLength: Number(o),
    breakLength: Number(i),
    truncate: Number(u),
    seen: l,
    inspect: s,
    stylize: c,
  };
  return d.colors && (d.stylize = WR), d;
}
function YR(e) {
  return e >= "\uD800" && e <= "\uDBFF";
}
function Lt(e, t, r = gr) {
  e = String(e);
  let n = r.length,
    a = e.length;
  if (n > t && a > n) return r;
  if (a > t && a > n) {
    let o = t - n;
    return o > 0 && YR(e[o - 1]) && (o = o - 1), `${e.slice(0, o)}${r}`;
  }
  return e;
}
function et(e, t, r, n = ", ") {
  r = r || t.inspect;
  let a = e.length;
  if (a === 0) return "";
  let o = t.truncate,
    i = "",
    l = "",
    u = "";
  for (let c = 0; c < a; c += 1) {
    let s = c + 1 === e.length,
      d = c + 2 === e.length;
    u = `${gr}(${e.length - c})`;
    let p = e[c];
    t.truncate = o - i.length - (s ? 0 : n.length);
    let f = l || r(p, t) + (s ? "" : n),
      h = i.length + f.length,
      m = h + u.length;
    if (
      (s && h > o && i.length + u.length <= o) ||
      (!s && !d && m > o) ||
      ((l = s ? "" : r(e[c + 1], t) + (d ? "" : n)),
      !s && d && m > o && h + l.length > o)
    )
      break;
    if (((i += f), !s && !d && h + l.length >= o)) {
      u = `${gr}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${i}${u}`;
}
function JR(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)
    ? e
    : JSON.stringify(e)
        .replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
}
function Yr([e, t], r) {
  return (
    (r.truncate -= 2),
    typeof e == "string"
      ? (e = JR(e))
      : typeof e != "number" && (e = `[${r.inspect(e, r)}]`),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e}: ${t}`
  );
}
function XR(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = et(e, t);
  t.truncate -= n.length;
  let a = "";
  return (
    r.length &&
      (a = et(
        r.map((o) => [o, e[o]]),
        t,
        Yr,
      )),
    `[ ${n}${a ? `, ${a}` : ""} ]`
  );
}
var QR = (e) =>
  typeof Buffer == "function" && e instanceof Buffer
    ? "Buffer"
    : e[Symbol.toStringTag]
      ? e[Symbol.toStringTag]
      : e.constructor.name;
function ft(e, t) {
  let r = QR(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let a = "";
  for (let i = 0; i < e.length; i++) {
    let l = `${t.stylize(Lt(e[i], t.truncate), "number")}${i === e.length - 1 ? "" : ", "}`;
    if (((t.truncate -= l.length), e[i] !== e.length && t.truncate <= 3)) {
      a += `${gr}(${e.length - e[i] + 1})`;
      break;
    }
    a += l;
  }
  let o = "";
  return (
    n.length &&
      (o = et(
        n.map((i) => [i, e[i]]),
        t,
        Yr,
      )),
    `${r}[ ${a}${o ? `, ${o}` : ""} ]`
  );
}
function ZR(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"),
    a = n[0];
  return t.stylize(`${a}T${Lt(n[1], t.truncate - a.length - 1)}`, "date");
}
function cu(e, t) {
  let r = e[Symbol.toStringTag] || "Function",
    n = e.name;
  return n
    ? t.stylize(`[${r} ${Lt(n, t.truncate - 11)}]`, "special")
    : t.stylize(`[${r}]`, "special");
}
function eT([e, t], r) {
  return (
    (r.truncate -= 4),
    (e = r.inspect(e, r)),
    (r.truncate -= e.length),
    (t = r.inspect(t, r)),
    `${e} => ${t}`
  );
}
function tT(e) {
  let t = [];
  return (
    e.forEach((r, n) => {
      t.push([n, r]);
    }),
    t
  );
}
function rT(e, t) {
  return e.size - 1 <= 0
    ? "Map{}"
    : ((t.truncate -= 7), `Map{ ${et(tT(e), t, eT)} }`);
}
var nT = Number.isNaN || ((e) => e !== e);
function du(e, t) {
  return nT(e)
    ? t.stylize("NaN", "number")
    : e === 1 / 0
      ? t.stylize("Infinity", "number")
      : e === -1 / 0
        ? t.stylize("-Infinity", "number")
        : e === 0
          ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number")
          : t.stylize(Lt(String(e), t.truncate), "number");
}
function fu(e, t) {
  let r = Lt(e.toString(), t.truncate - 1);
  return r !== gr && (r += "n"), t.stylize(r, "bigint");
}
function aT(e, t) {
  let r = e.toString().split("/")[2],
    n = t.truncate - (2 + r.length),
    a = e.source;
  return t.stylize(`/${Lt(a, n)}/${r}`, "regexp");
}
function oT(e) {
  let t = [];
  return (
    e.forEach((r) => {
      t.push(r);
    }),
    t
  );
}
function iT(e, t) {
  return e.size === 0 ? "Set{}" : ((t.truncate -= 7), `Set{ ${et(oT(e), t)} }`);
}
var pu = new RegExp(
    "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
    "g",
  ),
  lT = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\",
  },
  sT = 16,
  uT = 4;
function cT(e) {
  return lT[e] || `\\u${`0000${e.charCodeAt(0).toString(sT)}`.slice(-uT)}`;
}
function hu(e, t) {
  return (
    pu.test(e) && (e = e.replace(pu, cT)),
    t.stylize(`'${Lt(e, t.truncate - 2)}'`, "string")
  );
}
function mu(e) {
  return "description" in Symbol.prototype
    ? e.description
      ? `Symbol(${e.description})`
      : "Symbol()"
    : e.toString();
}
var Op = () => "Promise{…}";
try {
  let {
    getPromiseDetails: e,
    kPending: t,
    kRejected: r,
  } = process.binding("util");
  Array.isArray(e(Promise.resolve())) &&
    (Op = (n, a) => {
      let [o, i] = e(n);
      return o === t
        ? "Promise{<pending>}"
        : `Promise${o === r ? "!" : ""}{${a.inspect(i, a)}}`;
    });
} catch {}
var dT = Op;
function Mn(e, t) {
  let r = Object.getOwnPropertyNames(e),
    n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (((t.truncate -= 4), (t.seen = t.seen || []), t.seen.indexOf(e) >= 0))
    return "[Circular]";
  t.seen.push(e);
  let a = et(
      r.map((l) => [l, e[l]]),
      t,
      Yr,
    ),
    o = et(
      n.map((l) => [l, e[l]]),
      t,
      Yr,
    );
  t.seen.pop();
  let i = "";
  return a && o && (i = ", "), `{ ${a}${i}${o} }`;
}
var Ka = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function fT(e, t) {
  let r = "";
  return (
    Ka && Ka in e && (r = e[Ka]),
    (r = r || e.constructor.name),
    (!r || r === "_class") && (r = "<Anonymous Class>"),
    (t.truncate -= r.length),
    `${r}${Mn(e, t)}`
  );
}
function pT(e, t) {
  return e.length === 0
    ? "Arguments[]"
    : ((t.truncate -= 13), `Arguments[ ${et(e, t)} ]`);
}
var hT = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description",
];
function mT(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((i) => hT.indexOf(i) === -1),
    n = e.name;
  t.truncate -= n.length;
  let a = "";
  typeof e.message == "string"
    ? (a = Lt(e.message, t.truncate))
    : r.unshift("message"),
    (a = a ? `: ${a}` : ""),
    (t.truncate -= a.length + 5);
  let o = et(
    r.map((i) => [i, e[i]]),
    t,
    Yr,
  );
  return `${n}${a}${o ? ` { ${o} }` : ""}`;
}
function bT([e, t], r) {
  return (
    (r.truncate -= 3),
    t
      ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}`
      : `${r.stylize(String(e), "yellow")}`
  );
}
function zo(e, t) {
  return et(
    e,
    t,
    Ap,
    `
`,
  );
}
function Ap(e, t) {
  let r = e.getAttributeNames(),
    n = e.tagName.toLowerCase(),
    a = t.stylize(`<${n}`, "special"),
    o = t.stylize(">", "special"),
    i = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let l = "";
  r.length > 0 &&
    ((l += " "),
    (l += et(
      r.map((s) => [s, e.getAttribute(s)]),
      t,
      bT,
      " ",
    ))),
    (t.truncate -= l.length);
  let u = t.truncate,
    c = zo(e.children, t);
  return (
    c && c.length > u && (c = `${gr}(${e.children.length})`),
    `${a}${l}${o}${c}${i}`
  );
}
var gT = typeof Symbol == "function" && typeof Symbol.for == "function",
  Ya = gT ? Symbol.for("chai/inspect") : "@@chai/inspect",
  or = !1;
try {
  let e = u_("util");
  or = e.inspect ? e.inspect.custom : !1;
} catch {
  or = !1;
}
var bu = new WeakMap(),
  gu = {},
  yu = {
    undefined: (e, t) => t.stylize("undefined", "undefined"),
    null: (e, t) => t.stylize("null", "null"),
    boolean: (e, t) => t.stylize(String(e), "boolean"),
    Boolean: (e, t) => t.stylize(String(e), "boolean"),
    number: du,
    Number: du,
    bigint: fu,
    BigInt: fu,
    string: hu,
    String: hu,
    function: cu,
    Function: cu,
    symbol: mu,
    Symbol: mu,
    Array: XR,
    Date: ZR,
    Map: rT,
    Set: iT,
    RegExp: aT,
    Promise: dT,
    WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"),
    WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"),
    Arguments: pT,
    Int8Array: ft,
    Uint8Array: ft,
    Uint8ClampedArray: ft,
    Int16Array: ft,
    Uint16Array: ft,
    Int32Array: ft,
    Uint32Array: ft,
    Float32Array: ft,
    Float64Array: ft,
    Generator: () => "",
    DataView: () => "",
    ArrayBuffer: () => "",
    Error: mT,
    HTMLCollection: zo,
    NodeList: zo,
  },
  yT = (e, t, r) =>
    Ya in e && typeof e[Ya] == "function"
      ? e[Ya](t)
      : or && or in e && typeof e[or] == "function"
        ? e[or](t.depth, t)
        : "inspect" in e && typeof e.inspect == "function"
          ? e.inspect(t.depth, t)
          : "constructor" in e && bu.has(e.constructor)
            ? bu.get(e.constructor)(e, t)
            : gu[r]
              ? gu[r](e, t)
              : "",
  vT = Object.prototype.toString;
function Vo(e, t = {}) {
  let r = KR(t, Vo),
    { customInspect: n } = r,
    a = e === null ? "null" : typeof e;
  if ((a === "object" && (a = vT.call(e).slice(8, -1)), a in yu))
    return yu[a](e, r);
  if (n && e) {
    let i = yT(e, r, a);
    if (i) return typeof i == "string" ? i : Vo(i, r);
  }
  let o = e ? Object.getPrototypeOf(e) : !1;
  return o === Object.prototype || o === null
    ? Mn(e, r)
    : e && typeof HTMLElement == "function" && e instanceof HTMLElement
      ? Ap(e, r)
      : "constructor" in e
        ? e.constructor !== Object
          ? fT(e, r)
          : Mn(e, r)
        : e === Object(e)
          ? Mn(e, r)
          : r.stylize(String(e), a);
}
var _T = {
    reset: [0, 0],
    bold: [1, 22, "\x1B[22m\x1B[1m"],
    dim: [2, 22, "\x1B[22m\x1B[2m"],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    blackBright: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],
    bgBlackBright: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49],
  },
  ET = Object.entries(_T);
function _l(e) {
  return String(e);
}
_l.open = "";
_l.close = "";
function wT(e = !1) {
  let t = typeof process < "u" ? process : void 0,
    r = (t == null ? void 0 : t.env) || {},
    n = (t == null ? void 0 : t.argv) || [];
  return (
    (!("NO_COLOR" in r || n.includes("--no-color")) &&
      ("FORCE_COLOR" in r ||
        n.includes("--color") ||
        (t == null ? void 0 : t.platform) === "win32" ||
        (e && r.TERM !== "dumb") ||
        "CI" in r)) ||
    (typeof window < "u" && !!window.chrome)
  );
}
function CT(e = !1) {
  let t = wT(e),
    r = (i, l, u, c) => {
      let s = "",
        d = 0;
      do
        (s += i.substring(d, c) + u), (d = c + l.length), (c = i.indexOf(l, d));
      while (~c);
      return s + i.substring(d);
    },
    n = (i, l, u = i) => {
      let c = (s) => {
        let d = String(s),
          p = d.indexOf(l, i.length);
        return ~p ? i + r(d, l, u, p) + l : i + d + l;
      };
      return (c.open = i), (c.close = l), c;
    },
    a = { isColorSupported: t },
    o = (i) => `\x1B[${i}m`;
  for (let [i, l] of ET) a[i] = t ? n(o(l[0]), o(l[1]), l[2]) : _l;
  return a;
}
var ve = CT(!1);
function RT(e, t) {
  let r = Object.keys(e),
    n = t === null ? r : r.sort(t);
  if (Object.getOwnPropertySymbols)
    for (let a of Object.getOwnPropertySymbols(e))
      Object.getOwnPropertyDescriptor(e, a).enumerable && n.push(a);
  return n;
}
function Sa(e, t, r, n, a, o, i = ": ") {
  let l = "",
    u = 0,
    c = e.next();
  if (!c.done) {
    l += t.spacingOuter;
    let s = r + t.indent;
    for (; !c.done; ) {
      if (((l += s), u++ === t.maxWidth)) {
        l += "…";
        break;
      }
      let d = o(c.value[0], t, s, n, a),
        p = o(c.value[1], t, s, n, a);
      (l += d + i + p),
        (c = e.next()),
        c.done ? t.min || (l += ",") : (l += `,${t.spacingInner}`);
    }
    l += t.spacingOuter + r;
  }
  return l;
}
function El(e, t, r, n, a, o) {
  let i = "",
    l = 0,
    u = e.next();
  if (!u.done) {
    i += t.spacingOuter;
    let c = r + t.indent;
    for (; !u.done; ) {
      if (((i += c), l++ === t.maxWidth)) {
        i += "…";
        break;
      }
      (i += o(u.value, t, c, n, a)),
        (u = e.next()),
        u.done ? t.min || (i += ",") : (i += `,${t.spacingInner}`);
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function Gn(e, t, r, n, a, o) {
  let i = "";
  e = e instanceof ArrayBuffer ? new DataView(e) : e;
  let l = (c) => c instanceof DataView,
    u = l(e) ? e.byteLength : e.length;
  if (u > 0) {
    i += t.spacingOuter;
    let c = r + t.indent;
    for (let s = 0; s < u; s++) {
      if (((i += c), s === t.maxWidth)) {
        i += "…";
        break;
      }
      (l(e) || s in e) && (i += o(l(e) ? e.getInt8(s) : e[s], t, c, n, a)),
        s < u - 1 ? (i += `,${t.spacingInner}`) : t.min || (i += ",");
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function wl(e, t, r, n, a, o) {
  let i = "",
    l = RT(e, t.compareKeys);
  if (l.length > 0) {
    i += t.spacingOuter;
    let u = r + t.indent;
    for (let c = 0; c < l.length; c++) {
      let s = l[c],
        d = o(s, t, u, n, a),
        p = o(e[s], t, u, n, a);
      (i += `${u + d}: ${p}`),
        c < l.length - 1 ? (i += `,${t.spacingInner}`) : t.min || (i += ",");
    }
    i += t.spacingOuter + r;
  }
  return i;
}
var TT =
    typeof Symbol == "function" && Symbol.for
      ? Symbol.for("jest.asymmetricMatcher")
      : 1267621,
  Ja = " ",
  ST = (e, t, r, n, a, o) => {
    let i = e.toString();
    if (i === "ArrayContaining" || i === "ArrayNotContaining")
      return ++n > t.maxDepth
        ? `[${i}]`
        : `${i + Ja}[${Gn(e.sample, t, r, n, a, o)}]`;
    if (i === "ObjectContaining" || i === "ObjectNotContaining")
      return ++n > t.maxDepth
        ? `[${i}]`
        : `${i + Ja}{${wl(e.sample, t, r, n, a, o)}}`;
    if (
      i === "StringMatching" ||
      i === "StringNotMatching" ||
      i === "StringContaining" ||
      i === "StringNotContaining"
    )
      return i + Ja + o(e.sample, t, r, n, a);
    if (typeof e.toAsymmetricMatcher != "function")
      throw new TypeError(
        `Asymmetric matcher ${e.constructor.name} does not implement toAsymmetricMatcher()`,
      );
    return e.toAsymmetricMatcher();
  },
  PT = (e) => e && e.$$typeof === TT,
  OT = { serialize: ST, test: PT },
  AT = " ",
  qp = new Set(["DOMStringMap", "NamedNodeMap"]),
  qT = /^(?:HTML\w*Collection|NodeList)$/;
function xT(e) {
  return qp.has(e) || qT.test(e);
}
var MT = (e) =>
  e && e.constructor && !!e.constructor.name && xT(e.constructor.name);
function $T(e) {
  return e.constructor.name === "NamedNodeMap";
}
var NT = (e, t, r, n, a, o) => {
    let i = e.constructor.name;
    return ++n > t.maxDepth
      ? `[${i}]`
      : (t.min ? "" : i + AT) +
          (qp.has(i)
            ? `{${wl($T(e) ? [...e].reduce((l, u) => ((l[u.name] = u.value), l), {}) : { ...e }, t, r, n, a, o)}}`
            : `[${Gn([...e], t, r, n, a, o)}]`);
  },
  jT = { serialize: NT, test: MT };
function xp(e) {
  return e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function Cl(e, t, r, n, a, o, i) {
  let l = n + r.indent,
    u = r.colors;
  return e
    .map((c) => {
      let s = t[c],
        d = i(s, r, l, a, o);
      return (
        typeof s != "string" &&
          (d.includes(`
`) && (d = r.spacingOuter + l + d + r.spacingOuter + n),
          (d = `{${d}}`)),
        `${r.spacingInner + n + u.prop.open + c + u.prop.close}=${u.value.open}${d}${u.value.close}`
      );
    })
    .join("");
}
function Rl(e, t, r, n, a, o) {
  return e
    .map(
      (i) =>
        t.spacingOuter +
        r +
        (typeof i == "string" ? Mp(i, t) : o(i, t, r, n, a)),
    )
    .join("");
}
function Mp(e, t) {
  let r = t.colors.content;
  return r.open + xp(e) + r.close;
}
function IT(e, t) {
  let r = t.colors.comment;
  return `${r.open}<!--${xp(e)}-->${r.close}`;
}
function Tl(e, t, r, n, a) {
  let o = n.colors.tag;
  return `${o.open}<${e}${t && o.close + t + n.spacingOuter + a + o.open}${r ? `>${o.close}${r}${n.spacingOuter}${a}${o.open}</${e}` : `${t && !n.min ? "" : " "}/`}>${o.close}`;
}
function Sl(e, t) {
  let r = t.colors.tag;
  return `${r.open}<${e}${r.close} …${r.open} />${r.close}`;
}
var LT = 1,
  $p = 3,
  Np = 8,
  jp = 11,
  BT = /^(?:(?:HTML|SVG)\w*)?Element$/;
function kT(e) {
  try {
    return typeof e.hasAttribute == "function" && e.hasAttribute("is");
  } catch {
    return !1;
  }
}
function DT(e) {
  let t = e.constructor.name,
    { nodeType: r, tagName: n } = e,
    a = (typeof n == "string" && n.includes("-")) || kT(e);
  return (
    (r === LT && (BT.test(t) || a)) ||
    (r === $p && t === "Text") ||
    (r === Np && t === "Comment") ||
    (r === jp && t === "DocumentFragment")
  );
}
var FT = (e) => {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.name) &&
    DT(e)
  );
};
function UT(e) {
  return e.nodeType === $p;
}
function HT(e) {
  return e.nodeType === Np;
}
function Xa(e) {
  return e.nodeType === jp;
}
var zT = (e, t, r, n, a, o) => {
    if (UT(e)) return Mp(e.data, t);
    if (HT(e)) return IT(e.data, t);
    let i = Xa(e) ? "DocumentFragment" : e.tagName.toLowerCase();
    return ++n > t.maxDepth
      ? Sl(i, t)
      : Tl(
          i,
          Cl(
            Xa(e) ? [] : Array.from(e.attributes, (l) => l.name).sort(),
            Xa(e)
              ? {}
              : [...e.attributes].reduce(
                  (l, u) => ((l[u.name] = u.value), l),
                  {},
                ),
            t,
            r + t.indent,
            n,
            a,
            o,
          ),
          Rl(
            Array.prototype.slice.call(e.childNodes || e.children),
            t,
            r + t.indent,
            n,
            a,
            o,
          ),
          t,
          r,
        );
  },
  VT = { serialize: zT, test: FT },
  GT = "@@__IMMUTABLE_ITERABLE__@@",
  WT = "@@__IMMUTABLE_LIST__@@",
  KT = "@@__IMMUTABLE_KEYED__@@",
  YT = "@@__IMMUTABLE_MAP__@@",
  vu = "@@__IMMUTABLE_ORDERED__@@",
  JT = "@@__IMMUTABLE_RECORD__@@",
  XT = "@@__IMMUTABLE_SEQ__@@",
  QT = "@@__IMMUTABLE_SET__@@",
  ZT = "@@__IMMUTABLE_STACK__@@",
  yr = (e) => `Immutable.${e}`,
  Pa = (e) => `[${e}]`,
  Jr = " ",
  _u = "…";
function eS(e, t, r, n, a, o, i) {
  return ++n > t.maxDepth
    ? Pa(yr(i))
    : `${yr(i) + Jr}{${Sa(e.entries(), t, r, n, a, o)}}`;
}
function tS(e) {
  let t = 0;
  return {
    next() {
      if (t < e._keys.length) {
        let r = e._keys[t++];
        return { done: !1, value: [r, e.get(r)] };
      }
      return { done: !0, value: void 0 };
    },
  };
}
function rS(e, t, r, n, a, o) {
  let i = yr(e._name || "Record");
  return ++n > t.maxDepth ? Pa(i) : `${i + Jr}{${Sa(tS(e), t, r, n, a, o)}}`;
}
function nS(e, t, r, n, a, o) {
  let i = yr("Seq");
  return ++n > t.maxDepth
    ? Pa(i)
    : e[KT]
      ? `${i + Jr}{${e._iter || e._object ? Sa(e.entries(), t, r, n, a, o) : _u}}`
      : `${i + Jr}[${e._iter || e._array || e._collection || e._iterable ? El(e.values(), t, r, n, a, o) : _u}]`;
}
function Qa(e, t, r, n, a, o, i) {
  return ++n > t.maxDepth
    ? Pa(yr(i))
    : `${yr(i) + Jr}[${El(e.values(), t, r, n, a, o)}]`;
}
var aS = (e, t, r, n, a, o) =>
    e[YT]
      ? eS(e, t, r, n, a, o, e[vu] ? "OrderedMap" : "Map")
      : e[WT]
        ? Qa(e, t, r, n, a, o, "List")
        : e[QT]
          ? Qa(e, t, r, n, a, o, e[vu] ? "OrderedSet" : "Set")
          : e[ZT]
            ? Qa(e, t, r, n, a, o, "Stack")
            : e[XT]
              ? nS(e, t, r, n, a, o)
              : rS(e, t, r, n, a, o),
  oS = (e) => e && (e[GT] === !0 || e[JT] === !0),
  iS = { serialize: aS, test: oS },
  Ip = { exports: {} },
  oe = {},
  Eu;
function lS() {
  return (
    Eu ||
      ((Eu = 1),
      (function () {
        var e = Symbol.for("react.element"),
          t = Symbol.for("react.portal"),
          r = Symbol.for("react.fragment"),
          n = Symbol.for("react.strict_mode"),
          a = Symbol.for("react.profiler"),
          o = Symbol.for("react.provider"),
          i = Symbol.for("react.context"),
          l = Symbol.for("react.server_context"),
          u = Symbol.for("react.forward_ref"),
          c = Symbol.for("react.suspense"),
          s = Symbol.for("react.suspense_list"),
          d = Symbol.for("react.memo"),
          p = Symbol.for("react.lazy"),
          f = Symbol.for("react.offscreen"),
          h = !1,
          m = !1,
          g = !1,
          b = !1,
          y = !1,
          R;
        R = Symbol.for("react.module.reference");
        function _($) {
          return !!(
            typeof $ == "string" ||
            typeof $ == "function" ||
            $ === r ||
            $ === a ||
            y ||
            $ === n ||
            $ === c ||
            $ === s ||
            b ||
            $ === f ||
            h ||
            m ||
            g ||
            (typeof $ == "object" &&
              $ !== null &&
              ($.$$typeof === p ||
                $.$$typeof === d ||
                $.$$typeof === o ||
                $.$$typeof === i ||
                $.$$typeof === u ||
                $.$$typeof === R ||
                $.getModuleId !== void 0))
          );
        }
        function C($) {
          if (typeof $ == "object" && $ !== null) {
            var se = $.$$typeof;
            switch (se) {
              case e:
                var ue = $.type;
                switch (ue) {
                  case r:
                  case a:
                  case n:
                  case c:
                  case s:
                    return ue;
                  default:
                    var we = ue && ue.$$typeof;
                    switch (we) {
                      case l:
                      case i:
                      case u:
                      case p:
                      case d:
                      case o:
                        return we;
                      default:
                        return se;
                    }
                }
              case t:
                return se;
            }
          }
        }
        var w = i,
          v = o,
          E = e,
          O = u,
          M = r,
          N = p,
          k = d,
          j = t,
          I = a,
          B = n,
          z = c,
          K = s,
          W = !1,
          re = !1;
        function me($) {
          return (
            W ||
              ((W = !0),
              console.warn(
                "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function de($) {
          return (
            re ||
              ((re = !0),
              console.warn(
                "The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.",
              )),
            !1
          );
        }
        function F($) {
          return C($) === i;
        }
        function L($) {
          return C($) === o;
        }
        function D($) {
          return typeof $ == "object" && $ !== null && $.$$typeof === e;
        }
        function G($) {
          return C($) === u;
        }
        function Y($) {
          return C($) === r;
        }
        function ne($) {
          return C($) === p;
        }
        function fe($) {
          return C($) === d;
        }
        function Be($) {
          return C($) === t;
        }
        function q($) {
          return C($) === a;
        }
        function V($) {
          return C($) === n;
        }
        function U($) {
          return C($) === c;
        }
        function Q($) {
          return C($) === s;
        }
        (oe.ContextConsumer = w),
          (oe.ContextProvider = v),
          (oe.Element = E),
          (oe.ForwardRef = O),
          (oe.Fragment = M),
          (oe.Lazy = N),
          (oe.Memo = k),
          (oe.Portal = j),
          (oe.Profiler = I),
          (oe.StrictMode = B),
          (oe.Suspense = z),
          (oe.SuspenseList = K),
          (oe.isAsyncMode = me),
          (oe.isConcurrentMode = de),
          (oe.isContextConsumer = F),
          (oe.isContextProvider = L),
          (oe.isElement = D),
          (oe.isForwardRef = G),
          (oe.isFragment = Y),
          (oe.isLazy = ne),
          (oe.isMemo = fe),
          (oe.isPortal = Be),
          (oe.isProfiler = q),
          (oe.isStrictMode = V),
          (oe.isSuspense = U),
          (oe.isSuspenseList = Q),
          (oe.isValidElementType = _),
          (oe.typeOf = C);
      })()),
    oe
  );
}
Ip.exports = lS();
var Ft = Ip.exports;
function Lp(e, t = []) {
  if (Array.isArray(e)) for (let r of e) Lp(r, t);
  else e != null && e !== !1 && e !== "" && t.push(e);
  return t;
}
function wu(e) {
  let t = e.type;
  if (typeof t == "string") return t;
  if (typeof t == "function") return t.displayName || t.name || "Unknown";
  if (Ft.isFragment(e)) return "React.Fragment";
  if (Ft.isSuspense(e)) return "React.Suspense";
  if (typeof t == "object" && t !== null) {
    if (Ft.isContextProvider(e)) return "Context.Provider";
    if (Ft.isContextConsumer(e)) return "Context.Consumer";
    if (Ft.isForwardRef(e)) {
      if (t.displayName) return t.displayName;
      let r = t.render.displayName || t.render.name || "";
      return r === "" ? "ForwardRef" : `ForwardRef(${r})`;
    }
    if (Ft.isMemo(e)) {
      let r = t.displayName || t.type.displayName || t.type.name || "";
      return r === "" ? "Memo" : `Memo(${r})`;
    }
  }
  return "UNDEFINED";
}
function sS(e) {
  let { props: t } = e;
  return Object.keys(t)
    .filter((r) => r !== "children" && t[r] !== void 0)
    .sort();
}
var uS = (e, t, r, n, a, o) =>
    ++n > t.maxDepth
      ? Sl(wu(e), t)
      : Tl(
          wu(e),
          Cl(sS(e), e.props, t, r + t.indent, n, a, o),
          Rl(Lp(e.props.children), t, r + t.indent, n, a, o),
          t,
          r,
        ),
  cS = (e) => e != null && Ft.isElement(e),
  dS = { serialize: uS, test: cS },
  fS =
    typeof Symbol == "function" && Symbol.for
      ? Symbol.for("react.test.json")
      : 245830487;
function pS(e) {
  let { props: t } = e;
  return t
    ? Object.keys(t)
        .filter((r) => t[r] !== void 0)
        .sort()
    : [];
}
var hS = (e, t, r, n, a, o) =>
    ++n > t.maxDepth
      ? Sl(e.type, t)
      : Tl(
          e.type,
          e.props ? Cl(pS(e), e.props, t, r + t.indent, n, a, o) : "",
          e.children ? Rl(e.children, t, r + t.indent, n, a, o) : "",
          t,
          r,
        ),
  mS = (e) => e && e.$$typeof === fS,
  bS = { serialize: hS, test: mS },
  Bp = Object.prototype.toString,
  gS = Date.prototype.toISOString,
  yS = Error.prototype.toString,
  Cu = RegExp.prototype.toString;
function Za(e) {
  return (typeof e.constructor == "function" && e.constructor.name) || "Object";
}
function vS(e) {
  return typeof window < "u" && e === window;
}
var _S = /^Symbol\((.*)\)(.*)$/,
  ES = /\n/g,
  kp = class extends Error {
    constructor(e, t) {
      super(e), (this.stack = t), (this.name = this.constructor.name);
    }
  };
function wS(e) {
  return (
    e === "[object Array]" ||
    e === "[object ArrayBuffer]" ||
    e === "[object DataView]" ||
    e === "[object Float32Array]" ||
    e === "[object Float64Array]" ||
    e === "[object Int8Array]" ||
    e === "[object Int16Array]" ||
    e === "[object Int32Array]" ||
    e === "[object Uint8Array]" ||
    e === "[object Uint8ClampedArray]" ||
    e === "[object Uint16Array]" ||
    e === "[object Uint32Array]"
  );
}
function CS(e) {
  return Object.is(e, -0) ? "-0" : String(e);
}
function RS(e) {
  return `${e}n`;
}
function Ru(e, t) {
  return t ? `[Function ${e.name || "anonymous"}]` : "[Function]";
}
function Tu(e) {
  return String(e).replace(_S, "Symbol($1)");
}
function Su(e) {
  return `[${yS.call(e)}]`;
}
function Dp(e, t, r, n) {
  if (e === !0 || e === !1) return `${e}`;
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  let a = typeof e;
  if (a === "number") return CS(e);
  if (a === "bigint") return RS(e);
  if (a === "string")
    return n ? `"${e.replaceAll(/"|\\/g, "\\$&")}"` : `"${e}"`;
  if (a === "function") return Ru(e, t);
  if (a === "symbol") return Tu(e);
  let o = Bp.call(e);
  return o === "[object WeakMap]"
    ? "WeakMap {}"
    : o === "[object WeakSet]"
      ? "WeakSet {}"
      : o === "[object Function]" || o === "[object GeneratorFunction]"
        ? Ru(e, t)
        : o === "[object Symbol]"
          ? Tu(e)
          : o === "[object Date]"
            ? Number.isNaN(+e)
              ? "Date { NaN }"
              : gS.call(e)
            : o === "[object Error]"
              ? Su(e)
              : o === "[object RegExp]"
                ? r
                  ? Cu.call(e).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&")
                  : Cu.call(e)
                : e instanceof Error
                  ? Su(e)
                  : null;
}
function Fp(e, t, r, n, a, o) {
  if (a.includes(e)) return "[Circular]";
  (a = [...a]), a.push(e);
  let i = ++n > t.maxDepth,
    l = t.min;
  if (t.callToJSON && !i && e.toJSON && typeof e.toJSON == "function" && !o)
    return At(e.toJSON(), t, r, n, a, !0);
  let u = Bp.call(e);
  return u === "[object Arguments]"
    ? i
      ? "[Arguments]"
      : `${l ? "" : "Arguments "}[${Gn(e, t, r, n, a, At)}]`
    : wS(u)
      ? i
        ? `[${e.constructor.name}]`
        : `${l || (!t.printBasicPrototype && e.constructor.name === "Array") ? "" : `${e.constructor.name} `}[${Gn(e, t, r, n, a, At)}]`
      : u === "[object Map]"
        ? i
          ? "[Map]"
          : `Map {${Sa(e.entries(), t, r, n, a, At, " => ")}}`
        : u === "[object Set]"
          ? i
            ? "[Set]"
            : `Set {${El(e.values(), t, r, n, a, At)}}`
          : i || vS(e)
            ? `[${Za(e)}]`
            : `${l || (!t.printBasicPrototype && Za(e) === "Object") ? "" : `${Za(e)} `}{${wl(e, t, r, n, a, At)}}`;
}
function TS(e) {
  return e.serialize != null;
}
function Up(e, t, r, n, a, o) {
  let i;
  try {
    i = TS(e)
      ? e.serialize(t, r, n, a, o, At)
      : e.print(
          t,
          (l) => At(l, r, n, a, o),
          (l) => {
            let u = n + r.indent;
            return (
              u +
              l.replaceAll(
                ES,
                `
${u}`,
              )
            );
          },
          { edgeSpacing: r.spacingOuter, min: r.min, spacing: r.spacingInner },
          r.colors,
        );
  } catch (l) {
    throw new kp(l.message, l.stack);
  }
  if (typeof i != "string")
    throw new TypeError(
      `pretty-format: Plugin must return type "string" but instead returned "${typeof i}".`,
    );
  return i;
}
function Hp(e, t) {
  for (let r of e)
    try {
      if (r.test(t)) return r;
    } catch (n) {
      throw new kp(n.message, n.stack);
    }
  return null;
}
function At(e, t, r, n, a, o) {
  let i = Hp(t.plugins, e);
  if (i !== null) return Up(i, e, t, r, n, a);
  let l = Dp(e, t.printFunctionName, t.escapeRegex, t.escapeString);
  return l !== null ? l : Fp(e, t, r, n, a, o);
}
var Pl = {
    comment: "gray",
    content: "reset",
    prop: "yellow",
    tag: "cyan",
    value: "green",
  },
  zp = Object.keys(Pl),
  Ke = {
    callToJSON: !0,
    compareKeys: void 0,
    escapeRegex: !1,
    escapeString: !0,
    highlight: !1,
    indent: 2,
    maxDepth: Number.POSITIVE_INFINITY,
    maxWidth: Number.POSITIVE_INFINITY,
    min: !1,
    plugins: [],
    printBasicPrototype: !0,
    printFunctionName: !0,
    theme: Pl,
  };
function SS(e) {
  for (let t of Object.keys(e))
    if (!Object.prototype.hasOwnProperty.call(Ke, t))
      throw new Error(`pretty-format: Unknown option "${t}".`);
  if (e.min && e.indent !== void 0 && e.indent !== 0)
    throw new Error(
      'pretty-format: Options "min" and "indent" cannot be used together.',
    );
}
function PS() {
  return zp.reduce((e, t) => {
    let r = Pl[t],
      n = r && ve[r];
    if (n && typeof n.close == "string" && typeof n.open == "string") e[t] = n;
    else
      throw new Error(
        `pretty-format: Option "theme" has a key "${t}" whose value "${r}" is undefined in ansi-styles.`,
      );
    return e;
  }, Object.create(null));
}
function OS() {
  return zp.reduce(
    (e, t) => ((e[t] = { close: "", open: "" }), e),
    Object.create(null),
  );
}
function Vp(e) {
  return (e == null ? void 0 : e.printFunctionName) ?? Ke.printFunctionName;
}
function Gp(e) {
  return (e == null ? void 0 : e.escapeRegex) ?? Ke.escapeRegex;
}
function Wp(e) {
  return (e == null ? void 0 : e.escapeString) ?? Ke.escapeString;
}
function Pu(e) {
  return {
    callToJSON: (e == null ? void 0 : e.callToJSON) ?? Ke.callToJSON,
    colors: e != null && e.highlight ? PS() : OS(),
    compareKeys:
      typeof (e == null ? void 0 : e.compareKeys) == "function" ||
      (e == null ? void 0 : e.compareKeys) === null
        ? e.compareKeys
        : Ke.compareKeys,
    escapeRegex: Gp(e),
    escapeString: Wp(e),
    indent:
      e != null && e.min
        ? ""
        : AS((e == null ? void 0 : e.indent) ?? Ke.indent),
    maxDepth: (e == null ? void 0 : e.maxDepth) ?? Ke.maxDepth,
    maxWidth: (e == null ? void 0 : e.maxWidth) ?? Ke.maxWidth,
    min: (e == null ? void 0 : e.min) ?? Ke.min,
    plugins: (e == null ? void 0 : e.plugins) ?? Ke.plugins,
    printBasicPrototype: (e == null ? void 0 : e.printBasicPrototype) ?? !0,
    printFunctionName: Vp(e),
    spacingInner:
      e != null && e.min
        ? " "
        : `
`,
    spacingOuter:
      e != null && e.min
        ? ""
        : `
`,
  };
}
function AS(e) {
  return Array.from({ length: e + 1 }).join(" ");
}
function at(e, t) {
  if (t && (SS(t), t.plugins)) {
    let n = Hp(t.plugins, e);
    if (n !== null) return Up(n, e, Pu(t), "", 0, []);
  }
  let r = Dp(e, Vp(t), Gp(t), Wp(t));
  return r !== null ? r : Fp(e, Pu(t), "", 0, []);
}
var Kp = {
    AsymmetricMatcher: OT,
    DOMCollection: jT,
    DOMElement: VT,
    Immutable: iS,
    ReactElement: dS,
    ReactTestComponent: bS,
  },
  {
    AsymmetricMatcher: qS,
    DOMCollection: xS,
    DOMElement: MS,
    Immutable: $S,
    ReactElement: NS,
    ReactTestComponent: jS,
  } = Kp,
  Ou = [jS, NS, MS, xS, $S, qS];
function Ge(e, t = 10, { maxLength: r, ...n } = {}) {
  let a = r ?? 1e4,
    o;
  try {
    o = at(e, { maxDepth: t, escapeString: !1, plugins: Ou, ...n });
  } catch {
    o = at(e, {
      callToJSON: !1,
      maxDepth: t,
      escapeString: !1,
      plugins: Ou,
      ...n,
    });
  }
  return o.length >= a && t > 1 ? Ge(e, Math.floor(t / 2)) : o;
}
var IS = /%[sdjifoOc%]/g;
function LS(...e) {
  if (typeof e[0] != "string") {
    let o = [];
    for (let i = 0; i < e.length; i++)
      o.push(Nr(e[i], { depth: 0, colors: !1 }));
    return o.join(" ");
  }
  let t = e.length,
    r = 1,
    n = e[0],
    a = String(n).replace(IS, (o) => {
      if (o === "%%") return "%";
      if (r >= t) return o;
      switch (o) {
        case "%s": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : typeof i == "number" && i === 0 && 1 / i < 0
              ? "-0"
              : typeof i == "object" && i !== null
                ? Nr(i, { depth: 0, colors: !1 })
                : String(i);
        }
        case "%d": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : Number(i).toString();
        }
        case "%i": {
          let i = e[r++];
          return typeof i == "bigint"
            ? `${i.toString()}n`
            : Number.parseInt(String(i)).toString();
        }
        case "%f":
          return Number.parseFloat(String(e[r++])).toString();
        case "%o":
          return Nr(e[r++], { showHidden: !0, showProxy: !0 });
        case "%O":
          return Nr(e[r++]);
        case "%c":
          return r++, "";
        case "%j":
          try {
            return JSON.stringify(e[r++]);
          } catch (i) {
            let l = i.message;
            if (
              l.includes("circular structure") ||
              l.includes("cyclic structures") ||
              l.includes("cyclic object")
            )
              return "[Circular]";
            throw i;
          }
        default:
          return o;
      }
    });
  for (let o = e[r]; r < t; o = e[++r])
    o === null || typeof o != "object" ? (a += ` ${o}`) : (a += ` ${Nr(o)}`);
  return a;
}
function Nr(e, t = {}) {
  return t.truncate === 0 && (t.truncate = Number.POSITIVE_INFINITY), Vo(e, t);
}
var Yp;
Yp = /\r?\n|[\r\u2028\u2029]/y;
RegExp(Yp.source);
var Jp = {
  keyword: [
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "const",
    "while",
    "with",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "export",
    "import",
    "null",
    "true",
    "false",
    "in",
    "instanceof",
    "typeof",
    "void",
    "delete",
  ],
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield",
  ],
};
new Set(Jp.keyword);
new Set(Jp.strict);
function Au(e) {
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  if (Array.isArray(e)) return "array";
  if (typeof e == "boolean") return "boolean";
  if (typeof e == "function") return "function";
  if (typeof e == "number") return "number";
  if (typeof e == "string") return "string";
  if (typeof e == "bigint") return "bigint";
  if (typeof e == "object") {
    if (e != null) {
      if (e.constructor === RegExp) return "regexp";
      if (e.constructor === Map) return "map";
      if (e.constructor === Set) return "set";
      if (e.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof e == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${e}`);
}
var qe = -1,
  Se = 1,
  Ee = 0,
  ge = class {
    constructor(e, t) {
      ye(this, 0);
      ye(this, 1);
      (this[0] = e), (this[1] = t);
    }
  },
  BS = function (e, t) {
    if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
    let r = 0,
      n = Math.min(e.length, t.length),
      a = n,
      o = 0;
    for (; r < a; )
      e.substring(o, a) === t.substring(o, a) ? ((r = a), (o = r)) : (n = a),
        (a = Math.floor((n - r) / 2 + r));
    return a;
  },
  Xp = function (e, t) {
    if (!e || !t || e.charAt(e.length - 1) !== t.charAt(t.length - 1)) return 0;
    let r = 0,
      n = Math.min(e.length, t.length),
      a = n,
      o = 0;
    for (; r < a; )
      e.substring(e.length - a, e.length - o) ===
      t.substring(t.length - a, t.length - o)
        ? ((r = a), (o = r))
        : (n = a),
        (a = Math.floor((n - r) / 2 + r));
    return a;
  },
  qu = function (e, t) {
    let r = e.length,
      n = t.length;
    if (r === 0 || n === 0) return 0;
    r > n ? (e = e.substring(r - n)) : r < n && (t = t.substring(0, r));
    let a = Math.min(r, n);
    if (e === t) return a;
    let o = 0,
      i = 1;
    for (;;) {
      let l = e.substring(a - i),
        u = t.indexOf(l);
      if (u === -1) return o;
      (i += u),
        (u === 0 || e.substring(a - i) === t.substring(0, i)) && ((o = i), i++);
    }
  },
  kS = function (e) {
    let t = !1,
      r = [],
      n = 0,
      a = null,
      o = 0,
      i = 0,
      l = 0,
      u = 0,
      c = 0;
    for (; o < e.length; )
      e[o][0] === Ee
        ? ((r[n++] = o), (i = u), (l = c), (u = 0), (c = 0), (a = e[o][1]))
        : (e[o][0] === Se ? (u += e[o][1].length) : (c += e[o][1].length),
          a &&
            a.length <= Math.max(i, l) &&
            a.length <= Math.max(u, c) &&
            (e.splice(r[n - 1], 0, new ge(qe, a)),
            (e[r[n - 1] + 1][0] = Se),
            n--,
            n--,
            (o = n > 0 ? r[n - 1] : -1),
            (i = 0),
            (l = 0),
            (u = 0),
            (c = 0),
            (a = null),
            (t = !0))),
        o++;
    for (t && Qp(e), US(e), o = 1; o < e.length; ) {
      if (e[o - 1][0] === qe && e[o][0] === Se) {
        let s = e[o - 1][1],
          d = e[o][1],
          p = qu(s, d),
          f = qu(d, s);
        p >= f
          ? (p >= s.length / 2 || p >= d.length / 2) &&
            (e.splice(o, 0, new ge(Ee, d.substring(0, p))),
            (e[o - 1][1] = s.substring(0, s.length - p)),
            (e[o + 1][1] = d.substring(p)),
            o++)
          : (f >= s.length / 2 || f >= d.length / 2) &&
            (e.splice(o, 0, new ge(Ee, s.substring(0, f))),
            (e[o - 1][0] = Se),
            (e[o - 1][1] = d.substring(0, d.length - f)),
            (e[o + 1][0] = qe),
            (e[o + 1][1] = s.substring(f)),
            o++),
          o++;
      }
      o++;
    }
  },
  xu = /[^a-z0-9]/i,
  Mu = /\s/,
  $u = /[\r\n]/,
  DS = /\n\r?\n$/,
  FS = /^\r?\n\r?\n/;
function US(e) {
  function t(n, a) {
    if (!n || !a) return 6;
    let o = n.charAt(n.length - 1),
      i = a.charAt(0),
      l = o.match(xu),
      u = i.match(xu),
      c = l && o.match(Mu),
      s = u && i.match(Mu),
      d = c && o.match($u),
      p = s && i.match($u),
      f = d && n.match(DS),
      h = p && a.match(FS);
    return f || h
      ? 5
      : d || p
        ? 4
        : l && !c && s
          ? 3
          : c || s
            ? 2
            : l || u
              ? 1
              : 0;
  }
  let r = 1;
  for (; r < e.length - 1; ) {
    if (e[r - 1][0] === Ee && e[r + 1][0] === Ee) {
      let n = e[r - 1][1],
        a = e[r][1],
        o = e[r + 1][1],
        i = Xp(n, a);
      if (i) {
        let d = a.substring(a.length - i);
        (n = n.substring(0, n.length - i)),
          (a = d + a.substring(0, a.length - i)),
          (o = d + o);
      }
      let l = n,
        u = a,
        c = o,
        s = t(n, a) + t(a, o);
      for (; a.charAt(0) === o.charAt(0); ) {
        (n += a.charAt(0)),
          (a = a.substring(1) + o.charAt(0)),
          (o = o.substring(1));
        let d = t(n, a) + t(a, o);
        d >= s && ((s = d), (l = n), (u = a), (c = o));
      }
      e[r - 1][1] !== l &&
        (l ? (e[r - 1][1] = l) : (e.splice(r - 1, 1), r--),
        (e[r][1] = u),
        c ? (e[r + 1][1] = c) : (e.splice(r + 1, 1), r--));
    }
    r++;
  }
}
function Qp(e) {
  e.push(new ge(Ee, ""));
  let t = 0,
    r = 0,
    n = 0,
    a = "",
    o = "",
    i;
  for (; t < e.length; )
    switch (e[t][0]) {
      case Se:
        n++, (o += e[t][1]), t++;
        break;
      case qe:
        r++, (a += e[t][1]), t++;
        break;
      case Ee:
        r + n > 1
          ? (r !== 0 &&
              n !== 0 &&
              ((i = BS(o, a)),
              i !== 0 &&
                (t - r - n > 0 && e[t - r - n - 1][0] === Ee
                  ? (e[t - r - n - 1][1] += o.substring(0, i))
                  : (e.splice(0, 0, new ge(Ee, o.substring(0, i))), t++),
                (o = o.substring(i)),
                (a = a.substring(i))),
              (i = Xp(o, a)),
              i !== 0 &&
                ((e[t][1] = o.substring(o.length - i) + e[t][1]),
                (o = o.substring(0, o.length - i)),
                (a = a.substring(0, a.length - i)))),
            (t -= r + n),
            e.splice(t, r + n),
            a.length && (e.splice(t, 0, new ge(qe, a)), t++),
            o.length && (e.splice(t, 0, new ge(Se, o)), t++),
            t++)
          : t !== 0 && e[t - 1][0] === Ee
            ? ((e[t - 1][1] += e[t][1]), e.splice(t, 1))
            : t++,
          (n = 0),
          (r = 0),
          (a = ""),
          (o = "");
        break;
    }
  e[e.length - 1][1] === "" && e.pop();
  let l = !1;
  for (t = 1; t < e.length - 1; )
    e[t - 1][0] === Ee &&
      e[t + 1][0] === Ee &&
      (e[t][1].substring(e[t][1].length - e[t - 1][1].length) === e[t - 1][1]
        ? ((e[t][1] =
            e[t - 1][1] +
            e[t][1].substring(0, e[t][1].length - e[t - 1][1].length)),
          (e[t + 1][1] = e[t - 1][1] + e[t + 1][1]),
          e.splice(t - 1, 1),
          (l = !0))
        : e[t][1].substring(0, e[t + 1][1].length) === e[t + 1][1] &&
          ((e[t - 1][1] += e[t + 1][1]),
          (e[t][1] = e[t][1].substring(e[t + 1][1].length) + e[t + 1][1]),
          e.splice(t + 1, 1),
          (l = !0))),
      t++;
  l && Qp(e);
}
var Zp = "Compared values have no visual difference.",
  HS =
    "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.",
  eh = {};
Object.defineProperty(eh, "__esModule", { value: !0 });
var th = (eh.default = WS),
  Fr = "diff-sequences",
  Pe = 0,
  Xr = (e, t, r, n, a) => {
    let o = 0;
    for (; e < t && r < n && a(e, r); ) (e += 1), (r += 1), (o += 1);
    return o;
  },
  Qr = (e, t, r, n, a) => {
    let o = 0;
    for (; e <= t && r <= n && a(t, n); ) (t -= 1), (n -= 1), (o += 1);
    return o;
  },
  eo = (e, t, r, n, a, o, i) => {
    let l = 0,
      u = -e,
      c = o[l],
      s = c;
    o[l] += Xr(c + 1, t, n + c - u + 1, r, a);
    let d = e < i ? e : i;
    for (l += 1, u += 2; l <= d; l += 1, u += 2) {
      if (l !== e && s < o[l]) c = o[l];
      else if (((c = s + 1), t <= c)) return l - 1;
      (s = o[l]), (o[l] = c + Xr(c + 1, t, n + c - u + 1, r, a));
    }
    return i;
  },
  Nu = (e, t, r, n, a, o, i) => {
    let l = 0,
      u = e,
      c = o[l],
      s = c;
    o[l] -= Qr(t, c - 1, r, n + c - u - 1, a);
    let d = e < i ? e : i;
    for (l += 1, u -= 2; l <= d; l += 1, u -= 2) {
      if (l !== e && o[l] < s) c = o[l];
      else if (((c = s - 1), c < t)) return l - 1;
      (s = o[l]), (o[l] = c - Qr(t, c - 1, r, n + c - u - 1, a));
    }
    return i;
  },
  zS = (e, t, r, n, a, o, i, l, u, c, s) => {
    let d = n - t,
      p = r - t,
      f = a - n - p,
      h = -f - (e - 1),
      m = -f + (e - 1),
      g = Pe,
      b = e < l ? e : l;
    for (let y = 0, R = -e; y <= b; y += 1, R += 2) {
      let _ = y === 0 || (y !== e && g < i[y]),
        C = _ ? i[y] : g,
        w = _ ? C : C + 1,
        v = d + w - R,
        E = Xr(w + 1, r, v + 1, a, o),
        O = w + E;
      if (((g = i[y]), (i[y] = O), h <= R && R <= m)) {
        let M = (e - 1 - (R + f)) / 2;
        if (M <= c && u[M] - 1 <= O) {
          let N = d + C - (_ ? R + 1 : R - 1),
            k = Qr(t, C, n, N, o),
            j = C - k,
            I = N - k,
            B = j + 1,
            z = I + 1;
          (s.nChangePreceding = e - 1),
            e - 1 === B + z - t - n
              ? ((s.aEndPreceding = t), (s.bEndPreceding = n))
              : ((s.aEndPreceding = B), (s.bEndPreceding = z)),
            (s.nCommonPreceding = k),
            k !== 0 && ((s.aCommonPreceding = B), (s.bCommonPreceding = z)),
            (s.nCommonFollowing = E),
            E !== 0 &&
              ((s.aCommonFollowing = w + 1), (s.bCommonFollowing = v + 1));
          let K = O + 1,
            W = v + E + 1;
          return (
            (s.nChangeFollowing = e - 1),
            e - 1 === r + a - K - W
              ? ((s.aStartFollowing = r), (s.bStartFollowing = a))
              : ((s.aStartFollowing = K), (s.bStartFollowing = W)),
            !0
          );
        }
      }
    }
    return !1;
  },
  VS = (e, t, r, n, a, o, i, l, u, c, s) => {
    let d = a - r,
      p = r - t,
      f = a - n - p,
      h = f - e,
      m = f + e,
      g = Pe,
      b = e < c ? e : c;
    for (let y = 0, R = e; y <= b; y += 1, R -= 2) {
      let _ = y === 0 || (y !== e && u[y] < g),
        C = _ ? u[y] : g,
        w = _ ? C : C - 1,
        v = d + w - R,
        E = Qr(t, w - 1, n, v - 1, o),
        O = w - E;
      if (((g = u[y]), (u[y] = O), h <= R && R <= m)) {
        let M = (e + (R - f)) / 2;
        if (M <= l && O - 1 <= i[M]) {
          let N = v - E;
          if (
            ((s.nChangePreceding = e),
            e === O + N - t - n
              ? ((s.aEndPreceding = t), (s.bEndPreceding = n))
              : ((s.aEndPreceding = O), (s.bEndPreceding = N)),
            (s.nCommonPreceding = E),
            E !== 0 && ((s.aCommonPreceding = O), (s.bCommonPreceding = N)),
            (s.nChangeFollowing = e - 1),
            e === 1)
          )
            (s.nCommonFollowing = 0),
              (s.aStartFollowing = r),
              (s.bStartFollowing = a);
          else {
            let k = d + C - (_ ? R - 1 : R + 1),
              j = Xr(C, r, k, a, o);
            (s.nCommonFollowing = j),
              j !== 0 && ((s.aCommonFollowing = C), (s.bCommonFollowing = k));
            let I = C + j,
              B = k + j;
            e - 1 === r + a - I - B
              ? ((s.aStartFollowing = r), (s.bStartFollowing = a))
              : ((s.aStartFollowing = I), (s.bStartFollowing = B));
          }
          return !0;
        }
      }
    }
    return !1;
  },
  GS = (e, t, r, n, a, o, i, l, u) => {
    let c = n - t,
      s = a - r,
      d = r - t,
      p = a - n,
      f = p - d,
      h = d,
      m = d;
    if (((i[0] = t - 1), (l[0] = r), f % 2 === 0)) {
      let g = (e || f) / 2,
        b = (d + p) / 2;
      for (let y = 1; y <= b; y += 1)
        if (((h = eo(y, r, a, c, o, i, h)), y < g)) m = Nu(y, t, n, s, o, l, m);
        else if (VS(y, t, r, n, a, o, i, h, l, m, u)) return;
    } else {
      let g = ((e || f) + 1) / 2,
        b = (d + p + 1) / 2,
        y = 1;
      for (h = eo(y, r, a, c, o, i, h), y += 1; y <= b; y += 1)
        if (((m = Nu(y - 1, t, n, s, o, l, m)), y < g))
          h = eo(y, r, a, c, o, i, h);
        else if (zS(y, t, r, n, a, o, i, h, l, m, u)) return;
    }
    throw new Error(
      `${Fr}: no overlap aStart=${t} aEnd=${r} bStart=${n} bEnd=${a}`,
    );
  },
  Go = (e, t, r, n, a, o, i, l, u, c) => {
    if (a - n < r - t) {
      if (((o = !o), o && i.length === 1)) {
        let { foundSubsequence: M, isCommon: N } = i[0];
        i[1] = {
          foundSubsequence: (k, j, I) => {
            M(k, I, j);
          },
          isCommon: (k, j) => N(j, k),
        };
      }
      let E = t,
        O = r;
      (t = n), (r = a), (n = E), (a = O);
    }
    let { foundSubsequence: s, isCommon: d } = i[o ? 1 : 0];
    GS(e, t, r, n, a, d, l, u, c);
    let {
      nChangePreceding: p,
      aEndPreceding: f,
      bEndPreceding: h,
      nCommonPreceding: m,
      aCommonPreceding: g,
      bCommonPreceding: b,
      nCommonFollowing: y,
      aCommonFollowing: R,
      bCommonFollowing: _,
      nChangeFollowing: C,
      aStartFollowing: w,
      bStartFollowing: v,
    } = c;
    t < f && n < h && Go(p, t, f, n, h, o, i, l, u, c),
      m !== 0 && s(m, g, b),
      y !== 0 && s(y, R, _),
      w < r && v < a && Go(C, w, r, v, a, o, i, l, u, c);
  },
  ju = (e, t) => {
    if (typeof t != "number")
      throw new TypeError(`${Fr}: ${e} typeof ${typeof t} is not a number`);
    if (!Number.isSafeInteger(t))
      throw new RangeError(`${Fr}: ${e} value ${t} is not a safe integer`);
    if (t < 0)
      throw new RangeError(`${Fr}: ${e} value ${t} is a negative integer`);
  },
  Iu = (e, t) => {
    let r = typeof t;
    if (r !== "function")
      throw new TypeError(`${Fr}: ${e} typeof ${r} is not a function`);
  };
function WS(e, t, r, n) {
  ju("aLength", e),
    ju("bLength", t),
    Iu("isCommon", r),
    Iu("foundSubsequence", n);
  let a = Xr(0, e, 0, t, r);
  if ((a !== 0 && n(a, 0, 0), e !== a || t !== a)) {
    let o = a,
      i = a,
      l = Qr(o, e - 1, i, t - 1, r),
      u = e - l,
      c = t - l,
      s = a + l;
    e !== s &&
      t !== s &&
      Go(
        0,
        o,
        u,
        i,
        c,
        !1,
        [{ foundSubsequence: n, isCommon: r }],
        [Pe],
        [Pe],
        {
          aCommonFollowing: Pe,
          aCommonPreceding: Pe,
          aEndPreceding: Pe,
          aStartFollowing: Pe,
          bCommonFollowing: Pe,
          bCommonPreceding: Pe,
          bEndPreceding: Pe,
          bStartFollowing: Pe,
          nChangeFollowing: Pe,
          nChangePreceding: Pe,
          nCommonFollowing: Pe,
          nCommonPreceding: Pe,
        },
      ),
      l !== 0 && n(l, u, c);
  }
}
function KS(e, t) {
  return e.replace(/\s+$/, (r) => t(r));
}
function Ol(e, t, r, n, a, o) {
  return e.length !== 0
    ? r(`${n} ${KS(e, a)}`)
    : n !== " "
      ? r(n)
      : t && o.length !== 0
        ? r(`${n} ${o}`)
        : "";
}
function rh(
  e,
  t,
  {
    aColor: r,
    aIndicator: n,
    changeLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ol(e, t, r, n, a, o);
}
function nh(
  e,
  t,
  {
    bColor: r,
    bIndicator: n,
    changeLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ol(e, t, r, n, a, o);
}
function ah(
  e,
  t,
  {
    commonColor: r,
    commonIndicator: n,
    commonLineTrailingSpaceColor: a,
    emptyFirstOrLastLinePlaceholder: o,
  },
) {
  return Ol(e, t, r, n, a, o);
}
function Lu(e, t, r, n, { patchColor: a }) {
  return a(`@@ -${e + 1},${t - e} +${r + 1},${n - r} @@`);
}
function YS(e, t) {
  let r = e.length,
    n = t.contextLines,
    a = n + n,
    o = r,
    i = !1,
    l = 0,
    u = 0;
  for (; u !== r; ) {
    let _ = u;
    for (; u !== r && e[u][0] === Ee; ) u += 1;
    if (_ !== u)
      if (_ === 0) u > n && ((o -= u - n), (i = !0));
      else if (u === r) {
        let C = u - _;
        C > n && ((o -= C - n), (i = !0));
      } else {
        let C = u - _;
        C > a && ((o -= C - a), (l += 1));
      }
    for (; u !== r && e[u][0] !== Ee; ) u += 1;
  }
  let c = l !== 0 || i;
  l !== 0 ? (o += l + 1) : i && (o += 1);
  let s = o - 1,
    d = [],
    p = 0;
  c && d.push("");
  let f = 0,
    h = 0,
    m = 0,
    g = 0,
    b = (_) => {
      let C = d.length;
      d.push(ah(_, C === 0 || C === s, t)), (m += 1), (g += 1);
    },
    y = (_) => {
      let C = d.length;
      d.push(rh(_, C === 0 || C === s, t)), (m += 1);
    },
    R = (_) => {
      let C = d.length;
      d.push(nh(_, C === 0 || C === s, t)), (g += 1);
    };
  for (u = 0; u !== r; ) {
    let _ = u;
    for (; u !== r && e[u][0] === Ee; ) u += 1;
    if (_ !== u)
      if (_ === 0) {
        u > n && ((_ = u - n), (f = _), (h = _), (m = f), (g = h));
        for (let C = _; C !== u; C += 1) b(e[C][1]);
      } else if (u === r) {
        let C = u - _ > n ? _ + n : u;
        for (let w = _; w !== C; w += 1) b(e[w][1]);
      } else {
        let C = u - _;
        if (C > a) {
          let w = _ + n;
          for (let E = _; E !== w; E += 1) b(e[E][1]);
          (d[p] = Lu(f, m, h, g, t)), (p = d.length), d.push("");
          let v = C - a;
          (f = m + v), (h = g + v), (m = f), (g = h);
          for (let E = u - n; E !== u; E += 1) b(e[E][1]);
        } else for (let w = _; w !== u; w += 1) b(e[w][1]);
      }
    for (; u !== r && e[u][0] === qe; ) y(e[u][1]), (u += 1);
    for (; u !== r && e[u][0] === Se; ) R(e[u][1]), (u += 1);
  }
  return (
    c && (d[p] = Lu(f, m, h, g, t)),
    d.join(`
`)
  );
}
function JS(e, t) {
  return e.map((r, n, a) => {
    let o = r[1],
      i = n === 0 || n === a.length - 1;
    switch (r[0]) {
      case qe:
        return rh(o, i, t);
      case Se:
        return nh(o, i, t);
      default:
        return ah(o, i, t);
    }
  }).join(`
`);
}
var to = (e) => e,
  oh = 5,
  XS = 0;
function QS() {
  return {
    aAnnotation: "Expected",
    aColor: ve.green,
    aIndicator: "-",
    bAnnotation: "Received",
    bColor: ve.red,
    bIndicator: "+",
    changeColor: ve.inverse,
    changeLineTrailingSpaceColor: to,
    commonColor: ve.dim,
    commonIndicator: " ",
    commonLineTrailingSpaceColor: to,
    compareKeys: void 0,
    contextLines: oh,
    emptyFirstOrLastLinePlaceholder: "",
    expand: !0,
    includeChangeCounts: !1,
    omitAnnotationLines: !1,
    patchColor: ve.yellow,
    truncateThreshold: XS,
    truncateAnnotation: "... Diff result is truncated",
    truncateAnnotationColor: to,
  };
}
function ZS(e) {
  return e && typeof e == "function" ? e : void 0;
}
function eP(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : oh;
}
function Jt(e = {}) {
  return {
    ...QS(),
    ...e,
    compareKeys: ZS(e.compareKeys),
    contextLines: eP(e.contextLines),
  };
}
function ir(e) {
  return e.length === 1 && e[0].length === 0;
}
function tP(e) {
  let t = 0,
    r = 0;
  return (
    e.forEach((n) => {
      switch (n[0]) {
        case qe:
          t += 1;
          break;
        case Se:
          r += 1;
          break;
      }
    }),
    { a: t, b: r }
  );
}
function rP(
  {
    aAnnotation: e,
    aColor: t,
    aIndicator: r,
    bAnnotation: n,
    bColor: a,
    bIndicator: o,
    includeChangeCounts: i,
    omitAnnotationLines: l,
  },
  u,
) {
  if (l) return "";
  let c = "",
    s = "";
  if (i) {
    let f = String(u.a),
      h = String(u.b),
      m = n.length - e.length,
      g = " ".repeat(Math.max(0, m)),
      b = " ".repeat(Math.max(0, -m)),
      y = h.length - f.length,
      R = " ".repeat(Math.max(0, y)),
      _ = " ".repeat(Math.max(0, -y));
    (c = `${g}  ${r} ${R}${f}`), (s = `${b}  ${o} ${_}${h}`);
  }
  let d = `${r} ${e}${c}`,
    p = `${o} ${n}${s}`;
  return `${t(d)}
${a(p)}

`;
}
function Al(e, t, r) {
  return (
    rP(r, tP(e)) +
    (r.expand ? JS(e, r) : YS(e, r)) +
    (t
      ? r.truncateAnnotationColor(`
${r.truncateAnnotation}`)
      : "")
  );
}
function Oa(e, t, r) {
  let n = Jt(r),
    [a, o] = ih(ir(e) ? [] : e, ir(t) ? [] : t, n);
  return Al(a, o, n);
}
function nP(e, t, r, n, a) {
  if (
    (ir(e) && ir(r) && ((e = []), (r = [])),
    ir(t) && ir(n) && ((t = []), (n = [])),
    e.length !== r.length || t.length !== n.length)
  )
    return Oa(e, t, a);
  let [o, i] = ih(r, n, a),
    l = 0,
    u = 0;
  return (
    o.forEach((c) => {
      switch (c[0]) {
        case qe:
          (c[1] = e[l]), (l += 1);
          break;
        case Se:
          (c[1] = t[u]), (u += 1);
          break;
        default:
          (c[1] = t[u]), (l += 1), (u += 1);
      }
    }),
    Al(o, i, Jt(a))
  );
}
function ih(e, t, r) {
  let n = (r == null ? void 0 : r.truncateThreshold) ?? !1,
    a = Math.max(
      Math.floor((r == null ? void 0 : r.truncateThreshold) ?? 0),
      0,
    ),
    o = n ? Math.min(e.length, a) : e.length,
    i = n ? Math.min(t.length, a) : t.length,
    l = o !== e.length || i !== t.length,
    u = (p, f) => e[p] === t[f],
    c = [],
    s = 0,
    d = 0;
  for (
    th(o, i, u, (p, f, h) => {
      for (; s !== f; s += 1) c.push(new ge(qe, e[s]));
      for (; d !== h; d += 1) c.push(new ge(Se, t[d]));
      for (; p !== 0; p -= 1, s += 1, d += 1) c.push(new ge(Ee, t[d]));
    });
    s !== o;
    s += 1
  )
    c.push(new ge(qe, e[s]));
  for (; d !== i; d += 1) c.push(new ge(Se, t[d]));
  return [c, l];
}
function Bu(e) {
  return e.includes(`\r
`)
    ? `\r
`
    : `
`;
}
function aP(e, t, r) {
  let n = (r == null ? void 0 : r.truncateThreshold) ?? !1,
    a = Math.max(
      Math.floor((r == null ? void 0 : r.truncateThreshold) ?? 0),
      0,
    ),
    o = e.length,
    i = t.length;
  if (n) {
    let p = e.includes(`
`),
      f = t.includes(`
`),
      h = Bu(e),
      m = Bu(t),
      g = p
        ? `${e.split(h, a).join(h)}
`
        : e,
      b = f
        ? `${t.split(m, a).join(m)}
`
        : t;
    (o = g.length), (i = b.length);
  }
  let l = o !== e.length || i !== t.length,
    u = (p, f) => e[p] === t[f],
    c = 0,
    s = 0,
    d = [];
  return (
    th(o, i, u, (p, f, h) => {
      c !== f && d.push(new ge(qe, e.slice(c, f))),
        s !== h && d.push(new ge(Se, t.slice(s, h))),
        (c = f + p),
        (s = h + p),
        d.push(new ge(Ee, t.slice(h, s)));
    }),
    c !== o && d.push(new ge(qe, e.slice(c))),
    s !== i && d.push(new ge(Se, t.slice(s))),
    [d, l]
  );
}
function oP(e, t, r) {
  return t.reduce(
    (n, a) =>
      n + (a[0] === Ee ? a[1] : a[0] === e && a[1].length !== 0 ? r(a[1]) : ""),
    "",
  );
}
var ku = class {
    constructor(e, t) {
      ye(this, "op");
      ye(this, "line");
      ye(this, "lines");
      ye(this, "changeColor");
      (this.op = e),
        (this.line = []),
        (this.lines = []),
        (this.changeColor = t);
    }
    pushSubstring(e) {
      this.pushDiff(new ge(this.op, e));
    }
    pushLine() {
      this.lines.push(
        this.line.length !== 1
          ? new ge(this.op, oP(this.op, this.line, this.changeColor))
          : this.line[0][0] === this.op
            ? this.line[0]
            : new ge(this.op, this.line[0][1]),
      ),
        (this.line.length = 0);
    }
    isLineEmpty() {
      return this.line.length === 0;
    }
    pushDiff(e) {
      this.line.push(e);
    }
    align(e) {
      let t = e[1];
      if (
        t.includes(`
`)
      ) {
        let r = t.split(`
`),
          n = r.length - 1;
        r.forEach((a, o) => {
          o < n
            ? (this.pushSubstring(a), this.pushLine())
            : a.length !== 0 && this.pushSubstring(a);
        });
      } else this.pushDiff(e);
    }
    moveLinesTo(e) {
      this.isLineEmpty() || this.pushLine(),
        e.push(...this.lines),
        (this.lines.length = 0);
    }
  },
  iP = class {
    constructor(e, t) {
      ye(this, "deleteBuffer");
      ye(this, "insertBuffer");
      ye(this, "lines");
      (this.deleteBuffer = e), (this.insertBuffer = t), (this.lines = []);
    }
    pushDiffCommonLine(e) {
      this.lines.push(e);
    }
    pushDiffChangeLines(e) {
      let t = e[1].length === 0;
      (!t || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(e),
        (!t || this.insertBuffer.isLineEmpty()) &&
          this.insertBuffer.pushDiff(e);
    }
    flushChangeLines() {
      this.deleteBuffer.moveLinesTo(this.lines),
        this.insertBuffer.moveLinesTo(this.lines);
    }
    align(e) {
      let t = e[0],
        r = e[1];
      if (
        r.includes(`
`)
      ) {
        let n = r.split(`
`),
          a = n.length - 1;
        n.forEach((o, i) => {
          if (i === 0) {
            let l = new ge(t, o);
            this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty()
              ? (this.flushChangeLines(), this.pushDiffCommonLine(l))
              : (this.pushDiffChangeLines(l), this.flushChangeLines());
          } else
            i < a
              ? this.pushDiffCommonLine(new ge(t, o))
              : o.length !== 0 && this.pushDiffChangeLines(new ge(t, o));
        });
      } else this.pushDiffChangeLines(e);
    }
    getLines() {
      return this.flushChangeLines(), this.lines;
    }
  };
function lP(e, t) {
  let r = new ku(qe, t),
    n = new ku(Se, t),
    a = new iP(r, n);
  return (
    e.forEach((o) => {
      switch (o[0]) {
        case qe:
          r.align(o);
          break;
        case Se:
          n.align(o);
          break;
        default:
          a.align(o);
      }
    }),
    a.getLines()
  );
}
function sP(e, t) {
  if (t) {
    let r = e.length - 1;
    return e.some(
      (n, a) =>
        n[0] === Ee &&
        (a !== r ||
          n[1] !==
            `
`),
    );
  }
  return e.some((r) => r[0] === Ee);
}
function uP(e, t, r) {
  if (e !== t && e.length !== 0 && t.length !== 0) {
    let n =
        e.includes(`
`) ||
        t.includes(`
`),
      [a, o] = lh(
        n
          ? `${e}
`
          : e,
        n
          ? `${t}
`
          : t,
        !0,
        r,
      );
    if (sP(a, n)) {
      let i = Jt(r),
        l = lP(a, i.changeColor);
      return Al(l, o, i);
    }
  }
  return Oa(
    e.split(`
`),
    t.split(`
`),
    r,
  );
}
function lh(e, t, r, n) {
  let [a, o] = aP(e, t, n);
  return kS(a), [a, o];
}
function Wo(e, t) {
  let { commonColor: r } = Jt(t);
  return r(e);
}
var {
    AsymmetricMatcher: cP,
    DOMCollection: dP,
    DOMElement: fP,
    Immutable: pP,
    ReactElement: hP,
    ReactTestComponent: mP,
  } = Kp,
  sh = [mP, hP, fP, dP, pP, cP],
  Ko = { plugins: sh },
  uh = { callToJSON: !1, maxDepth: 10, plugins: sh };
function vr(e, t, r) {
  if (Object.is(e, t)) return "";
  let n = Au(e),
    a = n,
    o = !1;
  if (n === "object" && typeof e.asymmetricMatch == "function") {
    if (
      e.$$typeof !== Symbol.for("jest.asymmetricMatcher") ||
      typeof e.getExpectedType != "function"
    )
      return;
    (a = e.getExpectedType()), (o = a === "string");
  }
  if (a !== Au(t)) {
    let {
        aAnnotation: i,
        aColor: l,
        aIndicator: u,
        bAnnotation: c,
        bColor: s,
        bIndicator: d,
      } = Jt(r),
      p = Yo(uh, r),
      f = at(e, p),
      h = at(t, p),
      m = `${l(`${u} ${i}:`)} 
${f}`,
      g = `${s(`${d} ${c}:`)} 
${h}`;
    return `${m}

${g}`;
  }
  if (!o)
    switch (n) {
      case "string":
        return Oa(
          e.split(`
`),
          t.split(`
`),
          r,
        );
      case "boolean":
      case "number":
        return bP(e, t, r);
      case "map":
        return ro(Du(e), Du(t), r);
      case "set":
        return ro(Fu(e), Fu(t), r);
      default:
        return ro(e, t, r);
    }
}
function bP(e, t, r) {
  let n = at(e, Ko),
    a = at(t, Ko);
  return n === a
    ? ""
    : Oa(
        n.split(`
`),
        a.split(`
`),
        r,
      );
}
function Du(e) {
  return new Map(Array.from(e.entries()).sort());
}
function Fu(e) {
  return new Set(Array.from(e.values()).sort());
}
function ro(e, t, r) {
  let n,
    a = !1;
  try {
    let i = Yo(Ko, r);
    n = Uu(e, t, i, r);
  } catch {
    a = !0;
  }
  let o = Wo(Zp, r);
  if (n === void 0 || n === o) {
    let i = Yo(uh, r);
    (n = Uu(e, t, i, r)),
      n !== o &&
        !a &&
        (n = `${Wo(HS, r)}

${n}`);
  }
  return n;
}
function Yo(e, t) {
  let { compareKeys: r } = Jt(t);
  return { ...e, compareKeys: r };
}
function Uu(e, t, r, n) {
  let a = { ...r, indent: 0 },
    o = at(e, a),
    i = at(t, a);
  if (o === i) return Wo(Zp, n);
  {
    let l = at(e, r),
      u = at(t, r);
    return nP(
      l.split(`
`),
      u.split(`
`),
      o.split(`
`),
      i.split(`
`),
      n,
    );
  }
}
var Hu = 2e4;
function zu(e) {
  return Uo(e) === "Object" && typeof e.asymmetricMatch == "function";
}
function Vu(e, t) {
  let r = Uo(e),
    n = Uo(t);
  return r === n && (r === "Object" || r === "Array");
}
function ch(e, t, r) {
  let { aAnnotation: n, bAnnotation: a } = Jt(r);
  if (
    typeof e == "string" &&
    typeof t == "string" &&
    e.length > 0 &&
    t.length > 0 &&
    e.length <= Hu &&
    t.length <= Hu &&
    e !== t
  ) {
    if (
      e.includes(`
`) ||
      t.includes(`
`)
    )
      return uP(t, e, r);
    let [c] = lh(t, e),
      s = c.some((h) => h[0] === Ee),
      d = gP(n, a),
      p = d(n) + _P(Gu(c, qe, s)),
      f = d(a) + vP(Gu(c, Se, s));
    return `${p}
${f}`;
  }
  let o = su(e, { forceWritable: !0 }),
    i = su(t, { forceWritable: !0 }),
    { replacedExpected: l, replacedActual: u } = dh(o, i);
  return vr(l, u, r);
}
function dh(e, t, r = new WeakSet(), n = new WeakSet()) {
  return Vu(e, t)
    ? r.has(e) || n.has(t)
      ? { replacedActual: e, replacedExpected: t }
      : (r.add(e),
        n.add(t),
        Sp(t).forEach((a) => {
          let o = t[a],
            i = e[a];
          if (zu(o)) o.asymmetricMatch(i) && (e[a] = o);
          else if (zu(i)) i.asymmetricMatch(o) && (t[a] = i);
          else if (Vu(i, o)) {
            let l = dh(i, o, r, n);
            (e[a] = l.replacedActual), (t[a] = l.replacedExpected);
          }
        }),
        { replacedActual: e, replacedExpected: t })
    : { replacedActual: e, replacedExpected: t };
}
function gP(...e) {
  let t = e.reduce((r, n) => (n.length > r ? n.length : r), 0);
  return (r) => `${r}: ${" ".repeat(t - r.length)}`;
}
var yP = "·";
function fh(e) {
  return e.replace(/\s+$/gm, (t) => yP.repeat(t.length));
}
function vP(e) {
  return ve.red(fh(Ge(e)));
}
function _P(e) {
  return ve.green(fh(Ge(e)));
}
function Gu(e, t, r) {
  return e.reduce(
    (n, a) =>
      n +
      (a[0] === Ee ? a[1] : a[0] === t ? (r ? ve.inverse(a[1]) : a[1]) : ""),
    "",
  );
}
function $n(e, t) {
  if (!e) throw new Error(t);
}
function lr(e, t) {
  return typeof t === e;
}
function EP(e) {
  return e instanceof Promise;
}
function Jo(e, t, r) {
  Object.defineProperty(e, t, r);
}
function cr(e, t, r) {
  Object.defineProperty(e, t, { value: r });
}
var Ur = Symbol.for("tinyspy:spy"),
  wP = new Set(),
  CP = (e) => {
    (e.called = !1),
      (e.callCount = 0),
      (e.calls = []),
      (e.results = []),
      (e.resolves = []),
      (e.next = []);
  },
  RP = (e) => (Jo(e, Ur, { value: { reset: () => CP(e[Ur]) } }), e[Ur]),
  Wn = (e) => e[Ur] || RP(e);
function TP(e) {
  $n(
    lr("function", e) || lr("undefined", e),
    "cannot spy on a non-function value",
  );
  let t = function (...n) {
    let a = Wn(t);
    (a.called = !0), a.callCount++, a.calls.push(n);
    let o = a.next.shift();
    if (o) {
      a.results.push(o);
      let [s, d] = o;
      if (s === "ok") return d;
      throw d;
    }
    let i,
      l = "ok",
      u = a.results.length;
    if (a.impl)
      try {
        new.target
          ? (i = Reflect.construct(a.impl, n, new.target))
          : (i = a.impl.apply(this, n)),
          (l = "ok");
      } catch (s) {
        throw ((i = s), (l = "error"), a.results.push([l, s]), s);
      }
    let c = [l, i];
    return (
      EP(i) &&
        i.then(
          (s) => (a.resolves[u] = ["ok", s]),
          (s) => (a.resolves[u] = ["error", s]),
        ),
      a.results.push(c),
      i
    );
  };
  cr(t, "_isMockFunction", !0),
    cr(t, "length", e ? e.length : 0),
    cr(t, "name", (e && e.name) || "spy");
  let r = Wn(t);
  return r.reset(), (r.impl = e), t;
}
var Wu = (e, t) => Object.getOwnPropertyDescriptor(e, t),
  Ku = (e, t) => {
    t != null &&
      typeof t == "function" &&
      t.prototype != null &&
      Object.setPrototypeOf(e.prototype, t.prototype);
  };
function SP(e, t, r) {
  $n(!lr("undefined", e), "spyOn could not find an object to spy upon"),
    $n(
      lr("object", e) || lr("function", e),
      "cannot spyOn on a primitive value",
    );
  let [n, a] = (() => {
      if (!lr("object", t)) return [t, "value"];
      if ("getter" in t && "setter" in t)
        throw new Error("cannot spy on both getter and setter");
      if ("getter" in t) return [t.getter, "get"];
      if ("setter" in t) return [t.setter, "set"];
      throw new Error("specify getter or setter to spy on");
    })(),
    o = Wu(e, n),
    i = Object.getPrototypeOf(e),
    l = i && Wu(i, n),
    u = o || l;
  $n(u || n in e, `${String(n)} does not exist`);
  let c = !1;
  a === "value" &&
    u &&
    !u.value &&
    u.get &&
    ((a = "get"), (c = !0), (r = u.get()));
  let s;
  u ? (s = u[a]) : a !== "value" ? (s = () => e[n]) : (s = e[n]), r || (r = s);
  let d = TP(r);
  a === "value" && Ku(d, s);
  let p = (m) => {
      let { value: g, ...b } = u || { configurable: !0, writable: !0 };
      a !== "value" && delete b.writable, (b[a] = m), Jo(e, n, b);
    },
    f = () => (u ? Jo(e, n, u) : p(s)),
    h = d[Ur];
  return (
    cr(h, "restore", f),
    cr(h, "getOriginal", () => (c ? s() : s)),
    cr(h, "willCall", (m) => ((h.impl = m), d)),
    p(c ? () => (Ku(d, r), d) : d),
    wP.add(d),
    d
  );
}
var Aa = new Set();
function ph(e) {
  return typeof e == "function" && "_isMockFunction" in e && e._isMockFunction;
}
var PP = 0;
function OP(e) {
  let t = e,
    r,
    n = [],
    a = [],
    o = [],
    i = Wn(e),
    l = {
      get calls() {
        return i.calls;
      },
      get contexts() {
        return a;
      },
      get instances() {
        return n;
      },
      get invocationCallOrder() {
        return o;
      },
      get results() {
        return i.results.map(([f, h]) => ({
          type: f === "error" ? "throw" : "return",
          value: h,
        }));
      },
      get settledResults() {
        return i.resolves.map(([f, h]) => ({
          type: f === "error" ? "rejected" : "fulfilled",
          value: h,
        }));
      },
      get lastCall() {
        return i.calls[i.calls.length - 1];
      },
    },
    u = [],
    c = !1;
  function s(...f) {
    return (
      n.push(this),
      a.push(this),
      o.push(++PP),
      (c ? r : u.shift() || r || i.getOriginal() || (() => {})).apply(this, f)
    );
  }
  let d = t.name;
  (t.getMockName = () => d || "vi.fn()"),
    (t.mockName = (f) => ((d = f), t)),
    (t.mockClear = () => (i.reset(), (n = []), (a = []), (o = []), t)),
    (t.mockReset = () => (t.mockClear(), (r = () => {}), (u = []), t)),
    (t.mockRestore = () => (t.mockReset(), i.restore(), (r = void 0), t)),
    (t.getMockImplementation = () => r),
    (t.mockImplementation = (f) => ((r = f), i.willCall(s), t)),
    (t.mockImplementationOnce = (f) => (u.push(f), t));
  function p(f, h) {
    let m = r;
    (r = f), i.willCall(s), (c = !0);
    let g = () => {
        (r = m), (c = !1);
      },
      b = h();
    return b instanceof Promise ? b.then(() => (g(), t)) : (g(), t);
  }
  return (
    (t.withImplementation = p),
    (t.mockReturnThis = () =>
      t.mockImplementation(function () {
        return this;
      })),
    (t.mockReturnValue = (f) => t.mockImplementation(() => f)),
    (t.mockReturnValueOnce = (f) => t.mockImplementationOnce(() => f)),
    (t.mockResolvedValue = (f) =>
      t.mockImplementation(() => Promise.resolve(f))),
    (t.mockResolvedValueOnce = (f) =>
      t.mockImplementationOnce(() => Promise.resolve(f))),
    (t.mockRejectedValue = (f) =>
      t.mockImplementation(() => Promise.reject(f))),
    (t.mockRejectedValueOnce = (f) =>
      t.mockImplementationOnce(() => Promise.reject(f))),
    Object.defineProperty(t, "mock", { get: () => l }),
    i.willCall(s),
    Aa.add(t),
    t
  );
}
function Yu(e) {
  let t = OP(SP({ spy: e || function () {} }, "spy"));
  return e && t.mockImplementation(e), t;
}
var AP = "@@__IMMUTABLE_RECORD__@@",
  qP = "@@__IMMUTABLE_ITERABLE__@@";
function xP(e) {
  return e && (e[qP] || e[AP]);
}
var MP = Object.getPrototypeOf({});
function Ju(e) {
  return e instanceof Error
    ? `<unserializable>: ${e.message}`
    : typeof e == "string"
      ? `<unserializable>: ${e}`
      : "<unserializable>";
}
function sr(e, t = new WeakMap()) {
  if (!e || typeof e == "string") return e;
  if (typeof e == "function") return `Function<${e.name || "anonymous"}>`;
  if (typeof e == "symbol") return e.toString();
  if (typeof e != "object") return e;
  if (xP(e)) return sr(e.toJSON(), t);
  if (
    e instanceof Promise ||
    (e.constructor && e.constructor.prototype === "AsyncFunction")
  )
    return "Promise";
  if (typeof Element < "u" && e instanceof Element) return e.tagName;
  if (typeof e.asymmetricMatch == "function")
    return `${e.toString()} ${LS(e.sample)}`;
  if (typeof e.toJSON == "function") return sr(e.toJSON(), t);
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    let r = new Array(e.length);
    return (
      t.set(e, r),
      e.forEach((n, a) => {
        try {
          r[a] = sr(n, t);
        } catch (o) {
          r[a] = Ju(o);
        }
      }),
      r
    );
  } else {
    let r = Object.create(null);
    t.set(e, r);
    let n = e;
    for (; n && n !== MP; )
      Object.getOwnPropertyNames(n).forEach((a) => {
        if (!(a in r))
          try {
            r[a] = sr(e[a], t);
          } catch (o) {
            delete r[a], (r[a] = Ju(o));
          }
      }),
        (n = Object.getPrototypeOf(n));
    return r;
  }
}
function $P(e) {
  return e.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function hh(e, t, r = new WeakSet()) {
  if (!e || typeof e != "object") return { message: String(e) };
  let n = e;
  n.stack && (n.stackStr = String(n.stack)),
    n.name && (n.nameStr = String(n.name)),
    (n.showDiff ||
      (n.showDiff === void 0 &&
        n.expected !== void 0 &&
        n.actual !== void 0)) &&
      (n.diff = ch(n.actual, n.expected, { ...t, ...n.diffOptions })),
    typeof n.expected != "string" && (n.expected = Ge(n.expected, 10)),
    typeof n.actual != "string" && (n.actual = Ge(n.actual, 10));
  try {
    typeof n.message == "string" && (n.message = $P(n.message));
  } catch {}
  try {
    !r.has(n) &&
      typeof n.cause == "object" &&
      (r.add(n), (n.cause = hh(n.cause, t, r)));
  } catch {}
  try {
    return sr(n);
  } catch (a) {
    return sr(
      new Error(`Failed to fully serialize error: ${a == null ? void 0 : a.message}
Inner error message: ${n == null ? void 0 : n.message}`),
    );
  }
}
var Zr = Symbol.for("matchers-object"),
  en = Symbol.for("$$jest-matchers-object-storybook"),
  ql = Symbol.for("expect-global"),
  Xo = Symbol.for("asymmetric-matchers-object");
if (!Object.prototype.hasOwnProperty.call(globalThis, Zr)) {
  let e = new WeakMap();
  Object.defineProperty(globalThis, Zr, { get: () => e });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, en)) {
  let e = Object.create(null),
    t = [];
  Object.defineProperty(globalThis, en, {
    configurable: !0,
    get: () => ({
      state: globalThis[Zr].get(globalThis[ql]),
      matchers: e,
      customEqualityTesters: t,
    }),
  });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, Xo)) {
  let e = Object.create(null);
  Object.defineProperty(globalThis, Xo, { get: () => e });
}
function Kn(e) {
  return globalThis[Zr].get(e);
}
function no(e, t) {
  let r = globalThis[Zr],
    n = r.get(t) || {};
  Object.assign(n, e), r.set(t, n);
}
var Yn = ve.green,
  xl = ve.red,
  NP = ve.inverse,
  jP = ve.bold,
  Pt = ve.dim;
function IP(e, t = "received", r = "expected", n = {}) {
  let {
      comment: a = "",
      isDirectExpectCall: o = !1,
      isNot: i = !1,
      promise: l = "",
      secondArgument: u = "",
      expectedColor: c = Yn,
      receivedColor: s = xl,
      secondArgumentColor: d = Yn,
    } = n,
    p = "",
    f = "expect";
  return (
    !o && t !== "" && ((p += Pt(`${f}(`) + s(t)), (f = ")")),
    l !== "" && ((p += Pt(`${f}.`) + l), (f = "")),
    i && ((p += `${Pt(`${f}.`)}not`), (f = "")),
    e.includes(".") ? (f += e) : ((p += Pt(`${f}.`) + e), (f = "")),
    r === ""
      ? (f += "()")
      : ((p += Pt(`${f}(`) + c(r)), u && (p += Pt(", ") + d(u)), (f = ")")),
    a !== "" && (f += ` // ${a}`),
    f !== "" && (p += Pt(f)),
    p
  );
}
var LP = "·";
function mh(e) {
  return e.replace(/\s+$/gm, (t) => LP.repeat(t.length));
}
function BP(e) {
  return xl(mh(Ge(e)));
}
function kP(e) {
  return Yn(mh(Ge(e)));
}
function bh() {
  return {
    EXPECTED_COLOR: Yn,
    RECEIVED_COLOR: xl,
    INVERTED_COLOR: NP,
    BOLD_WEIGHT: jP,
    DIM_COLOR: Pt,
    diff: vr,
    matcherHint: IP,
    printReceived: BP,
    printExpected: kP,
    printDiffOrStringify: ch,
  };
}
function Ml() {
  return globalThis[en].customEqualityTesters;
}
function te(e, t, r, n) {
  return (r = r || []), gh(e, t, [], [], r, n ? yh : FP);
}
function Xu(e) {
  return (
    !!e &&
    typeof e == "object" &&
    "asymmetricMatch" in e &&
    Xe("Function", e.asymmetricMatch)
  );
}
function DP(e, t) {
  let r = Xu(e),
    n = Xu(t);
  if (!(r && n)) {
    if (r) return e.asymmetricMatch(t);
    if (n) return t.asymmetricMatch(e);
  }
}
function gh(e, t, r, n, a, o) {
  let i = !0,
    l = DP(e, t);
  if (l !== void 0) return l;
  let u = { equals: te };
  for (let h = 0; h < a.length; h++) {
    let m = a[h].call(u, e, t, a);
    if (m !== void 0) return m;
  }
  if (e instanceof Error && t instanceof Error) return e.message === t.message;
  if (typeof URL == "function" && e instanceof URL && t instanceof URL)
    return e.href === t.href;
  if (Object.is(e, t)) return !0;
  if (e === null || t === null) return e === t;
  let c = Object.prototype.toString.call(e);
  if (c !== Object.prototype.toString.call(t)) return !1;
  switch (c) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      return typeof e != typeof t
        ? !1
        : typeof e != "object" && typeof t != "object"
          ? Object.is(e, t)
          : Object.is(e.valueOf(), t.valueOf());
    case "[object Date]": {
      let h = +e,
        m = +t;
      return h === m || (Number.isNaN(h) && Number.isNaN(m));
    }
    case "[object RegExp]":
      return e.source === t.source && e.flags === t.flags;
  }
  if (typeof e != "object" || typeof t != "object") return !1;
  if (Zu(e) && Zu(t)) return e.isEqualNode(t);
  let s = r.length;
  for (; s--; ) {
    if (r[s] === e) return n[s] === t;
    if (n[s] === t) return !1;
  }
  if ((r.push(e), n.push(t), c === "[object Array]" && e.length !== t.length))
    return !1;
  let d = Qu(e, o),
    p,
    f = d.length;
  if (Qu(t, o).length !== f) return !1;
  for (; f--; )
    if (((p = d[f]), (i = o(t, p) && gh(e[p], t[p], r, n, a, o)), !i))
      return !1;
  return r.pop(), n.pop(), i;
}
function Qu(e, t) {
  let r = [];
  for (let n in e) t(e, n) && r.push(n);
  return r.concat(
    Object.getOwnPropertySymbols(e).filter(
      (n) => Object.getOwnPropertyDescriptor(e, n).enumerable,
    ),
  );
}
function FP(e, t) {
  return yh(e, t) && e[t] !== void 0;
}
function yh(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Xe(e, t) {
  return Object.prototype.toString.apply(t) === `[object ${e}]`;
}
function Zu(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "nodeType" in e &&
    typeof e.nodeType == "number" &&
    "nodeName" in e &&
    typeof e.nodeName == "string" &&
    "isEqualNode" in e &&
    typeof e.isEqualNode == "function"
  );
}
var vh = "@@__IMMUTABLE_KEYED__@@",
  _h = "@@__IMMUTABLE_SET__@@",
  UP = "@@__IMMUTABLE_LIST__@@",
  qa = "@@__IMMUTABLE_ORDERED__@@",
  HP = "@@__IMMUTABLE_RECORD__@@";
function zP(e) {
  return !!(e && e[vh] && !e[qa]);
}
function VP(e) {
  return !!(e && e[_h] && !e[qa]);
}
function xa(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function GP(e) {
  return !!(e && xa(e) && e[UP]);
}
function WP(e) {
  return !!(e && xa(e) && e[vh] && e[qa]);
}
function KP(e) {
  return !!(e && xa(e) && e[_h] && e[qa]);
}
function YP(e) {
  return !!(e && xa(e) && e[HP]);
}
var Eh = Symbol.iterator;
function ec(e) {
  return !!(e != null && e[Eh]);
}
function De(e, t, r = [], n = [], a = []) {
  if (
    typeof e != "object" ||
    typeof t != "object" ||
    Array.isArray(e) ||
    Array.isArray(t) ||
    !ec(e) ||
    !ec(t)
  )
    return;
  if (e.constructor !== t.constructor) return !1;
  let o = n.length;
  for (; o--; ) if (n[o] === e) return a[o] === t;
  n.push(e), a.push(t);
  let i = [...r.filter((c) => c !== De), l];
  function l(c, s) {
    return De(c, s, [...r], [...n], [...a]);
  }
  if (e.size !== void 0) {
    if (e.size !== t.size) return !1;
    if (Xe("Set", e) || VP(e)) {
      let c = !0;
      for (let s of e)
        if (!t.has(s)) {
          let d = !1;
          for (let p of t) te(s, p, i) === !0 && (d = !0);
          if (d === !1) {
            c = !1;
            break;
          }
        }
      return n.pop(), a.pop(), c;
    } else if (Xe("Map", e) || zP(e)) {
      let c = !0;
      for (let s of e)
        if (!t.has(s[0]) || !te(s[1], t.get(s[0]), i)) {
          let d = !1;
          for (let p of t) {
            let f = te(s[0], p[0], i),
              h = !1;
            f === !0 && (h = te(s[1], p[1], i)), h === !0 && (d = !0);
          }
          if (d === !1) {
            c = !1;
            break;
          }
        }
      return n.pop(), a.pop(), c;
    }
  }
  let u = t[Eh]();
  for (let c of e) {
    let s = u.next();
    if (s.done || !te(c, s.value, i)) return !1;
  }
  if (!u.next().done) return !1;
  if (!GP(e) && !WP(e) && !KP(e) && !YP(e)) {
    let c = Object.entries(e),
      s = Object.entries(t);
    if (!te(c, s)) return !1;
  }
  return n.pop(), a.pop(), !0;
}
function $l(e, t) {
  return !e || typeof e != "object" || e === Object.prototype
    ? !1
    : Object.prototype.hasOwnProperty.call(e, t) ||
        $l(Object.getPrototypeOf(e), t);
}
function JP(e) {
  return (
    xn(e) && !(e instanceof Error) && !Array.isArray(e) && !(e instanceof Date)
  );
}
function bn(e, t, r = []) {
  let n = r.filter((o) => o !== bn),
    a =
      (o = new WeakMap()) =>
      (i, l) => {
        if (JP(l))
          return Object.keys(l).every((u) => {
            if (l[u] != null && typeof l[u] == "object") {
              if (o.has(l[u])) return te(i[u], l[u], n);
              o.set(l[u], !0);
            }
            let c = i != null && $l(i, u) && te(i[u], l[u], [...n, a(o)]);
            return o.delete(l[u]), c;
          });
      };
  return a()(e, t);
}
function tc(e, t) {
  if (!(e == null || t == null || e.constructor === t.constructor)) return !1;
}
function rc(e, t) {
  let r = e,
    n = t;
  if (!(e instanceof DataView && t instanceof DataView)) {
    if (!(e instanceof ArrayBuffer) || !(t instanceof ArrayBuffer)) return;
    try {
      (r = new DataView(e)), (n = new DataView(t));
    } catch {
      return;
    }
  }
  if (r.byteLength !== n.byteLength) return !1;
  for (let a = 0; a < r.byteLength; a++)
    if (r.getUint8(a) !== n.getUint8(a)) return !1;
  return !0;
}
function Qo(e, t, r = []) {
  if (!Array.isArray(e) || !Array.isArray(t)) return;
  let n = Object.keys(e),
    a = Object.keys(t),
    o = r.filter((i) => i !== Qo);
  return te(e, t, o, !0) && te(n, a);
}
function XP(e, t = "#{this}", r = "#{exp}") {
  let n = `expected ${t} to be ${r} // Object.is equality`;
  return ["toStrictEqual", "toEqual"].includes(e)
    ? `${n}

If it should pass with deep equality, replace "toBe" with "${e}"

Expected: ${t}
Received: serializes to the same string
`
    : n;
}
function QP(e, t) {
  return `${t} ${e}${t === 1 ? "" : "s"}`;
}
function ao(e) {
  return [
    ...Object.keys(e),
    ...Object.getOwnPropertySymbols(e).filter((t) => {
      var r;
      return (r = Object.getOwnPropertyDescriptor(e, t)) == null
        ? void 0
        : r.enumerable;
    }),
  ];
}
function ZP(e, t, r = []) {
  let n = 0,
    a =
      (o = new WeakMap()) =>
      (i, l) => {
        if (Array.isArray(i)) {
          if (Array.isArray(l) && l.length === i.length)
            return l.map((u, c) => a(o)(i[c], u));
        } else {
          if (i instanceof Date) return i;
          if (xn(i) && xn(l)) {
            if (te(i, l, [...r, De, bn])) return l;
            let u = {};
            o.set(i, u);
            for (let c of ao(i))
              $l(l, c)
                ? (u[c] = o.has(i[c]) ? o.get(i[c]) : a(o)(i[c], l[c]))
                : o.has(i[c]) ||
                  ((n += 1),
                  xn(i[c]) && (n += ao(i[c]).length),
                  a(o)(i[c], l[c]));
            if (ao(u).length > 0) return u;
          }
        }
        return i;
      };
  return { subset: a()(e, t), stripped: n };
}
var Bt = class {
    constructor(e, t = !1) {
      ye(this, "$$typeof", Symbol.for("jest.asymmetricMatcher"));
      (this.sample = e), (this.inverse = t);
    }
    getMatcherContext(e) {
      return {
        ...Kn(e || globalThis[ql]),
        equals: te,
        isNot: this.inverse,
        customTesters: Ml(),
        utils: {
          ...bh(),
          diff: vr,
          stringify: Ge,
          iterableEquality: De,
          subsetEquality: bn,
        },
      };
    }
    [Symbol.for("chai/inspect")](e) {
      let t = Ge(this, e.depth, { min: !0 });
      return t.length <= e.truncate ? t : `${this.toString()}{…}`;
    }
  },
  nc = class extends Bt {
    constructor(e, t = !1) {
      if (!Xe("String", e)) throw new Error("Expected is not a string");
      super(e, t);
    }
    asymmetricMatch(e) {
      let t = Xe("String", e) && e.includes(this.sample);
      return this.inverse ? !t : t;
    }
    toString() {
      return `String${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
      return "string";
    }
  },
  eO = class extends Bt {
    asymmetricMatch(e) {
      return e != null;
    }
    toString() {
      return "Anything";
    }
    toAsymmetricMatcher() {
      return "Anything";
    }
  },
  ac = class extends Bt {
    constructor(e, t = !1) {
      super(e, t);
    }
    getPrototype(e) {
      return Object.getPrototypeOf
        ? Object.getPrototypeOf(e)
        : e.constructor.prototype === e
          ? null
          : e.constructor.prototype;
    }
    hasProperty(e, t) {
      return e
        ? Object.prototype.hasOwnProperty.call(e, t)
          ? !0
          : this.hasProperty(this.getPrototype(e), t)
        : !1;
    }
    asymmetricMatch(e) {
      if (typeof this.sample != "object")
        throw new TypeError(
          `You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`,
        );
      let t = !0,
        r = this.getMatcherContext();
      for (let n in this.sample)
        if (
          !this.hasProperty(e, n) ||
          !te(this.sample[n], e[n], r.customTesters)
        ) {
          t = !1;
          break;
        }
      return this.inverse ? !t : t;
    }
    toString() {
      return `Object${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
      return "object";
    }
  },
  oc = class extends Bt {
    constructor(e, t = !1) {
      super(e, t);
    }
    asymmetricMatch(e) {
      if (!Array.isArray(this.sample))
        throw new TypeError(
          `You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`,
        );
      let t = this.getMatcherContext(),
        r =
          this.sample.length === 0 ||
          (Array.isArray(e) &&
            this.sample.every((n) => e.some((a) => te(n, a, t.customTesters))));
      return this.inverse ? !r : r;
    }
    toString() {
      return `Array${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
      return "array";
    }
  },
  tO = class extends Bt {
    constructor(e) {
      if (typeof e > "u")
        throw new TypeError(
          "any() expects to be passed a constructor function. Please pass one or use anything() to match any object.",
        );
      super(e);
    }
    fnNameFor(e) {
      if (e.name) return e.name;
      let t = Function.prototype.toString
        .call(e)
        .match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
      return t ? t[1] : "<anonymous>";
    }
    asymmetricMatch(e) {
      return this.sample === String
        ? typeof e == "string" || e instanceof String
        : this.sample === Number
          ? typeof e == "number" || e instanceof Number
          : this.sample === Function
            ? typeof e == "function" || e instanceof Function
            : this.sample === Boolean
              ? typeof e == "boolean" || e instanceof Boolean
              : this.sample === BigInt
                ? typeof e == "bigint" || e instanceof BigInt
                : this.sample === Symbol
                  ? typeof e == "symbol" || e instanceof Symbol
                  : this.sample === Object
                    ? typeof e == "object"
                    : e instanceof this.sample;
    }
    toString() {
      return "Any";
    }
    getExpectedType() {
      return this.sample === String
        ? "string"
        : this.sample === Number
          ? "number"
          : this.sample === Function
            ? "function"
            : this.sample === Object
              ? "object"
              : this.sample === Boolean
                ? "boolean"
                : this.fnNameFor(this.sample);
    }
    toAsymmetricMatcher() {
      return `Any<${this.fnNameFor(this.sample)}>`;
    }
  },
  ic = class extends Bt {
    constructor(e, t = !1) {
      if (!Xe("String", e) && !Xe("RegExp", e))
        throw new Error("Expected is not a String or a RegExp");
      super(new RegExp(e), t);
    }
    asymmetricMatch(e) {
      let t = Xe("String", e) && this.sample.test(e);
      return this.inverse ? !t : t;
    }
    toString() {
      return `String${this.inverse ? "Not" : ""}Matching`;
    }
    getExpectedType() {
      return "string";
    }
  },
  lc = class extends Bt {
    constructor(t, r = 2, n = !1) {
      if (!Xe("Number", t)) throw new Error("Expected is not a Number");
      if (!Xe("Number", r)) throw new Error("Precision is not a Number");
      super(t);
      ye(this, "precision");
      (this.inverse = n), (this.precision = r);
    }
    asymmetricMatch(t) {
      if (!Xe("Number", t)) return !1;
      let r = !1;
      return (
        (t === Number.POSITIVE_INFINITY &&
          this.sample === Number.POSITIVE_INFINITY) ||
        (t === Number.NEGATIVE_INFINITY &&
          this.sample === Number.NEGATIVE_INFINITY)
          ? (r = !0)
          : (r = Math.abs(this.sample - t) < 10 ** -this.precision / 2),
        this.inverse ? !r : r
      );
    }
    toString() {
      return `Number${this.inverse ? "Not" : ""}CloseTo`;
    }
    getExpectedType() {
      return "number";
    }
    toAsymmetricMatcher() {
      return [
        this.toString(),
        this.sample,
        `(${QP("digit", this.precision)})`,
      ].join(" ");
    }
  },
  rO = (e, t) => {
    t.addMethod(e.expect, "anything", () => new eO()),
      t.addMethod(e.expect, "any", (r) => new tO(r)),
      t.addMethod(e.expect, "stringContaining", (r) => new nc(r)),
      t.addMethod(e.expect, "objectContaining", (r) => new ac(r)),
      t.addMethod(e.expect, "arrayContaining", (r) => new oc(r)),
      t.addMethod(e.expect, "stringMatching", (r) => new ic(r)),
      t.addMethod(e.expect, "closeTo", (r, n) => new lc(r, n)),
      (e.expect.not = {
        stringContaining: (r) => new nc(r, !0),
        objectContaining: (r) => new ac(r, !0),
        arrayContaining: (r) => new oc(r, !0),
        stringMatching: (r) => new ic(r, !0),
        closeTo: (r, n) => new lc(r, n, !0),
      });
  };
function sc(e, t) {
  return (
    e &&
      t instanceof Promise &&
      ((t = t.finally(() => {
        let r = e.promises.indexOf(t);
        r !== -1 && e.promises.splice(r, 1);
      })),
      e.promises || (e.promises = []),
      e.promises.push(t)),
    t
  );
}
function wh(e, t) {
  return function (...r) {
    var n;
    if (!e.flag(this, "soft")) return t.apply(this, r);
    let a = e.flag(this, "vitest-test");
    if (!a) throw new Error("expect.soft() can only be used inside a test");
    try {
      return t.apply(this, r);
    } catch (o) {
      a.result || (a.result = { state: "fail" }),
        (a.result.state = "fail"),
        (n = a.result).errors || (n.errors = []),
        a.result.errors.push(hh(o));
    }
  };
}
var nO = (e, t) => {
  let { AssertionError: r } = e,
    n = Ml();
  function a(s, d) {
    let p = (f) => {
      let h = wh(t, d);
      t.addMethod(e.Assertion.prototype, f, h),
        t.addMethod(globalThis[en].matchers, f, h);
    };
    Array.isArray(s) ? s.forEach((f) => p(f)) : p(s);
  }
  ["throw", "throws", "Throw"].forEach((s) => {
    t.overwriteMethod(
      e.Assertion.prototype,
      s,
      (d) =>
        function (...p) {
          let f = t.flag(this, "promise"),
            h = t.flag(this, "object"),
            m = t.flag(this, "negate");
          if (f === "rejects")
            t.flag(this, "object", () => {
              throw h;
            });
          else if (f === "resolves" && typeof h != "function") {
            if (m) return;
            {
              let g =
                  t.flag(this, "message") ||
                  "expected promise to throw an error, but it didn't",
                b = { showDiff: !1 };
              throw new r(g, b, t.flag(this, "ssfi"));
            }
          }
          d.apply(this, p);
        },
    );
  }),
    a("withTest", function (s) {
      return t.flag(this, "vitest-test", s), this;
    }),
    a("toEqual", function (s) {
      let d = t.flag(this, "object"),
        p = te(d, s, [...n, De]);
      return this.assert(
        p,
        "expected #{this} to deeply equal #{exp}",
        "expected #{this} to not deeply equal #{exp}",
        s,
        d,
      );
    }),
    a("toStrictEqual", function (s) {
      let d = t.flag(this, "object"),
        p = te(d, s, [...n, De, tc, Qo, rc], !0);
      return this.assert(
        p,
        "expected #{this} to strictly equal #{exp}",
        "expected #{this} to not strictly equal #{exp}",
        s,
        d,
      );
    }),
    a("toBe", function (s) {
      let d = this._obj,
        p = Object.is(d, s),
        f = "";
      return (
        p ||
          (te(d, s, [...n, De, tc, Qo, rc], !0)
            ? (f = "toStrictEqual")
            : te(d, s, [...n, De]) && (f = "toEqual")),
        this.assert(
          p,
          XP(f),
          "expected #{this} not to be #{exp} // Object.is equality",
          s,
          d,
        )
      );
    }),
    a("toMatchObject", function (s) {
      let d = this._obj,
        p = te(d, s, [...n, De, bn]),
        f = t.flag(this, "negate"),
        { subset: h, stripped: m } = ZP(d, s);
      if ((p && f) || (!p && !f)) {
        let g = t.getMessage(this, [
            p,
            "expected #{this} to match object #{exp}",
            "expected #{this} to not match object #{exp}",
            s,
            h,
            !1,
          ]),
          b =
            m === 0
              ? g
              : `${g}
(${m} matching ${m === 1 ? "property" : "properties"} omitted from actual)`;
        throw new r(b, { showDiff: !0, expected: s, actual: h });
      }
    }),
    a("toMatch", function (s) {
      let d = this._obj;
      if (typeof d != "string")
        throw new TypeError(
          `.toMatch() expects to receive a string, but got ${typeof d}`,
        );
      return this.assert(
        typeof s == "string" ? d.includes(s) : d.match(s),
        "expected #{this} to match #{exp}",
        "expected #{this} not to match #{exp}",
        s,
        d,
      );
    }),
    a("toContain", function (s) {
      let d = this._obj;
      if (typeof Node < "u" && d instanceof Node) {
        if (!(s instanceof Node))
          throw new TypeError(
            `toContain() expected a DOM node as the argument, but got ${typeof s}`,
          );
        return this.assert(
          d.contains(s),
          "expected #{this} to contain element #{exp}",
          "expected #{this} not to contain element #{exp}",
          s,
          d,
        );
      }
      if (typeof DOMTokenList < "u" && d instanceof DOMTokenList) {
        dt(s, "class name", ["string"]);
        let p = t.flag(this, "negate")
          ? d.value.replace(s, "").trim()
          : `${d.value} ${s}`;
        return this.assert(
          d.contains(s),
          `expected "${d.value}" to contain "${s}"`,
          `expected "${d.value}" not to contain "${s}"`,
          p,
          d.value,
        );
      }
      return typeof d == "string" && typeof s == "string"
        ? this.assert(
            d.includes(s),
            "expected #{this} to contain #{exp}",
            "expected #{this} not to contain #{exp}",
            s,
            d,
          )
        : (d != null &&
            typeof d != "string" &&
            t.flag(this, "object", Array.from(d)),
          this.contain(s));
    }),
    a("toContainEqual", function (s) {
      let d = t.flag(this, "object"),
        p = Array.from(d).findIndex((f) => te(f, s, n));
      this.assert(
        p !== -1,
        "expected #{this} to deep equally contain #{exp}",
        "expected #{this} to not deep equally contain #{exp}",
        s,
      );
    }),
    a("toBeTruthy", function () {
      let s = t.flag(this, "object");
      this.assert(
        !!s,
        "expected #{this} to be truthy",
        "expected #{this} to not be truthy",
        s,
        !1,
      );
    }),
    a("toBeFalsy", function () {
      let s = t.flag(this, "object");
      this.assert(
        !s,
        "expected #{this} to be falsy",
        "expected #{this} to not be falsy",
        s,
        !1,
      );
    }),
    a("toBeGreaterThan", function (s) {
      let d = this._obj;
      return (
        dt(d, "actual", ["number", "bigint"]),
        dt(s, "expected", ["number", "bigint"]),
        this.assert(
          d > s,
          `expected ${d} to be greater than ${s}`,
          `expected ${d} to be not greater than ${s}`,
          d,
          s,
          !1,
        )
      );
    }),
    a("toBeGreaterThanOrEqual", function (s) {
      let d = this._obj;
      return (
        dt(d, "actual", ["number", "bigint"]),
        dt(s, "expected", ["number", "bigint"]),
        this.assert(
          d >= s,
          `expected ${d} to be greater than or equal to ${s}`,
          `expected ${d} to be not greater than or equal to ${s}`,
          d,
          s,
          !1,
        )
      );
    }),
    a("toBeLessThan", function (s) {
      let d = this._obj;
      return (
        dt(d, "actual", ["number", "bigint"]),
        dt(s, "expected", ["number", "bigint"]),
        this.assert(
          d < s,
          `expected ${d} to be less than ${s}`,
          `expected ${d} to be not less than ${s}`,
          d,
          s,
          !1,
        )
      );
    }),
    a("toBeLessThanOrEqual", function (s) {
      let d = this._obj;
      return (
        dt(d, "actual", ["number", "bigint"]),
        dt(s, "expected", ["number", "bigint"]),
        this.assert(
          d <= s,
          `expected ${d} to be less than or equal to ${s}`,
          `expected ${d} to be not less than or equal to ${s}`,
          d,
          s,
          !1,
        )
      );
    }),
    a("toBeNaN", function () {
      return this.be.NaN;
    }),
    a("toBeUndefined", function () {
      return this.be.undefined;
    }),
    a("toBeNull", function () {
      return this.be.null;
    }),
    a("toBeDefined", function () {
      let s = t.flag(this, "negate");
      return (
        t.flag(this, "negate", !1),
        s ? this.be.undefined : this.not.be.undefined
      );
    }),
    a("toBeTypeOf", function (s) {
      let d = typeof this._obj,
        p = s === d;
      return this.assert(
        p,
        "expected #{this} to be type of #{exp}",
        "expected #{this} not to be type of #{exp}",
        s,
        d,
      );
    }),
    a("toBeInstanceOf", function (s) {
      return this.instanceOf(s);
    }),
    a("toHaveLength", function (s) {
      return this.have.length(s);
    }),
    a("toHaveProperty", function (...s) {
      Array.isArray(s[0]) &&
        (s[0] = s[0]
          .map((R) => String(R).replace(/([.[\]])/g, "\\$1"))
          .join("."));
      let d = this._obj,
        [p, f] = s,
        h = () =>
          Object.prototype.hasOwnProperty.call(d, p)
            ? { value: d[p], exists: !0 }
            : t.getPathInfo(d, p),
        { value: m, exists: g } = h(),
        b = g && (s.length === 1 || te(f, m, n)),
        y = s.length === 1 ? "" : ` with value ${t.objDisplay(f)}`;
      return this.assert(
        b,
        `expected #{this} to have property "${p}"${y}`,
        `expected #{this} to not have property "${p}"${y}`,
        f,
        g ? m : void 0,
      );
    }),
    a("toBeCloseTo", function (s, d = 2) {
      let p = this._obj,
        f = !1,
        h = 0,
        m = 0;
      return (
        (s === Number.POSITIVE_INFINITY && p === Number.POSITIVE_INFINITY) ||
        (s === Number.NEGATIVE_INFINITY && p === Number.NEGATIVE_INFINITY)
          ? (f = !0)
          : ((h = 10 ** -d / 2), (m = Math.abs(p - s)), (f = m < h)),
        this.assert(
          f,
          `expected #{this} to be close to #{exp}, received difference is ${m}, but expected ${h}`,
          `expected #{this} to not be close to #{exp}, received difference is ${m}, but expected ${h}`,
          s,
          p,
          !1,
        )
      );
    });
  let o = (s) => {
      if (!ph(s._obj))
        throw new TypeError(
          `${t.inspect(s._obj)} is not a spy or a call to a spy!`,
        );
    },
    i = (s) => (o(s), s._obj),
    l = (s) => {
      let d = s % 10,
        p = s % 100;
      return d === 1 && p !== 11
        ? `${s}st`
        : d === 2 && p !== 12
          ? `${s}nd`
          : d === 3 && p !== 13
            ? `${s}rd`
            : `${s}th`;
    },
    u = (s, d, p) => (
      s.mock.calls &&
        (d += ve.gray(`

Received: 

${s.mock.calls.map((f, h) => {
  let m = ve.bold(`  ${l(h + 1)} ${s.getMockName()} call:

`);
  return (
    p
      ? (m += vr(p, f, { omitAnnotationLines: !0 }))
      : (m += Ge(f)
          .split(
            `
`,
          )
          .map((g) => `    ${g}`).join(`
`)),
    (m += `
`),
    m
  );
}).join(`
`)}`)),
      (d += ve.gray(`

Number of calls: ${ve.bold(s.mock.calls.length)}
`)),
      d
    ),
    c = (s, d, p, f) => (
      (p += ve.gray(`

Received: 

${d.map((h, m) => {
  let g = ve.bold(`  ${l(m + 1)} ${s.getMockName()} call return:

`);
  return (
    f
      ? (g += vr(f, h.value, { omitAnnotationLines: !0 }))
      : (g += Ge(h)
          .split(
            `
`,
          )
          .map((b) => `    ${b}`).join(`
`)),
    (g += `
`),
    g
  );
}).join(`
`)}`)),
      (p += ve.gray(`

Number of calls: ${ve.bold(s.mock.calls.length)}
`)),
      p
    );
  a(["toHaveBeenCalledTimes", "toBeCalledTimes"], function (s) {
    let d = i(this),
      p = d.getMockName(),
      f = d.mock.calls.length;
    return this.assert(
      f === s,
      `expected "${p}" to be called #{exp} times, but got ${f} times`,
      `expected "${p}" to not be called #{exp} times`,
      s,
      f,
      !1,
    );
  }),
    a("toHaveBeenCalledOnce", function () {
      let s = i(this),
        d = s.getMockName(),
        p = s.mock.calls.length;
      return this.assert(
        p === 1,
        `expected "${d}" to be called once, but got ${p} times`,
        `expected "${d}" to not be called once`,
        1,
        p,
        !1,
      );
    }),
    a(["toHaveBeenCalled", "toBeCalled"], function () {
      let s = i(this),
        d = s.getMockName(),
        p = s.mock.calls.length,
        f = p > 0,
        h = t.flag(this, "negate"),
        m = t.getMessage(this, [
          f,
          `expected "${d}" to be called at least once`,
          `expected "${d}" to not be called at all, but actually been called ${p} times`,
          !0,
          f,
        ]);
      if ((f && h && (m = u(s, m)), (f && h) || (!f && !h))) throw new r(m);
    }),
    a(["toHaveBeenCalledWith", "toBeCalledWith"], function (...s) {
      let d = i(this),
        p = d.getMockName(),
        f = d.mock.calls.some((g) => te(g, s, [...n, De])),
        h = t.flag(this, "negate"),
        m = t.getMessage(this, [
          f,
          `expected "${p}" to be called with arguments: #{exp}`,
          `expected "${p}" to not be called with arguments: #{exp}`,
          s,
        ]);
      if ((f && h) || (!f && !h)) throw new r(u(d, m, s));
    }),
    a(["toHaveBeenNthCalledWith", "nthCalledWith"], function (s, ...d) {
      let p = i(this),
        f = p.getMockName(),
        h = p.mock.calls[s - 1],
        m = p.mock.calls.length,
        g = s <= m;
      this.assert(
        te(h, d, [...n, De]),
        `expected ${l(s)} "${f}" call to have been called with #{exp}${g ? "" : `, but called only ${m} times`}`,
        `expected ${l(s)} "${f}" call to not have been called with #{exp}`,
        d,
        h,
        g,
      );
    }),
    a(["toHaveBeenLastCalledWith", "lastCalledWith"], function (...s) {
      let d = i(this),
        p = d.getMockName(),
        f = d.mock.calls[d.mock.calls.length - 1];
      this.assert(
        te(f, s, [...n, De]),
        `expected last "${p}" call to have been called with #{exp}`,
        `expected last "${p}" call to not have been called with #{exp}`,
        s,
        f,
      );
    }),
    a(["toThrow", "toThrowError"], function (s) {
      if (typeof s == "string" || typeof s > "u" || s instanceof RegExp)
        return this.throws(s);
      let d = this._obj,
        p = t.flag(this, "promise"),
        f = t.flag(this, "negate"),
        h = null;
      if (p === "rejects") h = d;
      else if (p === "resolves" && typeof d != "function") {
        if (f) return;
        {
          let m =
              t.flag(this, "message") ||
              "expected promise to throw an error, but it didn't",
            g = { showDiff: !1 };
          throw new r(m, g, t.flag(this, "ssfi"));
        }
      } else {
        let m = !1;
        try {
          d();
        } catch (g) {
          (m = !0), (h = g);
        }
        if (!m && !f) {
          let g =
              t.flag(this, "message") ||
              "expected function to throw an error, but it didn't",
            b = { showDiff: !1 };
          throw new r(g, b, t.flag(this, "ssfi"));
        }
      }
      if (typeof s == "function") {
        let m = s.name || s.prototype.constructor.name;
        return this.assert(
          h && h instanceof s,
          `expected error to be instance of ${m}`,
          `expected error not to be instance of ${m}`,
          s,
          h,
        );
      }
      if (s instanceof Error)
        return this.assert(
          h && s.message === h.message,
          `expected error to have message: ${s.message}`,
          `expected error not to have message: ${s.message}`,
          s.message,
          h && h.message,
        );
      if (
        typeof s == "object" &&
        "asymmetricMatch" in s &&
        typeof s.asymmetricMatch == "function"
      ) {
        let m = s;
        return this.assert(
          h && m.asymmetricMatch(h),
          "expected error to match asymmetric matcher",
          "expected error not to match asymmetric matcher",
          m,
          h,
        );
      }
      throw new Error(
        `"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof s}"`,
      );
    }),
    [
      {
        name: "toHaveResolved",
        condition: (s) =>
          s.mock.settledResults.length > 0 &&
          s.mock.settledResults.some(({ type: d }) => d === "fulfilled"),
        action: "resolved",
      },
      {
        name: ["toHaveReturned", "toReturn"],
        condition: (s) =>
          s.mock.calls.length > 0 &&
          s.mock.results.some(({ type: d }) => d !== "throw"),
        action: "called",
      },
    ].forEach(({ name: s, condition: d, action: p }) => {
      a(s, function () {
        let f = i(this),
          h = f.getMockName(),
          m = d(f);
        this.assert(
          m,
          `expected "${h}" to be successfully ${p} at least once`,
          `expected "${h}" to not be successfully ${p}`,
          m,
          !m,
          !1,
        );
      });
    }),
    [
      {
        name: "toHaveResolvedTimes",
        condition: (s, d) =>
          s.mock.settledResults.reduce(
            (p, { type: f }) => (f === "fulfilled" ? ++p : p),
            0,
          ) === d,
        action: "resolved",
      },
      {
        name: ["toHaveReturnedTimes", "toReturnTimes"],
        condition: (s, d) =>
          s.mock.results.reduce(
            (p, { type: f }) => (f === "throw" ? p : ++p),
            0,
          ) === d,
        action: "called",
      },
    ].forEach(({ name: s, condition: d, action: p }) => {
      a(s, function (f) {
        let h = i(this),
          m = h.getMockName(),
          g = d(h, f);
        this.assert(
          g,
          `expected "${m}" to be successfully ${p} ${f} times`,
          `expected "${m}" to not be successfully ${p} ${f} times`,
          `expected resolved times: ${f}`,
          `received resolved times: ${g}`,
          !1,
        );
      });
    }),
    [
      {
        name: "toHaveResolvedWith",
        condition: (s, d) =>
          s.mock.settledResults.some(
            ({ type: p, value: f }) => p === "fulfilled" && te(d, f),
          ),
        action: "resolve",
      },
      {
        name: ["toHaveReturnedWith", "toReturnWith"],
        condition: (s, d) =>
          s.mock.results.some(
            ({ type: p, value: f }) => p === "return" && te(d, f),
          ),
        action: "return",
      },
    ].forEach(({ name: s, condition: d, action: p }) => {
      a(s, function (f) {
        let h = i(this),
          m = d(h, f),
          g = t.flag(this, "negate");
        if ((m && g) || (!m && !g)) {
          let b = h.getMockName(),
            y = t.getMessage(this, [
              m,
              `expected "${b}" to ${p} with: #{exp} at least once`,
              `expected "${b}" to not ${p} with: #{exp}`,
              f,
            ]),
            R = p === "return" ? h.mock.results : h.mock.settledResults;
          throw new r(c(h, R, y, f));
        }
      });
    }),
    [
      {
        name: "toHaveLastResolvedWith",
        condition: (s, d) => {
          let p = s.mock.settledResults[s.mock.settledResults.length - 1];
          return p && p.type === "fulfilled" && te(p.value, d);
        },
        action: "resolve",
      },
      {
        name: ["toHaveLastReturnedWith", "lastReturnedWith"],
        condition: (s, d) => {
          let p = s.mock.results[s.mock.results.length - 1];
          return p && p.type === "return" && te(p.value, d);
        },
        action: "return",
      },
    ].forEach(({ name: s, condition: d, action: p }) => {
      a(s, function (f) {
        let h = i(this),
          m = p === "return" ? h.mock.results : h.mock.settledResults,
          g = m[m.length - 1],
          b = h.getMockName();
        this.assert(
          d(h, f),
          `expected last "${b}" call to ${p} #{exp}`,
          `expected last "${b}" call to not ${p} #{exp}`,
          f,
          g == null ? void 0 : g.value,
        );
      });
    }),
    [
      {
        name: "toHaveNthResolvedWith",
        condition: (s, d, p) => {
          let f = s.mock.settledResults[d - 1];
          return f && f.type === "fulfilled" && te(f.value, p);
        },
        action: "resolve",
      },
      {
        name: ["toHaveNthReturnedWith", "nthReturnedWith"],
        condition: (s, d, p) => {
          let f = s.mock.results[d - 1];
          return f && f.type === "return" && te(f.value, p);
        },
        action: "return",
      },
    ].forEach(({ name: s, condition: d, action: p }) => {
      a(s, function (f, h) {
        let m = i(this),
          g = m.getMockName(),
          b = (p === "return" ? m.mock.results : m.mock.settledResults)[f - 1],
          y = `${l(f)} call`;
        this.assert(
          d(m, f, h),
          `expected ${y} "${g}" call to ${p} #{exp}`,
          `expected ${y} "${g}" call to not ${p} #{exp}`,
          h,
          b == null ? void 0 : b.value,
        );
      });
    }),
    a("toSatisfy", function (s, d) {
      return this.be.satisfy(s, d);
    }),
    a("withContext", function (s) {
      for (let d in s) t.flag(this, d, s[d]);
      return this;
    }),
    t.addProperty(e.Assertion.prototype, "resolves", function () {
      let s = new Error("resolves");
      t.flag(this, "promise", "resolves"), t.flag(this, "error", s);
      let d = t.flag(this, "vitest-test"),
        p = t.flag(this, "object");
      if (t.flag(this, "poll"))
        throw new SyntaxError(
          "expect.poll() is not supported in combination with .resolves",
        );
      if (typeof (p == null ? void 0 : p.then) != "function")
        throw new TypeError(
          `You must provide a Promise to expect() when using .resolves, not '${typeof p}'.`,
        );
      let f = new Proxy(this, {
        get: (h, m, g) => {
          let b = Reflect.get(h, m, g);
          return typeof b != "function"
            ? b instanceof e.Assertion
              ? f
              : b
            : async (...y) => {
                let R = p.then(
                  (_) => (t.flag(this, "object", _), b.call(this, ...y)),
                  (_) => {
                    let C = new r(
                      `promise rejected "${t.inspect(_)}" instead of resolving`,
                      {
                        showDiff: !1,
                      },
                    );
                    throw (
                      ((C.cause = _),
                      (C.stack = s.stack.replace(s.message, C.message)),
                      C)
                    );
                  },
                );
                return sc(d, R);
              };
        },
      });
      return f;
    }),
    t.addProperty(e.Assertion.prototype, "rejects", function () {
      let s = new Error("rejects");
      t.flag(this, "promise", "rejects"), t.flag(this, "error", s);
      let d = t.flag(this, "vitest-test"),
        p = t.flag(this, "object"),
        f = typeof p == "function" ? p() : p;
      if (t.flag(this, "poll"))
        throw new SyntaxError(
          "expect.poll() is not supported in combination with .rejects",
        );
      if (typeof (f == null ? void 0 : f.then) != "function")
        throw new TypeError(
          `You must provide a Promise to expect() when using .rejects, not '${typeof f}'.`,
        );
      let h = new Proxy(this, {
        get: (m, g, b) => {
          let y = Reflect.get(m, g, b);
          return typeof y != "function"
            ? y instanceof e.Assertion
              ? h
              : y
            : async (...R) => {
                let _ = f.then(
                  (C) => {
                    let w = new r(
                      `promise resolved "${t.inspect(C)}" instead of rejecting`,
                      {
                        showDiff: !0,
                        expected: new Error("rejected promise"),
                        actual: C,
                      },
                    );
                    throw (
                      ((w.stack = s.stack.replace(s.message, w.message)), w)
                    );
                  },
                  (C) => (t.flag(this, "object", C), y.call(this, ...R)),
                );
                return sc(d, _);
              };
        },
      });
      return h;
    });
};
function aO(e, t) {
  let r = e._obj,
    n = nt.flag(e, "negate"),
    a = nt.flag(e, "promise") || "",
    o = {
      ...bh(),
      diff: vr,
      stringify: Ge,
      iterableEquality: De,
      subsetEquality: bn,
    };
  return {
    state: {
      ...Kn(t),
      customTesters: Ml(),
      isNot: n,
      utils: o,
      promise: a,
      equals: te,
      suppressedErrors: [],
      soft: nt.flag(e, "soft"),
      poll: nt.flag(e, "poll"),
    },
    isNot: n,
    obj: r,
  };
}
var uc = class extends Error {
  constructor(e, t, r) {
    super(e), (this.actual = t), (this.expected = r);
  }
};
function oO(e, t, r) {
  return (n, a) => {
    Object.entries(r).forEach(([o, i]) => {
      function l(...d) {
        let { state: p, isNot: f, obj: h } = aO(this, t),
          m = i.call(p, h, ...d);
        if (m && typeof m == "object" && m instanceof Promise)
          return m.then(({ pass: _, message: C, actual: w, expected: v }) => {
            if ((_ && f) || (!_ && !f)) throw new uc(C(), w, v);
          });
        let { pass: g, message: b, actual: y, expected: R } = m;
        if ((g && f) || (!g && !f)) throw new uc(b(), y, R);
      }
      let u = wh(a, l);
      a.addMethod(globalThis[en].matchers, o, u),
        a.addMethod(e.Assertion.prototype, o, u);
      class c extends Bt {
        constructor(p = !1, ...f) {
          super(f, p);
        }
        asymmetricMatch(p) {
          let { pass: f } = i.call(
            this.getMatcherContext(t),
            p,
            ...this.sample,
          );
          return this.inverse ? !f : f;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${o}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
        }
      }
      let s = (...d) => new c(!1, ...d);
      Object.defineProperty(t, o, {
        configurable: !0,
        enumerable: !0,
        value: s,
        writable: !0,
      }),
        Object.defineProperty(t.not, o, {
          configurable: !0,
          enumerable: !0,
          value: (...d) => new c(!0, ...d),
          writable: !0,
        }),
        Object.defineProperty(globalThis[Xo], o, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0,
        });
    });
  };
}
var iO = (e, t) => {
  t.addMethod(e.expect, "extend", (r, n) => {
    Dr(oO(e, r, n));
  });
};
function lO() {
  Dr(iO), Dr(nO), Dr(rO);
  let e = (n, a) => {
    let { assertionCalls: o } = Kn(e);
    return no({ assertionCalls: o + 1, soft: !1 }, e), Ht(n, a);
  };
  Object.assign(e, Ht),
    (e.getState = () => Kn(e)),
    (e.setState = (n) => no(n, e)),
    (e.extend = (n) => Ht.extend(e, n)),
    (e.soft = (...n) => {
      let a = e(...n);
      return e.setState({ soft: !0 }), a;
    }),
    (e.unreachable = (n) => {
      S.fail(`expected${n ? ` "${n}" ` : " "}not to be reached`);
    });
  function t(n) {
    let a = () =>
      new Error(
        `expected number of assertions to be ${n}, but got ${e.getState().assertionCalls}`,
      );
    "captureStackTrace" in Error &&
      typeof Error.captureStackTrace == "function" &&
      Error.captureStackTrace(a(), t),
      e.setState({
        expectedAssertionsNumber: n,
        expectedAssertionsNumberErrorGen: a,
      });
  }
  function r() {
    let n = new Error("expected any number of assertion, but got none");
    "captureStackTrace" in Error &&
      typeof Error.captureStackTrace == "function" &&
      Error.captureStackTrace(n, r),
      e.setState({ isExpectingAssertions: !0, isExpectingAssertionsError: n });
  }
  return (
    no(
      {
        assertionCalls: 0,
        isExpectingAssertions: !1,
        isExpectingAssertionsError: null,
        expectedAssertionsNumber: null,
        expectedAssertionsNumberErrorGen: null,
      },
      e,
    ),
    nt.addMethod(e, "assertions", t),
    nt.addMethod(e, "hasAssertions", r),
    e.extend($f),
    e
  );
}
var Ch = lO();
Object.defineProperty(globalThis, ql, {
  value: Ch,
  writable: !0,
  configurable: !0,
});
var Zo = new Set();
function sO(e) {
  return Zo.add(e), () => void Zo.delete(e);
}
function uO(e) {
  let t = e ? Yu(e) : Yu();
  return cO(t);
}
function cO(e) {
  let t = cc(e),
    r = t.mockImplementation.bind(null);
  return (t.mockImplementation = (n) => cc(r(n))), t;
}
function cc(e) {
  let t = Wn(e),
    r = t.impl;
  return (
    t.willCall(function (...n) {
      return Zo.forEach((a) => a(e, n)), r == null ? void 0 : r.apply(this, n);
    }),
    e
  );
}
function dO() {
  Aa.forEach((e) => e.mockClear());
}
function fO() {
  Aa.forEach((e) => e.mockReset());
}
function pO() {
  Aa.forEach((e) => e.mockRestore());
}
var Rh = {};
Ai(Rh, {
  buildQueries: () => wt,
  configure: () => SA,
  createEvent: () => jn,
  findAllByAltText: () => Om,
  findAllByDisplayValue: () => wm,
  findAllByLabelText: () => tm,
  findAllByPlaceholderText: () => cm,
  findAllByRole: () => Fm,
  findAllByTestId: () => Wm,
  findAllByText: () => bm,
  findAllByTitle: () => Nm,
  findByAltText: () => Am,
  findByDisplayValue: () => Cm,
  findByLabelText: () => rm,
  findByPlaceholderText: () => dm,
  findByRole: () => Um,
  findByTestId: () => Km,
  findByText: () => gm,
  findByTitle: () => jm,
  fireEvent: () => on,
  getAllByAltText: () => Sm,
  getAllByDisplayValue: () => _m,
  getAllByLabelText: () => nm,
  getAllByPlaceholderText: () => sm,
  getAllByRole: () => km,
  getAllByTestId: () => Vm,
  getAllByText: () => hm,
  getAllByTitle: () => Mm,
  getByAltText: () => Pm,
  getByDisplayValue: () => Em,
  getByLabelText: () => am,
  getByPlaceholderText: () => um,
  getByRole: () => Dm,
  getByTestId: () => Gm,
  getByText: () => mm,
  getByTitle: () => $m,
  getConfig: () => Z,
  getDefaultNormalizer: () => kl,
  getElementError: () => $a,
  getMultipleElementsFoundError: () => Na,
  getNodeText: () => gn,
  getQueriesForElement: () => ui,
  getRoles: () => Kh,
  getSuggestedQuery: () => Xn,
  isInaccessible: () => Ma,
  logDOM: () => ei,
  logRoles: () => xA,
  makeFindQuery: () => Er,
  makeGetAllQuery: () => Ul,
  makeSingleQuery: () => _r,
  prettyDOM: () => nn,
  prettyFormat: () => Nl,
  queries: () => Qn,
  queryAllByAltText: () => Rm,
  queryAllByAttribute: () => Qt,
  queryAllByDisplayValue: () => ym,
  queryAllByLabelText: () => om,
  queryAllByPlaceholderText: () => im,
  queryAllByRole: () => Lm,
  queryAllByTestId: () => Hm,
  queryAllByText: () => fm,
  queryAllByTitle: () => qm,
  queryByAltText: () => Tm,
  queryByAttribute: () => Jh,
  queryByDisplayValue: () => vm,
  queryByLabelText: () => Zh,
  queryByPlaceholderText: () => lm,
  queryByRole: () => Bm,
  queryByTestId: () => zm,
  queryByText: () => pm,
  queryByTitle: () => xm,
  queryHelpers: () => VA,
  screen: () => vq,
  waitFor: () => Fl,
  waitForElementToBeRemoved: () => fq,
  within: () => ui,
  wrapAllByQueryWithSuggestion: () => Le,
  wrapSingleQueryWithSuggestion: () => $t,
});
var Nl = Fe(q1()),
  hO = Object.prototype.toString;
function mO(e) {
  return typeof e == "function" || hO.call(e) === "[object Function]";
}
function bO(e) {
  var t = Number(e);
  return isNaN(t)
    ? 0
    : t === 0 || !isFinite(t)
      ? t
      : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
}
var gO = Math.pow(2, 53) - 1;
function yO(e) {
  var t = bO(e);
  return Math.min(Math.max(t, 0), gO);
}
function Je(e, t) {
  var r = Array,
    n = Object(e);
  if (e == null)
    throw new TypeError(
      "Array.from requires an array-like object - not null or undefined",
    );
  for (
    var a = yO(n.length), o = mO(r) ? Object(new r(a)) : new Array(a), i = 0, l;
    i < a;

  )
    (l = n[i]), (o[i] = l), (i += 1);
  return (o.length = a), o;
}
function tn(e) {
  "@babel/helpers - typeof";
  return (
    (tn =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    tn(e)
  );
}
function vO(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _O(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, Th(n.key), n);
  }
}
function EO(e, t, r) {
  return (
    t && _O(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function wO(e, t, r) {
  return (
    (t = Th(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function Th(e) {
  var t = CO(e, "string");
  return tn(t) === "symbol" ? t : String(t);
}
function CO(e, t) {
  if (tn(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (tn(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var RO = (function () {
    function e() {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      vO(this, e), wO(this, "items", void 0), (this.items = t);
    }
    return (
      EO(e, [
        {
          key: "add",
          value: function (t) {
            return this.has(t) === !1 && this.items.push(t), this;
          },
        },
        {
          key: "clear",
          value: function () {
            this.items = [];
          },
        },
        {
          key: "delete",
          value: function (t) {
            var r = this.items.length;
            return (
              (this.items = this.items.filter(function (n) {
                return n !== t;
              })),
              r !== this.items.length
            );
          },
        },
        {
          key: "forEach",
          value: function (t) {
            var r = this;
            this.items.forEach(function (n) {
              t(n, n, r);
            });
          },
        },
        {
          key: "has",
          value: function (t) {
            return this.items.indexOf(t) !== -1;
          },
        },
        {
          key: "size",
          get: function () {
            return this.items.length;
          },
        },
      ]),
      e
    );
  })(),
  TO = typeof Set > "u" ? Set : RO;
function Me(e) {
  var t;
  return (t = e.localName) !== null && t !== void 0
    ? t
    : e.tagName.toLowerCase();
}
var SO = {
    article: "article",
    aside: "complementary",
    button: "button",
    datalist: "listbox",
    dd: "definition",
    details: "group",
    dialog: "dialog",
    dt: "term",
    fieldset: "group",
    figure: "figure",
    form: "form",
    footer: "contentinfo",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    header: "banner",
    hr: "separator",
    html: "document",
    legend: "legend",
    li: "listitem",
    math: "math",
    main: "main",
    menu: "list",
    nav: "navigation",
    ol: "list",
    optgroup: "group",
    option: "option",
    output: "status",
    progress: "progressbar",
    section: "region",
    summary: "button",
    table: "table",
    tbody: "rowgroup",
    textarea: "textbox",
    tfoot: "rowgroup",
    td: "cell",
    th: "columnheader",
    thead: "rowgroup",
    tr: "row",
    ul: "list",
  },
  PO = {
    caption: new Set(["aria-label", "aria-labelledby"]),
    code: new Set(["aria-label", "aria-labelledby"]),
    deletion: new Set(["aria-label", "aria-labelledby"]),
    emphasis: new Set(["aria-label", "aria-labelledby"]),
    generic: new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
    insertion: new Set(["aria-label", "aria-labelledby"]),
    paragraph: new Set(["aria-label", "aria-labelledby"]),
    presentation: new Set(["aria-label", "aria-labelledby"]),
    strong: new Set(["aria-label", "aria-labelledby"]),
    subscript: new Set(["aria-label", "aria-labelledby"]),
    superscript: new Set(["aria-label", "aria-labelledby"]),
  };
function OO(e, t) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-dropeffect",
    "aria-flowto",
    "aria-grabbed",
    "aria-hidden",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription",
  ].some(function (r) {
    var n;
    return (
      e.hasAttribute(r) && !((n = PO[t]) !== null && n !== void 0 && n.has(r))
    );
  });
}
function Sh(e, t) {
  return OO(e, t);
}
function AO(e) {
  var t = xO(e);
  if (t === null || t === "presentation") {
    var r = qO(e);
    if (t !== "presentation" || Sh(e, r || "")) return r;
  }
  return t;
}
function qO(e) {
  var t = SO[Me(e)];
  if (t !== void 0) return t;
  switch (Me(e)) {
    case "a":
    case "area":
    case "link":
      if (e.hasAttribute("href")) return "link";
      break;
    case "img":
      return e.getAttribute("alt") === "" && !Sh(e, "img")
        ? "presentation"
        : "img";
    case "input": {
      var r = e,
        n = r.type;
      switch (n) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return n;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return e.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return e.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return e.hasAttribute("multiple") || e.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function xO(e) {
  var t = e.getAttribute("role");
  if (t !== null) {
    var r = t.trim().split(" ")[0];
    if (r.length > 0) return r;
  }
  return null;
}
function he(e) {
  return e !== null && e.nodeType === e.ELEMENT_NODE;
}
function Ph(e) {
  return he(e) && Me(e) === "caption";
}
function Nn(e) {
  return he(e) && Me(e) === "input";
}
function MO(e) {
  return he(e) && Me(e) === "optgroup";
}
function $O(e) {
  return he(e) && Me(e) === "select";
}
function NO(e) {
  return he(e) && Me(e) === "table";
}
function jO(e) {
  return he(e) && Me(e) === "textarea";
}
function IO(e) {
  var t = e.ownerDocument === null ? e : e.ownerDocument,
    r = t.defaultView;
  if (r === null) throw new TypeError("no window available");
  return r;
}
function LO(e) {
  return he(e) && Me(e) === "fieldset";
}
function BO(e) {
  return he(e) && Me(e) === "legend";
}
function kO(e) {
  return he(e) && Me(e) === "slot";
}
function DO(e) {
  return he(e) && e.ownerSVGElement !== void 0;
}
function FO(e) {
  return he(e) && Me(e) === "svg";
}
function UO(e) {
  return DO(e) && Me(e) === "title";
}
function Jn(e, t) {
  if (he(e) && e.hasAttribute(t)) {
    var r = e.getAttribute(t).split(" "),
      n = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return r
      .map(function (a) {
        return n.getElementById(a);
      })
      .filter(function (a) {
        return a !== null;
      });
  }
  return [];
}
function mt(e, t) {
  return he(e) ? t.indexOf(AO(e)) !== -1 : !1;
}
function HO(e) {
  return e.trim().replace(/\s\s+/g, " ");
}
function zO(e, t) {
  if (!he(e)) return !1;
  if (e.hasAttribute("hidden") || e.getAttribute("aria-hidden") === "true")
    return !0;
  var r = t(e);
  return (
    r.getPropertyValue("display") === "none" ||
    r.getPropertyValue("visibility") === "hidden"
  );
}
function VO(e) {
  return mt(e, ["button", "combobox", "listbox", "textbox"]) || Oh(e, "range");
}
function Oh(e, t) {
  if (!he(e)) return !1;
  switch (t) {
    case "range":
      return mt(e, [
        "meter",
        "progressbar",
        "scrollbar",
        "slider",
        "spinbutton",
      ]);
    default:
      throw new TypeError(
        "No knowledge about abstract role '".concat(
          t,
          "'. This is likely a bug :(",
        ),
      );
  }
}
function dc(e, t) {
  var r = Je(e.querySelectorAll(t));
  return (
    Jn(e, "aria-owns").forEach(function (n) {
      r.push.apply(r, Je(n.querySelectorAll(t)));
    }),
    r
  );
}
function GO(e) {
  return $O(e)
    ? e.selectedOptions || dc(e, "[selected]")
    : dc(e, '[aria-selected="true"]');
}
function WO(e) {
  return mt(e, ["none", "presentation"]);
}
function KO(e) {
  return Ph(e);
}
function YO(e) {
  return mt(e, [
    "button",
    "cell",
    "checkbox",
    "columnheader",
    "gridcell",
    "heading",
    "label",
    "legend",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "row",
    "rowheader",
    "switch",
    "tab",
    "tooltip",
    "treeitem",
  ]);
}
function JO(e) {
  return !1;
}
function XO(e) {
  return Nn(e) || jO(e) ? e.value : e.textContent || "";
}
function fc(e) {
  var t = e.getPropertyValue("content");
  return /^["'].*["']$/.test(t) ? t.slice(1, -1) : "";
}
function Ah(e) {
  var t = Me(e);
  return (
    t === "button" ||
    (t === "input" && e.getAttribute("type") !== "hidden") ||
    t === "meter" ||
    t === "output" ||
    t === "progress" ||
    t === "select" ||
    t === "textarea"
  );
}
function qh(e) {
  if (Ah(e)) return e;
  var t = null;
  return (
    e.childNodes.forEach(function (r) {
      if (t === null && he(r)) {
        var n = qh(r);
        n !== null && (t = n);
      }
    }),
    t
  );
}
function QO(e) {
  if (e.control !== void 0) return e.control;
  var t = e.getAttribute("for");
  return t !== null ? e.ownerDocument.getElementById(t) : qh(e);
}
function ZO(e) {
  var t = e.labels;
  if (t === null) return t;
  if (t !== void 0) return Je(t);
  if (!Ah(e)) return null;
  var r = e.ownerDocument;
  return Je(r.querySelectorAll("label")).filter(function (n) {
    return QO(n) === e;
  });
}
function eA(e) {
  var t = e.assignedNodes();
  return t.length === 0 ? Je(e.childNodes) : t;
}
function xh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = new TO(),
    n = IO(e),
    a = t.compute,
    o = a === void 0 ? "name" : a,
    i = t.computedStyleSupportsPseudoElements,
    l = i === void 0 ? t.getComputedStyle !== void 0 : i,
    u = t.getComputedStyle,
    c = u === void 0 ? n.getComputedStyle.bind(n) : u,
    s = t.hidden,
    d = s === void 0 ? !1 : s;
  function p(b, y) {
    var R = "";
    if (he(b) && l) {
      var _ = c(b, "::before"),
        C = fc(_);
      R = "".concat(C, " ").concat(R);
    }
    var w = kO(b) ? eA(b) : Je(b.childNodes).concat(Jn(b, "aria-owns"));
    if (
      (w.forEach(function (O) {
        var M = g(O, {
            isEmbeddedInLabel: y.isEmbeddedInLabel,
            isReferenced: !1,
            recursion: !0,
          }),
          N = he(O) ? c(O).getPropertyValue("display") : "inline",
          k = N !== "inline" ? " " : "";
        R += "".concat(k).concat(M).concat(k);
      }),
      he(b) && l)
    ) {
      var v = c(b, "::after"),
        E = fc(v);
      R = "".concat(R, " ").concat(E);
    }
    return R.trim();
  }
  function f(b, y) {
    var R = b.getAttributeNode(y);
    return R !== null && !r.has(R) && R.value.trim() !== ""
      ? (r.add(R), R.value)
      : null;
  }
  function h(b) {
    return he(b) ? f(b, "title") : null;
  }
  function m(b) {
    if (!he(b)) return null;
    if (LO(b)) {
      r.add(b);
      for (var y = Je(b.childNodes), R = 0; R < y.length; R += 1) {
        var _ = y[R];
        if (BO(_))
          return g(_, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1,
          });
      }
    } else if (NO(b)) {
      r.add(b);
      for (var C = Je(b.childNodes), w = 0; w < C.length; w += 1) {
        var v = C[w];
        if (Ph(v))
          return g(v, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1,
          });
      }
    } else if (FO(b)) {
      r.add(b);
      for (var E = Je(b.childNodes), O = 0; O < E.length; O += 1) {
        var M = E[O];
        if (UO(M)) return M.textContent;
      }
      return null;
    } else if (Me(b) === "img" || Me(b) === "area") {
      var N = f(b, "alt");
      if (N !== null) return N;
    } else if (MO(b)) {
      var k = f(b, "label");
      if (k !== null) return k;
    }
    if (
      Nn(b) &&
      (b.type === "button" || b.type === "submit" || b.type === "reset")
    ) {
      var j = f(b, "value");
      if (j !== null) return j;
      if (b.type === "submit") return "Submit";
      if (b.type === "reset") return "Reset";
    }
    var I = ZO(b);
    if (I !== null && I.length !== 0)
      return (
        r.add(b),
        Je(I)
          .map(function (W) {
            return g(W, {
              isEmbeddedInLabel: !0,
              isReferenced: !1,
              recursion: !0,
            });
          })
          .filter(function (W) {
            return W.length > 0;
          })
          .join(" ")
      );
    if (Nn(b) && b.type === "image") {
      var B = f(b, "alt");
      if (B !== null) return B;
      var z = f(b, "title");
      return z !== null ? z : "Submit Query";
    }
    if (mt(b, ["button"])) {
      var K = p(b, { isEmbeddedInLabel: !1, isReferenced: !1 });
      if (K !== "") return K;
    }
    return null;
  }
  function g(b, y) {
    if (r.has(b)) return "";
    if (!d && zO(b, c) && !y.isReferenced) return r.add(b), "";
    var R = he(b) ? b.getAttributeNode("aria-labelledby") : null,
      _ = R !== null && !r.has(R) ? Jn(b, "aria-labelledby") : [];
    if (o === "name" && !y.isReferenced && _.length > 0)
      return (
        r.add(R),
        _.map(function (N) {
          return g(N, {
            isEmbeddedInLabel: y.isEmbeddedInLabel,
            isReferenced: !0,
            recursion: !1,
          });
        }).join(" ")
      );
    var C = y.recursion && VO(b) && o === "name";
    if (!C) {
      var w = ((he(b) && b.getAttribute("aria-label")) || "").trim();
      if (w !== "" && o === "name") return r.add(b), w;
      if (!WO(b)) {
        var v = m(b);
        if (v !== null) return r.add(b), v;
      }
    }
    if (mt(b, ["menu"])) return r.add(b), "";
    if (C || y.isEmbeddedInLabel || y.isReferenced) {
      if (mt(b, ["combobox", "listbox"])) {
        r.add(b);
        var E = GO(b);
        return E.length === 0
          ? Nn(b)
            ? b.value
            : ""
          : Je(E)
              .map(function (N) {
                return g(N, {
                  isEmbeddedInLabel: y.isEmbeddedInLabel,
                  isReferenced: !1,
                  recursion: !0,
                });
              })
              .join(" ");
      }
      if (Oh(b, "range"))
        return (
          r.add(b),
          b.hasAttribute("aria-valuetext")
            ? b.getAttribute("aria-valuetext")
            : b.hasAttribute("aria-valuenow")
              ? b.getAttribute("aria-valuenow")
              : b.getAttribute("value") || ""
        );
      if (mt(b, ["textbox"])) return r.add(b), XO(b);
    }
    if (YO(b) || (he(b) && y.isReferenced) || KO(b) || JO()) {
      var O = p(b, {
        isEmbeddedInLabel: y.isEmbeddedInLabel,
        isReferenced: !1,
      });
      if (O !== "") return r.add(b), O;
    }
    if (b.nodeType === b.TEXT_NODE) return r.add(b), b.textContent || "";
    if (y.recursion)
      return (
        r.add(b),
        p(b, { isEmbeddedInLabel: y.isEmbeddedInLabel, isReferenced: !1 })
      );
    var M = h(b);
    return M !== null ? (r.add(b), M) : (r.add(b), "");
  }
  return HO(
    g(e, {
      isEmbeddedInLabel: !1,
      isReferenced: o === "description",
      recursion: !1,
    }),
  );
}
function rn(e) {
  "@babel/helpers - typeof";
  return (
    (rn =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    rn(e)
  );
}
function pc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (a) {
        return Object.getOwnPropertyDescriptor(e, a).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function hc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? pc(Object(r), !0).forEach(function (n) {
          tA(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : pc(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function tA(e, t, r) {
  return (
    (t = rA(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function rA(e) {
  var t = nA(e, "string");
  return rn(t) === "symbol" ? t : String(t);
}
function nA(e, t) {
  if (rn(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (rn(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Mh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = Jn(e, "aria-describedby")
      .map(function (a) {
        return xh(a, hc(hc({}, t), {}, { compute: "description" }));
      })
      .join(" ");
  if (r === "") {
    var n = e.getAttribute("title");
    r = n === null ? "" : n;
  }
  return r;
}
function aA(e) {
  return mt(e, [
    "caption",
    "code",
    "deletion",
    "emphasis",
    "generic",
    "insertion",
    "paragraph",
    "presentation",
    "strong",
    "subscript",
    "superscript",
  ]);
}
function jl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return aA(e) ? "" : xh(e, t);
}
var He = Fe(xi()),
  oA = Fe(x1());
function $h(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var iA = (e, t, r, n, a, o, i) => {
    let l = n + r.indent,
      u = r.colors;
    return e
      .map((c) => {
        let s = t[c],
          d = i(s, r, l, a, o);
        return (
          typeof s != "string" &&
            (d.indexOf(`
`) !== -1 && (d = r.spacingOuter + l + d + r.spacingOuter + n),
            (d = "{" + d + "}")),
          r.spacingInner +
            n +
            u.prop.open +
            c +
            u.prop.close +
            "=" +
            u.value.open +
            d +
            u.value.close
        );
      })
      .join("");
  },
  lA = 3,
  sA = (e, t, r, n, a, o) =>
    e
      .map((i) => {
        let l = typeof i == "string" ? Nh(i, t) : o(i, t, r, n, a);
        return l === "" &&
          typeof i == "object" &&
          i !== null &&
          i.nodeType !== lA
          ? ""
          : t.spacingOuter + r + l;
      })
      .join(""),
  Nh = (e, t) => {
    let r = t.colors.content;
    return r.open + $h(e) + r.close;
  },
  uA = (e, t) => {
    let r = t.colors.comment;
    return r.open + "<!--" + $h(e) + "-->" + r.close;
  },
  cA = (e, t, r, n, a) => {
    let o = n.colors.tag;
    return (
      o.open +
      "<" +
      e +
      (t && o.close + t + n.spacingOuter + a + o.open) +
      (r
        ? ">" + o.close + r + n.spacingOuter + a + o.open + "</" + e
        : (t && !n.min ? "" : " ") + "/") +
      ">" +
      o.close
    );
  },
  dA = (e, t) => {
    let r = t.colors.tag;
    return r.open + "<" + e + r.close + " …" + r.open + " />" + r.close;
  },
  fA = 1,
  jh = 3,
  Ih = 8,
  Lh = 11,
  pA = /^((HTML|SVG)\w*)?Element$/,
  Bh = (e) => {
    let { tagName: t } = e;
    return !!(
      (typeof t == "string" && t.includes("-")) ||
      (typeof e.hasAttribute == "function" && e.hasAttribute("is"))
    );
  },
  hA = (e) => {
    let t = e.constructor.name,
      { nodeType: r } = e;
    return (
      (r === fA && (pA.test(t) || Bh(e))) ||
      (r === jh && t === "Text") ||
      (r === Ih && t === "Comment") ||
      (r === Lh && t === "DocumentFragment")
    );
  };
function mA(e) {
  return e.nodeType === jh;
}
function bA(e) {
  return e.nodeType === Ih;
}
function oo(e) {
  return e.nodeType === Lh;
}
function gA(e) {
  return {
    test: (t) => {
      var r;
      return (
        ((t == null || (r = t.constructor) == null ? void 0 : r.name) ||
          Bh(t)) &&
        hA(t)
      );
    },
    serialize: (t, r, n, a, o, i) => {
      if (mA(t)) return Nh(t.data, r);
      if (bA(t)) return uA(t.data, r);
      let l = oo(t) ? "DocumentFragment" : t.tagName.toLowerCase();
      return ++a > r.maxDepth
        ? dA(l, r)
        : cA(
            l,
            iA(
              oo(t)
                ? []
                : Array.from(t.attributes)
                    .map((u) => u.name)
                    .sort(),
              oo(t)
                ? {}
                : Array.from(t.attributes).reduce(
                    (u, c) => ((u[c.name] = c.value), u),
                    {},
                  ),
              r,
              n + r.indent,
              a,
              o,
              i,
            ),
            sA(
              Array.prototype.slice.call(t.childNodes || t.children).filter(e),
              r,
              n + r.indent,
              a,
              o,
              i,
            ),
            r,
            n,
          );
    },
  };
}
var kh = null,
  Il = null,
  Ll = null;
try {
  let e = module && module.require;
  (Il = e.call(module, "fs").readFileSync),
    (Ll = e.call(module, "@babel/code-frame").codeFrameColumns),
    (kh = e.call(module, "chalk"));
} catch {}
function yA(e) {
  let t = e.indexOf("(") + 1,
    r = e.indexOf(")"),
    n = e.slice(t, r),
    a = n.split(":"),
    [o, i, l] = [a[0], parseInt(a[1], 10), parseInt(a[2], 10)],
    u = "";
  try {
    u = Il(o, "utf-8");
  } catch {
    return "";
  }
  let c = Ll(
    u,
    { start: { line: i, column: l } },
    { highlightCode: !0, linesBelow: 0 },
  );
  return (
    kh.dim(n) +
    `
` +
    c +
    `
`
  );
}
function vA() {
  if (!Il || !Ll) return "";
  let e = new Error().stack
    .split(
      `
`,
    )
    .slice(1)
    .find((t) => !t.includes("node_modules/"));
  return yA(e);
}
var Dh = 3;
function io() {
  return typeof jest < "u" && jest !== null
    ? setTimeout._isMockFunction === !0 ||
        Object.prototype.hasOwnProperty.call(setTimeout, "clock")
    : !1;
}
function Bl() {
  if (typeof window > "u") throw new Error("Could not find default container");
  return window.document;
}
function Fh(e) {
  if (e.defaultView) return e.defaultView;
  if (e.ownerDocument && e.ownerDocument.defaultView)
    return e.ownerDocument.defaultView;
  if (e.window) return e.window;
  throw e.ownerDocument && e.ownerDocument.defaultView === null
    ? new Error(
        "It looks like the window object is not available for the provided node.",
      )
    : e.then instanceof Function
      ? new Error(
          "It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?",
        )
      : Array.isArray(e)
        ? new Error(
            "It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?",
          )
        : typeof e.debug == "function" &&
            typeof e.logTestingPlaygroundURL == "function"
          ? new Error(
              "It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?",
            )
          : new Error(
              "The given node is not an Element, the node type is: " +
                typeof e +
                ".",
            );
}
function Et(e) {
  if (
    !e ||
    typeof e.querySelector != "function" ||
    typeof e.querySelectorAll != "function"
  )
    throw new TypeError(
      "Expected container to be an Element, a Document or a DocumentFragment but got " +
        t(e) +
        ".",
    );
  function t(r) {
    return typeof r == "object"
      ? r === null
        ? "null"
        : r.constructor.name
      : typeof r;
  }
}
var _A = () => {
    if (typeof process > "u") return !1;
    let e;
    try {
      var t;
      let r = (t = vo) == null ? void 0 : t.COLORS;
      r && (e = JSON.parse(r));
    } catch {}
    return typeof e == "boolean"
      ? e
      : process.versions !== void 0 && process.versions.node !== void 0;
  },
  { DOMCollection: EA } = Nl.plugins,
  wA = 1,
  CA = 8;
function RA(e) {
  return (
    e.nodeType !== CA && (e.nodeType !== wA || !e.matches(Z().defaultIgnore))
  );
}
function nn(e, t, r) {
  if (
    (r === void 0 && (r = {}),
    e || (e = Bl().body),
    typeof t != "number" &&
      (t =
        (typeof process < "u" && typeof vo < "u" && vo.DEBUG_PRINT_LIMIT) ||
        7e3),
    t === 0)
  )
    return "";
  e.documentElement && (e = e.documentElement);
  let n = typeof e;
  if (
    (n === "object" ? (n = e.constructor.name) : (e = {}), !("outerHTML" in e))
  )
    throw new TypeError("Expected an element or document but got " + n);
  let { filterNode: a = RA, ...o } = r,
    i = Nl.format(e, {
      plugins: [gA(a), EA],
      printFunctionName: !1,
      highlight: _A(),
      ...o,
    });
  return t !== void 0 && e.outerHTML.length > t ? i.slice(0, t) + "..." : i;
}
var ei = function () {
    let e = vA();
    console.log(
      e
        ? nn(...arguments) +
            `

` +
            e
        : nn(...arguments),
    );
  },
  zt = {
    testIdAttribute: "data-testid",
    asyncUtilTimeout: 1e3,
    asyncWrapper: (e) => e(),
    unstable_advanceTimersWrapper: (e) => e(),
    eventWrapper: (e) => e(),
    defaultHidden: !1,
    defaultIgnore: "script, style",
    showOriginalStackTrace: !1,
    throwSuggestions: !1,
    getElementError(e, t) {
      let r = nn(t),
        n = new Error(
          [
            e,
            "Ignored nodes: comments, " +
              zt.defaultIgnore +
              `
` +
              r,
          ].filter(Boolean).join(`

`),
        );
      return (n.name = "TestingLibraryElementError"), n;
    },
    _disableExpensiveErrorDiagnostics: !1,
    computedStyleSupportsPseudoElements: !1,
  };
function TA(e) {
  try {
    return (zt._disableExpensiveErrorDiagnostics = !0), e();
  } finally {
    zt._disableExpensiveErrorDiagnostics = !1;
  }
}
function SA(e) {
  typeof e == "function" && (e = e(zt)), (zt = { ...zt, ...e });
}
function Z() {
  return zt;
}
var PA = [
  "button",
  "meter",
  "output",
  "progress",
  "select",
  "textarea",
  "input",
];
function Uh(e) {
  return PA.includes(e.nodeName.toLowerCase())
    ? ""
    : e.nodeType === Dh
      ? e.textContent
      : Array.from(e.childNodes)
          .map((t) => Uh(t))
          .join("");
}
function ti(e) {
  let t;
  return (
    e.tagName.toLowerCase() === "label"
      ? (t = Uh(e))
      : (t = e.value || e.textContent),
    t
  );
}
function Hh(e) {
  if (e.labels !== void 0) {
    var t;
    return (t = e.labels) != null ? t : [];
  }
  if (!OA(e)) return [];
  let r = e.ownerDocument.querySelectorAll("label");
  return Array.from(r).filter((n) => n.control === e);
}
function OA(e) {
  return (
    /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(e.tagName) ||
    (e.tagName === "INPUT" && e.getAttribute("type") !== "hidden")
  );
}
function zh(e, t, r) {
  let { selector: n = "*" } = r === void 0 ? {} : r,
    a = t.getAttribute("aria-labelledby"),
    o = a ? a.split(" ") : [];
  return o.length
    ? o.map((i) => {
        let l = e.querySelector('[id="' + i + '"]');
        return l
          ? { content: ti(l), formControl: null }
          : { content: "", formControl: null };
      })
    : Array.from(Hh(t)).map((i) => {
        let l = ti(i),
          u = Array.from(
            i.querySelectorAll(
              "button, input, meter, output, progress, select, textarea",
            ),
          ).filter((c) => c.matches(n))[0];
        return { content: l, formControl: u };
      });
}
function Vh(e) {
  if (e == null)
    throw new Error(
      "It looks like " +
        e +
        " was passed instead of a matcher. Did you do something like getByText(" +
        e +
        ")?",
    );
}
function qr(e, t, r, n) {
  if (typeof e != "string") return !1;
  Vh(r);
  let a = n(e);
  return typeof r == "string" || typeof r == "number"
    ? a.toLowerCase().includes(r.toString().toLowerCase())
    : typeof r == "function"
      ? r(a, t)
      : Gh(r, a);
}
function gt(e, t, r, n) {
  if (typeof e != "string") return !1;
  Vh(r);
  let a = n(e);
  return r instanceof Function
    ? r(a, t)
    : r instanceof RegExp
      ? Gh(r, a)
      : a === String(r);
}
function kl(e) {
  let { trim: t = !0, collapseWhitespace: r = !0 } = e === void 0 ? {} : e;
  return (n) => {
    let a = n;
    return (a = t ? a.trim() : a), (a = r ? a.replace(/\s+/g, " ") : a), a;
  };
}
function Xt(e) {
  let { trim: t, collapseWhitespace: r, normalizer: n } = e;
  if (!n) return kl({ trim: t, collapseWhitespace: r });
  if (typeof t < "u" || typeof r < "u")
    throw new Error(
      'trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer',
    );
  return n;
}
function Gh(e, t) {
  let r = e.test(t);
  return (
    e.global &&
      e.lastIndex !== 0 &&
      (console.warn(
        "To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.",
      ),
      (e.lastIndex = 0)),
    r
  );
}
function gn(e) {
  return e.matches("input[type=submit], input[type=button], input[type=reset]")
    ? e.value
    : Array.from(e.childNodes)
        .filter((t) => t.nodeType === Dh && !!t.textContent)
        .map((t) => t.textContent)
        .join("");
}
var AA = qA(He.elementRoles);
function Wh(e) {
  return (
    e.hidden === !0 ||
    e.getAttribute("aria-hidden") === "true" ||
    e.ownerDocument.defaultView.getComputedStyle(e).display === "none"
  );
}
function Ma(e, t) {
  t === void 0 && (t = {});
  let { isSubtreeInaccessible: r = Wh } = t;
  if (e.ownerDocument.defaultView.getComputedStyle(e).visibility === "hidden")
    return !0;
  let n = e;
  for (; n; ) {
    if (r(n)) return !0;
    n = n.parentElement;
  }
  return !1;
}
function Dl(e) {
  for (let { match: t, roles: r } of AA) if (t(e)) return [...r];
  return [];
}
function qA(e) {
  function t(i) {
    let { name: l, attributes: u } = i;
    return (
      "" +
      l +
      u
        .map((c) => {
          let { name: s, value: d, constraints: p = [] } = c,
            f = p.indexOf("undefined") !== -1,
            h = p.indexOf("set") !== -1;
          return typeof d < "u"
            ? "[" + s + '="' + d + '"]'
            : f
              ? ":not([" + s + "])"
              : h
                ? "[" + s + "]:not([" + s + '=""])'
                : "[" + s + "]";
        })
        .join("")
    );
  }
  function r(i) {
    let { attributes: l = [] } = i;
    return l.length;
  }
  function n(i, l) {
    let { specificity: u } = i,
      { specificity: c } = l;
    return c - u;
  }
  function a(i) {
    let { attributes: l = [] } = i,
      u = l.findIndex(
        (s) => s.value && s.name === "type" && s.value === "text",
      );
    u >= 0 && (l = [...l.slice(0, u), ...l.slice(u + 1)]);
    let c = t({ ...i, attributes: l });
    return (s) => (u >= 0 && s.type !== "text" ? !1 : s.matches(c));
  }
  let o = [];
  for (let [i, l] of e.entries())
    o = [...o, { match: a(i), roles: Array.from(l), specificity: r(i) }];
  return o.sort(n);
}
function Kh(e, t) {
  let { hidden: r = !1 } = t === void 0 ? {} : t;
  function n(a) {
    return [a, ...Array.from(a.children).reduce((o, i) => [...o, ...n(i)], [])];
  }
  return n(e)
    .filter((a) => (r === !1 ? Ma(a) === !1 : !0))
    .reduce((a, o) => {
      let i = [];
      return (
        o.hasAttribute("role")
          ? (i = o.getAttribute("role").split(" ").slice(0, 1))
          : (i = Dl(o)),
        i.reduce(
          (l, u) =>
            Array.isArray(l[u])
              ? { ...l, [u]: [...l[u], o] }
              : { ...l, [u]: [o] },
          a,
        )
      );
    }, {});
}
function Yh(e, t) {
  let { hidden: r, includeDescription: n } = t,
    a = Kh(e, { hidden: r });
  return Object.entries(a)
    .filter((o) => {
      let [i] = o;
      return i !== "generic";
    })
    .map((o) => {
      let [i, l] = o,
        u = "-".repeat(50),
        c = l.map((s) => {
          let d =
              'Name "' +
              jl(s, {
                computedStyleSupportsPseudoElements:
                  Z().computedStyleSupportsPseudoElements,
              }) +
              `":
`,
            p = nn(s.cloneNode(!1));
          if (n) {
            let f =
              'Description "' +
              Mh(s, {
                computedStyleSupportsPseudoElements:
                  Z().computedStyleSupportsPseudoElements,
              }) +
              `":
`;
            return "" + d + f + p;
          }
          return "" + d + p;
        }).join(`

`);
      return (
        i +
        `:

` +
        c +
        `

` +
        u
      );
    }).join(`
`);
}
var xA = function (e, t) {
  let { hidden: r = !1 } = t === void 0 ? {} : t;
  return console.log(Yh(e, { hidden: r }));
};
function MA(e) {
  return e.tagName === "OPTION" ? e.selected : yn(e, "aria-selected");
}
function $A(e) {
  return e.getAttribute("aria-busy") === "true";
}
function NA(e) {
  if (!("indeterminate" in e && e.indeterminate))
    return "checked" in e ? e.checked : yn(e, "aria-checked");
}
function jA(e) {
  return yn(e, "aria-pressed");
}
function IA(e) {
  var t, r;
  return (t =
    (r = yn(e, "aria-current")) != null ? r : e.getAttribute("aria-current")) !=
    null
    ? t
    : !1;
}
function LA(e) {
  return yn(e, "aria-expanded");
}
function yn(e, t) {
  let r = e.getAttribute(t);
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function BA(e) {
  let t = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
  return (
    (e.getAttribute("aria-level") && Number(e.getAttribute("aria-level"))) ||
    t[e.tagName]
  );
}
function kA(e) {
  let t = e.getAttribute("aria-valuenow");
  return t === null ? void 0 : +t;
}
function DA(e) {
  let t = e.getAttribute("aria-valuemax");
  return t === null ? void 0 : +t;
}
function FA(e) {
  let t = e.getAttribute("aria-valuemin");
  return t === null ? void 0 : +t;
}
function UA(e) {
  let t = e.getAttribute("aria-valuetext");
  return t === null ? void 0 : t;
}
var mc = kl();
function HA(e) {
  return e.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function bc(e) {
  return new RegExp(HA(e.toLowerCase()), "i");
}
function Ct(e, t, r, n) {
  let { variant: a, name: o } = n,
    i = "",
    l = {},
    u = [["Role", "TestId"].includes(e) ? r : bc(r)];
  o && (l.name = bc(o)),
    e === "Role" &&
      Ma(t) &&
      ((l.hidden = !0),
      (i = `Element is inaccessible. This means that the element and all its children are invisible to screen readers.
    If you are using the aria-hidden prop, make sure this is the right choice for your case.
    `)),
    Object.keys(l).length > 0 && u.push(l);
  let c = a + "By" + e;
  return {
    queryName: e,
    queryMethod: c,
    queryArgs: u,
    variant: a,
    warning: i,
    toString() {
      i && console.warn(i);
      let [s, d] = u;
      return (
        (s = typeof s == "string" ? "'" + s + "'" : s),
        (d = d
          ? ", { " +
            Object.entries(d)
              .map((p) => {
                let [f, h] = p;
                return f + ": " + h;
              })
              .join(", ") +
            " }"
          : ""),
        c + "(" + s + d + ")"
      );
    },
  };
}
function Rt(e, t, r) {
  return r && (!t || t.toLowerCase() === e.toLowerCase());
}
function Xn(e, t, r) {
  var n, a;
  if ((t === void 0 && (t = "get"), e.matches(Z().defaultIgnore))) return;
  let o =
    (n = e.getAttribute("role")) != null
      ? n
      : (a = Dl(e)) == null
        ? void 0
        : a[0];
  if (o !== "generic" && Rt("Role", r, o))
    return Ct("Role", e, o, {
      variant: t,
      name: jl(e, {
        computedStyleSupportsPseudoElements:
          Z().computedStyleSupportsPseudoElements,
      }),
    });
  let i = zh(document, e)
    .map((p) => p.content)
    .join(" ");
  if (Rt("LabelText", r, i)) return Ct("LabelText", e, i, { variant: t });
  let l = e.getAttribute("placeholder");
  if (Rt("PlaceholderText", r, l))
    return Ct("PlaceholderText", e, l, { variant: t });
  let u = mc(gn(e));
  if (Rt("Text", r, u)) return Ct("Text", e, u, { variant: t });
  if (Rt("DisplayValue", r, e.value))
    return Ct("DisplayValue", e, mc(e.value), { variant: t });
  let c = e.getAttribute("alt");
  if (Rt("AltText", r, c)) return Ct("AltText", e, c, { variant: t });
  let s = e.getAttribute("title");
  if (Rt("Title", r, s)) return Ct("Title", e, s, { variant: t });
  let d = e.getAttribute(Z().testIdAttribute);
  if (Rt("TestId", r, d)) return Ct("TestId", e, d, { variant: t });
}
function Cn(e, t) {
  e.stack = t.stack.replace(t.message, e.message);
}
function zA(e, t) {
  let {
    container: r = Bl(),
    timeout: n = Z().asyncUtilTimeout,
    showOriginalStackTrace: a = Z().showOriginalStackTrace,
    stackTraceError: o,
    interval: i = 50,
    onTimeout: l = (c) => (
      Object.defineProperty(c, "message", {
        value: Z().getElementError(c.message, r).message,
      }),
      c
    ),
    mutationObserverOptions: u = {
      subtree: !0,
      childList: !0,
      attributes: !0,
      characterData: !0,
    },
  } = t;
  if (typeof e != "function")
    throw new TypeError("Received `callback` arg must be a function");
  return new Promise(async (c, s) => {
    let d,
      p,
      f,
      h = !1,
      m = "idle",
      g = setTimeout(C, n),
      b = io();
    if (b) {
      let { unstable_advanceTimersWrapper: w } = Z();
      for (_(); !h; ) {
        if (!io()) {
          let v = new Error(
            "Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830",
          );
          a || Cn(v, o), s(v);
          return;
        }
        if (
          (await w(async () => {
            jest.advanceTimersByTime(i);
          }),
          h)
        )
          break;
        _();
      }
    } else {
      try {
        Et(r);
      } catch (v) {
        s(v);
        return;
      }
      p = setInterval(R, i);
      let { MutationObserver: w } = Fh(r);
      (f = new w(R)), f.observe(r, u), _();
    }
    function y(w, v) {
      (h = !0),
        clearTimeout(g),
        b || (clearInterval(p), f.disconnect()),
        w ? s(w) : c(v);
    }
    function R() {
      if (io()) {
        let w = new Error(
          "Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830",
        );
        return a || Cn(w, o), s(w);
      } else return _();
    }
    function _() {
      if (m !== "pending")
        try {
          let w = TA(e);
          typeof (w == null ? void 0 : w.then) == "function"
            ? ((m = "pending"),
              w.then(
                (v) => {
                  (m = "resolved"), y(null, v);
                },
                (v) => {
                  (m = "rejected"), (d = v);
                },
              ))
            : y(null, w);
        } catch (w) {
          d = w;
        }
    }
    function C() {
      let w;
      d
        ? ((w = d), !a && w.name === "TestingLibraryElementError" && Cn(w, o))
        : ((w = new Error("Timed out in waitFor.")), a || Cn(w, o)),
        y(l(w), null);
    }
  });
}
function Fl(e, t) {
  let r = new Error("STACK_TRACE_MESSAGE");
  return Z().asyncWrapper(() => zA(e, { stackTraceError: r, ...t }));
}
function $a(e, t) {
  return Z().getElementError(e, t);
}
function Na(e, t) {
  return $a(
    e +
      "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).",
    t,
  );
}
function Qt(e, t, r, n) {
  let {
      exact: a = !0,
      collapseWhitespace: o,
      trim: i,
      normalizer: l,
    } = n === void 0 ? {} : n,
    u = a ? gt : qr,
    c = Xt({ collapseWhitespace: o, trim: i, normalizer: l });
  return Array.from(t.querySelectorAll("[" + e + "]")).filter((s) =>
    u(s.getAttribute(e), s, r, c),
  );
}
function Jh(e, t, r, n) {
  let a = Qt(e, t, r, n);
  if (a.length > 1)
    throw Na("Found multiple elements by [" + e + "=" + r + "]", t);
  return a[0] || null;
}
function _r(e, t) {
  return function (r) {
    for (
      var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      a[o - 1] = arguments[o];
    let i = e(r, ...a);
    if (i.length > 1) {
      let l = i.map((u) => $a(null, u).message).join(`

`);
      throw Na(
        t(r, ...a) +
          `

Here are the matching elements:

` +
          l,
        r,
      );
    }
    return i[0] || null;
  };
}
function Xh(e, t) {
  return Z().getElementError(
    `A better query is available, try this:
` +
      e.toString() +
      `
`,
    t,
  );
}
function Ul(e, t) {
  return function (r) {
    for (
      var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      a[o - 1] = arguments[o];
    let i = e(r, ...a);
    if (!i.length) throw Z().getElementError(t(r, ...a), r);
    return i;
  };
}
function Er(e) {
  return (t, r, n, a) => Fl(() => e(t, r, n), { container: t, ...a });
}
var $t = (e, t, r) =>
    function (n) {
      for (
        var a = arguments.length, o = new Array(a > 1 ? a - 1 : 0), i = 1;
        i < a;
        i++
      )
        o[i - 1] = arguments[i];
      let l = e(n, ...o),
        [{ suggest: u = Z().throwSuggestions } = {}] = o.slice(-1);
      if (l && u) {
        let c = Xn(l, r);
        if (c && !t.endsWith(c.queryName)) throw Xh(c.toString(), n);
      }
      return l;
    },
  Le = (e, t, r) =>
    function (n) {
      for (
        var a = arguments.length, o = new Array(a > 1 ? a - 1 : 0), i = 1;
        i < a;
        i++
      )
        o[i - 1] = arguments[i];
      let l = e(n, ...o),
        [{ suggest: u = Z().throwSuggestions } = {}] = o.slice(-1);
      if (l.length && u) {
        let c = [
          ...new Set(
            l.map((s) => {
              var d;
              return (d = Xn(s, r)) == null ? void 0 : d.toString();
            }),
          ),
        ];
        if (c.length === 1 && !t.endsWith(Xn(l[0], r).queryName))
          throw Xh(c[0], n);
      }
      return l;
    };
function wt(e, t, r) {
  let n = $t(_r(e, t), e.name, "query"),
    a = Ul(e, r),
    o = _r(a, t),
    i = $t(o, e.name, "get"),
    l = Le(a, e.name.replace("query", "get"), "getAll"),
    u = Er(Le(a, e.name, "findAll")),
    c = Er($t(o, e.name, "find"));
  return [n, l, i, u, c];
}
var VA = Object.freeze({
  __proto__: null,
  getElementError: $a,
  wrapAllByQueryWithSuggestion: Le,
  wrapSingleQueryWithSuggestion: $t,
  getMultipleElementsFoundError: Na,
  queryAllByAttribute: Qt,
  queryByAttribute: Jh,
  makeSingleQuery: _r,
  makeGetAllQuery: Ul,
  makeFindQuery: Er,
  buildQueries: wt,
});
function GA(e) {
  return Array.from(e.querySelectorAll("label,input"))
    .map((t) => ({ node: t, textToMatch: ti(t) }))
    .filter((t) => {
      let { textToMatch: r } = t;
      return r !== null;
    });
}
var WA = function (e, t, r) {
    let {
        exact: n = !0,
        trim: a,
        collapseWhitespace: o,
        normalizer: i,
      } = r === void 0 ? {} : r,
      l = n ? gt : qr,
      u = Xt({ collapseWhitespace: o, trim: a, normalizer: i });
    return GA(e)
      .filter((c) => {
        let { node: s, textToMatch: d } = c;
        return l(d, s, t, u);
      })
      .map((c) => {
        let { node: s } = c;
        return s;
      });
  },
  an = function (e, t, r) {
    let {
      selector: n = "*",
      exact: a = !0,
      collapseWhitespace: o,
      trim: i,
      normalizer: l,
    } = r === void 0 ? {} : r;
    Et(e);
    let u = a ? gt : qr,
      c = Xt({ collapseWhitespace: o, trim: i, normalizer: l }),
      s = Array.from(e.querySelectorAll("*"))
        .filter((d) => Hh(d).length || d.hasAttribute("aria-labelledby"))
        .reduce((d, p) => {
          let f = zh(e, p, { selector: n });
          f.filter((m) => !!m.formControl).forEach((m) => {
            u(m.content, m.formControl, t, c) &&
              m.formControl &&
              d.push(m.formControl);
          });
          let h = f.filter((m) => !!m.content).map((m) => m.content);
          return (
            u(h.join(" "), p, t, c) && d.push(p),
            h.length > 1 &&
              h.forEach((m, g) => {
                u(m, p, t, c) && d.push(p);
                let b = [...h];
                b.splice(g, 1),
                  b.length > 1 && u(b.join(" "), p, t, c) && d.push(p);
              }),
            d
          );
        }, [])
        .concat(Qt("aria-label", e, t, { exact: a, normalizer: c }));
    return Array.from(new Set(s)).filter((d) => d.matches(n));
  },
  Gt = function (e, t) {
    for (
      var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), a = 2;
      a < r;
      a++
    )
      n[a - 2] = arguments[a];
    let o = an(e, t, ...n);
    if (!o.length) {
      let i = WA(e, t, ...n);
      if (i.length) {
        let l = i.map((u) => KA(e, u)).filter((u) => !!u);
        throw l.length
          ? Z().getElementError(
              l.map(
                (u) =>
                  "Found a label with the text of: " +
                  t +
                  ", however the element associated with this label (<" +
                  u +
                  " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" +
                  u +
                  " />, you can use aria-label or aria-labelledby instead.",
              ).join(`

`),
              e,
            )
          : Z().getElementError(
              "Found a label with the text of: " +
                t +
                `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`,
              e,
            );
      } else
        throw Z().getElementError(
          "Unable to find a label with the text of: " + t,
          e,
        );
    }
    return o;
  };
function KA(e, t) {
  let r = t.getAttribute("for");
  if (!r) return null;
  let n = e.querySelector('[id="' + r + '"]');
  return n ? n.tagName.toLowerCase() : null;
}
var Qh = (e, t) => "Found multiple elements with the text of: " + t,
  Zh = $t(_r(an, Qh), an.name, "query"),
  em = _r(Gt, Qh),
  tm = Er(Le(Gt, Gt.name, "findAll")),
  rm = Er($t(em, Gt.name, "find")),
  nm = Le(Gt, Gt.name, "getAll"),
  am = $t(em, Gt.name, "get"),
  om = Le(an, an.name, "queryAll"),
  ri = function () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return Et(t[0]), Qt("placeholder", ...t);
  },
  YA = (e, t) => "Found multiple elements with the placeholder text of: " + t,
  JA = (e, t) => "Unable to find an element with the placeholder text of: " + t,
  im = Le(ri, ri.name, "queryAll"),
  [lm, sm, um, cm, dm] = wt(ri, YA, JA),
  ni = function (e, t, r) {
    let {
      selector: n = "*",
      exact: a = !0,
      collapseWhitespace: o,
      trim: i,
      ignore: l = Z().defaultIgnore,
      normalizer: u,
    } = r === void 0 ? {} : r;
    Et(e);
    let c = a ? gt : qr,
      s = Xt({ collapseWhitespace: o, trim: i, normalizer: u }),
      d = [];
    return (
      typeof e.matches == "function" && e.matches(n) && (d = [e]),
      [...d, ...Array.from(e.querySelectorAll(n))]
        .filter((p) => !l || !p.matches(l))
        .filter((p) => c(gn(p), p, t, s))
    );
  },
  XA = (e, t) => "Found multiple elements with the text: " + t,
  QA = function (e, t, r) {
    r === void 0 && (r = {});
    let { collapseWhitespace: n, trim: a, normalizer: o, selector: i } = r,
      l = Xt({ collapseWhitespace: n, trim: a, normalizer: o })(t.toString()),
      u = l !== t.toString(),
      c = (i ?? "*") !== "*";
    return (
      "Unable to find an element with the text: " +
      (u ? l + " (normalized from '" + t + "')" : t) +
      (c ? ", which matches selector '" + i + "'" : "") +
      ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible."
    );
  },
  fm = Le(ni, ni.name, "queryAll"),
  [pm, hm, mm, bm, gm] = wt(ni, XA, QA),
  ai = function (e, t, r) {
    let {
      exact: n = !0,
      collapseWhitespace: a,
      trim: o,
      normalizer: i,
    } = r === void 0 ? {} : r;
    Et(e);
    let l = n ? gt : qr,
      u = Xt({ collapseWhitespace: a, trim: o, normalizer: i });
    return Array.from(e.querySelectorAll("input,textarea,select")).filter(
      (c) =>
        c.tagName === "SELECT"
          ? Array.from(c.options)
              .filter((s) => s.selected)
              .some((s) => l(gn(s), s, t, u))
          : l(c.value, c, t, u),
    );
  },
  ZA = (e, t) => "Found multiple elements with the display value: " + t + ".",
  eq = (e, t) => "Unable to find an element with the display value: " + t + ".",
  ym = Le(ai, ai.name, "queryAll"),
  [vm, _m, Em, wm, Cm] = wt(ai, ZA, eq),
  tq = /^(img|input|area|.+-.+)$/i,
  oi = function (e, t, r) {
    return (
      r === void 0 && (r = {}),
      Et(e),
      Qt("alt", e, t, r).filter((n) => tq.test(n.tagName))
    );
  },
  rq = (e, t) => "Found multiple elements with the alt text: " + t,
  nq = (e, t) => "Unable to find an element with the alt text: " + t,
  Rm = Le(oi, oi.name, "queryAll"),
  [Tm, Sm, Pm, Om, Am] = wt(oi, rq, nq),
  aq = (e) => {
    var t;
    return (
      e.tagName.toLowerCase() === "title" &&
      ((t = e.parentElement) == null ? void 0 : t.tagName.toLowerCase()) ===
        "svg"
    );
  },
  ii = function (e, t, r) {
    let {
      exact: n = !0,
      collapseWhitespace: a,
      trim: o,
      normalizer: i,
    } = r === void 0 ? {} : r;
    Et(e);
    let l = n ? gt : qr,
      u = Xt({ collapseWhitespace: a, trim: o, normalizer: i });
    return Array.from(e.querySelectorAll("[title], svg > title")).filter(
      (c) =>
        l(c.getAttribute("title"), c, t, u) || (aq(c) && l(gn(c), c, t, u)),
    );
  },
  oq = (e, t) => "Found multiple elements with the title: " + t + ".",
  iq = (e, t) => "Unable to find an element with the title: " + t + ".",
  qm = Le(ii, ii.name, "queryAll"),
  [xm, Mm, $m, Nm, jm] = wt(ii, oq, iq),
  li = function (e, t, r) {
    let {
      hidden: n = Z().defaultHidden,
      name: a,
      description: o,
      queryFallbacks: i = !1,
      selected: l,
      busy: u,
      checked: c,
      pressed: s,
      current: d,
      level: p,
      expanded: f,
      value: { now: h, min: m, max: g, text: b } = {},
    } = r === void 0 ? {} : r;
    if ((Et(e), l !== void 0)) {
      var y;
      if (
        ((y = He.roles.get(t)) == null ? void 0 : y.props["aria-selected"]) ===
        void 0
      )
        throw new Error(
          '"aria-selected" is not supported on role "' + t + '".',
        );
    }
    if (u !== void 0) {
      var R;
      if (
        ((R = He.roles.get(t)) == null ? void 0 : R.props["aria-busy"]) ===
        void 0
      )
        throw new Error('"aria-busy" is not supported on role "' + t + '".');
    }
    if (c !== void 0) {
      var _;
      if (
        ((_ = He.roles.get(t)) == null ? void 0 : _.props["aria-checked"]) ===
        void 0
      )
        throw new Error('"aria-checked" is not supported on role "' + t + '".');
    }
    if (s !== void 0) {
      var C;
      if (
        ((C = He.roles.get(t)) == null ? void 0 : C.props["aria-pressed"]) ===
        void 0
      )
        throw new Error('"aria-pressed" is not supported on role "' + t + '".');
    }
    if (d !== void 0) {
      var w;
      if (
        ((w = He.roles.get(t)) == null ? void 0 : w.props["aria-current"]) ===
        void 0
      )
        throw new Error('"aria-current" is not supported on role "' + t + '".');
    }
    if (p !== void 0 && t !== "heading")
      throw new Error('Role "' + t + '" cannot have "level" property.');
    if (h !== void 0) {
      var v;
      if (
        ((v = He.roles.get(t)) == null ? void 0 : v.props["aria-valuenow"]) ===
        void 0
      )
        throw new Error(
          '"aria-valuenow" is not supported on role "' + t + '".',
        );
    }
    if (g !== void 0) {
      var E;
      if (
        ((E = He.roles.get(t)) == null ? void 0 : E.props["aria-valuemax"]) ===
        void 0
      )
        throw new Error(
          '"aria-valuemax" is not supported on role "' + t + '".',
        );
    }
    if (m !== void 0) {
      var O;
      if (
        ((O = He.roles.get(t)) == null ? void 0 : O.props["aria-valuemin"]) ===
        void 0
      )
        throw new Error(
          '"aria-valuemin" is not supported on role "' + t + '".',
        );
    }
    if (b !== void 0) {
      var M;
      if (
        ((M = He.roles.get(t)) == null ? void 0 : M.props["aria-valuetext"]) ===
        void 0
      )
        throw new Error(
          '"aria-valuetext" is not supported on role "' + t + '".',
        );
    }
    if (f !== void 0) {
      var N;
      if (
        ((N = He.roles.get(t)) == null ? void 0 : N.props["aria-expanded"]) ===
        void 0
      )
        throw new Error(
          '"aria-expanded" is not supported on role "' + t + '".',
        );
    }
    let k = new WeakMap();
    function j(I) {
      return k.has(I) || k.set(I, Wh(I)), k.get(I);
    }
    return Array.from(e.querySelectorAll(lq(t)))
      .filter((I) => {
        if (I.hasAttribute("role")) {
          let B = I.getAttribute("role");
          if (i)
            return B.split(" ")
              .filter(Boolean)
              .some((K) => K === t);
          let [z] = B.split(" ");
          return z === t;
        }
        return Dl(I).some((B) => B === t);
      })
      .filter((I) => {
        if (l !== void 0) return l === MA(I);
        if (u !== void 0) return u === $A(I);
        if (c !== void 0) return c === NA(I);
        if (s !== void 0) return s === jA(I);
        if (d !== void 0) return d === IA(I);
        if (f !== void 0) return f === LA(I);
        if (p !== void 0) return p === BA(I);
        if (h !== void 0 || g !== void 0 || m !== void 0 || b !== void 0) {
          let z = !0;
          if (
            (h !== void 0 && z && (z = h === kA(I)),
            g !== void 0 && z && (z = g === DA(I)),
            m !== void 0 && z && (z = m === FA(I)),
            b !== void 0)
          ) {
            var B;
            z && (z = gt((B = UA(I)) != null ? B : null, I, b, (K) => K));
          }
          return z;
        }
        return !0;
      })
      .filter((I) =>
        a === void 0
          ? !0
          : gt(
              jl(I, {
                computedStyleSupportsPseudoElements:
                  Z().computedStyleSupportsPseudoElements,
              }),
              I,
              a,
              (B) => B,
            ),
      )
      .filter((I) =>
        o === void 0
          ? !0
          : gt(
              Mh(I, {
                computedStyleSupportsPseudoElements:
                  Z().computedStyleSupportsPseudoElements,
              }),
              I,
              o,
              (B) => B,
            ),
      )
      .filter((I) =>
        n === !1 ? Ma(I, { isSubtreeInaccessible: j }) === !1 : !0,
      );
  };
function lq(e) {
  var t;
  let r = '*[role~="' + e + '"]',
    n = (t = He.roleElements.get(e)) != null ? t : new Set(),
    a = new Set(
      Array.from(n).map((o) => {
        let { name: i } = o;
        return i;
      }),
    );
  return [r].concat(Array.from(a)).join(",");
}
var Im = (e) => {
    let t = "";
    return (
      e === void 0
        ? (t = "")
        : typeof e == "string"
          ? (t = ' and name "' + e + '"')
          : (t = " and name `" + e + "`"),
      t
    );
  },
  sq = function (e, t, r) {
    let { name: n } = r === void 0 ? {} : r;
    return 'Found multiple elements with the role "' + t + '"' + Im(n);
  },
  uq = function (e, t, r) {
    let {
      hidden: n = Z().defaultHidden,
      name: a,
      description: o,
    } = r === void 0 ? {} : r;
    if (Z()._disableExpensiveErrorDiagnostics)
      return 'Unable to find role="' + t + '"' + Im(a);
    let i = "";
    Array.from(e.children).forEach((s) => {
      i += Yh(s, { hidden: n, includeDescription: o !== void 0 });
    });
    let l;
    i.length === 0
      ? n === !1
        ? (l =
            "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole")
        : (l = "There are no available roles.")
      : (l = (
          `
Here are the ` +
          (n === !1 ? "accessible" : "available") +
          ` roles:

  ` +
          i
            .replace(
              /\n/g,
              `
  `,
            )
            .replace(
              /\n\s\s\n/g,
              `

`,
            ) +
          `
`
        ).trim());
    let u = "";
    a === void 0
      ? (u = "")
      : typeof a == "string"
        ? (u = ' and name "' + a + '"')
        : (u = " and name `" + a + "`");
    let c = "";
    return (
      o === void 0
        ? (c = "")
        : typeof o == "string"
          ? (c = ' and description "' + o + '"')
          : (c = " and description `" + o + "`"),
      (
        `
Unable to find an ` +
        (n === !1 ? "accessible " : "") +
        'element with the role "' +
        t +
        '"' +
        u +
        c +
        `

` +
        l
      ).trim()
    );
  },
  Lm = Le(li, li.name, "queryAll"),
  [Bm, km, Dm, Fm, Um] = wt(li, sq, uq),
  Hl = () => Z().testIdAttribute,
  si = function () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return Et(t[0]), Qt(Hl(), ...t);
  },
  cq = (e, t) => "Found multiple elements by: [" + Hl() + '="' + t + '"]',
  dq = (e, t) => "Unable to find an element by: [" + Hl() + '="' + t + '"]',
  Hm = Le(si, si.name, "queryAll"),
  [zm, Vm, Gm, Wm, Km] = wt(si, cq, dq),
  Qn = Object.freeze({
    __proto__: null,
    queryAllByLabelText: om,
    queryByLabelText: Zh,
    getAllByLabelText: nm,
    getByLabelText: am,
    findAllByLabelText: tm,
    findByLabelText: rm,
    queryByPlaceholderText: lm,
    queryAllByPlaceholderText: im,
    getByPlaceholderText: um,
    getAllByPlaceholderText: sm,
    findAllByPlaceholderText: cm,
    findByPlaceholderText: dm,
    queryByText: pm,
    queryAllByText: fm,
    getByText: mm,
    getAllByText: hm,
    findAllByText: bm,
    findByText: gm,
    queryByDisplayValue: vm,
    queryAllByDisplayValue: ym,
    getByDisplayValue: Em,
    getAllByDisplayValue: _m,
    findAllByDisplayValue: wm,
    findByDisplayValue: Cm,
    queryByAltText: Tm,
    queryAllByAltText: Rm,
    getByAltText: Pm,
    getAllByAltText: Sm,
    findAllByAltText: Om,
    findByAltText: Am,
    queryByTitle: xm,
    queryAllByTitle: qm,
    getByTitle: $m,
    getAllByTitle: Mm,
    findAllByTitle: Nm,
    findByTitle: jm,
    queryByRole: Bm,
    queryAllByRole: Lm,
    getAllByRole: km,
    getByRole: Dm,
    findAllByRole: Fm,
    findByRole: Um,
    queryByTestId: zm,
    queryAllByTestId: Hm,
    getByTestId: Gm,
    getAllByTestId: Vm,
    findAllByTestId: Wm,
    findByTestId: Km,
  });
function ui(e, t, r) {
  return (
    t === void 0 && (t = Qn),
    r === void 0 && (r = {}),
    Object.keys(t).reduce((n, a) => {
      let o = t[a];
      return (n[a] = o.bind(null, e)), n;
    }, r)
  );
}
var Ym = (e) => !e || (Array.isArray(e) && !e.length);
function gc(e) {
  if (Ym(e))
    throw new Error(
      "The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.",
    );
}
async function fq(e, t) {
  let r = new Error("Timed out in waitForElementToBeRemoved.");
  if (typeof e != "function") {
    gc(e);
    let n = (Array.isArray(e) ? e : [e]).map((a) => {
      let o = a.parentElement;
      if (o === null) return () => null;
      for (; o.parentElement; ) o = o.parentElement;
      return () => (o.contains(a) ? a : null);
    });
    e = () => n.map((a) => a()).filter(Boolean);
  }
  return (
    gc(e()),
    Fl(() => {
      let n;
      try {
        n = e();
      } catch (a) {
        if (a.name === "TestingLibraryElementError") return;
        throw a;
      }
      if (!Ym(n)) throw r;
    }, t)
  );
}
var yc = {
    copy: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    cut: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    paste: {
      EventType: "ClipboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    compositionEnd: {
      EventType: "CompositionEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    compositionStart: {
      EventType: "CompositionEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    compositionUpdate: {
      EventType: "CompositionEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    keyDown: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
    },
    keyPress: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
    },
    keyUp: {
      EventType: "KeyboardEvent",
      defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 },
    },
    focus: {
      EventType: "FocusEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    blur: {
      EventType: "FocusEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    focusIn: {
      EventType: "FocusEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    focusOut: {
      EventType: "FocusEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    change: {
      EventType: "Event",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    input: {
      EventType: "InputEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    invalid: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !0 },
    },
    submit: {
      EventType: "Event",
      defaultInit: { bubbles: !0, cancelable: !0 },
    },
    reset: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !0 } },
    click: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, button: 0, composed: !0 },
    },
    contextMenu: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    dblClick: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    drag: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    dragEnd: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    dragEnter: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    dragExit: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    dragLeave: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    dragOver: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    dragStart: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    drop: {
      EventType: "DragEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseDown: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseEnter: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    mouseLeave: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
    },
    mouseMove: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseOut: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseOver: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    mouseUp: {
      EventType: "MouseEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    select: {
      EventType: "Event",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    touchCancel: {
      EventType: "TouchEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    touchEnd: {
      EventType: "TouchEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    touchMove: {
      EventType: "TouchEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    touchStart: {
      EventType: "TouchEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    resize: {
      EventType: "UIEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    scroll: {
      EventType: "UIEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    wheel: {
      EventType: "WheelEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    abort: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    canPlay: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    canPlayThrough: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    durationChange: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    emptied: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    encrypted: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    ended: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    loadedData: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    loadedMetadata: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    loadStart: {
      EventType: "ProgressEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    pause: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    play: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    playing: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    progress: {
      EventType: "ProgressEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    rateChange: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    seeked: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    seeking: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    stalled: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    suspend: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    timeUpdate: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    volumeChange: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    waiting: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    load: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    error: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } },
    animationStart: {
      EventType: "AnimationEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    animationEnd: {
      EventType: "AnimationEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    animationIteration: {
      EventType: "AnimationEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    transitionCancel: {
      EventType: "TransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    transitionEnd: {
      EventType: "TransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !0 },
    },
    transitionRun: {
      EventType: "TransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    transitionStart: {
      EventType: "TransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    pointerOver: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerEnter: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    pointerDown: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerMove: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerUp: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerCancel: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    pointerOut: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
    },
    pointerLeave: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    gotPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    lostPointerCapture: {
      EventType: "PointerEvent",
      defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
    },
    popState: {
      EventType: "PopStateEvent",
      defaultInit: { bubbles: !0, cancelable: !1 },
    },
    offline: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    online: {
      EventType: "Event",
      defaultInit: { bubbles: !1, cancelable: !1 },
    },
    pageHide: {
      EventType: "PageTransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !0 },
    },
    pageShow: {
      EventType: "PageTransitionEvent",
      defaultInit: { bubbles: !0, cancelable: !0 },
    },
  },
  vc = { doubleClick: "dblClick" };
function on(e, t) {
  return Z().eventWrapper(() => {
    if (!t)
      throw new Error(
        "Unable to fire an event - please provide an event object.",
      );
    if (!e)
      throw new Error(
        'Unable to fire a "' +
          t.type +
          '" event - please provide a DOM element.',
      );
    return e.dispatchEvent(t);
  });
}
function jn(e, t, r, n) {
  let { EventType: a = "Event", defaultInit: o = {} } = n === void 0 ? {} : n;
  if (!t)
    throw new Error(
      'Unable to fire a "' + e + '" event - please provide a DOM element.',
    );
  let i = { ...o, ...r },
    { target: { value: l, files: u, ...c } = {} } = i;
  l !== void 0 && pq(t, l),
    u !== void 0 &&
      Object.defineProperty(t, "files", {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: u,
      }),
    Object.assign(t, c);
  let s = Fh(t),
    d = s[a] || s.Event,
    p;
  if (typeof d == "function") p = new d(e, i);
  else {
    p = s.document.createEvent(a);
    let { bubbles: f, cancelable: h, detail: m, ...g } = i;
    p.initEvent(e, f, h, m),
      Object.keys(g).forEach((b) => {
        p[b] = g[b];
      });
  }
  return (
    ["dataTransfer", "clipboardData"].forEach((f) => {
      let h = i[f];
      typeof h == "object" &&
        (typeof s.DataTransfer == "function"
          ? Object.defineProperty(p, f, {
              value: Object.getOwnPropertyNames(h).reduce(
                (m, g) => (Object.defineProperty(m, g, { value: h[g] }), m),
                new s.DataTransfer(),
              ),
            })
          : Object.defineProperty(p, f, { value: h }));
    }),
    p
  );
}
Object.keys(yc).forEach((e) => {
  let { EventType: t, defaultInit: r } = yc[e],
    n = e.toLowerCase();
  (jn[e] = (a, o) => jn(n, a, o, { EventType: t, defaultInit: r })),
    (on[e] = (a, o) => on(a, jn[e](a, o)));
});
function pq(e, t) {
  let { set: r } = Object.getOwnPropertyDescriptor(e, "value") || {},
    n = Object.getPrototypeOf(e),
    { set: a } = Object.getOwnPropertyDescriptor(n, "value") || {};
  if (a && r !== a) a.call(e, t);
  else if (r) r.call(e, t);
  else throw new Error("The given element does not have a value setter");
}
Object.keys(vc).forEach((e) => {
  let t = vc[e];
  on[e] = function () {
    return on[t](...arguments);
  };
});
function hq(e) {
  return e.replace(
    /[ \t]*[\n][ \t]*/g,
    `
`,
  );
}
function mq(e) {
  return oA.default.compressToEncodedURIComponent(hq(e));
}
function bq(e) {
  return "https://testing-playground.com/#markup=" + mq(e);
}
var gq = (e, t, r) =>
    Array.isArray(e) ? e.forEach((n) => ei(n, t, r)) : ei(e, t, r),
  yq = function (e) {
    if ((e === void 0 && (e = Bl().body), !e || !("innerHTML" in e))) {
      console.log("The element you're providing isn't a valid DOM element.");
      return;
    }
    if (!e.innerHTML) {
      console.log("The provided element doesn't have any children.");
      return;
    }
    let t = bq(e.innerHTML);
    return (
      console.log(
        `Open this URL in your browser

` + t,
      ),
      t
    );
  },
  _c = { debug: gq, logTestingPlaygroundURL: yq },
  vq =
    typeof document < "u" && document.body
      ? ui(document.body, Qn, _c)
      : Object.keys(Qn).reduce(
          (e, t) => (
            (e[t] = () => {
              throw new TypeError(
                "For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error",
              );
            }),
            e
          ),
          _c,
        );
function X(e, t, r) {
  return (e.namespaceURI &&
    e.namespaceURI !== "http://www.w3.org/1999/xhtml") ||
    ((t = Array.isArray(t) ? t : [t]), !t.includes(e.tagName.toLowerCase()))
    ? !1
    : r
      ? Object.entries(r).every(([n, a]) => e[n] === a)
      : !0;
}
var ci;
(function (e) {
  (e.button = "button"),
    (e.color = "color"),
    (e.file = "file"),
    (e.image = "image"),
    (e.reset = "reset"),
    (e.submit = "submit"),
    (e.checkbox = "checkbox"),
    (e.radio = "radio");
})(ci || (ci = {}));
function Jm(e) {
  return X(e, "button") || (X(e, "input") && e.type in ci);
}
function ot(e) {
  var t;
  if (_q(e) && e.defaultView) return e.defaultView;
  if (!((t = e.ownerDocument) === null || t === void 0) && t.defaultView)
    return e.ownerDocument.defaultView;
  throw new Error(`Could not determine window of node. Node was ${Eq(e)}`);
}
function _q(e) {
  return e.nodeType === 9;
}
function Eq(e) {
  return typeof e == "function"
    ? `function ${e.name}`
    : e === null
      ? "null"
      : String(e);
}
function Xm(e, t) {
  return new Promise((r, n) => {
    let a = new t();
    (a.onerror = n),
      (a.onabort = n),
      (a.onload = () => {
        r(String(a.result));
      }),
      a.readAsText(e);
  });
}
function zl(e, t) {
  let r = {
    ...t,
    length: t.length,
    item: (n) => r[n],
    [Symbol.iterator]: function* () {
      for (let n = 0; n < r.length; n++) yield r[n];
    },
  };
  return (
    (r.constructor = e.FileList),
    e.FileList && Object.setPrototypeOf(r, e.FileList.prototype),
    Object.freeze(r),
    r
  );
}
function qt(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Qm = class {
    getAsFile() {
      return this.file;
    }
    getAsString(e) {
      typeof this.data == "string" && e(this.data);
    }
    webkitGetAsEntry() {
      throw new Error("not implemented");
    }
    constructor(e, t) {
      qt(this, "kind", void 0),
        qt(this, "type", void 0),
        qt(this, "file", null),
        qt(this, "data", void 0),
        typeof e == "string"
          ? ((this.kind = "string"), (this.type = String(t)), (this.data = e))
          : ((this.kind = "file"), (this.type = e.type), (this.file = e));
    }
  },
  wq = class extends Array {
    add(...e) {
      let t = new Qm(e[0], e[1]);
      return this.push(t), t;
    }
    clear() {
      this.splice(0, this.length);
    }
    remove(e) {
      this.splice(e, 1);
    }
  };
function Rn(e, t) {
  let [r, n] = e.split("/"),
    a = !n || n === "*";
  return (o) =>
    t ? o.type === (a ? r : e) : a ? o.type.startsWith(`${r}/`) : o.type === r;
}
function Cq(e) {
  return new (class {
    getData(t) {
      var r;
      let n =
          (r = this.items.find(Rn(t, !0))) !== null && r !== void 0
            ? r
            : this.items.find(Rn(t, !1)),
        a = "";
      return (
        n == null ||
          n.getAsString((o) => {
            a = o;
          }),
        a
      );
    }
    setData(t, r) {
      let n = this.items.findIndex(Rn(t, !0)),
        a = new Qm(r, t);
      n >= 0 ? this.items.splice(n, 1, a) : this.items.push(a);
    }
    clearData(t) {
      if (t) {
        let r = this.items.findIndex(Rn(t, !0));
        r >= 0 && this.items.remove(r);
      } else this.items.clear();
    }
    get types() {
      let t = [];
      return (
        this.files.length && t.push("Files"),
        this.items.forEach((r) => t.push(r.type)),
        Object.freeze(t),
        t
      );
    }
    setDragImage() {}
    constructor() {
      qt(this, "dropEffect", "none"),
        qt(this, "effectAllowed", "uninitialized"),
        qt(this, "items", new wq()),
        qt(this, "files", zl(e, []));
    }
  })();
}
function Vl(e, t = []) {
  let r = typeof e.DataTransfer > "u" ? Cq(e) : new e.DataTransfer();
  return Object.defineProperty(r, "files", { get: () => zl(e, t) }), r;
}
function Rq(e, t) {
  if (t.kind === "file") return t.getAsFile();
  let r = "";
  return (
    t.getAsString((n) => {
      r = n;
    }),
    new e.Blob([r], { type: t.type })
  );
}
function Zm(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function eb(e, ...t) {
  let r = Object.fromEntries(
    t.map((n) => [
      typeof n == "string" ? "text/plain" : n.type,
      Promise.resolve(n),
    ]),
  );
  return typeof e.ClipboardItem < "u"
    ? new e.ClipboardItem(r)
    : new (class {
        get types() {
          return Array.from(Object.keys(this.data));
        }
        async getType(n) {
          let a = await this.data[n];
          if (!a)
            throw new Error(
              `${n} is not one of the available MIME types on this item.`,
            );
          return a instanceof e.Blob ? a : new e.Blob([a], { type: n });
        }
        constructor(n) {
          Zm(this, "data", void 0), (this.data = n);
        }
      })(r);
}
var wr = Symbol("Manage ClipboardSub");
function Ec(e, t) {
  return Object.assign(
    new (class extends e.EventTarget {
      async read() {
        return Array.from(this.items);
      }
      async readText() {
        let r = "";
        for (let n of this.items) {
          let a = n.types.includes("text/plain")
            ? "text/plain"
            : n.types.find((o) => o.startsWith("text/"));
          a && (r += await n.getType(a).then((o) => Xm(o, e.FileReader)));
        }
        return r;
      }
      async write(r) {
        this.items = r;
      }
      async writeText(r) {
        this.items = [eb(e, r)];
      }
      constructor(...r) {
        super(...r), Zm(this, "items", []);
      }
    })(),
    { [wr]: t },
  );
}
function Gl(e) {
  return !!(e != null && e[wr]);
}
function Tq(e) {
  if (Gl(e.navigator.clipboard)) return e.navigator.clipboard[wr];
  let t = Object.getOwnPropertyDescriptor(e.navigator, "clipboard"),
    r,
    n = {
      resetClipboardStub: () => {
        r = Ec(e, n);
      },
      detachClipboardStub: () => {
        t
          ? Object.defineProperty(e.navigator, "clipboard", t)
          : Object.defineProperty(e.navigator, "clipboard", {
              value: void 0,
              configurable: !0,
            });
      },
    };
  return (
    (r = Ec(e, n)),
    Object.defineProperty(e.navigator, "clipboard", {
      get: () => r,
      configurable: !0,
    }),
    r[wr]
  );
}
function Sq(e) {
  Gl(e.navigator.clipboard) && e.navigator.clipboard[wr].resetClipboardStub();
}
function Pq(e) {
  Gl(e.navigator.clipboard) && e.navigator.clipboard[wr].detachClipboardStub();
}
async function Oq(e) {
  let t = e.defaultView,
    r = t == null ? void 0 : t.navigator.clipboard,
    n = r && (await r.read());
  if (!n) throw new Error("The Clipboard API is unavailable.");
  let a = Vl(t);
  for (let o of n)
    for (let i of o.types)
      a.setData(i, await o.getType(i).then((l) => Xm(l, t.FileReader)));
  return a;
}
async function tb(e, t) {
  let r = ot(e),
    n = r.navigator.clipboard,
    a = [];
  for (let o = 0; o < t.items.length; o++) {
    let i = t.items[o],
      l = Rq(r, i);
    a.push(eb(r, l));
  }
  if (
    !(
      n &&
      (await n.write(a).then(
        () => !0,
        () => !1,
      ))
    )
  )
    throw new Error("The Clipboard API is unavailable.");
}
var Zn = globalThis;
typeof Zn.afterEach == "function" && Zn.afterEach(() => Sq(globalThis.window));
typeof Zn.afterAll == "function" && Zn.afterAll(() => Pq(globalThis.window));
function Wt(e) {
  return (
    e.hasAttribute("contenteditable") &&
    (e.getAttribute("contenteditable") == "true" ||
      e.getAttribute("contenteditable") == "")
  );
}
function ln(e) {
  let t = Aq(e);
  return (
    t &&
    (t.closest('[contenteditable=""]') || t.closest('[contenteditable="true"]'))
  );
}
function Aq(e) {
  return e.nodeType === 1 ? e : e.parentElement;
}
function Cr(e) {
  return (rb(e) && !e.readOnly) || Wt(e);
}
var di;
(function (e) {
  (e.text = "text"),
    (e.date = "date"),
    (e["datetime-local"] = "datetime-local"),
    (e.email = "email"),
    (e.month = "month"),
    (e.number = "number"),
    (e.password = "password"),
    (e.search = "search"),
    (e.tel = "tel"),
    (e.time = "time"),
    (e.url = "url"),
    (e.week = "week");
})(di || (di = {}));
function rb(e) {
  return X(e, "textarea") || (X(e, "input") && e.type in di);
}
var fi;
(function (e) {
  (e.email = "email"),
    (e.password = "password"),
    (e.search = "search"),
    (e.telephone = "telephone"),
    (e.text = "text"),
    (e.url = "url");
})(fi || (fi = {}));
function qq(e) {
  var t;
  let r = (t = e.getAttribute("maxlength")) !== null && t !== void 0 ? t : "";
  return /^\d+$/.test(r) && Number(r) >= 0 ? Number(r) : void 0;
}
function xq(e) {
  return X(e, "textarea") || (X(e, "input") && e.type in fi);
}
var nb = [
  "input:not([type=hidden]):not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable=""]',
  '[contenteditable="true"]',
  "a[href]",
  "[tabindex]:not([disabled])",
].join(", ");
function Wl(e) {
  return e.matches(nb);
}
var ea;
(function (e) {
  (e["{"] = "}"), (e["["] = "]");
})(ea || (ea = {}));
function ab(e, t) {
  let r = 0,
    n = e[r] in ea ? e[r] : "";
  r += n.length;
  let a = new RegExp(`^\\${n}{2}`).test(e) ? "" : n;
  return { type: a, ...(a === "" ? Mq(e, r, t) : $q(e, r, a, t)) };
}
function Mq(e, t, r) {
  let n = e[t];
  return (
    ob(n, e, t, r),
    (t += n.length),
    {
      consumedLength: t,
      descriptor: n,
      releasePrevious: !1,
      releaseSelf: !0,
      repeat: 1,
    }
  );
}
function $q(e, t, r, n) {
  var a, o;
  let i = e[t] === "/" ? "/" : "";
  t += i.length;
  let l = r === "{" && e[t] === "\\";
  t += Number(l);
  let u = l
    ? e[t]
    : (a = e.slice(t).match(r === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null ||
        a === void 0
      ? void 0
      : a[0];
  ob(u, e, t, n), (t += u.length);
  var c;
  let s =
    (c =
      (o = e.slice(t).match(/^>\d+/)) === null || o === void 0
        ? void 0
        : o[0]) !== null && c !== void 0
      ? c
      : "";
  t += s.length;
  let d = e[t] === "/" || (!s && e[t] === ">") ? e[t] : "";
  t += d.length;
  let p = ea[r],
    f = e[t] === p ? p : "";
  if (!f)
    throw new Error(
      ib(
        [!s && "repeat modifier", !d && "release modifier", `"${p}"`]
          .filter(Boolean)
          .join(" or "),
        e[t],
        e,
        n,
      ),
    );
  return (
    (t += f.length),
    {
      consumedLength: t,
      descriptor: u,
      releasePrevious: !!i,
      repeat: s ? Math.max(Number(s.substr(1)), 1) : 1,
      releaseSelf: Nq(d, s),
    }
  );
}
function ob(e, t, r, n) {
  if (!e) throw new Error(ib("key descriptor", t[r], t, n));
}
function Nq(e, t) {
  if (e) return e === "/";
  if (t) return !1;
}
function ib(e, t, r, n) {
  return `Expected ${e} but found "${t ?? ""}" in "${r}"
    See ${n === "pointer" ? "https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen" : "https://testing-library.com/docs/user-event/keyboard"}
    for more information about how userEvent parses your input.`;
}
function jq(e) {
  return new e.constructor(e.type, e);
}
var je;
(function (e) {
  (e[(e.Trigger = 2)] = "Trigger"), (e[(e.Call = 1)] = "Call");
})(je || (je = {}));
function Ir(e, t) {
  e.levelRefs[t] = {};
}
function Tn(e, t) {
  return e.levelRefs[t];
}
var dr;
(function (e) {
  (e[(e.EachTrigger = 4)] = "EachTrigger"),
    (e[(e.EachApiCall = 2)] = "EachApiCall"),
    (e[(e.EachTarget = 1)] = "EachTarget"),
    (e[(e.Never = 0)] = "Never");
})(dr || (dr = {}));
function yt(e) {
  for (let r = e; r; r = r.parentElement)
    if (X(r, ["button", "input", "select", "textarea", "optgroup", "option"])) {
      if (r.hasAttribute("disabled")) return !0;
    } else if (X(r, "fieldset")) {
      var t;
      if (
        r.hasAttribute("disabled") &&
        !(
          !(
            (t = r.querySelector(":scope > legend")) === null || t === void 0
          ) && t.contains(e)
        )
      )
        return !0;
    } else if (
      r.tagName.includes("-") &&
      r.constructor.formAssociated &&
      r.hasAttribute("disabled")
    )
      return !0;
  return !1;
}
function ja(e) {
  let t = e.activeElement;
  return t != null && t.shadowRoot
    ? ja(t.shadowRoot)
    : yt(t)
      ? e.ownerDocument
        ? e.ownerDocument.body
        : e.body
      : t;
}
function lo(e) {
  var t;
  return (t = ja(e)) !== null && t !== void 0 ? t : e.body;
}
function Iq(e, t) {
  let r = e;
  do {
    if (t(r)) return r;
    r = r.parentElement;
  } while (r && r !== e.ownerDocument.body);
}
function it(e) {
  return lb(e) && rb(e);
}
function Lq(e) {
  return lb(e) && Jm(e);
}
function lb(e) {
  return e.nodeType === 1;
}
function Bq(e) {
  let t = e.ownerDocument.getSelection();
  if (t != null && t.focusNode && it(e)) {
    let n = ln(t.focusNode);
    if (n) {
      if (!t.isCollapsed) {
        var r;
        let a =
          ((r = n.firstChild) === null || r === void 0
            ? void 0
            : r.nodeType) === 3
            ? n.firstChild
            : n;
        t.setBaseAndExtent(a, 0, a, 0);
      }
    } else t.setBaseAndExtent(e, 0, e, 0);
  }
}
function Rr(e, t) {
  return Z().eventWrapper(e);
}
function Nt(e) {
  let t = Iq(e, Wl),
    r = ja(e.ownerDocument);
  (t ?? e.ownerDocument.body) !== r &&
    (Rr(t ? () => t.focus() : () => (r == null ? void 0 : r.blur())),
    Bq(t ?? e.ownerDocument.body));
}
function kq(e) {
  !Wl(e) || ja(e.ownerDocument) !== e || Rr(() => e.blur());
}
var jt = {};
jt.click = (e, t, r) => {
  let n = t.closest("button,input,label,select,textarea"),
    a = n && X(n, "label") && n.control;
  if (a)
    return () => {
      Wl(a) && Nt(a), r.dispatchEvent(a, jq(e));
    };
  if (X(t, "input", { type: "file" }))
    return () => {
      kq(t), t.dispatchEvent(new (ot(t).Event)("fileDialog")), Nt(t);
    };
};
var Tr = Symbol("Displayed value in UI"),
  bt = Symbol("Displayed selection in UI"),
  ta = Symbol("Initial value to compare on blur");
function Dq(e) {
  return typeof e == "object" && Tr in e;
}
function Fq(e) {
  return !!e && typeof e == "object" && bt in e;
}
function Uq(e, t) {
  e[ta] === void 0 && (e[ta] = e.value),
    (e[Tr] = t),
    (e.value = Object.assign(new String(t), { [Tr]: !0 }));
}
function lt(e) {
  return e[Tr] === void 0 ? e.value : String(e[Tr]);
}
function Kl(e) {
  e[Tr] = void 0;
}
function sb(e) {
  e[ta] = void 0;
}
function Hq(e) {
  return e[ta];
}
function zq(e, t) {
  e[bt] = t;
}
function xr(e, { focusOffset: t, anchorOffset: r = t }, n = "replace") {
  let a = lt(e).length,
    o = (d) => Math.max(0, Math.min(a, d)),
    i = n === "replace" || e[bt] === void 0 ? o(r) : e[bt].anchorOffset,
    l = o(t),
    u = Math.min(i, l),
    c = Math.max(i, l);
  if (
    ((e[bt] = { anchorOffset: i, focusOffset: l }),
    e.selectionStart === u && e.selectionEnd === c)
  )
    return;
  let s = Object.assign(new Number(u), { [bt]: !0 });
  try {
    e.setSelectionRange(s, c);
  } catch {}
}
function sn(e) {
  var t, r, n;
  let a =
    (n = e[bt]) !== null && n !== void 0
      ? n
      : {
          anchorOffset: (t = e.selectionStart) !== null && t !== void 0 ? t : 0,
          focusOffset: (r = e.selectionEnd) !== null && r !== void 0 ? r : 0,
        };
  return {
    ...a,
    startOffset: Math.min(a.anchorOffset, a.focusOffset),
    endOffset: Math.max(a.anchorOffset, a.focusOffset),
  };
}
function Vq(e) {
  return !!e[bt];
}
function In(e) {
  e[bt] = void 0;
}
var ra = globalThis.parseInt;
function Gq(e) {
  let t = e.replace(/\D/g, "");
  if (t.length < 2) return e;
  let r = ra(t[0], 10),
    n = ra(t[1], 10);
  if (r >= 3 || (r === 2 && n >= 4)) {
    let a;
    return r >= 3 ? (a = 1) : (a = 2), wc(t, a);
  }
  return e.length === 2 ? e : wc(t, 2);
}
function wc(e, t) {
  let r = e.slice(0, t),
    n = Math.min(ra(r, 10), 23),
    a = e.slice(t),
    o = ra(a, 10),
    i = Math.min(o, 59);
  return `${n.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
function ub(e, t) {
  let r = e.cloneNode();
  return (r.value = t), r.value === t;
}
function cb(e, t, r, n) {
  if (Ln(e) && t + r >= 0 && t + r <= e.nodeValue.length)
    return { node: e, offset: t + r };
  let a = Cc(e, t, r);
  if (a) {
    if (Ln(a))
      return {
        node: a,
        offset:
          r > 0
            ? Math.min(1, a.nodeValue.length)
            : Math.max(a.nodeValue.length - 1, 0),
      };
    if (X(a, "br")) {
      let o = Cc(a, void 0, r);
      return o
        ? Ln(o)
          ? { node: o, offset: r > 0 ? 0 : o.nodeValue.length }
          : r < 0 && X(o, "br")
            ? { node: a.parentNode, offset: Sn(a) }
            : { node: o.parentNode, offset: Sn(o) + (r > 0 ? 0 : 1) }
        : r < 0 && n === "deleteContentBackward"
          ? { node: a.parentNode, offset: Sn(a) }
          : void 0;
    } else return { node: a.parentNode, offset: Sn(a) + (r > 0 ? 1 : 0) };
  }
}
function Cc(e, t, r) {
  let n = Number(t) + (r < 0 ? -1 : 0);
  return (
    t !== void 0 &&
      Yl(e) &&
      n >= 0 &&
      n < e.children.length &&
      (e = e.children[n]),
    Kq(e, r === 1 ? "next" : "previous", Wq)
  );
}
function Wq(e) {
  if (Ln(e)) return !0;
  if (Yl(e)) {
    if (X(e, ["input", "textarea"])) return e.type !== "hidden";
    if (X(e, "br")) return !0;
  }
  return !1;
}
function Sn(e) {
  let t = 0;
  for (; e.previousSibling; ) t++, (e = e.previousSibling);
  return t;
}
function Yl(e) {
  return e.nodeType === 1;
}
function Ln(e) {
  return e.nodeType === 3;
}
function Kq(e, t, r) {
  for (;;) {
    var n;
    let a = e[`${t}Sibling`];
    if (a) {
      if (((e = Yq(a, t === "next" ? "first" : "last")), r(e))) return e;
    } else if (
      e.parentNode &&
      (!Yl(e.parentNode) ||
        (!Wt(e.parentNode) &&
          e.parentNode !==
            ((n = e.ownerDocument) === null || n === void 0 ? void 0 : n.body)))
    )
      e = e.parentNode;
    else break;
  }
}
function Yq(e, t) {
  for (; e.hasChildNodes(); ) e = e[`${t}Child`];
  return e;
}
var un = Symbol("Track programmatic changes for React workaround");
function Jq(e) {
  return (
    Object.getOwnPropertyNames(e).some((t) => t.startsWith("__react")) &&
    ot(e).REACT_VERSION === 17
  );
}
function Xq(e) {
  Jq(e) && (e[un] = { previousValue: String(e.value), tracked: [] });
}
function Qq(e, t) {
  var r, n;
  (n = e[un]) === null ||
    n === void 0 ||
    (r = n.tracked) === null ||
    r === void 0 ||
    r.push(t),
    e[un] || (Kl(e), xr(e, { focusOffset: t.length }));
}
function Zq(e, t) {
  var r;
  let n = e[un];
  if (
    ((e[un] = void 0),
    !(!(n == null || (r = n.tracked) === null || r === void 0) && r.length))
  )
    return;
  let a =
    n.tracked.length === 2 &&
    n.tracked[0] === n.previousValue &&
    n.tracked[1] === e.value;
  a || Kl(e), Vq(e) && xr(e, { focusOffset: a ? t : e.value.length });
}
function db(e) {
  let t = ex(e);
  if (t && it(t)) return { type: "input", selection: sn(t) };
  let r = t == null ? void 0 : t.ownerDocument.getSelection();
  return {
    type:
      ln(e) && r != null && r.anchorNode && ln(r.anchorNode)
        ? "contenteditable"
        : "default",
    selection: r,
  };
}
function ex(e) {
  return e.nodeType === 1 ? e : e.parentElement;
}
function tx(e) {
  let t = db(e);
  if (t.type === "input") return t.selection;
  if (t.type === "contenteditable") {
    var r;
    return (r = t.selection) === null || r === void 0
      ? void 0
      : r.getRangeAt(0);
  }
}
function Kt({
  focusNode: e,
  focusOffset: t,
  anchorNode: r = e,
  anchorOffset: n = t,
}) {
  var a, o;
  if (db(e).type === "input") return xr(e, { anchorOffset: n, focusOffset: t });
  (o = r.ownerDocument) === null ||
    o === void 0 ||
    (a = o.getSelection()) === null ||
    a === void 0 ||
    a.setBaseAndExtent(r, n, e, t);
}
function fb(e) {
  return X(e, "input") && ["date", "time"].includes(e.type);
}
function Sr(e, t, r, n = "insertText") {
  let a = tx(t);
  a &&
    ((!fb(t) &&
      !e.dispatchUIEvent(t, "beforeinput", { inputType: n, data: r })) ||
      ("startContainer" in a ? rx(e, t, a, r, n) : nx(e, t, a, r, n)));
}
function rx(e, t, r, n, a) {
  let o = !1;
  if (!r.collapsed) (o = !0), r.deleteContents();
  else if (["deleteContentBackward", "deleteContentForward"].includes(a)) {
    let i = cb(
      r.startContainer,
      r.startOffset,
      a === "deleteContentBackward" ? -1 : 1,
      a,
    );
    if (i) {
      o = !0;
      let l = r.cloneRange();
      l.comparePoint(i.node, i.offset) < 0
        ? l.setStart(i.node, i.offset)
        : l.setEnd(i.node, i.offset),
        l.deleteContents();
    }
  }
  if (n)
    if (r.endContainer.nodeType === 3) {
      let i = r.endOffset;
      r.endContainer.insertData(i, n),
        r.setStart(r.endContainer, i + n.length),
        r.setEnd(r.endContainer, i + n.length);
    } else {
      let i = t.ownerDocument.createTextNode(n);
      r.insertNode(i), r.setStart(i, n.length), r.setEnd(i, n.length);
    }
  (o || n) && e.dispatchUIEvent(t, "input", { inputType: a });
}
function nx(e, t, r, n, a) {
  let o = n;
  if (xq(t)) {
    let c = qq(t);
    if (c !== void 0 && n.length > 0) {
      let s = c - t.value.length;
      if (s > 0) o = n.substring(0, s);
      else return;
    }
  }
  let { newValue: i, newOffset: l, oldValue: u } = ax(o, t, r, a);
  (i === u && l === r.startOffset && l === r.endOffset) ||
    (X(t, "input", { type: "number" }) && !ox(i)) ||
    (Uq(t, i),
    Kt({ focusNode: t, anchorOffset: l, focusOffset: l }),
    fb(t)
      ? ub(t, i) && (Rc(e, t, l, {}), e.dispatchUIEvent(t, "change"), sb(t))
      : Rc(e, t, l, { data: n, inputType: a }));
}
function ax(e, t, { startOffset: r, endOffset: n }, a) {
  let o = lt(t),
    i = Math.max(0, r === n && a === "deleteContentBackward" ? r - 1 : r),
    l = o.substring(0, i),
    u = Math.min(o.length, r === n && a === "deleteContentForward" ? r + 1 : n),
    c = o.substring(u, o.length),
    s = `${l}${e}${c}`,
    d = i + e.length;
  if (X(t, "input", { type: "time" })) {
    let p = Gq(s);
    p !== "" && ub(t, p) && ((s = p), (d = p.length));
  }
  return { oldValue: o, newValue: s, newOffset: d };
}
function Rc(e, t, r, n) {
  e.dispatchUIEvent(t, "input", n), Zq(t, r);
}
function ox(e) {
  var t, r;
  let n = e.split("e", 2);
  return !(
    /[^\d.\-e]/.test(e) ||
    Number((t = e.match(/-/g)) === null || t === void 0 ? void 0 : t.length) >
      2 ||
    Number((r = e.match(/\./g)) === null || r === void 0 ? void 0 : r.length) >
      1 ||
    (n[1] && !/^-?\d*$/.test(n[1]))
  );
}
jt.cut = (e, t, r) => () => {
  Cr(t) && Sr(r, t, "", "deleteByCut");
};
function ix(e) {
  return e ? (Wt(e) ? e.textContent : lt(e)) : null;
}
function lx(e) {
  let t = ot(e);
  for (let r = e; r != null && r.ownerDocument; r = r.parentElement) {
    let { display: n, visibility: a } = t.getComputedStyle(r);
    if (n === "none" || a === "hidden") return !1;
  }
  return !0;
}
function sx(e, t) {
  let r = e.ownerDocument,
    n = r.querySelectorAll(nb),
    a = Array.from(n).filter(
      (u) => u === e || !(Number(u.getAttribute("tabindex")) < 0 || yt(u)),
    );
  Number(e.getAttribute("tabindex")) >= 0 &&
    a.sort((u, c) => {
      let s = Number(u.getAttribute("tabindex")),
        d = Number(c.getAttribute("tabindex"));
      return s === d ? 0 : s === 0 ? 1 : d === 0 ? -1 : s - d;
    });
  let o = {},
    i = [r.body],
    l = X(e, "input", { type: "radio" }) ? e.name : void 0;
  a.forEach((u) => {
    let c = u;
    if (X(c, "input", { type: "radio" }) && c.name) {
      if (c === e) {
        i.push(c);
        return;
      } else if (c.name === l) return;
      if (c.checked) {
        (i = i.filter((s) => !X(s, "input", { type: "radio", name: c.name }))),
          i.push(c),
          (o[c.name] = c);
        return;
      }
      if (typeof o[c.name] < "u") return;
    }
    i.push(c);
  });
  for (let u = i.findIndex((c) => c === e); ; )
    if (
      ((u += t ? -1 : 1),
      u === i.length ? (u = 0) : u === -1 && (u = i.length - 1),
      i[u] === e || i[u] === r.body || lx(i[u]))
    )
      return i[u];
}
function Tc(e, t) {
  if (it(e)) {
    let r = sn(e);
    Kt({
      focusNode: e,
      focusOffset:
        r.startOffset === r.endOffset
          ? r.focusOffset + t
          : t < 0
            ? r.startOffset
            : r.endOffset,
    });
  } else {
    let r = e.ownerDocument.getSelection();
    if (!(r != null && r.focusNode)) return;
    if (r.isCollapsed) {
      let n = cb(r.focusNode, r.focusOffset, t);
      n && Kt({ focusNode: n.node, focusOffset: n.offset });
    } else r[t < 0 ? "collapseToStart" : "collapseToEnd"]();
  }
}
function pb(e) {
  if (it(e))
    return Kt({ focusNode: e, anchorOffset: 0, focusOffset: lt(e).length });
  var t;
  let r = (t = ln(e)) !== null && t !== void 0 ? t : e.ownerDocument.body;
  Kt({ focusNode: r, anchorOffset: 0, focusOffset: r.childNodes.length });
}
function ux(e) {
  if (it(e)) return sn(e).startOffset === 0 && sn(e).endOffset === lt(e).length;
  var t;
  let r = (t = ln(e)) !== null && t !== void 0 ? t : e.ownerDocument.body,
    n = e.ownerDocument.getSelection();
  return (
    (n == null ? void 0 : n.anchorNode) === r &&
    n.focusNode === r &&
    n.anchorOffset === 0 &&
    n.focusOffset === r.childNodes.length
  );
}
function Lr(e, t, r) {
  var n;
  if (it(e)) return Kt({ focusNode: e, anchorOffset: t, focusOffset: r });
  if (
    Wt(e) &&
    ((n = e.firstChild) === null || n === void 0 ? void 0 : n.nodeType) === 3
  )
    return Kt({ focusNode: e.firstChild, anchorOffset: t, focusOffset: r });
  throw new Error(
    "Not implemented. The result of this interaction is unreliable.",
  );
}
function Pn(e, t, r) {
  let n = ot(t),
    a = Array.from(
      t.ownerDocument.querySelectorAll(
        t.name
          ? `input[type="radio"][name="${n.CSS.escape(t.name)}"]`
          : 'input[type="radio"][name=""], input[type="radio"]:not([name])',
      ),
    );
  for (let o = a.findIndex((i) => i === t) + r; ; o += r) {
    if ((a[o] || (o = r > 0 ? 0 : a.length - 1), a[o] === t)) return;
    yt(a[o]) || (Nt(a[o]), e.dispatchUIEvent(a[o], "click"));
  }
}
jt.keydown = (e, t, r) => {
  var n, a;
  return (a =
    (n = Sc[e.key]) === null || n === void 0 ? void 0 : n.call(Sc, e, t, r)) !==
    null && a !== void 0
    ? a
    : cx(e, t, r);
};
var Sc = {
    ArrowDown: (e, t, r) => {
      if (X(t, "input", { type: "radio" })) return () => Pn(r, t, -1);
    },
    ArrowLeft: (e, t, r) =>
      X(t, "input", { type: "radio" }) ? () => Pn(r, t, -1) : () => Tc(t, -1),
    ArrowRight: (e, t, r) =>
      X(t, "input", { type: "radio" }) ? () => Pn(r, t, 1) : () => Tc(t, 1),
    ArrowUp: (e, t, r) => {
      if (X(t, "input", { type: "radio" })) return () => Pn(r, t, 1);
    },
    Backspace: (e, t, r) => {
      if (Cr(t))
        return () => {
          Sr(r, t, "", "deleteContentBackward");
        };
    },
    Delete: (e, t, r) => {
      if (Cr(t))
        return () => {
          Sr(r, t, "", "deleteContentForward");
        };
    },
    End: (e, t) => {
      if (X(t, ["input", "textarea"]) || Wt(t))
        return () => {
          var r, n;
          let a =
            (n = (r = ix(t)) === null || r === void 0 ? void 0 : r.length) !==
              null && n !== void 0
              ? n
              : 0;
          Lr(t, a, a);
        };
    },
    Home: (e, t) => {
      if (X(t, ["input", "textarea"]) || Wt(t))
        return () => {
          Lr(t, 0, 0);
        };
    },
    PageDown: (e, t) => {
      if (X(t, ["input"]))
        return () => {
          let r = lt(t).length;
          Lr(t, r, r);
        };
    },
    PageUp: (e, t) => {
      if (X(t, ["input"]))
        return () => {
          Lr(t, 0, 0);
        };
    },
    Tab: (e, t, r) => () => {
      let n = sx(t, r.system.keyboard.modifiers.Shift);
      Nt(n), it(n) && xr(n, { anchorOffset: 0, focusOffset: n.value.length });
    },
  },
  cx = (e, t, r) => {
    if (e.code === "KeyA" && r.system.keyboard.modifiers.Control)
      return () => pb(t);
  };
jt.keypress = (e, t, r) => {
  if (e.key === "Enter") {
    if (
      X(t, "button") ||
      (X(t, "input") && dx.includes(t.type)) ||
      (X(t, "a") && t.href)
    )
      return () => {
        r.dispatchUIEvent(t, "click");
      };
    if (X(t, "input")) {
      let n = t.form,
        a =
          n == null
            ? void 0
            : n.querySelector(
                'input[type="submit"], button:not([type]), button[type="submit"]',
              );
      return a
        ? () => r.dispatchUIEvent(a, "click")
        : n && fx.includes(t.type) && n.querySelectorAll("input").length === 1
          ? () => r.dispatchUIEvent(n, "submit")
          : void 0;
    }
  }
  if (Cr(t)) {
    let n =
        e.key === "Enter"
          ? Wt(t) && !r.system.keyboard.modifiers.Shift
            ? "insertParagraph"
            : "insertLineBreak"
          : "insertText",
      a =
        e.key === "Enter"
          ? `
`
          : e.key;
    return () => Sr(r, t, a, n);
  }
};
var dx = ["button", "color", "file", "image", "reset", "submit"],
  fx = ["email", "month", "password", "search", "tel", "text", "url", "week"];
jt.keyup = (e, t, r) => {
  var n;
  return (n = Pc[e.key]) === null || n === void 0
    ? void 0
    : n.call(Pc, e, t, r);
};
var Pc = {
  " ": (e, t, r) => {
    if (Jm(t)) return () => r.dispatchUIEvent(t, "click");
  },
};
jt.paste = (e, t, r) => {
  if (Cr(t))
    return () => {
      var n;
      let a =
        (n = e.clipboardData) === null || n === void 0
          ? void 0
          : n.getData("text");
      a && Sr(r, t, a, "insertFromPaste");
    };
};
var hb = {
  auxclick: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  beforeinput: {
    EventType: "InputEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  click: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  contextmenu: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  change: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !1 } },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  dblclick: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  keydown: {
    EventType: "KeyboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  keypress: {
    EventType: "KeyboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  keyup: {
    EventType: "KeyboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  input: {
    EventType: "InputEvent",
    defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
  },
  mousedown: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  mouseenter: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
  },
  mouseleave: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !1, cancelable: !1, composed: !0 },
  },
  mousemove: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  mouseout: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  mouseover: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  mouseup: {
    EventType: "MouseEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointerover: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointerenter: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !1, cancelable: !1 },
  },
  pointerdown: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointermove: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointerup: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointercancel: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !1, composed: !0 },
  },
  pointerout: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !0, cancelable: !0, composed: !0 },
  },
  pointerleave: {
    EventType: "PointerEvent",
    defaultInit: { bubbles: !1, cancelable: !1 },
  },
  submit: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !0 } },
};
function mb(e) {
  return hb[e].EventType;
}
var px = ["MouseEvent", "PointerEvent"];
function hx(e) {
  return px.includes(mb(e));
}
function mx(e) {
  return mb(e) === "KeyboardEvent";
}
var bx = {
  ClipboardEvent: [yx],
  Event: [],
  InputEvent: [On, vx],
  MouseEvent: [On, so, Oc],
  PointerEvent: [On, so, Oc, Ex],
  KeyboardEvent: [On, so, _x],
};
function bb(e, t, r) {
  let n = ot(t),
    { EventType: a, defaultInit: o } = hb[e],
    i = new (gx(n)[a])(e, o);
  return bx[a].forEach((l) => l(i, r ?? {})), i;
}
function gx(e) {
  var t;
  let r = (t = e.Event) !== null && t !== void 0 ? t : class {};
  var n;
  let a =
    (n = e.AnimationEvent) !== null && n !== void 0 ? n : class extends r {};
  var o;
  let i =
    (o = e.ClipboardEvent) !== null && o !== void 0 ? o : class extends r {};
  var l;
  let u =
    (l = e.PopStateEvent) !== null && l !== void 0 ? l : class extends r {};
  var c;
  let s =
    (c = e.ProgressEvent) !== null && c !== void 0 ? c : class extends r {};
  var d;
  let p =
    (d = e.TransitionEvent) !== null && d !== void 0 ? d : class extends r {};
  var f;
  let h = (f = e.UIEvent) !== null && f !== void 0 ? f : class extends r {};
  var m;
  let g =
    (m = e.CompositionEvent) !== null && m !== void 0 ? m : class extends h {};
  var b;
  let y = (b = e.FocusEvent) !== null && b !== void 0 ? b : class extends h {};
  var R;
  let _ = (R = e.InputEvent) !== null && R !== void 0 ? R : class extends h {};
  var C;
  let w =
    (C = e.KeyboardEvent) !== null && C !== void 0 ? C : class extends h {};
  var v;
  let E = (v = e.MouseEvent) !== null && v !== void 0 ? v : class extends h {};
  var O;
  let M = (O = e.DragEvent) !== null && O !== void 0 ? O : class extends E {};
  var N;
  let k =
    (N = e.PointerEvent) !== null && N !== void 0 ? N : class extends E {};
  var j;
  let I = (j = e.TouchEvent) !== null && j !== void 0 ? j : class extends h {};
  return {
    Event: r,
    AnimationEvent: a,
    ClipboardEvent: i,
    PopStateEvent: u,
    ProgressEvent: s,
    TransitionEvent: p,
    UIEvent: h,
    CompositionEvent: g,
    FocusEvent: y,
    InputEvent: _,
    KeyboardEvent: w,
    MouseEvent: E,
    DragEvent: M,
    PointerEvent: k,
    TouchEvent: I,
  };
}
function Zt(e, t) {
  for (let [r, n] of Object.entries(t))
    Object.defineProperty(e, r, { get: () => n ?? null });
}
function Re(e) {
  return Number(e ?? 0);
}
function yx(e, { clipboardData: t }) {
  Zt(e, { clipboardData: t });
}
function vx(e, { data: t, inputType: r, isComposing: n }) {
  Zt(e, { data: t, isComposing: !!n, inputType: String(r) });
}
function On(e, { view: t, detail: r }) {
  Zt(e, { view: t, detail: Re(r ?? 0) });
}
function so(
  e,
  {
    altKey: t,
    ctrlKey: r,
    metaKey: n,
    shiftKey: a,
    modifierAltGraph: o,
    modifierCapsLock: i,
    modifierFn: l,
    modifierFnLock: u,
    modifierNumLock: c,
    modifierScrollLock: s,
    modifierSymbol: d,
    modifierSymbolLock: p,
  },
) {
  Zt(e, {
    altKey: !!t,
    ctrlKey: !!r,
    metaKey: !!n,
    shiftKey: !!a,
    getModifierState(f) {
      return !!{
        Alt: t,
        AltGraph: o,
        CapsLock: i,
        Control: r,
        Fn: l,
        FnLock: u,
        Meta: n,
        NumLock: c,
        ScrollLock: s,
        Shift: a,
        Symbol: d,
        SymbolLock: p,
      }[f];
    },
  });
}
function _x(
  e,
  { key: t, code: r, location: n, repeat: a, isComposing: o, charCode: i },
) {
  Zt(e, {
    key: String(t),
    code: String(r),
    location: Re(n),
    repeat: !!a,
    isComposing: !!o,
    charCode: i,
  });
}
function Oc(
  e,
  {
    x: t,
    y: r,
    screenX: n,
    screenY: a,
    clientX: o = t,
    clientY: i = r,
    button: l,
    buttons: u,
    relatedTarget: c,
  },
) {
  Zt(e, {
    screenX: Re(n),
    screenY: Re(a),
    clientX: Re(o),
    x: Re(o),
    clientY: Re(i),
    y: Re(i),
    button: Re(l),
    buttons: Re(u),
    relatedTarget: c,
  });
}
function Ex(
  e,
  {
    pointerId: t,
    width: r,
    height: n,
    pressure: a,
    tangentialPressure: o,
    tiltX: i,
    tiltY: l,
    twist: u,
    pointerType: c,
    isPrimary: s,
  },
) {
  Zt(e, {
    pointerId: Re(t),
    width: Re(r),
    height: Re(n),
    pressure: Re(a),
    tangentialPressure: Re(o),
    tiltX: Re(i),
    tiltY: Re(l),
    twist: Re(u),
    pointerType: String(c),
    isPrimary: !!s,
  });
}
function wx(e, t, r, n = !1) {
  (hx(t) || mx(t)) && (r = { ...r, ...this.system.getUIEventModifiers() });
  let a = bb(t, e, r);
  return gb.call(this, e, a, n);
}
function gb(e, t, r = !1) {
  var n;
  let a = t.type,
    o = r
      ? () => {}
      : (n = jt[a]) === null || n === void 0
        ? void 0
        : n.call(jt, t, e, this);
  if (o) {
    t.preventDefault();
    let i = !1;
    return (
      Object.defineProperty(t, "defaultPrevented", { get: () => i }),
      Object.defineProperty(t, "preventDefault", {
        value: () => {
          i = t.cancelable;
        },
      }),
      Rr(() => e.dispatchEvent(t)),
      i || o(),
      !i
    );
  }
  return Rr(() => e.dispatchEvent(t));
}
function Cx(e, t, r) {
  let n = bb(t, e, r);
  Rr(() => e.dispatchEvent(n));
}
var uo = Symbol("Interceptor for programmatical calls");
function ur(e, t, r) {
  let n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    a = Object.getOwnPropertyDescriptor(e, t),
    o = n != null && n.set ? "set" : "value";
  if (typeof (n == null ? void 0 : n[o]) != "function" || n[o][uo])
    throw new Error(`Element ${e.tagName} does not implement "${String(t)}".`);
  function i(...l) {
    let { applyNative: u = !1, realArgs: c, then: s } = r.call(this, ...l),
      d = ((!u && a) || n)[o];
    o === "set" ? d.call(this, c) : d.call(this, ...c), s == null || s();
  }
  (i[uo] = uo), Object.defineProperty(e, t, { ...(a ?? n), [o]: i });
}
function Rx(e) {
  ur(e, "value", function (t) {
    let r = Dq(t);
    return (
      r && Xq(this),
      {
        applyNative: !!r,
        realArgs: Tx(this, t),
        then: r ? void 0 : () => Qq(this, String(t)),
      }
    );
  });
}
function Tx(e, t) {
  return X(e, "input", { type: "number" }) &&
    String(t) !== "" &&
    !Number.isNaN(Number(t))
    ? String(Number(t))
    : String(t);
}
function Sx(e) {
  ur(e, "setSelectionRange", function (t, ...r) {
    let n = Fq(t);
    return {
      applyNative: !!n,
      realArgs: [Number(t), ...r],
      then: () => (n ? void 0 : In(e)),
    };
  }),
    ur(e, "selectionStart", function (t) {
      return { realArgs: t, then: () => In(e) };
    }),
    ur(e, "selectionEnd", function (t) {
      return { realArgs: t, then: () => In(e) };
    }),
    ur(e, "select", function () {
      return {
        realArgs: [],
        then: () => zq(e, { anchorOffset: 0, focusOffset: lt(e).length }),
      };
    });
}
function Px(e) {
  ur(e, "setRangeText", function (...t) {
    return {
      realArgs: t,
      then: () => {
        Kl(e), In(e);
      },
    };
  });
}
var fr = Symbol("Node prepared with document state workarounds");
function yb(e) {
  e[fr] ||
    (e.addEventListener(
      "focus",
      (t) => {
        let r = t.target;
        Ac(r);
      },
      { capture: !0, passive: !0 },
    ),
    e.activeElement && Ac(e.activeElement),
    e.addEventListener(
      "blur",
      (t) => {
        let r = t.target,
          n = Hq(r);
        n !== void 0 && (r.value !== n && Cx(r, "change"), sb(r));
      },
      { capture: !0, passive: !0 },
    ),
    (e[fr] = fr));
}
function Ac(e) {
  e[fr] || (X(e, ["input", "textarea"]) && (Rx(e), Sx(e), Px(e)), (e[fr] = fr));
}
function Ox(e) {
  return Ax(e) ? e : e.ownerDocument;
}
function Ax(e) {
  return e.nodeType === 9;
}
function Pr(e) {
  let t = e.delay;
  if (typeof t == "number")
    return Promise.all([
      new Promise((r) => globalThis.setTimeout(() => r(), t)),
      e.advanceTimers(t),
    ]);
}
function er(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var ze;
(function (e) {
  (e[(e.STANDARD = 0)] = "STANDARD"),
    (e[(e.LEFT = 1)] = "LEFT"),
    (e[(e.RIGHT = 2)] = "RIGHT"),
    (e[(e.NUMPAD = 3)] = "NUMPAD");
})(ze || (ze = {}));
var qx = ["Alt", "AltGraph", "Control", "Fn", "Meta", "Shift", "Symbol"];
function qc(e) {
  return qx.includes(e);
}
var xx = ["CapsLock", "FnLock", "NumLock", "ScrollLock", "SymbolLock"];
function xc(e) {
  return xx.includes(e);
}
var Mx = class {
    isKeyPressed(e) {
      return !!this.pressed[String(e.code)];
    }
    getPressedKeys() {
      return Object.values(this.pressed).map((e) => e.keyDef);
    }
    async keydown(e, t) {
      var r, n, a;
      let o = String(t.key),
        i = String(t.code),
        l = lo(e.config.document);
      this.setKeydownTarget(l);
      var u;
      ((u = (r = this.pressed)[(n = i)]) !== null && u !== void 0) ||
        (r[n] = { keyDef: t, unpreventedDefault: !1 }),
        qc(o) && (this.modifiers[o] = !0);
      let c = e.dispatchUIEvent(l, "keydown", { key: o, code: i });
      xc(o) &&
        !this.modifiers[o] &&
        ((this.modifiers[o] = !0), (this.modifierLockStart[o] = !0)),
        (a = this.pressed[i]).unpreventedDefault || (a.unpreventedDefault = c),
        c &&
          this.hasKeyPress(o) &&
          e.dispatchUIEvent(lo(e.config.document), "keypress", {
            key: o,
            code: i,
            charCode: t.key === "Enter" ? 13 : String(t.key).charCodeAt(0),
          });
    }
    async keyup(e, t) {
      let r = String(t.key),
        n = String(t.code),
        a = this.pressed[n].unpreventedDefault;
      delete this.pressed[n],
        qc(r) &&
          !Object.values(this.pressed).find((o) => o.keyDef.key === r) &&
          (this.modifiers[r] = !1),
        e.dispatchUIEvent(
          lo(e.config.document),
          "keyup",
          { key: r, code: n },
          !a,
        ),
        xc(r) &&
          this.modifiers[r] &&
          (this.modifierLockStart[r]
            ? (this.modifierLockStart[r] = !1)
            : (this.modifiers[r] = !1));
    }
    setKeydownTarget(e) {
      e !== this.lastKeydownTarget && (this.carryChar = ""),
        (this.lastKeydownTarget = e);
    }
    hasKeyPress(e) {
      return (
        (e.length === 1 || e === "Enter") &&
        !this.modifiers.Control &&
        !this.modifiers.Alt
      );
    }
    constructor(e) {
      er(this, "system", void 0),
        er(this, "modifiers", {
          Alt: !1,
          AltGraph: !1,
          CapsLock: !1,
          Control: !1,
          Fn: !1,
          FnLock: !1,
          Meta: !1,
          NumLock: !1,
          ScrollLock: !1,
          Shift: !1,
          Symbol: !1,
          SymbolLock: !1,
        }),
        er(this, "pressed", {}),
        er(this, "carryChar", ""),
        er(this, "lastKeydownTarget", void 0),
        er(this, "modifierLockStart", {}),
        (this.system = e);
    }
  },
  $x = [
    ..."0123456789".split("").map((e) => ({ code: `Digit${e}`, key: e })),
    ...")!@#$%^&*("
      .split("")
      .map((e, t) => ({ code: `Digit${t}`, key: e, shiftKey: !0 })),
    ..."abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((e) => ({ code: `Key${e.toUpperCase()}`, key: e })),
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .map((e) => ({ code: `Key${e}`, key: e, shiftKey: !0 })),
    { code: "Space", key: " " },
    { code: "AltLeft", key: "Alt", location: ze.LEFT },
    { code: "AltRight", key: "Alt", location: ze.RIGHT },
    { code: "ShiftLeft", key: "Shift", location: ze.LEFT },
    { code: "ShiftRight", key: "Shift", location: ze.RIGHT },
    { code: "ControlLeft", key: "Control", location: ze.LEFT },
    { code: "ControlRight", key: "Control", location: ze.RIGHT },
    { code: "MetaLeft", key: "Meta", location: ze.LEFT },
    { code: "MetaRight", key: "Meta", location: ze.RIGHT },
    { code: "OSLeft", key: "OS", location: ze.LEFT },
    { code: "OSRight", key: "OS", location: ze.RIGHT },
    { code: "Tab", key: "Tab" },
    { code: "CapsLock", key: "CapsLock" },
    { code: "Backspace", key: "Backspace" },
    { code: "Enter", key: "Enter" },
    { code: "Escape", key: "Escape" },
    { code: "ArrowUp", key: "ArrowUp" },
    { code: "ArrowDown", key: "ArrowDown" },
    { code: "ArrowLeft", key: "ArrowLeft" },
    { code: "ArrowRight", key: "ArrowRight" },
    { code: "Home", key: "Home" },
    { code: "End", key: "End" },
    { code: "Delete", key: "Delete" },
    { code: "PageUp", key: "PageUp" },
    { code: "PageDown", key: "PageDown" },
    { code: "Fn", key: "Fn" },
    { code: "Symbol", key: "Symbol" },
    { code: "AltRight", key: "AltGraph" },
  ],
  Nx = [
    { name: "MouseLeft", pointerType: "mouse", button: "primary" },
    { name: "MouseRight", pointerType: "mouse", button: "secondary" },
    { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" },
    { name: "TouchA", pointerType: "touch" },
    { name: "TouchB", pointerType: "touch" },
    { name: "TouchC", pointerType: "touch" },
  ];
function jx(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var vb = class {
    getButtons() {
      let e = 0;
      for (let t of Object.keys(this.pressed)) e |= 2 ** Number(t);
      return e;
    }
    down(e) {
      let t = pi(e.button);
      if (t in this.pressed) {
        this.pressed[t].push(e);
        return;
      }
      return (this.pressed[t] = [e]), t;
    }
    up(e) {
      let t = pi(e.button);
      if (
        t in this.pressed &&
        ((this.pressed[t] = this.pressed[t].filter((r) => r.name !== e.name)),
        this.pressed[t].length === 0)
      )
        return delete this.pressed[t], t;
    }
    constructor() {
      jx(this, "pressed", {});
    }
  },
  Mc = {
    primary: 0,
    secondary: 1,
    auxiliary: 2,
    back: 3,
    X1: 3,
    forward: 4,
    X2: 4,
  };
function pi(e = 0) {
  return e in Mc ? Mc[e] : Number(e);
}
var $c = { 1: 2, 2: 1 };
function Nc(e) {
  return (e = pi(e)), e in $c ? $c[e] : e;
}
function Ix(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Lx = class {
  get countPressed() {
    return this.pressedKeys.size;
  }
  isPressed(e) {
    return this.pressedKeys.has(e.name);
  }
  addPressed(e) {
    return this.pressedKeys.add(e.name);
  }
  removePressed(e) {
    return this.pressedKeys.delete(e.name);
  }
  constructor() {
    Ix(this, "pressedKeys", new Set());
  }
};
function Hr(e, t) {
  let r = [];
  for (let o = e; o; o = o.parentElement) r.push(o);
  let n = [];
  for (let o = t; o; o = o.parentElement) n.push(o);
  let a = 0;
  for (
    ;
    !(
      a >= r.length ||
      a >= n.length ||
      r[r.length - 1 - a] !== n[n.length - 1 - a]
    );
    a++
  );
  return [
    r.slice(0, r.length - a),
    n.slice(0, n.length - a),
    n.slice(n.length - a),
  ];
}
function hi({ target: e, node: t, offset: r }) {
  return it(e)
    ? { node: e, offset: r ?? lt(e).length }
    : t
      ? {
          node: t,
          offset:
            r ?? (t.nodeType === 3 ? t.nodeValue.length : t.childNodes.length),
        }
      : _b(e, r);
}
function _b(e, t, r = !0) {
  let n = t === void 0 ? e.childNodes.length - 1 : 0,
    a = t === void 0 ? -1 : 1;
  for (
    ;
    t === void 0
      ? n >= (r ? Math.max(e.childNodes.length - 1, 0) : 0)
      : n <= e.childNodes.length;

  ) {
    if (t && n === e.childNodes.length)
      throw new Error("The given offset is out of bounds.");
    let o = e.childNodes.item(n),
      i = String(o.textContent);
    if (i.length)
      if (t !== void 0 && i.length < t) t -= i.length;
      else {
        if (o.nodeType === 1) return _b(o, t, !1);
        if (o.nodeType === 3)
          return { node: o, offset: t ?? o.nodeValue.length };
      }
    n += a;
  }
  return { node: e, offset: e.childNodes.length };
}
function Bx({ document: e, target: t, clickCount: r, node: n, offset: a }) {
  if (Lq(t)) return;
  let o = it(t),
    i = String(o ? lt(t) : t.textContent),
    [l, u] = n ? [a, a] : kx(i, a, r);
  if (o)
    return (
      xr(t, { anchorOffset: l ?? i.length, focusOffset: u ?? i.length }),
      { node: t, start: l ?? 0, end: u ?? i.length }
    );
  {
    let { node: c, offset: s } = hi({ target: t, node: n, offset: l }),
      { node: d, offset: p } = hi({ target: t, node: n, offset: u }),
      f = t.ownerDocument.createRange();
    try {
      f.setStart(c, s), f.setEnd(d, p);
    } catch {
      throw new Error("The given offset is out of bounds.");
    }
    let h = e.getSelection();
    return (
      h == null || h.removeAllRanges(),
      h == null || h.addRange(f.cloneRange()),
      f
    );
  }
}
function kx(e, t, r) {
  if (r % 3 === 1 || e.length === 0) return [t, t];
  let n = t ?? e.length;
  return r % 3 === 2
    ? [
        n - e.substr(0, t).match(/(\w+|\s+|\W)?$/)[0].length,
        t === void 0 ? t : t + e.substr(t).match(/^(\w+|\s+|\W)?/)[0].length,
      ]
    : [
        n - e.substr(0, t).match(/[^\r\n]*$/)[0].length,
        t === void 0 ? t : t + e.substr(t).match(/^[^\r\n]*/)[0].length,
      ];
}
function Dx(e, { document: t, target: r, node: n, offset: a }) {
  let o = hi({ target: r, node: n, offset: a });
  if ("node" in e) {
    if (o.node === e.node) {
      let i = o.offset < e.start ? e.end : e.start,
        l = o.offset > e.end || o.offset < e.start ? o.offset : e.end;
      xr(e.node, { anchorOffset: i, focusOffset: l });
    }
  } else {
    let i = e.cloneRange(),
      l = i.comparePoint(o.node, o.offset);
    l < 0 ? i.setStart(o.node, o.offset) : l > 0 && i.setEnd(o.node, o.offset);
    let u = t.getSelection();
    u == null || u.removeAllRanges(), u == null || u.addRange(i.cloneRange());
  }
}
function Eb(e, t) {
  var r, n, a, o, i, l, u, c;
  return (
    e.target !== t.target ||
    ((r = e.coords) === null || r === void 0 ? void 0 : r.x) !==
      ((n = t.coords) === null || n === void 0 ? void 0 : n.y) ||
    ((a = e.coords) === null || a === void 0 ? void 0 : a.y) !==
      ((o = t.coords) === null || o === void 0 ? void 0 : o.y) ||
    ((i = e.caret) === null || i === void 0 ? void 0 : i.node) !==
      ((l = t.caret) === null || l === void 0 ? void 0 : l.node) ||
    ((u = e.caret) === null || u === void 0 ? void 0 : u.offset) !==
      ((c = t.caret) === null || c === void 0 ? void 0 : c.offset)
  );
}
function kt(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Fx = class {
  move(e, t) {
    let r = this.position,
      n = this.getTarget(e);
    if (((this.position = t), !Eb(r, t))) return;
    let a = this.getTarget(e),
      o = this.getEventInit("mousemove"),
      [i, l] = Hr(n, a);
    return {
      leave: () => {
        n !== a &&
          (e.dispatchUIEvent(n, "mouseout", o),
          i.forEach((u) => e.dispatchUIEvent(u, "mouseleave", o)));
      },
      enter: () => {
        n !== a &&
          (e.dispatchUIEvent(a, "mouseover", o),
          l.forEach((u) => e.dispatchUIEvent(u, "mouseenter", o)));
      },
      move: () => {
        e.dispatchUIEvent(a, "mousemove", o), this.modifySelecting(e);
      },
    };
  }
  down(e, t, r) {
    let n = this.buttons.down(t);
    if (n === void 0) return;
    let a = this.getTarget(e);
    this.buttonDownTarget[n] = a;
    let o = yt(a),
      i = this.getEventInit("mousedown", t.button);
    (o || e.dispatchUIEvent(a, "mousedown", i)) &&
      (this.startSelecting(e, i.detail), Nt(a)),
      !o &&
        Nc(t.button) === 2 &&
        e.dispatchUIEvent(
          a,
          "contextmenu",
          this.getEventInit("contextmenu", t.button, r),
        );
  }
  up(e, t, r) {
    let n = this.buttons.up(t);
    if (n === void 0) return;
    let a = this.getTarget(e);
    if (!yt(a)) {
      e.dispatchUIEvent(a, "mouseup", this.getEventInit("mouseup", t.button)),
        this.endSelecting();
      let o = Hr(this.buttonDownTarget[n], a)[2][0];
      if (o) {
        let i = this.getEventInit("click", t.button, r);
        i.detail &&
          (e.dispatchUIEvent(o, i.button === 0 ? "click" : "auxclick", i),
          i.button === 0 &&
            i.detail === 2 &&
            e.dispatchUIEvent(o, "dblclick", {
              ...this.getEventInit("dblclick", t.button),
              detail: i.detail,
            }));
      }
    }
  }
  resetClickCount() {
    this.clickCount.reset();
  }
  getEventInit(e, t, r) {
    let n = { ...this.position.coords };
    return (
      r &&
        ((n.pointerId = r.pointerId),
        (n.pointerType = r.pointerType),
        (n.isPrimary = r.isPrimary)),
      (n.button = Nc(t)),
      (n.buttons = this.buttons.getButtons()),
      e === "mousedown"
        ? (n.detail = this.clickCount.getOnDown(n.button))
        : e === "mouseup"
          ? (n.detail = this.clickCount.getOnUp(n.button))
          : (e === "click" || e === "auxclick") &&
            (n.detail = this.clickCount.incOnClick(n.button)),
      n
    );
  }
  getTarget(e) {
    var t;
    return (t = this.position.target) !== null && t !== void 0
      ? t
      : e.config.document.body;
  }
  startSelecting(e, t) {
    var r, n;
    this.selecting = Bx({
      document: e.config.document,
      target: this.getTarget(e),
      node:
        (r = this.position.caret) === null || r === void 0 ? void 0 : r.node,
      offset:
        (n = this.position.caret) === null || n === void 0 ? void 0 : n.offset,
      clickCount: t,
    });
  }
  modifySelecting(e) {
    var t, r;
    this.selecting &&
      Dx(this.selecting, {
        document: e.config.document,
        target: this.getTarget(e),
        node:
          (t = this.position.caret) === null || t === void 0 ? void 0 : t.node,
        offset:
          (r = this.position.caret) === null || r === void 0
            ? void 0
            : r.offset,
      });
  }
  endSelecting() {
    this.selecting = void 0;
  }
  constructor() {
    kt(this, "position", {}),
      kt(this, "buttons", new vb()),
      kt(this, "selecting", void 0),
      kt(this, "buttonDownTarget", {}),
      kt(
        this,
        "clickCount",
        new (class {
          incOnClick(e) {
            let t = this.down[e] === void 0 ? void 0 : Number(this.down[e]) + 1;
            return (
              (this.count =
                this.count[e] === void 0
                  ? {}
                  : { [e]: Number(this.count[e]) + 1 }),
              t
            );
          }
          getOnDown(e) {
            var t;
            this.down = {
              [e]: (t = this.count[e]) !== null && t !== void 0 ? t : 0,
            };
            var r;
            return (
              (this.count = {
                [e]: (r = this.count[e]) !== null && r !== void 0 ? r : 0,
              }),
              Number(this.count[e]) + 1
            );
          }
          getOnUp(e) {
            return this.down[e] === void 0 ? void 0 : Number(this.down[e]) + 1;
          }
          reset() {
            this.count = {};
          }
          constructor() {
            kt(this, "down", {}), kt(this, "count", {});
          }
        })(),
      );
  }
};
function na(e, t) {
  var r;
  return (
    ((r = wb(e, t)) === null || r === void 0 ? void 0 : r.pointerEvents) !==
    "none"
  );
}
function Ux(e) {
  let t = ot(e);
  for (let r = e, n = []; r != null && r.ownerDocument; r = r.parentElement) {
    n.push(r);
    let a = t.getComputedStyle(r).pointerEvents;
    if (a && !["inherit", "unset"].includes(a))
      return { pointerEvents: a, tree: n };
  }
}
var jc = Symbol("Last check for pointer-events");
function wb(e, t) {
  let r = t[jc];
  if (
    !(
      e.config.pointerEventsCheck !== dr.Never &&
      (!r ||
        (Ic(e.config.pointerEventsCheck, dr.EachApiCall) &&
          r[je.Call] !== Tn(e, je.Call)) ||
        (Ic(e.config.pointerEventsCheck, dr.EachTrigger) &&
          r[je.Trigger] !== Tn(e, je.Trigger)))
    )
  )
    return r == null ? void 0 : r.result;
  let n = Ux(t);
  return (
    (t[jc] = {
      [je.Call]: Tn(e, je.Call),
      [je.Trigger]: Tn(e, je.Trigger),
      result: n,
    }),
    n
  );
}
function Br(e, t) {
  let r = wb(e, t);
  if ((r == null ? void 0 : r.pointerEvents) === "none")
    throw new Error(
      [
        `Unable to perform pointer interaction as the element ${r.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`,
        "",
        Hx(r.tree),
      ].join(`
`),
    );
}
function Hx(e) {
  return e
    .reverse()
    .map((t, r) =>
      [
        "".padEnd(r),
        t.tagName,
        t.id && `#${t.id}`,
        t.hasAttribute("data-testid") &&
          `(testId=${t.getAttribute("data-testid")})`,
        zx(t),
        e.length > 1 &&
          r === 0 &&
          "  <-- This element declared `pointer-events: none`",
        e.length > 1 &&
          r === e.length - 1 &&
          "  <-- Asserted pointer events here",
      ]
        .filter(Boolean)
        .join(""),
    ).join(`
`);
}
function zx(e) {
  var t;
  let r;
  if (e.hasAttribute("aria-label")) r = e.getAttribute("aria-label");
  else if (e.hasAttribute("aria-labelledby")) {
    var n, a;
    r =
      (a = e.ownerDocument.getElementById(
        e.getAttribute("aria-labelledby"),
      )) === null ||
      a === void 0 ||
      (n = a.textContent) === null ||
      n === void 0
        ? void 0
        : n.trim();
  } else if (
    X(e, [
      "button",
      "input",
      "meter",
      "output",
      "progress",
      "select",
      "textarea",
    ]) &&
    !((t = e.labels) === null || t === void 0) &&
    t.length
  )
    r = Array.from(e.labels)
      .map((i) => {
        var l;
        return (l = i.textContent) === null || l === void 0 ? void 0 : l.trim();
      })
      .join("|");
  else if (X(e, "button")) {
    var o;
    r = (o = e.textContent) === null || o === void 0 ? void 0 : o.trim();
  }
  return (
    (r = r == null ? void 0 : r.replace(/\n/g, "  ")),
    Number(r == null ? void 0 : r.length) > 30 &&
      (r = `${r == null ? void 0 : r.substring(0, 29)}…`),
    r ? `(label=${r})` : ""
  );
}
function Ic(e, t) {
  return (e & t) > 0;
}
function Tt(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Lc = class {
  init(e, t) {
    this.position = t;
    let r = this.getTarget(e),
      [, n] = Hr(null, r),
      a = this.getEventInit();
    return (
      Br(e, r),
      e.dispatchUIEvent(r, "pointerover", a),
      n.forEach((o) => e.dispatchUIEvent(o, "pointerenter", a)),
      this
    );
  }
  move(e, t) {
    let r = this.position,
      n = this.getTarget(e);
    if (((this.position = t), !Eb(r, t))) return;
    let a = this.getTarget(e),
      o = this.getEventInit(),
      [i, l] = Hr(n, a);
    return {
      leave: () => {
        na(e, n) &&
          n !== a &&
          (e.dispatchUIEvent(n, "pointerout", o),
          i.forEach((u) => e.dispatchUIEvent(u, "pointerleave", o)));
      },
      enter: () => {
        Br(e, a),
          n !== a &&
            (e.dispatchUIEvent(a, "pointerover", o),
            l.forEach((u) => e.dispatchUIEvent(u, "pointerenter", o)));
      },
      move: () => {
        e.dispatchUIEvent(a, "pointermove", o);
      },
    };
  }
  down(e, t) {
    if (this.isDown) return;
    let r = this.getTarget(e);
    Br(e, r),
      (this.isDown = !0),
      (this.isPrevented = !e.dispatchUIEvent(
        r,
        "pointerdown",
        this.getEventInit(),
      ));
  }
  up(e, t) {
    if (!this.isDown) return;
    let r = this.getTarget(e);
    Br(e, r),
      (this.isDown = !1),
      e.dispatchUIEvent(r, "pointerup", this.getEventInit());
  }
  release(e) {
    let t = this.getTarget(e),
      [r] = Hr(t, null),
      n = this.getEventInit();
    na(e, t) &&
      (e.dispatchUIEvent(t, "pointerout", n),
      r.forEach((a) => e.dispatchUIEvent(a, "pointerleave", n))),
      (this.isCancelled = !0);
  }
  getTarget(e) {
    var t;
    return (t = this.position.target) !== null && t !== void 0
      ? t
      : e.config.document.body;
  }
  getEventInit() {
    return {
      ...this.position.coords,
      pointerId: this.pointerId,
      pointerType: this.pointerType,
      isPrimary: this.isPrimary,
    };
  }
  constructor({ pointerId: e, pointerType: t, isPrimary: r }) {
    Tt(this, "pointerId", void 0),
      Tt(this, "pointerType", void 0),
      Tt(this, "isPrimary", void 0),
      Tt(this, "isMultitouch", !1),
      Tt(this, "isCancelled", !1),
      Tt(this, "isDown", !1),
      Tt(this, "isPrevented", !1),
      Tt(this, "position", {}),
      (this.pointerId = e),
      (this.pointerType = t),
      (this.isPrimary = r),
      (this.isMultitouch = !r);
  }
};
function St(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Vx = class {
  isKeyPressed(e) {
    return this.devices.get(e.pointerType).isPressed(e);
  }
  async press(e, t, r) {
    let n = this.getPointerName(t),
      a =
        t.pointerType === "touch"
          ? this.pointers.new(n, t).init(e, r)
          : this.pointers.get(n);
    (a.position = r),
      a.pointerType !== "touch" && (this.mouse.position = r),
      this.devices.get(t.pointerType).addPressed(t),
      this.buttons.down(t),
      a.down(e, t),
      a.pointerType !== "touch" && !a.isPrevented && this.mouse.down(e, t, a);
  }
  async move(e, t, r) {
    let n = this.pointers.get(t),
      a = n.move(e, r),
      o =
        n.pointerType === "touch" || (n.isPrevented && n.isDown)
          ? void 0
          : this.mouse.move(e, r);
    a == null || a.leave(),
      o == null || o.leave(),
      a == null || a.enter(),
      o == null || o.enter(),
      a == null || a.move(),
      o == null || o.move();
  }
  async release(e, t, r) {
    let n = this.devices.get(t.pointerType);
    n.removePressed(t), this.buttons.up(t);
    let a = this.pointers.get(this.getPointerName(t));
    if (
      ((a.position = r),
      a.pointerType !== "touch" && (this.mouse.position = r),
      n.countPressed === 0 && a.up(e, t),
      a.pointerType === "touch" && a.release(e),
      !a.isPrevented)
    ) {
      if (a.pointerType === "touch" && !a.isMultitouch) {
        let o = this.mouse.move(e, a.position);
        o == null || o.leave(),
          o == null || o.enter(),
          o == null || o.move(),
          this.mouse.down(e, t, a);
      }
      if (!a.isMultitouch) {
        let o = this.mouse.move(e, a.position);
        o == null || o.leave(),
          o == null || o.enter(),
          o == null || o.move(),
          this.mouse.up(e, t, a);
      }
    }
  }
  getPointerName(e) {
    return e.pointerType === "touch" ? e.name : e.pointerType;
  }
  getPreviousPosition(e) {
    return this.pointers.has(e) ? this.pointers.get(e).position : void 0;
  }
  resetClickCount() {
    this.mouse.resetClickCount();
  }
  getMouseTarget(e) {
    var t;
    return (t = this.mouse.position.target) !== null && t !== void 0
      ? t
      : e.config.document.body;
  }
  setMousePosition(e) {
    (this.mouse.position = e), (this.pointers.get("mouse").position = e);
  }
  constructor(e) {
    St(this, "system", void 0),
      St(this, "mouse", void 0),
      St(this, "buttons", void 0),
      St(
        this,
        "devices",
        new (class {
          get(t) {
            var r, n, a;
            return (
              ((a = (r = this.registry)[(n = t)]) !== null && a !== void 0) ||
                (r[n] = new Lx()),
              this.registry[t]
            );
          }
          constructor() {
            St(this, "registry", {});
          }
        })(),
      ),
      St(
        this,
        "pointers",
        new (class {
          new(t, r) {
            let n =
              r.pointerType !== "touch" ||
              !Object.values(this.registry).some(
                (a) => a.pointerType === "touch" && !a.isCancelled,
              );
            return (
              n ||
                Object.values(this.registry).forEach((a) => {
                  a.pointerType === r.pointerType &&
                    !a.isCancelled &&
                    (a.isMultitouch = !0);
                }),
              (this.registry[t] = new Lc({
                pointerId: this.nextId++,
                pointerType: r.pointerType,
                isPrimary: n,
              })),
              this.registry[t]
            );
          }
          get(t) {
            if (!this.has(t))
              throw new Error(
                `Trying to access pointer "${t}" which does not exist.`,
              );
            return this.registry[t];
          }
          has(t) {
            return t in this.registry;
          }
          constructor() {
            St(this, "registry", {
              mouse: new Lc({
                pointerId: 1,
                pointerType: "mouse",
                isPrimary: !0,
              }),
            }),
              St(this, "nextId", 2);
          }
        })(),
      ),
      (this.system = e),
      (this.buttons = new vb()),
      (this.mouse = new Fx());
  }
};
function Bc(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var Cb = class {
  getUIEventModifiers() {
    return {
      altKey: this.keyboard.modifiers.Alt,
      ctrlKey: this.keyboard.modifiers.Control,
      metaKey: this.keyboard.modifiers.Meta,
      shiftKey: this.keyboard.modifiers.Shift,
      modifierAltGraph: this.keyboard.modifiers.AltGraph,
      modifierCapsLock: this.keyboard.modifiers.CapsLock,
      modifierFn: this.keyboard.modifiers.Fn,
      modifierFnLock: this.keyboard.modifiers.FnLock,
      modifierNumLock: this.keyboard.modifiers.NumLock,
      modifierScrollLock: this.keyboard.modifiers.ScrollLock,
      modifierSymbol: this.keyboard.modifiers.Symbol,
      modifierSymbolLock: this.keyboard.modifiers.SymbolLock,
    };
  }
  constructor() {
    Bc(this, "keyboard", new Mx(this)), Bc(this, "pointer", new Vx(this));
  }
};
async function Gx(e) {
  let t = [];
  return (
    this.config.skipHover || t.push({ target: e }),
    t.push({ keys: "[MouseLeft]", target: e }),
    this.pointer(t)
  );
}
async function Wx(e) {
  return this.pointer([{ target: e }, "[MouseLeft][MouseLeft]"]);
}
async function Kx(e) {
  return this.pointer([{ target: e }, "[MouseLeft][MouseLeft][MouseLeft]"]);
}
async function Yx(e) {
  return this.pointer({ target: e });
}
async function Jx(e) {
  return (
    Br(this, this.system.pointer.getMouseTarget(this)),
    this.pointer({ target: e.ownerDocument.body })
  );
}
async function Xx({ shift: e } = {}) {
  return this.keyboard(
    e === !0
      ? "{Shift>}{Tab}{/Shift}"
      : e === !1
        ? "[/ShiftLeft][/ShiftRight]{Tab}"
        : "{Tab}",
  );
}
function Qx(e, t) {
  let r = [];
  do {
    let {
      type: a,
      descriptor: o,
      consumedLength: i,
      releasePrevious: l,
      releaseSelf: u = !0,
      repeat: c,
    } = ab(t, "keyboard");
    var n;
    let s =
      (n = e.find((d) => {
        if (a === "[") {
          var p;
          return (
            ((p = d.code) === null || p === void 0
              ? void 0
              : p.toLowerCase()) === o.toLowerCase()
          );
        } else if (a === "{") {
          var f;
          return (
            ((f = d.key) === null || f === void 0
              ? void 0
              : f.toLowerCase()) === o.toLowerCase()
          );
        }
        return d.key === o;
      })) !== null && n !== void 0
        ? n
        : { key: "Unknown", code: "Unknown", [a === "[" ? "code" : "key"]: o };
    r.push({ keyDef: s, releasePrevious: l, releaseSelf: u, repeat: c }),
      (t = t.slice(i));
  } while (t);
  return r;
}
async function Zx(e) {
  let t = Qx(this.config.keyboardMap, e);
  for (let r = 0; r < t.length; r++)
    await Pr(this.config), await eM(this, t[r]);
}
async function eM(
  e,
  { keyDef: t, releasePrevious: r, releaseSelf: n, repeat: a },
) {
  let { system: o } = e;
  if ((o.keyboard.isKeyPressed(t) && (await o.keyboard.keyup(e, t)), !r)) {
    for (let i = 1; i <= a; i++)
      await o.keyboard.keydown(e, t), i < a && (await Pr(e.config));
    n && (await o.keyboard.keyup(e, t));
  }
}
async function tM(e) {
  for (let t of e.system.keyboard.getPressedKeys())
    await e.system.keyboard.keyup(e, t);
}
function Rb(e) {
  let t = it(e)
      ? { "text/plain": rM(e) }
      : { "text/plain": String(e.ownerDocument.getSelection()) },
    r = Vl(ot(e));
  for (let n in t) t[n] && r.setData(n, t[n]);
  return r;
}
function rM(e) {
  let t = sn(e);
  return lt(e).substring(t.startOffset, t.endOffset);
}
async function nM() {
  let e = this.config.document;
  var t;
  let r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body,
    n = Rb(r);
  if (n.items.length !== 0)
    return (
      this.dispatchUIEvent(r, "copy", { clipboardData: n }) &&
        this.config.writeToClipboard &&
        (await tb(e, n)),
      n
    );
}
async function aM() {
  let e = this.config.document;
  var t;
  let r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body,
    n = Rb(r);
  if (n.items.length !== 0)
    return (
      this.dispatchUIEvent(r, "cut", { clipboardData: n }) &&
        this.config.writeToClipboard &&
        (await tb(r.ownerDocument, n)),
      n
    );
}
async function oM(e) {
  let t = this.config.document;
  var r;
  let n = (r = t.activeElement) !== null && r !== void 0 ? r : t.body;
  var a;
  let o =
    (a = typeof e == "string" ? iM(t, e) : e) !== null && a !== void 0
      ? a
      : await Oq(t).catch(() => {
          throw new Error(
            "`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.",
          );
        });
  this.dispatchUIEvent(n, "paste", { clipboardData: o });
}
function iM(e, t) {
  let r = Vl(ot(e));
  return r.setData("text", t), r;
}
function kc(e, t) {
  let r = [];
  do {
    let {
        descriptor: n,
        consumedLength: a,
        releasePrevious: o,
        releaseSelf: i = !0,
      } = ab(t, "pointer"),
      l = e.find((u) => u.name === n);
    l && r.push({ keyDef: l, releasePrevious: o, releaseSelf: i }),
      (t = t.slice(a));
  } while (t);
  return r;
}
async function lM(e) {
  let { pointerMap: t } = this.config,
    r = [];
  (Array.isArray(e) ? e : [e]).forEach((n) => {
    typeof n == "string"
      ? r.push(...kc(t, n))
      : "keys" in n
        ? r.push(...kc(t, n.keys).map((a) => ({ ...n, ...a })))
        : r.push(n);
  });
  for (let n = 0; n < r.length; n++)
    await Pr(this.config), await sM(this, r[n]);
  this.system.pointer.resetClickCount();
}
async function sM(e, t) {
  var r, n;
  let a =
      "pointerName" in t && t.pointerName
        ? t.pointerName
        : "keyDef" in t
          ? e.system.pointer.getPointerName(t.keyDef)
          : "mouse",
    o = e.system.pointer.getPreviousPosition(a);
  var i, l, u, c;
  let s = {
    target: (i = t.target) !== null && i !== void 0 ? i : uM(e, o),
    coords:
      (l = t.coords) !== null && l !== void 0
        ? l
        : o == null
          ? void 0
          : o.coords,
    caret: {
      node:
        (u = t.node) !== null && u !== void 0
          ? u
          : Dc(t) || o == null || (r = o.caret) === null || r === void 0
            ? void 0
            : r.node,
      offset:
        (c = t.offset) !== null && c !== void 0
          ? c
          : Dc(t) || o == null || (n = o.caret) === null || n === void 0
            ? void 0
            : n.offset,
    },
  };
  "keyDef" in t
    ? (e.system.pointer.isKeyPressed(t.keyDef) &&
        (Ir(e, je.Trigger), await e.system.pointer.release(e, t.keyDef, s)),
      t.releasePrevious ||
        (Ir(e, je.Trigger),
        await e.system.pointer.press(e, t.keyDef, s),
        t.releaseSelf &&
          (Ir(e, je.Trigger), await e.system.pointer.release(e, t.keyDef, s))))
    : (Ir(e, je.Trigger), await e.system.pointer.move(e, a, s));
}
function Dc(e) {
  var t, r;
  return !!((r = (t = e.target) !== null && t !== void 0 ? t : e.node) !==
    null && r !== void 0
    ? r
    : e.offset !== void 0);
}
function uM(e, t) {
  if (!t)
    throw new Error(
      "This pointer has no previous position. Provide a target property!",
    );
  var r;
  return (r = t.target) !== null && r !== void 0 ? r : e.config.document.body;
}
async function cM(e) {
  if (!Cr(e) || yt(e))
    throw new Error("clear()` is only supported on editable elements.");
  if ((Nt(e), e.ownerDocument.activeElement !== e))
    throw new Error("The element to be cleared could not be focused.");
  if ((pb(e), !ux(e)))
    throw new Error("The element content to be cleared could not be selected.");
  Sr(this, e, "", "deleteContentBackward");
}
async function dM(e, t) {
  return Tb.call(this, !0, e, t);
}
async function fM(e, t) {
  return Tb.call(this, !1, e, t);
}
async function Tb(e, t, r) {
  if (!e && !t.multiple)
    throw Z().getElementError(
      "Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.",
      t,
    );
  let n = Array.isArray(r) ? r : [r],
    a = Array.from(t.querySelectorAll('option, [role="option"]')),
    o = n
      .map((l) => {
        if (typeof l != "string" && a.includes(l)) return l;
        {
          let u = a.find((c) => c.value === l || c.innerHTML === l);
          if (u) return u;
          throw Z().getElementError(
            `Value "${String(l)}" not found in options`,
            t,
          );
        }
      })
      .filter((l) => !yt(l));
  if (yt(t) || !o.length) return;
  let i = (l) => {
    (l.selected = e),
      this.dispatchUIEvent(t, "input", {
        bubbles: !0,
        cancelable: !1,
        composed: !0,
      }),
      this.dispatchUIEvent(t, "change");
  };
  if (X(t, "select"))
    if (t.multiple)
      for (let l of o) {
        let u = this.config.pointerEventsCheck === 0 ? !0 : na(this, l);
        u &&
          (this.dispatchUIEvent(l, "pointerover"),
          this.dispatchUIEvent(t, "pointerenter"),
          this.dispatchUIEvent(l, "mouseover"),
          this.dispatchUIEvent(t, "mouseenter"),
          this.dispatchUIEvent(l, "pointermove"),
          this.dispatchUIEvent(l, "mousemove"),
          this.dispatchUIEvent(l, "pointerdown"),
          this.dispatchUIEvent(l, "mousedown")),
          Nt(t),
          u &&
            (this.dispatchUIEvent(l, "pointerup"),
            this.dispatchUIEvent(l, "mouseup")),
          i(l),
          u && this.dispatchUIEvent(l, "click"),
          await Pr(this.config);
      }
    else if (o.length === 1) {
      let l = this.config.pointerEventsCheck === 0 ? !0 : na(this, t);
      l ? await this.click(t) : Nt(t),
        i(o[0]),
        l &&
          (this.dispatchUIEvent(t, "pointerover"),
          this.dispatchUIEvent(t, "pointerenter"),
          this.dispatchUIEvent(t, "mouseover"),
          this.dispatchUIEvent(t, "mouseenter"),
          this.dispatchUIEvent(t, "pointerup"),
          this.dispatchUIEvent(t, "mouseup"),
          this.dispatchUIEvent(t, "click")),
        await Pr(this.config);
    } else
      throw Z().getElementError(
        "Cannot select multiple options on a non-multiple select",
        t,
      );
  else if (t.getAttribute("role") === "listbox")
    for (let l of o) await this.click(l), await this.unhover(l);
  else
    throw Z().getElementError(
      "Cannot select options on elements that are neither select nor listbox elements",
      t,
    );
}
async function pM(
  e,
  t,
  {
    skipClick: r = this.config.skipClick,
    skipAutoClose: n = this.config.skipAutoClose,
    initialSelectionStart: a,
    initialSelectionEnd: o,
  } = {},
) {
  e.disabled ||
    (r || (await this.click(e)),
    a !== void 0 && Lr(e, a, o ?? a),
    await this.keyboard(t),
    n || (await tM(this)));
}
var Fc = Symbol("files and value properties are mocked");
function co(e, t, r) {
  r ? Object.defineProperty(e, t, r) : delete e[t];
}
function hM(e, t) {
  var r;
  (r = e[Fc]) === null || r === void 0 || r.restore();
  let n = Object.getOwnPropertyDescriptor(e, "type"),
    a = Object.getOwnPropertyDescriptor(e, "value"),
    o = Object.getOwnPropertyDescriptor(e, "files");
  function i() {
    co(e, "type", n), co(e, "value", a), co(e, "files", o);
  }
  (e[Fc] = { restore: i }),
    Object.defineProperties(e, {
      files: { configurable: !0, get: () => t },
      value: {
        configurable: !0,
        get: () => (t.length ? `C:\\fakepath\\${t[0].name}` : ""),
        set(l) {
          if (l === "") i();
          else {
            var u;
            a == null || (u = a.set) === null || u === void 0 || u.call(e, l);
          }
        },
      },
      type: {
        configurable: !0,
        get: () => "file",
        set(l) {
          l !== "file" && (i(), (e.type = l));
        },
      },
    });
}
async function mM(e, t) {
  let r = X(e, "label") ? e.control : e;
  if (!r || !X(r, "input", { type: "file" }))
    throw new TypeError(
      `The ${r === e ? "given" : "associated"} ${r == null ? void 0 : r.tagName} element does not accept file uploads`,
    );
  if (yt(e)) return;
  let n = (Array.isArray(t) ? t : [t])
      .filter((o) => !this.config.applyAccept || bM(o, r.accept))
      .slice(0, r.multiple ? void 0 : 1),
    a = () => {
      var o;
      (n.length ===
        ((o = r.files) === null || o === void 0 ? void 0 : o.length) &&
        n.every((i, l) => {
          var u;
          return (
            i === ((u = r.files) === null || u === void 0 ? void 0 : u.item(l))
          );
        })) ||
        (hM(r, zl(ot(e), n)),
        this.dispatchUIEvent(r, "input"),
        this.dispatchUIEvent(r, "change"));
    };
  r.addEventListener("fileDialog", a),
    await this.click(e),
    r.removeEventListener("fileDialog", a);
}
function bM(e, t) {
  if (!t) return !0;
  let r = ["audio/*", "image/*", "video/*"];
  return t
    .split(",")
    .some((n) =>
      n.startsWith(".")
        ? e.name.endsWith(n)
        : r.includes(n)
          ? e.type.startsWith(n.substr(0, n.length - 1))
          : e.type === n,
    );
}
var Uc = {
  click: Gx,
  dblClick: Wx,
  tripleClick: Kx,
  hover: Yx,
  unhover: Jx,
  tab: Xx,
  keyboard: Zx,
  copy: nM,
  cut: aM,
  paste: oM,
  pointer: lM,
  clear: cM,
  deselectOptions: fM,
  selectOptions: dM,
  type: pM,
  upload: mM,
};
function gM(e) {
  return Z().asyncWrapper(e);
}
var Sb = {
    applyAccept: !0,
    autoModify: !0,
    delay: 0,
    document: globalThis.document,
    keyboardMap: $x,
    pointerMap: Nx,
    pointerEventsCheck: dr.EachApiCall,
    skipAutoClose: !1,
    skipClick: !1,
    skipHover: !1,
    writeToClipboard: !1,
    advanceTimers: () => Promise.resolve(),
  },
  yM = { ...Sb, writeToClipboard: !0 };
function Pb(e = {}, t = yM, r) {
  let n = wM(e, r, t);
  return { ...t, ...e, document: n };
}
function vM(e = {}) {
  let t = Pb(e);
  yb(t.document);
  var r;
  let n =
    (r = t.document.defaultView) !== null && r !== void 0
      ? r
      : globalThis.window;
  return Tq(n), Jl(t).api;
}
function $e({ keyboardState: e, pointerState: t, ...r } = {}, n) {
  let a = Pb(r, Sb, n);
  yb(a.document);
  var o;
  let i = (o = t ?? e) !== null && o !== void 0 ? o : new Cb();
  return { api: Jl(a, i).api, system: i };
}
function _M(e) {
  return Jl({ ...this.config, ...e }, this.system).api;
}
function EM(e, t) {
  function r(...n) {
    return (
      Ir(e, je.Call),
      gM(() => t.apply(e, n).then(async (a) => (await Pr(e.config), a)))
    );
  }
  return Object.defineProperty(r, "name", { get: () => t.name }), r;
}
function Jl(e, t = new Cb()) {
  let r = {};
  return (
    Object.assign(r, {
      config: e,
      dispatchEvent: gb.bind(r),
      dispatchUIEvent: wx.bind(r),
      system: t,
      levelRefs: {},
      ...Uc,
    }),
    {
      instance: r,
      api: {
        ...Object.fromEntries(
          Object.entries(Uc).map(([n, a]) => [n, EM(r, a)]),
        ),
        setup: _M.bind(r),
      },
    }
  );
}
function wM(e, t, r) {
  var n, a;
  return (a = (n = e.document) !== null && n !== void 0 ? n : t && Ox(t)) !==
    null && a !== void 0
    ? a
    : r.document;
}
var Ob = {};
Ai(Ob, {
  clear: () => CM,
  click: () => RM,
  copy: () => TM,
  cut: () => SM,
  dblClick: () => PM,
  deselectOptions: () => OM,
  hover: () => AM,
  keyboard: () => qM,
  paste: () => MM,
  pointer: () => xM,
  selectOptions: () => $M,
  tab: () => BM,
  tripleClick: () => NM,
  type: () => jM,
  unhover: () => IM,
  upload: () => LM,
});
function CM(e) {
  return $e().api.clear(e);
}
function RM(e, t = {}) {
  return $e(t, e).api.click(e);
}
function TM(e = {}) {
  return $e(e).api.copy();
}
function SM(e = {}) {
  return $e(e).api.cut();
}
function PM(e, t = {}) {
  return $e(t).api.dblClick(e);
}
function OM(e, t, r = {}) {
  return $e(r).api.deselectOptions(e, t);
}
function AM(e, t = {}) {
  return $e(t).api.hover(e);
}
async function qM(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return r.keyboard(e).then(() => n);
}
async function xM(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return r.pointer(e).then(() => n);
}
function MM(e, t) {
  return $e(t).api.paste(e);
}
function $M(e, t, r = {}) {
  return $e(r).api.selectOptions(e, t);
}
function NM(e, t = {}) {
  return $e(t).api.tripleClick(e);
}
function jM(e, t, r = {}) {
  return $e(r, e).api.type(e, t, r);
}
function IM(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return n.pointer.setMousePosition({ target: e }), r.unhover(e);
}
function LM(e, t, r = {}) {
  return $e(r).api.upload(e, t);
}
function BM(e = {}) {
  return $e().api.tab(e);
}
var kM = { ...Ob, setup: vM };
function DM(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = Array.from(typeof e == "string" ? [e] : e);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a = n.reduce(function (l, u) {
    var c = u.match(/\n([\t ]+|(?!\s).)/g);
    return c
      ? l.concat(
          c.map(function (s) {
            var d, p;
            return (p =
              (d = s.match(/[\t ]/g)) === null || d === void 0
                ? void 0
                : d.length) !== null && p !== void 0
              ? p
              : 0;
          }),
        )
      : l;
  }, []);
  if (a.length) {
    var o = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, a) +
        "}",
      "g",
    );
    n = n.map(function (l) {
      return l.replace(
        o,
        `
`,
      );
    });
  }
  n[0] = n[0].replace(/^\r?\n/, "");
  var i = n[0];
  return (
    t.forEach(function (l, u) {
      var c = i.match(/(?:^|\n)( *)$/),
        s = c ? c[1] : "",
        d = l;
      typeof l == "string" &&
        l.includes(`
`) &&
        (d = String(l)
          .split(
            `
`,
          )
          .map(function (p, f) {
            return f === 0 ? p : "" + s + p;
          }).join(`
`)),
        (i += d + n[u + 1]);
    }),
    i
  );
}
var FM = DM,
  mi = Pi(
    { ...Rh },
    {
      intercept: (e, t) =>
        t[0] === "fireEvent" || e.startsWith("find") || e.startsWith("waitFor"),
    },
  );
mi.screen = new Proxy(mi.screen, {
  get(e, t, r) {
    return (
      a_.warn(FM`
          You are using Testing Library's \`screen\` object. Use \`within(canvasElement)\` instead.
          More info: https://storybook.js.org/docs/essentials/interactions
        `),
      Reflect.get(e, t, r)
    );
  },
});
var {
    buildQueries: XM,
    configure: QM,
    createEvent: ZM,
    fireEvent: e$,
    findAllByAltText: t$,
    findAllByDisplayValue: r$,
    findAllByLabelText: n$,
    findAllByPlaceholderText: a$,
    findAllByRole: o$,
    findAllByTestId: i$,
    findAllByText: l$,
    findAllByTitle: s$,
    findByAltText: u$,
    findByDisplayValue: c$,
    findByLabelText: d$,
    findByPlaceholderText: f$,
    findByRole: p$,
    findByTestId: h$,
    findByText: m$,
    findByTitle: b$,
    getAllByAltText: g$,
    getAllByDisplayValue: y$,
    getAllByLabelText: v$,
    getAllByPlaceholderText: _$,
    getAllByRole: E$,
    getAllByTestId: w$,
    getAllByText: C$,
    getAllByTitle: R$,
    getByAltText: T$,
    getByDisplayValue: S$,
    getByLabelText: P$,
    getByPlaceholderText: O$,
    getByRole: A$,
    getByTestId: q$,
    getByText: x$,
    getByTitle: M$,
    getConfig: $$,
    getDefaultNormalizer: N$,
    getElementError: j$,
    getNodeText: I$,
    getQueriesForElement: L$,
    getRoles: B$,
    getSuggestedQuery: k$,
    isInaccessible: D$,
    logDOM: F$,
    logRoles: U$,
    prettyDOM: H$,
    queries: z$,
    queryAllByAltText: V$,
    queryAllByAttribute: G$,
    queryAllByDisplayValue: W$,
    queryAllByLabelText: K$,
    queryAllByPlaceholderText: Y$,
    queryAllByRole: J$,
    queryAllByTestId: X$,
    queryAllByText: Q$,
    queryAllByTitle: Z$,
    queryByAltText: eN,
    queryByAttribute: tN,
    queryByDisplayValue: rN,
    queryByLabelText: nN,
    queryByPlaceholderText: aN,
    queryByRole: oN,
    queryByTestId: iN,
    queryByText: lN,
    queryByTitle: sN,
    queryHelpers: uN,
    screen: cN,
    waitFor: dN,
    waitForElementToBeRemoved: fN,
    within: UM,
    prettyFormat: pN,
  } = mi,
  { userEvent: hN } = Pi({ userEvent: kM }, { intercept: !0 }),
  { expect: mN } = Pi(
    { expect: Ch },
    {
      getKeys: (e, t) => {
        let r = ["assert", "__methods", "__flags", "_obj"];
        if (e.constructor === P) {
          let n = Object.keys(Object.getPrototypeOf(e)).filter(
            (a) => !r.includes(a),
          );
          return t > 2 ? n : [...n, "not"];
        }
        return Object.keys(e);
      },
      intercept: (e) => e !== "expect",
    },
  ),
  HM = ({ parameters: e }) => {
    var t, r, n;
    ((t = e == null ? void 0 : e.test) == null ? void 0 : t.mockReset) === !0
      ? fO()
      : ((r = e == null ? void 0 : e.test) == null ? void 0 : r.clearMocks) ===
          !0
        ? dO()
        : ((n = e == null ? void 0 : e.test) == null
            ? void 0
            : n.restoreMocks) !== !1 && pO();
  },
  bi = (e, t = 0, r) => {
    var n;
    if (t > 5 || e == null) return e;
    if (ph(e)) return r && e.mockName(r), e;
    if (
      typeof e == "function" &&
      "isAction" in e &&
      e.isAction &&
      !("implicit" in e && e.implicit)
    ) {
      let a = uO(e);
      return r && a.mockName(r), a;
    }
    if (Array.isArray(e)) return t++, e.map((a) => bi(a, t));
    if (typeof e == "object" && e.constructor === Object) {
      t++;
      for (let [a, o] of Object.entries(e))
        (n = Object.getOwnPropertyDescriptor(e, a)) != null &&
          n.writable &&
          (e[a] = bi(o, t, a));
      return e;
    }
    return e;
  },
  zM = ({ initialArgs: e }) => {
    bi(e);
  },
  VM = (e) => {
    globalThis.HTMLElement &&
      e.canvasElement instanceof globalThis.HTMLElement &&
      (e.canvas = UM(e.canvasElement));
  };
Sd.__STORYBOOK_TEST_LOADERS__ = [HM, zM, VM];
Sd.__STORYBOOK_TEST_ON_MOCK_CALL__ = sO;
export { mN as e, uO as f, Pi as i, hN as u, UM as w };
