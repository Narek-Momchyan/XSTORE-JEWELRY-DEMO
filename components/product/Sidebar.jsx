'use client';
import { useUI } from '@/context/UIContext';
import { useProducts } from '@/context/ProductContext';
import { FaXmark } from "react-icons/fa6";
import styles from './product.module.css';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import CheckboxFilter from './CheckboxFilter';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUI();
  const { 
    allProducts, 
    currentLang, 
    selectedBrands, 
    handleBrandChange, 
    selectedCategories, 
    handleCategoryChange,
    priceRange,
    setPriceRange,
    selectedRating,    
    setSelectedRating, 
    clearFilters
  } = useProducts();

  const brands = [...new Set(allProducts.filter(p => p.lang === currentLang).map(p => p.brand).filter(Boolean))];
  const categories = [...new Set(allProducts.filter(p => p.lang === currentLang).map(p => p.category).filter(Boolean))];

  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarHeading}>{currentLang === 'am' ? 'ՖԻԼՏՐ' : 'FILTER'}</h3>
        <FaXmark onClick={closeSidebar} style={{ cursor: 'pointer' }} />
      </div>

      <PriceFilter 
        currentLang={currentLang} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
      />

      <RatingFilter 
        currentLang={currentLang} 
        selectedRating={selectedRating} 
        setSelectedRating={setSelectedRating} 
      />

      <CheckboxFilter 
        title={currentLang === 'am' ? 'ԿԱՏԵԳՈՐԻԱ' : 'CATEGORY'}
        items={categories}
        selectedItems={selectedCategories}
        onToggle={handleCategoryChange}
      />

      <CheckboxFilter 
        title={currentLang === 'am' ? 'ԲՐԵՆԴ' : 'BRAND'}
        items={brands}
        selectedItems={selectedBrands}
        onToggle={handleBrandChange}
      />

      <button className={styles.clearAllBtn} onClick={clearFilters} type="button">
         {currentLang === 'am' ? 'ՄԱՔՐԵԼ ԲՈԼՈՐԸ' : 'CLEAR ALL'}
      </button>
    </aside>
  );
}