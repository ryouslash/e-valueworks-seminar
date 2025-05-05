<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <HomeView />
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.main {
  @include mq-down() {
    margin-top: 60px;
  }
}
</style>
