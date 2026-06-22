<script setup lang="ts">
import type { ICountDown } from '@/_common/interfaces/icount-down';
import Modal from '@/components/modal.vue';
import { useEditCountDown } from './use-edit-count-down';
import Input from '@/components/input.vue';
import Button from '@/components/button.vue';

  interface Props {
    closeEditModal: () => void,
    editModalOpen: boolean,
    selectedCountDown: ICountDown
  }

  const {
    closeEditModal,
    editModalOpen,
    selectedCountDown
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
  } = useEditCountDown({ selectedCountDown });
</script>

<template>
  <Modal 
    :close-modal="closeEditModal"
    :model-value="editModalOpen"
    title="Editar Contador"
  >
    <form @submit="sendForm">
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
        required
      />


      <Button
        type="sumbit"
      >
        Salvar
      </Button>
    </form>
  </Modal>
</template>