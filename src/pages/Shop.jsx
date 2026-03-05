import React from 'react';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import useContent from '../hooks/useContent';

const Shop = () => {
    const { content, loading } = useContent();
    const [selectedSizes, setSelectedSizes] = React.useState({});
    const [quantities, setQuantities] = React.useState({});
    const [toastMessage, setToastMessage] = React.useState(null);
    const addToCart = useCartStore((state) => state.addToCart);

    if (loading || !content || !content.pages || !content.products) return (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="fade-in" style={{ color: 'var(--primary)', letterSpacing: '2px' }}>LOADING COLLECTION...</div>
        </div>
    );

    const data = content.pages.shop || {};
    const products = content.products;
    const images = content.pages.home;

    const handleSizeSelect = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prev => {
            const current = prev[productId] || 1;
            const next = Math.max(1, current + delta);
            return { ...prev, [productId]: next };
        });
    };

    const handleAddToCart = (product) => {
        const size = selectedSizes[product.id] || product.sizes[0];
        const qty = quantities[product.id] || 1;

        addToCart({
            ...product,
            selectedSize: size,
            qtyToAdd: qty
        });

        setToastMessage(`Added ${qty} ${qty === 1 ? 'Box' : 'Boxes'} of ${product.name} (${size}) to inquiry!`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '6rem' }}>
            <div className="container-fluid">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    data-editable="pages.home.heroImage"
                    style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        marginBottom: '4rem',
                        borderRadius: '12px',
                        backgroundImage: `linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.8)), url("${images.heroImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer'
                    }}
                >
                    <span className="hero-subtitle" data-editable="pages.shop.heroSubtitle">{data.heroSubtitle || "Our Collection"}</span>
                    <h1 className="heading-lg" data-editable="pages.shop.heroTitle" style={{ marginBottom: '1rem' }}>{data.heroTitle || "Premium Spirits"}</h1>
                    <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }} data-editable="pages.shop.heroDesc">
                        {data.heroDesc || "Explore our meticulously crafted spirits. Available in bulk, boxes, or pallets for personal enjoyment or commercial resale."}
                    </p>
                </motion.div>

                <div className="grid-cols-4">
                    {products.map((item, index) => {
                        const currentSize = selectedSizes[item.id] || item.sizes[0];
                        const currentQty = quantities[item.id] || 1;

                        return (
                            <motion.div
                                key={item.id}
                                className="product-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div
                                    style={{
                                        height: '350px',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}
                                    data-editable={`products.${index}.image`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        className="product-image-inner"
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span
                                        className="product-category"
                                        data-editable={`products.${index}.category`}
                                    >
                                        {item.category}
                                    </span>
                                    <h3
                                        className="product-title"
                                        data-editable={`products.${index}.name`}
                                    >
                                        {item.name}
                                    </h3>
                                    <p
                                        className="text-muted"
                                        style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}
                                        data-editable={`products.${index}.description`}
                                    >
                                        {item.description}
                                    </p>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        {item.sizes.length > 1 && (
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                                {item.sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => handleSizeSelect(item.id, size)}
                                                        style={{
                                                            padding: '0.4rem 0.8rem',
                                                            background: currentSize === size ? 'var(--primary)' : 'transparent',
                                                            border: '1px solid var(--primary)',
                                                            color: currentSize === size ? '#000' : 'var(--primary)',
                                                            borderRadius: '4px',
                                                            fontSize: '0.8rem',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s'
                                                        }}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{
                                            background: 'rgba(212, 175, 55, 0.1)',
                                            padding: '0.4rem',
                                            borderRadius: '4px',
                                            marginBottom: '1rem',
                                            fontSize: '0.8rem',
                                            color: 'var(--primary)',
                                            fontWeight: '500'
                                        }}>
                                            {currentSize === '750ml' ? '12 Bottles Per Box' :
                                                currentSize === '200ml' ? '45 Bottles Per Box' :
                                                    currentSize === '100ml' ? '90 Bottles Per Box' : ''}
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <button onClick={() => handleQuantityChange(item.id, -1)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.8rem', cursor: 'pointer', borderRadius: '4px', fontSize: '1.2rem' }}>-</button>
                                            <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>{currentQty}</span>
                                            <button onClick={() => handleQuantityChange(item.id, 1)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.8rem', cursor: 'pointer', borderRadius: '4px', fontSize: '1.2rem' }}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-outline"
                                    style={{ width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                                    onClick={() => handleAddToCart(item)}
                                >
                                    ADD {currentQty} {currentQty === 1 ? 'BOX' : 'BOXES'}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        fontWeight: 'bold'
                    }}
                >
                    {toastMessage}
                </motion.div>
            )}
        </div>
    );
};

export default Shop;
