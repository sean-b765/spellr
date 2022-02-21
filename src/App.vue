<template>
  <Status :status="status" :duration="duration" :word="word" :resetStatus="resetStatus" />
  <div class="controls">
    <div class="duration">{{duration}}</div>
    <button class='reset' @click="reset">
      <svg stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M320 146s24.36-12-64-12a160 160 0 10160 160"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"></path></svg>
    </button>
  </div>
  
  <Menu :pastGames="sortHistory()" />
  <Board 
    :addLetter="addLetter" 
    :backspace="backspace" 
    :board="board" 
    :currentRow="currentRow" 
    :enter="enter" 
    :addWord="addWord" 
    :closeLetters="closeLetters" 
    :correctLetters="correctLetters" 
    :guessedLetters="guessedLetters" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "./components/Board.vue"
import words from "./words"
import selectWords from "./selectWords"
import Status from './components/Status.vue'
import { Game, BoardType } from './types/index'
import moment, { Duration } from 'moment'
import Menu from './components/Menu.vue'

const defaultBoard = [
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
  },
  {
    row: 6,
    word: '',
    indices: {1: "", 2: "", 3: "", 4: "", 5: ""} as {
      [key: number]: string
    }
  }
] as BoardType

export default defineComponent({
  name: "App",
  components: {
    Board, Status, Menu
  },
  data() {
    return {
      startTime: moment(),
      finishTime: moment().subtract(1, "day"),
      duration: "",
      finished: false,
      wordList: [] as Array<string>,
      word: "",
      correctLetters: [] as Array<string>,
      closeLetters: [] as Array<string>,
      guessedLetters: [] as Array<string>,
      board: defaultBoard,
      currentRow: 0,
      status: "",
      history: JSON.parse(localStorage.getItem('spellr-history') || '[]') as Array<Game>
    }
  },
  methods: {
    sortHistory() {
      return this.history.sort((ob1, ob2) => moment(ob2.datePlayed, 'MMM D YYYY - HH:mm').diff(moment(ob1.datePlayed, 'MMM D YYYY - HH:mm')))
    },
    addLetter(e: any) {
      if (this.board[this.currentRow]?.word.length >= 5) return

      this.board[this.currentRow].word = `${this.board[this.currentRow].word}${e}`
    },
    backspace() {
      this.board[this.currentRow].word = this.board[this.currentRow]?.word.substring(0, this.board[this.currentRow]?.word.length - 1)
    },
    enter() {
      const { added, indices } = this.addWord(this.board[this.currentRow]?.word)
      
      if (added) {
        this.board[this.currentRow].indices = indices
        this.currentRow = this.currentRow + 1
      } else {
        this.board[this.currentRow].word = ""
      }
    },
    checkWord(word: string) {
      const indices: {
        [key: number]: string
      } = {1: "", 2: "", 3: "", 4: "", 5: ""}

      // Iterate; check if the letter is in the correct place,
      //  if it's not, check that it's in the word at any place
      for (let i = 0; i < this.word.length; i++) {
        // First check that the letter isn't in the word
        if (!this.word.includes(word[i])) this.guessedLetters.push(word[i])

        if (this.word[i] === word[i]) {
          // The letter is correct
          indices[i + 1] = "correct"

          if (!this.correctLetters.includes(word[i])) this.correctLetters.push(word[i])
        } else if (this.word.includes(word[i])) {
          // The letter is in the word
          indices[i + 1] = "in-word"

          if (this.correctLetters.includes(word[i])) continue

          if (!this.closeLetters.includes(word[i])) this.closeLetters.push(word[i])
        }
      }

      if (this.word === word) return { win: true, indices }

      return { indices, win: false }
    },
    addWord(word: string) {
      if (!this.wordList.includes(word)) return {added: false, indices: {1:"",2:"",3:"",4:"",5:""}}

      const { win, indices } = this.checkWord(word)

      if (win) {
        this.status = "win"
        this.wordList.push(word)
        this.gameEndEvent(true)
        return { added: true, indices }
      }
      if (this.currentRow >= 5) {
        this.status = "loss"
        this.wordList.push(word)
        this.gameEndEvent(false)
        return { added: true, indices }
      }

      this.wordList.push(word)
      return { added: true, indices }
    },
    gameEndEvent(win: boolean) {
      this.finishTime = moment()

      this.history.push({
        win: win,
        datePlayed: moment().format('MMM D YYYY - HH:mm'),
        word: this.word,
        guess: this.currentRow,
        time: this.duration,
        board: this.board,
      })
      this.finished = true
    },
    resetStatus() {
      this.status = ""
    },
    humaniseDuration(dur: Duration) {
      const duration = `${dur.hours() >= 10 ? dur.hours() : `0${dur.hours()}`}:${dur.minutes() >= 10 ? dur.minutes() : `0${dur.minutes()}`}:${dur.seconds() >= 10 ? dur.seconds() : `0${dur.seconds()}`}:${dur.milliseconds() >= 10 ? dur.milliseconds() >= 100 ? dur.milliseconds() : `0${dur.milliseconds()}` : `00${dur.milliseconds()}`}`
      return duration
    },
    reset() {
      this.board = this.board.map((row) => {
        return {
          word: row.word = "",
          row: row.row,
          indices: { 1: "", 2: "", 3: "", 4: "", 5: "" }
        }
      })
      this.currentRow = 0
      this.status = ""
      this.finished = false

      const randomIdx = Number(Number(Math.random() * selectWords.length - 1).toFixed(0))
      this.word = selectWords[randomIdx];
      this.correctLetters = []
      this.closeLetters = []
      this.guessedLetters = []
      this.startTime = moment()
      this.finishTime = moment().subtract(1, "day")
    }
  },
  mounted() {
    // set the word list,
    //  also choose the word from the selectWords list
    this.wordList = words
    const randomIdx = Number(Number(Math.random() * selectWords.length - 1).toFixed(0))

    this.word = selectWords[randomIdx];
    console.log(this.word);

    setInterval(() => {
      if (this.finished) return
      this.duration = this.humaniseDuration(moment.duration(moment().diff(this.startTime)))
    }, 10)
  },
  watch: {
    // watch for changes in history - set localStorage
    history: {
      handler: function(oldVal, newVal) {
        console.log(oldVal, newVal);
        localStorage.setItem('spellr-history', JSON.stringify(this.history))
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style>
.controls {
  position: relative;
  padding: 1rem 1rem 0 1rem;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.reset {
  background: rgb(207, 66, 66);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: white;
  font-family: 'Roboto Mono', monospace;
  cursor: pointer;
  margin-left: 1rem;
}
.reset svg {
  fill: white;
  stroke: white;
  font-size: 1rem;
}
.duration {
  font-size: 1.4rem;
}

body {
  overflow: hidden;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: 'Roboto Mono', monospace;
}

</style>
