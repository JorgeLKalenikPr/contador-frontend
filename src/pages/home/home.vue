<script setup>
import Button from '@/components/button.vue';
import { useHome } from './use-home';
import { utilsDate } from '@/_common/functions/utils-date';
import { Pencil, Plus, Trash2 } from '@lucide/vue';
import Modal from '@/components/modal.vue';
import CountDownCard from './components/count-down-card.vue';
import EditCountDownModal from './components/edit-count-down-modal/edit-count-down-modal.vue';

const { 
  contadoresMock,
  closeEditModal,
  editModalOpen,
  openEditModal,
  selectedCountDown
} = useHome();

</script>

<template>
  <div class="p-4">
    <div class="bg-surface p-4 rounded-xl flex flex-col gap-4 ">
      <div class="flex justify-between">
        <h1 class="text-xl">Seus Contadores</h1>
        <Button 
          variant="outline"
          class="flex gap-4"
        >
          <Plus/>
          Cadastrar
        </Button>
      </div>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="countDown in contadoresMock" :key="countDown.id">
          <CountDownCard :count-down="countDown" :open-edit-modal="openEditModal"/>
        </div>
 
        <div class="min-h-80 flex items-center justify-center rounded-xl cursor-pointer border border-dashed hover:bg-default-hover ">
          <Plus size="64"/>
        </div>
      </div>
    </div>
  </div>
  <EditCountDownModal 
    v-if="!!selectedCountDown"
    :close-edit-modal="closeEditModal"
    :edit-modal-open="editModalOpen"
    :selected-count-down="selectedCountDown"
  />
</template>