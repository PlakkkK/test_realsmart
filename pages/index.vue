<template>
   <div class="p-4">
      <h1 class="text-2xl text-center">Test Graph</h1>
      <div class="flex flex-wrap gap-3 mb-10 mt-3">
         <button type="button" class="text-white bg-teal-700 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5" @click="navigateTo('/graph')">
            Create Branch
         </button>
         <button type="button" class="bg-white hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2 border" @click="btnMockData">Mock Data</button>
      </div>
      <BubbleChart :chartData="chartData" :graphChange="graphChange" />
   </div>
</template>
<script setup>
import BubbleChart from "~/components/ui/BubbleChart.vue";
import { useGraphStore } from "@/stores/index";
const store = useGraphStore();

const chartData = ref({
   datasets: [],
   groups: [],
});

const graphChange = ref(false);
const btnMockData = async () => {
   const { branches, datasets } = await $fetch("/api/mock-graph");
   try {
      chartData.value = {
         datasets,
         branches,
      };

      graphChange.value = !graphChange.value;
      store.setGraphData({
         datasets,
         branches,
      });
   } catch (error) {
      console.log(error);
   }
};
</script>
