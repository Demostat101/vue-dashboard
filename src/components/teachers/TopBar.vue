<script setup lang="ts">
import dropDown from '../../assets/dropdown.svg'
import searchIcon from '../../assets/searchicon.svg'
import plus from '../../assets/plus.svg'
import { useContextStore } from '@/stores/searchNameStore'

const store = useContextStore()
</script>

<template>
  <div class="flex justify-between sm:flex-col-reverse sm:gap-5 2xl:flex-row">
    <div
      class="flex place-items-center bg-white rounded-full 2xl:w-[40%] sm:w-full md:w-[60%] px-3 gap-3"
    >
      <component :is="searchIcon" class="text-[#4D44B5]" />
      <input
        type="text"
        class="text-[#A098AE] font-[400] text-[18px] h-[50px] leading-[27px] 2xl:w-full rounded-full focus:outline-none bg-white sm:w-full"
        placeholder="search here..."
        v-model="store.searchName"
      />
    </div>
    <div class="flex gap-5 text-nowrap">
      <div
        class="w-fit border-[1px] border-[#4D44B5] text-[#4D44B5] rounded-full bg-[#F3F4FF] relative"
      >
        <select
          class="focus:outline-none font-[400] text-[18px] leading-[27px] text-[#303972] custom-select px-[40px] py-3 rounded-full bg-[#F3F4FF]"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
        <span class="">
          <component
            class="text-[#303972] absolute top-[30%] right-[8%]"
            :is="dropDown"
          />
        </span>
      </div>
      <div
        class="px-6 py-3 flex place-items-center gap-5 rounded-full bg-[#4D44B5] font-[400] text-[18px] leading-[27px] text-white"
      >
        <component :is="plus" />
        <span>New Student</span>
      </div>
    </div>
  </div>
</template>
