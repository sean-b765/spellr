/* eslint-disable */
<template>
  <div class="container">
    <div class="controls">
      <button @click="reset">Reset</button>
    </div>
    <section class="board">
      <div class="row" v-for="row in board" :key="row.row">
        <div v-motion="`container-${row.row}${index}`"
          v-for="index in [0,1,2,3,4]" 
          :key="index"
          :initial="{
            opacity: 0,
            y: 20,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: (row.row + index) * 50,
              duration: 250,
            }
          }"
          class="letter">
          <Cell :isDone="row.row <= currentRow" :char="row.word[index]" :motionId="`${row.row}${index}`" :status="row.indices[index + 1]" :index="index" />
        </div>
      </div>
    </section>
    <Keyboard :addLetter="addLetter" :backspace="backspace" :enter="enter" :closeLetters="$props.closeLetters" :correctLetters="$props.correctLetters" :guessedLetters="guessedLetters" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Keyboard from './Keyboard.vue'
import Cell from './Cell.vue'

export default defineComponent({
  name: "Board",
  components: {
    Keyboard, Cell
  },
  props: {
    addWord: { type: Function, required: true },
    addLetter: { type: Function, required: true },
    reset: { type: Function, required: true },
    enter: { type: Function, required: true },
    backspace: { type: Function, required: true },
    correctLetters: { type: Array },
    closeLetters: { type: Array },
    guessedLetters: { type: Array },
    board: { type: Object, required: true },
    currentRow: { type: Number, required: true },
  },
  mounted() {    
    window.addEventListener('keydown', (e: any) => {
      if (e.key === "Backspace") this.$props.backspace()
      if (e.key === "Enter") this.$props.enter()
      
      if (!'qwertyuiopasdfghjklzxcvbnm'.includes(e.key)) return
      this.$props.addLetter(e.key)
    })
  }
});
</script>

<style scoped>
  .controls {
    position: relative;
    padding: 1rem 2rem 0 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  button {
    border: 2px solid rgb(179, 32, 32);
    background: rgb(207, 66, 66);
    padding: 0.5rem 1rem;
    color: white;
    font-family: 'Roboto Mono', monospace;
    cursor: pointer;
  }
  .container {
    position: relative;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .board {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin: 1rem 0 2rem 0;
  }
  .board .row {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
  .board .row .letter {
    position: relative;
    width: clamp(3rem, 5rem, 8vw);
    height: clamp(3rem, 5rem, 8vw);
    font-size: clamp(1rem, 1.8rem, 7vw);
    margin: 0.25rem;
    color: rgb(241, 232, 241);
    overflow: hidden;
    font-family: 'Roboto Mono', monospace;
    background: rgb(49, 49, 49);
  }
</style>