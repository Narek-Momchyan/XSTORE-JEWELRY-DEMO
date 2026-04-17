import React from 'react';
import axios from "@/lib/api";
import { getCurrentLang } from '@/lib/Lang';
import Product from '@/components/product';
import Sidebar from '@/components/product/Sidebar';
import CategorySlider from '@/components/product/productSlider/page';

export default async function Page() {
    const lang = await getCurrentLang();
    
    const res = await axios.get(`product?lang=${lang}`);
    const resproduct = res.data;

    const headingRes = await axios.get(`headingProduct?lang=${lang}`);
    const resheadingProduct = headingRes.data?.find(h => h.lang === lang) || headingRes.data?.[0];

    return (
        <div>
            <CategorySlider resproduct={resproduct} resheadingProduct={resheadingProduct} />
            <Sidebar />
            <Product resproduct={resproduct} resheadingProduct={resheadingProduct}/>
        </div>
    );
}