<template>
  <div class="container mx-auto">
    <div
      v-if="$store.state.network && $store.state.network !== 'ropsten'"
      class="h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans"
      style="    z-index: 3;top: 0;position: fixed;background: #eee;left: 0;"
    >
      <div class="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div class="bg-white max-w-sm mx-auto rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              Conectese a Ropsten
            </div>
            <p class="text-gray-700 text-base">
              Metamask esta conectado a {{ $store.state.network }}, para que todo funcione correctamente conectese a Ropsten
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ready">
      <div class="bg-white md:w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="pt-2">
          <a
            class="inline-block text-sm px-2 py-2 leading-none border rounded text-black mt-4 lg:mt-0"
          >Your balance: {{ $store.state.accountBalance }} ETH</a>
        </div>
        <div class="pt-2">
          <a
            class="inline-block text-sm px-2 py-2 leading-none border rounded text-black mt-4 lg:mt-0"
          >House balance: {{ $store.state.houseBalance }} ETH</a>
        </div>
      </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-3/4">
        <div class="md:flex md:items-center justify-center mb-2">
          <div class="md:w-1/4">
            <label
              class="block text-black font-bold md:text-center mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Amount
            </label>
          </div>
          <div class="md:w-2/4">
            <input
              v-model="amount"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              placeholder="bet amount in WEI"
            >
          </div>
        </div>
        <div class="md:flex md:items-center justify-center mb-2">
          <div class="md:w-1/4">
            <label
              class="block text-black font-bold md:text-center mb-1 md:mb-0 pr-4"
              for="inline-username"
            >
              Possibilities
            </label>
          </div>
          <div class="md:w-2/4">
            <select
              v-model="possibilities"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
        </div>
        <div class="md:flex md:items-center justify-center mb-2">
          <div class="md:w-1/4">
            <label
              class="block text-black font-bold md:text-center mb-1 md:mb-0 pr-4"
              for="inline-username"
            >
              Lucky number
            </label>
          </div>
          <div class="md:w-2/4">
            <select
              v-model="luckyNumbers"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
        <div class="md:flex md:items-center justify-end">
          <div class="md:w-1/4">
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              @click="play"
            >
              Play
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { gamblingManager, toData } from '@/store/contracts.js';

let gamblingManagerContract = null;

export default {
  data() {
    return {
      luckyNumbers: '',
      possibilities: '',
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
