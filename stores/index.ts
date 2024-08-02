export const useGraphStore = defineStore("graphData", () => {
   const graphData = ref<GraphData>({
      datasets: [],
      branches: [],
   });
   const setGraphData = (data: { datasets: Datasets[]; branches: string[] }) => {
      const { datasets, branches } = data;
      graphData.value.datasets = datasets;
      graphData.value.branches = branches;
   };
   return { graphData, setGraphData };
});

interface DataGraph {
   x: string;
   y: number;
   r: number;
   name: string;
   stock: number;
   level: number;
}

interface Datasets {
   backgroundColor: string;
   borderColor: string;
   data: DataGraph[];
}

interface GraphData {
   datasets: Datasets[];
   branches: string[];
}
