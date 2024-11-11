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
      <div class="pagination-controls flex place-items-center gap-5">
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
          :total-visible="5"
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

const selectedStudents = ref(new Set<number>())

const studentsData = [
  {
    id: 1233554,
    name: 'Julius Aghaowa',
    class: 'VII A',
    date: 'March 25, 2021',
    parent: 'Aliu James',
    city: 'Lagos',
  },
  {
    id: 1233555,
    name: 'Maryam Hassan',
    class: 'VII A',
    date: 'April 10, 2021',
    parent: 'Amina Hassan',
    city: 'Abuja',
  },
  {
    id: 1233556,
    name: 'Chidi Okafor',
    class: 'VII B',
    date: 'May 5, 2021',
    parent: 'Ngozi Okafor',
    city: 'Enugu',
  },
  {
    id: 1233557,
    name: 'Sarah Eze',
    class: 'VII C',
    date: 'June 12, 2021',
    parent: 'Oluchi Eze',
    city: 'Port Harcourt',
  },
  {
    id: 1233558,
    name: 'John Ochieng',
    class: 'VII B',
    date: 'July 8, 2021',
    parent: 'Moses Ochieng',
    city: 'Kano',
  },
  {
    id: 1233559,
    name: 'Hannah Adeyemi',
    class: 'VII A',
    date: 'August 14, 2021',
    parent: 'Adeola Adeyemi',
    city: 'Ibadan',
  },
  {
    id: 1233560,
    name: 'David Oluwaseun',
    class: 'VII C',
    date: 'September 3, 2021',
    parent: 'Oluwaseun David',
    city: 'Abuja',
  },
  {
    id: 1233561,
    name: 'Evelyn Okoro',
    class: 'VII A',
    date: 'October 16, 2021',
    parent: 'Chukwuemeka Okoro',
    city: 'Benin',
  },
  {
    id: 1233562,
    name: 'Samuel Ndubuisi',
    class: 'VII B',
    date: 'November 20, 2021',
    parent: 'Olu Ndubuisi',
    city: 'Kaduna',
  },
  {
    id: 1233563,
    name: 'Vivian Onuoha',
    class: 'VII C',
    date: 'December 5, 2021',
    parent: 'Chima Onuoha',
    city: 'Jos',
  },
  {
    id: 1233564,
    name: 'Tolu Akinlade',
    class: 'VII A',
    date: 'January 14, 2022',
    parent: 'Bola Akinlade',
    city: 'Lagos',
  },
  {
    id: 1233565,
    name: 'Oluwafunmilayo Bello',
    class: 'VII B',
    date: 'February 21, 2022',
    parent: 'Abiodun Bello',
    city: 'Ilorin',
  },
  {
    id: 1233566,
    name: 'Ruth Onwuka',
    class: 'VII C',
    date: 'March 30, 2022',
    parent: 'Chinonso Onwuka',
    city: 'Warri',
  },
  {
    id: 1233567,
    name: 'Chuka Ugwuanyi',
    class: 'VII A',
    date: 'April 15, 2022',
    parent: 'Chioma Ugwuanyi',
    city: 'Aba',
  },
  {
    id: 1233568,
    name: 'Ifeoma Nwachukwu',
    class: 'VII B',
    date: 'May 10, 2022',
    parent: 'Ogechi Nwachukwu',
    city: 'Owerri',
  },
  {
    id: 1233569,
    name: 'Kofi Adebayo',
    class: 'VII C',
    date: 'June 18, 2022',
    parent: 'Sade Adebayo',
    city: 'Akure',
  },
  {
    id: 1233570,
    name: 'Grace Obinna',
    class: 'VII A',
    date: 'July 25, 2022',
    parent: 'Chuka Obinna',
    city: 'Abuja',
  },
  {
    id: 1233571,
    name: 'Daniel Ojo',
    class: 'VII B',
    date: 'August 4, 2022',
    parent: 'John Ojo',
    city: 'Ogun',
  },
  {
    id: 1233572,
    name: 'Angela Okonkwo',
    class: 'VII C',
    date: 'September 15, 2022',
    parent: 'Emeka Okonkwo',
    city: 'Benue',
  },
  {
    id: 1233573,
    name: 'Victor Nwosu',
    class: 'VII A',
    date: 'October 9, 2022',
    parent: 'Nnena Nwosu',
    city: 'Lagos',
  },
]

const initialRowLength = ref(6)
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