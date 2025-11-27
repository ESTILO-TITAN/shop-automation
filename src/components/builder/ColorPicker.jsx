import { useState } from 'react';

const ColorPicker = ({ label, value, onChange, presets = [] }) => {
    const [showPicker, setShowPicker] = useState(false);

    const defaultPresets = [
        '#FF6B35', '#4ECDC4', '#FFD93D', '#10B981', '#F59E0B',
        '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4',
        '#14B8A6', '#F97316', '#EAB308', '#84CC16', '#22C55E',
        '#1F2937', '#374151', '#6B7280', '#9CA3AF', '#FFFFFF'
    ];

    const colors = presets.length > 0 ? presets : defaultPresets;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
            }}>
                {label}
            </label>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {/* Color Preview */}
                <div
                    onClick={() => setShowPicker(!showPicker)}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: value,
                        border: '2px solid var(--gray-300)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-base)',
                        boxShadow: showPicker ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
                    }}
                />

                {/* Hex Input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        border: '2px solid var(--gray-300)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--white)',
                        color: 'var(--text-primary)',
                        transition: 'all var(--transition-base)'
                    }}
                />

                {/* Native Color Picker */}
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        width: '48px',
                        height: '48px',
                        border: '2px solid var(--gray-300)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}
                />
            </div>

            {/* Color Presets */}
            {showPicker && (
                <div style={{
                    marginTop: '0.75rem',
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--gray-200)'
                }}>
                    <p style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Colores Predefinidos
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                        gap: '0.5rem'
                    }}>
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    onChange(color);
                                    setShowPicker(false);
                                }}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: 'var(--radius-md)',
                                    background: color,
                                    border: value === color ? '3px solid var(--primary)' : '2px solid var(--gray-300)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)',
                                    boxShadow: value === color ? 'var(--shadow-md)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
