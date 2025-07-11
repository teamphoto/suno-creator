import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `
You are a music prompt writer for an AI music generation tool.
Given a basic English sentence describing genre, mood, vocals, and instruments,
transform it into a vivid, emotionally rich English sentence that sounds like a song description.
Focus on imagery, emotion, and mood. Avoid listing keywords—write one natural sentence.
Only return the final sentence.`;

    const userPrompt = `Prompt: ${prompt}`;

    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: userPrompt.trim() },
      ],
      temperature: 0.8,
    });

    const refinedPrompt = chat.choices[0].message.content?.trim();
    return NextResponse.json({ refinedPrompt });
  } catch (error) {
    console.error('Refine Prompt Error:', error);
    return NextResponse.json({ refinedPrompt: '' });
  }
}
