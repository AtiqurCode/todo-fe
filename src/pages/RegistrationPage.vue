<template>
  <q-page padding>
    <q-card class="q-mx-auto q-mt-lg" style="max-width: 400px" square flat>
      <q-card-section class="q-pt-lg">
        <q-img
          src="~assets/quasar-logo-vertical.svg"
          spinner-color="primary"
          contain
          style="max-height: 70px; max-width: 100%"
        />
      </q-card-section>
      <q-form @submit="onRegistration" @reset="onReset" class="q-gutter-md">
        <q-card-sectio>
          <q-input
            v-model.trim="name"
            label="Name"
            placeholder="Anna"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            v-model.trim="email"
            label="Email"
            placeholder="login@example.com"
            type="email"
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => validateEmail(val) || 'Type a valid Email',
            ]"
          />
          <q-input
            v-model.trim="password"
            label="Password"
            placeholder="Password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => val.length >= 6 || 'Minimum length 6',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model.trim="password_confirmation"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            :rules="[(val) => val === password || 'Password doesn\'t match']"
          />
        </q-card-sectio>

        <q-card-actions align="right" class="q-px-md">
          <q-btn
            class="q-px-md"
            label="Register"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>

      <q-separator inset />

      <q-card-section>
        Already Registered?
        <q-btn flat dense color="primary" @click="$router.push('/app/login')">
          Login
        </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { Api } from "src/Api";
import { validateEmail } from "src/validationServices";
const $q = useQuasar();

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      isPwd: true,
      loading: false,
    };
  },
  computed: {
    UserData() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
    },
  },

  methods: {
    validateEmail,
    async onRegistration() {
      registration = Api.post("/register", this.UserData)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("auth_user_data", JSON.stringify(response.data));
          this.$router.push("/tasks");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    let user = localStorage.getItem("auth_user_data");
    if (user) {
      this.$router.push("/tasks");
    }
  },
};
</script>
