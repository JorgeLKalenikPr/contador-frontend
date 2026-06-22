<script setup lang="ts">
type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'link'

interface Props {
  variant?: Variant
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<{
  (e: 'action', value: string): void
}>()

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
  secondary: 'bg-default text-accent hover:bg-default-hover',

  ghost: 'bg-transparent text-default-foreground hover:bg-default-hover',
  outline: 'bg-transparent border border-accent text-accent hover:bg-accent/10',

  danger: 'bg-red-500 text-white hover:bg-red-600',

  link: 'bg-transparent text-accent underline-offset-4 hover:underline'
}
</script>

<template>
  <button
    :disabled="props.disabled"
    @click="emit('action', 'clicked')"
    class="px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    :class="variantClasses[props.variant]"
  >
    <slot />
  </button>
</template>