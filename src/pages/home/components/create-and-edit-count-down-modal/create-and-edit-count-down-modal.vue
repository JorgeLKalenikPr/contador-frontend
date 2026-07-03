<script setup lang="ts">
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import Modal from '@/components/modal.vue';
import Input from '@/components/input.vue';
import Button from '@/components/button.vue';
import { useCreateAndEditCountDown } from './use-create-and-edit-count-down';

  interface Props {
    closeCreateAndEditModal: () => void,
    createAndEditModalOpen: boolean,
    selectedCountDown?: ICountDown,
    onSuccess?: () => void
  }

  const {
    closeCreateAndEditModal,
    createAndEditModalOpen,
    selectedCountDown,
    onSuccess
  } = defineProps<Props>()

  const {
    date,
    dateAttrs,
    description,
    descriptionAttrs,
    errors,
    name,
    nameAttrs,
    sendForm,
    loading,
    error
  } = useCreateAndEditCountDown({
    selectedCountDown,
    onSuccess: () => {
      onSuccess?.();
      closeCreateAndEditModal();
    }
  });
</script>

<template>
  <Modal 
    :close-modal="closeCreateAndEditModal"
    :model-value="createAndEditModalOpen"
    :title="selectedCountDown ? 'Editar Contador' : 'Cadastrar Contador'"
  >
    <form @submit="sendForm" class="flex flex-col gap-4 w-80 sm:w-120">
      <Input 
        v-model="name"
        v-bind="nameAttrs"
        label="Titulo"
        :error="errors.name"
        required
      />

      <Input 
        v-model="date"
        v-bind="dateAttrs"
        label="Data"
        type="date"
        :error="errors.date"
        required
      />

      <Input 
        v-model="description"
        v-bind="descriptionAttrs"
        label="Descrição"
        :error="errors.description"
      />

      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>

      <Button
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Salvando...' : (selectedCountDown ? 'Salvar' : 'Cadastrar') }}
      </Button>
    </form>
  </Modal>
</template>