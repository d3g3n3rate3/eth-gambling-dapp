<template>
  <div class="container col-md-3">
    <div
      v-if="$store.state.network && $store.state.network !== 'ropsten'"
      class=""
      style=""
    >
      <div class="px-6 py-4">
        Conectese a Ropsten
      </div>
      <p class="">
        Metamask esta conectado a {{ $store.state.network }}, para que todo funcione correctamente conectese a Ropsten
      </p>
    </div>

    <form
      v-if="ready"
      class=""
    >
      <h1 class="py-4 text-center">
        Coin Flip
      </h1>
      <div class="form-group">
        <label
          for="betAmountInput"
          class="px-2"
        >Amount to Gambling:</label>
        <input
          id="betAmountInput"
          type="number"
          placeholder="Amount"
        >
        <span class="px-2">{{ }}</span>
      </div>
      <div class="form-group">
        <label
          for="betAmountInput"
          class="px-2"
        >Possibilities:</label>
        <select
          v-model="possibilities"
          class=""
          name="possibilities"
        >
          <option
            value="2"
            disabled
            selected
          >
            bet possibilities
          </option>
          <option value="2">
            2
          </option>
        </select>
      </div>



      <div class="">
        <div class="">
          <label
            class=""
          >
            Lucky number
          </label>
        </div>
        <div class="">
          <select
            v-model="luckyNumbers"
            class=""
            name="luckyNumbers"
          >
            <option
              value=""
              disabled
              selected
            >
              lucky number
            </option>
            <option value="0">
              0
            </option>
            <option value="1">
              1
            </option>
          </select>
        </div>
      </div>
      <div class="">
        <div class="">
          <button
            class=""
            type="button"
            @click="play"
          >
            Play
          </button>
        </div>
      </div>


      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          id="exampleInputPassword1"
          type="password"
          class="form-control"
          placeholder="Password"
        >
      </div>
      <div class="form-group form-check">
        <input
          id="exampleCheck1"
          type="checkbox"
          class="form-check-input"
        >
        <label
          class="form-check-label"
          for="exampleCheck1"
        >Check me out</label>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { gamblingManager, toData } from '@/store/contracts.js';
// import { get } from '@/store/apiManager.js';

let gamblingManagerContract = null;

export default {
  data() {
    return {
      betId: null,
      bet: null,
      possibilities: '',
      multiplier: '',
      luckyNumbers: '',
      amount: ''
    };
  },
  computed: {
    ...mapGetters(['ready']),
    gamblingManager() {
      return gamblingManagerContract;
    }
  },
  watch: {
    ready() {
      if (!this.ready) {
        return;
      }
      gamblingManager().then((contract) => {
        window.c = contract;
        gamblingManagerContract = contract;
      });
    }
  },
  async mounted() {
    // let bet = await get('bet/' + betId);
    // console.log(bet);
  },
  methods: {
    async play() {
      const player = this.$store.state.userAccounts[0];
      const betId = '0x60c6ad896a4478cd000330f4476f7ecf39f970e8088fb6d1aafd601c19b9b3b1';
      const maxAmount = this.amount;
      const possibility = this.possibilities;
      const data = await toData(maxAmount, possibility, this.luckyNumbers);
      gamblingManagerContract.methods.play(player, betId, maxAmount, data).send({ from: player, value: maxAmount });
    }
  }
};
</script>
