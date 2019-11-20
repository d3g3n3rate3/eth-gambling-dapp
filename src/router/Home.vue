<template>
  <div>
    <div>
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-2">
          Eth gambling
        </h1>
      </div>
      <div class="container">
        <div class="row">
          <AppBet
            v-for="bet in $store.state.bets"
            :id="bet.id"
            :key="bet.id"
            :model="bet.model"
            :token="bet.token"
          />
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppBet from '../components/AppBet';

export default {
  components: {
    AppBet: AppBet,
  },
  async mounted() {
    await this.getBets();
  },
  methods: {
    ...mapActions(['getBets'])
  }
};
</script>
