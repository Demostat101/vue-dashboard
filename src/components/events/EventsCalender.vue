<template>
  <div class="w-full bg-white p-5 flex-1 rounded-lg">
    <!-- Header with month/year and dropdown to select month and year -->
    <div class="md:flex md:justify-between w-full md:px-5 sm:flex sm:flex-col sm:gap-2 md:flex-row sm:mb-5 md:mb-5">
      <div class="font-[700] header leading-[36px] text-[#303972]">School Calendar</div>
      <div class="relative flex place-items-center gap-4">
        <!-- Month dropdown -->
        <select v-model="selectedMonth" @change="onMonthChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#303972] custom-select">
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }} {{ today.year() }}
          </option>
        </select>

        <!-- Year dropdown -->
        <select v-model="selectedYear" @change="onYearChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#303972] custom-select">
          <option v-for="year in yearOptions" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
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
        <div>
          <!-- Day number -->
          <h3 :class="getDayClass(day)" @click="selectDay(day.date)">
            {{ day.date.date() }}
          </h3>

          <!-- Display events below the day number -->
          <div v-if="getEventsForDay(day.date).length > 0" class="text-xs text-[#FB7D5B] mt-1">
            <ul>
              <li v-for="(event, i) in getEventsForDay(day.date)" :key="i">{{ event }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


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
const selectedYear = ref(today.value.year());
const selectedDays = ref<dayjs.Dayjs[]>([]);

const events = ref<{ [key: string]: string[] }>({});

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

// Generate an array of years (for example, from 2020 to 2030)
const yearOptions = computed(() => {
  const startYear = today.value.year() - 5; // 5 years ago
  const endYear = today.value.year() + 5; // 5 years from now
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
});

// Compute the calendar days based on selected month and year
const calendarDays = computed(() => generateDate(selectedMonth.value, selectedYear.value));

// Function to generate calendar days
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

// Select day and prompt to add event
function selectDay(day: dayjs.Dayjs) {
  if (selectedDays.value.length < 3 && !selectedDays.value.some(d => d.isSame(day, 'day'))) {
    selectedDays.value.push(day);
  } else if (selectedDays.value.some(d => d.isSame(day, 'day'))) {
    selectedDays.value = selectedDays.value.filter(d => !d.isSame(day, 'day'));
  }

  // Prompt to add an event
  const event = prompt(`Add an event for ${day.format('MMMM D, YYYY')}`);
  if (event) {
    addEvent(day, event);
  }
}

// Add an event to the event store
function addEvent(date: dayjs.Dayjs, event: string) {
  const dateString = date.format('YYYY-MM-DD');
  if (!events.value[dateString]) {
    events.value[dateString] = []; // Initialize the array if it doesn't exist
  }
  events.value[dateString].push(event);
}

// Safe getter for events for a specific day
function getEventsForDay(date: dayjs.Dayjs) {
  const dateString = date.format('YYYY-MM-DD');
  if (!events.value[dateString]) {
    events.value[dateString] = []; // Initialize the array if it doesn't exist
  }
  return events.value[dateString]; // Return the array of events
}

// Get the day classes with event highlighting
function getDayClass(day: CalendarDay) {
  const isSelected = selectedDays.value.some(d => d.isSame(day.date, 'day'));
  const isToday = day.today;
  const isCurrentMonth = day.currentMonth;
  const hasEvent = getEventsForDay(day.date).length > 0;

  const isSunday = day.date.day() === 0;

  let baseClasses = 'max-h-[50px] w-full h-full max-w-[50px] grid place-items-center justify-center rounded-full font-[400] text-[18px] leading-[27px] text-[#303972]';

  if (!isCurrentMonth) {
    baseClasses += ' text-gray-300';
  } else if (isToday) {
    baseClasses += ' bg-[#F5F5F5] text-[#303972] rounded-none w-[100%] h-[100%]';
  } else if (isSelected) {
    const colors = ['bg-[#FB7D5B]', 'bg-[#FCC43E]', 'bg-[#4D44B5]'];
    baseClasses += ` ${colors[selectedDays.value.findIndex(d => d.isSame(day.date, 'day'))] || 'bg-yellow-500 '} text-white`;
  } else if (isSunday && isCurrentMonth) {
    baseClasses += ' text-[#FC9D84]';
  } else if (hasEvent && isCurrentMonth) {
    baseClasses += ' border-2 border-[#FB7D5B]'; // Highlight days with events
  } else {
    baseClasses += ' cursor-pointer hover:bg-[#242290] hover:text-white';
  }

  return baseClasses;
}

// Handle month change in dropdown
function onMonthChange() {
  selectedDate.value = dayjs().month(selectedMonth.value).year(selectedYear.value).startOf('month');
}

// Handle year change in dropdown
function onYearChange() {
  selectedDate.value = dayjs().month(selectedMonth.value).year(selectedYear.value).startOf('month');
}
</script>
