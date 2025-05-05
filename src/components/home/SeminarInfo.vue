<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import type { EventItem } from '@/types'
import SeminarInfoPagination from '@/components/home/SeminarInfoPagination.vue'

const events = ref<EventItem[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const page = ref(1)
const since = ref<string | null>(null)
const hasNext = ref(false)

// イベント取得
const fetchEvents = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await axios.get('https://www.street-academy.com/api/v1/events', {
      params: {
        page: page.value,
        per: 5,
        since: since.value?.replace(/-/g, ''),
        teacher: 729106,
      },
      timeout: 10000,
    })
    events.value = response.data.events

    // 次ページの先読みチェック（1件だけ）
    const nextResponse = await axios.get('https://www.street-academy.com/api/v1/events', {
      params: {
        page: page.value + 1,
        per: 5,
        since: since.value?.replace(/-/g, ''),
        teacher: 37092,
      },
    })
    hasNext.value = nextResponse.data.events.length > 0
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        error.value = '通信がタイムアウトしました（10秒以上応答がありません）'
      } else {
        error.value = err.message
      }
    } else {
      error.value = '不明なエラーが発生しました'
    }
  } finally {
    isLoading.value = false
  }
}

watch(since, () => {
  page.value = 1
})

watch([page, since], () => {
  fetchEvents()
})

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div class="seminar">
    <div class="seminar__inner container">
      <h1 class="seminar__section-title title01">開催予定のセミナー一覧</h1>

      <!-- 絞り込みフォーム -->
      <div class="seminar__filters">
        <div class="seminar__filter-item seminar__date-filter">
          <label for="date">開催日：</label>
          <input id="date" v-model="since" type="date" /> 〜
        </div>
      </div>

      <!-- 表示結果 -->
      <!-- ローディング画面 -->
      <div v-if="isLoading" class="seminar__loading"><font-awesome-icon icon="spinner" spin /></div>
      <!-- エラー画面 -->
      <div v-else-if="error" class="seminar__error">{{ error }}</div>
      <!-- 該当データなし -->
      <div v-else-if="events.length === 0" class="seminar__no-data">
        <p>現在、開催予定のセミナーはありません。</p>
        <p>
          開催を希望されるセミナーがございましたら、お問い合わせよりリクエストをお送りください。
        </p>
        <p>※ご要望に必ずしもお応えできるわけではございませんので、あらかじめご了承ください。</p>
      </div>
      <!-- 該当データあり -->
      <ul v-else class="seminar__lists">
        <li v-for="event in events" :key="event.event_id" class="seminar__list">
          <div class="seminar__list-left">
            <img :src="event.image_url" alt="" />
          </div>

          <div class="seminar__list-right">
            <time :datetime="event.start_at" class="seminar__date">
              {{
                new Date(event.start_at).toLocaleString('ja-JP', {
                  timeZone: 'Asia/Tokyo',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </time>
            <h2 class="seminar__title">{{ event.title }}</h2>
            <p class="seminar__catchcopy">{{ event.catchcopy }}</p>
            <div class="seminar__capacity">
              <span>定員：{{ event.capacity }} / 予約：{{ event.reserved }}</span>
              <p v-if="event.capacity === event.reserved">※キャンセル待ち</p>
            </div>
            <p class="seminar__price">料金：{{ event.price }}円（税込）</p>
            <div v-if="event.capacity !== event.reserved" class="seminar__book-btn">
              <a :href="event.url" target="_blank">予約はこちら</a>
            </div>
          </div>
        </li>
      </ul>

      <SeminarInfoPagination
        v-if="!isLoading && !error && events.length > 0"
        :page="page"
        :has-next="hasNext"
        @go-prev="page--"
        @go-next="page++"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;
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
