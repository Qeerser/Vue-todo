
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://673323422a1b1a4ae1123281.mockapi.io'
export const useTodoStore = defineStore('todo', {
  state: () => ({
      todos :[],
      selectedTodo:{},
      statuses:['Pending','Doing','Done']
  }),
  actions:{
      async loadTodos (){
        try {
          const response = await axios.get(`${BASE_URL}/todos`)
          this.todos = response.data
        } catch (error) {
          console.log('error',error)
        }
      },
      async loadTodo (id){
        try {
          const response = await axios.get(`${BASE_URL}/todos/${id}`)
          this.selectedTodo = response.data
        } catch (error) {
          console.log('error',error)
        }
      },
      async addTodo(todoText){
        const bodyData = {
          name: todoText,
          status:'Pending'
        }
        try {
          const response = await axios.post(`${BASE_URL}/todos`,bodyData)
          console.log("add complete")
        } catch (error) {
          console.log('error',error)
        }
      },
      async editTodo(todoData,id){
        try {
          const response = await axios.put(`${BASE_URL}/todos/${id}`,todoData)
          console.log("edit complete")
        } catch (error) {
          console.log('error',error)
        }
      },
      async removeTodo(id){
        try {
          const response = await axios.delete(`${BASE_URL}/todos/${id}`)
          console.log("remove complete")
        } catch (error) {
          console.log('error',error)
        }
      }
  }
})
