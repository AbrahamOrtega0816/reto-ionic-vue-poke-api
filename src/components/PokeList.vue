<template>
  <PokeBarGraphic :data="pokemons" />
  <Filters />
  <div class="columns is-multiline p-4">
    <div
      class="column"
      v-for="(pokemon, index) in pokemons"
      :key="index"
      @click="() => router.push(`/pokeDetail/${pokemon?.id}`)"
      data-test="pokemon"
    >
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-12 is-flex is-justify-content-center">
                <figure class="image is-128x128">
                  <img
                    class="is-rounded"
                    :src="pokemon.img"
                  />
                </figure>
              </div>
              <div class="column">
                <h1 class="title">{{ pokemon.name }}</h1>
              </div>
              <div class="column">XP: {{ pokemon?.base_experience }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Result } from "@/models/MPokeList";
import { useStore } from "@/stores";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Filters from "./PokeFilters.vue";
import PokeBarGraphic from "./PokeBarGraphic.vue";

const router = useRouter();
const store = useStore();
const pokemons = ref<Array<Result>>([]);
const pokemonsInit = ref<Array<Result>>([]);
const offset = ref(store.currentPage);
const limit = ref(store.limit);
const searchbar = ref(store.searchbar);

const getPokeList = async () => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/${
      searchbar.value
        ? `pokemon/${searchbar.value}`
        : `pokemon?offset=${offset.value}&limit=${limit.value}`
    }
    `);
    if (data.count) store.setCount(data.count);

    if (data.results) {
      const promises = data.results.map(async (data: Result) => {
        const { data: detail } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${data.name}`
        );
        const result = {
          ...data,
          id: detail.id.toString(),
          base_experience: detail.base_experience,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.id.toString()}.png`,
          moves: detail.moves.map((m:any)=> m.move.name)
        };
        return result;
      });

      const results = await Promise.all(promises);

      pokemons.value = results;
      pokemonsInit.value = results;
    } else {
      pokemons.value = [
        {
          id: data.id,
          name: data.name,
          base_experience: data.base_experience,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id.toString()}.png`,
          moves: data.moves.map((m:any)=> m.move.name)
        },
      ];
      pokemonsInit.value = [
        {
          id: data.id,
          name: data.name,
          base_experience: data.base_experience,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id.toString()}.png`,
          moves: data.moves.map((m:any)=> m.move.name)
        },
      ];
    }

    return pokemonsInit.value
  } catch (error) {
    pokemons.value = [];
    pokemonsInit.value = [];
    console.error(error);
  }
};


onMounted(() => {
  getPokeList();
});

watch(
  () => [store.currentPage, store.searchbar],
  ([newCurrentPage, newSearchbar]) => {
    (offset.value = newCurrentPage as number),
      (searchbar.value = newSearchbar as string);
    getPokeList();
  }
);

// watch Fiters Range
watch(()=> 
[store.range], ([newRange]) => {
  if(Number(newRange) !== 0){
    const result = pokemonsInit.value.filter((pokemon)=> {
     return pokemon?.base_experience as number <= newRange;
  });
   pokemons.value = result;
  }else {
    pokemons.value = pokemonsInit.value
  }
})

const findEveryMove = (move:string) => {
 return move === store.movimientos;
}


const findMove = (pokemon :Result ) => {
 return  pokemon?.moves?.some(findEveryMove);
}


// watch Fiters
watch(()=> 
[store.movimientos], ([newMovimientos]) => {
  if(newMovimientos !== ""){
    const result = pokemonsInit.value.filter(findMove)
   pokemons.value = result;
  }else {
    pokemons.value = pokemonsInit.value
  }
})

</script>

<style lang="scss">
.c-pointer {
  cursor: pointer;
}
</style>
