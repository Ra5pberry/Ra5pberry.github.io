<template>
  <div id="app">
    <PrefSelect @emmited-selected-prefs="receivedSelectedPrefs = $event" />
    <button @click="getPopulation">更新</button>
    <PopulationGraph ref="graph" :selected-population-data="populationData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PrefSelect from "./components/PrefSelect.vue";
import PopulationGraph from "./components/PopulationGraph.vue";

import axios from "./plugins/axios";

import { GraphData, ChartDataSet } from "@/common/object";

const API_URL = "https://opendata.resas-portal.go.jp/";

export default defineComponent({
  name: "App",
  components: {
    PrefSelect,
    PopulationGraph,
  },
  data() {
    return {
      receivedSelectedPrefs: [
        {
          prefCode: 0,
          prefName: "",
        },
      ],
      populationData: {
        label: "",
        data: [0],
      },
      resetFlg: false,
    };
  },
  prop: ["chartData"],
  methods: {
    async getPopulation() {
      let datasets: ChartDataSet[] = [{ label: "", data: [] }];
      datasets.pop();
      for (let pref of this.receivedSelectedPrefs) {
        var dataset = { label: "", data: [0] };
        dataset.label = pref.prefName;
        await axios
          .get(`${API_URL}api/v1/population/composition/perYear`, {
            params: {
              prefCode: pref.prefCode,
              cityCode: "-",
            },
          })
          .then((response) => {
            var dataArr: number[] = [];
            for (const [key, data] of Object.entries(response.data.result)) {
              if (Array.isArray(data)) {
                data[0].data.forEach((data: GraphData) => {
                  dataArr.push(data.value);
                });
              }
            }
            dataset.data = dataArr;
            console.log(dataset.data);
            datasets[Object.keys(datasets).length] = dataset;
          })
          .catch((e) => {
            console.error(e);
          });
      }
      this.populationData = datasets as any;
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
