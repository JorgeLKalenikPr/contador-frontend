import type { ICountDown } from '@/_common/interfaces/icount-down';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { watch } from 'vue';
import z from 'zod';

const editSchema = z.object({
  name: z.string({ error: 'Titulo deve ser um texto' }).min(0, { error: 'Titulo é obrigatório'}).max(50, { error: 'Titulo deve ter no máximo 50 carácteres'}),
  description: z.string({ error: 'Descrição deve ser um texto' }).optional(),
  date: z.string().min(8, { error: 'Data é obrigatória'}),
})

interface Props {
  selectedCountDown: ICountDown
}
type FormData = z.infer<typeof editSchema>

export const useEditCountDown = ({ selectedCountDown } : Props) => {

  const {
    handleSubmit,
    defineField,
    errors,
    resetForm
  } = useForm<FormData>({
    validationSchema: toTypedSchema(editSchema)
  })

  const [name, nameAttrs] = defineField('name');
  const [description, descriptionAttrs] = defineField('description');
  const [date, dateAttrs] = defineField('date');

  const sendForm = handleSubmit((data) => {
    console.log(data);
  })


  watch(() => selectedCountDown, (countDown) => {
    resetForm({
      values: {
        date: countDown.date,
        description: countDown.description,
        name: countDown.name
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
    errors
  };
};