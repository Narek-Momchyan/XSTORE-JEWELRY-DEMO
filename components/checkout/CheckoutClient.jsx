'use client';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from '@/lib/api';
import styles from './checkout.module.css';

const calcDiscounted = (base, qty) => {
    if (qty >= 6) return base * 0.9;
    if (qty >= 3) return base * 0.95;
    return base;
};

export default function CheckoutClient({ lang }) {
    const { orders, totalAmount, removeAll } = useContext(CartContext);
    const router = useRouter();

    const [t, setT] = useState(null);
    const [form, setForm] = useState({
        firstName: '', lastName: '', company: '',
        country: 'United States (US)', address1: '', address2: '',
        city: '', state: 'California', phone: '', zip: '', email: '',
        notes: '', payment: 'check',
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const res = await axios.get(`checkoutTexts?lang=${lang}`);
                if (res.data && res.data.length > 0) {
                    setT(res.data[0]);
                }
            } catch (err) {
                console.error('Checkout texts fetch error:', err);
            }
        };
        fetchTexts();
    }, [lang]);

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = true;
        if (!form.lastName.trim()) e.lastName = true;
        if (!form.address1.trim()) e.address1 = true;
        if (!form.city.trim()) e.city = true;
        if (!form.phone.trim()) e.phone = true;
        if (!form.zip.trim()) e.zip = true;
        if (!form.email.trim()) e.email = true;
        return e;
    };

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setErrors(er => ({ ...er, [e.target.name]: false }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitted(true);
        removeAll();
    };

    if (!t) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className={styles.successWrapper}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>✓</div>
                    <h2>{t.successTitle}</h2>
                    <p>{t.successMsg}</p>
                    <button onClick={() => router.push('/product')} className={styles.backBtn}>
                        {t.backShop}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.page}>
                <div className={styles.couponBar}>
                    <span>{t.coupon}</span>
                </div>

                <form className={styles.grid} onSubmit={handleSubmit}>
                    <div className={styles.left}>
                        <h2 className={styles.sectionTitle}>{t.billing}</h2>

                        <div className={styles.row2}>
                            <div className={styles.field}>
                                <label>{t.firstName}</label>
                                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}
                                    className={errors.firstName ? styles.errInput : ''} />
                            </div>
                            <div className={styles.field}>
                                <label>{t.lastName}</label>
                                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}
                                    className={errors.lastName ? styles.errInput : ''} />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>{t.company}</label>
                            <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
                        </div>

                        <div className={styles.field}>
                            <label>{t.country}</label>
                            <select name="country" value={form.country} onChange={handleChange}>
                                <option>United States (US)</option>
                                <option>Armenia</option>
                                <option>Russia</option>
                                <option>Germany</option>
                                <option>France</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label>{t.streetAddress}</label>
                            <input name="address1" placeholder={t.address1Placeholder} value={form.address1} onChange={handleChange}
                                className={errors.address1 ? styles.errInput : ''} />
                            <input name="address2" placeholder={t.address2Placeholder} value={form.address2} onChange={handleChange}
                                className={styles.mt8} />
                        </div>

                        <div className={styles.row2}>
                            <div className={styles.field}>
                                <label>{t.cityLabel}</label>
                                <input name="city" value={form.city} onChange={handleChange}
                                    className={errors.city ? styles.errInput : ''} />
                            </div>
                            <div className={styles.field}>
                                <label>{t.stateLabel}</label>
                                <select name="state" value={form.state} onChange={handleChange}>
                                    <option>California</option>
                                    <option>New York</option>
                                    <option>Texas</option>
                                    <option>Florida</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row2}>
                            <div className={styles.field}>
                                <label>{t.phone}</label>
                                <input name="phone" value={form.phone} onChange={handleChange}
                                    className={errors.phone ? styles.errInput : ''} />
                            </div>
                            <div className={styles.field}>
                                <label>{t.zip}</label>
                                <input name="zip" value={form.zip} onChange={handleChange}
                                    className={errors.zip ? styles.errInput : ''} />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>{t.email}</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange}
                                className={errors.email ? styles.errInput : ''} />
                        </div>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '30px' }}>
                            {t.addInfo}
                        </h2>
                        <div className={styles.field}>
                            <label>{t.notes}</label>
                            <textarea name="notes" rows={4} value={form.notes} onChange={handleChange}
                                placeholder={t.notesPlaceholder} />
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.summary}>
                            <h2 className={styles.summaryTitle}>{t.yourOrder}</h2>

                            <div className={styles.summaryHeader}>
                                <span>{t.product}</span>
                                <span>{t.subtotal}</span>
                            </div>

                            <div className={styles.summaryItems}>
                                {orders.map(item => {
                                    const base = item.basePrice || (typeof item.price === 'string'
                                        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
                                        : Number(item.price));
                                    const unitPrice = calcDiscounted(base, item.quantity);
                                    const rowTotal = unitPrice * item.quantity;
                                    return (
                                        <div className={styles.summaryRow} key={item.id}>
                                            <div className={styles.itemInfo}>
                                                {item.images?.[0] && (
                                                    <Image src={item.images[0]} alt={item?.title || 'product'}
                                                        width={50} height={50}
                                                        style={{ objectFit: 'contain', borderRadius: '6px' }}
                                                        unoptimized />
                                                )}
                                                <div>
                                                    <p className={styles.itemTitle}>{item?.title}</p>
                                                    <p className={styles.itemQty}>&times; {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className={styles.itemRowTotal}>${rowTotal.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.summaryLine}>
                                <span>{t.subtotal}</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className={`${styles.summaryLine} ${styles.totalLine}`}>
                                <span>{t.total}</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>

                            <div className={styles.paymentBlock}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="payment" value="check"
                                        checked={form.payment === 'check'} onChange={handleChange} />
                                    <span>{t.checkPayment}</span>
                                </label>
                                {form.payment === 'check' && (
                                    <p className={styles.paymentHint}>{t.checkHint}</p>
                                )}
                                <label className={styles.radioLabel} style={{ marginTop: '10px' }}>
                                    <input type="radio" name="payment" value="cash"
                                        checked={form.payment === 'cash'} onChange={handleChange} />
                                    <span>{t.cashDelivery}</span>
                                </label>
                            </div>

                            <button type="submit" className={styles.placeOrderBtn}>
                                {t.placeOrder}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
