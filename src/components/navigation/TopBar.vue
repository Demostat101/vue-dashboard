<script setup lang="ts">
import hamburger from "@/assets/hamburger.svg"

import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  toggle: {
    type: Boolean,
    required: true,
  },
});

// Define emits with type
const emit = defineEmits<{
  (event: 'update:toggle', newValue: boolean): void;
}>();

const handleClick = () => {
  emit('update:toggle', !props.toggle);
};




</script>

<template>

  <div @click="handleClick" class="w-full sm:block 2xl:hidden sm:p-5 sm:fixed bg-[#F3F4FF] sm:z-10 cursor-pointer">
    <div class="w-5 h-5">
      <component class="text-[#242290]" :is="hamburger"/>
    </div>
  </div>
</template>
