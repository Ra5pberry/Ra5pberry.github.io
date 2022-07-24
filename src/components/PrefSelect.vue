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

let prefData: PrefData;
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
  created() {
    this.getPrefs();
  },
  watch: {
    selectedPrefs: {
      handler: function (newData: number[]) {
        this.getPopulation();
      },
    },
  },
  emit: ["receive"],
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
      this.selectedPrefs.forEach((prefCode: number) => {
        axios
          .get(`${API_URL}api/v1/population/composition/perYear`, {
            params: {
              prefCode: prefCode,
              cityCode: "-",
            },
          })
          .then((response) => {
            console.log("ajax done");
            this.populationData[prefCode] = Object.assign(
              {},
              data,
              response.data.result
            );
            Object.keys(this.populationData)
              .map(Number)
              .forEach((prefCode) => {
                console.log("inside loop");
                if (!this.selectedPrefs.includes(prefCode as never)) {
                  delete this.populationData[prefCode];
                }
              });
            if (
              this.selectedPrefs.indexOf(prefCode) + 1 ==
              this.selectedPrefs.length
            ) {
              this.$emit("receive", this.populationData);
              console.log("emmited");
            }
          })
          .catch((e) => {
            console.error(e);
          });
      });
    },
  },
});
</script>
