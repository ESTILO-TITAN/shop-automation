import { useState } from 'react';
import { ArrowLeft, Save, Smartphone, Monitor, Check, Plus, Trash2, Edit2, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';

const StoreBuilder = () => {
    const navigate = useNavigate();
    const { storeConfig, updateStoreConfig, updateColors, publishStore, products, addProduct, updateProduct, deleteProduct } = useStore();
    const [activeTab, setActiveTab] = useState('general');
    const [previewMode, setPreviewMode] = useState('mobile');
    const [saved, setSaved] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleSave = () => {
        publishStore();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: 'Nuevo Producto',
            price: 0,
            description: 'Descripción del producto',
            image: 'https://via.placeholder.com/300',
            category: 'General',
            stock: 10,
            visible: true
        };
        addProduct(newProduct);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
            {/* Header con botón de regreso */}
            <div style={{
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <ArrowLeft size={20} />
                        Volver al Dashboard
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                        Editor de Tienda
                    </h1>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {saved ? <Check size={20} /> : <Save size={20} />}
                    {saved ? 'Guardado' : 'Guardar Cambios'}
                </button>
            </div>

            <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: '1rem', padding: '1rem' }}>
                {/* Panel de Controles */}
                <div style={{
                    width: '450px',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', overflowX: 'auto' }}>
                        {[
                            { id: 'plantillas', label: 'Plantillas', icon: <Palette size={16} /> },
                            { id: 'general', label: 'General' },
                            { id: 'carousel', label: 'Banner/Carousel' },
                            { id: 'productos', label: 'Productos' },
                            { id: 'contacto', label: 'Contacto' },
                            { id: 'colores', label: 'Colores' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    background: activeTab === tab.id ? 'var(--bg-primary)' : 'transparent',
                                    border: 'none',
                                    borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
                                    fontWeight: '600',
                                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Contenido de Tabs */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
                        {/* TAB: PLANTILLAS */}
                        {activeTab === 'plantillas' && (
                            <div className="space-y-4">
                                <h3 style={{ marginBottom: '1rem' }}>Selecciona una Plantilla</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    Elige el diseño que mejor se adapte a tu tienda
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    {[
                                        { id: 'modern-light', name: 'Modern Light Store', preview: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=300&fit=crop', description: 'Tema claro con zoom effects y 10 productos' },
                                        { id: 'dynamic-light', name: 'Dynamic Light Store', preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop', description: 'Header flotante, parallax zoom, tabs animados' },
                                        { id: 'minimalist-luxury', name: 'Minimalist Luxury', preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=300&fit=crop', description: 'Diseño minimalista sofisticado' },
                                        { id: 'interactive-tech', name: 'Interactive Tech', preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop', description: '3D product display, tech specs' },
                                        { id: 'luxury-watch', name: 'Luxury Watch Store', preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=300&fit=crop', description: 'Elegante para relojes de lujo' },
                                        { id: 'organic-food', name: 'Organic Food Store', preview: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=300&fit=crop', description: 'Natural y fresco para alimentos' },
                                        { id: 'electronics', name: 'Electronics Store', preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=300&fit=crop', description: 'Moderno para electrónicos' },
                                        { id: 'fashion', name: 'Fashion Store', preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop', description: 'Elegante para moda' }
                                    ].map(template => (
                                        <div
                                            key={template.id}
                                            onClick={() => updateStoreConfig({ selectedTemplate: template.id })}
                                            style={{
                                                border: storeConfig.selectedTemplate === template.id ? '2px solid var(--primary)' : '1px solid var(--gray-200)',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                background: storeConfig.selectedTemplate === template.id ? 'var(--bg-primary)' : 'white',
                                                boxShadow: storeConfig.selectedTemplate === template.id ? '0 4px 12px rgba(var(--primary-rgb), 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
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
                                                        background: 'var(--primary)',
                                                        color: 'white',
                                                        borderRadius: '50%',
                                                        width: '28px',
                                                        height: '28px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                                    }}>
                                                        <Check size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: '700' }}>
                                                    {template.name}
                                                </h4>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                                    {template.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: GENERAL */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div className="form-group">
                                    <label className="form-label">Nombre de la Tienda</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.name}
                                        onChange={(e) => updateStoreConfig({ name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Logo URL</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.logo}
                                        onChange={(e) => updateStoreConfig({ logo: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-input"
                                        value={storeConfig.description}
                                        onChange={(e) => updateStoreConfig({ description: e.target.value })}
                                        rows={4}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tema</label>
                                    <select
                                        className="form-input"
                                        value={storeConfig.theme}
                                        onChange={(e) => updateStoreConfig({ theme: e.target.value })}
                                    >
                                        <option value="mtr-theme">Moderno (MTR)</option>
                                        <option value="walker-theme">Elegante (Walker)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* TAB: CAROUSEL/BANNER */}
                        {activeTab === 'carousel' && (
                            <div className="space-y-6">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0 }}>Slides del Carousel</h3>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => {
                                            const newSlide = {
                                                id: Date.now(),
                                                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
                                                title: 'Nueva Oferta',
                                                description: 'Descripción',
                                                price: '',
                                                whatsappText: 'Hola, me interesa',
                                                showButton: true
                                            };
                                            updateStoreConfig({
                                                carousel: {
                                                    ...storeConfig.carousel,
                                                    slides: [...(storeConfig.carousel?.slides || []), newSlide]
                                                }
                                            });
                                        }}
                                    >
                                        <Plus size={16} /> Agregar Slide
                                    </button>
                                </div>

                                {(storeConfig.carousel?.slides || []).map((slide, index) => (
                                    <div key={slide.id} style={{
                                        border: '1px solid var(--gray-200)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong>Slide {index + 1}</strong>
                                            <button
                                                onClick={() => {
                                                    const newSlides = storeConfig.carousel.slides.filter((_, i) => i !== index);
                                                    updateStoreConfig({ carousel: { ...storeConfig.carousel, slides: newSlides } });
                                                }}
                                                style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Imagen URL</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={slide.image}
                                                onChange={(e) => {
                                                    const newSlides = [...storeConfig.carousel.slides];
                                                    newSlides[index] = { ...slide, image: e.target.value };
                                                    updateStoreConfig({ carousel: { ...storeConfig.carousel, slides: newSlides } });
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Título</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={slide.title || ''}
                                                onChange={(e) => {
                                                    const newSlides = [...storeConfig.carousel.slides];
                                                    newSlides[index] = { ...slide, title: e.target.value };
                                                    updateStoreConfig({ carousel: { ...storeConfig.carousel, slides: newSlides } });
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Descripción</label>
                                            <textarea
                                                className="form-input"
                                                value={slide.description || ''}
                                                onChange={(e) => {
                                                    const newSlides = [...storeConfig.carousel.slides];
                                                    newSlides[index] = { ...slide, description: e.target.value };
                                                    updateStoreConfig({ carousel: { ...storeConfig.carousel, slides: newSlides } });
                                                }}
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TAB: PRODUCTOS */}
                        {activeTab === 'productos' && (
                            <div className="space-y-6">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0 }}>Productos ({products.length})</h3>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={handleAddProduct}
                                    >
                                        <Plus size={16} /> Agregar Producto
                                    </button>
                                </div>

                                {products.map(product => (
                                    <div key={product.id} style={{
                                        border: '1px solid var(--gray-200)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <strong>{product.name}</strong>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => setEditingProduct(product)}
                                                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(product.id)}
                                                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                    ${product.price} - Stock: {product.stock}
                                                </div>
                                            </div>
                                        </div>

                                        {editingProduct?.id === product.id && (
                                            <div className="space-y-2" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
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

                        {/* TAB: CONTACTO */}
                        {activeTab === 'contacto' && (
                            <div className="space-y-6">
                                <h3>Información de Contacto</h3>

                                <div className="form-group">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.footer?.contact?.phone || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: { ...storeConfig.footer, contact: { ...storeConfig.footer?.contact, phone: e.target.value } }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={storeConfig.footer?.contact?.email || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: { ...storeConfig.footer, contact: { ...storeConfig.footer?.contact, email: e.target.value } }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">WhatsApp</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.footer?.contact?.whatsapp || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: { ...storeConfig.footer, contact: { ...storeConfig.footer?.contact, whatsapp: e.target.value } }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Dirección</label>
                                    <textarea
                                        className="form-input"
                                        value={storeConfig.footer?.contact?.address || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: { ...storeConfig.footer, contact: { ...storeConfig.footer?.contact, address: e.target.value } }
                                        })}
                                        rows={2}
                                    />
                                </div>

                                <h3 style={{ marginTop: '2rem' }}>Redes Sociales</h3>

                                <div className="form-group">
                                    <label className="form-label">Facebook</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.footer?.social?.facebook?.url || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: {
                                                ...storeConfig.footer,
                                                social: {
                                                    ...storeConfig.footer?.social,
                                                    facebook: { show: !!e.target.value, url: e.target.value }
                                                }
                                            }
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Instagram</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={storeConfig.footer?.social?.instagram?.url || ''}
                                        onChange={(e) => updateStoreConfig({
                                            footer: {
                                                ...storeConfig.footer,
                                                social: {
                                                    ...storeConfig.footer?.social,
                                                    instagram: { show: !!e.target.value, url: e.target.value }
                                                }
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB: COLORES */}
                        {activeTab === 'colores' && (
                            <div className="space-y-6">
                                <div className="form-group">
                                    <label className="form-label">Color Principal</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="color"
                                            value={storeConfig.colors.primary}
                                            onChange={(e) => updateColors({ primary: e.target.value })}
                                            style={{ width: '50px', height: '40px', padding: 0, border: 'none', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={storeConfig.colors.primary}
                                            onChange={(e) => updateColors({ primary: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Color Secundario</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="color"
                                            value={storeConfig.colors.secondary}
                                            onChange={(e) => updateColors({ secondary: e.target.value })}
                                            style={{ width: '50px', height: '40px', padding: 0, border: 'none', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={storeConfig.colors.secondary}
                                            onChange={(e) => updateColors({ secondary: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Color de Fondo</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="color"
                                            value={storeConfig.colors.background}
                                            onChange={(e) => updateColors({ background: e.target.value })}
                                            style={{ width: '50px', height: '40px', padding: 0, border: 'none', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={storeConfig.colors.background}
                                            onChange={(e) => updateColors({ background: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div style={{
                    flex: 1,
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    minWidth: 0
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        display: 'flex',
                        gap: '0.5rem',
                        background: 'white',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        zIndex: 10
                    }}>
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            style={{
                                padding: '0.5rem',
                                border: 'none',
                                background: previewMode === 'mobile' ? 'var(--bg-primary)' : 'transparent',
                                color: previewMode === 'mobile' ? 'var(--primary)' : 'var(--text-secondary)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer'
                            }}
                        >
                            <Smartphone size={20} />
                        </button>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            style={{
                                padding: '0.5rem',
                                border: 'none',
                                background: previewMode === 'desktop' ? 'var(--bg-primary)' : 'transparent',
                                color: previewMode === 'desktop' ? 'var(--primary)' : 'var(--text-secondary)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer'
                            }}
                        >
                            <Monitor size={20} />
                        </button>
                    </div>

                    <div className={`mobile-frame ${storeConfig.theme}`} style={{
                        width: previewMode === 'mobile' ? '375px' : '100%',
                        height: previewMode === 'mobile' ? '812px' : '100%',
                        maxHeight: '90vh',
                        borderRadius: previewMode === 'mobile' ? '40px' : '0',
                        border: previewMode === 'mobile' ? '12px solid #1a1a1a' : 'none',
                        background: storeConfig.colors.background,
                        overflow: 'auto',
                        boxShadow: previewMode === 'mobile' ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
                        position: 'relative'
                    }}>
                        {previewMode === 'mobile' && (
                            <div style={{
                                position: 'sticky',
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

                        {/* Preview Content - Real Store Components */}
                        <div style={{ paddingTop: previewMode === 'mobile' ? '0' : '0' }}>
                            {/* Header Preview */}
                            <div style={{
                                background: storeConfig.colors.primary,
                                color: 'white',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                {storeConfig.logo ? (
                                    <img src={storeConfig.logo} alt={storeConfig.name} style={{ height: '40px' }} />
                                ) : (
                                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{storeConfig.name}</h2>
                                )}
                                <div style={{ fontSize: '1.5rem' }}>🛒</div>
                            </div>

                            {/* Carousel Preview */}
                            {storeConfig.carousel?.slides?.length > 0 && (
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={storeConfig.carousel.slides[0].image}
                                        alt={storeConfig.carousel.slides[0].title}
                                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                        color: 'white',
                                        padding: '2rem 1rem 1rem'
                                    }}>
                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{storeConfig.carousel.slides[0].title}</h3>
                                        <p style={{ margin: 0, fontSize: '0.875rem' }}>{storeConfig.carousel.slides[0].description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Products Preview */}
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Productos</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr 1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                    {products.slice(0, 4).map(product => (
                                        <div key={product.id} style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                            <div style={{ padding: '0.75rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{product.name}</h4>
                                                <p style={{ margin: 0, color: storeConfig.colors.primary, fontWeight: 'bold' }}>${product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Preview */}
                            <div style={{
                                background: '#1a1a1a',
                                color: 'white',
                                padding: '2rem 1rem',
                                marginTop: '2rem'
                            }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{storeConfig.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>{storeConfig.description}</p>
                                </div>
                                {storeConfig.footer?.contact && (
                                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                                        {storeConfig.footer.contact.phone && <div>📞 {storeConfig.footer.contact.phone}</div>}
                                        {storeConfig.footer.contact.email && <div>✉️ {storeConfig.footer.contact.email}</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive CSS */}
            <style>{`
                /* Mobile First Responsive Styles */
                @media (max-width: 1024px) {
                    /* Main container - stack vertically on tablets and mobile */
                    div[style*="display: flex"][style*="height: calc(100vh - 80px)"] {
                        flex-direction: column !important;
                        height: auto !important;
                        min-height: calc(100vh - 80px) !important;
                    }
                    
                    /* Control panel - full width on mobile */
                    div[style*="width: 450px"] {
                        width: 100% !important;
                        max-height: none !important;
                        min-height: auto !important;
                    }
                    
                    /* Tabs - horizontal scroll */
                    div[style*="display: flex"][style*="borderBottom"] {
                        overflow-x: auto !important;
                        -webkit-overflow-scrolling: touch !important;
                    }
                    
                    /* Preview container - full width below controls */
                    div[style*="flex: 1"][style*="background: var(--bg-secondary)"] {
                        width: 100% !important;
                        min-height: 500px !important;
                        margin-top: 1rem !important;
                    }
                }
                
                @media (max-width: 768px) {
                    /* Header - better spacing on mobile */
                    div[style*="padding: 1rem 2rem"] {
                        padding: 0.75rem 1rem !important;
                        flex-wrap: wrap !important;
                    }
                    
                    /* Header title */
                    h1 {
                        font-size: 1.25rem !important;
                    }
                    
                    /* Buttons - better touch targets */
                    button {
                        min-height: 44px !important;
                        padding: 0.75rem 1rem !important;
                    }
                    
                    /* Form inputs - full width */
                    .form-input {
                        font-size: 16px !important; /* Prevents zoom on iOS */
                    }
                    
                    /* Tab content padding */
                    div[style*="padding: 1.5rem"] {
                        padding: 1rem !important;
                    }
                    
                    /* Preview mode buttons */
                    div[style*="position: absolute"][style*="top: 1rem"] {
                        top: 0.5rem !important;
                        right: 0.5rem !important;
                    }
                    
                    /* Mobile frame preview - smaller on mobile */
                    .mobile-frame {
                        transform: scale(0.85) !important;
                        transform-origin: top center !important;
                    }
                }
                
                @media (max-width: 480px) {
                    /* Extra small screens */
                    .mobile-frame {
                        transform: scale(0.7) !important;
                    }
                    
                    /* Compact spacing */
                    .space-y-6 > * + * {
                        margin-top: 1rem !important;
                    }
                    
                    /* Product grid in preview */
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default StoreBuilder;
