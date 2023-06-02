<template>
  <form>
    <div class="grid gap-2 mb-6 md:grid-cols-12">
      <div class="md:col-span-6">
        <label for="search" class="block mb-2 text-xs font-light dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" id="search"
                 :value="searchText"
                 @input="onSearchTextChange"
                 class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
        </div>
      </div>
      <div class="md:col-span-2">
        <Dropdown label="Bank" :values="banks" :selected-value-ext="selectedBankId" field-name="name" placeholder="No filter applied" :on-select="(val) => filtersChange('bankId', val)"/>
      </div>
      <div class="md:col-span-2">
        <Dropdown label="Account" :values="accounts" :selected-value-ext="selectedAccountId" field-name="name" placeholder="No filter applied" :on-select="(val) => filtersChange('accountId', val)"/>
      </div>
      <div>
        <label for="starting_month" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">Start</label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <input type="text"
                 pattern="\d{1,2}/\d{1,2}/\d{4}"
                 id="starting_month"
                 @keyup.enter="filtersChange('dateFrom', $event.target.value)"
                 class="pr-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm">
        </div>
      </div>
      <div>
        <label for="ending_month" class="block mb-2 text-xs font-light text-gray-900 dark:text-white">End</label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <input type="text"
                 pattern="\d{1,2}/\d{1,2}/\d{4}"
                 id="ending_month"
                 @keyup.enter="filtersChange('dateTo', $event.target.value)"
                 class="pr-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Dropdown from '@/components/atoms/Dropdown.vue';

export default defineComponent({
  props: {
    accounts: { type: Array, required: true },
    banks: { type: Array, required: true },
    filtersChange: { type: Function, required: true },
    resetAccountLabel: { type: Boolean, required: true },
    selectedAccountId: String,
    selectedBankId: String,
  },
  components: { Dropdown },
  setup(props) {
    const searchText = ref('');

    return { searchText };
  },
  methods: {
    onSearchTextChange(event) {
      this.searchText = event.target.value
      this.filtersChange('search', this.searchText);
    },
  }
})
</script>

<style></style>
