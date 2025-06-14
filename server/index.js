import express from "express"
import cors from "cors"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Vite default port
    credentials: true,
  }),
)
app.use(express.json())

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Chatbot API is running!" })
})

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Received request:", req.body)

    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
      })
    }

    // Check if OpenAI API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OpenAI API key not configured",
      })
    }

    const systemPrompt = `Bạn là một trợ lý AI chuyên về tư vấn sức khỏe. 
    Hãy trả lời các câu hỏi về triệu chứng và sức khỏe một cách chuyên nghiệp, 
    nhưng luôn nhắc nhở người dùng tham khảo ý kiến bác sĩ cho chẩn đoán chính xác.
    Trả lời bằng tiếng Việt.`

    // Use generateText instead of streamText for simpler implementation
    const result = await generateText({
      model: openai("gpt-4o-mini"), // Use cheaper model for testing
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    })

    console.log("AI Response:", result.text)

    res.json({
      success: true,
      reply: result.text,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
      reply: "Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại sau.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`OpenAI API Key configured: ${process.env.OPENAI_API_KEY ? "Yes" : "No"}`)
})
