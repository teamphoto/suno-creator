import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 });
  }

  // OpenAI API 호출
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1.0,
      max_tokens: 1024
    })
  });

  const openaiJson = await openaiRes.json();
  const lyrics =
    openaiJson?.choices?.[0]?.message?.content?.trim() || "가사 생성 실패";

  return NextResponse.json({ lyrics });
}
