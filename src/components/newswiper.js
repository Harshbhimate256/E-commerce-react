const Swiper = (function () { 
    "use strict";
    function e(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function t(s, a) {
      void 0 === s && (s = {}),
        void 0 === a && (a = {}),
        Object.keys(a).forEach((i) => {
          void 0 === s[i]
            ? (s[i] = a[i])
            : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]);
        });
    }
    const s = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function a() {
      const e = "undefined" != typeof document ? document : {};
      return t(e, s), e;
    }
    const i = {
      document: s,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function r() {
      const e = "undefined" != typeof window ? window : {};
      return t(e, i), e;
    }
    function n(e) {
      return (
        void 0 === e && (e = ""),
        e
          .trim()
          .split(" ")
          .filter((e) => !!e.trim())
      );
    }
    function l(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function o() {
      return Date.now();
    }
    function d(e, t) {
      void 0 === t && (t = "x");
      const s = r();
      let a, i, n;
      const l = (function (e) {
        const t = r();
        let s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
      return (
        s.WebKitCSSMatrix
          ? ((i = l.transform || l.webkitTransform),
            i.split(",").length > 6 &&
              (i = i
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
          : ((n =
              l.MozTransform ||
              l.OTransform ||
              l.MsTransform ||
              l.msTransform ||
              l.transform ||
              l
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (a = n.toString().split(","))),
        "x" === t &&
          (i = s.WebKitCSSMatrix
            ? n.m41
            : 16 === a.length
            ? parseFloat(a[12])
            : parseFloat(a[4])),
        "y" === t &&
          (i = s.WebKitCSSMatrix
            ? n.m42
            : 16 === a.length
            ? parseFloat(a[13])
            : parseFloat(a[5])),
        i || 0
      );
    }
    function c(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function p() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let a = 1; a < arguments.length; a += 1) {
        const i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
        if (
          null != i &&
          ((s = i),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? s instanceof HTMLElement
            : s && (1 === s.nodeType || 11 === s.nodeType)))
        ) {
          const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, a = s.length; t < a; t += 1) {
            const a = s[t],
              r = Object.getOwnPropertyDescriptor(i, a);
            void 0 !== r &&
              r.enumerable &&
              (c(e[a]) && c(i[a])
                ? i[a].__swiper__
                  ? (e[a] = i[a])
                  : p(e[a], i[a])
                : !c(e[a]) && c(i[a])
                ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : p(e[a], i[a]))
                : (e[a] = i[a]));
          }
        }
      }
      var s;
      return e;
    }
    function u(e, t, s) {
      e.style.setProperty(t, s);
    }
    function m(e) {
      let { swiper: t, targetPosition: s, side: a } = e;
      const i = r(),
        n = -t.translate;
      let l,
        o = null;
      const d = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        i.cancelAnimationFrame(t.cssModeFrameID);
      const c = s > n ? "next" : "prev",
        p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
        u = () => {
          (l = new Date().getTime()), null === o && (o = l);
          const e = Math.max(Math.min((l - o) / d, 1), 0),
            r = 0.5 - Math.cos(e * Math.PI) / 2;
          let c = n + r * (s - n);
          if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [a]: c });
              }),
              void i.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = i.requestAnimationFrame(u);
        };
      u();
    }
    function h(e) {
      return (
        e.querySelector(".swiper-slide-transform") ||
        (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
        e
      );
    }
    function f(e, t) {
      return (
        void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
      );
    }
    function g(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function v(e, t) {
      void 0 === t && (t = []);
      const s = document.createElement(e);
      return s.classList.add(...(Array.isArray(t) ? t : n(t))), s;
    }
    function w(e) {
      const t = r(),
        s = a(),
        i = e.getBoundingClientRect(),
        n = s.body,
        l = e.clientTop || n.clientTop || 0,
        o = e.clientLeft || n.clientLeft || 0,
        d = e === t ? t.scrollY : e.scrollTop,
        c = e === t ? t.scrollX : e.scrollLeft;
      return { top: i.top + d - l, left: i.left + c - o };
    }
    function b(e, t) {
      return r().getComputedStyle(e, null).getPropertyValue(t);
    }
    function y(e) {
      let t,
        s = e;
      if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
          1 === s.nodeType && (t += 1);
        return t;
      }
    }
    function E(e, t) {
      const s = [];
      let a = e.parentElement;
      for (; a; )
        t ? a.matches(t) && s.push(a) : s.push(a), (a = a.parentElement);
      return s;
    }
    function x(e, t) {
      t &&
        e.addEventListener("transitionend", function s(a) {
          a.target === e &&
            (t.call(e, a), e.removeEventListener("transitionend", s));
        });
    }
    function S(e, t, s) {
      const a = r();
      return s
        ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              a
                .getComputedStyle(e, null)
                .getPropertyValue("width" === t ? "margin-right" : "margin-top")
            ) +
            parseFloat(
              a
                .getComputedStyle(e, null)
                .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
            )
        : e.offsetWidth;
    }
    function T(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    let M, C, P;
    function L() {
      return (
        M ||
          (M = (function () {
            const e = r(),
              t = a();
            return {
              smoothScroll:
                t.documentElement &&
                t.documentElement.style &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
            };
          })()),
        M
      );
    }
    function I(e) {
      return (
        void 0 === e && (e = {}),
        C ||
          (C = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = L(),
              a = r(),
              i = a.navigator.platform,
              n = t || a.navigator.userAgent,
              l = { ios: !1, android: !1 },
              o = a.screen.width,
              d = a.screen.height,
              c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let p = n.match(/(iPad).*OS\s([\d_]+)/);
            const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
              m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              h = "Win32" === i;
            let f = "MacIntel" === i;
            return (
              !p &&
                f &&
                s.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${o}x${d}`) >= 0 &&
                ((p = n.match(/(Version)\/([\d.]+)/)),
                p || (p = [0, 1, "13_0_0"]),
                (f = !1)),
              c && !h && ((l.os = "android"), (l.android = !0)),
              (p || m || u) && ((l.os = "ios"), (l.ios = !0)),
              l
            );
          })(e)),
        C
      );
    }
    function A() {
      return (
        P ||
          (P = (function () {
            const e = r(),
              t = I();
            let s = !1;
            function a() {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            }
            if (a()) {
              const t = String(e.navigator.userAgent);
              if (t.includes("Version/")) {
                const [e, a] = t
                  .split("Version/")[1]
                  .split(" ")[0]
                  .split(".")
                  .map((e) => Number(e));
                s = e < 16 || (16 === e && a < 2);
              }
            }
            const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
              n = a();
            return {
              isSafari: s || n,
              needPerspectiveFix: s,
              need3dFix: n || (i && t.ios),
              isWebView: i,
            };
          })()),
        P
      );
    }
    var z = {
      on(e, t, s) {
        const a = this;
        if (!a.eventsListeners || a.destroyed) return a;
        if ("function" != typeof t) return a;
        const i = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            a.eventsListeners[e] || (a.eventsListeners[e] = []),
              a.eventsListeners[e][i](t);
          }),
          a
        );
      },
      once(e, t, s) {
        const a = this;
        if (!a.eventsListeners || a.destroyed) return a;
        if ("function" != typeof t) return a;
        function i() {
          a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
          for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
            r[n] = arguments[n];
          t.apply(a, r);
        }
        return (i.__emitterProxy = t), a.on(e, i, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const a = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((a, i) => {
                    (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(i, 1);
                  });
            }),
            s)
          : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, s, a;
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
          r[n] = arguments[n];
        "string" == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
          : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
          s.unshift(a);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(a, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(a, s);
                });
          }),
          e
        );
      },
    };
    const $ = (e, t) => {
        if (!e || e.destroyed || !e.params) return;
        const s = t.closest(
          e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
        );
        if (s) {
          let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
          !t &&
            e.isElement &&
            (s.shadowRoot
              ? (t = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                ))
              : requestAnimationFrame(() => {
                  s.shadowRoot &&
                    ((t = s.shadowRoot.querySelector(
                      `.${e.params.lazyPreloaderClass}`
                    )),
                    t && t.remove());
                })),
            t && t.remove();
        }
      },
      k = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
      },
      O = (e) => {
        if (!e || e.destroyed || !e.params) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const a =
            "auto" === e.params.slidesPerView
              ? e.slidesPerViewDynamic()
              : Math.ceil(e.params.slidesPerView),
          i = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
          const s = i,
            r = [s - t];
          return (
            r.push(...Array.from({ length: t }).map((e, t) => s + a + t)),
            void e.slides.forEach((t, s) => {
              r.includes(t.column) && k(e, s);
            })
          );
        }
        const r = i + a - 1;
        if (e.params.rewind || e.params.loop)
          for (let a = i - t; a <= r + t; a += 1) {
            const t = ((a % s) + s) % s;
            (t < i || t > r) && k(e, t);
          }
        else
          for (let a = Math.max(i - t, 0); a <= Math.min(r + t, s - 1); a += 1)
            a !== i && (a > r || a < i) && k(e, a);
      };
    var D = {
      updateSize: function () {
        const e = this;
        let t, s;
        const a = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : a.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : a.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(b(a, "padding-left") || 0, 10) -
              parseInt(b(a, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(b(a, "padding-top") || 0, 10) -
              parseInt(b(a, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t, s) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
        }
        const s = e.params,
          {
            wrapperEl: a,
            slidesEl: i,
            size: r,
            rtlTranslate: n,
            wrongRTL: l,
          } = e,
          o = e.virtual && s.virtual.enabled,
          d = o ? e.virtual.slides.length : e.slides.length,
          c = f(i, `.${e.params.slideClass}, swiper-slide`),
          p = o ? e.virtual.slides.length : c.length;
        let m = [];
        const h = [],
          g = [];
        let v = s.slidesOffsetBefore;
        "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
        let w = s.slidesOffsetAfter;
        "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
        const y = e.snapGrid.length,
          E = e.slidesGrid.length;
        let x = s.spaceBetween,
          T = -v,
          M = 0,
          C = 0;
        if (void 0 === r) return;
        "string" == typeof x && x.indexOf("%") >= 0
          ? (x = (parseFloat(x.replace("%", "")) / 100) * r)
          : "string" == typeof x && (x = parseFloat(x)),
          (e.virtualSize = -x),
          c.forEach((e) => {
            n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          s.centeredSlides &&
            s.cssMode &&
            (u(a, "--swiper-centered-offset-before", ""),
            u(a, "--swiper-centered-offset-after", ""));
        const P = s.grid && s.grid.rows > 1 && e.grid;
        let L;
        P ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
        const I =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView
          ).length > 0;
        for (let a = 0; a < p; a += 1) {
          let i;
          if (
            ((L = 0),
            c[a] && (i = c[a]),
            P && e.grid.updateSlide(a, i, c),
            !c[a] || "none" !== b(i, "display"))
          ) {
            if ("auto" === s.slidesPerView) {
              I && (c[a].style[e.getDirectionLabel("width")] = "");
              const r = getComputedStyle(i),
                n = i.style.transform,
                l = i.style.webkitTransform;
              if (
                (n && (i.style.transform = "none"),
                l && (i.style.webkitTransform = "none"),
                s.roundLengths)
              )
                L = e.isHorizontal() ? S(i, "width", !0) : S(i, "height", !0);
              else {
                const e = t(r, "width"),
                  s = t(r, "padding-left"),
                  a = t(r, "padding-right"),
                  n = t(r, "margin-left"),
                  l = t(r, "margin-right"),
                  o = r.getPropertyValue("box-sizing");
                if (o && "border-box" === o) L = e + n + l;
                else {
                  const { clientWidth: t, offsetWidth: r } = i;
                  L = e + s + a + n + l + (r - t);
                }
              }
              n && (i.style.transform = n),
                l && (i.style.webkitTransform = l),
                s.roundLengths && (L = Math.floor(L));
            } else
              (L = (r - (s.slidesPerView - 1) * x) / s.slidesPerView),
                s.roundLengths && (L = Math.floor(L)),
                c[a] && (c[a].style[e.getDirectionLabel("width")] = `${L}px`);
            c[a] && (c[a].swiperSlideSize = L),
              g.push(L),
              s.centeredSlides
                ? ((T = T + L / 2 + M / 2 + x),
                  0 === M && 0 !== a && (T = T - r / 2 - x),
                  0 === a && (T = T - r / 2 - x),
                  Math.abs(T) < 0.001 && (T = 0),
                  s.roundLengths && (T = Math.floor(T)),
                  C % s.slidesPerGroup == 0 && m.push(T),
                  h.push(T))
                : (s.roundLengths && (T = Math.floor(T)),
                  (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                    e.params.slidesPerGroup ==
                    0 && m.push(T),
                  h.push(T),
                  (T = T + L + x)),
              (e.virtualSize += L + x),
              (M = L),
              (C += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + w),
          n &&
            l &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (a.style.width = `${e.virtualSize + x}px`),
          s.setWrapperSize &&
            (a.style[e.getDirectionLabel("width")] = `${e.virtualSize + x}px`),
          P && e.grid.updateWrapperSize(L, m),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let a = 0; a < m.length; a += 1) {
            let i = m[a];
            s.roundLengths && (i = Math.floor(i)),
              m[a] <= e.virtualSize - r && t.push(i);
          }
          (m = t),
            Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 &&
              m.push(e.virtualSize - r);
        }
        if (o && s.loop) {
          const t = g[0] + x;
          if (s.slidesPerGroup > 1) {
            const a = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  s.slidesPerGroup
              ),
              i = t * s.slidesPerGroup;
            for (let e = 0; e < a; e += 1) m.push(m[m.length - 1] + i);
          }
          for (
            let a = 0;
            a < e.virtual.slidesBefore + e.virtual.slidesAfter;
            a += 1
          )
            1 === s.slidesPerGroup && m.push(m[m.length - 1] + t),
              h.push(h[h.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === m.length && (m = [0]), 0 !== x)) {
          const t =
            e.isHorizontal() && n
              ? "marginLeft"
              : e.getDirectionLabel("marginRight");
          c.filter(
            (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1
          ).forEach((e) => {
            e.style[t] = `${x}px`;
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          g.forEach((t) => {
            e += t + (x || 0);
          }),
            (e -= x);
          const t = e - r;
          m = m.map((e) => (e <= 0 ? -v : e > t ? t + w : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (g.forEach((t) => {
              e += t + (x || 0);
            }),
            (e -= x),
            e < r)
          ) {
            const t = (r - e) / 2;
            m.forEach((e, s) => {
              m[s] = e - t;
            }),
              h.forEach((e, s) => {
                h[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: m,
            slidesGrid: h,
            slidesSizesGrid: g,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          u(a, "--swiper-centered-offset-before", -m[0] + "px"),
            u(
              a,
              "--swiper-centered-offset-after",
              e.size / 2 - g[g.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (p !== d && e.emit("slidesLengthChange"),
          m.length !== y &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== E && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          e.emit("slidesUpdated"),
          !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            a = e.el.classList.contains(t);
          p <= s.maxBackfaceHiddenSlides
            ? a || e.el.classList.add(t)
            : a && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          a = t.virtual && t.params.virtual.enabled;
        let i,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const n = (e) => (a ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
              const e = t.activeIndex + i;
              if (e > t.slides.length && !a) break;
              s.push(n(e));
            }
        else s.push(n(t.activeIndex));
        for (i = 0; i < s.length; i += 1)
          if (void 0 !== s[i]) {
            const e = s[i].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let a = 0; a < t.length; a += 1)
          t[a].swiperSlideOffset =
            (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) -
            s -
            e.cssOverflowAdjustment();
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: a, rtlTranslate: i, snapGrid: r } = t;
        if (0 === a.length) return;
        void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
        let n = -e;
        i && (n = e),
          a.forEach((e) => {
            e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
          }),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        let l = s.spaceBetween;
        "string" == typeof l && l.indexOf("%") >= 0
          ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
          : "string" == typeof l && (l = parseFloat(l));
        for (let e = 0; e < a.length; e += 1) {
          const o = a[e];
          let d = o.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (d -= a[0].swiperSlideOffset);
          const c =
              (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (o.swiperSlideSize + l),
            p =
              (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (o.swiperSlideSize + l),
            u = -(n - d),
            m = u + t.slidesSizesGrid[e],
            h = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
          ((u >= 0 && u < t.size - 1) ||
            (m > 1 && m <= t.size) ||
            (u <= 0 && m >= t.size)) &&
            (t.visibleSlides.push(o),
            t.visibleSlidesIndexes.push(e),
            a[e].classList.add(s.slideVisibleClass)),
            h && a[e].classList.add(s.slideFullyVisibleClass),
            (o.progress = i ? -c : c),
            (o.originalProgress = i ? -p : p);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          a = t.maxTranslate() - t.minTranslate();
        let { progress: i, isBeginning: r, isEnd: n, progressLoop: l } = t;
        const o = r,
          d = n;
        if (0 === a) (i = 0), (r = !0), (n = !0);
        else {
          i = (e - t.minTranslate()) / a;
          const s = Math.abs(e - t.minTranslate()) < 1,
            l = Math.abs(e - t.maxTranslate()) < 1;
          (r = s || i <= 0), (n = l || i >= 1), s && (i = 0), l && (i = 1);
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            a = t.getSlideIndexByData(t.slides.length - 1),
            i = t.slidesGrid[s],
            r = t.slidesGrid[a],
            n = t.slidesGrid[t.slidesGrid.length - 1],
            o = Math.abs(e);
          (l = o >= i ? (o - i) / n : (o + n - r) / n), l > 1 && (l -= 1);
        }
        Object.assign(t, {
          progress: i,
          progressLoop: l,
          isBeginning: r,
          isEnd: n,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !o && t.emit("reachBeginning toEdge"),
          n && !d && t.emit("reachEnd toEdge"),
          ((o && !r) || (d && !n)) && t.emit("fromEdge"),
          t.emit("progress", i);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: a, activeIndex: i } = e,
          r = e.virtual && s.virtual.enabled,
          n = e.grid && s.grid && s.grid.rows > 1,
          l = (e) => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let o, d, c;
        if (
          (t.forEach((e) => {
            e.classList.remove(
              s.slideActiveClass,
              s.slideNextClass,
              s.slidePrevClass
            );
          }),
          r)
        )
          if (s.loop) {
            let t = i - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (o = l(`[data-swiper-slide-index="${t}"]`));
          } else o = l(`[data-swiper-slide-index="${i}"]`);
        else
          n
            ? ((o = t.filter((e) => e.column === i)[0]),
              (c = t.filter((e) => e.column === i + 1)[0]),
              (d = t.filter((e) => e.column === i - 1)[0]))
            : (o = t[i]);
        o &&
          (o.classList.add(s.slideActiveClass),
          n
            ? (c && c.classList.add(s.slideNextClass),
              d && d.classList.add(s.slidePrevClass))
            : ((c = (function (e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                  const a = e.nextElementSibling;
                  t ? a.matches(t) && s.push(a) : s.push(a), (e = a);
                }
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && !c && (c = t[0]),
              c && c.classList.add(s.slideNextClass),
              (d = (function (e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                  const a = e.previousElementSibling;
                  t ? a.matches(t) && s.push(a) : s.push(a), (e = a);
                }
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && 0 === !d && (d = t[t.length - 1]),
              d && d.classList.add(s.slidePrevClass))),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: a,
            params: i,
            activeIndex: r,
            realIndex: n,
            snapIndex: l,
          } = t;
        let o,
          d = e;
        const c = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
              const { slidesGrid: t, params: s } = e,
                a = e.rtlTranslate ? e.translate : -e.translate;
              let i;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? a >= t[e] && a < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (i = e)
                    : a >= t[e] && a < t[e + 1] && (i = e + 1)
                  : a >= t[e] && (i = e);
              return (
                s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i
              );
            })(t)),
          a.indexOf(s) >= 0)
        )
          o = a.indexOf(s);
        else {
          const e = Math.min(i.slidesPerGroupSkip, d);
          o = e + Math.floor((d - e) / i.slidesPerGroup);
        }
        if ((o >= a.length && (o = a.length - 1), d === r && !t.params.loop))
          return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
        if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
          return void (t.realIndex = c(d));
        const p = t.grid && i.grid && i.grid.rows > 1;
        let u;
        if (t.virtual && i.virtual.enabled && i.loop) u = c(d);
        else if (p) {
          const e = t.slides.filter((e) => e.column === d)[0];
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (u = Math.floor(s / i.grid.rows));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          u = e ? parseInt(e, 10) : d;
        } else u = d;
        Object.assign(t, {
          previousSnapIndex: l,
          snapIndex: o,
          previousRealIndex: n,
          realIndex: u,
          previousIndex: r,
          activeIndex: d,
        }),
          t.initialized && O(t),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            (n !== u && t.emit("realIndexChange"), t.emit("slideChange"));
      },
      updateClickedSlide: function (e, t) {
        const s = this,
          a = s.params;
        let i = e.closest(`.${a.slideClass}, swiper-slide`);
        !i &&
          s.isElement &&
          t &&
          t.length > 1 &&
          t.includes(e) &&
          [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
            !i &&
              e.matches &&
              e.matches(`.${a.slideClass}, swiper-slide`) &&
              (i = e);
          });
        let r,
          n = !1;
        if (i)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === i) {
              (n = !0), (r = e);
              break;
            }
        if (!i || !n)
          return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
        (s.clickedSlide = i),
          s.virtual && s.params.virtual.enabled
            ? (s.clickedIndex = parseInt(
                i.getAttribute("data-swiper-slide-index"),
                10
              ))
            : (s.clickedIndex = r),
          a.slideToClickedSlide &&
            void 0 !== s.clickedIndex &&
            s.clickedIndex !== s.activeIndex &&
            s.slideToClickedSlide();
      },
    };
    var G = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const { params: t, rtlTranslate: s, translate: a, wrapperEl: i } = this;
        if (t.virtualTranslate) return s ? -a : a;
        if (t.cssMode) return a;
        let r = d(i, e);
        return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: a, params: i, wrapperEl: r, progress: n } = s;
        let l,
          o = 0,
          d = 0;
        s.isHorizontal() ? (o = a ? -e : e) : (d = e),
          i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? o : d),
          i.cssMode
            ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
                ? -o
                : -d)
            : i.virtualTranslate ||
              (s.isHorizontal()
                ? (o -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
        const c = s.maxTranslate() - s.minTranslate();
        (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
          l !== n && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, a, i) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === a && (a = !0);
        const r = this,
          { params: n, wrapperEl: l } = r;
        if (r.animating && n.preventInteractionOnTransition) return !1;
        const o = r.minTranslate(),
          d = r.maxTranslate();
        let c;
        if (
          ((c = a && e > o ? o : a && e < d ? d : e),
          r.updateProgress(c),
          n.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!r.support.smoothScroll)
              return (
                m({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
              );
            l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, i),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.wrapperEl.removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      s && r.emit("transitionEnd"));
                  }),
                r.wrapperEl.addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function N(e) {
      let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
      const { activeIndex: r, previousIndex: n } = t;
      let l = a;
      if (
        (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
        t.emit(`transition${i}`),
        s && r !== n)
      ) {
        if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
        t.emit(`slideChangeTransition${i}`),
          "next" === l
            ? t.emit(`slideNextTransition${i}`)
            : t.emit(`slidePrevTransition${i}`);
      }
    }
    var H = {
      slideTo: function (e, t, s, a, i) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e && (e = parseInt(e, 10));
        const r = this;
        let n = e;
        n < 0 && (n = 0);
        const {
          params: l,
          snapGrid: o,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: u,
          wrapperEl: h,
          enabled: f,
        } = r;
        if (
          (r.animating && l.preventInteractionOnTransition) ||
          (!f && !a && !i) ||
          r.destroyed
        )
          return !1;
        const g = Math.min(r.params.slidesPerGroupSkip, n);
        let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
        v >= o.length && (v = o.length - 1);
        const w = -o[v];
        if (l.normalizeSlideIndex)
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * w),
              s = Math.floor(100 * d[e]),
              a = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= s && t < a - (a - s) / 2
                ? (n = e)
                : t >= s && t < a && (n = e + 1)
              : t >= s && (n = e);
          }
        if (r.initialized && n !== p) {
          if (
            !r.allowSlideNext &&
            (u
              ? w > r.translate && w > r.minTranslate()
              : w < r.translate && w < r.minTranslate())
          )
            return !1;
          if (
            !r.allowSlidePrev &&
            w > r.translate &&
            w > r.maxTranslate() &&
            (p || 0) !== n
          )
            return !1;
        }
        let b;
        if (
          (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
          r.updateProgress(w),
          (b = n > p ? "next" : n < p ? "prev" : "reset"),
          (u && -w === r.translate) || (!u && w === r.translate))
        )
          return (
            r.updateActiveIndex(n),
            l.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== l.effect && r.setTranslate(w),
            "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
            !1
          );
        if (l.cssMode) {
          const e = r.isHorizontal(),
            s = u ? w : -w;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
                ? ((r._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    h[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (h[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._immediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                m({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
              );
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(w),
          r.updateActiveIndex(n),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, a),
          r.transitionStart(s, b),
          0 === t
            ? r.transitionEnd(s, b)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(s, b));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, a) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e)
        ) {
          e = parseInt(e, 10);
        }
        const i = this;
        if (i.destroyed) return;
        const r = i.grid && i.params.grid && i.params.grid.rows > 1;
        let n = e;
        if (i.params.loop)
          if (i.virtual && i.params.virtual.enabled) n += i.virtual.slidesBefore;
          else {
            let e;
            if (r) {
              const t = n * i.params.grid.rows;
              e = i.slides.filter(
                (e) => 1 * e.getAttribute("data-swiper-slide-index") === t
              )[0].column;
            } else e = i.getSlideIndexByData(n);
            const t = r
                ? Math.ceil(i.slides.length / i.params.grid.rows)
                : i.slides.length,
              { centeredSlides: s } = i.params;
            let a = i.params.slidesPerView;
            "auto" === a
              ? (a = i.slidesPerViewDynamic())
              : ((a = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
                s && a % 2 == 0 && (a += 1));
            let l = t - e < a;
            if ((s && (l = l || e < Math.ceil(a / 2)), l)) {
              const a = s
                ? e < i.activeIndex
                  ? "prev"
                  : "next"
                : e - i.activeIndex - 1 < i.params.slidesPerView
                ? "next"
                : "prev";
              i.loopFix({
                direction: a,
                slideTo: !0,
                activeSlideIndex: "next" === a ? e + 1 : e - t + 1,
                slideRealIndex: "next" === a ? i.realIndex : void 0,
              });
            }
            if (r) {
              const e = n * i.params.grid.rows;
              n = i.slides.filter(
                (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
              )[0].column;
            } else n = i.getSlideIndexByData(n);
          }
        return (
          requestAnimationFrame(() => {
            i.slideTo(n, t, s, a);
          }),
          i
        );
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const a = this,
          { enabled: i, params: r, animating: n } = a;
        if (!i || a.destroyed) return a;
        let l = r.slidesPerGroup;
        "auto" === r.slidesPerView &&
          1 === r.slidesPerGroup &&
          r.slidesPerGroupAuto &&
          (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
        const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l,
          d = a.virtual && r.virtual.enabled;
        if (r.loop) {
          if (n && !d && r.loopPreventsSliding) return !1;
          if (
            (a.loopFix({ direction: "next" }),
            (a._clientLeft = a.wrapperEl.clientLeft),
            a.activeIndex === a.slides.length - 1 && r.cssMode)
          )
            return (
              requestAnimationFrame(() => {
                a.slideTo(a.activeIndex + o, e, t, s);
              }),
              !0
            );
        }
        return r.rewind && a.isEnd
          ? a.slideTo(0, e, t, s)
          : a.slideTo(a.activeIndex + o, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const a = this,
          {
            params: i,
            snapGrid: r,
            slidesGrid: n,
            rtlTranslate: l,
            enabled: o,
            animating: d,
          } = a;
        if (!o || a.destroyed) return a;
        const c = a.virtual && i.virtual.enabled;
        if (i.loop) {
          if (d && !c && i.loopPreventsSliding) return !1;
          a.loopFix({ direction: "prev" }),
            (a._clientLeft = a.wrapperEl.clientLeft);
        }
        function p(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = p(l ? a.translate : -a.translate),
          m = r.map((e) => p(e));
        let h = r[m.indexOf(u) - 1];
        if (void 0 === h && i.cssMode) {
          let e;
          r.forEach((t, s) => {
            u >= t && (e = s);
          }),
            void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = n.indexOf(h)),
            f < 0 && (f = a.activeIndex - 1),
            "auto" === i.slidesPerView &&
              1 === i.slidesPerGroup &&
              i.slidesPerGroupAuto &&
              ((f = f - a.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          i.rewind && a.isBeginning)
        ) {
          const i =
            a.params.virtual && a.params.virtual.enabled && a.virtual
              ? a.virtual.slides.length - 1
              : a.slides.length - 1;
          return a.slideTo(i, e, t, s);
        }
        return i.loop && 0 === a.activeIndex && i.cssMode
          ? (requestAnimationFrame(() => {
              a.slideTo(f, e, t, s);
            }),
            !0)
          : a.slideTo(f, e, t, s);
      },
      slideReset: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const a = this;
        if (!a.destroyed) return a.slideTo(a.activeIndex, e, t, s);
      },
      slideToClosest: function (e, t, s, a) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === a && (a = 0.5);
        const i = this;
        if (i.destroyed) return;
        let r = i.activeIndex;
        const n = Math.min(i.params.slidesPerGroupSkip, r),
          l = n + Math.floor((r - n) / i.params.slidesPerGroup),
          o = i.rtlTranslate ? i.translate : -i.translate;
        if (o >= i.snapGrid[l]) {
          const e = i.snapGrid[l];
          o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
        } else {
          const e = i.snapGrid[l - 1];
          o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, i.slidesGrid.length - 1)),
          i.slideTo(r, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this;
        if (e.destroyed) return;
        const { params: t, slidesEl: s } = e,
          a =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let i,
          r = e.clickedIndex;
        const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (i = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10
          )),
            t.centeredSlides
              ? r < e.loopedSlides - a / 2 ||
                r > e.slides.length - e.loopedSlides + a / 2
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    f(s, `${n}[data-swiper-slide-index="${i}"]`)[0]
                  )),
                  l(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - a
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  f(s, `${n}[data-swiper-slide-index="${i}"]`)[0]
                )),
                l(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
        } else e.slideTo(r);
      },
    };
    var X = {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: a } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        const i = () => {
            f(a, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t);
            });
          },
          r = t.grid && s.grid && s.grid.rows > 1,
          n = s.slidesPerGroup * (r ? s.grid.rows : 1),
          l = t.slides.length % n != 0,
          o = r && t.slides.length % s.grid.rows != 0,
          d = (e) => {
            for (let a = 0; a < e; a += 1) {
              const e = t.isElement
                ? v("swiper-slide", [s.slideBlankClass])
                : v("div", [s.slideClass, s.slideBlankClass]);
              t.slidesEl.append(e);
            }
          };
        if (l) {
          if (s.loopAddBlankSlides) {
            d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides();
          } else
            g(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
          i();
        } else if (o) {
          if (s.loopAddBlankSlides) {
            d(s.grid.rows - (t.slides.length % s.grid.rows)),
              t.recalcSlides(),
              t.updateSlides();
          } else
            g(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
          i();
        } else i();
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
      },
      loopFix: function (e) {
        let {
          slideRealIndex: t,
          slideTo: s = !0,
          direction: a,
          setTranslate: i,
          activeSlideIndex: r,
          byController: n,
          byMousewheel: l,
        } = void 0 === e ? {} : e;
        const o = this;
        if (!o.params.loop) return;
        o.emit("beforeLoopFix");
        const {
            slides: d,
            allowSlidePrev: c,
            allowSlideNext: p,
            slidesEl: u,
            params: m,
          } = o,
          { centeredSlides: h } = m;
        if (
          ((o.allowSlidePrev = !0),
          (o.allowSlideNext = !0),
          o.virtual && m.virtual.enabled)
        )
          return (
            s &&
              (m.centeredSlides || 0 !== o.snapIndex
                ? m.centeredSlides && o.snapIndex < m.slidesPerView
                  ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                  : o.snapIndex === o.snapGrid.length - 1 &&
                    o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
                : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
            (o.allowSlidePrev = c),
            (o.allowSlideNext = p),
            void o.emit("loopFix")
          );
        let f = m.slidesPerView;
        "auto" === f
          ? (f = o.slidesPerViewDynamic())
          : ((f = Math.ceil(parseFloat(m.slidesPerView, 10))),
            h && f % 2 == 0 && (f += 1));
        const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
        let w = v;
        w % v != 0 && (w += v - (w % v)),
          (w += m.loopAdditionalSlides),
          (o.loopedSlides = w);
        const b = o.grid && m.grid && m.grid.rows > 1;
        d.length < f + w
          ? g(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
            )
          : b &&
            "row" === m.grid.fill &&
            g(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
            );
        const y = [],
          E = [];
        let x = o.activeIndex;
        void 0 === r
          ? (r = o.getSlideIndex(
              d.filter((e) => e.classList.contains(m.slideActiveClass))[0]
            ))
          : (x = r);
        const S = "next" === a || !a,
          T = "prev" === a || !a;
        let M = 0,
          C = 0;
        const P = b ? Math.ceil(d.length / m.grid.rows) : d.length,
          L = (b ? d[r].column : r) + (h && void 0 === i ? -f / 2 + 0.5 : 0);
        if (L < w) {
          M = Math.max(w - L, v);
          for (let e = 0; e < w - L; e += 1) {
            const t = e - Math.floor(e / P) * P;
            if (b) {
              const e = P - t - 1;
              for (let t = d.length - 1; t >= 0; t -= 1)
                d[t].column === e && y.push(t);
            } else y.push(P - t - 1);
          }
        } else if (L + f > P - w) {
          C = Math.max(L - (P - 2 * w), v);
          for (let e = 0; e < C; e += 1) {
            const t = e - Math.floor(e / P) * P;
            b
              ? d.forEach((e, s) => {
                  e.column === t && E.push(s);
                })
              : E.push(t);
          }
        }
        if (
          ((o.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            o.__preventObserver__ = !1;
          }),
          T &&
            y.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                u.prepend(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          S &&
            E.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                u.append(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          o.recalcSlides(),
          "auto" === m.slidesPerView
            ? o.updateSlides()
            : b &&
              ((y.length > 0 && T) || (E.length > 0 && S)) &&
              o.slides.forEach((e, t) => {
                o.grid.updateSlide(t, e, o.slides);
              }),
          m.watchSlidesProgress && o.updateSlidesOffset(),
          s)
        )
          if (y.length > 0 && T) {
            if (void 0 === t) {
              const e = o.slidesGrid[x],
                t = o.slidesGrid[x + M] - e;
              l
                ? o.setTranslate(o.translate - t)
                : (o.slideTo(x + M, 0, !1, !0),
                  i &&
                    ((o.touchEventsData.startTranslate =
                      o.touchEventsData.startTranslate - t),
                    (o.touchEventsData.currentTranslate =
                      o.touchEventsData.currentTranslate - t)));
            } else if (i) {
              const e = b ? y.length / m.grid.rows : y.length;
              o.slideTo(o.activeIndex + e, 0, !1, !0),
                (o.touchEventsData.currentTranslate = o.translate);
            }
          } else if (E.length > 0 && S)
            if (void 0 === t) {
              const e = o.slidesGrid[x],
                t = o.slidesGrid[x - C] - e;
              l
                ? o.setTranslate(o.translate - t)
                : (o.slideTo(x - C, 0, !1, !0),
                  i &&
                    ((o.touchEventsData.startTranslate =
                      o.touchEventsData.startTranslate - t),
                    (o.touchEventsData.currentTranslate =
                      o.touchEventsData.currentTranslate - t)));
            } else {
              const e = b ? E.length / m.grid.rows : E.length;
              o.slideTo(o.activeIndex - e, 0, !1, !0);
            }
        if (
          ((o.allowSlidePrev = c),
          (o.allowSlideNext = p),
          o.controller && o.controller.control && !n)
        ) {
          const e = {
            slideRealIndex: t,
            direction: a,
            setTranslate: i,
            activeSlideIndex: r,
            byController: !0,
          };
          Array.isArray(o.controller.control)
            ? o.controller.control.forEach((t) => {
                !t.destroyed &&
                  t.params.loop &&
                  t.loopFix({
                    ...e,
                    slideTo: t.params.slidesPerView === m.slidesPerView && s,
                  });
              })
            : o.controller.control instanceof o.constructor &&
              o.controller.control.params.loop &&
              o.controller.control.loopFix({
                ...e,
                slideTo:
                  o.controller.control.params.slidesPerView === m.slidesPerView &&
                  s,
              });
        }
        o.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { params: t, slidesEl: s } = e;
        if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const a = [];
        e.slides.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          a[t] = e;
        }),
          e.slides.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          a.forEach((e) => {
            s.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    };
    function Y(e, t, s) {
      const a = r(),
        { params: i } = e,
        n = i.edgeSwipeDetection,
        l = i.edgeSwipeThreshold;
      return (
        !n ||
        !(s <= l || s >= a.innerWidth - l) ||
        ("prevent" === n && (t.preventDefault(), !0))
      );
    }
    function B(e) {
      const t = this,
        s = a();
      let i = e;
      i.originalEvent && (i = i.originalEvent);
      const n = t.touchEventsData;
      if ("pointerdown" === i.type) {
        if (null !== n.pointerId && n.pointerId !== i.pointerId) return;
        n.pointerId = i.pointerId;
      } else
        "touchstart" === i.type &&
          1 === i.targetTouches.length &&
          (n.touchId = i.targetTouches[0].identifier);
      if ("touchstart" === i.type) return void Y(t, i, i.targetTouches[0].pageX);
      const { params: l, touches: d, enabled: c } = t;
      if (!c) return;
      if (!l.simulateTouch && "mouse" === i.pointerType) return;
      if (t.animating && l.preventInteractionOnTransition) return;
      !t.animating && l.cssMode && l.loop && t.loopFix();
      let p = i.target;
      if ("wrapper" === l.touchEventsTarget && !t.wrapperEl.contains(p)) return;
      if ("which" in i && 3 === i.which) return;
      if ("button" in i && i.button > 0) return;
      if (n.isTouched && n.isMoved) return;
      const u = !!l.noSwipingClass && "" !== l.noSwipingClass,
        m = i.composedPath ? i.composedPath() : i.path;
      u && i.target && i.target.shadowRoot && m && (p = m[0]);
      const h = l.noSwipingSelector
          ? l.noSwipingSelector
          : `.${l.noSwipingClass}`,
        f = !(!i.target || !i.target.shadowRoot);
      if (
        l.noSwiping &&
        (f
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(s) {
                  if (!s || s === a() || s === r()) return null;
                  s.assignedSlot && (s = s.assignedSlot);
                  const i = s.closest(e);
                  return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
                })(t)
              );
            })(h, p)
          : p.closest(h))
      )
        return void (t.allowClick = !0);
      if (l.swipeHandler && !p.closest(l.swipeHandler)) return;
      (d.currentX = i.pageX), (d.currentY = i.pageY);
      const g = d.currentX,
        v = d.currentY;
      if (!Y(t, i, g)) return;
      Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (d.startX = g),
        (d.startY = v),
        (n.touchStartTime = o()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        l.threshold > 0 && (n.allowThresholdMove = !1);
      let w = !0;
      p.matches(n.focusableElements) &&
        ((w = !1), "SELECT" === p.nodeName && (n.isTouched = !1)),
        s.activeElement &&
          s.activeElement.matches(n.focusableElements) &&
          s.activeElement !== p &&
          s.activeElement.blur();
      const b = w && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !b) ||
        p.isContentEditable ||
        i.preventDefault(),
        l.freeMode &&
          l.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !l.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", i);
    }
    function R(e) {
      const t = a(),
        s = this,
        i = s.touchEventsData,
        { params: r, touches: n, rtlTranslate: l, enabled: d } = s;
      if (!d) return;
      if (!r.simulateTouch && "mouse" === e.pointerType) return;
      let c,
        p = e;
      if ((p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)) {
        if (null !== i.touchId) return;
        if (p.pointerId !== i.pointerId) return;
      }
      if ("touchmove" === p.type) {
        if (
          ((c = [...p.changedTouches].filter(
            (e) => e.identifier === i.touchId
          )[0]),
          !c || c.identifier !== i.touchId)
        )
          return;
      } else c = p;
      if (!i.isTouched)
        return void (
          i.startMoving &&
          i.isScrolling &&
          s.emit("touchMoveOpposite", p)
        );
      const u = c.pageX,
        m = c.pageY;
      if (p.preventedByNestedSwiper) return (n.startX = u), void (n.startY = m);
      if (!s.allowTouchMove)
        return (
          p.target.matches(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m }),
            (i.touchStartTime = o()))
          )
        );
      if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
          if (
            (m < n.startY && s.translate <= s.maxTranslate()) ||
            (m > n.startY && s.translate >= s.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (u < n.startX && s.translate <= s.maxTranslate()) ||
          (u > n.startX && s.translate >= s.minTranslate())
        )
          return;
      if (
        t.activeElement &&
        p.target === t.activeElement &&
        p.target.matches(i.focusableElements)
      )
        return (i.isMoved = !0), void (s.allowClick = !1);
      i.allowTouchCallbacks && s.emit("touchMove", p),
        (n.previousX = n.currentX),
        (n.previousY = n.currentY),
        (n.currentX = u),
        (n.currentY = m);
      const h = n.currentX - n.startX,
        f = n.currentY - n.startY;
      if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (s.isHorizontal() && n.currentY === n.startY) ||
        (s.isVertical() && n.currentX === n.startX)
          ? (i.isScrolling = !1)
          : h * h + f * f >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
            (i.isScrolling = s.isHorizontal()
              ? e > r.touchAngle
              : 90 - e > r.touchAngle));
      }
      if (
        (i.isScrolling && s.emit("touchMoveOpposite", p),
        void 0 === i.startMoving &&
          ((n.currentX === n.startX && n.currentY === n.startY) ||
            (i.startMoving = !0)),
        i.isScrolling)
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (s.allowClick = !1),
        !r.cssMode && p.cancelable && p.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && p.stopPropagation();
      let g = s.isHorizontal() ? h : f,
        v = s.isHorizontal()
          ? n.currentX - n.previousX
          : n.currentY - n.previousY;
      r.oneWayMovement &&
        ((g = Math.abs(g) * (l ? 1 : -1)), (v = Math.abs(v) * (l ? 1 : -1))),
        (n.diff = g),
        (g *= r.touchRatio),
        l && ((g = -g), (v = -v));
      const w = s.touchesDirection;
      (s.swipeDirection = g > 0 ? "prev" : "next"),
        (s.touchesDirection = v > 0 ? "prev" : "next");
      const b = s.params.loop && !r.cssMode,
        y =
          ("next" === s.touchesDirection && s.allowSlideNext) ||
          ("prev" === s.touchesDirection && s.allowSlidePrev);
      if (!i.isMoved) {
        if (
          (b && y && s.loopFix({ direction: s.swipeDirection }),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating)
        ) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          s.wrapperEl.dispatchEvent(e);
        }
        (i.allowMomentumBounce = !1),
          !r.grabCursor ||
            (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
            s.setGrabCursor(!0),
          s.emit("sliderFirstMove", p);
      }
      if (
        (new Date().getTime(),
        i.isMoved &&
          i.allowThresholdMove &&
          w !== s.touchesDirection &&
          b &&
          y &&
          Math.abs(g) >= 1)
      )
        return (
          Object.assign(n, {
            startX: u,
            startY: m,
            currentX: u,
            currentY: m,
            startTranslate: i.currentTranslate,
          }),
          (i.loopSwapReset = !0),
          void (i.startTranslate = i.currentTranslate)
        );
      s.emit("sliderMove", p),
        (i.isMoved = !0),
        (i.currentTranslate = g + i.startTranslate);
      let E = !0,
        x = r.resistanceRatio;
      if (
        (r.touchReleaseOnEdges && (x = 0),
        g > 0
          ? (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate >
                (r.centeredSlides
                  ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                  : s.minTranslate()) &&
              s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0,
              }),
            i.currentTranslate > s.minTranslate() &&
              ((E = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + g) ** x)))
          : g < 0 &&
            (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate <
                (r.centeredSlides
                  ? s.maxTranslate() +
                    s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                  : s.maxTranslate()) &&
              s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex:
                  s.slides.length -
                  ("auto" === r.slidesPerView
                    ? s.slidesPerViewDynamic()
                    : Math.ceil(parseFloat(r.slidesPerView, 10))),
              }),
            i.currentTranslate < s.maxTranslate() &&
              ((E = !1),
              r.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - g) ** x))),
        E && (p.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          "next" === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          "prev" === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev ||
          s.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        r.threshold > 0)
      ) {
        if (!(Math.abs(g) > r.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (n.startX = n.currentX),
            (n.startY = n.currentY),
            (i.currentTranslate = i.startTranslate),
            void (n.diff = s.isHorizontal()
              ? n.currentX - n.startX
              : n.currentY - n.startY)
          );
      }
      r.followFinger &&
        !r.cssMode &&
        (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
          r.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        r.freeMode &&
          r.freeMode.enabled &&
          s.freeMode &&
          s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
    }
    function F(e) {
      const t = this,
        s = t.touchEventsData;
      let a,
        i = e;
      i.originalEvent && (i = i.originalEvent);
      if ("touchend" === i.type || "touchcancel" === i.type) {
        if (
          ((a = [...i.changedTouches].filter(
            (e) => e.identifier === s.touchId
          )[0]),
          !a || a.identifier !== s.touchId)
        )
          return;
      } else {
        if (null !== s.touchId) return;
        if (i.pointerId !== s.pointerId) return;
        a = i;
      }
      if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
          i.type
        )
      ) {
        if (
          !(
            ["pointercancel", "contextmenu"].includes(i.type) &&
            (t.browser.isSafari || t.browser.isWebView)
          )
        )
          return;
      }
      (s.pointerId = null), (s.touchId = null);
      const {
        params: r,
        touches: n,
        rtlTranslate: d,
        slidesGrid: c,
        enabled: p,
      } = t;
      if (!p) return;
      if (!r.simulateTouch && "mouse" === i.pointerType) return;
      if (
        (s.allowTouchCallbacks && t.emit("touchEnd", i),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && r.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      r.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const u = o(),
        m = u - s.touchStartTime;
      if (t.allowClick) {
        const e = i.path || (i.composedPath && i.composedPath());
        t.updateClickedSlide((e && e[0]) || i.target, e),
          t.emit("tap click", i),
          m < 300 &&
            u - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", i);
      }
      if (
        ((s.lastClickTime = o()),
        l(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          (0 === n.diff && !s.loopSwapReset) ||
          (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
      let h;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (h = r.followFinger
          ? d
            ? t.translate
            : -t.translate
          : -s.currentTranslate),
        r.cssMode)
      )
        return;
      if (r.freeMode && r.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: h });
      const f = h >= -t.maxTranslate() && !t.params.loop;
      let g = 0,
        v = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < c.length;
        e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
      ) {
        const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        void 0 !== c[e + t]
          ? (f || (h >= c[e] && h < c[e + t])) && ((g = e), (v = c[e + t] - c[e]))
          : (f || h >= c[e]) &&
            ((g = e), (v = c[c.length - 1] - c[c.length - 2]));
      }
      let w = null,
        b = null;
      r.rewind &&
        (t.isBeginning
          ? (b =
              r.virtual && r.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (w = 0));
      const y = (h - c[g]) / v,
        E = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      if (m > r.longSwipesMs) {
        if (!r.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (y >= r.longSwipesRatio
            ? t.slideTo(r.rewind && t.isEnd ? w : g + E)
            : t.slideTo(g)),
          "prev" === t.swipeDirection &&
            (y > 1 - r.longSwipesRatio
              ? t.slideTo(g + E)
              : null !== b && y < 0 && Math.abs(y) > r.longSwipesRatio
              ? t.slideTo(b)
              : t.slideTo(g));
      } else {
        if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
          ? i.target === t.navigation.nextEl
            ? t.slideTo(g + E)
            : t.slideTo(g)
          : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + E),
            "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
      }
    }
    function q() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e,
        n = e.virtual && e.params.virtual.enabled;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
      const l = n && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      l
        ? e.params.loop && !n
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          (clearTimeout(e.autoplay.resizeTimeout),
          (e.autoplay.resizeTimeout = setTimeout(() => {
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.resume();
          }, 500))),
        (e.allowSlidePrev = i),
        (e.allowSlideNext = a),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function V(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function _() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
      if (!a) return;
      let i;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const r = e.maxTranslate() - e.minTranslate();
      (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    function j(e) {
      const t = this;
      $(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update();
    }
    function W() {
      const e = this;
      e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const U = (e, t) => {
      const s = a(),
        { params: i, el: r, wrapperEl: n, device: l } = e,
        o = !!i.nested,
        d = "on" === t ? "addEventListener" : "removeEventListener",
        c = t;
      s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
        r[d]("touchstart", e.onTouchStart, { passive: !1 }),
        r[d]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
        s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
        s[d]("touchend", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
        s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) &&
          r[d]("click", e.onClick, !0),
        i.cssMode && n[d]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[c](
              l.ios || l.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              q,
              !0
            )
          : e[c]("observerUpdate", q, !0),
        r[d]("load", e.onLoad, { capture: !0 });
    };
    const K = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var Z = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function Q(e, t) {
      return function (s) {
        void 0 === s && (s = {});
        const a = Object.keys(s)[0],
          i = s[a];
        "object" == typeof i && null !== i
          ? (!0 === e[a] && (e[a] = { enabled: !0 }),
            "navigation" === a &&
              e[a] &&
              e[a].enabled &&
              !e[a].prevEl &&
              !e[a].nextEl &&
              (e[a].auto = !0),
            ["pagination", "scrollbar"].indexOf(a) >= 0 &&
              e[a] &&
              e[a].enabled &&
              !e[a].el &&
              (e[a].auto = !0),
            a in e && "enabled" in i
              ? ("object" != typeof e[a] ||
                  "enabled" in e[a] ||
                  (e[a].enabled = !0),
                e[a] || (e[a] = { enabled: !1 }),
                p(t, s))
              : p(t, s))
          : p(t, s);
      };
    }
    const J = {
        eventsEmitter: z,
        update: D,
        translate: G,
        transition: {
          setTransition: function (e, t) {
            const s = this;
            s.params.cssMode ||
              ((s.wrapperEl.style.transitionDuration = `${e}ms`),
              (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
              s.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: a } = s;
            a.cssMode ||
              (a.autoHeight && s.updateAutoHeight(),
              N({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: a } = s;
            (s.animating = !1),
              a.cssMode ||
                (s.setTransition(0),
                N({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: H,
        loop: X,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const s =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
              (s.style.cursor = "move"),
              (s.style.cursor = e ? "grabbing" : "grab"),
              t.isElement &&
                requestAnimationFrame(() => {
                  t.__preventObserver__ = !1;
                });
          },
          unsetGrabCursor: function () {
            const e = this;
            (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e.isElement && (e.__preventObserver__ = !0),
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = ""),
              e.isElement &&
                requestAnimationFrame(() => {
                  e.__preventObserver__ = !1;
                }));
          },
        },
        events: {
          attachEvents: function () {
            const e = this,
              { params: t } = e;
            (e.onTouchStart = B.bind(e)),
              (e.onTouchMove = R.bind(e)),
              (e.onTouchEnd = F.bind(e)),
              (e.onDocumentTouchStart = W.bind(e)),
              t.cssMode && (e.onScroll = _.bind(e)),
              (e.onClick = V.bind(e)),
              (e.onLoad = j.bind(e)),
              U(e, "on");
          },
          detachEvents: function () {
            U(this, "off");
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: s, params: a, el: i } = e,
              r = a.breakpoints;
            if (!r || (r && 0 === Object.keys(r).length)) return;
            const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
            if (!n || e.currentBreakpoint === n) return;
            const l = (n in r ? r[n] : void 0) || e.originalParams,
              o = K(e, a),
              d = K(e, l),
              c = a.enabled;
            o && !d
              ? (i.classList.remove(
                  `${a.containerModifierClass}grid`,
                  `${a.containerModifierClass}grid-column`
                ),
                e.emitContainerClasses())
              : !o &&
                d &&
                (i.classList.add(`${a.containerModifierClass}grid`),
                ((l.grid.fill && "column" === l.grid.fill) ||
                  (!l.grid.fill && "column" === a.grid.fill)) &&
                  i.classList.add(`${a.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                if (void 0 === l[t]) return;
                const s = a[t] && a[t].enabled,
                  i = l[t] && l[t].enabled;
                s && !i && e[t].disable(), !s && i && e[t].enable();
              });
            const u = l.direction && l.direction !== a.direction,
              m = a.loop && (l.slidesPerView !== a.slidesPerView || u),
              h = a.loop;
            u && s && e.changeDirection(), p(e.params, l);
            const f = e.params.enabled,
              g = e.params.loop;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              c && !f ? e.disable() : !c && f && e.enable(),
              (e.currentBreakpoint = n),
              e.emit("_beforeBreakpoint", l),
              s &&
                (m
                  ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                  : !h && g
                  ? (e.loopCreate(t), e.updateSlides())
                  : h && !g && e.loopDestroy()),
              e.emit("breakpoint", l);
          },
          getBreakpoint: function (e, t, s) {
            if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
              return;
            let a = !1;
            const i = r(),
              n = "window" === t ? i.innerHeight : s.clientHeight,
              l = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: n * t, point: e };
                }
                return { value: e, point: e };
              });
            l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < l.length; e += 1) {
              const { point: r, value: n } = l[e];
              "window" === t
                ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r)
                : n <= s.clientWidth && (a = r);
            }
            return a || "max";
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: a } = s;
            if (a) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
              e.isLocked = e.size > s;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: {
          addClasses: function () {
            const e = this,
              { classNames: t, params: s, rtl: a, el: i, device: r } = e,
              n = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((a) => {
                          e[a] && s.push(t + a);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: a },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: r.android },
                  { ios: r.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                  { "watch-progress": s.watchSlidesProgress },
                ],
                s.containerModifierClass
              );
            t.push(...n), i.classList.add(...t), e.emitContainerClasses();
          },
          removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t), this.emitContainerClasses();
          },
        },
      },
      ee = {};
    class te {
      constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
          i[r] = arguments[r];
        1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
          t || (t = {}),
          (t = p({}, t)),
          e && !t.el && (t.el = e);
        const n = a();
        if (
          t.el &&
          "string" == typeof t.el &&
          n.querySelectorAll(t.el).length > 1
        ) {
          const e = [];
          return (
            n.querySelectorAll(t.el).forEach((s) => {
              const a = p({}, t, { el: s });
              e.push(new te(a));
            }),
            e
          );
        }
        const l = this;
        (l.__swiper__ = !0),
          (l.support = L()),
          (l.device = I({ userAgent: t.userAgent })),
          (l.browser = A()),
          (l.eventsListeners = {}),
          (l.eventsAnyListeners = []),
          (l.modules = [...l.__modules__]),
          t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
        const o = {};
        l.modules.forEach((e) => {
          e({
            params: t,
            swiper: l,
            extendParams: Q(t, o),
            on: l.on.bind(l),
            once: l.once.bind(l),
            off: l.off.bind(l),
            emit: l.emit.bind(l),
          });
        });
        const d = p({}, Z, o);
        return (
          (l.params = p({}, d, ee, t)),
          (l.originalParams = p({}, l.params)),
          (l.passedParams = p({}, t)),
          l.params &&
            l.params.on &&
            Object.keys(l.params.on).forEach((e) => {
              l.on(e, l.params.on[e]);
            }),
          l.params && l.params.onAny && l.onAny(l.params.onAny),
          Object.assign(l, {
            enabled: l.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === l.params.direction,
            isVertical: () => "vertical" === l.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
              return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
            },
            allowSlideNext: l.params.allowSlideNext,
            allowSlidePrev: l.params.allowSlidePrev,
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: l.params.focusableElements,
              lastClickTime: 0,
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              pointerId: null,
              touchId: null,
            },
            allowClick: !0,
            allowTouchMove: l.params.allowTouchMove,
            touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          l.emit("_swiper"),
          l.params.init && l.init(),
          l
        );
      }
      getDirectionLabel(e) {
        return this.isHorizontal()
          ? e
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[e];
      }
      getSlideIndex(e) {
        const { slidesEl: t, params: s } = this,
          a = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
        return y(e) - a;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(
          this.slides.filter(
            (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
          )[0]
        );
      }
      recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = f(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const a = s.minTranslate(),
          i = (s.maxTranslate() - a) * e + a;
        s.translateTo(i, void 0 === t ? 0 : t),
          s.updateActiveIndex(),
          s.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass)
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s) => {
          const a = e.getSlideClasses(s);
          t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: s,
          slides: a,
          slidesGrid: i,
          slidesSizesGrid: r,
          size: n,
          activeIndex: l,
        } = this;
        let o = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (s.centeredSlides) {
          let e,
            t = a[l] ? Math.ceil(a[l].swiperSlideSize) : 0;
          for (let s = l + 1; s < a.length; s += 1)
            a[s] &&
              !e &&
              ((t += Math.ceil(a[s].swiperSlideSize)),
              (o += 1),
              t > n && (e = !0));
          for (let s = l - 1; s >= 0; s -= 1)
            a[s] &&
              !e &&
              ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        } else if ("current" === e)
          for (let e = l + 1; e < a.length; e += 1) {
            (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
          }
        else
          for (let e = l - 1; e >= 0; e -= 1) {
            i[l] - i[e] < n && (o += 1);
          }
        return o;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function a() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let i;
        if (
          (s.breakpoints && e.setBreakpoint(),
          [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
            t.complete && $(e, t);
          }),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          s.freeMode && s.freeMode.enabled && !s.cssMode)
        )
          a(), s.autoHeight && e.updateAutoHeight();
        else {
          if (
            ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
            e.isEnd &&
            !s.centeredSlides
          ) {
            const t =
              e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
            i = e.slideTo(t.length - 1, 0, !1, !0);
          } else i = e.slideTo(e.activeIndex, 0, !1, !0);
          i || a();
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this,
          a = s.params.direction;
        return (
          e || (e = "horizontal" === a ? "vertical" : "horizontal"),
          e === a ||
            ("horizontal" !== e && "vertical" !== e) ||
            (s.el.classList.remove(`${s.params.containerModifierClass}${a}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.forEach((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            s.emit("changeDirection"),
            t && s.update()),
          s
        );
      }
      changeLanguageDirection(e) {
        const t = this;
        (t.rtl && "rtl" === e) ||
          (!t.rtl && "ltr" === e) ||
          ((t.rtl = "rtl" === e),
          (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
          t.rtl
            ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "rtl"))
            : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "ltr")),
          t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if (("string" == typeof s && (s = document.querySelector(s)), !s))
          return !1;
        (s.swiper = t),
          s.parentNode &&
            s.parentNode.host &&
            s.parentNode.host.nodeName ===
              t.params.swiperElementNodeName.toUpperCase() &&
            (t.isElement = !0);
        const a = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let i = (() => {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(a());
          }
          return f(s, a())[0];
        })();
        return (
          !i &&
            t.params.createElements &&
            ((i = v("div", t.params.wrapperClass)),
            s.append(i),
            f(s, `.${t.params.slideClass}`).forEach((e) => {
              i.append(e);
            })),
          Object.assign(t, {
            el: s,
            wrapperEl: i,
            slidesEl:
              t.isElement && !s.parentNode.host.slideSlots
                ? s.parentNode.host
                : i,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction")),
            wrongRTL: "-webkit-box" === b(i, "display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        if (!1 === t.mount(e)) return t;
        t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return (
          t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
          s.forEach((e) => {
            e.complete
              ? $(t, e)
              : e.addEventListener("load", (e) => {
                  $(t, e.target);
                });
          }),
          O(t),
          (t.initialized = !0),
          O(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const s = this,
          { params: a, el: i, wrapperEl: r, slides: n } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            a.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              i.removeAttribute("style"),
              r.removeAttribute("style"),
              n &&
                n.length &&
                n.forEach((e) => {
                  e.classList.remove(
                    a.slideVisibleClass,
                    a.slideFullyVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass
                  ),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index");
                })),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e) => {
              s.off(e);
            }),
            !1 !== e &&
              ((s.el.swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(s)),
            (s.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        p(ee, e);
      }
      static get extendedDefaults() {
        return ee;
      }
      static get defaults() {
        return Z;
      }
      static installModule(e) {
        te.prototype.__modules__ || (te.prototype.__modules__ = []);
        const t = te.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => te.installModule(e)), te)
          : (te.installModule(e), te);
      }
    }
    function se(e, t, s, a) {
      return (
        e.params.createElements &&
          Object.keys(a).forEach((i) => {
            if (!s[i] && !0 === s.auto) {
              let r = f(e.el, `.${a[i]}`)[0];
              r || ((r = v("div", a[i])), (r.className = a[i]), e.el.append(r)),
                (s[i] = r),
                (t[i] = r);
            }
          }),
        s
      );
    }
    function ae(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!+\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function ie(e) {
      const t = this,
        { params: s, slidesEl: a } = t;
      s.loop && t.loopDestroy();
      const i = (e) => {
        if ("string" == typeof e) {
          const t = document.createElement("div");
          (t.innerHTML = e), a.append(t.children[0]), (t.innerHTML = "");
        } else a.append(e);
      };
      if ("object" == typeof e && "length" in e)
        for (let t = 0; t < e.length; t += 1) e[t] && i(e[t]);
      else i(e);
      t.recalcSlides(),
        s.loop && t.loopCreate(),
        (s.observer && !t.isElement) || t.update();
    }
    function re(e) {
      const t = this,
        { params: s, activeIndex: a, slidesEl: i } = t;
      s.loop && t.loopDestroy();
      let r = a + 1;
      const n = (e) => {
        if ("string" == typeof e) {
          const t = document.createElement("div");
          (t.innerHTML = e), i.prepend(t.children[0]), (t.innerHTML = "");
        } else i.prepend(e);
      };
      if ("object" == typeof e && "length" in e) {
        for (let t = 0; t < e.length; t += 1) e[t] && n(e[t]);
        r = a + e.length;
      } else n(e);
      t.recalcSlides(),
        s.loop && t.loopCreate(),
        (s.observer && !t.isElement) || t.update(),
        t.slideTo(r, 0, !1);
    }
    function ne(e, t) {
      const s = this,
        { params: a, activeIndex: i, slidesEl: r } = s;
      let n = i;
      a.loop && ((n -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
      const l = s.slides.length;
      if (e <= 0) return void s.prependSlide(t);
      if (e >= l) return void s.appendSlide(t);
      let o = n > e ? n + 1 : n;
      const d = [];
      for (let t = l - 1; t >= e; t -= 1) {
        const e = s.slides[t];
        e.remove(), d.unshift(e);
      }
      if ("object" == typeof t && "length" in t) {
        for (let e = 0; e < t.length; e += 1) t[e] && r.append(t[e]);
        o = n > e ? n + t.length : n;
      } else r.append(t);
      for (let e = 0; e < d.length; e += 1) r.append(d[e]);
      s.recalcSlides(),
        a.loop && s.loopCreate(),
        (a.observer && !s.isElement) || s.update(),
        a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
    }
    function le(e) {
      const t = this,
        { params: s, activeIndex: a } = t;
      let i = a;
      s.loop && ((i -= t.loopedSlides), t.loopDestroy());
      let r,
        n = i;
      if ("object" == typeof e && "length" in e) {
        for (let s = 0; s < e.length; s += 1)
          (r = e[s]), t.slides[r] && t.slides[r].remove(), r < n && (n -= 1);
        n = Math.max(n, 0);
      } else
        (r = e),
          t.slides[r] && t.slides[r].remove(),
          r < n && (n -= 1),
          (n = Math.max(n, 0));
      t.recalcSlides(),
        s.loop && t.loopCreate(),
        (s.observer && !t.isElement) || t.update(),
        s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
    }
    function oe() {
      const e = this,
        t = [];
      for (let s = 0; s < e.slides.length; s += 1) t.push(s);
      e.removeSlide(t);
    }
    function de(e) {
      const {
        effect: t,
        swiper: s,
        on: a,
        setTranslate: i,
        setTransition: r,
        overwriteParams: n,
        perspective: l,
        recreateShadows: o,
        getEffectParams: d,
      } = e;
      let c;
      a("beforeInit", () => {
        if (s.params.effect !== t) return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`),
          l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const e = n ? n() : {};
        Object.assign(s.params, e), Object.assign(s.originalParams, e);
      }),
        a("setTranslate", () => {
          s.params.effect === t && i();
        }),
        a("setTransition", (e, a) => {
          s.params.effect === t && r(a);
        }),
        a("transitionEnd", () => {
          if (s.params.effect === t && o) {
            if (!d || !d().slideShadows) return;
            s.slides.forEach((e) => {
              e.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              ).forEach((e) => e.remove());
            }),
              o();
          }
        }),
        a("virtualUpdate", () => {
          s.params.effect === t &&
            (s.slides.length || (c = !0),
            requestAnimationFrame(() => {
              c && s.slides && s.slides.length && (i(), (c = !1));
            }));
        });
    }
    function ce(e, t) {
      const s = h(t);
      return (
        s !== t &&
          ((s.style.backfaceVisibility = "hidden"),
          (s.style["-webkit-backface-visibility"] = "hidden")),
        s
      );
    }
    function pe(e) {
      let { swiper: t, duration: s, transformElements: a, allSlides: i } = e;
      const { activeIndex: r } = t;
      if (t.params.virtualTranslate && 0 !== s) {
        let e,
          s = !1;
        (e = i
          ? a
          : a.filter((e) => {
              const s = e.classList.contains("swiper-slide-transform")
                ? ((e) => {
                    if (!e.parentElement)
                      return t.slides.filter(
                        (t) => t.shadowRoot && t.shadowRoot === e.parentNode
                      )[0];
                    return e.parentElement;
                  })(e)
                : e;
              return t.getSlideIndex(s) === r;
            })),
          e.forEach((e) => {
            x(e, () => {
              if (s) return;
              if (!t || t.destroyed) return;
              (s = !0), (t.animating = !1);
              const e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
              });
              t.wrapperEl.dispatchEvent(e);
            });
          });
      }
    }
    function ue(e, t, s) {
      const a = `swiper-slide-shadow${s ? `-${s}` : ""}${
          e ? ` swiper-slide-shadow-${e}` : ""
        }`,
        i = h(t);
      let r = i.querySelector(`.${a.split(" ").join(".")}`);
      return r || ((r = v("div", a.split(" "))), i.append(r)), r;
    }
    Object.keys(J).forEach((e) => {
      Object.keys(J[e]).forEach((t) => {
        te.prototype[t] = J[e][t];
      });
    }),
      te.use([
        function (e) {
          let { swiper: t, on: s, emit: a } = e;
          const i = r();
          let n = null,
            l = null;
          const o = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (a("beforeResize"), a("resize"));
            },
            d = () => {
              t && !t.destroyed && t.initialized && a("orientationchange");
            };
          s("init", () => {
            t.params.resizeObserver && void 0 !== i.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((n = new ResizeObserver((e) => {
                  l = i.requestAnimationFrame(() => {
                    const { width: s, height: a } = t;
                    let i = s,
                      r = a;
                    e.forEach((e) => {
                      let { contentBoxSize: s, contentRect: a, target: n } = e;
                      (n && n !== t.el) ||
                        ((i = a ? a.width : (s[0] || s).inlineSize),
                        (r = a ? a.height : (s[0] || s).blockSize));
                    }),
                      (i === s && r === a) || o();
                  });
                })),
                n.observe(t.el))
              : (i.addEventListener("resize", o),
                i.addEventListener("orientationchange", d));
          }),
            s("destroy", () => {
              l && i.cancelAnimationFrame(l),
                n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
                i.removeEventListener("resize", o),
                i.removeEventListener("orientationchange", d);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: a, emit: i } = e;
          const n = [],
            l = r(),
            o = function (e, s) {
              void 0 === s && (s = {});
              const a = new (l.MutationObserver || l.WebkitMutationObserver)(
                (e) => {
                  if (t.__preventObserver__) return;
                  if (1 === e.length) return void i("observerUpdate", e[0]);
                  const s = function () {
                    i("observerUpdate", e[0]);
                  };
                  l.requestAnimationFrame
                    ? l.requestAnimationFrame(s)
                    : l.setTimeout(s, 0);
                }
              );
              a.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                n.push(a);
            };
          s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            a("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = E(t.hostEl);
                  for (let t = 0; t < e.length; t += 1) o(e[t]);
                }
                o(t.hostEl, { childList: t.params.observeSlideChildren }),
                  o(t.wrapperEl, { attributes: !1 });
              }
            }),
            a("destroy", () => {
              n.forEach((e) => {
                e.disconnect();
              }),
                n.splice(0, n.length);
            });
        },
      ]);
    const me = [
      function (e) {
        let t,
          { swiper: s, extendParams: i, on: r, emit: n } = e;
        i({
          virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
          },
        });
        const l = a();
        s.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: [],
        };
        const o = l.createElement("div");
        function d(e, t) {
          const a = s.params.virtual;
          if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
          let i;
          return (
            a.renderSlide
              ? ((i = a.renderSlide.call(s, e, t)),
                "string" == typeof i && ((o.innerHTML = i), (i = o.children[0])))
              : (i = s.isElement
                  ? v("swiper-slide")
                  : v("div", s.params.slideClass)),
            i.setAttribute("data-swiper-slide-index", t),
            a.renderSlide || (i.innerHTML = e),
            a.cache && (s.virtual.cache[t] = i),
            i
          );
        }
        function c(e) {
          const {
              slidesPerView: t,
              slidesPerGroup: a,
              centeredSlides: i,
              loop: r,
            } = s.params,
            { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual,
            { from: c, to: p, slides: u, slidesGrid: m, offset: h } = s.virtual;
          s.params.cssMode || s.updateActiveIndex();
          const g = s.activeIndex || 0;
          let v, w, b;
          (v = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
            i
              ? ((w = Math.floor(t / 2) + a + o), (b = Math.floor(t / 2) + a + l))
              : ((w = t + (a - 1) + o), (b = (r ? t : a) + l));
          let y = g - b,
            E = g + w;
          r || ((y = Math.max(y, 0)), (E = Math.min(E, u.length - 1)));
          let x = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0);
          function S() {
            s.updateSlides(),
              s.updateProgress(),
              s.updateSlidesClasses(),
              n("virtualUpdate");
          }
          if (
            (r && g >= b
              ? ((y -= b), i || (x += s.slidesGrid[0]))
              : r && g < b && ((y = -b), i && (x += s.slidesGrid[0])),
            Object.assign(s.virtual, {
              from: y,
              to: E,
              offset: x,
              slidesGrid: s.slidesGrid,
              slidesBefore: b,
              slidesAfter: w,
            }),
            c === y && p === E && !e)
          )
            return (
              s.slidesGrid !== m &&
                x !== h &&
                s.slides.forEach((e) => {
                  e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px";
                }),
              s.updateProgress(),
              void n("virtualUpdate")
            );
          if (s.params.virtual.renderExternal)
            return (
              s.params.virtual.renderExternal.call(s, {
                offset: x,
                from: y,
                to: E,
                slides: (function () {
                  const e = [];
                  for (let t = y; t <= E; t += 1) e.push(u[t]);
                  return e;
                })(),
              }),
              void (s.params.virtual.renderExternalUpdate
                ? S()
                : n("virtualUpdate"))
            );
          const T = [],
            M = [],
            C = (e) => {
              let t = e;
              return (
                e < 0 ? (t = u.length + e) : t >= u.length && (t -= u.length), t
              );
            };
          if (e)
            s.slides
              .filter((e) => e.matches(`.${s.params.slideClass}, swiper-slide`))
              .forEach((e) => {
                e.remove();
              });
          else
            for (let e = c; e <= p; e += 1)
              if (e < y || e > E) {
                const t = C(e);
                s.slides
                  .filter((e) =>
                    e.matches(
                      `.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`
                    )
                  )
                  .forEach((e) => {
                    e.remove();
                  });
              }
          const P = r ? -u.length : 0,
            L = r ? 2 * u.length : u.length;
          for (let t = P; t < L; t += 1)
            if (t >= y && t <= E) {
              const s = C(t);
              void 0 === p || e
                ? M.push(s)
                : (t > p && M.push(s), t < c && T.push(s));
            }
          if (
            (M.forEach((e) => {
              s.slidesEl.append(d(u[e], e));
            }),
            r)
          )
            for (let e = T.length - 1; e >= 0; e -= 1) {
              const t = T[e];
              s.slidesEl.prepend(d(u[t], t));
            }
          else
            T.sort((e, t) => t - e),
              T.forEach((e) => {
                s.slidesEl.prepend(d(u[e], e));
              });
          f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e) => {
            e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px";
          }),
            S();
        }
        r("beforeInit", () => {
          if (!s.params.virtual.enabled) return;
          let e;
          if (void 0 === s.passedParams.virtual.slides) {
            const t = [...s.slidesEl.children].filter((e) =>
              e.matches(`.${s.params.slideClass}, swiper-slide`)
            );
            t &&
              t.length &&
              ((s.virtual.slides = [...t]),
              (e = !0),
              t.forEach((e, t) => {
                e.setAttribute("data-swiper-slide-index", t),
                  (s.virtual.cache[t] = e),
                  e.remove();
              }));
          }
          e || (s.virtual.slides = s.params.virtual.slides),
            s.classNames.push(`${s.params.containerModifierClass}virtual`),
            (s.params.watchSlidesProgress = !0),
            (s.originalParams.watchSlidesProgress = !0),
            c();
        }),
          r("setTranslate", () => {
            s.params.virtual.enabled &&
              (s.params.cssMode && !s._immediateVirtual
                ? (clearTimeout(t),
                  (t = setTimeout(() => {
                    c();
                  }, 100)))
                : c());
          }),
          r("init update resize", () => {
            s.params.virtual.enabled &&
              s.params.cssMode &&
              u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
          }),
          Object.assign(s.virtual, {
            appendSlide: function (e) {
              if ("object" == typeof e && "length" in e)
                for (let t = 0; t < e.length; t += 1)
                  e[t] && s.virtual.slides.push(e[t]);
              else s.virtual.slides.push(e);
              c(!0);
            },
            prependSlide: function (e) {
              const t = s.activeIndex;
              let a = t + 1,
                i = 1;
              if (Array.isArray(e)) {
                for (let t = 0; t < e.length; t += 1)
                  e[t] && s.virtual.slides.unshift(e[t]);
                (a = t + e.length), (i = e.length);
              } else s.virtual.slides.unshift(e);
              if (s.params.virtual.cache) {
                const e = s.virtual.cache,
                  t = {};
                Object.keys(e).forEach((s) => {
                  const a = e[s],
                    r = a.getAttribute("data-swiper-slide-index");
                  r &&
                    a.setAttribute(
                      "data-swiper-slide-index",
                      parseInt(r, 10) + i
                    ),
                    (t[parseInt(s, 10) + i] = a);
                }),
                  (s.virtual.cache = t);
              }
              c(!0), s.slideTo(a, 0);
            },
            removeSlide: function (e) {
              if (null == e) return;
              let t = s.activeIndex;
              if (Array.isArray(e))
                for (let a = e.length - 1; a >= 0; a -= 1)
                  s.params.virtual.cache &&
                    (delete s.virtual.cache[e[a]],
                    Object.keys(s.virtual.cache).forEach((t) => {
                      t > e &&
                        ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                        s.virtual.cache[t - 1].setAttribute(
                          "data-swiper-slide-index",
                          t - 1
                        ),
                        delete s.virtual.cache[t]);
                    })),
                    s.virtual.slides.splice(e[a], 1),
                    e[a] < t && (t -= 1),
                    (t = Math.max(t, 0));
              else
                s.params.virtual.cache &&
                  (delete s.virtual.cache[e],
                  Object.keys(s.virtual.cache).forEach((t) => {
                    t > e &&
                      ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                      s.virtual.cache[t - 1].setAttribute(
                        "data-swiper-slide-index",
                        t - 1
                      ),
                      delete s.virtual.cache[t]);
                  })),
                  s.virtual.slides.splice(e, 1),
                  e < t && (t -= 1),
                  (t = Math.max(t, 0));
              c(!0), s.slideTo(t, 0);
            },
            removeAllSlides: function () {
              (s.virtual.slides = []),
                s.params.virtual.cache && (s.virtual.cache = {}),
                c(!0),
                s.slideTo(0, 0);
            },
            update: c,
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const l = a(),
          o = r();
        function d(e) {
          if (!t.enabled) return;
          const { rtlTranslate: s } = t;
          let a = e;
          a.originalEvent && (a = a.originalEvent);
          const i = a.keyCode || a.charCode,
            r = t.params.keyboard.pageUpDown,
            d = r && 33 === i,
            c = r && 34 === i,
            p = 37 === i,
            u = 39 === i,
            m = 38 === i,
            h = 40 === i;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && u) || (t.isVertical() && h) || c)
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && p) || (t.isVertical() && m) || d)
          )
            return !1;
          if (
            !(
              a.shiftKey ||
              a.altKey ||
              a.ctrlKey ||
              a.metaKey ||
              (l.activeElement &&
                l.activeElement.nodeName &&
                ("input" === l.activeElement.nodeName.toLowerCase() ||
                  "textarea" === l.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              t.params.keyboard.onlyInViewport &&
              (d || c || p || u || m || h)
            ) {
              let e = !1;
              if (
                E(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 &&
                0 === E(t.el, `.${t.params.slideActiveClass}`).length
              )
                return;
              const a = t.el,
                i = a.clientWidth,
                r = a.clientHeight,
                n = o.innerWidth,
                l = o.innerHeight,
                d = w(a);
              s && (d.left -= a.scrollLeft);
              const c = [
                [d.left, d.top],
                [d.left + i, d.top],
                [d.left, d.top + r],
                [d.left + i, d.top + r],
              ];
              for (let t = 0; t < c.length; t += 1) {
                const s = c[t];
                if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                  if (0 === s[0] && 0 === s[1]) continue;
                  e = !0;
                }
              }
              if (!e) return;
            }
            t.isHorizontal()
              ? ((d || c || p || u) &&
                  (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
                (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
                (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
              : ((d || c || m || h) &&
                  (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
                (c || h) && t.slideNext(),
                (d || m) && t.slidePrev()),
              n("keyPress", i);
          }
        }
        function c() {
          t.keyboard.enabled ||
            (l.addEventListener("keydown", d), (t.keyboard.enabled = !0));
        }
        function p() {
          t.keyboard.enabled &&
            (l.removeEventListener("keydown", d), (t.keyboard.enabled = !1));
        }
        (t.keyboard = { enabled: !1 }),
          s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
          i("init", () => {
            t.params.keyboard.enabled && c();
          }),
          i("destroy", () => {
            t.keyboard.enabled && p();
          }),
          Object.assign(t.keyboard, { enable: c, disable: p });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const n = r();
        let d;
        s({
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel",
          },
        }),
          (t.mousewheel = { enabled: !1 });
        let c,
          p = o();
        const u = [];
        function m() {
          t.enabled && (t.mouseEntered = !0);
        }
        function h() {
          t.enabled && (t.mouseEntered = !1);
        }
        function f(e) {
          return (
            !(
              t.params.mousewheel.thresholdDelta &&
              e.delta < t.params.mousewheel.thresholdDelta
            ) &&
            !(
              t.params.mousewheel.thresholdTime &&
              o() - p < t.params.mousewheel.thresholdTime
            ) &&
            ((e.delta >= 6 && o() - p < 60) ||
              (e.direction < 0
                ? (t.isEnd && !t.params.loop) ||
                  t.animating ||
                  (t.slideNext(), i("scroll", e.raw))
                : (t.isBeginning && !t.params.loop) ||
                  t.animating ||
                  (t.slidePrev(), i("scroll", e.raw)),
              (p = new n.Date().getTime()),
              !1))
          );
        }
        function g(e) {
          let s = e,
            a = !0;
          if (!t.enabled) return;
          if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))
            return;
          const r = t.params.mousewheel;
          t.params.cssMode && s.preventDefault();
          let n = t.el;
          "container" !== t.params.mousewheel.eventsTarget &&
            (n = document.querySelector(t.params.mousewheel.eventsTarget));
          const p = n && n.contains(s.target);
          if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0;
          s.originalEvent && (s = s.originalEvent);
          let m = 0;
          const h = t.rtlTranslate ? -1 : 1,
            g = (function (e) {
              let t = 0,
                s = 0,
                a = 0,
                i = 0;
              return (
                "detail" in e && (s = e.detail),
                "wheelDelta" in e && (s = -e.wheelDelta / 120),
                "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
                (a = 10 * t),
                (i = 10 * s),
                "deltaY" in e && (i = e.deltaY),
                "deltaX" in e && (a = e.deltaX),
                e.shiftKey && !a && ((a = i), (i = 0)),
                (a || i) &&
                  e.deltaMode &&
                  (1 === e.deltaMode
                    ? ((a *= 40), (i *= 40))
                    : ((a *= 800), (i *= 800))),
                a && !t && (t = a < 1 ? -1 : 1),
                i && !s && (s = i < 1 ? -1 : 1),
                { spinX: t, spinY: s, pixelX: a, pixelY: i }
              );
            })(s);
          if (r.forceToAxis)
            if (t.isHorizontal()) {
              if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
              m = -g.pixelX * h;
            } else {
              if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
              m = -g.pixelY;
            }
          else
            m =
              Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
          if (0 === m) return !0;
          r.invert && (m = -m);
          let v = t.getTranslate() + m * r.sensitivity;
          if (
            (v >= t.minTranslate() && (v = t.minTranslate()),
            v <= t.maxTranslate() && (v = t.maxTranslate()),
            (a =
              !!t.params.loop ||
              !(v === t.minTranslate() || v === t.maxTranslate())),
            a && t.params.nested && s.stopPropagation(),
            t.params.freeMode && t.params.freeMode.enabled)
          ) {
            const e = { time: o(), delta: Math.abs(m), direction: Math.sign(m) },
              a =
                c &&
                e.time < c.time + 500 &&
                e.delta <= c.delta &&
                e.direction === c.direction;
            if (!a) {
              c = void 0;
              let n = t.getTranslate() + m * r.sensitivity;
              const o = t.isBeginning,
                p = t.isEnd;
              if (
                (n >= t.minTranslate() && (n = t.minTranslate()),
                n <= t.maxTranslate() && (n = t.maxTranslate()),
                t.setTransition(0),
                t.setTranslate(n),
                t.updateProgress(),
                t.updateActiveIndex(),
                t.updateSlidesClasses(),
                ((!o && t.isBeginning) || (!p && t.isEnd)) &&
                  t.updateSlidesClasses(),
                t.params.loop &&
                  t.loopFix({
                    direction: e.direction < 0 ? "next" : "prev",
                    byMousewheel: !0,
                  }),
                t.params.freeMode.sticky)
              ) {
                clearTimeout(d), (d = void 0), u.length >= 15 && u.shift();
                const s = u.length ? u[u.length - 1] : void 0,
                  a = u[0];
                if (
                  (u.push(e),
                  s && (e.delta > s.delta || e.direction !== s.direction))
                )
                  u.splice(0);
                else if (
                  u.length >= 15 &&
                  e.time - a.time < 500 &&
                  a.delta - e.delta >= 1 &&
                  e.delta <= 6
                ) {
                  const s = m > 0 ? 0.8 : 0.2;
                  (c = e),
                    u.splice(0),
                    (d = l(() => {
                      t.slideToClosest(t.params.speed, !0, void 0, s);
                    }, 0));
                }
                d ||
                  (d = l(() => {
                    (c = e),
                      u.splice(0),
                      t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                  }, 500));
              }
              if (
                (a || i("scroll", s),
                t.params.autoplay &&
                  t.params.autoplayDisableOnInteraction &&
                  t.autoplay.stop(),
                r.releaseOnEdges &&
                  (n === t.minTranslate() || n === t.maxTranslate()))
              )
                return !0;
            }
          } else {
            const s = {
              time: o(),
              delta: Math.abs(m),
              direction: Math.sign(m),
              raw: e,
            };
            u.length >= 2 && u.shift();
            const a = u.length ? u[u.length - 1] : void 0;
            if (
              (u.push(s),
              a
                ? (s.direction !== a.direction ||
                    s.delta > a.delta ||
                    s.time > a.time + 150) &&
                  f(s)
                : f(s),
              (function (e) {
                const s = t.params.mousewheel;
                if (e.direction < 0) {
                  if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
                } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                  return !0;
                return !1;
              })(s))
            )
              return !0;
          }
          return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
        }
        function v(e) {
          let s = t.el;
          "container" !== t.params.mousewheel.eventsTarget &&
            (s = document.querySelector(t.params.mousewheel.eventsTarget)),
            s[e]("mouseenter", m),
            s[e]("mouseleave", h),
            s[e]("wheel", g);
        }
        function w() {
          return t.params.cssMode
            ? (t.wrapperEl.removeEventListener("wheel", g), !0)
            : !t.mousewheel.enabled &&
                (v("addEventListener"), (t.mousewheel.enabled = !0), !0);
        }
        function b() {
          return t.params.cssMode
            ? (t.wrapperEl.addEventListener(event, g), !0)
            : !!t.mousewheel.enabled &&
                (v("removeEventListener"), (t.mousewheel.enabled = !1), !0);
        }
        a("init", () => {
          !t.params.mousewheel.enabled && t.params.cssMode && b(),
            t.params.mousewheel.enabled && w();
        }),
          a("destroy", () => {
            t.params.cssMode && w(), t.mousewheel.enabled && b();
          }),
          Object.assign(t.mousewheel, { enable: w, disable: b });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        function r(e) {
          let s;
          return e &&
            "string" == typeof e &&
            t.isElement &&
            ((s = t.el.querySelector(e)), s)
            ? s
            : (e &&
                ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
                t.params.uniqueNavElements &&
                  "string" == typeof e &&
                  s.length > 1 &&
                  1 === t.el.querySelectorAll(e).length &&
                  (s = t.el.querySelector(e))),
              e && !s ? e : s);
        }
        function n(e, s) {
          const a = t.params.navigation;
          (e = T(e)).forEach((e) => {
            e &&
              (e.classList[s ? "add" : "remove"](...a.disabledClass.split(" ")),
              "BUTTON" === e.tagName && (e.disabled = s),
              t.params.watchOverflow &&
                t.enabled &&
                e.classList[t.isLocked ? "add" : "remove"](a.lockClass));
          });
        }
        function l() {
          const { nextEl: e, prevEl: s } = t.navigation;
          if (t.params.loop) return n(s, !1), void n(e, !1);
          n(s, t.isBeginning && !t.params.rewind),
            n(e, t.isEnd && !t.params.rewind);
        }
        function o(e) {
          e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) &&
              (t.slidePrev(), i("navigationPrev"));
        }
        function d(e) {
          e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) &&
              (t.slideNext(), i("navigationNext"));
        }
        function c() {
          const e = t.params.navigation;
          if (
            ((t.params.navigation = se(
              t,
              t.originalParams.navigation,
              t.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !e.nextEl && !e.prevEl)
          )
            return;
          let s = r(e.nextEl),
            a = r(e.prevEl);
          Object.assign(t.navigation, { nextEl: s, prevEl: a }),
            (s = T(s)),
            (a = T(a));
          const i = (s, a) => {
            s && s.addEventListener("click", "next" === a ? d : o),
              !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
          };
          s.forEach((e) => i(e, "next")), a.forEach((e) => i(e, "prev"));
        }
        function p() {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = T(e)), (s = T(s));
          const a = (e, s) => {
            e.removeEventListener("click", "next" === s ? d : o),
              e.classList.remove(...t.params.navigation.disabledClass.split(" "));
          };
          e.forEach((e) => a(e, "next")), s.forEach((e) => a(e, "prev"));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled",
          },
        }),
          (t.navigation = { nextEl: null, prevEl: null }),
          a("init", () => {
            !1 === t.params.navigation.enabled ? u() : (c(), l());
          }),
          a("toEdge fromEdge lock unlock", () => {
            l();
          }),
          a("destroy", () => {
            p();
          }),
          a("enable disable", () => {
            let { nextEl: e, prevEl: s } = t.navigation;
            (e = T(e)),
              (s = T(s)),
              t.enabled
                ? l()
                : [...e, ...s]
                    .filter((e) => !!e)
                    .forEach((e) =>
                      e.classList.add(t.params.navigation.lockClass)
                    );
          }),
          a("click", (e, s) => {
            let { nextEl: a, prevEl: r } = t.navigation;
            (a = T(a)), (r = T(r));
            const n = s.target;
            if (
              t.params.navigation.hideOnClick &&
              !r.includes(n) &&
              !a.includes(n)
            ) {
              if (
                t.pagination &&
                t.params.pagination &&
                t.params.pagination.clickable &&
                (t.pagination.el === n || t.pagination.el.contains(n))
              )
                return;
              let e;
              a.length
                ? (e = a[0].classList.contains(t.params.navigation.hiddenClass))
                : r.length &&
                  (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
                i(!0 === e ? "navigationShow" : "navigationHide"),
                [...a, ...r]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.toggle(t.params.navigation.hiddenClass)
                  );
            }
          });
        const u = () => {
          t.el.classList.add(
            ...t.params.navigation.navigationDisabledClass.split(" ")
          ),
            p();
        };
        Object.assign(t.navigation, {
          enable: () => {
            t.el.classList.remove(
              ...t.params.navigation.navigationDisabledClass.split(" ")
            ),
              c(),
              l();
          },
          disable: u,
          update: l,
          init: c,
          destroy: p,
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const r = "swiper-pagination";
        let n;
        s({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
            paginationDisabledClass: `${r}-disabled`,
          },
        }),
          (t.pagination = { el: null, bullets: [] });
        let l = 0;
        function o() {
          return (
            !t.params.pagination.el ||
            !t.pagination.el ||
            (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
          );
        }
        function d(e, s) {
          const { bulletActiveClass: a } = t.params.pagination;
          e &&
            (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            (e.classList.add(`${a}-${s}`),
            (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
              e.classList.add(`${a}-${s}-${s}`));
        }
        function c(e) {
          const s = e.target.closest(ae(t.params.pagination.bulletClass));
          if (!s) return;
          e.preventDefault();
          const a = y(s) * t.params.slidesPerGroup;
          if (t.params.loop) {
            if (t.realIndex === a) return;
            t.slideToLoop(a);
          } else t.slideTo(a);
        }
        function p() {
          const e = t.rtl,
            s = t.params.pagination;
          if (o()) return;
          let a,
            r,
            c = t.pagination.el;
          c = T(c);
          const p =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            u = t.params.loop
              ? Math.ceil(p / t.params.slidesPerGroup)
              : t.snapGrid.length;
          if (
            (t.params.loop
              ? ((r = t.previousRealIndex || 0),
                (a =
                  t.params.slidesPerGroup > 1
                    ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                    : t.realIndex))
              : void 0 !== t.snapIndex
              ? ((a = t.snapIndex), (r = t.previousSnapIndex))
              : ((r = t.previousIndex || 0), (a = t.activeIndex || 0)),
            "bullets" === s.type &&
              t.pagination.bullets &&
              t.pagination.bullets.length > 0)
          ) {
            const i = t.pagination.bullets;
            let o, p, u;
            if (
              (s.dynamicBullets &&
                ((n = S(i[0], t.isHorizontal() ? "width" : "height", !0)),
                c.forEach((e) => {
                  e.style[t.isHorizontal() ? "width" : "height"] =
                    n * (s.dynamicMainBullets + 4) + "px";
                }),
                s.dynamicMainBullets > 1 &&
                  void 0 !== r &&
                  ((l += a - (r || 0)),
                  l > s.dynamicMainBullets - 1
                    ? (l = s.dynamicMainBullets - 1)
                    : l < 0 && (l = 0)),
                (o = Math.max(a - l, 0)),
                (p = o + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (u = (p + o) / 2)),
              i.forEach((e) => {
                const t = [
                  ...[
                    "",
                    "-next",
                    "-next-next",
                    "-prev",
                    "-prev-prev",
                    "-main",
                  ].map((e) => `${s.bulletActiveClass}${e}`),
                ]
                  .map((e) =>
                    "string" == typeof e && e.includes(" ") ? e.split(" ") : e
                  )
                  .flat();
                e.classList.remove(...t);
              }),
              c.length > 1)
            )
              i.forEach((e) => {
                const i = y(e);
                i === a
                  ? e.classList.add(...s.bulletActiveClass.split(" "))
                  : t.isElement && e.setAttribute("part", "bullet"),
                  s.dynamicBullets &&
                    (i >= o &&
                      i <= p &&
                      e.classList.add(
                        ...`${s.bulletActiveClass}-main`.split(" ")
                      ),
                    i === o && d(e, "prev"),
                    i === p && d(e, "next"));
              });
            else {
              const e = i[a];
              if (
                (e && e.classList.add(...s.bulletActiveClass.split(" ")),
                t.isElement &&
                  i.forEach((e, t) => {
                    e.setAttribute("part", t === a ? "bullet-active" : "bullet");
                  }),
                s.dynamicBullets)
              ) {
                const e = i[o],
                  t = i[p];
                for (let e = o; e <= p; e += 1)
                  i[e] &&
                    i[e].classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" ")
                    );
                d(e, "prev"), d(t, "next");
              }
            }
            if (s.dynamicBullets) {
              const a = Math.min(i.length, s.dynamicMainBullets + 4),
                r = (n * a - n) / 2 - u * n,
                l = e ? "right" : "left";
              i.forEach((e) => {
                e.style[t.isHorizontal() ? l : "top"] = `${r}px`;
              });
            }
          }
          c.forEach((e, r) => {
            if (
              ("fraction" === s.type &&
                (e.querySelectorAll(ae(s.currentClass)).forEach((e) => {
                  e.textContent = s.formatFractionCurrent(a + 1);
                }),
                e.querySelectorAll(ae(s.totalClass)).forEach((e) => {
                  e.textContent = s.formatFractionTotal(u);
                })),
              "progressbar" === s.type)
            ) {
              let i;
              i = s.progressbarOpposite
                ? t.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : t.isHorizontal()
                ? "horizontal"
                : "vertical";
              const r = (a + 1) / u;
              let n = 1,
                l = 1;
              "horizontal" === i ? (n = r) : (l = r),
                e.querySelectorAll(ae(s.progressbarFillClass)).forEach((e) => {
                  (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                    (e.style.transitionDuration = `${t.params.speed}ms`);
                });
            }
            "custom" === s.type && s.renderCustom
              ? ((e.innerHTML = s.renderCustom(t, a + 1, u)),
                0 === r && i("paginationRender", e))
              : (0 === r && i("paginationRender", e), i("paginationUpdate", e)),
              t.params.watchOverflow &&
                t.enabled &&
                e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
          });
        }
        function u() {
          const e = t.params.pagination;
          if (o()) return;
          const s =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
          let a = t.pagination.el;
          a = T(a);
          let r = "";
          if ("bullets" === e.type) {
            let a = t.params.loop
              ? Math.ceil(s / t.params.slidesPerGroup)
              : t.snapGrid.length;
            t.params.freeMode && t.params.freeMode.enabled && a > s && (a = s);
            for (let s = 0; s < a; s += 1)
              e.renderBullet
                ? (r += e.renderBullet.call(t, s, e.bulletClass))
                : (r += `<${e.bulletElement} ${
                    t.isElement ? 'part="bullet"' : ""
                  } class="${e.bulletClass}"></${e.bulletElement}>`);
          }
          "fraction" === e.type &&
            (r = e.renderFraction
              ? e.renderFraction.call(t, e.currentClass, e.totalClass)
              : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            "progressbar" === e.type &&
              (r = e.renderProgressbar
                ? e.renderProgressbar.call(t, e.progressbarFillClass)
                : `<span class="${e.progressbarFillClass}"></span>`),
            (t.pagination.bullets = []),
            a.forEach((s) => {
              "custom" !== e.type && (s.innerHTML = r || ""),
                "bullets" === e.type &&
                  t.pagination.bullets.push(
                    ...s.querySelectorAll(ae(e.bulletClass))
                  );
            }),
            "custom" !== e.type && i("paginationRender", a[0]);
        }
        function m() {
          t.params.pagination = se(
            t,
            t.originalParams.pagination,
            t.params.pagination,
            { el: "swiper-pagination" }
          );
          const e = t.params.pagination;
          if (!e.el) return;
          let s;
          "string" == typeof e.el &&
            t.isElement &&
            (s = t.el.querySelector(e.el)),
            s ||
              "string" != typeof e.el ||
              (s = [...document.querySelectorAll(e.el)]),
            s || (s = e.el),
            s &&
              0 !== s.length &&
              (t.params.uniqueNavElements &&
                "string" == typeof e.el &&
                Array.isArray(s) &&
                s.length > 1 &&
                ((s = [...t.el.querySelectorAll(e.el)]),
                s.length > 1 &&
                  (s = s.filter((e) => E(e, ".swiper")[0] === t.el)[0])),
              Array.isArray(s) && 1 === s.length && (s = s[0]),
              Object.assign(t.pagination, { el: s }),
              (s = T(s)),
              s.forEach((s) => {
                "bullets" === e.type &&
                  e.clickable &&
                  s.classList.add(...(e.clickableClass || "").split(" ")),
                  s.classList.add(e.modifierClass + e.type),
                  s.classList.add(
                    t.isHorizontal() ? e.horizontalClass : e.verticalClass
                  ),
                  "bullets" === e.type &&
                    e.dynamicBullets &&
                    (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                    (l = 0),
                    e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                  "progressbar" === e.type &&
                    e.progressbarOpposite &&
                    s.classList.add(e.progressbarOppositeClass),
                  e.clickable && s.addEventListener("click", c),
                  t.enabled || s.classList.add(e.lockClass);
              }));
        }
        function h() {
          const e = t.params.pagination;
          if (o()) return;
          let s = t.pagination.el;
          s &&
            ((s = T(s)),
            s.forEach((s) => {
              s.classList.remove(e.hiddenClass),
                s.classList.remove(e.modifierClass + e.type),
                s.classList.remove(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                ),
                e.clickable &&
                  (s.classList.remove(...(e.clickableClass || "").split(" ")),
                  s.removeEventListener("click", c));
            })),
            t.pagination.bullets &&
              t.pagination.bullets.forEach((t) =>
                t.classList.remove(...e.bulletActiveClass.split(" "))
              );
        }
        a("changeDirection", () => {
          if (!t.pagination || !t.pagination.el) return;
          const e = t.params.pagination;
          let { el: s } = t.pagination;
          (s = T(s)),
            s.forEach((s) => {
              s.classList.remove(e.horizontalClass, e.verticalClass),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                );
            });
        }),
          a("init", () => {
            !1 === t.params.pagination.enabled ? f() : (m(), u(), p());
          }),
          a("activeIndexChange", () => {
            void 0 === t.snapIndex && p();
          }),
          a("snapIndexChange", () => {
            p();
          }),
          a("snapGridLengthChange", () => {
            u(), p();
          }),
          a("destroy", () => {
            h();
          }),
          a("enable disable", () => {
            let { el: e } = t.pagination;
            e &&
              ((e = T(e)),
              e.forEach((e) =>
                e.classList[t.enabled ? "remove" : "add"](
                  t.params.pagination.lockClass
                )
              ));
          }),
          a("lock unlock", () => {
            p();
          }),
          a("click", (e, s) => {
            const a = s.target,
              r = T(t.pagination.el);
            if (
              t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              r &&
              r.length > 0 &&
              !a.classList.contains(t.params.pagination.bulletClass)
            ) {
              if (
                t.navigation &&
                ((t.navigation.nextEl && a === t.navigation.nextEl) ||
                  (t.navigation.prevEl && a === t.navigation.prevEl))
              )
                return;
              const e = r[0].classList.contains(t.params.pagination.hiddenClass);
              i(!0 === e ? "paginationShow" : "paginationHide"),
                r.forEach((e) =>
                  e.classList.toggle(t.params.pagination.hiddenClass)
                );
            }
          });
        const f = () => {
          t.el.classList.add(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            ((e = T(e)),
            e.forEach((e) =>
              e.classList.add(t.params.pagination.paginationDisabledClass)
            )),
            h();
        };
        Object.assign(t.pagination, {
          enable: () => {
            t.el.classList.remove(t.params.pagination.paginationDisabledClass);
            let { el: e } = t.pagination;
            e &&
              ((e = T(e)),
              e.forEach((e) =>
                e.classList.remove(t.params.pagination.paginationDisabledClass)
              )),
              m(),
              u(),
              p();
          },
          disable: f,
          render: u,
          update: p,
          init: m,
          destroy: h,
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: r } = e;
        const o = a();
        let d,
          c,
          p,
          u,
          m = !1,
          h = null,
          f = null;
        function g() {
          if (!t.params.scrollbar.el || !t.scrollbar.el) return;
          const { scrollbar: e, rtlTranslate: s } = t,
            { dragEl: a, el: i } = e,
            r = t.params.scrollbar,
            n = t.params.loop ? t.progressLoop : t.progress;
          let l = c,
            o = (p - c) * n;
          s
            ? ((o = -o),
              o > 0 ? ((l = c - o), (o = 0)) : -o + c > p && (l = p + o))
            : o < 0
            ? ((l = c + o), (o = 0))
            : o + c > p && (l = p - o),
            t.isHorizontal()
              ? ((a.style.transform = `translate3d(${o}px, 0, 0)`),
                (a.style.width = `${l}px`))
              : ((a.style.transform = `translate3d(0px, ${o}px, 0)`),
                (a.style.height = `${l}px`)),
            r.hide &&
              (clearTimeout(h),
              (i.style.opacity = 1),
              (h = setTimeout(() => {
                (i.style.opacity = 0), (i.style.transitionDuration = "400ms");
              }, 1e3)));
        }
        function b() {
          if (!t.params.scrollbar.el || !t.scrollbar.el) return;
          const { scrollbar: e } = t,
            { dragEl: s, el: a } = e;
          (s.style.width = ""),
            (s.style.height = ""),
            (p = t.isHorizontal() ? a.offsetWidth : a.offsetHeight),
            (u =
              t.size /
              (t.virtualSize +
                t.params.slidesOffsetBefore -
                (t.params.centeredSlides ? t.snapGrid[0] : 0))),
            (c =
              "auto" === t.params.scrollbar.dragSize
                ? p * u
                : parseInt(t.params.scrollbar.dragSize, 10)),
            t.isHorizontal()
              ? (s.style.width = `${c}px`)
              : (s.style.height = `${c}px`),
            (a.style.display = u >= 1 ? "none" : ""),
            t.params.scrollbar.hide && (a.style.opacity = 0),
            t.params.watchOverflow &&
              t.enabled &&
              e.el.classList[t.isLocked ? "add" : "remove"](
                t.params.scrollbar.lockClass
              );
        }
        function y(e) {
          return t.isHorizontal() ? e.clientX : e.clientY;
        }
        function E(e) {
          const { scrollbar: s, rtlTranslate: a } = t,
            { el: i } = s;
          let r;
          (r =
            (y(e) -
              w(i)[t.isHorizontal() ? "left" : "top"] -
              (null !== d ? d : c / 2)) /
            (p - c)),
            (r = Math.max(Math.min(r, 1), 0)),
            a && (r = 1 - r);
          const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
          t.updateProgress(n),
            t.setTranslate(n),
            t.updateActiveIndex(),
            t.updateSlidesClasses();
        }
        function x(e) {
          const s = t.params.scrollbar,
            { scrollbar: a, wrapperEl: i } = t,
            { el: n, dragEl: l } = a;
          (m = !0),
            (d =
              e.target === l
                ? y(e) -
                  e.target.getBoundingClientRect()[
                    t.isHorizontal() ? "left" : "top"
                  ]
                : null),
            e.preventDefault(),
            e.stopPropagation(),
            (i.style.transitionDuration = "100ms"),
            (l.style.transitionDuration = "100ms"),
            E(e),
            clearTimeout(f),
            (n.style.transitionDuration = "0ms"),
            s.hide && (n.style.opacity = 1),
            t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"),
            r("scrollbarDragStart", e);
        }
        function S(e) {
          const { scrollbar: s, wrapperEl: a } = t,
            { el: i, dragEl: n } = s;
          m &&
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            E(e),
            (a.style.transitionDuration = "0ms"),
            (i.style.transitionDuration = "0ms"),
            (n.style.transitionDuration = "0ms"),
            r("scrollbarDragMove", e));
        }
        function M(e) {
          const s = t.params.scrollbar,
            { scrollbar: a, wrapperEl: i } = t,
            { el: n } = a;
          m &&
            ((m = !1),
            t.params.cssMode &&
              ((t.wrapperEl.style["scroll-snap-type"] = ""),
              (i.style.transitionDuration = "")),
            s.hide &&
              (clearTimeout(f),
              (f = l(() => {
                (n.style.opacity = 0), (n.style.transitionDuration = "400ms");
              }, 1e3))),
            r("scrollbarDragEnd", e),
            s.snapOnRelease && t.slideToClosest());
        }
        function C(e) {
          const { scrollbar: s, params: a } = t,
            i = s.el;
          if (!i) return;
          const r = i,
            n = !!a.passiveListeners && { passive: !1, capture: !1 },
            l = !!a.passiveListeners && { passive: !0, capture: !1 };
          if (!r) return;
          const d = "on" === e ? "addEventListener" : "removeEventListener";
          r[d]("pointerdown", x, n),
            o[d]("pointermove", S, n),
            o[d]("pointerup", M, l);
        }
        function P() {
          const { scrollbar: e, el: s } = t;
          t.params.scrollbar = se(
            t,
            t.originalParams.scrollbar,
            t.params.scrollbar,
            { el: "swiper-scrollbar" }
          );
          const a = t.params.scrollbar;
          if (!a.el) return;
          let i, r;
          if (
            ("string" == typeof a.el &&
              t.isElement &&
              (i = t.el.querySelector(a.el)),
            i || "string" != typeof a.el)
          )
            i || (i = a.el);
          else if (((i = o.querySelectorAll(a.el)), !i.length)) return;
          t.params.uniqueNavElements &&
            "string" == typeof a.el &&
            i.length > 1 &&
            1 === s.querySelectorAll(a.el).length &&
            (i = s.querySelector(a.el)),
            i.length > 0 && (i = i[0]),
            i.classList.add(
              t.isHorizontal() ? a.horizontalClass : a.verticalClass
            ),
            i &&
              ((r = i.querySelector(ae(t.params.scrollbar.dragClass))),
              r || ((r = v("div", t.params.scrollbar.dragClass)), i.append(r))),
            Object.assign(e, { el: i, dragEl: r }),
            a.draggable && t.params.scrollbar.el && t.scrollbar.el && C("on"),
            i &&
              i.classList[t.enabled ? "remove" : "add"](
                ...n(t.params.scrollbar.lockClass)
              );
        }
        function L() {
          const e = t.params.scrollbar,
            s = t.scrollbar.el;
          s &&
            s.classList.remove(
              ...n(t.isHorizontal() ? e.horizontalClass : e.verticalClass)
            ),
            t.params.scrollbar.el && t.scrollbar.el && C("off");
        }
        s({
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical",
          },
        }),
          (t.scrollbar = { el: null, dragEl: null }),
          i("changeDirection", () => {
            if (!t.scrollbar || !t.scrollbar.el) return;
            const e = t.params.scrollbar;
            let { el: s } = t.scrollbar;
            (s = T(s)),
              s.forEach((s) => {
                s.classList.remove(e.horizontalClass, e.verticalClass),
                  s.classList.add(
                    t.isHorizontal() ? e.horizontalClass : e.verticalClass
                  );
              });
          }),
          i("init", () => {
            !1 === t.params.scrollbar.enabled ? I() : (P(), b(), g());
          }),
          i("update resize observerUpdate lock unlock changeDirection", () => {
            b();
          }),
          i("setTranslate", () => {
            g();
          }),
          i("setTransition", (e, s) => {
            !(function (e) {
              t.params.scrollbar.el &&
                t.scrollbar.el &&
                (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
            })(s);
          }),
          i("enable disable", () => {
            const { el: e } = t.scrollbar;
            e &&
              e.classList[t.enabled ? "remove" : "add"](
                ...n(t.params.scrollbar.lockClass)
              );
          }),
          i("destroy", () => {
            L();
          });
        const I = () => {
          t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),
            t.scrollbar.el &&
              t.scrollbar.el.classList.add(
                ...n(t.params.scrollbar.scrollbarDisabledClass)
              ),
            L();
        };
        Object.assign(t.scrollbar, {
          enable: () => {
            t.el.classList.remove(
              ...n(t.params.scrollbar.scrollbarDisabledClass)
            ),
              t.scrollbar.el &&
                t.scrollbar.el.classList.remove(
                  ...n(t.params.scrollbar.scrollbarDisabledClass)
                ),
              P(),
              b(),
              g();
          },
          disable: I,
          updateSize: b,
          setTranslate: g,
          init: P,
          destroy: L,
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({ parallax: { enabled: !1 } });
        const i =
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
          r = (e, s) => {
            const { rtl: a } = t,
              i = a ? -1 : 1,
              r = e.getAttribute("data-swiper-parallax") || "0";
            let n = e.getAttribute("data-swiper-parallax-x"),
              l = e.getAttribute("data-swiper-parallax-y");
            const o = e.getAttribute("data-swiper-parallax-scale"),
              d = e.getAttribute("data-swiper-parallax-opacity"),
              c = e.getAttribute("data-swiper-parallax-rotate");
            if (
              (n || l
                ? ((n = n || "0"), (l = l || "0"))
                : t.isHorizontal()
                ? ((n = r), (l = "0"))
                : ((l = r), (n = "0")),
              (n =
                n.indexOf("%") >= 0
                  ? parseInt(n, 10) * s * i + "%"
                  : n * s * i + "px"),
              (l =
                l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px"),
              null != d)
            ) {
              const t = d - (d - 1) * (1 - Math.abs(s));
              e.style.opacity = t;
            }
            let p = `translate3d(${n}, ${l}, 0px)`;
            if (null != o) {
              p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`;
            }
            if (c && null != c) {
              p += ` rotate(${c * s * -1}deg)`;
            }
            e.style.transform = p;
          },
          n = () => {
            const {
                el: e,
                slides: s,
                progress: a,
                snapGrid: n,
                isElement: l,
              } = t,
              o = f(e, i);
            t.isElement && o.push(...f(t.hostEl, i)),
              o.forEach((e) => {
                r(e, a);
              }),
              s.forEach((e, s) => {
                let l = e.progress;
                t.params.slidesPerGroup > 1 &&
                  "auto" !== t.params.slidesPerView &&
                  (l += Math.ceil(s / 2) - a * (n.length - 1)),
                  (l = Math.min(Math.max(l, -1), 1)),
                  e
                    .querySelectorAll(`${i}, [data-swiper-parallax-rotate]`)
                    .forEach((e) => {
                      r(e, l);
                    });
              });
          };
        a("beforeInit", () => {
          t.params.parallax.enabled &&
            ((t.params.watchSlidesProgress = !0),
            (t.originalParams.watchSlidesProgress = !0));
        }),
          a("init", () => {
            t.params.parallax.enabled && n();
          }),
          a("setTranslate", () => {
            t.params.parallax.enabled && n();
          }),
          a("setTransition", (e, s) => {
            t.params.parallax.enabled &&
              (function (e) {
                void 0 === e && (e = t.params.speed);
                const { el: s, hostEl: a } = t,
                  r = [...s.querySelectorAll(i)];
                t.isElement && r.push(...a.querySelectorAll(i)),
                  r.forEach((t) => {
                    let s =
                      parseInt(
                        t.getAttribute("data-swiper-parallax-duration"),
                        10
                      ) || e;
                    0 === e && (s = 0), (t.style.transitionDuration = `${s}ms`);
                  });
              })(s);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const n = r();
        s({
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        }),
          (t.zoom = { enabled: !1 });
        let l,
          o,
          c = 1,
          p = !1;
        const u = [],
          m = {
            originX: 0,
            originY: 0,
            slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            imageEl: void 0,
            imageWrapEl: void 0,
            maxRatio: 3,
          },
          h = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {},
          },
          g = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0,
          };
        let v = 1;
        function b() {
          if (u.length < 2) return 1;
          const e = u[0].pageX,
            t = u[0].pageY,
            s = u[1].pageX,
            a = u[1].pageY;
          return Math.sqrt((s - e) ** 2 + (a - t) ** 2);
        }
        function y(e) {
          const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
          return (
            !!e.target.matches(s) ||
            t.slides.filter((t) => t.contains(e.target)).length > 0
          );
        }
        function x(e) {
          if (("mouse" === e.pointerType && u.splice(0, u.length), !y(e))) return;
          const s = t.params.zoom;
          if (((l = !1), (o = !1), u.push(e), !(u.length < 2))) {
            if (((l = !0), (m.scaleStart = b()), !m.slideEl)) {
              (m.slideEl = e.target.closest(
                `.${t.params.slideClass}, swiper-slide`
              )),
                m.slideEl || (m.slideEl = t.slides[t.activeIndex]);
              let a = m.slideEl.querySelector(`.${s.containerClass}`);
              if (
                (a &&
                  (a = a.querySelectorAll(
                    "picture, img, svg, canvas, .swiper-zoom-target"
                  )[0]),
                (m.imageEl = a),
                (m.imageWrapEl = a
                  ? E(m.imageEl, `.${s.containerClass}`)[0]
                  : void 0),
                !m.imageWrapEl)
              )
                return void (m.imageEl = void 0);
              m.maxRatio =
                m.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio;
            }
            if (m.imageEl) {
              const [e, t] = (function () {
                if (u.length < 2) return { x: null, y: null };
                const e = m.imageEl.getBoundingClientRect();
                return [
                  (u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x - n.scrollX) /
                    c,
                  (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y - n.scrollY) /
                    c,
                ];
              })();
              (m.originX = e),
                (m.originY = t),
                (m.imageEl.style.transitionDuration = "0ms");
            }
            p = !0;
          }
        }
        function S(e) {
          if (!y(e)) return;
          const s = t.params.zoom,
            a = t.zoom,
            i = u.findIndex((t) => t.pointerId === e.pointerId);
          i >= 0 && (u[i] = e),
            u.length < 2 ||
              ((o = !0),
              (m.scaleMove = b()),
              m.imageEl &&
                ((a.scale = (m.scaleMove / m.scaleStart) * c),
                a.scale > m.maxRatio &&
                  (a.scale = m.maxRatio - 1 + (a.scale - m.maxRatio + 1) ** 0.5),
                a.scale < s.minRatio &&
                  (a.scale = s.minRatio + 1 - (s.minRatio - a.scale + 1) ** 0.5),
                (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`)));
        }
        function T(e) {
          if (!y(e)) return;
          if ("mouse" === e.pointerType && "pointerout" === e.type) return;
          const s = t.params.zoom,
            a = t.zoom,
            i = u.findIndex((t) => t.pointerId === e.pointerId);
          i >= 0 && u.splice(i, 1),
            l &&
              o &&
              ((l = !1),
              (o = !1),
              m.imageEl &&
                ((a.scale = Math.max(Math.min(a.scale, m.maxRatio), s.minRatio)),
                (m.imageEl.style.transitionDuration = `${t.params.speed}ms`),
                (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`),
                (c = a.scale),
                (p = !1),
                a.scale > 1 && m.slideEl
                  ? m.slideEl.classList.add(`${s.zoomedSlideClass}`)
                  : a.scale <= 1 &&
                    m.slideEl &&
                    m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
                1 === a.scale &&
                  ((m.originX = 0), (m.originY = 0), (m.slideEl = void 0))));
        }
        function M(e) {
          if (
            !y(e) ||
            !(function (e) {
              const s = `.${t.params.zoom.containerClass}`;
              return (
                !!e.target.matches(s) ||
                [...t.hostEl.querySelectorAll(s)].filter((t) =>
                  t.contains(e.target)
                ).length > 0
              );
            })(e)
          )
            return;
          const s = t.zoom;
          if (!m.imageEl) return;
          if (!h.isTouched || !m.slideEl) return;
          h.isMoved ||
            ((h.width = m.imageEl.offsetWidth),
            (h.height = m.imageEl.offsetHeight),
            (h.startX = d(m.imageWrapEl, "x") || 0),
            (h.startY = d(m.imageWrapEl, "y") || 0),
            (m.slideWidth = m.slideEl.offsetWidth),
            (m.slideHeight = m.slideEl.offsetHeight),
            (m.imageWrapEl.style.transitionDuration = "0ms"));
          const a = h.width * s.scale,
            i = h.height * s.scale;
          if (a < m.slideWidth && i < m.slideHeight) return;
          (h.minX = Math.min(m.slideWidth / 2 - a / 2, 0)),
            (h.maxX = -h.minX),
            (h.minY = Math.min(m.slideHeight / 2 - i / 2, 0)),
            (h.maxY = -h.minY),
            (h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX),
            (h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY);
          if (
            (Math.max(
              Math.abs(h.touchesCurrent.x - h.touchesStart.x),
              Math.abs(h.touchesCurrent.y - h.touchesStart.y)
            ) > 5 && (t.allowClick = !1),
            !h.isMoved && !p)
          ) {
            if (
              t.isHorizontal() &&
              ((Math.floor(h.minX) === Math.floor(h.startX) &&
                h.touchesCurrent.x < h.touchesStart.x) ||
                (Math.floor(h.maxX) === Math.floor(h.startX) &&
                  h.touchesCurrent.x > h.touchesStart.x))
            )
              return void (h.isTouched = !1);
            if (
              !t.isHorizontal() &&
              ((Math.floor(h.minY) === Math.floor(h.startY) &&
                h.touchesCurrent.y < h.touchesStart.y) ||
                (Math.floor(h.maxY) === Math.floor(h.startY) &&
                  h.touchesCurrent.y > h.touchesStart.y))
            )
              return void (h.isTouched = !1);
          }
          e.cancelable && e.preventDefault(),
            e.stopPropagation(),
            (h.isMoved = !0);
          const r = (s.scale - c) / (m.maxRatio - t.params.zoom.minRatio),
            { originX: n, originY: l } = m;
          (h.currentX =
            h.touchesCurrent.x -
            h.touchesStart.x +
            h.startX +
            r * (h.width - 2 * n)),
            (h.currentY =
              h.touchesCurrent.y -
              h.touchesStart.y +
              h.startY +
              r * (h.height - 2 * l)),
            h.currentX < h.minX &&
              (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** 0.8),
            h.currentX > h.maxX &&
              (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** 0.8),
            h.currentY < h.minY &&
              (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** 0.8),
            h.currentY > h.maxY &&
              (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** 0.8),
            g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x),
            g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y),
            g.prevTime || (g.prevTime = Date.now()),
            (g.x =
              (h.touchesCurrent.x - g.prevPositionX) /
              (Date.now() - g.prevTime) /
              2),
            (g.y =
              (h.touchesCurrent.y - g.prevPositionY) /
              (Date.now() - g.prevTime) /
              2),
            Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
            Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
            (g.prevPositionX = h.touchesCurrent.x),
            (g.prevPositionY = h.touchesCurrent.y),
            (g.prevTime = Date.now()),
            (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`);
        }
        function C() {
          const e = t.zoom;
          m.slideEl &&
            t.activeIndex !== t.slides.indexOf(m.slideEl) &&
            (m.imageEl &&
              (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            m.imageWrapEl &&
              (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),
            (e.scale = 1),
            (c = 1),
            (m.slideEl = void 0),
            (m.imageEl = void 0),
            (m.imageWrapEl = void 0),
            (m.originX = 0),
            (m.originY = 0));
        }
        function P(e) {
          const s = t.zoom,
            a = t.params.zoom;
          if (!m.slideEl) {
            e &&
              e.target &&
              (m.slideEl = e.target.closest(
                `.${t.params.slideClass}, swiper-slide`
              )),
              m.slideEl ||
                (t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? (m.slideEl = f(
                      t.slidesEl,
                      `.${t.params.slideActiveClass}`
                    )[0])
                  : (m.slideEl = t.slides[t.activeIndex]));
            let s = m.slideEl.querySelector(`.${a.containerClass}`);
            s &&
              (s = s.querySelectorAll(
                "picture, img, svg, canvas, .swiper-zoom-target"
              )[0]),
              (m.imageEl = s),
              (m.imageWrapEl = s
                ? E(m.imageEl, `.${a.containerClass}`)[0]
                : void 0);
          }
          if (!m.imageEl || !m.imageWrapEl) return;
          let i, r, l, o, d, p, u, g, v, b, y, x, S, T, M, C, P, L;
          t.params.cssMode &&
            ((t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.touchAction = "none")),
            m.slideEl.classList.add(`${a.zoomedSlideClass}`),
            void 0 === h.touchesStart.x && e
              ? ((i = e.pageX), (r = e.pageY))
              : ((i = h.touchesStart.x), (r = h.touchesStart.y));
          const I = "number" == typeof e ? e : null;
          1 === c && I && ((i = void 0), (r = void 0)),
            (s.scale =
              I || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio),
            (c =
              I || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio),
            !e || (1 === c && I)
              ? ((u = 0), (g = 0))
              : ((P = m.slideEl.offsetWidth),
                (L = m.slideEl.offsetHeight),
                (l = w(m.slideEl).left + n.scrollX),
                (o = w(m.slideEl).top + n.scrollY),
                (d = l + P / 2 - i),
                (p = o + L / 2 - r),
                (v = m.imageEl.offsetWidth),
                (b = m.imageEl.offsetHeight),
                (y = v * s.scale),
                (x = b * s.scale),
                (S = Math.min(P / 2 - y / 2, 0)),
                (T = Math.min(L / 2 - x / 2, 0)),
                (M = -S),
                (C = -T),
                (u = d * s.scale),
                (g = p * s.scale),
                u < S && (u = S),
                u > M && (u = M),
                g < T && (g = T),
                g > C && (g = C)),
            I && 1 === s.scale && ((m.originX = 0), (m.originY = 0)),
            (m.imageWrapEl.style.transitionDuration = "300ms"),
            (m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`),
            (m.imageEl.style.transitionDuration = "300ms"),
            (m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`);
        }
        function L() {
          const e = t.zoom,
            s = t.params.zoom;
          if (!m.slideEl) {
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? (m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0])
              : (m.slideEl = t.slides[t.activeIndex]);
            let e = m.slideEl.querySelector(`.${s.containerClass}`);
            e &&
              (e = e.querySelectorAll(
                "picture, img, svg, canvas, .swiper-zoom-target"
              )[0]),
              (m.imageEl = e),
              (m.imageWrapEl = e
                ? E(m.imageEl, `.${s.containerClass}`)[0]
                : void 0);
          }
          m.imageEl &&
            m.imageWrapEl &&
            (t.params.cssMode &&
              ((t.wrapperEl.style.overflow = ""),
              (t.wrapperEl.style.touchAction = "")),
            (e.scale = 1),
            (c = 1),
            (m.imageWrapEl.style.transitionDuration = "300ms"),
            (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            (m.imageEl.style.transitionDuration = "300ms"),
            (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
            (m.slideEl = void 0),
            (m.originX = 0),
            (m.originY = 0));
        }
        function I(e) {
          const s = t.zoom;
          s.scale && 1 !== s.scale ? L() : P(e);
        }
        function A() {
          return {
            passiveListener: !!t.params.passiveListeners && {
              passive: !0,
              capture: !1,
            },
            activeListenerWithCapture: !t.params.passiveListeners || {
              passive: !1,
              capture: !0,
            },
          };
        }
        function z() {
          const e = t.zoom;
          if (e.enabled) return;
          e.enabled = !0;
          const { passiveListener: s, activeListenerWithCapture: a } = A();
          t.wrapperEl.addEventListener("pointerdown", x, s),
            t.wrapperEl.addEventListener("pointermove", S, a),
            ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
              t.wrapperEl.addEventListener(e, T, s);
            }),
            t.wrapperEl.addEventListener("pointermove", M, a);
        }
        function $() {
          const e = t.zoom;
          if (!e.enabled) return;
          e.enabled = !1;
          const { passiveListener: s, activeListenerWithCapture: a } = A();
          t.wrapperEl.removeEventListener("pointerdown", x, s),
            t.wrapperEl.removeEventListener("pointermove", S, a),
            ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
              t.wrapperEl.removeEventListener(e, T, s);
            }),
            t.wrapperEl.removeEventListener("pointermove", M, a);
        }
        Object.defineProperty(t.zoom, "scale", {
          get: () => v,
          set(e) {
            if (v !== e) {
              const t = m.imageEl,
                s = m.slideEl;
              i("zoomChange", e, t, s);
            }
            v = e;
          },
        }),
          a("init", () => {
            t.params.zoom.enabled && z();
          }),
          a("destroy", () => {
            $();
          }),
          a("touchStart", (e, s) => {
            t.zoom.enabled &&
              (function (e) {
                const s = t.device;
                if (!m.imageEl) return;
                if (h.isTouched) return;
                s.android && e.cancelable && e.preventDefault(),
                  (h.isTouched = !0);
                const a = u.length > 0 ? u[0] : e;
                (h.touchesStart.x = a.pageX), (h.touchesStart.y = a.pageY);
              })(s);
          }),
          a("touchEnd", (e, s) => {
            t.zoom.enabled &&
              (function () {
                const e = t.zoom;
                if (!m.imageEl) return;
                if (!h.isTouched || !h.isMoved)
                  return (h.isTouched = !1), void (h.isMoved = !1);
                (h.isTouched = !1), (h.isMoved = !1);
                let s = 300,
                  a = 300;
                const i = g.x * s,
                  r = h.currentX + i,
                  n = g.y * a,
                  l = h.currentY + n;
                0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)),
                  0 !== g.y && (a = Math.abs((l - h.currentY) / g.y));
                const o = Math.max(s, a);
                (h.currentX = r), (h.currentY = l);
                const d = h.width * e.scale,
                  c = h.height * e.scale;
                (h.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                  (h.maxX = -h.minX),
                  (h.minY = Math.min(m.slideHeight / 2 - c / 2, 0)),
                  (h.maxY = -h.minY),
                  (h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX)),
                  (h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY)),
                  (m.imageWrapEl.style.transitionDuration = `${o}ms`),
                  (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`);
              })();
          }),
          a("doubleTap", (e, s) => {
            !t.animating &&
              t.params.zoom.enabled &&
              t.zoom.enabled &&
              t.params.zoom.toggle &&
              I(s);
          }),
          a("transitionEnd", () => {
            t.zoom.enabled && t.params.zoom.enabled && C();
          }),
          a("slideChange", () => {
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C();
          }),
          Object.assign(t.zoom, {
            enable: z,
            disable: $,
            in: P,
            out: L,
            toggle: I,
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        function i(e, t) {
          const s = (function () {
            let e, t, s;
            return (a, i) => {
              for (t = -1, e = a.length; e - t > 1; )
                (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
              return e;
            };
          })();
          let a, i;
          return (
            (this.x = e),
            (this.y = t),
            (this.lastIndex = e.length - 1),
            (this.interpolate = function (e) {
              return e
                ? ((i = s(this.x, e)),
                  (a = i - 1),
                  ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                    (this.x[i] - this.x[a]) +
                    this.y[a])
                : 0;
            }),
            this
          );
        }
        function r() {
          t.controller.control &&
            t.controller.spline &&
            ((t.controller.spline = void 0), delete t.controller.spline);
        }
        s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
          (t.controller = { control: void 0 }),
          a("beforeInit", () => {
            if (
              "undefined" != typeof window &&
              ("string" == typeof t.params.controller.control ||
                t.params.controller.control instanceof HTMLElement)
            ) {
              const e = document.querySelector(t.params.controller.control);
              if (e && e.swiper) t.controller.control = e.swiper;
              else if (e) {
                const s = (a) => {
                  (t.controller.control = a.detail[0]),
                    t.update(),
                    e.removeEventListener("init", s);
                };
                e.addEventListener("init", s);
              }
            } else t.controller.control = t.params.controller.control;
          }),
          a("update", () => {
            r();
          }),
          a("resize", () => {
            r();
          }),
          a("observerUpdate", () => {
            r();
          }),
          a("setTranslate", (e, s, a) => {
            t.controller.control &&
              !t.controller.control.destroyed &&
              t.controller.setTranslate(s, a);
          }),
          a("setTransition", (e, s, a) => {
            t.controller.control &&
              !t.controller.control.destroyed &&
              t.controller.setTransition(s, a);
          }),
          Object.assign(t.controller, {
            setTranslate: function (e, s) {
              const a = t.controller.control;
              let r, n;
              const l = t.constructor;
              function o(e) {
                if (e.destroyed) return;
                const s = t.rtlTranslate ? -t.translate : t.translate;
                "slide" === t.params.controller.by &&
                  (!(function (e) {
                    t.controller.spline = t.params.loop
                      ? new i(t.slidesGrid, e.slidesGrid)
                      : new i(t.snapGrid, e.snapGrid);
                  })(e),
                  (n = -t.controller.spline.interpolate(-s))),
                  (n && "container" !== t.params.controller.by) ||
                    ((r =
                      (e.maxTranslate() - e.minTranslate()) /
                      (t.maxTranslate() - t.minTranslate())),
                    (!Number.isNaN(r) && Number.isFinite(r)) || (r = 1),
                    (n = (s - t.minTranslate()) * r + e.minTranslate())),
                  t.params.controller.inverse && (n = e.maxTranslate() - n),
                  e.updateProgress(n),
                  e.setTranslate(n, t),
                  e.updateActiveIndex(),
                  e.updateSlidesClasses();
              }
              if (Array.isArray(a))
                for (let e = 0; e < a.length; e += 1)
                  a[e] !== s && a[e] instanceof l && o(a[e]);
              else a instanceof l && s !== a && o(a);
            },
            setTransition: function (e, s) {
              const a = t.constructor,
                i = t.controller.control;
              let r;
              function n(s) {
                s.destroyed ||
                  (s.setTransition(e, t),
                  0 !== e &&
                    (s.transitionStart(),
                    s.params.autoHeight &&
                      l(() => {
                        s.updateAutoHeight();
                      }),
                    x(s.wrapperEl, () => {
                      i && s.transitionEnd();
                    })));
              }
              if (Array.isArray(i))
                for (r = 0; r < i.length; r += 1)
                  i[r] !== s && i[r] instanceof a && n(i[r]);
              else i instanceof a && s !== i && n(i);
            },
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null,
          },
        }),
          (t.a11y = { clicked: !1 });
        let i = null;
        function r(e) {
          const t = i;
          0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
        }
        function n(e) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("tabIndex", "0");
          });
        }
        function l(e) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("tabIndex", "-1");
          });
        }
        function o(e, t) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("role", t);
          });
        }
        function d(e, t) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("aria-roledescription", t);
          });
        }
        function c(e, t) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("aria-label", t);
          });
        }
        function p(e) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("aria-disabled", !0);
          });
        }
        function u(e) {
          (e = T(e)).forEach((e) => {
            e.setAttribute("aria-disabled", !1);
          });
        }
        function m(e) {
          if (13 !== e.keyCode && 32 !== e.keyCode) return;
          const s = t.params.a11y,
            a = e.target;
          (t.pagination &&
            t.pagination.el &&
            (a === t.pagination.el || t.pagination.el.contains(e.target)) &&
            !e.target.matches(ae(t.params.pagination.bulletClass))) ||
            (t.navigation &&
              t.navigation.nextEl &&
              a === t.navigation.nextEl &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
            t.navigation &&
              t.navigation.prevEl &&
              a === t.navigation.prevEl &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
            t.pagination &&
              a.matches(ae(t.params.pagination.bulletClass)) &&
              a.click());
        }
        function h() {
          return (
            t.pagination && t.pagination.bullets && t.pagination.bullets.length
          );
        }
        function f() {
          return h() && t.params.pagination.clickable;
        }
        const g = (e, t, s) => {
            n(e),
              "BUTTON" !== e.tagName &&
                (o(e, "button"), e.addEventListener("keydown", m)),
              c(e, s),
              (function (e, t) {
                (e = T(e)).forEach((e) => {
                  e.setAttribute("aria-controls", t);
                });
              })(e, t);
          },
          w = () => {
            t.a11y.clicked = !0;
          },
          b = () => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                t.destroyed || (t.a11y.clicked = !1);
              });
            });
          },
          E = (e) => {
            if (t.a11y.clicked) return;
            const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
            if (!s || !t.slides.includes(s)) return;
            const a = t.slides.indexOf(s) === t.activeIndex,
              i =
                t.params.watchSlidesProgress &&
                t.visibleSlides &&
                t.visibleSlides.includes(s);
            a ||
              i ||
              (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
              (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
              t.slideTo(t.slides.indexOf(s), 0));
          },
          x = () => {
            const e = t.params.a11y;
            e.itemRoleDescriptionMessage &&
              d(t.slides, e.itemRoleDescriptionMessage),
              e.slideRole && o(t.slides, e.slideRole);
            const s = t.slides.length;
            e.slideLabelMessage &&
              t.slides.forEach((a, i) => {
                const r = t.params.loop
                  ? parseInt(a.getAttribute("data-swiper-slide-index"), 10)
                  : i;
                c(
                  a,
                  e.slideLabelMessage
                    .replace(/\{\{index\}\}/, r + 1)
                    .replace(/\{\{slidesLength\}\}/, s)
                );
              });
          },
          S = () => {
            const e = t.params.a11y;
            t.el.append(i);
            const s = t.el;
            e.containerRoleDescriptionMessage &&
              d(s, e.containerRoleDescriptionMessage),
              e.containerMessage && c(s, e.containerMessage);
            const a = t.wrapperEl,
              r =
                e.id ||
                a.getAttribute("id") ||
                `swiper-wrapper-${
                  ((n = 16),
                  void 0 === n && (n = 16),
                  "x"
                    .repeat(n)
                    .replace(/x/g, () =>
                      Math.round(16 * Math.random()).toString(16)
                    ))
                }`;
            var n;
            const l =
              t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
            var o;
            (o = r),
              T(a).forEach((e) => {
                e.setAttribute("id", o);
              }),
              (function (e, t) {
                (e = T(e)).forEach((e) => {
                  e.setAttribute("aria-live", t);
                });
              })(a, l),
              x();
            let { nextEl: p, prevEl: u } = t.navigation ? t.navigation : {};
            if (
              ((p = T(p)),
              (u = T(u)),
              p && p.forEach((t) => g(t, r, e.nextSlideMessage)),
              u && u.forEach((t) => g(t, r, e.prevSlideMessage)),
              f())
            ) {
              T(t.pagination.el).forEach((e) => {
                e.addEventListener("keydown", m);
              });
            }
            t.el.addEventListener("focus", E, !0),
              t.el.addEventListener("pointerdown", w, !0),
              t.el.addEventListener("pointerup", b, !0);
          };
        a("beforeInit", () => {
          (i = v("span", t.params.a11y.notificationClass)),
            i.setAttribute("aria-live", "assertive"),
            i.setAttribute("aria-atomic", "true");
        }),
          a("afterInit", () => {
            t.params.a11y.enabled && S();
          }),
          a(
            "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
            () => {
              t.params.a11y.enabled && x();
            }
          ),
          a("fromEdge toEdge afterInit lock unlock", () => {
            t.params.a11y.enabled &&
              (function () {
                if (t.params.loop || t.params.rewind || !t.navigation) return;
                const { nextEl: e, prevEl: s } = t.navigation;
                s && (t.isBeginning ? (p(s), l(s)) : (u(s), n(s))),
                  e && (t.isEnd ? (p(e), l(e)) : (u(e), n(e)));
              })();
          }),
          a("paginationUpdate", () => {
            t.params.a11y.enabled &&
              (function () {
                const e = t.params.a11y;
                h() &&
                  t.pagination.bullets.forEach((s) => {
                    t.params.pagination.clickable &&
                      (n(s),
                      t.params.pagination.renderBullet ||
                        (o(s, "button"),
                        c(
                          s,
                          e.paginationBulletMessage.replace(
                            /\{\{index\}\}/,
                            y(s) + 1
                          )
                        ))),
                      s.matches(ae(t.params.pagination.bulletActiveClass))
                        ? s.setAttribute("aria-current", "true")
                        : s.removeAttribute("aria-current");
                  });
              })();
          }),
          a("destroy", () => {
            t.params.a11y.enabled &&
              (function () {
                i && i.remove();
                let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {};
                (e = T(e)),
                  (s = T(s)),
                  e && e.forEach((e) => e.removeEventListener("keydown", m)),
                  s && s.forEach((e) => e.removeEventListener("keydown", m)),
                  f() &&
                    T(t.pagination.el).forEach((e) => {
                      e.removeEventListener("keydown", m);
                    });
                t.el.removeEventListener("focus", E, !0),
                  t.el.removeEventListener("pointerdown", w, !0),
                  t.el.removeEventListener("pointerup", b, !0);
              })();
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          history: {
            enabled: !1,
            root: "",
            replaceState: !1,
            key: "slides",
            keepQuery: !1,
          },
        });
        let i = !1,
          n = {};
        const l = (e) =>
            e
              .toString()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, ""),
          o = (e) => {
            const t = r();
            let s;
            s = e ? new URL(e) : t.location;
            const a = s.pathname
                .slice(1)
                .split("/")
                .filter((e) => "" !== e),
              i = a.length;
            return { key: a[i - 2], value: a[i - 1] };
          },
          d = (e, s) => {
            const a = r();
            if (!i || !t.params.history.enabled) return;
            let n;
            n = t.params.url ? new URL(t.params.url) : a.location;
            const o = t.slides[s];
            let d = l(o.getAttribute("data-history"));
            if (t.params.history.root.length > 0) {
              let s = t.params.history.root;
              "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
                (d = `${s}/${e ? `${e}/` : ""}${d}`);
            } else n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`);
            t.params.history.keepQuery && (d += n.search);
            const c = a.history.state;
            (c && c.value === d) ||
              (t.params.history.replaceState
                ? a.history.replaceState({ value: d }, null, d)
                : a.history.pushState({ value: d }, null, d));
          },
          c = (e, s, a) => {
            if (s)
              for (let i = 0, r = t.slides.length; i < r; i += 1) {
                const r = t.slides[i];
                if (l(r.getAttribute("data-history")) === s) {
                  const s = t.getSlideIndex(r);
                  t.slideTo(s, e, a);
                }
              }
            else t.slideTo(0, e, a);
          },
          p = () => {
            (n = o(t.params.url)), c(t.params.speed, n.value, !1);
          };
        a("init", () => {
          t.params.history.enabled &&
            (() => {
              const e = r();
              if (t.params.history) {
                if (!e.history || !e.history.pushState)
                  return (
                    (t.params.history.enabled = !1),
                    void (t.params.hashNavigation.enabled = !0)
                  );
                (i = !0),
                  (n = o(t.params.url)),
                  n.key || n.value
                    ? (c(0, n.value, t.params.runCallbacksOnInit),
                      t.params.history.replaceState ||
                        e.addEventListener("popstate", p))
                    : t.params.history.replaceState ||
                      e.addEventListener("popstate", p);
              }
            })();
        }),
          a("destroy", () => {
            t.params.history.enabled &&
              (() => {
                const e = r();
                t.params.history.replaceState ||
                  e.removeEventListener("popstate", p);
              })();
          }),
          a("transitionEnd _freeModeNoMomentumRelease", () => {
            i && d(t.params.history.key, t.activeIndex);
          }),
          a("slideChange", () => {
            i && t.params.cssMode && d(t.params.history.key, t.activeIndex);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, emit: i, on: n } = e,
          l = !1;
        const o = a(),
          d = r();
        s({
          hashNavigation: {
            enabled: !1,
            replaceState: !1,
            watchState: !1,
            getSlideIndex(e, s) {
              if (t.virtual && t.params.virtual.enabled) {
                const e = t.slides.filter(
                  (e) => e.getAttribute("data-hash") === s
                )[0];
                if (!e) return 0;
                return parseInt(e.getAttribute("data-swiper-slide-index"), 10);
              }
              return t.getSlideIndex(
                f(
                  t.slidesEl,
                  `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`
                )[0]
              );
            },
          },
        });
        const c = () => {
            i("hashChange");
            const e = o.location.hash.replace("#", ""),
              s =
                t.virtual && t.params.virtual.enabled
                  ? t.slidesEl.querySelector(
                      `[data-swiper-slide-index="${t.activeIndex}"]`
                    )
                  : t.slides[t.activeIndex];
            if (e !== (s ? s.getAttribute("data-hash") : "")) {
              const s = t.params.hashNavigation.getSlideIndex(t, e);
              if (void 0 === s || Number.isNaN(s)) return;
              t.slideTo(s);
            }
          },
          p = () => {
            if (!l || !t.params.hashNavigation.enabled) return;
            const e =
                t.virtual && t.params.virtual.enabled
                  ? t.slidesEl.querySelector(
                      `[data-swiper-slide-index="${t.activeIndex}"]`
                    )
                  : t.slides[t.activeIndex],
              s = e
                ? e.getAttribute("data-hash") || e.getAttribute("data-history")
                : "";
            t.params.hashNavigation.replaceState &&
            d.history &&
            d.history.replaceState
              ? (d.history.replaceState(null, null, `#${s}` || ""), i("hashSet"))
              : ((o.location.hash = s || ""), i("hashSet"));
          };
        n("init", () => {
          t.params.hashNavigation.enabled &&
            (() => {
              if (
                !t.params.hashNavigation.enabled ||
                (t.params.history && t.params.history.enabled)
              )
                return;
              l = !0;
              const e = o.location.hash.replace("#", "");
              if (e) {
                const s = 0,
                  a = t.params.hashNavigation.getSlideIndex(t, e);
                t.slideTo(a || 0, s, t.params.runCallbacksOnInit, !0);
              }
              t.params.hashNavigation.watchState &&
                d.addEventListener("hashchange", c);
            })();
        }),
          n("destroy", () => {
            t.params.hashNavigation.enabled &&
              t.params.hashNavigation.watchState &&
              d.removeEventListener("hashchange", c);
          }),
          n("transitionEnd _freeModeNoMomentumRelease", () => {
            l && p();
          }),
          n("slideChange", () => {
            l && t.params.cssMode && p();
          });
      },
      function (e) {
        let t,
          s,
          { swiper: i, extendParams: r, on: n, emit: l, params: o } = e;
        (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
          r({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !1,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          });
        let d,
          c,
          p,
          u,
          m,
          h,
          f,
          g,
          v = o && o.autoplay ? o.autoplay.delay : 3e3,
          w = o && o.autoplay ? o.autoplay.delay : 3e3,
          b = new Date().getTime();
        function y(e) {
          i &&
            !i.destroyed &&
            i.wrapperEl &&
            e.target === i.wrapperEl &&
            (i.wrapperEl.removeEventListener("transitionend", y), g || C());
        }
        const E = () => {
            if (i.destroyed || !i.autoplay.running) return;
            i.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
            const e = i.autoplay.paused ? d : b + w - new Date().getTime();
            (i.autoplay.timeLeft = e),
              l("autoplayTimeLeft", e, e / v),
              (s = requestAnimationFrame(() => {
                E();
              }));
          },
          x = (e) => {
            if (i.destroyed || !i.autoplay.running) return;
            cancelAnimationFrame(s), E();
            let a = void 0 === e ? i.params.autoplay.delay : e;
            (v = i.params.autoplay.delay), (w = i.params.autoplay.delay);
            const r = (() => {
              let e;
              if (
                ((e =
                  i.virtual && i.params.virtual.enabled
                    ? i.slides.filter((e) =>
                        e.classList.contains("swiper-slide-active")
                      )[0]
                    : i.slides[i.activeIndex]),
                !e)
              )
                return;
              return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
            })();
            !Number.isNaN(r) &&
              r > 0 &&
              void 0 === e &&
              ((a = r), (v = r), (w = r)),
              (d = a);
            const n = i.params.speed,
              o = () => {
                i &&
                  !i.destroyed &&
                  (i.params.autoplay.reverseDirection
                    ? !i.isBeginning || i.params.loop || i.params.rewind
                      ? (i.slidePrev(n, !0, !0), l("autoplay"))
                      : i.params.autoplay.stopOnLastSlide ||
                        (i.slideTo(i.slides.length - 1, n, !0, !0), l("autoplay"))
                    : !i.isEnd || i.params.loop || i.params.rewind
                    ? (i.slideNext(n, !0, !0), l("autoplay"))
                    : i.params.autoplay.stopOnLastSlide ||
                      (i.slideTo(0, n, !0, !0), l("autoplay")),
                  i.params.cssMode &&
                    ((b = new Date().getTime()),
                    requestAnimationFrame(() => {
                      x();
                    })));
              };
            return (
              a > 0
                ? (clearTimeout(t),
                  (t = setTimeout(() => {
                    o();
                  }, a)))
                : requestAnimationFrame(() => {
                    o();
                  }),
              a
            );
          },
          S = () => {
            (b = new Date().getTime()),
              (i.autoplay.running = !0),
              x(),
              l("autoplayStart");
          },
          T = () => {
            (i.autoplay.running = !1),
              clearTimeout(t),
              cancelAnimationFrame(s),
              l("autoplayStop");
          },
          M = (e, s) => {
            if (i.destroyed || !i.autoplay.running) return;
            clearTimeout(t), e || (f = !0);
            const a = () => {
              l("autoplayPause"),
                i.params.autoplay.waitForTransition
                  ? i.wrapperEl.addEventListener("transitionend", y)
                  : C();
            };
            if (((i.autoplay.paused = !0), s))
              return h && (d = i.params.autoplay.delay), (h = !1), void a();
            const r = d || i.params.autoplay.delay;
            (d = r - (new Date().getTime() - b)),
              (i.isEnd && d < 0 && !i.params.loop) || (d < 0 && (d = 0), a());
          },
          C = () => {
            (i.isEnd && d < 0 && !i.params.loop) ||
              i.destroyed ||
              !i.autoplay.running ||
              ((b = new Date().getTime()),
              f ? ((f = !1), x(d)) : x(),
              (i.autoplay.paused = !1),
              l("autoplayResume"));
          },
          P = () => {
            if (i.destroyed || !i.autoplay.running) return;
            const e = a();
            "hidden" === e.visibilityState && ((f = !0), M(!0)),
              "visible" === e.visibilityState && C();
          },
          L = (e) => {
            "mouse" === e.pointerType &&
              ((f = !0), (g = !0), i.animating || i.autoplay.paused || M(!0));
          },
          I = (e) => {
            "mouse" === e.pointerType && ((g = !1), i.autoplay.paused && C());
          };
        n("init", () => {
          i.params.autoplay.enabled &&
            (i.params.autoplay.pauseOnMouseEnter &&
              (i.el.addEventListener("pointerenter", L),
              i.el.addEventListener("pointerleave", I)),
            a().addEventListener("visibilitychange", P),
            S());
        }),
          n("destroy", () => {
            i.el.removeEventListener("pointerenter", L),
              i.el.removeEventListener("pointerleave", I),
              a().removeEventListener("visibilitychange", P),
              i.autoplay.running && T();
          }),
          n("_freeModeStaticRelease", () => {
            (u || f) && C();
          }),
          n("_freeModeNoMomentumRelease", () => {
            i.params.autoplay.disableOnInteraction ? T() : M(!0, !0);
          }),
          n("beforeTransitionStart", (e, t, s) => {
            !i.destroyed &&
              i.autoplay.running &&
              (s || !i.params.autoplay.disableOnInteraction ? M(!0, !0) : T());
          }),
          n("sliderFirstMove", () => {
            !i.destroyed &&
              i.autoplay.running &&
              (i.params.autoplay.disableOnInteraction
                ? T()
                : ((p = !0),
                  (u = !1),
                  (f = !1),
                  (m = setTimeout(() => {
                    (f = !0), (u = !0), M(!0);
                  }, 200))));
          }),
          n("touchEnd", () => {
            if (!i.destroyed && i.autoplay.running && p) {
              if (
                (clearTimeout(m),
                clearTimeout(t),
                i.params.autoplay.disableOnInteraction)
              )
                return (u = !1), void (p = !1);
              u && i.params.cssMode && C(), (u = !1), (p = !1);
            }
          }),
          n("slideChange", () => {
            !i.destroyed && i.autoplay.running && (h = !0);
          }),
          Object.assign(i.autoplay, { start: S, stop: T, pause: M, resume: C });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({
          thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs",
          },
        });
        let r = !1,
          n = !1;
        function l() {
          const e = t.thumbs.swiper;
          if (!e || e.destroyed) return;
          const s = e.clickedIndex,
            a = e.clickedSlide;
          if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass))
            return;
          if (null == s) return;
          let i;
          (i = e.params.loop
            ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
            : s),
            t.params.loop ? t.slideToLoop(i) : t.slideTo(i);
        }
        function o() {
          const { thumbs: e } = t.params;
          if (r) return !1;
          r = !0;
          const s = t.constructor;
          if (e.swiper instanceof s)
            (t.thumbs.swiper = e.swiper),
              Object.assign(t.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              Object.assign(t.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              t.thumbs.swiper.update();
          else if (c(e.swiper)) {
            const a = Object.assign({}, e.swiper);
            Object.assign(a, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
              (t.thumbs.swiper = new s(a)),
              (n = !0);
          }
          return (
            t.thumbs.swiper.el.classList.add(
              t.params.thumbs.thumbsContainerClass
            ),
            t.thumbs.swiper.on("tap", l),
            !0
          );
        }
        function d(e) {
          const s = t.thumbs.swiper;
          if (!s || s.destroyed) return;
          const a =
            "auto" === s.params.slidesPerView
              ? s.slidesPerViewDynamic()
              : s.params.slidesPerView;
          let i = 1;
          const r = t.params.thumbs.slideThumbActiveClass;
          if (
            (t.params.slidesPerView > 1 &&
              !t.params.centeredSlides &&
              (i = t.params.slidesPerView),
            t.params.thumbs.multipleActiveThumbs || (i = 1),
            (i = Math.floor(i)),
            s.slides.forEach((e) => e.classList.remove(r)),
            s.params.loop || (s.params.virtual && s.params.virtual.enabled))
          )
            for (let e = 0; e < i; e += 1)
              f(
                s.slidesEl,
                `[data-swiper-slide-index="${t.realIndex + e}"]`
              ).forEach((e) => {
                e.classList.add(r);
              });
          else
            for (let e = 0; e < i; e += 1)
              s.slides[t.realIndex + e] &&
                s.slides[t.realIndex + e].classList.add(r);
          const n = t.params.thumbs.autoScrollOffset,
            l = n && !s.params.loop;
          if (t.realIndex !== s.realIndex || l) {
            const i = s.activeIndex;
            let r, o;
            if (s.params.loop) {
              const e = s.slides.filter(
                (e) =>
                  e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`
              )[0];
              (r = s.slides.indexOf(e)),
                (o = t.activeIndex > t.previousIndex ? "next" : "prev");
            } else (r = t.realIndex), (o = r > t.previousIndex ? "next" : "prev");
            l && (r += "next" === o ? n : -1 * n),
              s.visibleSlidesIndexes &&
                s.visibleSlidesIndexes.indexOf(r) < 0 &&
                (s.params.centeredSlides
                  ? (r =
                      r > i
                        ? r - Math.floor(a / 2) + 1
                        : r + Math.floor(a / 2) - 1)
                  : r > i && s.params.slidesPerGroup,
                s.slideTo(r, e ? 0 : void 0));
          }
        }
        (t.thumbs = { swiper: null }),
          i("beforeInit", () => {
            const { thumbs: e } = t.params;
            if (e && e.swiper)
              if (
                "string" == typeof e.swiper ||
                e.swiper instanceof HTMLElement
              ) {
                const s = a(),
                  i = () => {
                    const a =
                      "string" == typeof e.swiper
                        ? s.querySelector(e.swiper)
                        : e.swiper;
                    if (a && a.swiper) (e.swiper = a.swiper), o(), d(!0);
                    else if (a) {
                      const s = (i) => {
                        (e.swiper = i.detail[0]),
                          a.removeEventListener("init", s),
                          o(),
                          d(!0),
                          e.swiper.update(),
                          t.update();
                      };
                      a.addEventListener("init", s);
                    }
                    return a;
                  },
                  r = () => {
                    if (t.destroyed) return;
                    i() || requestAnimationFrame(r);
                  };
                requestAnimationFrame(r);
              } else o(), d(!0);
          }),
          i("slideChange update resize observerUpdate", () => {
            d();
          }),
          i("setTransition", (e, s) => {
            const a = t.thumbs.swiper;
            a && !a.destroyed && a.setTransition(s);
          }),
          i("beforeDestroy", () => {
            const e = t.thumbs.swiper;
            e && !e.destroyed && n && e.destroy();
          }),
          Object.assign(t.thumbs, { init: o, update: d });
      },
      function (e) {
        let { swiper: t, extendParams: s, emit: a, once: i } = e;
        s({
          freeMode: {
            enabled: !1,
            momentum: !0,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: !1,
            minimumVelocity: 0.02,
          },
        }),
          Object.assign(t, {
            freeMode: {
              onTouchStart: function () {
                if (t.params.cssMode) return;
                const e = t.getTranslate();
                t.setTranslate(e),
                  t.setTransition(0),
                  (t.touchEventsData.velocities.length = 0),
                  t.freeMode.onTouchEnd({
                    currentPos: t.rtl ? t.translate : -t.translate,
                  });
              },
              onTouchMove: function () {
                if (t.params.cssMode) return;
                const { touchEventsData: e, touches: s } = t;
                0 === e.velocities.length &&
                  e.velocities.push({
                    position: s[t.isHorizontal() ? "startX" : "startY"],
                    time: e.touchStartTime,
                  }),
                  e.velocities.push({
                    position: s[t.isHorizontal() ? "currentX" : "currentY"],
                    time: o(),
                  });
              },
              onTouchEnd: function (e) {
                let { currentPos: s } = e;
                if (t.params.cssMode) return;
                const {
                    params: r,
                    wrapperEl: n,
                    rtlTranslate: l,
                    snapGrid: d,
                    touchEventsData: c,
                  } = t,
                  p = o() - c.touchStartTime;
                if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                else if (s > -t.maxTranslate())
                  t.slides.length < d.length
                    ? t.slideTo(d.length - 1)
                    : t.slideTo(t.slides.length - 1);
                else {
                  if (r.freeMode.momentum) {
                    if (c.velocities.length > 1) {
                      const e = c.velocities.pop(),
                        s = c.velocities.pop(),
                        a = e.position - s.position,
                        i = e.time - s.time;
                      (t.velocity = a / i),
                        (t.velocity /= 2),
                        Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                          (t.velocity = 0),
                        (i > 150 || o() - e.time > 300) && (t.velocity = 0);
                    } else t.velocity = 0;
                    (t.velocity *= r.freeMode.momentumVelocityRatio),
                      (c.velocities.length = 0);
                    let e = 1e3 * r.freeMode.momentumRatio;
                    const s = t.velocity * e;
                    let p = t.translate + s;
                    l && (p = -p);
                    let u,
                      m = !1;
                    const h =
                      20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                    let f;
                    if (p < t.maxTranslate())
                      r.freeMode.momentumBounce
                        ? (p + t.maxTranslate() < -h &&
                            (p = t.maxTranslate() - h),
                          (u = t.maxTranslate()),
                          (m = !0),
                          (c.allowMomentumBounce = !0))
                        : (p = t.maxTranslate()),
                        r.loop && r.centeredSlides && (f = !0);
                    else if (p > t.minTranslate())
                      r.freeMode.momentumBounce
                        ? (p - t.minTranslate() > h && (p = t.minTranslate() + h),
                          (u = t.minTranslate()),
                          (m = !0),
                          (c.allowMomentumBounce = !0))
                        : (p = t.minTranslate()),
                        r.loop && r.centeredSlides && (f = !0);
                    else if (r.freeMode.sticky) {
                      let e;
                      for (let t = 0; t < d.length; t += 1)
                        if (d[t] > -p) {
                          e = t;
                          break;
                        }
                      (p =
                        Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) ||
                        "next" === t.swipeDirection
                          ? d[e]
                          : d[e - 1]),
                        (p = -p);
                    }
                    if (
                      (f &&
                        i("transitionEnd", () => {
                          t.loopFix();
                        }),
                      0 !== t.velocity)
                    ) {
                      if (
                        ((e = l
                          ? Math.abs((-p - t.translate) / t.velocity)
                          : Math.abs((p - t.translate) / t.velocity)),
                        r.freeMode.sticky)
                      ) {
                        const s = Math.abs((l ? -p : p) - t.translate),
                          a = t.slidesSizesGrid[t.activeIndex];
                        e =
                          s < a
                            ? r.speed
                            : s < 2 * a
                            ? 1.5 * r.speed
                            : 2.5 * r.speed;
                      }
                    } else if (r.freeMode.sticky) return void t.slideToClosest();
                    r.freeMode.momentumBounce && m
                      ? (t.updateProgress(u),
                        t.setTransition(e),
                        t.setTranslate(p),
                        t.transitionStart(!0, t.swipeDirection),
                        (t.animating = !0),
                        x(n, () => {
                          t &&
                            !t.destroyed &&
                            c.allowMomentumBounce &&
                            (a("momentumBounce"),
                            t.setTransition(r.speed),
                            setTimeout(() => {
                              t.setTranslate(u),
                                x(n, () => {
                                  t && !t.destroyed && t.transitionEnd();
                                });
                            }, 0));
                        }))
                      : t.velocity
                      ? (a("_freeModeNoMomentumRelease"),
                        t.updateProgress(p),
                        t.setTransition(e),
                        t.setTranslate(p),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating ||
                          ((t.animating = !0),
                          x(n, () => {
                            t && !t.destroyed && t.transitionEnd();
                          })))
                      : t.updateProgress(p),
                      t.updateActiveIndex(),
                      t.updateSlidesClasses();
                  } else {
                    if (r.freeMode.sticky) return void t.slideToClosest();
                    r.freeMode && a("_freeModeNoMomentumRelease");
                  }
                  (!r.freeMode.momentum || p >= r.longSwipesMs) &&
                    (a("_freeModeStaticRelease"),
                    t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses());
                }
              },
            },
          });
      },
      function (e) {
        let t,
          s,
          a,
          i,
          { swiper: r, extendParams: n, on: l } = e;
        n({ grid: { rows: 1, fill: "column" } });
        const o = () => {
          let e = r.params.spaceBetween;
          return (
            "string" == typeof e && e.indexOf("%") >= 0
              ? (e = (parseFloat(e.replace("%", "")) / 100) * r.size)
              : "string" == typeof e && (e = parseFloat(e)),
            e
          );
        };
        l("init", () => {
          i = r.params.grid && r.params.grid.rows > 1;
        }),
          l("update", () => {
            const { params: e, el: t } = r,
              s = e.grid && e.grid.rows > 1;
            i && !s
              ? (t.classList.remove(
                  `${e.containerModifierClass}grid`,
                  `${e.containerModifierClass}grid-column`
                ),
                (a = 1),
                r.emitContainerClasses())
              : !i &&
                s &&
                (t.classList.add(`${e.containerModifierClass}grid`),
                "column" === e.grid.fill &&
                  t.classList.add(`${e.containerModifierClass}grid-column`),
                r.emitContainerClasses()),
              (i = s);
          }),
          (r.grid = {
            initSlides: (e) => {
              const { slidesPerView: i } = r.params,
                { rows: n, fill: l } = r.params.grid,
                o =
                  r.virtual && r.params.virtual.enabled
                    ? r.virtual.slides.length
                    : e.length;
              (a = Math.floor(o / n)),
                (t = Math.floor(o / n) === o / n ? o : Math.ceil(o / n) * n),
                "auto" !== i && "row" === l && (t = Math.max(t, i * n)),
                (s = t / n);
            },
            unsetSlides: () => {
              r.slides &&
                r.slides.forEach((e) => {
                  e.swiperSlideGridSet &&
                    ((e.style.height = ""),
                    (e.style[r.getDirectionLabel("margin-top")] = ""));
                });
            },
            updateSlide: (e, i, n) => {
              const { slidesPerGroup: l } = r.params,
                d = o(),
                { rows: c, fill: p } = r.params.grid,
                u =
                  r.virtual && r.params.virtual.enabled
                    ? r.virtual.slides.length
                    : n.length;
              let m, h, f;
              if ("row" === p && l > 1) {
                const s = Math.floor(e / (l * c)),
                  a = e - c * l * s,
                  r = 0 === s ? l : Math.min(Math.ceil((u - s * c * l) / c), l);
                (f = Math.floor(a / r)),
                  (h = a - f * r + s * l),
                  (m = h + (f * t) / c),
                  (i.style.order = m);
              } else
                "column" === p
                  ? ((h = Math.floor(e / c)),
                    (f = e - h * c),
                    (h > a || (h === a && f === c - 1)) &&
                      ((f += 1), f >= c && ((f = 0), (h += 1))))
                  : ((f = Math.floor(e / s)), (h = e - f * s));
              (i.row = f),
                (i.column = h),
                (i.style.height = `calc((100% - ${(c - 1) * d}px) / ${c})`),
                (i.style[r.getDirectionLabel("margin-top")] =
                  0 !== f ? d && `${d}px` : ""),
                (i.swiperSlideGridSet = !0);
            },
            updateWrapperSize: (e, s) => {
              const { centeredSlides: a, roundLengths: i } = r.params,
                n = o(),
                { rows: l } = r.params.grid;
              if (
                ((r.virtualSize = (e + n) * t),
                (r.virtualSize = Math.ceil(r.virtualSize / l) - n),
                r.params.cssMode ||
                  (r.wrapperEl.style[r.getDirectionLabel("width")] = `${
                    r.virtualSize + n
                  }px`),
                a)
              ) {
                const e = [];
                for (let t = 0; t < s.length; t += 1) {
                  let a = s[t];
                  i && (a = Math.floor(a)),
                    s[t] < r.virtualSize + s[0] && e.push(a);
                }
                s.splice(0, s.length), s.push(...e);
              }
            },
          });
      },
      function (e) {
        let { swiper: t } = e;
        Object.assign(t, {
          appendSlide: ie.bind(t),
          prependSlide: re.bind(t),
          addSlide: ne.bind(t),
          removeSlide: le.bind(t),
          removeAllSlides: oe.bind(t),
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({ fadeEffect: { crossFade: !1 } }),
          de({
            effect: "fade",
            swiper: t,
            on: a,
            setTranslate: () => {
              const { slides: e } = t;
              t.params.fadeEffect;
              for (let s = 0; s < e.length; s += 1) {
                const e = t.slides[s];
                let a = -e.swiperSlideOffset;
                t.params.virtualTranslate || (a -= t.translate);
                let i = 0;
                t.isHorizontal() || ((i = a), (a = 0));
                const r = t.params.fadeEffect.crossFade
                    ? Math.max(1 - Math.abs(e.progress), 0)
                    : 1 + Math.min(Math.max(e.progress, -1), 0),
                  n = ce(0, e);
                (n.style.opacity = r),
                  (n.style.transform = `translate3d(${a}px, ${i}px, 0px)`);
              }
            },
            setTransition: (e) => {
              const s = t.slides.map((e) => h(e));
              s.forEach((t) => {
                t.style.transitionDuration = `${e}ms`;
              }),
                pe({
                  swiper: t,
                  duration: e,
                  transformElements: s,
                  allSlides: !0,
                });
            },
            overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !t.params.cssMode,
            }),
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        });
        const i = (e, t, s) => {
          let a = s
              ? e.querySelector(".swiper-slide-shadow-left")
              : e.querySelector(".swiper-slide-shadow-top"),
            i = s
              ? e.querySelector(".swiper-slide-shadow-right")
              : e.querySelector(".swiper-slide-shadow-bottom");
          a ||
            ((a = v(
              "div",
              (
                "swiper-slide-shadow-cube swiper-slide-shadow-" +
                (s ? "left" : "top")
              ).split(" ")
            )),
            e.append(a)),
            i ||
              ((i = v(
                "div",
                (
                  "swiper-slide-shadow-cube swiper-slide-shadow-" +
                  (s ? "right" : "bottom")
                ).split(" ")
              )),
              e.append(i)),
            a && (a.style.opacity = Math.max(-t, 0)),
            i && (i.style.opacity = Math.max(t, 0));
        };
        de({
          effect: "cube",
          swiper: t,
          on: a,
          setTranslate: () => {
            const {
                el: e,
                wrapperEl: s,
                slides: a,
                width: r,
                height: n,
                rtlTranslate: l,
                size: o,
                browser: d,
              } = t,
              c = t.params.cubeEffect,
              p = t.isHorizontal(),
              u = t.virtual && t.params.virtual.enabled;
            let m,
              h = 0;
            c.shadow &&
              (p
                ? ((m = t.wrapperEl.querySelector(".swiper-cube-shadow")),
                  m ||
                    ((m = v("div", "swiper-cube-shadow")), t.wrapperEl.append(m)),
                  (m.style.height = `${r}px`))
                : ((m = e.querySelector(".swiper-cube-shadow")),
                  m || ((m = v("div", "swiper-cube-shadow")), e.append(m))));
            for (let e = 0; e < a.length; e += 1) {
              const s = a[e];
              let r = e;
              u && (r = parseInt(s.getAttribute("data-swiper-slide-index"), 10));
              let n = 90 * r,
                d = Math.floor(n / 360);
              l && ((n = -n), (d = Math.floor(-n / 360)));
              const m = Math.max(Math.min(s.progress, 1), -1);
              let f = 0,
                g = 0,
                v = 0;
              r % 4 == 0
                ? ((f = 4 * -d * o), (v = 0))
                : (r - 1) % 4 == 0
                ? ((f = 0), (v = 4 * -d * o))
                : (r - 2) % 4 == 0
                ? ((f = o + 4 * d * o), (v = o))
                : (r - 3) % 4 == 0 && ((f = -o), (v = 3 * o + 4 * o * d)),
                l && (f = -f),
                p || ((g = f), (f = 0));
              const w = `rotateX(${p ? 0 : -n}deg) rotateY(${
                p ? n : 0
              }deg) translate3d(${f}px, ${g}px, ${v}px)`;
              m <= 1 &&
                m > -1 &&
                ((h = 90 * r + 90 * m),
                l && (h = 90 * -r - 90 * m),
                t.browser &&
                  t.browser.need3dFix &&
                  (Math.abs(h) / 90) % 2 == 1 &&
                  (h += 0.001)),
                (s.style.transform = w),
                c.slideShadows && i(s, m, p);
            }
            if (
              ((s.style.transformOrigin = `50% 50% -${o / 2}px`),
              (s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`),
              c.shadow)
            )
              if (p)
                m.style.transform = `translate3d(0px, ${
                  r / 2 + c.shadowOffset
                }px, ${-r / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${
                  c.shadowScale
                })`;
              else {
                const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                  t =
                    1.5 -
                    (Math.sin((2 * e * Math.PI) / 360) / 2 +
                      Math.cos((2 * e * Math.PI) / 360) / 2),
                  s = c.shadowScale,
                  a = c.shadowScale / t,
                  i = c.shadowOffset;
                m.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${
                  n / 2 + i
                }px, ${-n / 2 / a}px) rotateX(-89.99deg)`;
              }
            const f =
              (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
            (s.style.transform = `translate3d(0px,0,${f}px) rotateX(${
              t.isHorizontal() ? 0 : h
            }deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`),
              s.style.setProperty("--swiper-cube-translate-z", `${f}px`);
          },
          setTransition: (e) => {
            const { el: s, slides: a } = t;
            if (
              (a.forEach((t) => {
                (t.style.transitionDuration = `${e}ms`),
                  t
                    .querySelectorAll(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .forEach((t) => {
                      t.style.transitionDuration = `${e}ms`;
                    });
              }),
              t.params.cubeEffect.shadow && !t.isHorizontal())
            ) {
              const t = s.querySelector(".swiper-cube-shadow");
              t && (t.style.transitionDuration = `${e}ms`);
            }
          },
          recreateShadows: () => {
            const e = t.isHorizontal();
            t.slides.forEach((t) => {
              const s = Math.max(Math.min(t.progress, 1), -1);
              i(t, s, e);
            });
          },
          getEffectParams: () => t.params.cubeEffect,
          perspective: () => !0,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0,
          }),
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
        const i = (e, s) => {
          let a = t.isHorizontal()
              ? e.querySelector(".swiper-slide-shadow-left")
              : e.querySelector(".swiper-slide-shadow-top"),
            i = t.isHorizontal()
              ? e.querySelector(".swiper-slide-shadow-right")
              : e.querySelector(".swiper-slide-shadow-bottom");
          a || (a = ue("flip", e, t.isHorizontal() ? "left" : "top")),
            i || (i = ue("flip", e, t.isHorizontal() ? "right" : "bottom")),
            a && (a.style.opacity = Math.max(-s, 0)),
            i && (i.style.opacity = Math.max(s, 0));
        };
        de({
          effect: "flip",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e, rtlTranslate: s } = t,
              a = t.params.flipEffect;
            for (let r = 0; r < e.length; r += 1) {
              const n = e[r];
              let l = n.progress;
              t.params.flipEffect.limitRotation &&
                (l = Math.max(Math.min(n.progress, 1), -1));
              const o = n.swiperSlideOffset;
              let d = -180 * l,
                c = 0,
                p = t.params.cssMode ? -o - t.translate : -o,
                u = 0;
              t.isHorizontal()
                ? s && (d = -d)
                : ((u = p), (p = 0), (c = -d), (d = 0)),
                t.browser &&
                  t.browser.need3dFix &&
                  ((Math.abs(d) / 90) % 2 == 1 && (d += 0.001),
                  (Math.abs(c) / 90) % 2 == 1 && (c += 0.001)),
                (n.style.zIndex = -Math.abs(Math.round(l)) + e.length),
                a.slideShadows && i(n, l);
              const m = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
              ce(0, n).style.transform = m;
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t
                  .querySelectorAll(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .forEach((t) => {
                    t.style.transitionDuration = `${e}ms`;
                  });
            }),
              pe({ swiper: t, duration: e, transformElements: s });
          },
          recreateShadows: () => {
            t.params.flipEffect,
              t.slides.forEach((e) => {
                let s = e.progress;
                t.params.flipEffect.limitRotation &&
                  (s = Math.max(Math.min(e.progress, 1), -1)),
                  i(e, s);
              });
          },
          getEffectParams: () => t.params.flipEffect,
          perspective: () => !0,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0,
          },
        }),
          de({
            effect: "coverflow",
            swiper: t,
            on: a,
            setTranslate: () => {
              const { width: e, height: s, slides: a, slidesSizesGrid: i } = t,
                r = t.params.coverflowEffect,
                n = t.isHorizontal(),
                l = t.translate,
                o = n ? e / 2 - l : s / 2 - l,
                d = n ? r.rotate : -r.rotate,
                c = r.depth;
              for (let e = 0, s = a.length; e < s; e += 1) {
                const s = a[e],
                  l = i[e],
                  p = (o - s.swiperSlideOffset - l / 2) / l,
                  u =
                    "function" == typeof r.modifier
                      ? r.modifier(p)
                      : p * r.modifier;
                let m = n ? d * u : 0,
                  h = n ? 0 : d * u,
                  f = -c * Math.abs(u),
                  g = r.stretch;
                "string" == typeof g &&
                  -1 !== g.indexOf("%") &&
                  (g = (parseFloat(r.stretch) / 100) * l);
                let v = n ? 0 : g * u,
                  w = n ? g * u : 0,
                  b = 1 - (1 - r.scale) * Math.abs(u);
                Math.abs(w) < 0.001 && (w = 0),
                  Math.abs(v) < 0.001 && (v = 0),
                  Math.abs(f) < 0.001 && (f = 0),
                  Math.abs(m) < 0.001 && (m = 0),
                  Math.abs(h) < 0.001 && (h = 0),
                  Math.abs(b) < 0.001 && (b = 0),
                  t.browser &&
                    t.browser.need3dFix &&
                    ((Math.abs(m) / 90) % 2 == 1 && (m += 0.001),
                    (Math.abs(h) / 90) % 2 == 1 && (h += 0.001));
                const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${h}deg) rotateY(${m}deg) scale(${b})`;
                if (
                  ((ce(0, s).style.transform = y),
                  (s.style.zIndex = 1 - Math.abs(Math.round(u))),
                  r.slideShadows)
                ) {
                  let e = n
                      ? s.querySelector(".swiper-slide-shadow-left")
                      : s.querySelector(".swiper-slide-shadow-top"),
                    t = n
                      ? s.querySelector(".swiper-slide-shadow-right")
                      : s.querySelector(".swiper-slide-shadow-bottom");
                  e || (e = ue("coverflow", s, n ? "left" : "top")),
                    t || (t = ue("coverflow", s, n ? "right" : "bottom")),
                    e && (e.style.opacity = u > 0 ? u : 0),
                    t && (t.style.opacity = -u > 0 ? -u : 0);
                }
              }
            },
            setTransition: (e) => {
              t.slides
                .map((e) => h(e))
                .forEach((t) => {
                  (t.style.transitionDuration = `${e}ms`),
                    t
                      .querySelectorAll(
                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                      )
                      .forEach((t) => {
                        t.style.transitionDuration = `${e}ms`;
                      });
                });
            },
            perspective: () => !0,
            overwriteParams: () => ({ watchSlidesProgress: !0 }),
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
            next: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
          },
        });
        const i = (e) => ("string" == typeof e ? e : `${e}px`);
        de({
          effect: "creative",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e, wrapperEl: s, slidesSizesGrid: a } = t,
              r = t.params.creativeEffect,
              { progressMultiplier: n } = r,
              l = t.params.centeredSlides;
            if (l) {
              const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
              s.style.transform = `translateX(calc(50% - ${e}px))`;
            }
            for (let s = 0; s < e.length; s += 1) {
              const a = e[s],
                o = a.progress,
                d = Math.min(
                  Math.max(a.progress, -r.limitProgress),
                  r.limitProgress
                );
              let c = d;
              l ||
                (c = Math.min(
                  Math.max(a.originalProgress, -r.limitProgress),
                  r.limitProgress
                ));
              const p = a.swiperSlideOffset,
                u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
                m = [0, 0, 0];
              let h = !1;
              t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
              let f = {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: 1,
                opacity: 1,
              };
              d < 0
                ? ((f = r.next), (h = !0))
                : d > 0 && ((f = r.prev), (h = !0)),
                u.forEach((e, t) => {
                  u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(
                    d * n
                  )}))`;
                }),
                m.forEach((e, s) => {
                  let a = f.rotate[s] * Math.abs(d * n);
                  t.browser &&
                    t.browser.need3dFix &&
                    (Math.abs(a) / 90) % 2 == 1 &&
                    (a += 0.001),
                    (m[s] = a);
                }),
                (a.style.zIndex = -Math.abs(Math.round(o)) + e.length);
              const g = u.join(", "),
                v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,
                w =
                  c < 0
                    ? `scale(${1 + (1 - f.scale) * c * n})`
                    : `scale(${1 - (1 - f.scale) * c * n})`,
                b =
                  c < 0
                    ? 1 + (1 - f.opacity) * c * n
                    : 1 - (1 - f.opacity) * c * n,
                y = `translate3d(${g}) ${v} ${w}`;
              if ((h && f.shadow) || !h) {
                let e = a.querySelector(".swiper-slide-shadow");
                if ((!e && f.shadow && (e = ue("creative", a)), e)) {
                  const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                  e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
                }
              }
              const E = ce(0, a);
              (E.style.transform = y),
                (E.style.opacity = b),
                f.origin && (E.style.transformOrigin = f.origin);
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                });
            }),
              pe({ swiper: t, duration: e, transformElements: s, allSlides: !0 });
          },
          perspective: () => t.params.creativeEffect.perspective,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a } = e;
        s({
          cardsEffect: {
            slideShadows: !0,
            rotate: !0,
            perSlideRotate: 2,
            perSlideOffset: 8,
          },
        }),
          de({
            effect: "cards",
            swiper: t,
            on: a,
            setTranslate: () => {
              const { slides: e, activeIndex: s, rtlTranslate: a } = t,
                i = t.params.cardsEffect,
                { startTranslate: r, isTouched: n } = t.touchEventsData,
                l = a ? -t.translate : t.translate;
              for (let o = 0; o < e.length; o += 1) {
                const d = e[o],
                  c = d.progress,
                  p = Math.min(Math.max(c, -4), 4);
                let u = d.swiperSlideOffset;
                t.params.centeredSlides &&
                  !t.params.cssMode &&
                  (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                  t.params.centeredSlides &&
                    t.params.cssMode &&
                    (u -= e[0].swiperSlideOffset);
                let m = t.params.cssMode ? -u - t.translate : -u,
                  h = 0;
                const f = -100 * Math.abs(p);
                let g = 1,
                  v = -i.perSlideRotate * p,
                  w = i.perSlideOffset - 0.75 * Math.abs(p);
                const b =
                    t.virtual && t.params.virtual.enabled
                      ? t.virtual.from + o
                      : o,
                  y =
                    (b === s || b === s - 1) &&
                    p > 0 &&
                    p < 1 &&
                    (n || t.params.cssMode) &&
                    l < r,
                  E =
                    (b === s || b === s + 1) &&
                    p < 0 &&
                    p > -1 &&
                    (n || t.params.cssMode) &&
                    l > r;
                if (y || E) {
                  const e = (1 - Math.abs((Math.abs(p) - 0.5) / 0.5)) ** 0.5;
                  (v += -28 * p * e),
                    (g += -0.5 * e),
                    (w += 96 * e),
                    (h = -25 * e * Math.abs(p) + "%");
                }
                if (
                  ((m =
                    p < 0
                      ? `calc(${m}px ${a ? "-" : "+"} (${w * Math.abs(p)}%))`
                      : p > 0
                      ? `calc(${m}px ${a ? "-" : "+"} (-${w * Math.abs(p)}%))`
                      : `${m}px`),
                  !t.isHorizontal())
                ) {
                  const e = h;
                  (h = m), (m = e);
                }
                const x = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p),
                  S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${
                    i.rotate ? (a ? -v : v) : 0
                  }deg)\n        scale(${x})\n      `;
                if (i.slideShadows) {
                  let e = d.querySelector(".swiper-slide-shadow");
                  e || (e = ue("cards", d)),
                    e &&
                      (e.style.opacity = Math.min(
                        Math.max((Math.abs(p) - 0.5) / 0.5, 0),
                        1
                      ));
                }
                d.style.zIndex = -Math.abs(Math.round(c)) + e.length;
                ce(0, d).style.transform = S;
              }
            },
            setTransition: (e) => {
              const s = t.slides.map((e) => h(e));
              s.forEach((t) => {
                (t.style.transitionDuration = `${e}ms`),
                  t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                    t.style.transitionDuration = `${e}ms`;
                  });
              }),
                pe({ swiper: t, duration: e, transformElements: s });
            },
            perspective: () => !0,
            overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !t.params.cssMode,
            }),
          });
      },
    ];
    return te.use(me), te;
  })();

  export default Swiper