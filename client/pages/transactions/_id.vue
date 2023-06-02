<template>
  <div>
    Details Page {{ id }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  async asyncData({ params: { id } }) {
    console.log(id);
    return { id }
  }
})
</script>

<style></style>
