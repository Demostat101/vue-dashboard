<script setup lang="ts">
import { useRoute } from 'vue-router'
import { menuItems } from './sideBarMenuData'
import jt from '@/assets/jt.svg'

const route = useRoute()

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
  <div
  @click="handleClick"
    :class="!props.toggle ?` max-w-[320px] w-full sm:fixed 2xl:static sm:translate-x-[-150%] 2xl:transform-none transition-all duration-1000 2xl:block h-screen bg-[#242290] pl-5 pt-[40px] sm:z-20` :'max-w-[320px] w-full sm:fixed 2xl:static sm:translate-x-[0%] 2xl:transform-none   2xl:block h-screen bg-[#242290] pl-5 pt-[40px] transition-all duration-1000 sm:z-20'"
  >
    <div class="flex mb-[40px] gap-5">
      <component :is="jt"/> <span class="font-[700] text-[32px] leading-[48px] text-white bouncename-animation">JODNA TECH</span>
    </div>
    <div>
      <div v-for="item in menuItems" :key="item.id" class="w-full mb-2 flex flex-col gap-2 parent-container">
        <router-link :to="item.href"  :class="
                route.path === item.href ? 'bg-white text-[#242290] px-6 py-2 w-full flex place-items-center gap-6 rounded-s-full parent-container' : 'bg-[#242290] flex place-items-center px-6 py-2 gap-6 parent-container'
              ">
            <component
              :is="item.icon"
              :class="
                route.path !== item.href ? 'text-[#C1BBEB] bounce-animation ' : 'text-[#4D44B5] bounce-animation'
              "

            />
            <div
              :class="
                route.path === item.href ? 'font-[500] text-[18px] leading-[27px] text-[#4D44B5]' : 'font-[500] text-[18px] leading-[27px] text-[#C1BBEB]'
              "

            >
              {{ item.label }}
            </div>


        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>


.bouncename-animation {
  animation: bounce 3s infinite;
}

.parent-container:hover .bounce-animation {
  animation: bounce 1s infinite;
}

</style>
