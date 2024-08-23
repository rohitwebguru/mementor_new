import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletImage from '../../src/assets/boxes/connect-copy.png';
function PHWallet() {
  const wallet = useWallet();
  return (
    <>
      <div className="wallet-default" id="targetElement">
        <WalletModalProvider>
          <WalletMultiButton style={{fontFamily: "Minecraft"}}  >
          {!wallet?.connected && (
              <img src={WalletImage} alt="Connect Wallet" style={{ height: '14px' }} />
            )}
          </WalletMultiButton>
        </WalletModalProvider>
      </div>
    </>
  );
}
export default PHWallet;
