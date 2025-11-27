import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { sendMessageToGroq } from '../services/groq';
import { useStore } from '../contexts/StoreContext';
import { createPortal } from 'react-dom';

const GroqChat = ({ inline = false }) => {
    const { storeConfig } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '');
    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: `Eres un asistente de tienda en línea llamada "${storeConfig.name}". Ayudas a los clientes con información sobre productos, categorías y compras. La tienda ofrece productos en varias categorías. Sé amable, conciso y útil. Si te preguntan sobre productos específicos, menciona que pueden explorar el catálogo en la tienda.`
        },
        { role: 'assistant', content: '¡Bienvenido a nuestra tienda! Te voy a ayudar con lo que necesites.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseContent = await sendMessageToGroq([...messages, userMessage], apiKey);
            setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error. Por favor intenta de nuevo.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const content = !isOpen ? (
        inline ? (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="btn btn-secondary"
                style={{
                    width: '100%',
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}
            >
                <MessageCircle size={20} />
                Chatear con IA
            </button>
        ) : (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    width: '42px',  // Reduced by 30%
                    height: '42px', // Reduced by 30%
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0652f 0%, #f09e2f 100%)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <MessageCircle size={20} />
            </button>
        )
    ) : (
        <div style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '245px',    // Reduced by 30%
            height: '350px',   // Reduced by 30%
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.1)',
            animation: 'slideUp 0.3s ease-out'
        }}>
            {/* Header */}
            <div style={{
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #f0652f 0%, #f09e2f 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bot size={20} />
                    <div>
                        <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Asistente IA</h3>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                padding: '0.75rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                background: '#f8f9fa'
            }}>
                {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            gap: '0.4rem',
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '85%'
                        }}
                    >
                        {msg.role === 'assistant' && (
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: '#e0e0e0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Bot size={14} color="#555" />
                            </div>
                        )}
                        <div style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '12px',
                            borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
                            borderTopRightRadius: msg.role === 'user' ? '4px' : '12px',
                            background: msg.role === 'user' ? '#f0652f' : 'white',
                            color: msg.role === 'user' ? 'white' : '#333',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            fontSize: '0.8rem',
                            lineHeight: '1.4'
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.4rem' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Bot size={14} color="#555" />
                        </div>
                        <div style={{
                            padding: '0.5rem 0.75rem',
                            background: 'white',
                            borderRadius: '12px',
                            borderTopLeftRadius: '4px',
                            fontSize: '0.75rem',
                            color: '#666'
                        }}>
                            Escribiendo...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{
                padding: '0.75rem',
                background: 'white',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '0.4rem'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe..."
                    style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '18px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '0.8rem'
                    }}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: input.trim() ? '#f0652f' : '#e0e0e0',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: input.trim() ? 'pointer' : 'default',
                        transition: 'background 0.2s'
                    }}
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );

    return createPortal(content, document.body);
};

export default GroqChat;
