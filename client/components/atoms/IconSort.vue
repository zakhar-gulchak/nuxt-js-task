<template>
  <span class="inline-block">
    <ArrowSortDown v-if="direction==='asc'" />
    <ArrowSortUp v-else />
  </span>
</template>

<script>
import ArrowSortDown from '@/components/atoms/ArrowSortDown.vue';
import ArrowSortUp from '@/components/atoms/ArrowSortUp.vue';

export default {
  components: {
    ArrowSortDown,
    ArrowSortUp
  },
  props: {
    direction: {
      type: String,
      required: true,
    }
  }
}
</script>
