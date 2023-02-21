<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Poke Detail</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-12 is-flex is-justify-content-center">
                <figure class="image is-128x128">
                  <img
                    class="is-rounded"
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`"
                  />
                </figure>
              </div>
              <div class="column">
                <h1 class="title">{{ pokemon?.name }}</h1>
              </div>
              <div class="column">XP: {{ pokemon?.base_experience }}</div>
              <div class="column">
                Type: {{ pokemon?.types[0].type.name }}
              </div>
              <div class="column">
                Specie: {{ pokemon?.species.name }}
              </div>
               <div class="colums">
                <div class="column">Height: {{ pokemon?.height }}</div>
                <div class="column">Weight: {{ pokemon?.weight }}</div>
               </div>
               <div class="mt-20">
              <h1>Moves</h1>
              <ul>
                <li v-for="(move, index) in pokemon?.moves" :key="index">
                  {{ move.move.name }}
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { PokeDetail } from "@/models/MPokeList";

const pokemon = ref<PokeDetail>();
const router = useRoute();

const { id } = router.params;

const getPokeDetail = async () => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPokeDetail();
});
</script>

<style scoped>
#container {
  padding: 5%;
}
.mt-20 {
  padding-top: 20px;
}
</style>
