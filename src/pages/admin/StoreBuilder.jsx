import { useState } from 'react';
import { ArrowLeft, Save, Smartphone, Monitor, Tablet, Check, Plus, Trash2, Edit2, Upload, X, Menu, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import ModernLightStore from '../../templates/ModernLightStore';
import DynamicLightStore from '../../templates/DynamicLightStore';
import MinimalistLuxuryStore from '../../templates/MinimalistLuxuryStore';
import InteractiveTechStore from '../../templates/InteractiveTechStore';
import LuxuryWatchStore from '../../templates/LuxuryWatchStore';
import OrganicFoodStore from '../../templates/OrganicFoodStore';
import ElectronicsStore from '../../templates/ElectronicsStore';
import FashionStore from '../../templates/FashionStore';

const StoreBuilder = () => {
    const navigate = useNavigate();
    const { storeConfig, updateStoreConfig, publishStore, products, addProduct, updateProduct, deleteProduct } = useStore();

    // Estados principales
    const [step, setStep] = useState(storeConfig.selectedTemplate ? 'editor' : 'select-template');
    const [activeTab, setActiveTab] = useState('banner');
    const [previewMode, setPreviewMode] = useState('desktop');
    const [editingProduct, setEditingProduct] = useState(null);
    const [saved, setSaved] = useState(false);

    // Plantillas disponibles
    const templates = [
        {
            id: 'modern-light',
            name: 'Modern Light Store',
            component: ModernLightStore,
            preview: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=300&fit=crop',
            description: 'Tema claro con zoom effects, animaciones avanzadas y 10 productos',
            features: ['Hero con zoom', 'Filtros animados', 'Grid responsive']
        },
        {
            id: 'dynamic-light',
            name: 'Dynamic Light Store',
            component: DynamicLightStore,
            preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop',
            description: 'Header flotante, parallax zoom, tabs animados y máximo impacto visual',
            features: ['Header flotante', 'Parallax', 'Tabs animados']
        },
        {
            id: 'minimalist-luxury',
            name: 'Minimalist Luxury',
            component: MinimalistLuxuryStore,
            preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=300&fit=crop',
            description: 'Diseño minimalista sofisticado para productos premium',
            features: ['Minimalista', 'Elegante', 'Premium']
        },
        {
            id: 'interactive-tech',
            name: 'Interactive Tech',
            component: InteractiveTechStore,
            preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop',
            description: '3D product display, especificaciones técnicas interactivas',
            features: ['3D Display', 'Tech Specs', 'Interactivo']
        },
        {
            id: 'luxury-watch',
            name: 'Luxury Watch Store',
            component: LuxuryWatchStore,
            preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=300&fit=crop',
            description: 'Elegante y sofisticado para relojes de lujo',
            features: ['Elegante', 'Lujo', 'Sofisticado']
        },
        {
            id: 'organic-food',
            name: 'Organic Food Store',
            component: OrganicFoodStore,
            preview: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=300&fit=crop',
            description: 'Natural y fresco para productos orgánicos',
            features: ['Natural', 'Fresco', 'Orgánico']
        },
        {
            id: 'electronics',
            name: 'Electronics Store',
            component: ElectronicsStore,
            preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=300&fit=crop',
            description: 'Moderno y tecnológico para electrónicos',
            features: ['Moderno', 'Tech', 'Dinámico']
        },
        {
            id: 'fashion',
            name: 'Fashion Store',
            component: FashionStore,
            preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop',
            description: 'Elegante y trendy para moda',
            features: ['Elegante', 'Trendy', 'Fashion']
        }
    ];

    const selectedTemplate = templates.find(t => t.id === storeConfig.selectedTemplate);

    const handleSelectTemplate = (templateId) => {
        updateStoreConfig({ selectedTemplate: templateId });
        setStep('editor');
    };

    const handlePublish = () => {
        publishStore();
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            navigate('/');
        }, 2000);
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: 'Nuevo Producto',
            price: 0,
            description: 'Descripción del producto',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            category: 'General',
            stock: 10,
            visible: true,
            rating: 4.5,
            reviews: 0
        };
        addProduct(newProduct);
    };

    // PANTALLA 1: SELECCIÓN DE PLANTILLA
    if (step === 'select-template') {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
                            Elige tu Plantilla
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                            Selecciona el diseño que mejor se adapte a tu negocio
                        </p>
                    </div>

                    {/* Grid de Plantillas */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {templates.map(template => (
                            <div
                                key={template.id}
                                onClick={() => handleSelectTemplate(template.id)}
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                    transform: 'translateY(0)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                                }}
                            >
                                {/* Preview Image */}
                                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={template.preview}
                                        alt={template.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <Eye size={16} />
                                        Vista Previa
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                                        {template.name}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.5' }}>
                                        {template.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                        {template.features.map((feature, i) => (
                                            <span key={i} style={{
                                                background: '#f1f5f9',
                                                color: '#475569',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <button style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}>
                                        Seleccionar Plantilla
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // PANTALLA 2: EDITOR
    const TemplateComponent = selectedTemplate?.component;

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            {/* Header - NO STICKY */}
            <div style={{
                background: 'white',
                borderBottom: '1px solid #e2e8f0',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700' }}>
                            {selectedTemplate?.name}
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                            Editor de Tienda
                        </p>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handlePublish}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}
                >
                    {saved ? <Check size={18} /> : <Save size={18} />}
                    {saved ? '¡Publicado!' : 'Guardar y Publicar'}
                </button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Panel de Edición */}
                <div style={{
                    width: '350px',
                    background: 'white',
                    borderRight: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #e2e8f0',
                        overflowX: 'auto',
                        flexShrink: 0
                    }}>
                        {[
                            { id: 'plantillas', label: 'Plantillas' },
                            { id: 'banner', label: 'Banner' },
                            { id: 'navegacion', label: 'Menú' },
                            { id: 'productos', label: 'Productos' },
                            { id: 'textos', label: 'Textos' },
                            { id: 'contacto', label: 'Contacto' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: activeTab === tab.id ? '#f8fafc' : 'transparent',
                                    border: 'none',
                                    borderBottom: activeTab === tab.id ? '2px solid #667eea' : 'none',
                                    fontWeight: '600',
                                    color: activeTab === tab.id ? '#667eea' : '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Contenido del Tab */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
                        {/* TAB: PLANTILLAS */}
                        {activeTab === 'plantillas' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '700' }}>
                                    Cambiar Plantilla
                                </h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {templates.map(template => (
                                        <div
                                            key={template.id}
                                            onClick={() => updateStoreConfig({ selectedTemplate: template.id })}
                                            style={{
                                                border: storeConfig.selectedTemplate === template.id ? '2px solid #667eea' : '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                background: storeConfig.selectedTemplate === template.id ? '#f0f9ff' : 'white',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ height: '100px', overflow: 'hidden', position: 'relative' }}>
                                                <img
                                                    src={template.preview}
                                                    alt={template.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                {storeConfig.selectedTemplate === template.id && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        background: '#667eea',
                                                        color: 'white',
                                                        borderRadius: '50%',
                                                        width: '24px',
                                                        height: '24px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '0.75rem' }}>
                                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '600' }}>{template.name}</h4>
                                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{template.features[0]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: BANNER */}
                        {activeTab === 'banner' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '700' }}>
                                    Banner Principal
                                </h3>

                                <div className="form-group">
                                    <label className="form-label">Imagen del Banner</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.banner?.image || ''}
                                        onChange={(e) => updateStoreConfig({
                                            banner: { ...storeConfig.banner, image: e.target.value }
                                        })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Título Principal</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.banner?.title || 'Bienvenido a nuestra tienda'}
                                        onChange={(e) => updateStoreConfig({
                                            banner: { ...storeConfig.banner, title: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subtítulo</label>
                                    <textarea
                                        className="form-input"
                                        value={storeConfig.banner?.subtitle || 'Los mejores productos'}
                                        onChange={(e) => updateStoreConfig({
                                            banner: { ...storeConfig.banner, subtitle: e.target.value }
                                        })}
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Texto del Botón</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.banner?.buttonText || 'Ver Productos'}
                                        onChange={(e) => updateStoreConfig({
                                            banner: { ...storeConfig.banner, buttonText: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB: NAVEGACIÓN */}
                        {activeTab === 'navegacion' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '700' }}>
                                    Menú de Navegación
                                </h3>

                                <div className="form-group">
                                    <label className="form-label">Logo/Nombre de la Tienda</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.name || 'Mi Tienda'}
                                        onChange={(e) => updateStoreConfig({ name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Logo URL (opcional)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.logo || ''}
                                        onChange={(e) => updateStoreConfig({ logo: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div style={{ marginTop: '2rem' }}>
                                    <label className="form-label">Items del Menú</label>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                                        Los menús se adaptarán automáticamente a móvil con menú hamburguesa
                                    </p>
                                    {(storeConfig.menuItems || ['Inicio', 'Productos', 'Contacto']).map((item, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={item}
                                                onChange={(e) => {
                                                    const newItems = [...(storeConfig.menuItems || ['Inicio', 'Productos', 'Contacto'])];
                                                    newItems[index] = e.target.value;
                                                    updateStoreConfig({ menuItems: newItems });
                                                }}
                                                style={{ flex: 1 }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newItems = (storeConfig.menuItems || ['Inicio', 'Productos', 'Contacto']).filter((_, i) => i !== index);
                                                    updateStoreConfig({ menuItems: newItems });
                                                }}
                                                style={{ padding: '0.5rem', border: 'none', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newItems = [...(storeConfig.menuItems || ['Inicio', 'Productos', 'Contacto']), 'Nuevo Item'];
                                            updateStoreConfig({ menuItems: newItems });
                                        }}
                                        className="btn btn-sm btn-outline"
                                        style={{ width: '100%', marginTop: '0.5rem' }}
                                    >
                                        <Plus size={16} /> Agregar Item
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: PRODUCTOS */}
                        {activeTab === 'productos' && (
                            <div className="space-y-4">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700' }}>
                                        Productos ({products.length})
                                    </h3>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={handleAddProduct}
                                    >
                                        <Plus size={16} /> Agregar
                                    </button>
                                </div>

                                {products.map(product => (
                                    <div key={product.id} style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <strong style={{ fontSize: '0.95rem' }}>{product.name}</strong>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => setEditingProduct(editingProduct?.id === product.id ? null : product)}
                                                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(product.id)}
                                                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                                    ${product.price}
                                                </div>
                                            </div>
                                        </div>

                                        {editingProduct?.id === product.id && (
                                            <div className="space-y-2" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Nombre"
                                                    value={editingProduct.name}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                />
                                                <input
                                                    type="number"
                                                    className="form-input"
                                                    placeholder="Precio"
                                                    value={editingProduct.price}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                />
                                                <textarea
                                                    className="form-input"
                                                    placeholder="Descripción"
                                                    value={editingProduct.description}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                    rows={2}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="URL de Imagen"
                                                    value={editingProduct.image}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Categoría"
                                                    value={editingProduct.category}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                                />
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => {
                                                            updateProduct(editingProduct.id, editingProduct);
                                                            setEditingProduct(null);
                                                        }}
                                                        style={{ flex: 1 }}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => setEditingProduct(null)}
                                                        style={{ flex: 1 }}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TAB: TEXTOS */}
                        {activeTab === 'textos' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '700' }}>
                                    Textos Globales
                                </h3>

                                <div className="form-group">
                                    <label className="form-label">Descripción de la Tienda</label>
                                    <textarea
                                        className="form-input"
                                        value={storeConfig.description || ''}
                                        onChange={(e) => updateStoreConfig({ description: e.target.value })}
                                        rows={4}
                                        placeholder="Describe tu tienda..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Título Sección Productos</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.texts?.productsTitle || 'Nuestros Productos'}
                                        onChange={(e) => updateStoreConfig({
                                            texts: { ...storeConfig.texts, productsTitle: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Texto Botón "Agregar al Carrito"</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.texts?.addToCart || 'Agregar al Carrito'}
                                        onChange={(e) => updateStoreConfig({
                                            texts: { ...storeConfig.texts, addToCart: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Texto Footer</label>
                                    <textarea
                                        className="form-input"
                                        value={storeConfig.texts?.footerText || '© 2024 Todos los derechos reservados'}
                                        onChange={(e) => updateStoreConfig({
                                            texts: { ...storeConfig.texts, footerText: e.target.value }
                                        })}
                                        rows={2}
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB: CONTACTO */}
                        {activeTab === 'contacto' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '700' }}>
                                    Información de Contacto
                                </h3>

                                <div className="form-group">
                                    <label className="form-label">WhatsApp</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.contact?.whatsapp || ''}
                                        onChange={(e) => updateStoreConfig({
                                            contact: { ...storeConfig.contact, whatsapp: e.target.value }
                                        })}
                                        placeholder="+1234567890"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={storeConfig.contact?.email || ''}
                                        onChange={(e) => updateStoreConfig({
                                            contact: { ...storeConfig.contact, email: e.target.value }
                                        })}
                                        placeholder="contacto@tienda.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.contact?.phone || ''}
                                        onChange={(e) => updateStoreConfig({
                                            contact: { ...storeConfig.contact, phone: e.target.value }
                                        })}
                                        placeholder="+1234567890"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Instagram</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.contact?.instagram || ''}
                                        onChange={(e) => updateStoreConfig({
                                            contact: { ...storeConfig.contact, instagram: e.target.value }
                                        })}
                                        placeholder="@mitienda"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Facebook</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.contact?.facebook || ''}
                                        onChange={(e) => updateStoreConfig({
                                            contact: { ...storeConfig.contact, facebook: e.target.value }
                                        })}
                                        placeholder="facebook.com/mitienda"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vista Previa */}
                <div style={{ flex: 1, background: '#e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflow: 'auto' }}>
                    {/* Controles de Vista Previa */}
                    <div style={{
                        background: 'white',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        marginBottom: '2rem',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                background: previewMode === 'desktop' ? '#667eea' : 'transparent',
                                color: previewMode === 'desktop' ? 'white' : '#64748b',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Monitor size={18} />
                            Desktop
                        </button>
                        <button
                            onClick={() => setPreviewMode('tablet')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                background: previewMode === 'tablet' ? '#667eea' : 'transparent',
                                color: previewMode === 'tablet' ? 'white' : '#64748b',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Tablet size={18} />
                            Tablet
                        </button>
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                background: previewMode === 'mobile' ? '#667eea' : 'transparent',
                                color: previewMode === 'mobile' ? 'white' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Smartphone size={18} />
                            Móvil
                        </button>
                    </div>

                    {/* Preview Container */}
                    <div style={{
                        width: previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? '768px' : '375px',
                        maxWidth: '100%',
                        background: 'white',
                        borderRadius: previewMode === 'mobile' ? '40px' : '12px',
                        border: previewMode === 'mobile' ? '12px solid #1a1a1a' : 'none',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        overflow: 'hidden',
                        transition: 'all 0.3s',
                        position: 'relative'
                    }}>
                        {previewMode === 'mobile' && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '150px',
                                height: '30px',
                                background: '#1a1a1a',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                                zIndex: 1000
                            }} />
                        )}
                        <div style={{ height: previewMode === 'mobile' ? '812px' : '800px', overflow: 'auto' }}>
                            {TemplateComponent && (
                                <TemplateComponent
                                    products={products}
                                    storeConfig={storeConfig}
                                    onAddToCart={() => { }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreBuilder;
