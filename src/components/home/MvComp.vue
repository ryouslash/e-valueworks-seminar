<script setup lang="ts"></script>

<template>
  <div class="mv">
    <div class="mv__inner container">
      <p class="mv__title">少人数個別指導型<br />ホームページ作成セミナー</p>
      <ul class="mv__lists">
        <li class="mv__list">Web業界経験豊富なプロが指導</li>
        <li class="mv__list">業界未経験の方でも理解しやすいよう<br />丁寧で寄り添った指導</li>
        <li class="mv__list">少人数制のため質問がしやすい</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint.scss' as *;

.mv {
  position: relative;
  z-index: 1;
  padding: 8rem 0;
  text-align: center;
  background-image: url('@/assets/img/mv_bg.jpg');
  background-size: cover;
  background-position: center 10%;

  @include mq-down(sm) {
    padding: 6rem 0;
  }

  &::after {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(107, 107, 107, 0.753);
    content: '';
  }

  &__title {
    margin-bottom: 6rem;
    font-size: 3.6rem;
    font-weight: bold;
    text-shadow: 0.1rem 0.2rem 0.4rem #666;
    color: #fff;

    @include mq-down(sm) {
      font-size: 2.8rem;
    }
  }

  &__lists {
    display: flex;
    justify-content: space-between;

    @include mq-down() {
      flex-direction: column;
      gap: 20px;
    }

    @include mq-down(sm) {
      gap: 10px;
    }
  }

  &__list {
    padding: 20px;
    width: calc(100% / 3 - 4rem);
    font-weight: 500;
    background-color: #fff;
    box-shadow: 0.1rem 0.2rem 0.4rem #666;

    @include mq-down() {
      width: 100%;
    }
  }
}
</style>
