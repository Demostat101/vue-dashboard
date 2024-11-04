<script setup lang="ts">
import student from "@/assets/student.svg";
import teacher from "@/assets/teacher.svg";
import food from "@/assets/food.svg";
import event from "@/assets/calender.svg";
import AvartarImage from "@/sharedFile/AvartarImage.vue";

const cardsData = [
  {
    id: 1,
    category: "Students",
    image: student,
    total: 932
  },
  {
    id: 2,
    category: "Teachers",
    image: teacher,
    total: 754
  },
  {
    id: 3,
    category: "Events",
    image: event,
    total: 40
  },
  {
    id: 4,
    category: "Foods",
    image: food,
    total: "32k"
  },
];
</script>

<template>
  <div class="flex justify-between bg-[#FFFFFF] px-5 py-[30px] flex-wrap rounded-md gap-5">
  <div v-for="card in cardsData" :key="card.id" class="flex gap-5 place-items-center">
    <AvartarImage class="text-white" :svgIcon="card.image" :name="card.category"/>
    <div>
      <h3 class="font-[400] text-[18px] leading-[27px] text-[#A098AE]">{{ card.category }}</h3>
    <p class="font-[700] text-[36px] leading-[54px] text-[#333333]">{{ card.total }}</p>
    </div>
  </div>
</div>
</template>
