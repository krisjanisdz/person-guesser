<template>
    <div class="flex h-screen justify-center items-center bg-gray-100">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Latvian People Guesser</h1>
        <p class="text-lg text-gray-600 mb-6">Click the button to guess a famous Latvian person!</p>
        <button
          @click="getRandomPerson"
          class="btn btn-primary px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Get a Random Person
        </button>
  
        <div v-if="person" class="mt-6">
          <h2 class="text-xl font-semibold text-gray-800">{{ person.name + ' ' + person.surname }}</h2>
          <p class="text-gray-700 mt-4">{{ person.description }}</p>
        </div>

        <div class="text-center mt-6">
            <router-link to="/hello" class="btn btn-secondary px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">Go to Hello World Page</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        person: null,
      };
    },
    methods: {
      async getRandomPerson() {
        try {
          const response = await axios.get('http://localhost:3001/api/people/random');
          this.person = response.data;
        } catch (error) {
          console.error('Error fetching random person:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles, if needed */
  </style>
  