<script setup lang="ts">
import { X } from '@lucide/vue';

  interface Props {
    modelValue: boolean,
    closeModal: () => void,
    title: string,
    subTitle?: string
  }

  const { modelValue, subTitle, title, closeModal } = defineProps<Props>()

</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue" 
      class="fixed inset-0 bg-default/10 backdrop-blur-xs flex items-center justify-center"
      @click.self="closeModal">
      <div class="flex flex-col gap-4 bg-default p-4 rounded-2xl min-w-1/5">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="text-lg">{{ title }}</h1>
            <h2 :hidden="!!subTitle">{{ subTitle }}</h2>
          </div>
          <div @click.left="closeModal" class="cursor-pointer">
            <X />
          </div>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
