<script setup lang="ts">
import CalenderPage from './CalenderPage.vue';
import MultipleBarGraph from './MultipleBarGraph.vue';
</script>

<template>
  <div class="sm:block md:flex md:flex-wrap 2xl+220:flex 2xl+220:flex-nowrap  gap-5 w-full">
  <div class="2xl+220:w-[50%] sm:full flex-1 md:mb-0 sm:mb-5">
    <CalenderPage/>
  </div>
  <div class="2xl+220:w-[50%] sm:w-full flex-1"><MultipleBarGraph/> </div>
  </div>
</template>
