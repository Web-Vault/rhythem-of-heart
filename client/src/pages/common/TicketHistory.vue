<template>
  <div class="p-8 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Ticket History</h2>
    <div class="space-y-4">
      <div v-for="n in 2" :key="n" class="bg-white rounded shadow p-6 flex justify-between items-center">
        <div>
          <div class="font-semibold text-gray-700">Event {{ n }}</div>
          <div class="text-sm text-gray-500">Date: 2024-06-0{{ n }}</div>
        </div>
        <div class="text-blue-700 font-bold">Booked</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 