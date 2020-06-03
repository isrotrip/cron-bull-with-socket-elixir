<template>
  <div class="container">
    <div class="row max-height">
      <div class="col-lg-4 col-sm-6 my-auto">
        <b-card class="flip-shadow">
          <b-card-text>
            <h1> Register Form </h1>
          </b-card-text>
          <b-form @submit.prevent="register">
            <div class="mt-2">Username:</div>
            <b-form-input v-model="username" placeholder="Enter your username"></b-form-input>
            <div class="mt-2">Password:</div>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Enter your password"
            ></b-form-input>
            <p v-for="(error, index) in errors"
              style="color: red;" class="mb-0"
              :key="index"
            >
              {{ error }}
            </p>
            <b-button type="submit" class="mt-3" variant="outline-primary">Register</b-button>
          </b-form>
        </b-card>
      </div>
      <div class="col-lg-8 col-sm-6 my-auto img">
        <img src="@/assets/register.svg" alt="register-image" class="img slim">
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from '@/apis/server';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    ...mapMutations([
      'START_LOADING',
      'FINISH_LOADING',
    ]),
    emptyFields() {
      this.username = '';
      this.password = '';
    },
    register() {
      this.errors = [];

      this.START_LOADING();

      serverAPI
        .post('/users/register', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({
            name: 'Login',
            params: {
              username: this.username,
            },
          });

          this.emptyFields();
        })
        .catch((error) => {
          this.errors = error.response.data.message;
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
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

  .slim {
    width: 80% !important;
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
