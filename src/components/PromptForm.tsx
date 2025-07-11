'use client';

import { useState } from 'react';
import GenreSelector from './GenreSelector';

export default function PromptForm() {
  // 장르값 상태
  const [genre, setGenre] = useState('');

  // (추가로 다른 state, 프롬프트 합성 등 연동하면 됨)

  return (
    <div className="max-w-2xl w-full bg-white text-black p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">🎵 프롬프트 설정</h2>
      
      {/* 장르 그룹/추천 장르 버튼 UI */}
      <GenreSelector value={genre} onChange={setGenre} />
      
      {/* ...MoodSelector, VocalStyleSelector 등 다른 영역 이어 붙이기 */}
    </div>
  );
}
