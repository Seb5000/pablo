<script setup>
import { ref, onMounted, computed } from "vue";
const testVar = ref(0);
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <h3>Prueba</h3>
  <input type="text" v-model="testVar" />
</template>
