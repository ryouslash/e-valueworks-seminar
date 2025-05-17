<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()

router.afterEach((to) => {
  const title = to.meta.title as string
  const description = to.meta.description as string

  if (title) document.title = title

  const descriptionTag = document.querySelector('meta[name="description"]')
  if (descriptionTag) {
    if (description) {
      descriptionTag.setAttribute('content', description)
    } else {
      descriptionTag.setAttribute('content', '')
    }
  }
})
</script>

<template>
  <AppHeader />
  <div class="content">
    <RouterView />
  </div>
  <AppFooter />
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.content {
  @include mq-down() {
    margin-top: 60px;
  }
}
</style>
