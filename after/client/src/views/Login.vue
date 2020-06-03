<template>
  <div class="container">
    <div class="row max-height">
      <div class="col-lg-8 col-sm-6 my-auto">
        <img src="@/assets/login.svg" alt="login-image" width="100%" class="img">
      </div>
      <div class="col-lg-4 col-sm-6 my-auto">
        <b-card class="flip-shadow">
          <b-card-text>
            <h1> Login Form </h1>
          </b-card-text>
          <b-form @submit.prevent="login">
            <div class="mt-2">Username:</div>
            <b-form-input v-model="username" placeholder="Enter your username"></b-form-input>
            <div class="mt-2">Password:</div>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Enter your password"
            ></b-form-input>
            <p v-if="error" style="color: red;" class="mb-0"> {{ error }} </p>
            <b-button type="submit" class="mt-3" variant="outline-success">Login</b-button>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from '@/apis/server';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  methods: {
    ...mapMutations([
      'SWITCH_LOGIN',
      'START_LOADING',
      'FINISH_LOADING',
    ]),
    emptyFields() {
      this.username = '';
      this.password = '';
    },
    login() {
      this.START_LOADING();

      serverAPI
        .post('/users/login', {
          username: this.username,
          password: this.password,
        })
        .then(({ data }) => {
          const { username, token, premium } = data;
          localStorage.setItem('token', token);
          this.SWITCH_LOGIN({
            username,
            premium,
          });
          this.emptyFields();
          this.$router.push({
            name: 'Dashboard',
          });
        })
        .catch((error) => {
          this.error = error.response.data.message;
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
  },
  created() {
    if (this.$route.params.username) {
      this.username = this.$route.params.username;
    }
  },
};
</script>

<style scoped>
  .max-height {
    height: calc(100vh - 65px);
  }

  .flip-shadow {
    position: relative;
    transition: transform 1s;
    -webkit-box-shadow: 0 15px 10px #777;
    -moz-box-shadow: 0 15px 10px #777;
    box-shadow: 0 15px 10px #777;
    animation-duration: 3s;
    animation-name: slideleft;
  }

  .flip-shadow:hover {
    transform: translate(0px, 10px);
  }

  .img {
    position: relative;
    animation-duration: 3s;
    animation-name: slideright;
  }

  @keyframes slideleft {
    from {
      margin-left: 100%;
      width: 100%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }

  @keyframes slideright {
    from {
      margin-left: -100%;
      width: 100%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }
</style>
