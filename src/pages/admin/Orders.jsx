import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../contexts/StoreContext';
import { Search, Filter, Download, Eye, Trash2, ShoppingCart } from 'lucide-react';

const Orders = () => {
    const { orders, updateOrderStatus, deleteOrder } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    const handleDelete = (orderId) => {
        if (confirm('¿Estás seguro de eliminar este pedido?')) {
            deleteOrder(orderId);
        }
    };

    const exportToCSV = () => {
        const headers = ['ID,Fecha,Cliente,Teléfono,Total,Estado'];
        const rows = filteredOrders.map(order =>
            `${order.id},${new Date(order.date).toLocaleDateString()},${order.customer?.name},${order.customer?.phone},$${order.total},${order.status}`
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pedidos-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem'
                        }}>
                            Gestión de Pedidos
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1rem'
                        }}>
                            {filteredOrders.length} pedido(s) encontrado(s)
                        </p>
                    </div>

                    <button onClick={exportToCSV} className="btn btn-primary">
                        <Download size={20} />
                        Exportar CSV
                    </button>
                </div>

                {/* Filters */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem'
                    }}>
                        {/* Search */}
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">
                                <Search size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Buscar
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="ID o nombre del cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">
                                <Filter size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Estado
                            </label>
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Todos</option>
                                <option value="pending">Pendiente</option>
                                <option value="completed">Completado</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="card">
                    {filteredOrders.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <ShoppingCart size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                            <p>No se encontraron pedidos</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{
                                        borderBottom: '2px solid var(--gray-200)',
                                        background: 'var(--gray-50)'
                                    }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>ID</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Fecha</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Cliente</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Teléfono</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Total</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Estado</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} style={{
                                            borderBottom: '1px solid var(--gray-100)',
                                            transition: 'background var(--transition-fast)'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-50)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'var(--primary)'
                                            }}>{order.id}</td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {new Date(order.date).toLocaleDateString('es-ES')}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500'
                                            }}>{order.customer?.name || 'N/A'}</td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)'
                                            }}>{order.customer?.phone || 'N/A'}</td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                                color: 'var(--success)'
                                            }}>${order.total?.toFixed(2)}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    style={{
                                                        padding: '0.375rem 0.75rem',
                                                        borderRadius: 'var(--radius-md)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        border: '2px solid',
                                                        borderColor: order.status === 'completed' ? '#10B981' :
                                                            order.status === 'pending' ? '#F59E0B' : '#EF4444',
                                                        background: order.status === 'completed' ? '#D1FAE5' :
                                                            order.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                                                        color: order.status === 'completed' ? '#065F46' :
                                                            order.status === 'pending' ? '#92400E' : '#991B1B',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="pending">Pendiente</option>
                                                    <option value="completed">Completado</option>
                                                    <option value="cancelled">Cancelado</option>
                                                </select>
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                textAlign: 'center'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '0.5rem',
                                                    justifyContent: 'center'
                                                }}>
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="btn btn-sm btn-ghost"
                                                        title="Ver detalles"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="btn btn-sm btn-ghost"
                                                        title="Eliminar"
                                                        style={{ color: 'var(--error)' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div
                        onClick={() => setSelectedOrder(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 'var(--z-modal)',
                            padding: '1rem'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="card animate-scaleIn"
                            style={{
                                maxWidth: '600px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                        >
                            <div className="card-header">
                                <h2 className="card-title">Detalles del Pedido</h2>
                                <p className="card-subtitle">{selectedOrder.id}</p>
                            </div>

                            <div className="card-body">
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Información del Cliente
                                    </h3>
                                    <p><strong>Nombre:</strong> {selectedOrder.customer?.name}</p>
                                    <p><strong>Teléfono:</strong> {selectedOrder.customer?.phone}</p>
                                    {selectedOrder.customer?.address && (
                                        <p><strong>Dirección:</strong> {selectedOrder.customer.address}</p>
                                    )}
                                    {selectedOrder.customer?.notes && (
                                        <p><strong>Notas:</strong> {selectedOrder.customer.notes}</p>
                                    )}
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Productos
                                    </h3>
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} style={{
                                            padding: '0.75rem',
                                            background: 'var(--gray-50)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{item.name} x{item.quantity}</span>
                                                <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{
                                        marginTop: '1rem',
                                        paddingTop: '1rem',
                                        borderTop: '2px solid var(--gray-200)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '1.25rem',
                                        fontWeight: '700'
                                    }}>
                                        <span>Total:</span>
                                        <span style={{ color: 'var(--success)' }}>${selectedOrder.total?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="btn btn-primary btn-block"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Orders;
