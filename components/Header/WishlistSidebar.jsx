'use client';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import styles from './WishlistSidebar.module.css';

export default function WishlistSidebar({ translations }) {
  const { wishlist, toggleWishlist } = useWishlist(); 
  const { isWishlistOpen, closeWishlist } = useUI();

  const t = translations || {
    title: "FAVORITES",
    empty_msg: "The list is empty",
    delete_btn: "Delete"
  };

  if (!isWishlistOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeWishlist} />

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.title}</h2>
          <button onClick={closeWishlist} className={styles.closeBtn}>✕</button>
        </div>

        {wishlist.length === 0 ? (
          <p className={styles.emptyMsg}>{t.empty_msg}</p>
        ) : (
          wishlist.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartImgWrapper}>
                <img src={item.images[0]} alt={item?.title} />
              </div>
              <div className={styles.cartInfo}>
                <h4 className={styles.cartTitle}>{item?.title}</h4>
                <div className={styles.cartMeta}>
                  <span>{item.brand} | {item.material}</span>
                  <span>{item.category}</span>
                </div>
                <div className={styles.cartBottom}>
                  <span className={styles.cartPrice}>{item.price}</span>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => toggleWishlist(item)}
                  >
                    {t.delete_btn}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}