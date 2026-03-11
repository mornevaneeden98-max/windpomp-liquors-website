import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Package, Globe, Layout } from 'lucide-react';
import useContent from '../hooks/useContent';

const Home = () => {
    const { content, loading } = useContent();

    if (loading) return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Layout size={48} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (!content || !content.pages || !content.pages.home) return null;
    const data = content.pages.home;

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div
                    className="hero-bg"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,1) 100%), url("${data.heroImage}")`, cursor: 'pointer' }}
                    data-editable="pages.home.heroImage"
                ></div>
                <div className="container">
                    <motion.div
                        className="hero-content glass-panel"
                        style={{ borderLeft: '4px solid var(--primary)' }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="hero-subtitle" data-editable="pages.home.heroSubtitle">{data.heroSubtitle || "Premium Spirits Hub"}</span>
                        <h1 className="heading-xl" data-editable="pages.home.heroTitle" style={{ whiteSpace: 'pre-line', color: '#ffffff', display: 'block' }}>
                            {data.heroTitle && data.heroTitle.trim() !== "" ? data.heroTitle : "Crafted by Kaia Distillery. \nDistributed Nationwide."}
                        </h1>
                        <p className="text-muted" data-editable="pages.home.heroDesc" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                            {data.heroDesc && data.heroDesc.trim() !== "" ? data.heroDesc : "Welcome to the official Windpomp Liquors portal. We are the authorized national distributor for Kaia Distillery's premium gin, brannas, rum, and more."}
                        </p>
                        <div className="btn-group">
                            <Link to="/shop" className="btn btn-primary">Discover Spirits</Link>
                            <Link to="/sales" className="btn btn-outline">Corporate & Pallets</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features / Legitimacy Section */}
            <section className="section" style={{ backgroundColor: 'var(--bg-dark)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="heading-lg" data-editable="pages.home.featuresTitle">{data.featuresTitle || "Why Choose Windpomp Liquors?"}</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }} data-editable="pages.home.featuresDesc">
                            {data.featuresDesc || "An exclusive sales partnership built on trust. Windpomp Liquors is the official national distributor for Kaia Distillery's expertly crafted spirits."}
                        </p>
                    </div>

                    <div className="grid-cols-3">
                        <motion.div
                            className="feature-box"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Shield size={48} className="feature-icon" />
                            <h3 data-editable="pages.home.feature1Title">{data.feature1Title || "Certified Legitimacy"}</h3>
                            <p className="text-muted" data-editable="pages.home.feature1Desc">
                                {data.feature1Desc || "Every drop of Kaia alcohol is vetted, certified, and supplied directly through our master sales agreement. When you order from Windpomp Liquors, you receive authentic Kaia Distillery products straight from the source."}
                            </p>
                        </motion.div>

                        <motion.div
                            className="feature-box"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Package size={48} className="feature-icon" />
                            <h3 data-editable="pages.home.feature2Title">{data.feature2Title || "Wholesale Ready"}</h3>
                            <p className="text-muted" data-editable="pages.home.feature2Desc">
                                {data.feature2Desc || "From a few boxes for your local establishment to full pallet shipments across the country, our logistics are primed for your needs."}
                            </p>
                        </motion.div>

                        <motion.div
                            className="feature-box"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Globe size={48} className="feature-icon" />
                            <h3 data-editable="pages.home.feature3Title">{data.feature3Title || "National Distribution"}</h3>
                            <p className="text-muted" data-editable="pages.home.feature3Desc">
                                {data.feature3Desc || "Fast and reliable nationwide delivery. Our dedicated sales team ensures that local liquor compliance is handled seamlessly."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Export Quality Section */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0', display: 'flex', alignItems: 'center' }}>
                <div
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url("${data.exportImage}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)', zIndex: -1, cursor: 'pointer' }}
                    data-editable="pages.home.exportImage"
                ></div>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '700px', margin: '0 auto' }}
                    >
                        <h2 className="heading-lg text-gold" data-editable="pages.home.exportTitle" style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{data.exportTitle}</h2>
                        <p className="text-main" data-editable="pages.home.exportDesc" style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                            {data.exportDesc}
                        </p>
                        <Link to="/shop" className="btn btn-outline" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>View Our Collection</Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
