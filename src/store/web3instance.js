import Web3 from 'web3';

let web3Instance = null;

export default async function () {
  if (web3Instance) {
    return web3Instance;
  } else if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      // this.web3.eth.sendTransaction({/* ... */ });
    } catch (error) {
      web3Instance = null;
      throw new Error('denied');
      // User denied account access...
    }
    return web3Instance;
  } else if (window.web3) {
    // si llego aca..
    // Legacy dapp browsers...
    web3Instance = new Web3(window.web3.currentProvider);
    return web3Instance;
    // Acccounts always exposed
    // this.web3.eth.sendTransaction({/* ... */ });
  }

  // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  throw new Error('MetaMask missing');
}
