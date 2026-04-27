import { useState } from 'react'


function App() {
  const [form, setForm] = useState({ performance: 7, injury: 3});
  const [output, setOutput] = useState("");
  const [prices, setPrices] = useState(null);
  const[loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    setLoading(true);
    setOutput("");
    setPrices(null);

    const prompt = `You are a senior sports transfer analyst. Provide a transfer valuation report.
    Player: ${form.name || 'Unknown'}, Sport: ${form.sport || 'Soccer'}
    Age: ${form.age}, Position: ${form.position}, Nationality: ${form.nationality}
    Current team: ${form.currentTeam} -> Target: ${form.targetTeam}
    Contract: ${form.contract}, Estimated value: ${form.value}
Buying urgency: ${form.urgency}, Competition: ${form.competition}
Performance rating: ${form.performance}/10, Injury risk: ${form.injury}/10
    `
  }

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
            <option>Football</option>
            <option>Basketball</option>
            <option>Baseball</option>
          </select>

          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="position" placeholder="Position" onChange={handleChange} />
          <input name="nationality" placeholder="Nationality" onChange={handleChange} />

          <input name="currentTeam" placeholder="Current Team" onChange={handleChange} />
          <input name="targetTeam" placeholder="Target Team" onChange={handleChange} />
        </div>
      </div>

      {/*Market*/}
      
      <div className="card">
        <h2>Market Context</h2>

        <div className="grid">
          <select name="contract" onChange={handleChange}>
            <option>Contract Status</option>
            <option>1 year left</option>
            <option>2-3 years</option>
            <option>Long-term</option>
          </select>

          <input name="value" placeholder="Estimated value" onChange={handleChange} />

          <select name="urgency" onChange={handleChange}>
            <option>Buying team urgency</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input name="competition" placeholder="Competition level" onChange={handleChange} />
        </div>
      </div>

      {/* Attributes */}
      <div className="card">
        <h2>Player Attributes</h2>

        <input type="range" name="performance" min="1" max="10" onChange={handleChange} />
        <input type="range" name="injury" min="1" max="10" onChange={handleChange} />
      </div>

      {/* Button */}
      <button className="btn">
        Generate Transfer Intelligence
      </button>

      {/* Output */}
      <div className="output">
        {output || "Results will appear here..."}
      </div>

    </div>
  );
}

export default App
