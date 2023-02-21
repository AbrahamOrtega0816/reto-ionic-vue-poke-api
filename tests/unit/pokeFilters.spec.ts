import { flushPromises, mount } from "@vue/test-utils";
import PokeFilters from "../../src/components/PokeFilters.vue";
import { createPinia } from "pinia";

test("Create Filters", async () => {
  const wrapper = mount(PokeFilters, {
    global: {
      plugins: [createPinia()], // initializes Pinia
    },
  });

    const textInput = wrapper.find('input[type="text"]');
    await textInput.setValue("ditto");

    expect(wrapper.vm.searchbar).toEqual("ditto");

    const select = wrapper.find('select')
    await select.setValue('')

    await flushPromises();
    
    expect(wrapper.find('select').element.value).toBe(wrapper.vm.movimientos)

    const rangeInput = wrapper.find('input[type="range"]');
    await rangeInput.setValue(20);

    expect((wrapper.find('input[type="range"]').element as HTMLInputElement).value).toBe(wrapper.vm.range);


});
