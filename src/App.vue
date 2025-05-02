<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </main>
  <RouterView />
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.main {
  margin-top: 80px;

  @include mq-down() {
    margin-top: 60px;
  }
}
</style>
