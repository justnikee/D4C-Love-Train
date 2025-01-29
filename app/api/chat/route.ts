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

    if (
      message.toLowerCase().includes("what's your name") ||
      message.toLowerCase().includes("what is your name") ||
      message.toLowerCase().includes("your name")
    ) {
      return NextResponse.json({
        reply: "Hii you can call me LoveTrain 🚅, how can I help you?",
      });
    }

    if (!message) {
      return NextResponse.json({ message: "No message found", status: 404 });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "deepseek-chat",
    });

    const reply = completion.choices[0]?.message?.content || "No response";
    console.log("API response time:", Date.now() - startTime, "ms");

    return NextResponse.json({ reply, status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Return a more detailed error response
    return NextResponse.json(
      {
        message: "Internal Server Error: " + error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
