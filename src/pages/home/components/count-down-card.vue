<script setup lang="ts">
import { utilsDate } from '@/_common/functions/utils-date';
import type { ICountDown } from '@/_common/interfaces/icount-down';
import { Pencil, Trash2 } from '@lucide/vue';

  interface Props {
    countDown: ICountDown,
    openEditModal: (countDown: ICountDown) => void,
  };

  const {
    countDown,
    openEditModal
  } = defineProps<Props>();

</script>

<template>

  <div class="border hover:bg-default-hover transition-all rounded-xl p-4 flex flex-col gap-4 group">
    <div class="flex justify-between">
      <p>{{ countDown.name }}</p>
      <div class="flex gap-4">
        <p>{{ utilsDate.formatToDefault(countDown.date) }}</p>
        <div class="flex gap-2">
          <Pencil @click="openEditModal(countDown)"
            class="text-accent cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200" />
          <Trash2 class="text-danger cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200" />
        </div>
      </div>
    </div>
    <div class="flex items-center cursor-pointer justify-center border rounded-xl p-10">
      <div
        class="min-w-40 flex items-center justify-center aspect-square bg-accent p-4 text-accent-foreground font-extrabold text-4xl">
        {{ countDown.daysUntil }}
      </div>
    </div>
  </div>
</template>