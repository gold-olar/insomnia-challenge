import { erc721ABI, writeContract, waitForTransaction } from "@wagmi/core";
import { useAccount } from "wagmi";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getContract, prepareWriteContract } from "@wagmi/core";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { erc1155abi } from "../../abi/ERC1155";

interface NftTransferFormProps {
  nft: {
    token_address: `0x${string}`;
    token_id: string;
    owner_of: string;
    metadata: string;
    contract_type: "ERC721" | "ERC1155";
    amount: string;
  };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_VALUES = {
  address: "",
};
const NftTransferForm: React.FC<NftTransferFormProps> = ({
  nft,
  open,
  setOpen,
}) => {
  const { address: nftOwnerAddress } = useAccount();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: async ({ address }: { address: string }) => {
      const abi = nft.contract_type === "ERC721" ? erc721ABI : erc1155abi;
      try {
        setLoading(true);
        const contract = getContract({
          // @ts-ignore
          address: nft.token_address,
          // @ts-ignore
          abi,
        });

        const config = await prepareWriteContract({
          address: contract.address as `0x${string}`,
          // @ts-ignore
          abi,
          functionName:
            nft.contract_type === "ERC721"
              ? "transferFrom"
              : "safeTransferFrom",
          // @ts-ignore
          args:
            nft.contract_type === "ERC721"
              ? [nftOwnerAddress, address, nft.token_id]
              : [nftOwnerAddress, address, nft.token_id, nft.amount, 0],
        });

        const { hash } = await writeContract(config);

        const data = await waitForTransaction({
          hash,
          confirmations: 1,
        });

        if (data) {
          toast.success("Transaction successful");
          formik.setValues(INITIAL_VALUES);
        }
        setLoading(false);
        setOpen(false);
      } catch (error) {
        setLoading(false);
        // @ts-ignore
        toast.error(`There has been an error, ${error.message}`);
      }
    },
    validateOnChange: true,
    validate: async (values) => {
      const { address } = values;
      if (!address) {
        return {
          address: "Enter an address",
        };
      }

      if (!address || !ethers.utils.isAddress(address)) {
        return {
          address: "Invalid address",
        };
      }

      return {};
    },
  });

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <h3 className="mb-12 text-xl font-semibold">
                      Transfer NFT{" "}
                    </h3>
                    <div>
                      <label
                        className={
                          formik.errors?.address
                            ? "block text-sm font-medium text-red-700"
                            : "block text-sm font-medium text-gray-700"
                        }
                      >
                        {formik.errors.address
                          ? formik.errors.address
                          : "Address"}
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(e) =>
                            formik.setFieldValue("address", e.target.value)
                          }
                          type="text"
                          name="address"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0x3445..."
                        />
                      </div>
                    </div>

                    <div className="my-6">
                      <button
                        disabled={loading}
                        onClick={() => formik.submitForm()}
                        type="button"
                        className="disabled:bg-gray-400 block w-full  text-center items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default NftTransferForm;
