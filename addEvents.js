const Moralis = require('moralis/node')
require('dotenv').config()
const nftMarketplaceAddressFile = require('./constants/nftMarketplaceAddresses.json')

// Moralis setup
const appId = process.env.NEXT_PUBLIC_moralisAppId
const serverUrl = process.env.NEXT_PUBLIC_moralisDappURL
const masterKey = process.env.moralisMasterKey //don't want on front-end, so no NEXT_PUBLIC_

async function main() {
    let chainId = process.env.chainId || '31337'
    let moralisChainId = chainId == '31337' ? '1337' : chainId // Moralis only knows 1337 as local, so if 31337, change to 1337, else use the actual chainId
    const nftMarketplaceAddress = nftMarketplaceAddressFile[chainId]['NFTMarketplace'][0] // 0th with be the most recently deployed
    await Moralis.start({ serverUrl, appId, masterKey })
    console.log(`Working with NFT Marketplace contract address: ${nftMarketplaceAddress}`)
    // all set out in moralis documentation
    let nftListedOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        topic: 'NFTListed(address,address,uint256,uint256)',
        address: nftMarketplaceAddress,
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'seller',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'nftAddress',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                },
            ],
            name: 'NFTListed',
            type: 'event',
        },
        tableName: 'NFTListed',
    }
    let nftPurchasedOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        topic: 'NFTPurchased(address,address,uint256,uint256)',
        address: nftMarketplaceAddress,
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'buyer',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'nftAddress',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                },
            ],
            name: 'NFTPurchased',
            type: 'event',
        },
        tableName: 'NFTPurchased',
    }
    let listingCancelledOptions = {
        chainId: moralisChainId,
        sync_historical: true,
        topic: 'ListingCancelled(address,address,uint256,uint256)',
        address: nftMarketplaceAddress,
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'seller',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'nftAddress',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'ListingCancelled',
            type: 'event',
        },
        tableName: 'ListingCancelled',
    }

    const listedResponse = await Moralis.Cloud.run('watchContractEvent', nftListedOptions, {
        useMasterKey: true,
    })
    const boughtResponse = await Moralis.Cloud.run('watchContractEvent', nftPurchasedOptions, {
        useMasterKey: true,
    })
    const canceledResponse = await Moralis.Cloud.run(
        'watchContractEvent',
        listingCancelledOptions,
        {
            useMasterKey: true,
        }
    )
    if (listedResponse.success && canceledResponse.success && boughtResponse.success) {
        console.log('Success! Database Updated with watching events')
    } else {
        console.log('Something went wrong...')
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
