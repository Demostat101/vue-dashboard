<script setup lang="ts">
import hamburger from '@/assets/hamburger.svg'
import searchIcon from '@/assets/searchicon.svg'
import { defineProps, defineEmits, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// Define props
const props = defineProps({
  toggle: {
    type: Boolean,
    required: true,
  },
})

// Define emits with type
const emit = defineEmits<{
  (event: 'update:toggle', newValue: boolean): void
}>()

const handleClick = () => {
  emit('update:toggle', !props.toggle)
}

// Define a computed property that depends on the route.path
const dashboardHeader = computed(() => {
  if (route.path === '/') {
    return 'Dashboard'
  } else if (route.path === '/student-page') {
    return 'Students'
  } else if (route.path === '/teachers') {
    return 'Teachers'
  } else if (route.path === '/events') {
    return 'Events'
  } else if (route.path === '/finance') {
    return 'Finance'
  } else if (route.path === '/food') {
    return 'Food'
  } else if (route.path === '/user') {
    return 'User'
  } else if (route.path === '/chat') {
    return 'Chat'
  } else if (route.path === '/activity') {
    return 'Latest Activity'
  } else {
    return 'Unknown Page'
  }
})
</script>

<template>
  <div

    class="w-full 2xl:flex gap-6  2xl:justify-between flex 2xl:flex-nowrap sm:flex-wrap pl-5 bg-[#F3F4FF] sm:z-10 cursor-pointer"
  >
    <div
      class="flex justify-between place-items-center sm:pt-5 2xl:pt-[30px] sm:pr-5 2xl:pr-0 sm:flex-wrap sm:text-left sm:w-full 2xl:w-[70%] 2xl:py-[30px]"
    >
      <div  @click="handleClick" class="w-5 h-5 2xl:hidden">
        <component class="text-[#242290]" :is="hamburger" />
      </div>

      <div class="font-[700] text-[36px] leading-[54px] text-[#303972]">
        {{ dashboardHeader }}
      </div>

      <div
        class="flex sm:mt-5 md:mt-0 gap-2 md:w-[50%] 2xl:w-[50%] sm:w-full place-items-center bg-white rounded-full px-5"
      >
        <component :is="searchIcon" class="text-[#4D44B5]" />
        <input
          type="text"
          class="text-[#A098AE] font-[400] text-[18px] h-[50px] leading-[27px] 2xl:w-full rounded-full focus:outline-none bg-white sm:w-full"
          placeholder="search here..."
        />
      </div>
    </div>

    <div
      :class="route.path === '/' ? '2xl:w-[32%] 2xl:h-full sm:w-[100%] md:w-[50%] bg-white sm:mb-5 sm:mr-5 2xl:mr-0'  : '2xl:w-[32%] 2xl:h-full sm:w-[100%] md:w-[50%] bg-[#F3F4FF] sm:mb-5 sm:mr-5 2xl:mr-0'"
    >
      dghdhdfh
    </div>

  </div>
</template>
