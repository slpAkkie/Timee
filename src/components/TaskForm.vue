<template>
  <div class="flex flex-row gap-2">
    <TimeeInput class="w-full" placeholder="Task title..." maxLength="48" v-model="title" />
    <TimeeButton value="Start task" @click="emitStartTask" />
  </div>
  <div class="mt-2">
    <TimeeTextarea placeholder="Task description (Optional)" v-model="description" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import TimeeButton from './TimeeButton.vue'
import TimeeInput from './TimeeInput.vue'
import TimeeTextarea from './TimeeTextarea.vue'

@Options({
  emits: ['task:create'],
  components: {
    TimeeInput,
    TimeeButton,
    TimeeTextarea,
  },
  data: () => ({
    title: '',
    description: '',
  }),
})
export default class TaskForm extends Vue {
  // Data
  title!: string
  description!: string

  // Methods
  emitStartTask() {
    this.$emit('task:create', {
      title: this.title,
      description: this.description,
    })

    this.clear()
  }

  clear() {
    this.title = ''
    this.description = ''
  }
}
</script>

<style lang="scss">
</style>
