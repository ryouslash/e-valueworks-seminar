<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="gnav">
    <ul class="gnav__items">
      <li class="gnav__item">
        <RouterLink to="/">ホーム<span>HOME</span></RouterLink>
      </li>
      <li class="gnav__item">
        <RouterLink to="/#seminar">セミナー情報<span>SEMINAR</span></RouterLink>
      </li>
      <li class="gnav__item">
        <RouterLink to="/#profile">講師プロフィール<span>PROFILE</span></RouterLink>
      </li>
      <li class="gnav__item">
        <RouterLink to="/#voice">受講者の声<span>VOICE</span></RouterLink>
      </li>
      <li class="gnav__item">
        <RouterLink to="/#contact">お問い合わせ<span>CONTACT</span></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.gnav {
  &__items {
    display: flex;
  }

  &__item {
    text-align: center;

    a {
      position: relative;
      z-index: 1;
      display: block;
      padding: 2rem 1rem;
      transition: opacity 0.4s;
      cursor: pointer;

      &::after {
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        right: 100%;
        height: 0.2rem;
        background-color: #333;
        transition: right 0.4s ease;
        content: '';
      }

      &:hover {
        opacity: 0.6;

        &::after {
          right: 0;
        }
      }

      span {
        display: block;
        font-size: 0.6em;
        color: #aaa;
      }
    }
  }
}
</style>
