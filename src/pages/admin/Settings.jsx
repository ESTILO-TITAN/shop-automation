import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../contexts/StoreContext';
import { Save, Store as StoreIcon } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
    const { storeConfig, updateStoreConfig } = useStore();
    const [formData, setFormData] = useState(storeConfig.contact || {});
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStoreConfig({ contact: formData });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                        Configuración
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Configura los datos de contacto de tu tienda
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <StoreIcon size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Información de Contacto
                            </h2>
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Número de WhatsApp</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="1234567890"
                                    value={formData.whatsapp || ''}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                                <p className="form-help">
                                    Este número se usará para recibir pedidos por WhatsApp
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Calle 123, Ciudad"
                                    value={formData.address || ''}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="contacto@tienda.com"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
                                Redes Sociales
                            </h3>

                            <div className="form-group">
                                <label className="form-label">Facebook</label>
                                <input
                                    type="url"
                                    className="form-input"
                                    placeholder="https://facebook.com/tu-tienda"
                                    value={formData.social?.facebook || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social: { ...(formData.social || {}), facebook: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Instagram</label>
                                <input
                                    type="url"
                                    className="form-input"
                                    placeholder="https://instagram.com/tu-tienda"
                                    value={formData.social?.instagram || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social: { ...(formData.social || {}), instagram: e.target.value }
                                    })}
                                />
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary btn-block">
                                <Save size={20} />
                                {saved ? '¡Guardado!' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Settings;
