<template>
   <div class="p-4">
      <div class="flex flex-wrap justify-between gap-3 items-center">
         <h1 class="text-2xl">Form Create Branches</h1>
         <button type="submit" class="text-white bg-teal-700 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2" @click="btnAddBranch">Add Branch</button>
      </div>

      <form class="mt-3" @submit="submitForm">
         <div v-for="(form, index) in formBranch" :key="`form_${index}`" class="border-b pb-3 mb-3">
            <p class="font-medium">#{{ index + 1 }}</p>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
               <div>
                  <p class="mb-2 text-sm">Branch Name <span class="text-red-500">*</span></p>
                  <Input type="text" placeholder="Branch Name" v-model="form.branchName" :required="true" />
               </div>
               <div>
                  <p class="mb-2 text-sm">Color Picker</p>
                  <Input type="color" placeholder="Branch Name" v-model="form.color" :required="true" />
               </div>
            </div>
            <button type="button" class="bg-white hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2 border mb-3" @click="btnAddMoreData(index)">
               Add Data in Branch
            </button>
            <div v-for="(val, index2) in form.data" :key="`data_${index2}`" class="grid gap-6 mb-6 md:grid-cols-3">
               <Datepicker :id="`datepicker_${index}_${index2}`" v-model="form.data[index2].datetime" :required="true" />
               <div>
                  <p class="mb-2 text-sm">Name <span class="text-red-500">*</span></p>
                  <Input type="text" placeholder="Branch Name" v-model="form.data[index2].name" :required="true" />
               </div>
               <div>
                  <p class="mb-2 text-sm">Weight <span class="text-red-500">*</span></p>
                  <Input type="number" placeholder="Weight" v-model="form.data[index2].weight" :required="true" />
                  <p class="text-[10px] text-gray-400 mt-2" v-text="'>100 is level 1, >200 is level 2, >300 is level 3 (<100 is level 0 ignore)'"></p>
               </div>
            </div>
         </div>

         <div class="flex flex-wrap gap-3 mt-6">
            <button type="submit" class="text-white bg-teal-700 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2">Save</button>
            <button type="button" class="bg-white hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2 border" @click="navigateTo('/')">Back</button>
         </div>
      </form>
   </div>
</template>

<script setup>
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datepicker from "~/components/form/Datepicker.vue";
import Input from "~/components/form/Input.vue";
import { useGraphStore } from "@/stores/index";
const store = useGraphStore();

const formBranch = ref([
   {
      branchName: "",
      color: "#e66465",
      data: [],
   },
]);

const submitForm = (e) => {
   e.preventDefault();
   for (let i = 0; i < formBranch.value.length; i++) {
      const { branchName, data, color } = formBranch.value[i];
      if (data.length) {
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
               backgroundColor: color,
               borderColor: "#e9e9e9",
               data: [],
            };

            for (const loopData of data) {
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
                        r: level === 1 ? 5 : level === 2 ? 10 : 15,
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

               if (i === formBranch.value.length - 1) {
                  Swal.fire({
                     title: "Success",
                     text: "Create Beanch Success",
                     icon: "success",
                  });
                  navigateTo("/");
               }
            }
         }
      } else {
         Swal.fire({
            title: "Warning",
            text: "Please create at least one branch entry.",
            icon: "warning",
         });
      }
   }
};

const btnAddBranch = () => {
   formBranch.value.push({
      branchName: "",
      color: "#e66465",
      data: [],
   });
};

const btnAddMoreData = (index) => {
   formBranch.value[index].data.push({
      datetime: "",
      weight: "",
      name: "",
   });
};
</script>
