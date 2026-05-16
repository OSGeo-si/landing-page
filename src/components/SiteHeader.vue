<template>
  <header class="sticky top-0 z-40 border-b border-moss-700/10 bg-paper/85 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <router-link to="/" class="flex items-center no-underline" @click="closeAll">
        <img :src="logo" alt="OSGeo Slovenija" class="h-9 w-auto" />
      </router-link>

      <nav class="hidden items-center gap-1 md:flex">
        <!-- Dogodki dropdown -->
        <div ref="dropdownEl" class="relative">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium no-underline transition hover:bg-moss-50 hover:text-moss-900"
            :class="dogodkiActive ? 'text-moss-800 bg-moss-50' : 'text-moss-900/70'"
            :aria-expanded="dropdownOpen"
            aria-haspopup="menu"
            @click="dropdownOpen = !dropdownOpen"
          >
            Dogodki
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 transition" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="dropdownOpen"
              role="menu"
              class="absolute left-0 top-full z-50 mt-2 min-w-[14rem] overflow-hidden rounded-lg border border-moss-700/15 bg-surface shadow-card"
            >
              <router-link
                v-for="item in eventNav"
                :key="item.to"
                :to="item.to"
                role="menuitem"
                class="block px-4 py-2.5 text-sm font-medium text-moss-900/80 no-underline transition hover:bg-moss-50 hover:text-moss-900"
                active-class="bg-moss-50 text-moss-800"
                @click="closeAll"
              >
                {{ item.label }}
              </router-link>
            </div>
          </transition>
        </div>

        <router-link
          to="/novice"
          class="rounded-md px-3 py-2 text-sm font-medium text-moss-900/70 no-underline transition hover:bg-moss-50 hover:text-moss-900"
          active-class="text-moss-800 bg-moss-50"
          @click="closeAll"
        >
          Novice
        </router-link>

        <router-link
          to="/about"
          class="rounded-md px-3 py-2 text-sm font-medium text-moss-900/70 no-underline transition hover:bg-moss-50 hover:text-moss-900"
          active-class="text-moss-800 bg-moss-50"
          @click="closeAll"
        >
          O nas
        </router-link>

        <button
          type="button"
          class="ml-2 rounded-md p-2 text-moss-800 transition hover:bg-moss-50"
          :aria-label="isDark ? 'Preklopi na svetli način' : 'Preklopi na temni način'"
          :aria-pressed="isDark"
          @click="toggle"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        </button>
        <a
          href="https://github.com/OSGeo-si"
          target="_blank"
          rel="noopener"
          class="rounded-md p-2 text-moss-800 transition hover:bg-moss-50"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </a>
      </nav>

      <div class="flex items-center gap-1 md:hidden">
        <button
          type="button"
          class="rounded-md p-2 text-moss-800 transition hover:bg-moss-50"
          :aria-label="isDark ? 'Preklopi na svetli način' : 'Preklopi na temni način'"
          :aria-pressed="isDark"
          @click="toggle"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-moss-800 transition hover:bg-moss-50"
          @click="mobileOpen = !mobileOpen"
          :aria-expanded="mobileOpen"
          aria-label="Menu"
        >
          <svg v-if="!mobileOpen" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-if="mobileOpen" class="border-t border-moss-700/10 md:hidden">
      <div class="container-page flex flex-col py-3">
        <p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-moss-600">Dogodki</p>
        <router-link
          v-for="item in eventNav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-5 py-2.5 text-sm font-medium text-moss-900/80 no-underline transition hover:bg-moss-50"
          active-class="bg-moss-50 text-moss-900"
          @click="closeAll"
        >
          {{ item.label }}
        </router-link>
        <div class="my-2 h-px bg-moss-700/10"></div>
        <router-link
          to="/novice"
          class="rounded-md px-3 py-2.5 text-sm font-medium text-moss-900/80 no-underline transition hover:bg-moss-50"
          active-class="bg-moss-50 text-moss-900"
          @click="closeAll"
        >
          Novice
        </router-link>
        <router-link
          to="/about"
          class="rounded-md px-3 py-2.5 text-sm font-medium text-moss-900/80 no-underline transition hover:bg-moss-50"
          active-class="bg-moss-50 text-moss-900"
          @click="closeAll"
        >
          O nas
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '@/assets/osgeo-si-logo.svg'
import { useDarkMode } from '@/composables/useDarkMode.js'

const eventNav = [
  { to: '/osgeo-konferenca', label: 'Konferenca' },
  { to: '/geodev', label: 'GeoDev' },
  { to: '/svizec', label: 'Svizec' },
  { to: '/kje-tebe-karta-zuli', label: 'Kje tebe karta žuli?' },
  { to: '/teren', label: 'Teren' },
]

const route = useRoute()
const dropdownOpen = ref(false)
const mobileOpen = ref(false)
const dropdownEl = ref(null)

const dogodkiActive = computed(() => eventNav.some(item => route.path.startsWith(item.to)))

const closeAll = () => {
  dropdownOpen.value = false
  mobileOpen.value = false
}

const onDocClick = (e) => {
  if (dropdownOpen.value && dropdownEl.value && !dropdownEl.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}
const onKey = (e) => {
  if (e.key === 'Escape') dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

// Close on route change
watch(() => route.fullPath, closeAll)

const { isDark, toggle } = useDarkMode()
</script>
