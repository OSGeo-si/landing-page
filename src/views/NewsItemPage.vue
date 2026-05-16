<template>
  <template v-if="news">
    <section class="relative overflow-hidden border-b border-moss-700/10 bg-paper-2">
      <div class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
        <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-moss-200 blur-3xl"></div>
        <div class="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-ochre/30 blur-3xl"></div>
      </div>
      <div class="container-page relative py-16 md:py-20">
        <p class="eyebrow">Novica</p>
        <h1 class="mt-3 max-w-3xl font-serif text-4xl leading-tight text-moss-900 md:text-5xl">
          {{ news.title }}
        </h1>
        <span class="rule"></span>
        <p class="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-moss-700">
          {{ formattedDate }}
        </p>
        <p v-if="news.summary" class="mt-6 max-w-2xl text-lg text-moss-900/80">
          {{ news.summary }}
        </p>
      </div>
    </section>

    <section v-if="news.cover" class="bg-paper-2">
      <div class="container-page py-6">
        <img
          :src="news.cover.url"
          :alt="news.cover.alt || news.title"
          class="mx-auto max-h-[60vh] w-full max-w-5xl rounded-lg object-cover shadow-card"
        />
      </div>
    </section>

    <section class="section-tight">
      <div class="container-narrow">
        <MarkdownContent :html="news.html" />

        <div v-if="news.gallery?.length" class="mt-16">
          <EventGallery :images="news.gallery" />
        </div>

        <div class="mt-14">
          <NewsletterSignup />
        </div>

        <div class="mt-10">
          <router-link to="/novice" class="text-sm font-semibold text-moss-700 hover:text-moss-900">← Vse novice</router-link>
        </div>
      </div>
    </section>
  </template>

  <section v-else class="section">
    <div class="container-narrow text-center">
      <p class="eyebrow">404</p>
      <h1 class="mt-2 font-serif text-4xl text-moss-900">Novice ni</h1>
      <p class="mt-4 text-moss-900/70">Povezava verjetno ni pravilna.</p>
      <router-link to="/novice" class="btn mt-8">Vse novice</router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import MarkdownContent from '@/components/MarkdownContent.vue'
import EventGallery from '@/components/EventGallery.vue'
import NewsletterSignup from '@/components/NewsletterSignup.vue'
import { getNews } from '@/content.js'

const route = useRoute()
const news = computed(() => getNews(route.params.slug))

const formattedDate = computed(() =>
  news.value?.date ? dayjs(news.value.date).format('DD. MM. YYYY') : ''
)
</script>
