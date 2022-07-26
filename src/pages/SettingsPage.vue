<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Prompt" color="primary" @click="prompt = true"></q-btn>

      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Your address</div>
          </q-card-section>

          <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="taskToSubmit.address"
                autofocus
                ref="address"
                @keyup.enter="prompt = false"
                label="Adress"
              ></q-input>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup></q-btn>
              <q-btn
                flat
                label="Add address"
                v-close-popup
                type="submit"
              ></q-btn>
            </q-card-actions>
          </form>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      taskToSubmit: {
        address: "",
      },
    };
  },
  setup() {
    return {
      prompt: ref(false),

      address: ref(""),
    };
  },
  methods: {
    submitForm() {
      console.log(this.taskToSubmit.address);
    },
  },
};
</script>
