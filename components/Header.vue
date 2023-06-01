<script setup lang="ts">
const tabs = ref([
  { name: '博客', path: '/blog' },
  { name: 'Demos', path: '/demos' },
])
</script>

<template>
  <div w-full flex items-center px-5 py-2>
    <div ml-auto flex gap-x-5>
      <div v-for="item in tabs" :key="item.path">
        <NuxtLink :to="item.path" active-class="!c-$bl-main" class="c-$bl-title">
          {{ item.name }}
        </NuxtLink>
      </div>
      <DarkToggle />
    </div>
  </div>
</template>
