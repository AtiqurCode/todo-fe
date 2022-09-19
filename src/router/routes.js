const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/DashboardPage.vue"),
        name: "dashboard",
      },
      {
        path: "/tasks",
        component: () => import("pages/TaskList.vue"),
        name: "tasks",
      },
      {
        path: "/important",
        component: () => import("pages/ImportantPage.vue"),
        name: "Important",
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
      {
        path: "/logout",
        component: () => import("pages/LogoutPage.vue"),
        name: "Logout",
      },
    ],

    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/app",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/app/signup",
        component: () => import("pages/RegistrationPage.vue"),
        name: "signup",
      },
      {
        path: "/app/login",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
      },
    ],
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
