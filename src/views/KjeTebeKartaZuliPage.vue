<template>
  <PageHero
    eyebrow="Kartografija"
    :title="page?.title || 'Kje tebe karta žuli?'"
    :tagline="page?.tagline"
  />
  <section class="section-tight">
    <div class="container-narrow">
      <MarkdownContent v-if="page" :html="page.html" />
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import { getPage } from '@/content.js'

const page = getPage('kje-tebe-karta-zuli')
</script>
