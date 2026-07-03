import { api } from '@/_common/api/api';
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import { ref } from 'vue';

interface Props {
  onSuccess?: () => void
}

export const useDeleteCountDownModal = ({ onSuccess }: Props = {}) => {

  const loading = ref<boolean>(false);
  const error = ref<string>('');

  const confirmDeletion = async (countDown: ICountDown) => {
    loading.value = true;
    error.value = '';

    try {
      await api.delete(`/user-event/${countDown.event.id}`);
      onSuccess?.();
    } catch (err) {
      error.value = 'Erro ao excluir contador';
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    confirmDeletion,
    loading,
    error
  }
};