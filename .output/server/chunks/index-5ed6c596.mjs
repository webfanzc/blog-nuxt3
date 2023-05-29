import { a as buildProps, u as useNamespace, w as withInstall, f as useBlogStore, h as useNuxtData, j as clearNuxtData, k as useLazyAsyncData, E as ElScrollbar, l as isBoolean, e as useAsyncData, _ as _export_sfc, m as getTags, n as initData, G as GET_ARTICLES } from './index-abea7250.mjs';
import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, renderSlot, useSSRContext, ref, watch, withAsyncContext, computed, mergeProps, withCtx, createVNode, toDisplayString, createBlock, Fragment, renderList, withDirectives, createTextVNode, reactive, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass } from 'vue/server-renderer';
import { s as storeToRefs } from './server.mjs';
import { Starport } from 'vue-starport';
import { isObject, hyphenate, isString } from '@vue/shared';
import { _ as __nuxt_component_0 } from './nuxt-link-15b2078b.mjs';
import dayjs from 'dayjs';
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

const CHANGE_EVENT = "change";
const checkTagProps = buildProps({
  checked: {
    type: Boolean,
    default: false
  }
});
const checkTagEmits = {
  "update:checked": (value) => isBoolean(value),
  [CHANGE_EVENT]: (value) => isBoolean(value)
};
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElCheckTag"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: checkTagProps,
  emits: checkTagEmits,
  setup(__props, { emit }) {
    const props = __props;
    const ns = useNamespace("check-tag");
    const handleChange = () => {
      const checked = !props.checked;
      emit(CHANGE_EVENT, checked);
      emit("update:checked", checked);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass([unref(ns).b(), unref(ns).is("checked", _ctx.checked)]),
        onClick: handleChange
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var CheckTag = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/check-tag/src/check-tag.vue"]]);
const ElCheckTag = withInstall(CheckTag);
const Loading = function(options = {}) {
  return void 0;
};
const INSTANCE_KEY = Symbol("ElLoading");
const createInstance = (el, binding) => {
  var _a, _b, _c, _d;
  const vm = binding.instance;
  const getBindingProp = (key) => isObject(binding.value) ? binding.value[key] : void 0;
  const resolveExpression = (key) => {
    const data = isString(key) && (vm == null ? void 0 : vm[key]) || key;
    if (data)
      return ref(data);
    else
      return data;
  };
  const getProp = (name) => resolveExpression(getBindingProp(name) || el.getAttribute(`element-loading-${hyphenate(name)}`));
  const fullscreen = (_a = getBindingProp("fullscreen")) != null ? _a : binding.modifiers.fullscreen;
  const options = {
    text: getProp("text"),
    svg: getProp("svg"),
    svgViewBox: getProp("svgViewBox"),
    spinner: getProp("spinner"),
    background: getProp("background"),
    customClass: getProp("customClass"),
    fullscreen,
    target: (_b = getBindingProp("target")) != null ? _b : fullscreen ? void 0 : el,
    body: (_c = getBindingProp("body")) != null ? _c : binding.modifiers.body,
    lock: (_d = getBindingProp("lock")) != null ? _d : binding.modifiers.lock
  };
  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options)
  };
};
const updateOptions = (newOptions, originalOptions) => {
  for (const key of Object.keys(originalOptions)) {
    if (isRef(originalOptions[key]))
      originalOptions[key].value = newOptions[key];
  }
};
const vLoading = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding);
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value))
          updateOptions(binding.value, instance.options);
      } else {
        instance == null ? void 0 : instance.instance.close();
      }
    }
  },
  unmounted(el) {
    var _a;
    (_a = el[INSTANCE_KEY]) == null ? void 0 : _a.instance.close();
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Tags",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { tag: currentTag } = storeToRefs(useBlogStore());
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("tags", () => {
      return getTags();
    })), __temp = await __temp, __restore(), __temp);
    const allTags = computed(() => {
      return [{ _id: "-1", tagName: "\u5168\u90E8" }, ...data.value || []];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ElScrollbar = ElScrollbar;
      const _component_ClientOnly = __nuxt_component_1;
      const _component_ElCheckTag = ElCheckTag;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ "h-full": "" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ElScrollbar, mergeProps({
        "h-full": "",
        "pr-3": ""
      }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(pending))), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul flex flex-col gap-y-2${_scopeId}><!--[-->`);
            ssrRenderList(unref(allTags), (tag, idx) => {
              _push2(`<div class="${ssrRenderClass([tag._id === unref(currentTag)._id ? "" : "", "slide-enter"])}" style="${ssrRenderStyle({ "--stage": idx })}" w-full${_scopeId}><li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ClientOnly, null, {
                fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="hidden"${_scopeId2}><div w-37${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_ElCheckTag, {
                      checked: unref(currentTag)._id === tag._id,
                      "w-full": "",
                      c: "$bl-main",
                      onChange: ($event) => currentTag.value = tag
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(tag.tagName)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(tag.tagName), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "hidden" }, [
                        createVNode("div", { "w-37": "" }, [
                          createVNode(_component_ElCheckTag, {
                            checked: unref(currentTag)._id === tag._id,
                            "w-full": "",
                            c: "$bl-main",
                            onChange: ($event) => currentTag.value = tag
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tag.tagName), 1)
                            ]),
                            _: 2
                          }, 1032, ["checked", "onChange"])
                        ])
                      ])
                    ];
                  }
                })
              }, _parent2, _scopeId));
              _push2(`</li></div>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                flex: "",
                "flex-col": "",
                "gap-y-2": ""
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(allTags), (tag, idx) => {
                  return openBlock(), createBlock("div", {
                    key: tag._id,
                    class: [tag._id === unref(currentTag)._id ? "" : "", "slide-enter"],
                    style: { "--stage": idx },
                    "w-full": ""
                  }, [
                    createVNode("li", null, [
                      createVNode(_component_ClientOnly, null, {
                        fallback: withCtx(() => [
                          createVNode("div", { class: "hidden" }, [
                            createVNode("div", { "w-37": "" }, [
                              createVNode(_component_ElCheckTag, {
                                checked: unref(currentTag)._id === tag._id,
                                "w-full": "",
                                c: "$bl-main",
                                onChange: ($event) => currentTag.value = tag
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(tag.tagName), 1)
                                ]),
                                _: 2
                              }, 1032, ["checked", "onChange"])
                            ])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(unref(Starport), {
                            port: tag._id
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { "w-37": "" }, [
                                createVNode(_component_ElCheckTag, {
                                  checked: unref(currentTag)._id === tag._id,
                                  "w-full": "",
                                  c: "$bl-main",
                                  onChange: ($event) => currentTag.value = tag
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag.tagName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["checked", "onChange"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["port"])
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ], 6);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tags.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function usePagination(url, pageOpts = {
  pageNo: 1,
  pageSize: 10
}, mainParams = {}) {
  const page = reactive({
    ...pageOpts
  });
  const total = ref(0);
  const list = ref([]);
  const pageCount = computed(() => {
    return Math.ceil(total.value / (page.pageSize ?? 10));
  });
  const getList = async (pageNo = page.pageNo, params = {}) => {
    pageNo && (page.pageNo = pageNo);
    const query = {
      ...page,
      ...mainParams,
      ...params
    };
    try {
      const res = await initData(url, query);
      list.value.push(...res.list);
      total.value = res.total;
      return {
        list: res.list,
        total: res.total
      };
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const clearList = () => {
    list.value = [];
  };
  return {
    page,
    total,
    pageCount,
    list,
    getList,
    clearList
  };
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
function uniq(array) {
  return Array.from(new Set(array));
}
function uniqueElementsBy(array, fn) {
  return array.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x, array)))
      acc.push(v);
    return acc;
  }, []);
}
function useArrayUnique(list, compareFn) {
  return computed(() => {
    const resolvedList = toValue(list).map((element) => toValue(element));
    return compareFn ? uniqueElementsBy(resolvedList, compareFn) : uniq(resolvedList);
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getList, page, total } = usePagination(GET_ARTICLES);
    const { tag: currentTag } = storeToRefs(useBlogStore());
    const dataNuxt = useNuxtData("articles");
    const scrollRef = ref(null);
    watch(currentTag, () => {
      page.pageNo = 1;
      clearNuxtData("articles");
    }, {
      flush: "pre"
    });
    const { data, pending } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData(
      "articles",
      async (app) => {
        var _a, _b, _c, _d;
        const params = {};
        if (currentTag.value._id !== "-1")
          params.tagId = currentTag.value._id;
        if ((((_b = (_a = dataNuxt.data.value) == null ? void 0 : _a.list) == null ? void 0 : _b.length) ?? 0) > (page.pageNo - 1) * page.pageSize)
          return dataNuxt.data.value ?? { list: [], total: 0 };
        const res = await getList(page.pageNo, params);
        res.list.forEach((item, idx) => item.stage = idx);
        return {
          list: useArrayUnique([...((_d = (_c = dataNuxt == null ? void 0 : dataNuxt.data) == null ? void 0 : _c.value) == null ? void 0 : _d.list) || [], ...res.list], (a, b) => a._id === b._id).value,
          total: res.total
        };
      },
      {
        watch: [() => page.pageNo, () => page.pageSize, currentTag]
      }
    )), __temp = await __temp, __restore(), __temp);
    computed(() => {
      var _a;
      return pending.value || page.pageNo * page.pageSize > (((_a = data.value) == null ? void 0 : _a.total) || 0);
    });
    computed(() => {
      var _a;
      if (!scrollRef.value)
        return null;
      return (_a = scrollRef.value) == null ? void 0 : _a.$el.querySelector(".el-scrollbar__wrap");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tags = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "h-full": "",
        "w-full": "",
        flex: ""
      }, _attrs))}><div basis="40">`);
      _push(ssrRenderComponent(_component_Tags, null, null, _parent));
      _push(`</div><div h-full w-full shrink-0 flex-grow-3>`);
      _push(ssrRenderComponent(unref(ElScrollbar), {
        ref_key: "scrollRef",
        ref: scrollRef
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<ul ml-4 flex flex-col gap-y-4${_scopeId}><!--[-->`);
            ssrRenderList((_a = unref(data)) == null ? void 0 : _a.list, (item) => {
              _push2(`<div class="slide-enter" style="${ssrRenderStyle({
                "--stage": item.stage
              })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/blog/${item._id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<li c="$bl-main" opacity-75 hover:opacity-100${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_ClientOnly, null, {
                      fallback: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="slide-enter hidden h-6"${_scopeId3}><span${_scopeId3}>${ssrInterpolate(item.title)}</span></div><div h-6 class="hidden"${_scopeId3}><span text-xs${_scopeId3}>${ssrInterpolate(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss"))}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "slide-enter hidden h-6" }, [
                              createVNode("span", null, toDisplayString(item.title), 1)
                            ]),
                            createVNode("div", {
                              "h-6": "",
                              class: "hidden"
                            }, [
                              createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                            ])
                          ];
                        }
                      })
                    }, _parent3, _scopeId2));
                    _push3(`</li>`);
                  } else {
                    return [
                      createVNode("li", {
                        c: "$bl-main",
                        "opacity-75": "",
                        "hover:opacity-100": ""
                      }, [
                        createVNode(_component_ClientOnly, null, {
                          fallback: withCtx(() => [
                            createVNode("div", { class: "slide-enter hidden h-6" }, [
                              createVNode("span", null, toDisplayString(item.title), 1)
                            ]),
                            createVNode("div", {
                              "h-6": "",
                              class: "hidden"
                            }, [
                              createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(unref(Starport), {
                              port: item._id,
                              class: "slide-enter",
                              "h-6": ""
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["port"]),
                            createVNode(unref(Starport), {
                              port: `${item.createdAt}`,
                              "h-6": ""
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                              ]),
                              _: 2
                            }, 1032, ["port"])
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--><li${ssrRenderAttrs(mergeProps({
              "element-loading-background": "transparent",
              "h-10": ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(pending))))}${_scopeId}></li></ul>`);
          } else {
            return [
              createVNode("ul", {
                "ml-4": "",
                flex: "",
                "flex-col": "",
                "gap-y-4": ""
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList((_b = unref(data)) == null ? void 0 : _b.list, (item) => {
                  return openBlock(), createBlock("div", {
                    key: item._id,
                    class: "slide-enter",
                    style: {
                      "--stage": item.stage
                    }
                  }, [
                    createVNode(_component_NuxtLink, {
                      to: `/blog/${item._id}`
                    }, {
                      default: withCtx(() => [
                        createVNode("li", {
                          c: "$bl-main",
                          "opacity-75": "",
                          "hover:opacity-100": ""
                        }, [
                          createVNode(_component_ClientOnly, null, {
                            fallback: withCtx(() => [
                              createVNode("div", { class: "slide-enter hidden h-6" }, [
                                createVNode("span", null, toDisplayString(item.title), 1)
                              ]),
                              createVNode("div", {
                                "h-6": "",
                                class: "hidden"
                              }, [
                                createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode(unref(Starport), {
                                port: item._id,
                                class: "slide-enter",
                                "h-6": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["port"]),
                              createVNode(unref(Starport), {
                                port: `${item.createdAt}`,
                                "h-6": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { "text-xs": "" }, toDisplayString(unref(dayjs)(item.createdAt).format("YYYY-MM-DD HH:mm:ss")), 1)
                                ]),
                                _: 2
                              }, 1032, ["port"])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ], 4);
                }), 128)),
                withDirectives(createVNode("li", {
                  "element-loading-background": "transparent",
                  "h-10": ""
                }, null, 512), [
                  [_directive_loading, unref(pending)]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-5ed6c596.mjs.map
