<template>
  <!-- Mobile: sticky bar under the header that expands into the full list.
       Desktop (lg+): sticky sidebar next to the program. -->
  <aside class="sticky top-16 z-30 -mx-5 mb-6 self-start md:-mx-8 lg:top-24 lg:mx-0 lg:mb-0">
    <div class="relative border-b border-moss-700/10 bg-paper/90 backdrop-blur lg:hidden">
      <button
        type="button"
        class="flex w-full items-center gap-3 px-5 py-3 text-left md:px-8"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span class="eyebrow shrink-0">Na tej strani</span>
        <span class="min-w-0 flex-1 truncate text-sm font-medium text-moss-900">{{ activeLabel }}</span>
        <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 text-moss-600 transition" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
      </button>
      <nav v-if="open" class="absolute inset-x-0 top-full max-h-[60vh] overflow-y-auto border-y border-moss-700/10 bg-paper px-5 py-3 shadow-card md:px-8" aria-label="Na tej strani">
        <ul class="toc-list">
          <li v-for="item in items" :key="item.id">
            <a :href="`#${item.id}`" :class="linkClass(item)" @click.prevent="go(item.id)">
              <span v-if="item.time" class="toc-time">{{ item.time }}</span>
              <span class="truncate">{{ item.label }}</span>
              <span v-if="item.sub" class="toc-sub">{{ item.sub }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <nav class="hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block" aria-label="Na tej strani">
      <p class="mb-3 text-sm font-semibold text-moss-900">Na tej strani</p>
      <ul class="toc-list border-l border-moss-700/15">
        <li v-for="item in items" :key="item.id">
          <a :href="`#${item.id}`" :class="linkClass(item)" :title="item.label" @click.prevent="go(item.id)">
            <span v-if="item.time" class="toc-time">{{ item.time }}</span>
            <span class="truncate">{{ item.label }}</span>
            <span v-if="item.sub" class="toc-sub">{{ item.sub }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const open = ref(false)
const activeId = ref(props.items[0]?.id)

const activeLabel = computed(() => {
  const i = props.items.findIndex(t => t.id === activeId.value)
  const item = props.items[i]
  if (!item) return ''
  if (item.level === 2) return item.label
  const day = props.items.slice(0, i).findLast(t => t.level === 2)
  return [day?.label, item.time, item.label].filter(Boolean).join(' · ')
})

function linkClass(item) {
  return [
    'toc-link',
    item.level === 2 ? 'toc-day' : 'toc-session',
    { 'toc-short': item.short, 'toc-active': item.id === activeId.value },
  ]
}

function go(id) {
  open.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Active = last section whose top has scrolled past the sticky header area.
function update() {
  const offset = 150
  let current = props.items[0]?.id
  for (const item of props.items) {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top <= offset) current = item.id
  }
  activeId.value = current
}

let frame = 0
function onScroll() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
@reference "../style.css";

.toc-list {
  @apply space-y-0.5 text-sm;
}
.toc-link {
  @apply -ml-px flex items-baseline gap-2 border-l-2 border-transparent py-1 pl-3 text-moss-900/60 no-underline transition hover:text-moss-900;
}
.toc-day {
  @apply mt-3 font-semibold text-moss-800;
}
li:first-child > .toc-day {
  @apply mt-0;
}
.toc-session {
  @apply pl-5;
}
.toc-short {
  @apply italic;
}
.toc-time {
  @apply w-10 shrink-0 font-mono text-xs tabular-nums text-moss-600/80;
}
.toc-sub {
  @apply shrink-0 text-xs font-normal text-moss-900/50;
}
.toc-active {
  @apply border-moss-600 text-moss-900;
}
.toc-active .toc-time {
  @apply text-moss-700;
}
</style>
