# Deployed URL 
https://insomnia-challenge.vercel.app/ 


## Video Demo

https://www.loom.com/share/8b060305fcee488b81912d2c40ac3ee5


# Running this app

```shell
$ git clone https://github.com/gold-olar/insomnia-challenge
$ cd insomnia-challenge
$ yarn 
$ yarn run dev
```

## NPM Commands

| Script             | Description                                         |
| -------------------| --------------------------------------------------- |
| `yarn run dev`     | Start webpack development server @ `localhost:3000` |
| `yarn run build`   | Build the application to `./build` directory        |


## Documentation

Libraries Used
- Ethersjs - Used to connect wallets, and interact with the ethereum blockchain
- Wagmi - Provides react hooks ontop of ethers library
- Moralis - Used the NFT apis's they provide to fetch the NFT data in each wallet
- Tailwindcss -  Used to handle styling 
- Formik - Used in handling forms and form validations


## Brief Overview

The Dapp was built using Nextjs. I decided to work with the wagmi library because it had easy to use hooks that I could use to interact with the wallets, and make transactions.
It had built in wallet connectors that made it seamless for me to connect as many wallets. It also had auto refresh data on wallet and network changes and so one can view wallet balance accross different networks. 

I used the Moralis API to fetch data on the NFT's for each of these wallets. When displaying the data for the nft, I figured that that nft's metadata could be created in different ways, and hence some inconsistencies in how the nfts are shown in the UI.

The wagmi library had the abi for ERC-721, but I had to find and use the abi for the ERC1155 NFT's. 

Every other aspect just involved calling contracts to transfer the tokens and NFT's. I would be glad to answer any questions you might have regarding my implementation of this Dapp.

 

