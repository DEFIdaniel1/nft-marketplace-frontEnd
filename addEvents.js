const Moralis = require('moralis/node')
require('dotenv').config()
const nftMarketplaceAddresses = require('./constants/nftMarketplaceAddresses.json')
let chainId = process.env.chainId || 31337
const nftMarketplaceAddress = nftMarketplaceAddresses[chainId]['NFTMarketplace'][0] // 0th with be the most recently deployed

// Moralis setup
const appId = process.env.NEXT_PUBLIC_moralisAppId
const serverUrl = process.env.NEXT_PUBLIC_moralisDappURL
const masterKey = process.env.moralisMasterKey //don't want on front-end, so no NEXT_PUBLIC_

async function main() {}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
