<template>
  <div>
    <textarea
      rows="3"
      class="w-full text-zinc-300 bg-zinc-700 border-2 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 rounded py-1 px-2 placeholder:text-zinc-500 timee-transition"
      v-model="inputVal"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  modelValue!: string;
  type = prop<string>({ default: "text" });
  placeholder = prop<string>({ default: "" });
}

@Options({
  emits: ["update:modelValue"],
  watch: {
    modelValue(newVal, oldVal) {
      if (newVal !== oldVal) this.inputVal = newVal;
    },
    inputVal(newVal) {
      this.$emit("update:modelValue", (this.inputVal = newVal));
    },
  },
})
export default class TimeeTextarea extends Vue.with(Props) {
  // Data
  inputVal: string = "";

  // Lifecycle hooks
  mounted() {
    if (this.modelValue) this.inputVal = this.modelValue;
  }
}
</script>
