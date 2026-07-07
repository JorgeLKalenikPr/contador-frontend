import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useHeader = () => {
  const router = useRouter();
  const route = useRoute();

  const userEmail = ref<string | null>(localStorage.getItem('userEmail'));

  watch(() => route.fullPath, () => {
    userEmail.value = localStorage.getItem('userEmail');
  });

  const goToLogin = () => {
    router.push('/login');
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    userEmail.value = null;
    router.push('/login');
  };

  return {
    userEmail,
    goToLogin,
    logOut
  };
};