import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import useContent from '../hooks/useContent';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const cartItems = useCartStore((state) => state.cart);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const { content } = useContent();
    const g = content?.global || {};

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: g.navHome || 'Home', key: 'global.navHome', path: '/' },
        { name: g.navShop || 'Shop', key: 'global.navShop', path: '/shop' },
        { name: g.navSales || 'National Sales', key: 'global.navSales', path: '/sales' },
        { name: g.navAbout || 'Our Story', key: 'global.navAbout', path: '/about' },
    ];

    return (
        <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="top-bar">
                <div className="container top-bar-container">
                    <span data-editable="global.welcome">{g.welcome || 'Wholesale & Distribution'}</span>
                    <div className="top-bar-info">
                        <span data-editable="global.phone">{g.phone}</span>
                        <span data-editable="global.email">sales@example.com</span>
                    </div>
                </div>
            </div>
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
                    <div className="nav-logo-wrap" data-editable="global.company">
                        <span className="logo-text-top">WIND<span className="text-gold">POMP</span></span>
                        <span className="logo-text-bottom text-gold">LIQUORS</span>
                    </div>
                </Link>

                <nav className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            data-editable={link.key}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/inquiry" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <ShoppingCart size={16} />
                        <span data-editable="global.navInquiry">{g.navInquiry || 'Wholesale Inquiry'}</span>
                        {totalItems > 0 && (
                            <motion.span
                                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                style={{
                                    background: 'var(--primary)',
                                    color: '#000',
                                    borderRadius: '50%',
                                    padding: '0.1rem 0.4rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    display: 'inline-block'
                                }}
                            >
                                {totalItems} !
                            </motion.span>
                        )}
                    </Link>
                </nav>

                <div className="mobile-actions">
                    <Link to="/inquiry" className="mobile-cart-btn" aria-label="Cart">
                        <ShoppingCart size={20} />
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </Link>
                    <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <motion.div
                        className="mobile-menu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                data-editable={link.key}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/inquiry"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span data-editable="global.navInquiry">{g.navInquiry || 'Wholesale Inquiry'}</span>
                        </Link>
                    </motion.div>
                </>
            )}
        </header>
    );
};

export default Navbar;
