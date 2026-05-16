<template>
  <div v-if="news.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <NewsCard v-for="item in news" :key="item.slug" :news="item" />
  </div>
  <p v-else class="rounded-lg border border-dashed border-moss-700/20 bg-paper-2 px-6 py-10 text-center text-sm text-moss-900/60">
    Še ni objavljenih novic. Spremljaj nas — kmalu pridejo.
  </p>
</template>

<script setup>
import NewsCard from './NewsCard.vue'

defineProps({
  news: { type: Array, required: true },
})
</script>
