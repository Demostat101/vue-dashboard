<script setup lang="ts">
import CalenderGraph from '@/components/dashboard/CalenderGraph.vue';
import DashboardCards from '@/components/dashboard/DashboardCards.vue';
// import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import PaginationPage from '@/components/dashboard/PaginationPage.vue';


</script>

<template>
 <div class=" sm:block  2xl:flex">
  <div class="2xl:px-5 mt-0 sm:w-full 2xl:w-[70%] flex flex-col gap-[30px] sm:px-5 ">

    <DashboardCards/>
    <LineChart/>
    <CalenderGraph/>
    <PaginationPage/>
  </div>
  <div class=" sm:w-full sm:px-5 2xl:w-[30%] h-screen bg-white">hjdfjddkdf</div>
 </div>

</template>

