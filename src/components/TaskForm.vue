<template>
  <form action="#" method="get" @submit.prevent="emitStartTask">
    <div class="flex flex-row gap-2">
      <TimeeInput tabindex="1" class="w-full" placeholder="Task title..." maxLength="48" v-model="title" />
      <TimeeButton tabindex="3" value="Start task" @click="emitStartTask" />
    </div>
    <div class="mt-2">
      <TimeeTextarea tabindex="2" placeholder="Task description (Optional)" v-model="description" />
    </div>
  </form>
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
  // Class properties
  static uid = 1

  // Data
  title!: string
  description!: string

  // Methods
  emitStartTask() {
    if (!this.title) return

    this.$emit('task:create', {
      uid: TaskForm.uid++,
      title: this.title,
      description: this.description,
      isFinished: false,
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
