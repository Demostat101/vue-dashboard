<template>
  <div class="flex flex-col w-full bg-white rounded-xl">
    <div class="flex justify-between px-5 pt-5 flex-wrap">
      <span class="font-[700] text-[24px] leading-[36px] text-[#303972] text-nowrap">School Finance</span>
      <div class="flex gap-3">
        <div>
          <span class="flex gap-1 place-items-center">
            <span class="w-3 h-3 rounded-full border-[4px] border-[#FCC43E]"></span>
            <span class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">This Week</span>
          </span>
          <span class="ml-4 font-[700] text-[18px] leading-[27px] text-[#303972]">1.245</span>
        </div>
        <div>
          <span class="flex gap-1 place-items-center">
            <span class="w-3 h-3 rounded-full border-[4px] border-[#FB7D5B]"></span>
            <span class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">Last week</span>
          </span>
          <span class="ml-4 font-[700] text-[18px] leading-[27px] text-[#303972]">1.356</span>
        </div>
      </div>
    </div>
    <div class="w-full max-h-[400px]">
      <!-- Canvas element for the chart -->
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { ChartOptions } from 'chart.js'

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Chart Data with weekdays as labels
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Weekdays
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40], // Example data for the weekdays
      backgroundColor: ["#FB7D5B"],
      borderWidth: 1,
      borderRadius: 8 // Make bars rounded
    },
    {
      data: [40, 45, 70, 17, 35, 45, 57], // Example data for the weekdays
      backgroundColor: ["#FCC43E"],
      borderWidth: 1,
      borderRadius: 8 // Make bars rounded
    }
  ]
}

// Chart Options with proper type
const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Ensures that the chart can stretch to the full container
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
    }
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    }
  }
}
</script>

<style scoped>
/* Container responsiveness */
.w-full {
  width: 100%;
}


</style>
