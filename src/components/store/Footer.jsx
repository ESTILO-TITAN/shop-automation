import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

// Custom TikTok icon since Lucide might not have it or it might be different
const TikTokIcon = ({ size = 24, color = 'currentColor' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Footer = () => {
    const { storeConfig } = useStore();
    const { footer, colors, name } = storeConfig;

    if (!footer) return null;

    return (
        <footer style={{
            backgroundColor: colors.backgroundSecondary,
            color: colors.textPrimary,
            paddingTop: '3rem',
            borderTop: `1px solid ${colors.secondary}20`
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    {/* Brand & Description */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            {name}
                        </h3>
                        <p style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                            {storeConfig.description}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            Contacto
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {footer.contact?.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.textSecondary }}>
                                    <Phone size={18} color={colors.primary} />
                                    <span>{footer.contact.phone}</span>
                                </div>
                            )}
                            {footer.contact?.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.textSecondary }}>
                                    <Mail size={18} color={colors.primary} />
                                    <span>{footer.contact.email}</span>
                                </div>
                            )}
                            {footer.contact?.whatsapp && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.textSecondary }}>
                                    <MessageCircle size={18} color={colors.primary} />
                                    <span>{footer.contact.whatsapp}</span>
                                </div>
                            )}
                            {footer.contact?.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.textSecondary }}>
                                    <MapPin size={18} color={colors.primary} />
                                    <span>{footer.contact.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            Síguenos
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {footer.social?.facebook?.show && (
                                <a
                                    href={footer.social.facebook.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        color: '#1877F2',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <Facebook size={20} />
                                </a>
                            )}
                            {footer.social?.instagram?.show && (
                                <a
                                    href={footer.social.instagram.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        color: '#E4405F',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <Instagram size={20} />
                                </a>
                            )}
                            {footer.social?.tiktok?.show && (
                                <a
                                    href={footer.social.tiktok.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        color: 'black',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <TikTokIcon size={20} />
                                </a>
                            )}
                            {footer.social?.youtube?.show && (
                                <a
                                    href={footer.social.youtube.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        color: '#FF0000',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <Youtube size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: `1px solid ${colors.secondary}20`,
                    padding: '1.5rem 0',
                    textAlign: 'center',
                    color: colors.textSecondary,
                    fontSize: '0.875rem'
                }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                        &copy; {footer.copyrightYear || new Date().getFullYear()} {name}. Todos los derechos reservados.
                    </p>
                    <a
                        href="/admin/login"
                        style={{
                            color: colors.textSecondary,
                            textDecoration: 'none',
                            fontSize: '0.75rem',
                            opacity: 0.6,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.6'}
                    >
                        Admin
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
