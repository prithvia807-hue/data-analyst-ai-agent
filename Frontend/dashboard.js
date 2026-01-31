import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const BACKEND_URL =  "https://data-analyst-ai-backend.onrender.com";


  const uploadExcel = async () => {
    const form = new FormData();
    form.append("file", file);

    await axios.post(`${BACKEND_URL}/upload/`, form);
    alert("Excel Uploaded!");
  };

  const askAI = async () => {
    const res = await axios.post(
      `${BACKEND_URL}/query/?query=${query}`
    );
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Power BI AI Dashboard</h1>

      <h3>Upload Excel</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadExcel}>Upload</button>

      <h3>Ask AI Analyst</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask question..."
      />
      <button onClick={askAI}>Ask</button>

      <h3>AI Insights</h3>
      <pre>{answer}</pre>
    </div>
  );
}

