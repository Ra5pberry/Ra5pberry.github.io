<template>
  <div id="app" class="wrapper">
    <div class="app-header">
      <HeaderComponent />
    </div>
    <div class="select">
      <PrefSelect @emmited-selected-prefs="receivedSelectedPrefs = $event" />
    </div>
    <div class="update-btn">
      <a class="update-btn" @click="getPopulation">更新</a>
    </div>
    <div class="graph">
      <PopulationGraph ref="graph" :selected-population-data="populationData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrefSelect from "./components/PrefSelect.vue";
import PopulationGraph from "./components/PopulationGraph.vue";
import HeaderComponent from "./components/common/HeaderComponent.vue";

import axios from "./plugins/axios";

import { GraphData, ChartDataSet } from "@/common/object";

const API_URL = "https://opendata.resas-portal.go.jp/";

export default defineComponent({
  name: "App",
  components: {
    PrefSelect,
    PopulationGraph,
    HeaderComponent,
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

div.update-btn {
  width: 100%;
  cursor: pointer;
  padding: 0;
}

a.update-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1em 2em;
  width: 300px;
  color: aliceblue;
  font-size: 18px;
  font-weight: 700;
  background-color: darkcyan;
  border-radius: 50vh;
}

.update-btn a::after {
  content: "";
  width: 5px;
  height: 5px;
  border-top: 3px solid aliceblue;
  border-right: 3px solid aliceblue;
  transform: rotate(135deg);
}

.update-btn a:hover {
  text-decoration: none;
  background-color: cadetblue;
}

.wrapper {
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
}

.select {
  display: grid;
}
</style>
