'use client';

import { useState } from 'react';
import PromptBuilder from './PromptBuilder';

export default function LyricsGenerator() {
  const [prompt, setPrompt] = useState('');

  return (
    <>
      {/* 좌측 고정 광고 */}
      <div className="fixed top-20 left-0 w-32 h-96 bg-gray-200 border border-gray-400 hidden md:block z-50">
        <p className="text-center mt-4">좌측 광고</p>
      </div>

      {/* 우측 고정 광고 */}
      <div className="fixed top-20 right-0 w-32 h-96 bg-gray-200 border border-gray-400 hidden md:block z-50">
        <p className="text-center mt-4">우측 광고</p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-3xl mx-auto px-4 pt-6 text-white relative z-40">
        {/* 상단 광고 */}
        <div className="w-full mb-2 h-20 bg-gray-300 border border-gray-400 flex items-center justify-center">
          <p>상단 애드센스 광고 영역</p>
        </div>

        {/* 프롬프트 생성기 */}
        <div className="mb-4">
          <PromptBuilder onGeneratePrompt={setPrompt} />
        </div>

        {/* (아래 프롬프트 출력/복사 버튼 완전히 제거!) */}

        {/* 하단 광고 (숨김 처리) */}
        <div className="w-full mt-8 h-20 bg-gray-300 border border-gray-400 flex items-center justify-center opacity-0 pointer-events-none">
          <p className="sr-only">하단 애드센스 광고 영역 (현재 숨김)</p>
        </div>
      </div>
    </>
  );
}
