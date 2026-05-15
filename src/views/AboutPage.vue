<template>
  <PageHero eyebrow="Društvo OSGeo Slovenija" :title="page?.title || 'O društvu'" />

  <section class="section-tight">
    <div class="container-narrow">
      <MarkdownContent v-if="page" :html="page.html" />

      <div class="mt-12 grid items-start gap-8 rounded-xl border border-moss-700/10 bg-paper-2 p-8 md:grid-cols-[1fr_auto]">
        <div>
          <p class="eyebrow">Članarina 2025</p>
          <h3 class="mt-2 font-serif text-2xl text-moss-900">Plačilo s QR kodo</h3>
          <p class="mt-2 text-sm text-moss-900/75">Z mobilno banko poskeniraj QR kodo in plačaj 20 € članarine. Hvala za podporo skupnosti.</p>
          <a href="http://eepurl.com/i3SUYE" target="_blank" rel="noopener" class="btn mt-6">Prijavi se na novice</a>
        </div>
        <figure class="m-0 flex-none">
          <img :src="qr" alt="QR koda za plačilo članarine (20 EUR)" loading="lazy" class="block w-44 rounded-md bg-white p-3 shadow-card" />
        </figure>
      </div>

      <div class="mt-12">
        <p class="eyebrow">Podporniki</p>
        <h3 class="mt-2 font-serif text-2xl text-moss-900">Hvala za pomoč.</h3>
        <span class="rule"></span>
        <div class="mt-6 flex flex-wrap items-center gap-8">
          <img :src="flycom" alt="Flycom Technologies" class="h-16 w-auto" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import { getPage } from '@/content.js'
import qr from '@/assets/qr_clanarina_2025.png'
import flycom from '@/assets/flycom-logo-main-web.png'

const page = getPage('about')
</script>
