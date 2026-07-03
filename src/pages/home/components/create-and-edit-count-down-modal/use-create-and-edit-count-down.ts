import { api } from '@/_common/api/api';
import type { ICountDown } from '@/_common/interfaces/count-down/icount-down';
import type { ICountDownCreate } from '@/_common/interfaces/count-down/icount-down-create';
import type { ICountDownUpdate } from '@/_common/interfaces/count-down/icount-down-update';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import z from 'zod';

const editSchema = z.object({
  name: z.string({ message: 'Titulo deve ser um texto' }).min(1, { message: 'Titulo é obrigatório'}).max(50, { message: 'Titulo deve ter no máximo 50 carácteres'}),
  description: z.string({ message: 'Descrição deve ser um texto' }).optional(),
  date: z.string().min(8, { message: 'Data é obrigatória'}),
})

interface Props {
  selectedCountDown?: ICountDown | null
  onSuccess?: () => void
}
type FormData = z.infer<typeof editSchema>

export const useCreateAndEditCountDown = ({ selectedCountDown, onSuccess }: Props) => {

  const {
    handleSubmit,
    defineField,
    errors,
    resetForm
  } = useForm<FormData>({
    validationSchema: toTypedSchema(editSchema),
  })

  const [name, nameAttrs] = defineField('name');
  const [description, descriptionAttrs] = defineField('description');
  const [date, dateAttrs] = defineField('date');

  const loading = ref<boolean>(false);
  const error = ref<string>('');

  const sendForm = handleSubmit(async (data) => {
    loading.value = true;
    error.value = '';

    try {
      if (selectedCountDown) {
        await updateCountDown(selectedCountDown.event.id, data);
      } else {
        await createCountDown(data);
      }

      onSuccess?.();
    } catch (err) {
      error.value = 'Erro ao salvar contador';
      console.log(err);
    } finally {
      loading.value = false;
    }
  })

  const createCountDown = async (dto: ICountDownCreate) => {
    const userId = localStorage.getItem('userId');

    await api.post('/user-event', {
      ...dto,
      userId: Number(userId),
    });
  };

  const updateCountDown = async (id: number, dto: ICountDownUpdate) => {
    await api.patch(`/user-event/${id}`, dto);
  };

  watch(() => selectedCountDown, (countDown) => {
    resetForm({
      values: {
        date: countDown?.event.date ?? new Intl.DateTimeFormat('fr-CA').format(new Date()),
        description: countDown?.event.description ?? undefined,
        name: countDown?.event.name ?? undefined
      }
    })
  }, { immediate: true });

  return {
    name,
    nameAttrs,
    description,
    descriptionAttrs,
    date,
    dateAttrs,
    sendForm,
    errors,
    loading,
    error
  };
};