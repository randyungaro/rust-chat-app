
# Rust Chat App with Ollama Models

This is a simple web-based AI chat application built with Rust, leveraging Ollama to run large language models (LLMs).
It provides a user-friendly interface for interacting with AI models directly in your browser.

## Features

- **Rust Backend:** Built with Rust for performance and reliability.
- **Ollama Integration:** Uses Ollama to run and manage LLMs locally.
- **Web-based Interface:** Accessible through any modern web browser.
- **Real-time Chat:** Provides a seamless chat experience with the AI.
- **Easy Deployment:** Designed for straightforward setup and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Rust and Cargo:** [Install Rust](https://www.rust-lang.org/tools/install)
- **Ollama:** [Install Ollama](https://ollama.ai/download)
- **A Compatible LLM:** Pull a model from Ollama, e.g., `ollama pull llama2` ( i use DeepSeek models)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/randyungaro/rust-chat-app

2.  **Build the Rust application:**

    ```bash
    cargo run

3.  **Access the application:**

    Open your web browser and navigate to http://localhost:8080

![sc-rust_chat_app](https://github.com/user-attachments/assets/667e6955-90e5-4ee4-9e2b-a3e4c1f180e0)


## Configuration
You can configure the application through environment variables:

- OLLAMA_MODEL: Specifies the Ollama model to use (default: llama2).
- HOST: Specifies the host address to bind to (default: 0.0.0.0).
- PORT: Specifies the port to listen on (default: 8080).

## License
This project is licensed under MIT License
