<template>
  <section class="keyboard" v-motion :initial="{opacity: 0}" 
    :enter="{opacity: 1, transition: {
      delay: 150,
      duration: 750,
    }}">
      <div>
        <button 
          v-bind:class="{ 
            correct: correctLetters.includes(key), 
            'in-word': closeLetters.includes(key) && ! correctLetters.includes(key),
            guessed: guessedLetters.includes(key)
          }" 
          v-for="key in kbLine1" 
          :key="key" 
          @click=" addLetter(key)">{{key}}</button>
      </div>
      <div>
        <button 
          v-bind:class="{ 
            correct: correctLetters.includes(key), 
            'in-word': closeLetters.includes(key) && ! correctLetters.includes(key),
            guessed: guessedLetters.includes(key)
          }" 
          v-for="key in kbLine2" 
          :key="key" 
          @click=" addLetter(key)">{{key}}</button>
      </div>
      <div>
        <button class="enter" @click=" enter">enter</button>
        <button 
          v-bind:class="{ 
            correct: correctLetters.includes(key), 
            'in-word': closeLetters.includes(key) && ! correctLetters.includes(key),
            guessed: guessedLetters.includes(key)
          }" 
          v-for="key in kbLine3" 
          :key="key" 
          @click=" addLetter(key)">{{key}}</button>
        <button class="bksp" @click=" backspace">&lt;&lt;</button>
      </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: 'Keyboard',
  props: ["enter", "backspace", "addLetter", "correctLetters", "closeLetters", "guessedLetters"],
  data() {
    return {
      kbLine1: ["q","w","e","r","t","y","u","i","o","p"],
      kbLine2: ["a","s","d","f","g","h","j","k","l"],
      kbLine3: ["z","x","c","v","b","n","m"],
    }
  }
})
</script>

<style>
.keyboard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
}
.keyboard div {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
}
.keyboard div button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  padding: clamp(0.2rem, 2rem, 2vw);
  margin: clamp(0.1rem, 0.25rem, .7vw);
  font-family: 'Roboto Mono', monospace;
  background: #444;
  color: white;
  border: none;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.keyboard div button.correct {
  background: rgb(105, 184, 98) !important;
}
.keyboard div button.in-word {
  background: rgb(211, 208, 65);
  color: rgb(31, 30, 30);
}
.keyboard div button.guessed {
  background: rgb(117, 117, 117);
}
.keyboard div .enter, .keyboard div .bksp {
  width: clamp(3rem, 4.5rem, 8vw);
  font-size: .8rem;
}
.keyboard div .enter {
  background: rgb(66, 150, 66);
}
.keyboard div .bksp {
  background: rgb(150, 66, 66);
  width: clamp(2rem, 3.5rem, 6vw);
}
</style>