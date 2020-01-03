import { w3 } from '@/store/w3.js';
import GamblingManagerABI from './abi/GamblingManager.json';

import CoinFlipABI from './abi/CoinFlip.json';
import P2P from './abi/P2P.json';

export const gamblingManagerAddress = '0xf4c0b61a4b8e8D2900a56e8CbdD144D73EB59a26';// TODO get from api

// Models
export const p2pAddress = '0x51371229375dD1D6F040365f3ac46A42003f2A09';// TODO get from api
export const coinFlipAddress = '0x3e8efe70fdacf4b1e90b388007c3765c6ed4f843';// TODO get from api

export async function p2p() {
  return new w3.eth.Contract(P2P, p2pAddress);
}

export async function coinFlip() {
  return new w3.eth.Contract(CoinFlipABI, coinFlipAddress);
}

export async function gamblingManager() {
  return new w3.eth.Contract(GamblingManagerABI, gamblingManagerAddress);
}

export async function toData(...args) {
  let data = '0x';

  for (let i = 0; i < args.length; i++) {
    data = data + w3.utils.toTwosComplement(args[i]).toString().slice(2);
  }
  return data;
}
