import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const QuickEditPopover = ({ type, initialValue, onSave, onClose, position, fields = [] }) => {
    const [value, setValue] = useState(initialValue);
    const [multiValues, setMultiValues] = useState(initialValue || {});

    useEffect(() => {
        if (type === 'multi-field') {
            setMultiValues(initialValue || {});
        } else {
            setValue(initialValue);
        }
    }, [initialValue, type]);

    const handleSave = () => {
        if (type === 'multi-field') {
            onSave(multiValues);
        } else {
            onSave(value);
        }
        onClose();
    };

    const handleMultiChange = (key, val) => {
        setMultiValues(prev => ({
            ...prev,
            [key]: val
        }));
    };

    return (
        <div style={{
            position: 'absolute',
            top: position?.top || '50%',
            left: position?.left || '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 1200,
            minWidth: type === 'multi-field' ? '300px' : '250px',
            animation: 'fadeIn 0.2s ease',
            border: '1px solid var(--gray-200)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    {type === 'text' && 'Editar Texto'}
                    {type === 'textarea' && 'Editar Descripción'}
                    {type === 'color' && 'Editar Color'}
                    {type === 'image' && 'Editar Imagen'}
                    {type === 'multi-field' && 'Editar Detalles'}
                </h4>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <X size={16} color="var(--text-secondary)" />
                </button>
            </div>

            <div style={{ marginBottom: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                {type === 'text' && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-input"
                        autoFocus
                        style={{ width: '100%' }}
                    />
                )}
                {type === 'textarea' && (
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-input"
                        autoFocus
                        style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                    />
                )}
                {type === 'color' && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            style={{ width: '40px', height: '40px', border: 'none', padding: 0, borderRadius: '4px', cursor: 'pointer' }}
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="form-input"
                            style={{ flex: 1 }}
                        />
                    </div>
                )}
                {type === 'image' && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-input"
                        placeholder="https://..."
                        autoFocus
                        style={{ width: '100%' }}
                    />
                )}
                {type === 'multi-field' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {fields.map(field => (
                            <div key={field.key}>
                                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    value={multiValues[field.key] || ''}
                                    onChange={(e) => handleMultiChange(field.key, e.target.value)}
                                    className="form-input"
                                    placeholder={field.placeholder}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button onClick={onClose} className="btn btn-sm btn-ghost">Cancelar</button>
                <button onClick={handleSave} className="btn btn-sm btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Check size={16} /> Guardar
                </button>
            </div>
        </div>
    );
};

export default QuickEditPopover;
