import { Type, Palette, Scaling, Type as FontIcon } from 'lucide-react';

const TextToolbar = ({ onAction, position }) => {
    const tools = [
        { id: 'text', icon: Type, label: 'Texto' },
        { id: 'color', icon: Palette, label: 'Color' },
        { id: 'size', icon: Scaling, label: 'Tamaño' },
        { id: 'font', icon: FontIcon, label: 'Fuente' },
    ];

    return (
        <div style={{
            position: 'absolute',
            top: position?.top || '50%',
            left: position?.left || '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '0.5rem',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 1100,
            animation: 'fadeIn 0.2s ease'
        }}>
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction(tool.id);
                    }}
                    title={tool.label}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                >
                    <tool.icon size={20} />
                </button>
            ))}
        </div>
    );
};

export default TextToolbar;
