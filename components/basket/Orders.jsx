"use client"
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"
import { HiMiniXMark } from "react-icons/hi2";
import Image from "next/image";
import styles from './basket.module.css'

export default function Orders({ currentLang }) {
    const { orders, plus, minus, remove } = useContext(CartContext);

    return (
        <div className={styles.orderList}>
            {orders.map(elem => {
                const basePrice = elem.basePrice || (typeof elem.price === 'string' 
                    ? parseFloat(elem.price.replace(/[^0-9.-]+/g, "")) 
                    : Number(elem.price || 0));

                const calculateDiscountedPrice = (price, qty) => {
                    if (qty >= 6) return price * 0.9;
                    if (qty >= 3) return price * 0.95;
                    return price;
                };

                const currentItemPrice = calculateDiscountedPrice(basePrice, elem.quantity);
                const hasDiscount = elem.quantity >= 3;

                const itemImage = elem.images && elem.images.length > 0 
                    ? elem.images[0] 
                    : "/placeholder-image.png"; 

                return (
                    <div className={styles.order} key={elem.id}>
                        <Image
                            src={itemImage}
                            alt={elem.title || "product image"}
                            width={80}
                            height={80}
                            style={{ objectFit: 'contain' }}
                            unoptimized={itemImage.startsWith('data:')} 
                        />

                        <div className={styles.content}>
                            <div className={styles.title}>
                                <h2>
                                    {elem.title 
                                        ? elem.title.slice(0, 15) 
                                        : (currentLang === 'am' ? 'Անվանում չկա' : 'No title')}...
                                </h2>
                                <HiMiniXMark 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => remove(elem.id)} 
                                />
                            </div>

                            <div className={styles.bottomSide}>
                                <div className={styles.action}>
                                    <button onClick={() => minus(elem.id)}>-</button>
                                    <span>{elem.quantity}</span>
                                    <button onClick={() => plus(elem.id)}>+</button>
                                </div>

                                <div className={styles.priceBox}>
                                    <p>
                                        {currentLang === 'am' ? 'Արժեք:' : 'Price:'}{' '}
                                        {hasDiscount && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '11px', marginRight: '5px' }}>${basePrice.toFixed(2)}</span>}
                                        <b style={{ color: hasDiscount ? '#e74c3c' : 'inherit' }}>${currentItemPrice.toFixed(2)}</b>
                                        {elem.quantity >= 6 && <span className={styles.discountBadge}>-10%</span>}
                                        {elem.quantity >= 3 && elem.quantity < 6 && <span className={styles.discountBadge}>-5%</span>}
                                    </p>
                                    <p>{currentLang === 'am' ? 'Ընդամենը:' : 'Total:'} <b>${(currentItemPrice * elem.quantity).toFixed(2)}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}