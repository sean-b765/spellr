/* eslint-disable */
<template>
  <div class="container">
    <section class="board">
      <div class="row" v-for="item in board" :key="item.row">
        <div class="letter" v-for="index in [1,2,3,4,5]" :key="index">
          <div 
            v-motion
            :initial="{
              opacity: 0,
              y: 20,
            }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: {
                delay: (item.row + index) * 50,
                duration: 250,
              }
            }"
            class="letter__container" v-bind:class="{ correct: item.indices[index] === 'correct', 'in-word': item.indices[index] === 'in-word' }">
            <div class="key" v-if="item.word[index-1] !== ''">{{item.word[index-1]}}</div>
          </div>
        </div>
      </div>
    </section>
    <Keyboard :addLetter="addLetter" :backspace="backspace" :enter="enter" :closeLetters="$props.closeLetters" :correctLetters="$props.correctLetters" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Keyboard from './Keyboard.vue'

export default defineComponent({
  name: "Board",
  components: {
    Keyboard,
  },
  props: ["addWord", "kbLine1", "kbLine2", "kbLine3", "letterLocations", "correctLetters", "closeLetters"],
  data() {
    return {
      board: [
        {
          row: 1,
          word: '',
          indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
            [key: number]: string
          }
        },
        {
          row: 2,
          word: '',
          indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
            [key: number]: string
          }
        },
        {
          row: 3,
          word: '',
          indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
            [key: number]: string
          }
        },
        {
          row: 4,
          word: '',
          indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
            [key: number]: string
          }
        },
        {
          row: 5,
          word: '',
          indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
            [key: number]: string
          }
        }
      ],
      currentRow: 0
    }
  },
  methods: {
    addLetter(e: any) {
      if (this.board[this.currentRow]?.word.length >= 5) return

      this.board[this.currentRow].word = `${this.board[this.currentRow].word}${e}`
    },
    backspace() {
      this.board[this.currentRow].word = this.board[this.currentRow].word.substring(0, this.board[this.currentRow].word.length - 1)
    },
    enter() {
      const { added, indices } = this.$props.addWord(this.board[this.currentRow].word)
      
      if (added) {
        this.board[this.currentRow].indices = indices
        this.currentRow = this.currentRow + 1
      } else {
        this.board[this.currentRow].word = ""
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', (e: any) => {
      if (e.key === "Backspace") this.backspace()
      if (e.key === "Enter") this.enter()
      
      if (!'qwertyuiopasdfghjklzxcvbnm'.includes(e.key)) return
      this.addLetter(e.key)
    })
  }
});
</script>

<style scoped>
  .container {
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
    max-width: calc(5 * 5rem);
    margin: 2rem 0;
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
    border-radius: .5rem;
    color: rgb(241, 232, 241);
    font-family: 'Roboto Mono', monospace;
  }
  .board .row .letter .letter__container {
    position: relative;
    width: 100%;
    height: 100%;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(49, 49, 49);
  }
  .board .row .letter__container.correct {
    background: rgb(105, 184, 98);
  }
  .board .row .letter__container.in-word {
    background: rgb(211, 208, 65);
    color: rgb(31, 30, 30);
  }

  .board .row .key {
    position: absolute;
    color: inherit;
  }
</style>>