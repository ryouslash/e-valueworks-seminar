<script setup lang="ts">
import { ref } from 'vue'
// import axios from 'axios'

const name = ref('')
const email = ref('')
const contactTitle = ref('')
const contactMessage = ref('')
</script>

<template>
  <form action="" class="form">
    <div class="form__row">
      <label for="your-name">お名前</label>
      <input type="text" id="your-name" v-model="name" placeholder="例）山田 太郎" />
    </div>
    <div class="form__row">
      <label for="your-email">メールアドレス</label>
      <input type="email" id="your-email" v-model="email" placeholder="例）xxxx@xxxx.com" />
    </div>
    <div class="form__row">
      <label for="your-contact-title">お問い合わせ件名</label>
      <select id="your-contact-title" v-model="contactTitle">
        <option value="" disabled>お問い合わせ件名を選んで下さい</option>
        <option>講座に関するご質問</option>
        <option>講座開催リクエストについて</option>
        <option>その他</option>
      </select>
    </div>
    <div class="form__row">
      <label for="your-message">お問い合わせ詳細</label>
      <textarea
        id="your-message"
        v-model="contactMessage"
        placeholder="お問い合わせ内容をご入力ください"
      ></textarea>
    </div>
    <div class="form__btn">
      <!-- <button>未入力の必須項目があります</button> -->
      <button type="button" @click="" class="submit">送信</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint.scss' as *;
@use '@/assets/scss/variables.scss' as *;

.form {
  border-radius: 0 0 1rem 1rem;
  padding: 6rem;
  background-color: rgba(255, 255, 255, 0.8);

  @include mq-down() {
    padding: 6rem 3rem;
  }

  @include mq-down(sm) {
    padding: 3rem;
  }

  &__row {
    margin-bottom: 2rem;

    label {
      display: block;
      margin-bottom: 0.2em;
      font-size: 1.8rem;
      font-weight: 600;

      @include mq-down(sm) {
        font-size: 1.6rem;
      }
    }

    input,
    select,
    textarea {
      box-sizing: border-box;
      border: 0.1rem solid #aaa;
      padding: 0.2em 0.4em;
      width: 100%;
      font-size: 1.8rem;
      appearance: none;

      &:focus {
        outline: 0.1rem solid $color-sub;
      }

      @include mq-down(sm) {
        font-size: 1.6rem;
      }
    }

    textarea {
      height: calc(5em * 1.4 + 0.4em);
      line-height: 1.4;
    }
  }

  &__btn {
    margin-top: 4rem;

    button {
      &.submit {
        position: relative;
        z-index: 1;
        display: block;
        border: 0.1rem solid #f29949;
        padding: 2rem 0;
        margin: 0 auto;
        width: calc(100% - 1.2rem);
        max-width: 36rem;
        font-size: clamp(1.8rem, 1.6rem + 0.625vw, 2rem);
        font-weight: bolder;
        background-color: #f29949;
        color: #fff;
        transition:
          background-color 0.3s ease-in-out,
          color 0.3s ease-in-out,
          border-color 0.3s ease-in-out;
        cursor: pointer;
        appearance: none;

        &::before,
        &::after {
          position: absolute;
          z-index: -1;
          height: 3rem;
          width: 3rem;
          transition:
            width 0.3s ease-in-out,
            height 0.3s ease-in-out,
            border-color 0.3s ease-in-out;
          content: '';
        }

        &::before {
          left: -0.6rem;
          top: -0.6rem;
          border-left: 0.1rem solid #f29949;
          border-top: 0.1rem solid #f29949;
        }

        &::after {
          bottom: -0.6rem;
          right: -0.6rem;
          border-right: 0.1rem solid #f29949;
          border-bottom: 0.1rem solid #f29949;
        }

        &:hover {
          border-color: #666;
          background-color: #fff;
          color: #333;

          &::before,
          &::after {
            border-color: #666;
            height: calc(100% + 1.1rem);
            width: calc(100% + 1.1rem);
          }
        }
      }
    }
  }
}
</style>
