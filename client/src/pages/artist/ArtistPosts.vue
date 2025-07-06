<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">My Posts</h2>
    <div class="space-y-4">
      <div v-for="n in 2" :key="n" class="bg-white rounded shadow p-6">
        <div class="font-semibold text-purple-700 mb-2">My Post {{ n }}</div>
        <div class="text-gray-700">This is a placeholder for your post content.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 