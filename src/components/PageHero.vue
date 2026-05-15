<template>
  <section class="relative overflow-hidden border-b border-moss-700/10 bg-paper-2">
    <div class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
      <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-moss-200 blur-3xl"></div>
      <div class="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-ochre/30 blur-3xl"></div>
    </div>
    <div class="container-page py-16 md:py-24">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="mt-3 max-w-3xl font-serif text-4xl leading-tight text-moss-900 md:text-5xl">
        <slot name="title">{{ title }}</slot>
      </h1>
      <span class="rule"></span>
      <p v-if="tagline" class="mt-6 max-w-2xl text-lg text-moss-900/80">
        {{ tagline }}
      </p>
      <div v-if="$slots.actions" class="mt-8 flex flex-wrap items-center gap-3">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
})
</script>
