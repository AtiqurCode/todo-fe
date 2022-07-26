<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6 text-center">Add new task</div>
    </q-card-section>

    <q-card-section>
      <div class="center-portion">
        <q-form ref="form" @submit="submitForm">
          <div class="q-gutter-y-md column">
            <q-input
              label="TASK TITLE"
              v-model="title"
              stack-label
              :rules="[(val) => !!val || 'field is required']"
            />

            <q-input
              label="TASK DESCRIPTION"
              v-model="description"
              stack-label
              :rules="[(val) => !!val || 'field is not required']"
            />
            <div class="row float-right q-gutter-md q-mt-md">
              <q-btn
                label="CANCEL"
                v-close-popup
                class="bg-grey-5 text-black"
              />
              <q-btn label="ADD" class="bg-primary text-white" type="submit" />
            </div>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    submitForm() {
      const task = {
        title: this.title,
        description: this.description,
      };
      axios
        .post("http://127.0.0.1:8000/api/todo", task)
        .then(() => {
          this.$router.push("/");
          console.log(task);
        })
        .catch(() => {
          this.errored = true;
        });
      this.$emit("close");
    },
  },
};
</script>
