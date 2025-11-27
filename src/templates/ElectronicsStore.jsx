import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, Star, ChevronRight, Zap, Shield, Truck, Smartphone, Laptop, Headphones, Watch, Monitor, Speaker } from 'lucide-react';

const ElectronicsStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = storeConfig.nav?.items || ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Audio'];

    const defaultProducts = [
        { id: 1, name: 'Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', rating: 4.5, category: 'Audio' },
        { id: 2, name: 'Smart Watch Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', rating: 4.8, category: 'Wearables' },
        { id: 3, name: 'Laptop Stand', price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop', rating: 4.3, category: 'Accessories' },
        { id: 4, name: 'Mechanical Keyboard', price: 149.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop', rating: 4.7, category: 'Peripherals' },
        { id: 5, name: 'USB-C Hub', price: 79.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop', rating: 4.6, category: 'Accessories' },
        { id: 6, name: 'Wireless Mouse', price: 59.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop', rating: 4.4, category: 'Peripherals' }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', overflowX: 'hidden' }}>
            {/* Header */}
            <header style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
                    {/* Top Bar - Hidden on Mobile */}
                    {!isMobile && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Truck size={16} />
                                    Free Shipping on Orders $50+
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Shield size={16} />
                                    2 Year Warranty
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Track Order</a>
                                <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Support</a>
                            </div>
                        </div>
                    )}

                    {/* Main Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {isMobile && (
                                <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginRight: '0.5rem' }}>
                                    <Menu size={24} />
                                </button>
                            )}
                            <Zap size={isMobile ? 24 : 32} fill="white" />
                            <h1 style={{ fontSize: isMobile ? '1.25rem' : '1.75rem', fontWeight: '800', margin: 0 }}>
                                {storeConfig.nav?.storeName || 'TechStore'}
                            </h1>
                        </div>

                        {/* Search Bar - Hidden on small mobile */}
                        {!isMobile && (
                            <div style={{ flex: 1, maxWidth: '500px', margin: '0 2rem', position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 3rem 0.75rem 1rem',
                                        borderRadius: '50px',
                                        border: 'none',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        backdropFilter: 'blur(5px)'
                                    }}
                                />
                                <Search style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.8)' }} size={20} />
                            </div>
                        )}

                        {/* Icons */}
                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                            {isMobile && <Search size={22} />}
                            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}>
                                <Heart size={isMobile ? 22 : 24} />
                            </button>
                            <button onClick={() => setCartOpen(!cartOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}>
                                <ShoppingCart size={isMobile ? 22 : 24} />
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: '#ef4444',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: '700'
                                }}>0</span>
                            </button>
                        </div>
                    </div>

                    {/* Categories - Desktop */}
                    {!isMobile && (
                        <nav style={{ marginTop: '1rem', display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                            {categories.map(cat => (
                                <a key={cat} href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', opacity: 0.9, transition: 'opacity 0.2s' }}>
                                    {cat}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobile && menuOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setMenuOpen(false)}>
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
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>Menu</h2>
                            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#1e293b" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
                            {categories.map(item => (
                                <a key={item} href="#" style={{ color: '#1e293b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <ChevronRight size={16} color="#667eea" />
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero Banner */}
            <section style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                color: 'white',
                padding: isMobile ? '3rem 1.5rem' : '4rem 1.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div style={{ order: isMobile ? 2 : 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <span style={{ background: '#ef4444', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.875rem', fontWeight: '600', display: 'inline-block', marginBottom: '1rem' }}>
                            {storeConfig.banner?.subtitle || 'NEW ARRIVAL'}
                        </span>
                        <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '1.1' }}>
                            {storeConfig.banner?.title || <>Latest Tech<br />at Your Fingertips</>}
                        </h2>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', opacity: 0.9, marginBottom: '2rem' }}>
                            {storeConfig.description || 'Discover cutting-edge electronics with unbeatable prices. Free shipping on orders over $50.'}
                        </p>
                        <button style={{
                            background: 'white',
                            color: '#667eea',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.2s',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                        }}>
                            {storeConfig.banner?.buttonText || 'Shop Now'} <ChevronRight size={20} />
                        </button>
                    </div>
                    <div style={{ position: 'relative', order: isMobile ? 1 : 2 }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            padding: '1rem',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            transform: isMobile ? 'none' : 'rotate(-2deg)'
                        }}>
                            <img
                                src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"}
                                alt="Hero Product"
                                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: isMobile ? '2rem 1rem' : '3rem 1.5rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On orders over $50' },
                        { icon: <Shield size={32} />, title: '2 Year Warranty', desc: 'On all products' },
                        { icon: <Zap size={32} />, title: 'Fast Delivery', desc: '2-3 business days' },
                        { icon: <Star size={32} />, title: 'Best Quality', desc: 'Certified products' }
                    ].map((feature, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px' }}>
                            <div style={{ color: '#667eea', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1e293b' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section style={{ padding: isMobile ? '3rem 1rem' : '4rem 1.5rem', background: '#f8fafc' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
                            {storeConfig.texts?.productsTitle || 'Featured Products'}
                        </h2>
                        <p style={{ color: '#64748b', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                            Explore our latest collection of premium electronics
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(160px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: isMobile ? '1rem' : '2rem' }}>
                        {displayProducts.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                    }
                                }}
                            >
                                <div style={{ position: 'relative', paddingTop: '100%', background: '#f1f5f9' }}>
                                    <img src={product.image} alt={product.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        <Heart size={18} color="#64748b" />
                                    </button>
                                </div>
                                <div style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                                    <h3 style={{ fontSize: isMobile ? '0.9rem' : '1.125rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < Math.floor(product.rating || 4) ? '#fbbf24' : 'none'} color="#fbbf24" />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({product.rating || 4.5})</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: '800', color: '#667eea' }}>
                                            ${product.price}
                                        </span>
                                        <button onClick={() => onAddToCart && onAddToCart(product)} style={{
                                            background: '#667eea',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: isMobile ? '0.5rem' : '0.75rem 1.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {isMobile ? <ShoppingCart size={16} /> : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1e293b', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 3rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <Zap size={28} fill="white" />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{storeConfig.nav?.storeName || 'TechStore'}</h3>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                            {storeConfig.texts?.footerText || 'Your trusted source for premium electronics and tech accessories.'}
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {categories.slice(0, 4).map(item => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Contact Us', 'Shipping Info', 'Returns', 'Warranty'].map(item => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Newsletter</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1rem' }}>
                            Subscribe for exclusive deals
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="email" placeholder="Your email" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', outline: 'none' }} />
                            <button style={{ background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: '600', cursor: 'pointer' }}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #334155', paddingTop: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                    © 2024 {storeConfig.nav?.storeName || 'TechStore'}. All rights reserved.
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

export default ElectronicsStore;
