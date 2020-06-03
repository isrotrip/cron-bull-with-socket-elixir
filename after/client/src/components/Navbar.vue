<template>
  <div>
    <b-navbar
      v-bind:class="{ gold: premium }"
      toggleable="lg"
      type="light"
      variant="light"
      class="box-shadow max-width orange"
    >
      <b-navbar-brand to="/">
        <img src="@/assets/icon.png" class="d-inline-block align-top icon" alt="Hacktiv8">
        Hacktiv8 Sport
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLogin" to="/login">Login</b-nav-item>
          <b-nav-item v-if="!isLogin" to="/register">Register</b-nav-item>
          <b-nav-item v-if="isLogin" @click="goPremium">Premium</b-nav-item>
          <b-nav-item v-if="isLogin" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import serverAPI from '@/apis/server';

export default {
  computed: {
    ...mapState([
      'isLogin',
      'premium',
    ]),
  },
  methods: {
    ...mapMutations([
      'SWITCH_LOGOUT',
      'SWITCH_PREMIUM',
      'START_LOADING',
      'FINISH_LOADING',
    ]),
    logout() {
      localStorage.removeItem('token');
      this.SWITCH_LOGOUT();
      this.$router.push('/login');
    },
    goPremium() {
      this.START_LOADING();

      serverAPI
        .patch('/users/premium', {}, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.SWITCH_PREMIUM();
          console.log(this.premium);
        })
        .catch(() => {
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
  },
};
</script>

<style>
  html, head {
    margin: 0;
    padding: 0;
  }

  .box-shadow {
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
  }

  .max-width {
    widows: 100vw;
  }

  .icon {
    height: 30px;
  }

  .gold {
    background-color: gold !important;
  }
</style>
