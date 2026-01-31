import pandas as pd
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def run_ai_agent(file_path, query):
    df = pd.read_excel(file_path)
    preview = df.head(10).to_string()

    prompt = f"""
You are a senior Data Analyst.

Dataset Preview:
{preview}

User Question:
{query}

Give:
1. Business Answer
2. KPI Insights
3. Power BI Dashboard Chart Suggestions
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
