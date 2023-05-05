<template>
  <form>
    <div class="grid gap-2 mb-6 md:grid-cols-12">
      <div class="md:col-span-6">
        <label for="search" class="block mb-2 text-xs font-light dark:text-white">Search</label>
        <input type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
      </div>
      <div class="md:col-span-2">
        <label for="bank" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">Bank</label>
        <input type="text" id="bank" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bank" required>
      </div>
      <div class="md:col-span-2">
        <label for="account" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">Account</label>
        <input type="text" id="account" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Account" required>
      </div>
      <div>
        <label for="starting_month" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">Start</label>
        <input type="text" id="starting_month" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm" required>
      </div>
      <div>
        <label for="ending_month" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">End</label>
        <input type="text" id="ending_month" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm" required>
      </div>
    </div>
  </form>
</template>

<script>
export default {}
</script>

<style></style>
