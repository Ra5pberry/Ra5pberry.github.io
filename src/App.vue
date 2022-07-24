<template>
  <div id="app">
    <PrefSelect ref="pref-select" v-on:receive="sendData" />
    <PopulationGraph :graphData="selectedData" />
  </div>
</template>

<script lang="ts">
import PrefSelect from "./components/PrefSelect.vue";
import PopulationGraph from "./components/PopulationGraph.vue";
import { defineComponent } from "vue";
import { PopulationData } from "./common/object";

export default defineComponent({
  name: "app",
  data() {
    return {
      selectedData: [
        {
          boundaryYear: 9999,
          data: {
            label: "label",
            data: [
              {
                year: 9999,
                value: 9999,
              },
            ],
          },
        },
      ],
    };
  },
  components: {
    PrefSelect,
    PopulationGraph,
  },
  prop: ["chartData"],
  methods: {
    sendData(val: PopulationData[]) {
      console.log("sending");
      this.selectedData = val;
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
