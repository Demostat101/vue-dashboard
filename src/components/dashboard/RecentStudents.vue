<script setup lang="ts" >

import emailIcon from '../../assets/email.svg'
import { studentsData } from './studentData';



const slicedData = studentsData.slice(0, 5)
</script>

<template>
  <div>

    <div class="flex flex-col gap-[30px]">
      <div v-for="student in slicedData" :key="student.id" class=" flex justify-between" >
        <div class="flex gap-2 place-items-center" >
          <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
          <div class="flex flex-col ">
            <span class="font-[600] text-[14px] leading-[21px] text-[#303972]">{{ student.name }}</span>
            <span class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">Class {{ student.class }}</span>
          </div>
        </div>
        <div :class="studentsData[1] === student ? 'w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-[#4D44B5] text-white' : 'w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-white border-[#A098AE] border-[1px] '">
          <component :is="emailIcon"/>
        </div>
      </div>
      <button class="font-[600] text-[18px] leading-[27px] text-[#4D44B5] px-5 py-2 bg-[#EDECF8] rounded-full mt-2" >View More</button>
    </div>
  </div>
</template>
