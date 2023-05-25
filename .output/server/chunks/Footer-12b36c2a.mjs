import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { g as appName } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CopyRight",
  __ssrInlineRender: true,
  setup(__props) {
    const year = ref((/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "justify-betwee": "",
        flex: "",
        "flex-col": "",
        "text-center": "",
        "text-sm": ""
      }, _attrs))}><span mt-4><strong><a href="javascript:;">${ssrInterpolate(unref(appName))}</a></strong> \xA9 ${ssrInterpolate(unref(year))}</span><span mt-4> Made By <strong><a href="javascript:;">Skelanimals</a></strong></span><div mt-4 flex items-center><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13098102000240" style="${ssrRenderStyle({ "display": "inline-block", "text-decoration": "none", "height": "20px", "line-height": "20px" })}"><img style="${ssrRenderStyle({ "float": "left", "width": "20px" })}" src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"><span style="${ssrRenderStyle({ "float": "left", "height": "20px", "line-height": "20px", "margin": "0px 0px 0px 5px" })}">\u5180\u516C\u7F51\u5B89\u5907 13098102000240\u53F7 \xA0</span></a><a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow noopener">\u5180ICP\u590717020251\u53F7-1</a></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CopyRight.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CopyRight = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    text: "xl gray4",
    bg: "$bl-black",
    flex: "~ col gap3",
    relative: "",
    "z-1000000": "",
    "w-full": "",
    "items-center": "",
    "justify-center": "",
    "py-4": ""
  }, _attrs))}><a i-carbon-logo-github href="https://github.com/webfanzc" target="_blank" hover:c="$bl-primary"></a>`);
  _push(ssrRenderComponent(_component_CopyRight, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Footer-12b36c2a.mjs.map
