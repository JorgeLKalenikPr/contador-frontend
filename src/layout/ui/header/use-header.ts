import { api } from '@/_common/api/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useHeader = () => {
  const router = useRouter();

  const email = ref<string>('');
  const loading = ref<boolean>(false);
  const error = ref<string>('');

  const login = async () => {
    if (!email.value) return;

    loading.value = true;
    error.value = '';

    try {
      const { data: user } = await api.post('/users/login', {
        email: email.value,
      });

      localStorage.setItem('userId', String(user.id));
      localStorage.setItem('userEmail', user.email);

      email.value = '';
      router.push('/');
    } catch (err) {
      error.value = 'Usuário não encontrado';
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  return {
    email,
    loading,
    error,
    login,
    logOut,
  };
};