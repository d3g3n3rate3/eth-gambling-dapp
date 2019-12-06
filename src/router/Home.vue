<template>
  <div>
    <div>
      <div class="container">
        <div class="row">
          <AppBet
            v-for="bet in $store.state.bets"
            :key="bet.id"
            :bet="bet"
          />
        </div>
      </div>
    </div>
    <router-view class="p-3 mb-2 bg-dark text-white" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppBet from '@/components/AppBet';

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
