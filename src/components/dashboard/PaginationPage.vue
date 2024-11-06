<template>
  <div class="bg-white w-full flex flex-col gap-5 p-5 rounded-lg">
    <div class="font-[700] text-[24px] leading-[36px] text-[#303972] text-nowrap">Unpaid Student Intuition</div>
    <!-- Custom Previous and Next buttons -->


    <div class="overflow-x-auto max-w-full hide-scrollbar" >
      <table className=" table-auto  w-full  place-items-center text-left text-nowrap" >

<tbody >

    <tr v-for="student in slicedData" :key="student.id" className="bg-white">
      <td className="pr-[30px] py-4 flex items-center gap-2">
        <div class="bg-[#C1BBEB] w-[48px] h-[48px] rounded-full"></div>
        <span class="font-[600] text-[18px] leading-[27px] text-[#303972]">{{ student.name }}</span>
      </td>
      <td class="font-[600] text-[18px] leading-[27px] text-[#303972] text-left px-[30px]">ID {{ student.id }}</td>
      <td
        class="flex gap-2 px-[30px]"
      >
      <div class="bg-[#FB7D5B] w-[48px] h-[48px] rounded-full flex justify-center place-items-center">
        <component :is="Student"/>
      </div>
      <span class="flex flex-col">
        <span class="font-[400] text-[14px] leading-[21px] text-[#A098AE]">class</span>
        <span class="font-[600] text-[18px] leading-[27px] text-[#363B64]">{{ student.class }}</span>
      </span>
      </td>

      <td class="px-[30px]" >
        <div class="font-[600] text-[18px] leading-[27px] text-[#363B64]">
      $ {{ student.amount }}
    </div>
      </td>
      <td class="px-[30px]">
        <div class="flex gap-3">
      <component  :is="student.download"/>
      <component :is="student.more"/>
    </div>
      </td>

    </tr>

</tbody>
</table>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VPagination} from 'vuetify/components'
import preBtn from '../../assets/prev.svg'
import nxtBtn from '../../assets/next.svg'
import printBtn from '../../assets/print.svg'
import moreBtn from '../../assets/dots.svg'
import Student from '../../assets/single-student.svg'


