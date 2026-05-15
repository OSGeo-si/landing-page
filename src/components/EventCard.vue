<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    class="group relative flex h-full flex-col rounded-lg border border-moss-700/15 bg-surface p-6 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-moss-700/30 hover:shadow-lg"
    :class="{ 'ring-2 ring-moss-400/40': isFuture }"
  >
    <div class="flex items-center justify-between">
      <span
        v-if="categoryLabel"
        class="inline-flex items-center rounded-full bg-moss-50 px-2.5 py-1 text-xs font-medium text-moss-700"
      >
        {{ categoryLabel }}
      </span>
      <span v-if="isFuture" class="inline-flex items-center gap-1.5 text-xs font-semibold text-moss-700">
        <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-moss-500"></span>
        Prihaja
      </span>
    </div>

    <h3 class="mt-3 font-serif text-xl text-moss-900 transition group-hover:text-moss-700">
      {{ event.title }}
    </h3>

    <dl class="mt-4 space-y-2 text-sm text-moss-900/75">
      <div class="flex items-start gap-2">
        <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 flex-none text-moss-600" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
        <span>{{ event.location }}</span>
      </div>
      <div class="flex items-start gap-2">
        <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 flex-none text-moss-600" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path stroke-linecap="round" d="M8 3v4M16 3v4M3 10h18" /></svg>
        <span>
          {{ formattedDate }}<template v-if="formattedEndDate"> – {{ formattedEndDate }}</template>
          <template v-if="event.time"> · {{ event.time }}</template>
        </span>
      </div>
    </dl>

    <p v-if="event.summary" class="mt-4 text-sm text-moss-900/80">{{ event.summary }}</p>

    <span class="mt-auto pt-6 text-sm font-semibold text-moss-700">
      Več informacij
      <svg viewBox="0 0 24 24" class="ml-1 inline h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" /></svg>
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { isFutureEvent } from '@/content.js'

const props = defineProps({
  event: { type: Object, required: true },
})

const isExternal = computed(() => {
  const url = props.event.eventUrl || ''
  return /^https?:/i.test(url)
})

const linkComponent = computed(() => {
  if (props.event.bodyMarkdown && props.event.bodyMarkdown.trim()) return 'router-link'
  if (isExternal.value) return 'a'
  return 'router-link'
})

const linkProps = computed(() => {
  if (linkComponent.value === 'router-link') {
    return { to: `/dogodki/${props.event.slug}` }
  }
  return { href: props.event.eventUrl, target: '_blank', rel: 'noopener noreferrer' }
})

const formattedDate = computed(() => props.event.date ? dayjs(props.event.date).format('DD.MM.YYYY') : '')
const formattedEndDate = computed(() => props.event.end_date ? dayjs(props.event.end_date).format('DD.MM.YYYY') : '')

const isFuture = computed(() => isFutureEvent(props.event))

const categoryLabels = {
  geodev: 'GeoDev',
  'osgeo-konferenca': 'Konferenca',
  svizec: 'Svizec',
}
const categoryLabel = computed(() => categoryLabels[props.event.category] || '')
</script>
