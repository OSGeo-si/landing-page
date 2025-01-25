<template>
  <header>
    <a href="/landing-page/#/home" class="header-logo">
      <img :src="logo" alt="Logo"/>
    </a>
    <div class="hamburger" @click="toggleMenu">
      <div></div>
      <div></div>g
      <div></div>
    </div>
    <nav :class="{ active: isMenuOpen }">
      <router-link to="/osgeo-konferenca" @click="closeMenu">Konferenca</router-link>
      <router-link to="/geodev" @click="closeMenu">GeoDev</router-link>
      <router-link to="/teren" @click="closeMenu">Teren</router-link>
      <router-link to="/about" @click="closeMenu">O nas</router-link>
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

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
