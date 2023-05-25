import { _ as __nuxt_component_0 } from './nuxt-link-15b2078b.mjs';
import { ref, computed, useSSRContext, defineComponent, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { d as defineStore, D as DEFAULT_THEME, f as useHead, e as useState } from './server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { _ as __nuxt_component_0$1 } from './Footer-12b36c2a.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'vue-starport';

const useColorMode = () => {
  return useState("color-mode").value;
};
const useAppStore = defineStore("app", () => {
  const isDark = ref(false);
  const themes = ref(DEFAULT_THEME);
  const currentTheme = computed(() => {
    return isDark.value ? themes.value.dark : themes.value.light;
  });
  return {
    isDark,
    currentTheme
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DarkToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const color = useColorMode();
    useHead({
      meta: [{
        id: "theme-color",
        name: "theme-color",
        content: () => color.value === "dark" ? "#222222" : "#ffffff"
      }]
    });
    const checked = ref(false);
    ref((e) => {
    });
    const store = useAppStore();
    watch(checked, (isNewDark) => {
      color.preference = !isNewDark ? "light" : "dark";
      store.isDark = isNewDark;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "!outline-none" }, _attrs))}><div class="i-carbon-sun dark:i-carbon-moon"></div></button>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DarkToggle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = ref([
      { name: "\u535A\u5BA2", path: "/blog" }
      // { name: 'About', path: '/about' },
      // { name: 'Demo', path: '/contact' },
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DarkToggle = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "w-full": "",
        flex: "",
        "items-center": "",
        "px-5": "",
        "py-2": ""
      }, _attrs))}><div ml-auto flex gap-x-5><!--[-->`);
      ssrRenderList(unref(tabs), (item) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.path,
          "active-class": "!c-$bl-main",
          class: "c-$bl-title"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_DarkToggle, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = _sfc_main$1;
  const _component_ClientOnly = __nuxt_component_1;
  const _component_Footer = __nuxt_component_0$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(`<main style="${ssrRenderStyle({ "height": "calc(100vh - 176px - 40px)" })}" overflow-hidden py-20><div m-auto h-full max-w100ch>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
  _push(`</div></main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-35eda414.mjs.map
