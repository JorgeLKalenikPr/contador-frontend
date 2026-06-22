<script setup>
import Button from '@/components/button.vue';
import { LogOut } from '@lucide/vue';
import { useHeader } from './use-header';

const {
  logOut
} = useHeader();

</script>

<template>
  <div class="w-full bg-default min-h-20 sticky flex items-center justify-between px-4">
    <h1 class="text-3xl font-bold">Contador</h1>
    <Button variant="ghost" @action="logOut" class="flex gap-4 items-center"><LogOut size="18"/> Sair</Button>
  </div>
</template>