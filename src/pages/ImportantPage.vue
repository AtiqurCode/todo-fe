<template>
  <q-page class="q-pa-md" style="background-color: #ffebee">
    <q-card-section>
      <div class="text-h6 text-center">Add new task</div>
    </q-card-section>

    <q-form ref="form" @submit="submitForm" class="q-pb-md">
      <q-input bottom-slots v-model="title" label="Task Title" counter>
        <template v-slot:append>
          <q-icon
            v-if="title !== ''"
            name="close"
            @click="title = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> Field hint </template>
        <q-btn round dense flat icon="send" type="submit" />
        <template v-slot:after> </template>
      </q-input>
    </q-form>

    <q-list separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.status = !task.status"
        :class="task.status != 'DONE' ? 'bg-orange-1' : 'bg-green-1'"
      >
        <q-item-section side @click="updateStatus(task)">
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
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-btn
                @click="promptToEdit(task)"
                flat
                round
                dense
                color="green"
                icon="edit"
              />
            </div>
          </div>
        </q-item-section>

        <!-- <q-dialog v-model="showEditTask">
          <edit-task @close="showEditTask = false" />
        </q-dialog> -->
        <q-item-section side>
          <q-btn
            @click.stop="promptToDelete(task.id)"
            flat
            round
            dense
            color="red"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- promt for edit -->
    <q-dialog v-model="showEditTask" persistent>
      <editTask :editTaskValue="editTaskValue" @close="showEditTask = false" />
    </q-dialog>

    <div class="q-pa-lg flex flex-center elementPosition">
      <q-pagination
        v-model="currentPage"
        :max="getPageNumber"
        :boundary-numbers="false"
        outline
        @input="handlePage"
      />
    </div>

    <!-- <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div> -->

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
// Axios Api call constants
import { Api } from "src/Api";

import axios from "axios";
import { ref } from "vue";
import editTask from "components/Tasks/Modals/EditTask.vue";
import { date } from "quasar";
export default {
  data() {
    return {
      tasks: null,
      loading: true,
      errored: false,
      showAddTask: false,
      showEditTask: ref(false),
      title: ref(""),
      dense: ref(false),
      currentPage: null,
      editTaskValue: "",
      status: "",
      statusChecked: ["DONE"],
      getPageNumber: null,
    };
  },
  components: {
    addTask: "components/Tasks/Modals/AddTask.vue",
    editTask: editTask,
  },
  mounted() {
    this.apiCall();
  },
  methods: {
    apiCall(page = 1) {
      Api.get("/todo?page=" + page)
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
        .finally(() => (this.loading = false));
    },
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "⚠️ Warning !!!",
          message: "Are you sure you want to delete this task",
          ok: {
            label: "yes",
            push: true,
            flat: true,
            color: "red",
          },
          cancel: {
            flat: true,
            label: "no",
            push: true,
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      Api.delete("/todo/" + id)
        .then((response) => {
          console.log(response);
          this.apiCall();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      const task = {
        title: this.title,
      };
      Api.post("/todo", task)
        .then((response) => {
          console.log(response);
          this.tasks.push(response.data.data);
          this.title = ref("");
          this.apiCall();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    promptToEdit(task) {
      this.showEditTask = true;
      // then number will be the number
      return (this.editTaskValue = task);
      // console.log(task);
    },

    updateStatus(task) {
      const todo = { ...task };
      if (task.status == "DONE") {
        todo.status = "IN-PROGRESS";
      } else {
        todo.status = "DONE";
        todo.completedat = date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss");
      }
      Api.put("/todo/" + task.id, todo)
        .then((response) => {
          console.log(response);
          this.apiCall();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  handlePage(page) {
    console.log(page);
  },
};
</script>
