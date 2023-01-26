// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    }
    const parsedBody = JSON.parse(req.body);
    const { address, chain } = parsedBody;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain: chain,
    });

    return res.status(200).json({
      status: true,
      ...response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
}
