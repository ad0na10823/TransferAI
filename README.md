🚀 TRANSFER INTELLIGENCE AI

AI-powered sports transfer valuation and negotiation system that generates data-driven player market values, deal structures, and negotiation strategies using local LLM inference.

📌 Overview

Transfer Intelligence AI is a full-stack frontend application that simulates professional sports transfer analysis.
It uses a local AI model via Ollama to evaluate player profiles and generate realistic transfer valuations including:

Opening offer
- Target deal range
- Walk-away price
- Negotiation strategy
- Risk assessment

The goal is to replicate how professional scouts, analysts, and sporting directors evaluate transfers using structured intelligence.

🎯 Key Features

🧠 AI Transfer Analysis
- Structured prompting system for consistent valuation output
- Local LLM inference (no external API costs)
- Context-aware negotiation reasoning
- 
💰 Dynamic Price Modeling
Generates:
- Opening offer (low anchor)
- Market target value
- Walk-away ceiling
- Extracts structured pricing from AI output
  
⚽ Multi-Sport Support
- Soccer / Football
- Basketball
- Baseball
- Extendable to any sport
  
📊 Player Intelligence Inputs
- Performance rating
- Injury risk scoring
- Market competition level
- Contract status simulation
- Club demand pressure modeling

🧠 System Architecture

User Input (React UI)
        ↓
Prompt Builder (structured player model)
        ↓
Ollama LLM (local inference)
        ↓
Structured AI Response
        ↓
Parser (price extraction + formatting)
        ↓
UI Dashboard (valuation + insights)

🛠️ Tech Stack
- React (Vite)
- JavaScript (ES6+)
- CSS (custom UI system)
- Fetch API
- Local AI via Ollama
- Node.js tooling
  
⚙️ Setup Instructions
1. Clone repository
- git clone https://github.com/your-username/TransferAI.git
- cd TransferAI

2. Install dependencies
- npm install

3. Start Ollama
- ollama serve
- ollama run llama3

4. Run frontend
- npm run dev

🧪 Example Output
PRICES: €28M | €42M | €65M

💰 Valuation Breakdown:
Player is high-potential with strong technical profile...

🤝 Negotiation Strategy:
Start with structured low anchor due to contract length...

⚠️ Key Risks:
Injury history increases volatility...

🧠 Engineering Highlights
- Custom prompt engineering for structured AI outputs
- Regex-based response parsing for financial extraction
- State-driven UI for real-time AI interaction
- Local inference pipeline (no external dependencies)
- Modular React architecture
  
📈 Future Improvements
- Real-time transfer market data integration
- Agent-based negotiation simulation system
- Club-specific valuation models
- Historical player comparison engine
- Backend migration (Node / FastAPI)
- Deployment via Vercel + API bridge

👤 Author

Adonai Mehari Zenebe
Computer Science @ Georgia Tech
Focus: AI Systems · Machine Learning · Sports Analytics · Software Engineering

📄 License

This project is intended for educational and portfolio purposes.
