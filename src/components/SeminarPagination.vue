<script setup lang="ts">
defineProps<{
  page: number
  hasNext: boolean
}>()

const emit = defineEmits<{
  goPrev: []
  goNext: []
}>()

function goPrev() {
  emit('goPrev')
}

function goNext() {
  emit('goNext')
}
</script>

<template>
  <div class="pagination">
    <button :disabled="page <= 1" class="pagination__prev-btn" @click="goPrev">前へ</button>
    <span>{{ page }}ページ目</span>
    <button :disabled="!hasNext" class="pagination__next-btn" @click="goNext">次へ</button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;

  button {
    border: 0.1rem solid #ccc;
    background-color: #eee;
    appearance: none;

    &:not(:disabled) {
      cursor: pointer;
    }
  }
}
</style>
