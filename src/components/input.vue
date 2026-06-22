<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  error?: string
  required?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label">
      {{ (label + (required ? ' *' : '')) }}
    </label>

    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind="$attrs"
      class="input"
    />

    <small v-if="error" class="text-danger pl-3">
      {{ error }}
    </small>
  </div>
</template>