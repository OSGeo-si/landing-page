<template>
  <div v-if="images.length">
    <div class="mb-4 flex items-baseline justify-between border-b border-moss-700/15 pb-3">
      <div class="flex items-baseline gap-3">
        <p class="eyebrow">Galerija</p>
      </div>
      <span class="text-xs font-medium uppercase tracking-[0.12em] text-moss-700/70">
        {{ images.length }} {{ images.length === 1 ? 'fotografija' : 'fotografij' }}
      </span>
    </div>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
      <button
        v-for="(img, i) in images"
        :key="img.url"
        type="button"
        class="group relative aspect-[4/3] overflow-hidden rounded-md bg-paper-2 transition hover:ring-2 hover:ring-moss-500/40"
        @click="open(i)"
      >
        <img
          :src="img.url"
          :alt="img.alt"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </button>
    </div>

    <!-- lightbox -->
    <Teleport to="body">
      <div
        v-if="active !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
        @click.self="close"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Zapri"
          @click="close"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
        </button>

        <button
          v-if="images.length > 1"
          type="button"
          class="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Prejšnja"
          @click="prev"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 6-6 6 6 6" /></svg>
        </button>
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Naslednja"
          @click="next"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </button>

        <figure class="flex max-h-full max-w-full flex-col items-center gap-3">
          <img
            :src="images[active].url"
            :alt="images[active].alt"
            class="max-h-[85vh] max-w-full object-contain"
          />
          <figcaption class="text-center text-sm text-white/80">
            <span>{{ active + 1 }} / {{ images.length }}</span>
            <span v-if="images[active].alt" class="ml-2">· {{ images[active].alt }}</span>
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
})

const active = ref(null)
const open = (i) => { active.value = i }
const close = () => { active.value = null }
const next = () => { active.value = (active.value + 1) % props.images.length }
const prev = () => { active.value = (active.value - 1 + props.images.length) % props.images.length }

const onKey = (e) => {
  if (active.value === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

watch(active, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v !== null ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>
