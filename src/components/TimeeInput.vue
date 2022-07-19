<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="name" class="text-zinc-300">
      {{ label }}
      <span v-if="subLabel" class="text-zinc-500 text-sm">({{ subLabel }})</span>
    </label>
    <input
      class="text-zinc-300 bg-zinc-700 border-2 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 rounded py-1 px-2 placeholder:text-zinc-500 acche-transition"
      :class="
        hasError && [
          'text-rose-500',
          'border-rose-700',
          'focus:border-rose-700',
          'focus:ring-rose-700',
          'placeholder:text-rose-500',
          'placeholder:opacity-90',
        ]
      " :type="type" :id="id || name" :name="name" :placeholder="placeholder" v-model="inputVal" :autofocus="autofocus"
      ref="input" />
    <p v-if="hasError" class="text-rose-700 text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'

class Props {
  modelValue!: string
  type = prop<string>({ default: 'text' })
  placeholder = prop<string>({ default: '' })
  label = prop<string>({ default: '' })
  subLabel = prop<string>({ default: '' })
  id = prop<string>({ default: null })
  name = prop<string>({ default: null })
  maxLength = prop<number>({ default: null })
  wrongFields = prop<Record<string, string>>({ default: () => ({}) })
  autofocus = prop<boolean>({ default: false })
}

@Options({
  emits: ['update:modelValue'],
  watch: {
    inputVal(newVal, oldVal) {
      if (this.hasError) delete this.wrongFields[this.name]

      if (!this.maxLength || newVal.length <= this.maxLength) {
        this.$emit(
          'update:modelValue',
          (this.inputVal = newVal)
        )
      } else {
        this.$emit('update:modelValue', (this.inputVal = oldVal))
      }
    }
  },
})
export default class TimeeButton extends Vue.with(Props) {
  // Refs
  declare $refs: {
    input: HTMLInputElement,
  }

  // Data
  inputVal: string = ''

  // Computed
  get hasError() {
    return this.name ? !!this.wrongFields[this.name] : false
  }

  get errorMessage() {
    return this.name
      ? this.wrongFields[this.name] ?? 'Ошибка при заполнении поля'
      : ''
  }

  // Lifecycle hooks
  mounted() {
    if (this.modelValue) this.inputVal = this.modelValue

    if (this.$refs.input.hasAttribute('autofocus')) {
      this.$refs.input.focus()
    }
  }
}
</script>
