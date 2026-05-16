<template>
  <aside class="relative overflow-hidden rounded-lg border border-moss-700/15 bg-paper-2 p-6 md:p-8">
    <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-moss-200/40 blur-3xl" aria-hidden="true"></div>
    <div class="absolute -left-8 -bottom-12 h-28 w-28 rounded-full bg-ochre/20 blur-3xl" aria-hidden="true"></div>

    <div class="relative grid items-center gap-5 md:grid-cols-[1fr_auto]">
      <div>
        <p class="eyebrow">Novičnik</p>
        <h3 class="mt-2 font-serif text-2xl text-moss-900">{{ title }}</h3>
        <p class="mt-2 max-w-md text-sm text-moss-900/70">{{ description }}</p>
      </div>
      <a :href="url" target="_blank" rel="noopener" class="btn">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6" /></svg>
        Prijavi se
      </a>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Bodi na tekočem' },
  description: {
    type: String,
    default: 'Mesečna e-pošta z najavami srečanj, novostmi iz odprtokodne geo-skupnosti in povabili k sodelovanju.',
  },
  url: { type: String, default: 'http://eepurl.com/i3SUYE' },
})
</script>
