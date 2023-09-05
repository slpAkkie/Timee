<template>
  <div>
    <input
      type="text"
      class="w-full text-zinc-300 bg-zinc-700 border-2 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 rounded py-1 px-2 placeholder:text-zinc-500 timee-transition"
      :placeholder="placeholder"
      v-model="inputVal"
    />
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  modelValue!: string;
  type = prop<string>({ default: "text" });
  placeholder = prop<string>({ default: "" });
  maxLength = prop<number>({ default: null });
}

@Options({
  emits: ["update:modelValue"],
  watch: {
    modelValue(newVal, oldVal) {
      if (newVal !== oldVal) this.inputVal = newVal;
    },
    inputVal(newVal, oldVal) {
      if (!this.maxLength || newVal.length <= this.maxLength) {
        this.$emit("update:modelValue", (this.inputVal = newVal));
      } else {
        this.$emit("update:modelValue", (this.inputVal = oldVal));
      }
    },
  },
})
export default class TimeeInput extends Vue.with(Props) {
  // Data
  inputVal: string = "";

  // Lifecycle hooks
  mounted() {
    if (this.modelValue) this.inputVal = this.modelValue;
  }
}
</script>
