<script setup lang="ts">
import PageTop from '@/components/PageTop.vue'
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="footer__navi">
        <div class="container">
          <ul class="footer__navi-items">
            <li class="footer__navi-item">
              <RouterLink to="privacy">プライバシーポリシー</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="footer__copyright">
      <small>© E-VALUE WORKS.</small>
    </div>
  </footer>
  <PageTop />
</template>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;
@use '@/assets/scss/variables' as *;

.footer {
  &__navi {
    padding: 2rem 0 1rem;
    background-color: #333;
  }

  &__navi-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__navi-item {
    border-left: 0.1rem solid #fff;
    padding: 0 1em;

    &:last-of-type {
      border-right: 0.1rem solid #fff;
    }

    a {
      text-decoration: underline;
      color: #fff;
    }
  }

  &__copyright {
    padding: 1rem 0 2rem;
    text-align: center;
    background-color: #333;
    color: #fff;
  }
}
</style>
