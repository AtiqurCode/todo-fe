const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/TaskList.vue"),
        name: "tasks",
      },
      {
        path: "/pintodos",
        component: () => import("pages/InputMessage.vue"),
        name: "Pin Tasks",
      },
      {
        path: "/complete",
        component: () => import("pages/CompleteTask.vue"),
        name: "Complete",
      },
      {
        path: "/setting",
        component: () => import("pages/SettingsPage.vue"),
        name: "Settings",
      },
    ],

    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/meeting-invites",
    component: () => import("pages/MeetingInvite.vue"),
    name: "Meeting",
  },
  // {
  //   path: "/index",
  //   component: () => import("pages/TaskList.vue"),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
