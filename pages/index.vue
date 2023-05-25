<script setup lang="ts">
useRouter().push('/blog')
</script>

<template>
  <div>
    <Suspense>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
