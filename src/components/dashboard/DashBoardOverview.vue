<script setup lang="ts">
import RecentStudents from './RecentStudents.vue';
import Plus from '../../assets/plus.svg'
import StudentsMessage from './StudentsMessage.vue';

</script>

<template>
  <div class="flex flex-col gap-[50px] py-5">
    <div class="flex w-full justify-between place-items-center">
      <div class="flex flex-col">
        <span class="font-[700] text-[24px] leading-[36px] text-[#303972]"
          >Recent Students</span
        >
        <span class="font-[600] text-[14px] leading-[21px] text-[#A098AE]"
          >You have 456 students</span
        >
      </div>
      <div
        class="w-6 h-6 justify-center rounded-full bg-[#4D44B5] flex flex-col place-items-center"
      >
        <component :is="Plus" />
      </div>
    </div>
    <RecentStudents/>
    <StudentsMessage/>
  </div>
</template>
