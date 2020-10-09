<template>
  <v-footer
    absolute
    class="font-weight-medium"
    app
  >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Your company</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

</style>