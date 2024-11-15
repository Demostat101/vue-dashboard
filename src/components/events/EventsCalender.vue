<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import dropDown from "../../assets/dropdown.svg";
import plus from "../../assets/plus.svg"
import calender from "../../assets/calender.svg"
import clock from "../../assets/clock.svg"

// Define the types for event and calendar day
type Event = {
  title: string;
  time: string;
  day: dayjs.Dayjs;
  category:string;
  date:string
};

type CalendarDay = {
  currentMonth: boolean;
  date: dayjs.Dayjs;
  today: boolean | null;
};

// const today = ref(dayjs()); // today as dayjs object
const selectedDate = ref<dayjs.Dayjs>(dayjs()); // Ensure this is a valid dayjs object
const selectedMonth = ref(dayjs().month()); // Initialize with current month index
const selectedYear = ref(dayjs().year()); // Initialize with current year
const events = ref<Event[]>([]); // Store all events

// Modal related states
const showModal = ref(false);
const eventTitle = ref('');
const eventTime = ref('');
const eventCategory = ref('');
const eventDate = ref('');

// Calendar data
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 50 }, (_, i) => 1980 + i); // Creates a list of years from 1980 to 2030

// Computed for formatted today
// const todayFormatted = computed(() => today.value.format('YYYY')); // Gets the current year

// Generate calendar days
const calendarDays = computed(() => generateDate(selectedMonth.value, selectedYear.value));

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
  if (eventTitle.value && eventTime.value && eventCategory.value && eventDate.value) {
    events.value.push({
      title: eventTitle.value,
      time: eventTime.value,
      category:eventCategory.value,
      date:eventDate.value,
      day: selectedDate.value,
    });
    showModal.value = false; // Close modal after adding the event
    eventTitle.value = '';
    eventTime.value = '';
    eventCategory.value='';
    eventDate.value=''
  }
}

// Function to get classes for each day
function getDayClass(day: CalendarDay) {
  const isSelected = selectedDate.value.isSame(day.date, 'day');
  const isToday = day.today;
  const isCurrentMonth = day.currentMonth;

  // Check if the day has events to highlight it
  const hasEvent = events.value.some(event => event.day.isSame(day.date, 'day'));

  let baseClasses = 'h-full w-full grid pl-3 pt-2 font-[700] text-[24px] leading-[36px] text-[#303972]';

  if (!isCurrentMonth) {
    baseClasses += ' text-gray-300 rounded-lg bg-[#F5F5F5] text-[#A098AE]'; // Non-current month days (faded text)
  } else if (isToday) {
    baseClasses += ' bg-white rounded-lg w-[100%] h-[100%]'; // Today's date style
  } else if (isSelected) {
    // Find the index of the selected day in the calendarDays array
    const dayIndex = calendarDays.value.findIndex(calendarDay => calendarDay.date.isSame(day.date, 'day'));

    // Define some colors to use for selected day
    const colors = ['bg-[#FB7D5B]', 'bg-[#FCC43E]',  'bg-[#4D44B5]'];
    baseClasses += ` ${colors[dayIndex % colors.length]} rounded-lg text-white`; // Choose color based on index
  } else if (hasEvent) {
    // If the day has an event, add a background color (persistent)
    const dayIndex = calendarDays.value.findIndex(calendarDay => calendarDay.date.isSame(day.date, 'day'));
    const colors = ['bg-[#FB7D5B]', 'bg-[#FCC43E]',  'bg-[#4D44B5]'];
    baseClasses += ` ${colors[dayIndex % colors.length] || 'bg-white text-[#4D44B5]'} rounded-lg text-white`; // Example background color for days with events
  } else {
    baseClasses += ' cursor-pointer'; // Hover effect on current month days
  }

  return baseClasses;
}



// Handle month and year change
function onMonthChange() {
  if (selectedDate.value && selectedDate.value.isValid()) {
    selectedDate.value = dayjs().month(selectedMonth.value).year(selectedYear.value).startOf('month');
  }
}

// Filter events for the selected day
const eventsForSelectedDay = computed(() => {
  return events.value.filter(event => event.day.isSame(selectedDate.value, 'day'));
});

const colors = ['#252392', '#FB7D5B',  '#FCC43E'];
</script>

