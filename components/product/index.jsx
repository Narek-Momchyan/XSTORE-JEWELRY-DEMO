'use client';
import { useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext'; 
import Sidebar from "./Sidebar";
import ProductItem from "./ProductItem"; 
import Pagejination from './pagejination';

export default function Product({ resproduct }) {
    const { products, setAllProducts } = useProducts();
    const [currentPage, setcurrentPage] = useState(1);
    const itemperPage = 9;

    useEffect(() => {
        if (resproduct) {
            setAllProducts(resproduct);
        }
    }, [resproduct, setAllProducts]);

    useEffect(() => {
        setcurrentPage(1);
    }, [products.length]);

    const totalPage = Math.ceil(products.length / itemperPage);
    const startIndex = (currentPage - 1) * itemperPage;
    const currentItems = products.slice(startIndex, startIndex + itemperPage);

    return (
        <div className='wrapper' >
            <div >
                <Sidebar />
                <ProductItem displayedProducts={currentItems} />
            </div>
            
            {totalPage > 1 && (
                <Pagejination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onPageChange={setcurrentPage}
                />
            )}
        </div>
    );
}