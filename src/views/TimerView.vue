<template>
  <div class="container max-w-2xl mx-auto pt-5 flex flex-col gap-5 text-center">
    <section>
      <TimerButton @timer:start="start" @timer:stop="stop" ref="timerButton" />
      <p class="my-5 text-2xl font-bold">{{ duration }}</p>
      <TimeeButton value="Clear" @click="clear" />
    </section>
    <section v-if="startedAt && timerInterval">
      <TaskForm @task:create="addTask" />
    </section>
    <section>
      <TaskList :items="tasks" />
    </section>
  </div>
</template>

<script lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import TimeeButton from '@/components/TimeeButton.vue'
import TimerButton from '@/components/TimerButton.vue'
import { Options, Vue } from 'vue-class-component'
import { Task } from '@/global'

@Options({
  data: () => ({
    startedAt: undefined,
    stopedAt: undefined,
    currentTime: undefined,
    timerInterval: undefined,
  }),
  components: {
    TimerButton,
    TimeeButton,
    TaskForm,
    TaskList,
  },
})
export default class TimerView extends Vue {
  // Refs
  declare $refs: {
    timerButton: TimerButton,
  }

  // Data
  startedAt: number | undefined
  currentTime: number | undefined
  stopedAt: number | undefined

  timerInterval: number | undefined

  tasks: Array<Task> = new Array<Task>()

  // Computed
  get duration() {
    if (!this.startedAt) return 'Timer isn\'t running'
    const duration = Math.round(((this.stopedAt || this.currentTime || this.startedAt) - this.startedAt))

    return `Прошло: ${this.parseTime(duration)}`
  }

  // Methods
  reset() {
    this.startedAt = undefined
    this.currentTime = undefined
    this.stopedAt = undefined
  }

  start() {
    this.reset()
    this.startedAt = Date.now()
    this.timerInterval = setInterval(this.updateTimer, 10)
  }

  stop() {
    this.stopedAt = Date.now()
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = undefined
    }

    const currentTask: Task = this.tasks[0]
    if (currentTask) currentTask.isFinished = true
  }

  clear() {
    if (!this.startedAt) this.tasks = []
    if (this.startedAt && !this.stopedAt) this.$refs.timerButton.toggle()

    this.reset()
  }

  addTask(data: Task) {
    const currentTask: Task = this.tasks[0]
    if (currentTask) currentTask.isFinished = true

    this.tasks.unshift(data)
  }

  parseTime(val: number) {
    const ms = Math.round(val % 1000 / 10)
    val = Math.round(val / 1000)
    const s = val % 60
    const m = (val -= s) / 60 % 60
    const h = (val -= m * 60) / 60

    return `${h} часов ${m} минут ${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')} секунд`
  }

  updateTimer() {
    this.currentTime = Date.now()
  }
}
</script>
