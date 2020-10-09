<template>
  <v-container>
    <v-card>
      <v-form @submit.prevent="submit" ref="form" id="form">
        <v-card-title class="justify-center">Sign up</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" v-for="(error, index) in errors" :key="error">
              <v-alert type="error" :class="{'mb-0': index !== errors.length - 1}">{{ error }}</v-alert>
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
              <PasswordField
                v-model="confirmPassword"
                label="Confirm password"
                :rules="[rules.required, rules.passwordsMatch]"
              />
              <v-text-field
                label="First name"
                v-model="firstName"
                prepend-icon="mdi-account-box-outline"
                :rules="[rules.required]"
                validate-on-blur
              />
              <v-text-field
                label="Last name"
                v-model="lastName"
                prepend-icon="mdi-account-box-outline"
                :rules="[rules.required]"
                validate-on-blur
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
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import PasswordField from '@/components/shared/PasswordField'

export default {
    name: 'SignUp',
    components: {
        PasswordField
    },
    data: () => ({
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        errors: []
    }),
    computed: {
        rules () { return {
            required: value => !!value || "Required.",
            email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail.",
            passwordsMatch: value => value === this.password || "Passwords must match."
        }}
    },
    methods: {
        async submit () {
            if (!this.$refs.form.validate()) {
                return
            }
            try {
                await this.$store.dispatch('user/register', {
                    email: this.email,
                    password1: this.password,
                    password2: this.confirmPassword,
                    first_name: this.firstName,
                    last_name: this.lastName
                })
                this.$router.push({ name: 'User' })
            } catch (error) {
                this.errors = Object.values(error.data).reduce((r, a) => r.concat(a))
            }
        }
    }
}
</script>

<style scoped>

</style>