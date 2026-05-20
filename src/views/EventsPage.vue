<template>
  <PageHero
    eyebrow="Dogodki"
    title="Vsi dogodki"
    tagline="Konference, GeoDev srečanja, Svizci in terenski izleti — pretekli in prihajajoči dogodki društva OSGeo Slovenija."
    :events="events"
  />

  <section class="section-tight">
    <div class="container-page">
      <EventSections :events="events" />
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import EventSections from '@/components/EventSections.vue'
import { getAllEvents } from '@/content.js'

const events = getAllEvents()
</script>
