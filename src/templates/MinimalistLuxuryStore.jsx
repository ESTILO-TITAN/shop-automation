import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Play, ChevronRight, Check, Quote, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Award, Zap, TrendingUp, ArrowRight, Eye, Filter, Grid, List } from 'lucide-react';

const MinimalistLuxuryStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const featuredProducts = products.length > 0 ? products : [
        { id: 1, name: 'Cashmere Overcoat', designer: 'MAISON NOIR', price: 2499, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop', category: 'Outerwear', colors: ['#000', '#2c3e50', '#95a5a6'] },
        { id: 2, name: 'Silk Evening Dress', designer: 'ATELIER BLANC', price: 3299, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', category: 'Dresses', colors: ['#000', '#fff', '#c0392b'] },
        { id: 3, name: 'Leather Briefcase', designer: 'ARTISAN CO.', price: 1899, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop', category: 'Accessories', colors: ['#8b4513', '#000'] },
        { id: 4, name: 'Merino Wool Sweater', designer: 'NORDIC KNIT', price: 899, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', category: 'Knitwear', colors: ['#ecf0f1', '#34495e', '#000'] },
        { id: 5, name: 'Italian Leather Loafers', designer: 'ROMANO', price: 1299, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop', category: 'Footwear', colors: ['#8b4513', '#000'] },
        { id: 6, name: 'Tailored Blazer', designer: 'SAVILE & CO', price: 1799, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop', category: 'Tailoring', colors: ['#2c3e50', '#000', '#95a5a6'] }
    ];

    return (
        <div style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', background: '#fafafa', color: '#1a1a1a', overflowX: 'hidden' }}>
            {/* Minimal Header */}
            <header style={{
                background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid #e0e0e0' : 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease'
            }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto', padding: isMobile ? '1rem 1.5rem' : '1.5rem 3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {isMobile && (
                                <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    <Menu size={24} color={scrolled || isMobile ? '#1a1a1a' : 'white'} />
                                </button>
                            )}
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: '300',
                                margin: 0,
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: scrolled || isMobile ? '#1a1a1a' : 'white'
                            }}>
                                {storeConfig.nav?.storeName || 'ÉLITE'}
                            </h1>
                        </div>

                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '3rem', fontSize: '0.875rem', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                {(storeConfig.nav?.items || ['Collections', 'New Arrivals', 'Editorial', 'About']).map(item => (
                                    <a key={item} href="#" style={{ color: scrolled ? '#1a1a1a' : 'white', textDecoration: 'none', transition: 'opacity 0.3s', opacity: 0.8 }}>
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        )}

                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
                            <Search size={20} style={{ cursor: 'pointer', opacity: 0.8, color: scrolled || isMobile ? '#1a1a1a' : 'white' }} />
                            {!isMobile && <Heart size={20} style={{ cursor: 'pointer', opacity: 0.8, color: scrolled ? '#1a1a1a' : 'white' }} />}
                            {!isMobile && <User size={20} style={{ cursor: 'pointer', opacity: 0.8, color: scrolled ? '#1a1a1a' : 'white' }} />}
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <ShoppingCart size={20} style={{ opacity: 0.8, color: scrolled || isMobile ? '#1a1a1a' : 'white' }} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-6px',
                                        background: scrolled || isMobile ? '#1a1a1a' : 'white',
                                        color: scrolled || isMobile ? 'white' : '#1a1a1a',
                                        borderRadius: '50%',
                                        width: '16px',
                                        height: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.65rem',
                                        fontWeight: '600'
                                    }}>{cartCount}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobile && mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setMobileMenuOpen(false)}>
                    <div style={{
                        width: '80%',
                        maxWidth: '300px',
                        height: '100%',
                        background: 'white',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        animation: 'slideIn 0.3s ease'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '300', letterSpacing: '0.2em' }}>MENU</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', fontWeight: '400', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            {(storeConfig.nav?.items || ['Collections', 'New Arrivals', 'Editorial', 'About']).map(item => (
                                <a key={item} href="#" style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero - Full Screen Minimal */}
            <section style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 1
                }} />
                <img
                    src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop"}
                    alt="Hero"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', maxWidth: '900px', padding: '0 2rem' }}>
                    <p style={{ fontSize: '0.875rem', letterSpacing: '0.3em', marginBottom: '2rem', opacity: 0.9, textTransform: 'uppercase' }}>
                        {storeConfig.banner?.subtitle || 'Spring/Summer 2024'}
                    </p>
                    <h2 style={{
                        fontSize: isMobile ? '3rem' : '5rem',
                        fontWeight: '200',
                        margin: '0 0 2rem 0',
                        lineHeight: '1.1',
                        letterSpacing: '0.05em'
                    }}>
                        {storeConfig.banner?.title || 'Timeless Sophistication'}
                    </h2>
                    <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', marginBottom: '3rem', opacity: 0.9, fontWeight: '300', lineHeight: '1.8' }}>
                        {storeConfig.description || 'Curated pieces for the discerning individual'}
                    </p>
                    <button style={{
                        background: 'white',
                        color: '#1a1a1a',
                        padding: '1.25rem 4rem',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s'
                    }}>
                        {storeConfig.banner?.buttonText || 'Explore Collection'}
                    </button>
                </div>
                {!isMobile && (
                    <div style={{
                        position: 'absolute',
                        bottom: '3rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        color: 'white',
                        fontSize: '0.75rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.7
                    }}>
                        Scroll to discover
                    </div>
                )}
            </section>

            {/* Featured Categories - Split Screen */}
            <section style={{ padding: '0', background: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', height: isMobile ? 'auto' : '80vh' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: isMobile ? '50vh' : 'auto' }}>
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=1200&fit=crop"
                            alt="Women"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '4rem'
                        }}>
                            <div style={{ color: 'white' }}>
                                <h3 style={{ fontSize: '3rem', fontWeight: '200', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                                    WOMEN
                                </h3>
                                <p style={{ fontSize: '0.875rem', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase' }}>
                                    View Collection →
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: isMobile ? '50vh' : 'auto' }}>
                        <img
                            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&h=1200&fit=crop"
                            alt="Men"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '4rem'
                        }}>
                            <div style={{ color: 'white' }}>
                                <h3 style={{ fontSize: '3rem', fontWeight: '200', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                                    MEN
                                </h3>
                                <p style={{ fontSize: '0.875rem', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase' }}>
                                    View Collection →
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products - Minimal Grid */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 3rem', background: '#fafafa' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '4rem', gap: '2rem' }}>
                        <div>
                            <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.5rem', opacity: 0.6, textTransform: 'uppercase' }}>
                                New Arrivals
                            </p>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '200', margin: 0, letterSpacing: '0.05em' }}>
                                Latest Collection
                            </h2>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
                            <select style={{
                                padding: '0.75rem 1.5rem',
                                border: '1px solid #e0e0e0',
                                background: 'white',
                                fontSize: '0.875rem',
                                letterSpacing: '0.1em',
                                cursor: 'pointer',
                                outline: 'none',
                                flex: isMobile ? 1 : 'auto'
                            }}>
                                <option>All Categories</option>
                                <option>Outerwear</option>
                                <option>Dresses</option>
                                <option>Accessories</option>
                            </select>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => setViewMode('grid')} style={{
                                    padding: '0.75rem',
                                    border: viewMode === 'grid' ? '1px solid #1a1a1a' : '1px solid #e0e0e0',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}>
                                    <Grid size={18} />
                                </button>
                                <button onClick={() => setViewMode('list')} style={{
                                    padding: '0.75rem',
                                    border: viewMode === 'list' ? '1px solid #1a1a1a' : '1px solid #e0e0e0',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}>
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: viewMode === 'grid' ? (isMobile ? '1fr' : 'repeat(3, 1fr)') : '1fr',
                        gap: '3rem'
                    }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                display: viewMode === 'list' ? 'grid' : 'block',
                                gridTemplateColumns: viewMode === 'list' ? (isMobile ? '1fr' : '400px 1fr') : 'none',
                                gap: viewMode === 'list' ? (isMobile ? '0' : '3rem') : '0'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    paddingTop: viewMode === 'grid' ? '140%' : (isMobile ? '140%' : '0'),
                                    height: viewMode === 'list' && !isMobile ? '500px' : 'auto',
                                    overflow: 'hidden',
                                    background: '#f5f5f5'
                                }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: viewMode === 'grid' || isMobile ? 'absolute' : 'relative',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s'
                                    }} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '44px',
                                        height: '44px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        opacity: 0,
                                        transition: 'opacity 0.3s'
                                    }}>
                                        <Heart size={18} />
                                    </button>
                                </div>
                                <div style={{ padding: viewMode === 'grid' || isMobile ? '2rem 0' : '2rem' }}>
                                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>
                                        {product.designer}
                                    </p>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '400', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {product.colors.map((color, i) => (
                                            <div key={i} style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: color,
                                                border: '1px solid #e0e0e0',
                                                cursor: 'pointer'
                                            }} />
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: '300', letterSpacing: '0.05em' }}>
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: '#1a1a1a',
                                            color: 'white',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            transition: 'all 0.3s'
                                        }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Section */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 3rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '6rem', alignItems: 'center' }}>
                    <div style={{ order: isMobile ? 2 : 1 }}>
                        <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '1.5rem', opacity: 0.6, textTransform: 'uppercase' }}>
                            Editorial
                        </p>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '200', marginBottom: '2rem', lineHeight: '1.2', letterSpacing: '0.05em' }}>
                            The Art of<br />Minimalism
                        </h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '3rem', opacity: 0.8, fontWeight: '300' }}>
                            Discover our philosophy of timeless design, where every piece is carefully curated to embody sophistication and elegance.
                        </p>
                        <button style={{
                            background: 'transparent',
                            color: '#1a1a1a',
                            padding: '1.25rem 3rem',
                            border: '1px solid #1a1a1a',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s'
                        }}>
                            Read More
                        </button>
                    </div>
                    <div style={{ position: 'relative', paddingTop: '125%', order: isMobile ? 1 : 2 }}>
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
                            alt="Editorial"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 3rem', background: '#fafafa', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '4rem' }}>
                    {[
                        { title: 'Craftsmanship', desc: 'Handcrafted with precision' },
                        { title: 'Sustainability', desc: 'Ethically sourced materials' },
                        { title: 'Timeless', desc: 'Designs that endure' },
                        { title: 'Excellence', desc: 'Uncompromising quality' }
                    ].map((value, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '400', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                                {value.title}
                            </h3>
                            <p style={{ fontSize: '0.875rem', opacity: 0.7, fontWeight: '300', lineHeight: '1.6' }}>
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 3rem', background: 'white', textAlign: 'center' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '1.5rem', opacity: 0.6, textTransform: 'uppercase' }}>
                        Newsletter
                    </p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '200', marginBottom: '2rem', letterSpacing: '0.05em' }}>
                        Stay Informed
                    </h2>
                    <p style={{ fontSize: '1rem', marginBottom: '3rem', opacity: 0.7, fontWeight: '300', lineHeight: '1.8' }}>
                        Subscribe to receive updates on new arrivals, exclusive offers, and editorial content.
                    </p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{
                                flex: 1,
                                padding: '1.25rem 1.5rem',
                                border: '1px solid #e0e0e0',
                                fontSize: '0.875rem',
                                outline: 'none',
                                letterSpacing: '0.05em'
                            }}
                        />
                        <button style={{
                            background: '#1a1a1a',
                            color: 'white',
                            padding: '1.25rem 3rem',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1a1a1a', color: 'white', padding: isMobile ? '4rem 1.5rem' : '6rem 3rem 3rem' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '2rem', letterSpacing: '0.3em' }}>
                                {storeConfig.nav?.storeName || 'ÉLITE'}
                            </h3>
                            <p style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: '1.8', fontWeight: '300' }}>
                                {storeConfig.texts?.footerText || 'Timeless sophistication for the discerning individual.'}
                            </p>
                        </div>
                        {[
                            { title: 'Shop', items: ['Women', 'Men', 'Accessories', 'New Arrivals'] },
                            { title: 'About', items: ['Our Story', 'Sustainability', 'Careers', 'Press'] },
                            { title: 'Support', items: ['Contact', 'Shipping', 'Returns', 'Size Guide'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: '400', marginBottom: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem' }}>
                                            <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', opacity: 0.7, fontWeight: '300' }}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '3rem',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <p style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.1em' }}>
                            © 2024 {storeConfig.nav?.storeName || 'ÉLITE'}. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <Icon key={i} size={18} style={{ opacity: 0.5, cursor: 'pointer' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default MinimalistLuxuryStore;
