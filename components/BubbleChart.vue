<template>
   <canvas id="myChart" style="position: relative; height: 60vh; width: 80vw"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { useGraphStore } from "@/stores/index";
const store = useGraphStore();

const props = defineProps({
   graphChange: Boolean,
});

watch(
   () => props.graphChange,
   (newValue) => {
      chartData.datasets = store.graphData.datasets;

      const getBranches = store.graphData.branches;
      branches = getBranches;

      if (chartJS) {
         // console.log(getBranches.length)
         // chartJS.options.scales.y.max = getBranches.length + 1;
         chartJS.update();
      }
   }
);

let chartJS = null;
let chartData = {
   datasets: [],
};
let branches = [];
onMounted(() => {
   chartData = {
      datasets: store.graphData.datasets,
   };
   branches = store.graphData.branches;
   const ctx = document.getElementById("myChart");
   chartJS = new Chart(ctx, {
      type: "bubble",
      data: chartData,
      options,
      plugins: [connectLinesPlugin],
   });
});

const connectLinesPlugin = {
   afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const datasets = chart.data.datasets;
      const tension = 0.6;
      const pointsByName = {};

      datasets.forEach((dataset, datasetIndex) => {
         const meta = chart.getDatasetMeta(datasetIndex);
         dataset.data.forEach((point, index) => {
            if (!pointsByName[point.name]) {
               pointsByName[point.name] = [];
            }
            pointsByName[point.name].push({ ...point, meta: meta.data[index], datasetIndex });
         });
      });

      Object.values(pointsByName).forEach((points) => {
         if (points.length > 1) {
            points.sort((a, b) => a.x - b.x);
            ctx.save();
            ctx.lineWidth = 1;
            ctx.lineCap = "round";

            for (let i = 0; i < points.length - 1; i++) {
               const currPoint = points[i];
               const nextPoint = points[i + 1];

               const cp1x = currPoint.meta.x + (nextPoint.meta.x - currPoint.meta.x) * tension;
               const cp1y = currPoint.meta.y;
               const cp2x = nextPoint.meta.x - (nextPoint.meta.x - currPoint.meta.x) * tension;
               const cp2y = nextPoint.meta.y;

               ctx.beginPath();
               ctx.strokeStyle = datasets[currPoint.datasetIndex].backgroundColor;
               ctx.moveTo(currPoint.meta.x, currPoint.meta.y);
               ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.meta.x, nextPoint.meta.y);
               ctx.stroke();
               ctx.closePath();
            }

            ctx.restore();
         }
      });
   },
};

const options = {
   plugins: {
      legend: {
         display: false,
      },
      tooltip: {
         callbacks: {
            title: function (tooltipItem) {
               const { dataset, dataIndex } = tooltipItem[0];
               return `Badminton racket: ${dataset.data[dataIndex].name}`;
            },
            label: function (tooltipItem) {
               const { dataset, dataIndex } = tooltipItem;
               return `Sales: ${formatCurrency(dataset.data[dataIndex].sales)} (Level: ${dataset.data[dataIndex].level})`;
            },
         },
         displayColors: false,
      },
   },
   scales: {
      x: {
         type: "time",
         time: {
            unit: "day",
            displayFormats: {
               day: "MMMM dd, HH:mm",
            },
         },
      },
      y: {
         type: "linear",
         reverse: true,
         offset: true,
         min: 1,
         ticks: {
            stepSize: 1,
            callback: (value) => {
               return branches[value - 1];
            },
         },
      },
   },
};
</script>
