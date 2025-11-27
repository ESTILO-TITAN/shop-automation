import { Type, Phone, Share2, Palette } from 'lucide-react';

const FooterToolbar = ({ onAction }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: '50px',
            padding: '0.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 1100,
            animation: 'slideUp 0.2s ease'
        }}>
            <button
                onClick={(e) => { e.stopPropagation(); onAction('description'); }}
                title="Editar Descripción"
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#4b5563'; }}
            >
                <Type size={18} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onAction('contact'); }}
                title="Editar Contacto"
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#4b5563'; }}
            >
                <Phone size={18} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onAction('social'); }}
                title="Redes Sociales"
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#4b5563'; }}
            >
                <Share2 size={18} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onAction('color'); }}
                title="Colores"
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#4b5563'; }}
            >
                <Palette size={18} />
            </button>
        </div>
    );
};

export default FooterToolbar;
