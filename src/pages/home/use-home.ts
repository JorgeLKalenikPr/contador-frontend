import { api } from '@/_common/api/api'
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface IUserEventWithCountdownResponse {
  event: {
    id: number
    name: string
    description: string
    date: string
    userId: number
  }
  daysUntil: number
}

export const useHome = () => {

  const createAndEditModalOpen = ref<boolean>(false)
  const deleteModalOpen = ref<boolean>(false)
  const selectedCountDown = ref<ICountDown | null>(null)

  const countDowns = ref<ICountDown[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const router = useRouter();

  const fetchCountDowns = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      router.push('/');
      return;
    }

    loading.value = true;
    error.value = '';

    try {
      const { data } = await api.get<IUserEventWithCountdownResponse[]>(`/user-event/by-user/${userId}`);

      countDowns.value = data.map((item) => ({
        event:{
          id: item.event.id,
          name: item.event.name,
          date: item.event.date,
          description: item.event.description,
          userId: item.event.userId
        },
        daysUntil: item.daysUntil,
      }));
    } catch (err) {
      error.value = 'Erro ao buscar contadores';
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const openDeleteModal = (countDown: ICountDown) => {
    selectedCountDown.value = countDown;
    deleteModalOpen.value = true;
  }
  
  const closeDeleteModal = () => {
    selectedCountDown.value = null;
    deleteModalOpen.value = false;
  }

  const openCreateAndEditModal = (countDown: ICountDown) => {
    selectedCountDown.value = countDown;
    createAndEditModalOpen.value = true;
  }
  
  const closeCreateAndEditModal = () => {
    selectedCountDown.value = null;
    createAndEditModalOpen.value = false;
  }

  const onCardClick = (countDown: ICountDown) => {
    router.push({ path: '/count-down', state: { countDownId: countDown.event.id}})
  };

  onMounted(() => {
    fetchCountDowns();
  });

  return {
    countDowns,
    loading,
    error,
    fetchCountDowns,

    createAndEditModalOpen,
    openCreateAndEditModal,
    closeCreateAndEditModal,
    selectedCountDown,

    deleteModalOpen,
    openDeleteModal,
    closeDeleteModal,

    onCardClick
  }
}