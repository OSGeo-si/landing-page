<template>
  <PageHero
    eyebrow="Skupnostni dogodek"
    :title="page?.title || 'Svizec'"
    :tagline="page?.tagline"
    :events="events"
  />

  <section class="section-tight">
    <div class="container-page">
      <div class="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <MarkdownContent v-if="page" :html="page.html" />
        <img :src="svizec" alt="Svizec maskota" class="mx-auto w-full max-w-sm" />
      </div>

      <div class="mt-14">
        <p class="eyebrow">Pretekli Svizci</p>
        <h2 class="mt-2 font-serif text-3xl text-moss-900">Dogodki</h2>
        <span class="rule"></span>
      </div>
      <div class="mt-8">
        <EventSections :events="events" />
      </div>
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import EventSections from '@/components/EventSections.vue'
import { getEventsByTag, getPage } from '@/content.js'
import svizec from '@/assets/svizec-main-clr.svg'

const page = getPage('svizec')
const events = getEventsByTag('osgeo-svizec')
</script>
