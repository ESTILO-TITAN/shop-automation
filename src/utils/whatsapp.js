/**
 * Generate WhatsApp message from order details
 */
export const generateWhatsAppMessage = (order, customer, products) => {
    let message = `🛒 *NUEVO PEDIDO*\n\n`;
    message += `📋 *Pedido:* ${order.id}\n`;
    message += `📅 *Fecha:* ${new Date(order.date).toLocaleDateString('es-ES')}\n\n`;

    message += `👤 *DATOS DEL CLIENTE*\n`;
    message += `Nombre: ${customer.name}\n`;
    message += `Teléfono: ${customer.phone}\n`;
    if (customer.address) {
        message += `Dirección: ${customer.address}\n`;
    }
    if (customer.notes) {
        message += `Notas: ${customer.notes}\n`;
    }
    message += `\n`;

    message += `📦 *PRODUCTOS*\n`;
    products.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio: $${item.price.toFixed(2)}\n`;
        message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *TOTAL: $${order.total.toFixed(2)}*\n`;

    return message;
};

/**
 * Open WhatsApp with pre-filled message
 */
export const openWhatsApp = (phoneNumber, message) => {
    // Remove any non-numeric characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL (works on both mobile and desktop)
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    // Open in new window/tab
    window.open(whatsappUrl, '_blank');
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
};

/**
 * Validate phone number
 */
export const isValidPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
};
