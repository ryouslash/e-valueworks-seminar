<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emit = defineEmits(['close'])

const handleClick = () => {
  emit('close')
}
</script>

<template>
  <div class="drawer">
    <div class="drawer__inner container">
      <ul class="drawer__items">
        <li class="drawer__item">
          <RouterLink to="" @click="handleClick">ホーム<span>HOME</span></RouterLink>
        </li>
        <li class="drawer__item">
          <RouterLink to="#seminar" @click="handleClick"
            >セミナー情報<span>SEMINAR</span></RouterLink
          >
        </li>
        <li class="drawer__item">
          <RouterLink to="#profile" @click="handleClick"
            >講師プロフィール<span>PROFILE</span></RouterLink
          >
        </li>
        <li class="drawer__item">
          <RouterLink to="#contact" @click="handleClick"
            >お問い合わせ<span>CONTACT</span></RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  overflow-y: auto;
  max-height: calc(100vh - 6rem);
  max-height: calc(100dvh - 6rem);

  &__inner {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
  &__item {
    a {
      position: relative;
      z-index: 1;
      display: block;
      padding: 0.5rem 0;
      border-bottom: 0.2rem dotted #333;

      span {
        position: absolute;
        z-index: 1;
        font-size: 0.8em;
        color: #aaa;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
