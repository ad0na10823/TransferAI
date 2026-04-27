export async function askAI(prompt) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that returns structured responses when needed.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();

  return data?.message?.content || "No response from AI";
}