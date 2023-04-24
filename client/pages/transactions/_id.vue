<template>
  <div>
    Details Page {{ id }}
  </div>
</template>

<script>
export default {
  async asyncData({ params: { id } }) {
    return { id }
  }
}
</script>

<style></style>
