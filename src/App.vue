<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './layout/ui/header/header.vue';
import Footer from './layout/ui/footer/footer.vue';
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <RouterView />
    </div>
    
    <Footer />
  </main>
</template>
