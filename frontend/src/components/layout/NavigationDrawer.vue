<template>
  <v-navigation-drawer permanent app clipped>
    <v-tabs
      vertical
    >
      <v-tab
        v-for="item in items"
        :key="item.name"
        :to="{ name: item.name }"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavigationDrawer',
    computed: {
        ...mapGetters({ isLoggedIn: 'user/isLoggedIn' }),
        items () {
            return [
                { name: 'Home', title: 'Home', icon: 'mdi-home' },
                ...(!this.isLoggedIn ? [
                    { name: 'Login', title: 'Login', icon: 'mdi-login' },
                    { name: 'Sign up', title: 'Sign up', icon: 'mdi-account-plus' }
                ] : []),
                ...(this.isLoggedIn ? [
                    { name: 'User', title: 'User', icon: 'mdi-account' },
                    { name: 'Logout', title: 'Logout', icon: 'mdi-logout' }
                ] : [])
            ]
        }
    }
}
</script>

<style scoped>
.v-tab {
    text-transform: none;
}
</style>