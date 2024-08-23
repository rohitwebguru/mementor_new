import React, { useState } from 'react';
import {
  Transaction,
  SystemProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

/**
 * Creates an arbitrary transfer transaction
 * @param   {PublicKey}  publicKey  a public key
 * @param   {Connection}  connection an RPC connection
 * @param   {Number}  selectedValue an amount to send
 * @returns {Transaction}            a transaction
 */
const createTransferTransaction = async (
  publicKey,
  connection,
  selectedValue
) => {
  const bigIntValue = checkAmount(selectedValue);
  console.log("selectedValue:", bigIntValue);
  
  const amountToSend = LAMPORTS_PER_SOL * bigIntValue;
  const toPubkey = new PublicKey("GRSRmXgsNKyAGKK25mgGCSjTTotcMRS2bZ2PbQ23mSeV"); // Ensure this is a valid PublicKey
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: toPubkey,
      lamports: amountToSend,
    })
  );
  transaction.feePayer = publicKey;

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  
  console.log("Transaction:", transaction);
  return transaction;
};

const CreateTransferTransactionComponent = () => {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  // Dummy values for publicKey and connection; replace with actual values
  const publicKey = new PublicKey("YourPublicKeyHere");
  const connection = new Connection("https://api.mainnet-beta.solana.com"); // Replace with actual connection

  const handleCreateTransaction = async (selectedValue) => {
    try {
      const tx = await createTransferTransaction(publicKey, connection, selectedValue);
      setTransaction(tx);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Transfer Transaction</h1>
      <button onClick={() => handleCreateTransaction(1)}>Create Transaction for 1 SOL</button>
      {transaction && (
        <div>
          <h2>Transaction Created:</h2>
          <pre>{JSON.stringify(transaction, null, 2)}</pre>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

function checkAmount(selectedValue) {
  try {
    switch (selectedValue) {
      case 0.1:
        return 0.00075;
      case 1:
        return 0.0075;
      case 10:
        return 0.075;
      case 50:
        return 0.37;
      case 100:
        return 0.75;
      default:
        return 0;
    }
  } catch (error) {
    console.log("Error in checkAmount:", error);
    return 0;
  }
}

export default CreateTransferTransactionComponent;
