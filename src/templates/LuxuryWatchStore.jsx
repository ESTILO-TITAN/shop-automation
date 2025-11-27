import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, TrendingUp, Award, Package, ChevronRight, Play, Check, Quote, Instagram, Facebook, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';

const LuxuryWatchStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = ['All Watches', 'Luxury', 'Sport', 'Classic', 'Limited Edition'];

    const testimonials = [
        { name: 'Michael Chen', role: 'CEO', text: 'Exceptional quality and service. My Rolex arrived perfectly packaged.', rating: 5, image: 'https://i.pravatar.cc/150?img=12' },
        { name: 'Sarah Williams', role: 'Designer', text: 'The attention to detail is remarkable. Highly recommend!', rating: 5, image: 'https://i.pravatar.cc/150?img=45' },
        { name: 'David Brown', role: 'Entrepreneur', text: 'Best luxury watch shopping experience online. Period.', rating: 5, image: 'https://i.pravatar.cc/150?img=33' }
    ];

    const featuredProducts = products.length > 0 ? products : [
        { id: 1, name: 'Royal Oak Chronograph', brand: 'Audemars Piguet', price: 45999, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop', rating: 5, badge: 'Limited' },
        { id: 2, name: 'Submariner Date', brand: 'Rolex', price: 12999, image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&h=500&fit=crop', rating: 5, badge: 'Bestseller' },
        { id: 3, name: 'Speedmaster Professional', brand: 'Omega', price: 6999, image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=500&h=500&fit=crop', rating: 5, badge: 'New' },
        { id: 4, name: 'Nautilus Steel', brand: 'Patek Philippe', price: 89999, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&h=500&fit=crop', rating: 5, badge: 'Exclusive' },
        { id: 5, name: 'Daytona Platinum', brand: 'Rolex', price: 75999, image: 'https://images.unsplash.com/photo-1611881699505-62477a3c4f75?w=500&h=500&fit=crop', rating: 5, badge: 'Limited' },
        { id: 6, name: 'Seamaster Diver', brand: 'Omega', price: 5499, image: 'https://images.unsplash.com/photo-1606390291880-f4b0e8b2b1d9?w=500&h=500&fit=crop', rating: 5, badge: 'Popular' }
    ];

    return (
        <div style={{ fontFamily: 'Playfair Display, Georgia, serif', background: '#0a0a0a', color: '#fff', overflowX: 'hidden' }}>
            {/* Top Bar */}
            <div style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a', padding: '0.75rem 0', fontSize: '0.875rem' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d4af37' }}>
                            <Shield size={14} />
                            {!isMobile && 'Authenticity Guaranteed'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d4af37' }}>
                            <Truck size={14} />
                            {!isMobile && 'Free Insured Shipping'}
                        </span>
                    </div>
                    {!isMobile && (
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#999' }}>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Track Order</a>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Concierge</a>
                        </div>
                    )}
                </div>
            </div>

            {/* Header */}
            <header style={{ background: '#0a0a0a', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(10px)' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {isMobile && (
                                <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    <Menu size={24} color="#d4af37" />
                                </button>
                            )}
                            <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '700', margin: 0, letterSpacing: '2px', color: '#d4af37' }}>
                                {storeConfig.nav?.storeName || 'CHRONOS'}
                            </h1>
                        </div>

                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                                {(storeConfig.nav?.items || categories).map(cat => (
                                    <a key={cat} href="#" onClick={() => setActiveCategory(cat)} style={{
                                        color: activeCategory === cat ? '#d4af37' : '#fff',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        transition: 'color 0.3s'
                                    }}>{cat}</a>
                                ))}
                            </nav>
                        )}

                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                            <Search size={20} style={{ cursor: 'pointer', color: '#d4af37' }} />
                            {!isMobile && <Heart size={20} style={{ cursor: 'pointer' }} />}
                            {!isMobile && <User size={20} style={{ cursor: 'pointer' }} />}
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <ShoppingCart size={20} style={{ color: '#d4af37' }} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: '#d4af37',
                                        color: '#000',
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
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobile && mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(10px)'
                }} onClick={() => setMobileMenuOpen(false)}>
                    <div style={{
                        width: '80%',
                        maxWidth: '300px',
                        height: '100%',
                        background: '#1a1a1a',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        animation: 'slideIn 0.3s ease',
                        borderRight: '1px solid #d4af37'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#d4af37', letterSpacing: '1px' }}>MENU</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#d4af37" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: '500' }}>
                            {(storeConfig.nav?.items || categories).map(cat => (
                                <a key={cat} href="#" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                    {cat}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '4rem', alignItems: 'center' }}>
                    <div style={{ order: isMobile ? 2 : 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                            color: '#000',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            marginBottom: '2rem',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            {storeConfig.banner?.subtitle || 'EXCLUSIVE COLLECTION 2024'}
                        </span>
                        <h2 style={{
                            fontSize: isMobile ? '3rem' : '4.5rem',
                            fontWeight: '700',
                            margin: '0 0 2rem 0',
                            lineHeight: '1.1',
                            letterSpacing: '-2px'
                        }}>
                            {storeConfig.banner?.title || 'Timeless Elegance'}
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            color: '#999',
                            marginBottom: '3rem',
                            lineHeight: '1.8',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            {storeConfig.description || "Discover the world's most prestigious timepieces. Each watch tells a story of craftsmanship, precision, and luxury."}
                        </p>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <button style={{
                                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                color: '#000',
                                padding: '1.25rem 3rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: '1px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'transform 0.3s',
                                width: isMobile ? '100%' : 'auto',
                                justifyContent: 'center'
                            }}>
                                {storeConfig.banner?.buttonText || 'EXPLORE COLLECTION'}
                                <ChevronRight size={20} />
                            </button>
                            <button style={{
                                background: 'transparent',
                                color: '#fff',
                                padding: '1.25rem 3rem',
                                borderRadius: '50px',
                                border: '2px solid #d4af37',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: '1px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s',
                                width: isMobile ? '100%' : 'auto',
                                justifyContent: 'center'
                            }}>
                                <Play size={18} fill="#d4af37" />
                                WATCH VIDEO
                            </button>
                        </div>
                    </div>
                    <div style={{ position: 'relative', order: isMobile ? 1 : 2 }}>
                        <div style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(212, 175, 55, 0.3)',
                            border: '1px solid #2a2a2a'
                        }}>
                            <img
                                src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=900&fit=crop"}
                                alt="Luxury Watch"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '2rem',
                            background: 'rgba(10, 10, 10, 0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid #d4af37'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Starting from</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#d4af37' }}>$5,999</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section style={{ background: '#1a1a1a', padding: isMobile ? '4rem 1.5rem' : '3rem 2rem', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '3rem' }}>
                    {[
                        { icon: <Shield size={40} />, title: '100% Authentic', desc: 'Certified genuine timepieces' },
                        { icon: <Truck size={40} />, title: 'Insured Delivery', desc: 'Free worldwide shipping' },
                        { icon: <RotateCcw size={40} />, title: '30-Day Returns', desc: 'Hassle-free returns' },
                        { icon: <Award size={40} />, title: 'Lifetime Warranty', desc: 'Comprehensive coverage' }
                    ].map((item, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ color: '#d4af37', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
                                {item.title}
                            </h3>
                            <p style={{ color: '#999', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Collection */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            color: '#d4af37',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            fontFamily: 'Inter, sans-serif'
                        }}>CURATED SELECTION</span>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '1rem 0', letterSpacing: '-1px' }}>
                            Featured Timepieces
                        </h2>
                        <p style={{ color: '#999', fontSize: '1.125rem', fontFamily: 'Inter, sans-serif' }}>
                            Handpicked masterpieces from the world's finest watchmakers
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '3rem' }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} style={{
                                background: '#1a1a1a',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                border: '1px solid #2a2a2a',
                                transition: 'all 0.4s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-12px)';
                                        e.currentTarget.style.borderColor = '#d4af37';
                                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(212, 175, 55, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = '#2a2a2a';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}
                            >
                                <div style={{ position: 'relative', paddingTop: '100%', background: '#0a0a0a' }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: 'rgba(10, 10, 10, 0.9)',
                                        border: '1px solid #d4af37',
                                        borderRadius: '50%',
                                        width: '48px',
                                        height: '48px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <Heart size={20} color="#d4af37" />
                                    </button>
                                    {product.badge && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '1.5rem',
                                            left: '1.5rem',
                                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                            color: '#000',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            letterSpacing: '1px',
                                            fontFamily: 'Inter, sans-serif'
                                        }}>
                                            {product.badge}
                                        </span>
                                    )}
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ fontSize: '0.875rem', color: '#d4af37', marginBottom: '0.75rem', fontWeight: '600', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>
                                        {product.brand}
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.3' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#d4af37" color="#d4af37" />
                                        ))}
                                        <span style={{ fontSize: '0.875rem', color: '#999', marginLeft: '0.5rem', fontFamily: 'Inter, sans-serif' }}>(5.0)</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#d4af37' }}>
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: '1rem 2rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            fontFamily: 'Inter, sans-serif',
                                            letterSpacing: '1px',
                                            transition: 'transform 0.2s'
                                        }}>
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
                borderTop: '1px solid #2a2a2a',
                borderBottom: '1px solid #2a2a2a'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                        The Art of Watchmaking
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#999', marginBottom: '3rem', fontFamily: 'Inter, sans-serif' }}>
                        Discover the meticulous craftsmanship behind every timepiece
                    </p>
                    <div style={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '2px solid #d4af37',
                        boxShadow: '0 30px 60px rgba(212, 175, 55, 0.3)'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&h=675&fit=crop"
                            alt="Watchmaking"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'rgba(212, 175, 55, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.3s'
                        }}>
                            <Play size={32} fill="#000" color="#000" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            color: '#d4af37',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            fontFamily: 'Inter, sans-serif'
                        }}>TESTIMONIALS</span>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '1rem 0', letterSpacing: '-1px' }}>
                            What Our Clients Say
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '3rem' }}>
                        {testimonials.map((testimonial, i) => (
                            <div key={i} style={{
                                background: '#1a1a1a',
                                padding: '3rem',
                                borderRadius: '20px',
                                border: '1px solid #2a2a2a',
                                position: 'relative'
                            }}>
                                <Quote size={40} color="#d4af37" style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} size={18} fill="#d4af37" color="#d4af37" />
                                    ))}
                                </div>
                                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '2rem', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                                    "{testimonial.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={testimonial.image} alt={testimonial.name} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #d4af37' }} />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1.125rem', fontFamily: 'Inter, sans-serif' }}>{testimonial.name}</div>
                                        <div style={{ color: '#999', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#000', letterSpacing: '-1px' }}>
                        Join Our Exclusive Club
                    </h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '3rem', color: '#333', fontFamily: 'Inter, sans-serif' }}>
                        Get early access to new arrivals and exclusive offers
                    </p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{
                                flex: 1,
                                padding: '1.25rem 1.5rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                outline: 'none',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        />
                        <button style={{
                            background: '#000',
                            color: '#d4af37',
                            padding: '1.25rem 3rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap'
                        }}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1a1a1a', padding: isMobile ? '4rem 1.5rem' : '4rem 2rem 2rem', borderTop: '1px solid #2a2a2a' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#d4af37', letterSpacing: '2px' }}>
                                {storeConfig.nav?.storeName || 'CHRONOS'}
                            </h3>
                            <p style={{ color: '#999', lineHeight: '1.8', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                                {storeConfig.texts?.footerText || "The world's premier destination for luxury timepieces since 1995."}
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <div key={i} style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '1px solid #d4af37',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}>
                                        <Icon size={18} color="#d4af37" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: 'Shop', items: ['All Watches', 'Luxury', 'Sport', 'Classic', 'Limited Edition'] },
                            { title: 'Support', items: ['Contact Us', 'Shipping', 'Returns', 'Warranty', 'Authentication'] },
                            {
                                title: 'Contact', items: [
                                    { icon: <Phone size={16} />, text: '+1 (555) 123-4567' },
                                    { icon: <Mail size={16} />, text: 'info@chronos.com' },
                                    { icon: <MapPin size={16} />, text: 'New York, NY 10001' }
                                ]
                            }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem' }}>
                                            {typeof item === 'string' ? (
                                                <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', transition: 'color 0.3s' }}>
                                                    {item}
                                                </a>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#999', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
                                                    <span style={{ color: '#d4af37' }}>{item.icon}</span>
                                                    {item.text}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        borderTop: '1px solid #2a2a2a',
                        paddingTop: '2rem',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#666',
                        fontSize: '0.875rem',
                        fontFamily: 'Inter, sans-serif',
                        gap: '1rem'
                    }}>
                        <div>© 2024 {storeConfig.nav?.storeName || 'CHRONOS'}. All rights reserved.</div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
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

export default LuxuryWatchStore;
