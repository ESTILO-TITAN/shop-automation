import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, Store } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = login(email, password);

        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '1rem'
        }}>
            <div className="animate-slideUp" style={{
                background: 'white',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-2xl)',
                padding: '3rem 2rem',
                width: '100%',
                maxWidth: '420px'
            }}>
                {/* Logo */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 'var(--radius-xl)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <Store size={40} color="white" />
                    </div>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Store Builder
                    </h1>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        Panel de Administración
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            background: '#FEE2E2',
                            border: '1px solid #EF4444',
                            color: '#991B1B',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                            fontSize: '0.875rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">
                            <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@store.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-gradient btn-block btn-lg"
                        disabled={loading}
                        style={{
                            marginTop: '1.5rem'
                        }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* Demo Credentials */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--gray-50)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                }}>
                    <strong>Credenciales de prueba:</strong><br />
                    Email: admin@store.com<br />
                    Contraseña: admin123
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
