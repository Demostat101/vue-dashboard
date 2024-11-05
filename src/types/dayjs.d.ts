// src/types/dayjs.d.ts

import 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import isToday from 'dayjs/plugin/isToday';

// Augment the Dayjs module to include the isToday plugin
declare module 'dayjs' {
  interface Dayjs {
    isToday(): boolean;
  }
}

// Now, you can safely use `isToday` in your code
