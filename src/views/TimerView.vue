<template>
  <div class="container mx-auto pt-5 flex flex-col gap-5 text-center">
    <section>
      <TimerButton @timer:start="start" @timer:stop="stop" ref="timerButton" />
      <p class="my-5 text-2xl font-bold">{{ duration }}</p>
      <TimeeButton value="Clear" @click="clear" />
    </section>
    <section>
      <TaskForm @task:create="addTask" />
    </section>
  </div>
</template>

<script lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TimeeButton from '@/components/TimeeButton.vue'
import TimerButton from '@/components/TimerButton.vue'
import { Options, Vue } from 'vue-class-component'
import { Task } from '../global'

@Options({
  data: () => ({
    startedAt: undefined,
    stopedAt: undefined,
    currentTime: undefined,
  }),
  components: {
    TimerButton,
    TimeeButton,
    TaskForm,
  },
})
export default class TimerView extends Vue {
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
    this.timerInterval && clearInterval(this.timerInterval)
  }

  clear() {
    if (this.startedAt && !this.stopedAt) (this.$refs.timerButton as TimerButton).toggle()

    this.reset()
  }

  addTask() {
    //
  }

  parseTime(val: number) {
    const ms = Math.round(val % 1000 / 10)
    val = Math.round(val / 1000)
    const s = val % 60
    const m = (val -= s) % 60
    const h = (val -= m) % 60

    return `${h} часов ${m} минут ${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')} секунд`
  }

  updateTimer() {
    this.currentTime = Date.now()
  }
}
</script>
