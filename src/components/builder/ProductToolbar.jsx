import { Edit2, Trash2, Eye, DollarSign, Tag } from 'lucide-react';

const ProductToolbar = ({ onAction }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: '50px',
            padding: '0.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 1000
        }}>
            <button
                onClick={() => onAction('edit')}
                style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                }}
                title="Editar Producto"
            >
                <Edit2 size={18} />
            </button>

            <button
                onClick={() => onAction('price')}
                style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: '#48bb78',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                }}
                title="Editar Precio"
            >
                <DollarSign size={18} />
            </button>

            <button
                onClick={() => onAction('category')}
                style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: '#4299e1',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                }}
                title="Cambiar Categoría"
            >
                <Tag size={18} />
            </button>

            <button
                onClick={() => onAction('visibility')}
                style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: '#ed8936',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                }}
                title="Mostrar/Ocultar"
            >
                <Eye size={18} />
            </button>

            <button
                onClick={() => onAction('delete')}
                style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: '#f56565',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                }}
                title="Eliminar Producto"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default ProductToolbar;
