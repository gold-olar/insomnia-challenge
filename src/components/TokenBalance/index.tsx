import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useBalance, useConnect, useNetwork } from "wagmi";
import TokenTransfer from "../TokenTransfer";

const TokenBalance = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const {
    data,
    isError,
    error,
    isLoading: balanceLoading,
  } = useBalance({
    address,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError, error]);

  if (balanceLoading) {
    return <div className="text-center text-xs">Fetching balance</div>;
  }
  return (
    <>
      <TokenTransfer open={open} setOpen={setOpen} />
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3"></div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              Token balance
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-2 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {parseFloat(String(data?.formatted))?.toFixed(3)}
            </p>
            <p
              className={
                "ml-2 flex items-baseline text-sm font-semibold text-green-600"
              }
            >
              {data?.symbol}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm justify-between flex">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  {chain?.name}
                </span>
                <button
                  className="rounded text-indigo-600 font-bold"
                  onClick={() => setOpen(true)}
                >
                  Send {data?.symbol}{" "}
                </button>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </>
  );
};

export default TokenBalance;
