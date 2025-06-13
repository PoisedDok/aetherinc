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

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ text, raw: data });
  } catch (error) {
    console.error('Error in Gemini proxy:', error);
    return NextResponse.json({ error: 'Server error processing Gemini request.' }, { status: 500 });
  }
} 