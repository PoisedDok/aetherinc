import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured.' }, { status: 500 });
    }

    const body = await request.json();
    const { prompt } = body;
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    // Compose the system prompt and user message as in the frontend
    const systemPrompt = `You are GURU AI, the helpful assistant representing AetherInc. Your primary goal is to provide accurate and enthusiastic information about AetherInc and its flagship product, the GURU device. ... (rest of the system prompt as in Terminal.tsx) ...\n`;
    const userMessage = prompt;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${systemPrompt}${userMessage}` }]
          }]
        }),
      }
    );

    const data = await geminiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Gemini proxy:', error);
    return NextResponse.json({ error: 'Server error processing Gemini request.' }, { status: 500 });
  }
} 