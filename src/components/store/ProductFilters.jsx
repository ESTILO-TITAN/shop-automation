import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const ProductFilters = ({ onFilterChange }) => {
    const { storeConfig, categories } = useStore();
    const { colors, brands } = storeConfig;
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onFilterChange({ type: 'search', value: term });
    };

    const handleCategoryClick = (category) => {
        const newCategory = activeCategory === category ? 'all' : category;
        setActiveCategory(newCategory);
        onFilterChange({ type: 'category', value: newCategory });
    };

    const handleBrandSelect = (brand) => {
        const newBrand = selectedBrand === brand ? null : brand;
        setSelectedBrand(newBrand);
        setShowBrandModal(false);
        onFilterChange({ type: 'brand', value: newBrand });
    };

    return (
        <div style={{ padding: '1rem 0' }}>
            {/* Search Bar */}
            <div style={{
                position: 'relative',
                marginBottom: '1rem'
            }}>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        borderRadius: '50px',
                        border: `1px solid ${colors.secondary}40`,
                        outline: 'none',
                        fontSize: '1rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                />
                <Search
                    size={20}
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: colors.textSecondary
                    }}
                />
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button
                    onClick={() => setShowBrandModal(true)}
                    className="btn"
                    style={{
                        background: selectedBrand ? colors.primary : 'white',
                        color: selectedBrand ? colors.textOnPrimary : colors.textPrimary,
                        border: `1px solid ${selectedBrand ? colors.primary : colors.secondary}`,
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <Filter size={16} />
                    {selectedBrand ? selectedBrand.name : 'Marcas'}
                    {selectedBrand && <X size={14} onClick={(e) => { e.stopPropagation(); handleBrandSelect(selectedBrand); }} />}
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            background: activeCategory === category ? colors.primary : 'white',
                            color: activeCategory === category ? colors.textOnPrimary : colors.textPrimary,
                            border: `1px solid ${activeCategory === category ? colors.primary : colors.secondary}`,
                            borderRadius: '50px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Brand Selection Modal */}
            {showBrandModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div
                        onClick={() => setShowBrandModal(false)}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(2px)'
                        }}
                    />
                    <div style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        width: '100%',
                        maxWidth: '400px',
                        position: 'relative',
                        zIndex: 1001,
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Seleccionar Marca</h3>
                            <button onClick={() => setShowBrandModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {brands && brands.map((brand) => (
                                <button
                                    key={brand.id}
                                    onClick={() => handleBrandSelect(brand)}
                                    style={{
                                        padding: '1rem',
                                        border: `1px solid ${selectedBrand?.id === brand.id ? colors.primary : '#eee'}`,
                                        borderRadius: '0.5rem',
                                        background: selectedBrand?.id === brand.id ? `${colors.primary}10` : 'white',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontWeight: '600'
                                    }}
                                >
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} style={{ height: '30px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                                    ) : (
                                        <span>{brand.name}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilters;
