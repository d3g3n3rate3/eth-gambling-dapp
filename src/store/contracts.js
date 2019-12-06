import { w3 } from '@/store/w3.js';
import CoinFlipABI from './abi/CoinFlip.json';
import GamblingManagerABI from './abi/GamblingManager.json';

export const gamblingManagerAddress = '0x734914c77665f59A1e307E9F537d8d26e3dD0CE8';// TODO get from api
export const coinFlipAddress = '0x3e8efe70fdacf4b1e90b388007c3765c6ed4f843';// TODO get from api

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
