import web3instance from './web3instance';
import CoinFlipABI from './abi/CoinFlip.json';
import GamblingManagerABI from './abi/GamblingManager.json';

export const coinFlipAddress = '0xA6ff317b10b07360c56fA5B2B42F91C7B6b77E64';
export const gamblingManagerAddress = '0x1654F07d008ba7b3683C575BDBC97C90d3c1AA6f';

export async function coinFlip() {
  const web3 = await web3instance();
  return new web3.eth.Contract(CoinFlipABI, coinFlipAddress);
}

export async function gamblingManager() {
  const web3 = await web3instance();

  return new web3.eth.Contract(GamblingManagerABI, gamblingManagerAddress);
}

export async function toData(...args) {
  const web3 = await web3instance();
  let data = '0x';

  for (let i = 0; i < args.length; i++) {
    data = data + web3.utils.toTwosComplement(args[i]).toString().slice(2);
  }
  return data;
}