<template>
<div class="overflow-x-auto max-w-full hide-scrollbar h-fit">
  <div class="flex w-full min-w-[1300px] h-fit">
    <!-- Left: Calendar -->
    <div class="w-[80%] bg-white h-fit p-5 rounded-lg">
      <!-- Calendar Header -->
      <div class="flex justify-between place-items-center mb-5">
        <div class="font-[700] text-[36px] leading-[54px] text-[#303972]">Calendar</div>
       <div class="flex place-items-center gap-6 text-nowrap">
        <div class="relative flex place-items-center border-[1px] border-[#4D44B5] px-[30px] rounded-full py-2">
          <!-- Month Dropdown -->
          <select v-model="selectedMonth" @change="onMonthChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#4D44B5] cursor-pointer">
            <option v-for="(month, index) in months" :key="index" :value="index">
              {{ month }}
            </option>
          </select>



          <span><component class=" text-[#4D44B5] md:absolute md:top-[50%] md:right-[0] md:translate-y-[-50%] sm:top-[-50%]" :is="dropDown" /></span>
        </div>
        <div class="relative flex place-items-center border-[1px] border-[#4D44B5] px-[30px] rounded-full py-2">


          <!-- Year Dropdown -->
          <select v-model="selectedYear" @change="onMonthChange" class="w-fit focus:outline-none font-[400] text-[18px] leading-[27px] text-[#4D44B5] cursor-pointer">
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>

          <span><component class=" text-[#4D44B5] md:absolute md:top-[50%] md:right-[0] md:translate-y-[-50%] sm:top-[-50%]" :is="dropDown" /></span>
        </div>

        <div
          class="px-6 py-3 flex place-items-center gap-5 rounded-full bg-[#4D44B5] font-[400] text-[18px] leading-[27px] text-white"
        >
          <component :is="plus" />
          <span>New Student</span>
        </div>
       </div>
      </div>

      <!-- Days of the week -->
      <div class="grid grid-cols-7 w-full  leading-[27px] text-[#A098AE] mb-4 font-[400] text-[18px]">
        <div v-for="(day, index) in days" :key="index" class="font-[700] px-2 py-1">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="w-full h-full grid grid-cols-7 gap-4 ">
        <div v-for="(day, index) in calendarDays" :key="index" class="grid place-items-center border-[1px] border-[#A6A1DA]   w-fit h-fit rounded-lg p-[1px]">
          <div class=" w-[110px] h-[130px] relative">
            <h3 :class="getDayClass(day)" @click="selectDay(day.date)">
              {{ day.date.date() }}
            </h3>
            <!-- Event circles -->
            <div v-if="getEventCircles(day.date).length" class="flex -space-x-2  absolute bottom-[20%] left-[10%]">
              <div v-for="(circle, index) in getEventCircles(day.date)" :key="index" :class="circle.type === 'circle' ? 'w-[30px] h-[30px] bg-[#C1BBEB] border-2 border-white rounded-full' : 'w-[30px] h-[30px] bg-[#4D44B5] rounded-full pl-1 border-2 border-white'">
              <span v-if="circle.type === 'total'" class=" text-white">{{ circle.count }}+</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Event Details -->
    <div class="w-[30%] px-5 rounded-lg">
      <div v-if="selectedDate" class="bg-white w-full p-[30px] rounded-lg mb-5">

        <div class="font-[700] text-[24px] leading-[36px] text-[#363B64]">Schedule Details</div>
        <div class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">{{ selectedDate.format('MMMM D, YYYY') }}</div>

      </div>

      <div v-if="eventsForSelectedDay.length > 0" class="rounded-md w-full h-fit" >
        <div v-for="(event, index) in eventsForSelectedDay" :key="event.time" class="mb-3 rounded-lg p-[20px] " :style="{borderLeftColor: colors[index % colors.length], backgroundColor:'white', borderLeftWidth:'15px',}">
          <div class="text-[#363B64] font-[600] text-[18px] leading-[27px]">{{ event.title }}</div>
          <div class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">{{ event.category }}</div>
          <div class="flex gap-5 justify-between place-items-center mt-[30px]">
            <div class="flex flex-col gap-2">
              <div class="flex gap-5 place-items-center">
              <component class="text-[#FB7D5B]" :is="calender"/>
              <span>{{ event.date }}</span>
            </div>

             <div class="flex gap-5 place-items-center ">
              <component class="text-[#FCC43E]" :is="clock"/>
              <span class="text-[14px] font-[400] leading-[21px] text-[#A098AE]">{{ event.time }}</span>
             </div>
            </div>
             <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>

          </div>
        </div>
      </div>
      <div v-else class=" text-[#363B64] font-[600] ">No events for this day.</div>
    </div>

    <!-- Modal for Adding Event -->
    <div v-if="showModal" class="bg-black/60 min-w-[100vw] h-full z-50 fixed inset-0 flex justify-center items-center px-10 pt-[60px] flex-col">
      <div class="bg-white p-5 rounded-lg shadow-lg w-[400px]">
        <h3 class="text-xl font-semibold mb-4 text-[#242390]">Add Event</h3>
        <input v-model="eventTitle" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="Html and Css" />
        <input v-model="eventCategory" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="Programming" />
        <input v-model="eventDate" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="November 20, 2024" />
        <input v-model="eventTime" class="w-full p-2 mb-3 border border-gray-300 rounded" placeholder="9:00 - 10:00 AM" />
        <div class="flex justify-between">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button @click="addEvent" class="px-4 py-2 bg-[#242390] text-white rounded">Add Event</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
