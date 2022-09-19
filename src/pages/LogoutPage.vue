<template>
  <div>He I am Log Out</div>
</template>

<script>
export default {
  name: "LogoutPage",
  data() {
    return {};
  },
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      localStorage.removeItem("auth_user_data");
      this.$router.push("/app/login");
    },
  },
};
</script>
