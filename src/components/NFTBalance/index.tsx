import { formatImageUrl } from "@/utils/formatImageUrl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useNetwork } from "wagmi";
import NftTransferForm from "../NftTransferForm";
import NoNFTs from "../NoNFTs";

const NFTBalance = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const dataFetchedRef = useRef(false);
  const [nfts, setNfts] = useState([]);
  const [open, setOpen] = useState(false);
  const [fetchingNFT, setFetchingNFT] = useState(false);

  const fetchNFTs = async (walletAddress: string, chain?: number) => {
    const response = await fetch("/api/get-nfts", {
      method: "POST",
      body: JSON.stringify({
        address: walletAddress,
        chain,
      }),
    });
    const json = await response.json();
    if (!json.status) {
      setFetchingNFT(false);
      return toast.error(json.error.name);
    }

    setNfts(json?.jsonResponse?.result);
    dataFetchedRef.current = false;
    setFetchingNFT(false);
  };

  useEffect(() => {
    //  UseEffect runs twice, and that would call the endpoint twice. This implementation prevents that
    if (dataFetchedRef.current) return;

    if (address) {
      setFetchingNFT(true);
      dataFetchedRef.current = true;
      fetchNFTs(address, chain?.id);
    }
  }, [address, chain, dataFetchedRef]);

  return (
    <div className="py-12">
      <h3 className="font-bold text-3xl py-12 ">{"NFT's"}</h3>

      {fetchingNFT ? (
        <> Loading... </>
      ) : (
        <>
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {nfts.length === 0 ? <NoNFTs /> : null}
            {nfts?.map((nft, index) => {
              const { metadata, contract_type } = nft;
              const nftData = JSON.parse(metadata);

              return (
                <li key={index} className="relative">
                  <NftTransferForm nft={nft} open={open} setOpen={setOpen} />
                  <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <img
                      src={String(formatImageUrl(nftData?.image))}
                      alt=""
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    ></button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {nftData?.name} -{" "}
                    <span className="italic text-gray-400 text-xs">
                      {contract_type}
                    </span>
                  </p>

                  <div className="my-4">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="block w-full text-center items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Transfer NFT
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default NFTBalance;
