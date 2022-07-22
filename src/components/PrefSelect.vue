<template>
  <div class="div-header">
    <p>都道府県</p>
  </div>
  <div class="select">
    <div v-for="(pref, i) in prefData" :key="i">
      <input
        :id="'pref' + i"
        type="checkbox"
        :value="pref.prefCode"
        v-model="selectedPrefs"
        v-on:change="getPopulation()"
      />
      <label :for="'pref' + i">{{ pref.prefName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "../plugins/axios";

const API_URL = "https://opendata.resas-portal.go.jp/";

interface PrefData {
  result: {
    prefCode: number;
    prefName: string;
  };
}

interface PopulationData {
  boundaryYear: number;
  data: {
    label: string;
    data: [];
  };
}

let prefData: PrefData;
let populationData: PopulationData[] = [];

export default defineComponent({
  name: "PrefSelect",
  data() {
    return {
      prefData: prefData,
      selectedPrefs: [],
      populationData: populationData,
    };
  },
  created() {
    this.getPrefs();
  },
  methods: {
    getPrefs(): PrefData {
      axios
        .get(`${API_URL}api/v1/prefectures`)
        .then((response) => {
          this.prefData = Object.assign(
            {},
            this.prefData,
            response.data.result
          );
        })
        .catch((e) => {
          console.error(e);
        });

      return this.prefData;
    },
    getPopulation() {
      var data: PopulationData;
      this.selectedPrefs.forEach((prefCode) => {
        console.log(prefCode);
        axios
          .get(`${API_URL}api/v1/population/composition/perYear`, {
            params: {
              prefCode: prefCode,
              cityCode: "-",
            },
          })
          .then((response) => {
            this.populationData[prefCode] = Object.assign(
              {},
              data,
              response.data.result
            );
          })
          .catch((e) => {
            console.error(e);
          });
      });
      console.log(this.populationData);
    },
    testFunc() {
      console.log(this.selectedPrefs);
    },
  },
});
</script>
