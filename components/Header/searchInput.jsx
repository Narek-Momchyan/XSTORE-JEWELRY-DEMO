'use client';
import { useProducts } from '@/context/ProductContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function SearchInput() {
  const { search, setSearch } = useProducts();
  const router = useRouter();
  const pathname = usePathname();

  // Ֆունկցիա, որը կաշխատի հենց input-ի մեջ սկսեն գրել
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);


    if (pathname !== '/product') {
      router.push('/product');
    }
  };

 
  const handleFocus = () => {
    if (pathname !== '/product') {
      router.push('/product');
    }
  };

  return (
    <input 
      type="text" 
      placeholder="SEARCH..." 
      value={search}
      onFocus={handleFocus} 
      onChange={handleChange} 
      className={styles.search}
    />
  );
}