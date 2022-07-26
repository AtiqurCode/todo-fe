<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6 text-center">Edit task</div>
    </q-card-section>

    <q-card-section>
      <div class="center-portion">
        <q-form ref="form" @submit="submitForm">
          <div class="q-gutter-y-md column">
            <q-input
              label="TASK TITLE"
              v-model="editTask.title"
              stack-label
              :rules="[(val) => !!val || 'field is required']"
            />

            <q-input
              label="TASK DESCRIPTION"
              v-model="editTask.description"
              stack-label
              :rules="[(val) => !!val || 'field is not required']"
            />

            <!--Date time picker input-->
            <q-input label="DUE DATE" filled v-model="editTask.duedate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="editTask.duedate"
                      mask="YYYY-MM-DD HH:mm:ss"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="editTask.duedate"
                      mask="YYYY-MM-DD HH:mm::ss"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!--task status-->

            <q-item-label caption>STATUS</q-item-label>
            <div>
              <q-btn-toggle
                v-model="editTask.status"
                spread
                no-caps
                toggle-color="purple"
                color="white"
                text-color="black"
                :options="[
                  { label: 'IN-PROGRESS', value: 'IN-PROGRESS' },
                  { label: 'DONE', value: 'DONE' },
                ]"
              />
            </div>

            <div class="row float-right q-gutter-md q-mt-md">
              <q-btn
                label="CANCEL"
                v-close-popup
                class="bg-grey-5 text-black"
              />
              <q-btn label="EDIT" class="bg-primary text-white" type="submit" />
            </div>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["editTaskValue"],

  data() {
    return {
      editTask: {
        title: this.editTaskValue.title,
        description: this.editTaskValue.title,
        duedate: this.editTaskValue.duedate,
        status: this.editTaskValue.status,
      },
    };
  },
  methods: {
    submitForm() {
      const task = this.editTask;
      console.log(task);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
