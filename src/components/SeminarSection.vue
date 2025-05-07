<script setup lang="ts">
</script>

<template>
  <section id="seminar" class="seminar">
    <div class="seminar__inner container">
      <h2 class="seminar__section-title title01">開催予定のセミナー一覧</h2>

      <div class="seminar__no-data">
        <p>現在、開催予定のセミナーはありません。</p>
        <p>
          開催を希望されるセミナーがございましたら、お問い合わせよりリクエストをお送りください。
        </p>
        <p>※ご要望に必ずしもお応えできるわけではございませんので、あらかじめご了承ください。</p>
      </div>
      <!-- 該当データあり -->
      <!-- <ul class="seminar__lists">
        <li class="seminar__list">
          <div class="seminar__list-left">
            <img src="" alt="" />
          </div>

          <div class="seminar__list-right">
            <time datetime="" class="seminar__date"> 2025年5月7日 </time>
            <h3 class="seminar__title">タイトル</h3>
            <p class="seminar__catchcopy">キャッチコピー</p>
            <div class="seminar__capacity">
              <span>定員：1 / 予約：1</span>
              <p>※キャンセル待ち</p>
            </div>
            <p class="seminar__price">料金：5,400円（税込）</p>
            <div class="seminar__book-btn">
              <a href="#" target="_blank">予約はこちら</a>
            </div>
          </div>
        </li>
      </ul> -->
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint.scss' as *;

.seminar {
  padding: 6rem 0;
  background-image: url('@/assets/img/seminar_bg.png');

  &__section-title {
    margin-bottom: 6rem;
  }

  &__filters {
    margin-bottom: 1rem;
  }

  &__no-data {
    padding: 1rem 2rem;
    border: 0.1rem solid #ff2525;
    font-weight: bold;
    background-color: #fddee8;
    color: #ff2525;

    p {
      &:not(:last-of-type) {
        margin-bottom: 0.5em;
      }

      &:last-of-type {
        font-size: 1.4rem;
      }
    }
  }

  &__list {
    display: flex;
    gap: 2rem;
    box-shadow: 0 0 0.4rem #aaa;
    padding: 2rem;

    @include mq-down() {
      flex-direction: column;
    }

    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__list-left {
    width: 30rem;

    @include mq-down() {
      width: 100%;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  &__list-right {
    flex: 1;
  }

  &__date {
    display: block;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: bolder;

    @include mq-down(sm) {
      font-size: 1.6rem;
    }
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 2rem;

    @include mq-down(sm) {
      font-size: 1.8rem;
    }
  }

  &__catchcopy {
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  &__capacity {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;

    span {
      display: inline-block;
      border: 0.2rem dotted #666;
      padding: 0.2rem 0.5rem;
    }

    p {
      color: red;
    }
  }

  &__price {
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  &__book-btn {
    text-align: right;

    a {
      display: inline-block;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1.8rem;
      font-weight: bold;
      background-color: #f29949;
      color: #fff;

      @include mq-down(sm) {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
