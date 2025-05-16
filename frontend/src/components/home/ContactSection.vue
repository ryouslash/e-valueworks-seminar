<script setup lang="ts">
import ContactForm from '@/components/home/ContactForm.vue'
</script>

<template>
  <section class="contact" id="contact">
    <div class="slim-container">
      <div class="contact__inner">
        <h2 class="contact__title title01">
          <span class="inline-block">講座に関する</span
          ><span class="inline-block">お問い合わせはこちら</span>
        </h2>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint.scss' as *;

.contact {
  position: relative;
  z-index: 1;
  padding: 9rem 0;
  clip-path: inset(0);

  @include mq-down(sm) {
    padding: 6rem 0;
  }

  &::before {
    position: fixed;
    z-index: -2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url('@/assets/img/contact_bg.jpg');
    background-size: cover;
    content: '';
  }

  &::after {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(120, 120, 120, 0.5);
    content: '';
  }

  &__inner {
    box-shadow: 0.2rem 0.4rem 0.5rem rgba(0, 0, 0, 0.3);
  }

  &__title {
    border-radius: 1rem 1rem 0 0;
  }
}
</style>
