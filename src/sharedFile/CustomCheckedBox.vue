<template>
  <div class="flex justify-between items-center text-xs">
    <label class="cursor-pointer flex items-center gap-2">
      <!-- Hide the native checkbox -->
      <input
        type="checkbox"
        class="hidden"
        :checked="isChecked"
        @change="handleChange"
      />
      <!-- Custom checkbox -->
      <span
        :class="{
          'flex items-center justify-center h-6 w-6 border-2 rounded-md': true,
          'bg-[#4D44B5] border-[#4D44B5]': isChecked,
          'bg-white border-gray-300': !isChecked
        }"
      >
        <!-- Checkmark -->
        <svg
          v-if="isChecked"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 10.293a1 1 0 011.414 0L10 13.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define the props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  isChecked: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: 'update:isChecked', value: boolean): void;
}>();

// Handle the change event
function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:isChecked', input.checked);
}
</script>

<style scoped>
/* Add styles if needed */
</style>
