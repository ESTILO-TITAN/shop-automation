import { useState } from 'react';
import { Eye, Check, Zap, ShoppingBag, Watch, Leaf, Sparkles, Cpu, TrendingUp, Percent } from 'lucide-react';
import ElectronicsStore from '../../templates/ElectronicsStore';
import FashionStore from '../../templates/FashionStore';
import LuxuryWatchStore from '../../templates/LuxuryWatchStore';
import OrganicFoodStore from '../../templates/OrganicFoodStore';
import MinimalistLuxuryStore from '../../templates/MinimalistLuxuryStore';
import InteractiveTechStore from '../../templates/InteractiveTechStore';
import ModernLightStore from '../../templates/ModernLightStore';
import DynamicLightStore from '../../templates/DynamicLightStore';

const TemplateSelector = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);


    const templates = [
        {
            id: 'modern-light',
            name: 'Modern Light Store',
            description: '🌟 REVOLUTIONARY - Light theme with zoom effects, advanced animations, and 10 products',
            component: ModernLightStore,
            preview: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
            icon: <Sparkles size={32} />,
            color: '#667eea',
            features: [
                '🎬 Hero zoom effect on scroll',
                '✨ FadeInUp/SlideIn/Bounce animations',
                '🎯 Category filter with slide animation',
                '📦 10 products with ratings & badges',
                '🎨 Stagger product grid animations',
                '🔄 Smooth transitions everywhere',
                '💫 Animated header on scroll',
                '📜 1800+ lines of code'
            ],
            bestFor: 'Modern E-commerce, Tech Products, Lifestyle Brands'
        },
        {
            id: 'dynamic-light',
            name: 'Dynamic Light Store',
            description: '🚀 REVOLUTIONARY - Floating header, parallax zoom, animated tabs, and maximum effects',
            component: DynamicLightStore,
            preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
            icon: <TrendingUp size={32} />,
            color: '#f5576c',
            features: [
                '🎪 Floating header with blur',
                '🌊 Parallax zoom with floating shapes',
                '🎭 Animated tabs (Trending/New/Sale)',
                '📦 10 products with discount badges',
                '💥 ZoomIn/ScaleIn/BounceIn/Pulse animations',
                '🎨 Advanced hover effects',
                '⚡ Maximum visual impact',
                '📜 2000+ lines of code'
            ],
            bestFor: 'Dynamic E-commerce, Gadgets, Trending Products'
        },
        {
            id: 'minimalist-luxury',
            name: 'Minimalist Luxury Store',
            description: '💎 PREMIUM $10K - Ultra-sophisticated minimalist design with split-screen layout',
            component: MinimalistLuxuryStore,
            preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
            icon: <Sparkles size={32} />,
            color: '#1a1a1a',
            features: [
                '🌟 Full-screen hero section',
                '📱 Grid/List view toggle',
                '🎨 Split-screen categories',
                '📝 Editorial content section',
                '✨ Minimal sophisticated design',
                '🎯 Premium typography',
                '💼 1000+ lines of code',
                '💰 Worth $10,000 USD'
            ],
            bestFor: 'High-End Fashion, Luxury Goods, Premium Brands'
        },
        {
            id: 'interactive-tech',
            name: 'Interactive Tech Store',
            description: '🚀 PREMIUM $10K - Futuristic interactive store with 3D product showcase',
            component: InteractiveTechStore,
            preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
            icon: <Cpu size={32} />,
            color: '#667eea',
            features: [
                '🎮 3D product display',
                '🎨 Interactive color selector',
                '⚡ Animated features grid',
                '📊 Tech specs comparison',
                '🔄 Product carousel',
                '🌈 Gradient backgrounds',
                '💻 1100+ lines of code',
                '💰 Worth $10,000 USD'
            ],
            bestFor: 'Tech Products, Electronics, Gadgets, Innovation'
        },
        {
            id: 'luxury-watch',
            name: 'Luxury Watch Store',
            description: 'Premium dark-themed store for high-end timepieces with gold accents',
            component: LuxuryWatchStore,
            preview: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop',
            icon: <Watch size={32} />,
            color: '#d4af37',
            features: [
                'Dark luxury theme with gold',
                'Video showcase section',
                'Customer testimonials',
                'Trust badges & guarantees',
                'Premium typography (Playfair)',
                'Comprehensive footer',
                '900+ lines of code'
            ],
            bestFor: 'Luxury Watches, Jewelry, Premium Products'
        },
        {
            id: 'organic-food',
            name: 'Organic Food Store',
            description: 'Fresh green-themed marketplace for organic produce and healthy living',
            component: OrganicFoodStore,
            preview: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
            icon: <Leaf size={32} />,
            color: '#6ab04c',
            features: [
                'Fresh green gradient design',
                'Category grid showcase',
                'Organic certification badges',
                'Customer testimonials',
                'Newsletter subscription',
                'Stats & benefits section',
                '800+ lines of code'
            ],
            bestFor: 'Organic Food, Groceries, Health Products'
        },
        {
            id: 'electronics',
            name: 'Electronics Store',
            description: 'Modern tech store with gradient design, perfect for electronics and gadgets',
            component: ElectronicsStore,
            preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
            icon: <Zap size={32} />,
            color: '#667eea',
            features: [
                'Gradient purple design',
                'Product ratings & reviews',
                'Feature highlights',
                'Newsletter signup',
                'Sticky header navigation'
            ],
            bestFor: 'Electronics, Gadgets, Tech Products'
        },
        {
            id: 'fashion',
            name: 'Fashion Store',
            description: 'Elegant fashion boutique with premium aesthetics and size selectors',
            component: FashionStore,
            preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
            icon: <ShoppingBag size={32} />,
            color: '#ec4899',
            features: [
                'Elegant pink gradient',
                'Size & color selectors',
                'Instagram integration',
                'Category badges',
                'Premium typography'
            ],
            bestFor: 'Fashion, Clothing, Accessories'
        }
    ];

    const handleSelectTemplate = (templateId) => {
        setSelectedTemplate(templateId);
        console.log('Template selected:', templateId);
    };

    if (previewTemplate) {
        const template = templates.find(t => t.id === previewTemplate);
        const TemplateComponent = template.component;

        return (
            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                <div style={{
                    background: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '1rem 1.5rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: '#1e293b' }}>
                            Preview: {template.name}
                        </h2>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                            Vista previa de la plantilla
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setPreviewTemplate(null)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: 'white',
                                color: '#64748b',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Volver
                        </button>
                        <button
                            onClick={() => {
                                handleSelectTemplate(template.id);
                                setPreviewTemplate(null);
                            }}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: template.color,
                                color: 'white',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Check size={18} />
                            Usar esta Plantilla
                        </button>
                    </div>
                </div>

                <div style={{ background: '#e2e8f0', padding: '2rem' }}>
                    <div style={{
                        maxWidth: '1600px',
                        margin: '0 auto',
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                    }}>
                        <TemplateComponent products={[]} storeConfig={{ name: template.name.split(' ')[0] }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '3rem 1.5rem'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px' }}>
                        Elige tu Plantilla de Tienda
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        8 plantillas profesionales - Desde $0 hasta $70,000 USD
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    {templates.map(template => (
                        <div
                            key={template.id}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                transition: 'all 0.3s',
                                border: selectedTemplate === template.id ? `4px solid ${template.color}` : '4px solid transparent'
                            }}
                        >
                            <div style={{ position: 'relative', paddingTop: '60%', background: '#f1f5f9', overflow: 'hidden' }}>
                                <img
                                    src={template.preview}
                                    alt={template.name}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                {selectedTemplate === template.id && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: template.color,
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    }}>
                                        <Check size={16} />
                                        SELECCIONADA
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '12px',
                                        background: `linear-gradient(135deg, ${template.color} 0%, ${template.color}dd 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}>
                                        {template.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#1e293b' }}>
                                            {template.name}
                                        </h3>
                                        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                                            {template.bestFor}
                                        </p>
                                    </div>
                                </div>

                                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    {template.description}
                                </p>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Características
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                                        {template.features.map((feature, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: template.color }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={() => setPreviewTemplate(template.id)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: `2px solid ${template.color}`,
                                            background: 'white',
                                            color: template.color,
                                            fontSize: '0.95rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = `${template.color}11`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'white';
                                        }}
                                    >
                                        <Eye size={18} />
                                        Vista Previa
                                    </button>
                                    <button
                                        onClick={() => handleSelectTemplate(template.id)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: template.color,
                                            color: 'white',
                                            fontSize: '0.95rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                            boxShadow: `0 4px 6px ${template.color}44`
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = `0 8px 12px ${template.color}66`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = `0 4px 6px ${template.color}44`;
                                        }}
                                    >
                                        <Check size={18} />
                                        Seleccionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTemplate && (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
                            ✨ Plantilla Seleccionada
                        </h3>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                            Has seleccionado <strong>{templates.find(t => t.id === selectedTemplate)?.name}</strong>.
                            Puedes personalizarla con tus productos y colores.
                        </p>
                        <button
                            onClick={() => {
                                alert('¡Perfecto! Ahora puedes añadir tus productos a esta plantilla.');
                            }}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                padding: '1rem 3rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            Continuar al Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateSelector;
