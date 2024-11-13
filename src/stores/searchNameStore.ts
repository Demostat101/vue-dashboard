
import { defineStore } from 'pinia'

export const useContextStore = defineStore({
  id:'searchName',
 state: ()=>({
  searchName:""
 })
})
