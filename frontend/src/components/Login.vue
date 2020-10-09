<template>
  <v-container>
    <v-card>
      <v-form @submit.prevent="login" ref="form" id="form">
        <v-card-title class="justify-center">Login</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" v-if="showError">
              <v-alert type="error">Invalid login</v-alert>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email"
                v-model="email"
                prepend-icon="mdi-email-outline"
                :rules="[rules.required, rules.email]"
                validate-on-blur
              />
              <PasswordField
                v-model="password"
                label="Password"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            form="form"
            color="success"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import PasswordField from '@/components/shared/PasswordField'

export default {
    name: 'Login',
    components: {PasswordField},
    computed: {
        rules() { return {
            required: value => !!value || "Required.",
            email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail."
        }}
    },
    data: () => ({
        email: null,
        password: null,
        showError: false,
        showPassword: false
    }),
    methods: {
        async login () {
            if (!this.$refs.form.validate()) {
                return
            }
            try {
                await this.$store.dispatch('user/login', { email: this.email, password: this.password })
                this.$router.push({ name: 'User' })
            } catch (e) {
                this.showError = true
            }
        }
    }
}
</script>

<style scoped>

</style>