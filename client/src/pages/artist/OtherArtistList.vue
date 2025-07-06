<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Other Artists</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white rounded shadow p-6 flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
        <div class="font-semibold text-gray-700">Artist {{ n }}</div>
        <div class="text-sm text-gray-500">Art Type</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 