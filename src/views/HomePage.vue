<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-moss-200/50 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-ochre/15 blur-3xl"></div>
    </div>

    <div class="container-page grid items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
      <div>
        <p class="eyebrow">Open Source Geospatial · Slovenija</p>
        <h1 class="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-moss-900 md:text-6xl">
          {{ home?.title || 'OSGeo Slovenija' }}
        </h1>
        <span class="rule"></span>
        <p class="mt-6 max-w-xl text-lg text-moss-900/80">
          {{ home?.tagline }}
        </p>
        <p v-if="home?.html" class="mt-4 max-w-xl text-base text-moss-900/70" v-html="home.html"></p>

        <div class="mt-8 flex flex-wrap gap-3">
          <router-link to="/osgeo-konferenca" class="btn">
            Letošnja konferenca
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" /></svg>
          </router-link>
          <router-link to="/about" class="btn-ghost">O društvu</router-link>
        </div>
      </div>

      <div class="relative">
        <img :src="svizec" alt="Svizec — maskota OSGeo Slovenija" class="mx-auto w-full max-w-md drop-shadow-xl" />
      </div>
    </div>
  </section>

  <section class="section bg-paper-2">
    <div class="container-page">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Dogodki in novice</p>
          <h2 class="mt-2 font-serif text-3xl text-moss-900 md:text-4xl">Kaj se dogaja</h2>
          <span class="rule"></span>
        </div>
        <router-link to="/geodev" class="hidden text-sm font-semibold text-moss-700 hover:text-moss-900 md:inline">
          Vsi GeoDev dogodki →
        </router-link>
      </div>
      <div class="mt-10">
        <EventSections :events="allEvents" :past-limit="3" upcoming-title="Prihajajoči dogodki" past-title="Nedavni dogodki" />
      </div>
    </div>
  </section>

  <section v-if="latestNews.length" class="section">
    <div class="container-page">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Bilten</p>
          <h2 class="mt-2 font-serif text-3xl text-moss-900 md:text-4xl">Zadnje novice</h2>
          <span class="rule"></span>
        </div>
        <router-link to="/novice" class="hidden text-sm font-semibold text-moss-700 hover:text-moss-900 md:inline">
          Vse novice →
        </router-link>
      </div>
      <div class="mt-10">
        <NewsList :news="latestNews" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container-page">
      <div class="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p class="eyebrow">Zemljevid</p>
          <h2 class="mt-2 font-serif text-3xl text-moss-900 md:text-4xl">Kje se srečujemo</h2>
          <span class="rule"></span>
        </div>
        <p class="max-w-md text-sm text-moss-900/70">
          Klikni na pin za podrobnosti dogodka. Vse lokacije naših srečanj po Sloveniji.
        </p>
      </div>
      <div class="mt-8">
        <EventMap :events="allEvents" height="480px" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container-page grid gap-8 md:grid-cols-3">
      <a href="http://eepurl.com/i3SUYE" target="_blank" rel="noopener" class="group rounded-xl border border-moss-700/15 bg-surface p-7 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-moss-700/30">
        <div class="flex h-10 w-10 items-center justify-center rounded-md bg-moss-50 text-moss-700">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 6 9-6" /></svg>
        </div>
        <h3 class="mt-5 font-serif text-xl text-moss-900">Prijavi se na novice</h3>
        <p class="mt-2 text-sm text-moss-900/70">Mesečna e-pošta o dogodkih in novostih iz odprtokodne geo-skupnosti.</p>
        <span class="mt-4 inline-flex text-sm font-semibold text-moss-700 group-hover:text-moss-900">eepurl.com →</span>
      </a>
      <a href="https://github.com/OSGeo-si" target="_blank" rel="noopener" class="group rounded-xl border border-moss-700/15 bg-surface p-7 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-moss-700/30">
        <div class="flex h-10 w-10 items-center justify-center rounded-md bg-moss-50 text-moss-700">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
        </div>
        <h3 class="mt-5 font-serif text-xl text-moss-900">Prispevaj na GitHubu</h3>
        <p class="mt-2 text-sm text-moss-900/70">Vsebina te strani je odprta. Dogodke, popravke in nove strani lahko prispevaš preko GitHuba.</p>
        <span class="mt-4 inline-flex text-sm font-semibold text-moss-700 group-hover:text-moss-900">github.com/OSGeo-si →</span>
      </a>
      <a href="https://discord.gg/XQGqrz8CgA" target="_blank" rel="noopener" class="group rounded-xl border border-moss-700/15 bg-surface p-7 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-moss-700/30">
        <div class="flex h-10 w-10 items-center justify-center rounded-md bg-moss-50 text-moss-700">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.075.075 0 0 0-.079.038c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.075.075 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .079.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127c-.598.349-1.22.645-1.873.892a.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.548-13.66a.06.06 0 0 0-.031-.029Z" /></svg>
        </div>
        <h3 class="mt-5 font-serif text-xl text-moss-900">Pridruži se Discordu</h3>
        <p class="mt-2 text-sm text-moss-900/70">Pogovor o orodjih, podatkih in projektih. Sproščeno, odprto, slovensko.</p>
        <span class="mt-4 inline-flex text-sm font-semibold text-moss-700 group-hover:text-moss-900">discord.gg/XQGqrz8CgA →</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import svizec from '@/assets/svizec-main-clr.svg'
import EventSections from '@/components/EventSections.vue'
import EventMap from '@/components/EventMap.vue'
import NewsList from '@/components/NewsList.vue'
import { getAllEvents, getAllNews, getPage } from '@/content.js'

const home = getPage('home')
const allEvents = getAllEvents()
const latestNews = getAllNews().slice(0, 3)
</script>
