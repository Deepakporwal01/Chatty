import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function main(req, res) {
  const content = req.body.content;
  console.log("User content:", content);
try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); 

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: content }],
        },
      ],
    });

    const aiResponse = result.response.candidates[0].content.parts[0].text;

    console.log("AI Response:", aiResponse);

    // 🚀 Send response back to frontend
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
}
