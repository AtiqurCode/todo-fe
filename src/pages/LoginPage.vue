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
      <q-form @submit="onLogin" @reset="onReset" class="q-gutter-md">
        <q-card-sectio>
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
        New to our dOtO App?
        <q-btn flat dense color="primary" @click="$router.push('/app/signup')">
          signup
        </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { validateEmail } from "src/validationServices";
import { Api } from "src/Api";
import { on } from "events";
const $q = useQuasar();

export default {
  data() {
    return {
      email: ref(""),
      password: ref(""),
      isPwd: true,
    };
  },
  computed: {
    loginData() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    validateEmail,
    async onLogin() {
      console.log(this.loginData);

      login = await Api.post("/login", this.loginData)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("auth_user_data", JSON.stringify(res.data));
          this.$router.push("/tasks");
        })
        .catch((err) => {
          console.log(err);
          this.errorDialog(err);
        });
    },
    errorDialog(err) {
      console.log(err.response.data.errors.email[0]);
      this.$q
        .dialog({
          title: "Error",
          message: err.response.data.errors.email[0],
          color: "negative",
          buttons: [
            {
              label: "OK",
              color: "negative",
              handler: () => {
                console.log("OK");
              },
            },
          ],
        })
        .onOk(() => {
          console.log("OK");
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
