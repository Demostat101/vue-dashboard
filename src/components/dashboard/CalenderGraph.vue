<script setup lang="ts">
import CalenderPage from './CalenderPage.vue';
import MultipleBarGraph from './MultipleBarGraph.vue';
</script>

<template>
  <div class="md:flex gap-5 w-full">
  <div class="w-[50%]">
    <CalenderPage/>
  </div>
  <div class="w-[50%]"><MultipleBarGraph/> </div>
  </div>
</template>
