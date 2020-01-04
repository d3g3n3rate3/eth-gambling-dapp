import axios from 'axios';
import { toFormat } from '@/utils.js';

const urlBase = 'https://eth-gambling-api.herokuapp.com/';
//const urlBase = 'http://localhost:5000/';

export async function get(path) {
  const url = urlBase + path;

  return axios.get(url)
    .then(response => {
      // TODO catch if the key dont exists
      return response.data;
    })
    .catch(e => {
      console.log(e);
    });
}

export async function getUser(address) {
  const user = await get('user/' + address);
  user.account = address;

  const currencies = await get('currencies/');
  const balances = user.balances.map(balance => {
    const currency = currencies.find(x => x.address === balance.address);
    balance.iconUrl = currency.iconUrl;
    balance.symbol = currency.symbol;
    balance.name = currency.name;
    balance.formatAmount = toFormat(balance.amount, currency.symbol);

    return balance;
  });

  return {
    account: address,
    balances: balances,
    bets: user.bets,
  };
}
