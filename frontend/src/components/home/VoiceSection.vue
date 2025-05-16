<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 画像読み込み
import StudentWoman01 from '@/assets/img/student_woman01.png'
import StudentWoman02 from '@/assets/img/student_woman02.png'
import StudentMan01 from '@/assets/img/student_man01.png'

// お客様の声を含んだ配列
const reviews: { imgSrc: string; ageGroup: number | null; gender: string; voice: string }[] = [
  {
    imgSrc: StudentWoman01,
    ageGroup: null,
    gender: '女性',
    voice:
      '途中まで独学で作成しましたが、中々上手くいかず講座を申し込みました。わからないところや上手くいかないところを質問し、丁寧にやり方を教えていただきました。また作成途中からの進め方なども教えていただき、あっという間で楽しい1時間でした。習ったところを自分で次のレッスンまでに作成し、講座で質問と次の作業を習うという感じで受講を続けていこうと思います。わかりやすくおすすめの講座です！',
  },
  {
    imgSrc: StudentWoman02,
    ageGroup: 60,
    gender: '女性',
    voice:
      '宿泊施設の紹介や予約のページを自分で作りたくて申し込みしました。難しくて高齢の私に出来るかなぁと思いながらの第一歩ですが始めて見て出来そうな気がしました。完成までどうぞよろしくお願い致します。頑張ります！',
  },
  {
    imgSrc: StudentMan01,
    ageGroup: 20,
    gender: '男性',
    voice:
      '常に丁寧な説明でわかりやすく、受講生に合わせて、カスタマイズいただけて大変満足でした。一からホームページを作成したい方に特におすすめです。',
  },
]
const _debug = true
const loadedCount = ref(0)

// 背景の高さ計算関数
const calculateBgWidth = () => {
  const voice = document.querySelector('.voice') as HTMLElement | null
  const voiceBg = document.querySelector('.voice__bg') as HTMLElement | null
  if (voice && voiceBg) {
    const height = voice.offsetHeight
    if (_debug) console.log(`height:${height}`)
    const additionalWidth = height * 0.364 * 0.1
    voiceBg.style.width = `calc(100% + ${additionalWidth * 2}rem)`
  }
}

// 画像読み込み完了後にcalculateBgWidthを実行する関数
const handleImageLoad = () => {
  loadedCount.value++
  if (loadedCount.value === reviews.length) {
    setTimeout(() => {
      calculateBgWidth()
    }, 100)
  }
}

onMounted(() => {
  if (_debug) console.log('onMounted')
  window.addEventListener('resize', calculateBgWidth)
})

onUnmounted(() => {
  if (_debug) console.log('onUnMounted')
  window.removeEventListener('resize', calculateBgWidth)
})
</script>

<template>
  <section id="voice" class="voice">
    <div class="voice__bg"></div>
    <div class="voice__inner container">
      <div class="voice__title">
        <p>
          <span class="inline-block">頂いたレビューの中から</span
          ><span class="inline-block">一部の声を紹介させて頂きます。</span>
        </p>
        <h2>受講者の声</h2>
      </div>
      <ul v-if="reviews" class="voice__items">
        <li v-for="(review, index) in reviews" :key="index" class="voice__item">
          <div class="voice__item-img">
            <img :src="review.imgSrc" alt="" @load="handleImageLoad" />
          </div>
          <div class="voice__item-text">
            <blockquote>
              <p>{{ review.voice }}</p>
            </blockquote>
            <p>{{ review.ageGroup !== null ? review.ageGroup + '代' : '' }} {{ review.gender }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/breakpoint' as *;

.voice {
  position: relative;
  z-index: 1;
  padding: 9rem 0 12rem;
  overflow: hidden;

  @include mq-down() {
    padding: 9rem 0;
  }

  &__bg {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 0;
    height: 100%;
    background-image: linear-gradient(to right, transparent 0.4rem, #d1eef6 0.8rem);
    background-size: 0.8rem;
    background-repeat: repeat;
    background-position: left bottom;
    transform: translateX(-50%) skewX(-20deg);
    content: '';
  }

  &__title {
    margin-bottom: 6rem;
    text-align: center;

    p {
      display: inline-block;
      border-radius: 2rem;
      padding: 1rem 3rem;
      line-height: 1;
      font-weight: bold;
      color: #fff;
      background-color: $color-key;

      @include mq-down(sm) {
        font-size: 1.4rem;
      }
    }

    h2 {
      font-size: 3.6rem;
      color: $color-key;

      @include mq-down(sm) {
        font-size: 2.8rem;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 3rem;
    border-radius: 4rem;
    padding: 3rem;
    background-color: #fff;
    box-shadow: 0.3rem 0.4rem 0rem #3199b5;

    @include mq-down(sm) {
      flex-direction: column;
      border-radius: 3rem;
      padding: 2rem;
    }

    &:not(:last-of-type) {
      margin-bottom: 3rem;

      @include mq-down(sm) {
        margin-bottom: 2rem;
      }
    }
  }

  &__item-img {
    flex-shrink: 0;
    width: 24rem;

    @include mq-down() {
      width: 18rem;
    }

    @include mq-down(sm) {
      width: 80%;
      margin: 0 auto;
    }
  }

  &__item-text {
    blockquote {
      margin-bottom: 2rem;

      p {
        font-size: 1.8rem;
      }
    }

    > p {
      color: #555;
    }
  }
}
</style>
