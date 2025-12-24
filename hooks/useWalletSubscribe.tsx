import { useEffect, useMemo, useRef, useState } from 'react';
import { useStorage } from './context/useStorage';
import { TWallet } from '../class/wallets/types';

/**
 * A React hook that provides a wallet instance that automatically updates when new transactions are fetched.
 * Since the wallet object mutates in place, we use a Proxy to create a new reference whenever transactions
 * are fetched, ensuring components that depend on the wallet reference will re-render.
 */
const useWalletSubscribe = (walletID: string): TWallet => {
  const { wallets } = useStorage();

  // Get wallet from storage
  const currentWallet = useMemo(() => {
    return wallets.find(w => w.getID() === walletID);
  }, [wallets, walletID]);

  const walletRef = useRef(currentWallet);
  if (currentWallet) {
    walletRef.current = currentWallet;
  }

  const wallet = walletRef.current;
  if (!wallet) {
    throw new Error(`Wallet with ID ${walletID} not found`);
  }

  // Track the lastTxFetch timestamp to force re-renders when transactions are updated
  const [txFetchVersion, setTxFetchVersion] = useState(wallet.getLastTxFetch());

  // Monitor wallet's lastTxFetch timestamp and update state when it changes
  useEffect(() => {
    const interval = setInterval(() => {
      const currentLastTxFetch = wallet.getLastTxFetch();
      if (currentLastTxFetch !== txFetchVersion) {
        setTxFetchVersion(currentLastTxFetch);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [wallet, txFetchVersion]);

  // Create a new Proxy instance whenever txFetchVersion changes
  // This ensures components depending on this wallet reference will see it as a "new" dependency
  const walletProxy = useMemo(() => {
    // Create a proxy that passes through to the wallet
    // The proxy itself is a new object whenever this useMemo re-evaluates
    return new Proxy(wallet, {
      get: (target, prop, receiver) => {
        return Reflect.get(target, prop, receiver);
      },
    });
    // Include txFetchVersion to make this useMemo re-evaluate whenever transactions are fetched
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, txFetchVersion]);

  return walletProxy;
};

export default useWalletSubscribe;
