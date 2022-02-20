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
        opacity: 0,
        scale: 0,
        rotateX: -270,
        y: -20
      }"
      :enter="{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        transition: {
          duration: 600,
        }
      }"
      :leave="{
        scale: 0,
        opacity: 0,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 50,
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
  perspective: 700px;
}
.key div {
  background: rgb(49, 49, 49);
  top: 0;
  left: 0;
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
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