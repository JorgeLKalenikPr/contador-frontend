<script setup lang="ts">
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import Modal from '@/components/modal.vue';
import Button from '@/components/button.vue';
import { useDeleteCountDownModal } from './use-delete-count-down-modal';

  interface Props {
    closeDeleteModal: () => void,
    deleteModalOpen: boolean,
    selectedCountDown: ICountDown,
    onSuccess?: () => void
  }

  const {
    closeDeleteModal,
    deleteModalOpen,
    selectedCountDown,
    onSuccess
  } = defineProps<Props>()

  const {
    confirmDeletion,
    loading,
    error
  } = useDeleteCountDownModal({
    onSuccess: () => {
      onSuccess?.();
      closeDeleteModal();
    }
  });

</script>

<template>
  <Modal 
    :close-modal="closeDeleteModal"
    :model-value="deleteModalOpen"
    title="Excluir Contador"
  >
    <div class="w-full flex flex-col justify-center items-center gap-4">
      <p>Essa ação é irreversível</p>
      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
      <div class="flex gap-10">
        <Button
          variant="outline"
          @action="closeDeleteModal()"
        >
          Cancelar
        </Button>
        
        <Button
          @action="confirmDeletion(selectedCountDown)"
          variant="danger"
          :disabled="loading"
        >
          {{ loading ? 'Excluindo...' : 'Confirmar' }}
        </Button>
      </div>
    </div>
  </Modal>
</template>