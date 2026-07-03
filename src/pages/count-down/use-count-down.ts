import { api } from '@/_common/api/api';
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useCountDown = () => {
  const countDown = ref<ICountDown | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const router = useRouter();
  const now = ref(new Date());
  const selectedUnit = ref('hours');

  const editModalOpen = ref<boolean>(false);

  let intervalId: ReturnType<typeof setInterval> | undefined;

  const units = [
    { key: 'hours', label: 'Horas' },
    { key: 'weeks', label: 'Semanas' },
    { key: 'months', label: 'Meses' },
    { key: 'days', label: 'Dias' },
  ];

  const getCountDown = async (countDownId: number) => {
    loading.value = true;
    error.value = '';

    try {
      const { data } = await api.get<ICountDown>(`/user-event/event/${countDownId}`);

      countDown.value = {
        event:{
          id: data.event.id,
          name: data.event.name,
          date: data.event.date,
          description: data.event.description,
          userId: data.event.userId,
        },
        daysUntil: data.daysUntil,
      };
    } catch (err) {
      error.value = 'Erro ao buscar contador';
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const selectedValue = computed(() => {
    if (!countDown.value?.event.date) return 0;

    const target = new Date(countDown.value.event.date).getTime();
    const diffMs = target - now.value.getTime();

    if (diffMs <= 0) return 0;

    const diffHours = diffMs / 1000 / 60 / 60;

    if (selectedUnit.value === 'days') return countDown.value.daysUntil;
    if (selectedUnit.value === 'hours') return Number(diffHours.toFixed(1));
    if (selectedUnit.value === 'weeks') return Number((diffHours / 24 / 7).toFixed(1));
    if (selectedUnit.value === 'months') return Number((diffHours / 24 / 30).toFixed(1));

    return 0;
  });

  const selectUnit = (unit: string) => {
    selectedUnit.value = unit;
  };

  const openEditModal = () => {
    editModalOpen.value = true;
  };

  const closeEditModal = () => {
    editModalOpen.value = false;
  };

  const onEditSuccess = () => {
    if (countDown.value) getCountDown(countDown.value.event.id);
  };

  onMounted(async () => {
    const dados = history.state;

    if (!dados?.countDownId) {
      router.push('/');
      return;
    }

    await getCountDown(dados.countDownId);

    intervalId = setInterval(() => {
      now.value = new Date();
    }, 1000);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  const goHome = () => {
    router.push('/');
  };

  return {
    goHome,
    countDown,
    loading,
    error,
    units,
    selectedUnit,
    selectedValue,
    selectUnit,

    editModalOpen,
    openEditModal,
    closeEditModal,
    onEditSuccess,
  };
};