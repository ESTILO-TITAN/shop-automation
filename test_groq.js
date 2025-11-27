
import { sendMessageToGroq } from './src/services/groq.js';

const apiKey = process.env.GROQ_API_KEY || "gsk_PLACEHOLDER"; // API Key removed for security
const messages = [
    { role: 'system', content: 'Eres un asistente útil.' },
    { role: 'user', content: 'Hola, ¿cómo te llamas?' }
];

console.log('Enviando mensaje a Groq...');

try {
    const response = await sendMessageToGroq(messages, apiKey);
    console.log('Respuesta de la IA:', response);
} catch (error) {
    console.error('Error:', error);
}
