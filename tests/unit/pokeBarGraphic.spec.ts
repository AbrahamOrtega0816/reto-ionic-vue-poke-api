import { mount } from "@vue/test-utils";
import PokeBarGraphic from "../../src/components/PokeBarGraphic.vue";
import { pokemons } from "./../../src/mock/index";

test("Create Graphic", () => {
  const wrapper = mount(PokeBarGraphic, {
    props: {
      data: pokemons,
    },
  });

  // Assert the rendered text of the component
  expect(wrapper.vm.chartData).toEqual({
    datasets: [
      {
        backgroundColor: "#f87979",
        data: [142, 263, 62, 142],
        label: "Poke Data XP",
      },
    ],
    labels: ["ivysaur", "venusaur", "charmander", "charmeleon"],
  });
});
