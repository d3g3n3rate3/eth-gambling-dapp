<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mr-auto" />
        <form class="form-inline my-2 my-lg-0">
          <div class="px-3">
            <select class="p-2">
              <option> ALL </option>
              <option
                v-for="choice in $store.state.currencies"
                :key="choice.address"
              >
                {{ choice.symbol }}
              </option>
            </select>
          </div>
          <button
            v-if="!logged"
            type="button"
            class="btn btn-outline-success"
            href="#"
            @click.stop="loginUser()"
          >
            Login
          </button>
          <div
            v-if="logged"
            class="px-3 text-black"
          >
            {{ $store.state.userAccounts[0] }}
          </div>
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
        account: null,
        balance: 0
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
    ...mapActions(['initUser', 'loginUser', 'getCurrencies'])
  }
};
</script>
