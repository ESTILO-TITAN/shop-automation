import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Leaf, Award, Package, ChevronRight, Check, Quote, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';

const OrganicFoodStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = ['Fresh Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Pantry', 'Beverages'];

    const featuredProducts = products.length > 0 ? products : [
        { id: 1, name: 'Organic Avocados', category: 'Fresh Produce', price: 4.99, unit: 'per lb', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&h=500&fit=crop', rating: 4.8, badge: 'Bestseller', organic: true },
        { id: 2, name: 'Free-Range Eggs', category: 'Dairy & Eggs', price: 6.99, unit: 'dozen', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop', rating: 4.9, badge: 'Local', organic: true },
        { id: 3, name: 'Grass-Fed Beef', category: 'Meat', price: 12.99, unit: 'per lb', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop', rating: 4.7, badge: 'Premium', organic: true },
        { id: 4, name: 'Sourdough Bread', category: 'Bakery', price: 5.49, unit: 'loaf', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop', rating: 4.9, badge: 'Fresh Daily', organic: true },
        { id: 5, name: 'Almond Milk', category: 'Beverages', price: 4.29, unit: 'half gallon', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop', rating: 4.6, badge: 'Vegan', organic: true },
        { id: 6, name: 'Mixed Greens', category: 'Fresh Produce', price: 3.99, unit: 'bunch', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=500&fit=crop', rating: 4.8, badge: 'Organic', organic: true }
    ];

    const benefits = [
        { title: '100% Organic', desc: 'Certified organic produce', icon: <Leaf size={32} /> },
        { title: 'Farm Fresh', desc: 'Delivered within 24 hours', icon: <Sparkles size={32} /> },
        { title: 'No Pesticides', desc: 'Chemical-free farming', icon: <Shield size={32} /> },
        { title: 'Local Sourcing', desc: 'Supporting local farmers', icon: <Award size={32} /> }
    ];

    return (
        <div style={{ fontFamily: 'Quicksand, sans-serif', background: '#f9faf5', color: '#2d3436', overflowX: 'hidden' }}>
            {/* Top Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #6ab04c 0%, #78e08f 100%)',
                color: 'white',
                textAlign: 'center',
                padding: '1rem',
                fontSize: '0.95rem',
                fontWeight: '600'
            }}>
                🌱 Free Delivery on Orders Over $50 | Fresh from Farm to Table
            </div>

            {/* Header */}
            <header style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {isMobile && (
                                <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: '0.5rem' }}>
                                    <Menu size={24} color="#6ab04c" />
                                </button>
                            )}
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #6ab04c 0%, #78e08f 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Leaf size={28} color="white" />
                            </div>
                            <h1 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: '700', margin: 0, color: '#6ab04c' }}>
                                {storeConfig.nav?.storeName || 'GreenMarket'}
                            </h1>
                        </div>

                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', fontWeight: '600' }}>
                                {(storeConfig.nav?.items || categories.slice(0, 4)).map(cat => (
                                    <a key={cat} href="#" style={{ color: '#2d3436', textDecoration: 'none', transition: 'color 0.3s' }}>
                                        {cat}
                                    </a>
                                ))}
                            </nav>
                        )}

                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                            <Search size={22} style={{ cursor: 'pointer', color: '#6ab04c' }} />
                            {!isMobile && <Heart size={22} style={{ cursor: 'pointer' }} />}
                            {!isMobile && <User size={22} style={{ cursor: 'pointer' }} />}
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <ShoppingCart size={22} style={{ color: '#6ab04c' }} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: '#ff6b6b',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
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
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#6ab04c' }}>Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#6ab04c" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
                            {(storeConfig.nav?.items || categories).map(cat => (
                                <a key={cat} href="#" style={{ color: '#2d3436', textDecoration: 'none' }}>
                                    {cat}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
                padding: isMobile ? '3rem 1.5rem' : '5rem 2rem',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '4rem', alignItems: 'center' }}>
                    <div style={{ order: isMobile ? 2 : 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <span style={{
                            display: 'inline-block',
                            background: '#6ab04c',
                            color: 'white',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '50px',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            marginBottom: '2rem'
                        }}>
                            {storeConfig.banner?.subtitle || '🌿 100% ORGANIC & FRESH'}
                        </span>
                        <h2 style={{
                            fontSize: isMobile ? '2.5rem' : '4rem',
                            fontWeight: '800',
                            margin: '0 0 1.5rem 0',
                            lineHeight: '1.1',
                            color: '#2d3436'
                        }}>
                            {storeConfig.banner?.title || 'Healthy Living Starts Here'}
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            color: '#636e72',
                            marginBottom: '2.5rem',
                            lineHeight: '1.8'
                        }}>
                            {storeConfig.description || 'Farm-fresh organic produce delivered to your doorstep. No pesticides, no chemicals, just pure goodness.'}
                        </p>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <button style={{
                                background: 'linear-gradient(135deg, #6ab04c 0%, #78e08f 100%)',
                                color: 'white',
                                padding: '1.25rem 3rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(106, 176, 76, 0.3)',
                                transition: 'transform 0.3s',
                                width: isMobile ? '100%' : 'auto'
                            }}>
                                {storeConfig.banner?.buttonText || 'Shop Now'}
                            </button>
                            <button style={{
                                background: 'white',
                                color: '#6ab04c',
                                padding: '1.25rem 3rem',
                                borderRadius: '50px',
                                border: '2px solid #6ab04c',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                width: isMobile ? '100%' : 'auto'
                            }}>
                                Learn More
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3rem', marginTop: '3rem', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                            {[
                                { number: '5000+', label: 'Happy Customers' },
                                { number: '100%', label: 'Organic Certified' },
                                { number: '24/7', label: 'Fresh Delivery' }
                            ].map((stat, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '800', color: '#6ab04c', marginBottom: '0.25rem' }}>
                                        {stat.number}
                                    </div>
                                    <div style={{ fontSize: '0.95rem', color: '#636e72' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: 'relative', order: isMobile ? 1 : 2 }}>
                        <div style={{
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
                        }}>
                            <img
                                src={storeConfig.banner?.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=800&fit=crop"}
                                alt="Fresh Produce"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                        {!isMobile && (
                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                right: '-2rem',
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '20px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                minWidth: '200px'
                            }}>
                                <div style={{ fontSize: '0.875rem', color: '#636e72', marginBottom: '0.5rem' }}>This Week's Deal</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#6ab04c', marginBottom: '0.5rem' }}>30% OFF</div>
                                <div style={{ fontSize: '0.95rem', color: '#2d3436', fontWeight: '600' }}>On All Fresh Produce</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section style={{ padding: isMobile ? '3rem 1.5rem' : '4rem 2rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '3rem' }}>
                    {benefits.map((benefit, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#6ab04c'
                            }}>
                                {benefit.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: '#2d3436' }}>
                                {benefit.title}
                            </h3>
                            <p style={{ color: '#636e72', fontSize: '0.95rem' }}>{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', background: '#f9faf5' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: '#6ab04c', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '2px' }}>
                            FRESH ARRIVALS
                        </span>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0', color: '#2d3436' }}>
                            This Week's Favorites
                        </h2>
                        <p style={{ color: '#636e72', fontSize: '1.125rem' }}>
                            Handpicked fresh produce from local organic farms
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2.5rem' }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(106, 176, 76, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                                    }
                                }}
                            >
                                <div style={{ position: 'relative', paddingTop: '100%', background: '#f8f9fa' }}>
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
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '44px',
                                        height: '44px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        <Heart size={20} color="#6ab04c" />
                                    </button>
                                    {product.badge && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '1.5rem',
                                            left: '1.5rem',
                                            background: '#6ab04c',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {product.badge}
                                        </span>
                                    )}
                                    {product.organic && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '1rem',
                                            left: '1rem',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: '#6ab04c'
                                        }}>
                                            <Leaf size={14} />
                                            ORGANIC
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ fontSize: '0.875rem', color: '#6ab04c', marginBottom: '0.5rem', fontWeight: '600' }}>
                                        {product.category}
                                    </div>
                                    <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.75rem', color: '#2d3436' }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#ffd93d' : 'none'} color="#ffd93d" />
                                        ))}
                                        <span style={{ fontSize: '0.875rem', color: '#636e72', marginLeft: '0.25rem' }}>({product.rating})</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#2d3436' }}>
                                                ${product.price}
                                            </span>
                                            <span style={{ fontSize: '0.875rem', color: '#636e72', marginLeft: '0.5rem' }}>
                                                {product.unit}
                                            </span>
                                        </div>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: 'linear-gradient(135deg, #6ab04c 0%, #78e08f 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: '0.875rem 1.75rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
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

            {/* Categories Grid */}
            <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', background: 'white' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem', color: '#2d3436' }}>
                        Shop by Category
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                        {categories.map((cat, i) => (
                            <div key={i} style={{
                                position: 'relative',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                height: '300px'
                            }}>
                                <img
                                    src={`https://images.unsplash.com/photo-${1540420773420 + i * 1000}?w=500&h=300&fit=crop`}
                                    alt={cat}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '2rem'
                                }}>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white', margin: 0 }}>
                                        {cat}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: '#2d3436' }}>
                        What Our Customers Say
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#636e72', marginBottom: '4rem' }}>
                        Join thousands of happy customers living healthier
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                        {[
                            { name: 'Emma Johnson', text: 'The freshest produce I\'ve ever ordered online! Delivery was quick and everything was perfectly packaged.', rating: 5, image: 'https://i.pravatar.cc/150?img=47' },
                            { name: 'James Wilson', text: 'Love supporting local farmers through GreenMarket. Quality is outstanding and prices are fair.', rating: 5, image: 'https://i.pravatar.cc/150?img=13' },
                            { name: 'Sophia Martinez', text: 'Finally found a reliable source for organic groceries. My family loves the taste difference!', rating: 5, image: 'https://i.pravatar.cc/150?img=44' }
                        ].map((testimonial, i) => (
                            <div key={i} style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} size={18} fill="#ffd93d" color="#ffd93d" />
                                    ))}
                                </div>
                                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '2rem', color: '#636e72' }}>
                                    "{testimonial.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                    <img src={testimonial.image} alt={testimonial.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: '700', color: '#2d3436' }}>{testimonial.name}</div>
                                        <div style={{ fontSize: '0.875rem', color: '#636e72' }}>Verified Customer</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{
                background: 'linear-gradient(135deg, #6ab04c 0%, #78e08f 100%)',
                padding: isMobile ? '3rem 1.5rem' : '5rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'white' }}>
                        Get Fresh Updates
                    </h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.9)' }}>
                        Subscribe to our newsletter for weekly recipes and exclusive offers
                    </p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                flex: 1,
                                padding: '1.25rem 1.5rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            background: '#2d3436',
                            color: 'white',
                            padding: '1.25rem 2.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#2d3436', color: 'white', padding: isMobile ? '4rem 1.5rem' : '4rem 2rem 2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#6ab04c',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Leaf size={22} color="white" />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{storeConfig.nav?.storeName || 'GreenMarket'}</h3>
                            </div>
                            <p style={{ color: '#b2bec3', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                {storeConfig.texts?.footerText || 'Your trusted source for organic, farm-fresh produce since 2015.'}
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <div key={i} style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: '#636e72',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <Icon size={18} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: 'Shop', items: ['Fresh Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Pantry'] },
                            { title: 'Support', items: ['Contact Us', 'Shipping Info', 'Returns', 'FAQ', 'Track Order'] },
                            {
                                title: 'Contact', items: [
                                    { icon: <Phone size={16} />, text: '+1 (555) 987-6543' },
                                    { icon: <Mail size={16} />, text: 'hello@greenmarket.com' },
                                    { icon: <MapPin size={16} />, text: 'San Francisco, CA' }
                                ]
                            }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem' }}>
                                            {typeof item === 'string' ? (
                                                <a href="#" style={{ color: '#b2bec3', textDecoration: 'none', fontSize: '0.95rem' }}>
                                                    {item}
                                                </a>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#b2bec3', fontSize: '0.95rem' }}>
                                                    <span style={{ color: '#6ab04c' }}>{item.icon}</span>
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
                        borderTop: '1px solid #636e72',
                        paddingTop: '2rem',
                        textAlign: 'center',
                        color: '#b2bec3',
                        fontSize: '0.875rem'
                    }}>
                        © 2024 {storeConfig.nav?.storeName || 'GreenMarket'}. All rights reserved. | Privacy Policy | Terms of Service
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

export default OrganicFoodStore;