const studentsData = [
  {
    id: 1233554,
    name: 'Julius Aghaowa',
    class: 'VII A',
    download: printBtn,
    more: moreBtn,
    amount: 50000
  },
  {
    id: 1233555,
    name: 'Amara Nwachukwu',
    class: 'VII B',
    download: printBtn,
    more: moreBtn,
    amount: 45000
  },
  {
    id: 1233556,
    name: 'Chuka Eze',
    class: 'VII C',
    download: printBtn,
    more: moreBtn,
    amount: 38000
  },
  {
    id: 1233557,
    name: 'Ngozi Okafor',
    class: 'VII A',
    download: printBtn,
    more: moreBtn,
    amount: 42000
  },
  {
    id: 1233558,
    name: 'Emeka Oji',
    class: 'VII B',
    download: printBtn,
    more: moreBtn,
    amount: 51000
  },
  {
    id: 1233559,
    name: 'Chinedu Onyekachi',
    class: 'VII C',
    download: printBtn,
    more: moreBtn,
    amount: 47000
  },
  {
    id: 1233560,
    name: 'Ngozi Obasi',
    class: 'VIII A',
    download: printBtn,
    more: moreBtn,
    amount: 53000
  },
  {
    id: 1233561,
    name: 'Ifeoma Eze',
    class: 'VIII B',
    download: printBtn,
    more: moreBtn,
    amount: 49000
  },
  {
    id: 1233562,
    name: 'Chinonso Opara',
    class: 'VIII C',
    download: printBtn,
    more: moreBtn,
    amount: 46000
  },
  {
    id: 1233563,
    name: 'Onyeka Umeh',
    class: 'VIII A',
    download: printBtn,
    more: moreBtn,
    amount: 47000
  },
  {
    id: 1233564,
    name: 'Ugochukwu Okoro',
    class: 'VIII B',
    download: printBtn,
    more: moreBtn,
    amount: 49000
  },
  {
    id: 1233565,
    name: 'Chidinma Ifeanyi',
    class: 'VIII C',
    download: printBtn,
    more: moreBtn,
    amount: 52000
  },
  {
    id: 1233566,
    name: 'Ifeanyi Nwachukwu',
    class: 'IX A',
    download: printBtn,
    more: moreBtn,
    amount: 54000
  },
  {
    id: 1233567,
    name: 'Nneka Obi',
    class: 'IX B',
    download: printBtn,
    more: moreBtn,
    amount: 55000
  },
  {
    id: 1233568,
    name: 'Olumide Adebayo',
    class: 'IX C',
    download: printBtn,
    more: moreBtn,
    amount: 48000
  },
  {
    id: 1233569,
    name: 'Oluchi Obinna',
    class: 'IX A',
    download: printBtn,
    more: moreBtn,
    amount: 49000
  },
  {
    id: 1233570,
    name: 'Chukwuemeka Chinedu',
    class: 'IX B',
    download: printBtn,
    more: moreBtn,
    amount: 51000
  },
  {
    id: 1233571,
    name: 'Adaobi Ijeoma',
    class: 'IX C',
    download: printBtn,
    more: moreBtn,
    amount: 45000
  },
  {
    id: 1233572,
    name: 'Emmanuel Udo',
    class: 'X A',
    download: printBtn,
    more: moreBtn,
    amount: 46000
  },
  {
    id: 1233573,
    name: 'Chinonso Akpan',
    class: 'X B',
    download: printBtn,
    more: moreBtn,
    amount: 43000
  },
  {
    id: 1233574,
    name: 'Ifeoma Chukwu',
    class: 'X C',
    download: printBtn,
    more: moreBtn,
    amount: 52000
  },
  {
    id: 1233575,
    name: 'Jemima Okeke',
    class: 'X A',
    download: printBtn,
    more: moreBtn,
    amount: 54000
  },
  {
    id: 1233576,
    name: 'Chibuzor Okwuosa',
    class: 'X B',
    download: printBtn,
    more: moreBtn,
    amount: 55000
  },
  {
    id: 1233577,
    name: 'Umaru Adamu',
    class: 'X C',
    download: printBtn,
    more: moreBtn,
    amount: 47000
  },
  {
    id: 1233578,
    name: 'Chike Uche',
    class: 'XI A',
    download: printBtn,
    more: moreBtn,
    amount: 49000
  },
  {
    id: 1233579,
    name: 'Oluwaseun Adedeji',
    class: 'XI B',
    download: printBtn,
    more: moreBtn,
    amount: 50000
  },
  {
    id: 1233580,
    name: 'Chidera Ajayi',
    class: 'XI C',
    download: printBtn,
    more: moreBtn,
    amount: 53000
  },
  {
    id: 1233581,
    name: 'Nnena Ogbodo',
    class: 'XI A',
    download: printBtn,
    more: moreBtn,
    amount: 47000
  },
  {
    id: 1233582,
    name: 'Olamide Ogunleye',
    class: 'XI B',
    download: printBtn,
    more: moreBtn,
    amount: 48000
  },
  {
    id: 1233583,
    name: 'Chinonso Udo',
    class: 'XI C',
    download: printBtn,
    more: moreBtn,
    amount: 50000
  },
  {
    id: 1233584,
    name: 'Abigail Nwankwo',
    class: 'XII A',
    download: printBtn,
    more: moreBtn,
    amount: 52000
  },
  {
    id: 1233585,
    name: 'Nkechi Okechukwu',
    class: 'XII B',
    download: printBtn,
    more: moreBtn,
    amount: 49000
  },
  {
    id: 1233586,
    name: 'Emmanuella Akinola',
    class: 'XII C',
    download: printBtn,
    more: moreBtn,
    amount: 53000
  },
  {
    id: 1233587,
    name: 'Chigozie Onuorah',
    class: 'XII A',
    download: printBtn,
    more: moreBtn,
    amount: 51000
  },
  {
    id: 1233588,
    name: 'Tolu Adeyemi',
    class: 'XII B',
    download: printBtn,
    more: moreBtn,
    amount: 48000
  },
  {
    id: 1233589,
    name: 'Chisom Okwuosa',
    class: 'XII C',
    download: printBtn,
    more: moreBtn,
    amount: 46000
  }
];



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

.hide-scrollbar{
  @apply overflow-auto;
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

</style>
