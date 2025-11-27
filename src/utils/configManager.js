// Export/Import configuration utilities

export const exportConfig = (storeConfig, products, categories) => {
    const config = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        storeConfig,
        products,
        categories
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `store-config-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const importConfig = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);

                // Validate config structure
                if (!config.version || !config.storeConfig) {
                    reject(new Error('Archivo de configuración inválido'));
                    return;
                }

                resolve(config);
            } catch (error) {
                reject(new Error('Error al leer el archivo: ' + error.message));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };

        reader.readAsText(file);
    });
};

export const validateImportedConfig = (config) => {
    const errors = [];

    if (!config.storeConfig) {
        errors.push('Falta configuración de tienda');
    }

    if (!config.storeConfig.name) {
        errors.push('Falta nombre de tienda');
    }

    if (!config.storeConfig.colors) {
        errors.push('Falta configuración de colores');
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

export default {
    exportConfig,
    importConfig,
    validateImportedConfig
};
