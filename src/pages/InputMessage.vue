<template>
  <q-page padding>
    <div v-for="item in tasks" :key="item">
      <div>{{ item.name }}</div>
      <div>{{ item.dueDate }} @ {{ item.dueTime }}</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          name: "Go to shop",
          dueDate: "2019/05/12",
          dueTime: "18:30",
        },
        {
          name: "Get Bananas",
          dueDate: "2019/05/13",
          dueTime: "18:30",
        },
        {
          name: "Get apples",
          dueDate: "2019/05/14",
          dueTime: "18:30",
        },
      ],
    };
  },
  // methods: {
  //   deleteTask(index) {
  //     this.tasks.splice(index, 1);
  //   },
  // },
};
</script>
