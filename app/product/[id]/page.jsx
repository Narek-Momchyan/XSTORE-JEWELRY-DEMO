import React from 'react';
import axios from "@/lib/api";
import { getCurrentLang } from '@/lib/Lang';
import ProductDetail from '@/components/product-detail/ProductDetail';

export default async function ProductPage({ params }) {
    const { id } = await params;
    const lang = await getCurrentLang();

    let product = null;
    try {
        const res = await axios.get(`product/${id}`);
        product = res.data;
    } catch (error) {
        console.error("Error fetching product", error);
    }

    if (!product) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Product not found</div>;
    }

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
            <ProductDetail product={product} lang={lang} />
        </div>
    );
}
