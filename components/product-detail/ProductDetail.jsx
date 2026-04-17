"use client";
import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaFire, FaEye, FaPlus, FaMinus } from 'react-icons/fa6';
import { CartContext } from '@/context/CartContext';
import styles from './ProductDetail.module.css';
import axios from "@/lib/api";

export default function ProductDetail({ product, lang }) {
    const [mainImg, setMainImg] = useState(product?.images?.[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [texts, setTexts] = useState(null);
    const { add, setShow } = useContext(CartContext);

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const res = await axios.get(`productDetailTexts?lang=${lang}`);
                if (res.data && res.data.length > 0) {
                    setTexts(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching texts", err);
            }
        };
        fetchTexts();
    }, [lang]);

    if (!product || !texts) return null;

    const rawPrice = product.price || 15;
    const numericPrice = typeof rawPrice === 'string'
        ? Number(rawPrice.replace(/[^0-9.-]+/g, ""))
        : Number(rawPrice);

    const calculatePrice = (qty) => {
        let price = numericPrice;
        if (qty >= 6) {
            price = numericPrice * 0.9;
        } else if (qty >= 3) {
            price = numericPrice * 0.95;
        }
        return price;
    };

    const handleAddToCart = (specificQty) => {
        const qtyToAdd = typeof specificQty === 'number' ? specificQty : quantity;
        const finalPrice = calculatePrice(qtyToAdd);

        add({
            id: product.id,
            title: product.name || product?.title,
            price: finalPrice,
            images: product.images,
            quantity: qtyToAdd
        });
        setShow(true);
    };

    const handleQuantity = (type) => {
        if (type === 'dec' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'inc') {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.gallery}>
                    <motion.div
                        key={mainImg}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={styles.mainImageContainer}
                    >
                        <img src={mainImg} alt={product?.title} className={styles.mainImage} />
                    </motion.div>

                    <div className={styles.thumbnailContainer}>
                        {product.images?.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${styles.thumbnail} ${mainImg === img ? styles.activeThumb : ''}`}
                                onClick={() => setMainImg(img)}
                            >
                                <img src={img} alt={`Thumb ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{product?.title}</h1>

                    <div className={styles.ratingInfo}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} color={i < Math.floor(product.rating || 5) ? '#D4AF37' : '#e4e5e9'} />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>
                            ({product.reviewCount || 0} {texts.reviews})
                        </span>
                    </div>

                    <div className={styles.priceRow}>
                        {product.oldPrice && <span className={styles.oldPrice}>{product.oldPrice}</span>}
                        <h2 className={styles.price}>{product.price}</h2>
                        {product.discount && <span className={styles.detailSaleBadge}>{product.discount}</span>}
                    </div>

                    <div className={styles.statsRow}>
                        <FaEye color="#666" />
                        <span>{product.views || 35} {texts.viewing}</span>
                    </div>
                    <div className={styles.statsRow}>
                        <FaFire color="#e74c3c" />
                        <span>3 {texts.sold}</span>
                    </div>

                    <div className={styles.descriptionBlock}>
                        <h3>{texts.descTitle}</h3>
                        <p>{product.description}</p>
                        <ul className={styles.features}>
                            <li>{product.material || texts.features[0]}</li>
                            <li>{texts.features[1]}</li>
                            <li>{texts.brandLabel}: {product.brand || 'Luxury'}</li>
                        </ul>
                    </div>

                    <p className={styles.delivery}>{texts.delivery}</p>

                    <div className={styles.actionRow}>
                        <div className={styles.quantity}>
                            <button onClick={() => handleQuantity('dec')}><FaMinus size={12} /></button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={() => handleQuantity('inc')}><FaPlus size={12} /></button>
                        </div>
                        <button className={styles.addToCartBtn} onClick={() => handleAddToCart()}>
                            {texts.addToCart}
                        </button>
                    </div>

                    <div className={styles.orDivider}>{texts.or}</div>

                    <button className={styles.buyNowBtn} onClick={() => handleAddToCart()}>
                        {texts.buyNow}
                    </button>

                    <div className={styles.offers}>
                        <h3>{texts.offersTitle}</h3>
                        <div className={styles.offerItem}>
                            <div>
                                <h4>{texts.offer1Title}</h4>
                                <p>{texts.offer1Desc}</p>
                            </div>
                            <button onClick={() => handleAddToCart(3)}>{texts.addToCart}</button>
                        </div>
                        <div className={styles.offerItem}>
                            <div>
                                <h4>{texts.offer2Title}</h4>
                                <p>{texts.offer2Desc}</p>
                            </div>
                            <button onClick={() => handleAddToCart(6)}>{texts.addToCart}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
