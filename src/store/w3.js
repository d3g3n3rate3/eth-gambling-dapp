import W3 from 'web3';

export async function instanceW3() {
  let w3Instance = null;

  if (window.ethereum) {
    w3Instance = new W3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      w3Instance = null;
      throw new Error('denied');
      // User denied account access...
    }
    return w3Instance;
  } else if (window.web3) {
    // Legacy dapp browsers...
    w3Instance = new W3(window.web3.currentProvider);
    return w3Instance;
  }

  // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  throw new Error('MetaMask missing');
}

export function w3() {
  return W3;
}

export function toChecksumAddress(address) {
  return W3.utils.toChecksumAddress(address);
}
