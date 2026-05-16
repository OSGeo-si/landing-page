<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    class="group flex h-full flex-col overflow-hidden rounded-lg border border-moss-700/15 bg-surface no-underline shadow-card transition hover:-translate-y-0.5 hover:border-moss-700/30 hover:shadow-lg"
  >
    <div v-if="news.cover" class="relative aspect-[16/9] overflow-hidden bg-paper-2">
      <img
        :src="news.cover.url"
        :alt="news.cover.alt || news.title"
        class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-moss-600">
        <span>{{ formattedDate }}</span>
        <template v-if="isExternal">
          <span class="text-moss-700/40">·</span>
          <span class="inline-flex items-center gap-1">
            <svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M20 4 10 14M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></svg>
            Zunanji vir
          </span>
        </template>
      </div>
      <h3 class="mt-3 font-serif text-xl leading-tight text-moss-900 transition group-hover:text-moss-700">
        {{ news.title }}
      </h3>
      <p v-if="news.summary" class="mt-3 line-clamp-3 text-sm leading-relaxed text-moss-900/75">
        {{ news.summary }}
      </p>
      <span class="mt-auto pt-5 text-sm font-semibold text-moss-700">
        Preberi več
        <svg viewBox="0 0 24 24" class="ml-1 inline h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" /></svg>
      </span>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  news: { type: Object, required: true },
})

const isExternal = computed(() => /^https?:/i.test(props.news.externalUrl || ''))
const linkComponent = computed(() => (isExternal.value ? 'a' : 'router-link'))
const linkProps = computed(() =>
  isExternal.value
    ? { href: props.news.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { to: `/novice/${props.news.slug}` }
)
const formattedDate = computed(() =>
  props.news.date ? dayjs(props.news.date).format('DD. MM. YYYY') : ''
)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}
</style>
