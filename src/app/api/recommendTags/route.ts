// ✅ 1. recommendTags API - /api/recommendTags/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
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
      model: 'gpt-3.5-turbo', // ⬅️ 모델을 3.5로 변경
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lyrics },
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


// ✅ 2. formatLyrics 함수 (PromptBuilder.tsx 안에 포함)
const formatLyrics = (raw: string, tagMap: Record<string, string[]>) =>
  raw
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const m = line.match(/^\[(.+?)\]/);
      if (!m) return line;
      const sec = m[1].trim();
      const tags = tagMap[sec] || tagMap[sec.split(' ')[0]] || [];
      return `[${sec}]${tags.length ? ' ' + tags.join(', ') : ''}`;
    })
    .join('\n');


// ✅ 3. PromptBuilder.tsx - 적용 코드 일부

const handleGenerate = async () => {
  // ...가사 생성 이후

  let tagJson: Record<string, string[]> = {};
  try {
    const tagRes = await fetch('/api/recommendTags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyrics: lyricTxt }),
    });
    const json = await tagRes.json();
    tagJson = json.tags || {};
    if (!Object.keys(tagJson).length) {
      console.warn('⚠️ No tags generated. Falling back to no tags.');
    }
  } catch (e) {
    console.error('❌ Failed to fetch tags:', e);
  }

  setTags(tagJson);
  setFormattedLyrics(formatLyrics(lyricTxt, tagJson));
};
