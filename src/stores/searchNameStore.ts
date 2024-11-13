
import { defineStore } from 'pinia'

export const useContextStore = defineStore({
  id:'name',
 state: ()=>({
  searchTeacher:"",
  searchStudent:""
 })
})
