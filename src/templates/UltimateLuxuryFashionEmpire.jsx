import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Play, ChevronRight, Check, Quote, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Award, Zap, TrendingUp, ArrowRight, Eye, Filter, Sparkles, Crown, Gem, Scissors, Palette, Diamond, Feather, Wind, Sun, Moon } from 'lucide-react';

const UltimateLuxuryFashionEmpire = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [activeScene, setActiveScene] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [is3DView, setIs3DView] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouse);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    const collections = [
        {
            id: 1,
            name: 'CELESTIAL DREAMS',
            tagline: 'Where Heaven Meets Haute Couture',
            season: 'HAUTE COUTURE SS 2024',
            hero: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1920&h=1080&fit=crop',
            mood: 'Ethereal, Divine, Transcendent',
            products: [
                {
                    id: 1,
                    name: 'Constellation Gown',
                    designer: 'MAISON CÉLESTE',
                    price: 45000,
                    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200&fit=crop',
                    details: 'Hand-embroidered with 10,000 Swarovski crystals',
                    exclusive: true,
                    limited: '1 of 5',
                    views: ['front', 'back', 'detail']
                },
                {
                    id: 2,
                    name: 'Moonlight Cape',
                    designer: 'ATELIER LUMIÈRE',
                    price: 38000,
                    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1200&fit=crop',
                    details: 'Silk organza with pearl embellishments',
                    exclusive: true,
                    limited: '1 of 3'
                },
                {
                    id: 3,
                    name: 'Stardust Dress',
                    designer: 'MAISON CÉLESTE',
                    price: 28000,
                    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1200&fit=crop',
                    details: 'Metallic thread weaving',
                    exclusive: true
                }
            ]
        }
    ];

    const currentCollection = collections[activeScene];

    return (
        <div style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            background: '#000',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Luxury Cursor Trail */}
            <div style={{
                position: 'fixed',
                left: mousePosition.x,
                top: mousePosition.y,
                width: '60px',
                height: '60px',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 10000,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.15s ease',
                mixBlendMode: 'screen'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '50%'
                }} />
            </div>

            {/* Animated Background Particles */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 1
            }} />

            {/* Cinematic Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                padding: '3rem 6rem',
                background: scrollY > 100 ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
                backdropFilter: scrollY > 100 ? 'blur(30px)' : 'none',
                borderBottom: scrollY > 100 ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
                        }}>
                            <Diamond size={28} color="#000" />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: '300',
                                margin: 0,
                                letterSpacing: '0.8em',
                                background: 'linear-gradient(135deg, #d4af37 0%, #fff 50%, #d4af37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                EMPIRE
                            </h1>
                            <p style={{
                                fontSize: '0.65rem',
                                letterSpacing: '0.5em',
                                opacity: 0.7,
                                margin: 0,
                                fontFamily: 'Inter, sans-serif'
                            }}>
                                HAUTE COUTURE MAISON
                            </p>
                        </div>
                    </div>

                    <nav style={{ display: 'flex', gap: '5rem', fontSize: '0.875rem', fontWeight: '300', letterSpacing: '0.4em' }}>
                        {['COLLECTIONS', 'HAUTE COUTURE', 'ATELIER', 'MAISON', 'PRIVATE'].map(item => (
                            <a key={item} href="#" style={{
                                color: '#fff',
                                textDecoration: 'none',
                                position: 'relative',
                                transition: 'all 0.3s',
                                fontFamily: 'Inter, sans-serif'
                            }}>
                                {item}
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '0%',
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                                    transition: 'width 0.4s'
                                }} />
                            </a>
                        ))}
                    </nav>

                    <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                        <Search size={22} style={{ cursor: 'pointer', opacity: 0.9 }} />
                        <Heart size={22} style={{ cursor: 'pointer', opacity: 0.9 }} />
                        <User size={22} style={{ cursor: 'pointer', opacity: 0.9 }} />
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <ShoppingCart size={22} style={{ opacity: 0.9 }} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                    color: '#000',
                                    borderRadius: '50%',
                                    width: '22px',
                                    height: '22px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
                                }}>{cartCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Epic Hero - Immersive Experience */}
            <section style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {/* Layered Parallax Backgrounds */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                    zIndex: 3
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
                    zIndex: 2
                }} />
                <img
                    src={currentCollection.hero}
                    alt="Hero"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.3}px)`,
                        transition: 'transform 0.1s'
                    }}
                />

                {/* Floating Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    zIndex: 4,
                    animation: 'float 6s ease-in-out infinite'
                }}>
                    <Feather size={60} color="#d4af37" style={{ opacity: 0.3 }} />
                </div>

                <div style={{
                    position: 'relative',
                    zIndex: 5,
                    textAlign: 'center',
                    maxWidth: '1400px',
                    padding: '0 4rem'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(212, 175, 55, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        padding: '1rem 3rem',
                        marginBottom: '3rem',
                        borderRadius: '50px'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            letterSpacing: '0.6em',
                            margin: 0,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '300',
                            color: '#d4af37'
                        }}>
                            {currentCollection.season}
                        </p>
                    </div>

                    <h2 style={{
                        fontSize: '8rem',
                        fontWeight: '200',
                        margin: '0 0 2rem 0',
                        lineHeight: '0.9',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        textShadow: '0 0 80px rgba(212, 175, 55, 0.5)'
                    }}>
                        {currentCollection.name}
                    </h2>

                    <p style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        fontWeight: '300',
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                        opacity: 0.95
                    }}>
                        {currentCollection.tagline}
                    </p>

                    <p style={{
                        fontSize: '1rem',
                        letterSpacing: '0.3em',
                        marginBottom: '5rem',
                        opacity: 0.7,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        {currentCollection.mood}
                    </p>

                    <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
                        <button style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                            color: '#000',
                            padding: '2rem 5rem',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            letterSpacing: '0.4em',
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '50px',
                            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)',
                            transition: 'all 0.4s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <span style={{ position: 'relative', zIndex: 2 }}>EXPLORE COLLECTION</span>
                        </button>
                        <button style={{
                            background: 'transparent',
                            color: 'white',
                            padding: '2rem 5rem',
                            border: '2px solid rgba(255,255,255,0.5)',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            letterSpacing: '0.4em',
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '50px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.4s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                            <Play size={20} fill="white" />
                            WATCH RUNWAY
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '4rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 5,
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.3em',
                        marginBottom: '1rem',
                        opacity: 0.7,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        SCROLL TO DISCOVER
                    </p>
                    <div style={{
                        width: '2px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, #d4af37, transparent)',
                        margin: '0 auto',
                        animation: 'scroll 2s ease-in-out infinite'
                    }} />
                </div>
            </section>

            {/* 3D Product Showcase - Revolutionary */}
            <section style={{ padding: '12rem 6rem', background: '#0a0a0a', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '2000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <p style={{
                            fontSize: '0.875rem',
                            letterSpacing: '0.6em',
                            marginBottom: '2rem',
                            color: '#d4af37',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            MASTERPIECES
                        </p>
                        <h2 style={{
                            fontSize: '5rem',
                            fontWeight: '200',
                            margin: 0,
                            letterSpacing: '0.15em',
                            marginBottom: '2rem'
                        }}>
                            The Collection
                        </h2>
                        <p style={{
                            fontSize: '1.25rem',
                            opacity: 0.7,
                            fontWeight: '300',
                            maxWidth: '800px',
                            margin: '0 auto',
                            lineHeight: '2'
                        }}>
                            Each piece is a testament to unparalleled craftsmanship, created by master artisans using techniques passed down through generations.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6rem' }}>
                        {currentCollection.products.map((product, index) => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transform: `translateY(${index % 2 === 0 ? '0' : '6rem'})`,
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {/* Limited Edition Badge */}
                                {product.limited && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '3rem',
                                        left: '3rem',
                                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                        color: '#000',
                                        padding: '1rem 2rem',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.3em',
                                        zIndex: 10,
                                        fontFamily: 'Inter, sans-serif',
                                        borderRadius: '50px',
                                        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <Diamond size={16} />
                                        {product.limited}
                                    </div>
                                )}

                                {/* Product Image */}
                                <div style={{
                                    position: 'relative',
                                    paddingTop: '150%',
                                    overflow: 'hidden',
                                    background: '#000',
                                    marginBottom: '3rem',
                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                    borderRadius: '4px'
                                }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                        filter: 'brightness(0.9)'
                                    }} />

                                    {/* Hover Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
                                        opacity: 0,
                                        transition: 'opacity 0.4s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '3rem'
                                    }}>
                                        <button style={{
                                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                            color: '#000',
                                            padding: '1.5rem 3rem',
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            letterSpacing: '0.3em',
                                            fontFamily: 'Inter, sans-serif',
                                            borderRadius: '50px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            justifyContent: 'center'
                                        }}>
                                            <Eye size={18} />
                                            VIEW IN 3D
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.4em',
                                        marginBottom: '1.5rem',
                                        color: '#d4af37',
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                        {product.designer}
                                    </p>
                                    <h3 style={{
                                        fontSize: '2rem',
                                        fontWeight: '300',
                                        marginBottom: '1rem',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {product.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        opacity: 0.6,
                                        marginBottom: '2rem',
                                        fontWeight: '300',
                                        fontStyle: 'italic',
                                        lineHeight: '1.8'
                                    }}>
                                        {product.details}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                                        <span style={{
                                            fontSize: '2rem',
                                            fontWeight: '300',
                                            letterSpacing: '0.1em',
                                            background: 'linear-gradient(135deg, #d4af37 0%, #fff 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: 'transparent',
                                            color: '#d4af37',
                                            border: '2px solid #d4af37',
                                            padding: '1.5rem 4rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            letterSpacing: '0.3em',
                                            fontFamily: 'Inter, sans-serif',
                                            borderRadius: '50px',
                                            transition: 'all 0.4s'
                                        }}>
                                            REQUEST APPOINTMENT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Immersive Atelier Experience */}
            <section style={{
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#000'
            }}>
                <div style={{
                    padding: '10rem 8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                }}>
                    <p style={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.6em',
                        marginBottom: '3rem',
                        color: '#d4af37',
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        THE ATELIER
                    </p>
                    <h2 style={{
                        fontSize: '5rem',
                        fontWeight: '200',
                        marginBottom: '4rem',
                        lineHeight: '1',
                        letterSpacing: '0.1em'
                    }}>
                        Where Dreams<br />Become Reality
                    </h2>
                    <p style={{
                        fontSize: '1.375rem',
                        lineHeight: '2.2',
                        marginBottom: '4rem',
                        opacity: 0.9,
                        fontWeight: '300'
                    }}>
                        Step into our private atelier where master craftsmen bring your vision to life. Each stitch, each detail, meticulously executed to perfection. This is not fashion—this is art.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', marginBottom: '5rem' }}>
                        {[
                            { icon: <Scissors size={40} />, title: 'Bespoke Tailoring', desc: 'Made to your exact measurements' },
                            { icon: <Palette size={40} />, title: 'Custom Design', desc: 'Your vision, our expertise' },
                            { icon: <Diamond size={40} />, title: 'Precious Materials', desc: 'Finest fabrics worldwide' },
                            { icon: <Crown size={40} />, title: 'Royal Treatment', desc: 'White-glove service' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ marginBottom: '2rem', color: '#d4af37' }}>
                                    {item.icon}
                                </div>
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '400',
                                    marginBottom: '1rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {item.title}
                                </h4>
                                <p style={{
                                    fontSize: '0.95rem',
                                    opacity: 0.7,
                                    fontWeight: '300',
                                    lineHeight: '1.8'
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                        color: '#000',
                        padding: '2rem 5rem',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        letterSpacing: '0.4em',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '50px',
                        alignSelf: 'flex-start',
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)'
                    }}>
                        BOOK PRIVATE CONSULTATION
                    </button>
                </div>

                <div style={{
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea1f1d5b?w=1200&h=1600&fit=crop"
                        alt="Atelier"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: `scale(${1 + scrollY * 0.0002})`,
                            transition: 'transform 0.1s'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, #0a0a0a 0%, transparent 30%)'
                    }} />
                </div>
            </section>

            {/* Exclusive Membership */}
            <section style={{
                padding: '12rem 6rem',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(212, 175, 55, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        padding: '1rem 3rem',
                        marginBottom: '3rem',
                        borderRadius: '50px'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            letterSpacing: '0.6em',
                            margin: 0,
                            fontFamily: 'Inter, sans-serif',
                            color: '#d4af37'
                        }}>
                            EXCLUSIVE
                        </p>
                    </div>

                    <h2 style={{
                        fontSize: '5rem',
                        fontWeight: '200',
                        marginBottom: '3rem',
                        letterSpacing: '0.15em'
                    }}>
                        Join The Elite Circle
                    </h2>

                    <p style={{
                        fontSize: '1.375rem',
                        marginBottom: '6rem',
                        opacity: 0.9,
                        fontWeight: '300',
                        lineHeight: '2',
                        maxWidth: '900px',
                        margin: '0 auto 6rem'
                    }}>
                        Become part of an exclusive community of discerning individuals. Gain early access to collections, private runway shows, and personalized styling sessions.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5rem', marginBottom: '6rem' }}>
                        {[
                            { icon: <Crown size={50} />, title: 'VIP Access', desc: 'First to see new collections' },
                            { icon: <Gem size={50} />, title: 'Private Events', desc: 'Exclusive runway shows' },
                            { icon: <Sparkles size={50} />, title: 'Personal Stylist', desc: 'Dedicated fashion expert' },
                            { icon: <Shield size={50} />, title: 'Lifetime Care', desc: 'Complimentary services' }
                        ].map((benefit, i) => (
                            <div key={i}>
                                <div style={{ marginBottom: '2.5rem', color: '#d4af37' }}>
                                    {benefit.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.375rem',
                                    fontWeight: '400',
                                    marginBottom: '1.5rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {benefit.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    opacity: 0.7,
                                    fontWeight: '300',
                                    lineHeight: '1.8'
                                }}>
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                        color: '#000',
                        padding: '2rem 6rem',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        letterSpacing: '0.4em',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '50px',
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.5)',
                        transition: 'all 0.4s'
                    }}>
                        APPLY FOR MEMBERSHIP
                    </button>
                </div>
            </section>

            {/* Newsletter - Ultra Luxury */}
            <section style={{
                padding: '10rem 6rem',
                background: '#000',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '4rem',
                        fontWeight: '200',
                        marginBottom: '2rem',
                        letterSpacing: '0.15em'
                    }}>
                        Stay Connected
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        marginBottom: '5rem',
                        opacity: 0.9,
                        fontWeight: '300',
                        lineHeight: '2'
                    }}>
                        Receive exclusive previews, invitations to private events, and insider access to our world of haute couture.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{
                                flex: 1,
                                padding: '2rem 3rem',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                background: 'rgba(212, 175, 55, 0.05)',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                letterSpacing: '0.1em',
                                fontFamily: 'Inter, sans-serif',
                                borderRadius: '50px'
                            }}
                        />
                        <button style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                            color: '#000',
                            padding: '2rem 5rem',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            letterSpacing: '0.4em',
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '50px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)'
                        }}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer - Imperial */}
            <footer style={{
                background: '#0a0a0a',
                padding: '10rem 6rem 5rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
                <div style={{ maxWidth: '2000px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8rem', marginBottom: '8rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Diamond size={28} color="#000" />
                                </div>
                                <h3 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '300',
                                    margin: 0,
                                    letterSpacing: '0.8em'
                                }}>
                                    EMPIRE
                                </h3>
                            </div>
                            <p style={{
                                fontSize: '1rem',
                                opacity: 0.7,
                                lineHeight: '2',
                                fontWeight: '300'
                            }}>
                                The pinnacle of haute couture. Where dreams become reality and fashion becomes art.
                            </p>
                        </div>
                        {[
                            { title: 'Collections', items: ['Haute Couture', 'Ready-to-Wear', 'Bridal', 'Accessories', 'Jewelry'] },
                            { title: 'Services', items: ['Bespoke Tailoring', 'Personal Styling', 'Private Events', 'Alterations', 'Care'] },
                            { title: 'Maison', items: ['Our Story', 'The Atelier', 'Sustainability', 'Careers', 'Press'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '400',
                                    marginBottom: '3rem',
                                    letterSpacing: '0.4em',
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#d4af37'
                                }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '1.5rem' }}>
                                            <a href="#" style={{
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontSize: '1rem',
                                                opacity: 0.7,
                                                fontWeight: '300',
                                                transition: 'all 0.3s'
                                            }}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                        paddingTop: '5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <p style={{
                            fontSize: '0.75rem',
                            opacity: 0.5,
                            letterSpacing: '0.3em',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            © 2024 EMPIRE HAUTE COUTURE MAISON. ALL RIGHTS RESERVED.
                        </p>
                        <div style={{ display: 'flex', gap: '3rem' }}>
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <Icon key={i} size={24} style={{ opacity: 0.5, cursor: 'pointer', transition: 'all 0.3s' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(20px); opacity: 0.5; }
        }
      `}</style>
        </div>
    );
};

export default UltimateLuxuryFashionEmpire;
