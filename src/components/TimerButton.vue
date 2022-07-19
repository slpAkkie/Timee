<template>
  <div
    class="w-[150px] h-[150px] mx-auto rounded-full overflow-hidden bg-white cursor-pointer select-none timee-transition"
    :class="{
      'p-0.5': !isStarted,
      'hover:p-1': !isStarted,
      'p-3': isStarted,
    }" @click="toggle">
    <div class="w-full h-full rounded-full bg-red-500 grid place-content-center text-xl font-extrabold">
      {{ buttonText }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  emits: ['timer:start', 'timer:stop'],
})
export default class TimerButton extends Vue {
  // Data
  isStarted: boolean = false

  // Computed
  get buttonText() {
    return this.isStarted ? 'STOP' : 'START'
  }

  // Methods
  toggle() {
    this.isStarted = !this.isStarted
    if (this.isStarted) this.$emit('timer:start')
    else this.$emit('timer:stop')
  }
}
</script>

<style lang="scss">
</style>
