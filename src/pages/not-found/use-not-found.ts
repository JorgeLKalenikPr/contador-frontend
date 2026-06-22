import { useRoute, useRouter } from 'vue-router';

export const useNotFound = () => {
  const route = useRoute();
  const router = useRouter();
  const goHome = () => {
    router.push('/')
  };

  
  return {
    route,
    goHome
  };
}