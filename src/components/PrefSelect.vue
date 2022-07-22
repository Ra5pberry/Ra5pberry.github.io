<template>
  <div class="div-header">
    <p>都道府県</p>
  </div>
  <div class="select"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const API_URL = "https://opendata.resas-portal.go.jp/";
const API_KEY = "XFL3yNTPMS93qg2XO4zkHdTAEjCJnD4YDkDpnC2T";

interface PrefData {
  message: string;
  result: {
    prefCode: number;
    prefName: string;
  };
}

let prefData: PrefData;

export default defineComponent({
  name: "PrefSelect",
  data() {
    return {
      value: "",
      result: {
        response: {
          prefecture: [],
        },
      },
      changed: false,
    };
  },
  created() {
    this.axios.defaults.headers.common["X-API-KEY"] = API_KEY;
    this.axios
      .get(`${API_URL}api/v1/prefectures`)
      .then((response) => {
        prefData = response.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },
});
</script>
