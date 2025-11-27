import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Play, ChevronRight, Check, Quote, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Award, Zap, TrendingUp, ArrowRight, Eye, Filter, Sparkles, Cpu, Layers, Box, Package2 } from 'lucide-react';

const InteractiveTechStore = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [activeProduct, setActiveProduct] = useState(0);
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const featuredProducts = products.length > 0 ? products : [
        {
            id: 1,
            name: 'AeroMax Pro',
            tagline: 'The Future of Performance',
            price: 1299,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            colors: [
                { name: 'Midnight Black', hex: '#0a0a0a', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop' },
                { name: 'Arctic Silver', hex: '#c0c0c0', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop' },
                { name: 'Ocean Blue', hex: '#0066cc', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop' }
            ],
            features: [
                { icon: <Cpu size={24} />, title: 'Neural Engine', desc: 'AI-powered performance' },
                { icon: <Layers size={24} />, title: 'Ultra Display', desc: '120Hz ProMotion' },
                { icon: <Zap size={24} />, title: 'Fast Charge', desc: '0-80% in 30min' },
                { icon: <Shield size={24} />, title: 'Secure', desc: 'Military-grade encryption' }
            ],
            specs: [
                { label: 'Processor', value: 'A17 Pro Chip' },
                { label: 'Memory', value: '16GB RAM' },
                { label: 'Storage', value: 'Up to 1TB' },
                { label: 'Battery', value: '24hr+ life' }
            ]
        },
        {
            id: 2,
            name: 'SonicWave Elite',
            tagline: 'Immersive Audio Experience',
            price: 599,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            colors: [
                { name: 'Space Gray', hex: '#4a4a4a', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop' },
                { name: 'Rose Gold', hex: '#b76e79', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop' }
            ],
            features: [
                { icon: <Sparkles size={24} />, title: 'Spatial Audio', desc: '3D sound experience' },
                { icon: <Shield size={24} />, title: 'Noise Cancel', desc: 'Active ANC' },
                { icon: <Zap size={24} />, title: '40hr Battery', desc: 'All-day listening' },
                { icon: <Cpu size={24} />, title: 'Smart Adapt', desc: 'Auto EQ tuning' }
            ],
            specs: [
                { label: 'Driver', value: '40mm Dynamic' },
                { label: 'Frequency', value: '20Hz-40kHz' },
                { label: 'Connectivity', value: 'Bluetooth 5.3' },
                { label: 'Weight', value: '250g' }
            ]
        }
    ];

    const currentProduct = featuredProducts[activeProduct];
    const currentColor = currentProduct.colors ? currentProduct.colors[selectedColor] : { image: currentProduct.image };

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#000', color: '#fff', overflowX: 'hidden' }}>
            {/* Futuristic Header */}
            <header style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000
            }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', padding: isMobile ? '1rem 1.5rem' : '1rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {isMobile && (
                                <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: '0.5rem' }}>
                                    <Menu size={24} color="white" />
                                </button>
                            )}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Cpu size={24} color="white" />
                            </div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {storeConfig.nav?.storeName || 'NEXUS'}
                            </h1>
                        </div>

                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '3rem', fontSize: '0.95rem', fontWeight: '500' }}>
                                {(storeConfig.nav?.items || ['Products', 'Technology', 'Innovation', 'Support']).map(item => (
                                    <a key={item} href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.3s' }}>
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        )}

                        <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
                            <Search size={22} style={{ cursor: 'pointer', opacity: 0.8 }} />
                            {!isMobile && <Heart size={22} style={{ cursor: 'pointer', opacity: 0.8 }} />}
                            {!isMobile && <User size={22} style={{ cursor: 'pointer', opacity: 0.8 }} />}
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <ShoppingCart size={22} style={{ opacity: 0.8 }} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
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
                        borderRight: '1px solid rgba(255,255,255,0.1)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>MENU</h2>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="white" />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontWeight: '500' }}>
                            {(storeConfig.nav?.items || ['Products', 'Technology', 'Innovation', 'Support']).map(item => (
                                <a key={item} href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Interactive Hero - 3D Product Showcase */}
            <section style={{
                minHeight: '100vh',
                paddingTop: '80px',
                background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #000 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23667eea\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.3
                }} />

                <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '6rem', alignItems: 'center' }}>
                        {/* Product Info */}
                        <div style={{ order: isMobile ? 2 : 1 }}>
                            <span style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                marginBottom: '2rem'
                            }}>
                                {storeConfig.banner?.subtitle || 'NEW ARRIVAL'}
                            </span>
                            <h2 style={{
                                fontSize: isMobile ? '3rem' : '5rem',
                                fontWeight: '800',
                                margin: '0 0 1rem 0',
                                lineHeight: '1',
                                background: 'linear-gradient(135deg, #fff 0%, #667eea 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {storeConfig.banner?.title || currentProduct.name}
                            </h2>
                            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#999', marginBottom: '3rem', fontWeight: '300' }}>
                                {storeConfig.description || currentProduct.tagline}
                            </p>

                            {/* Color Selector */}
                            {currentProduct.colors && (
                                <div style={{ marginBottom: '3rem' }}>
                                    <p style={{ fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Choose Color
                                    </p>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {currentProduct.colors.map((color, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedColor(i)}
                                                style={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                <div style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '12px',
                                                    background: color.hex,
                                                    border: selectedColor === i ? '3px solid #667eea' : '2px solid rgba(255,255,255,0.2)',
                                                    boxShadow: selectedColor === i ? '0 0 20px rgba(102, 126, 234, 0.5)' : 'none',
                                                    transition: 'all 0.3s'
                                                }} />
                                                <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', opacity: selectedColor === i ? 1 : 0.5 }}>
                                                    {color.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price & CTA */}
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: '2rem', marginBottom: '3rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    ${currentProduct.price}
                                </span>
                                <button onClick={() => {
                                    onAddToCart && onAddToCart(currentProduct);
                                    setCartCount(cartCount + 1);
                                }} style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '1.5rem 4rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    width: isMobile ? '100%' : 'auto',
                                    justifyContent: 'center'
                                }}>
                                    {storeConfig.banner?.buttonText || 'Add to Cart'}
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Features Grid */}
                            {currentProduct.features && (
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                    {currentProduct.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            onMouseEnter={() => setHoveredFeature(i)}
                                            onMouseLeave={() => setHoveredFeature(null)}
                                            style={{
                                                background: hoveredFeature === i ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                                padding: '1.5rem',
                                                borderRadius: '16px',
                                                border: hoveredFeature === i ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                transition: 'all 0.3s',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div style={{ color: '#667eea', marginBottom: '1rem' }}>
                                                {feature.icon}
                                            </div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                                {feature.title}
                                            </h4>
                                            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3D Product Display */}
                        <div style={{ position: 'relative', order: isMobile ? 1 : 2 }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '100%',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)'
                            }}>
                                <img
                                    src={storeConfig.banner?.image || currentColor.image}
                                    alt={currentProduct.name}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%) scale(0.8)',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        transition: 'all 0.6s ease'
                                    }}
                                />
                            </div>
                            {/* Floating Specs */}
                            {currentProduct.specs && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: isMobile ? '-1rem' : '-2rem',
                                    left: isMobile ? '1rem' : '2rem',
                                    right: isMobile ? '1rem' : '2rem',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                        {currentProduct.specs.map((spec, i) => (
                                            <div key={i}>
                                                <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                    {spec.label}
                                                </p>
                                                <p style={{ fontSize: '1rem', fontWeight: '700' }}>
                                                    {spec.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Carousel */}
            <section style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
                            Explore Our Range
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: '#999' }}>
                            Cutting-edge technology meets stunning design
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: isMobile ? 'flex-start' : 'center', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '1rem' : '0' }}>
                        {featuredProducts.map((product, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setActiveProduct(i);
                                    setSelectedColor(0);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={{
                                    minWidth: '300px',
                                    width: '300px',
                                    background: activeProduct === i ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    border: activeProduct === i ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    paddingTop: '100%',
                                    position: 'relative',
                                    marginBottom: '1.5rem',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.05)'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%) scale(0.7)',
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                    {product.name}
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '1rem' }}>
                                    {product.tagline}
                                </p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    ${product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Specs Comparison */}
            <section style={{ padding: '6rem 2rem', background: '#000', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}>
                        Technical Excellence
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                        {[
                            { icon: <Cpu size={40} />, title: 'Neural Processing', value: '15.8 TOPS', desc: 'AI acceleration' },
                            { icon: <Layers size={40} />, title: 'Display Tech', value: 'OLED Pro', desc: '120Hz adaptive' },
                            { icon: <Zap size={40} />, title: 'Power Efficiency', value: '40% Better', desc: 'vs previous gen' },
                            { icon: <Shield size={40} />, title: 'Security', value: 'Military Grade', desc: 'AES-256 encryption' }
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '3rem 2rem',
                                borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}>
                                <div style={{ color: '#667eea', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {item.value}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#999' }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{
                padding: '6rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'white' }}>
                        Stay Connected
                    </h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: 'rgba(255,255,255,0.9)' }}>
                        Get early access to new products and exclusive tech insights
                    </p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                flex: 1,
                                padding: '1.5rem 2rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            background: '#000',
                            color: 'white',
                            padding: '1.5rem 3rem',
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
            <footer style={{ background: '#0a0a0a', padding: isMobile ? '4rem 1.5rem' : '4rem 2rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Cpu size={24} color="white" />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{storeConfig.nav?.storeName || 'NEXUS'}</h3>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#999', lineHeight: '1.8' }}>
                                {storeConfig.texts?.footerText || 'Pioneering the future of technology with innovative products.'}
                            </p>
                        </div>
                        {[
                            { title: 'Products', items: ['Smartphones', 'Audio', 'Wearables', 'Accessories'] },
                            { title: 'Company', items: ['About Us', 'Careers', 'Press', 'Blog'] },
                            { title: 'Support', items: ['Help Center', 'Warranty', 'Returns', 'Contact'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem' }}>
                                            <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '0.875rem' }}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: '2rem',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#666',
                        fontSize: '0.875rem',
                        gap: '1rem'
                    }}>
                        <div>© 2024 {storeConfig.nav?.storeName || 'NEXUS'}. All rights reserved.</div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <Icon key={i} size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
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

export default InteractiveTechStore;
