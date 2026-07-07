import { api } from '@/_common/api/api';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import z from 'zod';

const loginSchema = z.object({
  email: z.string({ message: 'Email deve ser um texto' }).min(1, { message: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
})

type FormData = z.infer<typeof loginSchema>
type Mode = 'login' | 'register'

export const useLogin = () => {
  const router = useRouter();

  const {
    handleSubmit,
    defineField,
    errors
  } = useForm<FormData>({
    validationSchema: toTypedSchema(loginSchema),
  })

  const [email, emailAttrs] = defineField('email');

  const mode = ref<Mode>('login');
  const loading = ref<boolean>(false);
  const error = ref<string>('');
  const success = ref<string>('');

  const toggleMode = () => {
    mode.value = mode.value === 'login' ? 'register' : 'login';
    error.value = '';
    success.value = '';
  };

  const login = async (userEmail: string) => {
    const { data: user } = await api.post('/users/login', {
      email: userEmail,
    });

    localStorage.setItem('userId', String(user.id));
    localStorage.setItem('userEmail', user.email);

    router.push('/');
  };

  const register = async (userEmail: string) => {
    await api.post('/users', {
      email: userEmail,
    });

    success.value = 'Usuário cadastrado! Agora é só entrar.';
    mode.value = 'login';
  };

  const sendForm = handleSubmit(async (data) => {
    loading.value = true;
    error.value = '';
    success.value = '';

    try {
      if (mode.value === 'register') {
        await register(data.email);
      } else {
        await login(data.email);
      }
    } catch (err) {
      error.value = mode.value === 'register' ? 'Erro ao cadastrar usuário' : 'Usuário não encontrado';
      console.log(err);
    } finally {
      loading.value = false;
    }
  })

  return {
    email,
    emailAttrs,
    errors,
    sendForm,
    loading,
    error,
    success,
    mode,
    toggleMode
  };
}