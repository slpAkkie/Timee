<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col mt-2 font-bold" :class="durationClasses">
      <span>{{ duration }}</span>
      <TimeeButton v-if="!data.isFinished" value="STOP" @click="stop" />
    </div>
    <div class="w-full border border-zinc-700 py-2 px-4 rounded text-left">
      <h4 class="font-bold">{{ data.title }}</h4>
      <p v-if="data.description" class="text-zinc-400">{{ data.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '@/global'
import { Options, Vue } from 'vue-class-component'
import TimeeButton from './TimeeButton.vue'

class Props {
  data!: Task
}

@Options({
  components: {
    TimeeButton,
  },
  data: () => ({
    startedAt: undefined,
    stopedAt: undefined,
    currentTime: undefined,
  }),
  watch: {
    'data.isFinished': function(newVal) {
      if (newVal) this.stop()
    }
  },
})
export default class TaskCard extends Vue.with(Props) {
  // Data
  startedAt!: number | undefined
  currentTime: number | undefined
  stopedAt!: number | undefined

  timerInterval: number | undefined

  // Computed
  get duration() {
    if (!this.startedAt) {
      console.log(1)

      return this.parseTime(0)
    }
    const duration = Math.round(((this.stopedAt || this.currentTime || this.startedAt) - this.startedAt))

    return this.parseTime(duration)
  }

  get durationClasses() {
    return {
      'text-teal-500': !this.data.isFinished,
      'text-rose-700': this.data.isFinished,
    }
  }

  // Methods
  parseTime(val: number) {
    const ms = Math.round(val % 1000 / 10)
    val = Math.round(val / 1000)
    const s = val % 60
    const m = (val -= s) / 60 % 60
    const h = (val -= m * 60) / 60

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
  }

  start() {
    if (this.data.isFinished) return

    this.startedAt = Date.now()
    this.timerInterval = setInterval(this.updateTimer, 10)
  }

  stop() {
    this.stopedAt = Date.now()
    this.timerInterval && clearInterval(this.timerInterval)
    if (!this.data.isFinished) this.data.isFinished = true
  }

  updateTimer() {
    this.currentTime = Date.now()
  }

  // Lifecycle hooks
  mounted() {
    this.start()
  }
}
</script>

<style lang="scss">
</style>
