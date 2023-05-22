<script setup lang="ts">
import { StarportCarrier } from 'vue-starport'
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <StarportCarrier>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </StarportCarrier>
</template>

<style lang="scss">
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: var(--bl-background);
  color: var(--bl-title);
}
</style>
