import { useState, useMemo } from 'react';
import { useStore } from '../contexts/StoreContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, X, Send, Phone, Lock } from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import GroqChat from '../components/GroqChat';
import Header from '../components/store/Header';
import MenuDrawer from '../components/store/MenuDrawer';
import Carousel from '../components/store/Carousel';
import ProductFilters from '../components/store/ProductFilters';
import Footer from '../components/store/Footer';

const Store = () => {
    const { storeConfig, products, addOrder } = useStore();
    const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState('store'); // 'store', 'about', 'brands'
    const [filters, setFilters] = useState({
        search: '',
        category: 'Todos',
        brand: 'Todas'
    });
    const [customerData, setCustomerData] = useState({
        name: '',
        phone: '',
        address: '',
        notes: ''
    });

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = filters.category === 'Todos' || product.category === filters.category;
            const matchesBrand = filters.brand === 'Todas' || product.brand === filters.brand;
            return matchesSearch && matchesCategory && matchesBrand;
        });
    }, [products, filters]);

    // Group products by category if "Todos" is selected, otherwise show flat list
    const productGroups = useMemo(() => {
        if (filters.category !== 'Todos') {
            return { [filters.category]: filteredProducts };
        }

        const groups = {};
        filteredProducts.forEach(product => {
            const category = product.category || 'Otros';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(product);
        });
        return groups;
    }, [filteredProducts, filters.category]);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        // Create order
        const order = {
            customer: customerData,
            items: cartItems,
            total: getCartTotal(),
            date: new Date().toISOString()
        };

        const savedOrder = addOrder(order);

        // Generate WhatsApp message
        const message = generateWhatsAppMessage(savedOrder, customerData, cartItems);

        // Open WhatsApp
        const whatsappNumber = storeConfig.footer?.contact?.whatsapp || '1234567890';
        openWhatsApp(whatsappNumber, message);

        // Clear cart and close modals
        clearCart();
        setShowCheckout(false);
        setCustomerData({ name: '', phone: '', address: '', notes: '' });
    };

    const renderContent = () => {
        switch (currentView) {
            case 'about':
                return (
                    <div className="container py-8 animate-fadeIn">
                        <div className="card">
                            <div className="card-body">
                                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', color: storeConfig.colors.primary }}>
                                    {storeConfig.pages?.aboutUs?.title || 'Sobre Nosotros'}
                                </h1>
                                {storeConfig.pages?.aboutUs?.image && (
                                    <img
                                        src={storeConfig.pages.aboutUs.image}
                                        alt="Sobre Nosotros"
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}
                                    />
                                )}
                                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                    {storeConfig.pages?.aboutUs?.content || 'Contenido no disponible.'}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'brands':
                return (
                    <div className="container py-8 animate-fadeIn">
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: storeConfig.colors.primary, textAlign: 'center' }}>
                            {storeConfig.pages?.brands?.title || 'Nuestras Marcas'}
                        </h1>
                        <p style={{ textAlign: 'center', marginBottom: '2rem', color: storeConfig.colors.textSecondary }}>
                            {storeConfig.pages?.brands?.description}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
                            {(storeConfig.brands || []).map(brand => (
                                <div key={brand.id} className="card hover:shadow-lg transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', height: '150px' }}>
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: storeConfig.colors.textSecondary }}>{brand.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'store':
            default:
                return (
                    <>
                        <Carousel />
                        <div className="container py-4">
                            <ProductFilters onFilterChange={setFilters} />

                            {Object.entries(productGroups).map(([category, categoryProducts]) => (
                                categoryProducts.length > 0 && (
                                    <div key={category} className="mb-8">
                                        <h2 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            marginBottom: '1rem',
                                            color: storeConfig.colors.textPrimary,
                                            borderBottom: `2px solid ${storeConfig.colors.secondary}`,
                                            paddingBottom: '0.5rem'
                                        }}>
                                            {category}
                                        </h2>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                                            gap: '1rem'
                                        }}>
                                            {categoryProducts.map(product => (
                                                <div
                                                    key={product.id}
                                                    style={{
                                                        background: storeConfig.colors.backgroundSecondary,
                                                        borderRadius: 'var(--radius-lg)',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                        transition: 'transform 0.2s'
                                                    }}
                                                    className="hover:translate-y-[-4px]"
                                                >
                                                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                                                        <img
                                                            src={product.image || 'https://via.placeholder.com/300'}
                                                            alt={product.name}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        {product.discount && (
                                                            <span style={{
                                                                position: 'absolute',
                                                                top: '0.5rem',
                                                                right: '0.5rem',
                                                                background: storeConfig.colors.accent,
                                                                color: 'white',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: 'var(--radius-sm)',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                -{product.discount}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{ padding: '1rem' }}>
                                                        <h3 style={{
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            marginBottom: '0.5rem',
                                                            color: storeConfig.colors.textPrimary,
                                                            lineHeight: '1.2',
                                                            height: '2.4em',
                                                            overflow: 'hidden'
                                                        }}>
                                                            {product.name}
                                                        </h3>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                            <p style={{
                                                                fontSize: '1.125rem',
                                                                fontWeight: '800',
                                                                color: storeConfig.colors.primary
                                                            }}>
                                                                ${product.price}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            className="btn btn-sm btn-block"
                                                            style={{
                                                                background: storeConfig.colors.buttonBackground,
                                                                color: storeConfig.colors.buttonText,
                                                                border: 'none'
                                                            }}
                                                        >
                                                            <ShoppingCart size={16} />
                                                            Agregar
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No se encontraron productos.</p>
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className={`mobile-frame ${storeConfig.theme}`} style={{
            minHeight: '100vh',
            background: storeConfig.colors.background,
            paddingBottom: '80px'
        }}>
            <Header
                onMenuClick={() => setIsMenuOpen(true)}
                cartCount={getCartCount()}
            />

            <MenuDrawer
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigate={(view) => {
                    setCurrentView(view);
                    setIsMenuOpen(false);
                }}
            />

            {renderContent()}

            <Footer />

            {/* Floating Cart Button */}
            {
                getCartCount() > 0 && (
                    <button
                        onClick={() => setIsCartOpen(true)}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: storeConfig.colors.primary,
                            color: storeConfig.colors.textOnPrimary,
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50
                        }}
                        className="animate-pulse"
                    >
                        <ShoppingCart size={24} />
                        <span style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            background: storeConfig.colors.accent,
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            border: '2px solid white'
                        }}>
                            {getCartCount()}
                        </span>
                    </button>
                )
            }

            {/* Cart Sidebar */}
            {
                isCartOpen && (
                    <div
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 100,
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="animate-slideDown"
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                background: 'white',
                                height: '100vh',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid var(--gray-200)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
                                    Carrito ({getCartCount()})
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="btn btn-ghost btn-icon"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '1rem',
                                        padding: '1rem',
                                        background: 'var(--gray-50)',
                                        borderRadius: 'var(--radius-lg)'
                                    }}>
                                        <img
                                            src={item.image || 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: 'var(--radius-md)'
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                {item.name}
                                            </h3>
                                            <p style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--primary)' }}>
                                                ${item.price}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="btn btn-sm btn-ghost"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="btn btn-sm btn-ghost"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="btn btn-sm"
                                                    style={{ marginLeft: 'auto', background: 'var(--error)', color: 'white' }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                borderTop: '1px solid var(--gray-200)',
                                background: 'white'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '1rem',
                                    fontSize: '1.5rem',
                                    fontWeight: '800'
                                }}>
                                    <span>Total:</span>
                                    <span style={{ color: 'var(--success)' }}>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        setShowCheckout(true);
                                    }}
                                    className="btn btn-primary btn-block btn-lg"
                                >
                                    <Send size={20} />
                                    Realizar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Checkout Modal */}
            {
                showCheckout && (
                    <div
                        onClick={() => setShowCheckout(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="card animate-scaleIn"
                            style={{
                                maxWidth: '500px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                        >
                            <div className="card-header">
                                <h2 className="card-title">Completar Pedido</h2>
                                <p className="card-subtitle">Enviaremos tu pedido por WhatsApp</p>
                            </div>

                            <form onSubmit={handleCheckout}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Nombre Completo</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={customerData.name}
                                            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            value={customerData.phone}
                                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Dirección de Entrega</label>
                                        <textarea
                                            className="form-textarea"
                                            value={customerData.address}
                                            onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Notas (Opcional)</label>
                                        <textarea
                                            className="form-textarea"
                                            value={customerData.notes}
                                            onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                                            placeholder="Instrucciones especiales..."
                                        />
                                    </div>

                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--gray-50)',
                                        borderRadius: 'var(--radius-md)',
                                        marginTop: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>Subtotal:</span>
                                            <span style={{ fontWeight: '600' }}>${getCartTotal().toFixed(2)}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            paddingTop: '0.5rem',
                                            borderTop: '2px solid var(--gray-200)',
                                            fontSize: '1.25rem',
                                            fontWeight: '800'
                                        }}>
                                            <span>Total:</span>
                                            <span style={{ color: 'var(--success)' }}>${getCartTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowCheckout(false)}
                                        className="btn btn-ghost"
                                        style={{ flex: 1 }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                    >
                                        <Phone size={20} />
                                        Enviar por WhatsApp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            <GroqChat />
        </div >
    );
};

export default Store;
