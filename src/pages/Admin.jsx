import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import {
    Home as HomeIcon, Info, Users, ShoppingBag,
    Layout, Mail, Shield
} from 'lucide-react';
import useContent from '../hooks/useContent';

const PAGE_URLS = {
    home: '/',
    about: '/about',
    sales: '/sales',
    shop: '/shop',
    inquiry: '/inquiry',
};

const Admin = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { content, loading: loadingContent, updateContent } = useContent();
    const [activeTab, setActiveTab] = useState('home');
    const [localContent, setLocalContent] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const previewContainerRef = useRef(null);
    const iframeRef = useRef(null);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoadingAuth(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (content) {
            setLocalContent(JSON.parse(JSON.stringify(content)));
        }
    }, [content]);

    // Listen for messages from the preview iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'SELECT_FIELD') {
                const fieldId = event.data.fieldId;

                // --- Automatic Tab Switching ---
                // fieldId looks like "pages.home.heroTitle" or "products.0.image"
                const parts = fieldId.split('.');
                if (parts[0] === 'pages' && parts[1]) {
                    setActiveTab(parts[1]);
                } else if (parts[0] === 'products') {
                    setActiveTab('shop');
                }

                setSelectedId(fieldId);

                // Scroll the sidebar to this field after tab switch
                setTimeout(() => {
                    const el = document.getElementById(fieldId);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 150); // Slightly longer delay to allow tab render
            }

            if (event.data?.type === 'PREVIEW_IMAGE_UPLOAD') {
                processImageBase64(event.data.fieldId, event.data.base64);
            }

            if (event.data?.type === 'PREVIEW_TEXT_UPDATE') {
                handleLocalUpdate(event.data.fieldId, event.data.value);
            }

            if (event.data?.type === 'PREVIEW_TEXT_BLUR') {
                persistContent(event.data.fieldId, event.data.value);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [localContent]); // Needed for persistContent to have latest state

    // Sync localContent to iframe for live preview
    useEffect(() => {
        if (!localContent || !iframeRef.current) return;

        // Use a small delay to avoid spamming messages during text typing
        const timeout = setTimeout(() => {
            if (iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                    type: 'LIVE_PREVIEW_UPDATE',
                    content: localContent
                }, '*');
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [localContent]);

    // Calculate zoom so the 1440px-wide site fills the panel edge-to-edge
    useEffect(() => {
        const el = previewContainerRef.current;
        if (!el) return;
        const calc = () => setZoom(el.offsetWidth / 1440);
        calc();
        const ro = new ResizeObserver(calc);
        ro.observe(el);
        return () => ro.disconnect();
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid credentials.');
        }
    };

    const handleLogout = () => signOut(auth);

    const handleExit = async () => {
        await handleLogout();
        window.location.href = '/';
    };

    const findAndReplace = (obj, path, value) => {
        const newData = JSON.parse(JSON.stringify(obj));
        const parts = path.split('.');
        let current = newData;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            const nextPart = parts[i + 1];
            if (!isNaN(nextPart)) {
                current = current[part][parseInt(nextPart)];
                i++;
            } else {
                current = current[part];
            }
        }
        current[parts[parts.length - 1]] = value;
        return newData;
    };

    const handleLocalUpdate = (path, value) => {
        const newData = findAndReplace(localContent, path, value);
        setLocalContent(newData);
    };

    const persistContent = async (path, value) => {
        const newData = findAndReplace(localContent, path, value);
        setLocalContent(newData);
        setIsSaving(true);
        try {
            await updateContent(newData);
            setSuccess('Changes saved');
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Auto-save failed');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const processImageBase64 = (path, base64) => {
        setIsUploading(true);
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            const MAX_WIDTH = 1200;
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to JPEG for space
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            persistContent(path, compressedBase64);
            setIsUploading(false);
        };
        img.onerror = () => {
            setError('Failed to load image for compression');
            setIsUploading(false);
        };
    };

    const handleFileUpload = (path, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => processImageBase64(path, reader.result);
        reader.readAsDataURL(file);
    };

    // ---------- Loading / Login screens ----------
    if (loadingAuth || (user && !localContent)) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Layout size={48} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (!user) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
                <div className="container" style={{ maxWidth: '400px' }}>
                    <motion.div className="glass-panel" style={{ padding: '3rem' }}>
                        <h2 className="heading-md" style={{ textAlign: 'center', marginBottom: '2rem' }}>Windpomp Admin</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group"><input type="email" placeholder="Email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                            <div className="form-group"><input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                            {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ---------- Main Editor ----------
    return (
        <div style={{ display: 'flex', height: '100vh', background: '#050505', color: '#fff', overflow: 'hidden' }}>

            {/* Sidebar */}
            <div style={{ width: '260px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Shield size={16} color="var(--primary)" />
                        <h2 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary)', margin: 0, fontWeight: '900' }}>VISUAL ENGINE</h2>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.65rem', color: '#444', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '900', marginBottom: '1rem', paddingLeft: '0.5rem' }}>PAGES</p>
                        {[
                            { id: 'home', label: 'Home Page', icon: <HomeIcon size={16} /> },
                            { id: 'about', label: 'Our Story', icon: <Info size={16} /> },
                            { id: 'sales', label: 'National Sales', icon: <Users size={16} /> },
                            { id: 'shop', label: 'Shop Cabinet', icon: <ShoppingBag size={16} /> },
                            { id: 'inquiry', label: 'Wholesale Form', icon: <Mail size={16} /> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '0.85rem 1rem',
                                    background: activeTab === tab.id ? 'rgba(212,175,55,0.12)' : 'transparent',
                                    border: 'none',
                                    color: activeTab === tab.id ? 'var(--primary)' : '#666',
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    textAlign: 'left',
                                    transition: 'all 0.2s',
                                    marginBottom: '0.3rem',
                                    fontWeight: activeTab === tab.id ? '700' : '500',
                                    fontSize: '0.85rem',
                                    borderLeft: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                    </div>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                        onClick={handleExit}
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '0.8rem', height: '48px', fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                        VIEW LIVE SITE
                    </button>
                    {success && <p style={{ color: '#4caf50', fontSize: '0.75rem', textAlign: 'center', marginBottom: '0.8rem', fontWeight: 'bold' }}>{success}</p>}
                    <button
                        onClick={handleLogout}
                        style={{ width: '100%', background: 'transparent', border: 'none', color: '#ff4444', fontSize: '0.75rem', cursor: 'pointer', opacity: 0.6, fontWeight: 'bold' }}
                    >
                        LOGOUT SESSION
                    </button>
                </div>
            </div>

            {/* Real-site iframe preview */}
            <div
                ref={previewContainerRef}
                style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative', background: '#000' }}
            >
                <iframe
                    key={activeTab}
                    ref={iframeRef}
                    src={PAGE_URLS[activeTab]}
                    title="Site Preview"
                    style={{
                        width: '1440px',
                        height: `${100 / zoom}%`,
                        border: 'none',
                        transformOrigin: 'top left',
                        transform: `scale(${zoom})`,
                        display: 'block',
                        pointerEvents: 'auto',
                    }}
                />
            </div>
        </div>
    );
};

export default Admin;
