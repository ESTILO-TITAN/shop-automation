/**
 * LocalStorage wrapper functions for data persistence
 */

const STORAGE_KEYS = {
    STORE_CONFIG: 'store_config',
    PRODUCTS: 'store_products',
    ORDERS: 'store_orders',
    CATEGORIES: 'store_categories',
    ADMIN_USER: 'admin_user'
};

/**
 * Save data to localStorage
 */
export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

/**
 * Load data from localStorage
 */
export const loadFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

export { STORAGE_KEYS };
