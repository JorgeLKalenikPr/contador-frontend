<script setup>
import Button from '@/components/button.vue';
import { LogOut } from '@lucide/vue';
import { useHeader } from './use-header';

const {
  email,
  loading,
  error,
  login,
  logOut
} = useHeader();

</script>

<template>
  <div class="w-full bg-default min-h-20 sticky flex items-center justify-between px-4">
    <h1 class="text-3xl font-bold">Contador</h1>

    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <input
          v-model="email"
          type="email"
          placeholder="Digite seu email"
          @keyup.enter="login"
          class="border rounded-lg px-3 py-2 bg-surface"
        />
        <Button variant="outline" :disabled="loading" @action="login">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </Button>
      </div>
      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>

    <Button variant="ghost" @action="logOut" class="flex gap-4 items-center"><LogOut size="18"/> Sair</Button>
  </div>
</template>