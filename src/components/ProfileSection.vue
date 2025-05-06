<script setup lang="ts"></script>

<template>
  <section id="profile" class="profile">
    <div class="profile__inner">
      <h2 class="profile__title">講師はホームページ制作のプロが担当</h2>
      <div class="container">
        <div class="profile__columns">
          <figure class="profile__img">
            <img src="@/assets/img/profile.jpg" alt="" />
          </figure>
          <div class="profile__text">ここにテキストが入ります。</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.profile {
  padding-bottom: 6rem;

  &__title {
    position: relative;
    z-index: 1;
    padding: 2rem;
    margin-bottom: 9rem;
    font-size: 3.6rem;
    text-align: center;
    background-color: $color-sub;
    color: #fff;

    &::after {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 100%;
      border-right: 4.5rem solid transparent;
      border-left: 4.5rem solid transparent;
      border-top: 3rem solid $color-sub;
      transform: translateX(-50%);
      content: '';
    }
  }

  &__columns {
    display: flex;
    align-items: flex-start;
    gap: 6rem;
  }

  &__img {
    flex-shrink: 0;
    width: 50rem;
  }

  &__text {
    flex: 1;
  }
}
</style>
