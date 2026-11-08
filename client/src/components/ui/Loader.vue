<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

</script>

<template>
  <div  class="state">
    <ProgressSpinner class="spinner" :strokeWidth="4" />
    <span>Загрузка...</span>
  </div>
</template>

<style scoped>
.state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 12px;
}

.spinner {
  width: 40px;
  height: 40px;
}
</style>
