// Save message to local storage
function saveMessage(sender, message, isError = false) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ sender, message, isError, timestamp: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load chat history from local storage
function loadChatHistory() {
    const chatBox = document.getElementById('chatBox');
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    chatHistory.forEach(({ sender, message, isError }) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message${isError ? ' error' : ''}`;
        
        // Split message by newlines and create separate elements for each line
        const lines = message.split('\n');
        lines.forEach((line, index) => {
            const lineSpan = document.createElement('span');
            lineSpan.textContent = line;
            messageDiv.appendChild(lineSpan);
            if (index < lines.length - 1) {
                messageDiv.appendChild(document.createElement('br'));
            }
        });

        chatBox.appendChild(messageDiv);
    });

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('themeToggle').checked = isDark;
}

// Load theme and chat history on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeToggle').checked = true;
    }
    loadChatHistory();
});

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

    // Save to chat history
    saveMessage('user', message);

    // Clear input
    userInput.value = '';

    // Show loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'chat-message ai-message loading';
    loadingMessage.textContent = 'Typing...';
    chatBox.appendChild(loadingMessage);

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

        // Remove loading indicator
        loadingMessage.remove();

        if (data.error) {
            // Display error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'chat-message ai-message error';
            errorMessage.textContent = data.error;
            chatBox.appendChild(errorMessage);
            saveMessage('ai', data.error, true);
        } else {
            // Append AI message
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-message ai-message';
            
            // Split AI message by newlines and create separate elements
            const lines = data.message.split('\n');
            lines.forEach((line, index) => {
                const lineSpan = document.createElement('span');
                lineSpan.textContent = line;
                aiMessage.appendChild(lineSpan);
                if (index < lines.length - 1) {
                    aiMessage.appendChild(document.createElement('br'));
                }
            });

            chatBox.appendChild(aiMessage);
            saveMessage('ai', data.message);
        }

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        loadingMessage.remove();
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-message ai-message error';
        errorMessage.textContent = 'Network error. Please check your connection.';
        chatBox.appendChild(errorMessage);
        saveMessage('ai', 'Network error. Please check your connection.', true);
    }
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});