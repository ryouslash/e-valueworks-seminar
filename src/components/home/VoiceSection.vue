<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 3,
  itemsToScroll: 1,
  wrapAround: true,
  gap: 30,
}
</script>

<template>
  <section id="voice" class="voice">
    <p>voice</p>
    <Carousel v-bind="carouselConfig">
      <Slide key="1">
        <blockquote>
          <p>
            途中まで独学で作成しましたが、中々上手くいかず講座を申し込みました。わからないところや上手くいかないところを質問し、丁寧にやり方を教えていただきました。
          </p>
          <p>
            また作成途中からの進め方なども教えていただき、あっという間で楽しい1時間でした。習ったところを自分で次のレッスンまでに作成し、講座で質問と次の作業を習うという感じで受講を続けていこうと思います。
          </p>
          <p>わかりやすくおすすめの講座です！</p>
          <cite></cite>
        </blockquote>
      </Slide>
      <Slide key="2">
        <blockquote>
          <p>
            常に丁寧な説明でわかりやすく、受講生に合わせて、カスタマイズいただけて大変満足でした。
            一からホームページを作成したい方に特におすすめです。
          </p>
        </blockquote>
      </Slide>
      <Slide key="3">
        <blockquote>
          <p>
            宿泊施設の紹介や予約のページを自分で作りたくて申し込みしました。難しくて高齢の私に出来るかなぁと思いながらの第一歩ですが始めて見て出来そうな気がしました。完成までどうぞよろしくお願い致します。頑張ります！
          </p>
        </blockquote>
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<style scoped lang="scss">
.voice {
  padding: 60px 0;
}

.carousel {
  &__slide {
    blockquote {
      position: relative;
      box-sizing: border-box;
      padding: 70px 30px;
      background: #efefef;
      color: #555;

      &:before {
        position: absolute;
        top: 10px;
        left: 15px;
        display: inline-block;
        width: 60px;
        height: 40px;
        background-image: url('@/assets/img/quotation.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom center;
        content: '';
      }

      p {
        font-size: 18px;

        &:not(:last-of-type) {
          margin-bottom: 1em;
        }
      }
    }
  }
}
</style>
