<script setup lang="ts"></script>

<template>
  <nav class="gnav">
    <ul class="gnav__items">
      <li class="gnav__item">
        <a href="/">ホーム<span>HOME</span></a>
      </li>
      <li class="gnav__item">
        <a href="#profile">講師プロフィール<span>PROFILE</span></a>
      </li>
      <li class="gnav__item">
        <a href="#seminar">セミナー情報<span>SEMINAR</span></a>
      </li>
      <li class="gnav__item">
        <a href="#contact">お問い合わせ<span>CONTACT</span></a>
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
