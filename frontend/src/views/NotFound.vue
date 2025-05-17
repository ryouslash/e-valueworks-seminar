<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <section class="not-found">
      <div class="not-found__inner container">
        <h1 class="not-found__title">お探しのページが見つかりませんでした。</h1>
        <p>
          申し訳ございませんが、<RouterLink to="/" class="underline">こちらのリンク</RouterLink
          >からトップページにお戻り下さい。
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.main {
  padding: 9rem 0;

  @include mq-down(sm) {
    padding: 6rem 0;
  }
}

.not-found {
  &__title {
    margin-bottom: 6rem;
    font-size: 3.6rem;
    text-align: center;

    @include mq-down(sm) {
      font-size: 2.8rem;
    }
  }
}
</style>
