<template>
  <div class="border border-zinc-700 py-2 px-4 rounded text-left">
    <h4 class="font-bold">Task title</h4>
    <p v-if="data.description" class="text-zinc-400">Task Description placed here if present</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

class Props {
  data!: Record<string, unknown>
}

export default class TaskCard extends Vue.with(Props) {
  //
}
</script>

<style lang="scss">
</style>
