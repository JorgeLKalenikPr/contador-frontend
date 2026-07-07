<script setup lang="ts">
import Input from '@/components/input.vue';
import Button from '@/components/button.vue';
import { useLogin } from './use-login';

const {
  email,
  emailAttrs,
  errors,
  sendForm,
  loading,
  error,
  success,
  mode,
  toggleMode
} = useLogin();
</script>

<template>
  <div class="p-4 flex justify-center">
    <div class="bg-surface p-4 rounded-xl flex flex-col gap-4 w-80 sm:w-120">
      <h1 class="text-xl">{{ mode === 'register' ? 'Cadastrar' : 'Entrar' }}</h1>

      <form @submit="sendForm" class="flex flex-col gap-4">
        <Input
          v-model="email"
          v-bind="emailAttrs"
          label="Email"
          type="email"
          :error="errors.email"
          required
        />

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
        <span v-if="success" class="text-green-500 text-sm">{{ success }}</span>

        <Button
          type="submit"
          :disabled="loading"
        >
          {{ loading ? (mode === 'register' ? 'Cadastrando...' : 'Entrando...') : (mode === 'register' ? 'Cadastrar' : 'Entrar') }}
        </Button>
      </form>

      <Button variant="link" @action="toggleMode">
        {{ mode === 'register' ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se' }}
      </Button>
    </div>
  </div>
</template>