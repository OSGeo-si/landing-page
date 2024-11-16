<template>
  <header>
    <a href="/landing-page" class="header-logo">
      <img :src="logo" alt="Logo"/>
    </a>
    <div class="hamburger" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <nav :class="{ active: isMenuOpen }">
      <router-link to="/osgeo-konferenca">Konferenca</router-link>
      <router-link to="/geodev">GeoDev</router-link>
      <router-link to="/teren">Teren</router-link>
      <router-link to="/about">O nas</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo-lg.svg'; // Import the logo image directly

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
