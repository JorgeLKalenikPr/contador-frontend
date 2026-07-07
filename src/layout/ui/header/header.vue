<script setup lang="ts">
import Button from '@/components/button.vue';
import { LogIn, LogOut } from '@lucide/vue';
import { useHeader } from './use-header';

const {
  userEmail,
  goToLogin,
  logOut
} = useHeader();

</script>

<template>
  <div class="w-full bg-default min-h-20 sticky flex items-center justify-between px-4">
    <h1 class="text-3xl font-bold">Contador</h1>

    <div v-if="userEmail" class="flex items-center gap-4">
      <span class="text-sm">{{ userEmail }}</span>
      <Button variant="ghost" @action="logOut" class="flex gap-4 items-center"><LogOut :size="18"/> Sair</Button>
    </div>

    <Button v-else variant="outline" @action="goToLogin" class="flex gap-2 items-center">
      <LogIn :size="18"/> Entrar
    </Button>
  </div>
</template>