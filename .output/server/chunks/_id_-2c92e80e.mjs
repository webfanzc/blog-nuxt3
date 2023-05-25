import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot, normalizeClass, normalizeStyle, createElementVNode, createBlock, withModifiers, withCtx, createVNode, createCommentVNode, Transition, useSSRContext, ref, inject, withAsyncContext, toRef, toDisplayString, createTextVNode, Fragment, renderList, getCurrentInstance } from 'vue';
import { b as buildProp, a as buildProps, u as useNamespace, i as isUndefined, c as addUnit, w as withInstall, d as definePropType, e as useAsyncData, f as useBlogStore, _ as _export_sfc$1, g as getArticleDetail, E as ElScrollbar } from './index-4753aea1.mjs';
import { a as useRoute, s as storeToRefs, u as useRouter } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Starport } from 'vue-starport';
import dayjs from 'dayjs';
import hljs from 'highlight.js';
import markedIt from 'markdown-it';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import '@vue/shared';
import 'lodash-unified';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
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

/*! Element Plus Icons Vue v2.1.0 */
var export_helper_default = (sfc, props) => {
  let target = sfc.__vccOpts || sfc;
  for (let [key, val] of props)
    target[key] = val;
  return target;
};
var close_vue_vue_type_script_lang_default = {
  name: "Close"
};
var _hoisted_156 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_256 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_355 = [
  _hoisted_256
];
function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
}
var close_default = /* @__PURE__ */ export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]);
const componentSizes = ["", "default", "small", "large"];
const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => {
    var _a, _b;
    return (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$props) == null ? void 0 : _b[name];
  });
};
buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});
const __default__$1 = /* @__PURE__ */ defineComponent({
  name: "ElIcon",
  inheritAttrs: false
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      if (!size && !color)
        return {};
      return {
        fontSize: isUndefined(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ElIcon = withInstall(Icon);
const formContextKey = Symbol("formContextKey");
const formItemContextKey = Symbol("formItemContextKey");
const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(() => size.value || unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig.value || "");
};
const tagProps = buildProps({
  closable: Boolean,
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: componentSizes,
    default: ""
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
});
const tagEmits = {
  close: (evt) => evt instanceof MouseEvent,
  click: (evt) => evt instanceof MouseEvent
};
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElTag"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: tagProps,
  emits: tagEmits,
  setup(__props, { emit }) {
    const props = __props;
    const tagSize = useFormSize();
    const ns = useNamespace("tag");
    const classes = computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is("closable", closable),
        ns.m(type),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is("hit", hit),
        ns.is("round", round)
      ];
    });
    const handleClose = (event) => {
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    return (_ctx, _cache) => {
      return _ctx.disableTransitions ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(unref(classes)),
        style: normalizeStyle({ backgroundColor: _ctx.color }),
        onClick: handleClick
      }, [
        createElementVNode("span", {
          class: normalizeClass(unref(ns).e("content"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2),
        _ctx.closable ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass(unref(ns).e("close")),
          onClick: withModifiers(handleClose, ["stop"])
        }, {
          default: withCtx(() => [
            createVNode(unref(close_default))
          ]),
          _: 1
        }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
      ], 6)) : (openBlock(), createBlock(Transition, {
        key: 1,
        name: `${unref(ns).namespace.value}-zoom-in-center`,
        appear: ""
      }, {
        default: withCtx(() => [
          createElementVNode("span", {
            class: normalizeClass(unref(classes)),
            style: normalizeStyle({ backgroundColor: _ctx.color }),
            onClick: handleClick
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(ns).e("content"))
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2),
            _ctx.closable ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(unref(ns).e("close")),
              onClick: withModifiers(handleClose, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(close_default))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
          ], 6)
        ]),
        _: 3
      }, 8, ["name"]));
    };
  }
});
var Tag = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
const ElTag = withInstall(Tag);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("detail", () => {
      return getArticleDetail({ id: route.params.id });
    })), __temp = await __temp, __restore(), __temp);
    const theme = computed(() => {
      const themeArr = ["", "success", "info", "warning", "danger"];
      return themeArr[Math.floor(themeArr.length * Math.random())];
    });
    const mark = markedIt({
      html: true,
      breaks: true,
      langPrefix: "language-",
      linkify: true,
      typographer: true,
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    });
    const oldFence = mark.renderer.rules.fence;
    const oldRender = mark.renderer.renderAttrs;
    mark.renderer.rules.fence = (token, idx, options, env, self) => {
      const topToken = token.filter((item) => item.tag && item.type.includes("open"));
      topToken.forEach((token2, idx2) => {
        token2.attrSet("style", `--stage: ${idx2};`);
      });
      return oldFence(token, idx, options, env, self);
    };
    mark.renderer.renderAttrs = (token) => {
      if (token.type === "link_open")
        token.attrSet("target", "_blank");
      return oldRender(token);
    };
    const content = computed(() => {
      var _a;
      if (!data.value)
        return "";
      return mark.render((_a = data.value) == null ? void 0 : _a.content);
    });
    const blogStore = useBlogStore();
    let __$temp_1 = storeToRefs(blogStore), tag = toRef(__$temp_1, "tag");
    const router = useRouter();
    function onTagClick(clickTag) {
      tag.value = clickTag;
      router.push({
        path: "/blog"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_clientOnly = __nuxt_component_1;
      const _component_ElTag = ElTag;
      const _component_ElScrollbar = ElScrollbar;
      _push(ssrRenderComponent(_component_clientOnly, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div mx-auto h-full w-80ch flex flex-col data-v-8ab6d96f${_scopeId}><div h-20 data-v-8ab6d96f${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Starport), {
              port: `${unref(route).params.id}`,
              "h-7": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div data-v-8ab6d96f${_scopeId2}><span c="$bl-main" text-lg font-bold data-v-8ab6d96f${_scopeId2}>${ssrInterpolate((_a2 = unref(data)) == null ? void 0 : _a2.title)}</span></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", {
                        c: "$bl-main",
                        "text-lg": "",
                        "font-bold": ""
                      }, toDisplayString((_b2 = unref(data)) == null ? void 0 : _b2.title), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList((_a = unref(data)) == null ? void 0 : _a.tags, (item) => {
              _push2(ssrRenderComponent(unref(Starport), {
                key: item._id,
                "inline-block": "",
                "h-6": "",
                port: item._id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div w-max data-v-8ab6d96f${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_ElTag, {
                      "w-max": "",
                      type: unref(theme),
                      "cursor-pointer": "",
                      onClick: ($event) => onTagClick(item)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item.tagName)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item.tagName), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { "w-max": "" }, [
                        createVNode(_component_ElTag, {
                          "w-max": "",
                          type: unref(theme),
                          "cursor-pointer": "",
                          onClick: ($event) => onTagClick(item)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.tagName), 1)
                          ]),
                          _: 2
                        }, 1032, ["type", "onClick"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(Starport), {
              "h-5": "",
              port: `${(_b = unref(data)) == null ? void 0 : _b.createdAt}`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<span text-xs data-v-8ab6d96f${_scopeId2}>${ssrInterpolate(unref(dayjs)((_a2 = unref(data)) == null ? void 0 : _a2.createdAt).format("YYYY-MM-DD HH:mm:ss"))}</span>`);
                } else {
                  return [
                    createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)((_b2 = unref(data)) == null ? void 0 : _b2.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_ElScrollbar, {
              "flex-1": "",
              "shrink-0": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-8ab6d96f${_scopeId2}><div data-v-8ab6d96f${_scopeId2}><div class="marked-body markdown-body" data-v-8ab6d96f${_scopeId2}>${unref(content)}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "marked-body markdown-body",
                          innerHTML: unref(content)
                        }, null, 8, ["innerHTML"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "mx-auto": "",
                "h-full": "",
                "w-80ch": "",
                flex: "",
                "flex-col": ""
              }, [
                createVNode("div", { "h-20": "" }, [
                  createVNode(unref(Starport), {
                    port: `${unref(route).params.id}`,
                    "h-7": ""
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode("div", null, [
                          createVNode("span", {
                            c: "$bl-main",
                            "text-lg": "",
                            "font-bold": ""
                          }, toDisplayString((_a2 = unref(data)) == null ? void 0 : _a2.title), 1)
                        ])
                      ];
                    }),
                    _: 1
                  }, 8, ["port"]),
                  (openBlock(true), createBlock(Fragment, null, renderList((_c = unref(data)) == null ? void 0 : _c.tags, (item) => {
                    return openBlock(), createBlock(unref(Starport), {
                      key: item._id,
                      "inline-block": "",
                      "h-6": "",
                      port: item._id
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { "w-max": "" }, [
                          createVNode(_component_ElTag, {
                            "w-max": "",
                            type: unref(theme),
                            "cursor-pointer": "",
                            onClick: ($event) => onTagClick(item)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.tagName), 1)
                            ]),
                            _: 2
                          }, 1032, ["type", "onClick"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["port"]);
                  }), 128)),
                  createVNode(unref(Starport), {
                    "h-5": "",
                    port: `${(_d = unref(data)) == null ? void 0 : _d.createdAt}`
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)((_a2 = unref(data)) == null ? void 0 : _a2.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                      ];
                    }),
                    _: 1
                  }, 8, ["port"])
                ]),
                createVNode(_component_ElScrollbar, {
                  "flex-1": "",
                  "shrink-0": ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "marked-body markdown-body",
                          innerHTML: unref(content)
                        }, null, 8, ["innerHTML"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ab6d96f"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-2c92e80e.mjs.map
