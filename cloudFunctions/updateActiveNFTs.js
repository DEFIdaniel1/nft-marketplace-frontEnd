Moralis.Cloud.afterSave('NFTListed', async (request) => {
    const confirmed = request.object.get('confirmed')
    const logger = Moralis.Cloud.getLogger()
    logger.info('Looking for confirmed TX...')
    if (confirmed) {
        logger.info('Found item!')
        const ActiveItem = Moralis.Object.extend('ActiveItem')

        // First check for activeItem exists and delete before updating
        const query = new Moralis.Query(ActiveItem)
        query.equalTo('nftAddress', request.object.get('nftAddress'))
        query.equalTo('tokenId', request.object.get('tokenId'))
        query.equalTo('marketplaceAddress', request.object.get('address'))
        query.equalTo('seller', request.object.get('seller'))
        logger.info(`Marketplace | Query: ${query}`)
        const alreadyListedItem = await query.first()
        console.log(`alreadyListedItem ${JSON.stringify(alreadyListedItem)}`)
        if (alreadyListedItem) {
            logger.info(`Deleting ${alreadyListedItem.id}`)
            await alreadyListedItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    'tokenId'
                )} at address ${request.object.get('address')} since the listing is being updated. `
            )
        }

        // Add new Active NFT Items
        const activeItem = new ActiveItem()
        activeItem.set('marketplaceAddress', request.object.get('address'))
        activeItem.set('nftAddress', request.object.get('nftAddress'))
        activeItem.set('price', request.object.get('price'))
        activeItem.set('tokenId', request.object.get('tokenId'))
        activeItem.set('seller', request.object.get('seller'))
        logger.info(
            `Adding Address: ${request.object.get('address')} TokenId: ${request.object.get(
                'tokenId'
            )}`
        )
        logger.info('Saving...')
        await activeItem.save()
    }
})

// Cancel NFT Listing
Moralis.Cloud.afterSave('ListingCancelled', async (request) => {
    const confirmed = request.object.get('confirmed')
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Listing cancellation requested: ${request.object}`)
    if (confirmed) {
        const ActiveNFT = Moralis.Object.extend('ActiveItem')
        const query = new Moralis.Query(ActiveNFT)
        // Check if these elements match, if yes, we delete the listing
        query.equalTo('marketplaceAddress', request.object.get('address'))
        query.equalTo('nftAddress', request.object.get('nftAddress'))
        query.equalTo('tokenId', request.object.get('tokenId'))
        logger.info(`Marketplace Query: ${query}`)
        const cancelledNFT = await query.first() //if none found, returns undefined

        logger.info(`Marketplace Cancelled NFT: ${JSON.stringify(cancelledNFT)}`)
        if (cancelledNFT) {
            logger.info(
                `Deleting NFT: ID ${request.object.get(
                    'tokenId'
                )} from address ${request.object.get('nftAddress')}`
            )
            await cancelledNFT.destroy()
        } else {
            logger.info(
                `No item found with ID ${request.object.get(
                    'tokenId'
                )} from address ${request.object.get('nftAddress')}`
            )
        }
    }
})

// BUY NFT removes from ActiveItem database
Moralis.Cloud.afterSave('NFTPurchased', async (request) => {
    const confirmed = request.object.get('confirmed')
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend('ActiveItem')
        const query = new Moralis.Query(ActiveItem)
        query.equalTo('marketplaceAddress', request.object.get('address'))
        query.equalTo('nftAddress', request.object.get('nftAddress'))
        query.equalTo('tokenId', request.object.get('tokenId'))
        logger.info(`Marketplace | Query: ${query}`)
        const boughtItem = await query.first()
        logger.info(`Marketplace | boughtItem: ${JSON.stringify(boughtItem)}`)
        if (boughtItem) {
            logger.info(
                `Deleting ${request.object.get('tokenId')} at address ${request.object.get(
                    'nftAddress'
                )}`
            )
            await boughtItem.destroy()
            logger.info('Deleted NFT item.')
        } else {
            logger.info(
                `No item found at ${request.object.get('tokenId')} at address ${request.object.get(
                    'nftAddress'
                )}`
            )
        }
    }
})
