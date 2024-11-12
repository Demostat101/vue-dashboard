<script setup lang="ts">
  import callBtn from "../../assets/call.svg"
  import emailBtn from "../../assets/email.svg"
  import more from "../../assets/dots.svg"
  import preBtn from "../../assets/prev.svg"
  import nxtBtn from "../../assets/next.svg"
import { teachersData } from "./teachersData";
import { computed, ref } from "vue";
import { VPagination } from 'vuetify/components'


const initialRowLength = ref(12)
const currentPageIndex = ref(1)

const totalPages = computed(() =>
  Math.ceil(teachersData.length / initialRowLength.value),
)

const slicedData = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value
  const end = start + initialRowLength.value

  return teachersData.slice(start, end)
})
const pageRange = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value + 1
  const end = Math.min(
    currentPageIndex.value * initialRowLength.value,
    teachersData.length,
  )
  return `${start}-${end} from ${teachersData.length}`
})

// Method to go to the previous page
const goToPreviousPage = () => {
  if (currentPageIndex.value > 1) {
    currentPageIndex.value--
  }
}

// Method to go to the next page
const goToNextPage = () => {
  if (currentPageIndex.value < totalPages.value) {
    currentPageIndex.value++
  }
}
</script>

<template>
  
  <div class="flex gap-5 flex-wrap 2xl:justify-left sm:justify-center md:justify-stretch flex-1">
    <div class="flex-grow" v-for="teacher in slicedData" :key="teacher.id">
    <div class="flex flex-col text-center place-items-center py-3 gap-4 bg-white rounded-lg 2xl:min-w-[300px] sm:min-w-[200px] relative">
      <div class="bg-[#C1BBEB] 2xl:w-[60px] 2xl:h-[60px] sm:w-[40px] sm:h-[40px]  rounded-full"></div>
      <div class="font-[700] 2xl:text-[24px] 2xl:leading-[36px] sm:text-[18px] sm:leading-[27px] text-[#303972]  w-full text-nowrap">{{ teacher.name }}</div>
      <div class="font-[400] 2xl:text-[18px] 2xl:leading-[27px] sm:text-[14px] sm:leading-[21px] text-[#A098AE]">{{ teacher.subject }}</div>
      <div class="flex gap-3">
              <div
                class="w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-[#4D44B5]  text-white"
              >
                <component :is="callBtn" />
              </div>
              <div
                class="w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-[#4D44B5]  text-white"
              >
                <component :is="emailBtn" />
              </div>
            </div>
            <component class="absolute right-[24px] text-[#A098AE]" :is="more"/>
    </div>
  </div>
  </div>
  <div
      class="overflow-x-auto max-w-full hide-scrollbar flex justify-between place-items-center gap-5"
    >
      <div
        class="font-[400] text-[14px] leading-[21px] text-[#363B64] text-nowrap"
      >
        Showing {{ pageRange }}
      </div>
      <div
        class="pagination-controls flex place-items-center gap-5"
      >
        <component
          @click="goToPreviousPage"
          :disabled="currentPageIndex <= 1"
          outlined
          :is="preBtn"
          class="text-[#A098AE]"
        />

        <!-- Vuetify pagination -->
        <v-pagination
          v-model="currentPageIndex"
          :length="totalPages"
          :total-visible="4"
        />

        <component
          @click="goToNextPage"
          :disabled="currentPageIndex >= totalPages"
          class="text-[#A098AE]"
          :is="nxtBtn"
          outlined
          aria-disabled="true"
        />
      </div>
    </div>
</template>


<style>
/* Default button styling for pagination */
.v-pagination .v-btn {
  border-radius: 50%; /* Border radius to make buttons rounded */
  background-color: #ffffff !important; /* White background */
  border: 2px solid #a098ae !important; /* Grey border */
  width: 30px;
  height: 30px;
  color: #a098ae;
}

/* Active page button styling */
.v-pagination__item--is-active .v-btn {
  background-color: #4d44b5 !important; /* Blue background for active page */
  color: white !important; /* White text for active page */
}

.v-pagination__next,
.v-pagination__prev {
  display: none;
}

.v-pagination__item--is-active .v-btn:hover {
  background-color: #7167e0 !important;
}
</style>