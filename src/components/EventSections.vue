<template>
  <div class="space-y-14">
    <section v-if="upcoming.length">
      <div class="mb-5 flex items-baseline justify-between gap-4 border-b border-moss-700/15 pb-3">
        <div class="flex items-baseline gap-3">
          <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-moss-500"></span>
          <h3 class="font-serif text-2xl text-moss-900">{{ upcomingTitle }}</h3>
        </div>
        <span class="text-xs font-medium uppercase tracking-[0.12em] text-moss-700/70">
          {{ upcoming.length }} {{ upcoming.length === 1 ? 'dogodek' : 'dogodkov' }}
        </span>
      </div>
      <EventList :events="upcoming" />
    </section>

    <section v-if="past.length">
      <div class="mb-5 flex items-baseline justify-between gap-4 border-b border-moss-700/15 pb-3">
        <h3 class="font-serif text-2xl text-moss-900/80">{{ pastTitle }}</h3>
        <span class="text-xs font-medium uppercase tracking-[0.12em] text-moss-700/60">
          {{ past.length }} {{ past.length === 1 ? 'arhivski' : 'v arhivu' }}
        </span>
      </div>
      <EventList :events="pastDisplayed" />
      <div v-if="pastLimit && past.length > pastLimit" class="mt-6 flex justify-center">
        <button
          type="button"
          class="text-sm font-semibold text-moss-700 hover:text-moss-900"
          @click="showAllPast = !showAllPast"
        >
          {{ showAllPast ? 'Prikaži manj ↑' : `Pokaži vseh ${past.length} preteklih ↓` }}
        </button>
      </div>
    </section>

    <section v-if="!upcoming.length && !past.length" class="rounded-lg border border-dashed border-moss-700/20 bg-paper-2 px-6 py-10 text-center text-sm text-moss-900/60">
      Še ni objavljenih dogodkov. Spremljaj nas — kmalu pridejo.
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EventList from './EventList.vue'
import { isFutureEvent } from '@/content.js'

const props = defineProps({
  events: { type: Array, required: true },
  upcomingTitle: { type: String, default: 'Prihajajoči dogodki' },
  pastTitle: { type: String, default: 'Pretekli dogodki' },
  upcomingLimit: { type: Number, default: 0 },  // 0 = no limit
  pastLimit: { type: Number, default: 0 },
})

const upcoming = computed(() => {
  const all = props.events
    .filter(isFutureEvent)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
  return props.upcomingLimit ? all.slice(0, props.upcomingLimit) : all
})

const past = computed(() =>
  props.events
    .filter(e => !isFutureEvent(e))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
)

const showAllPast = ref(false)
const pastDisplayed = computed(() => {
  if (!props.pastLimit) return past.value
  return showAllPast.value ? past.value : past.value.slice(0, props.pastLimit)
})
</script>
