<template>
  <div id="app">
    <div @click="$store.commit('add')">
      {{ $store.state.counter }}
    </div>
    <div @click="$store.dispatch('add')">
      {{ $store.getters.doubleCount }}
    </div>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
