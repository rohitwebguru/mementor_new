import React, { useState, useEffect, useCallback } from 'react';
import { PublicKey, Transaction, SendOptions } from '@solana/web3.js';

// Define types here or import from another file
const Status = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};

// Example type definitions
type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export default function PhantomProviderComponent() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [status, setStatus] = useState<Status>('info');
  const [log, setLog] = useState<{ status: Status; message: string; messageTwo?: string } | null>(null);

  // Example function to connect the provider
  const connectProvider = useCallback(async () => {
    if (provider) {
      try {
        const { publicKey } = await provider.connect({ onlyIfTrusted: false });
        setStatus('success');
        setLog({ status: 'success', message: `Connected: ${publicKey.toBase58()}` });
      } catch (error) {
        setStatus('error');
        setLog({ status: 'error', message: 'Failed to connect.' });
      }
    }
  }, [provider]);

  // Example function to handle events
  useEffect(() => {
    if (provider) {
      provider.on('accountChanged', (args) => {
        console.log('Account changed:', args);
      });
    }
  }, [provider]);

  return (
    <div>
      <h1>Phantom Provider Component</h1>
      <button onClick={connectProvider}>Connect to Phantom</button>
      {log && (
        <div>
          <p>Status: {log.status}</p>
          <p>{log.message}</p>
          {log.messageTwo && <p>{log.messageTwo}</p>}
        </div>
      )}
    </div>
  );
}
