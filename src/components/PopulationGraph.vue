<template>
  <div class="population-graph">
    <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PluginOptionsByType,
  PointElement,
} from "chart.js";
import { GraphData, PopulationData } from "@/common/object";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

let xAxisLabel: string[] = [
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
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      type: String,
      default: "",
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
    },
    graphData: {
      type: Array,
      default: () => [
        {
          boundaryYear: 0,
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
    },
  },
  data(props) {
    if (props.graphData.length > 0) {
      // console.log("exists");
    }

    return {
      chartData: {
        labels: xAxisLabel,
        datasets: [
          {
            label: "",
            data: [0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  watch: {
    graphData: {
      handler: function (newData: PopulationData[], oldData: PopulationData[]) {
        console.log("changed!");
        // this.chartData.datasets.forEach((dataset) => {
        //   dataset.data.pop();
        // });
        if (newData != null) {
          for (const [key, val] of Object.entries(newData)) {
            console.log(`key is ${key}`);
            for (const [key, data] of Object.entries(val)) {
              // console.log(data);
              if (Array.isArray(data)) {
                var dataArr: number[] = [];
                data[0].data.forEach((data: GraphData) => {
                  dataArr.push(data.value);
                  // this.chartData.datasets.forEach((dataset) => {
                  //   dataset.data.push(data.value);
                  //   console.log(dataset);
                  //   console.log(data.value);
                  // });
                });
                console.log(dataArr);
              }
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    dataChanged(data: PopulationData) {
      console.log(data);
      this.chartData.datasets.forEach((dataset) => {
        dataset.data.pop;
      });
      for (const [key, val] of Object.entries(data)) {
        console.log(`key is ${key}`);
        console.log(val as PopulationData);
        for (const [key, data] of Object.entries(val)) {
          if (Array.isArray(data)) {
            data[0].data.forEach((data: GraphData) => {
              this.chartData.datasets.forEach((dataset) => {
                dataset.data.push(data.value);
              });
            });
          }
        }
      }
    },
  },
});
</script>
