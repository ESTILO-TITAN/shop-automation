import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../contexts/StoreContext';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';

const Products = () => {
    const { products, addProduct, updateProduct, deleteProduct, categories } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
        featured: false
    });

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            stock: '',
            featured: false
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
        setShowForm(true);
    };

    const handleDelete = (productId) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            deleteProduct(productId);
        }
    };

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                            Productos
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {filteredProducts.length} producto(s)
                        </p>
                    </div>

                    <button onClick={() => setShowForm(true)} className="btn btn-primary">
                        <Plus size={20} />
                        Nuevo Producto
                    </button>
                </div>

                {/* Filters */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                        gap: '1rem'
                    }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">
                                <Search size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Buscar
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Nombre del producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">Todas</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid - Mobile Optimized */}
                {filteredProducts.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                        <p style={{ color: 'var(--text-secondary)' }}>No se encontraron productos</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                        gap: '1rem'
                    }}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="card" style={{ padding: '1rem' }}>
                                <img
                                    src={product.image || 'https://via.placeholder.com/300'}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '180px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-lg)',
                                        marginBottom: '1rem'
                                    }}
                                />
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                    {product.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.75rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {product.description}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{ fontSize: '1.375rem', fontWeight: '800', color: 'var(--primary)' }}>
                                        ${product.price}
                                    </span>
                                    <span style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: '600',
                                        color: product.stock > 5 ? 'var(--success)' : 'var(--error)'
                                    }}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="btn btn-outline btn-sm"
                                        style={{ flex: 1 }}
                                    >
                                        <Edit size={16} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="btn btn-sm"
                                        style={{
                                            background: 'var(--error)',
                                            color: 'white',
                                            minWidth: '48px'
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Product Form Modal */}
                {showForm && (
                    <div
                        onClick={resetForm}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 'var(--z-modal)',
                            padding: '1rem'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="card animate-scaleIn"
                            style={{
                                maxWidth: '600px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                        >
                            <div className="card-header">
                                <h2 className="card-title">
                                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            className="form-textarea"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: window.innerWidth > 480 ? '1fr 1fr' : '1fr',
                                        gap: '1rem'
                                    }}>
                                        <div className="form-group">
                                            <label className="form-label">Precio</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-input"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Stock</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Categoría</label>
                                        <select
                                            className="form-select"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            required
                                        >
                                            <option value="">Seleccionar...</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">URL de Imagen</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        />
                                        <label htmlFor="featured" style={{ margin: 0, cursor: 'pointer' }}>
                                            Producto destacado
                                        </label>
                                    </div>
                                </div>

                                <div className="card-footer" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <button type="button" onClick={resetForm} className="btn btn-ghost" style={{ flex: 1, minWidth: '120px' }}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1, minWidth: '120px' }}>
                                        {editingProduct ? 'Actualizar' : 'Crear'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Products;
