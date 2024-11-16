<!-- src/components/FooterComponent.vue -->
<template>
  <footer >
    <p>&copy; {{ currentYear }} OSGeo Slovenija. All rights reserved.</p>
  </footer>
</template>

<script setup>
// Get the current year dynamically
const currentYear = new Date().getFullYear();
</script>

