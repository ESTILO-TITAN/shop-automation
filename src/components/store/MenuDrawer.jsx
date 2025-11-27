import { X, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const MenuDrawer = ({ isOpen, onClose, onNavigate }) => {
    const { storeConfig } = useStore();
    const { colors, footer } = storeConfig;

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    animation: 'fadeIn 0.2s ease'
                }}
            />

            {/* Drawer */}
            <div style={{
                width: '80%',
                maxWidth: '300px',
                background: colors.background,
                height: '100%',
                position: 'relative',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
                animation: 'slideRight 0.3s ease'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: `1px solid ${colors.secondary}20`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: colors.primary,
                    color: colors.textOnPrimary
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Menú</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: colors.textOnPrimary,
                            cursor: 'pointer'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={() => onNavigate('store')}
                            style={{
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                color: colors.textPrimary,
                                padding: '0.75rem 0',
                                borderBottom: `1px solid ${colors.secondary}10`,
                                cursor: 'pointer'
                            }}
                        >
                            Tienda
                        </button>
                        <button
                            onClick={() => onNavigate('about')}
                            style={{
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                color: colors.textPrimary,
                                padding: '0.75rem 0',
                                borderBottom: `1px solid ${colors.secondary}10`,
                                cursor: 'pointer'
                            }}
                        >
                            Sobre Nosotros
                        </button>
                        <button
                            onClick={() => onNavigate('brands')}
                            style={{
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                color: colors.textPrimary,
                                padding: '0.75rem 0',
                                borderBottom: `1px solid ${colors.secondary}10`,
                                cursor: 'pointer'
                            }}
                        >
                            Marcas
                        </button>
                    </nav>
                </div>

                {/* Footer Info in Menu */}
                <div style={{
                    padding: '1.5rem',
                    background: colors.backgroundSecondary,
                    borderTop: `1px solid ${colors.secondary}20`
                }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', color: colors.textPrimary }}>
                        Contacto
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: colors.textSecondary }}>
                        {footer?.contact?.whatsapp && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={16} color={colors.primary} />
                                <span>{footer.contact.whatsapp}</span>
                            </div>
                        )}
                        {footer?.contact?.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} color={colors.primary} />
                                <span>{footer.contact.email}</span>
                            </div>
                        )}
                        {footer?.contact?.address && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} color={colors.primary} />
                                <span>{footer.contact.address}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDrawer;
