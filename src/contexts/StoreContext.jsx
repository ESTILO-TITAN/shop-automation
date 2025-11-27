import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within StoreProvider');
    }
    return context;
};

// Initial store configuration
const initialStoreConfig = {
    name: 'Mi Tienda',
    tagline: 'Los mejores productos para ti',
    description: 'Encuentra todo lo que necesitas en un solo lugar',
    logo: '',
    theme: 'mtr-theme',
    colors: {
        // Base colors
        primary: '#FF9F1C',
        secondary: '#2EC4B6',
        accent: '#FF6B6B',

        // Text colors
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        textOnPrimary: '#FFFFFF',

        // Background colors
        background: '#FFFFFF',
        backgroundSecondary: '#F9FAFB',
        headerBackground: 'linear-gradient(135deg, #FF9F1C 0%, #FFB347 100%)',

        // Button colors
        buttonBackground: '#FF9F1C',
        buttonText: '#FFFFFF',
        buttonHover: '#E88D0F'
    },
    customSections: [],
    header: {
        bannerType: 'image', // 'image' or 'video'
        bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
        bannerVideoUrl: '',
        showBanner: true
    },
    carousel: {
        show: true,
        autoplay: true,
        interval: 5000,
        slides: [
            {
                id: '1',
                image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
                title: 'Nueva Colección',
                description: 'Nueva Colección de Verano',
                price: '',
                whatsappText: 'Hola, me interesa la colección de verano',
                showButton: true
            },
            {
                id: '2',
                image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
                title: 'Ofertas Especiales',
                description: 'Ofertas Especiales en Ropa',
                price: 'Desde $19.99',
                whatsappText: 'Hola, quiero ver las ofertas especiales',
                showButton: true
            }
        ]
    },
    brands: [
        { id: '1', name: 'Nike', logo: '' },
        { id: '2', name: 'Adidas', logo: '' },
        { id: '3', name: 'Puma', logo: '' }
    ],
    pages: {
        aboutUs: {
            title: 'Sobre Nosotros',
            content: 'Somos una tienda dedicada a ofrecer los mejores productos...',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
            show: true
        },
        brands: {
            title: 'Nuestras Marcas',
            description: 'Trabajamos con las mejores marcas del mercado',
            show: true
        }
    },
    footer: {
        copyrightYear: '2025',
        contact: {
            phone: '+1234567890',
            email: 'contacto@mitienda.com',
            whatsapp: '1234567890',
            address: 'Calle Principal 123, Ciudad'
        },
        social: {
            facebook: { url: 'https://facebook.com', show: true },
            instagram: { url: 'https://instagram.com', show: true },
            tiktok: { url: 'https://tiktok.com', show: true },
            youtube: { url: 'https://youtube.com', show: true }
        },
        show: true
    },
    isPublished: false
};

// Sample products
const sampleProducts = [
    {
        id: '1',
        name: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 29.99,
        category: 'Categoría 1',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        stock: 10,
        featured: true
    },
    {
        id: '2',
        name: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 49.99,
        category: 'Categoría 1',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        stock: 15,
        featured: true
    },
    {
        id: '3',
        name: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 19.99,
        category: 'Categoría 2',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        stock: 20,
        featured: false
    },
    {
        id: '4',
        name: 'Producto 4',
        description: 'Descripción del producto 4',
        price: 39.99,
        category: 'Categoría 2',
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500',
        stock: 8,
        featured: true
    }
];

