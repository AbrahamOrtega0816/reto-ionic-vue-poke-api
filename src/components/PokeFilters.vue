<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-30">
    <div class="columns">
      <div class="column">
        <input v-model="searchbar"
        class="input is-rounded" type="text" placeholder="Search">
      </div>
    </div>
    <div class="columns is-flex is-align-items-center">
      <div class="column">
        <input class="input is-rounded" v-model="range" max="1000"
         type="range">
      </div>
      <div class="column">
          XP: {{ range }}
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="select is-rounded">
          <select v-model="movimientos"
          placeholder="Select Movimientos">
            <option value="" >---</option>
            <option  v-for="(item, index) in moves"
              :key="index"
              :value="item?.name" >{{ item?.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Result } from "@/models/MPokeList";
import { useStore } from "@/stores";
import  axios  from "axios";
import { computed, onMounted, ref } from "vue";

const store = useStore();

const moves = ref<Array<Result>>([]);

const searchbar = computed({
  // getter
  get() {
    return store.getSearchbar;
  },
  // setter
  set(newSearchbar: string) {
    store.setSearchbar(newSearchbar);
  },
});

const movimientos = computed({
  // getter
  get() {
    return store.getMovimientos;
  },
  // setter
  set(newMovimientos: string) {
    store.setMovimientos(newMovimientos);
  },
});

const range = computed({
  // getter
  get() {
    return store.getRange;
  },
  // setter
  set(newRange: number) {
    store.setRange(newRange);
  },
});

const getPokeListMoves = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(`https://pokeapi.co/api/v2/move?limit=918`);
    moves.value = results;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPokeListMoves();
});
</script>

<style lang="scss">

.mt-30 {
  margin-top: 30px;
}
</style>
