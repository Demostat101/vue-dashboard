<script setup lang="ts">
import DashboardCards from '@/components/dashboard/DashboardCards.vue';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import LineChart from '@/components/dashboard/LineChart.vue';


</script>

<template>
 <div class=" sm:block  2xl:flex">
  <div class="p-5 sm:w-full 2xl:w-[70%] flex flex-col gap-[30px]">
    <DashboardHeader/>
    <DashboardCards/>
    <!-- <LineChart/> -->
  </div>
  <div class=" sm:w-full sm:px-5 2xl:w-[30%] border-2">hjdfjddkdf</div>
 </div>

</template>
