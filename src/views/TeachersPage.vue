<script setup lang="ts">
import TeachersCards from '@/components/teachers/TeachersCards.vue';
import TopBar from '@/components/teachers/TopBar.vue';
</script>

<template>
  <main class="2xl:p-5 2xl:mt-0 sm:mt-[150px] sm:px-5 flex flex-col gap-[30px]">
    <TopBar/>
    <TeachersCards/>
  </main>
</template>
