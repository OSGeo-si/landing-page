<!-- src/App.vue -->
<template>
  <div>
    <Header />
    <main class="d-flex w-full h-full">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>

<style lang="scss">


/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



</style>