export const StoreProvider = ({ children }) => {
    const [storeConfig, setStoreConfig] = useState(() => {
        const saved = localStorage.getItem('store_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                ...initialStoreConfig,
                ...parsed,
                colors: {
                    ...initialStoreConfig.colors,
                    ...(parsed.colors || {})
                },
                customSections: parsed.customSections || []
            };
        }
        return initialStoreConfig;
    });

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('store_products');
        return saved ? JSON.parse(saved) : sampleProducts;
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('store_orders');
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('store_categories');
        return saved ? JSON.parse(saved) : ['Categoría 1', 'Categoría 2', 'Categoría 3'];
    });

    // Listen for changes in other tabs
    useEffect(() => {
        const loadFromStorage = () => {
            const savedConfig = localStorage.getItem('store_config');
            const savedProducts = localStorage.getItem('store_products');
            const savedOrders = localStorage.getItem('store_orders');
            const savedCategories = localStorage.getItem('store_categories');

            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                setStoreConfig({
                    ...initialStoreConfig,
                    ...parsed,
                    colors: {
                        ...initialStoreConfig.colors,
                        ...(parsed.colors || {})
                    },
                    customSections: parsed.customSections || []
                });
            }
            if (savedProducts) setProducts(JSON.parse(savedProducts));
            if (savedOrders) setOrders(JSON.parse(savedOrders));
            if (savedCategories) setCategories(JSON.parse(savedCategories));
        };

        const handleStorageChange = (e) => {
            if (e.key === 'store_config' || e.key === 'store_products' || e.key === 'store_orders' || e.key === 'store_categories') {
                loadFromStorage();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('store_config', JSON.stringify(storeConfig));
    }, [storeConfig]);

    useEffect(() => {
        localStorage.setItem('store_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('store_orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('store_categories', JSON.stringify(categories));
    }, [categories]);

    // Store Config Methods
    const updateStoreConfig = (updates) => {
        setStoreConfig(prev => ({ ...prev, ...updates }));
    };

    const updateColors = (colorUpdates) => {
        setStoreConfig(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                ...colorUpdates
            }
        }));
    };

    const publishStore = () => {
        setStoreConfig(prev => ({ ...prev, isPublished: true }));
    };

    const unpublishStore = () => {
        setStoreConfig(prev => ({ ...prev, isPublished: false }));
    };

    // Custom Sections Methods
    const addCustomSection = (section) => {
        const newSection = {
            id: Date.now().toString(),
            type: section.type || 'text',
            content: section.content || '',
            position: section.position || 'bottom',
            backgroundColor: section.backgroundColor || '#FFFFFF',
            textColor: section.textColor || '#1F2937',
            padding: section.padding || '2rem 1rem'
        };
        setStoreConfig(prev => ({
            ...prev,
            customSections: [...(prev.customSections || []), newSection]
        }));
        return newSection;
    };

    const updateCustomSection = (sectionId, updates) => {
        setStoreConfig(prev => ({
            ...prev,
            customSections: (prev.customSections || []).map(section =>
                section.id === sectionId ? { ...section, ...updates } : section
            )
        }));
    };

    const deleteCustomSection = (sectionId) => {
        setStoreConfig(prev => ({
            ...prev,
            customSections: (prev.customSections || []).filter(section => section.id !== sectionId)
        }));
    };

    // Product Methods
    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now().toString()
        };
        setProducts(prev => [...prev, newProduct]);
        return newProduct;
    };

    const updateProduct = (productId, updates) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId ? { ...product, ...updates } : product
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts(prev => prev.filter(product => product.id !== productId));
    };

    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category);
    };

    const getFeaturedProducts = () => {
        return products.filter(product => product.featured);
    };

    // Order Methods
    const addOrder = (order) => {
        const newOrder = {
            ...order,
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'pending'
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const deleteOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    // Category Methods
    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories(prev => [...prev, category]);
        }
    };

    const deleteCategory = (category) => {
        setCategories(prev => prev.filter(cat => cat !== category));
    };

    // Analytics
    const getAnalytics = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const completedOrders = orders.filter(order => order.status === 'completed').length;

        return {
            totalOrders,
            totalRevenue,
            pendingOrders,
            completedOrders,
            totalProducts: products.length,
            lowStockProducts: products.filter(p => p.stock < 5).length
        };
    };

    const value = {
        // Store Config
        storeConfig,
        updateStoreConfig,
        updateColors,
        publishStore,
        unpublishStore,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,

        // Products
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,

        // Orders
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,

        // Categories
        categories,
        addCategory,
        deleteCategory,

        // Analytics
        getAnalytics
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};
