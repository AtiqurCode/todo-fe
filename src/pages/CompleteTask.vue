<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-badge color="secondary" multi-line> Model: "{{ model }}" </q-badge>

      <q-select
        filled
        v-model="model"
        :options="options"
        label="Standard"
        emit-value
        map-options
      />

      <q-btn color="primary" @click="showTextLoading"> Show it </q-btn>

      <q-card class="bg-grey-3 relative-position card-example">
        <q-card-section class="q-pb-none">
          <div class="text-h6">Lorem Ipsum</div>
        </q-card-section>

        <q-card-section>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div v-show="showSimulatedReturnData">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel magna eu risus laoreet tristique. Nulla ut fermentum elit, nec
              consequat augue. Morbi et dolor nec metus tincidunt pellentesque.
              Nullam non semper ante. Fusce pellentesque sagittis felis quis
              porta. Aenean condimentum neque sed erat suscipit malesuada. Nulla
              eget rhoncus enim. Duis dictum interdum eros.
            </div>
          </transition>
        </q-card-section>

        <q-inner-loading
          :showing="visible"
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-card>
    </div>

    <div class="q-gutter-sm q-py-sm">
      <q-radio v-model="shape" val="line" label="Line" />
      <q-radio v-model="shape" val="rectangle" label="Rextangle" />
      <q-radio v-model="shape" val="ellipse" label="Ellipse" />
      <q-radio v-model="shape" val="polygon" label="Polygon" />
    </div>

    <div class="q-px-sm">Your selection is: {{ shape }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);

    return {
      visible,
      showSimulatedReturnData,
      model: ref(null),
      shape: ref("line"),

      showTextLoading() {
        visible.value = true;
        showSimulatedReturnData.value = false;
        setTimeout(() => {
          visible.value = false;
          showSimulatedReturnData.value = true;
        }, 2000);
      },

      options: [
        {
          label: "Google",
          value: "goog",
        },
        {
          label: "Facebook",
          value: "fb",
        },
        {
          label: "Twitter",
          value: "twt",
        },
        {
          label: "Apple",
          value: "app",
        },
        {
          label: "Oracle",
          value: "ora",
          disable: true,
        },
      ],
      // console.log(this.$api_url);
    };
  },
};
</script>

<style lang="sass" scoped>
.card-example
  width: 288px
  height: 290px
</style>
