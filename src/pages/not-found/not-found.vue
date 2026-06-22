<script setup>
import Button from '@/components/button.vue';
import { ArrowLeftToLine } from '@lucide/vue';
import { useNotFound } from './use-not-found';

const {
  goHome,
  route
} = useNotFound();
</script>

<template> 
  <div class="flex flex-col p-4 items-center">
    <div class="bg-default-soft border rounded-2xl p-4 w-2/3 items-center justify-between">
      <h2 class="text-2xl font-semibold">Nada por aqui...</h2>
      <p class="text-default-foreground/60">Recurso não encontrado: {{ route.fullPath }}</p>
      
      <div class="flex w-full justify-center">
        <Button class="flex gap-4" @action="goHome" variant="ghost"><ArrowLeftToLine/> Voltar ao Inicio</Button>
      </div>
    </div>
  </div>
</template>