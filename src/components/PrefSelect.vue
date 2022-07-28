<template>
  <div class="div-header">
    <p>都道府県</p>
  </div>
  <div class="select">
    <div v-for="(pref, i) in prefData" :key="i">
      <input
        :id="'pref' + i"
        v-model="selectedPrefs"
        type="checkbox"
        :value="pref.prefCode"
        @change.stop="sendPrefs()"
      />
      <label :for="'pref' + i">{{ pref.prefName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "../plugins/axios";
import { PrefData, PopulationData } from "@/common/object";

const API_URL = "https://opendata.resas-portal.go.jp/";

let prefData: PrefData[];
let selectedPrefs: number[] = [];
let populationData: PopulationData[] = [];

export default defineComponent({
  name: "PrefSelect",
  data() {
    return {
      prefData: prefData,
      selectedPrefs: selectedPrefs,
      populationData: populationData,
    };
  },
  watch: {
    selectedPrefs: {
      handler: function (newData: number[]) {
        console.log("selected Pref is changed");
        console.log(newData);
      },
    },
  },
  created() {
    this.getPrefs();
  },
  emits: ["emmited-selected-prefs", "emmitedPrefsList"],
  methods: {
    getPrefs() {
      axios
        .get(`${API_URL}api/v1/prefectures`)
        .then((response) => {
          this.prefData = Object.assign(
            {},
            this.prefData,
            response.data.result
          );
          this.$emit("emmitedPrefsList", this.prefData);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    sendPrefs() {
      this.$emit("emmited-selected-prefs", this.selectedPrefs);
    },
  },
});
</script>
