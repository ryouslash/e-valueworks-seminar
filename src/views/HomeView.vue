<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import MvSection from '@/components/MvSection.vue'
import SeminarSection from '@/components/SeminarSection.vue'
import ProfileSection from '@/components/ProfileSection.vue'

const seminarRef = ref<HTMLElement | null>(null)

defineExpose({
  seminarRef,
})
</script>

<template>
  <MvSection />
  <SeminarSection />
  <ProfileSection />
</template>
