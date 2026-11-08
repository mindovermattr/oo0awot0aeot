<script setup lang="ts">
import Error from '@/components/ui/Error.vue'
import LeadsTable from '@/components/leads/LeadsTable.vue'
import Loader from '@/components/ui/Loader.vue'
import { useTableControllerGetFilteredTable } from '@/api/generated/endpoints'
import { computed } from 'vue'
import { priceFormatter } from '@/lib/formatters.ts'

const {
  data: leads,
  isLoading,
  isError,
  refetch,
} = useTableControllerGetFilteredTable({
  leadIds: [],
  userIds: [],
  pipelineIds: [],
})

const leadsSum = computed(() => {
  if (!leads.value) return 0
  return leads.value.reduce((acc, val) => acc + val.price, 0)
})
</script>

<template>
  <Loader v-if="isLoading" />

  <Error
    v-else-if="isError"
    title="Не удалось загрузить данные"
    :message="'Ошибка'"
    class="error"
    @retry="refetch"
  />

  <template v-else>
    <div class="stats">
      <div class="stat">
        <span class="stat__label">Количество лидов</span>
        <span class="stat__value">{{ leads?.length }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Сумма лидов</span>
        <span class="stat__value">{{ priceFormatter.format(leadsSum) }}</span>
      </div>
    </div>

    <LeadsTable :leads="leads ?? []" />
  </template>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px 12px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat__label {
  font-size: 13px;
  color: var(--p-text-muted-color);
}

.stat__value {
  font-size: 24px;
  font-weight: 600;
  color: var(--p-text-color);
}

.state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 12px;
  color: var(--p-text-muted-color);
}

.error {
  margin-top: 24px;
}
</style>
