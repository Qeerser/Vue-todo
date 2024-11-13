<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useRoute, RouterLink } from 'vue-router'

const todoStore = useTodoStore()
const addText = ref('')
const isLoaded = ref(false)
const route = useRoute()
const todoId = ref(-1)
const todoData = reactive({
    name:'',
    status:''
})
onMounted(async () => {
    todoId.value = parseInt(route.params.id)
    await todoStore.loadTodo(todoId.value)
    todoData.name = todoStore.selectedTodo.name
    todoData.status = todoStore.selectedTodo.status
    isLoaded.value = true
})

const editTodo = async () => {
  await todoStore.editTodo(todoData, todoId.value)
  alert('update completed')
}

</script>

<template>
    <RouterLink :to="{ name: 'home' }">
      Back
    </RouterLink>

Edit Screen<br>
<div v-if="isLoaded">

    name: <input type="text" v-model="todoData.name"> <br>
   
      status: 
      <select v-model="todoData.status" >
            <option v-for="status in todoStore.statuses"
              :key="status"
              :value="status"
              >
              {{ status }}
            </option>
          </select><br>
          <button class="btn" @click="editTodo()">Submit</button>
</div>
<div v-else>
Loading
</div>

</template>
