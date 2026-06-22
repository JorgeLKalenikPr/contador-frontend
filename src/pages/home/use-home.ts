import type { ICountDown } from '@/_common/interfaces/icount-down'
import { ref } from 'vue'


export const useHome = () => {

  const editModalOpen = ref<boolean>(false)
  const selectedCountDown = ref<ICountDown | null>(null)

  const openEditModal = (countDown: ICountDown) => {
    selectedCountDown.value = countDown;
    editModalOpen.value = true;
  }
  
  const closeEditModal = () => {
    selectedCountDown.value = null;
    editModalOpen.value = false;
  }


  const contadoresMock: ICountDown[] = [
    {
      id: 1,
      name: 'Aniversário da Maria',
      date: '2026-08-15',
      description: 'Contagem regressiva para o aniversário da Maria',
      daysUntil: 55
    },
    {
      id: 2,
      name: 'Entrega do projeto',
      date: '2026-07-10',
      description: 'Deadline final do projeto da faculdade',
      daysUntil: 19
    },
    {
      id: 3,
      name: 'Viagem para Florianópolis',
      date: '2026-09-01',
      description: 'Férias de inverno na praia',
      daysUntil: 72
    },
    {
      id: 4,
      name: 'Show da banda favorita',
      date: '2026-07-25',
      description: 'Show ao vivo no festival local',
      daysUntil: 34
    },
    {
      id: 5,
      name: 'Ano novo',
      date: '2027-01-01',
      description: 'Virada do ano',
      daysUntil: 194
    }
  ]



  return {
    contadoresMock,
    editModalOpen,
    openEditModal,
    closeEditModal,
    selectedCountDown
  }
}