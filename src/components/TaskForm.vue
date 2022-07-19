<template>
  TASK FORM
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  emits: ['task:create']
})
export default class TaskForm extends Vue {
  //
}
</script>

<style lang="scss">
</style>
