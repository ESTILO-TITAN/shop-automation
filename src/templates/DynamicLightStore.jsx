import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, Star, ArrowRight, Eye, Sparkles, Zap, Instagram, Facebook, Twitter, Youtube, Truck, Shield, Gift, Clock, Percent, Menu, X } from 'lucide-react';

const DynamicLightStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [activeTab, setActiveTab] = useState('trending');
    const [hoveredIndex, setHoveredIndex] = useState(null);
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
        { id: 1, name: 'Ultra Slim Laptop', price: 1299, originalPrice: 1499, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop', rating: 4.9, reviews: 892, discount: 13, trending: true },
        { id: 2, name: 'Mechanical Keyboard', price: 179, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop', rating: 4.8, reviews: 456, newArrival: true },
        { id: 3, name: 'Ergonomic Mouse', price: 89, originalPrice: 119, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop', rating: 4.7, reviews: 234, discount: 25 },
        { id: 4, name: '4K Monitor', price: 599, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop', rating: 4.9, reviews: 678, trending: true },
        { id: 5, name: 'Wireless Earbuds Pro', price: 249, originalPrice: 299, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop', rating: 4.8, reviews: 1234, discount: 17, trending: true },
        { id: 6, name: 'Smart Watch Ultra', price: 449, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', rating: 4.9, reviews: 567, newArrival: true },
        { id: 7, name: 'USB-C Hub', price: 79, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop', rating: 4.6, reviews: 345 },
        { id: 8, name: 'Webcam HD Pro', price: 159, originalPrice: 199, image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&h=600&fit=crop', rating: 4.7, reviews: 289, discount: 20 },
        { id: 9, name: 'Portable SSD 1TB', price: 199, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop', rating: 4.8, reviews: 456, trending: true },
        { id: 10, name: 'Desk Organizer Set', price: 49, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&h=600&fit=crop', rating: 4.5, reviews: 178, newArrival: true }
    ];

    const tabs = [
        { id: 'trending', label: '🔥 Trending', filter: p => p.trending || p.id % 2 === 0 },
        { id: 'new', label: '✨ New Arrivals', filter: p => p.newArrival || p.id % 3 === 0 },
        { id: 'sale', label: '💰 On Sale', filter: p => p.discount },
        { id: 'all', label: '🛍️ All Products', filter: () => true }
    ];

    const displayProducts = allProducts.filter(tabs.find(t => t.id === activeTab).filter);

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', color: '#1a1a1a', overflowX: 'hidden' }}>
            {/* Floating Header */}
            <header style={{
                position: 'fixed',
                top: isMobile ? '1rem' : '2rem',
                left: '50%',
                transform: `translateX(-50%) ${scrollY > 100 ? 'translateY(-0.5rem)' : 'translateY(0)'}`,
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '60px',
                padding: isMobile ? '0.75rem 1.5rem' : '1rem 3rem',
                boxShadow: scrollY > 100 ? '0 20px 40px rgba(16, 185, 129, 0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                width: isMobile ? '90%' : 'max-content',
                maxWidth: '100%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? '0' : '4rem', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {isMobile && (
                            <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: '0.5rem' }}>
                                <Menu size={24} color="#1a1a1a" />
                            </button>
                        )}
                        <div style={{
                            width: isMobile ? '32px' : '40px',
                            height: isMobile ? '32px' : '40px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)'
                        }}>
                            <Zap size={isMobile ? 18 : 22} color="white" />
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? '1.25rem' : '1.5rem',
                            fontWeight: '900',
                            margin: 0,
                            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {storeConfig.nav?.storeName || 'PULSE'}
                        </h1>
                    </div>

                    {!isMobile && (
                        <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', fontWeight: '600' }}>
                            {(storeConfig.nav?.items || ['Shop', 'Deals', 'New', 'Contact']).map(item => (
                                <a key={item} href="#" style={{ color: '#1a1a1a', textDecoration: 'none', transition: 'color 0.3s' }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    )}

                    <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                        <Search size={isMobile ? 20 : 22} style={{ cursor: 'pointer', color: '#1a1a1a' }} />
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <ShoppingCart size={isMobile ? 20 : 22} style={{ color: '#1a1a1a' }} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: '#10b981',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)'
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
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)'
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
                        animation: 'slideIn 0.3s ease',
                        boxShadow: '20px 0 40px rgba(0,0,0,0.1)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#10b981' }}>MENU</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#1a1a1a" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
                            {(storeConfig.nav?.items || ['Shop', 'Deals', 'New', 'Contact']).map(item => (
                                <a key={item} href="#" style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '8rem 1.5rem 4rem' : '10rem 4rem 6rem',
                background: 'radial-gradient(circle at 50% 0%, #ecfdf5 0%, #f8fafc 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: '#10b981',
                    filter: 'blur(150px)',
                    opacity: 0.1,
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: '#34d399',
                    filter: 'blur(150px)',
                    opacity: 0.1,
                    borderRadius: '50%'
                }} />

                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#059669',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        marginBottom: '2rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                        <Sparkles size={16} />
                        {storeConfig.banner?.subtitle || 'NEW COLLECTION 2024'}
                    </div>
                    <h1 style={{
                        fontSize: isMobile ? '3rem' : '6rem',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '2rem',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(180deg, #1a1a1a 0%, #4a4a4a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {storeConfig.banner?.title || 'Future Tech'} <br />
                        <span style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>Now Available</span>
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.125rem' : '1.5rem',
                        color: '#64748b',
                        maxWidth: '800px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.6'
                    }}>
                        {storeConfig.description || 'Experience the next generation of electronics with our curated selection of premium gadgets and accessories.'}
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                        <button style={{
                            background: '#10b981',
                            color: 'white',
                            padding: '1.25rem 3.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                            transition: 'transform 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem'
                        }}>
                            {storeConfig.banner?.buttonText || 'Shop Now'}
                            <ArrowRight size={20} />
                        </button>
                        <button style={{
                            background: 'white',
                            color: '#1a1a1a',
                            padding: '1.25rem 3.5rem',
                            borderRadius: '50px',
                            border: '1px solid #e2e8f0',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem'
                        }}>
                            <Eye size={20} />
                            View Demo
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div style={{
                        marginTop: '6rem',
                        position: 'relative',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}>
                        <img
                            src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&h=800&fit=crop"}
                            alt="Hero"
                            style={{ width: '100%', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '2rem',
                            right: '2rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            pointerEvents: 'none'
                        }}>
                            {!isMobile && (
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            background: '#10b981',
                                            padding: '0.75rem',
                                            borderRadius: '12px',
                                            color: 'white'
                                        }}>
                                            <Gift size={24} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Special Offer</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>Get 20% Off</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                    {[
                        { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On orders over $100' },
                        { icon: <Shield size={32} />, title: '2 Year Warranty', desc: 'Full coverage included' },
                        { icon: <Clock size={32} />, title: 'Fast Delivery', desc: '2-3 business days' },
                        { icon: <Percent size={32} />, title: 'Best Price', desc: 'Guaranteed match' }
                    ].map((feature, i) => (
                        <div key={i} style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '24px',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                color: '#10b981',
                                background: '#ecfdf5',
                                padding: '1rem',
                                borderRadius: '50%',
                                marginBottom: '1rem'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Section */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 4rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '4rem', gap: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Popular Products</h2>
                            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Explore our best-selling electronics</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '16px', overflowX: isMobile ? 'auto' : 'visible', maxWidth: isMobile ? '100%' : 'auto' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'white' : 'transparent',
                                        color: activeTab === tab.id ? '#10b981' : '#64748b',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.3s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {displayProducts.map((product, i) => (
                            <div
                                key={product.id}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    border: '1px solid #f1f5f9',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: hoveredIndex === i ? 'translateY(-10px)' : 'translateY(0)',
                                    boxShadow: hoveredIndex === i ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ position: 'relative', paddingTop: '100%', background: '#f8fafc' }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: hoveredIndex === i ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)',
                                            width: '80%',
                                            height: '80%',
                                            objectFit: 'contain',
                                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem'
                                    }}>
                                        <button style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'white',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                            transition: 'transform 0.2s'
                                        }}>
                                            <Heart size={20} color={hoveredIndex === i ? '#ef4444' : '#cbd5e1'} fill={hoveredIndex === i ? '#ef4444' : 'none'} />
                                        </button>
                                    </div>
                                    {product.discount && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '1.5rem',
                                            left: '1.5rem',
                                            background: '#ef4444',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.875rem',
                                            fontWeight: '700'
                                        }}>
                                            -{product.discount}%
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{product.rating}</span>
                                        <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>({product.reviews})</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>
                                                ${product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                                                    ${product.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '14px',
                                            background: '#1a1a1a',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'white',
                                            transition: 'all 0.3s'
                                        }}>
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 4rem', background: '#10b981', color: 'white', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Join the Future</h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '3rem', opacity: 0.9 }}>
                        Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50px', flexDirection: isMobile ? 'column' : 'row' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                padding: '1rem 2rem',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                textAlign: isMobile ? 'center' : 'left'
                            }}
                        />
                        <button style={{
                            background: 'white',
                            color: '#10b981',
                            padding: '1rem 3rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1a1a1a', color: 'white', padding: isMobile ? '4rem 1.5rem' : '6rem 4rem 2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Zap size={22} color="white" />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{storeConfig.nav?.storeName || 'PULSE'}</h2>
                            </div>
                            <p style={{ color: '#94a3b8', lineHeight: '1.8', maxWidth: '300px' }}>
                                {storeConfig.texts?.footerText || 'Your destination for the latest in technology and innovation. We bring the future to your doorstep.'}
                            </p>
                        </div>
                        {[
                            { title: 'Shop', links: ['All Products', 'New Arrivals', 'Featured', 'Deals'] },
                            { title: 'Support', links: ['Help Center', 'Shipping', 'Returns', 'Contact'] },
                            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>{col.title}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {col.links.map(link => (
                                        <a key={link} href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>© 2024 {storeConfig.nav?.storeName || 'PULSE'}. All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <Icon key={i} size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
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

export default DynamicLightStore;
