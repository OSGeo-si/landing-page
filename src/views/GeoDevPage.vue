<template>
  <PageHero
    eyebrow="Slovenia"
    :title="page?.title || 'GeoDev Slovenia'"
    :tagline="page?.tagline"
    :events="events"
  />

  <section class="section-tight">
    <div class="container-page">
      <MarkdownContent v-if="page" :html="page.html" class="mx-auto max-w-3xl" />

      <div class="mt-14">
        <p class="eyebrow">Dogodki in novice</p>
        <h2 class="mt-2 font-serif text-3xl text-moss-900">Pretekla in prihodnja srečanja</h2>
        <span class="rule"></span>
      </div>
      <div class="mt-8">
        <EventSections :events="events" :past-limit="6" />
      </div>
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import EventSections from '@/components/EventSections.vue'
import { getEventsByTag, getPage } from '@/content.js'

const page = getPage('geodev')
const events = getEventsByTag('geodev')
</script>
