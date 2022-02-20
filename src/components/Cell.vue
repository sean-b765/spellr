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
        y: -5,
        transition: {
          duration: 250,
          delay: isDone ? Number(motionId.substring(0, 1)) * 150 : 0
        }
      }"
      class="letter__container">
      <Char :vMotionId="`${motionId}char`" :char="char" :isDone="isDone" :status="status" />
    </div>
  </transition>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import { useMotions } from '@vueuse/motion'
import Char from './Char.vue'

export default defineComponent({
  components: {
    Char
  },
  props: {
    status: { type: String },
    motionId: { type: String },
    char: { type: String },
    isDone: { type: Boolean }
  },
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
</style>