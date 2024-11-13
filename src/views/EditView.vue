<script setup>
import { onMounted, ref, reactive } from "vue";
import { useTodoStore } from "../stores/todo";
import { useRoute, RouterLink } from "vue-router";

const todoStore = useTodoStore();
const route = useRoute();

const isUpdated = ref(false)
const isLoaded = ref(false);

const todoId = ref(-1);
const todoData = reactive({
  name: "",
  status: "",
});
onMounted(async () => {
  todoId.value = parseInt(route.params.id);
  await todoStore.loadTodo(todoId.value);
  todoData.name = todoStore.selectedTodo.name;
  todoData.status = todoStore.selectedTodo.status;
  isLoaded.value = true;
});

const editTodo = async () => {
  isLoaded.value = false;
  await todoStore.editTodo(todoData, todoId.value);
  isLoaded.value = true;
  isUpdated.value = true
  setTimeout(() => {
      isUpdated.value = false
    }, 2000)
};
</script>

<template>
  <div class="w-1/2 mx-auto">
    <div class="flex items-center">
      <RouterLink :to="{ name: 'home' }">
        <button class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
      </RouterLink>
      <div class="ml-2 mb-2">Edit</div>
    </div>

    <div class="flex flex-col" v-if="isLoaded">
      <div class="flex gap-4">
        <div class="text-m ml-1 badge badge-accent gap-3">Item id</div>
        <span class="badge badge-primary">12</span>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Item name</span>
        </label>
        <input class="input input-bordered w-full" type="text" v-model="todoData.name">
      </div>
      <div class="form-control ">
        <label class="label badge badge-accent gap-4 my-2">
          <span class="">Status</span>
        </label>
        <select class="select select-bordered" v-model="todoData.status">
          <option
            v-for="status in todoStore.statuses"
            :key="status"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary w-full" @click="editTodo()">Update</button>
      </div>
    </div>
    <div v-else>
      <progress class="progress w-56 object-center" ></progress>
    </div>
    <div class="toast toast-top toast-start">
      <div v-show="isUpdated" class="alert alert-success">
        <span>Update successful.</span>
      </div>
    </div>
  </div>

</template>
<style scoped>
svg {
  fill: white;
}
</style>
