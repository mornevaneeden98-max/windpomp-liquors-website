import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, ShieldCheck, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import useContent from '../hooks/useContent';

const Sales = () => {
    const { content, loading } = useContent();

    if (loading) return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Layout size={48} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (!content || !content.pages || !content.pages.sales) return null;
    const data = content.pages.sales;

    return (
        <div className="page-root">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <span className="hero-subtitle" data-editable="pages.sales.heroSubtitle">{data.heroSubtitle}</span>
                    <h1 className="heading-lg" data-editable="pages.sales.heroTitle" style={{ marginBottom: '1.5rem' }}>{data.heroTitle}</h1>
                    <p className="text-muted" data-editable="pages.sales.heroDesc" style={{ fontSize: '1.1rem' }}>
                        {data.heroDesc}
                    </p>
                </motion.div>

                <div className="grid-cols-2 grid-gap-lg" style={{ alignItems: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="heading-md" data-editable="pages.sales.logisticsTitle" style={{ marginBottom: '1.5rem' }}>{data.logisticsTitle}</h2>
                        <p className="text-muted" data-editable="pages.sales.logisticsDesc1" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            {data.logisticsDesc1}
                        </p>
                        <p className="text-muted" data-editable="pages.sales.logisticsDesc2" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                            {data.logisticsDesc2}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <Link to="/inquiry" className="btn btn-primary">Start Wholesale Inquiry</Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ height: '100%', minHeight: '300px', maxHeight: '500px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                        data-editable="pages.sales.image"
                    >
                        <img
                            src={data.image}
                            alt="Logistics and Shipping"
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>
                </div>

                <div className="grid-cols-3">
                    <motion.div
                        className="feature-box"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Truck size={48} className="feature-icon" />
                        <h3 data-editable="pages.sales.feature1Title">{data.feature1Title || "Reliable Delivery"}</h3>
                        <p className="text-muted" data-editable="pages.sales.feature1Desc">
                            {data.feature1Desc || "To every corner of South Africa. From major metropolitan hubs like Johannesburg and Cape Town to the most secluded rural venues."}
                        </p>
                    </motion.div>

                    <motion.div
                        className="feature-box"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <MapPin size={48} className="feature-icon" />
                        <h3 data-editable="pages.sales.feature2Title">{data.feature2Title || "Full Coverage"}</h3>
                        <p className="text-muted" data-editable="pages.sales.feature2Desc">
                            {data.feature2Desc || "Fully servicing Limpopo, North West, Gauteng, Mpumalanga, Free State, KwaZulu-Natal, Northern Cape, Eastern Cape, and the Western Cape."}
                        </p>
                    </motion.div>

                    <motion.div
                        className="feature-box"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <ShieldCheck size={48} className="feature-icon" />
                        <h3 data-editable="pages.sales.feature3Title">{data.feature3Title || "Compliant Transit"}</h3>
                        <p className="text-muted" data-editable="pages.sales.feature3Desc">
                            {data.feature3Desc || "All necessary waybills, certifications, and compliance documents are meticulously handled by our team for a seamless and legal transit."}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Sales;
