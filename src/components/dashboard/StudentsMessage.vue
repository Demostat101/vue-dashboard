<script setup lang="ts" >

const studentsData = [
  {
    id: 1233554,
    name: 'Julius Aghaowa',
    class: 'VII A',
    message: "lorem ispson semen dembe labamda jalada",
    amount: 50000,
    time: '12:45 PM'
  },
  {
    id: 1233555,
    name: 'Anna Okafor',
    class: 'VII B',
    message: "I am happy with my progress this term!",
    amount: 45000,
    time: '1:15 PM'
  },
  {
    id: 1233556,
    name: 'Samuel Oduro',
    class: 'VII C',
    message: "Excited for the upcoming sports event!",
    amount: 60000,
    time: '2:30 PM'
  },
  {
    id: 1233557,
    name: 'Patricia Nwachukwu',
    class: 'VII A',
    message: "Can’t wait for the field trip next week.",
    amount: 40000,
    time: '3:00 PM'
  },
  {
    id: 1233558,
    name: 'Kwame Asante',
    class: 'VII B',
    message: "Struggling with math but improving.",
    amount: 55000,
    time: '10:00 AM'
  },
  {
    id: 1233559,
    name: 'Chioma Eze',
    class: 'VII C',
    message: "Had a great time during the music class!",
    amount: 52000,
    time: '9:45 AM'
  },
  {
    id: 1233560,
    name: 'Emeka Obi',
    class: 'VII A',
    message: "Looking forward to the science fair!",
    amount: 47000,
    time: '11:00 AM'
  },
  {
    id: 1233561,
    name: 'Grace Adebayo',
    class: 'VII B',
    message: "I need help with my English assignments.",
    amount: 48000,
    time: '4:30 PM'
  },
  {
    id: 1233562,
    name: 'Tariq Ibrahim',
    class: 'VII C',
    message: "Can’t wait to play basketball this weekend.",
    amount: 49000,
    time: '5:15 PM'
  },
  {
    id: 1233563,
    name: 'Zainab Bello',
    class: 'VII A',
    message: "I love reading books on history.",
    amount: 51000,
    time: '6:00 PM'
  }
];


const slicedData = studentsData.slice(0, 4)
</script>

<template>
  <div class="flex flex-col gap-5 ">
    <span class="font-[700] text-[24px] leading-[36px] text-[#303972]"
          >Messages</span
        >
    <div class="flex flex-col gap-5">
      <div v-for="student in slicedData" :key="student.id" class=" flex justify-between gap-5 border-b-2 pb-5" >
        <div class="flex gap-2 place-items-center" >
          <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
          <div class="flex flex-col ">
            <span class="font-[600] text-[14px] leading-[21px] text-[#303972]">{{ student.name }}</span>
            <span class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">{{ student.message.substring(0,15) }}...</span>
          </div>
        </div>

        <div class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">{{ student.time }}</div>
      </div>
      <button class="font-[600] text-[18px] leading-[27px] text-[#4D44B5] px-5 py-2 bg-[#EDECF8] rounded-full mt-2" >View More</button>
    </div>
  </div>
</template>
