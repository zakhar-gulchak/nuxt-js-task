<template>
  <h1 class="text-xl font-bold py-2">
    {{ title }}
  </h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  }
}
</script>
