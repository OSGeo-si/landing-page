<template>
  <div class="prose-osgeo" v-html="html"></div>
</template>

<script setup>
defineProps({
  html: { type: String, required: true },
})
</script>
