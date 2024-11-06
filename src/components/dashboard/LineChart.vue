
 <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, LinearScale, CategoryScale, LineElement, PointElement, LineController, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary Chart.js components (for a line chart)
Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin for fill functionality
);

const chartRef = ref<HTMLCanvasElement | null>(null);

// Get current month (0-based index, 0 = Jan, 1 = Feb, ..., 11 = Dec)
const currentMonth = new Date().getMonth();

onMounted(() => {
  if (chartRef.value) {
    // Create the Chart.js instance after the component is mounted
    new Chart(chartRef.value, {
      type: 'line', // Change to 'line' chart type
      data: {
        // Labels for the x-axis (Months from Jan to Dec)
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Dataset 1', // First line label
            data: [24, 27, 48, 55, 30, 28, 29, 35, 45, 40, 35, 28], // Data for first line
            borderColor: '#FB7D5B', // Line color
            backgroundColor: 'rgba(255, 234, 216, 0.7)', // Semi-transparent fill color
            tension: 0.3, // Line smoothing (0.1 is a slight curve)
            pointBackgroundColor: '#FFEAD8', // Point color
            fill: true, // Enable fill
            borderWidth:3,

            // Hide all points by default
            pointRadius: (context) => (context.dataIndex === currentMonth ? 5 : 0), // Only show point for current month
          },

          {
            label: 'Dataset 2', // Second line label
            data: [0, 25, 35, 55, 80, 60, 50, 40, 30, 20, 35, 40], // Data for second line
            borderColor: '#FCC43E', // Line color for second dataset
            backgroundColor: 'rgba(254, 242, 212, 0.7) ', // Semi-transparent fill color
            tension: 0.3, // Line smoothing (0.1 is a slight curve)
            pointBackgroundColor: '#FB7D5B', // Point color for second line
            pointRadius: 0, // Hide all points by default
            fill: true, // Enable fill
            borderWidth:3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
      enabled: false,
    }
        },
        scales: {
          x: {
            type: 'category', // For month-based labels
            ticks: {
              display: true, // Hide x-axis labels
              padding: 20
            },
            grid: {
              display: true, // Optionally, hide the vertical grid lines
            },
          },
          y: {
            type: 'linear',
            beginAtZero: true, // Ensure y-axis starts from zero
            grid: {
              display: false, // Hide horizontal grid lines
            },
            ticks: {
              display: true, // Hide y-axis labels
              padding: 20
            }
          }
        }
      }
    });
  }
});
</script>

<template>
  <div class="flex flex-col w-full bg-white rounded-xl">
    <div class="flex justify-between px-5 pt-5 flex-wrap">
      <span class="font-[700] text-[24px] leading-[36px] text-[#303972] text-nowrap">School Performance</span>
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
    <div class="w-full h-[400px]">
      <!-- Canvas element for the chart -->
      <canvas ref="chartRef" width="100%" height="100%"></canvas>
    </div>
  </div>
</template>
