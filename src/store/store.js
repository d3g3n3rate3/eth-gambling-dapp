import Vue from 'vue';
import Vuex from 'vuex';

import { instanceW3, toChecksumAddress } from '@/store/w3.js';
import { get, getUser } from '@/store/apiManager.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    network: '',
    currencies: [],// TODO move?
    actualCurrency: '0x',// TODO move?
    bets: [], // TODO move?
    user: {
      account: null,
      w3Instance: null,
      balances: [],
      bets: [],
    }
  },
  getters: {
    logged: state => state.user.account, // TODO
    ready: state => state.user.account && state.network === 'ropsten'
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
    async initUser({ commit, dispatch, state }) {
      let w3 = window.web3;

      if (state.user.w3Instance) {
        console.log('web3');
        w3 = await instanceW3();
      }

      w3.eth.getAccounts(async (err, accounts) => {
        if (err) {
          console.error('web3 error', err);
        }

        if (!state.web3Loaded && accounts && accounts.length > 0) {
          w3 = await instanceW3();
          commit('setState', { web3Loaded: true });
        }

        // a esta altura web3 es la web3 ver 1.0
        const network = await w3.eth.net.getNetworkType();
        const user = { account: toChecksumAddress(accounts[0]) };
        await commit('setState', { network, user: user });
        // Set user
        await dispatch('getUser');
      });
    },
    async loginUser({ commit, dispatch }) {
      try {
        await instanceW3();
        commit('setState', { web3Loaded: true });
        await dispatch('initUser');
      } catch (e) {
        console.error(e);
      }
    },
    async getCurrencies({ commit }) {
      const currencies = [{ symbol: 'ALL' }].concat(await get('currencies/'));

      commit('setState', { currencies: currencies });
    },
    async getUser({ commit, state }) {
      const user = await getUser(state.user.account);

      commit('setState', { user: user });
    },
    async getBets({ commit, state }) {
      let bets = await get('bets/');

      if (state.actualCurrency !== '0x')
        bets = bets.filter(x => x.token === state.actualCurrency);

      commit('setState', { bets: bets });
    },
    async setCurrency({ commit, currency }) {
      // TODO getCurrencies
      //await get('currencies/')

      commit('setState', { actualCurrency: currency });
    },
  }
});
