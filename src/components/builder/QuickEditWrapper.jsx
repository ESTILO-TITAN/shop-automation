import { useState } from 'react';
import { Pencil } from 'lucide-react';

const QuickEditWrapper = ({ children, isEnabled, onEdit, type }) => {
    const [isHovered, setIsHovered] = useState(false);

    if (!isEnabled) return children;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation();
                onEdit();
            }}
            style={{
                position: 'relative',
                cursor: 'pointer',
                outline: isHovered ? '2px dashed #667eea' : 'none',
                outlineOffset: '2px',
                borderRadius: '4px',
                transition: 'all 0.2s'
            }}
        >
            {children}
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#667eea',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Pencil size={20} />
                </div>
            )}
        </div>
    );
};

export default QuickEditWrapper;
