<template>
  <div class="bg-white">
    <!-- Custom Previous and Next buttons -->
    <div class="pagination-controls flex">
      <v-btn
        @click="goToPreviousPage"
        :disabled="currentPageIndex <= 1"
        outlined
        class="my-prev-btn"
      >
        <component :is="preBtn"/>
      </v-btn>

      <!-- Vuetify pagination -->
      <v-pagination
        v-model="currentPageIndex"
        :length="totalPages"
        :total-visible="5"
      />

      <v-btn
        @click="goToNextPage"
        :disabled="currentPageIndex >= totalPages"
        outlined
        class="my-next-btn"
      >
        <component :is="nxtBtn"/>
      </v-btn>
    </div>

    <!-- Your data rendering logic here -->
    <div v-for="driver in slicedData" :key="driver.id">
      <p>{{ driver.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { VPagination, VBtn } from 'vuetify/components';
import preBtn from "../../assets/prev.svg"
import nxtBtn from "../../assets/next.svg"

const dummyAssignedDrivers = [
{
    id: 1,
    name: "Julius Aghaowa",
    email: "adaobi.nwankwo@example.com",
    score: 80,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 2,
    name: "Ten Hag",
    email: "john.doe@example.com",
    score: 10,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 3,
    name: "Stanley Donatus",
    email: "jane.doe@example.com",
    score: 60,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 4,
    name: "Stephen James",
    email: "alice.james@example.com",
    score: 70,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 5,
    name: "Steve James",
    email: "bob.smith@example.com",
    score: 44,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 6,
    name: "Alice Johnson",
    email: "charlie.brown@example.com",
    score: 92,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 7,
    name: "Emma Watson",
    email: "emma.watson@example.com",
    score: 85,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 8,
    name: "Robert Downey",
    email: "robert.downey@example.com",
    score: 90,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 9,
    name: "Chris Evans",
    email: "chris.evans@example.com",
    score: 75,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 10,
    name: "Scarlett Johansson",
    email: "scarlett.j@example.com",
    score: 88,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 11,
    name: "Tom Holland",
    email: "tom.holland@example.com",
    score: 80,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 12,
    name: "Chris Hemsworth",
    email: "chris.hemsworth@example.com",
    score: 72,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 13,
    name: "Natalie Portman",
    email: "natalie.portman@example.com",
    score: 94,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 14,
    name: "Benedict Cumberbatch",
    email: "benedict.c@example.com",
    score: 77,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 15,
    name: "Hugh Jackman",
    email: "hugh.jackman@example.com",
    score: 70,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 16,
    name: "Leonardo DiCaprio",
    email: "leonardo@example.com",
    score: 95,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 17,
    name: "Meryl Streep",
    email: "meryl@example.com",
    score: 82,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 18,
    name: "Denzel Washington",
    email: "denzel@example.com",
    score: 89,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 19,
    name: "Matthew McConaughey",
    email: "matthew@example.com",
    score: 68,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 20,
    name: "Jennifer Lawrence",
    email: "jennifer@example.com",
    score: 91,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 21,
    name: "Ryan Reynolds",
    email: "ryan@example.com",
    score: 76,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 22,
    name: "Emma Stone",
    email: "emma.stone@example.com",
    score: 83,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 23,
    name: "Will Smith",
    email: "will@example.com",
    score: 67,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 24,
    name: "Zoe Saldana",
    email: "zoe@example.com",
    score: 90,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 25,
    name: "Margot Robbie",
    email: "margot@example.com",
    score: 78,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 26,
    name: "Jason Momoa",
    email: "jason@example.com",
    score: 71,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 27,
    name: "Henry Cavill",
    email: "henry@example.com",
    score: 88,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 28,
    name: "Gal Gadot",
    email: "gal@example.com",
    score: 85,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 29,
    name: "Tom Hardy",
    email: "tom.hardy@example.com",
    score: 73,
    status: "Failed",
    date: "15 July 2024, 09:45 AM",
  },
  {
    id: 30,
    name: "Natalie Dormer",
    email: "natalie.d@example.com",
    score: 91,
    status: "pass",
    date: "15 July 2024, 09:45 AM",
  },
 ];

const initialRowLength = ref(5);
const currentPageIndex = ref(1);

const totalPages = computed(() => Math.ceil(dummyAssignedDrivers.length / initialRowLength.value));

const slicedData = computed(() => {
  const start = (currentPageIndex.value - 1) * initialRowLength.value;
  const end = start + initialRowLength.value;
  return dummyAssignedDrivers.slice(start, end);
});

// Method to go to the previous page
const goToPreviousPage = () => {
  if (currentPageIndex.value > 1) {
    currentPageIndex.value--;
  }
};

// Method to go to the next page
const goToNextPage = () => {
  if (currentPageIndex.value < totalPages.value) {
    currentPageIndex.value++;
  }
};
</script>

<!-- Move styles to global scope -->
<style>
/* Default button styling for pagination */
.v-pagination .v-btn {
  border-radius: 50%; /* Border radius to make buttons rounded */
  background-color: #FFFFFF !important; /* White background */
  border: 2px solid #A098AE !important; /* Grey border */
  width: 51px;
  height: 51px;
  color: #A098AE;
}

/* Active page button styling */
.v-pagination__item--is-active .v-btn {
  background-color:#4D44B5 !important; /* Blue background for active page */
  color: white !important; /* White text for active page */

}

.v-pagination__next, .v-pagination__prev {
  display: none;
}

.v-pagination__item--is-active .v-btn:hover {
  background-color: #7167e0 !important;
}

.my-next-btn {
  background-color: white !important;
  border: none;
  color: #A098AE !important;
  outline: none;
  box-shadow: none;
  transition: background-color 0.3s ease;
  border-radius: 50%;
}


.v-btn{
  border: none;
}

</style>
