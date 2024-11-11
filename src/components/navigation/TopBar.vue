<script setup lang="ts">
import hamburger from '@/assets/hamburger.svg'
import searchIcon from '@/assets/searchicon.svg'
import bellIcon from '@/assets/bell.svg'
import settingIcon from '@/assets/settings.svg'
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

    class="w-full 2xl:flex gap-6  2xl:justify-between flex 2xl:flex-nowrap sm:flex-wrap pl-5 bg-[#F3F4FF] sm:z-10 cursor-pointer 2xl:static sm:fixed"
  >
    <div
      class="flex justify-between place-items-center sm:pt-5 2xl:pt-[30px] sm:pr-5 2xl:pr-0 sm:flex-wrap sm:text-left sm:w-full 2xl:w-[70%] 2xl:py-[30px]"
    >
      <div  @click="handleClick" class="w-5 h-5 2xl:hidden">
        <component class="text-[#242290]" :is="hamburger" />
      </div>

      <div class="font-[700] 2xl:text-[36px] 2xl:leading-[54px] sm:text-[18px] sm:leading-[21px] text-[#303972]">
        {{ dashboardHeader }}
      </div>

      <div
        :class="route.path === '/student-page' || route.path === '/teachers' ? 'sm:mt-5 md:mt-0 gap-2 md:w-[50%] 2xl:w-[50%] sm:w-full place-items-center bg-white rounded-full px-5 hidden' :  'flex sm:mt-5 md:mt-0 gap-2 md:w-[50%] 2xl:w-[50%] sm:w-full place-items-center bg-white rounded-full px-5' "
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
      :class="route.path === '/' ? '2xl:max-w-[30.6%] 2xl+220:max-w-[30.4%] 2xl:h-full sm:w-[100%] md:w-[60%] justify-between bg-white sm:mb-0 sm:mr-5 2xl:mr-0 place-items-center sm:pt-[10px] sm:pb-[10px] 2xl:pb-[30px] 2xl:pt-[30px]'  : '2xl:max-w-[30.6%] 2xl+220:max-w-[30.4%] 2xl:h-full sm:w-[100%] md:w-[60%] justify-center bg-[#F3F4FF] sm:mb-0 sm:mr-5 2xl:mr-0 place-items-center sm:pt-[10px] sm:pb-[10px] 2xl:pb-[30px] 2xl:pt-[30px]'"
    >
      <div class="flex gap-2 place-items-center justify-between w-full px-5">
        <div class="relative p-3 w-fit rounded-full bg-white">
          <component class="text-[#A098AE]" :is="bellIcon"/>
          <span class="w-2 h-2 bg-[#4D44B5] rounded-full absolute top-2 left-9"></span>
        </div>
        <div class="p-3 rounded-full bg-white text-[#A098AE]">
          <component :is="settingIcon"/>
        </div>
        <div class="flex gap-3 place-items-center">
          <div class="flex flex-col text-right">
          <span class="font-[600] text-[14px] leading-[21px] text-[#303972] text-nowrap">Nabila A.</span>
          <span class="font-[400] text-[14px] leading-[21px] text-[#2e2b35]">Admin</span>
        </div>
        <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
        </div>
      </div>
    </div>

  </div>
</template>
