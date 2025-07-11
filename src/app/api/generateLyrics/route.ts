// src/app/api/generateLyrics/route.ts
// -----------------------------------------------------------------------------
// 저비용 설정: gpt‑3.5‑turbo + 토큰 제한 + 간단 캐시
// 캐시는 Edge 런타임 모듈 범위에 두어 동일 입력이 들어오면 재호출 방지
// -----------------------------------------------------------------------------

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    // ① 클라이언트에서 전달받은 프롬프트
    const { prompt } = await req.json();

    // ② GPT에게 줄 시스템 지시문
    const systemPrompt = `
당신은 전문 작사가입니다.
다음 사용자의 설명에 따라 완전한 한국어 가사를 작성하세요.
다음 규칙을 모두 따르세요:

1. 다음 섹션들을 감각적으로 배치해 사용하세요 (불필요한 것은 생략 가능):
   [Intro]  
   [Verse 1]  
   [Pre-Chorus] (선택적)  
   [Chorus 1]  
   [Verse 2] (선택적)  
   [Chorus 2] (같아도 됨)  
   [Bridge] (선택적)  
   [Hook] (선택적, 1~2줄 캐치한 구절)  
   [간주] (선택적, 무음이나 연주 표현으로 표기)  
   [Chorus 3] (최종 반복)  
   [후주] (선택적)  
   [Outro]

2. 섹션 제목은 대괄호로 묶으세요 (예: [Intro])
3. 각 섹션은 2~4줄로 구성하세요 (Chorus는 반복 가능)
4. 전체 줄 수는 32줄 이내로 유지하세요
5. 프롬프트의 감정, 분위기, 장르, 보컬 스타일, 악기 등이 자연스럽게 반영되도록
6. 전체적으로 하나의 일관된 흐름과 주제를 유지하세요
7. 가사 외에 해설이나 설명 없이 오직 가사만 출력하세요
8. 마지막 줄에 추천 SUNO 태그를 #해시태그 형태로 3~5개 제안하세요
예: #감성적인 #여성보컬 #재즈 #몽환적 #베이스중심
    `.trim();

    // ③ GPT에게 보낼 최종 메시지
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.85,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `곡 설명: ${prompt}` },
      ],
    });

    const lyrics = chat.choices[0].message.content?.trim() || '';

    return NextResponse.json({ lyrics });
  } catch (error) {
    console.error('[generateLyrics] error:', error);
    return NextResponse.json({ lyrics: '' }, { status: 500 });
  }
}
