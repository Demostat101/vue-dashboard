<script setup lang="ts">
import CalenderPage from './CalenderPage.vue';
</script>

<template>
  <div class="md:flex gap-5 w-full md:flex-nowrap ">
  <div class="w-full flex-1">
    <CalenderPage/>
  </div>
  <div class="w-full border-2 flex-1">Graph</div>
  </div>
</template>
