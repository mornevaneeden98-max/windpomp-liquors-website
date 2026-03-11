import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useContent from '../hooks/useContent';

const Inquiry = () => {
    const { content, loading } = useContent();
    const { cart, removeFromCart } = useCartStore();

    const getBottleCount = (size, boxQty) => {
        switch (size) {
            case '750ml': return boxQty * 12;
            case '200ml': return boxQty * 45;
            case '100ml': return boxQty * 90;
            default: return 0;
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/sales@example.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setSubmitSuccess(true);
                form.reset();
                cart.forEach(item => removeFromCart(item.id, item.size));
            } else {
                alert("Something went wrong. Please try again or use the WhatsApp button.");
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again or use the WhatsApp button.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return null;
    const data = content?.pages?.inquiry || {};

    // Create a text summary of the cart for the email
    const cartSummaryText = cart.length > 0
        ? cart.map(item => `${item.quantity} Box(es) of ${item.name} (${item.size})`).join(' | ')
        : 'None';

    if (submitSuccess) {
        return (
            <div className="page-root">
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        className="glass-panel"
                        style={{ padding: '3rem 1.5rem', marginTop: '2rem' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#25D366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Inquiry Sent Successfully!</h2>
                        <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                            Thank you for reaching out. Our sales team will review your requirements and get back to you shortly.
                        </p>
                        <button onClick={() => setSubmitSuccess(false)} className="btn btn-primary">
                            Send Another Inquiry
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-root">
            <div className="container">
                <motion.div
                    className="glass-panel"
                    style={{ padding: '2rem 1.5rem', marginTop: '2rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="hero-subtitle" data-editable="pages.inquiry.subtitle">{data.subtitle || "Logistics & Supply"}</span>
                        <h1 className="heading-xl" data-editable="pages.inquiry.title">{data.title || "Wholesale Liquor Sales"}</h1>
                        <p className="text-muted" style={{ marginBottom: '0.5rem' }} data-editable="pages.inquiry.desc">
                            {data.desc || "Whether you need 10 boxes for an event or a full shipping container for nationwide distribution, Windpomp Liquors is fully equipped to handle your wholesale liquor needs."}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <a href={`mailto:${content?.global?.email || 'sales@example.com'}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} data-editable="global.email">
                                {content?.global?.email || "sales@example.com"}
                            </a>
                            <a
                                href={`https://wa.me/${(content?.global?.phone || "079 490 1492").replace(/\s/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                                style={{
                                    background: '#25D366',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)'
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp Now
                            </a>
                        </div>
                        <p className="text-gold" style={{ fontSize: '0.9rem', fontWeight: 500 }} data-editable="pages.inquiry.note">
                            {data.note || "* All necessary distribution documentation, compliance certificates, and liquor licenses are available upon request."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* FormSubmit Configuration */}
                        <input type="hidden" name="_subject" value="New Wholesale Inquiry! (Windpomp Liquors)" />
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        <input type="hidden" name="Cart Items" value={cartSummaryText} />

                        <div className="grid-cols-2 grid-gap-lg">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" className="form-input" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Company / Venue Name</label>
                                <input type="text" name="company" className="form-input" placeholder="Your Business" required />
                            </div>
                        </div>

                        <div className="grid-cols-2 grid-gap-lg">
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input type="email" name="email" className="form-input" placeholder="john@company.com" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone / WhatsApp</label>
                                <input type="tel" name="phone" className="form-input" placeholder="+27 ..." required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Type of Inquiry</label>
                            <select name="type" className="form-input" style={{ appearance: 'none' }}>
                                <option value="National Delivery (Boxes)">National Delivery (Boxes)</option>
                                <option value="National Delivery (Pallets)">National Delivery (Pallets)</option>
                                <option value="Other Inquiry">Other Inquiry</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label" style={{ marginBottom: '1rem', fontSize: '1rem', color: '#fff' }}>Cart Items</label>

                            {cart.length === 0 ? (
                                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '4px', textAlign: 'center' }}>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>You have not added any specific products from the shop.</p>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>You may proceed by just describing your needs below.</p>
                                </div>
                            ) : (
                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    {cart.map((item, index) => (
                                        <div key={`${item.id}-${item.size}`} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            borderBottom: index < cart.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{item.quantity} {item.quantity === 1 ? 'Box' : 'Boxes'} of {item.name}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                                        Size: {item.size} | Total Bottles: <span className="text-gold">{getBottleCount(item.size, item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '0.5rem' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Product Requirements / Message</label>
                            <textarea
                                name="message"
                                className="form-input"
                                rows="4"
                                placeholder={cart.length > 0 ? "Any additional details regarding the items in your cart? Or need something else?" : "E.g., 5 pallets of Kaia Gin, 10 boxes of Kaia Whizza..."}
                            ></textarea>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                            {isSubmitting ? 'Sending Inquiry...' : 'Submit Wholesale Inquiry'}
                        </button>
                        <p className="text-muted" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem' }}>
                            Our sales team generally responds within 24 business hours.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Inquiry;
