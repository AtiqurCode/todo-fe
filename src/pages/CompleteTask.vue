<template>
  <q-page class="q-pa-sm">
    <q-card-section>
      <div class="text-h6 text-center">Recent Completed Task</div>
    </q-card-section>

    <q-list separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.status = !task.status"
        :class="task.status != 'DONE' ? 'bg-orange-1' : 'bg-green-1'"
      >
        <q-item-section side>
          <q-checkbox
            class="no-pointer-events"
            :val="task.status"
            v-model="statusChecked"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough': task.completed }">
            {{ task.title }}
          </q-item-label>
          <q-item-label style="font-size: 10px">
            {{ task.description }}
          </q-item-label>
          <q-item-label style="font-size: 10px">
            {{ task.completedat }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <!-- <q-btn
                @click="promptToEdit(task)"
                flat
                round
                dense
                color="green"
                icon="edit"
              /> -->
            </div>
          </div>
        </q-item-section>

        <!-- <q-dialog v-model="showEditTask">
          <edit-task @close="showEditTask = false" />
        </q-dialog> -->
        <q-item-section side>
          <!-- <q-btn
            @click.stop="promptToDelete(task.id)"
            flat
            round
            dense
            color="red"
            icon="delete"
          /> -->
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
const baseURL = "http://127.0.0.1:8000/api";

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";
import { ref } from "vue";

export default {
  data() {
    return {
      tasks: null,
      currentPage: null,
      getPageNumber: null,
      statusChecked: ["DONE"],
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks(page = 1) {
      Api.get("/todo?page=" + page + "&limit=10&status=DONE")
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data.data;
          this.currentPage = response.data.current_page;

          const number = response.data.total / response.data.per_page;
          this.getPageNumber = Number.isInteger(number) ? number : number + 1;

          console.log(this.currentPage, this.getPageNumber);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.card-example
  width: 288px
  height: 290px
</style>
