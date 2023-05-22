<template>
  <Header />
  <main style="height:calc(100vh - 176px - 40px)" overflow-hidden py-20>
    <div m-auto h-full max-w100ch>
      <slot />
      <ClientOnly>
        <Plum pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-100 />
      </ClientOnly>
    </div>
  </main>
  <Footer />
</template>
