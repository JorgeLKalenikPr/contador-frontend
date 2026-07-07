<script setup lang="ts">
import { utilsDate } from '@/_common/functions/utils-date';
import type { IHoliday } from '@/_common/interfaces/holiday/iholiday';
import Button from '@/components/button.vue';

  interface Props {
    holiday: IHoliday,
    onCardClick: (holiday: IHoliday) => void
  };

  const { holiday, onCardClick } = defineProps<Props>();

</script>

<template>

  <div class="border hover:bg-default-hover transition-all rounded-xl p-4 flex flex-col gap-4 group">
    <div class="flex justify-between">
      <p>{{ holiday.name }}</p>
      <div class="flex gap-4">
        <p>{{ utilsDate.formatToDefault(holiday.date) }}</p>
      </div>
    </div>
    <div class="flex items-center relative cursor-pointer group/card hover:border-accent justify-center border rounded-xl p-10">
      <div
        class="min-w-40 flex items-center justify-center aspect-square group-hover/card:blur-xs bg-accent p-4 text-accent-foreground font-extrabold text-4xl">
        {{ holiday.daysUntil }}
      </div>

    <Button 
      class="hidden absolute z-40 transition-all group-hover/card:block"
      variant="secondary"
      @action="onCardClick(holiday)"
    >
      Ver Contador
    </Button>
    </div>
  </div>
</template>