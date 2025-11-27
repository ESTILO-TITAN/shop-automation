import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Play, ChevronRight, Check, Quote, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Award, Zap, TrendingUp, ArrowRight, Eye, Filter, Sparkles, Crown, Gem, Scissors, Palette } from 'lucide-react';

const HauteCoutureExperience = ({ products = [], storeConfig = {}, onAddToCart }) => {
    const [cartCount, setCartCount] = useState(0);
    const [activeCollection, setActiveCollection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setScrollProgress(progress);
        };
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const collections = [
        {
            id: 1,
            name: 'SPRING AWAKENING',
            season: 'SS 2024',
            description: 'Ethereal silhouettes meet botanical dreams',
            hero: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1920&h=1080&fit=crop',
            products: [
                { id: 1, name: 'Silk Organza Gown', designer: 'MAISON LUMIÈRE', price: 8900, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=900&fit=crop', exclusive: true },
                { id: 2, name: 'Embroidered Cape Dress', designer: 'ATELIER NOIR', price: 12500, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=900&fit=crop', exclusive: true },
                { id: 3, name: 'Pleated Midi Skirt', designer: 'MAISON LUMIÈRE', price: 3200, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=900&fit=crop' }
            ]
        },
        {
            id: 2,
            name: 'MIDNIGHT ELEGANCE',
            season: 'FW 2024',
            description: 'Dark romance in luxurious textures',
            hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop',
            products: [
                { id: 4, name: 'Velvet Evening Coat', designer: 'NOIR COUTURE', price: 15900, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=900&fit=crop', exclusive: true },
                { id: 5, name: 'Satin Slip Dress', designer: 'ATELIER NOIR', price: 4800, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=900&fit=crop' }
            ]
        }
    ];

    const currentCollection = collections[activeCollection];

    return (
        <div style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            background: '#fff',
            color: '#1a1a1a',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Custom Cursor */}
            <div style={{
                position: 'fixed',
                left: cursorPos.x,
                top: cursorPos.y,
                width: '40px',
                height: '40px',
                border: '1px solid rgba(0,0,0,0.3)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 10000,
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.2s, height 0.2s',
                mixBlendMode: 'difference'
            }} />

            {/* Scroll Progress Bar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${scrollProgress}%`,
                height: '2px',
                background: 'linear-gradient(90deg, #000 0%, #d4af37 100%)',
                zIndex: 9999,
                transition: 'width 0.1s'
            }} />

            {/* Cinematic Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: scrollProgress > 5 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrollProgress > 5 ? 'blur(20px)' : 'none',
                borderBottom: scrollProgress > 5 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.5s ease',
                padding: '2rem 4rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Crown size={32} color={scrollProgress > 5 ? '#000' : '#fff'} />
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '300',
                            margin: 0,
                            letterSpacing: '0.5em',
                            color: scrollProgress > 5 ? '#000' : '#fff',
                            transition: 'color 0.5s'
                        }}>
                            HAUTE
                        </h1>
                    </div>
                    <nav style={{ display: 'flex', gap: '4rem', fontSize: '0.875rem', fontWeight: '400', letterSpacing: '0.3em' }}>
                        {['COLLECTIONS', 'ATELIER', 'EDITORIAL', 'MAISON'].map(item => (
                            <a key={item} href="#" style={{
                                color: scrollProgress > 5 ? '#000' : '#fff',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                position: 'relative'
                            }}>
                                {item}
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: 0,
                                    width: '0%',
                                    height: '1px',
                                    background: scrollProgress > 5 ? '#000' : '#fff',
                                    transition: 'width 0.3s'
                                }} />
                            </a>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Search size={20} style={{ cursor: 'pointer', color: scrollProgress > 5 ? '#000' : '#fff' }} />
                        <Heart size={20} style={{ cursor: 'pointer', color: scrollProgress > 5 ? '#000' : '#fff' }} />
                        <User size={20} style={{ cursor: 'pointer', color: scrollProgress > 5 ? '#000' : '#fff' }} />
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <ShoppingCart size={20} style={{ color: scrollProgress > 5 ? '#000' : '#fff' }} />
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
                                    fontSize: '0.65rem',
                                    fontWeight: '700'
                                }}>{cartCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Cinematic Hero - Full Screen Video */}
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
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
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
                        transform: `scale(${1 + scrollProgress * 0.001})`,
                        transition: 'transform 0.1s'
                    }}
                />
                <div style={{
                    position: 'relative',
                    zIndex: 3,
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '1200px',
                    padding: '0 2rem'
                }}>
                    <p style={{
                        fontSize: '1rem',
                        letterSpacing: '0.5em',
                        marginBottom: '2rem',
                        opacity: 0.9,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '300'
                    }}>
                        {currentCollection.season}
                    </p>
                    <h2 style={{
                        fontSize: '7rem',
                        fontWeight: '300',
                        margin: '0 0 2rem 0',
                        lineHeight: '1',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}>
                        {currentCollection.name}
                    </h2>
                    <p style={{
                        fontSize: '1.5rem',
                        marginBottom: '4rem',
                        opacity: 0.95,
                        fontWeight: '300',
                        fontStyle: 'italic',
                        lineHeight: '1.8'
                    }}>
                        {currentCollection.description}
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <button style={{
                            background: 'white',
                            color: '#000',
                            padding: '1.5rem 4rem',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            letterSpacing: '0.3em',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.3s',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                        }}>
                            EXPLORE COLLECTION
                        </button>
                        <button onClick={() => setIsVideoPlaying(true)} style={{
                            background: 'transparent',
                            color: 'white',
                            padding: '1.5rem 4rem',
                            border: '1px solid white',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            letterSpacing: '0.3em',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <Play size={18} fill="white" />
                            WATCH FILM
                        </button>
                    </div>
                </div>
            </section>

            {/* Parallax Collection Showcase */}
            <section style={{ padding: '10rem 4rem', background: '#fafafa', position: 'relative' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <p style={{
                            fontSize: '0.875rem',
                            letterSpacing: '0.5em',
                            marginBottom: '1.5rem',
                            opacity: 0.6,
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            CURATED PIECES
                        </p>
                        <h2 style={{
                            fontSize: '4rem',
                            fontWeight: '300',
                            margin: 0,
                            letterSpacing: '0.1em'
                        }}>
                            The Collection
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
                        {currentCollection.products.map((product, index) => (
                            <div key={product.id} style={{
                                position: 'relative',
                                cursor: 'pointer',
                                transform: `translateY(${index % 2 === 0 ? '0' : '4rem'})`,
                                transition: 'all 0.6s ease'
                            }}>
                                {product.exclusive && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '2rem',
                                        left: '2rem',
                                        background: '#d4af37',
                                        color: '#000',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        letterSpacing: '0.2em',
                                        zIndex: 10,
                                        fontFamily: 'Inter, sans-serif',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <Gem size={14} />
                                        EXCLUSIVE
                                    </div>
                                )}
                                <div style={{
                                    position: 'relative',
                                    paddingTop: '150%',
                                    overflow: 'hidden',
                                    background: '#fff',
                                    marginBottom: '2rem'
                                }}>
                                    <img src={product.image} alt={product.name} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.8s ease'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0)',
                                        transition: 'background 0.3s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0
                                    }}>
                                        <button style={{
                                            background: 'white',
                                            color: '#000',
                                            padding: '1.25rem 3rem',
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            letterSpacing: '0.3em',
                                            fontFamily: 'Inter, sans-serif'
                                        }}>
                                            QUICK VIEW
                                        </button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.3em',
                                        marginBottom: '1rem',
                                        opacity: 0.6,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                        {product.designer}
                                    </p>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '400',
                                        marginBottom: '1.5rem',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                                        <span style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '300',
                                            letterSpacing: '0.05em'
                                        }}>
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <button onClick={() => {
                                            onAddToCart && onAddToCart(product);
                                            setCartCount(cartCount + 1);
                                        }} style={{
                                            background: '#000',
                                            color: 'white',
                                            border: 'none',
                                            padding: '1rem 2.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            letterSpacing: '0.2em',
                                            fontFamily: 'Inter, sans-serif',
                                            transition: 'all 0.3s'
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

            {/* Atelier Story - Split Layout */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: '100vh',
                background: '#000',
                color: '#fff'
            }}>
                <div style={{
                    padding: '8rem 6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <p style={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.5em',
                        marginBottom: '2rem',
                        opacity: 0.7,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        THE ATELIER
                    </p>
                    <h2 style={{
                        fontSize: '4.5rem',
                        fontWeight: '300',
                        marginBottom: '3rem',
                        lineHeight: '1.1',
                        letterSpacing: '0.05em'
                    }}>
                        Crafted with<br />Passion
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '2',
                        marginBottom: '3rem',
                        opacity: 0.9,
                        fontWeight: '300'
                    }}>
                        Each piece is meticulously handcrafted by our master artisans, combining centuries-old techniques with contemporary vision. From the first sketch to the final stitch, every detail embodies our commitment to excellence.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', marginBottom: '4rem' }}>
                        {[
                            { icon: <Scissors size={32} />, label: 'Handcrafted' },
                            { icon: <Palette size={32} />, label: 'Bespoke' },
                            { icon: <Crown size={32} />, label: 'Luxury' }
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                                    {item.icon}
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    letterSpacing: '0.2em',
                                    fontFamily: 'Inter, sans-serif'
                                }}>
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button style={{
                        background: 'white',
                        color: '#000',
                        padding: '1.5rem 4rem',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        letterSpacing: '0.3em',
                        fontFamily: 'Inter, sans-serif',
                        alignSelf: 'flex-start'
                    }}>
                        DISCOVER OUR STORY
                    </button>
                </div>
                <div style={{
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea1f1d5b?w=1000&h=1400&fit=crop"
                        alt="Atelier"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: `scale(${1 + scrollProgress * 0.0005})`,
                            transition: 'transform 0.1s'
                        }}
                    />
                </div>
            </section>

            {/* Exclusive Services */}
            <section style={{ padding: '10rem 4rem', background: '#fafafa' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '4rem',
                        fontWeight: '300',
                        marginBottom: '6rem',
                        letterSpacing: '0.1em'
                    }}>
                        Exclusive Services
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
                        {[
                            { icon: <Crown size={40} />, title: 'Personal Styling', desc: 'One-on-one consultation' },
                            { icon: <Scissors size={40} />, title: 'Bespoke Tailoring', desc: 'Custom measurements' },
                            { icon: <Truck size={40} />, title: 'White Glove Delivery', desc: 'Worldwide shipping' },
                            { icon: <Shield size={40} />, title: 'Lifetime Care', desc: 'Complimentary alterations' }
                        ].map((service, i) => (
                            <div key={i}>
                                <div style={{ marginBottom: '2rem', opacity: 0.7 }}>
                                    {service.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '400',
                                    marginBottom: '1rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    opacity: 0.7,
                                    fontWeight: '300',
                                    lineHeight: '1.8'
                                }}>
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter - Elegant */}
            <section style={{
                padding: '8rem 4rem',
                background: '#000',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.5em',
                        marginBottom: '2rem',
                        opacity: 0.7,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        NEWSLETTER
                    </p>
                    <h2 style={{
                        fontSize: '3.5rem',
                        fontWeight: '300',
                        marginBottom: '2rem',
                        letterSpacing: '0.1em'
                    }}>
                        Join Our Circle
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        marginBottom: '4rem',
                        opacity: 0.9,
                        fontWeight: '300',
                        lineHeight: '1.8'
                    }}>
                        Receive exclusive previews, invitations to private events, and insider access to our latest collections.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{
                                flex: 1,
                                padding: '1.5rem 2rem',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'transparent',
                                color: 'white',
                                fontSize: '0.95rem',
                                outline: 'none',
                                letterSpacing: '0.1em',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        />
                        <button style={{
                            background: 'white',
                            color: '#000',
                            padding: '1.5rem 3rem',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            letterSpacing: '0.3em',
                            fontFamily: 'Inter, sans-serif',
                            whiteSpace: 'nowrap'
                        }}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer - Luxurious */}
            <footer style={{ background: '#0a0a0a', color: 'white', padding: '8rem 4rem 4rem' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6rem', marginBottom: '6rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <Crown size={32} />
                                <h3 style={{ fontSize: '2rem', fontWeight: '300', margin: 0, letterSpacing: '0.5em' }}>
                                    HAUTE
                                </h3>
                            </div>
                            <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: '1.8', fontWeight: '300' }}>
                                Redefining luxury fashion through timeless elegance and uncompromising craftsmanship.
                            </p>
                        </div>
                        {[
                            { title: 'Collections', items: ['Spring/Summer', 'Fall/Winter', 'Bridal', 'Accessories'] },
                            { title: 'Services', items: ['Personal Styling', 'Bespoke', 'Alterations', 'Care'] },
                            { title: 'Maison', items: ['Our Story', 'Atelier', 'Sustainability', 'Contact'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '400',
                                    marginBottom: '2rem',
                                    letterSpacing: '0.3em',
                                    fontFamily: 'Inter, sans-serif'
                                }}>
                                    {section.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item, j) => (
                                        <li key={j} style={{ marginBottom: '1rem' }}>
                                            <a href="#" style={{
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontSize: '0.95rem',
                                                opacity: 0.7,
                                                fontWeight: '300',
                                                transition: 'opacity 0.3s'
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
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '4rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <p style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
                            © 2024 HAUTE COUTURE. ALL RIGHTS RESERVED.
                        </p>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <Icon key={i} size={20} style={{ opacity: 0.5, cursor: 'pointer' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HauteCoutureExperience;
