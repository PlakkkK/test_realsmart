<template>
   <div>
      <input
         :type="type"
         placeholder="Branch Name"
         autocomplete="off"
         :value="modelValue"
         :class="[
            requireInput?.showMessage ? '!border-error-300 focus:!border-error-300 focus:!outline-error-100' : '',
            'bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-3 h-10',
         ]"
         @change="
            (event) => {
               $emit('update:modelValue', event.target.value);
            }
         "
         @keypress="type == 'number' ? inputNumberOnly($event) : ''"
         :required="required"
      />
      <div class="flex items-center mt-2" v-if="requireInput?.showMessage">
         <label class="text-error-500 text-sm">{{ requireInput.message }}</label>
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   placeholder: String,
   type: String,
   modelValue: String,
   requireInput: Object,
   required: Boolean,
});
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
</style>
