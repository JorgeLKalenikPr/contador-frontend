import { useRouter } from 'vue-router';

export const useHeader = () => {
  const router = useRouter();

  const logOut = () => {
    router.push('/')
  };

  return {
    logOut
  }
};