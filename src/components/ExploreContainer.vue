<template>
  <div id="container">
    <Pokelist/>
    <PokePaginate/>
  </div>
</template>

<script setup lang="ts">

import Pokelist from './PokeList.vue';
import PokePaginate from './PokePaginate.vue';
</script>

<style scoped>
#container {
 padding: 5%;
}
</style>
