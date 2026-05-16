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

  <section v-if="upcomingEvents.length" class="section bg-paper-2">
    <div class="container-page">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Dogodki</p>
          <h2 class="mt-2 font-serif text-3xl text-moss-900 md:text-4xl">Prihajajoči dogodki</h2>
          <span class="rule"></span>
        </div>
        <router-link to="/geodev" class="hidden text-sm font-semibold text-moss-700 hover:text-moss-900 md:inline">
          Vsi dogodki →
        </router-link>
      </div>
      <div class="mt-10">
        <EventList :events="upcomingEvents" />
      </div>
    </div>
  </section>

  <section v-if="latestNews.length" :class="['section', upcomingEvents.length ? '' : 'bg-paper-2']">
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
</template>

<script setup>
import svizec from '@/assets/svizec-main-clr.svg'
import EventList from '@/components/EventList.vue'
import NewsList from '@/components/NewsList.vue'
import { getAllNews, getPage, getUpcomingEvents } from '@/content.js'

const home = getPage('home')
const upcomingEvents = getUpcomingEvents()
const latestNews = getAllNews().slice(0, 3)
</script>
