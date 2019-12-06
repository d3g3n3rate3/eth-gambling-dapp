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

export function toFormat(x, maxDigits = 9) {
  function cutZeros(x) {
    let zeros = 0;
    for (let i = x.length; i > 0; i--)
      if (x[i] === '0')
        zeros++;

    return x.slice(0, x.length - zeros);
  }

  if (x.length <= maxDigits) // aprox 0
    return x + ' WEI';

  const ethLength = 18;

  if (x.length <= ethLength) {
    const zeros = '0'.repeat(ethLength - x.length);

    return '0.' + zeros + cutZeros(x.slice(0, zeros.length - maxDigits));
  }

  const intPart = x.slice(0, x.length - ethLength);

  if (maxDigits - intPart.length > 0) {
    const decPartLength =  maxDigits - intPart.length;
    const decPart = '.' + cutZeros(x.slice(0, decPartLength));

    return intPart + decPart;
  }

  return intPart;
}
