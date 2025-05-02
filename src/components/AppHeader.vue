<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import HeaderDrawer from '@/components/HeaderDrawer.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { onMounted, onUnmounted, ref } from 'vue'
const isOpen = ref(false)
const isMobile = ref(window.innerWidth <= 767)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 767
  if (!isMobile.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__left">
          <h1 class="header__logo">
            <img src="/public/logo.svg" alt="E-VALUE WORKS WRITE" />
          </h1>
          <p>セミナー情報サイト</p>
        </div>

        <div class="header__right">
          <div class="header__nav">
            <HeaderNav />
          </div>

          <div class="header__btn" @click="toggleMenu">
            <font-awesome-icon
              icon="bars"
              :class="{
                'is-hidden': isOpen,
                'is-show': !isOpen,
              }"
            />
            <font-awesome-icon
              icon="xmark"
              :class="{
                'is-hidden': !isOpen,
                'is-show': isOpen,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isOpen && isMobile" class="header__drawer">
        <HeaderDrawer />
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.header {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(110, 110, 110, 0.25);

  @include mq-down() {
    padding: 10px 0;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    p {
      margin-top: 0.2rem;
      font-weight: 900;
      font-size: 0.8em;
      text-align: right;
    }
  }

  &__logo {
    width: 250px;

    @include mq-down() {
      width: 160px;
    }
  }

  &__nav {
    @include mq-down() {
      display: none;
    }
  }

  &__btn {
    position: relative;
    z-index: 1;
    display: none;
    width: 30px;
    height: 30px;
    cursor: pointer;

    @include mq-down() {
      display: block;
    }

    svg {
      width: 100%;
      height: auto;
      transition:
        transform 0.4s ease,
        opacity 0.4s ease;

      &.is-hidden {
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
        opacity: 0;
      }

      &.is-show {
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(360deg);
        opacity: 1;
      }
    }
  }

  &__drawer {
    background-color: #fff;
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.4s ease;
}
.fade-enter-to {
  opacity: 1;
}
</style>
