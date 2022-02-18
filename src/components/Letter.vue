<template>
  <transition :css="false" @leave="(e, done) => motions[motionId].leave(done)">
    <div 
      v-if="char"
      v-motion="motionId"
      :initial="{
        opacity: 0,
        y: 20,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 250,
        }
      }"
      :leave="{
        opacity: 0,
        y: -20,
        transition: {
          duration: 150,
        }
      }"
      class="letter__container" v-bind:class="{ correct: status === 'correct', 'in-word': status === 'in-word' }">
      <div class="key" v-if="char !== ''">{{char}}</div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import { useMotions } from '@vueuse/motion'

export default defineComponent({
  props: ["status", "motionId", "char"],
  setup() {
    const motions = useMotions()

    return { motions }
  },
})
</script>

<style>
.letter__container {
  position: relative;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;
}
.letter__container.correct {
  background: rgb(105, 184, 98);
}
.letter__container.in-word {
  background: rgb(211, 208, 65);
  color: rgb(31, 30, 30);
}
.key {
  position: absolute;
  color: inherit;
}
</style>