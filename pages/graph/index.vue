<template>
   <div class="p-4">
      <h1 class="text-2xl">Form Create branch</h1>
      <form class="mt-3" @submit="submitForm">
         <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
               <p for="branch_name" class="mb-2 text-sm">Branch Name <span class="text-red-500">*</span></p>
               <input
                  type="text"
                  id="branch_name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-2 h-10"
                  placeholder="Branch Name"
                  autocomplete="off"
                  v-model="form.branchName"
                  required
               />
            </div>
            <div>
               <p for="color" class="mb-2 text-sm">Color Picker</p>
               <input
                  type="color"
                  id="color"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-2 h-10"
                  placeholder="Color Picker"
                  autocomplete="off"
                  v-model="form.color"
                  required
               />
            </div>
         </div>
         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mb-3" @click="btnAddMoreData">
            Add Data in Branch
         </button>
         <div v-for="(data, index) in form.data" :key="`data_${index}`" class="grid gap-6 mb-6 md:grid-cols-3 border-b pb-4">
            <Datepicker :id="`datepicker_${index}`" v-model="form.data[index].datetime" />
            <div>
               <div class="flex items-center mb-2 gap-x-1">
                  <p for="name" class="text-sm">Name <span class="text-red-500">*</span></p>
               </div>
               <input
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-2 h-10"
                  placeholder="Name"
                  autocomplete="off"
                  v-model="form.data[index].name"
                  required
               />
            </div>
            <div>
               <div class="flex items-center mb-2 gap-x-1">
                  <p for="weight" class="text-sm">Weight <span class="text-red-500">*</span></p>
               </div>
               <input
                  type="number"
                  id="weight"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-2 h-10"
                  placeholder="Weight"
                  autocomplete="off"
                  v-model="form.data[index].weight"
                  @keypress="inputNumberOnly($event)"
                  required
               />
               <p class="text-[10px] text-gray-400 mt-2" v-text="'>100 is level 1, >200 is level 2, >300 is level 3 (<100 is level 0 ignore)'"></p>
            </div>
         </div>

         <div class="flex flex-wrap gap-3 mt-3">
            <button type="submit" class="text-white bg-teal-700 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2">Save</button>
            <button type="button" class="bg-white hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2 border" @click="router.push('/')">Back</button>
         </div>
      </form>
   </div>
</template>

<script setup>
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datepicker from "~/components/Datepicker.vue";
const router = useRouter();
import { useGraphStore } from "@/stores/index";
const store = useGraphStore();

const form = ref({
   branchName: "",
   color: "",
   data: [],
});

const btnAddMoreData = () => {
   form.value.data.push({
      datetime: "",
      weight: "",
      name: "",
   });
};

const submitForm = (e) => {
   e.preventDefault();
   const { branchName, data, color } = form.value;
   if (branchName && data.length) {
      const branches = store.graphData.branches;

      const found = branches.find((val) => val === branchName);
      if (found) {
         Swal.fire({
            title: "Warning",
            text: "There is already this branch.",
            icon: "warning",
         });
      } else {
         let fail = false;
         const datasets = {
            backgroundColor: `#${color}`,
            borderColor: "#e9e9e9",
            data: [],
         };

         for (const loopData of data) {
            console.log(loopData);
            if (!loopData.datetime || !loopData.weight) {
               fail = true;
               break;
            } else {
               const weight = parseInt(loopData.weight);
               if (weight > 100) {
                  const level = weight > 300 ? 3 : weight < 300 && weight > 200 ? 2 : 1;

                  const positionMin = parseInt(`${branches.length + 1}`);
                  const positionMax = parseFloat(`${(branches.length == 0 ? 1 : branches.length + 1) + 0.9}`);

                  datasets.data.push({
                     x: loopData.datetime,
                     y: getRandomInt(positionMin, positionMax),
                     r: loopData.weight === 1 ? 5 : loopData.weight === 2 ? 10 : 15,
                     name: loopData.name,
                     stock: weight,
                     level,
                  });
               }
            }
         }

         if (fail) {
            Swal.fire({
               title: "Warning",
               text: "Please fill in all information.",
               icon: "warning",
            });
         } else {
            store.setGraphData({
               datasets: [...store.graphData.datasets, datasets],
               branches: [...branches, branchName],
            });
            Swal.fire({
               title: "Success",
               text: "Create Beanch Success",
               icon: "success",
            });
         }
      }
   } else {
      Swal.fire({
         title: "Warning",
         text: "Please fill in all information.",
         icon: "warning",
      });
   }
   //    navigateTo({ path: "/" });
};
</script>
