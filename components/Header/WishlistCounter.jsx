'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { FaRegHeart } from "react-icons/fa6";
import styles from './Header.module.css';

export default function WishlistCounter() {
    const { wishlist = [] } = useWishlist();
    const { openWishlist } = useUI();

    return (
        <div 
            className={styles.counterWrapper} 
            onClick={openWishlist}
        >
            <FaRegHeart className={styles.heart} />

            {wishlist.length > 0 && (
                <span className={styles.badge}>
                    {wishlist.length}
                </span>
            )}
        </div>
    );
}