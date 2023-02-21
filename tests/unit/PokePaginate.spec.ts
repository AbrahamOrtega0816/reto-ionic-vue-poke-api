import { mount } from "@vue/test-utils";
import PokePaginate from "../../src/components/PokePaginate.vue";
import { createPinia } from "pinia";

test("Create Poke Paginate",async () => {
  const wrapper = mount(PokePaginate, {
    global: {
      plugins: [createPinia()], // initializes Pinia
    },
  });

  const buttons = wrapper.find('.example-six');

  expect(buttons.exists()).toBeTruthy();
});
