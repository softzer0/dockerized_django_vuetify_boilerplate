<template>
  <v-text-field
    :type="showPassword ? 'text' : 'password'"
    :label="label"
    v-bind="$attrs"
    v-on="$listeners"
    prepend-icon="mdi-lock-outline"
    :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
    @click:append="showPassword = !showPassword"
    :rules="rules"
    validate-on-blur
  />
</template>

<script>
export default {
    name: 'PasswordField',
    props: {
        label: {
            type: String,
            default: ''
        },
        rules: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            showPassword: false
        }
    }
}
</script>

<style scoped>

</style>