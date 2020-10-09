<template>
  <v-container>
    <v-card>
      <v-card-title>Welcome, {{ user.firstName }}!</v-card-title>
      <v-card-text>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-account-box
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <div v-if="!edit">
                  {{ user.firstName }} {{ user.lastName }}
                  <v-btn class="ml-1" icon @click="showEdit"><v-icon>mdi-form-textbox</v-icon></v-btn>
                </div>
                <v-form v-else ref="form" id="form" @submit.prevent="update">
                  <v-row no-gutters>
                    <v-col cols="1"><v-btn class="px-1" icon @click="edit = false"><v-icon>mdi-close</v-icon></v-btn></v-col>
                    <v-col cols="5">
                      <v-text-field
                        solo
                        dense
                        class="px-1"
                        label="First name"
                        v-model="firstName"
                        :rules="[rules.required]"
                        validate-on-blur
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        solo
                        dense
                        class="px-1"
                        label="Last name"
                        v-model="lastName"
                        :rules="[rules.required]"
                        validate-on-blur
                      />
                    </v-col>
                    <v-col cols="1"><v-btn class="float-right" type="submit" form="form" icon><v-icon>mdi-check</v-icon></v-btn></v-col>
                  </v-row>
                </v-form>
              </v-list-item-title>
              <v-list-item-subtitle>Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!--v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user. }}</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item-->
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'User',
    computed: {
        ...mapGetters({user: 'user/getUserData'}),
        rules () { return {
            required: value => !!value || "Required."
        } }
    },
    data () {
        return {
            edit: false,
            firstName: null,
            lastName: null
        }
    },
    methods: {
        showEdit () {
            this.firstName = this.user.firstName
            this.lastName = this.user.lastName
            this.edit = true
        },

        async update () {
            await this.$store.dispatch('user/update_user', { first_name: this.firstName, last_name: this.lastName })
            this.edit = false
        }
    }
}
</script>

<style scoped>

</style>