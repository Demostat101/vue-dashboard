<template>
  <div
    class="avatar"
    :style="{
      width: size + 'px',
      height: size + 'px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: backgroundColor,
      overflow: 'hidden'
    }"
  >
    <component :is="svgIcon" v-if="svgIcon" :style="{ width: '80%', height: '80%' }"/>
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  name: string;
  size?: number; // Optional
  svgIcon?: unknown; // To accept the imported SVG component
}>();
const arrayColor = ['#4D44B5', '#FB7D5B', '#FCC43E', '#303972'];

const backgroundColor = ref(arrayColor[Math.floor(Math.random() * arrayColor.length)]);
 // Random color
const size = props.size || 70;

// Generate initials from the name
const getInitials = (name: string) => {
  const nameArray = name.split(' ');
  const initials = nameArray.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join('');
};

const initials = getInitials(props.name);
</script>

<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white; /* Default text color */
  padding: 5px;
}
</style>
