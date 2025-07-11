import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    // 클라이언트에서 보낸 JSON 바디에서 'lyrics' 키를 받아옵니다.
    const { lyrics } = await req.json();

    const systemPrompt = `
You are a music tag expert.
Analyze the song lyrics and recommend 1–3 emotional style tags for each section.
Use only the following tags: #dreamy, #soft, #emotional, #intense, #uplifting, #melancholic, #nostalgic, #dark, #romantic, #hopeful, #epic, #minimal.
Respond in JSON format like this:
{
  "Intro": ["#dreamy", "#soft"],
  "Verse 1": ["#emotional"],
  ...
}`.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lyrics },  // 여기서 'lyrics' 사용
      ],
    });

    let tags = {};
    try {
      const json = completion.choices[0].message.content || '{}';
      tags = JSON.parse(json);
    } catch (e) {
      console.error('[recommendTags] JSON parse error:', e);
    }

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('[recommendTags] error:', error);
    return NextResponse.json({ tags: {} }, { status: 500 });
  }
}
