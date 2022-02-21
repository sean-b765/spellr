/* eslint-disable */

<template>
  <transition 
      :css="false" 
      @leave="(e, done) => motions['container'].leave(done)">
    <div 
      v-if="status" 
      class="status"
      v-motion="`container`"
      :initial="{
        opacity: 0,
        y: 20
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 500,
        }
      }"
      :leave="{
        opacity: 0,
        y: -20,
        transition: {
          duration: 500,
        }
      }">
      <transition :css="false" @leave="(e, done) => motions['status-motion'].leave(done)">
        <div 
          v-motion="`status-motion`"
          v-if="status"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              duration: 500,
            }
          }"
          :leave="{
            opacity: 0,
          }">
          <h2>{{status === "win" ? `You won 😀 The word was "${word}"` : `You lost 😣 The word was "${word}"`}}</h2>
          <p>{{duration}}</p>
          </div>
      </transition>

      <ol class="definitions" v-motion
        :initial="{
          opacity: 0,
        }"
        :enter="{
          opacity: 1,
          transition: {
            duration: 500,
          }
        }">
        <transition 
          v-for="def in definitions"
          :key="def" 
          :css="false" 
          @leave="(e, done) => motions['definitions-motion'].leave(done)">
          <li 
            class="definitions__item"
            v-motion="`definitions-motion`"
            :initial="{
              opacity: 0,
              x: -20
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                duration: 500,
              }
            }"
            :leave="{
              opacity: 0,
              x: 20
            }">
            {{def}}
          </li>
        </transition>
      </ol>
      <button class="close" @click="close">Close</button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useMotions } from '@vueuse/motion'

export default defineComponent({
  props: {
    status: { type: String, required: true },
    word: { type: String, required: true },
    resetStatus: { type: Function, required: true },
    duration: { type: String, required: true }
  },
  data() {
    return {
      definitions: [] as Array<string>
    }
  },
  methods: {
    close() {
      this.resetStatus()
      this.definitions = []
    }
  },
  watch: {
    status: async function(value: string, oldValue: string) {
      if (!value) return

      const result = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)).json()

      this.definitions = []

      if (result.message) return

      try {
        for (const [idx, dfn] of result[0].meanings[0].definitions.entries()) {
          if (idx < 2) this.definitions.push(dfn.definition)
        }
      } catch (err) {
        this.definitions.push("No definition found.")
      }
    },
  },
  setup() {
    const motions = useMotions()

    return { motions }
  },
})
</script>

<style scoped>
.status {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  z-index: 99;
  top: 2.5rem;
  margin: 1rem 0rem;
  min-height: 5rem;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.status > div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 1.5rem;
}

.definitions {
  margin: 1rem 2rem 1.5rem 2rem;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
.definitions__item {
  text-align: left;
  font-size: 0.8rem;
  margin: 0.3rem;
}

button.close {
  padding: 0.7rem 1.2rem;
  text-transform: lowercase;
  background: rgb(57, 57, 231);
  color: white;
  border-radius: 0.3rem;
  font-size: 1rem;
  border: none;
  font-family: 'Roboto Mono', monospace;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .status {
    max-width: 90vw;
  }
}
</style>