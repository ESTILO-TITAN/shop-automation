import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
    Paintbrush,
    Store as StoreIcon,
    Hammer
} from 'lucide-react';
import GroqChat from '../GroqChat';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Pedidos' },
        { path: '/admin/products', icon: Package, label: 'Productos' },
        { path: '/admin/builder', icon: Hammer, label: 'Constructor' },
        { path: '/admin/preview', icon: StoreIcon, label: 'Ver Tienda' },
        { path: '/admin/settings', icon: Settings, label: 'Configuración' },
    ];

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            position: 'relative'
        }}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        animation: 'fadeIn 0.2s ease'
                    }}
                />
            )}

            {/* Sidebar */}
            <aside style={{
                width: '280px',
                position: 'fixed',
                left: sidebarOpen ? 0 : '-280px',
                top: 0,
                height: '100vh',
                background: 'var(--bg-dark)',
                color: 'white',
                transition: 'left 0.3s ease',
                overflow: 'auto',
                zIndex: 1000,
                boxShadow: 'var(--shadow-2xl)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ flex: 1, padding: '1.5rem' }}>
                    {/* Logo & Close Button */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <StoreIcon size={24} color="white" />
                            </div>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                color: 'white',
                                margin: 0
                            }}>
                                Store Builder
                            </h2>
                        </div>
                        <button
                            onClick={closeSidebar}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                transition: 'background var(--transition-fast)',
                                minWidth: '44px',
                                minHeight: '44px'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginBottom: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Conectado como
                        </div>
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'white'
                        }}>
                            {user?.name}
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.5)',
                            marginTop: '0.25rem'
                        }}>
                            {user?.email}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeSidebar}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem 1.25rem',
                                        marginBottom: '0.5rem',
                                        borderRadius: 'var(--radius-lg)',
                                        background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all var(--transition-base)',
                                        fontWeight: isActive ? '600' : '400',
                                        fontSize: '0.9375rem',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        minHeight: '48px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {isActive && (
                                        <div style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: '4px',
                                            background: 'linear-gradient(to bottom, #667eea, #764ba2)',
                                            borderRadius: '0 4px 4px 0'
                                        }} />
                                    )}
                                    <Icon size={22} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout Button */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 'var(--radius-lg)',
                            color: '#FCA5A5',
                            fontWeight: '600',
                            fontSize: '0.9375rem',
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            minHeight: '48px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(239, 68, 68, 0.25)';
                            e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                            e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                        }}
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{
                flex: 1,
                width: '100%',
                minHeight: '100vh'
            }}>
                {/* Top Header */}
                <header style={{
                    background: 'white',
                    borderBottom: '1px solid var(--gray-200)',
                    padding: '1rem 1.25rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 'var(--z-sticky)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="btn btn-ghost"
                            style={{
                                padding: '0.75rem',
                                minWidth: '48px',
                                minHeight: '48px'
                            }}
                        >
                            <Menu size={24} />
                        </button>

                        {/* Mobile: Show current page title */}
                        <div style={{
                            flex: 1,
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: 'var(--text-primary)'
                        }}>
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{
                    padding: '1.25rem',
                    maxWidth: '100%',
                    overflow: 'hidden'
                }}>
                    {children}
                </main>
                <GroqChat />
            </div>
        </div>
    );
};

export default AdminLayout;
