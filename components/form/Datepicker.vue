<template>
   <div>
      <p :for="id" class="mb-2 text-sm">Date Time Picker <span class="text-red-500">*</span></p>
      <input
         type="text"
         :id="id"
         class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-2 h-10"
         placeholder="Date Time Picker"
         readonly
         :required="required"
      />
   </div>
</template>
<script setup>
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";

const props = defineProps({
   id: String,
   modelValue: {
      type: [String, Number, Array, Date],
   },
   required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
   new AirDatepicker(document.getElementById(props.id), {
      locale: localeEn,
      startDate: new Date(),
      dateFormat: "dd/MM/yyyy",
      timepicker: true,
      timeFormat: "HH:mm",
      onSelect({ date }) {
         emit("update:modelValue", date);
      },
   });
});
</script>
