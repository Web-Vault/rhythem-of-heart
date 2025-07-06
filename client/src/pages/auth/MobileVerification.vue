<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Mobile Verification</h2>
      <form>
        <input type="text" placeholder="Enter OTP" class="w-full mb-4 px-3 py-2 border rounded" />
        <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold">Verify Mobile</button>
      </form>
      <div class="flex justify-between mt-4 text-sm">
        <router-link to="/login" class="text-blue-600 hover:underline">Back to Login</router-link>
        <a href="#" class="text-blue-600 hover:underline">Resend OTP</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 