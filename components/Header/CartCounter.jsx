'use client';

import { useId } from 'react';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { FaCartShopping } from "react-icons/fa6";
import styles from './Header.module.css';

export default function CartCounter() {
    const { totalCount, setShow } = useContext(CartContext);

    return (
        <div 
            className={styles.counterWrapper} 
            onClick={() => setShow(prev => !prev)}
        >
            <FaCartShopping className={styles.Cart} />

            {totalCount > 0 && (
                <span className={styles.badge}>
                    {totalCount}
                </span>
            )}
        </div>
    );
}
