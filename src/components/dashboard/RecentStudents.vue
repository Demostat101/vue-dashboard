<script setup lang="ts" >
  
import emailIcon from '../../assets/email.svg'

const studentsData = [
  {
    id: 1233554,
    name: 'Julius Aghaowa',
    class: 'VII A',

    amount: 50000,
  },
  {
    id: 1233555,
    name: 'Amara Nwachukwu',
    class: 'VII B',

    amount: 45000,
  },
  {
    id: 1233556,
    name: 'Chuka Eze',
    class: 'VII C',

    amount: 38000,
  },
  {
    id: 1233557,
    name: 'Ngozi Okafor',
    class: 'VII A',

    amount: 42000,
  },
  {
    id: 1233558,
    name: 'Emeka Oji',
    class: 'VII B',

    amount: 51000,
  },
  {
    id: 1233559,
    name: 'Chinedu Onyekachi',
    class: 'VII C',

    amount: 47000,
  },
  {
    id: 1233560,
    name: 'Ngozi Obasi',
    class: 'VIII A',

    amount: 53000,
  },
  {
    id: 1233561,
    name: 'Ifeoma Eze',
    class: 'VIII B',

    amount: 49000,
  },
  {
    id: 1233562,
    name: 'Chinonso Opara',
    class: 'VIII C',
  },
  {
    id: 1233563,
    name: 'Onyeka Umeh',
    class: 'VIII A',

    amount: 47000,
  },
  {
    id: 1233564,
    name: 'Ugochukwu Okoro',
    class: 'VIII B',

    amount: 49000,
  },
  {
    id: 1233565,
    name: 'Chidinma Ifeanyi',
    class: 'VIII C',

    amount: 52000,
  },
  {
    id: 1233566,
    name: 'Ifeanyi Nwachukwu',
    class: 'IX A',

    amount: 54000,
  },
  {
    id: 1233567,
    name: 'Nneka Obi',
    class: 'IX B',

    amount: 55000,
  },
  {
    id: 1233568,
    name: 'Olumide Adebayo',
    class: 'IX C',

    amount: 48000,
  },
  {
    id: 1233569,
    name: 'Oluchi Obinna',
    class: 'IX A',

    amount: 49000,
  },
  {
    id: 1233570,
    name: 'Chukwuemeka Chinedu',
    class: 'IX B',

    amount: 51000,
  },
  {
    id: 1233571,
    name: 'Adaobi Ijeoma',
    class: 'IX C',

    amount: 45000,
  },
  {
    id: 1233572,
    name: 'Emmanuel Udo',
    class: 'X A',
  },
  {
    id: 1233573,
    name: 'Chinonso Akpan',
    class: 'X B',

    amount: 43000,
  },
  {
    id: 1233574,
    name: 'Ifeoma Chukwu',
    class: 'X C',

    amount: 52000,
  },
  {
    id: 1233575,
    name: 'Jemima Okeke',
    class: 'X A',

    amount: 54000,
  },
  {
    id: 1233576,
    name: 'Chibuzor Okwuosa',
    class: 'X B',

    amount: 55000,
  },
  {
    id: 1233577,
    name: 'Umaru Adamu',
    class: 'X C',

    amount: 47000,
  },
  {
    id: 1233578,
    name: 'Chike Uche',
    class: 'XI A',

    amount: 49000,
  },
  {
    id: 1233579,
    name: 'Oluwaseun Adedeji',
    class: 'XI B',

    amount: 50000,
  },
  {
    id: 1233580,
    name: 'Chidera Ajayi',
    class: 'XI C',

    amount: 53000,
  },
  {
    id: 1233581,
    name: 'Nnena Ogbodo',
    class: 'XI A',

    amount: 47000,
  },
  {
    id: 1233582,
    name: 'Olamide Ogunleye',
    class: 'XI B',

    amount: 48000,
  },
  {
    id: 1233583,
    name: 'Chinonso Udo',
    class: 'XI C',

    amount: 50000,
  },
  {
    id: 1233584,
    name: 'Abigail Nwankwo',
    class: 'XII A',

    amount: 52000,
  },
  {
    id: 1233585,
    name: 'Nkechi Okechukwu',
    class: 'XII B',

    amount: 49000,
  },
  {
    id: 1233586,
    name: 'Emmanuella Akinola',
    class: 'XII C',

    amount: 53000,
  },
  {
    id: 1233587,
    name: 'Chigozie Onuorah',
    class: 'XII A',

    amount: 51000,
  },
  {
    id: 1233588,
    name: 'Tolu Adeyemi',
    class: 'XII B',

    amount: 48000,
  },
  {
    id: 1233589,
    name: 'Chisom Okwuosa',
    class: 'XII C',
  },
]

const slicedData = studentsData.slice(0, 5)
</script>

<template>
  <div>

    <div class="flex flex-col gap-5">
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
