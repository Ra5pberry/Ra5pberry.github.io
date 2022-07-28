<template>
  <div id="population-graph">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from "vue";
import { ChartDataSet, GraphData } from "@/common/object";
import axios from "../plugins/axios";

import Chart, { ChartItem } from "chart.js/auto";

const API_URL = "https://opendata.resas-portal.go.jp/";
const labels: string[] = [
  "1960",
  "1965",
  "1970",
  "1975",
  "1980",
  "1985",
  "1990",
  "1995",
  "2000",
  "2005",
  "2010",
  "2015",
  "2020",
  "2025",
  "2030",
  "2035",
  "2040",
  "2045",
];

export default defineComponent({
  name: "PopulationGraph",
  props: {
    selectedPopulationData: {
      type: Array as PropType<Array<ChartDataSet>>,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data(props) {
    console.log(this.populationData);
    return {
      showChart: true,
    };
  },
  watch: {
    selectedPopulationData: {
      handler: function () {
        console.log("changed");

        let datasets = [
          {
            label: "",
            data: [0],
          },
        ];

        datasets.pop();

        this.selectedPopulationData?.forEach((data) => {
          // console.log(data.data);
          let dataset = {
            label: data.label,
            data: data.data,
            borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255},
                          ${Math.random() * 255})`,
          };
          datasets.push(dataset);
        });

        let graphArea = document.getElementById("population-graph");
        while (graphArea?.lastChild) {
          graphArea.removeChild(graphArea.lastChild);
        }
        var newCanvas = document.createElement("canvas");
        newCanvas.setAttribute("id", "myChart");
        graphArea?.appendChild(newCanvas);

        let ctx = document.getElementById("myChart");
        new Chart(ctx as ChartItem, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
        });
      },
    },
  },
});
</script>

<style>
.vue-highcharts {
  width: 100%;
}
</style>
