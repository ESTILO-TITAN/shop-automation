import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Play, ChevronRight, ArrowRight, Eye, Sparkles, TrendingUp, Award, Zap, Check, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw } from 'lucide-react';

const ModernLightStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [scrollY, setScrollY] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const allProducts = products.length > 0 ? products : [
        { id: 1, name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', category: 'Audio', rating: 4.8, reviews: 234, badge: 'Bestseller' },
        { id: 2, name: 'Smart Watch Pro', price: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', category: 'Wearables', rating: 4.9, reviews: 189, badge: 'New' },
        { id: 3, name: 'Minimalist Backpack', price: 129, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', category: 'Accessories', rating: 4.7, reviews: 456 },
        { id: 4, name: 'Portable Speaker', price: 149, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop', category: 'Audio', rating: 4.6, reviews: 321, badge: 'Hot' },
    ];

    const categories = ['all', ...new Set(allProducts.map(p => p.category))];
    const filteredProducts = activeCategory === 'all' ? allProducts : allProducts.filter(p => p.category === activeCategory);

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#fff', color: '#1a1a1a', overflowX: 'hidden' }}>
            {/* Animated Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: isMobile ? '1rem 1.5rem' : (scrollY > 50 ? '1rem 3rem' : '1.5rem 3rem')
            }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isMobile && (
                            <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <Menu size={24} color="#1a1a1a" />
                            </button>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                            }}>
                                <Sparkles size={18} color="white" />
                            </div>
                            <h1 style={{
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                margin: 0,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                {storeConfig.nav?.storeName || 'NOVA'}
                            </h1>
                        </div>
                    </div>

                    {!isMobile && (
                        <nav style={{ display: 'flex', gap: '3rem', fontSize: '0.95rem', fontWeight: '600' }}>
                            {(storeConfig.nav?.items || ['Shop', 'Collections', 'About', 'Contact']).map(item => (
                                <a key={item} href="#" style={{
                                    color: '#1a1a1a',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    transition: 'color 0.3s'
                                }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    )}

                    <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                        <Search size={22} style={{ cursor: 'pointer' }} />
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: '700'
                                }}>{cartCount}</span>
                            )}
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
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
                            {(storeConfig.nav?.items || ['Shop', 'Collections', 'About', 'Contact']).map(item => (
                                <a key={item} href="#" style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero with Zoom Effect */}
            <section style={{
                minHeight: isMobile ? '80vh' : '90vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginTop: '60px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `url("${storeConfig.banner?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&h=1080&fit=crop'}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `scale(${1 + scrollY * 0.0005})`,
                    transition: 'transform 0.1s',
                    opacity: 0.15
                }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 1.5rem' }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                        animation: 'slideDown 0.8s ease'
                    }}>
                        {storeConfig.banner?.subtitle || '✨ NEW COLLECTION 2024'}
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '3rem' : '5rem',
                        fontWeight: '900',
                        margin: '0 0 1rem 0',
                        lineHeight: '1.1',
                        animation: 'fadeInUp 1s ease',
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #667eea 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {storeConfig.banner?.title || 'Elevate Your Everyday'}
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        marginBottom: '2.5rem',
                        color: '#64748b',
                        fontWeight: '500',
                        animation: 'fadeInUp 1.2s ease'
                    }}>
                        {storeConfig.description || 'Discover premium products designed for modern living'}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', animation: 'fadeInUp 1.4s ease', flexDirection: isMobile ? 'column' : 'row' }}>
                        <button style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            width: isMobile ? '100%' : 'auto'
                        }}>
                            {storeConfig.banner?.buttonText || 'Shop Now'}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section style={{ padding: isMobile ? '2rem 1rem' : '3rem', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    background: activeCategory === cat ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8fafc',
                                    color: activeCategory === cat ? 'white' : '#64748b',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s',
                                    boxShadow: activeCategory === cat ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                                }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section style={{ padding: isMobile ? '3rem 1rem' : '6rem 3rem', background: '#fafafa' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: isMobile ? '2rem' : '3rem',
                            fontWeight: '900',
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #667eea 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {storeConfig.texts?.productsTitle || 'Featured Products'}
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(160px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: isMobile ? '1rem' : '2.5rem'
                    }}>
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s',
                                    transform: hoveredProduct === product.id && !isMobile ? 'translateY(-8px)' : 'none',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'relative',
                                    paddingTop: '100%',
                                    overflow: 'hidden',
                                    background: '#f8fafc'
                                }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s',
                                        transform: hoveredProduct === product.id && !isMobile ? 'scale(1.1)' : 'scale(1)'
                                    }} />
                                </div>
                                <div style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                                    <h3 style={{ fontSize: isMobile ? '0.9rem' : '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: '800', color: '#667eea' }}>
                                            ${product.price}
                                        </span>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            padding: isMobile ? '0.5rem' : '0.75rem 1.25rem',
                                            borderRadius: '50px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <ShoppingCart size={isMobile ? 16 : 18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1a1a1a', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 3rem' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem', textAlign: isMobile ? 'center' : 'left' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>{storeConfig.nav?.storeName || 'NOVA'}</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                                {storeConfig.texts?.footerText || 'Premium products for modern living.'}
                            </p>
                        </div>
                        {/* Simplified footer for mobile */}
                        {!isMobile && [
                            { title: 'Shop', items: ['All Products', 'New Arrivals', 'Best Sellers'] },
                            { title: 'Company', items: ['About Us', 'Careers', 'Contact'] },
                            { title: 'Support', items: ['FAQ', 'Shipping', 'Returns'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem' }}>{section.title}</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem' }}>
                                            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '2rem',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <p style={{ fontSize: '0.875rem', opacity: 0.5 }}>
                            © 2024 {storeConfig.nav?.storeName || 'NOVA'}. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <Icon key={i} size={20} style={{ opacity: 0.5, cursor: 'pointer' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default ModernLightStore;
