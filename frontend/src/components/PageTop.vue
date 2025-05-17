<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const showPageTop = ref(false)

const handleScroll = () => {
  showPageTop.value = window.scrollY > 1000
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const router = useRouter()
  router.afterEach(() => {
    // ページ遷移後、スクロール位置を確認
    handleScroll()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <transition name="fade">
    <button v-if="showPageTop" class="page-top" @click="scrollToTop">
      <font-awesome-icon icon="chevron-up" />
    </button>
  </transition>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.page-top {
  position: fixed;
  z-index: 90;
  right: 3rem;
  bottom: 3rem;
  border: none;
  border-radius: 0.5rem;
  width: 4rem;
  height: 4rem;
  background-color: $color-key;
  cursor: pointer;
  transition: opacity 0.5s ease;
  appearance: none;

  &:hover {
    opacity: 0.8;
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 3rem;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}
</style>
