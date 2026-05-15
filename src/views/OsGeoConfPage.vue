<template>
  <PageHero
    eyebrow="Konferenca"
    :title="page?.title || 'Open Source Geospatial Slovenija'"
    :tagline="page?.tagline"
  />

  <section class="section-tight">
    <div class="container-page">
      <MarkdownContent v-if="page" :html="page.html" class="mx-auto max-w-3xl" />

      <div class="mt-14">
        <p class="eyebrow">Letne konference</p>
        <h2 class="mt-2 font-serif text-3xl text-moss-900">Programi in posnetki</h2>
        <span class="rule"></span>
      </div>
      <div class="mt-8">
        <EventList :events="events" />
      </div>
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import EventList from '@/components/EventList.vue'
import { getEventsByTag, getPage } from '@/content.js'

const page = getPage('osgeo-konferenca')
const events = getEventsByTag('osgeo-conference')
</script>
