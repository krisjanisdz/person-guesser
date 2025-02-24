<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
    <h1 class="text-3xl font-bold text-blue-600">{{ msg }}</h1>
    
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Hello World Page</h1>
      <router-link to="/" class="btn btn-secondary px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">Back to Landing Page</router-link>
    </div>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>