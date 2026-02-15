const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const userKey = req.headers["x-api-key"];
    if (!userKey) {
      return res.status(400).json({ error: "Missing API key" });
    }

    const genAI = new GoogleGenerativeAI(userKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(req.body.prompt);
    res.json({ reply: result.response.text() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("AI Server Running 🚀");
});

app.listen(process.env.PORT || 3000);
