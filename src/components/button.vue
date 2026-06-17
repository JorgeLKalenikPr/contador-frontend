<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary',
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<{
  (e: 'action', value: string): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    @click="emit('action', 'clicked')"
    class="px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
    :class="variant === 'primary' ? 'bg-accent' : 'bg-default text-accent'"
  >
    <slot />
  </button>
</template>