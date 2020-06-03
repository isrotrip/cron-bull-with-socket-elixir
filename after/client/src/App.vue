<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapMutations([
      'SWITCH_LOGIN',
    ]),
  },
  watch: {
    $route(to) {
      document.title = `H8S - ${to.meta.title}`;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
