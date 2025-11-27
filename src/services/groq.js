
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const sendMessageToGroq = async (messages, apiKey) => {
    if (!apiKey) {
        throw new Error('API Key is required');
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages: messages,
                model: 'llama-3.1-8b-instant', // Using Llama 3.1 8B Instant model
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error calling Groq API');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error in Groq service:', error);
        throw error;
    }
};
