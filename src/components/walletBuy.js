import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletImage from '../../src/assets/boxes/connect-copy.png';
function PHWalletBuy() {
  const wallet = useWallet();
  return (
    <>
      <div style={{width:'100%'}}>
        <WalletModalProvider style={{width:'100%'}}>
          <WalletMultiButton style={{fontFamily: "Minecraft", fontSize:"20px", width:'100%'}}  >
          {!wallet?.connected && (
              <img src={WalletImage} alt="Connect Wallet" style={{ height: '14px' }} />
            )}
          </WalletMultiButton>
        </WalletModalProvider>
      </div>
    </>
  );
}
export default PHWalletBuy;
