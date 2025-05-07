<script setup lang="ts"></script>

<template>
  <section id="profile" class="profile">
    <div class="profile__inner">
      <h2 class="profile__title">
        <span class="inline-block">講師はホームページ制作の</span
        ><span class="inline-block">プロが担当</span>
      </h2>
      <div class="container">
        <div class="profile__columns">
          <figure class="profile__img">
            <img src="@/assets/img/profile.jpg" alt="" />
          </figure>
          <div class="profile__text">
            <p>初めまして、講師のRyoと申します。</p>
            <p>私はWeb制作フリーランスとして約5年近く活動しています。</p>

            <p>
              ホームページの制作や集客は高度なWeb知識がある専門家でないと難しいと思われがちです。
            </p>

            <p>
              しかし、実際にはWordPressをはじめとする様々なツールが登場し、<span
                class="marker is-orange font-bold"
                >予備知識のない方でも一定の品質のホームページを制作できる</span
              >ようになっています。
            </p>

            <p>
              また、ホームページ制作のスキルやSEOをはじめとするWeb集客を自身で学ぶことで、オンライン化が進む現代ビジネスにおいて必要不可欠なWebスキルが身に付けられます。
            </p>

            <p>
              <span class="marker is-orange font-bold"
                >これまで「難しそう」と思ってなかなか一歩を踏み出せずにいた方も大丈夫</span
              >です。
            </p>

            <p>一緒にWeb学習を始めてみませんか？</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint.scss' as *;
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

    @include mq-down(sm) {
      margin-bottom: 6rem;
      font-size: 2.8rem;
    }

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

    @include mq-down() {
      flex-direction: column;
      gap: 3rem;
    }
  }

  &__img {
    flex-shrink: 0;
    width: 50rem;
    border: 1rem solid #fff;
    box-shadow: 0 0 0.4rem #bbb;

    @include mq-down() {
      width: 100%;
    }
  }

  &__text {
    flex: 1;

    p {
      &:not(:last-of-type) {
        margin-bottom: 1em;
      }
    }
  }
}
</style>
