"use client"
import { CartContext } from "@/context/CartContext"
import { useContext } from "react"
import { FaRegTrashCan } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import styles from './basket.module.css'

export default function Total({ currentLang }) {
    const { orders, removeAll, totalAmount } = useContext(CartContext)
    const router = useRouter()
    
  return orders.length > 0 && (
    <div className={styles.totalContainer}>
           <div className={styles.total}>
            <p>{currentLang === 'am' ? 'Ընդամենը:' : 'Total:'} ${totalAmount.toFixed(2)}</p>
            <FaRegTrashCan onClick={removeAll} style={{ cursor: 'pointer' }} />
           </div>
           <button 
             className={styles.buyButton}
             onClick={() => router.push('/checkout')}
           >
            {currentLang === 'am' ? 'Անցնել վճարմանը' : 'Proceed to Checkout'}
           </button>
    </div>
  )
}