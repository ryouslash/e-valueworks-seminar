<script setup lang="ts">
import StudentWoman01 from '@/assets/img/student_woman01.png'
import StudentWoman02 from '@/assets/img/student_woman02.png'
import StudentMan01 from '@/assets/img/student_man01.png'

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
</script>

<template>
  <section id="voice" class="voice">
    <div class="voice__bg"></div>
    <div class="voice__inner container">
      <div class="voice__title">
        <p>頂いたレビューの中から一部の声を紹介させて頂きます。</p>
        <h2>受講者の声</h2>
      </div>
      <ul v-if="reviews" class="voice__items">
        <li v-for="(review, index) in reviews" :key="index" class="voice__item">
          <img :src="review.imgSrc" alt="" />
          <p>{{ review.ageGroup !== null ? review.ageGroup + '代' : '' }} {{ review.gender }}</p>
          <p>{{ review.voice }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.voice {
  /* position: relative;
  z-index: 1; */
  padding: 9rem 0 12rem;
  /* overflow: hidden; */

  /* &__bg {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 0;
    background-image: linear-gradient(to right, transparent 0.4rem, #d1eef6 0.8rem);
    background-size: 0.8rem;
    background-repeat: repeat;
    background-position: left bottom;
    transform: translateX(-50%) skewX(-20deg);
    content: '';
  } */

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
    }

    h2 {
      font-size: 3.6rem;
      color: $color-key;
    }
  }
}
</style>
