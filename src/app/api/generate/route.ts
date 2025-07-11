import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // 아래는 더미 예시. GPT API 연동 시 교체
    const fakeLyrics = `
[Intro]
(Instrumental)

[Verse 1]
${prompt} 영감을 받아
밤하늘 아래 속삭이듯 흐르네

[Chorus]
별빛보다 빛나는 멜로디
우리의 이야기로 채워져 가

[Verse 2]
추억이 담긴 여름밤 그 노래
가슴 깊이 울려 퍼지네

[Outro]
영원히 기억될 선율 속에
너와 내가 함께한 노래
`;

    return NextResponse.json({ lyrics: fakeLyrics });
  } catch (error) {
    console.error('가사 생성 실패:', error);
    return NextResponse.json({ error: '가사 생성 실패' }, { status: 500 });
  }
}
