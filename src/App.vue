<template>
  <div id="app">
    <div class="pref-select">
      <PrefSelect />
    </div>
  </div>
</template>

<script lang="ts">
import PrefSelect from "./components/PrefSelect.vue";

export default {
  name: "app",
  components: { PrefSelect },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
