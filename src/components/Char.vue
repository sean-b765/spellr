<template>
  <div
    class="key" 
    v-if="char !== ''">
    {{char}}
    <div 
      v-bind:class="{ correct: status === 'correct', 'in-word': status === 'in-word' }"
      v-if="isDone"
      v-motion="vMotionId"
      :initial="{
        opacity: 1,
        rotateY: -90,
        scaleX: 0
      }"
      :enter="{
        opacity: 1,
        rotateY: 0,
        scaleX: 1,
        transition: {
          duration: 300,
          delay: Number(vMotionId?.substring(1,2)) * 200
        }
      }"
      :leave="{
        scale: 0,
        opacity: 0,
        x: 0,
        rotateY: 0,
        transition: {
          duration: 200,
          delay: Number(vMotionId?.substring(1,2)) * 200
        }
      }">
      {{char}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    char: { type: String },
    isDone: { type: Boolean },
    status: { type: String },
    vMotionId: { type: String }
  }
}
</script>

<style>
.key {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  perspective: 70px;
}
.key div {
  background: rgb(49, 49, 49);
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  border: 5px solid rgb(85, 85, 85);
}

.key .correct {
  background: rgb(105, 184, 98);
}
.key .in-word {
  background: rgb(211, 208, 65);
  color: rgb(31, 30, 30);
}

</style>