<template>
  <div>
    <label class="block mb-2 text-xs font-light text-gray-900 dark:text-white">{{label}}</label>
    <button type="button" ref="button"
            :class="`text-left flex justify-between whitespace-nowrap bg-gray-50 border text-sm
             focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
             ${disabled ? 'cursor-not-allowed text-gray-200 border-gray-100' : 'cursor-pointer text-gray-400 border-gray-300'}`"
      @click="toggleDropdown()">
      <span class="w-5/6 overflow-hidden text-ellipsis">
      {{ selectedValue || placeholder }}
      </span>
      <ArrowDown />
    </button>
    <div :class="`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${isDropdownVisible ? '' : 'hidden'}`">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li v-if="values.length" class="cursor-pointer" @click="select({ id: null, [fieldName]: '' })">
          <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</span>
        </li>
        <li v-for="value in values" class="cursor-pointer" @click="select(value)">
          <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{value[fieldName]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, ref, computed } from 'vue';
import ArrowDown from '@/components/atoms/ArrowDown.vue';

export default defineComponent({
  components: { ArrowDown },
  props: {
    label: { type: String, required: true },
    values: { type: Array, required: true },
    fieldName: { type: String, required: true },
    placeholder: String,
    selectedValueExt: String,
    onSelect: { type: Function, required: true }
  },
  setup(props) {
    const isDropdownVisible = ref(false);
    const selectedValue = ref('');
    const disabled = computed(() => !Boolean(props.values.length));
    onBeforeUnmount(function() { document.removeEventListener('click', this.closeDropdownListener) });

    return { isDropdownVisible, selectedValue, disabled };
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownListener);
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isDropdownVisible = !this.isDropdownVisible;
      }
    },
    select(value) {
      this.onSelect(value.id);
      this.selectedValue = value[this.fieldName];
      this.isDropdownVisible = false;
    },
    closeDropdownListener(event)  {
      if(event.target !== this.$refs.button && !this.$refs.button?.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    },
  },
  watch: {
    selectedValueExt(id) {
      const value = id ? this.values.find(value => value.id === id)[this.fieldName] : '';
      if (value !== this.selectedValue) {
        this.selectedValue = value;
      }
    }
  }
})
</script>
