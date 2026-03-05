import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';
import useContent from '../hooks/useContent';

const About = () => {
    const { content, loading } = useContent();

    if (loading) return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Layout size={48} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (!content || !content.pages || !content.pages.about) return null;
    const data = content.pages.about;

    return (
        <div style={{ paddingTop: '100px' }}>
            <section className="section">
                <div className="container">
                    <div className="grid-cols-2" style={{ gap: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="hero-subtitle" data-editable="pages.about.heroSubtitle">{data.heroSubtitle}</span>
                            <h1 className="heading-lg" data-editable="pages.about.title" style={{ marginBottom: '2rem' }}>
                                {data.title.split('Windpomp Liquors')[0]}
                                <span className="text-gold">Windpomp Liquors</span>
                                {data.title.split('Windpomp Liquors')[1]}
                            </h1>
                            <p className="text-muted" data-editable="pages.about.desc1" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                {data.desc1}
                            </p>
                            <p className="text-muted" data-editable="pages.about.desc2" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                {data.desc2}
                            </p>
                            <p className="text-muted" data-editable="pages.about.desc3" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                                {data.desc3}
                            </p>
                            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)' }}>
                                <h3 style={{ margin: 0 }} data-editable="pages.about.partnerTitle">{data.partnerTitle || "Authorized Sales Partner"}</h3>
                                <p className="text-muted" style={{ margin: '0.5rem 0 0' }} data-editable="pages.about.partnerDesc">
                                    {data.partnerDesc || "When you buy through Windpomp Liquors, you are fully guaranteed authentic, export-quality Kaia Distillery spirits."}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ height: '100%', cursor: 'pointer' }}
                            data-editable="pages.about.image"
                        >
                            <img
                                src={data.image}
                                alt="Story Image"
                                style={{ height: '100%', width: '100%', objectFit: 'cover', minHeight: '500px' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
