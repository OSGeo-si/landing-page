<template>
  <template v-if="event">
    <PageHero
      :eyebrow="categoryLabel"
      :title="event.title"
    >
      <template #actions>
        <div class="flex flex-wrap items-center gap-2 text-sm text-moss-900/80">
          <span class="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" class="h-4 w-4 text-moss-600" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path stroke-linecap="round" d="M8 3v4M16 3v4M3 10h18" /></svg>
            {{ formattedDate }}
            <template v-if="formattedEndDate"> – {{ formattedEndDate }}</template>
            <template v-if="event.time"> · {{ event.time }}</template>
          </span>
          <span v-if="event.location" class="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" class="h-4 w-4 text-moss-600" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            {{ event.location }}
          </span>
        </div>
        <a
          v-if="event.eventUrl && !eventPassed && isExternal"
          :href="event.eventUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn"
        >
          Prijavi se na dogodek
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      </template>
    </PageHero>

    <section class="section-tight">
      <div class="container-narrow">
        <MarkdownContent :html="event.html" />
        <div class="mt-12">
          <router-link to="/" class="text-sm font-semibold text-moss-700 hover:text-moss-900">← Nazaj na začetno stran</router-link>
        </div>
      </div>
    </section>
  </template>

  <section v-else class="section">
    <div class="container-narrow text-center">
      <p class="eyebrow">404</p>
      <h1 class="mt-2 font-serif text-4xl text-moss-900">Dogodka ni</h1>
      <p class="mt-4 text-moss-900/70">Povezava verjetno ni pravilna.</p>
      <router-link to="/" class="btn mt-8">Nazaj na začetno stran</router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import { getEvent } from '@/content.js'

const route = useRoute()
const event = computed(() => getEvent(route.params.slug))

const formattedDate = computed(() => event.value?.date ? dayjs(event.value.date).format('DD. MM. YYYY') : '')
const formattedEndDate = computed(() => event.value?.end_date ? dayjs(event.value.end_date).format('DD. MM. YYYY') : '')

const eventPassed = computed(() => {
  if (!event.value) return false
  const last = event.value.end_date || event.value.date
  return last < new Date().toISOString().slice(0, 10)
})

const isExternal = computed(() => /^https?:/i.test(event.value?.eventUrl || ''))

const categoryLabels = {
  geodev: 'GeoDev',
  'osgeo-konferenca': 'Konferenca',
  svizec: 'Svizec',
}
const categoryLabel = computed(() => categoryLabels[event.value?.category] || 'Dogodek')
</script>
