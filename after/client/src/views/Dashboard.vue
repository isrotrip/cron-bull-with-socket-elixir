<template>
  <div class="container-fluid">
    <div class="row max-height mt-4">
      <div class="col-sm-6 col-lt-8">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/oY2nVQNlUB8"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="diagonal-shadow">
        </iframe>
        <b-card
          class="diagonal-shadow"
          title="Online User"
          style="width: 100%;"
        >
          <b-list-group class="limit-height">
            <b-list-group-item
              v-for="(user, index) in users"
              :variant="colors[index]"
              :key="index"
            >
              {{ user }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-sm-6 col-lt-4">
        <b-card
          class="diagonal-shadow chat-height"
          title="UNC VS YALE Chat Box"
        >
          <b-card
            class="mb-0"
            style="height: 60%; overflow: hidden;"
          >
          <div class="col chat" style="width: 90%;">
            <div
              v-for="(chat, index) in chats"
              class="d-flex justify-content-between"
              :key="index"
            >
              <p>
                {{ chat.from }}: {{ chat.message }}
              </p>
              <p>
                {{ hour(chat.time) }}
              </p>
            </div>
          </div>
          </b-card>
          <b-card
            class="mt-0"
            style="height: 30%;"
          >
            <b-form @submit.prevent="send" @reset="reset">
              <b-form-textarea
                id="textarea"
                v-model="message"
                placeholder="Chat here..."
                rows="3"
                max-rows="6"
                class="mb-3"
              ></b-form-textarea>
              <p v-if="error" style="color: red;"> {{ error }} </p>
              <div class="d-flex justify-content-end">
                <b-button type="reset" variant="danger">Cancel</b-button>
                <b-button class="ml-2" type="submit" variant="success">Send</b-button>
                <b-button
                  v-if="premium"
                  class="ml-2"
                  type="button"
                  variant="warning"
                  @click="spam"
                >Spam</b-button>
                <b-button
                  v-if="premium"
                  class="ml-2"
                  type="button"
                  variant="primary"
                  @click="sendLater"
                >Send In 3 Seconds</b-button>
              </div>
            </b-form>
          </b-card>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import serverAPI from '@/apis/server';
import socket from '@/apis/socket';

export default {
  name: 'Dashboard',
  data() {
    return {
      colors: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
      ],
      users: [
      ],
      chats: [
      ],
      message: '',
      error: '',
    };
  },
  computed: {
    ...mapState([
      'username',
      'premium',
    ]),
  },
  methods: {
    ...mapMutations([
      'START_LOADING',
      'FINISH_LOADING',
    ]),
    hour(time) {
      return time.split('T')[1].split('.')[0];
    },
    reset() {
      this.error = '';
      this.message = '';
    },
    send() {
      this.error = '';
      this.START_LOADING();

      serverAPI
        .post('/chats', {
          message: this.message,
          type: 'once',
          time: new Date(),
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          const [errMessage] = error.response.data.message;
          this.error = errMessage;
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
    spam() {
      this.error = '';
      this.START_LOADING();

      serverAPI
        .post('/chats', {
          message: this.message,
          type: 'spam',
          time: new Date(),
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          const [errMessage] = error.response.data.message;
          this.error = errMessage;
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
    sendLater() {
      this.error = '';
      this.START_LOADING();

      serverAPI
        .post('/chats', {
          message: this.message,
          type: 'sendLater',
          time: new Date().setSeconds(new Date().getSeconds() + 3),
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          const [errMessage] = error.response.data.message;
          this.error = errMessage;
        })
        .finally(() => {
          this.FINISH_LOADING();
        });
    },
  },
  created() {
    this.users.push(this.username);
    socket.on('user-login', (data) => {
      this.users.push(data.username);
    });
    socket.on('chat', (data) => {
      this.chats.push(data);
      if (!this.users.includes(data.from)) {
        this.users.push(data.from);
      }
    });
  },
  beforeDestroy() {
    socket.removeAllListeners('user-login');
    socket.removeAllListeners('chat');
  },
};
</script>

<style scoped>
  .max-height {
    height: calc(100vh - 80px);
  }
  .limit-height {
    height: calc(100vh - 500px);
  }
  .diagonal-shadow {
    box-shadow: 10px 10px 8px #888888;
  }
  .chat-height {
    height: calc(100vh - 100px);
  }
  .chat {
    position: absolute;
    bottom: 0;
  }
</style>
