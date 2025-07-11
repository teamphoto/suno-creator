// -----------------------------------------------------------------------------
// src/app/api/generateTitles/route.ts
// -----------------------------------------------------------------------------
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const titleCache = new Map<string, { titles: string[]; ts: number }>();
const titleKeyOf = (lyrics: string) => lyrics.slice(0, 120); // 앞부분만 키로

export async function POST(req: NextRequest) {
  try {
    const { lyrics = '' } = await req.json();
    const cacheKey = titleKeyOf(lyrics);

    /* 캐시 (30분) */
    const hit = titleCache.get(cacheKey);
    if (hit && Date.now() - hit.ts < 30 * 60 * 1000) {
      return NextResponse.json({ titles: hit.titles });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('API 키 미설정');

    const prompt = `다음 가사에 어울리는 영어 노래 제목을 3개 추천해 주세요. 각 제목은 4단어 이내로 작성하고, 번호 없이 한 줄에 하나씩 출력하세요.\n\n가사:\n${lyrics}`;

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',      // 저렴한 모델
        temperature: 0.8,
        max_tokens: 60,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!gptRes.ok) throw new Error('GPT 제목 생성 실패');
    const raw = await gptRes.json();
    const lines = raw.choices?.[0]?.message?.content?.trim().split('\n') || [];
    const titles = lines.map((l: string) => l.replace(/^[-*\d.\s]+/, '').trim()).filter(Boolean).slice(0, 3);

    titleCache.set(cacheKey, { titles, ts: Date.now() });

    return NextResponse.json({ titles });
  } catch (err) {
    console.error('[generateTitles] error', err);
    return NextResponse.json({ error: '제목 생성 실패' }, { status: 500 });
  }
}

/* ---------------------------------------------------------------------------
 * 💸 비용 컨트롤 메모
 * - 저방하게 gpt-3.5-turbo + max_tokens 제한으로 호출비 최소화
 * - 모듈 스코프 캐시로 동일 입력 30분 재사용 (호출 수 감소)
 * - 추가적으로 Usage Limits 대시보시에서 HARD_LIMIT_USD 설정 권장
 * -------------------------------------------------------------------------*/
