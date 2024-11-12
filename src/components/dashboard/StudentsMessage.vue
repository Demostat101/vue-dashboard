<script setup lang="ts" >
import { studentsData } from './studentData';

const slicedData = studentsData.slice(0, 4)
</script>

<template>
  <div class="flex flex-col gap-5 ">
    <span class="font-[700] text-[24px] leading-[36px] text-[#303972]"
          >Messages</span
        >
    <div class="flex flex-col gap-[30px]">
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
