<template>
  <input
    class="border border-zinc-700 py-1 px-3 rounded text-zinc-300 hover:text-zinc-100 cursor-pointer hover:bg-zinc-700 timee-transition"
    :type="type"
    :value="value"
  />
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
  type = prop<string>({ default: "button" });
  value = prop<string>({ default: "Button" });
}

export default class TimeeButton extends Vue.with(Props) {
  //
}
</script>

<style lang="scss"></style>
