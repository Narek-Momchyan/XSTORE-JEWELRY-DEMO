"use client"
import { useState, useContext } from 'react'
import styles from './product.module.css'
import { FaRegEye, FaBagShopping, FaXmark, FaFilter } from "react-icons/fa6"
import { useUI } from '@/context/UIContext'
import LikeButton from './LikeButton'
import { CartContext } from '@/context/CartContext'
import Link from 'next/link'

export default function ProductItem({ displayedProducts }) {
    const [zoomImg, setZoomImg] = useState(null)
    const { toggleSidebar } = useUI()
    const { add, setShow } = useContext(CartContext)

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        add(item);
        setShow(true); 
    };

    const listToRender = displayedProducts || [];

    const renderCard = (item) => (
        <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Link href={`/product/${item.id}`}>
                    <img
                        src={item.images && item.images[0]}
                        alt={item?.title}
                        className={styles.mainImg}
                    />
                    {item.images && item.images[1] && (
                        <img
                            src={item.images[1]}
                            alt={item?.title}
                            className={styles.hoverImg}
                        />
                    )}
                </Link>

                <div className={styles.icons}>
                    <div className={styles.iconCircle} onClick={(e) => handleAddToCart(e, item)}>
                        <FaBagShopping />
                    </div>

                    <div className={styles.iconCircle}>
                        <LikeButton product={item} />
                    </div>

                    <div className={styles.iconCircle} onClick={() => setZoomImg(item.images[0])}>
                        <FaRegEye />
                    </div>
                </div>
            </div>

            <div className={styles.info}>
                <Link href={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1 className={styles.title}>{item?.title}</h1>
                </Link>
                <h2 className={styles.price}>{item.price}</h2>
                <p className={styles.description}>{item.description}</p>
            </div>
        </div>
    )

    return (
        <div className={styles.productWrapper}>
            <div className={styles.filterToggle} onClick={toggleSidebar}>
                <FaFilter />
            </div>

            <div className={styles.box}>
                {listToRender.length > 0 ? (
                    listToRender.map(renderCard)
                ) : (
                    <div className={styles.noResults}>Ապրանք չի գտնվել</div>
                )}
            </div>

            {zoomImg && (
                <div className={styles.zoomOverlay} onClick={() => setZoomImg(null)}>
                    <div className={styles.zoomWindow} onClick={(e) => e.stopPropagation()}>
                        <FaXmark className={styles.closeBtn} onClick={() => setZoomImg(null)} />
                        <div className={styles.imgContainer}>
                            <img src={zoomImg} alt="Zoom" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}