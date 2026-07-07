<script lang="ts" setup>
import Button from '@/components/button.vue';
import { useCountDown } from './use-count-down';
import { ArrowLeft, Pencil } from '@lucide/vue';
import { utilsDate } from '@/_common/functions/utils-date';
import CreateAndEditCountDownModal from '../home/components/create-and-edit-count-down-modal/create-and-edit-count-down-modal.vue';

const {
  countDown,
  loading,
  goHome,
  units,
  selectedUnit,
  selectedValue,
  selectUnit,

  isEditable,
  displayName,
  displayDescription,
  displayDate,

  editModalOpen,
  openEditModal,
  closeEditModal,
  onEditSuccess,
} = useCountDown();
</script>

<template>
  <div class="p-4">
    <Button class="flex gap-2" variant="ghost" @action="goHome()">
      <ArrowLeft />
      <p>Voltar para o Inicio</p>
    </Button>

    <div v-if="loading" class="text-center py-8">Carregando...</div>

    <div v-else class="flex flex-col items-center gap-4">
      <div class="w-full flex justify-between p-10">
        <div class="flex flex-col w-full gap-2">
          <h1 class="text-2xl font-bold">{{ displayName }}</h1>
          <h2 class="">{{ displayDescription }}</h2>
        </div>

        <div class="flex items-start gap-4">
          <h1 class="text-xl">
            {{ utilsDate.formatToDefault(displayDate ?? new Date().toString()) }}
          </h1>
          <button v-if="isEditable" type="button" @click="openEditModal()">
            <Pencil :size='18' />
          </button>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          v-for="unit in units"
          :key="unit.key"
          type="button"
          class="px-3 py-1 rounded-full text-sm border cursor-pointer"
          :class="selectedUnit === unit.key ? 'bg-accent text-accent-foreground' : 'bg-transparent'"
          @click="selectUnit(unit.key)"
        >
          {{ unit.label }}
        </button>
      </div>

      <div
        class="w-80 sm:w-120 flex flex-col items-center justify-center aspect-square rounded-lg bg-accent p-4 text-accent-foreground">
        <h1 class="h-1/2 flex items-end font-extrabold text-6xl">
          {{ selectedValue }}
        </h1>  
        <div class="h-1/2 flex items-end font-bold text-lg">
          <p>{{ units.find(u => u.key === selectedUnit)?.label }} até o evento</p>
        </div>
      </div>
    </div>
  </div>

  <CreateAndEditCountDownModal
    v-if="isEditable && editModalOpen && countDown"
    :close-create-and-edit-modal="closeEditModal"
    :create-and-edit-modal-open="editModalOpen"
    :selected-count-down="countDown"
    :on-success="onEditSuccess"
  />
</template>