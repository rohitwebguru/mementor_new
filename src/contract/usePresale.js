import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { IDL } from "../IDL/IDL";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  PRESALE_AUTHORITY,
  PRESALE_ID,
  PRESALE_PROGRAM_PUBKEY,
  PRESALE_SEED,
  VAULT_SEED,
  PRICE_PER_TOKEN_ROUND1,
  PRICE_DECIMAL,
  TOKEN_DECIMAL,
  TOKEN_PUBKEY,
  USER_SEED,
  SOL_TOKEN_PUBKEY,
  SOL_PRICEFEED_ID,
  PRICE_PER_TOKEN_ROUND2,
  PRICE_PER_TOKEN_ROUND3,
  PRICE_PER_TOKEN_ROUND4,
  PRICE_PER_TOKEN_ROUND5,
  JUP_PRICEFEED_ID,
  START_DATE,
  END_DATE,
  PRESALE_SOFTCAP,
  PRESALE_HARDCAP,
  SOL_DECIMAL,
  MAX_INVESTMENT,
  MIN_INVESTMENT,
  DEPOSITE_TOKEN_AMOUNT
} from "../constants.js";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Buffer } from "buffer";
import { parsePriceData } from "@pythnetwork/client"
window.Buffer = window.Buffer || Buffer;
export default function usePresale() {
  const { publicKey, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [transactionPending, setTransactionPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [solAmount, setSolAmount] = useState(0);
  const [vaultAddress, setVaultAddress] = useState("");

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {

    const getPresaleInfo = async () => {
      if (program && !transactionPending) {
        try {
          setLoading(true);
          const [presale_info, presale_bump] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              new Uint8Array([PRESALE_ID]),
            ],
            program.programId
          );
          const [vault, vault_bump] = await PublicKey.findProgramAddress(
            [
              Buffer.from(VAULT_SEED),
              presale_info.toBuffer()
            ],
            program.programId
          );
          setVaultAddress(vault.toBase58());
          const info = await program.account.presaleInfo.fetch(presale_info);
          if (Number(info.solAmount) / (10 ** 9) < 1) {
            setTokenPrice(PRICE_PER_TOKEN_ROUND1);

          } else if (1 <= Number(info.solAmount) / (10 ** 9) && Number(info.solAmount) / (10 ** 9) < 2) {
            setTokenPrice(PRICE_PER_TOKEN_ROUND2);
          } else if (2 <= Number(info.solAmount) / (10 ** 9) && Number(info.solAmount) / (10 ** 9) < 3) {

            setTokenPrice(PRICE_PER_TOKEN_ROUND3);
          }
          else if (3 <= Number(info.solAmount) / (10 ** 9) && Number(info.solAmount) / (10 ** 9) < 4) {
            setTokenPrice(PRICE_PER_TOKEN_ROUND4);
          }
          else if (4 <= Number(info.solAmount) / (10 ** 9) && Number(info.solAmount) / (10 ** 9) <= 5) {
            setTokenPrice(PRICE_PER_TOKEN_ROUND5);
          }
          setSolAmount((Number(info.solAmount) / (10 ** 9)));
          setStartTime(info.startTime);
          setEndTime(info.endTime);
          setTotalBuyAmount(info.soldTokenAmount);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const getUserInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [userInfo, userBump] = findProgramAddressSync(
            [
              utf8.encode(USER_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
              new Uint8Array([PRESALE_ID]),
            ],
            program.programId
          );
          const info = await program.account.userInfo.fetch(userInfo);
          console.log("----------", Number(info.buyTokenAmount.toString()) / (10 ** TOKEN_DECIMAL))
          setClaimableAmount(Number(info.buyTokenAmount.toString()) / (10 ** TOKEN_DECIMAL));
          setBuyAmount(info.buyTokenAmount);
          setClaimedAmount(info.claimAmount);
          console.log("User Info : ", Number(info.buyTokenAmount));
          console.log("User Info : ", Number(info.claimAmount));
          console.log("User Info : ", info);
        } catch (error) {
            setClaimableAmount(0);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getPresaleInfo();
    getUserInfo();
  }, [publicKey, program, transactionPending, connection, anchorWallet]);

  const getPrice = async (tokenSymbol) => {
    if (program && publicKey) {
      try {
        if (tokenSymbol === "USDT" || tokenSymbol === "USDC") return 1;
        const price_feed_id = tokenSymbol === "SOL" ? SOL_PRICEFEED_ID : tokenSymbol === "JUP" ? JUP_PRICEFEED_ID : null
        if (!price_feed_id) return 0
        let { data } = await connection.getAccountInfo(price_feed_id) || {};
        if (!data) return 0
        const priceData = parsePriceData(data)
        if (priceData && priceData.aggregate && priceData.aggregate.price) { return priceData.aggregate.price }
        return 0
      }
      catch {
        return 0;
      }
    } else { return 0 }
  }
  const createPresale = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = await PublicKey.findProgramAddress(
          [
            Buffer.from(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const [vault, vault_bump] = await PublicKey.findProgramAddress(
          [
            Buffer.from(VAULT_SEED),
            presale_info.toBuffer()
          ],
          program.programId
        );
        const tokenPrice = PRICE_PER_TOKEN_ROUND1 * 10 ** TOKEN_DECIMAL;

        const softCap = new anchor.BN(10 ** SOL_DECIMAL * PRESALE_SOFTCAP); // softcap
        const hardCap = new anchor.BN(10 ** SOL_DECIMAL * PRESALE_HARDCAP); // hardcap
        const max = new anchor.BN(10 ** SOL_DECIMAL * MAX_INVESTMENT); // maxTokenAmountPerAddress
        const min = new anchor.BN(10 ** SOL_DECIMAL * MIN_INVESTMENT); // maxTokenAmountPerAddress
        const price = new anchor.BN(tokenPrice); // price per token
        const sTime = new anchor.BN(START_DATE.getTime() / 1000); // start time
        const eTime = new anchor.BN(END_DATE.getTime() / 1000); // end time

        const tx = await program.methods
          .createPresale(
            TOKEN_PUBKEY,
            SOL_TOKEN_PUBKEY,
            softCap,
            hardCap,
            max,
            min,
            price,
            sTime,
            eTime,
            new anchor.BN(PRESALE_ID) // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            authority: PRESALE_AUTHORITY,
            vault: vault,
            systemProgram: SystemProgram.programId,
          }).rpc();

        toast.success("Successfully created presale.");

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawSol = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const [vault, vault_bump] = await PublicKey.findProgramAddress(
          [
            Buffer.from(VAULT_SEED),
            presale_info.toBuffer()
          ],
          program.programId
        );

        console.log("HHHHH - presale_info", presale_info.toString());

        await program.methods
          .withdrawSol(
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            vault: vault,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerAuthority: publicKey,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          }).rpc();
        toast.success("Successfully withdrawed sol.");
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const updatePresale = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );

        const tokenPrice = PRICE_PER_TOKEN_ROUND1 * 10 ** PRICE_DECIMAL;
        const softCap = new anchor.BN(10 ** SOL_DECIMAL * PRESALE_SOFTCAP); // softcap
        const hardCap = new anchor.BN(10 ** SOL_DECIMAL * PRESALE_HARDCAP); // hardcap
        const max = new anchor.BN(10 ** SOL_DECIMAL * MAX_INVESTMENT); // maxTokenAmountPerAddress
        const price = new anchor.BN(tokenPrice); // price per token
        const sTime = new anchor.BN(START_DATE.getTime() / 1000); // start time
        const eTime = new anchor.BN(END_DATE.getTime() / 1000); // end time
        const tx = await program.methods
          .updatePresale(
            max, // maxTokenAmountPerAddress
            price, // pricePerToken
            softCap, //softcapAmount
            hardCap, // hardcapAmount
            sTime, // start time
            eTime, // end time
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          }).rpc()

        toast.success("Successfully updated presale.");

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const updateAuth = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );

        const tx = await program.methods
          .updateAuth(
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            newAuth: new PublicKey(
              "D7zJqiHvnBmcLokn2xsuLgEVTfTjw5BwLgw2RETBvdJ4"
            ),
            authority: publicKey,
            presaleAuthority: PRESALE_AUTHORITY,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully initialized user.");
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const depositToken = async (depositingToken, pythAccount, amount) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const fromAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: depositingToken,
            owner: publicKey,
          });

        const toAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: depositingToken,
            owner: presale_info,
          });

        // Use BigInt for large number calculations
        const depositAmount =
          new anchor.BN(amount * (10 ** TOKEN_DECIMAL));
        await program.methods
          .depositToken(
            new anchor.BN(DEPOSITE_TOKEN_AMOUNT*10**TOKEN_DECIMAL), // deposit amount
            PRESALE_ID // presale id
          )
          .accounts({
            mintAccount: depositingToken,
            fromAssociatedTokenAccount: fromAssociatedTokenAccount,
            fromAuthority: PRESALE_AUTHORITY,
            toAssociatedTokenAccount: toAssociatedTokenAccount,
            presaleInfo: presale_info,
            payer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          }).rpc();

        toast.success("Successfully deposited token.");

        // .rpc();
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const buyToken = async (solAmount, tokenAmount) => {
    if (program && publicKey) {
      try {
        // if (solAmount > MAX_INVESTMENT) {
        //   toast.error(`Buy less than ${MAX_INVESTMENT}SOL`);
        //   return false;
        // }
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const [vault, vault_bump] = await PublicKey.findProgramAddress(
          [
            Buffer.from(VAULT_SEED),
            presaleInfo.toBuffer()
          ],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );

        // Use BigInt for large number calculations
        const bitIntTokenAmount = new anchor.BN(tokenAmount * (10 ** TOKEN_DECIMAL))
        const bigIntSolAmount =
          new anchor.BN(solAmount * (10 ** SOL_DECIMAL));
        const tx = await program.methods
          .buyToken(
            bitIntTokenAmount,
            bigIntSolAmount, // sol amount = token amount * pricePerToken
            PRESALE_ID
          )
          .accounts({
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            vault: vault,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            pythSolAccount: SOL_PRICEFEED_ID
          }).rpc();

        toast.success("Token purchase was successful.");


        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const claimToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );

        const buyer_presale_token_associated_token_account =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const presale_presale_token_associated_token_account =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presaleInfo,
          });
        const tx = await program.methods
          .claimToken(PRESALE_ID)
          .accounts({
            presaleTokenMintAccount: TOKEN_PUBKEY,
            buyerPresaleTokenAssociatedTokenAccount:
              buyer_presale_token_associated_token_account,
            presalePresaleTokenAssociatedTokenAccount:
              presale_presale_token_associated_token_account,
            userInfo,
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerAuthority: publicKey,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          }).rpc();

        toast.success("Token claim was successful.");

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([PRESALE_ID]),
          ],
          program.programId
        );
        const buyer_presale_token_associated_token_account =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const presale_presale_token_associated_token_account =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presaleInfo,
          });

        const tx = await program.methods
          .withdrawToken(
            PRESALE_ID
          )
          .accounts({
            presaleTokenMintAccount: TOKEN_PUBKEY,
            buyerPresaleTokenAssociatedTokenAccount:
              buyer_presale_token_associated_token_account,
            presalePresaleTokenAssociatedTokenAccount:
              presale_presale_token_associated_token_account,
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token withdraw was successful.");
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return {
    createPresale,
    depositToken,
    buyToken,
    updatePresale,
    claimToken,
    getPrice,
    withdrawSol,
    withdrawToken,
    updateAuth,
    startTime,
    endTime,
    buyAmount,
    claimedAmount,
    totalBuyAmount,
    transactionPending,
    tokenPrice,
    claimableAmount,
    solAmount,
    vaultAddress
  };
}
