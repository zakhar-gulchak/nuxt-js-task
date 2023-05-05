<template>
    <span class="inline-block rounded-md p-2" :style="`background-color: #${color || 'ddd'};`">
    {{ name }}
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    color: {
      type: String,
    }
  },
}
</script>

<style></style>
