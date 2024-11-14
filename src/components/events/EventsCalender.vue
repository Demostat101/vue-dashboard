<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import dropDown from "../../assets/dropdown.svg";

// Define the types for event and calendar day
type Event = {
  title: string;
  time: string;
  day: dayjs.Dayjs;
};

type CalendarDay = {
  currentMonth: boolean;
  date: dayjs.Dayjs;
  today: boolean | null;
};

const today = ref(dayjs()); // today as dayjs object
const selectedDate = ref<dayjs.Dayjs>(dayjs()); // Ensure this is a valid dayjs object
const selectedMonth = ref(dayjs().month()); // Initialize with current month index
const events = ref<Event[]>([]); // Store all events

// Modal related states
const showModal = ref(false);
const eventTitle = ref('');
const eventTime = ref('');

// Calendar data
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

// Computed for formatted today
const todayFormatted = computed(() => today.value.format('YYYY')); // Gets the current year

// Generate calendar days
const calendarDays = computed(() => generateDate(selectedMonth.value, today.value.year()));

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

// Select day (opens modal to add an event)
function selectDay(day: dayjs.Dayjs) {
  selectedDate.value = day;
  showModal.value = true; // Open modal when a day is selected
}

// Function to get the event circles for each day
function getEventCircles(day: dayjs.Dayjs) {
  const dayEvents = events.value.filter(event => event.day.isSame(day, 'day'));
  const circles = dayEvents.slice(0, 3).map((_, index) => ({
    type: index < 2 ? 'circle' : 'total',
    count: dayEvents.length,
  }));
  return circles;
}

// Add an event to the selected day
function addEvent() {
  if (eventTitle.value && eventTime.value) {
    events.value.push({
      title: eventTitle.value,
      time: eventTime.value,
      day: selectedDate.value,
    });
    showModal.value = false; // Close modal after adding the event
    eventTitle.value = '';
    eventTime.value = '';
  }
}

// Function to get classes for each day
function getDayClass(day: CalendarDay) {
  const isSelected = selectedDate.value.isSame(day.date, 'day');
  const isToday = day.today;
  const isCurrentMonth = day.currentMonth;

  let baseClasses = 'max-h-[50px] w-full h-full max-w-[50px] grid place-items-center justify-center rounded-full font-[400] text-[18px] leading-[27px] text-[#303972]';

  if (!isCurrentMonth) {
    baseClasses += ' text-gray-300'; // Non-current month days (faded text)
  } else if (isToday) {
    baseClasses += ' bg-[#F5F5F5] text-[#303972] rounded-none w-[100%] h-[100%]'; // Today's date style
  } else if (isSelected) {
    baseClasses += ' bg-[#FB7D5B] text-white'; // Style for selected day
  } else {
    baseClasses += ' cursor-pointer hover:bg-[#242290] hover:text-white'; // Hover effect on current month days
  }

  return baseClasses;
}

// Handle month change
function onMonthChange() {
  if (selectedDate.value && selectedDate.value.isValid()) {
    selectedDate.value = dayjs().month(selectedMonth.value).startOf('month');
  }
}

// Filter events for the selected day
const eventsForSelectedDay = computed(() => {
  return events.value.filter(event => event.day.isSame(selectedDate.value, 'day'));
});


</script>


<template>
  <div class="flex w-full">
    <!-- Left: Calendar -->
    <div class="w-[70%] bg-white p-5 rounded-lg">
      <!-- Calendar Header -->
      <div class="md:flex md:justify-between w-full md:px-5 sm:flex sm:flex-col sm:gap-2 md:flex-row sm:mb-5 md:mb-5">
        <div class="font-[700] header leading-[36px] text-[#303972]">School Calendar</div>
        <div class="relative flex place-items-center">
          <select v-model="selectedMonth" @change="onMonthChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#303972] custom-select">
            <option v-for="(month, index) in months" :key="index" :value="index">
              {{ month }} {{ todayFormatted }}
            </option>
          </select>
          <span><component class=" text-[#716f74] md:absolute md:top-[50%] md:right-[-20%] md:translate-y-[-50%] sm:top-[-50%]" :is="dropDown" /></span>
        </div>
      </div>

      <!-- Days of the week -->
      <div class="grid grid-cols-7 w-full place-items-center leading-[27px] text-[#A098AE] mb-2 font-[400] text-[18px] border-gray-300">
        <div v-for="(day, index) in days" :key="index" class="font-[700] px-2 py-1">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="w-full h-[300px] grid grid-cols-7 gap-0 border-t border-l border-gray-300">
        <div v-for="(day, index) in calendarDays" :key="index" class="grid place-items-center border-r border-b border-gray-300">
          <div>
            <h3 :class="getDayClass(day)" @click="selectDay(day.date)">
              {{ day.date.date() }}
            </h3>
            <!-- Event circles -->
            <div v-for="(circle, index) in getEventCircles(day.date)" :key="index" :class="circle.type === 'circle' ? 'w-[10px] h-[10px] bg-[#4D44B5] rounded-full mt-1 mx-auto' : 'w-[10px] h-[10px] bg-[#FB7D5B] rounded-full mt-1 mx-auto'">
              <span v-if="circle.type === 'total'" class="text-xs text-white">{{ circle.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Event Details -->
    <div class="w-[30%] bg-white p-5 rounded-lg ml-5">
      <h2 v-if="selectedDate" class="font-bold text-xl mb-4">Events for {{ selectedDate.format('MMMM D, YYYY') }}</h2>
      <div v-if="eventsForSelectedDay.length > 0">
        <div v-for="event in eventsForSelectedDay" :key="event.time" class="mb-3">
          <div class="font-semibold text-lg">{{ event.title }}</div>
          <div class="text-sm text-gray-600">{{ event.time }}</div>
        </div>
      </div>
      <div v-else class="text-gray-500">No events for this day.</div>
    </div>

    <!-- Modal for Adding Event -->
    <div v-if="showModal" class="modal">
      <div class="bg-white p-5 rounded-lg shadow-lg w-[400px]">
        <h3 class="text-xl font-semibold mb-4">Add Event</h3>
        <input v-model="eventTitle" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="Event Title" />
        <input v-model="eventTime" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="Event Time" />
        <div class="flex justify-between">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button @click="addEvent" class="px-4 py-2 bg-blue-500 text-white rounded">Add Event</button>
        </div>
      </div>
    </div>
  </div>
</template>
