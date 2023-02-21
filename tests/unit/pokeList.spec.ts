import { mount } from "@vue/test-utils";
import PokeList from "../../src/components/PokeList.vue";
import { createPinia } from "pinia";
import { pokemons } from "./../../src/mock/index";

test("Create Poke List",async () => {
  const wrapper = mount(PokeList, {
    global: {
      plugins: [createPinia()], // initializes Pinia
    },
  });

  wrapper.vm.getPokeList().then(() => {
    expect(wrapper.vm.pokemonsInit).toBe(pokemons);
  })
});
