import { Link } from 'react-router-dom';
import useContent from '../hooks/useContent';

const Footer = () => {
    const { content } = useContent();
    return (
        <footer className="footer">
            <div className="container grid-cols-3">
                <div className="footer-brand">
                    <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>
                        Windpomp <span className="text-gold">Liquors</span>
                    </h2>
                    <p
                        className="text-muted"
                        style={{ maxWidth: '300px' }}
                        data-editable="global.footerDesc"
                    >
                        {content?.global?.footerDesc || "A legacy forged from Windpomp Padstal. Distributing premium Kaia Distillery spirits for national acclaim."}
                    </p>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Quick Links</h3>
                    <nav className="footer-nav">
                        <Link to="/" className="nav-link" style={{ width: 'fit-content' }}>Home</Link>
                        <Link to="/shop" className="nav-link" style={{ width: 'fit-content' }}>Shop Spirits</Link>
                        <Link to="/inquiry" className="nav-link" style={{ width: 'fit-content' }}>Wholesale</Link>
                        <Link to="/about" className="nav-link" style={{ width: 'fit-content' }}>Our Heritage</Link>
                    </nav>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Contact Us</h3>
                    <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <p data-editable="global.address">{content?.global?.address || "N1, Musina, Limpopo, 0900"}</p>
                        <p>
                            <a
                                href={`mailto:${content?.global?.email || 'sales@windpompliquors.co.za'}`}
                                data-editable="global.email"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                            >
                                {content?.global?.email || "sales@windpompliquors.co.za"}
                            </a>
                        </p>
                        <p data-editable="global.phone" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <a
                                href={`https://wa.me/${(content?.global?.phone || "079 490 1492").replace(/\s/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: '#25D366' }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {content?.global?.phone || "079 490 1492"}
                            </a>
                        </p>
                        <p style={{ marginTop: '1rem', color: 'var(--primary)' }} data-editable="global.availableText">
                            {content?.global?.availableText || "Available for Pallet & Box Orders"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>&copy; {new Date().getFullYear()} Windpomp Liquors. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
