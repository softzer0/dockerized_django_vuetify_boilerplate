<template>
  <v-app-bar
    color="deep-purple accent-4"
    dense
    dark
    clipped-left
    app
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Boilerplate project</v-toolbar-title>

    <v-spacer></v-spacer>

    <!--v-menu
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          @click="() => {}"
        >
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu-->
  </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar'
}
</script>

<style scoped>

</style>