import { askAI } from './api/ai';
import { useState } from 'react'


function App() {
  const [form, setForm] = useState({ performance: 7, injury: 3});
  const [strengths, setStrengths] = useState([]);
  const [goals, setGoals] = useState(['Transfer fee range', 'Negotiation strategy']);
  const [output, setOutput] = useState("");
  const [prices, setPrices] = useState(null);
  const[loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleChip = (val, list, setList) => {
    setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);
  };

  const strengthOptions = [
    'Elite athleticism', 'Tehcnical skill', 'Leadership', 'Goal scoring',
    'Playmaking', 'Defensive solidity', 'High potential', 'International experience', 
    'Marketability', 'Versatility'
  ];

  const goalOptions = [
    'Transfer fee range', 'Negotiation strategy', 'Loan structure',
    'Wage estimate', 'Add-ons & clauses', 'Risk assessment', 'Deal-breakers to avoid'
  ];

  const analyze = async () => {
  setLoading(true);
  setOutput("");
  setPrices(null);

  const prompt = `You are a senior sports transfer analyst. Provide a transfer valuation report.

Player: ${form.name || 'Unknown'}, Sport: ${form.sport || 'Soccer'}
Age: ${form.age || 'N/A'}, Position: ${form.position || 'N/A'}, Nationality: ${form.nationality || 'N/A'}
Current team: ${form.currentTeam || 'N/A'} → Target: ${form.targetTeam || 'N/A'}
Contract status: ${form.contract || 'N/A'}
Estimated value: ${form.value || 'N/A'}
Selling team situation: ${form.sellSituation || 'N/A'}
Buying team budget: ${form.buyBudget || 'N/A'}
Market competition: ${form.competition || 3}/10
Performance rating: ${form.performance || 7}/10
Injury risk: ${form.injury || 3}/10
Key strengths: ${strengths.length ? strengths.join(', ') : 'None specified'}
Additional context: ${form.extraContext || 'None'}
Analysis requested: ${goals.length ? goals.join(', ') : 'Full analysis'}

Structure your response EXACTLY like this:
PRICES: [low]|[mid]|[high]
(e.g. €30M|€45M|€60M — realistic figures for the sport)

Then write sections with these emoji headers:
💰 Valuation breakdown
🤝 Negotiation strategy
📋 Deal structure suggestions
⚠️ Key risks
🏆 Verdict`;

  try {
    const res = await fetch("/ollama/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3",        // change this to whatever model you pulled e.g. "mistral", "llama3.2", "gemma2"
        stream: false,          // false = wait for full response
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!res.ok) {
      setOutput(`❌ Ollama error ${res.status}. Is Ollama running? Open a terminal and run: ollama serve`);
      setLoading(false);
      return;
    }

    const data = await res.json();
    const text = data.message?.content;

    if (!text) {
      setOutput("❌ No response from Ollama. Make sure your model is pulled — run: ollama pull llama3");
      setLoading(false);
      return;
    }

    const priceMatch = text.match(/PRICES:\s*([^\n]+)/);
    if (priceMatch) {
      const parts = priceMatch[1].split('|').map(s => s.trim());
      setPrices({ low: parts[0], mid: parts[1], high: parts[2] });
    }

    setOutput(text.replace(/PRICES:[^\n]+\n?/, '').trim());

  } catch (err) {
    setOutput(`❌ Could not connect to Ollama: ${err.message}\n\nMake sure:\n1. Ollama is installed (ollama.com)\n2. Run 'ollama serve' in a terminal\n3. Run 'ollama pull llama3' to download a model`);
  }

  setLoading(false);
};

  return (
    <div className="app">
      <h1>Transfer Intelligence</h1>
      <p className="subtitle">AI-powered player valuation & deal strategy</p>

      {/*Player Profile*/}
      <div className="card">
        <h2>Player Profile</h2>

        <div className="grid">
          <input name="name" placeholder="Player name" onChange={handleChange} />
          <select name="sport" onChange={handleChange}>
            <option>Select sport</option>
            <option>Soccer / Football</option>
            <option>Basketball (NBA)</option>
            <option>American Football (NFL)</option>
            <option>Baseball (MLB)</option>
            <option>Ice Hockey (NHL)</option>
            <option>Rugby</option>
            <option>Cricket</option>
            <option>Other</option>
          </select>

          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="position" placeholder="Position" onChange={handleChange} />
          <input name="nationality" placeholder="Nationality" onChange={handleChange} />

          <input name="currentTeam" placeholder="Current Team" onChange={handleChange} />
          <input name="targetTeam" placeholder="Target Team" onChange={handleChange} />
        </div>
      </div>

      {/* Contract & Market Context */}
<div className="card">
  <h2>Contract & Market Context</h2>
  <div className="grid">
    <div className="field-group">
      <label className="field-label">Contract status</label>
      <select name="contract" onChange={handleChange}>
        <option value="">Select</option>
        <option>Under 6 months remaining</option>
        <option>6–12 months remaining</option>
        <option>1–2 years remaining</option>
        <option>2–3 years remaining</option>
        <option>3+ years remaining</option>
        <option>Free agent</option>
      </select>
    </div>

    <div className="field-group">
      <label className="field-label">Current estimated value</label>
      <input name="value" placeholder="e.g. €45M or $12M/yr" onChange={handleChange} />
    </div>

    <div className="field-group">
      <label className="field-label">Selling team's situation</label>
      <select name="sellSituation" onChange={handleChange}>
        <option value="">Select</option>
        <option>Needs to sell (financial pressure)</option>
        <option>Open to offers</option>
        <option>Reluctant seller</option>
        <option>Player requested transfer</option>
        <option>Player is a free agent</option>
      </select>
    </div>

    <div className="field-group">
      <label className="field-label">Buying team's budget</label>
      <select name="buyBudget" onChange={handleChange}>
        <option value="">Select</option>
        <option>Very tight — need a bargain</option>
        <option>Moderate — fair deal</option>
        <option>Comfortable — can pay market rate</option>
        <option>Strong — willing to pay premium</option>
        <option>Unlimited — want the player at any cost</option>
      </select>
    </div>
  </div>

  <div className="slider-group" style={{ marginTop: '1rem' }}>
    <div className="slider-label">
      Market competition (other interested clubs) <span>{form.competition}</span>
    </div>
    <input
      type="range" name="competition"
      min="0" max="10" defaultValue="3"
      onChange={handleChange}
    />
  </div>
</div>

      {/* Attributes */}
      <div className="card">
        <h2>Player Attributes</h2>

        <div className="slider-group">
          <div className="slider-label">
            Overall performance level <span>{form.performance}/10</span>
          </div>
          <input type="range" name="performance" min="1" max="10"
          defaultValue="7" onChange={handleChange} />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            Injury history risk <span>{form.injury}/10</span>
          </div>
          <input type="range" name="injury" min="1" max="10"
          defaultValue="3" onChange={handleChange} />
        </div>

        <div className="chip-section">
          <div className="chip-label">Key strengths (select all that apply)</div>
          <div className="chips">
            {strengthOptions.map(s => (
              <button
              key={s}
              className={`chip ${strengths.includes(s) ? 'chip-on' : ''}`}
              onClick={() => toggleChip(s, strengths, setStrengths)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="field-full" style={{marginTop: '1rem'}}>
          <label className="field-label">Additional context (recent form, injuries, rumors, agent info...)</label>
          <textarea
            name="extraContext"
            placeholder="Add any extra info that should influence the valuation or negotiation strategy..."
            onChange={handleChange}
          />  
        </div>
      </div>

      {/*What are you looking for */}
      <div className="card">
        <h2>What Are You Looking For?</h2>
        <div className="chips">
          {goalOptions.map(g => (
            <button
              key={g}
              className={`chip ${goals.includes(g) ? 'chip-on' : ''}`}
              onClick={() => toggleChip(g, goals, setGoals)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        className="btn generate-btn"
        onClick={analyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Generate Transfer Intelligence"}
      </button>

      {/* Output */}
      <div className="output-card">
        <div className="output-header">
          <div className="output-icon">🤝</div>
          <div>
            <div className="output-title">
              {form.name ? `${form.name} — Transfer Report` : 'Transfer Report'}
            </div>
            <div className="output-meta">
              {form.sport || 'Sport'} · {form.position || 'Position'} · AI-generated valuation & deal strategy
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="dot" /><div className="dot" /><div className="dot" />
            Building transfer intelligence...
          </div>
        )}

        {prices && !loading && (
          <div className="price-row">
            <div className="price-card low">
              <div className="p-label">Opening offer</div>
              <div className="p-value">{prices.low}</div>
              <div className="p-sub">Anchor low</div>
            </div>
            <div className="price-card mid">
              <div className="p-label">Target deal</div>
              <div className="p-value">{prices.mid}</div>
              <div className="p-sub">Best agreement</div>
            </div>
            <div className="price-card high">
              <div className="p-label">Walk-away</div>
              <div className="p-value">{prices.high}</div>
              <div className="p-sub">Max justified</div>
            </div>
          </div>
        )}

        {output
          ? <div className="output-body">{output}</div>
          : !loading && <div className="placeholder-text">Results will appear here once you generate...</div>
        }
      </div>
    </div>
  );
}

export default App
