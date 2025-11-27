import { useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const Header = ({ onMenuClick, cartCount = 0 }) => {
    const { storeConfig } = useStore();
    const { header, colors, name, logo } = storeConfig;

    return (
        <header style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Main Header - MOVED TO TOP */}
            <div style={{
                background: colors.headerBackground || colors.primary,
                padding: '1rem',
                color: colors.textOnPrimary,
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Hamburger Menu */}
                    <button
                        onClick={onMenuClick}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: colors.textOnPrimary,
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        <Menu size={28} />
                    </button>

                    {/* Logo / Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {logo ? (
                            <img
                                src={logo}
                                alt={name}
                                style={{ height: '40px', objectFit: 'contain', borderRadius: '8px', background: 'white', padding: '2px' }}
                            />
                        ) : (
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>
                                {name}
                            </h1>
                        )}
                    </div>

                    {/* Cart Icon */}
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <ShoppingCart size={28} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: colors.accent,
                                color: colors.textOnPrimary,
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${colors.primary}`
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Banner - NOW BELOW MENU */}
            {header?.showBanner && (
                <div style={{
                    width: '100%',
                    height: '120px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: colors.primary
                }}>
                    {header.bannerType === 'video' && header.bannerVideoUrl ? (
                        <video
                            src={header.bannerVideoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <img
                            src={header.bannerUrl || 'https://via.placeholder.com/1200x200'}
                            alt="Banner"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
