import Vue from 'vue';
import Vuex from 'vuex';

import getWeb3 from '@/store/web3instance.js';
import { get } from '@/store/apiManager.js';
import { gamblingManager, gamblingManagerAddress } from '@/store/contracts.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3Loaded: false,
    network: '',
    userAccounts: [], // Maybe we need use only the default account and haves a watch for if the account change
    currencies: [],
    actualCurrency: null,
    accountBalance: 0,
    houseBalance: 0,
    bets: [],
  },
  getters: {
    logged: state => state.userAccounts.length > 0,
    ready: state => state.userAccounts.length > 0 && state.network === 'ropsten'
  },
  mutations: {
    setState(localState, data) {
      Object.keys(data).forEach((k) => {
        if (typeof data[k] === 'undefined') {
          // eslint-disable-next-line
          console.error(k, 'is undefined in state');
        }
        if (typeof data[k] === 'object') {
          Vue.set(localState, k, data[k]);
        } else {
          localState[k] = data[k];
        }
      });
    }
  },
  actions: {
    async initUser({ commit, state, dispatch }) {
      let web3 = window.web3;

      if (state.web3Loaded) {
        console.log('web3');
        web3 = await getWeb3();
      }

      web3.eth.getAccounts(async (err, accounts) => {
        if (err) {
          console.error('web3 error', err);
        }

        if (!state.web3Loaded && accounts && accounts.length > 0) {
          web3 = await getWeb3();
          commit('setState', { web3Loaded: true });
        }

        // a esta altura web3 es la web3 ver 1.0
        const network = await web3.eth.net.getNetworkType();
        commit('setState', { network, userAccounts: accounts });
        await dispatch('getUserBalance');
        await dispatch('getHouseBalance');
      });
    },
    async loginUser({ commit, dispatch }) {
      try {
        await getWeb3();
        commit('setState', { web3Loaded: true });
        await dispatch('initUser');
      } catch (e) {
        console.error(e);
      }
    },
    async getUserBalance({ commit, state }) {
      const userAccount = state.userAccounts[0];
      const actualCurrency = state.actualCurrency;
      const gamblingManagerInstance = await gamblingManager();

      const balance = await gamblingManagerInstance.methods.balanceOf(userAccount, actualCurrency).call();
      const stringBalance = balance.toString();
      commit('setState', { accountBalance: stringBalance });
    },
    async getHouseBalance({ commit, state }) {
      const actualCurrency = state.actualCurrency;
      const gamblingManagerInstance = await gamblingManager();

      const balance = await gamblingManagerInstance.methods.balanceOf(gamblingManagerAddress, actualCurrency).call();
      const stringBalance = balance.toString();
      commit('setState', { houseBalance: stringBalance });
    },
    async getCurrencies({ commit }) {
      const currencies = await get('currencies/');

      commit('setState', { currencies: currencies });
    },
    async getBets({ commit }) {
      const bets = await get('bets/');

      commit('setState', { bets: bets });
    }
  }
});
