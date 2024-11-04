<script setup lang="ts">
  import searchIcon from "@/assets/searchicon.svg"
</script>

<template>
  <header class="justify-between sm:block 2xl:flex md:flex">
    <div class="font-[700] text-[36px] leading-[54px] text-[#303972]">Dashboard</div>
    <div class="flex sm:mt-5 md:mt-0 gap-2 h-[60px] md:w-[50%] 2xl:w-[40%] sm:w-full place-items-center bg-white rounded-full px-5">
      <component :is="searchIcon" class="text-[#4D44B5]"/>
      <input type="text" class="text-[#A098AE] font-[400] text-[18px] leading-[27px] w-full rounded-full focus:outline-none bg-white sm:w-full" placeholder="search here...">
    </div>
  </header>

</template>
