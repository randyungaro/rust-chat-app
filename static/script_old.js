async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const message = userInput.value.trim();

    if (!message) return;

    // Append user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    // Clear input
    userInput.value = '';

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to backend
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        // Append AI message
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message ai-message';
        aiMessage.textContent = data.message;
        chatBox.appendChild(aiMessage);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-message ai-message';
        errorMessage.textContent = 'Error communicating with the server.';
        chatBox.appendChild(errorMessage);
    }
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


