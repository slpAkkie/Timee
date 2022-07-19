<template>
  <div class="container mx-auto">
    <section class="pt-5">
      <TimeeButton @timer:start="startTimer" @timer:stop="stopTimer" />
    </section>
  </div>
</template>

<script lang="ts">
import TimeeButton from '@/components/TimeeButton.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    TimeeButton,
  },
})
export default class HomeView extends Vue {
  startTimer () {
    console.log('startTimer')
  }

  stopTimer () {
    console.log('stopTimer')
  }
}
</script>
