import { api } from '@/_common/api/api'
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down'
import type { IHoliday } from '@/_common/interfaces/holiday/iholiday'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useHome = () => {

  const createAndEditModalOpen = ref<boolean>(false)
  const deleteModalOpen = ref<boolean>(false)
  const selectedCountDown = ref<ICountDown | null>(null)

  const countDowns = ref<ICountDown[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const nextHoliday = ref<IHoliday | null>(null)
  const holidayLoading = ref<boolean>(false)

  const router = useRouter();

  const fetchCountDowns = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) return;

    loading.value = true;
    error.value = '';

    try {
      const { data } = await api.get<ICountDown[]>(`/user-event/by-user/${userId}`);

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

  const fetchNextHoliday = async () => {
    holidayLoading.value = true;

    try {
      const { data } = await api.get('/holidays/next');

      if (!data?.date) {
        nextHoliday.value = null;
        return;
      }

      const diffMs = new Date(data.date).getTime() - new Date().getTime();
      const daysUntil = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      nextHoliday.value = {
        id: data.id,
        name: data.name,
        type: data.type,
        date: data.date,
        daysUntil,
      };
    } catch (err) {
      console.log(err);
    } finally {
      holidayLoading.value = false;
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

  const openCreateAndEditModal = (countDown?: ICountDown) => {
    selectedCountDown.value = countDown ?? null;
    createAndEditModalOpen.value = true;
  }
  
  const closeCreateAndEditModal = () => {
    selectedCountDown.value = null;
    createAndEditModalOpen.value = false;
  }

  const onCardClick = (countDown: ICountDown) => {
    router.push({ path: '/count-down', state: { countDownId: countDown.event.id}})
  };

  const onHolidayClick = (holiday: IHoliday) => {
    router.push({ path: '/count-down', state: { holiday: JSON.parse(JSON.stringify(holiday)) } })
  };

  onMounted(() => {
    fetchCountDowns();
    fetchNextHoliday();
  });

  return {
    countDowns,
    loading,
    error,
    fetchCountDowns,

    nextHoliday,
    holidayLoading,

    createAndEditModalOpen,
    openCreateAndEditModal,
    closeCreateAndEditModal,
    selectedCountDown,

    deleteModalOpen,
    openDeleteModal,
    closeDeleteModal,

    onCardClick,
    onHolidayClick
  }
}