<template>
  <Board :addWord="addWord" :closeLetters="closeLetters" :correctLetters="correctLetters" :letterLocations="letterLocations" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "./components/Board.vue"
import words from "./words"
import selectWords from "./selectWords"

export default defineComponent({
  name: "App",
  components: {
    Board
  },
  data() {
    return {
      status: "",
      wordList: [] as Array<string>,
      word: "",
      correctLetters: [] as Array<string>,
      closeLetters: [] as Array<string>,
      letterLocations: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: ""
      } as {
        [key: number]: string
      },
      
    }
  },
  methods: {
    checkWord(word: string) {
      const indices: {
        [key: number]: string
      } = {1: "", 2: "", 3: "", 4: "", 5: ""}

      // Iterate; check if the letter is in the correct place,
      //  if it's not, check that it's in the word as well
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === word[i]) {
          this.letterLocations[i+1] = this.word[i]
          indices[i + 1] = "correct"

          if (!this.correctLetters.includes(word[i])) this.correctLetters.push(word[i])
        } else if (this.word.includes(word[i])) {
          indices[i + 1] = "in-word"

          if (this.correctLetters.includes(word[i])) continue

          if (!this.closeLetters.includes(word[i])) this.closeLetters.push(word[i])
        }
      }

      if (this.word === word) return { status: true, indices }

      return {indices, status: false}
    },
    addWord(word: string) {
      if (!this.wordList.includes(word)) return {added: false, highlightedIndices: this.letterLocations}

      const {status, indices} = this.checkWord(word)

      if (status) {
        alert('You Win!')
      }

      this.wordList.push(word)
      return { added: true, indices }
    },
  },
  mounted() {
    // set the word list,
    //  also choose the word from the selectWords list
    this.wordList = words
    const randomIdx = Number(Number(Math.random() * selectWords.length - 1).toFixed(0))

    this.word = selectWords[randomIdx];
    console.log(this.word);
  }
});
</script>

<style>
body {
  margin: 0;
}
* {
  box-sizing: content-box;
}
#app {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 2rem auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Mono', monospace;
}
</style>
