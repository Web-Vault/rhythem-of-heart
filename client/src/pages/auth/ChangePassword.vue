<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <form>
        <input type="password" placeholder="New Password" class="w-full mb-4 px-3 py-2 border rounded" />
        <input type="password" placeholder="Confirm Password" class="w-full mb-4 px-3 py-2 border rounded" />
        <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold">Change Password</button>
      </form>
      <div class="mt-4 text-sm text-center">
        <router-link to="/login" class="text-blue-600 hover:underline">Back to Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 