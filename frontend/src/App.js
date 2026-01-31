import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const BACKEND_URL = "https://data-analyst-ai-agent-4.onrender.com";

  async function uploadFile() {
    if (!file) return alert("Select an Excel file first");
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${BACKEND_URL}/`, formData);
    alert("Excel Uploaded Successfully!");
  }

  async function askQuery() {
    const res = axios.post(`${BACKEND_URL}/chat`, { prompt: query })

    setAnswer(res.data.reply);
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>📊 Data Analyst AI Agent</h1>

      <h3>Upload Excel File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h3>Ask AI Question</h3>
      <input
        style={{ width: "60%" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: Show summary of dataset"
      />
      <button onClick={askQuery}>Ask</button>

      <h3>Answer:</h3>
      <pre>{answer}</pre>
    </div>
  );
}
