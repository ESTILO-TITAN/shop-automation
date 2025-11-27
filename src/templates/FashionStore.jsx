import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, User, Menu, X, Star, TrendingUp, Award, Package, ChevronRight, ArrowRight } from 'lucide-react';

const FashionStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const collections = storeConfig.nav?.items || ['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'];

    const defaultProducts = [
        { id: 1, name: 'Silk Blend Dress', price: 129.99, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop', category: 'Women', colors: ['#000', '#fff', '#ec4899'] },
        { id: 2, name: 'Leather Jacket', price: 249.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop', category: 'Men', colors: ['#000', '#8b4513'] },
        { id: 3, name: 'Summer Blouse', price: 79.99, image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600&h=800&fit=crop', category: 'Women', colors: ['#fff', '#fbbf24', '#ec4899'] },
        { id: 4, name: 'Denim Jeans', price: 89.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', category: 'Men', colors: ['#1e40af', '#000'] },
        { id: 5, name: 'Floral Maxi Dress', price: 159.99, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', category: 'Women', colors: ['#fbbf24', '#ec4899', '#8b5cf6'] },
        { id: 6, name: 'Casual Blazer', price: 199.99, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop', category: 'Men', colors: ['#1f2937', '#6b7280'] }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;

    return (
        <div style={{ fontFamily: 'Poppins, system-ui, sans-serif', background: '#ffffff', overflowX: 'hidden' }}>
            {/* Top Banner */}
            <div style={{
                background: '#000',
                color: 'white',
                textAlign: 'center',
                padding: '0.75rem',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: '500'
            }}>
                ✨ New Season Sale - Up to 50% OFF | Free Shipping on Orders $75+
            </div>

            {/* Header */}
            <header style={{
                background: 'white',
                borderBottom: '1px solid #f1f1f1',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {isMobile && (
                                <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: '0.5rem' }}>
                                    <Menu size={24} color="#1f2937" />
                                </button>
                            )}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ShoppingBag size={24} color="white" />
                            </div>
                            <h1 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>
                                {storeConfig.nav?.storeName || 'LUXE'}
                            </h1>
                        </div>

                        {/* Navigation - Desktop */}
                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '2.5rem' }}>
                                {collections.map(item => (
                                    <a key={item} href="#" style={{
                                        color: '#1f2937',
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        position: 'relative',
                                        transition: 'color 0.2s'
                                    }}>
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        )}

                        {/* Icons */}
                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Search size={22} color="#1f2937" />
                            </button>
                            {!isMobile && (
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <User size={22} color="#1f2937" />
                                </button>
                            )}
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                                <Heart size={22} color="#1f2937" />
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    background: '#ec4899',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: 'white',
                                    fontWeight: '700'
                                }}>3</span>
                            </button>
                            <button onClick={() => setCartOpen(!cartOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                                <ShoppingBag size={22} color="#1f2937" />
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    background: '#ec4899',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: 'white',
                                    fontWeight: '700'
                                }}>0</span>
                            </button>
                        </div>
                    </div>
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
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1f2937' }}>Menu</h2>
                            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#1f2937" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
                            {collections.map(item => (
                                <a key={item} href="#" style={{ color: '#1f2937', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <ChevronRight size={16} color="#ec4899" />
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                padding: isMobile ? '3rem 1.5rem' : '4rem 1.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ order: isMobile ? 2 : 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <span style={{
                            display: 'inline-block',
                            background: '#ec4899',
                            color: 'white',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '50px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            letterSpacing: '0.5px'
                        }}>
                            {storeConfig.banner?.subtitle || 'SPRING COLLECTION 2024'}
                        </span>
                        <h2 style={{
                            fontSize: isMobile ? '2.5rem' : '4rem',
                            fontWeight: '800',
                            margin: '0 0 1.5rem 0',
                            lineHeight: '1.1',
                            color: '#1f2937',
                            letterSpacing: '-2px'
                        }}>
                            {storeConfig.banner?.title || <>Elevate Your<br /><span style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Style</span></>}
                        </h2>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', color: '#6b7280', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                            {storeConfig.description || 'Discover the latest trends in fashion. Curated collections that define elegance and sophistication.'}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <button style={{
                                background: '#000',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}>
                                {storeConfig.banner?.buttonText || 'Shop Women'}
                            </button>
                            <button style={{
                                background: 'white',
                                color: '#000',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                border: '2px solid #000',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                Shop Men
                            </button>
                        </div>
                    </div>
                    <div style={{ position: 'relative', order: isMobile ? 1 : 2 }}>
                        <div style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                        }}>
                            <img
                                src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=900&fit=crop"}
                                alt="Fashion Model"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                        {!isMobile && (
                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                right: '2rem',
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Starting from</div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ec4899' }}>$49.99</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: isMobile ? '2rem 1rem' : '3rem 1.5rem', background: '#fafafa' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <TrendingUp size={28} />, title: 'Trending Styles', desc: 'Latest fashion trends' },
                        { icon: <Award size={28} />, title: 'Premium Quality', desc: 'Handpicked materials' },
                        { icon: <Package size={28} />, title: 'Fast Delivery', desc: '2-4 days shipping' },
                        { icon: <Heart size={28} />, title: 'Easy Returns', desc: '30-day return policy' }
                    ].map((feature, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#ec4899', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1f2937' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section style={{ padding: isMobile ? '3rem 1rem' : '4rem 1.5rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                            {storeConfig.texts?.productsTitle || 'New Arrivals'}
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                            Fresh styles just landed
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(160px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: isMobile ? '1rem' : '2rem' }}>
                        {displayProducts.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                border: '1px solid #f1f1f1'
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
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}
                            >
                                <div style={{ position: 'relative', paddingTop: '125%', background: '#f9fafb', overflow: 'hidden' }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s'
                                    }} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        transition: 'all 0.2s'
                                    }}>
                                        <Heart size={18} color="#1f2937" />
                                    </button>
                                    <span style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        left: '0.5rem',
                                        background: '#ec4899',
                                        color: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600'
                                    }}>
                                        NEW
                                    </span>
                                </div>
                                <div style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                                        {product.category}
                                    </div>
                                    <h3 style={{ fontSize: isMobile ? '1rem' : '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.name}
                                    </h3>

                                    {/* Color Options */}
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                        {product.colors?.map((color, i) => (
                                            <div key={i} style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: color,
                                                border: '2px solid #e5e7eb',
                                                cursor: 'pointer'
                                            }} />
                                        ))}
                                    </div>

                                    {/* Size Options - Hidden on Mobile to save space */}
                                    {!isMobile && (
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                                <button key={size} style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #e5e7eb',
                                                    background: 'white',
                                                    borderRadius: '4px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: '800', color: '#1f2937' }}>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <button onClick={() => onAddToCart && onAddToCart(product)} style={{
                                            background: '#000',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: isMobile ? '0.5rem' : '0.75rem 1.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            {isMobile ? <ShoppingBag size={16} /> : <>
                                                <ShoppingBag size={16} />
                                                Add to Bag
                                            </>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Section */}
            <section style={{ padding: isMobile ? '3rem 1.5rem' : '4rem 1.5rem', background: '#fafafa' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#1f2937' }}>
                        Follow Us @luxefashion
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                        Get inspired by our community
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        {[1, 2, 3, 4, 5, 6].slice(0, isMobile ? 4 : 6).map(i => (
                            <div key={i} style={{
                                paddingTop: '100%',
                                background: '#e5e7eb',
                                borderRadius: '12px',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}>
                                <img
                                    src={`https://images.unsplash.com/photo-${1490481651871 + i}?w=300&h=300&fit=crop`}
                                    alt={`Instagram ${i}`}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1f2937', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 3rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ShoppingBag size={20} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{storeConfig.nav?.storeName || 'LUXE'}</h3>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {storeConfig.texts?.footerText || 'Redefining fashion with timeless elegance and contemporary style.'}
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {collections.slice(0, 4).map(item => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.95rem' }}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Customer Care</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Contact', 'Shipping', 'Returns', 'Size Guide'].map(item => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.95rem' }}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Stay Connected</h4>
                        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '1rem' }}>
                            Subscribe for exclusive offers
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="email" placeholder="Your email" style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                outline: 'none',
                                background: '#374151',
                                color: 'white'
                            }} />
                            <button style={{
                                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem 1.5rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #374151', paddingTop: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
                    © 2024 {storeConfig.nav?.storeName || 'LUXE Fashion'}. All rights reserved.
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

export default FashionStore;
