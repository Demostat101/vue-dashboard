<script setup lang="ts">
import SideBar from '@/components/navigation/SideBar.vue'
import TopBar from '@/components/navigation/TopBar.vue';
import { ref } from 'vue';


// Define props


const toggle = ref(false)
</script>
<template>
  <div class="flex w-full min-h-screen bg-[#F3F4FF] relative">
    <SideBar :toggle="toggle" @update:toggle="toggle = $event"/>

    <div class="w-full sm:flex sm:flex-col pb-[40px] h-screen overflow-y-auto">
      <TopBar :toggle="toggle" @update:toggle="toggle = $event"/>
      <RouterView />
    </div>
  </div>
</template>
