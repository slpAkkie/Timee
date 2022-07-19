<template>
  <div class="flex flex-col gap-2">
    <TaskCard v-for="(task, i) in items" :key="`${task}${i}`" :data="task" />
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import TaskCard from './TaskCard.vue'

class Props {
  items = prop<Array<Record<string, unknown>>>({ default: () => [] })
}

@Options({
  components: {
    TaskCard,
  },
})
export default class TaskList extends Vue.with(Props) {
  //
}
</script>

<style lang="scss">
</style>
