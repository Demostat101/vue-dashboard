<template>
  <div class="bg-white w-full flex flex-col gap-5 p-5 rounded-lg">
    <div
      class="font-[700] text-[24px] leading-[36px] text-[#303972] text-nowrap"
    >
      Unpaid Student Intuition
    </div>
    <!-- Custom Previous and Next buttons -->

    <div class="overflow-x-auto max-w-full hide-scrollbar">
      <table
        className=" table-auto  w-full  place-items-center text-left text-nowrap"
      >
        <tbody>
          <tr
            v-for="student in slicedData"
            :key="student.id"
            className="bg-white"
          >
            <td className="pr-[30px] py-4 flex items-center gap-2">
              <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
              <span
                class="font-[600] text-[18px] leading-[27px] text-[#303972]"
                >{{ student.name }}</span
              >
            </td>
            <td
              class="font-[600] text-[18px] leading-[27px] text-[#303972] text-left px-[30px]"
            >
              ID {{ student.id }}
            </td>
            <td class="flex gap-2 px-[30px]">
              <div
                class="bg-[#FB7D5B] w-[48px] h-[48px] rounded-full flex justify-center place-items-center"
              >
                <component :is="Student" />
              </div>
              <span class="flex flex-col">
                <span
                  class="font-[400] text-[14px] leading-[21px] text-[#A098AE]"
                  >class</span
                >
                <span
                  class="font-[600] text-[18px] leading-[27px] text-[#363B64]"
                  >{{ student.class }}</span
                >
              </span>
            </td>

            <td class="px-[30px]">
              <div class="font-[600] text-[18px] leading-[27px] text-[#363B64]">
                $ {{ student.amount }}
              </div>
            </td>
            <td class="px-[30px]">
              <div class="flex gap-3">
                <component :is="printBtn" />
                <component :is="moreBtn" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VPagination } from 'vuetify/components'
import preBtn from '../../assets/prev.svg'
import nxtBtn from '../../assets/next.svg'
import printBtn from '../../assets/print.svg'
import moreBtn from '../../assets/dots.svg'
import Student from '../../assets/single-student.svg'
import { studentsData } from './studentData'



const initialRowLength = ref(5)
const currentPageIndex = ref(1)

const totalPages = computed(() =>
  Math.ceil(studentsData.length / initialRowLength.value),
)

const slicedData = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value
  const end = start + initialRowLength.value

  return studentsData.slice(start, end)
})
const pageRange = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value + 1
  const end = Math.min(
    currentPageIndex.value * initialRowLength.value,
    studentsData.length,
  )
  return `${start}-${end} from ${studentsData.length}`
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

<!-- Move styles to global scope -->
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
