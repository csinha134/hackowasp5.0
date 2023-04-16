import { BeaconWallet } from '@taquito/beacon-wallet';
import { SigningType } from '@airgap/beacon-sdk';
import { STRING_NONCE } from '../constants';

export const wallet = new BeaconWallet({
  name: 'Beacon Wallet Demo',
  preferredNetwork: 'ghostnet',
});

export const connectWallet = async () => {
  console.log('connecting to waller')
  await wallet.requestPermissions({ network: { type: 'ghostnet' } });
  console.log('connected to waller')
};

export const disconnectWallet = async () => {
  document.cookie =
    'Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  await wallet.clearActiveAccount();
};

export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return {
      walletPublicAddress: activeAccount.address,
      walletPublicKey: activeAccount.publicKey,
    };
  } else {
    return { walletPublicAddress: '', walletPublicKey: '' };
  }
};

export const signPayload = async () => {
  const response = await wallet.client.requestSignPayload({
    signingType: SigningType.RAW,
    payload: STRING_NONCE,
  });
  return response.signature;
};
