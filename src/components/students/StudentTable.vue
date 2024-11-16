<template>
  <div class="w-full flex flex-col gap-5">
    <div class="flex justify-between sm:flex-col-reverse sm:gap-5 2xl:flex-row">
      <div
        class="flex place-items-center bg-white rounded-full 2xl:w-[40%] sm:w-full md:w-[60%] px-3 gap-3"
      >
        <component :is="searchIcon" class="text-[#4D44B5]" />
        <input
          type="text"
          class="text-[#A098AE] font-[400] text-[18px] h-[50px] leading-[27px] 2xl:w-full rounded-full focus:outline-none bg-white sm:w-full"
          placeholder="search here..."
          v-model="store.searchStudent"
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

    <div
      class="overflow-x-auto max-w-full hide-scrollbar bg-white rounded-tl-2xl rounded-tr-2xl"
    >
      <table
        class="w-full text-left text-sm text-gray-500 table-auto text-nowrap"
      >
        <thead class="text-sm text-gray-700 border-b-2">
          <tr>
            <th scope="col" class="w-8 px-2 py-3">
              <!-- Select All Checkbox -->
              <CustomCheckedBox
                :isChecked="selectedStudents.size === studentsData.length"
                @update:isChecked="handleSelectAllChange"
              />
            </th>
            <th scope="col" class="px-4 py-5">Name</th>
            <th scope="col" class="px-4 py-5">ID</th>
            <th scope="col" class="px-4 py-5">Date</th>
            <th scope="col" class="px-4 py-5 text-nowrap">Parent Name</th>
            <th scope="col" class="px-4 py-5">City</th>
            <th scope="col" class="px-4 py-5">Contact</th>
            <th scope="col" class="px-4 py-5">Grade</th>
            <th scope="col" class="px-4 py-5">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="student in slicedData"
            :key="student.id"
            :class="
              selectedStudents.has(student.id)
                ? 'bg-white border-b border-l-4 border-l-[#4D44B5] px-5'
                : 'bg-white border-b border-l-4 border-l-white px-5'
            "
          >
            <td class="w-8 px-2 py-4">
              <CustomCheckedBox
                :isChecked="selectedStudents.has(student.id)"
                @update:isChecked="handleCheckboxChange(student.id)"
              />
            </td>
            <td class="px-4 py-4 flex items-center gap-2">
              <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
              <div class="flex flex-col">
                <span
                  class="font-[700] text-[18px] leading-[27px] text-[#303972] text-nowrap"
                  >{{ student.name }}</span
                >
              </div>
            </td>
            <td
              class="px-4 py-4 font-[600] text-[18px] leading-[27px] text-[#4D44B5]"
            >
              #{{ student.id }}
            </td>
            <td
              class="px-4 py-4 font-[400] text-[14px] leading-[21px] text-[#A098AE] text-nowrap"
            >
              {{ student.date }}
            </td>
            <td
              class="px-4 py-4 font-[400] text-[14px] leading-[21px] text-[#303972] text-nowrap"
            >
              {{ student.parent }}
            </td>
            <td
              class="px-4 py-4 font-[400] text-[14px] leading-[21px] text-[#303972]"
            >
              {{ student.city }}
            </td>
            <td class="px-4 py-4 flex gap-4">
              <div
                class="w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-[#EDECF8] border-[#EDECF8] text-[#6159BD] border-[1px]"
              >
                <component :is="callBtn" />
              </div>
              <div
                class="w-7 h-7 flex-col flex place-items-center justify-center rounded-full bg-[#EDECF8] border-[#EDECF8] border-[1px] text-[#6159BD]"
              >
                <component :is="emailBtn" />
              </div>
            </td>
            <td class="px-4 py-2">
              <div
                :class="
                  student.class === 'VII A'
                    ? 'bg-[#FB7D5B] flex flex-col place-items-center justify-center rounded-full w-[50px] h-[30px] text-white font-[400] text-[14px] leading-[21px]'
                    : student.class === 'VII B'
                      ? 'bg-[#FCC43E] flex flex-col place-items-center justify-center rounded-full w-[50px] h-[30px] text-white font-[400] text-[14px] leading-[21px]'
                      : student.class === 'VII C'
                        ? 'bg-[#4D44B5] flex flex-col place-items-center justify-center rounded-full w-[50px] h-[30px] text-white font-[400] text-[14px] leading-[21px]'
                        : ''
                "
              >
                {{ student.class }}
              </div>
            </td>
            <td class="px-4 py-4">
              <component class="text-[#A098AE]" :is="moreBtn" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="overflow-x-auto max-w-full hide-scrollbar flex justify-between place-items-center gap-5 px-5"
    >
      <div
        class="font-[400] text-[14px] leading-[21px] text-[#363B64] text-nowrap"
      >
        Showing {{ pageRange }}
      </div>
      <div class="pagination-controls flex place-items-center gap-5 cursor-pointer">
        <component
          @click="goToPreviousPage"
          :disabled="currentPageIndex <= 1"
          outlined
          :is="preBtn"
          class="text-[#A098AE] cursor-pointer"
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
          class="text-[#A098AE] cursor-pointer"
          :is="nxtBtn"
          outlined
          aria-disabled="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomCheckedBox from '@/sharedFile/CustomCheckedBox.vue'
import preBtn from '../../assets/prev.svg'
import nxtBtn from '../../assets/next.svg'
import { VPagination } from 'vuetify/components'
import moreBtn from '../../assets/dots.svg'
import callBtn from '../../assets/call.svg'
import emailBtn from '../../assets/email.svg'
import searchIcon from '../../assets/searchicon.svg'
import dropDown from '../../assets/dropdown.svg'
import plus from '../../assets/plus.svg'
import { studentsData } from './studentsData'
import { useContextStore } from '@/stores/searchNameStore'

const selectedStudents = ref(new Set<number>())

const store = useContextStore()

const filteredData = computed(() => {
  return studentsData.filter(student =>
    student.name
      .toLowerCase()
      .includes(store.searchStudent.toLowerCase()),
  )
})

const initialRowLength = ref(6)
const currentPageIndex = ref(1)

const totalPages = computed(() =>
  Math.ceil(studentsData.length / initialRowLength.value),
)

const slicedData = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value
  const end = start + initialRowLength.value

  return filteredData.value.slice(start, end)
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

// Methods
function handleSelectAllChange(isChecked: boolean) {
  if (isChecked) {
    studentsData.forEach(_ => selectedStudents.value.add(_.id))
  } else {
    selectedStudents.value.clear()
  }
}

function handleCheckboxChange(id: number) {
  if (selectedStudents.value.has(id)) {
    selectedStudents.value.delete(id)
  } else {
    selectedStudents.value.add(id)
  }
}
</script>

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

.custom-select {
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  appearance: none; /* For other browsers */
  cursor: pointer;
  border: none;
}

/* Position the custom icon */
.custom-select-wrapper {
  position: relative;
}
</style>
