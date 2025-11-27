import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const Carousel = () => {
    const { storeConfig } = useStore();
    const { carousel, colors } = storeConfig;
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    // Get slides from carousel object
    const slides = carousel?.slides || [];

    // Don't render if carousel is hidden or no slides
    if (!carousel?.show || !slides.length) return null;

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        if (carousel?.autoplay !== false) {
            resetTimeout();
            timeoutRef.current = setTimeout(
                () =>
                    setCurrentIndex((prevIndex) =>
                        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                    ),
                carousel?.interval || 5000
            );

            return () => {
                resetTimeout();
            };
        }
    }, [currentIndex, slides.length, carousel?.autoplay, carousel?.interval]);

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            backgroundColor: colors.backgroundSecondary
        }}>
            {/* Slides Container */}
            <div style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
            }}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id || index}
                        style={{
                            minWidth: '100%',
                            height: '100%',
                            position: 'relative',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Overlay Gradient */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)'
                        }} />

                        {/* Content Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '2rem 1rem',
                            color: 'white',
                            zIndex: 2
                        }}>
                            {slide.title && (
                                <h2 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: '800',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                }}>
                                    {slide.title}
                                </h2>
                            )}
                            {slide.description && (
                                <p style={{
                                    fontSize: '1rem',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 2px 5px rgba(0,0,0,0.5)'
                                }}>
                                    {slide.description}
                                </p>
                            )}
                            {slide.price && (
                                <p style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    color: colors.primary,
                                    textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                                }}>
                                    {slide.price}
                                </p>
                            )}
                            {slide.showButton && slide.whatsappText && (
                                <a
                                    href={`https://wa.me/${storeConfig.footer?.contact?.whatsapp || ''}?text=${encodeURIComponent(slide.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        background: colors.primary,
                                        color: colors.textOnPrimary,
                                        borderRadius: '50px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <MessageCircle size={20} />
                                    Consultar por WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10
                }}
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10
                }}
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 10
            }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            border: 'none',
                            background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            padding: 0
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
