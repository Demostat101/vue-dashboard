<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';

type CalendarDay = {
  currentMonth: boolean;
  date: dayjs.Dayjs;
  today: boolean | null;
};

const today = ref(dayjs());
const selectedDate = ref(dayjs());
const selectedMonth = ref(dayjs().month());
const selectedDays = ref<dayjs.Dayjs[]>([]); // To store up to three selected event days

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const calendarDays = computed(() => generateDate(selectedMonth.value, today.value.year()));

// const headerClass = computed(() => {
//   return selectedDate.value.isSame(dayjs(), 'day')
//     ? 'h-[40px] grid justify-center place-items-center text-[16px] text-black font-[600]'
//     : 'h-[43.62px] text-black font-[600] text-[17.62px] grid justify-center place-items-center';
// });

function generateDate(month: number, year: number) {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');

  const arrayOfDate: CalendarDay[] = [];

  // Prefix empty days (start of the month)
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDayOfMonth.add(i, 'day'),
      today: null,
    });
  }

  // Generate current month days
  for (let i = 0; i < lastDayOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDayOfMonth.add(i, 'day'),
      today: firstDayOfMonth.add(i, 'day').isSame(dayjs(), 'day'),
    });
  }

  // Fill the remaining days to ensure the grid is 35 days (5 weeks)
  const remaining = 35 - arrayOfDate.length;
  for (let i = 0; i < remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDayOfMonth.add(i + 1, 'day'),
      today: null,
    });
  }

  return arrayOfDate;
}

function selectDay(day: dayjs.Dayjs) {
  if (selectedDays.value.length < 3 && !selectedDays.value.some(d => d.isSame(day, 'day'))) {
    selectedDays.value.push(day); // Add day if there are less than 3 selected
  } else if (selectedDays.value.some(d => d.isSame(day, 'day'))) {
    selectedDays.value = selectedDays.value.filter(d => !d.isSame(day, 'day')); // Remove day if already selected
  }
}

function getDayClass(day: CalendarDay) {
  const isSelected = selectedDays.value.some(d => d.isSame(day.date, 'day'));
  const isToday = day.today;
  const isCurrentMonth = day.currentMonth;

  // Check if the day is a Sunday (0 = Sunday)
  const isSunday = day.date.day() === 0;

  let baseClasses = 'h-[30px] w-[30px] grid place-items-center justify-center rounded-full';

  if (!isCurrentMonth) {
    baseClasses += ' text-gray-300'; // Non-current month days (faded text)
  } else if (isToday) {
    baseClasses += ' bg-[#176B87] text-white'; // Today's date style (highlight today's date)
  } else if (isSelected) {
    // Apply different colors for the selected event days
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
    baseClasses += ` ${colors[selectedDays.value.findIndex(d => d.isSame(day.date, 'day'))] || 'bg-yellow-500'} text-white`; // Choose color based on the index
  } else if (isSunday && isCurrentMonth) {
    // Apply orange color to Sundays in the current month
    baseClasses += ' bg-orange-500 text-white'; // Orange background for Sundays
  } else {
    baseClasses += ' cursor-pointer hover:bg-black hover:text-white'; // Hover effect on current month days
  }

  return baseClasses;
}


function onMonthChange() {
  selectedDate.value = dayjs().month(selectedMonth.value).startOf('month');
}
</script>


<template>
  <div class="w-full bg-white p-5 flex-1">
    <!-- Header with month/year and dropdown to select month -->

    <!-- Month Selector Dropdown -->
    <div class="md:flex md:justify-between w-full md:px-5 sm:flex sm:flex-col sm:gap-2 md:flex-row sm:mb-5 md:mb-5 ">
      <div class="font-[700] header leading-[36px] text-[#303972]">School Calendar</div>
      <select v-model="selectedMonth" @change="onMonthChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#303972]">
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index"
        >
          {{ month }} {{ today.year() }}
        </option>
      </select>
    </div>

    <!-- Days of the week -->
    <div class="grid grid-cols-7 w-full place-items-center leading-[27px] text-[#A098AE] mb-2 font-[400] text-[18px] border-gray-300">
      <div v-for="(day, index) in days" :key="index" class="font-[700] px-2 py-1">
        {{ day }}
      </div>
    </div>

    <!-- Calendar days -->
    <div class="w-full h-[300px] grid grid-cols-7 gap-0 border-t border-l border-gray-300">
      <!-- Each day block -->
      <div v-for="(day, index) in calendarDays" :key="index" class="grid place-items-center border-r border-b border-gray-300">
        <h3 :class="getDayClass(day)" @click="selectDay(day.date)">
          {{ day.date.date() }}
        </h3>
      </div>
    </div>
  </div>
</template>




<style>
  .header{
    font-size: clamp(18px, 2vw, 24px);
    text-wrap: nowrap;
  }
</style>
