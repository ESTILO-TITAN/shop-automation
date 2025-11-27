// Validation utilities for store builder

export const validateURL = (url) => {
    if (!url) return { valid: true, error: null };
    try {
        new URL(url);
        return { valid: true, error: null };
    } catch {
        return { valid: false, error: 'URL inválida' };
    }
};

export const validateEmail = (email) => {
    if (!email) return { valid: true, error: null };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    return {
        valid,
        error: valid ? null : 'Email inválido'
    };
};

export const validatePhone = (phone) => {
    if (!phone) return { valid: true, error: null };
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it has at least 10 digits
    const valid = cleaned.length >= 10;
    return {
        valid,
        error: valid ? null : 'Teléfono debe tener al menos 10 dígitos'
    };
};

export const validateRequired = (value, fieldName = 'Campo') => {
    const valid = value && value.toString().trim().length > 0;
    return {
        valid,
        error: valid ? null : `${fieldName} es requerido`
    };
};

export const validatePrice = (price) => {
    if (!price) return { valid: true, error: null };
    const numPrice = parseFloat(price);
    const valid = !isNaN(numPrice) && numPrice >= 0;
    return {
        valid,
        error: valid ? null : 'Precio debe ser un número positivo'
    };
};

export const validateStock = (stock) => {
    if (stock === '' || stock === null || stock === undefined) {
        return { valid: true, error: null };
    }
    const numStock = parseInt(stock);
    const valid = !isNaN(numStock) && numStock >= 0 && Number.isInteger(numStock);
    return {
        valid,
        error: valid ? null : 'Stock debe ser un número entero positivo'
    };
};

export const validateHexColor = (color) => {
    if (!color) return { valid: true, error: null };
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const valid = hexRegex.test(color);
    return {
        valid,
        error: valid ? null : 'Color debe ser un código hexadecimal válido (ej: #FF5733)'
    };
};

export const validateForm = (data, rules) => {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach(field => {
        const rule = rules[field];
        const value = data[field];

        if (rule.required) {
            const result = validateRequired(value, rule.label || field);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
                return;
            }
        }

        if (rule.type === 'email' && value) {
            const result = validateEmail(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'url' && value) {
            const result = validateURL(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'phone' && value) {
            const result = validatePhone(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'price' && value) {
            const result = validatePrice(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }

        if (rule.type === 'color' && value) {
            const result = validateHexColor(value);
            if (!result.valid) {
                errors[field] = result.error;
                isValid = false;
            }
        }
    });

    return { isValid, errors };
};

export default {
    validateURL,
    validateEmail,
    validatePhone,
    validateRequired,
    validatePrice,
    validateStock,
    validateHexColor,
    validateForm
};
