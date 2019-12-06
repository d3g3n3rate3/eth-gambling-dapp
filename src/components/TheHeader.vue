<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <router-link
          v-if="logged"
          to="/"
          tag="button"
        >
          Eth gambling
        </router-link>
        <ul class="navbar-nav mr-auto" />
        <form class="form-inline my-lg-0">
          <div class="px-3">
            <!--TODO fix this(click.stop, its correct???)-->
            <select
              class="p-2"
              @click.stop="setCurrency({currency: 'bla'})"
            >
              <option
                v-for="currency in $store.state.currencies"
                :key="currency.address"
              >
                {{ currency.symbol }}
              </option>
            </select>
          </div>
          <button
            v-if="!logged"
            type="button"
            class="btn btn-outline-success"
            href="/"
            @click.stop="loginUser()"
          >
            Login
          </button>
          <router-link
            v-if="logged"
            class="btn btn-outline-success"
            to="/profile"
            tag="button"
          >
            Profile
          </router-link>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheHeader',
  data() {
    return {
      loaded: false,
      error: '',
      user: {
        account: null
      }
    };
  },
  computed: {
    ...mapGetters(['logged'])
  },
  async mounted() {
    this.loaded = true;
    if (!window.web3) {
      this.error = 'MetaMask no esta instalado, es necesario que lo instales';
      return;
    }
    // tratamos de recuperar la cuenta del usuario al iniciar la app
    await this.initUser();
    await this.getCurrencies();
  },
  methods: {
    ...mapActions(['initUser', 'loginUser', 'getCurrencies', 'setCurrency']),
  }
};
</script>
