<script setup lang="ts">
import CalenderGraph from '@/components/dashboard/CalenderGraph.vue';
import DashboardCards from '@/components/dashboard/DashboardCards.vue';
import DashBoardOverview from '@/components/dashboard/DashBoardOverview.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import PaginationPage from '@/components/dashboard/PaginationPage.vue';


</script>

<template>
 <div class=" sm:block  2xl:flex sm:mt-[300px] md:mt-[250px] 2xl:mt-0">
  <div class="2xl:px-5 mt-0 sm:w-full 2xl:w-[70%] flex flex-col gap-[30px] sm:px-5 ">

    <DashboardCards/>
    <LineChart/>
    <CalenderGraph/>
    <PaginationPage/>
  </div>
  <div class="sm:p-5 2xl:px-0 sm:pt-5 2xl:pt-0 w-full  sm:w-full 2xl:w-[30%]">
    <div class=" px-5 w-full bg-white" >
    <DashBoardOverview/>
  </div>
  </div>
 </div>

</template>

