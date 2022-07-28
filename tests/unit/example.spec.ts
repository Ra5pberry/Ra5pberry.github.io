import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import PopulationGraph from "@/components/PopulationGraph.vue";
import PrefSelect from "@/components/PrefSelect.vue";
import HeaderComponent from "@/components/common/HeaderComponent.vue";

it("test App component", () => {
  const wrapper = shallowMount(App);
  console.log(wrapper.html());
});

describe("Prefecture Select", () => {
  let wrapper: any;
  beforeEach(async () => {
    wrapper = shallowMount(PrefSelect);
  });
  // it("test PrefSelect component", () => {
  //   expect(wrapper.vm.)
  // });
});

it("test PopulationGraph component", () => {
  const wrapper = shallowMount(PopulationGraph);
  console.log(wrapper.html());
});

it("test Header component", () => {
  const wrapper = shallowMount(HeaderComponent);
  expect(wrapper.text()).toMatch("都道府県別人口推移グラフ");
});
