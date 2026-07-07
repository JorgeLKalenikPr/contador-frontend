<script setup lang="ts">
import Button from '@/components/button.vue';
import { useHome } from './use-home';
import { Plus } from '@lucide/vue';
import CountDownCard from './components/count-down-card.vue';
import CreateAndEditCountDownModal from './components/create-and-edit-count-down-modal/create-and-edit-count-down-modal.vue';
import DeleteCountDownModal from './components/delete-count-down-modal/delete-count-down-modal.vue';
import HolidayCard from './components/holiday-card/holiday-card.vue';

const { 
  closeCreateAndEditModal,
  countDowns,
  loading,
  fetchCountDowns,
  createAndEditModalOpen,
  openCreateAndEditModal,
  selectedCountDown,

  nextHoliday,

  closeDeleteModal,
  deleteModalOpen,
  openDeleteModal,
  onCardClick,
  onHolidayClick
} = useHome();

</script>

<template>
  <div class="p-4">
    <div class="bg-surface p-4 rounded-xl flex flex-col gap-4 ">
      <div class="flex justify-between">
        <h1 class="text-xl">Seus Contadores</h1>
        <div class="flex gap-4">
          <Button 
            variant="outline"
            class="flex gap-4"
            @action="openCreateAndEditModal()"
          >
            <Plus/>
            Cadastrar
          </Button>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">Carregando...</div>

      <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <HolidayCard v-if="nextHoliday" :holiday="nextHoliday" :on-card-click="onHolidayClick" />

        <div v-for="countDown in countDowns" :key="countDown.event.id">
          <CountDownCard 
            :count-down="countDown" 
            :open-create-and-edit-modal="openCreateAndEditModal" 
            :open-delete-modal="openDeleteModal"
            :on-card-click="onCardClick"
          />
        </div>
 
        <div @click="openCreateAndEditModal()" class="min-h-80 flex items-center justify-center rounded-xl cursor-pointer border border-dashed hover:bg-default-hover ">
          <Plus :size="64"/>
        </div>
      </div>
    </div>
  </div>
  <CreateAndEditCountDownModal
    v-if="createAndEditModalOpen"
    :close-create-and-edit-modal="closeCreateAndEditModal"
    :create-and-edit-modal-open="createAndEditModalOpen"
    :selected-count-down="selectedCountDown"
    :on-success="fetchCountDowns"
  />

  <DeleteCountDownModal
    v-if="deleteModalOpen && selectedCountDown"
    :close-delete-modal="closeDeleteModal"
    :delete-modal-open="deleteModalOpen"
    :selected-count-down="selectedCountDown"
    :on-success="fetchCountDowns"
  />
</template>