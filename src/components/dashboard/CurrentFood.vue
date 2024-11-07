<script setup lang="ts">
const currentFood = [
  {
    id: 1233554,
    name: 'Bread and Beans',
    message: 'Rich in protein and carbohydrates. I love it so much.',
  },
  {
    id: 1233555,
    name: 'Jollof Rice',
    message:
      'A delicious, spicy rice dish. It’s a classic West African favorite.',
  },
  {
    id: 1233556,
    name: 'Pounded Yam and Egusi Soup',
    message: 'A perfect combination of soft yam and savory melon seed soup.',
  },
  {
    id: 1233557,
    name: 'Fried Rice',
    message: "Mixed with vegetables and a bit of spice, it's a crowd-pleaser.",
  },
  {
    id: 1233558,
    name: 'Grilled Chicken',
    message: 'Smoky, juicy, and tender. A simple, yet delicious dish.',
  },
  {
    id: 1233559,
    name: 'Pizza',
    message:
      'Cheesy, savory, and can be topped with anything you desire. Always a hit.',
  },
  {
    id: 1233560,
    name: 'Spaghetti Bolognese',
    message: 'Rich tomato sauce and hearty meat. A classic Italian dish.',
  },
  {
    id: 1233561,
    name: 'Salmon with Asparagus',
    message: 'Light, healthy, and packed with omega-3. A great combination.',
  },
  {
    id: 1233562,
    name: 'Tacos',
    message:
      'Tasty fillings wrapped in soft tortillas. Perfect for any occasion.',
  },
  {
    id: 1233563,
    name: 'Vegetable Stir Fry',
    message: 'A quick and healthy mix of veggies sautéed in a flavorful sauce.',
  },
]

const slicedData = currentFood.slice(0, 3)
</script>

<template>
  <div class="flex flex-col gap-5">
    <span class="font-[700] text-[24px] leading-[36px] text-[#363B64]"
      >Current Foods Menu</span
    >
    <div class="flex flex-col gap-5">
      <div
        v-for="student in slicedData"
        :key="student.id"
        class="flex flex-col gap-5"
      >
        <div class="bg-[#C1BBEB] h-[160px] rounded-xl"></div>
        <div class="flex flex-col gap-3">
          <div class="font-[600] text-[18px] leading-[27px] text-[#363B64]">{{ student.name }}</div>
        <div class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">
          {{ student.message.substring(0,30) }}...
        </div>
        </div>
      </div>
      <button
        class="font-[600] text-[18px] leading-[27px] text-[#4D44B5] px-5 py-2 bg-[#EDECF8] rounded-full mt-2"
      >
        View More
      </button>
    </div>
  </div>
</template>
