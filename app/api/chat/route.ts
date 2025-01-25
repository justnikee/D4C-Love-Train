import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const startTime = Date.now();
    try {
      const { message } = await req.json();
      console.log("Received message:", message);
  
      if (!message) {
        return NextResponse.json({ message: "No message found", status: 404 });
      }
  
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "deepseek-chat",
        max_tokens: 50,
      });
  
      const reply = completion.choices[0]?.message?.content || "No response";
      console.log("API response time:", Date.now() - startTime, "ms");
  
      return NextResponse.json({ reply, status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
  }