import truncateEthAddress from "@/utils/truncateAddress";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectWallet = () => {
  const { connect, connectors, error, isError, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError, error]);

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </h2>
      </div>
      {isConnected ? (
        <>
          <button
            onClick={() => disconnect()}
            type="button"
            className="inline-flex  items-center rounded-md border border-gray-300 bg-white px-4 mx-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Disconnect {truncateEthAddress(String(address))}
          </button>
        </>
      ) : (
        <div className="mt-4 block md:mt-0 md:ml-4">
          {connectors?.map((connector, index) => (
            <button
              disabled={!connector.ready}
              key={connector.name}
              onClick={() => connect({ connector })}
              type="button"
              className="inline-flex  items-center rounded-md border border-gray-300 bg-white px-4 mx-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Connect with {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
