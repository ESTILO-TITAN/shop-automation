import { useState } from 'react';
import { X, Check } from 'lucide-react';

const SlideEditPopover = ({ initialValue, onSave, onClose, position }) => {
    const [formData, setFormData] = useState({
        title: initialValue?.title || '',
        description: initialValue?.description || '',
        price: initialValue?.price || '',
        image: initialValue?.image || '',
        whatsappText: initialValue?.whatsappText || '',
        showButton: initialValue?.showButton !== false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)'
                }}
            />

            {/* Popover */}
            <div style={{
                position: 'relative',
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                zIndex: 10001
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>
                        Editar Slide
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            color: '#6B7280'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Nueva Colección"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            placeholder="Descripción del slide"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Precio (opcional)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Desde $19.99"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Imagen URL</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://..."
                        />
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Texto para WhatsApp</label>
                        <textarea
                            className="form-input"
                            value={formData.whatsappText}
                            onChange={(e) => setFormData({ ...formData, whatsappText: e.target.value })}
                            rows={2}
                            placeholder="Hola, me interesa..."
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={formData.showButton}
                                onChange={(e) => setFormData({ ...formData, showButton: e.target.checked })}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <span>Mostrar botón de WhatsApp</span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline"
                            style={{ flex: 1 }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Check size={18} />
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SlideEditPopover;
