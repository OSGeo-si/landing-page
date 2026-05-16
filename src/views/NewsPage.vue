<template>
  <PageHero
    eyebrow="Bilten"
    title="Novice"
    tagline="Kratka poročila s konferenc, hackathonov in dogodkov, kjer društvo sodeluje, ter novice iz odprtokodne geoprostorske skupnosti."
  />

  <section class="section-tight">
    <div class="container-page">
      <NewsList :news="news" />
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import NewsList from '@/components/NewsList.vue'
import { getAllNews } from '@/content.js'

const news = getAllNews()
</script>
