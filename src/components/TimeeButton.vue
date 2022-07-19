<template>
  <div
        class="w-[150px] h-[150px] mx-auto rounded-full overflow-hidden bg-white cursor-pointer select-none timee-transition"
        :class="{
          'p-0.5': !isStarted,
          'hover:p-1': !isStarted,
          'p-4': isStarted,
        }"
        @click="toggleTimer"
      >
        <div class="w-full h-full rounded-full bg-red-500 grid place-content-center font-extrabold text-xl text-white">
          {{ buttonText }}
        </div>
      </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  emits: ['timer:start', 'timer:stop'],
})
export default class TimeeButton extends Vue {
  isStarted = false

  get buttonText () {
    return this.isStarted ? 'STOP' : 'START'
  }

  toggleTimer () {
    this.isStarted = !this.isStarted
    if (this.isStarted) this.$emit('timer:start')
    else this.$emit('timer:stop')
  }
}
</script>

<style>

</style>
