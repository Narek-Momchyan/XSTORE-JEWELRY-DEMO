'use client';
import styles from './product.module.css'; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
export default function Pagejination({ currentPage, totalPage, onPageChange }) {

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return (
        <div className={styles.paginationContainer}>
            <button 
                className={`${styles.pageBtn} ${styles.navBtn}`}
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)}
            >
                <FaChevronLeft size={12} />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button 
                className={`${styles.pageBtn} ${styles.navBtn}`}
                disabled={currentPage === totalPage} 
                onClick={() => onPageChange(currentPage + 1)}
            >
              <FaChevronRight size={12} />
            </button>
        </div>
    );
}