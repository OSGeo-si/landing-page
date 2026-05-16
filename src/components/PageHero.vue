<template>
  <section
    class="relative overflow-hidden border-b border-moss-700/10 bg-paper-2"
    :class="hasMap ? 'min-h-[320px]' : ''"
  >
    <!-- Map (full-bleed). `isolate` contains Leaflet's pane z-indices so they don't paint over the title. -->
    <div v-if="hasMap" class="absolute inset-0 isolate z-0">
      <EventMap
        :events="events"
        :chromeless="true"
        :lock-scroll="true"
        :marker-offset-x="markerOffset"
        height="100%"
        :fallback-center="fallbackCenter"
        :fallback-zoom="fallbackZoom"
      />
    </div>

    <!-- Legibility scrim — solid paper-2 on the left fading out to reveal map on the right. -->
    <div
      v-if="hasMap"
      class="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
      style="
        background:
          linear-gradient(to right,
            var(--color-paper-2) 0%,
            var(--color-paper-2) 28%,
            color-mix(in srgb, var(--color-paper-2) 75%, transparent) 50%,
            color-mix(in srgb, var(--color-paper-2) 10%, transparent) 80%,
            transparent 100%);
      "
    ></div>

    <!-- Fallback decorative blobs when no map -->
    <div v-if="!hasMap" class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
      <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-moss-200 blur-3xl"></div>
      <div class="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-ochre/30 blur-3xl"></div>
    </div>

    <div class="container-page relative z-20 py-10 md:py-14">
      <div :class="hasMap ? 'max-w-2xl' : ''">
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h1 class="mt-3 font-serif text-4xl leading-tight text-moss-900 md:text-5xl" :class="hasMap ? '' : 'max-w-3xl'">
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
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import EventMap from '@/components/EventMap.vue'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  events: { type: Array, default: () => [] },
  fallbackCenter: { type: Array, default: () => [46.15, 14.8] },
  fallbackZoom: { type: Number, default: 7 },
  markerOffset: { type: Number, default: 220 },
})

const hasMap = computed(() =>
  props.events.some(e => typeof e.lat === 'number' && typeof e.lng === 'number')
)
</script>
