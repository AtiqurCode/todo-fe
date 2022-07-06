<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough': task.completed }">
            {{ task.title }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs" />
            </div>
            <div class="column">
              <!-- <q-item-label class="row justify-end" caption>
                {{ task.dueDate }}
              </q-item-label>
              <q-item-label class="row justify-end" caption>
                <small>{{ task.dueTime }}</small>
              </q-item-label> -->
            </div>
          </div>
        </q-item-section>
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

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tasks: null,
      loading: true,
      errored: false,
      showAddTask: false,
    };
  },
  components: {
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
  },
  mounted() {
    const url = "https://jsonplaceholder.typicode.com";
    axios
      .get(url + "/todos")
      .then((response) => {
        console.log(response.data);
        this.tasks = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    axios
      .post(url + "/todos", {
        userId: 10,
        userId: 10,
        title: "ipsam aperiam voluptates qui",
        completed: false,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(err);
      });
  },
  methods: {
    promptToDelete(id) {
      console.log(id);
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        this.deleteTask(id);
      }
    },
    deleteTask(id) {
      const url = "https://jsonplaceholder.typicode.com";
      axios
        .delete(url + "/todos/" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
