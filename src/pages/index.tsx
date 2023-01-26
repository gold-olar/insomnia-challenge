import ClientHydration from "@/components/ClientHydration";
import ConnectWallet from "@/components/ConnectWallet";
import NFTBalance from "@/components/NFTBalance";
import PageHeader from "@/components/PageHeader";
import TokenBalance from "@/components/TokenBalance";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <ClientHydration>
      <PageHeader />
      <ConnectWallet />
      {isConnected ? (
        <>
          <TokenBalance />
          <NFTBalance />
        </>
      ) : null}
    </ClientHydration>
  );
}
