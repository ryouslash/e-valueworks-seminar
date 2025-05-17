<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

declare const grecaptcha: {
  ready: (cb: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

const name = ref('')
const email = ref('')
const contactTitle = ref('')
const contactMessage = ref('')
const csrfToken = ref('')
const triedSubmit = ref(false)
const result = ref('')
const isLoading = ref(false)

const validEmail = (email: string) => /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)

const checkName = computed(() => (!name.value ? 'お名前を入力してください' : ''))

const checkEmail = computed(() => {
  if (!email.value) return 'メールアドレスを入力してください'
  if (!validEmail(email.value)) return 'メールアドレスを正しく入力してください'
  return ''
})

const checkContactTitle = computed(() =>
  !contactTitle.value ? 'お問い合わせ件名を選択して下さい' : '',
)

const checkContactMessage = computed(() =>
  !contactMessage.value ? 'お問い合わせ詳細を入力して下さい' : '',
)

const errors = computed(() => {
  const err: Record<string, string> = {}
  if (checkName.value) err.name = checkName.value
  if (checkEmail.value) err.email = checkEmail.value
  if (checkContactTitle.value) err.contactTitle = checkContactTitle.value
  if (checkContactMessage.value) err.contactMessage = checkContactMessage.value
  return err
})

const valid = computed(() => Object.keys(errors.value).length === 0)

const clear = () => {
  name.value = ''
  email.value = ''
  contactTitle.value = ''
  contactMessage.value = ''
}

// reCAPTCHAトークン取得関数
const getRecaptchaToken = async () => {
  return await new Promise<string>((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute('6Ldl8j0rAAAAAD_Ltk0YIsF09M7klRdDv4HC0zIG', { action: 'submit' })
        .then((token) => {
          resolve(token)
        })
    })
  })
}

// csrf用トークン取得関数
const fetchCsrfToken = async () => {
  const res = await axios.get('https://seminar.e-valueworks.com/api/get_csrf_token.php')
  csrfToken.value = res.data.csrf_token
}

// API通信のみを担当
const send = async (recaptchaToken: string) => {
  const url = 'https://seminar.e-valueworks.com/api/contact.php'
  const params = {
    name: name.value,
    email: email.value,
    contactTitle: contactTitle.value,
    contactMessage: contactMessage.value,
    csrf_token: csrfToken.value,
    recaptcha_token: recaptchaToken,
  }
  try {
    const res = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('送信成功:', res.data)
    return res.data
  } catch (error) {
    console.error('送信失敗:', error)
    return '送信失敗'
  }
}

// 送信フロー全体を管理
const submit = async () => {
  result.value = ''
  triedSubmit.value = true
  if (!valid.value) return
  isLoading.value = true

  const recaptchaToken = await getRecaptchaToken()

  const res = await send(recaptchaToken)
  isLoading.value = false
  console.log('res', res)
  if (res === '送信完了') {
    clear()
    triedSubmit.value = false
    result.value = 'お問い合わせありがとうございます。フォームが送信されました。'
  } else {
    result.value = '送信に失敗しました。しばらくしてから再度お試しください。'
  }
}

// onMountedでCSRF取得
onMounted(() => {
  fetchCsrfToken()
})
</script>

<template>
  <form action="" class="form">
    <div class="form__row">
      <label for="your-name">お名前</label>
      <input type="text" id="your-name" v-model="name" placeholder="例）山田 太郎" />
      <p class="error" v-if="triedSubmit && errors.name">{{ errors.name }}</p>
    </div>
    <div class="form__row">
      <label for="your-email">メールアドレス</label>
      <input type="email" id="your-email" v-model="email" placeholder="例）xxxx@xxxx.com" />
      <p class="error" v-if="triedSubmit && errors.email">{{ errors.email }}</p>
    </div>
    <div class="form__row">
      <label for="your-contact-title">お問い合わせ件名</label>
      <select id="your-contact-title" v-model="contactTitle">
        <option value="" disabled>お問い合わせ件名を選んで下さい</option>
        <option>講座に関するご質問</option>
        <option>講座開催リクエストについて</option>
        <option>その他</option>
      </select>
      <p class="error" v-if="triedSubmit && errors.contactTitle">{{ errors.contactTitle }}</p>
    </div>
    <div class="form__row">
      <label for="your-message">お問い合わせ詳細</label>
      <textarea
        id="your-message"
        v-model="contactMessage"
        placeholder="お問い合わせ内容をご入力ください"
      ></textarea>
      <p class="error" v-if="triedSubmit && errors.contactMessage">{{ errors.contactMessage }}</p>
    </div>
    <div class="form__btn">
      <button type="button" @click="submit" class="submit">送信</button>
    </div>
    <p v-show="result" :class="['result', result.includes('送信されました') ? 'success' : 'error']">
      {{ result }}
    </p>
    <div class="loading" v-if="isLoading">
      <font-awesome-icon icon="spinner" spin />
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
      display: block;
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

  .error {
    margin-top: 0.1rem;
    font-size: 0.9em;
    font-weight: 500;
    color: #ff2525;
  }

  .result {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    text-align: center;

    &.success {
      border: 1px solid #2e7d32;
      background-color: #e7f7e7;
      color: #2e7d32;
    }

    &.error {
      border: 1px solid #ff2525;
      background-color: #fddee8;
      color: #ff2525;
    }
  }

  .loading {
    margin-top: 1rem;
    font-size: 3rem;
    text-align: center;
  }
}
</style>
