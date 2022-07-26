<template>
  <q-page class="q-pa-md">
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
        <q-item-section side top>
          <q-checkbox
            :val="task.status"
            @click="updateStatus(task)"
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

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="5"
        :boundary-numbers="false"
        outline
        @input="handlePage"
        direction-links
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
const baseURL = "http://127.0.0.1:8000/api";

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";
import { ref } from "vue";
import editTask from "components/Tasks/Modals/EditTask.vue";
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
      const url = "http://127.0.0.1:8000/api";
      axios
        .get(url + "/todo?page=" + page)
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    promptToDelete(id) {
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        this.deleteTask(id);
      }
    },
    deleteTask(id) {
      const url = "http://127.0.0.1:8000/api";
      axios
        .delete(url + "/todo/" + id)
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
      axios
        .post("http://127.0.0.1:8000/api/todo", task)
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
      const changeStatus = {
        status: "",
      };
      if (task.status == "DONE") {
        changeStatus.status = "IN-PROGRESS";
      } else {
        changeStatus.status = "DONE";
      }
      Api.put("/todo/" + task.id, changeStatus)
        .then((response) => {
          console.log(response);
          this.apiCall();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
