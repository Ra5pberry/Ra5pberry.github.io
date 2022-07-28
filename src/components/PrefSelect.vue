<template>
  <div class="div-header">
    <p>都道府県</p>
  </div>
  <div class="select-wrapper">
    <span class="pref-select" v-for="(pref, i) in prefData" :key="i">
      <label
        class="pref-checkbox"
        :for="'pref' + i"
        :id="'label' + pref.prefCode"
        :name="pref.prefName"
      >
        <input
          :id="'pref' + i"
          v-model="selectedPrefs"
          type="checkbox"
          :value="pref.prefCode"
          @change.stop="sendPrefs()"
        />
        {{ pref.prefName }}
      </label>
    </span>
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
      let selectedPrefData = [
        {
          prefCode: 0,
          prefName: "",
        },
      ];
      selectedPrefData.pop();
      this.selectedPrefs.forEach((prefCode) => {
        var str = document.getElementById(`label${prefCode}`)?.innerHTML;
        let pref = {
          prefCode: prefCode,
          prefName: (str as string).substring((str as string).indexOf(">") + 1),
        };
        selectedPrefData.push(pref as any);
      });
      console.log(selectedPrefData);
      this.$emit("emmited-selected-prefs", selectedPrefData);
    },
  },
});
</script>

<style lang="scss">
@mixin custom-input($size, $type) {
  + label {
    position: relative;
    display: inline-block;
    padding-left: $size + 5px;
    min-height: $size;
    line-height: $size;
    cursor: pointer;
  }
}

div.div-header {
  background-color: darkcyan;
  width: 100%;
  height: 60px;
  color: aliceblue;
  border-color: aquamarine;
  font-size: 18px;
  font-weight: 700;
  p {
    margin: 20px;
    text-align: justify;
  }
}

span.pref-select {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.pref-checkbox {
  display: inline-block;
  // background-color: aquamarine;
  color: cadetblue;
  border-radius: 5px;
  margin: 6px;
  padding: 3px;
  height: 60px;
  input {
    width: 100%;
    margin: 0;
    // display: none;
  }
  text-align: center;
}

div.select-wrapper {
  display: grid;
  grid-template-rows: repeat(10, 10%);
  grid-auto-flow: column;
  grid-auto-columns: 20%;
  width: 100%;
}
</style>
