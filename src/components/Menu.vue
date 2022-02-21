<template>
  <button class="btn btn--menu" @click="toggle" aria-label="Open menu">
    <svg v-if="!isOpen" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path></svg>
    <svg v-if="isOpen" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
  </button>
  <section class="menu" v-bind:class="{ open: isOpen }">
    <h1>Past Games</h1>
    <div class="games">
      <div class='game' v-bind:class="{ win: game.win }" v-for="game in pastGames" :key="game.datePlayed">
        <p>{{ game.datePlayed }}</p>
        <p>{{ game.time }}</p>
        <p>"{{ game.word }}"</p>
        <p>{{ game.win ? 'Win' : 'Loss' }}</p>
        <p>Guess: {{ game.guess + 1 }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Game } from '../types/index'

export default defineComponent({
  props: {
    pastGames: {
      type: Array as PropType<Array<Game>>,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
})
</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: white;
  transition: left 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 3rem;
  overflow-y: auto;
}
.menu.open {
  left: 0;
}

.games {
  position: relative;
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}
.games .game {
  margin: 1rem 1rem;
  background: rgb(255, 145, 145);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.game.win {
  background: rgb(139, 255, 139);
}
.game > * {
  margin: 0.5rem;
}

@media screen and (max-width: 480px) {
  .games {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .game {
    margin: 1rem 0;
  }
}
.btn--menu {
  background: none;
  position: fixed;
  padding: 0.8rem;
  border: none;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 1001;
}
.btn--menu svg {
  font-size: 2rem;
  fill: black;
}
</style>