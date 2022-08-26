import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ConnectButton from './ConnectButton'

export default function Header() {
    return (
        <>
            <nav>
                <Link href="/">NFT Marketplace</Link>
                <Link href="/mint-nft">Mint NFT</Link>
                <Link href="/sell-nft">List NFT</Link>
                <ConnectButton />
            </nav>
        </>
    )
}
