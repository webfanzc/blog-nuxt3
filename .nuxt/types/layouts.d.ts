import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "demos"
declare module "E:/blog-upgrade/blog-nuxt3/node_modules/.pnpm/nuxt@3.4.3_@types+node@18.14.0_eslint@8.40.0_rollup@2.79.1_sass@1.62.1_typescript@5.0.4_vue-tsc@1.6.4/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}