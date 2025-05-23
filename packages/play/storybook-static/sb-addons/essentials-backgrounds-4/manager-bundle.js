try {
  (() => {
    var re = Object.create;
    var Y = Object.defineProperty;
    var ce = Object.getOwnPropertyDescriptor;
    var ie = Object.getOwnPropertyNames;
    var ae = Object.getPrototypeOf,
      le = Object.prototype.hasOwnProperty;
    var E = ((e) =>
      typeof require < "u"
        ? require
        : typeof Proxy < "u"
          ? new Proxy(e, {
              get: (o, a) => (typeof require < "u" ? require : o)[a],
            })
          : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var M = (e, o) => () => (e && (o = e((e = 0))), o);
    var se = (e, o) => () => (
      o || e((o = { exports: {} }).exports, o), o.exports
    );
    var ue = (e, o, a, r) => {
      if ((o && typeof o == "object") || typeof o == "function")
        for (let c of ie(o))
          !le.call(e, c) &&
            c !== a &&
            Y(e, c, {
              get: () => o[c],
              enumerable: !(r = ce(o, c)) || r.enumerable,
            });
      return e;
    };
    var Ie = (e, o, a) => (
      (a = e != null ? re(ae(e)) : {}),
      ue(
        o || !e || !e.__esModule
          ? Y(a, "default", { value: e, enumerable: !0 })
          : a,
        e,
      )
    );
    var p = M(() => {});
    var h = M(() => {});
    var f = M(() => {});
    var X = se((Q, V) => {
      p();
      h();
      f();
      (function (e) {
        if (typeof Q == "object" && typeof V < "u") V.exports = e();
        else if (typeof define == "function" && define.amd) define([], e);
        else {
          var o;
          typeof window < "u" || typeof window < "u"
            ? (o = window)
            : typeof self < "u"
              ? (o = self)
              : (o = this),
            (o.memoizerific = e());
        }
      })(function () {
        var e, o, a;
        return (function r(c, d, l) {
          function t(i, I) {
            if (!d[i]) {
              if (!c[i]) {
                var s = typeof E == "function" && E;
                if (!I && s) return s(i, !0);
                if (n) return n(i, !0);
                var C = new Error("Cannot find module '" + i + "'");
                throw ((C.code = "MODULE_NOT_FOUND"), C);
              }
              var m = (d[i] = { exports: {} });
              c[i][0].call(
                m.exports,
                function (b) {
                  var y = c[i][1][b];
                  return t(y || b);
                },
                m,
                m.exports,
                r,
                c,
                d,
                l,
              );
            }
            return d[i].exports;
          }
          for (var n = typeof E == "function" && E, u = 0; u < l.length; u++)
            t(l[u]);
          return t;
        })(
          {
            1: [
              function (r, c, d) {
                c.exports = function (l) {
                  if (typeof Map != "function" || l) {
                    var t = r("./similar");
                    return new t();
                  } else return new Map();
                };
              },
              { "./similar": 2 },
            ],
            2: [
              function (r, c, d) {
                function l() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                (l.prototype.get = function (t) {
                  var n;
                  if (this.lastItem && this.isEqual(this.lastItem.key, t))
                    return this.lastItem.val;
                  if (((n = this.indexOf(t)), n >= 0))
                    return (this.lastItem = this.list[n]), this.list[n].val;
                }),
                  (l.prototype.set = function (t, n) {
                    var u;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? ((this.lastItem.val = n), this)
                      : ((u = this.indexOf(t)),
                        u >= 0
                          ? ((this.lastItem = this.list[u]),
                            (this.list[u].val = n),
                            this)
                          : ((this.lastItem = { key: t, val: n }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (l.prototype.delete = function (t) {
                    var n;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, t) &&
                        (this.lastItem = void 0),
                      (n = this.indexOf(t)),
                      n >= 0)
                    )
                      return this.size--, this.list.splice(n, 1)[0];
                  }),
                  (l.prototype.has = function (t) {
                    var n;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? !0
                      : ((n = this.indexOf(t)),
                        n >= 0 ? ((this.lastItem = this.list[n]), !0) : !1);
                  }),
                  (l.prototype.forEach = function (t, n) {
                    var u;
                    for (u = 0; u < this.size; u++)
                      t.call(
                        n || this,
                        this.list[u].val,
                        this.list[u].key,
                        this,
                      );
                  }),
                  (l.prototype.indexOf = function (t) {
                    var n;
                    for (n = 0; n < this.size; n++)
                      if (this.isEqual(this.list[n].key, t)) return n;
                    return -1;
                  }),
                  (l.prototype.isEqual = function (t, n) {
                    return t === n || (t !== t && n !== n);
                  }),
                  (c.exports = l);
              },
              {},
            ],
            3: [
              function (r, c, d) {
                var l = r("map-or-similar");
                c.exports = function (i) {
                  var I = new l(!1),
                    s = [];
                  return function (C) {
                    var m = function () {
                      var b = I,
                        y,
                        R,
                        _ = arguments.length - 1,
                        x = Array(_ + 1),
                        O = !0,
                        A;
                      if ((m.numArgs || m.numArgs === 0) && m.numArgs !== _ + 1)
                        throw new Error(
                          "Memoizerific functions should always be called with the same number of arguments",
                        );
                      for (A = 0; A < _; A++) {
                        if (
                          ((x[A] = { cacheItem: b, arg: arguments[A] }),
                          b.has(arguments[A]))
                        ) {
                          b = b.get(arguments[A]);
                          continue;
                        }
                        (O = !1),
                          (y = new l(!1)),
                          b.set(arguments[A], y),
                          (b = y);
                      }
                      return (
                        O &&
                          (b.has(arguments[_])
                            ? (R = b.get(arguments[_]))
                            : (O = !1)),
                        O ||
                          ((R = C.apply(null, arguments)),
                          b.set(arguments[_], R)),
                        i > 0 &&
                          ((x[_] = { cacheItem: b, arg: arguments[_] }),
                          O ? t(s, x) : s.push(x),
                          s.length > i && n(s.shift())),
                        (m.wasMemoized = O),
                        (m.numArgs = _ + 1),
                        R
                      );
                    };
                    return (
                      (m.limit = i),
                      (m.wasMemoized = !1),
                      (m.cache = I),
                      (m.lru = s),
                      m
                    );
                  };
                };
                function t(i, I) {
                  var s = i.length,
                    C = I.length,
                    m,
                    b,
                    y;
                  for (b = 0; b < s; b++) {
                    for (m = !0, y = 0; y < C; y++)
                      if (!u(i[b][y].arg, I[y].arg)) {
                        m = !1;
                        break;
                      }
                    if (m) break;
                  }
                  i.push(i.splice(b, 1)[0]);
                }
                function n(i) {
                  var I = i.length,
                    s = i[I - 1],
                    C,
                    m;
                  for (
                    s.cacheItem.delete(s.arg), m = I - 2;
                    m >= 0 &&
                    ((s = i[m]), (C = s.cacheItem.get(s.arg)), !C || !C.size);
                    m--
                  )
                    s.cacheItem.delete(s.arg);
                }
                function u(i, I) {
                  return i === I || (i !== i && I !== I);
                }
              },
              { "map-or-similar": 1 },
            ],
          },
          {},
          [3],
        )(3);
      });
    });
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    var g = __REACT__,
      {
        Children: Ee,
        Component: we,
        Fragment: D,
        Profiler: Be,
        PureComponent: Re,
        StrictMode: xe,
        Suspense: Le,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Pe,
        cloneElement: Me,
        createContext: De,
        createElement: Ge,
        createFactory: Fe,
        createRef: Ne,
        forwardRef: Ue,
        isValidElement: He,
        lazy: qe,
        memo: w,
        startTransition: ze,
        unstable_act: Ke,
        useCallback: G,
        useContext: Ve,
        useDebugValue: We,
        useDeferredValue: Ye,
        useEffect: je,
        useId: $e,
        useImperativeHandle: Ze,
        useInsertionEffect: Je,
        useLayoutEffect: Qe,
        useMemo: j,
        useReducer: Xe,
        useRef: eo,
        useState: F,
        useSyncExternalStore: oo,
        useTransition: no,
        version: to,
      } = __REACT__;
    p();
    h();
    f();
    var lo = __STORYBOOK_API__,
      {
        ActiveTabs: so,
        Consumer: uo,
        ManagerContext: Io,
        Provider: mo,
        RequestResponseError: po,
        addons: N,
        combineParameters: ho,
        controlOrMetaKey: fo,
        controlOrMetaSymbol: go,
        eventMatchesShortcut: bo,
        eventToShortcut: Co,
        experimental_requestResponse: yo,
        isMacLike: So,
        isShortcutTaken: ko,
        keyToSymbol: vo,
        merge: To,
        mockChannel: _o,
        optionOrAltSymbol: Ao,
        shortcutMatchesShortcut: Oo,
        shortcutToHumanString: Eo,
        types: $,
        useAddonState: wo,
        useArgTypes: Bo,
        useArgs: Ro,
        useChannel: xo,
        useGlobalTypes: Lo,
        useGlobals: L,
        useParameter: P,
        useSharedState: Po,
        useStoryPrepared: Mo,
        useStorybookApi: Do,
        useStorybookState: Go,
      } = __STORYBOOK_API__;
    p();
    h();
    f();
    var qo = __STORYBOOK_COMPONENTS__,
      {
        A: zo,
        ActionBar: Ko,
        AddonPanel: Vo,
        Badge: Wo,
        Bar: Yo,
        Blockquote: jo,
        Button: $o,
        ClipboardCode: Zo,
        Code: Jo,
        DL: Qo,
        Div: Xo,
        DocumentWrapper: en,
        EmptyTabContent: on,
        ErrorFormatter: nn,
        FlexBar: tn,
        Form: rn,
        H1: cn,
        H2: an,
        H3: ln,
        H4: sn,
        H5: un,
        H6: In,
        HR: dn,
        IconButton: B,
        IconButtonSkeleton: mn,
        Icons: pn,
        Img: hn,
        LI: fn,
        Link: gn,
        ListItem: bn,
        Loader: Cn,
        Modal: yn,
        OL: Sn,
        P: kn,
        Placeholder: vn,
        Pre: Tn,
        ResetWrapper: _n,
        ScrollArea: An,
        Separator: On,
        Spaced: En,
        Span: wn,
        StorybookIcon: Bn,
        StorybookLogo: Rn,
        Symbols: xn,
        SyntaxHighlighter: Ln,
        TT: Pn,
        TabBar: Mn,
        TabButton: Dn,
        TabWrapper: Gn,
        Table: Fn,
        Tabs: Nn,
        TabsState: Un,
        TooltipLinkList: U,
        TooltipMessage: Hn,
        TooltipNote: qn,
        UL: zn,
        WithTooltip: H,
        WithTooltipPure: Kn,
        Zoom: Vn,
        codeCommon: Wn,
        components: Yn,
        createCopyToClipboardFunction: jn,
        getStoryHref: $n,
        icons: Zn,
        interleaveSeparators: Jn,
        nameSpaceClassNames: Qn,
        resetComponents: Xn,
        withReset: et,
      } = __STORYBOOK_COMPONENTS__;
    p();
    h();
    f();
    var ct = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: it,
        AccessibilityIcon: at,
        AddIcon: lt,
        AdminIcon: st,
        AlertAltIcon: ut,
        AlertIcon: It,
        AlignLeftIcon: dt,
        AlignRightIcon: mt,
        AppleIcon: pt,
        ArrowBottomLeftIcon: ht,
        ArrowBottomRightIcon: ft,
        ArrowDownIcon: gt,
        ArrowLeftIcon: bt,
        ArrowRightIcon: Ct,
        ArrowSolidDownIcon: yt,
        ArrowSolidLeftIcon: St,
        ArrowSolidRightIcon: kt,
        ArrowSolidUpIcon: vt,
        ArrowTopLeftIcon: Tt,
        ArrowTopRightIcon: _t,
        ArrowUpIcon: At,
        AzureDevOpsIcon: Ot,
        BackIcon: Et,
        BasketIcon: wt,
        BatchAcceptIcon: Bt,
        BatchDenyIcon: Rt,
        BeakerIcon: xt,
        BellIcon: Lt,
        BitbucketIcon: Pt,
        BoldIcon: Mt,
        BookIcon: Dt,
        BookmarkHollowIcon: Gt,
        BookmarkIcon: Ft,
        BottomBarIcon: Nt,
        BottomBarToggleIcon: Ut,
        BoxIcon: Ht,
        BranchIcon: qt,
        BrowserIcon: zt,
        ButtonIcon: Kt,
        CPUIcon: Vt,
        CalendarIcon: Wt,
        CameraIcon: Yt,
        CategoryIcon: jt,
        CertificateIcon: $t,
        ChangedIcon: Zt,
        ChatIcon: Jt,
        CheckIcon: Qt,
        ChevronDownIcon: Xt,
        ChevronLeftIcon: er,
        ChevronRightIcon: or,
        ChevronSmallDownIcon: nr,
        ChevronSmallLeftIcon: tr,
        ChevronSmallRightIcon: rr,
        ChevronSmallUpIcon: cr,
        ChevronUpIcon: ir,
        ChromaticIcon: ar,
        ChromeIcon: lr,
        CircleHollowIcon: sr,
        CircleIcon: Z,
        ClearIcon: ur,
        CloseAltIcon: Ir,
        CloseIcon: dr,
        CloudHollowIcon: mr,
        CloudIcon: pr,
        CogIcon: hr,
        CollapseIcon: fr,
        CommandIcon: gr,
        CommentAddIcon: br,
        CommentIcon: Cr,
        CommentsIcon: yr,
        CommitIcon: Sr,
        CompassIcon: kr,
        ComponentDrivenIcon: vr,
        ComponentIcon: Tr,
        ContrastIcon: _r,
        ControlsIcon: Ar,
        CopyIcon: Or,
        CreditIcon: Er,
        CrossIcon: wr,
        DashboardIcon: Br,
        DatabaseIcon: Rr,
        DeleteIcon: xr,
        DiamondIcon: Lr,
        DirectionIcon: Pr,
        DiscordIcon: Mr,
        DocChartIcon: Dr,
        DocListIcon: Gr,
        DocumentIcon: Fr,
        DownloadIcon: Nr,
        DragIcon: Ur,
        EditIcon: Hr,
        EllipsisIcon: qr,
        EmailIcon: zr,
        ExpandAltIcon: Kr,
        ExpandIcon: Vr,
        EyeCloseIcon: Wr,
        EyeIcon: Yr,
        FaceHappyIcon: jr,
        FaceNeutralIcon: $r,
        FaceSadIcon: Zr,
        FacebookIcon: Jr,
        FailedIcon: Qr,
        FastForwardIcon: Xr,
        FigmaIcon: ec,
        FilterIcon: oc,
        FlagIcon: nc,
        FolderIcon: tc,
        FormIcon: rc,
        GDriveIcon: cc,
        GithubIcon: ic,
        GitlabIcon: ac,
        GlobeIcon: lc,
        GoogleIcon: sc,
        GraphBarIcon: uc,
        GraphLineIcon: Ic,
        GraphqlIcon: dc,
        GridAltIcon: mc,
        GridIcon: q,
        GrowIcon: pc,
        HeartHollowIcon: hc,
        HeartIcon: fc,
        HomeIcon: gc,
        HourglassIcon: bc,
        InfoIcon: Cc,
        ItalicIcon: yc,
        JumpToIcon: Sc,
        KeyIcon: kc,
        LightningIcon: vc,
        LightningOffIcon: Tc,
        LinkBrokenIcon: _c,
        LinkIcon: Ac,
        LinkedinIcon: Oc,
        LinuxIcon: Ec,
        ListOrderedIcon: wc,
        ListUnorderedIcon: Bc,
        LocationIcon: Rc,
        LockIcon: xc,
        MarkdownIcon: Lc,
        MarkupIcon: Pc,
        MediumIcon: Mc,
        MemoryIcon: Dc,
        MenuIcon: Gc,
        MergeIcon: Fc,
        MirrorIcon: Nc,
        MobileIcon: Uc,
        MoonIcon: Hc,
        NutIcon: qc,
        OutboxIcon: zc,
        OutlineIcon: Kc,
        PaintBrushIcon: Vc,
        PaperClipIcon: Wc,
        ParagraphIcon: Yc,
        PassedIcon: jc,
        PhoneIcon: $c,
        PhotoDragIcon: Zc,
        PhotoIcon: z,
        PinAltIcon: Jc,
        PinIcon: Qc,
        PlayAllHollowIcon: Xc,
        PlayBackIcon: ei,
        PlayHollowIcon: oi,
        PlayIcon: ni,
        PlayNextIcon: ti,
        PlusIcon: ri,
        PointerDefaultIcon: ci,
        PointerHandIcon: ii,
        PowerIcon: ai,
        PrintIcon: li,
        ProceedIcon: si,
        ProfileIcon: ui,
        PullRequestIcon: Ii,
        QuestionIcon: di,
        RSSIcon: mi,
        RedirectIcon: pi,
        ReduxIcon: hi,
        RefreshIcon: J,
        ReplyIcon: fi,
        RepoIcon: gi,
        RequestChangeIcon: bi,
        RewindIcon: Ci,
        RulerIcon: yi,
        SaveIcon: Si,
        SearchIcon: ki,
        ShareAltIcon: vi,
        ShareIcon: Ti,
        ShieldIcon: _i,
        SideBySideIcon: Ai,
        SidebarAltIcon: Oi,
        SidebarAltToggleIcon: Ei,
        SidebarIcon: wi,
        SidebarToggleIcon: Bi,
        SpeakerIcon: Ri,
        StackedIcon: xi,
        StarHollowIcon: Li,
        StarIcon: Pi,
        StatusFailIcon: Mi,
        StatusPassIcon: Di,
        StatusWarnIcon: Gi,
        StickerIcon: Fi,
        StopAltHollowIcon: Ni,
        StopAltIcon: Ui,
        StopIcon: Hi,
        StorybookIcon: qi,
        StructureIcon: zi,
        SubtractIcon: Ki,
        SunIcon: Vi,
        SupportIcon: Wi,
        SwitchAltIcon: Yi,
        SyncIcon: ji,
        TabletIcon: $i,
        ThumbsUpIcon: Zi,
        TimeIcon: Ji,
        TimerIcon: Qi,
        TransferIcon: Xi,
        TrashIcon: ea,
        TwitterIcon: oa,
        TypeIcon: na,
        UbuntuIcon: ta,
        UndoIcon: ra,
        UnfoldIcon: ca,
        UnlockIcon: ia,
        UnpinIcon: aa,
        UploadIcon: la,
        UserAddIcon: sa,
        UserAltIcon: ua,
        UserIcon: Ia,
        UsersIcon: da,
        VSCodeIcon: ma,
        VerifiedIcon: pa,
        VideoIcon: ha,
        WandIcon: fa,
        WatchIcon: ga,
        WindowsIcon: ba,
        WrenchIcon: Ca,
        XIcon: ya,
        YoutubeIcon: Sa,
        ZoomIcon: ka,
        ZoomOutIcon: va,
        ZoomResetIcon: Ta,
        iconList: _a,
      } = __STORYBOOK_ICONS__;
    p();
    h();
    f();
    var Ba = __STORYBOOK_CLIENT_LOGGER__,
      {
        deprecate: Ra,
        logger: K,
        once: xa,
        pretty: La,
      } = __STORYBOOK_CLIENT_LOGGER__;
    var W = Ie(X());
    p();
    h();
    f();
    var qa = __STORYBOOK_THEMING__,
      {
        CacheProvider: za,
        ClassNames: Ka,
        Global: Va,
        ThemeProvider: Wa,
        background: Ya,
        color: ja,
        convert: $a,
        create: Za,
        createCache: Ja,
        createGlobal: Qa,
        createReset: Xa,
        css: el,
        darken: ol,
        ensure: nl,
        ignoreSsrWarning: tl,
        isPropValid: rl,
        jsx: cl,
        keyframes: il,
        lighten: al,
        styled: ee,
        themes: ll,
        typography: sl,
        useTheme: ul,
        withTheme: Il,
      } = __STORYBOOK_THEMING__;
    p();
    h();
    f();
    function oe(e) {
      for (var o = [], a = 1; a < arguments.length; a++)
        o[a - 1] = arguments[a];
      var r = Array.from(typeof e == "string" ? [e] : e);
      r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var c = r.reduce(function (t, n) {
        var u = n.match(/\n([\t ]+|(?!\s).)/g);
        return u
          ? t.concat(
              u.map(function (i) {
                var I, s;
                return (s =
                  (I = i.match(/[\t ]/g)) === null || I === void 0
                    ? void 0
                    : I.length) !== null && s !== void 0
                  ? s
                  : 0;
              }),
            )
          : t;
      }, []);
      if (c.length) {
        var d = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, c) +
            "}",
          "g",
        );
        r = r.map(function (t) {
          return t.replace(
            d,
            `
`,
          );
        });
      }
      r[0] = r[0].replace(/^\r?\n/, "");
      var l = r[0];
      return (
        o.forEach(function (t, n) {
          var u = l.match(/(?:^|\n)( *)$/),
            i = u ? u[1] : "",
            I = t;
          typeof t == "string" &&
            t.includes(`
`) &&
            (I = String(t)
              .split(
                `
`,
              )
              .map(function (s, C) {
                return C === 0 ? s : "" + i + s;
              }).join(`
`)),
            (l += I + r[n + 1]);
        }),
        l
      );
    }
    var ne = "storybook/background",
      S = "backgrounds",
      de = {
        light: { name: "light", value: "#F8F8F8" },
        dark: { name: "dark", value: "#333" },
      },
      me = w(function () {
        let e = P(S),
          [o, a, r] = L(),
          [c, d] = F(!1),
          { options: l = de, disable: t = !0 } = e || {};
        if (t) return null;
        let n = o[S] || {},
          u = n.value,
          i = n.grid || !1,
          I = l[u],
          s = !!r?.[S],
          C = Object.keys(l).length;
        return g.createElement(pe, {
          length: C,
          backgroundMap: l,
          item: I,
          updateGlobals: a,
          backgroundName: u,
          setIsTooltipVisible: d,
          isLocked: s,
          isGridActive: i,
          isTooltipVisible: c,
        });
      }),
      pe = w(function (e) {
        let {
            item: o,
            length: a,
            updateGlobals: r,
            setIsTooltipVisible: c,
            backgroundMap: d,
            backgroundName: l,
            isLocked: t,
            isGridActive: n,
            isTooltipVisible: u,
          } = e,
          i = G(
            (I) => {
              r({ [S]: I });
            },
            [r],
          );
        return g.createElement(
          D,
          null,
          g.createElement(
            B,
            {
              key: "grid",
              active: n,
              disabled: t,
              title: "Apply a grid to the preview",
              onClick: () => i({ value: l, grid: !n }),
            },
            g.createElement(q, null),
          ),
          a > 0
            ? g.createElement(
                H,
                {
                  key: "background",
                  placement: "top",
                  closeOnOutsideClick: !0,
                  tooltip: ({ onHide: I }) =>
                    g.createElement(U, {
                      links: [
                        ...(o
                          ? [
                              {
                                id: "reset",
                                title: "Reset background",
                                icon: g.createElement(J, null),
                                onClick: () => {
                                  i({ value: void 0, grid: n }), I();
                                },
                              },
                            ]
                          : []),
                        ...Object.entries(d).map(([s, C]) => ({
                          id: s,
                          title: C.name,
                          icon: g.createElement(Z, {
                            color: C?.value || "grey",
                          }),
                          active: s === l,
                          onClick: () => {
                            i({ value: s, grid: n }), I();
                          },
                        })),
                      ],
                    }),
                  onVisibleChange: c,
                },
                g.createElement(
                  B,
                  {
                    disabled: t,
                    key: "background",
                    title: "Change the background of the preview",
                    active: !!o || u,
                  },
                  g.createElement(z, null),
                ),
              )
            : null,
        );
      }),
      he = ee.span(
        ({ background: e }) => ({
          borderRadius: "1rem",
          display: "block",
          height: "1rem",
          width: "1rem",
          background: e,
        }),
        ({ theme: e }) => ({
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
        }),
      ),
      fe = (e, o = [], a) => {
        if (e === "transparent") return "transparent";
        if (o.find((c) => c.value === e) || e) return e;
        let r = o.find((c) => c.name === a);
        if (r) return r.value;
        if (a) {
          let c = o.map((d) => d.name).join(", ");
          K.warn(oe`
        Backgrounds Addon: could not find the default color "${a}".
        These are the available colors for your story based on your configuration:
        ${c}.
      `);
        }
        return "transparent";
      },
      te = (0, W.default)(1e3)((e, o, a, r, c, d) => ({
        id: e || o,
        title: o,
        onClick: () => {
          c({ selected: a, name: o });
        },
        value: a,
        right: r ? g.createElement(he, { background: a }) : void 0,
        active: d,
      })),
      ge = (0, W.default)(10)((e, o, a) => {
        let r = e.map(({ name: c, value: d }) =>
          te(null, c, d, !0, a, d === o),
        );
        return o !== "transparent"
          ? [te("reset", "Clear background", "transparent", null, a, !1), ...r]
          : r;
      }),
      be = { default: null, disable: !0, values: [] },
      Ce = w(function () {
        let e = P(S, be),
          [o, a] = F(!1),
          [r, c] = L(),
          d = r[S]?.value,
          l = j(() => fe(d, e.values, e.default), [e, d]);
        Array.isArray(e) &&
          K.warn(
            "Addon Backgrounds api has changed in Storybook 6.0. Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md",
          );
        let t = G(
          (n) => {
            c({ [S]: { ...r[S], value: n } });
          },
          [e, r, c],
        );
        return e.disable
          ? null
          : g.createElement(
              H,
              {
                placement: "top",
                closeOnOutsideClick: !0,
                tooltip: ({ onHide: n }) =>
                  g.createElement(U, {
                    links: ge(e.values, l, ({ selected: u }) => {
                      l !== u && t(u), n();
                    }),
                  }),
                onVisibleChange: a,
              },
              g.createElement(
                B,
                {
                  key: "background",
                  title: "Change the background of the preview",
                  active: l !== "transparent" || o,
                },
                g.createElement(z, null),
              ),
            );
      }),
      ye = w(function () {
        let [e, o] = L(),
          { grid: a } = P(S, { grid: { disable: !1 } });
        if (a?.disable) return null;
        let r = e[S]?.grid || !1;
        return g.createElement(
          B,
          {
            key: "background",
            active: r,
            title: "Apply a grid to the preview",
            onClick: () => o({ [S]: { ...e[S], grid: !r } }),
          },
          g.createElement(q, null),
        );
      });
    N.register(ne, () => {
      N.add(ne, {
        title: "Backgrounds",
        type: $.TOOL,
        match: ({ viewMode: e, tabId: o }) =>
          !!(e && e.match(/^(story|docs)$/)) && !o,
        render: () =>
          FEATURES?.backgroundsStoryGlobals
            ? g.createElement(me, null)
            : g.createElement(
                D,
                null,
                g.createElement(Ce, null),
                g.createElement(ye, null),
              ),
      });
    });
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
