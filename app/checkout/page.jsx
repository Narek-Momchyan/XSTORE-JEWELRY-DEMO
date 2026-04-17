import CheckoutClient from '@/components/checkout/CheckoutClient';
import { getCurrentLang } from '@/lib/Lang';

export const metadata = {
    title: 'Checkout | XStore Jewelry',
    description: 'Complete your jewelry purchase securely.',
};

export default async function CheckoutPage() {
    const lang = await getCurrentLang();
    return <CheckoutClient lang={lang} />;
}
