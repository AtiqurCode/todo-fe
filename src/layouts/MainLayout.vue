<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>dOtO App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="800"
    >
      <q-scroll-area
        style="
          height: calc(100% - 170px);
          margin-top: 170px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/tasks" exact>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Todos List</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/important" exact>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>Important </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/complete" exact>
            <q-item-section avatar>
              <q-icon name="done" />
            </q-item-section>

            <q-item-section>Completed </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="setting" exact>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/logout">
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>

            <q-item-section>Log-Out </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="userInfo.profile_photo_url" />
          </q-avatar>
          <div class="text-weight-bold">{{ userInfo.name }}</div>
          <div>@atiqurTodo</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MyLayout",
  data() {
    return {
      userInfo: "",
    };
  },
  drawerOpened: {
    get() {
      return this.drawerState;
    },
    set(val) {
      this.$emit("update:drawerState", val);
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
  mounted() {
    let user = localStorage.getItem("auth_user_data");
    if (!user) {
      this.$router.push("/app/login");
    }
    this.authUserData();
  },
  methods: {
    authUserData() {
      const userPrfile = JSON.parse(localStorage.getItem("auth_user_data"));
      this.userInfo = userPrfile.user_info;
    },
  },
};
</script>
