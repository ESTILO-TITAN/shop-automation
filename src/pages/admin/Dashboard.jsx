import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../contexts/StoreContext';
import { ShoppingCart, Package, AlertCircle, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const { getAnalytics, orders } = useStore();
    const analytics = getAnalytics();

    const stats = [
        {
            label: 'Total Pedidos',
            value: analytics.totalOrders,
            icon: ShoppingCart,
            color: '#3B82F6',
            bgColor: '#DBEAFE'
        },
        {
            label: 'Ingresos Totales',
            value: `$${analytics.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: '#10B981',
            bgColor: '#D1FAE5'
        },
        {
            label: 'Total Productos',
            value: analytics.totalProducts,
            icon: Package,
            color: '#F59E0B',
            bgColor: '#FEF3C7'
        },
        {
            label: 'Pedidos Pendientes',
            value: analytics.pendingOrders,
            icon: AlertCircle,
            color: '#EF4444',
            bgColor: '#FEE2E2'
        }
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Dashboard
                    </h1>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem'
                    }}>
                        Bienvenido al panel de administración
                    </p>
                </div>

                {/* Stats Grid - Mobile Optimized */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="card animate-slideUp"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    padding: '1.25rem'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem'
                                }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontSize: '0.8125rem',
                                            color: 'var(--text-secondary)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {stat.label}
                                        </p>
                                        <h3 style={{
                                            fontSize: '1.75rem',
                                            fontWeight: '800',
                                            color: 'var(--text-primary)',
                                            margin: 0,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        minWidth: '56px',
                                        borderRadius: 'var(--radius-xl)',
                                        background: stat.bgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={28} color={stat.color} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Orders */}
                <div className="card animate-slideUp" style={{ animationDelay: '400ms' }}>
                    <div className="card-header">
                        <h2 className="card-title">Pedidos Recientes</h2>
                        <p className="card-subtitle">Últimos 5 pedidos realizados</p>
                    </div>

                    <div className="card-body" style={{ padding: '0' }}>
                        {recentOrders.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem 1rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <ShoppingCart size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                <p>No hay pedidos aún</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    minWidth: '600px'
                                }}>
                                    <thead>
                                        <tr style={{
                                            borderBottom: '2px solid var(--gray-200)'
                                        }}>
                                            <th style={{
                                                padding: '1rem',
                                                textAlign: 'left',
                                                fontSize: '0.8125rem',
                                                fontWeight: '600',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap'
                                            }}>ID</th>
                                            <th style={{
                                                padding: '1rem',
                                                textAlign: 'left',
                                                fontSize: '0.8125rem',
                                                fontWeight: '600',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap'
                                            }}>Cliente</th>
                                            <th style={{
                                                padding: '1rem',
                                                textAlign: 'left',
                                                fontSize: '0.8125rem',
                                                fontWeight: '600',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap'
                                            }}>Total</th>
                                            <th style={{
                                                padding: '1rem',
                                                textAlign: 'left',
                                                fontSize: '0.8125rem',
                                                fontWeight: '600',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap'
                                            }}>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} style={{
                                                borderBottom: '1px solid var(--gray-100)'
                                            }}>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap'
                                                }}>{order.id}</td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.8125rem',
                                                    whiteSpace: 'nowrap'
                                                }}>{order.customer?.name || 'N/A'}</td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap'
                                                }}>${order.total?.toFixed(2)}</td>
                                                <td style={{
                                                    padding: '1rem'
                                                }}>
                                                    <span style={{
                                                        padding: '0.375rem 0.75rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        whiteSpace: 'nowrap',
                                                        background: order.status === 'completed' ? '#D1FAE5' :
                                                            order.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                                                        color: order.status === 'completed' ? '#065F46' :
                                                            order.status === 'pending' ? '#92400E' : '#991B1B'
                                                    }}>
                                                        {order.status === 'pending' ? 'Pendiente' :
                                                            order.status === 'completed' ? 'Completado' : 'Cancelado'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
