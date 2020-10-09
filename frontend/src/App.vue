<template>
  <v-app>
    <AppBar/>
    <NavigationDrawer/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import AppBar from '@/components/layout/AppBar'
import Footer from '@/components/layout/Footer'
import NavigationDrawer from '@/components/layout/NavigationDrawer'

export default {
    name: 'App',
    components: {
        NavigationDrawer,
        AppBar,
        Footer
    }
}
</script>