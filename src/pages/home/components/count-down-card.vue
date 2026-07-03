<script setup lang="ts">
import { utilsDate } from '@/_common/functions/utils-date';
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import Button from '@/components/button.vue';
import { Pencil, Trash2 } from '@lucide/vue';

  interface Props {
    countDown: ICountDown,
    openCreateAndEditModal: (countDown: ICountDown) => void,
    openDeleteModal: (countDown: ICountDown) => void,
    onCardClick: (countDown: ICountDown) => void
  };

  const {
    countDown,
    openCreateAndEditModal,
    onCardClick,
    openDeleteModal
  } = defineProps<Props>();

</script>

<template>

  <div class="border hover:bg-default-hover transition-all rounded-xl p-4 flex flex-col gap-4 group">
    <div class="flex justify-between">
      <p>{{ countDown.event.name }}</p>
      <div class="flex gap-4">
        <p>{{ utilsDate.formatToDefault(countDown.event.date) }}</p>
        <div class="flex gap-2">
          <Pencil 
            @click="openCreateAndEditModal(countDown)"
            class="text-accent cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200" />
          <Trash2 
            @click="openDeleteModal(countDown)"
            class="text-danger cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200" />
        </div>
      </div>
    </div>
    <div class="flex items-center relative cursor-pointer group/card hover:border-accent justify-center border rounded-xl p-10">
      <div
        class="min-w-40 flex items-center justify-center aspect-square group-hover/card:blur-xs bg-accent p-4 text-accent-foreground font-extrabold text-4xl">
        {{ countDown.daysUntil }}
      </div>

    <Button 
      class="hidden absolute z-40 transition-all group-hover/card:block"
      variant="secondary"
      @action="onCardClick(countDown)"
    >
      Ver Contador
    </Button>
    </div>
  </div>
</template>