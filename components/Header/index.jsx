import styles from './Header.module.css'
import axios from '@/lib/api'
import { getCurrentLang } from '@/lib/Lang'
import Languages from './Languages'
import NavBar from './navbar'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import SearchInput from './searchInput'
import AuthMod from './Authmod'
import WishlistCounter from './WishlistCounter' 
import WishlistSidebar from './WishlistSidebar' 

import CartCounter from './CartCounter';

export default async function Header() {
    let reslang = [];
    let resnavbar = [];
    let resLogo = null;
    let wishlistTrans = null;

    try {
        const lang = await getCurrentLang();
        
        const [langData, navData, logoData, wishlistData] = await Promise.all([
            axios.get("languages").catch(() => ({ data: [] })),
            axios.get(`navbar?lang=${lang}`).catch(() => ({ data: [] })),
            axios.get("logo").catch(() => ({ data: null })),
            axios.get(`wishlist_translations?lang=${lang}`).catch(() => ({ data: [] }))
        ]);

        reslang = langData.data || [];
        resnavbar = navData.data || [];
        resLogo = logoData.data || null;
        wishlistTrans = wishlistData.data?.[0] || null;
    } catch (error) {
        console.error("Header data fetch error:", error);
    }

    return (
        <header className={styles.header}>
            <Logo logo={resLogo} />

            <div className={styles.bottomRow}>
                <div className={styles.leftSection}>
                    <MobileMenu navbar={resnavbar} />
                    <AuthMod/>
                    <SearchInput/>
                </div>

                <NavBar navbar={resnavbar} />

                <div className={styles.rightSection}>
                    <Languages langs={reslang} />
                    <WishlistCounter />
                    <CartCounter />
                </div>
            </div>

            <WishlistSidebar translations={wishlistTrans} />
        </header>
    )
}