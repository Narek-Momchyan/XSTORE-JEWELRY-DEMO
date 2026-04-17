import { useContext } from "react"
import { CartContext } from "@/context/CartContext"
import { FaArrowRight } from "react-icons/fa"
import styles from './basket.module.css'

export default function Head({ currentLang }) {
    const { setShow, totalCount } = useContext(CartContext)
 
  return (
    <div className={styles.head}>
        <h2>{currentLang === 'am' ? 'Զամբյուղ' : 'Basket'} ({totalCount})</h2> 
        <FaArrowRight onClick={() => setShow(false)} style={{ cursor: 'pointer' }} />
    </div>
  )
}